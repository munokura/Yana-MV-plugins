//
//  命中&回避計算式 ver1.01
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['HitandEvaFormula'] = 1.01;
/*:
 * @plugindesc ver1.01/命中や回避に計算式が使用できるようにします。
 * @author Yana
 * 
 * @param HitFormula
 * @desc 命中計算の基本式です。
 * @default hit - eva
 * 
 * @param EvaFormula
 * @desc 回避計算の基本式です。
 * @default 0
 *
 * @param HitCountMessage
 * @desc 攻撃の命中回数のメッセージです。
 * _cntを命中数、_nameを名前に変更します。
 * @default _cnt回ヒット！
 * 
 * @help------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * アイテムやスキルのメモに、
 * <命中計算式:xxx>
 * または、
 * <HitFormula:xxx>
 * と記述すると、命中の計算式がxxxに設定されます。
 * xxxでは、通常のダメージ計算式で使用できるa,b,vに加え、
 * hit(行動者の命中値),eva(対象の回避値-魔法なら魔法回避値)が使用可能です。
 * 
 * アイテムやスキルのメモに
 * <回避計算式:xxx>
 * または、
 * <EvaFormula:xxx>
 * と記述すると、回避の計算式がxxxに設定されます。
 * xxxでは、通常のダメージ計算式で使用できるa,b,vに加え、
 * hit(行動者の命中値),eva(対象の回避値(魔法なら魔法回避値))が使用可能です。
 * 
 * 個別で式が設定されていないアイテムやスキルは、パラメータで使用された式が設定されます。
 *
 * ver1.01より、複数回判定の仕組みを追加しました。
 * スキルやアイテムのメモに
 * <判定回数:○>
 * <JudgeCount:○>
 * のいずれかを記述すると、命中判定時に回数分の判定を行います。
 * そのいずれかで命中すれば命中となり、命中した分をすべて回避すれば回避となります。
 * 命中回数にはb.hc()でアクセス可能です。
 * 
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.01:
 * 利用規約をMITライセンスに変更。
 * 判定回数の仕組みを追加。
 * ver1.00:
 * 公開
 */

(function(){
	////////////////////////////////////////////////////////////////////////////////////
	
	var parameters = PluginManager.parameters('HitandEvaFormula');
	var hitFormula = String(parameters['HitFormula']);
	var evaFormula = String(parameters['EvaFormula']);
	var hitCountMessage = String(parameters['HitCountMessage']) || '';
	
	////////////////////////////////////////////////////////////////////////////////////

	DataManager.hitFormula = function(item) {
		if (item._hitFormula === undefined){
			item._hitFormula = item.meta['命中計算式'];
			if (!item._hitFormula){ item._hitFormula = item.meta['HitFormula'] }	
			if (!item._hitFormula){ item._hitFormula = hitFormula }
		}
		return item._hitFormula;
	};

	DataManager.evaFormula = function(item) {
		if (item._evaFormula === undefined){
			item._evaFormula = item.meta['回避計算式'];
			if (!item._evaFormula){ item._evaFormula = item.meta['EvaFormula'] }
			if (!item._evaFormula){ item._evaFormula = evaFormula }
		}
		return item._evaFormula;
	};

	////////////////////////////////////////////////////////////////////////////////////

	Game_Battler.prototype.hc = function() {
		return this.result()._hitCount;
	};

	////////////////////////////////////////////////////////////////////////////////////
	
	var __GAction_itemHit = Game_Action.prototype.itemHit;
	Game_Action.prototype.itemHit = function(target) {
		target.result()._hitCount = 0;
		var hit = __GAction_itemHit.call(this,target);
		var eva = __GAction_itemEva.call(this,target);
    	var a = this.subject();
    	var b = target;
    	var v = $gameVariables._data;
        var s = $gameSwitches._data;
        var n = eval(this.item().meta['判定回数'] || this.item().meta['JudgeCount'] || 1);
        var result = eval(DataManager.hitFormula(this.item()));
        for (var i = 0; i < n; i++) {
            if (result > Math.random()) target.result()._hitCount++;
        }
        result = target.result()._hitCount > 0 ? 1.0 : 0;
    	//result = Math.min(1.0,Math.max(result,0));
    	return result;
	};

	var __GAction_itemEva = Game_Action.prototype.itemEva;
	Game_Action.prototype.itemEva = function(target) {
	    if (target.result()._hitCount === undefined) target.result()._hitCount = 1;
		var eva = __GAction_itemEva.call(this,target);
    	var hit = __GAction_itemHit.call(this,target);
    	var a = this.subject();
    	var b = target;
    	var v = $gameVariables._data;
        var s = $gameSwitches._data;
        var result = eval(DataManager.evaFormula(this.item()));
        for (var i=0,max=target.result()._hitCount;i<max;i++) {
            if (result > Math.random()) target.result()._hitCount--;
        }
        result = target.result()._hitCount > 0 ? 0 : 1.0;
    	//result = Math.min(1.0,Math.max(result,0));
    	return result;
	};

	////////////////////////////////////////////////////////////////////////////////////

    Window_BattleLog.prototype.displayHitCount = function(target) {
        if (target.result()._hitCount && hitCountMessage && target.result()._hitCount > 1) {
            var message = hitCountMessage.replace(/_cnt/,target.result()._hitCount);
            message = message.replace(/_name/,target.name());
            //this.addText(message);
            this.push('addTextNoWait', message);
        }
    };

	var __WBattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
	Window_BattleLog.prototype.displayDamage = function(target) {
        this.displayHitCount(target);
		__WBattleLog_displayDamage.call(this, target);
	};

    Window_BattleLog.prototype.addTextNoWait = function(text) {
        this._lines.push(text);
        this.refresh();
    };

	////////////////////////////////////////////////////////////////////////////////////
}());