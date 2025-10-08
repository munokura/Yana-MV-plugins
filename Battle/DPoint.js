//
//  D値 ver1.03
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
Imported['DPoint'] = 1.03;
/*:
@plugindesc ver1.03/Allows you to set the D value that can be used in the damage calculation formula.
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
<D Point:○>
in the Note field of a weapon, enemy, skill, or state, you can set the D value of the weapon, enemy, skill, or state to ○.

You can obtain the value by entering a.dp or b.dp in the damage calculation formula.
The result of the formula specified in DefaultDFormula is set as the base D value.
The D value is the sum of the weapon, skill, state, etc.
------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
var1.03:
Fixed a bug where the D value of enemy skills was not being added up correctly.
ver1.02:
Fixed a bug where the enemy D value setting was not working properly.
ver1.01:
Fixed a bug where skill D values were not being calculated correctly.
ver1.00:
Released

@param DefaultDFormula
@desc This is the basic formula for calculating the D value.
@default a.atk / 5

@param DefaultWeaponD
@desc This is the base D value of weapons and skills.
@default 0
*/


/*:ja
@plugindesc ver1.03/ダメージ計算式に使用できるD値を設定できるようにします。
@author Yana

@help
使用方法
------------------------------------------------------
武器やエネミー、スキルやステートのメモ欄に
<D値:○>
または
<DPoint:○>
と記述すると、武器やエネミー、スキルやステートのD値を○に設定することができます。

ダメージ計算式にa.dpやb.dpと記述することで、値を取得することができます。
また、基本D値として、DefaultDFormulaで指定した式の結果がD値に設定されます。
D値は武器、スキル、ステート等の合計値が適用されます。
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
var1.03:
エネミーの使用するスキルのD値が正常に加算されていなかったバグを修正。
ver1.02:
エネミーのD値設定が正常に動作していなかったバグを修正。
ver1.01:
スキルのD値が正常に計算されていなかったバグを修正。
ver1.00:
公開

@param DefaultDFormula
@desc D値の基本計算式です。
@default a.atk / 5

@param DefaultWeaponD
@desc 武器やスキルの基本D値です。
@default 0
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('DPoint');
    var defaultDFormula = String(parameters['DefaultDFormula'] || 'a.atk / 5');
    var defaultWeaponD = Number(parameters['DefaultWeaponD']);

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.dPoint = function (item) {
        if (item._dPoint === undefined) {
            item._dPoint = 0;
            if (this.isWeapon(item)) { item._dPoint += defaultWeaponD }
            if (item.meta['D値']) { item._dPoint = Number(item.meta['D値']) }
            if (item.meta['DPoint']) { item._dPoint = Number(item.meta['DPoint']) }
        }
        return item._dPoint;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Object.defineProperties(Game_Battler.prototype, {
        dp: { get: function () { return this.dpoint(); }, configurable: true }
    });

    Game_Battler.prototype.dpoint = function () {
        var a = this;
        var v = $gameVariables._data;
        var n = eval(defaultDFormula);
        var states = this.states();
        for (var i = 0, max = states.length; i < max; i++) {
            n += DataManager.dPoint(states[i]);
        }
        return n;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Actor.prototype.dpoint = function () {
        var n = Game_Battler.prototype.dpoint.call(this);
        if (this.weapons().length > 0) {
            var nn = this.weapons().reduce(function (r, w) {
                if (w) { r += DataManager.dPoint(w) }
                return r;
            }, 0);
            n += nn / this.weapons().length;
        }
        var action = BattleManager._action;
        if (action) n += DataManager.dPoint(action.item());
        return n;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Enemy.prototype.dpoint = function () {
        var n = Game_Battler.prototype.dpoint.call(this);
        n += DataManager.dPoint(this.enemy());
        var action = BattleManager._action;
        if (action) n += DataManager.dPoint(action.item());
        return n;
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());