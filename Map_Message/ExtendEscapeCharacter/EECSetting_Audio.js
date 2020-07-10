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
 * @plugindesc ver1.00/制御文字拡張用のオーディオを定義するためのプラグインです。
 * @author Yana
 *
 * @param BGM Basic Setting
 * @desc BGMの基本設定です。
 * ボリューム,ピッチ,位相の順番で設定してください。
 * @default 90,100,0
 *
 * @param BGM1
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM2
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM3
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM4
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM5
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM6
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM7
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM8
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM9
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM10
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM11
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM12
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM13
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM14
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM15
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM16
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM17
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM18
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM19
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param BGM20
 * @desc BGMのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param ---------------
 *
 * @param SE Basic Setting
 * @desc SEの基本設定です。
 * ボリューム,ピッチ,位相の順番で設定してください。
 * @default 90,100,0
 *
 * @param SE1
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE2
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE3
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE4
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE5
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE6
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE7
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE8
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE9
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE10
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE11
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE12
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE13
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE14
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE15
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE16
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE17
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE18
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE19
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SE20
 * @desc SEのファイル名です。
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param ---------------
 *
 * @param BGS Basic Setting
 * @desc BGSの基本設定です。
 * ボリューム,ピッチ,位相の順番で設定してください。
 * @default 90,100,0
 *
 * @param BGS1
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS2
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS3
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS4
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS5
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS6
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS7
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS8
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS9
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS10
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS11
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS12
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS13
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS14
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS15
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS16
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS17
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS18
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS19
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param BGS20
 * @desc BGSのファイル名です。
 * @default
 * @require 1
 * @dir audio/bgs/
 * @type file
 *
 * @param ---------------
 *
 * @param ME Basic Setting
 * @desc MEの基本設定です。
 * ボリューム,ピッチ,パンの順番で設定してください。
 * @default 90,100,0
 *
 * @param ME1
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME2
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME3
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME4
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME5
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME6
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME7
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME8
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME9
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME10
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME12
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME13
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME14
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME15
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME16
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME17
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME18
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME19
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param ME20
 * @desc MEのファイル名です。
 * @default
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @help------------------------------------------------------
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

    var parameters = PluginManager.parameters('EECSetting_Audio');

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Temp.prototype.bgmSetting = function() {
        return parameters['BGM Basic Setting'].split(',').map(function(n){ return Number(n) });
    };

    Game_Temp.prototype.eecBgm = function(index) {
        if (this._eecBgm){ return this._eecBgm[index] }
        this._eecBgm = [];
        for (var i=1;i<21;i++) { this._eecBgm[i] = parameters['BGM'+i] }
        return this._eecBgm[index];
    };

    Game_Temp.prototype.seSetting = function() {
        return parameters['SE Basic Setting'].split(',').map(function(n){ return Number(n) });
    };

    Game_Temp.prototype.eecSe = function(index) {
        if (this._eecSe){ return this._eecSe[index] }
        this._eecSe = [];
        for (var i=1;i<21;i++) { this._eecSe[i] = parameters['SE'+i] }
        return this._eecSe[index];
    };

    Game_Temp.prototype.bgsSetting = function() {
        return parameters['BGS Basic Setting'].split(',').map(function(n){ return Number(n) });
    };

    Game_Temp.prototype.eecBgs = function(index) {
        if (this._eecBgs){ return this._eecBgs[index] }
        this._eecBgs = [];
        for (var i=1;i<21;i++) { this._eecBgs[i] = parameters['BGS'+i] }
        return this._eecBgs[index];
    };

    Game_Temp.prototype.meSetting = function() {
        return parameters['ME Basic Setting'].split(',').map(function(n){ return Number(n) });
    };

    Game_Temp.prototype.eecMe = function(index) {
        if (this._eecMe){ return this._eecMe[index] }
        this._eecMe = [];
        for (var i=1;i<21;i++) { this._eecMe[i] = parameters['ME'+i] }
        return this._eecMe[index];
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());