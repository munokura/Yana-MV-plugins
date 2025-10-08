//
//  対象制限特徴 ver1.02
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
Imported['TargetLimitTrait'] = 1.02;
/*:
@plugindesc ver1.02/You can now set Traits that limit the target of specified skills and items.
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/Yana-MV-plugins ).
Original plugin by Yana.
-----
How to Use
--------------------------------------------------------------------
By entering 
<TargetLimit: xy,z>
in the Note field of an object with Traits, such as an actor, class, equipment, state, or enemy, you can limit the target of the skill or item specified by xy to only those that meet the condition z.
x can be either I (item) or S (skill).
*However, since this is currently only for enemies, specifying I is meaningless.
y specifies the respective ID.
z specifies the calculation formula.
The formula can be a, b, or v, just like the damage formula.

When using ConditionallyCore in conjunction with ConditionallyCore, you can add detailed conditions to the range change.
In that case, enter
<TargetLimit: xy,z%>
Activation Condition
</TargetLimit>
.
This will limit the target of the skill or item specified by xy to those that meet the activation condition and a probability of z%.

Additionally, by writing
<InheritLimitCond:xy>
in the Note field of an object with Traits, such as an actor, class, equipment, state, or enemy, you can inherit the target limit settings of the object specified by xy.
x can be A (actor), C (class), W (weapon), M (armor), S (state), or E (enemy),
and y is the corresponding ID.

*Redefines Game_Unit.prototype.randomTarget.

-----------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.02:170908
Fixed a bug that caused an error when the range of a restricted skill or item was the user.
ver1.01:170716
Fixed a bug that prevented restricted targets from being selected correctly.
ver1.00:
Released
*/


/*:ja
@plugindesc ver1.02/指定したスキルやアイテムの対象を制限する特徴を設定できるようにします。
@author Yana

@help
使用方法
------------------------------------------------------
アクターやクラス、装備やステート、エネミーなど特徴を持ったオブジェクトのメモ欄に、
<対象制限:xy,z>
または、
<TargetLimit:xy,z>
と記述すると、xyで指定したスキルやアイテムの対象をzの条件を満たした対象
のみに制限します。
xには、I(アイテム),S(スキル)のいずれかが指定可能です。
※ただし、現在はエネミー専用なので、Iを指定する意味はありません。
yは、それぞれのIDを指定します。
zには計算式を指定します。
計算式にはダメージ計算式と同じように、a,b,vが使用可能です。

CoditionallyCoreと併用している場合、範囲変更に詳細な条件を
付けることが可能です。
その際は、
<対象制限:xy,z%>
発動条件
</対象制限>
と記述してください。
xyで指定したスキルやアイテムの対象を発動条件とz%の確率を満たした対象
に制限します。

また、アクターやクラス、装備やステート、エネミーなど特徴を持つオブジェクトのメモ欄に
<対象制限継承:xy>
または、
<InheritLimitCond:xy>
と記述すると、xyで指定した対象の持つ対象制限の設定を継承することができます。
xには、A(アクター),C(クラス),W(武器),M(防具),S(ステート),E(エネミー)が
指定でき、yはそれぞれのIDとなります。

※Game_Unit.prototype.randomTargetを再定義しています。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.02:170908
制限されたスキルやアイテムの範囲が使用者のとき、エラーが発生するバグを修正
ver1.01:170716
制限された対象が正常に選択されないバグを修正
ver1.00:
公開
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('TargetLimitTrait');

    ////////////////////////////////////////////////////////////////////////////////////

    function TargetLimitManager() {
        throw new Error('This is a static class');
    };

    TargetLimitManager.initCond = function (note) {
        var texts = note.split('\n');
        var flag = false;
        var result = [];
        for (var i = 0; i < texts.length; i++) {
            if (flag) {
                if (texts[i].match(/^<\/(?:対象制限|TargetLimit)>/)) {
                    result.push(effect);
                    flag = false;
                } else {
                    effect['conditions'].push(ConditionallyManager.makeCondition(texts[i]));
                }
            } else if (texts[i].match(/^<(?:対象制限|TargetLimit):([IS])(\d+),(\d+)[%％]>/)) {
                var effect = {
                    'type': RegExp.$1,
                    'id': Number(RegExp.$2),
                    'rate': Number(RegExp.$3),
                    'conditions': []
                };
                flag = true;
            }
        }
        return result;
    };

    TargetLimitManager.targetLimit = function (item) {
        if (item._targetLimit === undefined) {
            item._targetLimit = [];
            var texts = item.note.split('\n');
            for (var i = 0, max = texts.length; i < max; i++) {
                if (texts[i].match(/<(?:対象制限|TargetLimit):([IS])(\d+),(.+)>/)) {
                    var type = RegExp.$1;
                    var id = Number(RegExp.$2);
                    var formula = RegExp.$3;
                    if (formula.match(/\d+[%％]/)) { continue }
                    item._targetLimit.push({ 'type': type, 'id': id, 'formula': formula });
                }
            }
            var inherit = this.inheritCond(item);
            for (var i = 0, max = inherit.length; i < max; i++) {
                var inh = inherit[i][1];
                var en = inherit[i][0] === 'A' ? $dataActors[inh] : $dataEnemies[inh];
                item._targetLimit = item._targetLimit.concat(this.targetLimit(en));
            }
        }
        return item._targetLimit;
    };

    TargetLimitManager.condTargetLimit = function (item) {
        if (Imported['ConditionallyCore']) {
            if (item._condTargetLimit === undefined) {
                item._condTargetLimit = this.initCond(item.note);
                var inherit = this.inheritCond(item);
                for (var i = 0, max = inherit.length; i < max; i++) {
                    var en = this.getInheritObject(inherit[i]);
                    item._condTargetLimit = item._condTargetLimit.concat(this.condTargetLimit(en));
                }
            }
            return item._condTargetLimit;
        } else {
            return false;
        }
    };

    TargetLimitManager.inheritCond = function (item) {
        if (item._inheritTLCond === undefined) {
            item._inheritTLCond = [];
            var texts = item.note.split(',');
            for (var i = 0, max = texts.length; i < max; i++) {
                if (texts[i].match(/<(?:対象制限継承|InheritLimitCond):([ACWMSE])(\d+)>/)) {
                    item._inheritTLCond.push([RegExp.$1, Number(RegExp.$2)]);
                }
            }
        }
        return item._inheritTLCond;
    };

    TargetLimitManager.getInheritObject = function (inh) {
        var type = inh[0];
        var id = inh[1];
        switch (type) {
            case 'A': return $dataActors[id];
            case 'C': return $dataClasses[id];
            case 'W': return $dataWeapons[id];
            case 'M': return $dataArmors[id];
            case 'S': return $dataStates[id];
            case 'E': return $dataEnemies[id];
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GAction_makeTargets = Game_Action.prototype.makeTargets;
    Game_Action.prototype.makeTargets = function () {
        if (this.subject().isEnemy()) {
            if (this.subject()._actValids === undefined) { this.subject()._actValids = {} }
            if (this.isForOpponent()) {
                this.opponentsUnit().setCtlActionTargets(this.subject()._actValids[String(this.item().id)]);
            } else {
                this.friendsUnit().setCtlActionTargets(this.subject()._actValids[String(this.item().id)]);
            }
        }
        var result = __GAction_makeTargets.call(this);
        this.opponentsUnit().clearCtlActionTargets();
        this.friendsUnit().clearCtlActionTargets();
        return result;
    };

    Game_Action.prototype.checkTargetLimit = function () {
        var candidateTargets = null;
        var unit = this.isForOpponent() ? this.opponentsUnit().members() : this.friendsUnit().members();
        var type = DataManager.isItem(this.item()) ? 'I' : 'S';
        if (this.isForUser()) { unit = [this.subject()] }
        for (var i = 0, max = this.subject().traitObjects().length; i < max; i++) {
            var trait = this.subject().traitObjects()[i];
            var cond = TargetLimitManager.targetLimit(trait);
            for (var j = 0, jmax = cond.length; j < jmax; j++) {
                var c = cond[j];
                if (type === c.type && this.item().id === c.id) {
                    if (candidateTargets === null) { candidateTargets = [] }
                    for (var k = 0, kmax = unit.length; k < kmax; k++) {
                        var a = this.subject();
                        var b = unit[k];
                        var v = $gameVariables._data;
                        if (eval(c.formula)) { candidateTargets.push(b) }
                    }
                }
            }
            var cotl = TargetLimitManager.condTargetLimit(trait);
            if (cotl) {
                for (var j = 0, jmax = cotl.length; j < jmax; j++) {
                    var c = cotl[j];
                    if (type === c.type && this.item().id === c.id) {
                        if (candidateTargets === null) { candidateTargets = [] }
                        for (var k = 0, kmax = unit.length; k < kmax; k++) {
                            var target = unit[k];
                            var subject = this.subject();
                            if (Math.random() < c.rate * 0.01) {
                                if (ConditionallyManager.checkConditions(subject, target, c.conditions)) {
                                    candidateTargets.push(target);
                                }
                            }
                        }
                    }
                }
            }
        }
        return candidateTargets;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GEnemy_makeActions = Game_Enemy.prototype.makeActions;
    Game_Enemy.prototype.makeActions = function () {
        this._actValids = {};
        for (var i = 0, max = this.enemy().actions.length; i < max; i++) {
            var act = this.enemy().actions[i];
            var action = new Game_Action(this);
            action.setSkill(act.skillId);
            var ctl = action.checkTargetLimit();
            var key = act.skillId;
            if (ctl) { this._actValids[key] = ctl }
        }
        __GEnemy_makeActions.call(this);
    };

    var __GEnemy_isActionValid = Game_Enemy.prototype.isActionValid;
    Game_Enemy.prototype.isActionValid = function (action) {
        var result = __GEnemy_isActionValid.call(this, action);
        var key = action.skillId;
        var flag = !this._actValids[key] || this._actValids[key].length > 0;
        return result && flag;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義　対象に制限によるfilterを適用する
    Game_Unit.prototype.randomTarget = function () {
        var target = null;
        var members = this.aliveMembers();
        if (this._ctlActionTargets) {
            members = members.filter(function (m) { return this._ctlActionTargets.contains(m) }.bind(this));
        }
        var tgrRand = Math.random() * this.tgrMemSum(members);
        members.forEach(function (member) {
            tgrRand -= member.tgr;
            if (tgrRand <= 0 && !target) {
                target = member;
            }
        });
        return target;
    };

    Game_Unit.prototype.clearCtlActionTargets = function () {
        this._ctlActionTargets = null;
    };

    Game_Unit.prototype.setCtlActionTargets = function (hash) {
        this._ctlActionTargets = hash;
    };

    Game_Unit.prototype.tgrMemSum = function (members) {
        return members.reduce(function (r, member) {
            return r + member.tgr;
        }, 0);
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());