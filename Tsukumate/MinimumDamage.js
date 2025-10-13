//
//  最低ダメージ値保障 ver1.00
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
Imported['MinimumDamage'] = 1.00;
/*:
@target MZ MV
@plugindesc ver1.00/Sets the minimum damage value.
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Tsukumate/MinimumDamage.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/Yana-MV-plugins ).
Original plugin by Yana.
-----
Sets the minimum damage value.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver. 1.00:
Released

@param MinimumHpDamage
@text Minimum HP damage
@desc This is the minimum HP damage.
@default 1
@type number

@param MinimumMpDamage
@text MP Damage Minimum
@desc This is the minimum MP damage.
@default 1
@type number
*/


/*:ja
@target MZ MV
@plugindesc ver1.00/ダメージの最低値を設定します。
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Tsukumate/MinimumDamage.js
@license MIT License

@help
ダメージの最低値を設定します。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param MinimumHpDamage
@text HPダメージ最低値
@desc HPダメージの最低値です。
@default 1
@type number

@param MinimumMpDamage
@text MPダメージ最低値
@desc MPダメージの最低値です。
@default 1
@type number
*/

// プラグインパラメータやエイリアスを使うため、グローバル汚染回避のためクロージャーとして定義

(() => {

	"use strict";

	////////////////////////////////////////////////////////////////////////////////////

	const parameters = PluginManager.parameters('MinimumDamage');
	const minimumHpDamage = Number(parameters['MinimumHpDamage']);
	const minimumMpDamage = Number(parameters['MinimumMpDamage']);

	////////////////////////////////////////////////////////////////////////////////////

	const __Game_Action_executeDamage = Game_Action.prototype.executeDamage;
	Game_Action.prototype.executeDamage = function (target, value) {
		if (this.isHpEffect()) {
			value = Math.max(Math.abs(value), minimumHpDamage);
			if (this.isRecover()) { value *= -1 }
		}
		if (this.isMpEffect()) {
			value = Math.max(Math.abs(value), minimumMpDamage);
			if (this.isRecover()) { value *= -1 }
		}
		__Game_Action_executeDamage.call(this, target, value);
	};

})();