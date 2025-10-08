//
//  回避無視特徴 ver1.00
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
Imported['EvasionPenetration'] = 1.00;
/*:
@plugindesc ver1.00/You can now set a Traits that ignores the target's evasion.
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
Writing
<PhysicalEvasionPenetrate>
in the Note field of an object, skill, or item with a Traits will cause the battler, skill, or item with that Traits to ignore physical evasion.

Writing
<MagicalEvasionPenetrate>
in the Note field of an object, skill, or item with that Traits will cause the battler, skill, or item with that Traits to ignore magical evasion.

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
@plugindesc ver1.00/対象の回避を無視する特徴を設定できるようにします。
@author Yana

@help
使用方法
------------------------------------------------------
特徴を持ったオブジェクトまたは、スキル、アイテムのメモ欄に
<物理回避無視>
または、
<PhysicalEvasionPenetrate>
と記述すると、その特徴を持ったバトラーまたはスキルやアイテムは物理回避を無視します。

特徴を持ったオブジェクトまたは、スキル、アイテムのメモ欄に
<魔法回避無視>
または、
<MagicalEvasionPenetrate>
と記述すると、その特徴を持ったバトラーまたはスキルやアイテムは魔法回避を無視します。

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

	var parameters = PluginManager.parameters('EvasionPenetration');

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.isEvaPenetrate = function (item, type) {
		switch (type) {
			case 1:
				if (item._pEvaPenetrate === undefined) {
					item._pEvaPenetrate = (!!item.note.match(/<物理回避無視>/) || !!item.note.match(/<PhysicalEvasionPenetrate>/));
				}
				return item._pEvaPenetrate;
			case 2:
				if (item._mEvaPenetrate === undefined) {
					item._mEvaPenetrate = (!!item.note.match(/<魔法回避無視>/) || !!item.note.match(/<MagicalEvasionPenetrate>/));
				}
				return item._mEvaPenetrate;
		}
		return false;
	};

	var __Game_Action_itemEva = Game_Action.prototype.itemEva;
	Game_Action.prototype.itemEva = function (target) {
		if (this.evaPenetrate()) { return 0 }
		return __Game_Action_itemEva.call(this, target);
	};

	Game_Action.prototype.evaPenetrate = function () {
		if (DataManager.isEvaPenetrate(this.item(), this.item().hitType)) { return true }
		for (var i = 0; i < this.subject().traitObjects().length; i++) {
			var trait = this.subject().traitObjects()[i];
			if (DataManager.isEvaPenetrate(trait, this.item().hitType)) { return true }
		};
		return false;
	};
}());