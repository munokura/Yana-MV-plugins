//
//  特定タイミング発動コモン ver1.00
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
Imported['TimingInvokeCommon'] = 1.00;
/*:
@plugindesc ver1.00/Common events are scheduled when moving between locations, starting or ending battles, etc.
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
By setting the ID of a common event to be triggered at a specific timing in the plugin parameters,
that common event will be scheduled to trigger at the specified timing.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver. 1.00:
Released

@param TransferCommonID
@desc This is the ID of the common event to reserve when moving locations.
@type common_event
@default 10

@param BattleStartCommonID
@desc This is the ID of the common event to reserve at the start of the battle.
@type common_event
@default 11

@param BattleEndCommonID
@desc This is the ID of the common event to reserve at the end of the battle.
@type common_event
@default 12
*/


/*:ja
@plugindesc ver1.00/場所移動時や戦闘開始時、戦闘終了時等にコモンイベントを予約します。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
使用方法
------------------------------------------------------
プラグインパラメータで各タイミングで発動するコモンイベントのIDを設定すると、
そのコモンイベントが設定したタイミングで発動を予約されます。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param TransferCommonID
@desc 場所移動時に予約するコモンイベントのIDです。
@type common_event
@default 10

@param BattleStartCommonID
@desc 戦闘開始時に予約するコモンイベントのIDです。
@type common_event
@default 11

@param BattleEndCommonID
@desc 戦闘終了時時に予約するコモンイベントのIDです。
@type common_event
@default 12
*/

(function () {
	////////////////////////////////////////////////////////////////////////////////////

	var parameters = PluginManager.parameters('TimingInvokeCommon');
	var transferCommonId = Number(parameters['TransferCommonID'] || 0);
	var battleStartCommonId = Number(parameters['BattleStartCommonID'] || 0);
	var battleEndCommonId = Number(parameters['BattleEndCommonID'] || 0);

	////////////////////////////////////////////////////////////////////////////////////

	var __BManager_startBattle = BattleManager.startBattle;
	BattleManager.startBattle = function () {
		__BManager_startBattle.call(this);
		if (battleStartCommonId > 0) {
			$gameTemp.reserveCommonEvent(battleStartCommonId);
		}
	};

	var __BManager_endBattle = BattleManager.endBattle;
	BattleManager.endBattle = function (result) {
		__BManager_endBattle.call(this, result);
		if (battleEndCommonId > 0) {
			$gameTemp.reserveCommonEvent(battleEndCommonId);
		}
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GInterpreter_command201 = Game_Interpreter.prototype.command201;
	Game_Interpreter.prototype.command201 = function () {
		__GInterpreter_command201.call(this);
		if (transferCommonId > 0) {
			$gameTemp.reserveCommonEvent(transferCommonId);
		}
	};

	////////////////////////////////////////////////////////////////////////////////////
}());