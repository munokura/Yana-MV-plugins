//
//  リロード時アラート消去 ver1.00
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
Imported['EraseReloadAlert'] = 1.00;
/*:
@plugindesc ver1.00/Disables the alert that appears when you press F5.
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License
@help
Disables the alert that appears when you press F5.

--------------------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/


/*:ja
@plugindesc ver1.00/F5を押した時に表示されるアラートを無効化します。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License
@help
F5を押した時に表示されるアラートを無効化します。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義
    SceneManager.onKeyDown = function (event) {
        if (!event.ctrlKey && !event.altKey) {
            switch (event.keyCode) {
                case 116:   // F5
                    if (Utils.isNwjs()) {
                        //window.alert($gameSystem && $gameSystem.isJapanese() ? "リロードを実行します。ゲームパッドを使用している場合、パッドの接続が途切れることがあります" : "Reloading the game with a gamepad connected will cause a disconnect."); // TODO: Get properly translated
                        location.reload();
                    }
                    break;
                case 119:   // F8
                    if (Utils.isNwjs() && Utils.isOptionValid('test')) {
                        require('nw.gui').Window.get().showDevTools();
                    }
                    break;
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());