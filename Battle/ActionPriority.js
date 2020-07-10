//
//  行動優先度 ver1.01
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
Imported['ActionPriority'] = 1.01;
/*:
 * @plugindesc ver1.01/行動に優先度を設定する特徴や優先度を持つスキルやアイテムを設定できるようにします。
 * @author Yana
 * 
 * @help------------------------------------------------------
 * 注意
 * ------------------------------------------------------
 * このプラグインを導入すると、複数回行動時にまとめて回数分行動する仕様が変更されます。
 * 複数回行動の場合でも、それぞれの行動の発動速度に従って、行動が発動するようになります。
 * 
 * ※YEP_BattleEngineCoreと併用する場合は、こちらを下に配置してください。
 * 
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------ 
 * 特徴を持ったオブジェクトまたはスキル、アイテムなどのメモ欄に
 * <優先度:x>
 * または、
 * <Priority:x>
 * と記述してください。
 * 
 * 特徴に設定した場合は、その特徴を持つバトラーの優先度がxに設定されます。
 * スキルやアイテムに設定した場合は、そのスキルやアイテムの優先度がxに設定されます。
 * 
 * 優先度は＋に設定すると行動が早く、－に設定すると行動が遅くなります。
 * 特徴の優先度やアイテムやスキルの優先度は、それぞれが合算された値で判定されます。
 * 
 * また、ConditionallyCoreが導入されている場合、優先度の発生に条件を付ける
 * ことができます。
 * 条件を付ける場合、
 * 
 * <優先度:x%,y>
 * 条件の記述
 * </優先度>
 * と記述してください。
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
 * 利用規約をMITライセンスに変更。
 * 行動前コモンとの併用化処理を追加。
 * ver1.00:
 * 公開
 */

(function(){
    ////////////////////////////////////////////////////////////////////////////////////
    
    var parameters = PluginManager.parameters('ActionPriority');
    
    ////////////////////////////////////////////////////////////////////////////////////
        
    function ActionPriorityManager() {
        throw new Error('This is a static class');
    };
    
    ActionPriorityManager.initCond = function(note){
        var texts = note.split('\n');
        var flag = false;
        var result = [];
        for(var i=0;i<texts.length;i++){
            if (flag){
                if (texts[i].match(/^<\/(?:優先度|ActionPriority)>/)){
                    result.push(effect);
                    flag = false;
                }else{
                    effect['conditions'].push(ConditionallyManager.makeCondition(texts[i]));
                }
            }else if (texts[i].match(/^<(?:優先度|ActionPriority):(\d+)[%％],([+-]\d+)>/)){
                var effect = {
                    'var':Number(RegExp.$2),
                    'rate':Number(RegExp.$1),
                    'conditions':[]
                    };
                flag = true;
            }
        }
        return result;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    DataManager.actionPriority = function(item,subject,target) {
        if (!item){ return 0 }
        var priority = 0;
        if (item._priority === undefined){
            item._priority = 0;
            if(!!item.note.match(/<優先度:([+-]\d+)>/))  { item._priority = Number(RegExp.$1) }
            if(!!item.note.match(/<Priority:([+-]\d+)>/)){ item._priority = Number(RegExp.$1) }
        }
        priority += item._priority;
        if (Imported['ConditionallyCore']){
            if (item._condPriority === undefined){
                item._condPriority = ActionPriorityManager.initCond(item.note);
            }
            item._condPriority.forEach(function(cond){
                if ((Math.random() < cond['rate'] * 0.01) && 
                    ConditionallyManager.checkConditions(subject,target,cond['conditions'])){
                    priority += cond['var'];
                }
            }.bind(this));
        }
        return priority;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    var __BManager_makeActionOrders = BattleManager.makeActionOrders;
    BattleManager.makeActionOrders = function() {
        __BManager_makeActionOrders.call(this);
        var battlers = this._actionBattlers;
        var actions = battlers.reduce(function(r,b){ return r.concat(b._actions)},[]);
        actions.forEach(function(a){
            var target = a.opponentsUnit().members()[0];
            a._actionPriority = DataManager.actionPriority(a.item(),a.subject(),target);
        });
        actions.sort(function(a,b){
            var as = a.subject() ? a.subject().actionPriority() : 0;
            var ai = a.item() ? a._actionPriority : 0;
            var bs = b.subject() ? b.subject().actionPriority() : 0;
            var bi = b.item() ? b._actionPriority : 0;
            var r = 0;
            r = (bs+bi) < (as+ai) ? -1 : r;
            r = (bs+bi) > (as+ai) ?  1 : r;
            if (r === 0){ 
                r = a.speed() > b.speed() ? -1 : r;
                r = a.speed() < b.speed() ?  1 : r;
            }
            //console.log(a.subject().name(),a.item().name,as,ai,a.speed())
            //console.log(b.subject().name(),b.item().name,bs,bi,b.speed())
            return r; 
        });
        
        /*for (var i=0,max=actions.length;i<max;i++){
            console.log(actions[i].subject().name(),actions[i].item().name)
        }*/
        
        var newActions = {};
        actions.forEach(function(a){
            var key = this.makeBattlerKey(a.subject());
            if (newActions[key] === undefined){ newActions[key] = [] }
            newActions[key].push(a);
        }.bind(this));
        battlers.forEach(function(b){
            var key = this.makeBattlerKey(b);
            b._actions = newActions[key] ? newActions[key] : [];
        }.bind(this));
        var aBattlers = actions.reduce(function(r,a){ return r.concat(a.subject())},[]);
        this._actionBattlers.forEach(function(a){
            if (!aBattlers.contains(a)){ aBattlers.push(a) }
        });
        this._actionBattlers = aBattlers;
    };
    
    BattleManager.makeBattlerKey = function(subject){
        var letter = subject.isActor() ? 'A_' : 'E_';
        var id = subject.isActor() ? subject._actorId : subject._enemyId;
        return letter + subject.name() + '_' + id + '_' + subject.index();
    };
    
    // 再定義
    BattleManager.processTurn = function() {
        if (Imported.YEP_BattleEngineCore){ this._processTurn = true }
        var subject = this._subject;
        var action = subject.currentAction();
        if (action && (!subject._multiActioned || this._execBeforeCommon)) {
            var preSubject = subject;
            action.prepare();
            if (action.isValid()) {
                this.startAction();
            }
            subject = this._subject;
            subject.removeCurrentAction();
            if (subject._actions.length > 0 && subject === preSubject){ subject._multiActioned = true }
        } else {
            subject._multiActioned = false;
            subject.onAllActionsEnd();
            this.refreshStatus();
            this._logWindow.displayAutoAffectedStatus(subject);
            this._logWindow.displayCurrentState(subject);
            this._logWindow.displayRegeneration(subject);
            this._subject = this.getNextSubject();
        }
        if (Imported.YEP_BattleEngineCore){ this._processTurn = false }
    };
    
    if (Imported.YEP_BattleEngineCore){
    // 再定義
    BattleManager.getNextSubject = function() {
        if ($gameTroop.turnCount() <= 0) return;
        this._performedBattlers = this._performedBattlers || [];
        this.makeActionOrders();
        for (;;) {
            var battlerArray = [];
            for (var i = 0; i < this._actionBattlers.length; ++i) {
                var obj = this._actionBattlers[i];
                if (!this._performedBattlers.contains(obj) || obj._actions.length > 0){
                    battlerArray.push(obj);
                }
            }
            this._actionBattlers = battlerArray;
            var battler = this._actionBattlers.shift();
            if (!battler) return null;
            if (battler.isBattleMember() && battler.isAlive()) {
                this._performedBattlers.push(battler);
                return battler;
            }
        }
    };
    }
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    Game_Battler.prototype.actionPriority = function() {
        var target = this.isActor() ? $gameTroop.members()[0] : $gameParty.members()[0];
        return this.traitObjects().reduce(function(r,to){
            return r += DataManager.actionPriority(to,this,target);
        }.bind(this),0);
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
}());