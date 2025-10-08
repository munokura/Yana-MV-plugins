//
//  評価時ダミー ver1.01
//
// ------------------------------------------------------
// Copyright (c) 2017 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['EvaluateDummy'] = 1.01;
/*:
@plugindesc ver1.01/Replaces the target and actor during behavior evaluation with dummies that copy the target and actor.
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

By replacing the actor and target during behavior evaluation with copied dummy characters, this function changes the formula so that statements affecting the actor and target do not affect the actual actor and target.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver. 1.01:
Revised processing.
ver. 1.00:
Released
*/


/*:ja
@plugindesc ver1.01/行動評価時の対象と行動者をコピーしたダミーに差し替えます。
@author Yana

@help

行動評価時の行動者と対象をコピーしたダミーに差し替えることで、計算式に記述された
行動者や対象に影響を与える記述が実際の行動者や対象に影響を及ぼさないように変更します。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.01:
処理を見直し。
ver1.00:
公開
*/

(function() {

    'use strict';

    var __GActor_makeAutoBattleActions = Game_Actor.prototype.makeAutoBattleActions;
    Game_Actor.prototype.makeAutoBattleActions = function() {
        $gameTemp._dummySubject = JsonEx.makeDeepCopy(this);
        $gameTemp._dummyActors = JsonEx.makeDeepCopy($gameParty.members());
        $gameTemp._dummyEnemies = JsonEx.makeDeepCopy($gameTroop.members());
        __GActor_makeAutoBattleActions.call(this);
        delete $gameTemp._dummySubject;
        delete $gameTemp._dummyActors ;
        delete $gameTemp._dummyEnemies;
    };

    var __GAction_subject = Game_Action.prototype.subject;
    Game_Action.prototype.subject = function() {
        return $gameTemp._dummySubject ? $gameTemp._dummySubject : __GAction_subject.call(this);
    };

    var __GAction_itemTargetCandidates = Game_Action.prototype.itemTargetCandidates;
    Game_Action.prototype.itemTargetCandidates = function() {
        var targets = __GAction_itemTargetCandidates.call(this);
        if (targets.length > 0) targets = JsonEx.makeDeepCopy(targets);
        return targets;
    };

    // ほぼ再定義
    var __GAction_itemTargetCandidates = Game_Action.prototype.itemTargetCandidates;
    Game_Action.prototype.itemTargetCandidates = function() {
        if (!$gameTemp._dummySubject) return __GAction_itemTargetCandidates.call(this);
        if (!this.isValid()) {
            return [];
        } else if (this.isForOpponent()) {
            return this.dummyOpponentsAliveMembers();
        } else if (this.isForUser()) {
            return [this.subject()];
        } else if (this.isForDeadFriend()) {
            return this.dummyFriendsDeadMembers();
        } else if (this.isForFriend()){
            return this.dummyFriendsAliveMembers();
        } else {
            return [];
        }
    };

    Game_Action.prototype.dummyFriendsAliveMembers = function() {
        var members = this.subject().isActor() ? $gameTemp._dummyActors : $gameTemp._dummyEnemies;
        return members.filter(function(member) {
            return member.isAlive();
        });
    };

    Game_Action.prototype.dummyFriendsDeadMembers = function() {
        var members = this.subject().isActor() ? $gameTemp._dummyActors : $gameTemp._dummyEnemies;
        return members.filter(function(member) {
            return member.isDead();
        });
    };

    Game_Action.prototype.dummyOpponentsAliveMembers = function() {
        var members = this.subject().isActor() ? $gameTemp._dummyEnemies : $gameTemp._dummyActors;
        return members.filter(function(member) {
            return member.isAlive();
        });
    };

}());