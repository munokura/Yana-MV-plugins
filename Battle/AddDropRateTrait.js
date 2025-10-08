//
//  ドロップ率操作特徴 ver1.01
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
Imported['AddDropRateTrait'] = 1.01;
/*:
@plugindesc ver1.01/Allows you to set Traits that control drop rates.
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
------------------------------------------------------
Entering
<AddDropRate:x+y%>
in the Note field of a special object, skill, or item will increase the drop rate of the x item by y%.
To specify x, add the item ID to I for items, W for weapons, or A for armor, e.g., I4, W3, A20, etc.

If you specify 0 as the item ID, all items in that category will be targeted.
If you simply enter 0 without a category, all items will be targeted.

You can also specify any string for x.
In this case, items containing that string in the memo will be targeted.
For example,
<AddDropRate:Test+30%>
will target items with <Test> in the Note field.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.01:170104
Fixed a bug that prevented the software from working properly.
ver1.00:
Released
*/


/*:ja
@plugindesc ver1.01/ドロップ率を操作する特徴を設定できるようにします。
@author Yana

@help
使用方法
------------------------------------------------------
特徴を持ったオブジェクトやスキル、アイテムのメモ欄に
<ドロップ率:x+y%>
または、
<AddDropRate:x+y%>
と記述すると、xのアイテムのドロップ率をy%増加します。
xの指定方法は、アイテムならI,武器ならW,防具ならAにアイテムIDを追加して、
I4,W3,A20などにします。

アイテムIDに0を指定した場合、そのカテゴリのすべてのアイテムが対象になります。
カテゴリを書かずに、0とだけ記述した場合、すべてのアイテムが対象になります。

また、xには好きな文字列も指定することができます。
この場合、その文字列をメモに含むアイテムが対象になります。
<ドロップ率:テスト+30%>とした場合、アイテムのメモに<テスト>と記述されている
アイテムが対象になります。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.01:170104
正常に動作していなかったバグを修正。
ver1.00:
公開
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('AddDropRateTrait');

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.addDropRate = function (item) {
        if (!item) { return {} }
        if (item._addDropRate === undefined) {
            item._addDropRate = {};
            var texts = item.note.split('\n');
            for (var i = 0, max = texts.length; i < max; i++) {
                var text = texts[i];
                if (text.match(/<(?:ドロップ率|AddDropRate):(.+)([+-]\d+)[%％]>/)) {
                    item._addDropRate[RegExp.$1] = Number(RegExp.$2);
                }
            }
        }
        return item._addDropRate;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Party.prototype.extendDropRate = function () {
        var result = {};
        this.battleMembers().forEach(function (m) {
            m.traitObjects().forEach(function (to) {
                var addRate = DataManager.addDropRate(to);
                for (key in addRate) {
                    if (!result[key]) { result[key] = 0 }
                    result[key] += addRate[key];
                }
            }.bind(this));
        }.bind(this));
        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義
    Game_Enemy.prototype.makeDropItems = function () {
        this._exRate = $gameParty.extendDropRate();
        return this.enemy().dropItems.reduce(function (r, di) {
            if (di.kind > 0 && Math.random() * di.denominator < (this.dropItemRate() * this.extendRate(di))) {
                return r.concat(this.itemObject(di.kind, di.dataId));
            } else {
                return r;
            }
        }.bind(this), []);
    };

    Game_Enemy.prototype.extendRate = function (dropItem) {
        var key = '';
        switch (dropItem.kind) {
            case 1: key = 'I' + dropItem.dataId; break;
            case 2: key = 'W' + dropItem.dataId; break;
            case 3: key = 'A' + dropItem.dataId; break;
        }
        var item = this.itemObject(dropItem.kind, dropItem.dataId);
        var exRate = this._exRate;
        var r = 100;
        if (exRate['0']) { r += exRate['0'] }
        if (exRate['I0'] && DataManager.isItem(item)) { r += exRate['I0'] }
        if (exRate['W0'] && DataManager.isWeapon(item)) { r += exRate['W0'] }
        if (exRate['A0'] && DataManager.isArmor(item)) { r += exRate['A0'] }
        if (exRate[key]) { r += exRate[key] }
        for (var key2 in exRate) {
            var text = RegExp('<' + key2 + '>');
            if (item.note.match(text)) { r += exRate[key2] }
        }
        return r * 0.01;
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());