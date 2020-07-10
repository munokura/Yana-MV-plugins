//
//  パーティコマンド並び替え ver1.00
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
Imported['PartyCommandSort'] = 1.00;
/*:
 * @plugindesc ver1.00/パーティコマンドを並び替えます。
 * @author Yana
 * 
 * @param SortList
 * @desc パーティコマンドの並びリストです。
 * @default fight,escape,stateHelp,formation,log
 * 
 * @param EnableSwitches
 * @desc このスイッチを先頭にしてコマンドの数だけスイッチを使用します。
 * 各スイッチがONのときのみ、そのコマンドが使用できます。
 * @default 40
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * プラグインパラメータで、並び順を指定します。
 * 指定には、各コマンドのシンボルを使用します。
 * それぞれのシンボルは、
 * 
 * 戦う→fight
 * 逃げる→escape
 * ステート詳細→stateHelp
 * 並び替え→formation
 * ログ→log
 * 
 * となっています。
 * 他のプラグインで、シンボルを探すときは、プラグイン内を
 * addCommandで検索して、
 * Window_PartyCommand内の
 * addCommand(○○○,×××,△△△)
 * となっている、×××の部分がシンボルになります。(△△△は無いことがあります)
 * ※ステート詳細、並び替え、ログなどは、それぞれ、それを追加するプラグインが
 * 導入されている場合限定です。
 * 
 * また、EnableSwitchesで指定しているスイッチID+SortListの並び順-1が、
 * それぞれのコマンドの許可状態に対応したスイッチに設定されます。
 * SortListがfight,escape,stateHelpで、EnableSwitchesが40の場合は、
 * 40=戦う,41=逃げる,42=ステート詳細となります。
 * 
 * この際、許可状態を満たさないコマンドはパーティコマンドのリストより消えます。
 * 導入されてこのプラグインの機能が働いた時点で、指定されたスイッチがアクセス
 * されたことのない状態(nullまたはundefined)の場合、自動的にtrueが
 * セットされます。
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
	
	var parameters = PluginManager.parameters('PartyCommandSort');
	var sortList = String(parameters['SortList']).split(',');
	var enableSwitches = Number(parameters['EnableSwitches']);
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __WPCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
	Window_PartyCommand.prototype.makeCommandList = function() {
		__WPCommand_makeCommandList.call(this);
		var result = [];
		for (var i=0,max=sortList.length;i<max;i++){
			var s = sortList[i];
			var id = enableSwitches+i;
			if ($gameSwitches._data[id] === null || $gameSwitches._data[id] === undefined){
				$gameSwitches._data[id] = true;
			}
			var sw = $gameSwitches.value(id);
			this._list.forEach(function(l){
				if (l.symbol === s){
					if (sw){ result.push(l) }
				}
			}.bind(this));
		}
		this._list = result;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
}());