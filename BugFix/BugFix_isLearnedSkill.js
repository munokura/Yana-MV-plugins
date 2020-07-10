//
//  バグ修正―スキル習得判定 ver1.00
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
Imported['BugFix_isLearnedSkill'] = 1.00;
/*:
 * @plugindesc ver1.00/特徴で追加されたスキルが習得できないバグを修正します。
 * @author Yana
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
 * ver1.00:
 * 公開
 */

(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義
    Game_Actor.prototype.isLearnedSkill = function (skillId) {
        return this._skills.contains(skillId);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義
    // Conditional Branch
    Game_Interpreter.prototype.command111 = function() {
        var result = false;
        switch (this._params[0]) {
            case 0:  // Switch
                result = ($gameSwitches.value(this._params[1]) === (this._params[2] === 0));
                break;
            case 1:  // Variable
                var value1 = $gameVariables.value(this._params[1]);
                var value2;
                if (this._params[2] === 0) {
                    value2 = this._params[3];
                } else {
                    value2 = $gameVariables.value(this._params[3]);
                }
                switch (this._params[4]) {
                    case 0:  // Equal to
                        result = (value1 === value2);
                        break;
                    case 1:  // Greater than or Equal to
                        result = (value1 >= value2);
                        break;
                    case 2:  // Less than or Equal to
                        result = (value1 <= value2);
                        break;
                    case 3:  // Greater than
                        result = (value1 > value2);
                        break;
                    case 4:  // Less than
                        result = (value1 < value2);
                        break;
                    case 5:  // Not Equal to
                        result = (value1 !== value2);
                        break;
                }
                break;
            case 2:  // Self Switch
                if (this._eventId > 0) {
                    var key = [this._mapId, this._eventId, this._params[1]];
                    result = ($gameSelfSwitches.value(key) === (this._params[2] === 0));
                }
                break;
            case 3:  // Timer
                if ($gameTimer.isWorking()) {
                    if (this._params[2] === 0) {
                        result = ($gameTimer.seconds() >= this._params[1]);
                    } else {
                        result = ($gameTimer.seconds() <= this._params[1]);
                    }
                }
                break;
            case 4:  // Actor
                var actor = $gameActors.actor(this._params[1]);
                if (actor) {
                    var n = this._params[3];
                    switch (this._params[2]) {
                        case 0:  // In the Party
                            result = $gameParty.members().contains(actor);
                            break;
                        case 1:  // Name
                            result = (actor.name() === n);
                            break;
                        case 2:  // Class
                            result = actor.isClass($dataClasses[n]);
                            break;
                        case 3:  // Skill
                            result = actor.isLearnedSkill(n) || actor.addedSkills().contains(n);
                            break;
                        case 4:  // Weapon
                            result = actor.hasWeapon($dataWeapons[n]);
                            break;
                        case 5:  // Armor
                            result = actor.hasArmor($dataArmors[n]);
                            break;
                        case 6:  // State
                            result = actor.isStateAffected(n);
                            break;
                    }
                }
                break;
            case 5:  // Enemy
                var enemy = $gameTroop.members()[this._params[1]];
                if (enemy) {
                    switch (this._params[2]) {
                        case 0:  // Appeared
                            result = enemy.isAlive();
                            break;
                        case 1:  // State
                            result = enemy.isStateAffected(this._params[3]);
                            break;
                    }
                }
                break;
            case 6:  // Character
                var character = this.character(this._params[1]);
                if (character) {
                    result = (character.direction() === this._params[2]);
                }
                break;
            case 7:  // Gold
                switch (this._params[2]) {
                    case 0:  // Greater than or equal to
                        result = ($gameParty.gold() >= this._params[1]);
                        break;
                    case 1:  // Less than or equal to
                        result = ($gameParty.gold() <= this._params[1]);
                        break;
                    case 2:  // Less than
                        result = ($gameParty.gold() < this._params[1]);
                        break;
                }
                break;
            case 8:  // Item
                result = $gameParty.hasItem($dataItems[this._params[1]]);
                break;
            case 9:  // Weapon
                result = $gameParty.hasItem($dataWeapons[this._params[1]], this._params[2]);
                break;
            case 10:  // Armor
                result = $gameParty.hasItem($dataArmors[this._params[1]], this._params[2]);
                break;
            case 11:  // Button
                result = Input.isPressed(this._params[1]);
                break;
            case 12:  // Script
                result = !!eval(this._params[1]);
                break;
            case 13:  // Vehicle
                result = ($gamePlayer.vehicle() === $gameMap.vehicle(this._params[1]));
                break;
        }
        this._branch[this._indent] = result;
        if (this._branch[this._indent] === false) {
            this.skipBranch();
        }
        return true;
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());