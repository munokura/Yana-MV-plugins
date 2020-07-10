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
 * @plugindesc ver1.00/メニューコマンドにSceneDistributionを追加します。
 * @author Yana
 * 
 * @param Distribution Name
 * @desc メニューに表示される項目名です。
 * @default ステータス振分
 *
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * 
 * プラグインパラメータを設定すれば動作します。
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