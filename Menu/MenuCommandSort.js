//
//  メニューコマンド並び替え ver1.021
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
Imported['MenuCommandSort'] = 1.021;

/*:
 * @plugindesc ver1.021/メニューコマンドを並び替えたり表示非表示をオンオフできるようにします。
 * @author Yana
 * 
 * @param Enable Switch ID
 * @desc このスイッチを先頭にしてコマンドの数だけスイッチを使用します。
 * 各スイッチがONのときのみ、そのコマンドが使用できます。
 * @default 24
 * @type switch
 *  
 * @param Menu List
 * @desc メニューコマンドのシンボルの配列です。
 * @default item,skill,equip,status,formation,options,save,load,gameEnd
 * 
 * @param Command Setting
 * @desc スイッチがオフのコマンドの扱いです。
 * @default 0
 * @type select
 * @option 消去
 * @value 0
 * @option 選択不可
 * @value 1
 * @option 選択不可＆名前を変更
 * @value 2
 * 
 * @param Disable Command Text
 * @desc Command Settingが2の時、選択不可のコマンド名として使用されるテキストです。
 * @default --------
 * 
 * @param Load Name
 * @desc ロードの名称として使用されるテキストです。
 * @default ロード
 * 
 * @param Add Common 0
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * 
 * @param Add Common 1
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * 
 * @param Add Common 2
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * 
 * @param Add Common 3
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * 
 * @param Add Common 4
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * 
 * @param Add Common 5
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 *  
 * @param Add Common 6
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * 
 * @param Add Common 7
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * 
 * @param Add Common 8
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * 
 * @param Add Common 9
 * @desc 追加するコモンイベントの設定です。
 * シンボル,表示名,コモンイベントID,変数IDの順で設定してください。
 * @default
 * 
 * @help------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------ 
 * 設定方法
 * ------------------------------------------------------
 * 
 * メニューのコマンドとスイッチを関連付けして、スイッチのオンオフでコマンドの許可状態を、
 * 切り替えられるようにします。
 * Menu Listにコマンドのシンボルを並べて、メニューの順番を変更します。
 * メニューのシンボルはそれぞれ、
 * 
 * アイテム→item
 * スキル→skill
 * 装備→equip
 * ステータス→status
 * 隊列→formation
 * オプション→options
 * セーブ→save
 * ゲーム終了→gameEnd
 * 
 * ロード→load
 * スキル設定→skillSetting
 * クラスチェンジ→classChange
 * 
 * Enable Switch IDで設定したスイッチIDを先頭として、使用するコマンドの数だけ
 * のスイッチを使用します。
 * (24を設定し、コマンドが7つの場合、24,25,26,27,28,29,30を使用します)
 * ロードも追加します。
 * 
 * Add Commonの設定は、
 * シンボル,表示名,コモンイベントID,変数ID
 * の順番で行います。
 * 最後の変数IDを省略すると、アクターの選択を行いません。
 * アクターの選択を行った場合、選択されたアクターのIDを変数IDに代入します。
 * 設定したシンボルをMenu Listの配列に入れることで、コモンイベントを実行する
 * コマンドを追加できます。
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
 * ver1.021:180409
 * プラグインパラメータの仕様を1.5.0に更新。
 * ver1.02:
 * console.logが残っていて、バグの原因になっていたのを修正。
 * ver1.01:
 * アクターを選択するコモンイベント実行時、正常にアクターIDを取得できていないバグを修正。
 * ver1.00:
 * 公開
 */


(function(){
    
    var parameters = PluginManager.parameters('MenuCommandSort');
    var enableSwitchId = Number(parameters['Enable Switch ID'] || 0);
    var commandSetting = Number(parameters['Command Setting'] || 0);
    var disableCommandText = String(parameters['Disable Command Text'] || '----------');
    var loadName = String(parameters['Load Name'] || 'ロード');
    var menuList = String(parameters['Menu List'] || 'item,skill,equip,status,formation,options,save,load,gameEnd');
    menuList = menuList.split(',');
    var addCommons = {};
    for (var i=0;i<10;i++){
        var str = parameters['Add Common ' + i];
        if (str) {
            var ary = str.split(',');
            addCommons[ary[0]] = ary;
        }
    }
    
    var _mCS_WMCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
    Window_MenuCommand.prototype.makeCommandList = function() {
        _mCS_WMCommand_makeCommandList.call(this);
        this.sortCommand();
    };
    
    Window_MenuCommand.prototype.sortCommand = function() {
        var ary = menuList;
        var result = [];
        for (var i=0;i<ary.length;i++){
            if (!ary[i]){ continue }
            if (commandSetting === 0 && !$gameSwitches.value(enableSwitchId + i)){ continue }
            for(var j=0;j<this._list.length;j++){
                if (this._list[j].symbol === ary[i]){
                    if (!$gameSwitches.value(enableSwitchId + i)){
                        if (commandSetting !== 0){
                            this._list[j].enabled = $gameSwitches.value(enableSwitchId + i);
                        }
                        if (commandSetting === 2){
                            this._list[j].name = disableCommandText;
                        }
                    }
                    result.push(this._list[j]);
                }
            }
        }
        this._list = result;
    };
    
    var _mCS_WMCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _mCS_WMCommand_addOriginalCommands.call(this);
        var enabled = this.areMainCommandsEnabled();
        this.addCommand(loadName, 'load', enabled);
        for (key in addCommons){
            if (addCommons[key]){
                var symbol = key;
                var name = addCommons[key][1];
                this.addCommand(name,symbol,enabled);
            }
        }
    };
    
    ///////////////////////////////////////////////////////////////////////////////////////

    var _mCP_SMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _mCP_SMenu_createCommandWindow.call(this);
        this._commandWindow.setHandler('load',   this.commandLoad.bind(this));
        for (key in addCommons) {
            if (addCommons[key]){
                var symbol = key;
                if (addCommons[key][3]){
                    this._commandWindow.setHandler(symbol, this.commandPersonal.bind(this));
                } else {
                    this._commandWindow.setHandler(symbol, this.commandCommonMenu.bind(this));
                }
            }
        }
    }
    
    Scene_Menu.prototype.commandLoad = function() {
        SceneManager.push(Scene_Load);
    };
    
    Scene_Menu.prototype.commandCommonMenu = function() {
        var index = this._commandWindow.index();
        var c = addCommons[this.enableList(index)];
        var ci = Number(c[2]);
        if (c[3]){ $gameVariables.setValue(Number(c[3]),$gameParty.members()[this._statusWindow.index()]._actorId) }
        $gameTemp.reserveCommonEvent(Number(ci));
        this.popScene();
    }
    
    Scene_Menu.prototype.enableList = function(index){
        if (commandSetting !== 0){ return menuList[index] }
        var result = [];
        for (var i=0;i<menuList.length;i++){
            if ($gameSwitches.value(enableSwitchId + i)){
                result.push(menuList[i]);
            }
        }
        return result[index];
    };
    
    var _mCP_SMenu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function() {
        _mCP_SMenu_onPersonalOk.call(this);
        var symbol = this._commandWindow.currentSymbol();
        for (key in addCommons){
            if (!addCommons[key]){ continue }
            if (key === symbol){ this.commandCommonMenu() }
        }
    };
}());