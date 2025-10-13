//
//  ステート付与解除時コモン特徴 ver1.03
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author yana
//

var Imported = Imported || {};
Imported['StateAddRemoveCommonTrait'] = 1.03;
/*:
@plugindesc ver1.03/Adds the ability to reserve common events when a state is granted or removed.
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
About the Plugin
--------------------------------------------------------------------

This plugin allows you to create a Traits for objects with special Traits, using notes, to reserve common events when a state is assigned or removed.

------------------------------------------------------
How to Use
------------------------------------------------------

- Reservation when a state is assigned
By writing
<AddState△Common:□>
in the note for an object with special Traits, the common event #□ will be reserved when the state #△ is assigned.

- Reservation when a state is removed
By writing
<RemoveState△Common:□>
in the note for an object with special Traits, the common event #□ will be reserved when the state #△ is removed.

<AutoRemoveState△Common:□>
You can reserve the common event #□ only when the state #△ is naturally removed.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver. 1.03:
Changed the process so that simultaneously scheduled common events are executed.
ver. 1.02:
Added a process to store the activator's index in a variable.
ver. 1.01:
Fixed a bug where no judgment was made upon death.
ver. 1.00:
Released

@param SubjectIndex
@desc The ID of the variable that stores the index of the invoker. If the stored index is an enemy, the value will be increased by +1000.
@default 13
*/


/*:ja
@plugindesc ver1.03/ステートが付与または解除された時に、コモンイベントを予約する特徴を追加します。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
プラグインについて
------------------------------------------------------

このプラグインは、ステートが付与または解除された時にコモンイベントを予約する機能を、
メモを使って特徴を持ったオブジェクトに作ることができるようにします。

------------------------------------------------------
使い方
------------------------------------------------------

・ステート付与時に予約
特徴を持ったオブジェクトのメモに
<ステート△付与時コモン:□>
または、
<AddState△Common:□>
と記述すると、△番のステートが付与された際に□番のコモンイベントを予約します。

・ステート解除時に予約
特徴を持ったオブジェクトのメモに
<ステート△解除時コモン:□>
または、
<RemoveState△Common:□>
と記述すると、△番のステートが解除された際に□番のコモンイベントを予約します。

<ステート△自然解除時コモン:□>
または、
<AutoRemoveState△Common:□>
と記述すると、ターン数による自然解除時のみを対象として□番のコモンイベントを予約できます。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.03:
同時に予約されたコモンイベントも実行されるように処理を変更。
ver1.02:
起動者のインデックスを変数に入れる処理を追加。
ver1.01:
死亡時に判定が行われていなかったバグを修正。
ver1.00:
公開

@param SubjectIndex
@desc 起動者のインデックスを格納する変数のIDです。 格納されたインデックスがエネミーの場合、+1000された値が入ります。
@default 13
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('StateAddRemoveCommonTrait');
    var subjectIndexVarId = Number(parameters['SubjectIndex']);

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.stateCommonEvent = function (item, stateId, type) {
        if (!item || !type) return null;
        if (item._stateCommonId && item._stateCommonId[stateId] !== undefined &&
            item._stateCommonId[stateId][type] !== undefined) {
            return item._stateCommonId[stateId][type];
        }
        item._stateCommonId = item._stateCommonId || {};
        item._stateCommonId[stateId] = { add: null, remove: null };
        if (item.meta['ステート' + stateId + '付与時コモン']) {
            item._stateCommonId[stateId]['add'] = item.meta['ステート' + stateId + '付与時コモン'];
        } else if (item.meta['AddState' + stateId + 'Common']) {
            item._stateCommonId[stateId]['add'] = item.meta['AddState' + stateId + 'Common'];
        }
        if (item.meta['ステート' + stateId + '解除時コモン']) {
            item._stateCommonId[stateId]['remove'] = item.meta['ステート' + stateId + '解除時コモン'];
        } else if (item.meta['RemoveState' + stateId + 'Common']) {
            item._stateCommonId[stateId]['remove'] = item.meta['RemoveState' + stateId + 'Common'];
        }
        if (item.meta['ステート' + stateId + '自然解除時コモン']) {
            item._stateCommonId[stateId]['autoRemove'] = item.meta['ステート' + stateId + '自然解除時コモン'];
        } else if (item.meta['AutoRemoveState' + stateId + 'Common']) {
            item._stateCommonId[stateId]['autoRemove'] = item.meta['AutoRemoveState' + stateId + 'Common'];
        }

        return item._stateCommonId[stateId][type];
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Temp.prototype.setStackCommonEvent = function (ary) {
        if (!this._commonStack) this._commonStack = [];
        this._commonStack.push(ary);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_setupReservedCommonEvent = Game_Interpreter.prototype.setupReservedCommonEvent;
    Game_Interpreter.prototype.setupReservedCommonEvent = function () {
        if (!$gameTemp.isCommonEventReserved() && $gameTemp._commonStack && $gameTemp._commonStack.length > 0) {
            var ci = $gameTemp._commonStack.shift();
            if (subjectIndexVarId) $gameVariables.setValue(subjectIndexVarId, ci[1]);
            $gameTemp.reserveCommonEvent(ci[0]);
        }
        return __GInterpreter_setupReservedCommonEvent.call(this);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GBBase_clearStates = Game_BattlerBase.prototype.clearStates;
    Game_BattlerBase.prototype.clearStates = function () {
        if (this._states) {
            this._states.forEach(function (stateId) {
                this.reserveCommonState(stateId, 'remove');
            }.bind(this));
        }
        __GBBase_clearStates.call(this);
    };

    var __GBBase_addNewState = Game_BattlerBase.prototype.addNewState;
    Game_BattlerBase.prototype.addNewState = function (stateId) {
        __GBBase_addNewState.call(this, stateId);
        this.reserveCommonState(stateId, 'add');
    };

    var __GBBase_eraseState = Game_BattlerBase.prototype.eraseState;
    Game_BattlerBase.prototype.eraseState = function (stateId) {
        __GBBase_eraseState.call(this, stateId);
        if (this._autoRemoveStates && this._autoRemoveStates.contains(stateId)) {
            this.reserveCommonState(stateId, 'autoRemove');
        }
        this.reserveCommonState(stateId, 'remove');
    };

    Game_BattlerBase.prototype.reserveCommonState = function (stateId, type) {
        var id = this.isTriggerStateCommon(stateId, type);
        if (id > 0) {
            if (subjectIndexVarId) {
                var index = this.index();
                if (this.isEnemy()) index += 1000;
                $gameVariables.setValue(subjectIndexVarId, index);
            }
            $gameTemp.setStackCommonEvent([id, index]);
        }
    };

    Game_BattlerBase.prototype.isTriggerStateCommon = function (stateId, type) {
        var to = this.traitObjects();
        var v = $gameVariables._data;
        for (var i = 0, max = to.length; i < max; i++) {
            var sc = DataManager.stateCommonEvent(to[i], stateId, type);
            if (sc) return eval(sc);
        }
        return 0;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GBattler_removeStatesAuto = Game_Battler.prototype.removeStatesAuto;
    Game_Battler.prototype.removeStatesAuto = function (timing) {
        this._autoRemoveStates = [];
        this.states().forEach(function (state) {
            if (this.isStateExpired(state.id) && state.autoRemovalTiming === timing) {
                this._autoRemoveStates.push(state.id);
            }
        }, this);
        __GBattler_removeStatesAuto.call(this, timing);
        this._autoRemoveStates = [];
    };

    ////////////////////////////////////////////////////////////////////////////////////


}());