//
//  操作説明ウィンドウ ver1.00
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
Imported['WindowControlGuide'] = 1.00;

/*:
 * @plugindesc ver1.00/操作説明など、任意のテキストを表示するウィンドウをアイテム画面などに追加します。
 * @author Yana
 *
 * @param ItemCategoryGuide
 * @desc アイテムシーンでカテゴリがアクティブなときのヘルプです。
 * @default ↑↓セカンドカテゴリの変更 / Shift:ソートの切替
 *
 * @param ItemListGuide
 * @desc アイテムシーンでアイテムがアクティブなときのヘルプです。
 * @default Shift:ソートの切替 / Ctrl:廃棄モードのＯＮ / Tab:ミニウィンドウ表示の切替
 *
 * @param EquipCommandGuide
 * @desc 装備シーンで装備コマンドがアクティブなときのヘルプです。
 * @default
 *
 * @param EquipSlotGuide
 * @desc 装備シーンで装備スロットがアクティブなときのヘルプです。
 * @default Shift:装備を外す
 *
 * @param EquipItemGuide
 * @desc 装備シーンで装備アイテムがアクティブなときのヘルプです。
 * @default Shift:ソートの切替 / Tab:ミニウィンドウ表示の切替
 *
 * @param SkillTypeGuide
 * @desc スキルシーンでスキルタイプがアクティブなときのヘルプです。
 * @default
 *
 * @param SkillListGuide
 * @desc スキルシーンでスキルリストがアクティブなときのヘルプです。
 * @default Tab:ミニウィンドウ表示の切替
 *
 * @param SellCategoryGuide
 * @desc 売却シーンでカテゴリがアクティブなときのヘルプです。
 * @default ↑↓セカンドカテゴリの変更 / Shift:ソートの切替
 *
 * @param SellItemGuide
 * @desc 売却シーンでアイテムがアクティブなときのヘルプです。
 * @default Shift:ソートの切替 / Tab:ミニウィンドウ表示の切替
 *
 * @param ItemDropGuide
 * @desc アイテムシーンで戦利品がアクティブなときのヘルプです。
 * @default Shift:戦利品を全て捨てる / Ctrl:廃棄モードのＯＮ / Tab:ミニウィンドウ表示の切替
 *
 * @param ItemAbolitionGuide
 * @desc アイテムシーンで廃棄モードがアクティブなときのヘルプです。
 * @default Shift:ソートの切替 / Ctrl:廃棄モードのＯＦＦ / Tab:ミニウィンドウ表示の切替
 *
 * @param ItemAbolitionDropGuide
 * @desc アイテムシーンで戦利品がアクティブで廃棄モードなときのヘルプです。
 * @default Shift:戦利品を全て捨てる / Ctrl:廃棄モードのＯＦＦ / Tab:ミニウィンドウ表示の切替
 *
 * @help------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------
 *  使い方
 * ------------------------------------------------------
 * プラグインを導入し、プラグインパラメータを設定することで動作します。
 * 各ガイドでは、制御文字が使用可能です。
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.00:
 * 公開
 */

(function(){

    'use strict';

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('WindowControlGuide');
    var itemCategoryGuide = parameters['ItemCategoryGuide'];
    var itemListGuide = parameters['ItemListGuide'];
    var equipCommandGuide = parameters['EquipCommandGuide'];
    var equipSlotGuide = parameters['EquipSlotGuide'];
    var equipListGuide = parameters['EquipItemGuide'];
    var skillTypeGuide = parameters['SkillTypeGuide'];
    var skillListGuide = parameters['SkillListGuide'];
    var sellItemGuide = parameters['SellItemGuide'];
    var itemDropGuide = parameters['ItemDropGuide'];
    var itemAbolitionGuide = parameters['ItemAbolitionGuide'];
    var itemAbolitionDropGuide = parameters['ItemAbolitionDropGuide'];

    ////////////////////////////////////////////////////////////////////////////////////

    Window_Selectable.prototype.setGuideWindow = function(window) {
        this._guideWindow = window;
    };

    Window_Selectable.prototype.setGuideText = function(text) {
        if (this._guideWindow) this._guideWindow.setText(text);
    };

    var __WSelectable_activate = Window_Selectable.prototype.activate;
    Window_Selectable.prototype.activate = function() {
        __WSelectable_activate.call(this);
        this.setGuideText(this.guideText());
    };

    Window_Selectable.prototype.guideText = function() {
        return '';
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_ItemGuide() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemGuide.prototype = Object.create(Window_Base.prototype);
    Window_ItemGuide.prototype.constructor = Window_ItemGuide;

    Window_ItemGuide.prototype.initialize = function(x, y, width) {
        Window_Base.prototype.initialize.call(this, x, y, width, this.windowHeight());
        this.createSprite();
        this.setText('');
    };

    Window_ItemGuide.prototype.createSprite = function() {
        this._sprite = new Sprite();
        this._sprite.x = 4;
        this._sprite.y = 4;
        this.addChild(this._sprite);
    };

    Window_ItemGuide.prototype.windowHeight = function() {
        return 36;
    };

    Window_ItemGuide.prototype.standardFontSize = function() {
        return 20;
    };

    Window_ItemGuide.prototype.setText = function(text) {
        this._text = text;
        this.refresh();
    };

    Window_ItemGuide.prototype.refresh = function() {
        if (this._sprite.bitmap) this._sprite.bitmap.clear();
        if (this._text) {
            var w = this.width - 8;
            var h = 24;
            var bitmap = new Bitmap(w,h);
            bitmap.fontSize = 20;
            this.contents = bitmap;
            var width = this.textWidthEx(this.convertEscapeCharacters(this._text));
            var x = (w - width) / 2;
            this.drawTextEx(this._text, x, 0);
            this._sprite.bitmap = bitmap;
            this.contents = null;
        }
    };


    if (!Imported['MessageAlignmentEC']) {
        Window_ItemGuide.prototype.textWidthEx = function (text) {
            var result = 0;
            text = text.replace(/\x1bC\[\d+\]/gi, '');
            text = text.replace(/\x1bI\[\d+\]/gi, function () {
                result += Window_Base._iconWidth;
                return '';
            }.bind(this));
            for (var i = 0, max = text.length; i < max; i++) {
                var c = text[i];
                if (c === '\x1b') {
                    i++;
                    c = text[i];
                    if (c === '{') {
                        this.makeFontBigger();
                    } else if (c === '}') {
                        this.makeFontSmaller();
                    } else if (c === 'F' && text[i + 1] === 'S') {
                        var cc = '\x1b';
                        for (var j = i; j < max; j++) {
                            cc += text[j];
                            if (text[j] === ']') {
                                if (cc.match(/\x1bFS\[(\d+)\]/i)) this.contents.fontSize = Number(RegExp.$1);
                                i = j;
                                break;
                            }
                        }
                    }
                } else {
                    result += this.textWidth(c);
                }
            }
            return result;
        };
    }

    ////////////////////////////////////////////////////////////////////////////////////

    Window_ItemCategory.prototype.guideText = function() {
        return itemCategoryGuide;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Window_ItemList.prototype.setGuideWindow = function(window) {
        Window_Selectable.prototype.setGuideWindow.call(this, window);
        this.height = this.height - 36;
        this.refresh();
    };

    Window_ItemList.prototype.guideText = function() {
        if (Imported['LimitPossession']) {
            if (this._abolitionMode) {
                return this._category === 'drop' ? itemAbolitionDropGuide : itemAbolitionGuide;
            } else {
                return this._category === 'drop' ? itemDropGuide : itemListGuide;
            }
        } else {
            return itemListGuide;
        }
    };

    var __WIList_refresh = Window_ItemList.prototype.refresh;
    Window_ItemList.prototype.refresh = function() {
        __WIList_refresh.call(this);
        if (this.active) this.setGuideText(this.guideText());
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Window_EquipCommand.prototype.guideText = function() {
        return equipCommandGuide;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Window_EquipSlot.prototype.guideText = function() {
        return equipSlotGuide;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Window_EquipItem.prototype.guideText = function() {
        return equipListGuide;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Window_SkillType.prototype.guideText = function() {
        return skillTypeGuide;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Window_SkillList.prototype.setGuideWindow = function(window) {
        Window_Selectable.prototype.setGuideWindow.call(this, window);
        this.height = this.height - 36;
        this.refresh();
    };

    Window_SkillList.prototype.guideText = function() {
        return skillListGuide;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Window_ShopSell.prototype.setGuideWindow = function(window) {
        Window_Selectable.prototype.setGuideWindow.call(this, window);
        this.height = this.height - 36;
        this.refresh();
    };

    Window_ShopSell.prototype.guideText = function() {
        return sellItemGuide;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SItem_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function() {
        __SItem_create.call(this);
        if (itemCategoryGuide || itemDropGuide || itemListGuide || itemAbolitionGuide || itemAbolitionDropGuide) {
            this.createGuideWindow();
            this._itemWindow.setGuideWindow(this._guideWindow);
            this._categoryWindow.setGuideWindow(this._guideWindow);
            this._guideWindow.y = this._itemWindow.y + this._itemWindow.height;
            if (this._categoryWindow.active) this._categoryWindow.activate();
            if (this._itemWindow.active) this._itemWindow.activate();
        }
    };

    Scene_Item.prototype.createGuideWindow = function() {
        var x = this._itemWindow.x;
        var y = 0;
        this._guideWindow = new Window_ItemGuide(x, y, this._itemWindow.width);
        this._windowLayer.addChildAt(this._guideWindow, 0);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SEquip_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function() {
        __SEquip_create.call(this);
        if (equipCommandGuide || equipSlotGuide || equipListGuide) {
            this.createGuideWindow();
            this._commandWindow.setGuideWindow(this._guideWindow);
            this._slotWindow.setGuideWindow(this._guideWindow);
            this._itemWindow.setGuideWindow(this._guideWindow);
            this._guideWindow.y = this._itemWindow.y + this._itemWindow.height;
            if (this._commandWindow.active) this._commandWindow.activate();
            if (this._slotWindow.active) this._slotWindow.activate();
            if (this._itemWindow.active) this._itemWindow.activate();
        }
    };

    Scene_Equip.prototype.createGuideWindow = function() {
        var x = this._itemWindow.x;
        var y = 0;
        this._guideWindow = new Window_ItemGuide(x, y, this._itemWindow.width);
        this._windowLayer.addChildAt(this._guideWindow, 0);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SSkill_create = Scene_Skill.prototype.create;
    Scene_Skill.prototype.create = function() {
        __SSkill_create.call(this);
        if (skillListGuide || skillTypeGuide) {
            this.createGuideWindow();
            this._skillTypeWindow.setGuideWindow(this._guideWindow);
            this._itemWindow.setGuideWindow(this._guideWindow);
            this._guideWindow.y = this._itemWindow.y + this._itemWindow.height;
            if (this._skillTypeWindow.active) this._skillTypeWindow.activate();
            if (this._itemWindow.active) this._itemWindow.activate();
        }
    };

    Scene_Skill.prototype.createGuideWindow = function() {
        var x = this._itemWindow.x;
        var y = 0;
        this._guideWindow = new Window_ItemGuide(x, y, this._itemWindow.width);
        this._windowLayer.addChildAt(this._guideWindow, 0);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SShop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        __SShop_create.call(this);
        if (sellItemGuide) {
            this.createGuideWindow();
            this._sellWindow.setGuideWindow(this._guideWindow);
            this._categoryWindow.setGuideWindow(this._guideWindow);
            this._guideWindow.y = this._sellWindow.y + this._sellWindow.height;
            if (this._categoryWindow.active) this._categoryWindow.activate();
            if (this._sellWindow.active) this._sellWindow.activate();
        }
    };

    Scene_Shop.prototype.createGuideWindow = function() {
        var x = this._sellWindow.x;
        var y = 0;
        this._guideWindow = new Window_ItemGuide(x, y, this._sellWindow.width);
        this._windowLayer.addChildAt(this._guideWindow, 0);
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());