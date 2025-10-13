//
//  ステートターン操作特徴 ver1.01
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
Imported['ControlStateTurnTrait'] = 1.01;
/*:
@plugindesc ver1.01/Allows you to set Traits that control the effect turn of the state.
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
<ReceiveCtrlStateTurn:x+yTurn>
in the Note field of an object with a Traits, or write <ReceiveCtrlStateTurn: x+yTurn>
, the effect turn count will increase by y turns when receiving a state with ID x if the object has that Traits.

If you write
<AddCtrlStateTurn:x+yTurn>
in the Note field of an object, item, or skill with a Traits, the effect turn count will increase by y turns when granting a state with ID x if the object has that Traits.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver 1.01:
Fixed a bug that allowed the Give Turns Traits to accumulate on items and skills.
ver 1.00:
Released
*/


/*:ja
@plugindesc ver1.01/ステートの効果ターンを操作する特徴を設定することができるようにします。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
使用方法
------------------------------------------------------
特徴を持ったオブジェクトまたはメモ欄に、
<被ステートターン操作:x+yターン>
または、
<ReceiveCtrlStateTurn:x+yTurn>
と記述すると、その特徴を持っている場合、IDx番のステートを受けた時の効果ターンが
yターン増加します。

特徴を持ったオブジェクトまたはアイテム、スキルのメモ欄に、
<与ステートターン操作:x+yターン>
または、
<AddCtrlStateTurn:x+yTurn>
と記述すると、その特徴を持っている場合、IDx番のステートを与えた時の効果ターンが
yターン増加します。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.01:
アイテムやスキルに与ターン特徴が累積してしまうバグを修正。
ver1.00:
公開
*/

(function () {
	////////////////////////////////////////////////////////////////////////////////////

	var parameters = PluginManager.parameters('ControlStateTurnTrait');

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.ctrlStateTurn = function (item) {
		if (item._ctrlStateTurn === undefined) {
			item._ctrlStateTurn = {};
			var texts = item.note.split('\n');
			for (var i = 0, max = texts.length; i < max; i++) {
				var text = texts[i];
				if (text.match(/<((?:被|与|Receive|Add))(?:ステートターン操作|CtrlStateTurn):(\d+)([+-]\d+)(?:ターン|Turn)?>/)) {
					var type = '';
					switch (RegExp.$1) {
						case '被':
						case 'Receive':
							type = 'receive';
							break;
						case '与':
						case 'Add':
							type = 'add';
							break;
					}
					item._ctrlStateTurn[type + ',' + RegExp.$2] = Number(RegExp.$3);
				}
			}
		}
		return item._ctrlStateTurn;
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GAction_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
	Game_Action.prototype.itemEffectAddState = function (target, effect) {
		$gameTemp._stateTurnItem = this.item();
		__GAction_itemEffectAddState.call(this, target, effect);
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GBBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
	Game_BattlerBase.prototype.resetStateCounts = function (stateId) {
		__GBBase_resetStateCounts.call(this, stateId);
		this._stateTurns[stateId] += this.addExtendStateTurns(stateId);
		this._stateTurns[stateId] += this.receiveExtendStateTurns(stateId);
		this._stateTurns[stateId] = Math.max(this._stateTurns[stateId], 1);
	};

	Game_BattlerBase.prototype.addExtendStateTurns = function (stateId) {
		if (!$gameParty.inBattle()) { return 0 }
		var subject = BattleManager._subject;
		if (!subject) { return 0 }
		var item = $gameTemp._stateTurnItem;
		if (!item) { return 0 }
		var stateTurns = JsonEx.makeDeepCopy(DataManager.ctrlStateTurn(item));
		subject.traitObjects().forEach(function (to) {
			var st = DataManager.ctrlStateTurn(to);
			for (key in st) {
				if (stateTurns[key] === undefined) { stateTurns[key] = 0 }
				stateTurns[key] += st[key];
			}
		}.bind(this));
		var key = 'add,' + stateId;
		return stateTurns[key] || 0;
	};

	Game_BattlerBase.prototype.receiveExtendStateTurns = function (stateId) {
		var stateTurns = {};
		this.traitObjects().forEach(function (to) {
			var st = DataManager.ctrlStateTurn(to);
			for (key in st) {
				if (stateTurns[key] === undefined) { stateTurns[key] = 0 }
				stateTurns[key] += st[key];
			}
		}.bind(this));
		var key = 'receive,' + stateId;
		return stateTurns[key] || 0;
	};
}());