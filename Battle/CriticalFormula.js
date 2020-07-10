//
//  クリティカル計算式 ver1.01
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
Imported['CriticalFormula'] = 1.01;

/*:
 * @plugindesc ver1.01/クリティカル時の計算式を変更します。
 * @author Yana
 * 
 * @param Critical Formula
 * @desc クリティカル時の計算式です。
 * ダメージ計算式で使える変数に加え、dに適用前のダメージが入ります。
 * @default d * 3
 *
 * @help ------------------------------------------------------
 * 設定方法
 * ------------------------------------------------------
 * スキルやアイテムのメモ欄に
 * <クリティカル計算式:xxx>
 * または、
 * <CriticalFormula:xxx>
 * と記述すると、そのスキルやアイテムのクリティカル時の
 * ダメージ計算式をxxxに設定します。
 *
 * 記述がない場合、プラグインパラメータで設定された計算式が
 * 使用されます。
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
 * スキルやアイテムで個別に式が設定できるように変更。
 * 使い方や規約等のヘルプを追加。
 * ver1.00:
 * 公開
 */

(function(){
    ////////////////////////////////////////////////////////////////////////////////////

	var parameters = PluginManager.parameters('CriticalFormula');
	var criticalFormula = String(parameters['Critical Formula'] || 'd * 3');

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.criticalFormula = function(item) {
        if (!item){ return criticalFormula }
        if (item._criticalFormula){ return item._criticalFormula }
		if (/<(?:クリティカル計算式|CriticalFormula):(.+)>/gi.exec(item.note)){
            item._criticalFormula = RegExp.$1;
		} else {
            item._criticalFormula = criticalFormula;
        }
		return item._criticalFormula;
    };

    ////////////////////////////////////////////////////////////////////////////////////

	var __GAction_makeDamageValue = Game_Action.prototype.makeDamageValue;
	Game_Action.prototype.makeDamageValue = function(target, critical) {
		this._currentTarget = target;
		return __GAction_makeDamageValue.call(this,target,critical);
	};
	
	Game_Action.prototype.applyCritical = function(damage) {
		var a = this.subject();
		var b = this._currentTarget;
		var v = $gameVariables._data;
		var d = damage;
		var item = this.item();
    	return eval(DataManager.criticalFormula(item));
	};

    ////////////////////////////////////////////////////////////////////////////////////
}());