//
//  バグ修正-リロード時BGM自動演奏阻止 ver1.00
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
Imported['BugFix_ReloadAutoplayBgm'] = 1.00;
/*:
 * @plugindesc ver1.00/マップがリロードされた際にBGMが自動演奏されないようにします。
 * @author Yana
 *
 * @help------------------------------------------------------
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

    var __SLoad_reloadMapIfUpdated = Scene_Load.prototype.reloadMapIfUpdated;
    Scene_Load.prototype.reloadMapIfUpdated = function() {
        $gameTemp._callReloadMap = true;
        __SLoad_reloadMapIfUpdated.call(this);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GMap_autoplay = Game_Map.prototype.autoplay;
    Game_Map.prototype.autoplay = function() {
        if ($gameTemp._callReloadMap){
            $gameTemp._callReloadMap = false;
            return;
        }
        __GMap_autoplay.call(this);
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());