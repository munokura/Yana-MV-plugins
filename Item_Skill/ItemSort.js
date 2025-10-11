//
//  アイテムソート ver1.03
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
Imported['ItemSort'] = 1.03;
/*:
@plugindesc ver1.03/Add a mechanism to sort items.
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
How to Use
------------------------------------------------------
This plugin works by setting plugin parameters.
For menu items, equipment items, and battle items,
Pressing the key set in the parameter cycles through the sorting type.

The available sorting types and their corresponding keys are:
new → Prioritize newly acquired items
usable → Prioritize available items
idA → ID ascending
idB → ID descending
kanaA → Name ascending
kanaB → Name descending
priceA → Price ascending
priceB → Price descending

Also, if you enter either
<Yomigana:xxx>
in the item's Note field, the items will be sorted by name using the specified reading.

-----------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.03:180905
Fixed a bug that prevented equipment from displaying properly on the equipment screen.
ver1.02:180104
Adjusted the data stored in $gameSystem.
Updated plugin parameter specifications to 1.5.0.
ver1.01:170104
Changed so that the usable items sorting Traits is no longer displayed during equipment scenes.
ver1.00:
Released

@param SortTrigger
@desc This is the key setting for changing the sort type. Multiple settings are possible.
@default shift

@param MaxNewerCount
@desc The number of items that are considered newly acquired.
@default 10
@type number

@param NewerItemColor1
@desc The color of the underline displayed on newly acquired items. If left blank, no underline will be displayed.
@default rgba(128,128,255,0.5)

@param NewerItemColor2
@desc This is the underline color 2 that appears on newly acquired items.
@default rgba(255,255,255,0.5)

@param NewerItemNewText
@desc The text that will be displayed on the icon of the newly acquired item. If left blank, it will not be displayed.
@default NEW!

@param NewerItemNewColor
@desc The color of the text displayed on the icon of a newly acquired item. Specify the color index at the bottom right of Window.png.
@default 6
@type number

@param NewerItemFontColor
@desc The text color of newly acquired items. Specify the color index at the bottom right of Window.png.
@default 6
@type number

@param SortList
@desc The sort order.
@default new,usable,idA,idB,kanaA,kanaB,priceA,priceB

@param SortTextColor
@desc The color of the sort text. Specify the color index at the bottom right of Window.png.
@default 6
@type number

@param SortNewText
@desc This text is given priority for new purchases.
@default New purchases given priority

@param SortIdAText
@desc Text in ascending order by ID.
@default ID ascending

@param SortIdBText
@desc Text by ID descending.
@default ID descending

@param SortKanaAText
@desc Name ascending text.
@default Name ascending

@param SortKanaBText
@desc Text by name descending.
@default Name descending

@param SortPriceAText
@desc Price ascending text.
@default Price ascending

@param SortPriceBText
@desc Price descending text.
@default Price descending

@param SortUsableText
@desc Available text is preferred.
@default Availability priority
*/


/*:ja
@plugindesc ver1.03/アイテムをソートする仕組みを追加します。
@author Yana

@help
 プラグインコマンドはありません。
------------------------------------------------------
------------------------------------------------------
 使い方
------------------------------------------------------
プラグインパラメータを設定することで動作します。
メニューのアイテム、装備のアイテム、バトルのアイテムで
パラメータで設定したキーを押すことで、順番にソートの種類を変更します。

使用可能なソートタイプと、それに対応するキーは
new → 新規入手優先
usable → 使用可能優先
idA → ID昇順
idB → ID降順
kanaA → 名前昇順
kanaB → 名前降順
priceA → 価格昇順
priceB → 価格降順
となります。

また、アイテムのメモ欄に
<読み仮名:xxx>
<Yomigana:xxx>
のいずれかを記述すると、設定した読み仮名で名前順のソート判定が行われます。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.03:180905
装備画面で正常に表示されないバグを修正。
ver1.02:180104
$gameSystemに格納されるデータを調整。
プラグインパラメータの仕様を1.5.0に更新。
ver1.01:170104
装備シーン時に使用可能優先のソートが表示されないように変更
ver1.00:
公開

@param SortTrigger
@desc ソートタイプを変更するキーの設定です。 複数設定することもできます。
@default shift

@param MaxNewerCount
@desc 新規入手として判定するアイテムの数です。
@default 10
@type number

@param NewerItemColor1
@desc 新規入手アイテムに表示される下線の色1です。 空欄にすると、下線は表示されません。
@default rgba(128,128,255,0.5)

@param NewerItemColor2
@desc 新規入手アイテムに表示される下線の色2です。
@default rgba(255,255,255,0.5)

@param NewerItemNewText
@desc 新規入手アイテムのアイコンに表示されるテキストです。 空欄にすると、表示されません。
@default NEW!

@param NewerItemNewColor
@desc 新規入手アイテムのアイコンに表示されるテキストの色です。 Window.pngの右下のカラーインデックスで指定します。
@default 6
@type number

@param NewerItemFontColor
@desc 新規入手アイテムの文字色です。 Window.pngの右下のカラーインデックスで指定します。
@default 6
@type number

@param SortList
@desc ソートの順序です。
@default new,usable,idA,idB,kanaA,kanaB,priceA,priceB

@param SortTextColor
@desc ソートテキストの色です。 Window.pngの右下のカラーインデックスで指定します。
@default 6
@type number

@param SortNewText
@desc 新規入手優先のテキストです。
@default 新規入手優先

@param SortIdAText
@desc ID昇順のテキストです。
@default ID昇順

@param SortIdBText
@desc ID降順のテキストです。
@default ID降順

@param SortKanaAText
@desc 名前昇順のテキストです。
@default 名前昇順

@param SortKanaBText
@desc 名前降順のテキストです。
@default 名前降順

@param SortPriceAText
@desc 価格昇順のテキストです。
@default 価格昇順

@param SortPriceBText
@desc 価格降順のテキストです。
@default 価格降順

@param SortUsableText
@desc 使用可能優先のテキストです。
@default 使用可能優先
*/

(function () {

    'use strict';

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('ItemSort');
    var sortTrigger = parameters['SortTrigger'].split(',');
    var maxNewerCount = Number(parameters['MaxNewerCount']) || 10;
    var newerItemColor1 = parameters['NewerItemColor1'];
    var newerItemColor2 = parameters['NewerItemColor2'];
    var newerItemNewText = parameters['NewerItemNewText'];
    var newerItemNewColor = Number(parameters['NewerItemNewColor']);
    var newerItemFontColor = Number(parameters['NewerItemFontColor']) || 0;
    var sortList = parameters['SortList'].split(',');
    var sortText = {
        'new': parameters['SortNewText'],
        'idA': parameters['SortIdAText'],
        'idB': parameters['SortIdBText'],
        'kanaA': parameters['SortKanaAText'],
        'kanaB': parameters['SortKanaBText'],
        'priceA': parameters['SortPriceAText'],
        'priceB': parameters['SortPriceBText'],
        'usable': parameters['SortUsableText']
    };
    var sortTextColor = Number(parameters['SortTextColor']) || 0;

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.isItemEx = function (item) {
        if (!item._type) this.initItemType(item);
        return item._itemType === 0;
    };

    DataManager.isWeaponEx = function (item) {
        if (!item._type) this.initItemType(item);
        return item._itemType === 1;
    };

    DataManager.isArmorEx = function (item) {
        if (!item._type) this.initItemType(item);
        return item._itemType === 2;
    };

    DataManager.isSkillEx = function (item) {
        if (!item._type) this.initItemType(item);
        return item._itemType === 3;
    };

    DataManager.initItemType = function (item) {
        item._itemType = -1;
        if (DataManager.isItem(item)) item._itemType = 0;
        if (DataManager.isWeapon(item)) item._itemType = 1;
        if (DataManager.isArmor(item)) item._itemType = 2;
        if (DataManager.isSkill(item)) item._itemType = 3;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Temp.prototype.encodeSortItem = function (item) {
        if (DataManager.isItemEx(item)) return 'I' + item.id;
        if (DataManager.isWeaponEx(item)) return 'W' + item.id;
        if (DataManager.isArmorEx(item)) return 'A' + item.id;
    };

    Game_Temp.prototype.decodeSortItem = function (item) {
        var code = item.slice(0, 1);
        var id = parseInt(item, 10);
        if (code === 'I') return $dataItems[id];
        if (code === 'W') return $dataWeapons[id];
        if (code === 'A') return $dataArmors[id];
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_System.prototype.itemSortType = function () {
        if (this._itemSortType === undefined) this._itemSortType = 0;
        return this._itemSortType;
    };

    Game_System.prototype.setItemSortType = function (sortType) {
        this._itemSortType = sortType;
    };

    Game_System.prototype.pushNewerItems = function (item) {
        if (this._newerItems === undefined) this._newerItems = [];
        var cItem = $gameTemp.encodeSortItem(item);
        if (this._newerItems.contains(cItem)) return;
        this._newerItems.unshift(cItem);
        if (this._newerItems.length > maxNewerCount) this._newerItems.pop();
    };

    Game_System.prototype.newerItems = function () {
        if (this._newerItems === undefined) this._newerItems = [];
        return this._newerItems;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GActor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function (slotId, item) {
        $gameTemp._notNewerItem = true;
        __GActor_changeEquip.call(this, slotId, item);
        $gameTemp._notNewerItem = false;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GParty_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
        __GParty_gainItem.call(this, item, amount, includeEquip);
        if (!$gameTemp._notNewerItem && item && amount > 0) {
            if (DataManager.isItem(item) && item.itypeId > 2) return;
            $gameSystem.pushNewerItems(item);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WIList_initialize = Window_ItemList.prototype.initialize;
    Window_ItemList.prototype.initialize = function (x, y, width, height) {
        this._sortEnabled = true;
        __WIList_initialize.call(this, x, y, width, height);
        this.createSortSprite();
        var name = JsonEx._getConstructorName(this);
        if (name === 'Window_SkillCP') this._sortEnabled = false;
    };

    Window_ItemList.prototype.createSortSprite = function () {
        var sprite = new Sprite();
        sprite.bitmap = new Bitmap(160, 20);
        sprite.x = this.width - sprite.bitmap.width;
        sprite.y = 0;
        this._sortSprite = sprite;
        this.addChild(this._sortSprite);
        this.refreshSortSprite();
    };

    Window_ItemList.prototype.refreshSortSprite = function () {
        if (this._sortSprite) {
            this._sortSprite.opacity = this.isSortEnabled() ? 255 : 0;
            this._sortSprite.bitmap.clear();
            this._sortSprite.bitmap.gradientFillRect(0, 0, 30, 20, 'rgba(0,0,0,0)', 'rgba(0,0,0,0.8)');
            this._sortSprite.bitmap.fillRect(30, 0, 100, 20, 'rgba(0,0,0,0.8)');
            this._sortSprite.bitmap.gradientFillRect(130, 0, 30, 20, 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0)');
            this._sortSprite.bitmap.fontSize = 18;
            this._sortSprite.bitmap.textColor = this.textColor(sortTextColor);
            var type = this.sortList($gameSystem.itemSortType());
            this._sortSprite.bitmap.drawText(sortText[type], 0, 0, 160, 20, 'center');
        }
    };

    Window_ItemList.prototype.sortList = function (index) {
        return sortList[index];
    };

    Window_ItemList.prototype.sortListSize = function () {
        return sortList.length;
    };

    var __WIList_makeItemList = Window_ItemList.prototype.makeItemList;
    Window_ItemList.prototype.makeItemList = function () {
        __WIList_makeItemList.call(this);
        this.itemSort();
    };

    var __WIList_refresh = Window_ItemList.prototype.refresh;
    Window_ItemList.prototype.refresh = function () {
        __WIList_refresh.call(this);
        this.refreshSortSprite();
    };

    var __WIList_drawItem = Window_ItemList.prototype.drawItem;
    Window_ItemList.prototype.drawItem = function (index) {
        var item = this._data[index];
        var cItem = item ? $gameTemp.encodeSortItem(item) : null;
        if (this.isHighlightNewItem() && item && newerItemColor1 && $gameSystem.newerItems().contains(cItem)) {
            var rect = this.itemRect(index);
            rect.y += rect.height - 8;
            rect.height = 6;
            this.contents.gradientFillRect(rect.x, rect.y, rect.width, rect.height, newerItemColor1, newerItemColor2);
        }

        __WIList_drawItem.call(this, index);

        if (this.isHighlightNewItem() && newerItemNewText && item && $gameSystem.newerItems().contains(cItem)) {
            this.contents.fontSize = 16;
            var rect = this.itemRect(index);
            this.changeTextColor(this.textColor(newerItemNewColor));
            //this.changePaintOpacity(false);
            this.drawText(newerItemNewText, rect.x, rect.y - 10, 32);
            //this.contents.fontSize = this.standardFontSize();
            this.resetFontSettings();
        }
    };

    if (newerItemFontColor) {
        Window_ItemList.prototype.drawItemName = function (item, x, y, width) {
            var color = Number(newerItemFontColor);
            var cItem = item ? $gameTemp.encodeSortItem(item) : null;
            var isNewer = this.isHighlightNewItem() && item && newerItemColor1 && $gameSystem.newerItems().contains(cItem);
            width = width || 312;
            if (item) {
                var iconBoxWidth = Window_Base._iconWidth + 4;
                this.resetTextColor();
                if (isNewer) this.changeTextColor(this.textColor(color));
                this.drawIcon(item.iconIndex, x + 2, y + 2);
                this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
            }
        };
    }

    Window_ItemList.prototype.itemSort = function () {
        var ary = this._data;
        ary = ary.filter(function (a) { return a });
        var type = this.sortList($gameSystem.itemSortType());
        switch (type) {
            case 'new': this.sortNewer(ary); break;
            case 'idA': ary = this.sortId(ary, 1); break;
            case 'idB': ary = this.sortId(ary, -1); break;
            case 'kanaA': ary = this.sortKana(ary, 1); break;
            case 'kanaB': ary = this.sortKana(ary, -1); break;
            case 'priceA': ary = this.sortPrice(ary, 1); break;
            case 'priceB': ary = this.sortPrice(ary, -1); break;
            case 'usable': ary = this.sortUsable(ary, 1); break;
        }
        if (this.includes(null)) ary.push(null);
        this._data = ary;
    };

    Window_ItemList.prototype.sortNewer = function (data) {
        data.sort(function (a, b) {
            var aa = a ? $gameTemp.encodeSortItem(a) : null;
            var bb = b ? $gameTemp.encodeSortItem(b) : null;
            var ai = $gameSystem.newerItems().indexOf(aa) + 1;
            var bi = $gameSystem.newerItems().indexOf(bb) + 1;
            if (ai === 0 && bi > 0) return 1;
            if (bi === 0 && ai > 0) return -1;
            return ai - bi;
        });
        return data;
    };

    Window_ItemList.prototype.sortId = function (data, ud) {
        if (ud < 0) data.reverse();
        return data;
        /*
        data.sort(function(a,b){
            var aid = a.id;
            var bid = b.id;
            if (DataManager.isItemEx(a)) aid -= 10000;
            if (DataManager.isItemEx(b)) bid -= 10000;
            if (DataManager.isWeaponEx(a)) aid -= 5000;
            if (DataManager.isWeaponEx(b)) bid -= 5000;
            return bid - aid;
        }.bind(this));
        return data;
        */
    };

    Window_ItemList.prototype.sortKana = function (data, ud) {
        data.sort(function (a, b) {
            var nameA = a.name;
            var nameB = b.name;
            if (a.meta['読み仮名'] || a.meta['Yomigana']) {
                nameA = a.meta['読み仮名'] || a.meta['Yomigana'];
            }
            if (b.meta['読み仮名'] || b.meta['Yomigana']) {
                nameB = b.meta['読み仮名'] || b.meta['Yomigana'];
            }
            nameA = this.convertKanaHira(nameA.toLowerCase());
            nameB = this.convertKanaHira(nameB.toLowerCase());
            if (nameA < nameB) return -1 * ud;
            if (nameA > nameB) return 1 * ud;
            return 0;
        }.bind(this));
        return data;
    };

    Window_ItemList.prototype.sortPrice = function (data, ud) {
        if (ud === 1) data.sort(function (a, b) { return a.price - b.price });
        if (ud === -1) data.sort(function (a, b) { return b.price - a.price });
        return data;
    };

    Window_ItemList.prototype.sortUsable = function (data, ud) {
        data = this.sortId(data, ud);
        data.sort(function (a, b) {
            if (a.occasion === 0) return -1;
            if (b.occasion === 0) return 1;
            if (a.occasion === 2) return -1;
            if (b.occasion === 2) return 1;
            return 0;
        });
        return data;
    };

    Window_ItemList.prototype.convertKanaHira = function (text) {
        return text.replace(/[\u30a1-\u30f6]/g, function (match) {
            var chr = match.charCodeAt(0) - 0x60;
            return String.fromCharCode(chr);
        });
    };

    Window_ItemList.prototype.isSortEnabled = function () {
        if (this._category === 'drop') return false;
        var cw = SceneManager._scene._categoryWindow;
        var sw = SceneManager._scene._slotWindow;
        return this._sortEnabled && (this.isOpenAndActive() || (cw && cw.isOpen()) || (sw && sw.isOpenAndActive()));
    };

    Window_ItemList.prototype.isSortNewerEnable = function () {
        return true;
    };

    Window_ItemList.prototype.isHighlightNewItem = function () {
        return true;
    };

    Window_ItemList.prototype.processHandling = function () {
        Window_Selectable.prototype.processHandling.call(this);
        if (SceneManager._scene._slotWindow && !this.isOpenAndActive()) return;
        if (SceneManager._scene._messageWindow && !this.isOpenAndActive()) return;
        if (this.isTriggeredChangeSortType()) this.processSort();
    };

    Window_ItemList.prototype.processSort = function () {
        if (this.isSortEnabled()) {
            var sortType = $gameSystem.itemSortType();
            sortType = (sortType + 1) % this.sortListSize();
            if (!this.isSortNewerEnable() && this.sortList(sortType) === 'new') {
                sortType = (sortType + 1) % this.sortListSize();
            }
            var name = JsonEx._getConstructorName(this);
            if (name === 'Window_EquipItem' && this.sortList(sortType) === 'usable') {
                sortType = (sortType + 1) % this.sortListSize();
            }
            $gameSystem.setItemSortType(sortType);
            SoundManager.playCursor();
            this.refresh();
            this.select(this.index());
        }
    };

    Window_ItemList.prototype.isTriggeredChangeSortType = function () {
        for (var i = 0, max = sortTrigger.length; i < max; i++) {
            var trigger = sortTrigger[i];
            if (Input.isTriggered(trigger)) return true;
        }
        return false;
    };

    Window_ItemList.prototype.processTouch = function () {
        Window_Selectable.prototype.processTouch.call(this);
        if (this.isOpenAndActive()) {
            if (TouchInput.isTriggered() && !this.isTouchedInsideFrame()) this.processSort();
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());