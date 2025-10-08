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
@plugindesc ver1.00/Critical rate adjustments will be made individually for items and skills.
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
Write
<CriticalC: ○○○>
in the Note field of a skill or item.

The formula written in ○○○ is evaluated with eval, and the resulting % is added to the critical chance.
The formula can use a, b, and v, just like the normal damage calculation formula.

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
@plugindesc ver1.00/アイテムやスキルで個別にクリティカル率の修正を行います。
@author Yana

@help
使用方法
------------------------------------------------------
スキルまたはアイテムのメモ欄に
<クリティカル率修正:○○○>
または、
<CriticalC:○○○>
と記述してください。

○○○で記述された計算式をevalで評価して、結果%をクリティカル率に加算します。
計算式には、通常のダメージ計算式と同じようにa,b,vが使用できます。

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

(function () {
	////////////////////////////////////////////////////////////////////////////////////

	var parameters = PluginManager.parameters('CriticalCorrection');

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.itemCri = function (item) {
		if (!!item.meta['クリティカル率修正']) { return item.meta['クリティカル率修正'] }
		if (!!item.meta['CriticalC']) { return item.meta['CriticalC'] }
		return 0;
	};

	var __Game_Action_itemCri = Game_Action.prototype.itemCri;
	Game_Action.prototype.itemCri = function (target) {
		var a = this.subject();
		var b = target;
		var v = $gameVariables._data;
		var item = this.item();
		var correction = eval(DataManager.itemCri(item)) / 100;
		return __Game_Action_itemCri.call(this, target) + correction;
	};
}());