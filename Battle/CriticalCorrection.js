//
//  クリティカル修正 ver1.00
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
Imported['CriticalCorrection'] = 1.00;
/*:
 * @plugindesc ver1.00/アイテムやスキルで個別にクリティカル率の修正を行います。
 * @author Yana
 * 
 * @help------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------ 
 * スキルまたはアイテムのメモ欄に
 * <クリティカル率修正:○○○>
 * または、
 * <CriticalC:○○○>
 * と記述してください。
 * 
 * ○○○で記述された計算式をevalで評価して、結果%をクリティカル率に加算します。
 * 計算式には、通常のダメージ計算式と同じようにa,b,vが使用できます。
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
	
	var parameters = PluginManager.parameters('CriticalCorrection');
	
	////////////////////////////////////////////////////////////////////////////////////

	DataManager.itemCri = function(item) {
		if (!!item.meta['クリティカル率修正']){ return item.meta['クリティカル率修正'] }
		if (!!item.meta['CriticalC']){ return item.meta['CriticalC'] }
		return 0;
	};
	
	var __Game_Action_itemCri = Game_Action.prototype.itemCri;
	Game_Action.prototype.itemCri = function(target){
		var a = this.subject();
		var b = target;
		var v = $gameVariables._data;
		var item = this.item();
		var correction = eval(DataManager.itemCri(item)) / 100;
		return __Game_Action_itemCri.call(this,target) + correction;
	};
}());