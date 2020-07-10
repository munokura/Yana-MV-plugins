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
 * @plugindesc ver1.00/マップにそのマップ内にいる限り付与され続けるステートを設定できるようにします。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * マップのメモ欄に
 * <マップステート:xy>
 * または、
 * <MapState:xy>
 * と記述すると、そのマップにいる限り、xの対象にIDy番のステートが付与され続けます。
 * xには、APEが指定できます。
 * APEにはそれぞれ、
 * A:敵味方すべて　P:パーティメンバーすべて E:エネミーすべて
 * が指定できます。
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
 * ver1.01:
 * イベントテストが正常に動作しないバグを修正。
 * ver1.00:
 * 公開
 */

(function(){
	////////////////////////////////////////////////////////////////////////////////////
	
	var parameters = PluginManager.parameters('MapState');
	
	////////////////////////////////////////////////////////////////////////////////////
	
	DataManager.mapState = function(map) {
		if (!map){ return [] }
		if (!map.meta){ return [] }
		if (map._mapStates === undefined){
			map._mapStates = [];
			var texts = map.note.split('\n');
			for (var i=0,max=texts.length;i<max;i++){
				var text = texts[i];
				if (text.match(/<(?:マップステート|MapState):([EPA])(\d+)>/)){
					map._mapStates.push([RegExp.$1,Number(RegExp.$2)]);
				}
			}
		}
		return map._mapStates;
	};
	
	var __DManager_loadMapData = DataManager.loadMapData;
	DataManager.loadMapData = function(mapId) {
		var result = __DManager_loadMapData.call(this,mapId);
		if (result){ $gameParty.addMapStates() }
		return result;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __GMap_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function(mapId) {
		__GMap_setup.call(this,mapId);
		$gameParty.addMapStates();
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	Game_Party.prototype.addMapStates = function() {
		var mapStates = DataManager.mapState($dataMap);
		$gameParty.allMembers().forEach(function(m){
			mapStates.forEach(function(state){
				if (state[0] !== 'E'){
					m._result.clear();
					m.addState(state[1])
				}
			}.bind(this));
		}.bind(this));
	};
	
	////////////////////////////////////////////////////////////////////////////////////
		
	var __GBBase_clearStates = Game_BattlerBase.prototype.clearStates;
	Game_BattlerBase.prototype.clearStates = function() {
		var states = this._states ? this._states.clone() : [];
		var turns = this._stateTurns ? JsonEx.makeDeepCopy(this._stateTurns) : {};
		__GBBase_clearStates.call(this);
		if (states.length < 1){ return }
		var mapStates = DataManager.mapState($dataMap);
		for(var i=0,max=mapStates.length;i<max;i++){
			var state = mapStates[i][1];
			if (states.contains(state)){
				this._states.push(state);
				this._stateTurns[state] = turns[state];
			}
		}
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __GBattler_removeState = Game_Battler.prototype.removeState;
	Game_Battler.prototype.removeState = function(stateId) {
		if ($dataMap){
			var mapStates = DataManager.mapState($dataMap);
			for (var i=0,max=mapStates.length;i<max;i++) {
				var state = mapStates[i];
				if (state[1] !== stateId){ continue }
				if (state[0] === 'A' || this.isActor() && state[0] === 'P' ||
					this.isEnemy() && state[0] === 'E'){
					this.resetStateCounts(stateId);
					return;
				}
			}
		}
		__GBattler_removeState.call(this,stateId);
	};

	////////////////////////////////////////////////////////////////////////////////////
		
	var __GEnemy_setup = Game_Enemy.prototype.setup;
	Game_Enemy.prototype.setup = function(enemyId, x, y) {
		__GEnemy_setup.call(this,enemyId,x,y);
		var mapStates = DataManager.mapState($dataMap);
		mapStates.forEach(function(state){
			if (state[0] === 'A' || state[0] === 'E'){ this.addState(state[1]) }
		}.bind(this));
	};

	////////////////////////////////////////////////////////////////////////////////////
}());