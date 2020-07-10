//
//  行動決定前行動回数スイッチオン ver1.00
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
Imported['ActionCountSwitchOn'] = 1.00;
/*:
 * @plugindesc ver1.00/行動決定前に、現在の行動回数に応じたスイッチをオンにします。
 * @author Yana
 * 
 * @param BaseSwitchID
 * @desc 行動回数1回目のときはこのスイッチがオンに、
 * 2回目は+1のスイッチが、3回目は+2のスイッチが・・・となります。
 * @default 50
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
    
    var parameters = PluginManager.parameters('ActionCountSwitchOn');
    var baseSwitchId = Number(parameters['BaseSwitchID']);
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    var __GBattler_makeActions = Game_Battler.prototype.makeActions;
    Game_Battler.prototype.makeActions = function() {
        if (this._callEnemyMa2){ return }
        __GBattler_makeActions.call(this);
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    Game_Enemy.prototype.numActions = function() {
        var num = Game_Battler.prototype.numActions.call(this);
        return num > 0 && this._callEnemyMa1 ? 1 : num;
    };
    
    Game_Enemy.prototype.stNumActions = function() {
        return Game_Battler.prototype.numActions.call(this);
    };
    
    var __GEnemy_makeActions = Game_Enemy.prototype.makeActions;
    Game_Enemy.prototype.makeActions = function() {
        this._callEnemyMa1 = true;
        $gameSwitches._data[baseSwitchId] = true;
        __GEnemy_makeActions.call(this);
        if (this.stNumActions() <= 1){ return }
        var actions = [];
        this._callEnemyMa2 = true;
        var a = JsonEx.makeDeepCopy(this._actions[0]);
        actions.push(a);
        for (var i=1,max=this.stNumActions();i<max;i++){
            $gameSwitches._data[baseSwitchId+i-1] = false;
            $gameSwitches._data[baseSwitchId+i] = true;
            __GEnemy_makeActions.call(this);
            var a = JsonEx.makeDeepCopy(this._actions[0]);
            actions.push(a);
        }
        $gameSwitches._data[baseSwitchId+this.stNumActions()-1] = false;
        this._actions = actions;
        this._callEnemyMa1 = false;
        this._callEnemyMa2 = false;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
}());
    