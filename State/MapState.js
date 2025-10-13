//
//  マップステート ver1.00
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
Imported['MapState'] = 1.00;
/*:
@plugindesc ver1.00/It will now be possible to set a state on a map that will remain applied as long as you are within that map.
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
By entering
<MapState:xy>
in the map's Note field, the target x will be given the state ID y as long as it remains on that map.
x can be an APE.
APEs can be:
A: All allies and enemies
P: All party members
E: All enemies

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver 1.01:
Fixed a bug that prevented event testing from working properly.
ver 1.00:
Released
*/


/*:ja
@plugindesc ver1.00/マップにそのマップ内にいる限り付与され続けるステートを設定できるようにします。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
使用方法
------------------------------------------------------
マップのメモ欄に
<マップステート:xy>
または、
<MapState:xy>
と記述すると、そのマップにいる限り、xの対象にIDy番のステートが付与され続けます。
xには、APEが指定できます。
APEにはそれぞれ、
A:敵味方すべて　P:パーティメンバーすべて E:エネミーすべて
が指定できます。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.01:
イベントテストが正常に動作しないバグを修正。
ver1.00:
公開
*/

(function () {
	////////////////////////////////////////////////////////////////////////////////////

	var parameters = PluginManager.parameters('MapState');

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.mapState = function (map) {
		if (!map) { return [] }
		if (!map.meta) { return [] }
		if (map._mapStates === undefined) {
			map._mapStates = [];
			var texts = map.note.split('\n');
			for (var i = 0, max = texts.length; i < max; i++) {
				var text = texts[i];
				if (text.match(/<(?:マップステート|MapState):([EPA])(\d+)>/)) {
					map._mapStates.push([RegExp.$1, Number(RegExp.$2)]);
				}
			}
		}
		return map._mapStates;
	};

	var __DManager_loadMapData = DataManager.loadMapData;
	DataManager.loadMapData = function (mapId) {
		var result = __DManager_loadMapData.call(this, mapId);
		if (result) { $gameParty.addMapStates() }
		return result;
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GMap_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function (mapId) {
		__GMap_setup.call(this, mapId);
		$gameParty.addMapStates();
	};

	////////////////////////////////////////////////////////////////////////////////////

	Game_Party.prototype.addMapStates = function () {
		var mapStates = DataManager.mapState($dataMap);
		$gameParty.allMembers().forEach(function (m) {
			mapStates.forEach(function (state) {
				if (state[0] !== 'E') {
					m._result.clear();
					m.addState(state[1])
				}
			}.bind(this));
		}.bind(this));
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GBBase_clearStates = Game_BattlerBase.prototype.clearStates;
	Game_BattlerBase.prototype.clearStates = function () {
		var states = this._states ? this._states.clone() : [];
		var turns = this._stateTurns ? JsonEx.makeDeepCopy(this._stateTurns) : {};
		__GBBase_clearStates.call(this);
		if (states.length < 1) { return }
		var mapStates = DataManager.mapState($dataMap);
		for (var i = 0, max = mapStates.length; i < max; i++) {
			var state = mapStates[i][1];
			if (states.contains(state)) {
				this._states.push(state);
				this._stateTurns[state] = turns[state];
			}
		}
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GBattler_removeState = Game_Battler.prototype.removeState;
	Game_Battler.prototype.removeState = function (stateId) {
		if ($dataMap) {
			var mapStates = DataManager.mapState($dataMap);
			for (var i = 0, max = mapStates.length; i < max; i++) {
				var state = mapStates[i];
				if (state[1] !== stateId) { continue }
				if (state[0] === 'A' || this.isActor() && state[0] === 'P' ||
					this.isEnemy() && state[0] === 'E') {
					this.resetStateCounts(stateId);
					return;
				}
			}
		}
		__GBattler_removeState.call(this, stateId);
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GEnemy_setup = Game_Enemy.prototype.setup;
	Game_Enemy.prototype.setup = function (enemyId, x, y) {
		__GEnemy_setup.call(this, enemyId, x, y);
		var mapStates = DataManager.mapState($dataMap);
		mapStates.forEach(function (state) {
			if (state[0] === 'A' || state[0] === 'E') { this.addState(state[1]) }
		}.bind(this));
	};

	////////////////////////////////////////////////////////////////////////////////////
}());