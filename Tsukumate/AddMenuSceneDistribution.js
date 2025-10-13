//
//  SceneDistributionメニュー追加 ver1.00
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
Imported['AddMenuSceneDistribution'] = 1.00;
/*:
@plugindesc ver1.00/Add SceneDistribution to the menu commands.
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

Set the plugin parameters to run it.

------------------------------------------------------
Terms of Use
--------------------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
--------------------------------------------------------------------
Update History:
ver. 1.00:
Released

@param Distribution Name
@desc The item name that will be displayed in the menu.
@default ステータス振分
*/


/*:ja
@plugindesc ver1.00/メニューコマンドにSceneDistributionを追加します。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
使用方法
------------------------------------------------------

プラグインパラメータを設定すれば動作します。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param Distribution Name
@desc メニューに表示される項目名です。
@default ステータス振分
*/

(function(){    
    ////////////////////////////////////////////////////////////////////////////////////    
    
    var parameters = PluginManager.parameters('AddMenuSceneDistribution');
    var distributionName = String(parameters['Distribution Name'] || '');
    
    ////////////////////////////////////////////////////////////////////////////////////    

    var __WMCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        __WMCommand_addOriginalCommands.call(this);
        this.addCommand(distributionName, 'statDistribution', true);
    };

    var __SMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        __SMenu_createCommandWindow.call(this);
        this._commandWindow.setHandler('statDistribution',   this.commandPersonal.bind(this));
    }
    var __SMenu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function() {
        __SMenu_onPersonalOk.call(this);
        if (this._commandWindow.currentSymbol() === 'statDistribution'){
            var actor = $gameParty.members()[this._statusWindow.index()];
            SceneManager.sceneDistribution(actor);
        }
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
}());