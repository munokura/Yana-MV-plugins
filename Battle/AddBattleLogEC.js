//
//  バトルログ表示制御文字 ver1.00
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
Imported['AddBattleLogEC'] = 1.00;
/*:
@plugindesc ver1.00/Adds control characters to display messages in the battle log.
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
Adds a control character to add text to the battle log.

Additional Control Character:
_ABL
If you include this at the beginning of a message, it will be displayed in the battle log instead of a normal window.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released
*/


/*:ja
@plugindesc ver1.00/メッセージをバトルログに表示する制御文字を追加します。
@author Yana

@help
使用方法
------------------------------------------------------
バトルログにテキストを追加する制御文字を追加します。

追加制御文字:
_ABL
これをメッセージの最初に記述すると、メッセージは通常のウィンドウではなく、
バトルログに表示されます。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開
*/

(function(){
    ////////////////////////////////////////////////////////////////////////////////////
    
    var parameters = PluginManager.parameters('AddBattleLogEC');
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    var __GInterpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function(){
        var nextCommand = this._list[this._index+1];
        if (this.nextEventCode() === 401){
            var text = nextCommand.parameters[0];
            if (text.match(/^_ABL/gi)){
                while (this.nextEventCode() === 401){
                    this._index++;
                    text = this.currentCommand().parameters[0].replace(/_ABL/gi,'');
                    BattleManager._logWindow.addText(text);
                }
                return false;
            }
        }
        return __GInterpreter_command101.call(this);
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
}());