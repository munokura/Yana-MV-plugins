//
//  ビークルコモン ver1.00
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
Imported['VehicleCommon'] = 1.00;
/*:
@target MZ MV
@plugindesc ver1.00/Reservations for common events will be made when getting on and off vehicles.
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Map_Message/VehicleCommon.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/Yana-MV-plugins ).
Original plugin by Yana.
-----
------------------------------------------------------
How to Use
------------------------------------------------------
Install it and set the plugin parameters to run it.

-----------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver. 1.00:
Released

@param On Boat Common ID
@text Common event when boarding a Boat
@desc This is the ID of the common event that is executed when boarding a Boat.
@default 0
@type common_event

@param On Ship Common ID
@text Common event when boarding a Ship
@desc This is the ID of the common event that is executed when boarding a Ship.
@default 0
@type common_event

@param On Airship Common ID
@text Common event when boarding the Airship
@desc This is the ID of the common event that will be executed when boarding an Airship.
@default 0
@type common_event

@param Off Boat Common ID
@text Common event when a Boat leaves
@desc This is the ID of the common event that occurs when you disembark from a Boat.
@default 0
@type common_event

@param Off Ship Common ID
@text Common event when a Ship leaves
@desc This is the ID of the common event that occurs when disembarking from a Ship.
@default 0
@type common_event

@param Off Airship Common ID
@text Airship departure common event
@desc This is the ID of the common event that will be executed when you get off the Airship.
@default 0
@type common_event
*/


/*:ja
@target MZ MV
@plugindesc ver1.00/乗り物へ乗降時に、コモンイベントを予約します。
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Map_Message/VehicleCommon.js
@license MIT License

@help
------------------------------------------------------
使用方法
------------------------------------------------------
 導入して、プラグインパラメータを設定することで動作します。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param On Boat Common ID
@text 小型船乗込時コモンイベント
@desc 小型船に乗った時に実行するコモンイベントのIDです。
@default 0
@type common_event

@param On Ship Common ID
@text 大型船乗込時コモンイベント
@desc 大型船に乗った時に実行するコモンイベントのIDです。
@default 0
@type common_event

@param On Airship Common ID
@text 飛行船乗込時コモンイベント
@desc 飛行船に乗った時に実行するコモンイベントのIDです。
@default 0
@type common_event

@param Off Boat Common ID
@text 小型船離去時コモンイベント
@desc 小型船から降りた時に実行するコモンイベントのIDです。
@default 0
@type common_event

@param Off Ship Common ID
@text 大型船離去時コモンイベント
@desc 大型船から降りた時に実行するコモンイベントのIDです。
@default 0
@type common_event

@param Off Airship Common ID
@text 飛行船離去時コモンイベント
@desc 飛行船から降りた時に実行するコモンイベントのIDです。
@default 0
@type common_event
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('VehicleCommon');
    var onCommonId = [Number(parameters['On Boat Common ID']),
    Number(parameters['On Ship Common ID']),
    Number(parameters['On Airship Common ID'])
    ];
    var offCommonId = [Number(parameters['Off Boat Common ID']),
    Number(parameters['Off Ship Common ID']),
    Number(parameters['Off Airship Common ID'])
    ];

    ////////////////////////////////////////////////////////////////////////////////////

    var __GVehicle_getOn = Game_Vehicle.prototype.getOn;
    Game_Vehicle.prototype.getOn = function () {
        __GVehicle_getOn.call(this);
        if (this.isBoat() && onCommonId[0]) $gameTemp.reserveCommonEvent(onCommonId[0]);
        if (this.isShip() && onCommonId[1]) $gameTemp.reserveCommonEvent(onCommonId[1]);
        if (this.isAirship() && onCommonId[2]) $gameTemp.reserveCommonEvent(onCommonId[2]);
    };

    var __GVehicle_getOff = Game_Vehicle.prototype.getOff;
    Game_Vehicle.prototype.getOff = function () {
        __GVehicle_getOff.call(this);
        if (this.isBoat() && offCommonId[0]) $gameTemp.reserveCommonEvent(offCommonId[0]);
        if (this.isShip() && offCommonId[1]) $gameTemp.reserveCommonEvent(offCommonId[1]);
        if (this.isAirship() && offCommonId[2]) $gameTemp.reserveCommonEvent(offCommonId[2]);
    };
}());