//
//  戦闘中装備変更 ver1.00
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
Imported['ChangeEquipBattle'] = 1.00;
/*:
 * @plugindesc ver1.00/戦闘中に装備を変更するコマンドを追加します。
 * @author Yana
 *
 * @param AddBattleEquip
 * @desc アクターコマンドに装備コマンドを追加するかの設定です。
 * true/falseで指定してください。
 * @default true
 *
 * @param EquipSkillTypeId
 * @desc 装備変更と同期させるスキルタイプで、この名称が使用されます。
 * このスキルタイプが封印されていると装備変更ができません。
 * @default 6
 *
 * @param BattleChangeableEquipTypes
 * @desc 戦闘中に装備変更可能な部位です。
 * 装備タイプを,で区切って指定してください。
 * @default 1,2
 *
 * @help ------------------------------------------------------
 * プラグインコマンド
 * ------------------------------------------------------
 * このプラグインには、プラグインコマンドはありません。
 * ------------------------------------------------------
 * 使い方
 * ------------------------------------------------------
 *
 * プラグインを導入し、プラグインパラメータでAddBattleEquipをtrueに設定すると動作します。
 *
 * ※注意
 * BattleLayout-SaGaと併用する場合は、こちらを上に配置してください。
 * EquipAndShopStatusRと併用する場合は、こちらを下に配置してください。
 *
 * ・メモを使った設定
 * 特徴を持ったオブジェクトのメモに
 * <戦闘中装備変更可能:○,○,○…>
 * <ChangeableBattleEquip:○,○,○…>
 * のいずれかを記述すると、その特徴を持っているアクターは○,○,○…の装備タイプの
 * 装備を装備変更可能になります。
 * この際、プラグインパラメータ―の設定よりも、こちらの設定が優先されます。
 *
 * 同じように、
 * <戦闘中装備変更不可:○,○,○…>
 * <UnchangeableBattleEquip:○,○,○…>
 * のいずれかを記述すると、その特徴を持っているアクターは○,○,○…の装備タイプの
 * 装備を装備変更不可になります。
 * この際、プラグインパラメータの設定よりも、こちらの設定が優先されます。
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
 * ver1.00:
 * 公開
 */

(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('ChangeEquipBattle');
    var addBattleEquip = parameters['AddBattleEquip'] === 'true';
    var equipSkillTypeId = Number(parameters['EquipSkillTypeId']);
    var battleChangeableEquipTypes = parameters['BattleChangeableEquipTypes'].split(',').map(function(a){return Number(a)});

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.battleEquippableTrait = function(item) {
        if (item._battleEquippableEtype) return item._battleEquippableEtype;
        item._battleEquippableEtype = [];
        if (item.meta['戦闘中装備変更可能']){
            item._battleEquippableEtype = item.meta['戦闘中装備変更可能'].split(',').map(function(n){return Number(n)});
        } else if (item.meta['ChangeableBattleEquip']){
            item._battleEquippableEtype = item.meta['ChangeableBattleEquip'].split(',').map(function(n){return Number(n)});
        }
        return item._battleEquippableEtype;
    };

    DataManager.battleUnequippableTrait = function(item) {
        if (item._battleUnequippableEtype) return item._battleUnequippableEtype;
        item._battleUnequippableEtype = [];
        if (item.meta['戦闘中装備変更不可']){
            item._battleUnequippableEtype = item.meta['戦闘中装備変更不可'].split(',').map(function(n){return Number(n)});
        } else if ( item.meta['UnchangeableBattleEquip']) {
            item._battleUnequippableEtype = item.meta['UnchangeableBattleEquip'].split(',').map(function(n){return Number(n)});
        }
        return item._battleUnequippableEtype;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Actor.prototype.isAddEquipCommand = function() {
        return addBattleEquip && !this.isSkillTypeSealed(equipSkillTypeId);
    };

    Game_Actor.prototype.isBattleEquippable = function(index) {
        var etype = this.equipSlots()[index];
        var result = battleChangeableEquipTypes.contains(etype);
        var tos = this.traitObjects();
        for (var i=0,max=tos.length;i<max;i++) {
            var to = tos[i];
            if ( DataManager.battleEquippableTrait(to).contains(etype)) result = true;
            if ( DataManager.battleUnequippableTrait(to).contains(etype)) result = false;
        }
        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WEStatus_changePage = Window_EquipStatus.prototype.changePage;
    Window_EquipStatus.prototype.changePage = function() {
        if (!$gameParty.inBattle()) __WEStatus_changePage.call(this);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WESlot_isEnabled = Window_EquipSlot.prototype.isEnabled;
    Window_EquipSlot.prototype.isEnabled = function(index) {
        var result = __WESlot_isEnabled.call(this, index);
        if (this._actor && $gameParty.inBattle()) {
            return result && this._actor.isBattleEquippable(index)
        }
        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WACommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
    Window_ActorCommand.prototype.makeCommandList = function() {
        __WACommand_makeCommandList.call(this);
        if (this._actor) this.addEquipCommand();
    };

    Window_ActorCommand.prototype.addEquipCommand = function() {
        if (this._actor.isAddEquipCommand()) {
            this.addCommand($dataSystem.skillTypes[equipSkillTypeId], 'equip', true);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SBattle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        __SBattle_createAllWindows.call(this);
        this.createEquipStatusWindow();
        this.createEquipSlotWindow();
        this.createEquipItemWindow();
        this._activeEquip = false;
    };

    var __SBattle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function() {
        __SBattle_createActorCommandWindow.call(this);
        this._actorCommandWindow.setHandler('equip', this.commandEquip.bind(this));
    };

    var __SBattle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
    Scene_Battle.prototype.changeInputWindow = function() {
        if (!this._activeEquip) __SBattle_changeInputWindow.call(this);
    };

    Scene_Battle.prototype.commandEquip = function() {
        var actor = BattleManager.actor();
        this._eStatusWindow.setActor(actor);
        this._eSlotWindow.setActor(actor);
        this._eItemWindow.setActor(actor);
        this._eStatusWindow.open();
        this._eSlotWindow.open();
        this._eItemWindow.open();
        this._helpWindow.show();
        this._actorCommandWindow.deactivate();
        this._eSlotWindow.activate();
        this._eSlotWindow.select(0);
        this._activeEquip = true;
    };

    Scene_Battle.prototype.createEquipStatusWindow = function() {
        this._eStatusWindow = new Window_EquipStatus(0, this._helpWindow.height);
        this._eStatusWindow._pageIndex = 0;
        this.addWindow(this._eStatusWindow);
        this._eStatusWindow.openness = 0;
    };

    Scene_Battle.prototype.createEquipSlotWindow = function() {
        var wx = this._eStatusWindow.width;
        var wy = this._helpWindow.y + this._helpWindow.height;
        var ww = Graphics.boxWidth - this._eStatusWindow.width;
        var wh = Number(PluginManager.parameters('EquipAndShopStatusR')['Slot Height']) || this._eStatusWindow.height;
        this._eSlotWindow = new Window_EquipSlot(wx, wy, ww, wh);
        this._eSlotWindow.setHelpWindow(this._helpWindow);
        this._eSlotWindow.setStatusWindow(this._eStatusWindow);
        this._eSlotWindow.setHandler('ok',     this.onSlotOk.bind(this));
        this._eSlotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
        this._eSlotWindow.setHandler('release',  this.onSlotRelease.bind(this));
        this._eSlotWindow.setHandler('right',    this.eNextPage.bind(this));
        this._eSlotWindow.setHandler('left',     this.ePrevPage.bind(this));
        this.addWindow(this._eSlotWindow);
        this._eSlotWindow.openness = 0;
        this._eSlotWindow.deactivate();
    };

    Scene_Battle.prototype.createEquipItemWindow = function() {
        var wx = Imported['EquipAndShopStatusR'] ? this._eSlotWindow.x : 0;
        var wy = this._eSlotWindow.y + this._eSlotWindow.height;
        var ww = Imported['EquipAndShopStatusR'] ? this._eSlotWindow.width : Graphics.boxWidth;
        var wh = Graphics.boxHeight - wy;
        this._eItemWindow = new Window_EquipItem(wx, wy, ww, wh);
        this._eItemWindow.setHelpWindow(this._helpWindow);
        this._eItemWindow.setStatusWindow(this._eStatusWindow);
        this._eItemWindow.setHandler('ok',   this.onEItemOk.bind(this));
        this._eItemWindow.setHandler('cancel', this.onEItemCancel.bind(this));
        this._eItemWindow.setHandler('right',  this.eNextPage.bind(this));
        this._eItemWindow.setHandler('left',   this.ePrevPage.bind(this));
        this._eSlotWindow.setItemWindow(this._eItemWindow);
        this.addWindow(this._eItemWindow);
        this._eItemWindow.openness = 0;
    };

    Scene_Battle.prototype.onSlotOk = function() {
        this._eItemWindow.activate();
        this._eItemWindow.select(0);
        this._eStatusWindow._pageIndex = 0;
        this._eStatusWindow.refresh();
    };

    Scene_Battle.prototype.onSlotCancel = function() {
        this._eStatusWindow.close();
        this._eSlotWindow.close();
        this._eItemWindow.close();
        this._helpWindow.hide();
        this._eStatusWindow._pageIndex = 0;
        this._actorCommandWindow.activate();
        this._eSlotWindow.deactivate();
        this._activeEquip = false;
        if (BattleManager.actor().isAutoBattle()) {
            BattleManager.actor().makeAutoBattleActions();
            this.selectNextCommand();
        }
    };

    Scene_Battle.prototype.onSlotRelease = function() {
        SoundManager.playEquip();
        var actor = BattleManager.actor();
        actor.changeEquip(this._eSlotWindow.index(), null);
        this._eSlotWindow.activate();
        this._eSlotWindow.refresh();
        this._eItemWindow.deselect();
        this._eItemWindow.refresh();
        this._eStatusWindow.refresh();
    };

    Scene_Battle.prototype.eNextPage = function() {
        this._eStatusWindow.nextPage();
    };

    Scene_Battle.prototype.ePrevPage = function() {
        this._eStatusWindow.prevPage();
    };

    Scene_Battle.prototype.onEItemOk = function() {
        SoundManager.playEquip();
        var actor = BattleManager.actor();
        actor.changeEquip(this._eSlotWindow.index(), this._eItemWindow.item());
        this._eSlotWindow.activate();
        this._eSlotWindow.refresh();
        this._eItemWindow.deselect();
        this._eItemWindow.refresh();
        this._eStatusWindow.refresh();
    };

    Scene_Battle.prototype.onEItemCancel = function() {
        this._eSlotWindow.activate();
        this._eItemWindow.deselect();
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());