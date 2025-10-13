//
//  ステート付着率操作特徴 ver1.00
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
Imported['AddStateRateTrait'] = 1.00;
/*:
@plugindesc ver1.00/Allows you to set Traits that control the adhesion rate of states.
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
Entering
<AddStateRate:x+y%>
in the Note field of an object, skill, or item with a Traits will increase the attachment rate of the state IDx by y%.

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
@plugindesc ver1.00/ステートの付着率を操作する特徴を設定できるようにします。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
使用方法
------------------------------------------------------
特徴を持ったオブジェクトやスキル、アイテムのメモ欄に
<ステート付着率:x+y%>
または、
<AddStateRate:x+y%>
と記述すると、IDxのステートの付着率をy%増加します。

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

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('AddStateRateTrait');

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.addStateRate = function (item) {
        if (!item) { return {} }
        if (item._addStateRate === undefined) {
            item._addStateRate = {};
            var texts = item.note.split('\n');
            for (var i = 0, max = texts.length; i < max; i++) {
                var text = texts[i];
                if (text.match(/<(?:ステート付着率|AddStateRate):(\d+)([+-]\d+)[%％]>/)) {
                    item._addStateRate[RegExp.$1] = Number(RegExp.$2);
                }
            }
        }
        return item._addStateRate;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GAction_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
    Game_Action.prototype.itemEffectAddState = function (target, effect) {
        this._tempEffect = effect;
        this._tempCallCount = 0;
        __GAction_itemEffectAddState.call(this, target, effect);
        this._tempEffect = null;
    };

    var __GAction_lukEffectRate = Game_Action.prototype.lukEffectRate;
    Game_Action.prototype.lukEffectRate = function (target) {
        var r = __GAction_lukEffectRate.call(this, target);
        if (this._tempEffect) {
            var stateId = this._tempEffect.dataId;
            if (stateId === 0) {
                stateId = this.subject().attackStates()[this._tempCallCount];
                this._tempCallCount++;
            }
            var iS = DataManager.addStateRate(this.item())[String(stateId)];
            if (iS) { r += iS * 0.01 }
            this.subject().traitObjects().forEach(function (to) {
                var stateRate = DataManager.addStateRate(to)[String(stateId)];
                if (stateRate) { r += stateRate * 0.01 }
            }.bind(this));
        }
        return r;
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());