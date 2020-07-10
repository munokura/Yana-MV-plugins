//
//  マップ解除ステート ver1.00
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
Imported['MapRemoveState'] = 1.00;
/*:
 * @plugindesc ver1.00/指定されたマップに入った時、設定されたステートを解除します。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * マップのメモに
 * <解除ステート:x,x,x…>
 * または、
 * <RemoveState:x,x,x…>
 * と記述すると、そのマップに入った時IDx番のステートを解除します。
 * xは複数指定することができます。
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
	
	var parameters = PluginManager.parameters('MapRemoveState');
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __DManager_loadGame = DataManager.loadGame;
	DataManager.loadGame = function(savefileId) {
		var result = __DManager_loadGame.call(this,savefileId);
		$gameTemp._rsLoadGame = true;
		return result;
	};
	
	DataManager.removeMapStates = function(map) {
		if (!map.meta){ return [] }
		if (map.removeMapStates === undefined){
			map._removeMapStates = [];
			if (!!map.meta['解除ステート']){ map._removeMapStates = map.meta['解除ステート'].split(',') }
			if (!!map.meta['RemoveState']){ map._removeMapStates = map.meta['RemoveState'].split(',') }
			for (var i=0,max=map._removeMapStates.length;i<max;i++){
				map._removeMapStates[i] = Number(map._removeMapStates[i]);
			}
		}
		return map._removeMapStates;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	Game_Map.prototype.removeMapStates = function() {
		return DataManager.removeMapStates($dataMap);
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __GPlayer_performTransfer = Game_Player.prototype.performTransfer;
	Game_Player.prototype.performTransfer = function() {
		__GPlayer_performTransfer.call(this);
		if (!$gameTemp._rsLoadGame){
			$gameParty.removeMapStates();
		} else {
			$gameTemp._rsLoadGame = false;
		}
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	Game_Party.prototype.removeMapStates = function() {
		$gameMap.removeMapStates().forEach(function(rs){
			this.members().forEach(function(actor){
				actor.removeState(rs);
			}.bind(this));
		}.bind(this));
	};
	
	////////////////////////////////////////////////////////////////////////////////////
}());