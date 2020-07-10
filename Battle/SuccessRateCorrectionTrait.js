//
//  成功率補正特徴 ver1.00
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
Imported['SuccessRateCorrectionTrait'] = 1.00;
/*:
 * @plugindesc ver1.00/成功率を補正する特徴を設定できるようにします。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------ 
 * 特徴を持ったオブジェクトのメモ欄に
 * <成功率補正:[IS]x,y%>
 * または、
 * <SuccessRateCor:[IS]x,y%>
 * と記述してください。
 * ISはどちらか片方です。
 * 例:30番のスキルの成功率を20%上昇させる
 * <成功率補正:S30,+20%>
 * 
 * その特徴が付与されているとき、指定したスキルやアイテムの成功率に○の補正を加えます。
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
	
	var parameters = PluginManager.parameters('SuccessRateCorrectionTrait');
	
	////////////////////////////////////////////////////////////////////////////////////
	
	DataManager.plusSuccessRate = function(item) {
		if (item._successRateCor === undefined){
			var texts = item.note.split('\n');
			item._successRateCor = [];
			for (var i=0;i<texts.length;i++){
				var text = texts[i];
				if (!!text.match(/<(?:成功率補正|SuccessRateCor):([IS])(\d+),([+-]?\d+)[%％]?>/)){
					item._successRateCor.push([RegExp.$1,Number(RegExp.$2),Number(RegExp.$3)]);
				}
			}	
		}
		return item._successRateCor;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __GAction_itemHit = Game_Action.prototype.itemHit;
	Game_Action.prototype.itemHit = function(target) {
		var successRate = this.item().successRate;
		var psRate = this.plusSuccessRate();
		this.item().successRate += psRate;
		var result = __GAction_itemHit.call(this,target);
		this.item().successRate = successRate;
		return result;
	};
	
	Game_Action.prototype.plusSuccessRate = function() {
		var type = DataManager.isItem(this.item());
		return this.subject().traitObjects().reduce(function(r,to){
			var sr = DataManager.plusSuccessRate(to);
			for (var i=0;i<sr.length;i++){
				var s = sr[i];
				if ((s[0] === 'I' && !type) || (s[0] === 'S' && type)){ continue }
				if (this.item().id === s[1]){
					r += s[2];
				}
			}
			return r;
		}.bind(this),0);
	}
	
	////////////////////////////////////////////////////////////////////////////////////
	
}());