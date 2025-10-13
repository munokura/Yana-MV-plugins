//
//  メモ置換 ver1.00
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
Imported['ReplaceMemo'] = 1.00;
/*:
@plugindesc ver1.00/Replaces specific descriptions in a note with notes from another object.
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
By entering either
<ReplaceMemo:△x>
in the Note field of an object with a memo, the entered text will be replaced with the contents of the memo for the object specified by △x.
△ stands for:
M: Actor
C: Class
S: Skill
I: Item
W: Weapon
A: Armor
T: State
E: Enemy

x stands for the corresponding ID.

Example: To replace with the contents of the memo for armor number 10
<ReplaceMemo:A10>

However, when entering this, please note that the data loading order is:
Actor
Class
Skill
Enemy
State
Item
Weapon
Armor
Tile Set
(Map)
(Event)

This means that data from a higher order cannot be replaced with data from a lower order.
*You cannot replace the contents of an actor's memo with an enemy's memo, for example.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
Ver. 1.00:
Released
*/


/*:ja
@plugindesc ver1.00/メモ内の特定の記述を別のオブジェクトのメモに置き換えます。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
使用方法
------------------------------------------------------
メモを持ったオブジェクトのメモ欄に、
<メモ置換:△x>
<ReplaceMemo:△x>
のいずれかを記述することで、記述した部分を△xで指定したオブジェクトのメモの内容に置換します。
△は、
M:アクター
C:クラス
S:スキル
I:アイテム
W:武器
A:防具
T:ステート
E:エネミー
のいずれか、
xはそれぞれのIDが入ります。

例:10番の防具のメモの内容に置換する
<メモ置換:A10>

ただし、これを記述する際、データの読み込みの順番が
アクター
クラス
スキル
エネミー
ステート
アイテム
武器
防具
タイルセット
(マップ)
(イベント)
となっているため、順番が上のものが、順番が下になっているデータへの置換はできません。
※アクターのメモの内容をエネミーのメモで置換することはできない等

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

    'use strict';

    var parameters = PluginManager.parameters('ReplaceMemo');

    ////////////////////////////////////////////////////////////////////////////////////

    var __DManager_extractMetadata = DataManager.extractMetadata;
    DataManager.extractMetadata = function (data) {
        data.note = data.note.replace(/<(?:メモ置換|ReplaceMemo):([MCSIWATE])(\d+)>/gi, function () {
            switch (arguments[1]) {
                case 'M': return $dataActors[Number(arguments[2])].note;
                case 'C': return $dataClasses[Number(arguments[2])].note;
                case 'S': return $dataSkills[Number(arguments[2])].note;
                case 'I': return $dataItems[Number(arguments[2])].note;
                case 'W': return $dataWeapons[Number(arguments[2])].note;
                case 'A': return $dataArmors[Number(arguments[2])].note;
                case 'T': return $dataStates[Number(arguments[2])].note;
                case 'E': return $dataEnemies[Number(arguments[2])].note;
            }
            return '';
        });
        __DManager_extractMetadata.call(this, data);
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());