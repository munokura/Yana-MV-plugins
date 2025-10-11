//
//  マジックスクロール ver1.00
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
Imported['MagicScroll'] = 1.00;
/*:
@plugindesc ver1.00/You will now be able to craft scrolls, items that allow you to use skills just by possessing them.
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Item_Skill/MagicScroll.js
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
<Scroll: x>
in the item's Note field will function as a scroll that enables the use of skill ID x.

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
@plugindesc ver1.00/所持しているだけでスキルが使用可能になるアイテム、スクロールを製作できるようにします。
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Item_Skill/MagicScroll.js

@help
使用方法
------------------------------------------------------
アイテムのメモ欄に
<スクロール:x>
または、
<Scroll:x>
と記述すると、IDx番のスキルを使用可能になるスクロールとして機能します。

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

    var parameters = PluginManager.parameters('MagicScroll');

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.isScroll = function (item) {
        if (!item) { return false }
        return !!item.meta['スクロール'] || !!item.meta['Scroll'];
    };

    DataManager.scrollSkills = function (item) {
        if (!item) { return [] }
        if (item._scrollSkills === undefined) {
            item._scrollSkills = [];
            var texts = item.note.split('\n');
            for (var i = 0, max = texts.length; i < max; i++) {
                var text = texts[i];
                if (text.match(/<(?:スクロール|Scroll):(\d+)>/)) {
                    item._scrollSkills.push(Number(RegExp.$1));
                }
            }
        }
        return item._scrollSkills;
    };

    var __DManager_loadGame = DataManager.loadGame;
    DataManager.loadGame = function (savefileId) {
        var result = __DManager_loadGame.call(this, savefileId);
        if (result) { $gameParty.refreshScroll() }
        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GActor_addedSkills = Game_Actor.prototype.addedSkills;
    Game_Actor.prototype.addedSkills = function () {
        var result = __GActor_addedSkills.call(this);
        return result.concat($gameParty.choiceScrolls());
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Party.prototype.chItems = function () {
        if (this._chItems === undefined) { this.refreshScroll() }
        return this._chItems;
    };

    Game_Party.prototype.choiceScrolls = function () {
        return this.chItems();
    };

    var __GParty_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
        __GParty_gainItem.call(this, item, amount, includeEquip);
        if (item && DataManager.isScroll(item)) { this.refreshScroll() }
    };

    Game_Party.prototype.refreshScroll = function () {
        var scrolls = this.allItems().filter(function (item) {
            return DataManager.isScroll(item);
        });
        this._chItems = scrolls.reduce(function (r, s) {
            return r.concat(DataManager.scrollSkills(s));
        }, []);
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());