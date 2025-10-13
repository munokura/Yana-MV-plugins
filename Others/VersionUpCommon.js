//
//  バージョンアップ時コモン ver1.031
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
Imported['VersionUpCommon'] = 1.031;
/*:
@target MZ MV
@plugindesc ver1.031/When the setting version and recording version are different, the start of the common event is scheduled.
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Others/VersionUpCommon.js
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
How to Set
------------------------------------------------------

Specify the common event ID to execute when the versions are different in the plugin parameters.
The current game version can be obtained from $gameSystem._gameVersion,
and the pre-update game version can be obtained from $gameSystem._preVersion.

To use the current version as a condition for Event's Contents branching,
use the following condition in the script:
$gameSystem._gameVersion === 'game version'

To use the pre-update version as a condition for Event's Contents branching,
use the following condition in the script:
$gameSystem._preVersion === 'game version'


For an example of how to create a common event, see the attached image.
When created like this:
Upgrade from 1.0.0 to 1.0.3: All updates from 1.01 to 1.03 are passed.
Upgrade from 1.0.2 to 1.0.3: Only the 1.03 update is passed.
This behavior allows you to pass only the necessary updates.

------------------------------------------------------
There are no plugin commands.
------------------------------------------------------

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
--------------------------------------------------------
Update History:
ver1.031:180410
Plugin parameter specifications updated to 1.5.0.
ver1.03:
Fixed a bug where some plugin parameter settings were not Reflectioned.
Added a plugin parameter to change font size.
ver1.02:
Fixed a bug where some plugin parameter settings were not Reflectioned.
ver1.01:
Added help.
Partially revised plugin parameter descriptions.
ver1.00:
Released

@param Game Version
@text Game Version
@desc The game version. Compare this text with the value stored in $gameSystem.
@default 1.00

@param Reserve Common ID
@text Execution common event ID
@desc The ID of the common event to execute if the versions are different.
@default 2
@type common_event

@param Show Game Version
@text Show version as title
@desc This setting determines whether the game version is displayed in the title. Set this to true or false.
@default true
@type boolean

@param Version Text
@text Title display version previous text
@desc Text to add before the version in the title.
@default version.

@param Position X
@text position x coordinate
@desc The X coordinate of the title version's position.
@default 572

@param Position Y
@text Position Y coordinate
@desc The Y coordinate of the title version position.
@default 594

@param Text Alignment
@text Justification
@desc The text alignment. Specify left, center, or right.
@default right
@type select
@option Left-justified
@value left
@option Centered
@value center
@option Right-justified
@value right

@param Text Font Size
@text Font size
@desc The font size of the text.
@default 28
@type number
*/


/*:ja
@target MZ MV
@plugindesc ver1.031/設定バージョンと記録バージョンが違うとき、コモンイベントの起動を予約します。
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Others/VersionUpCommon.js
@license MIT License

@help
------------------------------------------------------
設定方法
------------------------------------------------------

プラグインパラメータで、バージョンが違った際に
実行するコモンイベントIDを指定してください。
現在のゲームのバージョンは、$gameSystem._gameVersionで、
更新前のゲームのバージョンは$gameSystem._preVersionで取得できます。

現在のバージョンを条件にイベントコマンドで分岐を行う際は、
条件分岐→スクリプトで、
$gameSystem._gameVersion === 'ゲームのバージョン'

更新前のバージョンを条件にイベントコマンドで分岐を行う際は、
条件分岐→スクリプトで、
$gameSystem._preVersion === 'ゲームのバージョン'

で判定してください。

コモンイベントの作成例は、添付の画像を参照してください。
このように作成すると、
1.0.0→1.0.3に更新:1.01~1.03までのすべての更新内容を通る
1.0.2→1.0.3に更新:1.03の更新内容のみ通る。
というような挙動になるので、必要な更新内容のみを通すことができます。

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
ver1.031:180410
プラグインパラメータの仕様を1.5.0に更新。
ver1.03:
プラグインパラメータの設定の一部が反映されていないバグを修正
フォントサイズを変更するプラグインパラメータを追加
ver1.02:
プラグインパラメータの設定の一部が反映されていなかったのを修正
ver1.01:
ヘルプを追加
プラグインパラメータの説明を一部修正
ver1.00:
公開

@param Game Version
@text ゲームのバージョン
@desc ゲームのバージョンです。このテキストと$gameSystem内に保存されている値とを比較します。
@default 1.00

@param Reserve Common ID
@text 実行コモンイベントID
@desc バージョンが違う場合実行するコモンイベントのIDです。
@default 2
@type common_event

@param Show Game Version
@text バージョンをタイトル表示
@desc ゲームのバージョンをタイトルに表示するかの設定です。 true/falseで設定してください。
@default true
@type boolean

@param Version Text
@text タイトル表示バージョン前テキスト
@desc タイトルに表示するバージョンの前に追加するテキストです。
@default version.

@param Position X
@text 位置X座標
@desc タイトルのバージョンの位置X座標です。
@default 572

@param Position Y
@text 位置Y座標
@desc タイトルのバージョンの位置Y座標です。
@default 594

@param Text Alignment
@text 行揃え
@desc テキストのアライメントです。 left,center,rightのいずれかを指定してください。
@default right
@type select
@option 左揃え
@value left
@option 中央揃え
@value center
@option 右揃え
@value right

@param Text Font Size
@text 文字サイズ
@desc テキストの文字サイズです。
@default 28
@type number
*/

(function () {

    'use strict';

    var parameters = PluginManager.parameters('VersionUpCommon');
    var gameVersion = String(parameters['Game Version']);
    var reserveCommonId = Number(parameters['Reserve Common ID']);
    var showGameVersion = parameters['Show Game Version'] === 'true';
    var versionText = String(parameters['Version Text'] || 'Version.');
    var posX = Number(parameters['Position X'] || 572);
    var posY = Number(parameters['Position Y'] || 594);
    var textAlign = parameters['Text Alignment'] || 'right';
    var textFontSize = Number(parameters['Text Font Size']) || 28;

    var _vr_cmn_GSystem_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _vr_cmn_GSystem_initialize.call(this);
        this._gameVersion = gameVersion;
    };

    var _vr_cmn_SMap_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _vr_cmn_SMap_start.call(this);
        this.checkVersion();
    };

    Scene_Map.prototype.checkVersion = function () {
        if ($gameSystem._gameVersion !== gameVersion) {
            $gameSystem._preVersion = $gameSystem._gameVersion;
            $gameSystem._gameVersion = gameVersion;
            $gameTemp.reserveCommonEvent(reserveCommonId);
        }
    };

    var _vr_cmn_STitle_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function () {
        _vr_cmn_STitle_create.call(this);
        if (showGameVersion) this.createVersionSprite();
    };

    Scene_Title.prototype.createVersionSprite = function () {
        var x = posX;
        var y = posY;
        var w = 240;
        var h = 24;
        this._verSprite = new Sprite(new Bitmap(w, h));
        this._verSprite.setFrame(0, 0, w, h);
        this._verSprite.x = x;
        this._verSprite.y = y;
        this.addChild(this._verSprite);
        this._verSprite.bitmap.fontSize = textFontSize;
        this._verSprite.bitmap.drawText(versionText + gameVersion, 0, 0, w, h, textAlign);
    };

}());