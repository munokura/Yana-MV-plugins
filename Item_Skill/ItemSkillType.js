//
//  アイテムにスキルタイプ付与 ver1.00
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
Imported['ItemSkillType'] = 1.00;
/*:
@plugindesc ver1.00/By associating skill types with items, it is possible to seal item commands, etc.
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Item_Skill/ItemSkillType.js
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
Set the plugin parameters to run it.

-----------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released

@param ItemSkillType
@text Item skill type ID
@desc The ID to set as the skill type of the item.
@default 4
@type number
*/


/*:ja
@plugindesc ver1.00/アイテムにスキルタイプを関連付けることで、アイテムコマンドの封印などを可能にします。
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Item_Skill/ItemSkillType.js

@help
------------------------------------------------------
使用方法
------------------------------------------------------
プラグインパラメータを設定すれば、動作します。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param ItemSkillType
@text アイテムのスキルタイプID
@desc アイテムのスキルタイプとして設定するIDです。
@default 4
@type number
*/

(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('ItemSkillType');
    var itemSkillType = Number(parameters['ItemSkillType']);

    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義
    Window_ActorCommand.prototype.addItemCommand = function() {
        this.addCommand(TextManager.item, 'item', !this._actor.isSkillTypeSealed(itemSkillType));
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());