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
@plugindesc ver1.00/The random value added when determining action speed has been changed to the calculation formula.
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
There is no plugin command.
------------------------------------------------------
------------------------------------------------------
How to Set Up
------------------------------------------------------

This plugin works by setting plugin parameters.

You can set the speed addition formula for a skill or item to xxx by writing
<SpeedPlusFormula:xxx>
in the Note field of the skill or item.

The formula can contain a (user), v (variable), agi (user agility), and item (item or skill).

*Game_Action.prototype.speed is redefined.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released

@param BasicFormula
@desc This is the formula added when determining the action speed. The preset formula is Math.randomInt(Math.floor(5+agi/4)).
@default 0
*/


/*:ja
@plugindesc ver1.00/行動速度決定時に加算されるランダムな値を計算式に変更します。
@author Yana

@help
 プラグインコマンドはありません。
------------------------------------------------------
------------------------------------------------------
設定方法
------------------------------------------------------

プラグインパラメータを設定することで動作します。

スキルやアイテムのメモ欄に
<速度加算計算式:xxx>
または、
<SpeedPlusFormula:xxx>
と記述することで、記述されたスキルやアイテムの速度加算計算式をxxxに設定することもできます。
計算式では、a(使用者),v(変数),agi(使用者の敏捷性),item(アイテムやスキル)
が使用可能です。

※Game_Action.prototype.speedを再定義しています。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param BasicFormula
@desc 行動速度決定時に加算する計算式です。 プリセットの式は、Math.randomInt(Math.floor(5+agi/4))です。
@default 0
*/

(function () {
	////////////////////////////////////////////////////////////////////////////////////

	var parameters = PluginManager.parameters('SpeedPlusFormula');
	var basicFormula = String(parameters['BasicFormula']);

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.speedPlusFormula = function (item) {
		if (!item) { return basicFormula }
		if (item.meta['速度加算計算式']) { return item.meta['速度加算計算式'] }
		if (item.meta['SpeedPlusFormula']) { return item.meta['SpeedPlusFormula'] }
		return basicFormula;
	};

	////////////////////////////////////////////////////////////////////////////////////

	Game_Action.prototype.speed = function () {
		var agi = this.subject().agi;
		var item = this.item();
		if (this._pSpeed === undefined) {
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