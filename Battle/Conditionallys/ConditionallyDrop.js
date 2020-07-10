//
//  条件付きドロップ ver1.04
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
Imported['ConditionallyDrop'] = 1.04;

/*:
 * @plugindesc ver1.04/条件を満たすとドロップするアイテムを設定できるようになります。
 * @author Yana
 * 
 * @param Display Reward Item Text
 * @desc 条件ドロップでアイテムを入手した際、通常の表示の前に追加されるメッセージ。
 * @default \c[6]Bonus!
 * 
 * @param Display Reward Gold Text
 * @desc 条件ドロップでお金を入手した際、通常の表示の前に追加されるメッセージ。
 * @default \c[6]Bonus!
 * 
 * @param Display Reward Exp Text
 * @desc 条件ドロップで経験値を入手した際、通常の表示の前に追加されるメッセージ。
 * @default \c[6]Bonus!
 * 
 * @help プラグインコマンドはありません。
 * 
 * エネミーのメモ欄に
 * 
 * <条件ドロップ:I○,×%>
 * 発動条件
 * </条件ドロップ>
 * 
 * または、
 * 
 * <条件ドロップ:W○,×%>
 * 発動条件
 * </条件ドロップ>
 * 
 * または、
 * 
 * <条件ドロップ:A○,×%>
 * 発動条件
 * </条件ドロップ>
 * 
 * または、
 * 
 * <条件ドロップ:G○,×%>
 * 発動条件
 * </条件ドロップ>
 * 
 * または、
 * 
 * <条件ドロップ:E○,×%>
 * 発動条件
 * </条件ドロップ>
 * 
 * と記述してください。
 * 
 * Iはアイテム、Wは武器、Aは防具、Gはお金、Eは経験値となります。
 * IWAの場合はIDのアイテムを、GEの場合はその数値分のお金または経験値を、
 * 条件を満たした時、x%の確率で獲得します。
 * 
 * 発動条件の詳細はConditionallyCoreのヘルプを参照してください。
 * ドロップ時の表示メッセージはnullにすることで追加を無効化することができます。
 * 
 * また、入手インフォメーションと併用する場合、こちらを入手インフォメーションより上に導入することにより、
 * 条件ドロップしたアイテムやお金や経験値をインフォメーション表示させることができます。
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
 * ver1.04:
 * 死亡時の状況を保存する処理を修正しました。
 * ver1.03:
 * 利用規約をMITライセンスに変更しました。
 * イベントコマンドで戦闘不能を付与するとエラーが発生することのあるバグを修正しました。
 * ver1.02:
 * 追加ドロップ発生後、テキストの色が変更されたままになるバグを修正しました。
 * ver1.01:
 * メッセージの無効化が正常に機能していなかったバグを修正しました。
 * ver1.00:
 * 公開
 */

(function(){

    'use strict';
    
    var parameters = PluginManager.parameters('ConditionallyDrop');
    var displayRewardsItemText = String(parameters['Display Reward Item Text'] || '\\c[6]Bonus! ');
    var displayRewardsGoldText = String(parameters['Display Reward Gold Text'] || '\\c[6]Bonus! ');
    var displayRewardsExpText = String(parameters['Display Reward Exp Text'] || '\\c[6]Bonus! ');
    
    function ConditionallyDropManager() {
        throw new Error('This is a static class');
    };
    
    ConditionallyDropManager.initCond = function(note){
        var texts = note.split('\n');
        var flag = false;
        var result = [];
        for(var i=0;i<texts.length;i++){
            if (flag){
                if (texts[i].match(/^<\/条件ドロップ>/)){
                    result.push(effect);
                    flag = false;
                }else{
                    effect['conditions'].push(ConditionallyManager.makeCondition(texts[i]));
                }
            }else if (texts[i].match(/^<条件ドロップ:([IWAGE])(\d+),(\d+)[%％]>/)){
                var effect = {
                    'type':RegExp.$1,
                    'id':parseInt(RegExp.$2),
                    'rate':parseInt(RegExp.$3),
                    'conditions':[]
                    };
                flag = true;
            }
        }
        return result;
    };
    
    var _CDp_GBBase_die = Game_BattlerBase.prototype.die;
    Game_BattlerBase.prototype.die = function(){
        if ($gameParty._inBattle && BattleManager._subject && BattleManager._lastAction) this.setDieStatus();
        _CDp_GBBase_die.call(this);
    };
    
    Game_BattlerBase.prototype.setDieStatus = function(){
        this._dieStatus = {
            'turn':BattleManager.ccTurnCount(),
            'finisher':[BattleManager._subject.isActor(), BattleManager._subject.index()],
            'item':BattleManager._lastAction.item(),
            'damage':BattleManager._subject._lastDamage,
            'state':this._states.clone(),
            'fState':BattleManager._subject._states.clone()
        };
    };
    
    var _CDp_GEnemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
    Game_Enemy.prototype.makeDropItems = function() {
        var result = _CDp_GEnemy_makeDropItems.call(this);
        this._conditionallyRewards = this.makeConditionallyDrops();
        return result;
    };
    
    BattleManager.conditionallyRewards = function(code){
        switch (code){
        case 'exp':
            return $gameTroop.deadMembers().reduce(function(r, enemy) {
                return r + enemy._conditionallyRewards['exp'];
            }, 0);
        case 'gold':
            return $gameTroop.deadMembers().reduce(function(r, enemy) {
                return r + enemy._conditionallyRewards['gold'];
            }, 0) * $gameTroop.goldRate();
        case 'item':
            return $gameTroop.deadMembers().reduce(function(r, enemy) {
                return r.concat(enemy._conditionallyRewards['item']);
            }, []);
        default:
        }
    };

    var _CDp_BManager_displayRewards = BattleManager.displayRewards;
    BattleManager.displayRewards = function() {
        _CDp_BManager_displayRewards.call(this);
        this.displayCondRewards();
    };

    BattleManager.displayCondRewards = function() {
        this.displayCondExp();
        this.displayCondGold();
        this.displayCondDropItems();
    };

    BattleManager.displayCondExp = function() {
        var exp = this.conditionallyRewards('exp');
        if (exp > 0) {
            var text = TextManager.obtainExp.format(exp, TextManager.exp);
            if(displayRewardsExpText != 'null') { 
                text = displayRewardsExpText + text 　+ '\\C[0]';
            }
            $gameMessage.add('\\.' + text);
        }
    };

    BattleManager.displayCondGold = function() {
        var gold = this.conditionallyRewards('gold');
        if (gold > 0) {
            var text = TextManager.obtainGold.format(gold);
            if(displayRewardsGoldText != 'null') { 
                text = displayRewardsGoldText + text 　+ '\\C[0]';
            }
            $gameMessage.add('\\.' + text);
        }
    };

    BattleManager.displayCondDropItems = function() {
        var items = this.conditionallyRewards('item');
        if (items.length > 0) {
            $gameMessage.newPage();
            items.forEach(function(item) {
                var text = TextManager.obtainItem.format(item.name);
                if(displayRewardsItemText != 'null') { 
                    text = displayRewardsItemText + text　+ '\\C[0]';
                }
                $gameMessage.add(text);
            });
        }
    };
    
    var _CDp_BManager_gainRewards = BattleManager.gainRewards;
    BattleManager.gainRewards = function() {
        _CDp_BManager_gainRewards.call(this);
        this.gainCondRewards();
    };

    BattleManager.gainCondRewards = function() {
        this.gainCondExp();
        this.gainCondGold();
        this.gainCondDropItems();
    };

    BattleManager.gainCondExp = function() {
        var exp = this.conditionallyRewards('exp');
        $gameParty.allMembers().forEach(function(actor) {
            actor.gainExp(exp);
        });
    };

    BattleManager.gainCondGold = function() {
        $gameParty.gainGold(this.conditionallyRewards('gold'));
    };

    BattleManager.gainCondDropItems = function() {
        var items = this.conditionallyRewards('item');
        items.forEach(function(item) {
            $gameParty.gainItem(item, 1);
        });
    };
    
    Game_Enemy.prototype.makeConditionallyDrops = function(){
        var result = {'item':[],'gold':0,'exp':0};
        if (!this._dieStatus) return result;
        this._conditionallyDrop = this._conditionallyDrop || ConditionallyDropManager.initCond(this.enemy().note);
        for(var i=0;i<this._conditionallyDrop.length;i++){
            var cond = this._conditionallyDrop[i];
            if (Math.random() < (cond['rate'] / 100)){
                var self = $gameTroop.members()[$gameTroop.members().indexOf(this)];
                var finisher = ConditionallyManager.decodeFinisher(this._dieStatus['finisher']);
                finisher = finisher ? finisher : self;
                if (ConditionallyManager.checkConditions(self, finisher, cond['conditions'], this._dieStatus)){
                    switch(cond['type']){
                    case 'I':
                        result['item'].push($dataItems[cond['id']]);
                        break;
                    case 'W':
                        result['item'].push($dataWeapons[cond['id']]);
                        break;
                    case 'A':
                        result['item'].push($dataArmors[cond['id']]);
                        break;
                    case 'G':
                        result['gold'] += cond['id'];
                        break;
                    case 'E':
                        result['exp'] += cond['id'];
                        break;
                    default:
                    }
                }
            }
        }
        return result;
    };
}());
