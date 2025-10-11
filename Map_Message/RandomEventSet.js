//
//  イベントランダム配置 ver1.03
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
Imported['RandomEventSet'] = 1.03;
/*:
@plugindesc ver1.03/Event locations will be moved randomly when moving locations.
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
Plugin Commands
--------------------------------------------------------------------
*Please enter spaces using half-width characters.

- Moves events set for random movement to a random location.
RandomSet

- Moves events set for a random region to a random location.
RegionSet

---------------------------------------------------------
How to Set
------------------------------------------------------
Write
<RandomSetKey>
or
<RegionSetKey:x>
in the event's Note field.

Events set with this description will be moved to a random location when you use a plugin command for random movement or
move the location with the corresponding switch turned on.
In the case of a random region, the event will move to one of the tiles with the region ID specified by x.

***About Initializing the Cache***
This plugin records the event's location in the save data to recreate the event's location.
This is called a cache, and using this plugin for random movement in multiple locations
will cause the cache to grow.
Therefore, to prevent save data from becoming bloated,
please initialize the cache by turning on the switch set by InitTransfer at a specific time.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.03:180917
Added explanation about caching.
ver1.021:180410
Updated plugin parameter specifications to 1.5.0.
ver1.02:
Fixed a bug that could cause an error.
ver1.01:
Fixed a bug that prevented the cache initialization function from working properly.
ver1.00:
Released

@param RandomSetSwitchID
@desc By turning on the switch for this ID and moving the location, the randomly placed event will be moved to a random location.
@default 21
@type switch

@param RegionSetSwitchID
@desc By turning on the switch for this ID and moving the location, the event in the random region will be moved to a random position.
@default 22
@type switch

@param Init Transfer
@desc By turning on the switch for this ID and moving to another location, the cache for recording random locations will be initialized.
@default 23
@type switch

@param RandomSetKey
@desc The keyword to use for random movement. Events with this keyword in their notes will be subject to random movement.
@default <RandomSetKey>

@param RegionSetKey
@desc This is the keyword used for random region movement. Events with this keyword in their notes will be subject to region movement.
@default <RegionSetKey:(\d+)>
*/


/*:ja
@plugindesc ver1.03/場所移動時等にイベントの位置をランダムに移動します。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
 プラグインコマンド
------------------------------------------------------
※スペースは必ず半角で入力してください。

・ランダム移動に設定されたイベントをランダムな位置に移動します。
RandomSet

・ランダムリージョンに設定されたイベントをランダムな位置に移動します。
RegionSet

------------------------------------------------------
設定方法
------------------------------------------------------
イベントのメモ欄に
<ランダム配置>
または、
<ランダムリージョン:x>
と記述します。

以上の記述が設定されたイベントはランダム移動を行うプラグインコマンドか、
対象のスイッチをONにした状態で場所移動を行うと、ランダムな位置に移動します。
ランダムリージョンの場合は、xで指定したリージョンIDのタイルのいずれかに移動します。

***キャッシュの初期化について***
このプラグインは、イベントの位置を再現するため、セーブデータにイベントの位置を記録しています。
これをキャッシュと呼び、複数の場所でこのプラグインを使ってランダム移動を行うことで、
このキャッシュが大きくなってしまいます。
そのため、セーブデータの肥大化などを防ぐため、
特定のタイミングでInitTransferで設定されているスイッチをONにして、キャッシュを初期化してください。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.03:180917
キャッシュに関する説明を追加。
ver1.021:180410
プラグインパラメータの仕様を1.5.0に更新。
ver1.02:
エラーが発生することのあるバグを修正。
ver1.01:
キャッシュを初期化する機能が正常に動作していなかったバグを修正
ver1.00:
公開

@param RandomSetSwitchID
@desc このIDのスイッチをONにして、場所移動を行うことで、 ランダム配置のイベントをランダムな位置に移動します。
@default 21
@type switch

@param RegionSetSwitchID
@desc このIDのスイッチをONにして、場所移動を行うことで、 ランダムリージョンのイベントをランダムな位置に移動します。
@default 22
@type switch

@param Init Transfer
@desc このIDのスイッチをONにして、場所移動を行うことで、 ランダム場所記録用のキャッシュを初期化します。
@default 23
@type switch

@param RandomSetKey
@desc ランダム移動に使用するキーワードです。 このキーワードがメモに含まれるイベントがランダム移動の対象になります。
@default <ランダム移動>

@param RegionSetKey
@desc ランダムリージョン移動に使用するキーワードです。 このキーワードがメモに含まれるイベントがリージョン移動の対象になります。
@default <ランダムリージョン:(\d+)>
*/

(function () {

    var parameters = PluginManager.parameters('RandomEventSet');
    var randomSetSwitchId = Number(parameters['RandomSetSwitchID'] || 21);
    var regionSetSwitchId = Number(parameters['RegionSetSwitchID'] || 22);
    var initTransfer = Number(parameters['InitTransfer'] || 23);

    var randomSetKey = RegExp(parameters['RandomSetKey'] || '<ランダム配置>');
    // var regionSetKey = RegExp(parameters['RegionSetKey'] || '<ランダムリージョン:(\\d+)>');
    var regionSetKey = RegExp(parameters['RegionSetKey'] || '<ランダムリージョン:(\\d+)>');

    var _rSet_GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _rSet_GInterpreter_pluginCommand.call(this, command, args);
        if (command === 'RandomSet') {
            this.randomSettingAtAll();
        } else if (command === 'RegionSet') {
            this.randomSettingAtRegion();
        }
    };

    function RandomSetManager() {
        throw new Error('This is a static class');
    };

    RandomSetManager.randomSettingAtAll = function () {
        var events = $gameMap.events();
        for (var i = 0; i < events.length; i++) {
            var e = events[i];
            if (e.event().note.match(randomSetKey)) {
                var x = Math.randomInt($gameMap.width());
                var y = Math.randomInt($gameMap.height());
                while ($gameMap.eventsXy(x, y).length > 0 || !$gameMap.isPassable(x, y, 2)) {
                    x = Math.randomInt($gameMap.width());
                    y = Math.randomInt($gameMap.height());
                }
                this.initCheckRegionArray();
                $gameSystem._regionArray[$gameMap.mapId()][e.eventId()] = [e.eventId(), 0, x, y, 0];
                e.locate(x, y);
            }
        }
    };

    RandomSetManager.randomSettingAtRegion = function () {
        this.clearRegionArray();
        var events = $gameMap.events();
        for (var i = 0; i < events.length; i++) {
            var e = events[i];
            if (e.event().note.match(regionSetKey)) { e.locate(-1, -1) }
        }

        for (var i = 0; i < events.length; i++) {
            var e = events[i];
            if (e.event().note.match(regionSetKey)) {
                var region = Number(RegExp.$1);
                if (this.isCheckExistRegion(region)) {
                    if (!this._regionArray[region]) {
                        this._regionArray[region] = this.makeRegionArray(region);
                    }
                    var l = this._regionArray[region].length;
                    var rn = Math.randomInt(l);
                    var r = this._regionArray[region].splice(rn, 1)[0];
                    while (!r || $gameMap.eventsXy(r[0], r[1]).length > 0) {
                        r = this._regionArray[region].splice(Math.randomInt(l), 1)[0];
                    }
                    this.initCheckRegionArray();
                    $gameSystem._regionArray[$gameMap.mapId()][e.eventId()] = [e.eventId(), 0, r[0], r[1], 0];
                    e.locate(r[0], r[1]);
                }
            }

        }
    };

    RandomSetManager.clearRegionArray = function () {
        this._regionArray = {};
    };

    RandomSetManager.isCheckExistRegion = function (regionId) {
        if (this._existRegion === undefined) { this._existRegion = [] }
        if (this._existRegion.contains(regionId)) { return true }
        for (var iy = 0; iy < $gameMap.height(); iy++) {
            for (var jx = 0; jx < $gameMap.width(); jx++) {
                if ($gameMap.regionId(jx, iy) === regionId) {
                    this._existRegion.push(regionId);
                    return true;
                }
            }
        }
        return false;
    };

    RandomSetManager.makeRegionArray = function (regionId) {
        var result = new Array();
        for (var iy = 0; iy < $gameMap.height(); iy++) {
            for (var jx = 0; jx < $gameMap.width(); jx++) {
                if ($gameMap.regionId(jx, iy) === regionId) { result.push([jx, iy]) }
            }
        }
        return result;
    };

    RandomSetManager.initCheckRegionArray = function () {
        if ($gameSystem._regionArray === undefined) { $gameSystem._regionArray = {} }
        if ($gameSystem._regionArray[$gameMap.mapId()] === undefined) {
            $gameSystem._regionArray[$gameMap.mapId()] = {};
        }
    };

    Game_Interpreter.prototype.randomSettingAtAll = function () {
        RandomSetManager.randomSettingAtAll();
    };

    Game_Interpreter.prototype.randomSettingAtRegion = function () {
        RandomSetManager.randomSettingAtRegion();
    };

    var _RSE_GPlayer_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function () {
        if ($gameSwitches.value(initTransfer)) { $gameSystem.clearRegionArray() }
        if ($gameMap.mapId() === this._newMapId && this.isTransferring()) {
            if ($gameSwitches.value(randomSetSwitchId)) { RandomSetManager.randomSettingAtAll() }
            if ($gameSwitches.value(regionSetSwitchId)) { RandomSetManager.randomSettingAtRegion() }
            $gameSwitches.setValue(randomSetSwitchId, false);
            $gameSwitches.setValue(regionSetSwitchId, false);
        }
        _RSE_GPlayer_performTransfer.call(this);
    };

    Game_System.prototype.clearRegionArray = function () {
        this._regionArray = undefined;
    };

    Game_System.prototype.initRegionArray = function () {
        if (this._regionArray === undefined) { this._regionArray = {} }
    }

    Game_System.prototype.setInitRegionArray = function (mapId) {
        if (this._regionArray === undefined) { this.initRegionArray() }
        if (this._regionArray[mapId] === undefined) { this._regionArray[mapId] = {} }
    };

    var _RSE_GMap_setupEvents = Game_Map.prototype.setupEvents;
    Game_Map.prototype.setupEvents = function () {
        _RSE_GMap_setupEvents.call(this);

        $gameSystem.setInitRegionArray(this.mapId());
        if ($gameSwitches.value(randomSetSwitchId)) { RandomSetManager.randomSettingAtAll() }
        if ($gameSwitches.value(regionSetSwitchId)) { RandomSetManager.randomSettingAtRegion() }
        var events = this.events();
        for (key in $gameSystem._regionArray[this.mapId()]) {
            var value = $gameSystem._regionArray[this.mapId()][key];
            if (!value) { continue }
            for (var i = 0; i < events.length; i++) {
                if (events[i].eventId() == key) {
                    events[i].locate(value[2], value[3]);
                }
            }
        }
        $gameSwitches.setValue(randomSetSwitchId, false);
        $gameSwitches.setValue(regionSetSwitchId, false);
    };
}());