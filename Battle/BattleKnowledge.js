//
//  ○○の知識 ver1.03
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
Imported['BattleKnowledge'] = 1.03;

/*:
 * @plugindesc ver1.03/ダメージに補正を与える色々な機能を追加します。
 * @author Yana
 * 
 * @help------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------ 
 * 設定方法
 * ------------------------------------------------------ 
 * 特徴を持ったオブジェクト(アクター、クラス、武器、防具、エネミー、ステート等)のメモ欄に以下の記述をすることで、
 * 特定の行動の効果量を補正する効果を得ることができるようになります。
 * これらの補正値はダメージ計算式に掛かります。
 * 
 * ・命中タイプが物理の行動の威力をx%増加する。
 * <武道の知識:+x%>
 * 
 * ・命中タイプが魔法の行動の威力をx%増加する。
 * <魔道の知識:+x%>
 * 
 * ・ダメージタイプがHP回復、MP回復の行動の効果をx%増加する。
 * <治癒の知識:+x%>
 * 
 * ・アイテムによるダメージ計算式の効果をx%増加する。
 * <道具の知識:+x%>
 * 
 * ・クリティカル発生時に効果をx%増加する。
 * <クリティカルの知識:+x%>
 * <会心の知識:+x%>
 * <痛撃の知識:+x%>
 * 
 * ・装備している武器タイプが○○の時に効果をx%増加する。
 * <○○の知識:+x%>
 * 
 * ・行動の属性が○○の時に効果をx%増加する。
 * <○○の知識:+x%>
 * 
 * ・メモにxxxを含むアイテムやスキルを使用した時の効果をy%増加する。
 * <xxxの知識:+y%>
 * 
 * また、これらは同じものが複数ある場合、数値は合算されて計算されます。
 * 武道の知識20%と武道の知識30%を持っている場合、、+50%となります。
 * 
 * ConditionallyCoreと同時に導入されている場合、発動条件と発動確率を設定することができます。
 * <xxxの知識:+y%,z%>
 * 発動条件
 * </xxxの知識>
 * と記述すると、xxxの知識の効果がz%の確率で+y%増加します。
 * xxxは上記で記述のある武道、魔道、治癒、道具、クリティカルなどになります。
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
 * ver1.03:
 * 利用規約をMITライセンスに変更
 * 武器タイプで効果を発揮する知識をエネミーに設定するとエラーが発生するバグを修正
 * ver1.02:
 * 武器タイプで効果を発揮する知識が物理攻撃以外にも発生していたバグを修正
 * ver1.01:
 * 武器タイプで効果を発揮する知識の設定を追加
 * 行動の属性で効果を発揮する知識の設定を追加
 * ver1.00:
 * 公開
 */


(function() {
    
    var parameters = PluginManager.parameters('BattleKnowledge');
    
    function BattleKnowledgeManager() {
        throw new Error('This is a static class');
    };
    
    BattleKnowledgeManager.initCond = function(note){
        var texts = note.split('\n');
        var flag = false;
        var knowledge = {};
        var type = null;
        for(var i=0;i<texts.length;i++){
            if (Imported['ConditionallyCore']){
                if (flag){
                    if (texts[i].match(/^<\/(.+)の知識>/)){
                        if (type !== RegExp.$1){ type = null }
                        type = this.setType(type);
                        if (type) { 
                            if (!knowledge[type]) { knowledge[type] = [] }
                            knowledge[type].push(effect);
                        }
                        flag = false;
                    }else{
                        effect['conditions'].push(ConditionallyManager.makeCondition(texts[i]));
                    }
                    continue;
                }else if (texts[i].match(/^<(.+)の知識:([+-]?\d+)[%％],(\d+)[%％]>/)){
                    type = RegExp.$1;
                    var effect = {
                        'value':Number(RegExp.$2)/100,
                        'rate':Number(RegExp.$3)/100,
                        'conditions':[]
                        };
                    flag = true;
                    continue;
                }
            }
            if (texts[i].match(/^<(.+)の知識:([+-]?\d+)[%％]>/)){
                type = RegExp.$1;
                var num = Number(RegExp.$2)/100;
                var effect = {'value':num,'rate':1,'conditions':[]}
                type = this.setType(type);
                if (type) { 
                    if (!knowledge[type]) { knowledge[type] = [] }
                    knowledge[type].push(effect);
                }
            }
        }
        return knowledge;
    };
    
    BattleKnowledgeManager.setType = function(type) {
        switch (type){
        case '武道':
            type = 'physical';
            break;
        case '魔道':
            type = 'magical';
            break;
        case '治癒':
            type = 'heal';
            break;
        case '道具':
            type = 'item';
            break;
        case '痛撃':
        case 'クリティカル':
        case '会心':
            type = 'critical';
            break;
        }
        return type;
    };
    
    BattleKnowledgeManager.initialize = function(obj) {
        if (!obj._knowledge) {
            obj._knowledge = this.initCond(obj.note);
        }
    };
    
    BattleKnowledgeManager.multipleValue = function(obj,item,target,subject,critical) {
        this.initialize(obj);
        var value = 1.0;
        for(var key in obj._knowledge){
            value += this.checkEnableValue(key,obj,item,target,subject,critical);
        }
        return value;
    };
    
    BattleKnowledgeManager.checkEnableValue = function(type, obj, item, target, subject, critical) {
        var result = 0;
        var flag = false;
        for (var i=0;i<obj._knowledge[type].length;i++){
            var k = obj._knowledge[type][i];
            if (k){
                var value = k['value'];
                switch(type){
                case 'physical':
                    flag = item.hitType === Game_Action.HITTYPE_PHYSICAL;
                    break;
                case 'magical':
                    flag = item.hitType === Game_Action.HITTYPE_MAGICAL;
                    break;
                case 'heal':
                    flag = [3,4].contains(item.damage.type);
                    break;
                case 'item':
                    flag = DataManager.isItem(item);
                    break;
                case 'critical':
                    flag = critical;
                    break;
                default:
                    if ($dataSystem.weaponTypes.contains(type)){
                        var id = $dataSystem.weaponTypes.indexOf(type);
                        flag = subject.isActor() && subject.isWtypeEquipped(id) && item.hitType === Game_Action.HITTYPE_PHYSICAL;
                    } else if ($dataSystem.elements.contains(type)){
                        var id = $dataSystem.elements.indexOf(type);
                        if (item.damage.elementId < 0){
                            flag = subject.attackElements().contains(id);
                        }else{
                            flag = item.damage.elementId === id;
                        }
                    } else {
                        flag = this.isCheckIncludeKey(item,type);
                    }
                }
                if (flag) {
                    if (Imported['ConditionallyCore']){
                        if (Math.random() < k['rate']){
                            var dieStatus = {
                                'turn':BattleManager.ccTurnCount(),
                                'finisher':subject,
                                'item':item,
                                'damage':0,
                                'state':target._states,
                                'fState':subject._states
                            };
                            if (ConditionallyManager.checkConditions(subject,target,k['conditions'],dieStatus)){
                                result += value;
                            }
                        }
                    }else{
                        result += value;
                    }
                }
            }
        }
        return result;
    };
    
    BattleKnowledgeManager.isCheckIncludeKey = function(item,type) {
        if (!item._knType){ item._knType = {} }
        if (item._knType[type]) { return true }
        var texts = item.note.split('/n');
        for(var i=0;i<texts.length;i++) {
            if (!!texts[i].match(RegExp(type))){
                item._knType[type] = true;
                return true;
            }
        }
        return false;
    };
    
    var _GAction_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function(target, critical) {
        var result = _GAction_makeDamageValue.call(this,target,critical);
        var subject = this.subject();
        var addValue = 0;
        var multipleValue = 1.0;
        var item = this.item();
        subject.traitObjects().forEach(function(obj){
            if (obj) {
                multipleValue *= BattleKnowledgeManager.multipleValue(obj,item,target,subject,critical);
            }
        });
        result *= multipleValue;
        return Math.floor(result);
    };
}());
