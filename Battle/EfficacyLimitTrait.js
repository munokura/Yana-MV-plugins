//
//  有効度上限特徴 ver1.00
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
Imported['EfficacyLimitTrait'] = 1.00;

/*:
 * @plugindesc ver1.00/ステートや属性、弱体有効度の上限を設定する特徴を設定できるようにします。
 * @author Yana
 * 
 * @help------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------
 * 設定方法
 * ------------------------------------------------------
 * アクター、クラス、武器、防具、エネミー、ステートなどの特徴を持つオブジェクトのメモ欄に、
 * <属性有効度上限:x,y%>
 * と記述すると、IDx番の属性有効度の上限がy%となります。xに-1を指定すると、
 * すべての属性の有効度の上限がy%に設定されます。
 * 
 * <弱体有効度上限:x,y%>
 * と記述すると、x番の弱体有効度の上限がy%となります。xに-1を指定すると、
 * すべての弱体の有効度の上限がy%に設定されます。
 * 弱体の順番は、
 * 0:HP,1:MP,2:攻撃力,3:防御力,4:魔法力,5:魔法防御,6:敏捷性,7:運
 * となります。
 * 
 * <ステート有効度上限:x,y%>
 * と記述すると、IDx番のステート有効度の上限がy%となります。xに-1を指定すると、
 * すべてのステートの有効度の上限がy%に設定されます。
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
 * 公開。
 */

(function(){
	
	DataManager.efficacyLimit = function(obj, type, id){
		if (!obj._efficacyLimit){
			DataManager.initEfficacyLimit(obj);
		}
		return obj._efficacyLimit[type][id];
	};
	
	DataManager.initEfficacyLimit = function(obj) {
		obj._efficacyLimit = {'element':{},'debuff':{},'state':{}};
		var texts = obj.note.split('\n');
		for(var i=0;i<texts.length;i++){
			var text = texts[i];
			var type = null;
			if (text.match(/<属性有効度上限:(-?\d+),(\d+)[%％]?>/)){
				type = 'element';
			}else if (text.match(/<弱体有効度上限:(-?\d+),(\d+)[%％]?>/)){
				type = 'debuff';
			}else if (text.match(/<ステート有効度上限:(-?\d+),(\d+)[%％]?>/)){
				type = 'state';
			}
			if (type){
				var id = Number(RegExp.$1);
				var rate = Number(RegExp.$2);
				if (id < 0){
					switch(type){
					case 'element': n = $dataSystem.elements.length; break;
					case 'debuff' : n = 8; break;
					case 'state'  : n = $dataStates.length; break;
					}
					for (var j=0;j<n;j++){ obj._efficacyLimit[type][j] = rate }
				} else {
					obj._efficacyLimit[type][id] = rate;
				}
			}
		}
	};
	
	var __GBBase_elementRate = Game_BattlerBase.prototype.elementRate;
	Game_BattlerBase.prototype.elementRate = function(elementId) {
		var result = __GBBase_elementRate.call(this, elementId);
		result = Math.min(result, this.efficacyLimit('element', elementId));
		return result;
	};

	var __GBBase_debuffRate = Game_BattlerBase.prototype.debuffRate;
	Game_BattlerBase.prototype.debuffRate = function(paramId) {
		var result = __GBBase_debuffRate.call(this, paramId);
		result = Math.min(result, this.efficacyLimit('debuff', paramId));
		return result;
	};

	var __GBBase_stateRate = Game_BattlerBase.prototype.stateRate;
	Game_BattlerBase.prototype.stateRate = function(stateId) {
		var result = __GBBase_stateRate.call(this, stateId);
		result = Math.min(result, this.efficacyLimit('state', stateId));
		return result;
	};
	
	Game_BattlerBase.prototype.efficacyLimit = function(type, id){
		return this.traitObjects().reduce(function(r,obj){
			var n = DataManager.efficacyLimit(obj, type, id);
			if (n || n === 0){ r = Math.min(r,n) }
			return r;
		},1000000) / 100;
	};
	
}());