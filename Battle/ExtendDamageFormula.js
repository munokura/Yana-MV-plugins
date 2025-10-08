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
@plugindesc ver1.00/Adds the ability to add formulas for other skills to the damage calculation formula.
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/Yana-MV-plugins ).
Original plugin by Yana.
-----
How to Use
--------------------------------------------------------------------
If you write
_sd(x)
in the damage calculation formula, that part will be replaced with the damage calculation formula for the skill with ID number x.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released
*/


/*:ja
@plugindesc ver1.00/ダメージ計算式にほかのスキルの式を追加する機能を追加します。
@author Yana

@help
使用方法
------------------------------------------------------
ダメージ計算式に、
_sd(x)
と記述すると、その部分はIDx番のスキルのダメージ計算式に置き換わります。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開
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