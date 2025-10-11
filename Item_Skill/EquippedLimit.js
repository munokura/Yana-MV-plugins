//
//  装備制限 ver1.01
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
Imported['EquippedLimit'] = 1.01;
/*:
@plugindesc ver1.01/Added a function to limit equipment using calculation formulas.
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Item_Skill/EquippedLimit.js
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
If you write either
<EquippedLimit:xxx>
in a weapon or armor memo, the equipment will be grayed out and cannot be equipped unless xxx is evaluated with eval and the result is true.

You can write a calculation formula for xxx, and then use
a → actor
v → variable
s → switch
respectively.

You can set multiple conditions by writing them on multiple lines.

Example 1: The current level must be 30 or higher to equip the equipment.
<EquippedLimit:a.level >= 30>

Example 2: The current actor's base attack power must be 30 or higher,
and their base defense power must be 30 or higher to equip the equipment.
<EquippedLimit:a.paramBase(2) >= 30>
<EquippedLimit:a.paramBase(3) >= 30>
------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.01:170105
Changed so that items that cannot be equipped due to restrictions when using the Optimize are recognized as having the worst performance.
ver1.00:
Released
*/


/*:ja
@plugindesc ver1.01/計算式で装備を制限する機能を追加します。
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Item_Skill/EquippedLimit.js

@help
------------------------------------------------------
使用方法
------------------------------------------------------
武器や防具のメモに
<装備制限:xxx>
<EquippedLimit:xxx>
のいずれかを記述すると、xxxをevalで評価した答えがtrueでない限り、
その装備はグレーアウトして装備できなくなります。

xxxは計算式を記述できますが、その時に
a →アクター
v →変数
s →スイッチ
がそれぞれ使用できます。

この条件は複数行にわたって記述することで、複数個設定することができます。

例1:現在レベルが30以上でないと装備できない
<装備制限:a.level >= 30>

例2:現在のアクターの素の攻撃力が30以上かつ、
    素の防御力が30以上でないと装備できない
<装備制限:a.paramBase(2) >= 30>
<装備制限:a.paramBase(3) >= 30>
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.01:170105
最強装備時に制限により装備できないアイテムが最悪のパフォーマンスとして
認識されるように変更。
ver1.00:
公開
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('EquippedLimit');

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.equippedLimit = function (item) {
        if (!item) return [];
        if (item._equippedLimit) return item._equippedLimit;
        item._equippedLimit = [];
        var notes = item.note.split('\n');
        for (var i = 0, max = notes.length; i < max; i++) {
            if (notes[i].match(/<(?:装備制限|EquippedLimit)[:：](.+)>/)) {
                item._equippedLimit.push(RegExp.$1);
            }
        }
        return item._equippedLimit;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GActor_calcEquipItemPerformance = Game_Actor.prototype.calcEquipItemPerformance;
    Game_Actor.prototype.calcEquipItemPerformance = function (item) {
        if (!this.isLeEquippable(item)) return -999999;
        return __GActor_calcEquipItemPerformance.call(this, item);
    };

    Game_Actor.prototype.isLeEquippable = function (item) {
        if (!item) return true;
        var el = DataManager.equippedLimit(item);
        var a = this;
        var v = $gameVariables._data;
        var s = $gameSwitches._data;
        for (var i = 0, max = el.length; i < max; i++) {
            if (!eval(el[i])) return false;
        }
        return true;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WEItem_isEnabled = Window_EquipItem.prototype.isEnabled;
    Window_EquipItem.prototype.isEnabled = function (item) {
        var result = __WEItem_isEnabled.call(this, item);
        result = result && this._actor.isLeEquippable(item);
        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());