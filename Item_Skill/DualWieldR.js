//
//  二刀流改造 ver1.00
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
Imported['DualWieldR'] = 1.00;
/*:
@plugindesc ver1.00/Allows you to equip a shield even when dual wielding.
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Item_Skill/DualWieldR.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/Yana-MV-plugins ).
Original plugin by Yana.
-----
Allows you to equip a shield even when dual-wielding.

-----------------------------------------------------
How to Use
------------------------------------------------------
------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released
*/


/*:ja
@plugindesc ver1.00/二刀流でも盾を装備できるようにします。
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Item_Skill/DualWieldR.js

@help
二刀流でも盾を装備できるようにします。

------------------------------------------------------
使用方法
------------------------------------------------------
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開
*/

(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('DualWieldR');

    ////////////////////////////////////////////////////////////////////////////////////

    var __GBBase_isDualWield = Game_BattlerBase.prototype.isDualWield;
    Game_BattlerBase.prototype.isDualWield = function() {
        return __GBBase_isDualWield.call(this) && !this.nonDualWield();
    };

    Game_BattlerBase.prototype.nonDualWield = function() {
        return false;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Actor.prototype.nonDualWield = function() {
        return this._nonDualWield;
    };

    var __GActor_releaseUnequippableItems = Game_Actor.prototype.releaseUnequippableItems;
    Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
        var r = this.equips().filter(function(e) { return e && e.etypeId === 2 });
        if (r.length > 0) { this._nonDualWield = true }
        __GActor_releaseUnequippableItems.call(this, forcing);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    // Change Equipment
    var __GInterpreter_command319 = Game_Interpreter.prototype.command319;
    Game_Interpreter.prototype.command319 = function() {
        var actor = $gameActors.actor(this._params[0]);
        if (this._params[1] === 2 && __GBBase_isDualWield.call(actor)) {
            actor._nonDualWield = false;
        }
        return __GInterpreter_command319.call(this);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WEItem_includes = Window_EquipItem.prototype.includes;
    Window_EquipItem.prototype.includes = function(item) {
        var result = __WEItem_includes.call(this, item);
        if (item && this._slotId === 1) {
            if (this._actor.isDualWield() && item.etypeId === 2) {
                result = this._actor.canEquip(item);
            } else if (__GBBase_isDualWield.call(this._actor) && item.etypeId === 1) {
                result = this._actor.canEquip(item);
            }
        }
        return result;
    };

    var __WEItem_updateHelp = Window_EquipItem.prototype.updateHelp;
    Window_EquipItem.prototype.updateHelp = function() {
        if (this.item() && this._actor && this.item().etypeId === 2 && this._actor.isDualWield()) {
            this._actor._nonDualWield = true;
        } else {
            this._actor._nonDualWield = false;
        }
        __WEItem_updateHelp.call(this);
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());