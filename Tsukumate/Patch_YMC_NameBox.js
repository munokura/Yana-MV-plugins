//
//  YEP_MessageCore用パッチ-NameBox ver1.00
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
Imported['Patch_YMC_NameBox'] = 1.00;
/*:
@plugindesc ver1.00/YEP_MessageCore adds a process to synchronize the background state of the name window with the message window.
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
YEP_MessageCore adds a process to synchronize the background state of the name window with the message window.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------

@param StandardPadding
@desc The width of the window border. The default value for MessageCore is 18.
@default 8
*/


/*:ja
@plugindesc ver1.00/YEP_MessageCoreのネームウィンドウの背景の状態を、メッセージウィンドウと同期する処理を追加します。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
YEP_MessageCoreのネームウィンドウの背景の状態を、メッセージウィンドウと同期する処理を追加します。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------

@param StandardPadding
@desc ウィンドウの縁の幅です。MessageCoreのデフォルト値は18です。
@default 8
*/

(function () {

    var parameters = PluginManager.parameters('Patch_YMC_NameBox');
    var standardPadding = parameters['StandardPadding'];

    Window_NameBox.prototype.updateBackground = function () {
        if (eval(Yanfly.Param.MSGNameBoxClear)) return;
        this._background = $gameMessage.background();
        this.setBackgroundType(this._background);
    };

    Window_NameBox.prototype.standardPadding = function () {
        return Number(standardPadding);
    };

    var __WNBox_update = Window_NameBox.prototype.update;
    Window_NameBox.prototype.update = function () {
        __WNBox_update.call(this);
        this.updateBackground();
    };
}());