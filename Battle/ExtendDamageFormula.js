//
//  ダメージ計算式拡張 ver1.00
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
Imported['ExtendDamageFormula'] = 1.00;
/*:
 * @plugindesc ver1.00/ダメージ計算式にほかのスキルの式を追加する機能を追加します。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * ダメージ計算式に、
 * _sd(x)
 * と記述すると、その部分はIDx番のスキルのダメージ計算式に置き換わります。
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
	
	var parameters = PluginManager.parameters('ExtendDamageFormula');
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __GAction_evalDamageFormula = Game_Action.prototype.evalDamageFormula;
	Game_Action.prototype.evalDamageFormula = function(target) {
		var item = this.item();
		var formula = item.damage.formula;
		item.damage.formula = item.damage.formula.replace(/_sd\((\d+)\)/,function(){
			return $dataSkills[parseInt(arguments[1])].damage.formula;
		});
		var damage = __GAction_evalDamageFormula.call(this,target);
		item.damage.formula = formula;
		return damage;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
}());