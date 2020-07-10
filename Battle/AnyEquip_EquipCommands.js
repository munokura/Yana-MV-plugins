//
//  なんでも装備&装備コマンド ver1.07
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
Imported['AnyEquip_EquipCommands'] = 1.07;
/*:
 * @plugindesc ver1.07/アイテムを装備しないと使えないなど、サガっぽい装備システムとコマンドを実装します。
 * @author Yana
 *
 *
 * @param SlotSize
 * @desc 装備スロットの装備数です。
 * @type number
 * @default 10
 *
 * @param ItemEquipType
 * @desc アイテムとして扱う装備タイプです。
 * @type number
 * @default 6
 *
 * @param MultipleEquipType
 * @desc 複数装備可能な装備タイプです。
 * @default 1,5,6
 *
 * @param UnequipText
 * @desc 装備していないスロットに表示するテキストです。
 * @default -----------------------
 *
 * @param HideSkillType
 * @desc アクターコマンドに表示しないスキルタイプです。
 * @default
 *
 * @help ------------------------------------------------------
 * プラグインについて
 * ------------------------------------------------------
 * このプラグインは以下の機能があります。
 * ・装備タイプの枠を取り払い、好きな箇所に好きな装備を付けられるようにします。
 * ・アイテムを装備しないと使えなくします。
 * ・複数の武器を装備した状態に対応したアクターコマンドの改変を行います。
 * ・武器スキルとして、使用条件に武器タイプが設定されているスキルを、
 *   設定されたタイプの武器の下にコマンドとして追加します。
 *   この際、そのスキルのスキルタイプが追加されているかは考慮されません。
 * ・このプラグインを導入すると、通常の攻撃のコマンドは武器を選択せずに攻撃した
 *   状態となります。
 * ・複数装備可能な武器及び防具は、それぞれのパラメータが全て加算されます。
 * ・したがって、武器の差別化を行う場合、D値などのプラグインを別途導入して計算式を
 *   それに合わせて調整するか、その武器選択時に使用されるスキルを変更する等の仕組み
 *   が必要です。(攻撃スキルの変更はこのプラグインで可能です)
 *
 * ※注意※
 * このプラグインはBattleLayout-SaGa専用の追加プラグインです。
 * 使用する場合は必ず、BattleLayout-SaGaを導入したうえで、それより下に配置してください。
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * ――メモを使った設定――
 * 武器または防具のメモに
 * <バックパック>
 * または、
 * <Backpack>
 * と記述すると、それを装備しているアクターは自由にアイテムが使用できるようになります。
 *
 * 武器のメモに
 * <武器コマンド:○[,○,○…]>
 * または、
 * <WeaponCommand:○[,○,○…]>
 * と記述すると、その武器のコマンド一覧に○で指定したスキルまたはアイテムが追加されます。
 * この際、○にはBattleLayout-SaGaのコマンド用キーワードに従って記述してください。
 *
 * 武器のメモに、
 * <通常攻撃スキル:○>
 * または、
 * <AttackSkill:○>
 * と記述すると、その武器で攻撃した際のスキルを○番に設定します。
 *
 * スキルのメモに
 * <使用可能タグ:xxx>
 * または、
 * <UsableTag:xxx>
 * と記述すると、そのスキルは<xxx>をメモに持つ武器でしか使用できなくなります。
 * xxxは任意のテキストです。
 * これは、一つの武器タイプの中で、さらに特定の武器でしか使用できないようなスキルを
 * 実装するための仕組みです。(剣スキルの中でも刀でしか使用できない刀技など)
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
 * ver1.07:190212
 * HideSkillTypeが空欄の時、攻撃や防御などのスキルがコマンドに表示されなくなるバグを修正
 * ver1.06:190102
 * 戦闘中のみ使用可能なアイテムが装備できなかったバグを修正
 * HideSkillTypeの設定が正常に機能していなかったバグを修正
 * ver1.05:180917
 * 武器に付与されている特徴が、戦闘中はその武器を使用している時以外に発生しないように変更
 * 指定したスロットに初期装備を行うタグを追加
 * スロットをロックして装備変更ができないようにするタグを追加
 * ver1.041:171018
 * プラグインパラメータの仕様を1.5.0に更新。
 * ver1.04:170920
 * 行動不能に陥ると、装備していたアイテムが解除されるバグを修正
 * ver1.03:170415
 * アイテムがなくなっても使用できていたバグを修正
 * 所持数が0になるアイテムが装備できないバグを修正
 * ver1.02:170414
 * 初期化時にアイテムに装備タイプが正常に付与されていないバグを修正
 * 装備封印、装備固定が正常に動作していなかったバグを修正
 * ver1.01:
 * アイテムを装備した状態でセーブデータをロードした時、エラーが発生するバグを修正
 * 戦闘中に使用できないアイテムが装備できないように修正
 * ver1.00:
 * 公開
 */


(function() {

    'use strict';

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('AnyEquip_EquipCommands');
    var slotSize = Number(parameters['SlotSize']);
    var itemEquipType = Number(parameters['ItemEquipType']);
    var multipleEquipType = parameters['MultipleEquipType'].split(',').map(function(n){return Number(n)});
    var unequipText = parameters['UnequipText'];
    var hideSkillType = parameters['HideSkillType'].split(",").map(function(n){return Number(n)});

    ////////////////////////////////////////////////////////////////////////////////////

    var __DManager_extractMetadata = DataManager.extractMetadata;
    DataManager.extractMetadata = function(data) {
        __DManager_extractMetadata.call(this, data);
        if (data.effects && data.message1 === undefined) {
            if (!data.traits) data.traits = [];
            if (!data.params) data.params = [0,0,0,0,0,0,0,0];
            if (data.etypeId === undefined) data.etypeId = itemEquipType;
        }
    };

    DataManager.decodeItemData = function(key) {
        var type = key[0];
        var id = Number(key.replace(/[IWA]/i,''));
        var item = null;
        if (type === 'I') item = $dataItems[id];
        if (type === 'W') item = $dataWeapons[id];
        if (type === 'A') item = $dataArmors[id];
        return item;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Item.prototype.setEquipEx = function(type, itemId) {
        this._dataClass = type === 'W' ? 'weapon' : (type === 'A' ? 'armor' : 'item');
        this._itemId = itemId;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GBBase_meetsItemConditions = Game_BattlerBase.prototype.meetsItemConditions;
    Game_BattlerBase.prototype.meetsItemConditions = function(item) {
        return __GBBase_meetsItemConditions.call(this, item) ||
            (this.meetsUsableItemConditions(item) && $gameParty.hasEquip(item) && $gameParty.inBattle());
    };

    var __GBBase_canEquip = Game_BattlerBase.prototype.canEquip;
    Game_BattlerBase.prototype.canEquip = function(item) {
        if (!item) return false;
        var result = __GBBase_canEquip.call(this, item);
        if (result) return true;
        if (DataManager.isItem(item) && (item.occasion === 0 || item.occasion === 1)) return true;
        return false;
    };

    // エイリアス ただし、実質再定義 二刀流のシステムを無効化する
    var __GBBase_isDualWield = Game_BattlerBase.prototype.isDualWield;
    Game_BattlerBase.prototype.isDualWield = function() {
        if (this._callInitEquip) return __GBBase_isDualWield.call(this);
        return false;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GBattler_consumeItem = Game_Battler.prototype.consumeItem;
    Game_Battler.prototype.consumeItem = function(item) {
        if (DataManager.isItem(item) && item.consumable && $gameParty.inBattle()) {
            for (var i=0,max=this.equips().length;i<max;i++) {
                if (item === this.equips()[i]) {
                    this.changeEquip(i,null);
                    break;
                }
            }
        }
        __GBattler_consumeItem.call(this, item);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GActor_initEquips = Game_Actor.prototype.initEquips;
    Game_Actor.prototype.initEquips = function(equips) {
        this._callInitEquip = true;
        __GActor_initEquips.call(this, equips);
        for (var i=0;i<slotSize;i++) {
            if (!equips[i]){
                this._equips[i] = new Game_Item();
                this._equipSlots[i] = 0;
            }
            var s1 = this.actor().meta["初期装備変更スロット"+(i+1)];
            var s2 = this.actor().meta["ChangeInitEquipSlot"+(i+1)];
            if (s1){
                var item = DataManager.decodeItemData(s1);
                this._equipSlots[i] = item.etypeId;
                this._equips[i].setEquipEx(s1[0], item.id);
            } else if (s2) {
                var item = DataManager.decodeItemData(s2);
                this._equipSlots[i] = item.etypeId;
                this._equips[i].setEquipEx(s2[0], item.id);
            }
        }
        this._callInitEquip = false;
    };

    var __GActor_equipSlots = Game_Actor.prototype.equipSlots;
    Game_Actor.prototype.equipSlots = function() {
        if (this._equipSlots) return this._equipSlots;
        var slots = __GActor_equipSlots.call(this);
        for (var i=0;i<slotSize;i++){ if (slots[i] === undefined) slots.push(0) }
        this._equipSlots = slots;
        return this._equipSlots;
    };

    var __GActor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        this._equipSlots[slotId] = item ? item.etypeId : 0;
        __GActor_changeEquip.call(this, slotId, item);
    };

    var __GActor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
    Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
        this._equipSlots[slotId] = item ? item.etypeId : 0;
        __GActor_forceChangeEquip.call(this, slotId, item);
    };

    Game_Actor.prototype.equipItems = function() {
        return this.equips().filter(function(item) {
            return item && DataManager.isItem(item);
        });
    };

    Game_Actor.prototype.isEquipBackpack = function() {
        for (var i=0,max=this.equips().length;i<max;i++) {
            var item = this.equips()[i];
            if (item && (item.meta['Backpack'] || item.meta['バックパック'])) {
                return true;
            }
        }
        return false;
    };

    /*
    var __GActor_equips = Game_Actor.prototype.equips;
    Game_Actor.prototype.equips = function() {
        var equips = __GActor_equips.call(this);
        if ($gameParty.inBattle()){
            equips = equips.filter(function(item){
                return item && !DataManager.isWeapon(item);
            });
            if (this._weaponPage && this._weaponPage > 1000 ) {
                var weapon = $dataWeapons[this._weaponPage - 1000];
                equips = equips.concat(weapon);
            }
        }
        return equips;
    };
    */
    var __GActor_traitObjects = Game_Actor.prototype.traitObjects;
    Game_Actor.prototype.traitObjects = function() {
        var objects = __GActor_traitObjects.call(this);
        if ($gameParty.inBattle() && this._weaponPage !== null){
            objects = objects.filter(function(item){
                return item && !item.wtypeId;
            });
            if (this._weaponPage && this._weaponPage > 1000 ) {
                var weapon = $dataWeapons[this._weaponPage - 1000];
                objects = objects.concat(weapon);
            }
        }
        return objects;
    };

    var __GActor_weapons = Game_Actor.prototype.weapons;
    Game_Actor.prototype.weapons = function() {
        var weapons = __GActor_weapons.call(this);
        if (!$gameParty.inBattle()) return weapons;
        if (this._weaponPage && this._weaponPage > 1000) {
            return [$dataWeapons[this._weaponPage - 1000]];
        } else if (this._weaponPage === 0){
            return [];
        } else {
            return weapons;
        }
    };

    Game_Actor.prototype.weaponCommands = function(weapon) {
        var cmd = [];
        if (!weapon) return cmd;
        if (weapon.meta['武器コマンド']) cmd = cmd.concat(weapon.meta['武器コマンド'].split(','));
        cmd = cmd.filter(function(x,i,self){ return self.indexOf(x) === i });
        return cmd;
    };

    Game_Actor.prototype.weaponCond = function(skill, weapon){
        var tag = null;
        if (skill.meta['使用可能タグ']) tag = skill.meta['使用可能タグ'];
        if (skill.meta['UsableTag']) tag = skill.meta['UsableTag'];
        if (!tag) return true;
        return weapon.meta[tag];
    };

    Game_Actor.prototype.isUsableItem = function(item) {
        return this.isEquipBackpack() || this.equipItems().contains(item);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Party.prototype.hasEquip = function(item) {
        for (var i=0,max=$gameParty.members().length;i<max;i++) {
            var actor = $gameParty.members()[i];
            if (actor.isUsableItem(item)) return true;
        }
        return false;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義　フォントを少し小さく
    Window_EquipSlot.prototype.standardFontSize = function() {
        return 22;
    };

    // 再定義　装備タイプの表示を削除
    Window_EquipSlot.prototype.drawItem = function(index) {
        if (this._actor) {
            var rect = this.itemRectForText(index);
            //this.changeTextColor(this.systemColor());
            this.changePaintOpacity(this.isEnabled(index));
            //this.drawText(this.slotName(index), rect.x, rect.y, 138, this.lineHeight());
            if (this._actor.equips()[index]) {
                this.drawItemName(this._actor.equips()[index], rect.x, rect.y);
            } else {
                this.drawText(unequipText,rect.x,rect.y,(this.contentsWidth()-16),'center');
            }
            this.changePaintOpacity(true);
        }
    };

    // 再定義
    Window_EquipSlot.prototype.isEnabled = function(index) {
        return this._actor ? !this.isLockSlot(index) && !this._actor.isEquipTypeLocked(this._actor.equipSlots()[index]) : false;
    };

    Window_EquipSlot.prototype.isLockSlot = function(index) {
        var id = index + 1;
        var actor = this._actor.actor();
        return actor.meta["スロットロック" + id] || actor.meta["SlotLock" + id];
    };

    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義　フォントを少し小さく
    Window_EquipItem.prototype.standardFontSize = function() {
        return 22;
    };

    // 再定義
    Window_EquipItem.prototype.includes = function(item) {
        if (item === null) return true;
        if (item.occasion === 2 || item.occasion === 3) return false;
        if (DataManager.isItem(item) && !item.etypeId) item.etypeId = itemEquipType;
        if (!this._actor) return false;
        if (item.etypeId === itemEquipType && this._actor.isEquipTypeSealed(itemEquipType)) return false;
        if (!multipleEquipType.contains(item.etypeId) &&
            item.etypeId !== this._actor.equipSlots()[this._slotId] &&
            this._actor.equipSlots().contains(item.etypeId)) {
            return false;
        }
        return this._actor.canEquip(item);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WACommand_setup = Window_ActorCommand.prototype.setup;
    Window_ActorCommand.prototype.setup = function(actor) {
        actor._weaponPage = null;
        __WACommand_setup.call(this, actor);
    };

    var __WACommand_select = Window_ActorCommand.prototype.select;
    Window_ActorCommand.prototype.select = function(index) {
        if (this._actor) this._actor._weaponPage = this.skillTypes()[this._subIndex];
        __WACommand_select.call(this, index);
    };

    var __WACommand_makeItemCommands = Window_ActorCommand.prototype.makeItemCommands;
    Window_ActorCommand.prototype.makeItemCommands = function() {
        if (this._actor.isEquipBackpack()) return __WACommand_makeItemCommands.call(this);
        var list = [];
        var items = this._actor.equipItems();
        items.forEach(function (item) {
            if (item && $gameParty.canUse(item) && !list.contains(item)) {
                list.push(item);
            }
        }.bind(this));
        return list;
    };

    var __WACommand_drawItemNumber = Window_ActorCommand.prototype.drawItemNumber;
    Window_ActorCommand.prototype.drawItemNumber = function(item, x, y, width) {
        if (this._actor.isEquipBackpack()) {
            __WACommand_drawItemNumber.call(this, item, x, y, width);
        } else {
            if (this.needsNumber()) {
                var size = this._actor.equipItems().filter(function (ei) {
                    return ei === item
                }).length;
                this.drawText(':', x, y, width - this.textWidth('00'), 'right');
                this.drawText(size, x, y, width, 'right');
            }
        }
    };

    var __WACommand_skillTypes = Window_ActorCommand.prototype.skillTypes;
    Window_ActorCommand.prototype.skillTypes = function() {
        var isInitialized = !!this._skillTypes;
        var results = __WACommand_skillTypes.call(this);
        if (!isInitialized) {
            var ary = [];
            for (var i = 0, max = this._actor.weapons().length; i < max; i++) {
                var weapon = this._actor.weapons()[i];
                ary.push(weapon.id + 1000);
            }
            this._skillTypes = ary.concat(this._skillTypes);
            this._skillTypes = this._skillTypes.filter(function (r) {
                return r === 0 || !hideSkillType.contains(r)
            });
            results = this._skillTypes;
        }
        return results;
    };

    var __WACommand_makeCommands = Window_ActorCommand.prototype.makeCommands;
    Window_ActorCommand.prototype.makeCommands = function(index) {
        if (this._commands && this._commands[index]) {
            return __WACommand_makeCommands.call(this, index);
        } else {
            var type = this.skillTypes()[index];
            if (type > 1000) {
                var commands = this.makeWeaponCommands(type);
                this._commands[index] = commands;
                return this._commands[index];
            } else {
                return __WACommand_makeCommands.call(this, index);
            }
        }
    };

    Window_ActorCommand.prototype.makeWeaponCommands = function(type) {
        var list = [];
        var weapon = $dataWeapons[type - 1000];
        list.push(weapon);
        list = list.concat(this._actor.weaponCommands(weapon));
        var skills = this._actor.skills();
        for (var i = 0, max = skills.length; i < max; i++) {
            var skill = skills[i];
            if (skill.requiredWtypeId1 === weapon.wtypeId ||
                skill.requiredWtypeId2 === weapon.wtypeId) {
                if (this._actor.weaponCond(skill, weapon)) list.push(skill);
            }
        }
        return list
    };

    var __WACommand_canItem = Window_ActorCommand.prototype.canItem;
    Window_ActorCommand.prototype.canItem = function() {
        if (this._actor.isEquipBackpack()) {
            return __WACommand_canItem.call(this);
        } else {
            return this._actor.equipItems().length > 0;
        }
    };

    var __WACommand_canUseItem = Window_ActorCommand.prototype.canUseItem;
    Window_ActorCommand.prototype.canUseItem = function(item) {
        return __WACommand_canUseItem.call(this, item) && this._actor.isUsableItem(item);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SEquip_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function() {
        __SEquip_create.call(this);
        this._commandWindow.deactivate();
        this.commandEquip();
    };

    var __SEquip_createCommandWindow = Scene_Equip.prototype.createCommandWindow;
    Scene_Equip.prototype.createCommandWindow = function() {
        __SEquip_createCommandWindow.call(this);
        this._commandWindow.hide();
    };

    ////////////////////////////////////////////////////////////////////////////////////

    if (!Imported['EquipAndShopStatusR']) {

        var _WEquipSlot_processHandling = Window_EquipSlot.prototype.processHandling;
        Window_EquipSlot.prototype.processHandling = function() {
            if (this.isOpenAndActive() && Input.isTriggered('shift')){
                this.processRelease();
            } else {
                _WEquipSlot_processHandling.call(this);
            }
        };

        Window_EquipSlot.prototype.processRelease = function() {
            this.callHandler('release');
        };

        // 再定義
        Scene_Equip.prototype.createSlotWindow = function () {
            var wx = this._statusWindow.width;
            var wy = this._commandWindow.y;// + this._commandWindow.height;
            var ww = Graphics.boxWidth - this._statusWindow.width;
            var wh = this._statusWindow.height;// - this._commandWindow.height;
            this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
            this._slotWindow.setHelpWindow(this._helpWindow);
            this._slotWindow.setStatusWindow(this._statusWindow);
            this._slotWindow.setHandler('ok', this.onSlotOk.bind(this));
            this._slotWindow.setHandler('release',  this.onSlotRelease.bind(this));
            //this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
            this._slotWindow.setHandler('clear', this.commandClear.bind(this));
            this._slotWindow.setHandler('cancel', this.popScene.bind(this));
            this._slotWindow.setHandler('pagedown', this.nextActor.bind(this));
            this._slotWindow.setHandler('pageup', this.previousActor.bind(this));
            this.addWindow(this._slotWindow);
        };

        var __SEquip_onActorChange = Scene_Equip.prototype.onActorChange;
        Scene_Equip.prototype.onActorChange = function () {
            __SEquip_onActorChange.call(this);
            this._commandWindow.deactivate();
            this.commandEquip();
        };

        Scene_Equip.prototype.onSlotRelease = function() {
            SoundManager.playEquip();
            this.actor().changeEquip(this._slotWindow.index(), null);
            this._slotWindow.activate();
            this._slotWindow.refresh();
            this._itemWindow.deselect();
            this._itemWindow.refresh();
            this._statusWindow.refresh();
        };

    } else {
        Scene_Equip.prototype.createSlotWindow = function() {
            var wx = this._statusWindow.width;
            var wy = this._commandWindow.y;
            var ww = Graphics.boxWidth - this._statusWindow.width;
            var wh = Number(PluginManager.parameters('EquipAndShopStatusR')['Slot Height'] || 288);
            this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
            this._slotWindow.setHelpWindow(this._helpWindow);
            this._slotWindow.setStatusWindow(this._statusWindow);
            this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
            this._slotWindow.setHandler('cancel',   this.popScene.bind(this));
            this._slotWindow.setHandler('release',  this.onSlotRelease.bind(this));
            this._slotWindow.setHandler('pagedown', this.nextActor.bind(this));
            this._slotWindow.setHandler('pageup',   this.previousActor.bind(this));
            this._slotWindow.setHandler('right',	this.nextPage.bind(this));
            this._slotWindow.setHandler('left',	   	this.prevPage.bind(this));
            this.addWindow(this._slotWindow);
        };

        var _SEquip_nextActor = Scene_Equip.prototype.nextActor;
        Scene_Equip.prototype.nextActor = function() {
            _SEquip_nextActor.call(this);
            this._commandWindow.deactivate();
            this.commandEquip();
        };

        var _SEquip_previousActor = Scene_Equip.prototype.previousActor;
        Scene_Equip.prototype.previousActor = function() {
            _SEquip_previousActor.call(this);
            this._commandWindow.deactivate();
            this.commandEquip();
        };
    }
}());


