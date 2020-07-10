//
//  カテゴリ合成 ver1.02
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
Imported['CategorySythesis'] = 1.02;

/*:
 * @plugindesc ver1.02/アイテムを合成する機能を追加します。【SecondaryCategories必須】
 * @author Yana
 *
 * @param DefaultSynthesisName
 * @desc 合成シーンの名前として表示する名称のデフォルト値です。
 * @default 合成
 *
 * @param DefaultSynthesisCategories
 * @desc 合成で投入できるカテゴリの初期設定です。
 * @default アイテム,武器,防具,大事なもの
 *
 * @param NeedMachineryName
 * @desc 必要器材の名称です。
 * @default 必要器材
 *
 * @param NeedMaterialName
 * @desc 必要素材の名称です。
 * @default 必要素材
 *
 * @param MaterialListText
 * @desc 素材リストの上に表示するウィンドウの名前です。
 * @default マテリアルリスト
 *
 * @param SynthesisText
 * @desc 「合成する」として表示するテキストです。
 * @default 合成する
 *
 * @param NumberSynthesisText
 * @desc 「○個合成する」として表示するテキストです。
 * @default _num個合成する
 *
 * @param SynthesisHelp
 * @desc 「○個合成する」にカーソルがあっているときにヘルプに表示されるテキストです。
 * @default 上下キーで製作個数を選択します。
 *
 * @param EstimateText
 * @desc 結果予測ウィンドウに表示するテキストです。
 * @default 結果予測
 *
 * @param SynthesisPriceText
 * @desc 合成ショップ時に合成するにカーソルがあっているとき、表示される合成代金のテキストです。
 * @default 合成代金
 *
 * @param ChangeRecipeTone
 * @desc レシピが変化した際の予測ウィンドウと結果ウィンドウのウィンドウトーンです。
 * @default 206,68,24,0
 *
 * @param SynthesisResultText
 * @desc 合成結果ウィンドウに表示するテキストです。
 * @default 合成結果
 *
 * @param SynthesisSeName
 * @desc 合成時に鳴らすSE名です。
 * @default Item1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param SynthesisSeSettings
 * @desc 合成時に鳴らすSEの設定です。
 * @default 90,100,0
 *
 * @param MenuSynthesisCommandName
 * @desc メニューに表示する合成のコマンド名です。
 * 空欄にするとメニューに合成を追加しません。
 * @default 合成
 *
 * @help------------------------------------------------------
 *  プラグインコマンド
 * ------------------------------------------------------
 * ***合成シーンを直接呼び出す***
 * カテゴリ合成呼び出し
 * CallCategorySynthesis
 *
 * 追加設定として、名前、ピクチャ、カテゴリの設定が可能です。
 * 名前の設定をすると、レシピリストに表示されます。
 * ピクチャの設定をすると、レシピステータスに指定した画像が表示されます。
 * カテゴリの設定をすると、その合成で合成できるカテゴリを設定できます。
 * カテゴリを未設定にすると、通常通り、「アイテム、武器、防具、大事なもの」が設定されます。
 *
 * 例:名前を合成屋、ピクチャをtest1、カテゴリを回復薬,インゴットに設定する。
 * カテゴリ合成呼び出し 名前:合成屋 ピクチャ:test1 カテゴリ:回復薬,インゴット
 *
 * ***ショップを経由して合成シーンを呼び出す***
 * 合成ショップ設定
 * SettingSynthesisShop
 *
 * 合成ショップの設定も上記の呼び出しと同じように設定が可能です。
 * この設定を呼び出した後イベントコマンドでショップを呼び出すことにより、
 * 合成ショップを呼び出すことができます。
 *
 * ショップ経由で合成を呼び出した場合、合成可能なレシピは所持しているレシピブックを無視し、
 * イベントコマンドで設定したラインナップを合成できます。
 * また、ショップ経由の場合は合成に合成料が必要となり、器具の設定が無視されます。
 *
 * ------------------------------------------------------
 *  使い方
 * ------------------------------------------------------
 * ***レシピの設定***
 * 合成の為のレシピはアイテムのメモを使って設定します。
 *
 * ―――材料の設定―――
 * <合成材料:○:x,○:x…>
 * <SyntheticMaterials:○:x,○:x…>
 *
 * そのアイテムのレシピを○:x,○:x…に設定します。
 * ○にはアイテムまたはカテゴリの指定、xには個数を設定します。
 * アイテムの指定は、I◇,W◇,A◇のように行います。
 * I◇の場合は、ID◇番のアイテム、W◇の場合は◇番の武器、A◇の場合は◇番の防具になります。
 * カテゴリを指定する場合は、カテゴリ名で直接指定してください。
 * 必要な材料が1つの場合は:xを省略することができます。
 *
 * 例:5番のアイテム2個、1番の武器1つ、7番の防具1つを材料に指定する
 * <合成材料:I5:2,W1,A7>
 *
 * ―――器材の設定―――
 * <必要器材:○,○…>
 * <Machinery:○,○…>
 *
 * そのアイテムの必要器材を○,○…に設定します。
 * ○にはアイテムを指定します。アイテムの設定方法は上記のレシピと同じです。
 * 器材はカテゴリと数量の指定ができません。
 * この器材は合成シーンをプラグインコマンドで呼び出した時のみ必要になります。
 * ショップシーンを経由した場合は、この設定は無視されます。
 *
 * 例:6番のアイテムと8番の武器を必要器材に指定する
 * <必要器材:I6,W8>
 *
 * ―――合成数の設定―――
 * <合成数:x>
 * <SyntheticNumber:x>
 *
 * そのアイテムの制作数をx個に指定します。
 *
 * ―――合成料の設定―――
 * <合成料:x>
 * <SyntheticPrice:x>
 *
 * そのアイテムの合成料をxに設定します。
 * 合成料はショップを経由して呼び出された場合のみ使用されます。
 * 設定がない場合は、アイテムの価格が合成料として設定されます。
 *
 * ―――ダミーレシピの設定―――
 * <ダミーレシピ:○>
 * <DummyRecipe:○>
 *
 * ダミーレシピとは1つのアイテムのレシピを複数設定するための仕組みです。
 * ダミーレシピの設定されたアイテムを合成すると、
 * 生成されるアイテムがダミーレシピで設定したアイテムに置き換わります。
 * ○にはレシピと同じようにI◇,W◇,A◇でアイテムを設定します。
 *
 * ―――合成優先度の設定―――
 * <合成優先度:x>
 * <SyntheticPriority:x>
 *
 * 合成優先度はレシピ変化が起きた際に変化先のアイテムを指定するための仕組みです。
 * レシピを満たした時、優先度が最も高いものに変化します。
 * 優先度が同じ場合、IDの高いものが優先されます。
 *
 * ***レシピブックの設定***
 * レシピブックもアイテムのメモを使って設定します。
 *
 * <掲載レシピ:○,○,○…>
 * <PublishedRecipe:○,○,○…>
 *
 * そのアイテムの掲載レシピを○,○,○…に設定します。
 * ○にはレシピと同じようにI◇,W◇,A◇でアイテムを設定します。
 * 例:5番のアイテム、2番の武器、6番の防具
 * <掲載レシピ:I5,W2,A6>
 *
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
 * ver1.02:190212
 * 合成結果で変化したアイテムの最大合成数が正常に処理されていなかったバグを修正。
 * アイテム重量制と併用時、所持重量がオーバーしているときは合成できないように変更。
 * ver1.01:180214
 * 所持限界以上に合成できていたバグを修正。
 * ver1.00:
 * 公開
 */

(function() {

    'use strict';

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('CategorySynthesis');
    var defaultSynthesisName = parameters['DefaultSynthesisName'];
    var defaultSynthesisCategories = parameters['DefaultSynthesisCategories'].split(',');
    var needMachineryName = parameters['NeedMachineryName'];
    var needMaterialName = parameters['NeedMaterialName'];
    var materialListText = parameters['MaterialListText'];
    var synthesisText = parameters['SynthesisText'];
    var numberSynthesisText = parameters['NumberSynthesisText'];
    var synthesisHelp = parameters['SynthesisHelp'];
    var estimateText = parameters['EstimateText'];
    var synthesisPriceText = parameters['SynthesisPriceText'];
    var changeRecipeTone = parameters['ChangeRecipeTone'].split(',').map(function(s){ return Number(s)});
    var synthesisResultText = parameters['SynthesisResultText'];
    var synthesisSeName = parameters['SynthesisSeName'];
    var synthesisSeSettings = parameters['SynthesisSeSettings'].split(',').map(function(s){ return Number(s)});
    var menuSynthesisCommandName = parameters['MenuSynthesisCommandName'];

    ////////////////////////////////////////////////////////////////////////////////////

    var __WMCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        __WMCommand_addOriginalCommands.call(this);
        if (menuSynthesisCommandName){
            this.addCommand(menuSynthesisCommandName, 'categorySynthesis', true);
        }
    };

    var __SMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        __SMenu_createCommandWindow.call(this);
        this._commandWindow.setHandler('categorySynthesis',   this.commandCategorySynthesis.bind(this));
    };

    Scene_Menu.prototype.commandCategorySynthesis = function() {
        $gameTemp._callShopSynthesis = false;
        SceneManager.push(Scene_CategorySynthesis);
        SceneManager.prepareNextScene('');
    };

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.isRecipeBook = function(item) {
        return item && (item.meta['掲載レシピ'] || item.meta['PublishedRecipe']);
    };

    DataManager.publishedItemRecipes = function(item) {
        var recipes = item.meta['掲載レシピ'] || item.meta['PublishedRecipe'];
        return recipes.split(',');
    };

    DataManager.hasRecipe = function(item) {
       var recipe = this.itemRecipe(item);
       if (recipe.recipe) return true;
       return false;
    };

    DataManager.itemRecipe = function(item) {
        if (item._recipe) return item._recipe;
        var recipe = item.meta['合成材料'] || item.meta['SyntheticMaterials'] || '';
        var machinery = item.meta['必要器材'] || item.meta['Machinery'] || '';
        var num = item.meta['合成数'] || item.meta['SyntheticNumber'] || 1;
        var value = item.meta['合成料'] || item.meta['SyntheticPrice'] || item.price;
        var dummy = item.meta['ダミーレシピ'] || item.meta['DummyRecipe'] || '';
        var priority = Number(item.meta['合成優先度'] || item.meta['SyntheticPriority']) || 0;
        var mats = recipe.split(',').filter(function(m){
            return m;
        }).map(function(m){
            var n = 1;
            if (m.match(/:(\d+)/)) n = Number(RegExp.$1);
            m = m.replace(/:\d+/,'');
            return [m,n];
        });
        var mache = machinery.split(',').filter(function(m){
            return m;
        }).map(function(m){
            var n = 1;
            if (m.match(/:(\d+)/)) n = Number(RegExp.$1);
            m = m.replace(/:\d+/,'');
            return [m,n];
        });
        item._recipe = {num:num, value:value, recipe:mats, machinery:mache, dummy:dummy, priority:priority};
        return item._recipe;
    };

    DataManager.encodeSynthesisItem = function(obj) {
        if (!obj) return null;
        if (this.isItem(obj))   return 'I' + obj.id;
        if (this.isWeapon(obj)) return 'W' + obj.id;
        if (this.isArmor(obj))  return 'A' + obj.id;
        return null;
    };

    DataManager.decodeSynthesisItem = function(obj) {
        if (!obj) return null;
        var type = obj[0].toUpperCase();
        var item = null;
        var id = Number(obj.replace(/[IWA]/,''));
        if (id) {
            switch (type) {
                case 'I': item = $dataItems[id]; break;
                case 'W': item = $dataWeapons[id]; break;
                case 'A': item = $dataArmors[id]; break;
            }
        }
        return item;
    };
    
    DataManager.isSynthesisItem = function(item) {
        return /^[IWA]\d+/i.test(item);
    };

    DataManager.isMaterial = function(item) {
        return item && !(item.meta['材料指定不可'] || item.meta['NotMaterial']);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        if (command === 'カテゴリ合成呼び出し' || command === 'CallCategorySynthesis') {
            this.callCategorySynthesis(args);
        } else if (command === '合成ショップ設定' || command === 'SettingSynthesisShop') {
            this.callSynthesisShop(args);
        } else {
            __GInterpreter_pluginCommand.call(this, command, args);
        }
    };

    Game_Interpreter.prototype.callCategorySynthesis = function(args) {
        $gameTemp._callShopSynthesis = false;
        SceneManager.push(Scene_CategorySynthesis);
        SceneManager.prepareNextScene(args);
    };

    Game_Interpreter.prototype.callSynthesisShop = function(args) {
        $gameTemp._categoryShopSetting = args;
    };


    // Shop Processing
    var __GInterpreter_command302 = Game_Interpreter.prototype.command302;
    Game_Interpreter.prototype.command302 = function() {
        if (!$gameParty.inBattle()) {
            if ($gameTemp._categoryShopSetting) {
                var goods = [this._params];
                while (this.nextEventCode() === 605) {
                    this._index++;
                    goods.push(this.currentCommand().parameters);
                }
                $gameTemp._callShopSynthesis = true;
                SceneManager.push(Scene_CategorySynthesis);
                SceneManager.prepareNextScene($gameTemp._categoryShopSetting, goods);
            } else {
                __GInterpreter_command302.call(this);
            }
        }
        return true;
    };

    ////////////////////////////////////////////////////////////////////////////////////
        
    Window_Base.prototype.drawSynthesisStretchIcon = function(iconIndex, x, y) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        var n = this.contents.fontSize + 4;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, n, n);
    };
    
    Window_Base.prototype.drawSynthesisItemName = function(item, num, x, y, width) {
        width = width || 312;
        if (item) {
            var iconBoxWidth = this.contents.fontSize + 8;
            this.resetTextColor();
            this.drawSynthesisStretchIcon(item.iconIndex, x + 2, y + 4);
            var text = item.name;
            if (num > 1) text += 'x' + num;
            this.drawText(text, x + iconBoxWidth, y, width - iconBoxWidth);
        }
    };
    
    Window_Base.prototype.drawSynthesisHorzLine = function(y) {
        this.contents.fillRect(4, y, this.contentsWidth() - 8, 2, 'rgba(255,255,255,0.5)');
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    //並列処理でレシピの配列を作成
    var __SBase_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function() {
        __SBase_update.call(this);
        if ($gameTemp && !$gameTemp._allCheckedRecipes){
            $gameTemp.updateMakeRecipeArray();
        }
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    Game_Temp.prototype.updateMakeRecipeArray = function() {
        if (!this._recipeArray){
            this._recipeArray = [];
            this._allCheckedRecipes = false;
            this._recipeCheckIndex = 0;
        }
        for (var i=0;i<10;i++) {
            var item = null;
            if (this._recipeCheckIndex < 10000) {
                item = $dataItems[this._recipeCheckIndex];
                if (item) this.setRecipeArray('I', item);
            } else if (this._recipeCheckIndex < 20000){
                item = $dataWeapons[this._recipeCheckIndex - 10000];
                if (item) this.setRecipeArray('W', item);
            } else {
                item = $dataArmors[this._recipeCheckIndex - 20000];
                if (item) this.setRecipeArray('A', item);
            }
            this._recipeCheckIndex++;
            if (this._recipeCheckIndex === $dataItems.length) {
                this._recipeCheckIndex = 10000;
            } else if (this._recipeCheckIndex === $dataWeapons.length + 10000) {
                this._recipeCheckIndex = 20000;
            } else if (this._recipeCheckIndex === $dataArmors.length + 20000) {
                this._allCheckedRecipes = true;
            }
        }
    };

    Game_Temp.prototype.setRecipeArray = function(type, item) {
        if (DataManager.hasRecipe(item)) {
            var recipe = DataManager.itemRecipe(item);
            var l = 0;
            for (var i=0,max=recipe.recipe.length;i<max;i++) l += recipe.recipe[i][1];
            if (l > 0) {
                if (!this._recipeArray[l]) this._recipeArray[l] = [];
                this._recipeArray[l].push(type + item.id);
            }
        }
    };

    Game_Temp.prototype.recipeArray = function() {
        if (!this._allCheckedRecipes) {
            for (;;) {
                this.updateMakeRecipeArray();
                if (this._allCheckedRecipes) break;
            }
        }
        return this._recipeArray;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Party.prototype.setExRecipe = function(base, exItem) {
        if (!this._exRecipes) this._exRecipes = {};
        base = DataManager.encodeSynthesisItem(base);
        exItem = DataManager.encodeSynthesisItem(exItem);
        if (!this._exRecipes[base]) this._exRecipes[base] = [];
        if (this._exRecipes[base].indexOf(exItem) < 0) this._exRecipes[base].push(exItem);
        this._exRecipes[base].sort();
    };

    Game_Party.prototype.exRecipes = function(base) {
        if (!this._exRecipes) return null;
        base = DataManager.encodeSynthesisItem(base);
        return this._exRecipes[base];
    };

    Game_Party.prototype.isLearnedExRecipe = function(base, item) {
        var exRecipes = this.exRecipes(base);
        item = DataManager.encodeSynthesisItem(item);
        return exRecipes && exRecipes.indexOf(item) >= 0;
    };

    ////////////////////////////////////////////////////////////////////////////////////
    
    function Window_Recipe() {
        this.initialize.apply(this, arguments);
    }

    Window_Recipe.prototype = Object.create(Window_ShopBuy.prototype);
    Window_Recipe.prototype.constructor = Window_Recipe;

    Window_Recipe.prototype.initialize = function(x, y, h, recipes, name) {
        this._name = name;
        if (Imported['LimitPossession']) this._allWeight = $gameParty.allItemsWeight();
        Window_ShopBuy.prototype.initialize.call(this, x, y, h, recipes);
    };

    Window_Recipe.prototype.standardFontSize = function() {
        return 24;
    };

    Window_Recipe.prototype.maxPageRows = function() {
        return Window_ShopBuy.prototype.maxPageRows.call(this) - 1;
    };

    Window_Recipe.prototype.setCategory = function(category) {
        this._category = category;
        this.refresh();
    };

    Window_Recipe.prototype.windowWidth = function() {
        return 456;
    };

    Window_Recipe.prototype.itemRect = function(index) {
        var rect = Window_ShopBuy.prototype.itemRect.call(this, index);
        rect.y += 40;
        return rect;
    };

    Window_Recipe.prototype.makeItemList = function() {
        this._data = [];
        this._price = [];
        this._shopGoods.forEach(function(g){
            var item = DataManager.decodeSynthesisItem(g[0]);
            if (item && this.includes(item)){
                this._data.push(item);
                this._price.push(g[1]);
                if (!$gameTemp._callShopSynthesis) {
                    var exRecipes = $gameParty.exRecipes(item);
                    if (exRecipes) {
                        for (var i = 0, max = exRecipes.length; i < max; i++) {
                            var er = exRecipes[i];
                            if (this._shopGoods.filter(function(s){ return s[0] === er}).length === 0) {
                                var ei = DataManager.decodeSynthesisItem(er);
                                if (this._data.indexOf(ei) < 0) {
                                    this._data.push(ei);
                                    this._price.push(g[1]);
                                }
                            }
                        }
                    }
                }
            }
        }.bind(this));
    };

    Window_Recipe.prototype.refresh = function() {
        Window_ShopBuy.prototype.refresh.call(this);
        var name = this._name ? this._name : defaultSynthesisName;
        this.contents.fontSize = 20;
        this.drawText(name, 4, 0, this.contentsWidth() - 8);
        this.drawSynthesisHorzLine(28);
    };

    Window_Recipe.prototype.drawItem = function(index) {
        var item = this._data[index];
        var rect = this.itemRect(index);
        var priceWidth = 96;
        var recipe = DataManager.itemRecipe(item);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawSynthesisItemName(item, recipe.num, rect.x, rect.y, rect.width - priceWidth);
        if (this.price(item)) {
            this.drawText(this.price(item), rect.x + rect.width - priceWidth,
                rect.y, priceWidth, 'right');
        }
        this.changePaintOpacity(true);
    };

    Window_Recipe.prototype.includes = function(item) {
        if (this._category === '_item') return DataManager.isItem(item) && item.itypeId === 1;
        if (this._category === '_weapon') return DataManager.isWeapon(item);
        if (this._category === '_armor') return DataManager.isArmor(item);
        if (this._category === '_keyItem') return DataManager.isItem(item) && item.itypeId === 2;
        var categories = DataManager.itemSecondaryCategories(item);
        return categories.indexOf(this._category) >= 0;
    };

    Window_Recipe.prototype.isEnabled = function(item) {
        var result = (item && this.price(item) <= this._money && !$gameParty.hasMaxItems(item));
        result = result && this.checkEnableRecipe(DataManager.itemRecipe(item));
        if (Imported['LimitPossession']) {
            if ((this._allWeight + item._weight) > $gameParty.maxWeight()) return false;
        }
        return result;
    };

    Window_Recipe.prototype.checkEnableRecipe = function(recipe) {
        var ary = recipe.recipe;
        if (!$gameTemp._callShopSynthesis) ary = ary.concat(recipe.machinery);
        for (var i=0,max=ary.length;i<max;i++) {
            var m = ary[i];
            var item = null;
            if (DataManager.isSynthesisItem(m[0])) {
                item = DataManager.decodeSynthesisItem(m[0]);
                if ($gameParty.numItems(item) < m[1]) return false;
            } else {
                item = m[0];
                var n = $gameParty.allItems().reduce(function(r,it){
                    if (DataManager.itemSecondaryCategories(it).indexOf(item) >= 0) {
                        r += $gameParty.numItems(it);
                    }
                    return r;
                }.bind(this),0);
                if (n < m[1]) return false;
            }
        }
        return true;
    };

    Window_Recipe.prototype.currentPrice = function() {
        return this.price(this.item());
    };

    Window_Recipe.prototype.baseItem = function() {
        return Window_ShopBuy.prototype.item.call(this);
    };

    Window_Recipe.prototype.item = function() {
        var item = this.baseItem();
        if (!item) return item;
        var dummy = DataManager.itemRecipe(item).dummy;
        return dummy ? DataManager.decodeSynthesisItem(dummy) : item;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_SynthesisCategory() {
        this.initialize.apply(this, arguments);
    }

    Window_SynthesisCategory.prototype = Object.create(Window_HorzCommand.prototype);
    Window_SynthesisCategory.prototype.constructor = Window_SynthesisCategory;

    Window_SynthesisCategory.prototype.initialize = function(x, y, w) {
        this._width = w;
        Window_HorzCommand.prototype.initialize.call(this, x, y);
    };

    Window_SynthesisCategory.prototype.windowWidth = function() {
        return this._width;
    };

    Window_SynthesisCategory.prototype.setCategories = function(categories) {
        this._categories = categories;
        this.refresh();
    };

    Window_SynthesisCategory.prototype.setRecipeWindow = function(window) {
        this._recipeWindow = window;
    };

    Window_SynthesisCategory.prototype.maxCols = function() {
        if (this._categories && this._categories.length > 0) return this._categories.length;
        return 4;
    };

    Window_SynthesisCategory.prototype.category = function() {
        if (!this._categories) this._categories = [];
        if (this._categories.length > 0) {
            return this._categories[this.index()];
        } else {
            return this.currentSymbol();
        }
    };

    Window_SynthesisCategory.prototype.makeCommandList = function() {
        if (this._categories) {
            if (this._categories.length > 0) {
                for (var i=0,max=this._categories.length;i<max;i++) {
                    var name = this._categories[i];
                    this.addCommand(name, name);
                }
            } else {
                this.addCommand(TextManager.item,    '_item');
                this.addCommand(TextManager.weapon,  '_weapon');
                this.addCommand(TextManager.armor,   '_armor');
                this.addCommand(TextManager.keyItem, '_keyItem');
            }
        }
    };

    Window_SynthesisCategory.prototype.updateHelp = function() {
        Window_HorzCommand.prototype.updateHelp.call(this);
        if (this._recipeWindow) this._recipeWindow.setCategory(this.category());
    };

    ////////////////////////////////////////////////////////////////////////////////////
    
    function Window_SynthesisStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_SynthesisStatus.prototype = Object.create(Window_ShopStatus.prototype);
    Window_SynthesisStatus.prototype.constructor = Window_SynthesisStatus;

    Window_SynthesisStatus.prototype.initialize = function(x, y, width, height, picture) {
        this._picture = picture;
        Window_ShopStatus.prototype.initialize.call(this, x, y, width, height);
        this.createPictureSprite();
    };

    Window_SynthesisStatus.prototype.createPictureSprite = function() {
        if (this._picture) {
            if (!this._sprite) {
                var sprite = new Sprite();
                sprite.bitmap = ImageManager.loadPicture(this._picture);
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.x = Math.floor(this.width / 2);
                sprite.y = Math.floor(this.height / 2);
                this._sprite = sprite;
                this._windowSpriteContainer.addChildAt(this._sprite, 1);
            }
        }
    };

    Window_SynthesisStatus.prototype.setRecipeWindow = function(window) {
        this._recipeWindow = window;
    };

    Window_SynthesisStatus.prototype.standardFontSize = function() {
        return 24;
    };
    
    Window_SynthesisStatus.prototype.clearNumItems = function() {
        this._numItems = {};
    };

    Window_SynthesisStatus.prototype.refresh = function() {
        this.contents.clear();
        this.changePaintOpacity(true);
        this.resetFontSettings();
        var x = this.textPadding();
        var y = 0;
        var l = this.lineHeight();
        if (this._sprite) this._sprite.opacity = 255;
        if (this._item) {
            if (this._sprite) this._sprite.opacity = 64;
            this.drawPossession(x, y);
            y += l;
            if (Imported['LimitPossession']) {
                this.drawWeight(x, y);
                y += l;
            }
            this.drawSynthesisHorzLine(y-4);
            y += 8;
            var recipe = DataManager.itemRecipe(this._recipeWindow.baseItem());
            this.contents.fontSize = 20;
            l -= 8;
            if (!$gameTemp._callShopSynthesis) {
                for (var i = 0, max = recipe.machinery.length; i < max; i++) {
                    var item = recipe.machinery[i];
                    if (item && item[0]) {
                        var num = item[1];
                        item = item[0];
                        if (i === 0) {
                            this.changeTextColor(this.systemColor());
                            this.drawText(needMachineryName, 4, y, this.contentsWidth() - 8);
                            y += l;
                            this.drawSynthesisHorzLine(y);
                            y += 4;
                        }
                        this.changePaintOpacity(this.isEnable([item, num]));
                        item = DataManager.decodeSynthesisItem(item);
                        this.drawSynthesisItemName(item, 1, 24, y, this.contentsWidth());
                        y += l;
                    }
                }
                if (recipe.machinery.length > 0) y += 8;
            }
            this.changePaintOpacity(true);
            for (var i=0,max=recipe.recipe.length;i<max;i++) {
                var item = recipe.recipe[i];
                if (item) {
                    var num = item[1];
                    item = item[0];
                    if (i === 0) {
                        this.changeTextColor(this.systemColor());
                        this.drawText(needMaterialName, 4, y, this.contentsWidth() - 8);
                        y += l;
                        this.drawSynthesisHorzLine(y);
                        y += 4
                    }
                    if (DataManager.isSynthesisItem(item)) {
                        this.changePaintOpacity(this.isEnable([item, num]));
                        this.drawSynthesisItemName(DataManager.decodeSynthesisItem(item), 1, 24, y, this.contentsWidth() - 80);
                    } else {
                        this.changeTextColor(this.normalColor());
                        this.changePaintOpacity(this.isEnable([item, num]));
                        this.drawText('('+item+')', 24, y, this.contentsWidth() - 80);
                    }
                    this.drawItemNumber(item, num, 24, y, this.contentsWidth());
                    y += l;
                }
            }
        }
    };

    Window_SynthesisStatus.prototype.drawPossession = function(x, y) {
        var width = this.contents.width - this.textPadding() - x;
        var possessionWidth = this.textWidth('0000');
        var item = this._item;
        var recipe = DataManager.itemRecipe(item);
        if (recipe.dummy) item = DataManager.decodeSynthesisItem(recipe.dummy);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.possession, x, y, width - possessionWidth);
        this.resetTextColor();
        this.drawText($gameParty.numItems(item), x, y, width, 'right');
    };
    
    Window_SynthesisStatus.prototype.drawItemNumber = function(item, num, x, y, width) {
        var n = this.numItems(item);
        this.drawText(n, x, y, width - 68,'right');
        this.drawText('/', x, y, width - 52,'right');
        this.drawText(num, x, y, width - 24,'right');
    };
    
    Window_SynthesisStatus.prototype.numItems = function(item) {
        if (this._numItems && this._numItems[item]) return this._numItems[item];
        if (!this._numItems) this.clearNumItems();
        this._numItems[item] = 0;
        if (DataManager.isSynthesisItem(item)) {
            this._numItems[item] = $gameParty.numItems(DataManager.decodeSynthesisItem(item));
        } else {
            var n = $gameParty.allItems().reduce(function(r,it){
                var categories = DataManager.itemSecondaryCategories(it);
                if (categories.indexOf(item) >= 0 && DataManager.isMaterial(it)) {
                    r += $gameParty.numItems(it);
                }
                return r
            }.bind(this),0);
            this._numItems[item] = n;
        }
        return this._numItems[item];
    };

    Window_SynthesisStatus.prototype.isEnable = function(item) {
        return this.numItems(item[0]) >= item[1];
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    function Window_MaterialList() {
        this.initialize.apply(this, arguments);
    }

    Window_MaterialList.prototype = Object.create(Window_Selectable.prototype);
    Window_MaterialList.prototype.constructor = Window_MaterialList;
    
    Window_MaterialList.prototype.initialize = function(x, y, height) {
        this._synthesisNum = 1;
        Window_Selectable.prototype.initialize.call(this, x, y, this.windowWidth(), height);
    };
    
    Window_MaterialList.prototype.windowWidth = function() {
        return 456;
    };
    
    Window_MaterialList.prototype.standardFontSize = function() {
        return 24;
    };
    
    Window_MaterialList.prototype.maxPageRows = function() {
        return Window_Selectable.prototype.maxPageRows.call(this) - 2;
    };
    
    Window_MaterialList.prototype.maxItems = function() {
        if (this._recipe) {
           return this._needs.length;
        } else {
           return 1;
        }
    };

    Window_MaterialList.prototype.itemRect = function(index) {
        var rect = Window_Selectable.prototype.itemRect.call(this, index);
        rect.y += this.lineHeight() + 2;
        return rect;
    };
    
    Window_MaterialList.prototype.isCurrentItemEnabled = function() {
        return !DataManager.isSynthesisItem(this._needs[this.index()]);
    };
    
    Window_MaterialList.prototype.setEstimateWindow = function(window) {
        this._estimateWindow = window;
    };

    Window_MaterialList.prototype.setMaterialWindow = function(window) {
        this._materialWindow = window;
    };

    Window_MaterialList.prototype.setNumber = function(number) {
        this._synthesisNum = number;
        this.refresh();
    };

    Window_MaterialList.prototype.setRecipe = function(item) {
        this._recipe = DataManager.itemRecipe(item);
        this._needs = [];
        this._sets = [];
        var recipe = this._recipe.recipe;
        for (var i=0,max=recipe.length;i<max;i++) {
            var it = recipe[i];
            for (var j=0;j<it[1];j++) this._needs.push(it[0]);
        }
        this._estimateWindow.setNeeds(this._needs);
        this.autoSet();
        this.refresh();
        this._estimateWindow.setItem(item);
    };
    
    Window_MaterialList.prototype.autoSet = function() {
        for (var i=0,max=this._needs.length;i<max;i++) {
            var need = this._needs[i];
            if (DataManager.isSynthesisItem(need)) {
                this.setMaterial(i, DataManager.decodeSynthesisItem(need));
            } else {
                var items = $gameParty.allItems().filter(function(it){
                    return DataManager.itemSecondaryCategories(it).indexOf(need);
                }.bind(this));
                if (items.length === 1) this.setMaterial(i, items[0]);
            }
        }
        this._estimateWindow.setMaterials(this._sets);
    };

    Window_MaterialList.prototype.setCurrentMaterial = function (item) {
        this.setMaterial(this.index(), item);
        this._estimateWindow.setMaterials(this._sets);
    };
    
    Window_MaterialList.prototype.setMaterial = function(index, item) {
        this._sets[index] = item;
    };
    
    Window_MaterialList.prototype.refresh = function() {
        Window_Selectable.prototype.refresh.call(this);
        this.changePaintOpacity(true);
        this.contents.fontSize = 20;
        this.changeTextColor(this.systemColor());
        this.drawText(materialListText, 4, 0, this.contentsWidth()-8);
        this.drawSynthesisHorzLine(28);
        this.resetFontSettings();
    };
    
    Window_MaterialList.prototype.drawItem = function(index) {
        var rect = this.itemRect(index);
        var item = this._sets[index];
        if (item) {
            this.changePaintOpacity(true);
            this.drawSynthesisItemName(item, 1, 8, rect.y, rect.width - 16);
            var num = $gameParty.numItems(item);
            var l = this._sets.filter(function(s){ return s === item}).length;
            this.drawText(Math.floor(num / l), 0, rect.y, rect.width - 8, 'right');
            this.drawText('/', 0, rect.y, rect.width - 36, 'right');
            this.drawText(this._synthesisNum, 0, rect.y, rect.width - 52,'right');
        } else {
            this.changePaintOpacity(false);
            this.drawText('('+this._needs[index]+')',8, rect.y, rect.width - 16, 'center');
        }
    };

    Window_MaterialList.prototype.item = function() {
        if (this._sets[this.index()]) return this._sets[this.index()];
        return null;
    };

    Window_MaterialList.prototype.updateHelp = function() {
        this._helpWindow.clear();
        if (this.item()) this._helpWindow.setItem(this.item());
        if (this._materialWindow) this._materialWindow.setData(this._needs[this.index()], this._sets);
    };

    Window_MaterialList.prototype.isOkSynthesis = function() {
        return this._sets.filter(function(s){ return s }).length === this._needs.length;
    };

    Window_MaterialList.prototype.smoothSelect = function() {
        if (this._sets) {
            for (var i=0,max=this._needs.length;i<max;i++) {
                if (!this._sets[i]) {
                    this.select(i);
                    return;
                }
            }
        }
        this.select(0);
    };
    
    // rpg_core.js
    Window_MaterialList.prototype._refreshArrows = function() {
        Window_Selectable.prototype._refreshArrows.call(this);
        this._downArrowSprite.y -= 48;
        this._upArrowSprite.y += 40;
    };

    ////////////////////////////////////////////////////////////////////////////////////
    
    function Window_Estimate() {
        this.initialize.apply(this, arguments);
    }

    Window_Estimate.prototype = Object.create(Window_Base.prototype);
    Window_Estimate.prototype.constructor = Window_Estimate;
    
    Window_Estimate.prototype.initialize = function(x, y, width) {
        this._synthesisNum = 1;
        Window_Base.prototype.initialize.call(this, x, y, width, this.windowHeight());
    };
    
    Window_Estimate.prototype.windowHeight = function() {
        return 108;
    };
    
    Window_Estimate.prototype.standardFontSize = function() {
        return 24;
    };

    Window_Estimate.prototype.clear = function() {
        this._item = null;
        this._num = null;
        this._exItem = null;
        this._recipe = null;
        this._synthesisNum = 1;
    };

    Window_Estimate.prototype.setItem = function(item) {
        this._item = item;
        this._recipe = DataManager.itemRecipe(this._item);
        this._num = this._recipe.num;
        this.refresh();
    };

    Window_Estimate.prototype.setNeeds = function(needs) {
        this._needs = needs;
    };

    Window_Estimate.prototype.setNumber = function(number) {
        this._synthesisNum = number;
        this.refresh();
    };

    Window_Estimate.prototype.refresh = function() {
        this.contents.clear();
        this.resetFontSettings();
        if (this._item) {
            this.changePaintOpacity(true);
            this.contents.fontSize = 20;
            this.changeTextColor(this.systemColor());
            this.drawText(estimateText, 4, 0, this.contentsWidth());
            this.drawSynthesisHorzLine(28);
            this.resetFontSettings();
            this.changePaintOpacity(this.isSynthesizable());
            var item = this.item();
            if (this._exItem && !$gameParty.isLearnedExRecipe(this._item, this._exItem)) {
                var text = '';
                var chr = '？';
                for (var i=0,max=this.item().name.length + 1;i<max;i++) text += chr;
                this.drawText(text, 24, 40, this.contentsWidth() - 8);
            } else {
                this.drawSynthesisItemName(item, this.itemNumber(), 24, 40, this.contentsWidth() - 8);
            }
        }
    };

    Window_Estimate.prototype.isSynthesizable = function() {
        if (this._sets && this._needs) {
            var ms = this._sets.filter(function(m){ return m });
            if (ms.length === this._needs.length) {
                return true;
            }
        }
        return false;
    };

    Window_Estimate.prototype.setMaterials = function(sets) {
        this._sets = sets;
        this.refresh();
    };
    
    Window_Estimate.prototype.item = function() {
        if (this.isSynthesizable() && !$gameTemp._callShopSynthesis) this.checkItemChange();
        if (this._exItem) return this._exItem;
        if (this._recipe.dummy){
            return DataManager.decodeSynthesisItem(this._recipe.dummy);
        } else {
            return this._item;
        }
    };

    Window_Estimate.prototype.updateTone = function() {
        var tone = this._exItem ? changeRecipeTone : $gameSystem.windowTone();
        this.setTone(tone[0], tone[1], tone[2]);
    };
    
    Window_Estimate.prototype.itemNumber = function() {
        return Number(this._num ? this._num : 1) * this._synthesisNum;
    };

    Window_Estimate.prototype.checkItemChange = function() {
        var l = this._needs.length;
        var r = $gameTemp.recipeArray();
        var rn = r[l].filter(function(rr){
            var item = DataManager.decodeSynthesisItem(rr);
            var recipe = DataManager.itemRecipe(item);
            var r1 = recipe.recipe.reduce(function(rs,a){
                for(var i=0;i<a[1];i++) rs.push(a[0]);
                return rs;
            }.bind(this),[]);
            return this.checkMachinery(recipe) && this.checkRecipe(r1);
        }.bind(this));
        rn = rn.map(function(a){ return DataManager.decodeSynthesisItem(a) });
        rn.sort(function(a,b){
            var r1 = DataManager.itemRecipe(a);
            var r2 = DataManager.itemRecipe(b);
            return r1.priority - r2.priority;
        });
        if (rn[rn.length-1] !== this._item){
            this._exItem = rn[rn.length-1];
            this._num = DataManager.itemRecipe(this._exItem).num;
        } else {
            this._exItem = null;
            this._num = this._recipe.num;
        }
    };

    Window_Estimate.prototype.checkMachinery = function(recipe) {
        var m1 = this._recipe.machinery;
        var m2 = recipe.machinery;
        return String(m1.sort()) === String(m2.sort());
    };

    Window_Estimate.prototype.checkRecipe = function(ary) {
        var sets = this._sets.clone();
        for (var i=0,max=ary.length;i<max;i++) {
            if (DataManager.isSynthesisItem(ary[i])) {
                var index = sets.indexOf(DataManager.decodeSynthesisItem(ary[i]));
                if (index < 0) {
                    return false;
                } else {
                    sets[index] = null;
                    ary[i] = null;
                }
            } else {
                for (var j=0,jmax=sets.length;j<jmax;j++) {
                    if (sets[j]){
                        var sc = DataManager.itemSecondaryCategories(sets[j]);
                        if (sc.indexOf(ary[i]) < 0) {
                            return false;
                        } else {
                            sets[j] = null;
                            ary[i] = null;
                            break;
                        }
                    }
                }
            }
        }
        return true;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    function Window_Material() {
        this.initialize.apply(this, arguments);
    }

    Window_Material.prototype = Object.create(Window_Selectable.prototype);
    Window_Material.prototype.constructor = Window_Material;
    
    Window_Material.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    };

    Window_Material.prototype.standardFontSize = function() {
        return 24;
    };
    
    Window_Material.prototype.maxPageRows = function() {
        return Window_Selectable.prototype.maxPageRows.call(this) - 1;
    };

    Window_Material.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_Material.prototype.item = function() {
        return this._data[this.index()];
    };

    Window_Material.prototype.isEnabled = function(index) {
        return this.itemNumber(this._data[index]) > 0;
    };

    Window_Material.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.index());
    };

    Window_Material.prototype.setData = function(category, sets) {
        this._category = category;
        this._sets = sets;
        this._price = 0;
        this._number = 0;
        this.refresh();
    };

    Window_Material.prototype.setPrice = function(price) {
        this._price = price;
    };

    Window_Material.prototype.setNumber = function(number) {
        this._number = number;
        this.refresh();
    };

    Window_Material.prototype.makeItemList = function() {
        this._data = [];
        var items = $gameParty.allItems();
        for (var i=0,max=items.length;i<max;i++) {
            var item = items[i];
            if (this.includes(item)) this._data.push(item);
        }
    };

    Window_Material.prototype.includes = function(item) {
        if (!this._category) return false;
        if (!DataManager.isMaterial(item)) return false;
        if (DataManager.isItem(item) && item.itypeId > 2) return false;
        if (DataManager.itemSecondaryCategories(item).indexOf(this._category) >= 0) return true;
        if (DataManager.isSynthesisItem(this._category)) {
            return DataManager.decodeSynthesisItem(this._category) === item;
        }
        return false
    };
    
    Window_Material.prototype.itemRect = function(index) {
        var rect = Window_Selectable.prototype.itemRect.call(this, index);
        rect.y += this.lineHeight();
        return rect;
    };

    Window_Material.prototype.refresh = function() {
        this.contents.clear();
        this.resetFontSettings();
        if (this._category) {
            this.makeItemList();
            this.drawAllItems();
            this.changePaintOpacity(true);
            this.contents.fontSize = 20;
            //this.changeTextColor(this.systemColor());
            var name = this._category;
            if (DataManager.isSynthesisItem(name)) name = DataManager.decodeSynthesisItem(name).name;
            this.drawText(name, 4, 0, this.contentsWidth()-8);
            this.drawSynthesisHorzLine(28);
        } else {
            if (this._price && this._number) {
                this.changeTextColor(this.systemColor());
                this.drawText(synthesisPriceText, 0, 0, this.contentsWidth());
                this.changeTextColor(this.normalColor());
                this.drawText(this._price * this._number, 0, 0, this.contentsWidth() - 36, 'right');
                this.changeTextColor(this.systemColor());
                this.drawText(TextManager.currencyUnit, 0, 0, this.contentsWidth(), 'right');
            }
        }
    };

    Window_Material.prototype.drawItem = function(index) {
        var item = this._data[index];
        var rect = this.itemRect(index);
        rect.x += 8;
        rect.width -= 48;
        this.changePaintOpacity(this.isEnabled(index));
        this.drawSynthesisItemName(item, 1,rect.x, rect.y, rect.width);
        this.drawItemNumber(item, rect.x, rect.y, rect.width + 36, 'right');
    };

    Window_Material.prototype.drawItemNumber = function(item, x, y, width) {
        var num = this.itemNumber(item);
        this.drawText(':', x, y, width - this.textWidth('00'), 'right');
        this.drawText(num, x, y, width, 'right');
    };

    Window_Material.prototype.itemNumber = function(item) {
        var num = $gameParty.numItems(item);
        if (this._sets) {
            for (var i=0,max=this._sets.length;i<max;i++) {
                if (this._sets[i] === item) num--;
            }
        }
        return num;
    };

    Window_Material.prototype.updateHelp = function() {
        this.setHelpWindowItem(this.item());
    };

    Window_Material.prototype.smoothSelect = function() {
        for (var i=0,max=this._data.length;i<max;i++) {
            if (this.isEnabled(i)) {
                this.select(i);
                return;
            }
        }
        this.select(0);
    };

    ////////////////////////////////////////////////////////////////////////////////////
    
    function Window_SynthesisResult() {
        this.initialize.apply(this, arguments);
    }

    Window_SynthesisResult.prototype = Object.create(Window_Selectable.prototype);
    Window_SynthesisResult.prototype.constructor = Window_SynthesisResult;

    Window_SynthesisResult.prototype.initialize = function() {
        var w = this.windowWidth();
        var h = this.windowHeight();
        var x = Math.floor((Graphics.boxWidth / 2) - (w / 2));
        var y = Math.floor((Graphics.boxHeight / 2) - (h / 2));
        Window_Selectable.prototype.initialize.call(this, x, y, w, h);
    };

    Window_SynthesisResult.prototype.windowWidth = function() {
        return 360;
    };

    Window_SynthesisResult.prototype.windowHeight = function() {
        return 112;
    };

    Window_SynthesisResult.prototype.updateTone = function() {
        var tone = this._changed ? changeRecipeTone : $gameSystem.windowTone();
        this.setTone(tone[0], tone[1], tone[2]);
    };

    Window_SynthesisResult.prototype.setItemAndNumber = function(item, num, changed) {
        this._item = item;
        this._num = num;
        this._changed = changed;
        this.refresh();
    };

    Window_SynthesisResult.prototype.maxItems = function() {
        return 0;
    };

    Window_SynthesisResult.prototype.refresh = function () {
        this.contents.clear();
        if (this._item) {
            this.contents.fontSize = 20;
            this.changeTextColor(this.systemColor());
            this.drawText(synthesisResultText, 4, 0, this.contentsWidth());
            this.drawSynthesisHorzLine(28);
            this.contents.fontSize = 24;
            this.changeTextColor(this.normalColor);
            this.drawSynthesisItemName(this._item, this._num,24, 40, this.contentsWidth() - 8);
        }
    };

    Window_SynthesisResult.prototype.onTouch = function(triggered) {
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        if (this.isContentsArea(x, y)) this.processOk();
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_Synthesis() {
        this.initialize.apply(this, arguments);
    }

    Window_Synthesis.prototype = Object.create(Window_Selectable.prototype);
    Window_Synthesis.prototype.constructor = Window_Synthesis;

    Window_Synthesis.prototype.initialize = function(x, width) {
        var height = this.windowHeight();
        var y = Graphics.boxHeight - height;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.opacity = 0;
    };

    Window_Synthesis.prototype.clear = function() {
        this._num = 0;
        this._maxSynthesis = 0;
        this._maxBuy = 99;
    };

    Window_Synthesis.prototype.windowHeight = function() {
        return 72;
    };

    Window_Synthesis.prototype.standardFontSize = function() {
        return 24;
    };

    Window_Synthesis.prototype.setListWindow = function(window) {
        this._listWindow = window;
        this.clear();
    };

    Window_Synthesis.prototype.setEstimateWindow = function(window) {
        this._estimateWindow = window;
    };

    Window_Synthesis.prototype.setMaterialWindow = function(window) {
        this._materialWindow = window;
    };

    Window_Synthesis.prototype.setMaxBuy = function(maxBuy) {
        this._maxBuy = maxBuy;
    };

    Window_Synthesis.prototype.itemRect = function(index) {
        var rect = Window_Selectable.prototype.itemRect.call(this, index);
        rect.y += 6;
        return rect;
    };

    Window_Synthesis.prototype.refresh = function() {
        this.contents.clear();
        if (this._listWindow) {
            this.changePaintOpacity(true);
            var y = this.contentsHeight() - this.lineHeight();
            this.drawSynthesisHorzLine(y);
            this.changePaintOpacity(this._listWindow.isOkSynthesis() && this.isCurrentItemEnabled());
            this._maxSynthesis = 0;
            if (this.maxSynthesis() > 1) {
                var text = numberSynthesisText;
                text = text.replace(/_num/,this._num+1);
                this.drawText(text, 8, y + 4, this.contentsWidth() - 16, 'center');
            } else {
                this.drawText(synthesisText, 8, y + 4, this.contentsWidth() - 16, 'center');
            }
            this.resetFontSettings();
        }
    };

    Window_Synthesis.prototype.maxSynthesis = function() {
        if (!this._maxSynthesis) {
            var n = 0;
            for (var i = 0, max = this._listWindow._sets.length; i < max; i++) {
                var item = this._listWindow._sets[i];
                var num = $gameParty.numItems(item);
                var l = this._listWindow._sets.filter(function (s) { return s === item }).length;
                var nn = Math.floor(num / l);
                n = (n === 0 || n > nn) ? nn : n;
            }
            var item = this._estimateWindow.item();
            this._maxSynthesis = Math.min(Math.min(n, this._maxBuy),$gameParty.maxItems(item));
            if (this._maxSynthesis + $gameParty.numItems(item) > $gameParty.maxItems(item)) {
                this._maxSynthesis = $gameParty.maxItems(item) - $gameParty.numItems(item);
            }
        }
        return this._maxSynthesis;
    };

    Window_Synthesis.prototype.isCursorMovable = function() {
        return this.isOpenAndActive();
    };

    Window_Synthesis.prototype.processCursorMove = function() {
        if (this.isCursorMovable()) {
            if (Input.isTriggered('down')) {
                this.cursorDown(Input.isTriggered('down'));
            }
            if (Input.isTriggered('up')) {
                this.cursorUp(Input.isTriggered('up'));
            }
        }
    };

    Window_Synthesis.prototype.cursorUp = function(wrap) {
        if (this.maxSynthesis() > 1) {
            var num = (this._num + 1) % this.maxSynthesis();
            this.updateSynthesisNumber(num);
            SoundManager.playCursor();
        }
    };

    Window_Synthesis.prototype.cursorDown = function(wrap) {
        if (this.maxSynthesis() > 1) {
            var num = (this._num + (this.maxSynthesis() - 1)) % this.maxSynthesis();
            this.updateSynthesisNumber(num);
            SoundManager.playCursor();
        }
    };

    Window_Synthesis.prototype.onTouch = function(triggered) {
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                if (triggered && this.isTouchOkEnabled()) {
                    this.processOk();
                }
            }
        } else if (this._stayCount >= 15) {
            if (y < this.padding) {
                this.cursorUp();
            } else if (y >= this.height - this.padding) {
                this.cursorDown();
            }
            this._stayCount = 0;
        }
    };

    Window_Synthesis.prototype.hitTest = function(x, y) {
        if (this.isContentsArea(x, y)) return 0;
        return -1;
    };

    Window_Synthesis.prototype.updateSynthesisNumber = function(number) {
        this._num = number;
        this._listWindow.setNumber(number + 1);
        this._estimateWindow.setNumber(number + 1);
        this._materialWindow.setNumber(number + 1);
        this.refresh();

    };

    Window_Synthesis.prototype.processOk = function() {
        if (this.isCurrentItemEnabled()) {
            this.playSynthesisSound();
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    Window_Synthesis.prototype.playSynthesisSound = function() {
        var settings = synthesisSeSettings;
        var se = {name:synthesisSeName, volume:settings[0], pitch:settings[1], pan:settings[2] };
        AudioManager.playSe(se);
    };


    Window_Synthesis.prototype.isCurrentItemEnabled = function() {
        if (this.maxSynthesis() < 1) return false;
        return Window_Selectable.prototype.isCurrentItemEnabled.call(this);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Scene_CategorySynthesis() {
        this.initialize.apply(this, arguments);
    }

    Scene_CategorySynthesis.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_CategorySynthesis.prototype.constructor = Scene_CategorySynthesis;

    Scene_CategorySynthesis.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createGoldWindow();
        this.createCategoryWindow();
        this.createRecipeListWindow();
        this.createStatusWindow();
        this.createMaterialListWindow();
        this.createEstimateWindow();
        this.createMaterialWindow();
        this.createSynthesisWindow();
        this.createResultWindow();
        this._categoryWindow.setRecipeWindow(this._recipeWindow);
        this._recipeWindow.setStatusWindow(this._statusWindow);
        this._listWindow.setEstimateWindow(this._estimateWindow);
        this._listWindow.setMaterialWindow(this._materialWindow);
    };

    Scene_CategorySynthesis.prototype.setParameters = function(args) {
        var categories = defaultSynthesisCategories;
        var name = '';
        var picture = '';
        for (var i=0,max=args.length;i<max;i++) {
            var m = args[i].split(':');
            switch(m[0]) {
                case 'カテゴリ':
                case 'categories':
                    categories = m[1].split(',');
                    break;
                case '名前':
                case 'name':
                    name = m[1];
                    break;
                case 'ピクチャ':
                case 'picture':
                    picture = m[1];
                    break;
                default:
                    categories = m.split(',');
            }
        }
        this._categories = categories;
        this._name = name;
        this._picture = picture;
    };

    Scene_CategorySynthesis.prototype.prepare = function(args, goods) {
        this.setParameters(args);
        this.createRecipe(goods);
    };

    Scene_CategorySynthesis.prototype.createRecipe = function(goods) {
        this._recipes = [];
        if (goods) {
            for (var i=0,max=goods.length;i<max;i++) {
                var good = goods[i];
                var item = null;
                if (good[0] === 0){
                    item = 'I' + good[1];
                } else if (good[0] === 1) {
                    item = 'W' + good[1];
                } else if (good[0] === 2){
                    item = 'A' + good[1];
                }
                var price = good[2] ? good[3] : DataManager.decodeSynthesisItem(item).price;
                this._recipes.push([item,price]);
            }
        } else {
            var allItems = $gameParty.allItems();
            var ary = [];
            for (var i = 0, max = allItems.length; i < max; i++) {
                var item = allItems[i];
                if (DataManager.isRecipeBook(item)) {
                    var recipe = DataManager.publishedItemRecipes(item);
                    ary = ary.concat(recipe);
                }
            }
            for (var i=0,max=ary.length;i<max;i++) this._recipes[i] = [ary[i]];
        }
    };

    Scene_CategorySynthesis.prototype.createGoldWindow = function() {
        this._goldWindow = new Window_Gold(0, this._helpWindow.height);
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
        this.addWindow(this._goldWindow);
        if (!$gameTemp._callShopSynthesis) this._goldWindow.hide();
    };

    Scene_CategorySynthesis.prototype.createCategoryWindow = function() {
        var x = 0;
        var y = this._helpWindow.y + this._helpWindow.height;
        var w = Graphics.boxWidth - this._goldWindow.width;
        if (!$gameTemp._callShopSynthesis) w = Graphics.boxWidth;
        this._categoryWindow = new Window_SynthesisCategory(x, y, w);
        this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
        this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
        this._categoryWindow.setCategories(this._categories);
        this._categoryWindow.activate();
        this._categoryWindow.select(0);
        this._categoryWindow.setHelpWindow(this._helpWindow);
        this.addWindow(this._categoryWindow);
    };

    Scene_CategorySynthesis.prototype.createRecipeListWindow = function() {
        var x = 0;
        var y = this._categoryWindow.y + this._categoryWindow.height;
        var h = Graphics.boxHeight - y;
        this._recipeWindow = new Window_Recipe(x, y, h, this._recipes, this._name, this._price);
        this._recipeWindow.setHandler('ok', this.onRecipeOk.bind(this));
        this._recipeWindow.setHandler('cancel', this.onRecipeCancel.bind(this));
        this._recipeWindow.setCategory(this._categoryWindow.category());
        this._recipeWindow.deselect();
        this._recipeWindow.setHelpWindow(this._helpWindow);
        this._recipeWindow.setMoney(this.money());
        this.addWindow(this._recipeWindow);
    };

    Scene_CategorySynthesis.prototype.createStatusWindow = function() {
        var x = this._recipeWindow.x + this._recipeWindow.width;
        var y = this._recipeWindow.y;
        var w = Graphics.boxWidth - (this._recipeWindow.x + this._recipeWindow.width);
        var h = this._recipeWindow.height;
        this._statusWindow = new Window_SynthesisStatus(x,y,w,h,this._picture);
        this._statusWindow.setRecipeWindow(this._recipeWindow);
        this._windowLayer.addChildAt(this._statusWindow, 0);
    };

    Scene_CategorySynthesis.prototype.createMaterialListWindow = function() {
        var x = 0;
        var y = this._categoryWindow.y + this._categoryWindow.height;
        var height = Graphics.boxHeight - y;
        this._listWindow = new Window_MaterialList(x, y, height);
        this._listWindow.setHandler('ok', this.onListOk.bind(this));
        this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
        this._listWindow.setHelpWindow(this._helpWindow);
        this.addWindow(this._listWindow);
        this._listWindow.hide();
    };

    Scene_CategorySynthesis.prototype.createEstimateWindow = function() {
        var x = this._listWindow.x + this._listWindow.width;
        var y = this._listWindow.y;
        var width = Graphics.boxWidth - (this._listWindow.x + this._listWindow.width);
        this._estimateWindow = new Window_Estimate(x, y, width);
        this.addWindow(this._estimateWindow);
        this._estimateWindow.hide();
    };

    Scene_CategorySynthesis.prototype.createMaterialWindow = function() {
        var x = this._estimateWindow.x;
        var y = this._estimateWindow.y + this._estimateWindow.height;
        var width = this._estimateWindow.width;
        var height = Graphics.boxHeight - (this._estimateWindow.y + this._estimateWindow.height);
        this._materialWindow = new Window_Material(x, y, width ,height);
        this._materialWindow.setHandler('ok', this.onMaterialOk.bind(this));
        this._materialWindow.setHandler('cancel', this.onMaterialCancel.bind(this));
        this._materialWindow.setHelpWindow(this._helpWindow);
        this.addWindow(this._materialWindow);
        this._materialWindow.hide();
    };

    Scene_CategorySynthesis.prototype.createSynthesisWindow = function() {
        var x = 0;
        var width = this._listWindow.width;
        this._synthesisWindow = new Window_Synthesis(x, width);
        this._synthesisWindow.setHandler('ok', this.onSynthesisOk.bind(this));
        this._synthesisWindow.setHandler('cancel', this.onSynthesisCancel.bind(this));
        this._synthesisWindow.setListWindow(this._listWindow);
        this._synthesisWindow.setEstimateWindow(this._estimateWindow);
        this._synthesisWindow.setMaterialWindow(this._materialWindow);
        this._synthesisWindow.setHelpWindow(this._helpWindow);
        this.addChild(this._synthesisWindow);
        this._synthesisWindow.hide();
    };

    Scene_CategorySynthesis.prototype.createResultWindow = function() {
        this._resultWindow = new Window_SynthesisResult();
        this._resultWindow.setHandler('ok', this.onResultOk.bind(this));
        this._resultWindow.setHandler('cancel', this.onResultOk.bind(this));
        this.addChild(this._resultWindow);
        this._resultWindow.hide();
    };

    Scene_CategorySynthesis.prototype.popScene = function() {
        Scene_MenuBase.prototype.popScene.call(this);
        $gameTemp._callShopSynthesis = false;
        $gameTemp._categoryShopSetting = null;
    };

    Scene_CategorySynthesis.prototype.money = function() {
        return this._goldWindow.value();
    };

    Scene_CategorySynthesis.prototype.onCategoryOk = function() {
        this._categoryWindow.deactivate();
        this._recipeWindow.activate();
        this._recipeWindow.select(0);
        this._recipeWindow.setMoney(this.money());
    };

    Scene_CategorySynthesis.prototype.onRecipeOk = function() {
        this._recipeWindow.deactivate();
        this._recipeWindow.hide();
        this._statusWindow.hide();
        this._listWindow.setRecipe(this._recipeWindow.baseItem());
        this._listWindow.show();
        this._listWindow.activate();
        this._estimateWindow.show();
        this._materialWindow.show();
        this._synthesisWindow.show();
        this._synthesisWindow.refresh();
        if (this._listWindow.isOkSynthesis()) {
            this.activateSynthesis();
        } else {
            this._listWindow.smoothSelect();
        }
    };

    Scene_CategorySynthesis.prototype.onRecipeCancel = function() {
        this._recipeWindow.deactivate();
        this._recipeWindow.deselect();
        this._statusWindow._item = null;
        this._statusWindow.refresh();
        this._categoryWindow.activate();
        this._helpWindow.clear();
    };

    Scene_CategorySynthesis.prototype.onListOk = function() {
        this._listWindow.deactivate();
        this._materialWindow.activate();
        this._materialWindow.smoothSelect();
    };

    Scene_CategorySynthesis.prototype.onListCancel = function() {
        this._listWindow.deactivate();
        this._listWindow.deselect();
        this._recipeWindow.activate();
        this._recipeWindow.show();
        this._statusWindow.show();
        this._estimateWindow.hide();
        this._materialWindow.hide();
        this._listWindow.hide();
        this._estimateWindow.clear();
        this._synthesisWindow.hide();
    };

    Scene_CategorySynthesis.prototype.onMaterialOk = function() {
        this._listWindow.setCurrentMaterial(this._materialWindow.item());
        this._listWindow.refresh();
        this._listWindow.activate();
        this._listWindow.smoothSelect();
        this._materialWindow.deselect();
        this._materialWindow.deactivate();
        if (this._listWindow.isOkSynthesis()) this.activateSynthesis();
    };

    Scene_CategorySynthesis.prototype.onMaterialCancel = function() {
        this._materialWindow.deselect();
        this._materialWindow.deactivate();
        this._listWindow.activate();
    };
    
    Scene_CategorySynthesis.prototype.onSynthesisOk = function() {
        var item = this._estimateWindow.item();
        var num = this._estimateWindow.itemNumber();
        var changed = !!this._estimateWindow._exItem;
        this._resultWindow.setItemAndNumber(item, num, changed);
        this.doSynthesis();
        this._resultWindow.show();
        this._resultWindow.activate();
        this._synthesisWindow.deactivate();
        this._synthesisWindow.deselect();
    };
    
    Scene_CategorySynthesis.prototype.onSynthesisCancel = function() {
        this._listWindow.activate();
        this._listWindow.select(0);
        this._synthesisWindow.deactivate();
        this._synthesisWindow.deselect();
        this._synthesisWindow.updateSynthesisNumber(0);
    };

    Scene_CategorySynthesis.prototype.onResultOk = function() {
        this._estimateWindow.clear();
        this._listWindow.setNumber(1);
        this._synthesisWindow.clear();
        this._resultWindow.hide();
        this._resultWindow.deactivate();
        this._listWindow.hide();
        this._estimateWindow.hide();
        this._materialWindow.hide();
        this._recipeWindow.show();
        this._recipeWindow.refresh();
        this._recipeWindow.activate();
        this._statusWindow.show();
        this._statusWindow.refresh();
        this._synthesisWindow.hide();
    };

    Scene_CategorySynthesis.prototype.activateSynthesis = function() {
        this._synthesisWindow.setMaxBuy(this.maxBuy());
        this._synthesisWindow.refresh();
        this._synthesisWindow.activate();
        this._synthesisWindow.select(0);
        this._listWindow.deactivate();
        this._listWindow.deselect();
        this._materialWindow._category = null;
        this._materialWindow.setPrice(this._recipeWindow.currentPrice());
        this._materialWindow.setNumber(1);
        this._materialWindow.refresh();
        //this._helpWindow.clear();
        if (synthesisHelp && this._synthesisWindow.maxSynthesis() > 1){
            this._synthesisWindow._helpWindow.setText(synthesisHelp);
        }
    };
    
    Scene_CategorySynthesis.prototype.doSynthesis = function() {
        var num = this._estimateWindow._synthesisNum;
        for (var i=0,max=this._listWindow._sets.length;i<max;i++) {
            var item = this._listWindow._sets[i];
            $gameParty.loseItem(item, num);
        }
        $gameParty.gainItem(this._estimateWindow.item(), this._estimateWindow.itemNumber());
        if (this._recipeWindow.currentPrice()) $gameParty.loseGold(this._recipeWindow.currentPrice() * num);
        this._goldWindow.refresh();
        this._recipeWindow.setMoney(this.money());
        this._statusWindow._numItems = null;
        if (this._estimateWindow._exItem) {
            var item = this._recipeWindow.item();
            $gameParty.setExRecipe(item, this._estimateWindow._exItem);
        }
    };

    Scene_CategorySynthesis.prototype.maxBuy = function() {
        var item = this._estimateWindow.item();
        var max = $gameParty.maxItems(item) - $gameParty.numItems(item);
        var price = this._recipeWindow.currentPrice();
        if (price > 0) {
            return Math.min(max, Math.floor(this.money() / price));
        } else {
            return max;
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());