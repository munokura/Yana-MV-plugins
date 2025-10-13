//
//  ヘルプウィンドウ改造 ver1.011
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
Imported['WindowHelpR'] = 1.011;
/*:
@plugindesc ver1.011/The help text size can be changed, the layout can be centered, and information can be displayed in the four corners of the frame.
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
This plugin works simply by installing it.
You can change its content by setting plugin parameters.

The text displayed in the frame:
_price → Changes to the selling price of the item
_value → Changes to the item's value (value is set in the item's note as <value:xxx> or <value:xxx>)
_element → Changes to the skill Elements (if the Ex Elements is set in the StatusUpReward settings, that Elements is displayed)
_meta[xxx] → Changes to the △△△ in the <xxx:△△△> field in the item's note
_categories → Changes to secondary category (only if the SecondaryCategories plugin is installed)
_weight → Changes to weight (only if the LimitPossession plugin is installed)

If any of these are set, the text will be hidden if the destination value is 0, an empty array, or an empty string.

-----------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.031:180411
Updated plugin parameter specifications to 1.5.0.
ver1.01:170104
Fixed a bug where frame text displayed on the left side was not positioned correctly.
ver1.00:
Released

@param FontSize
@desc Font size for the help window. If left blank, the default value will be used.
@default 22
@type number

@param FrameTextFontSize
@desc The font size of the text displayed in the frame.
@default 18
@type number

@param ItemTopLeftText
@desc The text to display in the top left corner of the item's help. Control characters are allowed.

@param ItemTopRightText
@desc The text to display in the top right corner of the item's help. Control characters are allowed.
@default \c[6]<Price:\c[0]_price\c[6]>

@param ItemBottomLeftText
@desc The text to display in the bottom left of the item's help. Control characters are allowed.

@param ItemBottomRightText
@desc The text to display in the bottom right corner of the item's help. Control characters are allowed.
@default \c[4]<_meta[category]>

@param SkillTopLeftText
@desc This is the text to display in the upper left corner of the skill help. Control characters can be used.

@param SkillTopRightText
@desc This is the text to display in the upper right corner of the skill help. Control characters can be used.
@default \c[4]<Element:_element>

@param SkillBottomLeftText
@desc This is the text to display in the bottom left of the skill help. Control characters can be used.

@param SkillBottomRightText
@desc This is the text to display in the bottom right of the skill help. Control characters can be used.

@param FrameTextPaddingX
@desc Padding X for the text to display in the box.
@default 12
@type number

@param FrameTextPaddingY
@desc Padding Y for the text to display in the frame.
@default 6
@type number

@param HideCategories
@desc [Only available when SecondaryCategories is installed] Categories that are hidden when categories are displayed.
@default All,Items,Weapons,Armors,Key Items
*/


/*:ja
@plugindesc ver1.011/ヘルプの文字サイズを変更できるようにして、配置を中央寄せにし、フレームの４隅に情報を表示できるようにします。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
 プラグインコマンドはありません。
------------------------------------------------------
------------------------------------------------------
 使い方
------------------------------------------------------
このプラグインを導入するだけで動作し、
プラグインパラメータを設定することで内容を変更できます。

フレームに表示するテキストでは、
_price→アイテムの売却額に変更
_value→アイテムの価値に変更(価値はアイテムのメモに<価値:xxx>または、<value:xxx>で設定)
_element→スキルの属性に変更(StatusUpRewardの設定でEx属性がある場合、そちらを表示)
_meta[xxx]→アイテムのメモ欄の<xxx:△△△>の△△△に変更
_categories→セカンダリカテゴリに変更(SecondaryCategoriesのプラグインが入っている場合のみ)
_weight→重量に変更(LimitPossessionのプラグインが入っている場合のみ)

これらのいずれかが設定されていると、変更先の数値が0、または空配列、または空文字の時は、
テキストを非表示にします。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.031:180411
プラグインパラメータの仕様を1.5.0に更新。
ver1.01:170104
左側に表示するフレームテキストの位置が正常でなかったバグを修正
ver1.00:
公開

@param FontSize
@desc ヘルプウィンドウのフォントサイズです。 空欄にすると、デフォルトの値が使用されます。
@default 22
@type number

@param FrameTextFontSize
@desc フレームに表示するテキストのフォントサイズです。
@default 18
@type number

@param ItemTopLeftText
@desc アイテムのヘルプの左上に表示するテキストです。 制御文字が使用できます。

@param ItemTopRightText
@desc アイテムのヘルプの右上に表示するテキストです。 制御文字が使用できます。
@default \c[6]<価値:\c[0]_price\c[6]>

@param ItemBottomLeftText
@desc アイテムのヘルプの左下に表示するテキストです。 制御文字が使用できます。

@param ItemBottomRightText
@desc アイテムのヘルプの右下に表示するテキストです。 制御文字が使用できます。
@default \c[4]<_meta[カテゴリ]>

@param SkillTopLeftText
@desc スキルのヘルプの左上に表示するテキストです。 制御文字が使用できます。

@param SkillTopRightText
@desc スキルのヘルプの右上に表示するテキストです。 制御文字が使用できます。
@default \c[4]<属性:_element>

@param SkillBottomLeftText
@desc スキルのヘルプの左下に表示するテキストです。 制御文字が使用できます。

@param SkillBottomRightText
@desc スキルのヘルプの右下に表示するテキストです。 制御文字が使用できます。

@param FrameTextPaddingX
@desc 枠に表示するテキストのパッディングXです。
@default 12
@type number

@param FrameTextPaddingY
@desc 枠に表示するテキストのパッディングYです。
@default 6
@type number

@param HideCategories
@desc 【SecondaryCategories導入時限定】 カテゴリを表示した際に、隠すカテゴリです。
@default すべて,アイテム,武器,防具,大事なもの
*/

(function () {

    'use strict';

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('WindowHelpR');
    var fontSize = Number(parameters['FontSize']);
    var frameTextFontSize = Number(parameters['FrameTextFontSize']);
    var itemTopLeftText = parameters['ItemTopLeftText'];
    var itemTopRightText = parameters['ItemTopRightText'];
    var itemBottomLeftText = parameters['ItemBottomLeftText'];
    var itemBottomRightText = parameters['ItemBottomRightText'];
    var skillTopLeftText = parameters['SkillTopLeftText'];
    var skillTopRightText = parameters['SkillTopRightText'];
    var skillBottomLeftText = parameters['SkillBottomLeftText'];
    var skillBottomRightText = parameters['SkillBottomRightText'];
    var frameTextPaddingX = Number(parameters['FrameTextPaddingX']);
    var frameTextPaddingY = Number(parameters['FrameTextPaddingY']);
    var hideCategories = parameters['HideCategories'].split(',');

    ////////////////////////////////////////////////////////////////////////////////////

    if (!Imported['MessageAlignmentEC']) {
        Window_Base.prototype.textWidthEx = function (text) {
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

    var __WHelp_initialize = Window_Help.prototype.initialize;
    Window_Help.prototype.initialize = function (x, y, width, height) {
        __WHelp_initialize.call(this, x, y, width, height);
        this.createHelpSprite();
    };

    Window_Help.prototype.createHelpSprite = function () {
        this._helpSprites = [];
        var size = frameTextFontSize + 2;
        for (var i = 0; i < 4; i++) {
            var sprite = new Sprite();
            var bitmap = new Bitmap(Math.floor(Graphics.boxWidth / 2), size);
            sprite.x = (this.width - bitmap.width) * (i % 2);
            sprite.x += sprite.x === 0 ? frameTextPaddingX : -frameTextPaddingX;
            sprite.y = (this.height - size) * Math.floor(i / 2);
            sprite.y += sprite.y === 0 ? frameTextPaddingY : -frameTextPaddingY;
            sprite.bitmap = bitmap;
            this.addChild(sprite);
            this._helpSprites[i] = sprite;
        }
        this.refreshHelpSprites();
    };

    Window_Help.prototype.refreshHelpSprites = function () {
        var ary1 = [itemTopLeftText, itemTopRightText, itemBottomLeftText, itemBottomRightText];
        var ary2 = [skillTopLeftText, skillTopRightText, skillBottomLeftText, skillBottomRightText];
        var ary = DataManager.isSkill(this._item) ? ary2 : ary1;
        var size = frameTextFontSize;
        var contents = this.contents;
        if (!this._helpSprites) this._helpSprites = [];
        for (var i = 0; i < 4; i++) {
            var sprite = this._helpSprites[i];
            sprite.bitmap.clear();
            if (ary[i] && this._item) {
                var text = ary[i];
                var item = this._item;
                var f1 = false;
                var f2 = false;
                sprite.bitmap.fontSize = size;
                text = text.replace(/_meta\[(.+)\]/, function () {
                    f2 = true;
                    var t = item.meta[arguments[1]];
                    if (t) {
                        f1 = true;
                        return t;
                    } else {
                        return '';
                    }
                }.bind(this));
                text = text.replace(/_value/, function () {
                    var price = item.price ? item.price : 0;
                    f2 = true;
                    if (item.meta['価値']) price = Number(item.meta['価値']);
                    if (item.meta['value']) price = Number(item.meta['value']);
                    if (price > 0) {
                        f1 = true;
                        return price;
                    } else {
                        return '';
                    }
                }.bind(this));
                text = text.replace(/_price/, function () {
                    var price = (item.price ? item.price : 0) / 2;
                    f2 = true;
                    if (price > 0) {
                        f1 = true;
                        return price;
                    } else {
                        return '';
                    }
                }.bind(this));
                text = text.replace(/_element/, function () {
                    var id = item.damage ? item.damage.elementId : 0;
                    f2 = true;
                    if (Imported['StatusUpReward']) id = DataManager.itemExElement(item);
                    if (id > 0) {
                        f1 = true;
                        return $dataSystem.elements[id];
                    } else {
                        return '';
                    }
                }.bind(this));
                if (Imported['SecondaryCategories']) {
                    text = text.replace(/_categories/, function () {
                        var t = '';
                        f2 = true;
                        var cs = DataManager.itemSecondaryCategories(item);
                        cs = cs.filter(function (c) { return hideCategories.indexOf(c) < 0 });
                        if (cs.length > 0) {
                            f1 = true;
                            cs.sort();
                            for (var i = 0, max = cs.length; i < max; i++) t += '(' + cs[i] + ')';
                        }
                        return t;
                    }.bind(this));
                }
                if (Imported['LimitPossession']) {
                    var s = PluginManager.parameters('LimitPossession')['NumberOfDecimalPlace'];
                    text = text.replace(/_weight/, function () {
                        f2 = true;
                        var weight = DataManager.itemWeight(item);
                        if (weight > 0) {
                            f1 = true;
                            return weight.toFixed(Number(s));
                        } else {
                            return '';
                        }

                    }.bind(this));
                }
                if ((f1 && f2) || !f2) {
                    this.contents = sprite.bitmap;
                    this._callSpriteEx = true;
                    var w = this.textWidthEx(this.convertEscapeCharacters(text));
                    var x = sprite.width - w;
                    if (i % 2 === 0) x = 0;
                    this.drawTextEx(text, x, -2);
                    this._callSpriteEx = false;
                }
            }
        }
        this.contents = contents;
    };

    Window_Help.prototype.clearHelpSprites = function () {
        for (var i = 0; i < 4; i++) {
            if (this._helpSprites[i]) this._helpSprites[i].bitmap.clear();
        }
    };

    Window_Help.prototype.fittingHeight = function (numLine) {
        var height = Window_Base.prototype.fittingHeight.call(this, numLine);
        return height + 24;
    };

    Window_Help.prototype.standardFontSize = function () {
        if (this._callSpriteEx) return frameTextFontSize;
        var fs = fontSize || Window_Base.prototype.standardFontSize.call(this);
        return fs;
    };

    Window_Help.prototype.standardPadding = function () {
        return 6;
    };

    var __WHelp_setItem = Window_Help.prototype.setItem;
    Window_Help.prototype.setItem = function (item) {
        this._item = item;
        __WHelp_setItem.call(this, item);
    };

    var __WHelp_setText = Window_Help.prototype.setText;
    Window_Help.prototype.setText = function (text) {
        __WHelp_setText.call(this, text);
        this.clearHelpSprites();
        if (text) this.refreshHelpSprites();
    };

    var __WHelp_clear = Window_Help.prototype.clear;
    Window_Help.prototype.clear = function () {
        __WHelp_clear.call(this);
        this._item = null;
        this.refreshHelpSprites();
    };

    Window_Help.prototype.refresh = function () {
        this.contents.clear();
        if (this._text) {
            var text = this._text.replace(/\\n/gi, '\n');
            var l = text.split('\n').length;
            var h = this.standardFontSize() + 2;
            var y = Math.floor((this.contentsHeight() / 2) - (h * (l / 2))) - 8;
            this.drawTextEx(text, this.textPadding(), y);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());