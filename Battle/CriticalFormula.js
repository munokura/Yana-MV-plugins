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
@plugindesc ver1.01/Changed the calculation formula for critical hits.
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
How to Set
--------------------------------------------------------------------
Entering
<CriticalFormula:xxx>
in the Note field of a skill or item will set the critical damage formula for that skill or item to xxx.

If no value is entered, the formula set in the plugin parameters will be used.
------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver 1.01:
Allows individual formulas to be set for skills and items.
Added help information on usage and terms of use.
ver 1.00:
Released

@param Critical Formula
@desc This is the calculation formula for critical hits. In addition to the variables that can be used in the damage calculation formula, d contains the damage before application.
@default d * 3
*/


/*:ja
@plugindesc ver1.01/クリティカル時の計算式を変更します。
@author Yana

@help
設定方法
------------------------------------------------------
スキルやアイテムのメモ欄に
<クリティカル計算式:xxx>
または、
<CriticalFormula:xxx>
と記述すると、そのスキルやアイテムのクリティカル時の
ダメージ計算式をxxxに設定します。

記述がない場合、プラグインパラメータで設定された計算式が
使用されます。
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.01:
スキルやアイテムで個別に式が設定できるように変更。
使い方や規約等のヘルプを追加。
ver1.00:
公開

@param Critical Formula
@desc クリティカル時の計算式です。 ダメージ計算式で使える変数に加え、dに適用前のダメージが入ります。
@default d * 3
*/

(function () {
	////////////////////////////////////////////////////////////////////////////////////

	var parameters = PluginManager.parameters('CriticalFormula');
	var criticalFormula = String(parameters['Critical Formula'] || 'd * 3');

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.criticalFormula = function (item) {
		if (!item) { return criticalFormula }
		if (item._criticalFormula) { return item._criticalFormula }
		if (/<(?:クリティカル計算式|CriticalFormula):(.+)>/gi.exec(item.note)) {
			item._criticalFormula = RegExp.$1;
		} else {
			item._criticalFormula = criticalFormula;
		}
		return item._criticalFormula;
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GAction_makeDamageValue = Game_Action.prototype.makeDamageValue;
	Game_Action.prototype.makeDamageValue = function (target, critical) {
		this._currentTarget = target;
		return __GAction_makeDamageValue.call(this, target, critical);
	};

	Game_Action.prototype.applyCritical = function (damage) {
		var a = this.subject();
		var b = this._currentTarget;
		var v = $gameVariables._data;
		var d = damage;
		var item = this.item();
		return eval(DataManager.criticalFormula(item));
	};

	////////////////////////////////////////////////////////////////////////////////////
}());