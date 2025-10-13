//
//  タイトル文字サイズ変更 ver1.001
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
Imported['TitleCharacterSize'] = 1.001;
/*:
@target MZ MV
@plugindesc ver1.001/Change the title font size.
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Others/TitleCharacterSize.js
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
It will work once installed.
However, variables cannot be used in titles.
-----------------------------------------------------
There are no plugin commands.
-----------------------------------------------------

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.001:180410
Plugin parameter specifications updated to 1.5.0.
ver1.00:
Released

@param FontSize
@text Title font size
@desc The font size of the title.
@default 72
@type number
*/


/*:ja
@target MZ MV
@plugindesc ver1.001/タイトルの文字サイズを変更します。
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Others/TitleCharacterSize.js
@license MIT License

@help
------------------------------------------------------
使い方
------------------------------------------------------
導入することで動作します。
ただし、タイトルでは変数は使用できません。
------------------------------------------------------
 プラグインコマンドはありません。
------------------------------------------------------

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.001:180410
プラグインパラメータの仕様を1.5.0に更新。
ver1.00:
公開

@param FontSize
@text タイトルのフォントサイズ
@desc タイトルのフォントサイズです。
@default 72
@type number
*/

(function () {

    'use strict';

    var parameters = PluginManager.parameters('TitleCharacterSize');
    var fontSize = Number(parameters['FontSize']) || 72;

    // 再定義
    Scene_Title.prototype.drawGameTitle = function () {
        var x = 20;
        var y = Graphics.height / 4;
        var maxWidth = Graphics.width - x * 2;
        var text = $dataSystem.gameTitle;
        this._gameTitleSprite.bitmap.outlineColor = 'black';
        this._gameTitleSprite.bitmap.outlineWidth = 8;
        this._gameTitleSprite.bitmap.fontSize = fontSize;
        this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, 'center');
    };
}());