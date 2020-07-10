//
//  アイテムストレージ ver1.001
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
Imported['ItemStorage'] = 1.001;

/*:
 * @plugindesc ver1.001/アイテムをストレージする機能を追加します。
 * @author Yana
 *
 * @param IsIntoStorageKeyItem
 * @desc 大事なものをストレージに入れられるかの設定です。
 * trueで入れられるようになります。
 * @default false
 * @type boolean
 *
 * @param PartyStorageName
 * @desc パーティのストレージの名前です。
 * @default 所持品
 *
 * @param DefaultCapacity
 * @desc ストレージの容量のデフォルト値です。
 * @default 100
 * @type number
 *
 * @param DefaultName
 * @desc ストレージの名前のデフォルト値です。
 * @default ストレージ
 *
 * @param SwitchKey
 * @desc ストレージの切替に使用するキーです。
 * @default control
 * @type select
 * @option menu
 * @option control
 * @option pageup
 * @option pagedown
 * @option shift
 * @option tab
 *
 * @param AllText
 * @desc カテゴリに追加されるすべてのアイテムを表示する項目の名前です。
 * @default すべて
 *
 * @param ControlGuide
 * @desc 操作説明ウィンドウに表示するテキストです。
 * @default Shift:ソート / Ctrl:ストレージの切り替え / Tab:ミニウィンドウの表示切り替え
 *
 * @param ZeroMoneyText
 * @desc ショップの所持金が不足した際に表示するテキストです。
 * @default ショップの所持金が不足しているため売値が減額されます！
 *
 * @param UseMiniInfo
 * @desc 【MiniInformationWindow導入時限定】
 * ミニウィンドウを使用するかの設定です。
 * @default true
 * @type boolean
 *
 * @help------------------------------------------------------
 *  プラグインコマンド
 * ------------------------------------------------------
 * ***ストレージを作る***
 * **********************************************
 * ストレージ作成 xxx
 * CreateStorage xxx
 * **********************************************
 * xxxというキーでストレージを作成します。
 * キーは作成したストレージにアクセスをする際に必要になります。
 * 追加設定として、名前、容量、売却レート、販売レート、ピクチャ、所持金、投入カテゴリの設定可能です。
 * 例:ストレージのキーをs1、名前を箱、容量を200、売却レートを10%、販売レートを4倍、ピクチャをtest1に設定して、
 *    投入できるアイテムのカテゴリを回復薬,素材に制限します。
 * ストレージ作成 s1 名前:箱 容量:200 売却レート:0.1 販売レート:4.0 ピクチャ:test1 投入カテゴリ:回復薬,素材
 *
 *
 * ***ストレージを呼び出す***
 * **********************************************
 * ストレージ呼び出し xxx
 * CallStorage xxx
 * **********************************************
 * xxxというキーに持つストレージを呼び出します。
 *
 *
 * ***ストレージショップを呼び出す***
 * **********************************************
 * ストレージショップ呼び出し xxx
 * CallStorageShop xxx
 * **********************************************
 * xxxというキーに持つストレージをショップとして呼び出します。
 * ストレージショップとはストレージの内容物を商品として持ち、売却したアイテムがストレージに格納されるショップです。
 * この際、設定された販売レート、売却レートを使用してアイテムの購入価格、売却価格が決定されます。
 *
 *
 * ***ストレージパラメータの設定***
 * **********************************************
 * ストレージパラメータ設定 xxx aaa:bbb ccc:ddd eee:fff…
 * SetStorageParameter xxx aaa:bbb ccc:ddd eee:fff…
 * **********************************************
 * xxxのストレージのパラメータを設定します。
 * 設定できるパラメータはストレージ作成と同じです。
 * aaa,ccc,eeeには名前、容量、売却レート、販売レート、ピクチャ、所持金、投入カテゴリのいずれか、
 * bbb,ddd,fffにはその設定内容を記述します。
 * 売却レート、販売レート、所持金はevalを通るため、計算式が使用可能です。
 * その際、v[x]でx番の変数、s[x]でx番のスイッチにアクセスすることができます。
 *
 *
 * ***ストレージへの投入、取り出し、廃棄***
 * ストレージへの投入
 * **********************************************
 * ストレージ投入 xxx A:a,B:b,C:c…
 * IntoStorage xxx A:a,B:b,C:c…
 * **********************************************
 * xxxのストレージにAaのアイテムをn個,Bbのアイテムをm個,Ccのアイテムをi個投入します。
 * ABCはI:アイテム、W:武器、A:防具のいずれかを指定します。a,b,cはそのIDを指定します。
 * n,m,iはそれぞれ投入する個数です。
 *
 * ストレージからの取り出し
 * **********************************************
 * ストレージ取り出し xxx A:a,B:b,C:c…
 * TakeStorage xxx A:a,B:b,C:c…
 * **********************************************
 * xxxのストレージからAaのアイテムをn個,Bbのアイテムをm個,Ccのアイテムをi個取り出します。
 * それぞれの指定は投入と同じです。
 *
 * ストレージからの削除
 * **********************************************
 * ストレージアイテム削除 xxx A:a,B:b,C:c…
 * DeleteStorageItem xxx A:a,B:b,C:c…
 * **********************************************
 * xxxのストレージのAaのアイテムをn個,Bbのアイテムをm個,Ccのアイテムをi個を削除します。
 * それぞれの指定は投入と同じです。
 *
 *
 * ***ストレージの削除***
 * **********************************************
 * ストレージ削除 xxx
 * DeleteStorage xxx
 * **********************************************
 * xxxのストレージを削除します。
 *
 *
 * ***ストレージのクリア***
 * **********************************************
 * ストレージクリア xxx
 * ClearStorage xxx
 * **********************************************
 * xxxのストレージの中身をクリアします。
 *
 * ***ストレージ投入モードの切替***
 * **********************************************
 * ストレージ投入モード xxx yyy
 * IntoStorageMode xxx yyy
 * **********************************************
 * xxxのストレージの投入モードをyyyに設定します。
 * yyyにはONまたオン、OFFまたはオフを指定してください。
 * 投入モードとはストレージにアイテムを入れたり出したりするための仕組みです。
 * このモードがオンの時は、イベントコマンドのアイテムや武器防具の増減の処理が、
 * そのままストレージへの投入、削除に変わります。
 * オフにするまでこの効果は続くため、使用した後は必ずオフにしてください。
 * 同時に複数のストレージを投入モードへすることはできません。
 *
 * ------------------------------------------------------
 *  使い方
 * ------------------------------------------------------
 * このプラグインはストレージを作り、作ったストレージを呼び出すのが基本的な機能となります。
 * ストレージとはアイテムを保存するための仕組みです。
 * ストレージはショップとして呼び出すこともでき、その場合ストレージの中身が商品として並び、
 * 売却した場合はそのアイテムがストレージに入れられます。
 *
 * また、アイテムのメモに
 * <ストレージ投入不可>
 * <NotIntoStorage>
 * のいずれかを記述することで、そのアイテムをストレージに入れることができなくなります。
 *
 *  ------------------------------------------------------
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
 * ver1.001:180409
 * プラグインパラメータの仕様を1.5.0に更新。
 * ver1.00:
 * 公開
 */

(function() {

    'use strict';

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('ItemStorage');
    var isIntoStorageKeyItem = parameters['IsIntoStorageKeyItem'] === 'true';
    var partyStorageName = parameters['PartyStorageName'];
    var defaultCapacity = Number(parameters['DefaultCapacity']) || 100;
    var defaultName = parameters['DefaultName'];
    var switchKey = parameters['SwitchKey'].split(',');
    var allText = parameters['AllText'];
    var controlGuide = parameters['ControlGuide'];
    var zeroMoneyText = parameters['ZeroMoneyText'];
    var useMiniInfo = parameters['UseMiniInfo'] === 'true';

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.encodeStorageKey = function(item) {
        var type = '';
        if (DataManager.isItem(item))   type = 'I';
        if (DataManager.isWeapon(item)) type = 'W';
        if (DataManager.isArmor(item))  type = 'A';
        return type+item.id;
    };

    DataManager.decodeStorageKey = function(key) {
        var type = key[0];
        var id = Number(key.replace(/[IWA]/i,''));
        var item = null;
        if (type === 'I') item = $dataItems[id];
        if (type === 'W') item = $dataWeapons[id];
        if (type === 'A') item = $dataArmors[id];
        return item;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Temp.prototype.setCalledStorage = function(args) {
        this._calledStorage = args;
    };

    Game_Temp.prototype.calledStorage = function() {
        return this._calledStorage;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        if (command === 'ストレージ作成' || command === 'CreateStorage') {
            $gameParty.createItemStorage(args);
        } else if (command === 'ストレージ呼び出し' || command === 'CallStorage') {
            this.callStorage(args);
        } else if (command === 'ストレージショップ呼び出し' || command === 'CallStorageShop') {
            this.callStorageShop(args);
        } else if (command === 'ストレージパラメータ設定' || command === 'SetStorageParameter') {
            $gameParty.setStorageParameters(args);
        } else if (command === 'ストレージ投入' || command === 'IntoStorage'){
            this.intoStorage(args);
        } else if (command === 'ストレージ取り出し' || command === 'TakeStorage'){
            this.takeStorage(args);
        } else if (command === 'ストレージアイテム削除' || command === 'DeleteStorageItem'){
            this.deleteStorageItem(args);
        } else if (command === 'ストレージ削除' || command === 'deleteStorage'){
            $gameParty.deleteStorage(args);
        } else if (command === 'ストレージクリア' || command === 'clearStorage'){
            $gameParty.clearStorage(args);
        } else if (command === 'ストレージ投入モード' || command === 'IntoStorageMode'){
            this.intoStorageMode(args);
        } else {
            __GInterpreter_pluginCommand.call(this, command, args);
        }
    };

    Game_Interpreter.prototype.callStorage = function(args) {
        $gameTemp.setCalledStorage(args);
        SceneManager.push(Scene_Storage);
    };

    Game_Interpreter.prototype.callStorageShop = function(args) {
        $gameTemp.setCalledStorage(args);
        SceneManager.push(Scene_StorageShop);
    };

    Game_Interpreter.prototype.intoStorage = function(args) {
        var key = args[0];
        for (var i=1,max=args.length;i<max;i++) {
            var params = args[i].split(':');
            var item = params[0];
            var amount = params[1] ? Number(params[1]) : 1;
            $gameParty.pushStorageItem(key, item, amount);
        }
    };

    Game_Interpreter.prototype.deleteStorageItem = function(args) {
        var key = args[0];
        for (var i=1,max=args.length;i<max;i++) {
            var params = args[i].split(':');
            var item = params[0];
            var amount = params[1] ? Number(params[1]) : 1;
            $gameParty.deleteStorageItem(key, item, amount);
        }
    };

    Game_Interpreter.prototype.takeStorage = function(args) {
        var key = args[0];
        for (var i=1,max=args.length;i<max;i++) {
            var params = args[i].split(':');
            var item = params[0];
            var amount = params[1] ? Number(params[1]) : 1;
            var num = $gameParty.itemStorage(key).storage[item];
            if (num > 0) {
                amount = amount > num ? num : amount;
                $gameParty.deleteStorageItem(key, item, amount);
                $gameParty.gainItem(DataManager.decodeStorageKey(item), amount);
            }
        }
    };

    Game_Interpreter.prototype.intoStorageMode = function(args) {
        var sw = args[0];
        var key = args[1];
        switch(sw) {
            case 'ON':
            case 'オン':
                $gameTemp._intoStorageMode = key;
                break;
            case 'OFF':
            case 'オフ':
                $gameTemp._intoStorageMode = null;
                break;
        }
    };

    Game_Interpreter.prototype.commandChangeStorageItem = function(type) {
        var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        var args = [$gameTemp._intoStorageMode, type+this._params[0]+':'+Math.abs(value)];
        if (value > 0) {
            this.intoStorage(args);
        } else {
            this.deleteStorageItem(args);
        }
    };

    // Change Items
    var __GInterpreter_c126 = Game_Interpreter.prototype.command126;
    Game_Interpreter.prototype.command126 = function() {
        var result = true;
        if ($gameTemp._intoStorageMode){
            this.commandChangeStorageItem('I');
        } else {
            result = __GInterpreter_c126.call(this);
        }
        return result;
    };

    // Change Weapons
    var __GInterpreter_c127 = Game_Interpreter.prototype.command127;
    Game_Interpreter.prototype.command127 = function() {
        var result = true;
        if ($gameTemp._intoStorageMode){
            this.commandChangeStorageItem('W');
        } else {
            result = __GInterpreter_c127.call(this);
        }
        return result;
    };

    // Change Armors
    var __GInterpreter_c128 = Game_Interpreter.prototype.command128;
    Game_Interpreter.prototype.command128 = function() {
        var result = true;
        if ($gameTemp._intoStorageMode){
            this.commandChangeStorageItem('A');
        } else {
            result = __GInterpreter_c128.call(this);
        }
        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Party.prototype.itemStorage = function(name) {
        if (!this._itemStorage) return {};
        if (!this._itemStorage[name]) return {};
        return this._itemStorage[name];
    };

    Game_Party.prototype.createItemStorage = function(args) {
        var key = args[0];
        if (this._itemStorage && this._itemStorage[key]) return;
        if (!this._itemStorage) this._itemStorage = {};
        this._itemStorage[key] = {
            key:key,name:defaultName, cap:defaultCapacity, money:'-1', buyRate:'1.0', sellRate:'1.0',
            picture:'', categories:[], storage:{}
        };
        var all = 'すべて';
        if (Imported['SecondaryCategories']) all = PluginManager.parameters('SecondaryCategories')['AllIncludesCategory'];
        this._itemStorage[key].categories = [all, TextManager.item, TextManager.weapon, TextManager.armor, TextManager.keyItem];
        this.setStorageParameters(args);
    };

    Game_Party.prototype.clearStorage = function(args) {
        var key = args[0];
        if (!(this._itemStorage && this._itemStorage[key])) return;
        this._itemStorage[key].storage = {};
    };

    Game_Party.prototype.deleteStorage = function(args) {
        var key = args[0];
        if (!(this._itemStorage && this._itemStorage[key])) return;
        delete this._itemStorage[key];
    };

    Game_Party.prototype.setStorageParameters = function(args) {
        var storage = this._itemStorage[args[0]];
        var v = $gameVariables._data;
        var s = $gameSwitches._data;
        args.forEach(function(a){
            var data = a.split(':');
            switch(data[0]) {
                case 'name':
                case '名前':
                    storage.name  = data[1];
                    break;
                case 'cap' :
                case '容量':
                    storage.cap   = eval(data[1]);
                    break;
                case 'money' :
                case '所持金':
                    storage.money   = eval(data[1]);
                    break;
                case 'buyRate' :
                case '販売レート':
                    storage.buyRate = data[1];
                    break;
                case 'sellRate':
                case '売却レート':
                    storage.sellRate = data[1];
                    break;
                case 'picture':
                case 'ピクチャ':
                    storage.picture = data[1];
                    break;
                case 'InputCategory':
                case '投入カテゴリ':
                    storage.categories = data[1].split(',');
                    break;
            }
        }.bind(this));
    };

    Game_Party.prototype.pushStorageItem = function(name, item, amount) {
        if (!this._itemStorage) return;
        if (!this._itemStorage[name]) return;
        if (!this._itemStorage[name].storage[item]) this._itemStorage[name].storage[item] = 0;
        this._itemStorage[name].storage[item] += amount;
    };

    Game_Party.prototype.deleteStorageItem = function(name, item, amount) {
        if (!this._itemStorage) return;
        if (!this._itemStorage[name]) return;
        if (!this._itemStorage[name].storage[item]) return;
        this._itemStorage[name].storage[item] -= amount;
        if (this._itemStorage[name].storage[item] <= 0) {
            delete this._itemStorage[name].storage[item];
        }
    };

    Game_Party.prototype.storageWeight = function(name) {
        if (!this._itemStorage) return 0;
        if (!this._itemStorage[name]) return 0;
        var r = 0;
        var storage = this._itemStorage[name].storage;
        for (var key in storage){
            var item = DataManager.decodeStorageKey(key);
            var w = Imported['LimitPossession'] ? DataManager.itemWeight(item) : 1;
            r += w * storage[key];
        }
        return r;
    };

    Game_Party.prototype.leftStorageCapacity = function(name) {
        if (!this._itemStorage) return 0;
        if (!this._itemStorage[name]) return 0;
        var cap = this._itemStorage[name].cap;
        return cap - this.storageWeight(name);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_Storage() {
        this.initialize.apply(this, arguments);
    }

    Window_Storage.prototype = Object.create(Window_ItemList.prototype);
    Window_Storage.prototype.constructor = Window_Storage;

    Window_Storage.prototype.initialize = function(x, y, height, type, params, isMain) {
        this._type = type;
        this._params = params;
        this._storage = params.storage;
        this._cap = this._params.cap;
        this._isMain = isMain;
        this._subIndex = 0;
        this._categoryMode = false;
        var width = this.isMain() ? Graphics.boxWidth - this.subStorageWidth() : this.subStorageWidth();
        Window_ItemList.prototype.initialize.call(this, x, y, width, height);
        if (!Imported['LimitPossession']) this.createWeightSprite();
        this.activate();
        this.checkSort();
        this.refresh();
    };

    Window_Storage.prototype.createWeightSprite = function() {
        if (Imported['LimitPossession']) {
            Window_ItemList.prototype.createWeightSprite.call(this);
        } else {
            var sprite = new Sprite();
            sprite.bitmap = new Bitmap(140, 22);
            this._weightSprite = sprite;
            this.addChild(this._weightSprite);
            this.refreshSprite();
        }
    };

    Window_Storage.prototype.refreshSprite = function() {
        if (Imported['LimitPossession'] && this._type === 1) {
            Window_ItemList.prototype.refreshSprite.call(this);
        } else if (this.isStorage()){
            this._weightSprite.x = this.width - 152;
            this._weightSprite.y = this.height - 32;
            this._weightSprite.bitmap.clear();
            var value1 = $gameParty.storageWeight(this._params.key);
            var value2 = this._cap;
            var s = 0;
            if (Imported['LimitPossession']) s = Number(PluginManager.parameters('LimitPossession')['NumberOfDecimalPlace'] || 0);
            this._weightSprite.bitmap.fontSize = 20;
            if (value1 > value2) this._weightSprite.bitmap.textColor = this.textColor(2);
            var rate = Math.min(value1 / value2, 1.0);
            var w = Math.floor(138 * rate);
            var color1 = rate >= 1.0 ? 'rgb(255,128,128)' : 'rgb(128,255,128)';
            var color2 = rate >= 1.0 ? 'rgb(255,0,0)' : 'rgb(255,255,255)';
            this._weightSprite.bitmap.fillRect(0, 12, 140, 10, 'rgb(0,0,0)');
            this._weightSprite.bitmap.gradientFillRect(1 + (138 - w), 13, w, 8, color1, color2);
            this._weightSprite.bitmap.drawText(value1.toFixed(s), 0, 0, 60, 22, 'right');
            this._weightSprite.bitmap.textColor = this.textColor(0);
            this._weightSprite.bitmap.drawText('/', 60, 0, 20, 20, 'center');
            this._weightSprite.bitmap.drawText(value2.toFixed(s), 80, 0, 50, 22, 'right');
        }
    };

    Window_Storage.prototype.standardFontSize = function() {
        return 22;
    };

    Window_Storage.prototype.maxPageRows = function() {
        var rows = Window_Selectable.prototype.maxPageRows.call(this) - 1;
        if (Imported['ItemSort']) rows -= 1;
        return rows;
    };

    Window_Storage.prototype.maxCols = function() {
        if (this.isMain()) return 2;
        return 3;
    };

    Window_Storage.prototype.maxItems = function() {
        if (this.isSelectCategory() && !this._callRefresh){
            var m = this._params.categories.length;
            if (m <= 0) m = 5;
            return m;
        }
        var max = Window_ItemList.prototype.maxItems.call(this);
        return max;
    };

    Window_Storage.prototype.itemHeight = function() {
        return this.isMain() ? Window_ItemList.prototype.itemHeight.call(this) : this.oneHeight();
    };

    Window_Storage.prototype.categoryWidth = function () {
        return 96;
    };

    Window_Storage.prototype.subStorageWidth = function() {
        return 188;
    };

    Window_Storage.prototype.itemRect = function(index) {
        if (this._categoryCursor) {
            var max = this._params.categories.length;
            if (max <= 0) max = 5;
            var rect = {x: 0, y: 42, width:this.categoryWidth()+4, height:26};
            rect.x = this.width - (rect.width * max + this.standardPadding() + 20) + index * rect.width - 2;
            return rect;
        } else {
            if (this.isMain()) {
                var rect = Window_ItemList.prototype.itemRect.call(this, index);
            } else {
                var rect = {x: 0, y: 0, width: this.oneWidth(), height: this.oneHeight()};
                rect.x = (index % this.maxCols()) * this.oneWidth() + 8;
                rect.y = Math.floor(index / this.maxCols()) * this.oneHeight();
            }
            rect.y += 72;
        }
        return rect;
    };

    Window_Storage.prototype.updateCursor = function() {
        if (this.isSelectCategory()) this._categoryCursor = true;
        Window_ItemList.prototype.updateCursor.call(this);
        if (this.isSelectCategory()) this._categoryCursor = false;
    };

    Window_Storage.prototype.refresh = function() {
        this._callRefresh = true;
        this.makeItemList();
        this.createContents();
        this.drawText(this._params.name, 12, 0, this.contentsWidth()-24);
        if (this.isMain()) {
            if (this._params.categories.length > 0) {
                for (var i=0,max=this._params.categories.length;i<max;i++) {
                    var w = this.categoryWidth();
                    var x = this.width - ((w + 4) * max + this.standardPadding() + 20) + i * (w + 4);
                    this.changePaintOpacity(this._subIndex === i);
                    //if (this._subIndex === i) this.contents.fillRect(x - 2, 42, w+4, 26, 'rgba(255,255,255,0.5)');
                    this.drawText(this._params.categories[i],x,36,w,'center');
                }
            } else {
                for (var i = 0; i < 5; i++) {
                    var ary = [allText,TextManager.item,TextManager.weapon,TextManager.armor,TextManager.keyItem];
                    var w = this.categoryWidth();
                    var x = this.width - ((w + 4) * 5 + this.standardPadding() + 20) + i * (w + 4);
                    this.changePaintOpacity(this._subIndex === i);
                    //if (this._subIndex === i) this.contents.fillRect(x - 2, 42, w+4, 26, 'rgba(255,255,255,0.5)');
                    this.drawText(ary[i],x,36,w,'center');
                }
            }
        } else {
            var ary = [allText,TextManager.item,TextManager.weapon,TextManager.armor,TextManager.keyItem];
            if (this._params.categories.length > 0) ary = this._params.categories;
            this.drawText(ary[this._subIndex],0,36,this.contentsWidth(),'right');
        }
        this.changePaintOpacity(true);
        this.contents.fillRect(8,38,this.contentsWidth() - 24,2,'rgba(255,255,255,0.5)');
        this.drawAllItems();
        this.refreshSprite();
        if (Imported['ItemSort']){
            this.refreshSortSprite();
            this._sortSprite.x = this.width - 168 + (this.isStorage() ? 0 : 0);
            this._sortSprite.y = 16 + this.standardPadding();
        }
        this._callRefresh = false;
    };

    Window_Storage.prototype.drawItem = function(index) {
        if (this.isMain()) {
            Window_ItemList.prototype.drawItem.call(this, index);
        } else {
            this.drawIconItem(index);
        }
    };

    Window_Storage.prototype.drawIconItem = function(index) {
        var item = this._data[index];
        if (item) {
            var rect = this.itemRect(index);
            this.changePaintOpacity(this.isEnabled(item));
            this.drawIcon(item.iconIndex, rect.x, rect.y);
            this.drawText('x'+this.itemNumber(item), rect.x, rect.y + 12, rect.width-4, 'right');
            this.changePaintOpacity(1);
        }
    };

    Window_Storage.prototype.drawItemNumber = function(item, x, y, width) {
        if (this.needsNumber()) {
            this.drawText(':', x, y, width - this.textWidth('00'), 'right');
            this.drawText(this.itemNumber(item), x, y, width, 'right');
        }
    };

    Window_Storage.prototype.itemNumber = function(item) {
        if (this.isStorage()) {
            var key = DataManager.encodeStorageKey(item);
            return this._storage[key];
        } else {
            return $gameParty.numItems(item);
        }
    };

    Window_Storage.prototype.oneWidth = function() {
        return 48;
    };

    Window_Storage.prototype.oneHeight = function() {
        return 48;
    };

    Window_Storage.prototype.spacing = function() {
        return 24;
    };

    Window_Storage.prototype.item = function() {
        if (this.isSelectCategory()) return null;
        return Window_ItemList.prototype.item.call(this);
    };

    Window_Storage.prototype.makeItemList = function() {
        if (this._storage) {
            var storage = this._storage;
            if (this.isStorage()) {
                storage = [];
                for (var key in this._storage) storage.push(DataManager.decodeStorageKey(key));
            } else {
                storage = $gameParty.allItems();
            }
            this._data = storage.filter(function (item) {
                return this.includes(item);
            }, this);
        }
        if (Imported['ItemSort']) this.itemSort();
    };

    Window_Storage.prototype.includes = function(item) {
        if (!item) return false;
        if (DataManager.isItem(item) && item.itypeId > 2) return false;
        var key = DataManager.encodeStorageKey(item);
        var n = this.isStorage() ? this._storage[key] : $gameParty.numItems(item);
        if (n <= 0) return false;
        var categories = this._params.categories;
        if (categories.length <= 0) {
            switch (this._subIndex) {
                case 1:
                    return DataManager.isItem(item) && item.itypeId === 1;
                case 2:
                    return DataManager.isWeapon(item);
                case 3:
                    return DataManager.isArmor(item);
                case 4:
                    return DataManager.isItem(item) && item.itypeId === 2;
                default:
                    return true;
            }
        } else {
            var category = categories[this._subIndex];
            if (Imported['SecondaryCategories']) {
                return DataManager.itemSecondaryCategories(item).indexOf(category) >= 0;
            } else {
                switch (category) {
                    case 'すべて':
                    case 'all':
                        var isHideItem = DataManager.isItem(item) && item.itypeId > 2;
                        return  !isHideItem;
                    case TextManager.item:
                    case 'アイテム':
                    case 'item':
                        return DataManager.isItem(item) && item.itypeId === 1;
                    case TextManager.weapon:
                    case '武器':
                    case 'weapon':
                        return DataManager.isWeapon(item);
                    case TextManager.armor:
                    case '防具':
                    case 'armor':
                        return DataManager.isArmor(item);
                    case TextManager.keyItem:
                    case '大事なもの':
                    case 'keyItem':
                        return DataManager.isItem(item) && item.itypeId === 2;
                    default:
                        for (var i = 1, max = $dataSystem.weaponTypes.length; i < max; i++) {
                            if ($dataSystem.weaponTypes[i] === category) {
                                return DataManager.isWeapon(item) && item.wtypeId === i;
                            }
                        }
                        for (var i = 1, max = $dataSystem.armorTypes.length; i < max; i++) {
                            if ($dataSystem.armorTypes[i] === category) {
                                return DataManager.isArmor(item) && item.atypeId === i;
                            }
                        }
                        for (var i = 1, max = $dataSystem.equipTypes.length; i < max; i++) {
                            if ($dataSystem.equipTypes[i] === category) {
                                return !DataManager.isItem(item) && item.etypeId === i;
                            }
                        }
                }
            }
        }
    };

    Window_Storage.prototype.isEnabled = function(item) {
        if (!item) return false;
        if (!this.isStorage()) {
            if (!isIntoStorageKeyItem && DataManager.isItem(item) && item.itypeId === 2) return false;
            if ((item.meta['ストレージ投入不可'] || item.meta['NotIntoStorage'])) return false;
            //if (this.itemNumber(item) >= 99) return false;
        }
        if (this.isStorage()) {
            if ($gameParty.hasMaxItems(item)) return false;
            if (Imported['LimitPossession']) {
                return $gameParty.leftWeight() >= DataManager.itemWeight(item);
            } else {
                return true;
            }
        } else {
            var w = Imported['LimitPossession'] ? DataManager.itemWeight(item) : 1;
            return $gameParty.leftStorageCapacity(this._params.key) >= w;
        }
    };

    Window_Storage.prototype.processHandling = function() {
        if (this.isOpenAndActive()) {
            if (this.isOkEnabled() && this.isOkTriggered()) {
                if (this.isSelectCategory()) {
                    SoundManager.playOk();
                    this.deactivateSelectCategory();
                } else {
                    this.processOk();
                }
            } else if (this.isCancelEnabled() && this.isCancelTriggered()) {
                if (this.isSelectCategory() || this._params.categories.length === 1) {
                    this.processCancel();
                } else {
                    SoundManager.playCancel();
                    this.activateSelectCategory();
                }
            } else if (this.isTriggeredKey(switchKey)) {
                SoundManager.playCursor();
                this.callHandler('switch');
            } else {
                Window_ItemList.prototype.processHandling.call(this);
            }
        }
    };

    Window_Storage.prototype.isTriggeredKey = function(keys) {
        for (var i=0,max=keys.length;i<max;i++) {
            if (Input.isTriggered(keys[i])) return true;
        }
        return false;
    };

    Window_Storage.prototype.select = function(index) {
        Window_ItemList.prototype.select.call(this, index);
        if (this.isSelectCategory()) {
            this._subIndex = index;
            this.refresh();
        }
    };

    Window_Storage.prototype.isStorage = function() {
        return this._type === 0;
    };

    Window_Storage.prototype.isShowGuide = function() {
        return false;
    };

    Window_Storage.prototype.isMain = function() {
        return this._isMain;
    };

    Window_Storage.prototype.isSelectCategory = function() {
        return this._categoryMode;
    };

    Window_Storage.prototype.activateSelectCategory = function() {
        this.deselect();
        this._categoryMode = true;
        this.select(this._subIndex);
    };

    Window_Storage.prototype.deactivateSelectCategory = function() {
        this._categoryMode = false;
        this.select(0);
    };

    Window_Storage.prototype.activateMain = function() {
        this._isMain = true;
        this.width = Graphics.boxWidth - this.subStorageWidth();
        this.x = this.isStorage() ? 0 : this.subStorageWidth();
        this.checkSort();
        this._categoryMode = false;
        this.activate();
        this.refresh();
        Input.update();
    };

    Window_Storage.prototype.checkSort = function() {
        if (Imported['ItemSort'] && this.isStorage()) {
            var sortList = PluginManager.parameters('ItemSort')['SortList'].split(',');
            var sortType = $gameSystem.itemSortType();
            if (sortList[sortType] === 'new') {
                sortType = (sortType + 1) % sortList.length;
                $gameSystem.setItemSortType(sortType);
            }
        }
    };

    Window_Storage.prototype.deactivateMain = function() {
        this._isMain = false;
        this.width = this.subStorageWidth();
        this.x = this.isStorage() ? 0 : Graphics.boxWidth - this.subStorageWidth();
        this._categoryMode = false;
        this.deselect();
        this.deactivate();
        this.refresh();
    };

    Window_Storage.prototype.isHighlightNewItem = function() {
        return this._type === 1;
    };

    Window_Storage.prototype.isSortEnabled = function() {
        return Window_ItemList.prototype.isSortEnabled.call(this) && this.isMain();
    };

    Window_Storage.prototype.isSortNewerEnable = function() {
        return !this.isStorage();
    };

    Window_Storage.prototype.isOkAbolitionAll = function() {
        return false;
    };

    Window_Storage.prototype.processTouch = function() {
        if (!this.isOpenAndActive()) {
            if (TouchInput.isTriggered()) {
                if (this.isTouchedInsideFrame()) {
                    //SoundManager.playCursor();
                    this.callHandler('switch');
                    return;
                }
            }
        }
        if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) {
                if (!this.isSelectCategory()) {
                    SoundManager.playCancel();
                    this.activateSelectCategory();
                    return;
                }
            }
        }
        Window_ItemList.prototype.processTouch.call(this);
    };

    Window_Storage.prototype.onTouch = function(triggered) {
        var lastIndex = this.index();
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        var changeSC = false;
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                if (triggered && this.isTouchOkEnabled()) {
                    if (this.isSelectCategory()) {
                        SoundManager.playOk();
                        this.deactivateSelectCategory();
                        changeSC = true;
                    } else {
                        this.processOk();
                    }
                }
            } else if (this.isCursorMovable()) {
                this.select(hitIndex);
            }
        } else if (this._stayCount >= 10) {
            if (y < this.padding) {
                this.cursorUp();
            } else if (y >= this.height - this.padding) {
                this.cursorDown();
            }
        }
        if (!changeSC && this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    };

    Window_Storage.prototype.hitTest = function(x, y) {
        if (this.isSelectCategory()) this._categoryCursor = true;
        var index = Window_ItemList.prototype.hitTest.call(this, x, y);
        if (this.isSelectCategory()) this._categoryCursor = false;
        return index;
    };

    // rpg_core.js
    Window_Storage.prototype._refreshArrows = function() {
        Window_Selectable.prototype._refreshArrows.call(this);
        if (!this.isMain()) this._downArrowSprite.y -= 32;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_StorageGuide() {
        this.initialize.apply(this, arguments);
    }

    Window_StorageGuide.prototype = Object.create(Window_Base.prototype);
    Window_StorageGuide.prototype.constructor = Window_StorageGuide;

    Window_StorageGuide.prototype.initialize = function() {
        Window_Base.prototype.initialize(0, Graphics.boxHeight - 36,Graphics.boxWidth, 36);
        this._sprite = new Sprite();
        this._sprite.x = 4;
        this._sprite.y = 4;
        this.addChild(this._sprite);
        this._text = controlGuide;
        this.refresh();
    };

    Window_StorageGuide.prototype.standardFontSize = function() {
        return 20;
    };

    Window_StorageGuide.prototype.refresh = function() {
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
        Window_StorageGuide.prototype.textWidthEx = function (text) {
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

    function Scene_Storage() {
        this.initialize.apply(this, arguments);
    }

    Scene_Storage.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Storage.prototype.constructor = Scene_Storage;

    Scene_Storage.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        var params = $gameTemp.calledStorage();
        this._storage = $gameParty.itemStorage(params[0]);
        this.createGuideWindow();
        this.createHelpWindow();
        this.createItemWindow();
        this.createSubItemWindow();
        if (Imported['MiniInformationWindow'] && useMiniInfo){
            this.createMiniWindow();
            this._subItemWindow._infoWindow = this._miniWindow;
        }
        this._itemWindow.select(0);
    };

    Scene_Storage.prototype.createItemWindow = function() {
        var x = 0;
        var y = this._helpWindow.y + this._helpWindow.height;
        var height = Graphics.boxHeight - y;
        if (this._guideWindow) height -= 36;
        this._itemWindow = new Window_Storage(x,y,height,0,this._storage, true);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler('ok', this.onOkItem.bind(this));
        this._itemWindow.setHandler('cancel', this.popScene.bind(this));
        this._itemWindow.setHandler('switch', this.onSwitchStorage.bind(this));
        this.addWindow(this._itemWindow);
        this._itemWindow.select(0);
    };

    Scene_Storage.prototype.createSubItemWindow = function() {
        var x = this._itemWindow.x + this._itemWindow.width;
        var y = this._helpWindow.y + this._helpWindow.height;
        var height = Graphics.boxHeight - y;
        if (this._guideWindow) height -= 36;
        var storage = {name:partyStorageName,storage:$gameParty.allItems(),
            key:this._storage.key,categories:this._storage.categories };
        this._subItemWindow = new Window_Storage(x, y, height,1,storage, false);
        this._subItemWindow.setHandler('ok', this.onOkItem.bind(this));
        this._subItemWindow.setHandler('cancel', this.popScene.bind(this));
        this._subItemWindow.setHandler('switch', this.onSwitchStorage.bind(this));
        this._subItemWindow.setHelpWindow(this._helpWindow);
        this._subItemWindow.deactivate();
        this.addWindow(this._subItemWindow);
    };

    Scene_Storage.prototype.createGuideWindow = function() {
        if (!controlGuide) return;
        this._guideWindow = new Window_StorageGuide();
        this.addWindow(this._guideWindow);
    };

    Scene_Storage.prototype.onOkItem = function() {
        if (this._itemWindow.isMain()) {
            if (Imported['ItemSort']) $gameTemp._notNewerItem = true;
            $gameParty.gainItem(this._itemWindow.item(), 1);
            if (Imported['ItemSort']) $gameTemp._notNewerItem = false;
            $gameParty.deleteStorageItem(this._storage.key, DataManager.encodeStorageKey(this._itemWindow.item()), 1);
            this._itemWindow.activate();
        } else {
            $gameParty.loseItem(this._subItemWindow.item(), 1);
            $gameParty.pushStorageItem(this._storage.key, DataManager.encodeStorageKey(this._subItemWindow.item()), 1);
            this._subItemWindow.activate();
        }
        this._itemWindow.refresh();
        this._subItemWindow.refresh();
        this._itemWindow.select(this._itemWindow.index());
    };

    Scene_Storage.prototype.onSwitchStorage = function() {
        if (this._itemWindow.isMain()) {
            this._subItemWindow.activateMain();
            this._itemWindow.deactivateMain();
            this._subItemWindow.select(0);
        } else {
            this._itemWindow.activateMain();
            this._subItemWindow.deactivateMain();
            this._itemWindow.select(0);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////


    function Window_StorageShopNumber() {
        this.initialize.apply(this, arguments);
    }

    Window_StorageShopNumber.prototype = Object.create(Window_ShopNumber.prototype);
    Window_StorageShopNumber.prototype.constructor = Window_StorageShopNumber;

    Window_StorageShopNumber.prototype.setCallBuy = function(callBuy) {
        this._callBuy = callBuy;
    };

    Window_StorageShopNumber.prototype.refresh = function() {
        Window_ShopNumber.prototype.refresh.call(this);
        if (this._buyWindow) {
            this.resetFontSettings();
            this.contents.fontSize = 22;
            var total = this._price * this._number;
            var cu = TextManager.currencyUnit;
            this.drawText(this._buyWindow._name, 0, 0, 240);
            var money = this._buyWindow._sMoney;
            money = money + (this._callBuy ? total : -total);
            if (this._buyWindow._sMoney >= 0) {
                this.drawText(Math.max(money, 0), 0, 0, this.contentsWidth() - this.textWidth(cu), 'right');
                this.changeTextColor(this.systemColor());
                this.drawText(cu, 0, 0, this.contentsWidth(), 'right');
            }
            this.contents.fillRect(4, 30, this.contentsWidth() - 8, 2, 'rgba(255,255,255,0.5)');
            if (this._buyWindow._sMoney >= 0 && zeroMoneyText && money < 0) {
                this.changeTextColor(this.normalColor());
                var texts = zeroMoneyText.split('\\n');
                for (var i=0,max=texts.length;i<max;i++) {
                    this.drawText(texts[i], 0, 48 + this.lineHeight() * i, this.contentsWidth());
                }
            }
            this.resetFontSettings();
        }
    };

    Window_StorageShopNumber.prototype.drawTotalPrice = function() {
        var total = this._price * this._number;
        var width = this.contentsWidth() - this.textPadding();
        if (!this._callBuy) {
            var money = this._buyWindow._sMoney;
            if (money >= 0 && this._buyWindow && (total > money)) total = money;
        }
        this.drawCurrencyValue(total, this._currencyUnit, 0, this.priceY(), width);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_StorageShopBuy() {
        this.initialize.apply(this, arguments);
    }

    Window_StorageShopBuy.prototype = Object.create(Window_ShopBuy.prototype);
    Window_StorageShopBuy.prototype.constructor = Window_StorageShopBuy;

    Window_StorageShopBuy.prototype.initialize = function(x, y, height, shopGoods, key) {
        this._storageKey = key;
        var storage = $gameParty.itemStorage(this._storageKey);
        this._cap = storage.cap;
        this._sMoney = storage.money;
        this._name = storage.name;
        Window_ShopBuy.prototype.initialize.call(this, x, y, height, shopGoods);
        this.createWeightSprite();
    };

    Window_StorageShopBuy.prototype.createWeightSprite = function() {
        var sprite = new Sprite();
        sprite.bitmap = new Bitmap(140, 22);
        this._weightSprite = sprite;
        this.addChild(this._weightSprite);
        this.refreshWeightSprite();
    };

    Window_StorageShopBuy.prototype.refreshWeightSprite = function() {
        if (!this._weightSprite) return;
        this._weightSprite.x = this.width - 152;
        this._weightSprite.y = this.height - 32;
        this._weightSprite.bitmap.clear();
        var value1 = $gameParty.storageWeight(this._storageKey);
        var value2 = this._cap;
        var s = 0;
        if (Imported['LimitPossession']) s = Number(PluginManager.parameters('LimitPossession')['NumberOfDecimalPlace'] || 0);
        this._weightSprite.bitmap.fontSize = 20;
        if (value1 > value2) this._weightSprite.bitmap.textColor = this.textColor(2);
        var rate = Math.min(value1 / value2, 1.0);
        var w = Math.floor(138 * rate);
        var color1 = rate >= 1.0 ? 'rgb(255,128,128)' : 'rgb(128,255,128)';
        var color2 = rate >= 1.0 ? 'rgb(255,0,0)' : 'rgb(255,255,255)';
        this._weightSprite.bitmap.fillRect(0, 12, 140, 10, 'rgb(0,0,0)');
        this._weightSprite.bitmap.gradientFillRect(1 + (138 - w), 13, w, 8, color1, color2);
        this._weightSprite.bitmap.drawText(value1.toFixed(s), 0, 0, 60, 22, 'right');
        this._weightSprite.bitmap.textColor = this.textColor(0);
        this._weightSprite.bitmap.drawText('/', 60, 0, 20, 20, 'center');
        this._weightSprite.bitmap.drawText(value2.toFixed(s), 80, 0, 50, 22, 'right');
    };

    Window_StorageShopBuy.prototype.maxPageRows = function() {
        return Window_ShopBuy.prototype.maxPageRows.call(this) - 1;
    };

    Window_StorageShopBuy.prototype.itemRect = function(index) {
        var rect = Window_ShopBuy.prototype.itemRect.call(this, index);
        rect.y += this.lineHeight();
        return rect;
    };

    Window_StorageShopBuy.prototype.drawItemName = function(item, x, y, width) {
        width = width || 312;
        if (item) {
            if (this._storageKey) {
                var storage = $gameParty.itemStorage(this._storageKey);
                var n = storage.storage[DataManager.encodeStorageKey(item)];
            }
            var iconBoxWidth = Window_Base._iconWidth + 4;
            var text = item.name;
            if (n > 1) text += '(' + n + ')';
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + 2, y + 2);
            this.drawText(text, x + iconBoxWidth, y, width - iconBoxWidth);
        }
    };

    Window_StorageShopBuy.prototype.standardFontSize = function() {
        return 22;
    };

    Window_StorageShopBuy.prototype.refresh = function() {
        this._callSBRefresh = true;
        Window_ShopBuy.prototype.refresh.call(this);
        this.drawText(this._name, 0, 0, 240);
        if (this._sMoney >= 0) {
            var cu = TextManager.currencyUnit;
            this.drawText(this._sMoney, 0, 0, this.contentsWidth() - this.textWidth(cu), 'right');
            this.changeTextColor(this.systemColor());
            this.drawText(cu, 0, 0, this.contentsWidth(), 'right');
        }
        this.contents.fillRect(4, 30, this.contentsWidth() - 8, 2, 'rgba(255,255,255,0.5)');
        this.refreshWeightSprite();
        this._callSBRefresh = false;
    };

    Window_StorageShopBuy.prototype.price = function(item) {
        var rate = 1.0;
        var price = this._price[this._data.indexOf(item)] || 0;
        if (this._callSBRefresh && this._buyRate) {
            var v = $gameVariables._data;
            var s = $gameSwitches._data;
            rate = eval(this._buyRate);
        }
        return price * rate;
    };
    
    Window_StorageShopBuy.prototype.adjustIndex = function() {
        if (this.index() >= this._data.length) this.select(this._data.length - 1);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_StorageShopSell() {
        this.initialize.apply(this, arguments);
    }

    Window_StorageShopSell.prototype = Object.create(Window_Storage.prototype);
    Window_StorageShopSell.prototype.constructor = Window_StorageShopSell;

    Window_StorageShopSell.prototype.subStorageWidth = function() {
        return 0;
    };

    Window_StorageShopSell.prototype.needsNumber = function() {
        return true;
    };

    Window_StorageShopSell.prototype.isSortEnabled = function() {
        return true;
    };

    Window_StorageShopSell.prototype.isEnabled = function(item) {
        return item && item.price > 0;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Scene_StorageShop() {
        this.initialize.apply(this, arguments);
    }

    Scene_StorageShop.prototype = Object.create(Scene_Shop.prototype);
    Scene_StorageShop.prototype.constructor = Scene_StorageShop;

    Window_ShopSell.prototype.initialize = function(x, y, width, height) {
        Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    };

    Scene_StorageShop.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
        var params = $gameTemp.calledStorage();
        this._storage = $gameParty.itemStorage(params[0]);
        this._purchaseOnly = false;
        this._item = null;
        this.makeGoodsList();
    };

    Scene_StorageShop.prototype.create = function() {
        Scene_Shop.prototype.create.call(this);
        this._numberWindow._buyWindow = this._buyWindow;
        this._categoryWindow.hide();
    };

    Scene_StorageShop.prototype.createDummyWindow = function() {
        Scene_Shop.prototype.createDummyWindow.call(this);
        if (this._storage.picture) {
            var sprite = new Sprite();
            sprite.bitmap = ImageManager.loadPicture(this._storage.picture);
            this._dummyWindow._sprite = sprite;
            this._dummyWindow.addChild(sprite);
            this._dummyWindow.drawText(this._storage.name,64,128,320,'center');
        }
    };

    Scene_StorageShop.prototype.createNumberWindow = function() {
        var wy = this._dummyWindow.y;
        var wh = this._dummyWindow.height;
        this._numberWindow = new Window_StorageShopNumber(0, wy, wh);
        this._numberWindow.hide();
        this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
        this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
        this.addWindow(this._numberWindow);
    };

    Scene_StorageShop.prototype.createBuyWindow = function() {
        var wy = this._dummyWindow.y;
        var wh = this._dummyWindow.height;
        this._buyWindow = new Window_StorageShopBuy(0, wy, wh, this._goods, this._storage.key);
        this._buyWindow.setHelpWindow(this._helpWindow);
        this._buyWindow.setStatusWindow(this._statusWindow);
        this._buyWindow.hide();
        this._buyWindow.setHandler('ok',     this.onBuyOk.bind(this));
        this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
        if (Imported['EquipAndShopStatusR']) {
            this._buyWindow.setHandler('pagedown', this.nextActor.bind(this));
            this._buyWindow.setHandler('pageup', this.previousActor.bind(this));
            this._buyWindow.setHandler('right', this.nextPage.bind(this));
            this._buyWindow.setHandler('left', this.prevPage.bind(this));
        }
        this._buyWindow._buyRate = this._storage.buyRate;
        this.addWindow(this._buyWindow);
    };

    Scene_StorageShop.prototype.createSellWindow = function() {
        var wy = this._commandWindow.y + this._commandWindow.height;
        var wh = Graphics.boxHeight - wy;
        var storage = {name:partyStorageName,storage:$gameParty.allItems(),
            key:this._storage.key,categories:this._storage.categories };
        this._sellWindow = new Window_StorageShopSell(0, wy, wh, 1, storage, true);
        this._sellWindow.setHelpWindow(this._helpWindow);
        this._sellWindow.hide();
        this._sellWindow.setHandler('ok',     this.onSellOk.bind(this));
        this._sellWindow.setHandler('cancel', this.onSellCancel.bind(this));
        this._categoryWindow.setItemWindow(this._sellWindow);
        this._sellWindow.deactivate();
        this.addWindow(this._sellWindow);
    };

    Scene_StorageShop.prototype.activateBuyWindow = function() {
        Scene_Shop.prototype.activateBuyWindow.call(this);
        this._buyWindow.adjustIndex();
    };

    Scene_StorageShop.prototype.activateSellWindow = function() {
        //this._categoryWindow.show();
        this._sellWindow.refresh();
        this._sellWindow.show();
        this._sellWindow.activate();
        this._statusWindow.hide();
    };

    Scene_StorageShop.prototype.commandBuy = function() {
        Scene_Shop.prototype.commandBuy.call(this);
        this._buyWindow.select(0);
    };

    Scene_StorageShop.prototype.commandSell = function() {
        this._dummyWindow.hide();
        //this._categoryWindow.show();
        //this._categoryWindow.activate();
        this.activateSellWindow();
        if (this._storage.categories.length > 1) {
            this._sellWindow.activateSelectCategory();
        }
        this._sellWindow.select(0);
    };
    
    Scene_StorageShop.prototype.onBuyOk = function() {
        this._numberWindow.setCallBuy(true);
        Scene_Shop.prototype.onBuyOk.call(this);
    };
    
    Scene_StorageShop.prototype.onSellOk = function() {
        this._numberWindow.setCallBuy(false);
        Scene_Shop.prototype.onSellOk.call(this);
    };

    Scene_StorageShop.prototype.onSellCancel = function() {
        this._sellWindow.deselect();
        this._statusWindow.setItem(null);
        this._helpWindow.clear();
        this._commandWindow.activate();
        this._dummyWindow.show();
        this._sellWindow.hide();
    };

    Scene_StorageShop.prototype.makeGoodsList = function() {
        var storage = this._storage.storage;
        this._goods = [];
        for (var key in storage) {
            var ary = [0,0,0,0];
            if (key[0] === 'W') ary[0] = 1;
            if (key[0] === 'A') ary[0] = 2;
            ary[1] = Number(key.replace(/[IWA]/,''));
            this._goods.push(ary);
        }
        this._goods.sort(function(a,b){
            if (a[0] !== b[0]) return a[0] - b[0];
            return a[1] - b[1];
        });
        if (this._buyWindow){
            this._buyWindow._shopGoods = this._goods;
            this._buyWindow.refresh();
        }
    };

    Scene_StorageShop.prototype.doBuy = function(number) {
        var value = number * this.buyingPrice();
        $gameParty.loseGold(value);
        $gameParty.gainItem(this._item, number);
        $gameParty.deleteStorageItem(this._storage.key,DataManager.encodeStorageKey(this._item),number);
        this.makeGoodsList();
        if (this._buyWindow._sMoney >= 0) this._buyWindow._sMoney += value;
        if (Imported['LimitPossession']) {
            this._left = null;
            this._statusWindow._allItemsWeight = null;
        }
    };

    Scene_StorageShop.prototype.doSell = function(number) {
        var value = number * this.sellingPrice();
        if (this._buyWindow._sMoney >= 0) value = Math.min(value, this._buyWindow._sMoney);
        $gameParty.gainGold(value);
        $gameParty.loseItem(this._item, number);
        $gameParty.pushStorageItem(this._storage.key,DataManager.encodeStorageKey(this._item),number);
        this.makeGoodsList();
        if (this._buyWindow._sMoney >= 0) this._buyWindow._sMoney -= value;
        if (Imported['LimitPossession']) {
            $gameTemp._callShopWindow = 'buy';
            this._left = null;
            this._statusWindow._allItemsWeight = null;
        }
    };

    Scene_StorageShop.prototype.maxBuy = function() {
        var max = Scene_Shop.prototype.maxBuy.call(this);
        var num = this._storage.storage[DataManager.encodeStorageKey(this._item)];
        return Math.min(max, num);
    };

    Scene_StorageShop.prototype.maxSell = function() {
        var max = $gameParty.numItems(this._item);
        if (this._buyWindow._sMoney >= 0) {
            var l = $gameParty.leftStorageCapacity(this._storage.key);
            var w = Imported['LimitPossession'] ? DataManager.itemWeight(this._item) : 1;
            var num = Math.max(Math.floor(l / w), 0);
            max = Math.min(max, num);
        }
        return max;
    };

    Scene_StorageShop.prototype.buyingPrice = function() {
        var v = $gameVariables._data;
        var s = $gameSwitches._data;
        var price = this._buyWindow.price(this._item);
        var rate = eval(this._storage.buyRate);
        return Math.floor(price * rate);
    };

    Scene_StorageShop.prototype.sellingPrice = function() {
        var v = $gameVariables._data;
        var s = $gameSwitches._data;
        var price = this._item.price / 2;
        var rate = eval(this._storage.sellRate);
        return Math.floor(price * rate);
    };


    Scene_StorageShop.prototype.updateCategory = function() {
        var l = $gameParty.reserveItems().length;
        if (l === 0 && this._rLength > 0) {
            this._sellWindow.activate();
        }
        this._rLength = l;
    };

    Scene_StorageShop.prototype.terminate = function() {
        this._storage.money = this._buyWindow._sMoney;
        Scene_Shop.prototype.terminate.call(this);
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());