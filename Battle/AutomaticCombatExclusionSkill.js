//
//  自動戦闘除外スキル ver1.01
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
Imported['AutomaticCombatExclusionSkill'] = 1.01;
/*:
@plugindesc ver1.01/You can now set skills that are not selected in auto-battle.
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Battle/AutomaticCombatExclusionSkill.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/Yana-MV-plugins ).
Original plugin by Yana.
-----
------------------------------------------------------
How to Use
------------------------------------------------------
If you write
<AutomaticBattleExclusion>
in the Note field for a skill you don't want selected in auto-Battle, that skill will receive a rating of 0 during auto-Battle.

-----------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver. 1.01:
Fixed an error.
ver. 1.00:
Released
*/


/*:ja
@plugindesc ver1.01/自動戦闘で選択されないスキルを設定できるようにします。
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Battle/AutomaticCombatExclusionSkill.js

@help
------------------------------------------------------
使用方法
------------------------------------------------------
自動戦闘で選択してほしくないスキルのメモ欄に
<自動戦闘時除外>
または
<AutomaticCombatExclusion>
と記述すると、そのスキルは自動戦闘時に評価が0になります。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.01:
エラーが発生していたのを修正。
ver1.00:
公開
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('AutomaticCombatExclusionSkill');

    ////////////////////////////////////////////////////////////////////////////////////

    var __GAction_evaluate = Game_Action.prototype.evaluate;
    Game_Action.prototype.evaluate = function () {
        if (this.isExclusionSkill()) { return 0 }
        return __GAction_evaluate.call(this);
    }

    Game_Action.prototype.isExclusionSkill = function () {
        return this.item() && !!this.item().note.match(/<(?:自動戦闘時除外|AutomaticCombatExclusion)>/);
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());