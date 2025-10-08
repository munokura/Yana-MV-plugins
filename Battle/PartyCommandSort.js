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
@plugindesc ver1.00/Reorder party commands.
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
Usage
-----------------------------------------------------
Specify the order using the plugin parameters.
Use the symbols for each command to specify the order.
The symbols are:

fight
escape
stateHelp
formation
log

To search for symbols in other plugins, search within the plugin for addCommand.
In Window_PartyCommand,
addCommand(○○○,×××,△△△)
the ××× part is the symbol. (△△△ may not be present.)
* State details, sorting, logging, etc. are only available if the corresponding plugins are installed.

Additionally, the switch ID specified in EnableSwitches + the sort order in SortList - 1
will be set to the switch corresponding to the permission state of each command.
If SortList is fight, escape, stateHelp and EnableSwitches is 40,
the values ​​will be 40 = fight, 41 = escape, 42 = state details.

In this case, commands that do not meet the permitted conditions will disappear from the party command list.
When this plugin is installed and its functionality is activated, if the specified switch has never been accessed (null or undefined), it will automatically be set to true.

-----------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released

@param SortList
@desc A list of party commands.
@default fight,escape,stateHelp,formation,log

@param EnableSwitches
@desc This switch is used at the beginning, followed by as many switches as there are commands. Each command can be used only when the switch is ON.
@default 40
*/


/*:ja
@plugindesc ver1.00/パーティコマンドを並び替えます。
@author Yana

@help
使用方法
------------------------------------------------------
プラグインパラメータで、並び順を指定します。
指定には、各コマンドのシンボルを使用します。
それぞれのシンボルは、

戦う→fight
逃げる→escape
ステート詳細→stateHelp
並び替え→formation
ログ→log

となっています。
他のプラグインで、シンボルを探すときは、プラグイン内を
addCommandで検索して、
Window_PartyCommand内の
addCommand(○○○,×××,△△△)
となっている、×××の部分がシンボルになります。(△△△は無いことがあります)
※ステート詳細、並び替え、ログなどは、それぞれ、それを追加するプラグインが
導入されている場合限定です。

また、EnableSwitchesで指定しているスイッチID+SortListの並び順-1が、
それぞれのコマンドの許可状態に対応したスイッチに設定されます。
SortListがfight,escape,stateHelpで、EnableSwitchesが40の場合は、
40=戦う,41=逃げる,42=ステート詳細となります。

この際、許可状態を満たさないコマンドはパーティコマンドのリストより消えます。
導入されてこのプラグインの機能が働いた時点で、指定されたスイッチがアクセス
されたことのない状態(nullまたはundefined)の場合、自動的にtrueが
セットされます。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param SortList
@desc パーティコマンドの並びリストです。
@default fight,escape,stateHelp,formation,log

@param EnableSwitches
@desc このスイッチを先頭にしてコマンドの数だけスイッチを使用します。 各スイッチがONのときのみ、そのコマンドが使用できます。
@default 40
*/

(function () {
	////////////////////////////////////////////////////////////////////////////////////

	var parameters = PluginManager.parameters('PartyCommandSort');
	var sortList = String(parameters['SortList']).split(',');
	var enableSwitches = Number(parameters['EnableSwitches']);

	////////////////////////////////////////////////////////////////////////////////////

	var __WPCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
	Window_PartyCommand.prototype.makeCommandList = function () {
		__WPCommand_makeCommandList.call(this);
		var result = [];
		for (var i = 0, max = sortList.length; i < max; i++) {
			var s = sortList[i];
			var id = enableSwitches + i;
			if ($gameSwitches._data[id] === null || $gameSwitches._data[id] === undefined) {
				$gameSwitches._data[id] = true;
			}
			var sw = $gameSwitches.value(id);
			this._list.forEach(function (l) {
				if (l.symbol === s) {
					if (sw) { result.push(l) }
				}
			}.bind(this));
		}
		this._list = result;
	};

	////////////////////////////////////////////////////////////////////////////////////
}());