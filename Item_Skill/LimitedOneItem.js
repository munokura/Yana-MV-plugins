//
//  限定品 ver1.01
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
Imported['LimitedOneItem'] = 1.01;
/*:
@plugindesc ver1.01/You can now set items that you can only own one of.
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
There are no plugin commands.
------------------------------------------------------
------------------------------------------------------
How to Set Up
------------------------------------------------------
If the Note field of an item, weapon, or armor contains the text set by LimitedKey,
that item becomes limited, you cannot possess more than one, and you cannot acquire more.
In addition, as an additional function, if you reach your item limit,
the switch with the ID specified by ItemFullSwitchID will be turned ON.
------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.01:180409
Updated plugin parameter specifications to 1.5.0.
Fixed a bug that prevented the message displayed when you reached your inventory limit from being disabled.
ver1.00:
Released

@param LimitedKey
@desc This is a keyword to be written in the memo to specify limited items.
@default <Limited>

@param KeyItemLimited
@desc If you want to treat all Key Item as limited editions, specify true.
@default false
@type boolean

@param IncludeMemberEquips
@desc Specify true if you want to include party members' equipment in the number of items you own.
@default true
@type boolean

@param IncludeOutMemberEquips
@desc If you want to include equipment belonging to members outside your party in the number of items you own, specify true.
@default true
@type boolean

@param ItemFullSwitchID
@desc This is the ID of the switch that turns ON when the item limit is exceeded.
@default 24
@type switch

@param UngettableMessage
@desc This is the text that pops up when you are unable to obtain an item due to possession limit. *GetInformation must be installed.
@default \I[_icon]_name \c[4]can't hold on any longer!
*/


/*:ja
@plugindesc ver1.01/1つしか所持できないアイテムを設定できるようにします。
@author Yana

@help
 プラグインコマンドはありません。
------------------------------------------------------
------------------------------------------------------
設定方法
------------------------------------------------------
アイテムや武器、防具のメモ欄に、LimitedKeyで設定したテキストが含まれている場合、
そのアイテムは限定品となり、1つ以上持てず、新たに手に入れることができなくなります。
また、追加機能として、アイテムの所持限界でそれ以上持てなかった場合、
ItemFullSwitchIDで指定したIDのスイッチがONになります。
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.01:180409
プラグインパラメータの仕様を1.5.0に更新。
所持限界時の表示メッセージが無効化できないバグを修正。
ver1.00:
公開

@param LimitedKey
@desc 限定品を指定するためのメモに記述するキーワードです。
@default <限定品>

@param KeyItemLimited
@desc キーアイテムをすべて限定品として扱う場合、trueに指定してください。
@default false
@type boolean

@param IncludeMemberEquips
@desc パーティメンバーの装備を所持数に含む場合、trueを指定してください。
@default true
@type boolean

@param IncludeOutMemberEquips
@desc パーティ外のメンバーの装備を所持数に含む場合、trueを指定してください。
@default true
@type boolean

@param ItemFullSwitchID
@desc アイテムが所持限界を超えていた場合、ONにするスイッチのIDです。
@default 24
@type switch

@param UngettableMessage
@desc 所持限界で入手できなかった時ポップアップするテキストです。 ※GetInformationの導入が必要です。
@default 「\I[_icon]_name」は\c[4]これ以上持てない！
*/

(function () {

    var parameters = PluginManager.parameters('LimitedOneItem');
    var limitedKey = new RegExp(parameters['LimitedKey'] || '<限定品>');
    var keyItemLimited = String(parameters['KeyItemLimited']) === 'true';
    var includeMemberEquips = String(parameters['IncludeMemberEquips']) === 'true';
    var includeOutMemberEquips = String(parameters['IncludeOutMemberEquips']) === 'true';

    var itemFullSwitchId = Number(parameters['ItemFullSwitchID']) || 24;

    var ungettableMessage = String(parameters['UngettableMessage'] || '');

    DataManager.isLimitedOne = function (item) {
        if (!item) { return false }
        if (item._limitedOne === undefined) {
            if (keyItemLimited && item.itypeId === 2) {
                item._limitedOne = true;
            } else {
                item._limitedOne = !!item.note.match(limitedKey);
            }
        }
        return item._limitedOne;
    };

    Game_Party.prototype.isOnlyOne = function (item) {
        var limitedOne = DataManager.isLimitedOne(item);
        if (!limitedOne) { return false }
        if (!includeMemberEquips) { return false }
        for (var i = 0; i < $dataActors.length; i++) {
            var actor = $dataActors[i];
            if (!!actor) {
                var aa = $gameActors.actor(actor.id);
                if (includeOutMemberEquips || this.members().contains(aa)) {
                    if (!!aa && aa.equips().contains(item)) { return true }
                }
            }
        }
        return false;
    };

    var _LOI_GParty_maxItems = Game_Party.prototype.maxItems;
    Game_Party.prototype.maxItems = function (item) {
        if (DataManager.isLimitedOne(item)) { return 1 }
        return _LOI_GParty_maxItems.call(this, item);
    };

    var _LOI_GParty_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
        var n = this.numItems(item);
        var flag = (n + amount) > this.maxItems(item);
        $gameSwitches.setValue(itemFullSwitchId, flag);
        if (flag) {
            if (Imported['GetInformation']) {
                if (ungettableMessage !== '') {
                    CommonPopupManager.showInfo(item, ungettableMessage);
                }
            }
            return;
        }
        _LOI_GParty_gainItem.call(this, item, amount, includeEquip);
    };

    var _LOI_GParty_hasMaxItems = Game_Party.prototype.hasMaxItems;
    Game_Party.prototype.hasMaxItems = function (item) {
        var result = _LOI_GParty_hasMaxItems.call(this, item);
        return result || this.isOnlyOne(item);
    };
}());