//
// ポイントスクロール ver1.00
//
// ------------------------------------------------------
// Copyright (c) 2017 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author yana
//

var Imported = Imported || {};
Imported['PointScroll'] = 1.00;

/*:
 * @plugindesc ver1.00/ポイントや対象を指定して画面をスクロールします。
 * @author Yana
 *
 * @help------------------------------------------------------
 *  プラグインコマンド
 * ------------------------------------------------------
 * ******************************************************
 * ポイントスクロール x,y duration
 * PointScroll x,y duration
 * ******************************************************
 * 座標x,yにdurationフレーム掛けて画面をスクロールします。
 *
 * ******************************************************
 * ポイントスクロール id duration
 * PointScroll id duration
 * ******************************************************
 * id番のイベントにdurationフレーム掛けて画面をスクロールします。
 * idに0を指定すると起動したイベントを、-1を指定すると、プレイヤーを対象にします。
 *
 * ------------------------------------------------------
 * 使い方
 * ------------------------------------------------------
 * プラグインコマンドを使用するか、
 * $gameMap.setPointScroll(pos, duration)をスクリプトで実行してください。
 * この際、posは[x,y]または[id]のように、配列で渡してください。
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

(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('PointScroll');

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        if (command === 'ポイントスクロール' || command === 'PointScroll') {
            this.setPointScroll(args);
        } else {
            __GInterpreter_pluginCommand.call(this, command, args);
        }
    };

    Game_Interpreter.prototype.setPointScroll = function(args) {
        var pos = args[0].split(',');
        var duration = Number(args[1]);
        $gameMap.setPointScroll(pos, duration);
    };


    var __GInterpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        var waiting = __GInterpreter_updateWaitMode.call(this);
        if (!waiting) waiting = $gameMap.isPointScrolling();
        return waiting;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Map.prototype.isPointScrolling = function() {
        return this._pointScrollDuration > 0;
    };

    Game_Map.prototype.setPointScroll = function(pos, duration) {
        var x = 0;
        var y = 0;
        if (pos.length > 1) {
            x = Number(pos[0]);
            y = Number(pos[1]);
        } else {
            var character = this._interpreter.character(Number(pos[0]));
            x = character.x;
            y = character.y;
        }
        this._targetScrollPointX = x;
        this._targetScrollPointY = y;
        this._pointScrollDuration = duration;
        this._maxPointScrollDuration = duration;
        var ox = this._displayX + this.screenTileX() / 2 - 0.5;
        var oy = this._displayY + this.screenTileY() / 2 - 0.5;
        if (ox > this.width()) ox = ox - this.width();
        if (oy > this.height()) oy = oy - this.height();
        this._pointScrollOriginX = ox;
        this._pointScrollOriginY = oy;
    };

    Game_Map.prototype.updatePointScroll = function () {
        if (this.isPointScrolling()) {
            this._pointScrollDuration--;
            var ox = this._pointScrollOriginX;
            var oy = this._pointScrollOriginY;
            var tx = this._targetScrollPointX;
            var ty = this._targetScrollPointY;
            var duration = this._pointScrollDuration;
            var max = this._maxPointScrollDuration;
            var x = tx + (ox - tx) * duration / max  - $gameMap.screenTileX() / 2 + 0.5;
            var y = ty + (oy - ty) * duration / max  - $gameMap.screenTileY() / 2 + 0.5;
            x = $gameMap.isLoopHorizontal() ? (x + $gameMap.width()) % $gameMap.width() : Math.max(x,0);
            y = $gameMap.isLoopVertical() ? (y + $gameMap.height()) % $gameMap.height() : Math.max(y,0);
            this._displayX = x;
            this._displayY = y;
        }
    };

    var __GMap_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        __GMap_update.call(this, sceneActive);
        this.updatePointScroll();
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());