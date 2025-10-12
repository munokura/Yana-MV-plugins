//
//  制御文字拡張マクロ設定 ver1.01
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
Imported['EECSetting_Macro'] = 1.00;
/*:
@plugindesc ver1.00/This is a plugin for defining macros for control character expansion.
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
Define a macro.

--------------------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released

@param Macro0
@desc This is macro number 0.

@param Macro1
@desc This is macro number 1.

@param Macro2
@desc This is the second macro.

@param Macro3
@desc This is macro number 3.

@param Macro4
@desc This is macro number 4.

@param Macro5
@desc This is macro number 5.

@param Macro6
@desc This is macro number 6.

@param Macro7
@desc This is macro number 7.

@param Macro8
@desc This is macro number 8.

@param Macro9
@desc This is macro number 9.

@param Macro10
@desc This is macro number 10.

@param Macro11
@desc This is macro number 11.

@param Macro12
@desc This is macro number 12.

@param Macro13
@desc This is macro number 13.

@param Macro14
@desc This is macro number 14.

@param Macro15
@desc This is macro number 15.

@param Macro16
@desc This is macro number 16.

@param Macro17
@desc This is macro number 17.

@param Macro18
@desc This is macro number 18.

@param Macro19
@desc This is macro number 19.

@param Macro20
@desc This is macro number 20.

@param Macro21
@desc This is macro number 21.

@param Macro22
@desc This is macro number 22.

@param Macro23
@desc This is macro number 23.

@param Macro24
@desc This is macro number 24.

@param Macro25
@desc This is macro number 25.

@param Macro26
@desc This is macro number 26.

@param Macro27
@desc This is macro number 27.

@param Macro28
@desc This is macro number 28.

@param Macro29
@desc This is macro number 29.

@param Macro30
@desc This is macro number 30.

@param Macro31
@desc This is macro number 31.

@param Macro32
@desc This is macro number 32.

@param Macro33
@desc This is macro number 33.

@param Macro34
@desc This is macro number 34.

@param Macro35
@desc This is macro number 35.

@param Macro36
@desc This is macro number 36.

@param Macro37
@desc This is macro number 37.

@param Macro38
@desc This is macro number 38.

@param Macro39
@desc This is macro number 39.

@param Macro40
@desc This is macro number 40.

@param Macro41
@desc This is macro number 41.

@param Macro42
@desc This is macro number 42.

@param Macro43
@desc This is macro number 43.

@param Macro44
@desc This is macro number 44.

@param Macro45
@desc This is macro number 45.

@param Macro46
@desc This is macro number 46.

@param Macro47
@desc This is macro number 47.

@param Macro48
@desc This is macro number 48.

@param Macro49
@desc This is macro number 49.

@param Macro50
@desc This is macro number 50.
*/


/*:ja
@plugindesc ver1.00/制御文字拡張用のマクロを定義するためのプラグインです。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
ExtendEscapeCharacters.js 用の制御文字を定義するためのプラグインです。
マクロを定義します。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param Macro0
@desc 0番のマクロです。

@param Macro1
@desc 1番のマクロです。

@param Macro2
@desc 2番のマクロです。

@param Macro3
@desc 3番のマクロです。

@param Macro4
@desc 4番のマクロです。

@param Macro5
@desc 5番のマクロです。

@param Macro6
@desc 6番のマクロです。

@param Macro7
@desc 7番のマクロです。

@param Macro8
@desc 8番のマクロです。

@param Macro9
@desc 9番のマクロです。

@param Macro10
@desc 10番のマクロです。

@param Macro11
@desc 11番のマクロです。

@param Macro12
@desc 12番のマクロです。

@param Macro13
@desc 13番のマクロです。

@param Macro14
@desc 14番のマクロです。

@param Macro15
@desc 15番のマクロです。

@param Macro16
@desc 16番のマクロです。

@param Macro17
@desc 17番のマクロです。

@param Macro18
@desc 18番のマクロです。

@param Macro19
@desc 19番のマクロです。

@param Macro20
@desc 20番のマクロです。

@param Macro21
@desc 21番のマクロです。

@param Macro22
@desc 22番のマクロです。

@param Macro23
@desc 23番のマクロです。

@param Macro24
@desc 24番のマクロです。

@param Macro25
@desc 25番のマクロです。

@param Macro26
@desc 26番のマクロです。

@param Macro27
@desc 27番のマクロです。

@param Macro28
@desc 28番のマクロです。

@param Macro29
@desc 29番のマクロです。

@param Macro30
@desc 30番のマクロです。

@param Macro31
@desc 31番のマクロです。

@param Macro32
@desc 32番のマクロです。

@param Macro33
@desc 33番のマクロです。

@param Macro34
@desc 34番のマクロです。

@param Macro35
@desc 35番のマクロです。

@param Macro36
@desc 36番のマクロです。

@param Macro37
@desc 37番のマクロです。

@param Macro38
@desc 38番のマクロです。

@param Macro39
@desc 39番のマクロです。

@param Macro40
@desc 40番のマクロです。

@param Macro41
@desc 41番のマクロです。

@param Macro42
@desc 42番のマクロです。

@param Macro43
@desc 43番のマクロです。

@param Macro44
@desc 44番のマクロです。

@param Macro45
@desc 45番のマクロです。

@param Macro46
@desc 46番のマクロです。

@param Macro47
@desc 47番のマクロです。

@param Macro48
@desc 48番のマクロです。

@param Macro49
@desc 49番のマクロです。

@param Macro50
@desc 50番のマクロです。
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('EECSetting_Macro');

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Temp.prototype.eecMacro = function (index) {
        if (this._eecMacro) { return this._eecMacro[index] }
        this._eecMacro = [];
        for (var i = 0; i < 51; i++) { this._eecMacro[i] = parameters['Macro' + i] }
        return this._eecMacro[index];
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());