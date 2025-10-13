//
//  汎用スクリプトコマンド ver1.01
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
Imported['CommonScriptCommand'] = 1.01;
/*:
@plugindesc ver1.01/Adds the specified text to the script command.
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
How to Use
--------------------------------------------------------------------
Install the plugin and set the parameters.

This plugin adds the text set by the parameters to the Event's Contents script above the text you enter.

For example, if you write
var v = $gameVariables._data;
in ExScript1, you can access variable x by writing v[x] in the script.

Writing v[10] = 1000;
will set the value of variable 10 to 1000.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver 1.01:
Fixed the processing when the same script command is called multiple times.
ver 1.00:
Released

@param ExScript1
@desc Text1 to add to the beginning of the script command.
@default var v = $gameVariables._data;

@param ExScript2
@desc Text2 to add to the beginning of the script command.
@default var s = $gameSwitches._data;

@param ExScript3
@desc Text to add to the beginning of the script command.

@param ExScript4
@desc Text to add to the beginning of the script command.

@param ExScript5
@desc Text to add to the beginning of the script command.

@param ExScript6
@desc Text to add to the beginning of the script command.

@param ExScript7
@desc Text to add to the beginning of the script command.

@param ExScript8
@desc Text to add to the beginning of the script command.

@param ExScript9
@desc Text to add to the beginning of the script command.

@param ExScript10
@desc Text 10 to add to the beginning of the script command.
*/


/*:ja
@plugindesc ver1.01/スクリプトコマンドに指定したテキストを追加します。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
使用方法
------------------------------------------------------
プラグインを導入し、パラメータを設定することで動作します。

このプラグインは、イベントコマンドのスクリプトにおいて、パラメータで設定した
テキストを記述したテキストの上に追加します。

例えば、ExScript1に
var v = $gameVariables._data;
を記述した場合、スクリプト内でv[x]と記述することで、x番の変数にアクセスが可能になります。
v[10] = 1000;
と記述すると、変数10番の値が1000に設定されます。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.01:
同じスクリプトコマンドが呼び出された際の処理を修正
ver1.00:
公開

@param ExScript1
@desc スクリプトコマンドの最初に追加するテキスト1です。
@default var v = $gameVariables._data;

@param ExScript2
@desc スクリプトコマンドの最初に追加するテキスト2です。
@default var s = $gameSwitches._data;

@param ExScript3
@desc スクリプトコマンドの最初に追加するテキスト3です。

@param ExScript4
@desc スクリプトコマンドの最初に追加するテキスト4です。

@param ExScript5
@desc スクリプトコマンドの最初に追加するテキスト5です。

@param ExScript6
@desc スクリプトコマンドの最初に追加するテキスト6です。

@param ExScript7
@desc スクリプトコマンドの最初に追加するテキスト7です。

@param ExScript8
@desc スクリプトコマンドの最初に追加するテキスト8です。

@param ExScript9
@desc スクリプトコマンドの最初に追加するテキスト9です。

@param ExScript10
@desc スクリプトコマンドの最初に追加するテキスト10です。
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('CommonScriptCommand');
    var exCommand = '';

    for (var i = 1; i <= 10; i++) {
        if (parameters['ExScript' + i]) exCommand += parameters['ExScript' + i] + '\n';
    }

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_command355 = Game_Interpreter.prototype.command355;
    Game_Interpreter.prototype.command355 = function () {
        var command = this.currentCommand();
        command.parameters[0] = exCommand + this.currentCommand().parameters[0];
        var result = __GInterpreter_command355.call(this);
        var texts = command.parameters[0].split('\n');
        command.parameters[0] = texts[texts.length - 1];
        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());