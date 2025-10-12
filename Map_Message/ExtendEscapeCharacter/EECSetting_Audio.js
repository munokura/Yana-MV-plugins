//
//  制御文字拡張オーディオ設定 ver1.01
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
Imported['EECSetting_Audio'] = 1.00;
/*:
@plugindesc ver1.00/A plugin for defining audio for control character extensions.
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
A plugin for defining control characters for ExtendEscapeCharacters.js.
Defines audio.

--------------------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released

@param BGM Basic Setting
@desc These are the basic settings for BGM. Set the volume, pitch, and phase in this order.
@default 90,100,0

@param BGM1
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM2
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM3
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM4
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM5
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM6
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM7
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM8
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM9
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM10
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM11
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM12
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM13
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM14
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM15
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM16
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM17
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM18
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM19
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param BGM20
@desc The file name of the BGM.
@type file
@require 1
@dir audio/bgm/

@param ---------------

@param SE Basic Setting
@desc This is the basic setting for SE. Set the volume, pitch, and phase in this order.
@default 90,100,0

@param SE1
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE2
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE3
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE4
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE5
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE6
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE7
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE8
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE9
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE10
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE11
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE12
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE13
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE14
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE15
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE16
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE17
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE18
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE19
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param SE20
@desc The file name of the SE.
@type file
@require 1
@dir audio/se/

@param ---------------

@param BGS Basic Setting
@desc This is the basic setting for BGS. Set the following in this order: volume, pitch, phase.
@default 90,100,0

@param BGS1
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS2
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS3
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS4
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS5
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS6
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS7
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS8
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS9
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS10
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS11
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS12
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS13
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS14
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS15
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS16
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS17
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS18
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS19
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param BGS20
@desc The file name of the BGS.
@type file
@require 1
@dir audio/bgs/

@param ---------------

@param ME Basic Setting
@desc This is the basic setting for ME. Set the volume, pitch, and pan in this order.
@default 90,100,0

@param ME1
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME2
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME3
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME4
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME5
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME6
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME7
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME8
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME9
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME10
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME12
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME13
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME14
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME15
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME16
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME17
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME18
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME19
@desc The ME file name.
@type file
@require 1
@dir audio/me/

@param ME20
@desc The ME file name.
@type file
@require 1
@dir audio/me/
*/


/*:ja
@plugindesc ver1.00/制御文字拡張用のオーディオを定義するためのプラグインです。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
ExtendEscapeCharacters.js 用の制御文字を定義するためのプラグインです。
オーディオを定義します。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param BGM Basic Setting
@desc BGMの基本設定です。 ボリューム,ピッチ,位相の順番で設定してください。
@default 90,100,0

@param BGM1
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM2
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM3
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM4
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM5
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM6
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM7
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM8
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM9
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM10
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM11
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM12
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM13
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM14
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM15
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM16
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM17
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM18
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM19
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param BGM20
@desc BGMのファイル名です。
@type file
@require 1
@dir audio/bgm/

@param ---------------

@param SE Basic Setting
@desc SEの基本設定です。 ボリューム,ピッチ,位相の順番で設定してください。
@default 90,100,0

@param SE1
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE2
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE3
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE4
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE5
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE6
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE7
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE8
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE9
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE10
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE11
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE12
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE13
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE14
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE15
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE16
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE17
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE18
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE19
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param SE20
@desc SEのファイル名です。
@type file
@require 1
@dir audio/se/

@param ---------------

@param BGS Basic Setting
@desc BGSの基本設定です。 ボリューム,ピッチ,位相の順番で設定してください。
@default 90,100,0

@param BGS1
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS2
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS3
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS4
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS5
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS6
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS7
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS8
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS9
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS10
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS11
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS12
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS13
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS14
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS15
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS16
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS17
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS18
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS19
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param BGS20
@desc BGSのファイル名です。
@type file
@require 1
@dir audio/bgs/

@param ---------------

@param ME Basic Setting
@desc MEの基本設定です。 ボリューム,ピッチ,パンの順番で設定してください。
@default 90,100,0

@param ME1
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME2
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME3
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME4
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME5
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME6
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME7
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME8
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME9
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME10
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME12
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME13
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME14
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME15
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME16
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME17
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME18
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME19
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/

@param ME20
@desc MEのファイル名です。
@type file
@require 1
@dir audio/me/
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('EECSetting_Audio');

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Temp.prototype.bgmSetting = function () {
        return parameters['BGM Basic Setting'].split(',').map(function (n) { return Number(n) });
    };

    Game_Temp.prototype.eecBgm = function (index) {
        if (this._eecBgm) { return this._eecBgm[index] }
        this._eecBgm = [];
        for (var i = 1; i < 21; i++) { this._eecBgm[i] = parameters['BGM' + i] }
        return this._eecBgm[index];
    };

    Game_Temp.prototype.seSetting = function () {
        return parameters['SE Basic Setting'].split(',').map(function (n) { return Number(n) });
    };

    Game_Temp.prototype.eecSe = function (index) {
        if (this._eecSe) { return this._eecSe[index] }
        this._eecSe = [];
        for (var i = 1; i < 21; i++) { this._eecSe[i] = parameters['SE' + i] }
        return this._eecSe[index];
    };

    Game_Temp.prototype.bgsSetting = function () {
        return parameters['BGS Basic Setting'].split(',').map(function (n) { return Number(n) });
    };

    Game_Temp.prototype.eecBgs = function (index) {
        if (this._eecBgs) { return this._eecBgs[index] }
        this._eecBgs = [];
        for (var i = 1; i < 21; i++) { this._eecBgs[i] = parameters['BGS' + i] }
        return this._eecBgs[index];
    };

    Game_Temp.prototype.meSetting = function () {
        return parameters['ME Basic Setting'].split(',').map(function (n) { return Number(n) });
    };

    Game_Temp.prototype.eecMe = function (index) {
        if (this._eecMe) { return this._eecMe[index] }
        this._eecMe = [];
        for (var i = 1; i < 21; i++) { this._eecMe[i] = parameters['ME' + i] }
        return this._eecMe[index];
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());