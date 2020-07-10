//
//  使用効果発動率 ver1.00
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
Imported['InvokeEffectRate'] = 1.00;
/*:
 * @plugindesc ver1.00/アイテムやスキルの使用効果に発動率を設定することができるようにします。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * アイテムやスキルのメモ欄に
 * <使用効果発動率:x%>
 * または、
 * <InvokeEffectRate:x%>
 * と記述すると、そのスキルやアイテムの使用効果すべての発動率がx%に設定されます。
 * 
 * <使用効果発動率:x,y,z%>
 * または、
 * <InvokeEffectRate:x,y,z%>
 * と記述すると、コードx,データIDyのエフェクトの発動率がz%に設定されます。
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
	
	var parameters = PluginManager.parameters('InvokeEffectRate');
	
	////////////////////////////////////////////////////////////////////////////////////
	
	DataManager.effectRates = function(item) {
		if (item._effectRates === undefined){
			item._effectRates = {};
			var texts = item.note.split('\n');
			for (var i=0,max=texts.length;i<max;i++){
				var text = texts[i];
				if (text.match(/<(?:使用効果発動率|InvokeEffectRate):(\d+)[%％]>/)){
					item._effectRates['all'] = Number(RegExp.$1);
				}
				if (text.match(/<(?:使用効果発動率|InvokeEffectRate):(\d+,\d+),(\d+)[%％]>/)){
					item._effectRates[RegExp.$1] = Number(RegExp.$2);
				}
			}
		}
		return item._effectRates;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __GAction_applyItemEffect = Game_Action.prototype.applyItemEffect;
	Game_Action.prototype.applyItemEffect = function(target, effect) {
		var rates = DataManager.effectRates(this.item());
		var key = effect.code + ',' + effect.dataId;
		if (rates[key] && Math.random() > rates[key] * 0.01){ return }
		if (rates['all'] && Math.random() > rates['all'] * 0.01){ return }
		__GAction_applyItemEffect.call(this,target,effect);
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
}());
	