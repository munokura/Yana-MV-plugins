//
//  範囲変更特徴 ver1.00
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
Imported['ScopeChangeTrait'] = 1.00;
/*:
 * @plugindesc ver1.00/指定したスキルやアイテムの範囲を変更する特徴を設定できるようにします。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * アクターやクラス、装備やステート、エネミーなど特徴を持ったオブジェクトのメモ欄に、
 * <範囲変更:xy,z>
 * または、
 * <ScopeChange:xy,z>
 * と記述すると、xyで指定したスキルやアイテムの対象をzで指定した対象に変更します。
 * xには、I(アイテム),S(スキル),T(スキルタイプ)のいずれかが指定可能です。
 * yは、それぞれのIDを指定します。
 * zは変更する範囲です。それぞれ、
 * 1:敵単体
 * 2:敵全体
 * 3:敵ランダム1体
 * 4:敵ランダム2体
 * 5:敵ランダム3体
 * 6:敵ランダム4体
 * 7:味方単体
 * 8:味方全体
 * 9:味方単体(戦闘不能)
 * 10:味方全体(戦闘不能)
 * 11:使用者
 * -1:単体→全体
 * -2:全体→単体
 * -3:敵→味方　味方→敵
 * となります。
 * 
 * また、CoditionallyCoreと併用している場合、範囲変更に詳細な条件を
 * 付けることが可能です。
 * その際は、
 * <範囲変更:xy,z%,a>
 * 発動条件
 * </範囲変更>
 * と記述してください。
 * 発動条件を満たした時、xyで指定したスキルやアイテムの範囲をaで指定した
 * 範囲にz%の確率で変更します。
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
 * ver1.00:
 * 公開
 */

(function(){
	////////////////////////////////////////////////////////////////////////////////////
	
	var parameters = PluginManager.parameters('ScopeChangeTrait');

	////////////////////////////////////////////////////////////////////////////////////
	
	function ScopeChangeManager() {
    	throw new Error('This is a static class');
	};
	
	ScopeChangeManager.initCond = function(note){
		var texts = note.split('\n');
		var flag = false;
		var result = [];
		for(var i=0;i<texts.length;i++){
			if (flag){
				if (texts[i].match(/^<\/(?:範囲変更|ScopeChange)>/)){
					result.push(effect);
					flag = false;
				}else{
					effect['conditions'].push(ConditionallyManager.makeCondition(texts[i]));
				}
			}else if (texts[i].match(/^<(?:範囲変更|ScopeChange):([IST])(\d+),(\d+)[%％]?,(-?\d+)>/)){
				var effect = {
					'scope':Number(RegExp.$4),
					'type':RegExp.$1,
					'id':Number(RegExp.$2),
					'rate':Number(RegExp.$3),
					'conditions':[]
					};
				flag = true;
			}
		}
		return result;
	};
	
	ScopeChangeManager.scopeChange = function(item) {
		if (item._scopeChange === undefined){
			item._scopeChange = [];
			var texts = item.note.split('\n');
			for (var i=0,max=texts.length;i<max;i++){
				if (texts[i].match(/<(?:範囲変更|ScopeChange):([IST])(\d+),(-?\d+)>/)){
					item._scopeChange.push({'type':RegExp.$1,'id':Number(RegExp.$2),'scope':Number(RegExp.$3)});
				}
			}
		}
		return item._scopeChange;
	};
	
	ScopeChangeManager.condScopeChange = function(item) {
		if (Imported['ConditionallyCore']){
			if (item._condScopeChange === undefined){
				item._condScopeChange = this.initCond(item.note);
			}
			return item._condScopeChange;
		} else {
			return false;
		}
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __GAction_makeTargets = Game_Action.prototype.makeTargets;
	Game_Action.prototype.makeTargets = function(){
		var scope = this.item().scope;
		this.subject().checkScopeChange(this.item());
		var result = __GAction_makeTargets.call(this);
		this.item().scope = scope;
		return result;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	Game_Battler.prototype.checkScopeChange = function(item){
		for(var i=0,max=this.traitObjects().length;i<max;i++){
			var trait = this.traitObjects()[i];
			var sc = ScopeChangeManager.scopeChange(trait);
			var type = DataManager.isItem(item) ? 'I' : 'S';
			for (var j=0,jmax=sc.length;j<jmax;j++){
				var s = sc[j];
				if (this.checkSCType(s,item)){
					this.setScope(item,s.scope);
					return;
				}
			}
			var csc = ScopeChangeManager.condScopeChange(trait);
			if (csc){
				for (var j=0,jmax=csc.length;j<jmax;j++){
					var c = csc[j];
					if (this.checkSCType(c,item)){
						var unit = this.isActor() ? $gameTroop : $gameParty;
						if (Math.random() < c.rate * 0.01){
							for (var k=0,kmax=unit.members().length;k<kmax;k++){	
								var target = unit.members()[k];
								if (ConditionallyManager.checkConditions(this,target,c.conditions)) {
									this.setScope(item,c.scope);
									return;
								}
							}
						}
					}	
				}
			}
		}
	};
	
	Game_Battler.prototype.checkSCType = function(c,item) {
		var type = DataManager.isItem(item) ? 'I' : 'S';
		if (c.type === type){
			return c.id === item.id;
		} else if (c.type === 'T' && type === 'S'){
			return item.stypeId === c.id;
		}
		return false;
	};
	
	Game_Battler.prototype.setScope = function(item, scope) {
		if (scope >= 0){
			item.scope = scope;
		} else {
			// -1なら単体を全体に変換
			if (scope === -1){
				switch(item.scope){
				case 1:
					item.scope = 2;
					break;
				case 7:
					item.scope = 8;
					break;
				case 9:
					item.scope = 10;
					break;
				case 11:
					item.scope = 8;
					break;
				}
			// -2なら全体を単体に変換
			} else if (scope === -2){
				switch(item.scope){
				case 2:
					item.scope = 1;
					break;
				case 8:
					item.scope = 7;
					break;
				case 10:
					item.scope = 9;
					break;
				}
			// -3以下なら、敵を味方に、味方を敵に変換
			} else {
				switch(item.scope){
				case 1:
					item.scope = 7;
					break;
				case 2:
					item.scope = 8;
					break;
				case 7:
					item.scope = 1;
					break;
				case 8:
					item.scope = 2;
					break;
				case 11:
					item.scope = 1;
					break;
				}
			}
		}
	};
	
	////////////////////////////////////////////////////////////////////////////////////
}());
	