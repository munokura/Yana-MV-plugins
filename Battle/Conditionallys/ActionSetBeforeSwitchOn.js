//
//  行動決定前及びイベント判定前スイッチオン ver1.01
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
Imported['ActionSetBeforeSwitchOn'] = 1.01;
/*:
 * @plugindesc ver1.01/行動決定前やイベント判定前に条件に従ってスイッチを操作します。
 * @author Yana
 * 
 * @param CheckFrameCount
 * @desc この数値フレームに一度、イベントの条件判定を行います。
 * 0を指定すると、イベントの条件判定そのものを行いません。
 * @default 4
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * 
 * アクターやエネミーのメモ欄に
 * 
 * <戦闘条件スイッチオン:x,y%,z>
 * スイッチをオンにする条件
 * </戦闘条件スイッチオン>
 * 
 * と記述すると、条件を満たした場合、y%の確率でIDx番のスイッチをONにします。
 * zに行動を指定すると、エネミーの行動条件時に判定を行いスイッチを操作します。
 * zにイベントを指定すると、イベントの発動条件判定時に判定を行いスイッチを操作します。
 * 
 * 戦闘条件スイッチオンの代わりに、ActionCondSwitchOnも使用可能です。
 * 
 * また、エネミーやアクターのメモ欄に
 * <行動条件継承:xy>
 * または、
 * <InheritActionCond:xy>
 * と記述することで、xyで指定した対象の戦闘条件を継承することができます。
 * xにはA(アクター)、E(エネミー)のいずれかを、yにはID記述してください。
 * 例:<行動条件継承:E5>
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
 * ver1.01:
 * プラグインパラメータ読込用の変数が間違っていたバグを修正。
 * ver1.00:
 * 公開
 */

(function(){
    ////////////////////////////////////////////////////////////////////////////////////
    
    var parameters = PluginManager.parameters('ActionSetBeforeSwitchOn');
    var checkFrameCount = Number(parameters['CheckFrameCount']);
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    function AsbsManager() {
        throw new Error('This is a static class');
    };
    
    AsbsManager.initCond = function(note){
        var texts = note.split('\n');
        var flag = false;
        var result = [];
        for(var i=0;i<texts.length;i++){
            if (flag){
                if (texts[i].match(/^<\/(?:戦闘条件スイッチオン|ActionCondSwitchOn)>/)){
                    result.push(effect);
                    flag = false;
                }else{
                    effect['conditions'].push(ConditionallyManager.makeCondition(texts[i]));
                }
            }else if (texts[i].match(/^<(?:戦闘条件スイッチオン|ActionCondSwitchOn):(\d+),(\d+)[%％],((?:行動|イベント))>/)){
                var effect = {
                    'type':String(RegExp.$3),
                    'id':Number(RegExp.$1),
                    'rate':Number(RegExp.$2),
                    'conditions':[]
                    };
                flag = true;
            }
        }
        return result;
    };
    
    AsbsManager.asbsCond = function(battler){
        if (battler._asbsCond === undefined){
            battler._asbsCond = this.initCond(battler.note);
            var inherit = this.inheritCond(battler);
            for (var i=0,max=inherit.length;i<max;i++){
                var inh = inherit[i][1];
                var en = inherit[i][0] === 'A' ? $dataActors[inh] : $dataEnemies[inh];
                battler._asbsCond = battler._asbsCond.concat(this.asbsCond(en));
            }
        }
        return battler._asbsCond;
    };
    
    AsbsManager.inheritCond = function(battler) {
        if (battler._inheritCond === undefined){
            battler._inheritCond = [];
            var texts = battler.note.split(',');
            for (var i=0,max=texts.length;i<max;i++){
                if (texts[i].match(/<(?:行動条件継承|InheritActionCond):([AE])(\d+)>/)){
                    battler._inheritCond.push([RegExp.$1,Number(RegExp.$2)]);
                }
            }
        }
        return battler._inheritCond;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    Game_Battler.prototype.checkAsbsConditions = function(type){
        var battler = this.isActor() ? this.actor() : this.enemy();
        var unit = this.isActor() ? $gameTroop : $gameParty;
        var cond = AsbsManager.asbsCond(battler);
        for (var i=0,max=cond.length;i<max;i++){
            var c = cond[i];
            if (c.type !== type){ continue }
            $gameSwitches._data[c.id] = false;
            if (Math.random() < c.rate * 0.01){
                for (var j=0,jmax=unit.members().length;j<jmax;j++){
                    var target = unit.members()[j];
                    if (ConditionallyManager.checkConditions(this,target,c.conditions)) {
                        $gameSwitches._data[c.id] = true;
                        break;
                    }
                }
            }
        }
    };
    
    Game_Battler.prototype.clearAsbsSwitches = function(type) {
        var battler = this.isActor() ? this.actor() : this.enemy();
        var cond = AsbsManager.asbsCond(battler);
        for (var i=0,max=cond.length;i<max;i++){
            var c = cond[i];
            if (c.type !== type){ continue }
            $gameSwitches._data[c.id] = false;
        }
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    var __GEnemy_makeActions = Game_Enemy.prototype.makeActions;
    Game_Enemy.prototype.makeActions = function() {
        this.checkAsbsConditions('行動');
        __GEnemy_makeActions.call(this);
        this.clearAsbsSwitches('行動');
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    var __GTroop_meetsConditions = Game_Troop.prototype.meetsConditions;
    Game_Troop.prototype.meetsConditions = function(page) {
        if (page.conditions.switchValid && checkFrameCount > 0 && (Graphics.frameCount % checkFrameCount === 0)){
            this.members().forEach(function(enemy){ enemy.checkAsbsConditions('イベント') });
            $gameParty.members().forEach(function(actor){ actor.checkAsbsConditions('イベント') });
        }
        return __GTroop_meetsConditions.call(this,page);
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
}());   