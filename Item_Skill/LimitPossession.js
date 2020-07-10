//
//  アイテム重量制 ver1.03
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
Imported['LimitPossession'] = 1.03;

/*:
 * @plugindesc ver1.03/アイテムの所持を重量で制限する仕組みを追加します。
 * @author Yana
 *
 * @param WeightText
 * @desc 重量の表示名です。
 * @default 所持重量
 *
 * @param DropText
 * @desc あふれたアイテムを入れる場所の名前です。
 * @default 戦利品
 *
 * @param MaxWeightVariableId
 * @desc 最大所持重量を決める変数のIDです。
 * @default 18
 * @type variable
 *
 * @param DefaultMaxWeight
 * @desc 最大所持重量の基本値です。
 * 変数が0の時、この数値が代入されます。
 * @default 100
 * @type number
 *
 * @param DefaultItemWeight
 * @desc 設定のないアイテムの重量です。
 * @default 1.0
 *
 * @param DefaultKeyItemWeight
 * @desc 設定のない大事なものの重量です。
 * @default 0
 *
 * @param MaxReserveSize
 * @desc リザーブできるアイテムの最大数です。
 * @default 30
 * @type number
 *
 * @param KeyAbolition
 * @desc 捨てるに使用するキーです。
 * @default control,menu
 *
 * @param KeyAbolitionAll
 * @desc すべて捨てるに使用するキーです。
 * @default shift
 *
 * @param NumberOfDecimalPlace
 * @desc 揃える小数点以下の桁数です。
 * @default 1
 * @type number
 *
 * @param AbolitionModeTone
 * @desc 捨てるモードになった時の捨てるウィンドウのウィンドウトーンです。
 * @default 206,68,24,0
 *
 * @param AbolitionAsk
 * @desc 捨てるウィンドウでの選択肢の表示です。
 * @default アイテムを捨てますか？
 *
 * @param AbolitionAllAsk
 * @desc 戦利品をすべて捨てるウィンドウでの選択肢の表示です。
 * @default 戦利品をすべて捨てますか？
 *
 * @param AbolitionAnswer
 * @desc 捨てるウィンドウでの選択肢の回答です。
 * @default はい,いいえ
 *
 * @param AbolitionModeText
 * @desc 捨てるモードに使用するテキストです。
 * @default 廃棄モード
 *
 * @param AbolitionModeTextOn
 * @desc 捨てるモードがON状態に表示されるテキストです。
 * @default ＯＮ
 *
 * @param AbolitionModeTextOff
 * @desc 捨てるモードがOFF状態に表示されるテキストです。
 * @default ＯＦＦ
 *
 * @param DropOverflowingItem
 * @desc ドロップが溢れたに表示されるインフォメーションです。
 * %1がアイテム名に変換されます。
 * @default %1は持ちきれないため戦利品に送られた！
 *
 * @param DropVanishingItem
 * @desc ドロップが戦利品から溢れた時に表示されるインフォメーションです。
 * %1がアイテム名に変換されます。
 * @default %1は持ちきれないため流れてしまった・・・
 *
 * @param InformationOverflowingItem
 * @desc 【GetInformation導入時限定】
 * アイテムが溢れたに表示されるインフォメーションです。
 * @default 「\I[_icon]_name」は\c[31]持ちきれないため戦利品に送られた！
 *
 * @param InformationVanishingItem
 * @desc 【GetInformation導入時限定】
 * アイテムが戦利品から溢れた時に表示されるインフォメーションです。
 * @default 「\I[_icon]_name」は\c[23]持ちきれないため流れてしまった・・・
 *
 * @help------------------------------------------------------
 *  プラグインコマンド
 * ------------------------------------------------------
 * ***戦利品のクリア***
 * **********************************************
 * 戦利品クリア
 * ClearReserveItems
 * **********************************************
 * リザーブされている戦利品をすべて廃棄します。
 *
 * ------------------------------------------------------
 *  使い方
 * ------------------------------------------------------
 * プラグインを導入し、プラグインパラメータを設定することで動作します。
 * 所持限界重量を超えたアイテムは戦利品に送られ、重量が一杯の状態だと
 * 装備の変更など、さまざまところで制約を受けます。
 * また、アイテムを捨てることができるようになります。
 *
 * アイテムのメモに、
 * <重量:xxx>
 * <weight:xxx>
 * のいずれかを記述することで、そのアイテムの重量をxxxに設定することができます。
 * 設定がない場合、プラグインパラメータで設定した重量が設定されます。
 *
 * アイテムのメモに、
 * <廃棄不可>
 * <WasteNot>
 * のいずれかを記述することで、そのアイテムは捨てることができなくなります。
 * プラグインパラメータにより、大事なものすべてを捨てられない設定にすることもできます。
 *
 * ※このプラグインを導入すると、設計の関係上どうしても大量のアイテム入手が重くなってしまいます。
 * 　そのため、すべてのアイテムを入手する処理を専用に持っています。
 * 　イベントコマンドのスクリプトで、
 *   $gameParty.gainAllItems()
 *   を実行してください。
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
 * ver1.03:180917
 * セカンダリカテゴリ併用時、戦利品がなくなった際にカテゴリウィンドウが正常に初期化できていなかったバグを修正。
 * ver1.021:180409
 * プラグインパラメータの仕様を1.5.0に更新。
 * ver1.02:170108
 * マウスのミドルボタンのクリックでも廃棄モードに切り替わるように変更
 * ver1.01:170104
 * ドロップアイテムが所持制限を超えた場合に表示するテキストを追加
 * ver1.00:
 * 公開
 */

(function() {

    'use strict';

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('LimitPossession');
    var weightText = parameters['WeightText'];
    var dropText = parameters['DropText'];
    var maxWeightVariableId = Number(parameters['MaxWeightVariableId']);
    var defaultMaxWeight = Number(parameters['DefaultMaxWeight']) || 100;
    var defaultItemWeight = Number(parameters['DefaultItemWeight']);
    var defaultKeyItemWeight = Number(parameters['DefaultKeyItemWeight']);
    var maxReserveSize = Number(parameters['MaxReserveSize']) || 30;
    var keyAbolition = parameters['KeyAbolition'];
    var keyAbolitionAll = parameters['KeyAbolitionAll'];
    var numberOfDecimalPlace = Number(parameters['NumberOfDecimalPlace']) || 0;
    var abolitionModeTone = parameters['AbolitionModeTone'].split(',').map(function(t){ return Number(t) });
    var abolitionAsk = parameters['AbolitionAsk'];
    var abolitionAllAsk = parameters['AbolitionAllAsk'];
    var abolitionAnswer = parameters['AbolitionAnswer'].split(',');
    var abolitionModeText = parameters['AbolitionModeText'];
    var abolitionModeTextOn = parameters['AbolitionModeTextOn'];
    var abolitionModeTextOff = parameters['AbolitionModeTextOff'];
    var dropOverflowingItem = parameters['DropOverflowingItem'];
    var dropVanishingItem = parameters['DropVanishingItem'];
    var informationOverflowingItem = parameters['InformationOverflowingItem'];
    var informationVanishingItem = parameters['InformationVanishingItem'];

    ////////////////////////////////////////////////////////////////////////////////////

    // マウスの真ん中のボタンクリックの処理を追加

    var __TInput_clear = TouchInput.clear;
    TouchInput.clear = function() {
        __TInput_clear.call(this);
        this._middleTriggered = false;
        this._events._middleTriggered = false;
    };

    var __TInput_update = TouchInput.update;
    TouchInput.update = function() {
        __TInput_update.call(this);
        this._middleTriggered = this._events._middleTriggered;
        this._events._middleTriggered = false;
    };

    TouchInput._onMiddleButtonDown = function(event) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
            this._mousePressed = true;
            this._pressedTime = 0;
            this._onMiddleTrigger(x, y);
        }
    };

    TouchInput._onMiddleTrigger = function(x, y) {
        this._events._middleTriggered = true;
        this._x = x;
        this._y = y;
        this._date = Date.now();
    };

    TouchInput.isMiddleTriggered = function() {
        return this._middleTriggered;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.itemWeight = function(item) {
        if (!item) return 0;
        if (item._weight !== undefined) return item._weight;
        item._weight = defaultItemWeight;
        if (DataManager.isItem(item)){
            switch(item.itypeId){
                case 2:
                    item._weight = defaultKeyItemWeight;
                    break;
                case 3:
                case 4:
                    item._weight = 0;
                    break;
            }
        }
        if (item.meta['重量']) item._weight = Number(item.meta['重量']);
        if (item.meta['weight']) item._weight = Number(item.meta['weight']);
        return item._weight;
    };

    DataManager.itemAbolition = function(item) {
        if (item.meta['廃棄不可']) return false;
        if (item.meta['WasteNot']) return false;
        return true;
    };

    DataManager.decodeReserveItem = function(key) {
        var item = null;
        var code = key[0];
        var id = key.slice(1);
        if (code === 'I') item = $dataItems[id];
        if (code === 'W') item = $dataWeapons[id];
        if (code === 'A') item = $dataArmors[id];
        return item;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __BManager_gainDropItems = BattleManager.gainDropItems;
    BattleManager.gainDropItems = function() {
        $gameTemp._callDropItems = true;
        __BManager_gainDropItems.call(this);
        $gameTemp._callDropItems = false;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Interpreter.prototype.gainAllItems = function(num) {
        var items = $dataItems;
        for (var i=0,max = items.length;i<max;i++) {
            if (items[i] && items[i].name !== '') {
                __GParty_gainItem.call($gameParty, items[i], num);
            }
        }
        var weapons = $dataWeapons;
        for (var i=0,max = weapons.length;i<max;i++) {
            if (weapons[i] && weapons[i].name !== '') {
                __GParty_gainItem.call($gameParty, weapons[i], num);
            }
        }
        var armors = $dataArmors;
        for (var i=0,max = armors.length;i<max;i++) {
            if (armors[i] && armors[i].name !== '') {
                __GParty_gainItem.call($gameParty, armors[i], num);
            }
        }
    };

    var __GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        if (command === '戦利品クリア' || command === 'ClearReserveItems') {
            $gameParty.clearReserveItems();
        } else {
            __GInterpreter_pluginCommand.call(this, command, args);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Party.prototype.maxWeight = function() {
        if (DataManager.isBattleTest()) return 9999999;
        if (!maxWeightVariableId) return defaultMaxWeight;
        if (!$gameVariables.value(maxWeightVariableId)) {
            $gameVariables._data[maxWeightVariableId] = defaultMaxWeight;
        }
        var value = $gameVariables.value(maxWeightVariableId);
        if ($gameTemp._tempMaxValue) value += $gameTemp._tempMaxValue;
        return value;
    };

    Game_Party.prototype.allItemsWeight = function() {
        var allItems = this.allItems();
        var r = 0;
        for (var i=0,max=allItems.length;i<max;i++) {
            r += DataManager.itemWeight(allItems[i]) * this.numItems(allItems[i]);
        }
        return r;
    };

    var __GParty_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        if (amount > 0) {
            var w = DataManager.itemWeight(item);
            var tw = w * amount;
            var allWeight = this.allItemsWeight();
            if ((allWeight + tw) > this.maxWeight()) {
                var lw = this.maxWeight() - allWeight;
                var la = Math.floor(lw / w);
                __GParty_gainItem.call(this, item, la, includeEquip);
                for (var i=0;i<amount-la;i++) this.pushReserveItems(item);
            } else {
                __GParty_gainItem.call(this, item, amount, includeEquip);
            }
        } else {
            __GParty_gainItem.call(this, item, amount, includeEquip);
        }
    };

    Game_Party.prototype.clearReserveItems = function() {
        this._reserveItems = [];
    };

    Game_Party.prototype.pushReserveItems = function(item) {
        if (!this._reserveItems) this._reserveItems = [];
        var type = '';
        var text = '';
        if (DataManager.isItem(item)) type = 'I';
        if (DataManager.isWeapon(item)) type = 'W';
        if (DataManager.isArmor(item)) type = 'A';
        this._reserveItems.unshift(type+item.id);
        if ($gameTemp._callDropItems && dropOverflowingItem && item) {
            $gameMessage.newPage();
            $gameMessage.add(dropOverflowingItem.format(item.name));
        }
        if (Imported['GetInformation'] && CommonPopupManager.popEnable() && item) {
            text = informationOverflowingItem;
            if (text) CommonPopupManager.showInfo(item, text, null);
        }
        if (this._reserveItems.length > maxReserveSize){
            var vItem = this._reserveItems.pop();
            if ($gameTemp._callDropItems && dropVanishingItem && vItem) {
                $gameMessage.add(dropVanishingItem.format(DataManager.decodeReserveItem(vItem).name));
            }
            if (Imported['GetInformation'] && CommonPopupManager.popEnable() && vItem) {
                text = informationVanishingItem;
                if (text) CommonPopupManager.showInfo(DataManager.decodeReserveItem(vItem), text, null);
            }
        }
    };

    Game_Party.prototype.deleteReserveItem = function(item){
        if (!this._reserveItems) return;
        var type = '';
        if (DataManager.isItem(item))   type = 'I';
        if (DataManager.isWeapon(item)) type = 'W';
        if (DataManager.isArmor(item))  type = 'A';
        this._reserveItems.splice(this._reserveItems.indexOf(type+item.id),1);
    };

    Game_Party.prototype.reserveItems = function() {
        if (!this._reserveItems) this._reserveItems = [];
        return this._reserveItems;
    };

    Game_Party.prototype.leftWeight = function() {
        return this.maxWeight() - this.allItemsWeight();
    };

    Game_Party.prototype.reserveItemsWeight = function() {
        if (this.reserveItems().length <= 0) return 0;
        var value = 0;
        this.reserveItems().forEach(function(key) {
            var item = DataManager.decodeReserveItem(key);
            value += DataManager.itemWeight(item);
        });
        return value;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WICategory_maxCols = Window_ItemCategory.prototype.maxCols;
    Window_ItemCategory.prototype.maxCols = function() {
        if ($gameParty.reserveItems().length> 0) return 5;
        return __WICategory_maxCols.call(this);
    };

    var __WICategory_makeCommandList = Window_ItemCategory.prototype.makeCommandList;
    Window_ItemCategory.prototype.makeCommandList = function() {
        if ($gameParty.reserveItems().length > 0) this.addCommand(dropText,    'drop');
        __WICategory_makeCommandList.call(this);
    };

    Window_ItemCategory.prototype.setOffsetWidth = function(w) {
        this.width = this.windowWidth() - w;
        this.refresh();
        this.select(this.index());
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WIList_initialize = Window_ItemList.prototype.initialize;
    Window_ItemList.prototype.initialize = function(x, y, width, height) {
        __WIList_initialize.call(this, x, y, width, height);
        this._abolitionOk = false;
        this._weightEnabled = true;
        this._abolitionMode = false;
        var name = JsonEx._getConstructorName(this);
        if (name === 'Window_SkillCP') this._weightEnabled = false;
        this.createWeightSprite();
    };

    Window_ItemList.prototype.setAButtonWindow = function(window) {
        this._aButtonWindow = window;
    };

    Window_ItemList.prototype.createWeightSprite = function() {
        if (!this._weightEnabled) return;
        var sprite = new Sprite();
        sprite.bitmap = new Bitmap(140,22);
        this._weightSprite = sprite;
        this.addChild(this._weightSprite);
        this.refreshSprite();
    };

    Window_ItemList.prototype.refreshSprite = function() {
        if (!this._weightSprite) return;
        this._weightSprite.x = this.width - 152;
        this._weightSprite.y = this.height - 32;
        this._weightSprite.bitmap.clear();
        var value1 = $gameParty.allItemsWeight();
        var value2 = $gameParty.maxWeight();
        value1 += $gameParty.reserveItemsWeight();
        var s = numberOfDecimalPlace;
        this._weightSprite.bitmap.fontSize = 20;

        if (value1 > value2) this._weightSprite.bitmap.textColor = this.textColor(2);
        var rate = Math.min(value1/value2,1.0);
        var w = Math.floor(138 * rate);
        var color1 = rate >= 1.0 ? 'rgb(255,128,128)' : 'rgb(128,255,128)';
        var color2 = rate >= 1.0 ? 'rgb(255,0,0)' : 'rgb(255,255,255)';
        this._weightSprite.bitmap.fillRect(0,12,140,10,'rgb(0,0,0)');
        this._weightSprite.bitmap.gradientFillRect(1+(138-w),13,w,8,color1,color2);
        this._weightSprite.bitmap.drawText(value1.toFixed(s),0,0,60,22,'right');
        this._weightSprite.bitmap.textColor = this.textColor(0);
        this._weightSprite.bitmap.drawText('/',60,0,20,20,'center');
        this._weightSprite.bitmap.drawText(value2.toFixed(s),80,0,50,22,'right');
    };

    var __WIList_needsNumber = Window_ItemList.prototype.needsNumber;
    Window_ItemList.prototype.needsNumber = function() {
        return __WIList_needsNumber.call(this) && this._category !== 'drop';
    };

    var __WIList_makeItemList = Window_ItemList.prototype.makeItemList;
    Window_ItemList.prototype.makeItemList = function() {
        if (this._category === 'drop') {
            this._data = [];
            $gameParty.reserveItems().forEach(function(key){
                var item = DataManager.decodeReserveItem(key);
                this._data.push(item);
            }.bind(this));
        } else {
            __WIList_makeItemList.call(this);
        }
    };

    var __WIList_processHandling = Window_ItemList.prototype.processHandling;
    Window_ItemList.prototype.processHandling = function() {
        __WIList_processHandling.call(this);
        if (this.isOpenAndActive()) {
            if (this.isAbolitionTriggered() && this.isOkAbolition()) this.processAbolition();
            if (this.isAbolitionAllTriggered() && this.isOkAbolitionAll()) this.processAbolitionAll();
        }
    };

    Window_ItemList.prototype.isAbolitionTriggered = function() {
        var triggers = keyAbolition.split(',');
        for (var i=0,max=triggers.length;i<max;i++) {
            if (Input.isTriggered(triggers[i])) return true;
        }
        return false;
    };

    Window_ItemList.prototype.isAbolitionAllTriggered = function() {
        var triggers = keyAbolitionAll.split(',');
        for (var i=0,max=triggers.length;i<max;i++) {
            if (Input.isTriggered(triggers[i])) return true;
        }
        return false;
    };

    Window_ItemList.prototype.processAbolition = function() {
        SoundManager.playEquip();
        this.callAbolitionHandler();
    };

    Window_ItemList.prototype.processAbolitionAll = function() {
        SoundManager.playOk();
        this.callAbolitionAllHandler();
    };

    var __WIList_isEnabled = Window_ItemList.prototype.isEnabled;
    Window_ItemList.prototype.isEnabled = function(item) {
        if (this._abolitionMode) {
            return this.isAbolitionItem(item);
        } else {
            return __WIList_isEnabled.call(this, item);
        }
    };

    Window_ItemList.prototype.isOkAbolition = function() {
        return this._abolitionOk;
    };

    Window_ItemList.prototype.isAbolitionItem = function(item) {
        var result = (DataManager.isItem(item) && item.itypeId !== 2) ||
            DataManager.isWeapon(item) || DataManager.isArmor(item);
        return item && DataManager.itemAbolition(item) && result && this.isEnabledScene();
    };

    Window_ItemList.prototype.isOkAbolitionAll = function() {
        return this._category === 'drop';
    };

    Window_ItemList.prototype.isEnabledScene = function() {
        return !!this._handlers['abolition'];
    };

    Window_ItemList.prototype.callAbolitionHandler = function() {
        this.callHandler('abolition');
    };

    Window_ItemList.prototype.callAbolitionAllHandler = function() {
        this.callHandler('abolitionAll');
    };

    Window_ItemList.prototype.setAbolitionMode = function(value) {
        this._abolitionMode = value;
        if (Imported['WindowControlGuide'] && this._abolitionMode) {
            this.setGuideText()
        }
        this.refresh();
    };

    var __WIList_refresh = Window_ItemList.prototype.refresh;
    Window_ItemList.prototype.refresh = function() {
        __WIList_refresh.call(this);
        this.refreshSprite();
    };

    Window_ItemList.prototype.processTouch = function() {
        if (this._aButtonWindow && this.isOpenAndActive() &&
            (TouchInput.isTriggered() && this.isTouchedInsideAbolitionFrame() || TouchInput.isMiddleTriggered())) {
                this.processAbolition();
        } else {
            Window_Selectable.prototype.processTouch.call(this);
            if (Imported['ItemSort'] && this.isOpenAndActive()) {
                if (TouchInput.isTriggered() && !this.isTouchedInsideFrame()) this.processSort();
            }
        }
    };

    Window_ItemList.prototype.isTouchedInsideAbolitionFrame = function() {
        var x = TouchInput.x;
        var y = TouchInput.y;
        var aw = this._aButtonWindow;
        return x >= aw.x && y >= aw.y && x < (aw.x + aw.width) && y < (aw.y + aw.height);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_AbolitionCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_AbolitionCommand.prototype = Object.create(Window_HorzCommand.prototype);
    Window_AbolitionCommand.prototype.constructor = Window_AbolitionCommand;

    Window_AbolitionCommand.prototype.initialize = function() {
        Window_HorzCommand.prototype.initialize.call(this, 0, 0);
        this.width = 320;
        this.height = this.lineHeight() * 2 + this.standardPadding() * 2;
        this.x = Math.floor((Graphics.boxWidth - this.width) / 2);
        this.y = Math.floor((Graphics.boxHeight - this.height) / 2);
        this.deactivate();
        this.openness = 0;
        this.refresh();
    };

    Window_AbolitionCommand.prototype.maxCols = function() {
        return 2;
    };

    Window_AbolitionCommand.prototype.makeCommandList = function() {
        this.addCommand(abolitionAnswer[0], 'ok', true);
        this.addCommand(abolitionAnswer[1], 'cancel', true);
    };

    Window_AbolitionCommand.prototype.itemRect = function(index) {
        var rect = Window_HorzCommand.prototype.itemRect.call(this, index);
        rect.y += this.lineHeight();
        return rect;
    };

    Window_AbolitionCommand.prototype.drawAllItems = function() {
        Window_HorzCommand.prototype.drawAllItems.call(this);
        this.drawText(abolitionAsk,0,0,this.contentsWidth(),this.contentsHeight(),'center');
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_AbolitionAllCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_AbolitionAllCommand.prototype = Object.create(Window_AbolitionCommand.prototype);
    Window_AbolitionAllCommand.prototype.constructor = Window_AbolitionAllCommand;

    Window_AbolitionAllCommand.prototype.drawAllItems = function() {
        Window_HorzCommand.prototype.drawAllItems.call(this);
        this.drawText(abolitionAllAsk,0,0,this.contentsWidth(),this.contentsHeight(),'center');
    };

    ////////////////////////////////////////////////////////////////////////////////////


    function Window_AbolitionNumber() {
        this.initialize.apply(this, arguments);
    }

    Window_AbolitionNumber.prototype = Object.create(Window_ShopNumber.prototype);
    Window_AbolitionNumber.prototype.constructor = Window_AbolitionNumber;

    Window_AbolitionNumber.prototype.initialize = function() {
        Window_ShopNumber.prototype.initialize.call(this, 0, 0, 128);
        this._number = 1;
        this._maxDigits = 2;
        this.openness = 0;
        this.createButtons();
        this.deactivate();
        this.opacity = 0;
    };

    Window_AbolitionNumber.prototype.start = function(item, rect) {
        this._item = item;
        this._max = $gameParty.numItems(item);
        this._number = 1;
        this._maxDigits = this._max < 10 ? 1 : 2;
        this._index = this._maxDigits > 1 ? 1 : 0;
        this.updateButtonsVisiblity();
        this.updatePlacement();
        this.refresh();
        this.x = rect.x + rect.width - this.contentsWidth() - 6;
        this.y = rect.y;
        this.placeButtons();
        this.open();
        this.activate();
    };

    Window_AbolitionNumber.prototype.updatePlacement = function() {
        this.width = (this.textWidth('0') * this._maxDigits) + this.standardPadding() * 2;
        this.height = this.fittingHeight(1);
        this.createContents();
    };

    Window_AbolitionNumber.prototype.updateTone = function() {
        Window_Base.prototype.updateTone.call(this);
    };

    Window_AbolitionNumber.prototype.isCancelEnabled = function() {
        return true;
    };

    Window_AbolitionNumber.prototype.processOk = function() {
        SoundManager.playOk();
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
    };

    Window_AbolitionNumber.prototype.processCancel = function() {
        SoundManager.playCancel();
        this.hideButtons();
        this.callCancelHandler();
    };

    Window_AbolitionNumber.prototype.refresh = function() {
        this.contents.clear();
        this.contents.fillAll('rgba(0,0,0,0.5)');
        this.drawNumber();
    };

    Window_AbolitionNumber.prototype.drawNumber = function() {
        var x = 0;
        var y = 0;
        var width = this.textWidth(this._maxDigits === 1 ? '0' : '00');
        this.resetTextColor();
        this.drawText(this._number, x, y, width, 'right');
    };

    Window_AbolitionNumber.prototype.placeButtons = function() {
        var numButtons = this._buttons.length;
        var spacing = 16;
        var rect = this.itemRect(this.index());
        var totalWidth = -spacing;
        for (var i = 0; i < numButtons; i++) {
            totalWidth += this._buttons[i].width + spacing;
        }
        var x = rect.x + 16;
        for (var j = 0; j < numButtons; j++) {
            var button = this._buttons[j];
            button.x = x + spacing - totalWidth;
            button.y = rect.height + this.lineHeight() / 2;
            if (this.y > (Graphics.boxHeight / 2)) button.y = 0 - button.y + (this.lineHeight() / 2);
            x += button.width + spacing;
        }
    };

    Window_AbolitionNumber.prototype.updateCursor = function() {
        this.setCursorRect(0,0,this.contentsWidth(),this.contentsHeight());
    };

    Window_AbolitionNumber.prototype.deactivate = function() {
        Window_ShopNumber.prototype.deactivate.call(this);
        if (this._buttons) this.hideButtons();
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_AbolitionButton() {
        this.initialize.apply(this, arguments);
    }

    Window_AbolitionButton.prototype = Object.create(Window_Base.prototype);
    Window_AbolitionButton.prototype.constructor = Window_AbolitionButton;

    Window_AbolitionButton.prototype.initialize = function(x, y) {
        Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
        this.refresh();
    };

    Window_AbolitionButton.prototype.windowWidth = function() {
        return 128;
    };

    Window_AbolitionButton.prototype.windowHeight = function() {
        return 72;
    };

    Window_AbolitionButton.prototype.standardFontSize = function() {
        return 22;
    };

    Window_AbolitionButton.prototype.standardPadding = function() {
        return 12;
    };

    Window_AbolitionButton.prototype.refresh = function() {
        this.contents.clear();
        this.contents.drawText(abolitionModeText,0,0,this.contentsWidth(),this.standardFontSize());
        var text = abolitionModeTextOff;
        if (this._abolitionMode) text = abolitionModeTextOn;
        this.contents.drawText(text,0,this.standardFontSize()+4,this.contentsWidth(),this.standardFontSize(), 'center');
    };

    Window_AbolitionButton.prototype.setAbolition = function(value) {
        this._abolitionMode = value;
        this.refresh();
    };

    Window_AbolitionButton.prototype.updateTone = function() {
        var tone = $gameSystem.windowTone();
        if (this._abolitionMode) tone = abolitionModeTone;
        this.setTone(tone[0], tone[1], tone[2]);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SItem_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function() {
        this._left = null;
        this.updateReserveItems();
        __SItem_create.call(this);
        this._itemWindow._abolitionOk = true;
        this.createANumberWindow();
        this.createACommandWindow();
        this.createAACommandWindow();
        this._categoryWindow.setOffsetWidth(128);
        this.createAButtonWindow();
        this._itemWindow.setAButtonWindow(this._aButtonWindow);
    };

    var __SItem_createItemWindow = Scene_Item.prototype.createItemWindow;
    Scene_Item.prototype.createItemWindow = function() {
        __SItem_createItemWindow.call(this);
        this._itemWindow.setHandler('abolition', this.commandAbolition.bind(this));
        this._itemWindow.setHandler('abolitionAll', this.commandAbolitionAll.bind(this));
    };

    Scene_Item.prototype.createACommandWindow = function() {
        this._aCommandWindow = new Window_AbolitionCommand();
        this._aCommandWindow.setHandler('ok', this.okAbolition.bind(this));
        this._aCommandWindow.setHandler('cancel', this.cancelAbolition.bind(this));
        this.addChild(this._aCommandWindow);
    };

    Scene_Item.prototype.createAACommandWindow = function() {
        this._aaCommandWindow = new Window_AbolitionAllCommand();
        this._aaCommandWindow.setHandler('ok', this.okAbolitionAll.bind(this));
        this._aaCommandWindow.setHandler('cancel', this.cancelAbolitionAll.bind(this));
        this.addChild(this._aaCommandWindow);
    };

    Scene_Item.prototype.createANumberWindow = function() {
        this._aNumberWindow = new Window_AbolitionNumber();
        this._aNumberWindow.setHandler('ok', this.okNumber.bind(this));
        this._aNumberWindow.setHandler('cancel', this.cancelNumber.bind(this));
        this.addChild(this._aNumberWindow);
    };

    Scene_Item.prototype.createAButtonWindow = function() {
        var x = this._categoryWindow.x + this._categoryWindow.width;
        var y = this._categoryWindow.y;
        this._aButtonWindow = new Window_AbolitionButton(x, y);
        this._windowLayer.addChildAt(this._aButtonWindow, 0);
    };

    var __SItem_onItemOk = Scene_Item.prototype.onItemOk;
    Scene_Item.prototype.onItemOk = function() {
        if (this._abolitionMode) {
            this.activateAbolition();
        } else {
            __SItem_onItemOk.call(this);
        }
    };

    var __SItem_onItemCancel = Scene_Item.prototype.onItemCancel;
    Scene_Item.prototype.onItemCancel = function() {
        if (this._abolitionMode) {
            this.commandAbolition();
            this._itemWindow.activate();
        } else {
            __SItem_onItemCancel.call(this);
        }
    };

    Scene_Item.prototype.commandAbolition = function(value) {
        if (value === undefined) value = !this._abolitionMode;
        this._abolitionMode = value;
        this._itemWindow.setAbolitionMode(this._abolitionMode);
        this._aButtonWindow.setAbolition(this._abolitionMode);
    };

    Scene_Item.prototype.activateAbolition = function() {
        if (this._itemWindow._category === 'drop' || $gameParty.numItems(this._itemWindow.item()) === 1) {
            this._aNumberWindow._number = 1;
            this._itemWindow.deactivate();
            this.okNumber();
        } else {
            var rect = this._itemWindow.itemRect(this._itemWindow.index());
            rect.y += this._itemWindow.y;
            this._itemWindow.deactivate();
            this._aNumberWindow.start(this._itemWindow.item(), rect);
            this._aNumberWindow.open();
            this._aNumberWindow.activate();
        }
    };

    Scene_Item.prototype.commandAbolitionAll = function() {
        this._itemWindow.deactivate();
        this._aaCommandWindow.open();
        this._aaCommandWindow.activate();
    };

    Scene_Item.prototype.okNumber = function() {
        this._aCommandWindow.open();
        this._aCommandWindow.activate();
    };

    Scene_Item.prototype.cancelNumber = function() {
        this._aNumberWindow.close();
        this._itemWindow.activate();
    };

    Scene_Item.prototype.okAbolition = function() {
        if (this._itemWindow._category !== 'drop') {
            $gameParty.loseItem(this._itemWindow.item(), this._aNumberWindow._number);
        } else {
            $gameParty.deleteReserveItem(this._itemWindow.item());
        }
        this._aCommandWindow.close();
        this._aNumberWindow.close();
        this._itemWindow.activate();
        this._itemWindow.refresh();
        this._left = null;
    };

    Scene_Item.prototype.cancelAbolition = function() {
        this._aCommandWindow.close();
        this._aNumberWindow.close();
        this._itemWindow.activate();
    };

    Scene_Item.prototype.okAbolitionAll = function() {
        $gameParty.clearReserveItems();
        this._aaCommandWindow.close();
        this._left = null;
    };

    Scene_Item.prototype.cancelAbolitionAll = function() {
        this._aaCommandWindow.close();
        this._itemWindow.activate();
    };

    Scene_Item.prototype.update = function() {
        Scene_ItemBase.prototype.update.call(this);
        this.updateReserveItems();
        this.updateCategory();
    };

    Scene_Item.prototype.updateReserveItems = function() {
        var items = $gameParty.reserveItems();
        if (items.length <= 0) return;
        if (this._left === null) this._left = $gameParty.leftWeight();
        var ary = [];
        for (var i=0,max=items.length;i<max;i++) {
            var item = DataManager.decodeReserveItem(items[i]);
            var weight = DataManager.itemWeight(item);
            if (this._left >= weight) {
                $gameParty.gainItem(item, 1);
                ary.push(item);
                this._left += weight;
            }
        }
        ary.forEach(function(a){ $gameParty.deleteReserveItem(a) });
        //if (ary.length > 0 && this._itemWindow){ this._itemWindow.refresh(); console.log("a"); }
    };

    Scene_Item.prototype.updateCategory = function() {
        var l = $gameParty.reserveItems().length;
        if (l === 0 && this._rLength > 0) {
            if (Imported['SecondaryCategories']) this._categoryWindow.initCategories();
            this._categoryWindow.refresh();
            if (this._actorWindow.isOpenAndActive()) {
                this._actorWindow.hide();
                this._actorWindow.deactivate();
                this._actorWindow.deselect();
            }
            this.commandAbolition(false);
            this._itemWindow.deactivate();
            this._itemWindow.deselect();
            this._categoryWindow.activate();
            this._categoryWindow.select(0);
        }
        this._rLength = l;
    };

    var __SItem_useItem = Scene_Item.prototype.useItem;
    Scene_Item.prototype.useItem = function() {
        var isSceneDrop = this._itemWindow && this._itemWindow._category === 'drop';
        if (isSceneDrop) {
            $gameTemp._tempMaxValue = 999999;
            $gameParty.gainItem(this.item(),1);
            $gameParty.deleteReserveItem(this.item());
        }
        __SItem_useItem.call(this);
        if (isSceneDrop) {
            $gameTemp._tempMaxValue = 0;
            this.hideSubWindow(this._actorWindow);
        }
        this._left = null;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WECommand_makeCommandList = Window_EquipCommand.prototype.makeCommandList;
    Window_EquipCommand.prototype.makeCommandList = function() {
        __WECommand_makeCommandList.call(this);
        if (this._actor) {
            this._list[1].enabled = this.isOptimizeEnabled();
            this._list[2].enabled = this.isClearEnabled();
        }
    };

    Window_EquipCommand.prototype.isOptimizeEnabled = function() {
        return this.isClearEnabled();
    };

    Window_EquipCommand.prototype.isClearEnabled = function() {
        var aWeight = this._actor.equips().reduce(function(r, item){
            return r += DataManager.itemWeight(item);
        },0);
        return ($gameParty.allItemsWeight() + aWeight) <= $gameParty.maxWeight();
    };

    Window_EquipCommand.prototype.setActor = function(actor) {
        this._actor = actor;
        this.refresh();
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WEItem_isEnabled = Window_EquipItem.prototype.isEnabled;
    Window_EquipItem.prototype.isEnabled = function(item) {
        var left = $gameParty.leftWeight();
        var nItem = SceneManager._scene._slotWindow.item();
        var w1 = DataManager.itemWeight(nItem);
        var w2 = DataManager.itemWeight(this.item());
        return __WEItem_isEnabled.call(this, item) && (left + (w2 - w1)) >= 0;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SEquip_refreshActor = Scene_Equip.prototype.refreshActor;
    Scene_Equip.prototype.refreshActor = function() {
        __SEquip_refreshActor.call(this);
        this._commandWindow.setActor(this.actor());
    };

    var __SEquip_commandOptimize = Scene_Equip.prototype.commandOptimize;
    Scene_Equip.prototype.commandOptimize = function() {
        __SEquip_commandOptimize.call(this);
        this._itemWindow.refresh();
    };

    var __SEquip_commandClear = Scene_Equip.prototype.commandClear;
    Scene_Equip.prototype.commandClear = function() {
        __SEquip_commandClear.call(this);
        this._itemWindow.refresh();
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
    Window_ShopBuy.prototype.isEnabled = function(item) {
        return __WShopBuy_isEnabled.call(this, item) &&
            $gameParty.maxWeight() >= ($gameParty.allItemsWeight() + DataManager.itemWeight(item));
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WSNumber_refresh = Window_ShopNumber.prototype.refresh;
    Window_ShopNumber.prototype.refresh = function() {
        __WSNumber_refresh.call(this);
        SceneManager._scene._statusWindow.refresh();
    };

    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義
    Window_ShopStatus.prototype.refresh = function() {
        this.contents.clear();
        if (this._item) {
            var x = this.textPadding();
            this.drawPossession(x, 0);
            this.drawWeight(x, this.lineHeight());
            if (this.isEquipItem()) this.drawEquipInfo(x, this.lineHeight() * 2);
        }
    };

    Window_ShopStatus.prototype.drawWeight = function(x, y) {
        var width = this.contents.width - this.textPadding() - x;
        this.changeTextColor(this.systemColor());
        this.drawText(weightText, x, y, width);
        this.resetTextColor();
        if (this._allItemsWeight === null || this._allItemsWeight === undefined){
            this._allItemsWeight = $gameParty.allItemsWeight();
        }
        var value1 = this._allItemsWeight;
        var value2 = $gameParty.maxWeight();
        value1 += $gameParty.reserveItemsWeight();
        var w = DataManager.itemWeight(this._item);
        var nw = SceneManager._scene._numberWindow;
        if (nw && nw.active) w *= nw._number;
        if ($gameTemp._callShopWindow === 'sell') w *= -1;
        value1 += w;
        if (value1 >= value2) this.changeTextColor(this.textColor(2));
        this.drawText(value1.toFixed(numberOfDecimalPlace), x, y, width-100, 'right');
        this.resetTextColor();
        this.drawText('/', x+80, y, width-160, 'right');
        this.drawText(value2.toFixed(numberOfDecimalPlace), x+100, y, width-100, 'right');
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SShop_initialize = Scene_Shop.prototype.initialize;
    Scene_Shop.prototype.initialize = function() {
        this._left = null;
        __SShop_initialize.call(this);
    };

    var __SShop_maxBuy = Scene_Shop.prototype.maxBuy;
    Scene_Shop.prototype.maxBuy = function() {
        var max = __SShop_maxBuy.call(this);
        var weight = DataManager.itemWeight(this._item);
        if (weight > 0) {
            var n = ($gameParty.maxWeight() - $gameParty.allItemsWeight()) / weight;
            max = Math.min(n, max);
        }
        return max;
    };

    var __SShop_maxSell = Scene_Shop.prototype.maxSell;
    Scene_Shop.prototype.maxSell = function() {
        if (this._sellWindow._category === 'drop') {
            return 1;
        } else {
            return __SShop_maxSell.call(this);
        }
    };

    var __SShop_doSell = Scene_Shop.prototype.doSell;
    Scene_Shop.prototype.doSell = function(number) {
        if (this._sellWindow._category === 'drop') {
            $gameParty.gainGold(number * this.sellingPrice());
            $gameParty.deleteReserveItem(this._item);
        } else {
            __SShop_doSell.call(this, number);
        }
        this._left = null;
        this._statusWindow._allItemsWeight = null;
        $gameTemp._callShopWindow = 'buy';
    };

    var __SShop_doBuy = Scene_Shop.prototype.doBuy;
    Scene_Shop.prototype.doBuy = function(number) {
        __SShop_doBuy.call(this, number);
        this._left = null;
        this._statusWindow._allItemsWeight = null;
    };

    var __SShop_onSellOk = Scene_Shop.prototype.onSellOk;
    Scene_Shop.prototype.onSellOk = function() {
        $gameTemp._callShopWindow = 'sell';
        __SShop_onSellOk.call(this);
    };

    Scene_Shop.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        this.updateReserveItems();
        this.updateCategory();
    };

    Scene_Shop.prototype.updateReserveItems = function() {
        var items = $gameParty.reserveItems();
        if (items.length <= 0) return;
        if (this._left === null) this._left = $gameParty.leftWeight();
        var ary = [];
        for (var i=0,max=items.length;i<max;i++) {
            var item = DataManager.decodeReserveItem(items[i]);
            var weight = DataManager.itemWeight(item);
            if (this._left >= weight) {
                $gameParty.gainItem(item, 1);
                ary.push(item);
                this._left -= weight;
            }
        }
        ary.forEach(function(a){ $gameParty.deleteReserveItem(a) });
        if (ary.length > 0){
            this._sellWindow.refresh();
            this._statusWindow._allItemsWeight = null;
        }
    };

    Scene_Shop.prototype.updateCategory = function() {
        var l = $gameParty.reserveItems().length;
        if (l === 0 && this._rLength > 0) {
            if (Imported['SecondaryCategories']) this._categoryWindow.initCategories();
            this._categoryWindow.refresh();
            this._sellWindow.deactivate();
            this._sellWindow.deselect();
            this._categoryWindow.activate();
            this._categoryWindow.select(0);
        }
        this._rLength = l;
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());