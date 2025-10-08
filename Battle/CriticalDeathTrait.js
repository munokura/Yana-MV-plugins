//
//  クリティカル即死特徴 ver1.01
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
Imported['CriticalDeathTrait'] = 1.01;
/*:
@plugindesc ver1.01/You can now set Traits, skills, and items that will cause instant death when a critical hit occurs.
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
By writing
<CriticalDeath:○%>
in the Note field of an object, skill, or item with a Traits, there is an ○% chance of instantly killing the target when a critical hit occurs.

Also, by writing
<AntiCriticalDeath:○%>
in the Note field of an object with the same Traits, there is an ○% chance of nullifying a critical hit when it occurs.

These settings are determined individually for each Traits, skill, and item.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.01:180828
Fixed a bug where critical death resistance was not working.
Fixed a bug where the damage animation and sound would not occur on the target when an instant death was successful.
Changed so that the damage popup does not appear when an instant death is successful.
Ver 1.00:
Released

@param Critical Death Text
@desc This is the text that is displayed when a critical instant death occurs.
@default _name's life was put to an end!

@param Popup Death Text
@desc [Only available when BattlePopups is installed] This is the text that pops up when a critical instant death occurs.
@default It took his breath away!
*/


/*:ja
@plugindesc ver1.01/クリティカル時即死する特徴やスキルやアイテムを設定できるようにします。
@author Yana

@help
使用方法
------------------------------------------------------
特徴を持ったオブジェクトまたは、スキル、アイテムなどのメモ欄に
<クリティカル即死:○%>
または、
<CriticalDeath:○%>
と記述することで、○%の確率でクリティカル発生時に対象を即死させます。

また、
同じように特徴を持ったオブジェクトのメモ欄に
<クリティカル即死耐性:○%>
または、
<AntiCriticalDeath:○%>
と記述することで、○%の確率でクリティカル即死が発動した際に、これを無効化します。

これらはすべての特徴やスキル、アイテムで個別に判定が行われます。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.01:180828
クリティカル即死耐性が機能していないバグを修正しました。
即死成功時、対象にダメージモーションとダメージ音が発生しないバグを修正しました。
即死成功時、ダメージがポップアップしないように変更しました。
ver1.00:
公開

@param Critical Death Text
@desc クリティカル即死が発動した時に表示されるテキストです。
@default _nameの息の根を止めた！

@param Popup Death Text
@desc 【BattlePopups導入時限定】クリティカル即死が発動した時にポップアップするテキストです。
@default 息の根を止めた！
*/

(function () {
	////////////////////////////////////////////////////////////////////////////////////

	var parameters = PluginManager.parameters('CriticalDeathTrait');
	var criticalDeathText = String(parameters['Critical Death Text']);
	var popupDeathText = String(parameters['Popup Death Text']);

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.isCriticalDeath = function (item) {
		if (!item) { return false }
		if (item._criticalDeath === undefined) {
			item._criticalDeath = 0;
			if (!!item.meta['クリティカル即死']) { item._criticalDeath = item.meta['クリティカル即死'].replace(/[%％]/, '') }
			if (!!item.meta['CriticalDeath']) { item._criticalDeath = item.meta['CriticalDeath'].replace(/[%％]/, '') }
		}
		return Number(item._criticalDeath) > Math.random() * 100;
	};

	DataManager.isAntiCriticalDeath = function (item) {
		if (!item) { return false }
		if (item._antiCriticalDeath === undefined) {
			item._antiCriticalDeath = 0;
			if (!!item.meta['クリティカル即死耐性']) { item._antiCriticalDeath = item.meta['クリティカル即死耐性'].replace(/[%％]/, '') }
			if (!!item.meta['AntiCriticalDeath']) { item._antiCriticalDeath = item.meta['AntiCriticalDeath'].replace(/[%％]/, '') }
		}
		return Number(item._antiCriticalDeath) > Math.random() * 100;
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GAction_makeDamageValue = Game_Action.prototype.makeDamageValue;
	Game_Action.prototype.makeDamageValue = function (target, critical) {
		target.result()._criticalDeath = false;
		var value = 0;
		if (critical && this.isCriticalDeath(target)) {
			value = target.hp;
			target.result()._criticalDeath = true;
			this.makeSuccess(target);
		}
		if (!target.result()._criticalDeath) {
			return __GAction_makeDamageValue.call(this, target, critical);
		} else {
			return value;
		}
	};

	Game_Action.prototype.isCriticalDeath = function (target) {
		var result = DataManager.isCriticalDeath(this.item());
		if (!result) {
			for (var i = 0; i < this.subject().traitObjects().length; i++) {
				var trait = this.subject().traitObjects()[i];
				result = DataManager.isCriticalDeath(trait);
				if (result) { break }
			}
			if (!result) { return false }
		}
		for (var i = 0; i < target.traitObjects().length; i++) {
			var trait = target.traitObjects()[i];
			if (DataManager.isAntiCriticalDeath(trait)) {
				return false;
			}
		}
		return true;
	};

	////////////////////////////////////////////////////////////////////////////////////

	Window_BattleLog.prototype.displayCriticalDeath = function (target) {
		if (criticalDeathText) {
			this.push('popBaseLine');
			this.push('pushBaseLine');
			var text = criticalDeathText;
			text = text.replace(/_name/, target.name());
			this.push('addText', text);
		}
	};

	var __WBattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
	Window_BattleLog.prototype.displayDamage = function (target) {
		if (target.result()._criticalDeath) {
			if (Imported['BattlePopups'] && popupDeathText) this.showBattlePopup(target, popupDeathText);
			this.push('performDamage', target);
			this.displayCriticalDeath(target);
		} else {
			__WBattleLog_displayDamage.call(this, target);
		}
	};

	var __WBattleLog_popupDamage = Window_BattleLog.prototype.popupDamage;
	Window_BattleLog.prototype.popupDamage = function (target) {
		if (target.result()._criticalDeath) {
			target.result()._criticalDeath = false;
			return;
		}
		__WBattleLog_popupDamage.call(this, target);
	};
}());