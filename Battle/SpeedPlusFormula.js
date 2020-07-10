//
//  速度加算計算式 ver1.01
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
Imported['SpeedPlusFormula'] = 1.00;

/*:
 * @plugindesc ver1.00/行動速度決定時に加算されるランダムな値を計算式に変更します。
 * @author Yana
 * 
 * @param BasicFormula
 * @desc 行動速度決定時に加算する計算式です。
 * プリセットの式は、Math.randomInt(Math.floor(5+agi/4))です。
 * @default 0
 * 
 * @help------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------ 
 * 設定方法
 * ------------------------------------------------------ 
 * 
 * プラグインパラメータを設定することで動作します。
 * 
 * スキルやアイテムのメモ欄に
 * <速度加算計算式:xxx>
 * または、
 * <SpeedPlusFormula:xxx>
 * と記述することで、記述されたスキルやアイテムの速度加算計算式をxxxに設定することもできます。
 * 計算式では、a(使用者),v(変数),agi(使用者の敏捷性),item(アイテムやスキル)
 * が使用可能です。
 * 
 * ※Game_Action.prototype.speedを再定義しています。
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
	
	var parameters = PluginManager.parameters('SpeedPlusFormula');
	var basicFormula = String(parameters['BasicFormula']);
	
	////////////////////////////////////////////////////////////////////////////////////

	DataManager.speedPlusFormula = function(item) {
		if (!item){ return basicFormula }
		if (item.meta['速度加算計算式']){ return item.meta['速度加算計算式'] }
		if (item.meta['SpeedPlusFormula']){ return item.meta['SpeedPlusFormula'] }
		return basicFormula;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	Game_Action.prototype.speed = function() {
    	var agi = this.subject().agi;
    	var item = this.item();
   		if (this._pSpeed === undefined){
    		var a = this.subject();
    		var v = $gameVariables._data;
    		this._pSpeed = eval(DataManager.speedPlusFormula(item));
   		}
    	var speed = agi + this._pSpeed;
    	if (item) {
        	speed += item.speed;
   		}
    	if (this.isAttack()) {
        	speed += this.subject().attackSpeed();
    	}
    	return speed;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
}());
