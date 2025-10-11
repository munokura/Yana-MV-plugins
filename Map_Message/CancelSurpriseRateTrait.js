//
//  不意打ち軽減特徴 ver1.00
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
Imported['CancelSurpriseRateTrait'] = 1.00;
/*:
@plugindesc ver1.00/You can now set a Traits that reduces the chance of a surprise attack.
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
- Actors
- Classes
- Weapons
- Armors
- Enemies
- States
In the Note field, enter
<CancelSurpriseRate:n%>

n is a number that will be multiplied by the chance of a surprise attack.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver. 1.00:
Released
*/


/*:ja
@plugindesc ver1.00/不意打ち確率を軽減する特徴を設定できるようにします。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
使用方法
------------------------------------------------------
- アクター
- 職業
- 武器
- 防具
- 敵キャラ
- ステート
のメモ欄に
<不意打ち軽減:n%>
か
<CancelSurpriseRate:n%>
を記入します。

nは数値を入力し、不意打ちの確率に乗算されます。

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

    var parameters = PluginManager.parameters('CancelSurpriseRateTrait');

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.cancelSurpriseRate = function (item) {
        if (item._cancelSurpriseRate === undefined) {
            item._cancelSurpriseRate = 0;
            if (item.meta['不意打ち軽減']) { item._cancelSurpriseRate = Number(item.meta['不意打ち軽減'].replace(/[%％]/, '')) }
            if (item.meta['CancelSurpriseRate']) { item._cancelSurpriseRate = Number(item.meta['CancelSurpriseRate'].replace(/[%％]/, '')) }
        }
        return item._cancelSurpriseRate;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Actor.prototype.cancelSurpriseRate = function () {
        return this.traitObjects().reduce(function (r, to) {
            return r + DataManager.cancelSurpriseRate(to);
        }, 0);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GParty_rateSurprise = Game_Party.prototype.rateSurprise;
    Game_Party.prototype.rateSurprise = function (troopAgi) {
        var rate = __GParty_rateSurprise.call(this, troopAgi);
        rate *= Math.max(this.cancelSurpriseRate(), 0);
        return rate;
    };

    Game_Party.prototype.cancelSurpriseRate = function () {
        return this.members().reduce(function (r, m) {
            return r - m.cancelSurpriseRate() * 0.01;
        }, 1.0);
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());