//
//  ステートグループ ver1.00
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
Imported['StateGroup'] = 1.00;
/*:
@plugindesc ver1.00/Makes it possible to manage multiple states as a group.
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
If you enter
<StateGroup:x,y%,z%>
in the state Note field, when an effect that removes state ID x occurs, the set state will be removed with a probability of y% of the original removal rate.
You can also set z% of the resistance of state ID x (100 minus the effectiveness) as the resistance for the set state.

Example:
If you set the Poison state to 
<StateGroup:PoisonStateID,50%,30%>
when an action that removes the Poison state 100% occurs, there is a 50% chance that Poison will also be removed.
When the effectiveness of the Poison state is 0%, the resistance to the Poison state is (100-0)*0.3=30%,
which sets the effectiveness to 70%.

-----------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT license.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
Ver. 1.00:
Released
*/


/*:ja
@plugindesc ver1.00/複数のステートをグループとして管理することができるようにします。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
使用方法
------------------------------------------------------
ステートのメモ欄に
<ステートグループ:x,y%,z%>
または、
<StateGroup:x,y%,z%>
と記述すると、IDx番のステートを解除する効果が発生したとき、元の解除率のy%の確率で、
設定されたステートが解除されます。
また、IDx番のステートの耐性(100から有効度を引いた数値)のz%を設定されたステートの
耐性として設定することができます。

例:
猛毒ステートに<ステートグループ:毒ステートのID,50%,30%>と設定すると、
毒ステートを100%解除する行動を受けたとき、50%の確率で猛毒も解除され、
毒ステートの有効度が0%の時、猛毒ステートの耐性は、(100-0)*0.3=30%となり、
有効度70%として設定されます。

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

	var parameters = PluginManager.parameters('StateGroup');

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.stateGroup = function (state) {
		if (state._stateGroup === undefined) {
			var texts = state.note.split('\n');
			state._stateGroup = {};
			for (var i = 0; i < texts.length; i++) {
				var text = texts[i];
				if (!!text.match(/<(?:ステートグループ|StateGroup):(\d+),(\d+)[%％]?(?:,(\d+)[%％]?)?>/)) {
					state._stateGroup[Number(RegExp.$1)] = [Number(RegExp.$2), Number(RegExp.$3)];
				}
			}
		}
		return state._stateGroup;
	};
	////////////////////////////////////////////////////////////////////////////////////

	Game_Temp.prototype.stateGroup = function (stateId) {
		if (this._stateGroup === undefined) {
			this._stateGroup = {};
			$dataStates.forEach(function (state) {
				if (state) {
					var group = DataManager.stateGroup(state);
					for (var i in group) {
						if (this._stateGroup[i] === undefined) { this._stateGroup[i] = [] }
						this._stateGroup[i].push(state.id);
					}
				}
			}.bind(this));
		}
		return this._stateGroup[stateId];
	}

	////////////////////////////////////////////////////////////////////////////////////

	var __GBBase_stateRate = Game_BattlerBase.prototype.stateRate;
	Game_BattlerBase.prototype.stateRate = function (stateId) {
		if (!$dataStates[stateId]) { return 0 }
		var result = __GBBase_stateRate.call(this, stateId);
		var group = DataManager.stateGroup($dataStates[stateId]);
		for (i in group) {
			var g = group[i];
			var br = __GBBase_stateRate.call(this, Number(i));
			if (g[1] !== 0) {
				var nr = 1 - br;
				var rr = Math.max(1 - (nr * (g[1] / 100)), 0);
				result = result * rr;
			}
		}
		return result;
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GAction_itemEffectRemoveState = Game_Action.prototype.itemEffectRemoveState;
	Game_Action.prototype.itemEffectRemoveState = function (target, effect) {
		__GAction_itemEffectRemoveState.call(this, target, effect);
		if ($gameTemp.stateGroup(effect.dataId)) {
			var group = $gameTemp.stateGroup(effect.dataId);
			for (var i = 0; i < group.length; i++) {
				var id = group[i];
				var state = $dataStates[id];
				var sg = DataManager.stateGroup(state);
				var chance = effect.value1 * (sg[effect.dataId][0] * 0.01);
				if (Math.random() < chance) {
					target.removeState(id);
					this.makeSuccess(target);
				}
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////////

}());