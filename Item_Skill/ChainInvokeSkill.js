//
//  連携発動スキルver1.021
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
Imported['ChainInvokeSkill'] = 1.021;

/*:
 * @plugindesc ver1.021/特定の組み合わせでスキルを使用することで、追加でスキルを発動させるプラグインです。
 * @author Yana
 * 
 * @param ChainActionCount
 * @desc 連携の受付時間として使用されるアクションカウント数です。
 * @default 5
 * @type number
 * 
 * @param ChainSkillType
 * @desc 連携発動スキルとして認識するスキルタイプです。
 * @default 3
 * @type number
 * 
 * @param MBSkillType
 * @desc MB可能なスキルタイプです。複数指定可能です。
 * ここで指定したスキルタイプは設定が無くてもMB可能です。
 * @default 1
 * @type number
 * 
 * @param MagicBurstRate
 * @desc マジックバーストのダメージアップ率です。
 * %で指定してください。
 * @default 50
 * @type number
 *  
 * @param MagicBurstStateRate
 * @desc マジックバースト時のステート付与率修正です。
 * %で指定してください。
 * @default 100
 * @type number
 * 
 * @param TextMagicBurst
 * @desc マジックバースト発生時に表示するテキストです。
 * @default →マジックバースト！
 * 
 * @param ContinuousChainRate
 * @desc 連続チェインで上昇するダメージの倍率です。
 * 連携が1つ進むにつれ、この数値%分ずつダメージが上昇します。
 * @default 20
 * @type number
 * 
 * @param ChainPostponementRate
 * @desc 連続チェインで減少する連携猶予の倍率です。
 * 連携が1つ進むにつれ、この数値%分ずつ連携猶予が減少します。
 * @default 10
 * @type number
 * 
 * @param ContinuousMBRate
 * @desc 連続チェインで上昇するマジックバーストの倍率です。
 * 連携が1つ進むにつれ、この数値%分ずつダメージが上昇します。
 * @default 20
 * @type number
 * 
 * @param MBPostponement
 * @desc MB発動猶予として使用するアクションカウント数です。
 * @default 10
 * @type number
 * 
 * @help ------------------------------------------------------
 * 設定方法
 * ------------------------------------------------------
 * 
 * 特定の組み合わせでスキルを使用することで、追加でスキルを発動させるプラグインです。
 * 発動したスキルに合わせて、特定の属性のダメージを強化したり、
 * 特定の属性のステートの命中率を上げたりすることができます。
 * これをマジックバーストと呼びます。
 * 要するに、FF11の連携を再現したプラグインです。
 * 
 * ---設定の基本---
 * このプラグインの設定は大きく分けて3つに分かれています。
 * ・連携で発動するスキルの設定
 * ・連携を行うスキルの設定
 * ・その他の設定
 * です。
 * このうち、連携で発動するスキルの設定と、連携を行うスキルの設定は、
 * 必ず設定を行う必要があります。
 * 
 * ---連携で発動するスキルの設定---
 * 連携で発動するスキルは、スキルタイプをChainSkillTypeで設定したIDの
 * スキルタイプにしてください。 
 * 
 * また、ダメージ計算式にthis.lcd()という、連携を発生したスキルで与えた
 * ダメージに変化するメソッドを使用することが可能です。
 * 例:連携を発生させたスキルが与えたダメージの2倍のダメージに設定する。
 * this.lcd() * 2.0
 * 
 * スキルの使用メッセージは、専用の処理を使用し、使用者の名前を表示しません。
 * また、_nameをスキル名、_countを現在の連携回数に置き換えます。
 * 
 * 以下はメモを使った設定です。
 * 連携組み合わせの設定は必ず行ってください。(設定しないと発動しません)
 * 
 * 1．連携時発動属性の設定
 * 該当スキルのメモ欄に、
 * <連携時発動属性:x,x,x・・・>
 * または、
 * <ChainInvokeElements:x,x,x・・・>
 * と記述すると、スキルのマジックバースト用の属性が、x,x,x・・・に設定されます。
 * このスキルが発動した後、ここで設定した属性のMB可能なスキルを合わせることで、
 * マジックバーストが発生します。
 * 
 * 2．連携組み合わせの設定
 * 該当スキルのメモ欄に、
 * <連携組み合わせ:xxx,yyy>
 * または、
 * <ChainCombiPattern:xxx,yyy>
 * と記述すると、このスキルを発動させるための連携属性の組み合わせを設定できます。
 * 連携属性xxxのスキルの後にyyyのスキルを発動することで、この連携スキルが発動します。
 * 複数設定することも可能です。
 * 連携属性とは、連携発動スキルの名前になります。
 * 
 * 3．連携猶予の設定
 * 該当スキルのメモ欄に
 * <連携猶予:x>
 * または、
 * <ChainPostponement:x>
 * と記述すると、連携の受付時間をxに設定します。
 * この時間はアクションカウント数という数値で管理され、アクションカウント数は、
 * 誰かがendAction、つまり行動終了するごとに1ずつカウントされます。
 * 猶予が10の時、敵味方全員で合計10回行動すると、連携の受付時間は終了します。
 * 
 * また、連携猶予は連携数が増加するごとに、ChainPostponementRateで指定した
 * 値%ずつ減少していきます。
 * 連携猶予が10で、ChainPostponementが10%の時、
 * 2連携で9回、3連携で8回、4連携で7回・・・9連携で2回、10連携以降は1回となります。
 * 
 * 4．MB猶予の設定
 * 該当スキルのメモ欄に、
 * <MB猶予:x>
 * または、
 * <MBPostponement:x>
 * と記述すると、マジックバーストの受付時間をxに設定します。
 * この時間はアクションカウント数という数値で管理され、アクションカウント数は、
 * 誰かがendAction、つまり行動終了するごとに1ずつカウントされます。
 * 猶予が10の時、敵味方全員で合計10回行動すると、MBの受付時間は終了します。
 * 
 * 5．MBダメージ率の設定
 * 該当スキルのメモ欄に、
 * <MBダメージ率:x%>
 * または、
 * <MBDamageRate:x%>
 * と記述すると、マジックバーストのダメージ率をx%に設定します。
 * また、ステートの有効度も上昇します。
 * 
 * 6．MBチェインダメージ率の設定
 * 該当スキルのメモ欄に、
 * <MBチェインボーナス率:x%>
 * または、
 * <MBChainBonusRate:x%>
 * と記述すると、マジックバーストのチェインボーナス率をx%に設定します。
 * (連携数-1)*チェインボーナス率がマジックバーストのダメージ率に加算されます。
 * また、ステート有効度も上昇します。
 * 
 * それぞれの項目は、設定がない場合プラグインパラメータで設定した値が使用されます。
 * 
 * ---連携を行うスキルの設定---
 * スキルのメモ欄に
 * <連携属性:xxx,xxx,xxx・・・>
 * または、
 * <ChainElements:xxx,xxx,xxx・・・>
 * と記述することで、そのスキルの連携属性をxxx,xxx,xxx・・・に設定することが可能です。
 * xxxは連携発動スキルの名前で設定します。
 * この際、連携は左から順に優先度が設定されます。
 * 
 * ---その他の設定---
 * ・マジックバーストを行うスキルの設定
 * スキルのメモ欄に
 * <MB可>
 * または、
 * <MBEnable>
 * と記述すると、そのスキルはマジックバースト可能になります。
 * ただし、マジックバーストは連携発動スキルの連携時発動属性に含まれている場合のみ発生します。
 * また、MBSkillTypeで設定されているIDのスキルタイプを持つスキルは、全てMB可として扱われます。
 * 
 * 特徴を持つオブジェクトのメモ欄に、
 * <連携ボーナス:+x%>
 * または、
 * <ChainBonus:+x%>
 * と記述すると、連携発動スキルのダメージをx%上昇させます。
 * これらの数値は、各特徴毎に加算されます。
 * 
 * 特徴を持つオブジェクトのメモ欄に、
 * <MBボーナス:+x%>
 * または、
 * <MBBonus:+x%>
 * と記述すると、マジックバーストのダメージとステート有効度をx%上昇させます。
 * これらの数値は、各特徴毎に加算されます。
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
 * ※本プラグインは、ネ実ツクスレwiki(http://www6.atwiki.jp/pokotan/)で
 * 公開されている、「VX Ace用オススメ風連携」を移植、改変したものとなります。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.021:180101
 * プラグインパラメータの仕様を1.5.0に更新。
 * ver1.02:170908
 * バトラーの情報に無駄な配列が残る可能性のあるバグを修正
 * ver1.01:
 * 一部処理を修正。
 * インタセプト用の処理を追加。
 * ver1.00:
 * 公開
 */

(function(){
    ////////////////////////////////////////////////////////////////////////////////////
    
    var parameters = PluginManager.parameters('ChainInvokeSkill');
    var chainActionCount = Number(parameters['ChainActionCount']);
    var chainSkillType = Number(parameters['ChainSkillType']);
    var mbSkillType = parameters['MBSkillType'].split(',').map(function(s){ return Number(s) });
    var magicBurstRate = Number(parameters['MagicBurstRate']);
    var magicBurstStateRate = Number(parameters['MagicBurstStateRate']);
    var textMagicBurst = String(parameters['TextMagicBurst']);
    var continuousChainRate = Number(parameters['ContinuousChainRate']);
    var chainPostponementRate = Number(parameters['ChainPostponementRate']);
    var continuousMBRate = Number(parameters['ContinuousMBRate']);
    var mbPostponement = Number(parameters['MBPostponement']);
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    DataManager.chainBonus = function(item) {
        if (!item){ return 0 }
        if (item._chainBonus === undefined){
            item._chainBonus = 0;
            if (item.meta['連携ボーナス']){ item._chainBonus = Number(item.meta['連携ボーナス'].replace(/[%％]/,'')) }
            if (item.meta['ChainBonus']){ item._chainBonus = Number(item.meta['ChainBonus'].replace(/[%％]/,'')) }
        }
        return item._chainBonus;
    };
    
    DataManager.magicBurstBonus = function(item) {
        if (!item){ return 0 }
        if (item._mbBonus === undefined){
            item._mbBonus = 0;
            if (item.meta['MBボーナス']){ item._mbBonus = Number(item.meta['MBボーナス'].replace(/[%％]/,'')) }
            if (item.meta['MBBonus']){ item._mbBonus = Number(item.meta['MBBonus'].replace(/[%％]/,'')) }
        }
        return item._mbBonus;
    };
    
    DataManager.chainElements = function(item) {
        if (!item){ return [] }
        if (item._chainElements === undefined){
            item._chainElements = [];
            if (item.meta['連携属性']){ item._chainElements = item.meta['連携属性'].split(',') }
            if (item.meta['ChainElements']){ item._chainElements = item.meta['ChainElements'].split(',') }
        }
        return item._chainElements;
    };
    
    DataManager.isMagicBurst = function(item) {
        if (!item){ return false }
        if (mbSkillType.contains(item.stypeId)){ return true }
        return !!item.meta['MB可'] || !!item.meta['MBEnable'];
    };
    
    DataManager.chainInvokeElements = function(item) {
        if (!item){ return [] }
        if (item._chainInvokeElements === undefined){
            item._chainInvokeElements = [];
            if (item.meta['連携時発動属性']){ item._chainInvokeElements = item.meta['連携時発動属性'].split(',') }
            if (item.meta['ChainInvokeElements']){ item._chainInvokeElements = item.meta['ChainInvokeElements'].split(',') }
            for (var i=0,max=item._chainInvokeElements.length;i<max;i++){
                item._chainInvokeElements[i] = Number(item._chainInvokeElements[i]);
            }
        }
        return item._chainInvokeElements;
    };
    
    DataManager.chainActionCounts = function(item) {
        if (!item){ return [] }
        if (item._chainActionCounts === undefined){
            item._chainActionCounts = -1;
            if (item.meta['連携猶予']){ item._chainActionCounts = Number(item.meta['連携猶予']) }
            if (item.meta['ChainPostponement']){ item._chainActionCounts = Number(item.meta['ChainPostponement']) }
        }
        return item._chainActionCounts;
    };
    
    DataManager.mbPostponement = function(item) {
        if (!item){ return [] }
        if (item._mbActionCounts === undefined){
            item._mbActionCounts = -1;
            if (item.meta['MB猶予']){ item._mbActionCounts = Number(item.meta['MB猶予']) }
            if (item.meta['MBPostponement']){ item._mbActionCounts = Number(item.meta['MBPostponement']) }
        }
        return item._mbActionCounts;
    };
    
    DataManager.magicBurstRate = function(item) {
        if (!item){ return [] }
        if (item._mbDamageRate === undefined){
            item._mbDamageRate = magicBurstRate;
            if (item.meta['MBダメージ率']){ item._mbDamageRate = Number(item.meta['MBダメージ率'].replace(/[%％]/,'')) }
            if (item.meta['MBDamageRate']){ item._mbDamageRate = Number(item.meta['MBDamageRate'].replace(/[%％]/,'')) }
        }
        return item._mbDamageRate;
    };
    
    DataManager.mbContinuousRate = function(item) {
        if (!item){ return [] }
        if (item._mbContinuousRate === undefined){
            item._mbContinuousRate = continuousMBRate;
            if (item.meta['MBチェインボーナス率']){ item._mbContinuousRate = Number(item.meta['MBチェインボーナス率'].replace(/[%％]/,'')) }
            if (item.meta['MBChainBonusRate']){ item._mbContinuousRate = Number(item.meta['MBChainBonusRate'].replace(/[%％]/,'')) }
        }
        return item._mbContinuousRate;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    var __BManager_invokeNormalAction = BattleManager.invokeNormalAction;
    BattleManager.invokeNormalAction = function(subject, target) {
        $gameTemp._chainFlag = null;
        __BManager_invokeNormalAction.call(this, subject, target);
        if ($gameTemp._chainFlag && target.isAlive() && this._subject._lastChainDamage > 0){
            if (target._chain[0]){
                $gameTemp._chainFlag = 2;
                target._mbFlag = true;
                subject.setChainAction(target);
            }
        }
    };
    
    var __BManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        if (this._subject.currentChainAction()){
            this._chaining = true;
            var skillId = this._subject._currentActionKey;
            var cAction = this._subject.shiftCurrentChainAction();
            var action = new Game_Action(this._subject);
            $gameTemp._mbRate = DataManager.magicBurstRate($dataSkills[skillId]);
            $gameTemp._cMBRate = DataManager.mbContinuousRate($dataSkills[skillId]);
            action.setSkill(skillId);
            action.setChainDamages(this._subject._chainDamages);
            action.setChainAction(cAction);
            this._subject._actions.unshift(action);
            this.startAction();
            this._subject.removeCurrentAction();
        } else {
            $gameTemp._chainFlag = null;
            __BManager_endAction.call(this);
            this._chaining = false;
            this.allBattleMembers().forEach(function(battler){
                battler.updateChainActionCount();
            });
        }
    };
    
    BattleManager.isEnableChain = function() {
        if (Imported['ExtendIntercept']){
            return !(this._chasing || this._interrupting || this._retaliationing ||
                      this._countering || this._reflectioning);
        } else {
            return true;
        }
    };
    
    ////////////////////////////////////////////////////////////////////////////////////

    //var __GBattler_debuffRate = Game_Battler.prototype.debuffRate;
    Game_Battler.prototype.debuffRate = function(paramId) {
        var rate = Game_BattlerBase.prototype.debuffRate.call(this,paramId);
        if (this._mbFlag && $gameTemp._mbGo){ rate *= this.mbDamageRate(this) }
        return rate;
    };
    
    //var __GBattler_stateRate = Game_Battler.prototype.stateRate;
    Game_Battler.prototype.stateRate = function(stateId) {
        var rate = Game_BattlerBase.prototype.stateRate.call(this,stateId);
        if (this._mbFlag && $gameTemp._mbGo){ rate *= this.mbDamageRate(this) }
        return rate;
    };
    
    Game_Battler.prototype.clearStates = function() {
        Game_BattlerBase.prototype.clearStates.call(this);
        this.clearChain();
    };
    
    Game_Battler.prototype.chainBonus = function() {
        return this.traitObjects().reduce(function(r,to){
            return r + DataManager.chainBonus(to) * 0.01
        }.bind(this),0.0);
    };
    
    Game_Battler.prototype.mbBonus = function() {
        return this.traitObjects().reduce(function(r,to){
            return r + DataManager.magicBurstBonus(to) * 0.01
        }.bind(this),0.0);
    };
    
    Game_Battler.prototype.chainDamageRate = function(target) {
        var count = target._chainCount ? (target._chainCount - 1) : 0;
        return this.chainBonus() + (continuousChainRate * count * 0.01);
    };
    
    Game_Battler.prototype.mbDamageRate = function(target) {
        var count = target._chainCount ? (target._chainCount - 1) : 0;
        var mbRate = $gameTemp._mbRate === undefined ? magicBurstRate : $gameTemp._mbRate;
        var cMBRate = $gameTemp._cMBRate === undefined ? continuousMBRate : $gameTemp._cMBRate;
        return (mbRate + this.mbBonus()) * 0.01 + (cMBRate * count * 0.01) + 1.0;
    };
    
    Game_Battler.prototype.clearChain = function() {
        this._chain = [];
        this._mbFlag = null;
        this._chainActions = [];
    };
    
    var __GBattler_die = Game_Battler.prototype.die;
    Game_Battler.prototype.die = function() {
        __GBattler_die.call(this);
        this.clearChain();
    };
    
    var __GBattler_onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function() {
        __GBattler_onBattleStart.call(this);
        this.clearChain();
    };

    var __GBattler_removeBattleStates = Game_Battler.prototype.removeBattleStates;
    Game_Battler.prototype.removeBattleStates = function() {
        __GBattler_removeBattleStates.call(this);
        this.clearChain();
    };
    
    Game_Battler.prototype.setChainAction = function(target) {
        if (this._chainActions === undefined ){
            this._chainActions = [];
        }
        var name = target._chain[0];
        var id = $dataSkills.filter(function(s){
            return s && s.stypeId === chainSkillType && s.name === name;
        }.bind(this))[0].id;

        if (this._chainActions[id] === undefined){ this._chainActions[id] = {} }
        if (this._chainActions[id].chainTargets === undefined){ this._chainActions[id].chainTargets = [] }
        this._chainActions[id].chainTargets.push(target);

        var key = target.makeChainActionKey(id);
        if (this._chainDamages === undefined){ this._chainDamages = {} }
        if (this._chainDamages[key] === undefined) { this._chainDamages[key] = 0 }
        this._chainDamages[key] += this._lastChainDamage;
    };
    
    Game_Battler.prototype.makeChainActionKey = function(skillId) {
        var id = this.isActor() ? this._actorId : this._enemyId;
        return skillId + ',' + this.name() + ',' + id + ',' + this.isActor();
    };
    
    Game_Battler.prototype.currentChainAction = function() {
        if (!this._chainActions){ return false }
        if (this._currentActionKey === undefined){
            for (var i=this._chainActions.length-1;i>=0;i--){
                if (this._chainActions[i]){
                    this._currentActionKey = i;
                    break;
                }
            }
        }
        var r = this._chainActions[this._currentActionKey];
        if (!r){ this._currentActionKey = undefined }
        return r;
    };
    
    Game_Battler.prototype.shiftCurrentChainAction = function() {
        if (this._currentActionKey === undefined){ return }
        var obj = this._chainActions.splice(this._currentActionKey,1,undefined);
        this._currentActionKey = undefined;
        return obj[0];
    };
    
    Game_Battler.prototype.updateChainActionCount = function() {
        if (this._chainActionCount && this._chainActionCount>0){
            this._chainActionCount--;
            if (this._chainActionCount<=0){ this._chain = [] }
        }
        if (this._mbActionCount && this._mbActionCount>0){
            this._mbActionCount--;
            if (this._mbActionCount<=0){ 
                this._mbFlag = null;
                $gameTemp._mbRate = undefined;
                this._mbChain = null;
            }
        }
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    var __GAction_lukEffectRate = Game_Action.prototype.lukEffectRate;
    Game_Action.prototype.lukEffectRate = function(target) {
        var correction = $gameTemp._mbGo ? magicBurstStateRate * 0.01 : 0;
        return __GAction_lukEffectRate.call(this,target) + correction;
    };
    
    var __GAction_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        __GAction_applyItemUserEffect.call(this,target);
        if (BattleManager.isEnableChain()){ this.executeChainElements(target) }
    };

    /*
    var __GAction_calcElementRate = Game_Action.prototype.calcElementRate;
    Game_Action.prototype.calcElementRate = function(target) {
        var rate = __GAction_calcElementRate.call(this,target);
        if ($gameTemp._chainFlag){
            var elements = this.chainElementIds(this.subject()._chain[0]);
            return elements ? this.elementsMaxRate(target, elements) : 1.0;
        } else {
            return rate;
        } 
    };
    */
    
    var __GAction_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function(target, critical) {
        var key = target.makeChainActionKey(this.item().id);
        if (this._chainDamages && this._chainDamages[key]){
            this._lastChainDamage = this._chainDamages[key];
            delete this._chainDamages[key];
        }
        $gameTemp._mbGo = null;
        var rate = 1.0;
        if (target._mbFlag && DataManager.isMagicBurst(this.item()) && target._mbChain){
            var elements = this.chainElementIds(target._mbChain);
            for (var i=0,max=elements.length;i<max;i++){ elements[i] = Number(elements[i]) }
            if (elements.contains(this.item().damage.elementId)){
                $gameTemp._mbGo = true;
                rate = this.subject().mbDamageRate(target);
            }
        }
        if (BattleManager._chaining){
            rate += this.subject().chainDamageRate(target);
        }
        var value = Math.floor(__GAction_makeDamageValue.call(this,target,critical) * rate);
        this._lastChainDamage = value;
        this.subject()._lastChainDamage = value;
        return value;
    };
    
    Game_Action.prototype.chainElementIds = function(chain) {
        var skill = $dataSkills.filter(function(s){ return s && s.stypeId === chainSkillType && s.name === chain })[0];
        var elements = DataManager.chainInvokeElements(skill);//.map(function(e){ return Number(e) });
        return elements;
    };
    
    Game_Action.prototype.lcd = function() {
        return this._lastChainDamage || 0;
    };
    
    Game_Action.prototype.executeChainElements = function(target) {
        $gameTemp._chainFlag = null;
        var prevChain = target._chain;
        var nextChain = null;
        var nowChain = DataManager.chainElements(this.item());
        var newChain = nowChain;
        var chainElementCombi = this.chainElementCombi();
        if (prevChain.length > 0 && newChain.length > 0){
            for (var i=0,max=prevChain.length;i<max;i++){
                var prEle = prevChain[i];
                for (var j=0,jmax=newChain.length;j<jmax;j++){
                    var neEle = newChain[j];
                    nextChain = chainElementCombi[[prEle,neEle]];
                    if (nextChain){
                        target._chain = [nextChain];
                        $gameTemp._chainFlag = 1;
                        target._mbChain = nextChain;
                        var skill = $dataSkills.filter(function(s){ 
                            return s && s.stypeId === chainSkillType && s.name === target._chain[0];
                        })[0];
                        var cnt = DataManager.chainActionCounts(skill);
                        cnt =  cnt < 0 ? chainActionCount : cnt;
                        cnt = cnt * ((10 - target._chainCount) * chainPostponementRate * 0.01);
                        target._chainActionCount = Math.max(1,Math.floor(cnt));
                        var mcnt = DataManager.mbPostponement(skill);
                        mcnt = mcnt < 0 ? mbPostponement : mcnt;
                        target._mbActionCount = mcnt;
                        break;
                    } else {
                        target._chain = newChain;
                    }
                }
                if (nextChain){ break }
            }
        } else if (newChain.length > 0){
            target._chain = newChain;
            target._mbFlag = null;
            if (target._chain){
                target._chainCount = 1;
                var skill = $dataSkills.filter(function(s){ 
                    return s && s.stypeId === chainSkillType && s.name === target._chain[0];
                })[0];
                var cnt = DataManager.chainActionCounts(skill);
                cnt =  cnt < 0 ? chainActionCount : cnt;
                target._chainActionCount = Math.max(1,Math.floor(cnt));
            }
        }
    };
    
    Game_Action.prototype.chainElementCombi = function(){
        if (this._chainElementCombi === undefined) {
            var array = $dataSkills.filter(function(s){ return s && s.stypeId === chainSkillType });
            this._chainElementCombi = {};
            array.forEach(function(skill){
                var texts = skill.note.split('\n');
                for (var i=0,max=texts.length;i<max;i++) {
                    if (texts[i].match(/<(?:連携組み合わせ|ChainCombiPattern):(.+),(.+)>/)){
                        this._chainElementCombi[RegExp.$1 + ',' + RegExp.$2] = skill.name;
                    }
                }
            }.bind(this));
        }
        return this._chainElementCombi;
    };
    
    var __GAction_makeTargets = Game_Action.prototype.makeTargets;
    Game_Action.prototype.makeTargets = function() {
        if (this._chainAction){
            var result = this._chainAction.chainTargets;
            return result;
        } else {
            return __GAction_makeTargets.call(this);
        }
    };
    
    Game_Action.prototype.setChainDamages = function(damages) {
        this._chainDamages = damages;
    };
    
    Game_Action.prototype.setChainAction = function(action) {
        this._chainAction = action;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    var __WBLog_startAction = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function(subject, action, targets) {
        __WBLog_startAction.call(this,subject,action,targets);
        this._cItem = action.item();
    };

    var __WBLog_displayDamage = Window_BattleLog.prototype.displayDamage;
    Window_BattleLog.prototype.displayDamage = function(target){
        if ($gameTemp._mbGo){ this.displayMagicBurst(target) }
        __WBLog_displayDamage.call(this, target);
    };
    
    Window_BattleLog.prototype.displayMagicBurst = function(target) {
        this.push('addText', textMagicBurst);
        $gameTemp._mbGo = null;
    };
    
    Window_BattleLog.prototype.displayChain = function(target,item) {
        if (item.stypeId !== chainSkillType){ return }
        target._chainCount++;
        var text = item.message1.replace(/_name/,item.name);
        text = text.replace(/_count/,target._chainCount);
        this.push('addText', text);
    };
    
    if (!Imported.YEP_BattleEngineCore){
    var __WBLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function(subject, item) {
        if (!BattleManager._chaining){
            __WBLog_displayAction.call(this,subject,item);
        }
    };
    
    var __WBLog_displayCritical = Window_BattleLog.prototype.displayCritical;
    Window_BattleLog.prototype.displayCritical = function(target){
        if (BattleManager._chaining){ this.displayChain(target,this._cItem) }
        __WBLog_displayCritical.call(this,target);
    };
    }
    ////////////////////////////////////////////////////////////////////////////////////

}());