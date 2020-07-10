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
 * @plugindesc ver1.00/場所移動時や戦闘開始時、戦闘終了時等にコモンイベントを予約します。
 * @author Yana
 * 
 * @param TransferCommonID
 * @desc 場所移動時に予約するコモンイベントのIDです。
 * @default 10
 * 
 * @param BattleStartCommonID
 * @desc 戦闘開始時に予約するコモンイベントのIDです。
 * @default 11
 * 
 * @param BattleEndCommonID
 * @desc 戦闘終了時時に予約するコモンイベントのIDです。
 * @default 12
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * プラグインパラメータで各タイミングで発動するコモンイベントのIDを設定すると、
 * そのコモンイベントが設定したタイミングで発動を予約されます。
 * 
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.00:
 * 公開
 */

(function(){
	////////////////////////////////////////////////////////////////////////////////////
	
	var parameters = PluginManager.parameters('TimingInvokeCommon');
	var transferCommonId = Number(parameters['TransferCommonID'] || 0);
	var battleStartCommonId = Number(parameters['BattleStartCommonID'] || 0);
	var battleEndCommonId = Number(parameters['BattleEndCommonID'] || 0);

	////////////////////////////////////////////////////////////////////////////////////
	
	var __BManager_startBattle = BattleManager.startBattle;
	BattleManager.startBattle = function() {
		__BManager_startBattle.call(this);
		if (battleStartCommonId > 0){
			$gameTemp.reserveCommonEvent(battleStartCommonId);
		}
	};
	
	var __BManager_endBattle = BattleManager.endBattle;
	BattleManager.endBattle = function(result) {
		__BManager_endBattle.call(this,result);
		if (battleEndCommonId > 0){
			$gameTemp.reserveCommonEvent(battleEndCommonId);
		}
	};

	////////////////////////////////////////////////////////////////////////////////////
	
	var __GInterpreter_command201 = Game_Interpreter.prototype.command201;
	Game_Interpreter.prototype.command201 = function() {
		__GInterpreter_command201.call(this);
		if (transferCommonId > 0){
			$gameTemp.reserveCommonEvent(transferCommonId);
		}
	};
	
	////////////////////////////////////////////////////////////////////////////////////
}());