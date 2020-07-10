//
//  スキル使用条件 ver1.03
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
Imported['TermsOfSkillUse'] = 1.03;

/*:
 * @plugindesc ver1.03/スキルやアイテムに詳細な使用条件を設定できます。
 * CoditionallyCoreのプラグインが必要です。
 * @author Yana
 * 
 * @param Unselectable Target Color
 * @desc　使用条件により選択不能なターゲットの表示色です。
 * Window.pngの右下のインデックスで指定します。
 * @default 5
 * 
 * @param Unselectable Usable
 * @desc　使用条件により選択不能にするかの設定です。
 * falseの場合、スキルが使用できるかどうかのみの判定となります。
 * @default true
 * 
 * @help ------------------------------------------------------
 * 注意
 * ------------------------------------------------------
 * 
 * ・このプラグインの動作には、ConditionallyCoreのプラグインが必要です。
 * ・ConditionallyCoreよりも下に配置してください。
 * ・PassiveSkillと同時に導入する場合、こちらを下に配置してください。
 * 
 * ------------------------------------------------------
 * プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------
 * 設定方法
 * ------------------------------------------------------
 * スキルのメモ欄に
 * <使用条件>
 * ここに条件を記述
 * </使用条件>
 * と記述します。
 * 
 * 使用可能な条件はConditionallyCoreに準拠します。
 * ------------------------------------------------------
 * 仕様と解説
 * ------------------------------------------------------
 * ・対象を取る条件を指定した場合、条件を満たしていない対象は選べなくなります。
 * ・対象を取る条件を指定した場合、条件を満たしていない対象は行動のターゲットから除外されます。
 * ・パッシブスキルと同時に導入した場合、パッシブスキルにも使用条件を適用することが可能です。
 * ・条件変化スキルや条件付き追加効果との併用化は現在きっちりできていません。
 * これらのスキルには条件を指定しないか、対象を自身のみにするような条件にすることをお勧めします。
 * ・使用条件により、戦闘中に誰も使用できないアイテムがアイテムリストに表示されないのは仕様です。
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
 * ver1.03:170306
 * 自動戦闘時に使用条件による対象の制限が機能するように変更。
 * ver1.02:
 * Unselectable Usableがtrueの時、対象選択が正常に動作しないバグを修正。
 * ver1.01:
 * ゲームをロードした時に、正常に使用条件がクリアされていないバグを修正。
 * 条件を満たさない対象が対象にならない機能を無効化する設定を追加。
 * ver1.00:
 * 公開
 */

(function(){

    'use strict';
    
    var parameters = PluginManager.parameters('TermsOfSkillUse');
    var unselectableTargetColor = Number(parameters['Unselectable Target Color'] || 5);
    var unselectableUsable = String(parameters['Unselectable Usable']) === 'true';
    
    function CondSkillManager() {
        throw new Error('This is a static class');
    }
    
    CondSkillManager.initCond = function(note){
        var texts = note.split('\n');
        var flag = false;
        var result = [];
        for(var i=0;i<texts.length;i++){
            if (flag){
                if (texts[i].match(/^<\/使用条件>/)){
                    result.push(effect);
                    flag = false;
                }else{
                    effect['conditions'].push(ConditionallyManager.makeCondition(texts[i]));
                }
            }else if (texts[i].match(/^<使用条件>/)){
                var effect = {'conditions':[]};
                flag = true;
            }
        }
        return result;
    };
    
    var _tOSU_GBBase_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
    Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
        var result = _tOSU_GBBase_meetsSkillConditions.call(this,skill);
        return result && this.isUsableCond(skill);
    };
    var _tOSU_GBBase_meetsItemConditions = Game_BattlerBase.prototype.meetsItemConditions;
    Game_BattlerBase.prototype.meetsItemConditions = function(item) {
        var result = _tOSU_GBBase_meetsItemConditions.call(this,item);
        return result && this.isUsableCond(item);
    };
    
    if (Imported['yPassiveSkill']){
    var _tOSU_GActor_isUsableSkill = Game_Actor.prototype.isUsableSkill;
    Game_Actor.prototype.isUsableSkill = function(skill) {
        var result = _tOSU_GActor_isUsableSkill.call(this,skill);
        var result2 = this.isUsableCond(skill);
        return result && result2;
    };
    }
    
    Game_BattlerBase.prototype.isUsableCond = function(item){
        item._useCond = item._useCond || CondSkillManager.initCond(item.note);
        var user = [this];
        user = user.clone()[0];
        var target = null;
        for(var i=0;i<item._useCond.length;i++){
            var cond = item._useCond[i]['conditions'];
            if ([1, 2, 3, 4, 5, 6].contains(item.scope)){
                if (!$gameParty.inBattle()){ return false }
                var members = this.isActor() ? $gameTroop.aliveMembers() : $gameParty.aliveMembers();
                var result = false;
                for(var j=0;j<members.length;j++){
                    members[j].setLastCond(item,false);
                    if (this.checkUseCond([user,members[j],cond])){ 
                        result = true;
                        members[j].setLastCond(item,true);
                    }
                }
                if (!result){ return false }
            }else if ([7, 8, 9, 10, 11].contains(item.scope)){
                if (item.scope === 11){
                    user.setLastCond(item,false);
                    if (!this.checkUseCond([user,user,cond])){ 
                        return false
                    }else{
                        user.setLastCond(item,true);
                    }
                } else {
                    if (item.scope === 9 || item.scope === 10){ 
                        var members = this.isActor() ? $gameParty.deadMembers() : $gameTroop.deadMembers();
                    } else {
                        var members = this.isActor() ? $gameParty.members() : $gameTroop.members();
                    }
                    var result = false;
                    for(var j=0;j<members.length;j++){
                        members[j].setLastCond(item,false);
                        if (this.checkUseCond([user,members[j],cond])){ 
                            result = true;
                            members[j].setLastCond(item,true);
                        }
                    }
                    if (!result){ return false }
                }
            }else{
                if (!this.checkUseCond([user,target,cond])){ return false }
            }
        }
        return true;
    };
    
    Game_BattlerBase.prototype.checkUseCond = function(args){
        return ConditionallyManager.checkConditions(args[0],args[1],args[2]);
    };
    Game_BattlerBase.prototype.lastCond = function(item){
        if (!this._lastCond){ this.initLastCond() }
        var type = DataManager.isItem(item) ? 'item' : 'skill';
        if (this._lastCond[type][item.id] === undefined ){ return true }
        return this._lastCond[type][item.id];
    };
    Game_BattlerBase.prototype.setLastCond = function(item,result){
        if (!this._lastCond){ this.initLastCond() }
        if (DataManager.isItem(item)){
            this._lastCond['item'][item.id] = result;
        }else{  
            this._lastCond['skill'][item.id] = result;
        }
    };
    Game_BattlerBase.prototype.initLastCond = function(){
        this._lastCond = { 'item':[],'skill':[] };
    };
    
    Game_Unit.prototype.initLastCond = function() {
        for (var i=0;i<this.members().length;i++){
            var member = this.members()[i];
            if (member){ member.initLastCond() }
        }
    };
    
    var _tOSU_BManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        $gameParty.initLastCond();
        $gameTroop.initLastCond();
        _tOSU_BManager_startBattle.call(this);
    };
    
    ////////////////////////////////////////////////////////////////////////////
    
    // 条件を満たさない対象を判定する
    Window_BattleActor.prototype.isEnabled = function(index){
        if (!unselectableUsable){ return true }
        if (!BattleManager.inputtingAction()){ return true }
        var item = BattleManager.inputtingAction().item();
        return $gameParty.battleMembers()[index].lastCond(item);
    };
    // 再定義 条件を満たさない対象を選べないようにする
    Window_BattleActor.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.index());
    };
    // 再定義 条件を満たさない対象を半透明にする
    Window_BattleActor.prototype.drawItem = function(index) {
        var actor = $gameParty.battleMembers()[index];
        this.changePaintOpacity(this.isEnabled(index));
        this.drawBasicArea(this.basicAreaRect(index), actor);
        this.drawGaugeArea(this.gaugeAreaRect(index), actor);
    };
    Window_BattleActor.prototype.drawActorName = function(actor, x, y, width) {
        width = width || 168;
        this.changeTextColor(this.hpColor(actor));
        if (!this.isEnabled($gameParty.battleMembers().indexOf(actor))) {
            this.changeTextColor(this.textColor(unselectableTargetColor))
        }
        this.drawText(actor.name(), x, y, width);
    };
    // 条件を満たさない対象を判定する
    Window_BattleEnemy.prototype.isEnabled = function(index){
        if (!unselectableUsable){ return true }
        if (!BattleManager.inputtingAction()){ return true }
        var item = BattleManager.inputtingAction().item();
        return this._enemies[index].lastCond(item);
    };
    // 再定義 条件を満たさない対象を選べないようにする
    Window_BattleEnemy.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.index());
    };
    // 再定義 条件を満たさない対象を半透明にする
    Window_BattleEnemy.prototype.drawItem = function(index) {
        this.resetTextColor();
        var name = this._enemies[index].name();
        var rect = this.itemRectForText(index);
        this.changePaintOpacity(this.isEnabled(index));
        if (!this.isEnabled(index)) { this.changeTextColor(this.textColor(unselectableTargetColor)) }
        this.drawText(name, rect.x, rect.y, rect.width);
    };
    
    // 直前に呼び出されたスキル(アイテム)をmembersで条件判定するために登録する
    var _tOSU_GAction_makeTargets = Game_Action.prototype.makeTargets;
    Game_Action.prototype.makeTargets = function() {
        if (this._targetIndex < 0) CondSkillManager._callRT = this.item();
        var targets = _tOSU_GAction_makeTargets.call(this);
        CondSkillManager._callRT = null;
        return targets;
    };
    // 正常に取得するため、members内の処理を制御するためのフラグを立てる
    var _tOSU_GAction_subject = Game_Action.prototype.subject;
    Game_Action.prototype.subject = function() {
        CondSkillManager._callAs = true;
        var subject = _tOSU_GAction_subject.call(this);
        CondSkillManager._callAs = false;
        return subject;
    };

    var _tOSU_GAction_itemTargetCandidates = Game_Action.prototype.itemTargetCandidates;
    Game_Action.prototype.itemTargetCandidates = function() {
        CondSkillManager._callRT = this.item();
        var members = _tOSU_GAction_itemTargetCandidates.call(this);
        CondSkillManager._callRT = null;
        return members;
    };
    
    // 条件に従って、対象を制限する
    var _tOSU_GParty_members = Game_Party.prototype.members;
    Game_Party.prototype.members = function(){
        var members = _tOSU_GParty_members.call(this);
        if (!unselectableUsable){ return members }
        if (CondSkillManager._callRT && !CondSkillManager._callAs){
            members = members.filter(function(member){
                return member.lastCond(CondSkillManager._callRT);
            });
        }
        return members;
    };
    // 条件に従って、対象を制限する
    var _tOSU_GTroop_members = Game_Troop.prototype.members;
    Game_Troop.prototype.members = function(){
        var members = _tOSU_GTroop_members.call(this);
        if (!unselectableUsable){ return members }
        if (CondSkillManager._callRT && !CondSkillManager._callAs){
            members = members.filter(function(member){
                return member.lastCond(CondSkillManager._callRT);
            });
        }
        return members;
    };
    // 有効な対象にカーソルを移動する
    Window_Selectable.prototype.selectEnable = function() {
        for(var i=0;i<this.maxItems();i++){
            this.select(i);
            if (this.isCurrentItemEnabled()) {return }
        }
    };
    // アクターウィンドウの初期インデックスを選択可能なアクターに変更する
    var _tOSU_SBattle_selectActorSelection = Scene_Battle.prototype.selectActorSelection;
    Scene_Battle.prototype.selectActorSelection = function() {
        _tOSU_SBattle_selectActorSelection.call(this);
        this._actorWindow.selectEnable();
    };
    // エネミーウィンドウの初期インデックスを選択可能なエネミーに変更する
    var _tOSU_SBattle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
    Scene_Battle.prototype.selectEnemySelection = function() {
        _tOSU_SBattle_selectEnemySelection.call(this);
        this._enemyWindow.selectEnable();
    };
}());
