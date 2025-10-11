//
//  失敗メッセージ非表示スキル ver1.00
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
Imported['FailureMessageHideSkill'] = 1.00;
/*:
@plugindesc ver1.00/You can now set skills and items that will not display failure messages.
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
<FailureHide>
in the Note field of a skill or item will prevent the failure message from being displayed for that skill.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver. 1.00:
Released
*/


/*:ja
@plugindesc ver1.00/失敗メッセージが表示されないスキルやアイテムを設定できるようにします。
@author Yana

@help
使用方法
------------------------------------------------------
スキルやアイテムのメモ欄に
<失敗非表示>
または
<FailureHide>
と記述すると、そのスキルは失敗時のメッセージが表示されなくなります。

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

	var parameters = PluginManager.parameters('FailureMessageHideSkill');

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.isHideFailure = function (item) {
		return !!item.note.match(/(?:失敗非表示|FailureHide)/);
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GAction_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function (target) {
		__GAction_apply.call(this, target);
		if (DataManager.isHideFailure(this.item())) {
			this.makeSuccess(target);
		}
	}

	////////////////////////////////////////////////////////////////////////////////////
}());