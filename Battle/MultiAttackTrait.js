//
//  マルチアタック特徴 ver1.00
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
Imported['MultiAttackTrait'] = 1.00;
/*:
 * @plugindesc ver1.00/確率で攻撃回数が増加する特徴を設定できるようになります。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * 特徴を持ったオブジェクトのメモ欄に
 * <攻撃回数追加:x,y%>
 * または、
 * <MultiAttack:x,y%>
 * と記述してください。
 * y%の確率でx回攻撃回数が増加します。
 * それぞれの特徴は単独で判定が行われます。
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
	
	var parameters = PluginManager.parameters('MultiAttackTrait');
	
	////////////////////////////////////////////////////////////////////////////////////
	
	DataManager.multiAttack = function(item) {
		if (item._multiAttack === undefined){
			item._multiAttack = [];
			var texts = item.note.split('\n');
			for (var i=0,max=texts.length;i<max;i++){
				var text = texts[i];
				if (text.match(/<(?:攻撃回数追加|MultiAttack):(\d+),(\d+)[%％]?>/)){
					item._multiAttack.push([Number(RegExp.$1),Number(RegExp.$2)]);
				}
			}
		}
		return item._multiAttack;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __GBBase_attackTimesAdd = Game_BattlerBase.prototype.attackTimesAdd;
	Game_BattlerBase.prototype.attackTimesAdd = function() {
		return this.traitObjects().reduce(function(r,to){
			var ma = DataManager.multiAttack(to);
			for (var i=0,max=ma.length;i<max;i++){
				if (Math.random() < ma[i][1] * 0.01){ r += ma[i][0] }
			}
			return r;
		}.bind(this),__GBBase_attackTimesAdd.call(this));		
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
}());