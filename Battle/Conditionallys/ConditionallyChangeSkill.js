//
//  条件変化スキル＆アイテム ver1.05
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
Imported['ConditionallyChangeSkill'] = 1.05;

/*:
 * @plugindesc ver1.05/条件を満たすと別のスキルやアイテムに変化するスキルやアイテムを作成できます。
 * @author Yana
 * 
 * @param Display Flash Text
 * @desc 閃いた時のメッセージ。_subjectが発動者の名前に、
 * _nameが閃いたスキル名に置き換わります。
 * @default _subjectは_nameを閃いた！
 * 
 * @param Cond Change Skill Flash Anime
 * @desc 閃きが発生した時、キャラに表示されるアニメのID。
 * @default 120
 * 
 * @help プラグインコマンドはありません。
 * 
 * スキルやアイテムのメモ欄に
 * 
 * <条件変化:○,x%>
 * 発動条件
 * </条件変化>
 * 
 * と記述してください。
 * スキルの場合は○番のスキルに、アイテムの場合は○番のアイテムに変化します。
 * また、変化後のスキルに<使用後習得>と記述されていてそのスキルを覚えていない場合、
 * 対象のスキルは閃き扱いになり、スキル変化後にそのスキルを習得し、閃いたような演出ができます。
 * また、その際、指定したIDのアニメーションを閃いたキャラに表示します。
 * 
 * 発動条件の詳細はConditionallyCoreのヘルプを参照してください。
 * 発動時の表示メッセージはnullにすることで表示を無効化することができます。
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
 * ver1.05:180930
 * 条件変化したスキルの対象が変化前と同一の場合も対象が変化していたバグを修正。
 * ver1.04:
 * 利用規約をMITライセンスに変更。
 * 閃いたスキルがノイズになっていたバグを修正。
 * ver1.03:
 * 表示を無効化する機能が正常に動作していないバグを修正。
 * ver1.02:
 * エネミーが閃こうとしていたバグを修正
 * ver1.01:
 * エラーが発生していたバグを修正
 * ver1.00:
 * 公開
 */

(function(){
    
    var parameters = PluginManager.parameters('ConditionallyChangeSkill');
    var displayFlashText = String(parameters['Display Flash Text'] || '_subjectは_nameを閃いた！');
    var ccsFlashAnime = Number(parameters['Cond Change Skill Flash Anime'] || 120);
    
    function ChangeSkillManager() {
        throw new Error('This is a static class');
    }
    
    ChangeSkillManager.initCond = function(note){
        var texts = note.split('\n');
        var flag = false;
        var result = [];
        for(var i=0;i<texts.length;i++){
            if (flag){
                if (texts[i].match(/^<\/条件変化>/)){
                    result.push(effect);
                    flag = false;
                }else{
                    effect['conditions'].push(ConditionallyManager.makeCondition(texts[i]));
                }
            }else if (texts[i].match(/^<条件変化:(\d+),(\d+)[%％]>/)){
                var effect = {
                    'type':null,
                    'id':parseInt(RegExp.$1),
                    'rate':parseInt(RegExp.$2),
                    'conditions':[]
                    };
                flag = true;
            }
        }
        return result;
    };
    
    var _CCs_BManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function(){
        var currentAction = this._subject.currentAction();
        if (currentAction) {
            var item = currentAction.item();
            this._costSkill = null;
            item._conditionallyChange = item._conditionallyChange || ChangeSkillManager.initCond(item.note);
            var cItem = this.checkChangeSkill(item);
            if (cItem && !this.flashSkill(cItem)) {
                if (DataManager.isFlashSkill(cItem) && this._subject.isActor()) {
                    this._logWindow.displaySkillFlash(this._subject, cItem);
                    this._subject.learnSkill(cItem.id);
                    this._subject.startAnimation(ccsFlashAnime, false);
                }
                var action = new Game_Action(this._subject);
                this._costSkill = item;
                if (DataManager.isSkill(cItem)) {
                    action.setSkill(cItem.id);
                } else {
                    action.setItem(cItem.id);
                }
                if (!(action.isForAll() || action.isForRandom())) {
                    action.setTarget(currentAction._targetIndex);
                }
                this._subject._actions[0] = action;
            }
        }
        _CCs_BManager_startAction.call(this);
    };
    
    BattleManager.flashSkill = function(cItem){
        if (this._subject.isEnemy()){ return false }
        return DataManager.isFlashSkill(cItem) && this._subject.isLearnedSkill(cItem.id);
    };
    
    BattleManager.checkChangeSkill = function(item){
        var user = this._subject;
        var cAction = user.currentAction();
        var dAction = new Game_Action(this._subject);
        for (var i=0;i<item._conditionallyChange.length;i++){
            var cond = item._conditionallyChange[i];
            var cItem = DataManager.isSkill(item) ? $dataSkills[cond['id']] : $dataItems[cond['id']];
            if (this.flashSkill(cItem)) continue;
            DataManager.isSkill(cItem) ? dAction.setSkill(cItem) : dAction.setItem(cItem);
            if (Math.random() < (cond['rate'] / 100)){
                var tIndex = cAction._targetIndex;
                var members = [];
                if (cAction.isForOpponent()){
                    members = $gameTroop.members();
                }else{
                    members = $gameParty.members();
                }
                if (tIndex < 0){
                    for(;;){
                        tIndex = Math.randomInt(members.length);
                        if (members[tIndex].isAlive()){ break }
                    }
                }
                var target = members[tIndex];
                if (ConditionallyManager.checkConditions(user,target,cond['conditions'])){
                    return cItem;
                }
            }
        }
        return false;
    };
    
    DataManager.isFlashSkill = function(item){
        if (item._flashSkill === undefined){
            item._flashSkill = item.note.match(/<使用後習得>/) ? true : false;
        }
        return item._flashSkill;
    };
    
    Window_BattleLog.prototype.displaySkillFlash = function(subject,item){
        var text = displayFlashText;
        if (text && text != 'null') {
            text = text.replace('_subject',subject.name());
            text = text.replace('_name',item.name);
            this.push('addText', text);
            this.push('wait');
            this.push('clear');
        }
    };
    // スキル変化した際の消費は元スキルのものを使用
    var _CCs_GBattler_useItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function(item) {
        item = BattleManager._costSkill ? BattleManager._costSkill : item;
        _CCs_GBattler_useItem.call(this,item);
    };
}());
