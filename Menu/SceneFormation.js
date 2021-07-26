//  並び替えシーン ver1.094
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

/**
 * deprecated. 余計な記述のため、次のメジャーバージョンアップで削除する
 */
var Imported = Imported || {};
Imported['SceneFormation'] = 1.094;

/*:
 * @plugindesc ver1.094/並び替えシーンを追加します。
 * @author Yana
 *
 * @param Stand Members Size
 * @text 待機メンバー最大数
 * @desc 待機メンバーの最大数です。
 * 11を超えると、ウィンドウが2行になります。
 * @default 8
 * @type number
 *
 * @param Max Battle Members Size
 * @text 最大戦闘メンバー人数
 * @desc 最大戦闘メンバー人数です。
 * 3人以下や、5人以上にも設定できます。
 * @default 4
 * @type number
 *
 * @param Use Menu Formation Scene
 * @text 並び替えシーン置換
 * @desc メニューの並び替えの項目を、並び替えシーンに
 * 置き換えるかどうかの設定です。true/falseで設定してください。
 * @default true
 * @type boolean
 *
 * @param Formation Scene Battle Name
 * @text 戦闘メンバーのラベル
 * @desc 戦闘メンバーの上に表示されるテキストです。
 * @default 戦闘メンバー
 *
 * @param Formation Scene Stand Name
 * @text 待機メンバーのラベル
 * @desc 待機メンバーの上に表示されるテキストです。
 * @default 待機メンバー
 *
 * @param Use Battle Formation Switch ID
 * @text 戦闘中並び替えスイッチID
 * @desc 戦闘時にパーティコマンドに並び替えの項目の
 * 追加を許可を設定するスイッチのIDです。
 * @default 20
 * @type switch
 *
 * @param Battle Command Formation
 * @text パーティコマンド表示コマンド
 * @desc 戦闘時にパーティコマンドに追加される
 * 並び替えの項目のテキストです。
 * @default 戦闘メンバー編成
 *
 * @param Status Window Font Size
 * @text フォントサイズ
 * @desc ステータスウィンドウの文字サイズです。
 * @default 24
 * @type number
 *
 * @param Status Block Width
 * @text パラメータ表示幅
 * @desc ステータスウィンドウのパラメータ表示部の横幅です。
 * @default 372
 * @type number
 *
 * @help ------------------------------------------------------
 * プラグインコマンド
 * ------------------------------------------------------
 * ※スペースは必ず半角で入力してください。
 * 
 * ・並び替えシーンを呼び出します。
 * 並び替えシーン 呼び出し
 * SceneFormation call
 * 
 * ・ID番のアクターの並びを固定します。
 * 並び替えシーン 固定 ID
 * SceneFormation fixed ID
 * 
 * ・ID番のアクターの並びの固定を解除します。
 * 並び替えシーン 固定解除 ID
 * SceneFormation unpin ID
 * 
 * ・全アクターの並びを固定します。
 * 並び替えシーン 全固定
 * SceneFormation all_fixed
 * 
 * ・ID番のアクターの並びを固定します。
 * 並び替えシーン 全固定解除
 * SceneFormation all_unpin
 *
 * ・最大戦闘参加人数を変更します。
 * 最大戦闘参加人数変更 人数
 * MaxBattleMembersSize number
 * ※戦闘中は変更できません！
 *
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.094:210725
 * 大規模リファクタ by Dark Plasma
 * ver1.093:200516
 * 表示部にパッチを受けられるようWindow_FormationStatusをグローバル化。
 * by Dark Plasma
 * ついでにプラグインパラメータの表示部分を日本語化 by munokura
 * ver1.092:200326
 * RPGアツマールのタッチでキャンセルに対応修正。by ponpokoneruson
 * ver1.091:180410
 * プラグインパラメータの仕様を1.5.0に更新。
 * ver1.09:170228
 * 最大戦闘参加人数を変更するプラグインコマンドを追加。
 * ver1.08:170105
 * パーティが最大人数-1の時にアクター加入時の動作が正常でなかったバグを修正。
 * ver1.07:
 * Use Menu Formation Sceneをfalseにするとエラーが発生するバグを修正。
 * ver1.06:
 * パラメータ表示部の幅を設定する項目を追加。
 * 全体の文字サイズを設定する項目を追加。
 * ウィンドウ外の領域をクリックすることで、
 * キャンセルとして働くように機能を追加。
 * このプラグインより下に入れたプラグインで
 * 右クリックが正常に動作しないことのあるバグを修正。
 * サイドビューで戦闘中に人数の増減を行った場合、正常に表示されないバグを修正。
 * ver1.05:
 * Window_FormationのcheckBltがloadFaceしていたバグを修正。
 * 待機メンバーで空白を選択した後、
 * 戦闘メンバーの最後のアクターを選択できないバグを修正。
 * ver1.04:
 * Window_FormationNameがWindow_Selectableのinitializeを呼んでいたバグを修正。
 * ver1.03:
 * 戦闘中、並び替えがアクティブでない時もクリックが可能だったバグを修正。
 * ver1.02:
 * Stand Members SizeとMax Battle Members Sizeが
 * 正常に動作していなかったバグを修正。
 * 空欄を選択して空欄で決定するとエラーが発生するバグを修正。
 * ver1.01:
 * addActorが正常に動作していなかったバグを修正。
 * ver1.00:
 * 公開
 */

(function () {
    'use strict';

    const parameters = PluginManager.parameters('SceneFormation');
    const standMembersSize = Number(parameters['Stand Members Size'] || 11);
    const maxBattleMembersSize = Number(parameters['Max Battle Members Size'] || 4);
    const useMenuFormationScene = String(parameters['Use Menu Formation Scene'] || true) == 'true';
    const formationSceneBattleName = String(parameters['Formation Scene Battle Name'] || '戦闘メンバー');
    const formationSceneStandName = String(parameters['Formation Scene Stand Name'] || '待機メンバー');
    const useBattleFormationSwitchId = String(parameters['Use Battle Formation Switch ID'] || 11);
    const battleFormationText = String(parameters['Battle Command Formation'] || 'Formation');
    const statusWindowFontSize = Number(parameters['Status Window Font Size'] || 24);
    const statusBlockWidth = Number(parameters['Status Block Width'] || 372);

    const _Form_GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        if (command === '並び替えシーン' || command === 'SceneFormation') {
            switch (args[0]) {
                case '呼び出し':
                case 'call':
                    this.callSceneFormation();
                    break;
                case '固定':
                case 'fixed':
                    $gameActors.actor(Number(args[1])).fixFormation();
                    break;
                case '固定解除':
                case 'unpin':
                    $gameActors.actor(Number(args[1])).unfixFormation();
                    break;
                case '全固定':
                case 'all_fixed':
                    $gameParty.allMembers.forEach(function (actor) { actor.fixFormation(); });
                    break;
                case '全固定解除':
                case 'all_unpin':
                    $gameParty.allMembers.forEach(function (actor) { actor.unfixFormation(); });
                    break;
            }
        } else if (command === '最大戦闘参加人数変更' || command === 'ChangeMaxBattleMembersSize') {
            if (!$gameParty.inBattle()) $gameParty.setMaxBattleMembersSize(Number(args[0]));
        } else {
            _Form_GInterpreter_pluginCommand.call(this, command, args);
        }
    };

    Game_Interpreter.prototype.callSceneFormation = function () {
        SceneManager.push(Scene_Formation);
    };

    const TAIL_OF_BATTLE_MEMBER = -1;
    const TAIL_OF_STANDING_MEMBER = -2;

    const FORMATION_WINDOW_TYPE_BATTLE = 'battle';
    const FORMATION_WINDOW_TYPE_STAND = 'stand';

    class Window_Formation extends Window_Selectable {
        initialize(type, x, y) {
            this.refreshMembers();
            super.initialize(x, y, this.windowWidth(), this.windowHeight());
            this._lockIndex = null;
            this.refresh();
        }

        windowWidth() {
            return 0;
        }

        windowHeight() {
            return 60 * this.maxPageRows() + 32;
        }

        standardPadding() {
            return 12;
        }

        maxRows() {
            return 0;
        }

        spacing() {
            return 0;
        }

        contentsWidth() {
            return this.maxCols() * this.itemWidth();
        }

        contentsHeight() {
            return Math.ceil((this.maxItems() / this.colItemNum())) * this.itemHeight();
        }

        isTopIndex() {
            return this._index < this.maxCols();
        }

        colItemNum() {
            return Math.floor((this.width - this.standardPadding()) / this.itemWidth());
        }

        itemRect(index) {
            return new Rectangle(
                (index % this.maxCols()) * (this.itemWidth() + this.spacing()),
                9 + (Math.floor(index / this.maxCols()) - this.topRow()) * this.itemHeight(),
                48, 48
            );
        }

        itemWidth() {
            return 60;
        }

        itemHeight() {
            return 66;
        }

        maxRows() {
            return 0;
        }

        maxCols() {
            return Math.ceil((this.width - (this.standardPadding() * 2)) / this.itemWidth());
        }

        maxItems() {
            return 0;
        }

        maxPageRows() {
            return 0;
        }

        maxPageItems() {
            return this.maxPageRows() * this.maxCols();
        }

        /**
         * @param {Window_FormationStatus} statusWindow ステータスウィンドウ
         */
        setStatusWindow(statusWindow) {
            this._statusWindow = statusWindow;
        }

        /**
         * @param {Function} method scopeIndex取得関数
         */
        setScopeIndexMethod(method) {
            this._getScopeIndex = method;
        }

        scopeIndex() {
            return this._getScopeIndex ? this._getScopeIndex() : null;
        }

        select(index) {
            const result = super.select(index);
            if (this._statusWindow && this.active) {
                this._statusWindow.setActor(this._members[index]);
            }
            return result;
        }

        /**
         * 戦闘メンバーに1人以上生存者がいるか
         * @return {boolean}
         */
        isAliveOk() {
            return $gameParty.aliveBattleMembers().length > 1;
        }

        isCurrentItemEnabled() {
            const scopeIndex = this.scopeIndex();
            /**
             * すでに空欄を選択済みの場合、更に空欄を選択できない
             */
            if (scopeIndex < 0 && !this.actor()) { return false; }
            /**
             * 並び替え固定アクターは選択できない
             */
            if (this.actor() && this.actor().isFixed()) { return false; }
            if (!this.isAliveOk()) {
                const isActorDead = !this.actor() || !this.actor().isAlive();
                /**
                 * 戦闘メンバーに生存者がいない場合、2回目は生存アクターを選択しなければならない
                 */
                if (scopeIndex !== null && isActorDead) { return false; }
                /**
                 * 戦闘メンバーに生存者がいない場合、1回目は生存アクターまたは前衛を選択しなければならない
                 */
                if (scopeIndex === null) {
                    if (isActorDead && !this.isBattlerWindow()) { return false; }
                }
            }
            return true;
        }

        isBattlerWindow() {
            return false;
        }

        refreshMembers() { }

        size() {
            return this._members.length;
        }

        /**
         * @return {Game_Actor[]}
         */
        battleMembers() {
            return $gameParty.battleMembers();
        }

        refresh() {
            this.refreshMembers();
            this.createContents();
            this.checkBlt();
            this._setRefresh = true;
        }

        refreshContents() {
            super.refresh();
        }

        drawItem(index) {
            const x = this.itemWidth() * Math.floor((index % this.maxCols()));
            const y = 12 + this.itemHeight() * (Math.floor((index / this.maxCols())) - this.topRow());
            if (index == this._lockIndex) {
                this.contents.fillRect(x, y - 3, 48, 48, 'rgba(0,0,0,0.5)')
            }
            if (this._members[index]) {
                if (this._members[index].isFixed()) {
                    this.contents.fillRect(x, y - 3, 48, 48, 'rgba(128,0,0,0.5)')
                }
                this.drawActorCharacter(this._members[index], x + 24, y + 44);
            } else {
                this.drawText('-', x, y, 48, 'center');
            }
        }

        checkBlt() {
            const bitmap2 = new Bitmap(1, 1);
            $gameParty.allMembers().forEach(function (actor) {
                const bitmap = ImageManager.loadCharacter(actor.characterName());
                bitmap2.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
            });
        }

        update() {
            super.update();
            if (this._setRefresh) {
                if (ImageManager.isReady()) {
                    this.refreshContents();
                    this._setRefresh = false;
                } else {
                    this.checkBlt();
                }
            }
        }

        /**
         * @return {Game_Actor}
         */
        actor() {
            return this._members[this._index];
        }

        lockIndex() {
            this._lockIndex = this._index;
            this.refresh();
        }

        releaseIndex() {
            this._lockIndex = null;
            this.refresh();
        }

        onTouch(triggered) {
            if ($gameParty.inBattle() && !BattleManager.isFormationMode()) { return false; }
            const x = this.canvasToLocalX(TouchInput.x);
            const y = this.canvasToLocalY(TouchInput.y);
            const hitIndex = this.hitTest(x, y);
            if (hitIndex >= 0) {
                if (!this.active) {
                    this.activate();
                    this.callHandler(this.onTouchHandlerName());
                }
                this.select(hitIndex);
                if (triggered && this.isTouchOkEnabled()) {
                    this.processOk();
                }
            }
        }

        processTouch() {
            if (!this.isOpen()) { return; }
            if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
                this._touching = true;
                this.onTouch(true);
            } else if (TouchInput.isCancelled()) {
                if (this.isCancelEnabled()) {
                    this.processCancel();
                }
            }
            if (this._touching) {
                if (TouchInput.isPressed()) {
                    this.onTouch(false);
                } else {
                    this._touching = false;
                }
            }
        }

        hitTest(x, y) {
            if (this.isContentsArea(x, y)) {
                const cx = x - this.padding;
                const cy = y - this.padding;
                const topIndex = this.topIndex();
                return [...Array(this.maxPageItems()).keys()].map(i => i + topIndex).find(index => {
                    if (index < this.maxItems()) {
                        const rect = this.itemRect(index);
                        const right = rect.x + rect.width;
                        const bottom = rect.y + rect.height;
                        if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
                            return true;
                        }
                    }
                });
            }
            return -1;
        }
    }

    class Window_FormationBattler extends Window_Formation {
        windowWidth() {
            return 60 * $gameParty.fullMemberSize() + 24;
        }

        maxRows() {
            return 1;
        }

        maxItems() {
            return Math.min(this.size() + 1, $gameParty.fullMemberSize());
        }

        maxPageRows() {
            return 1;
        }

        processHandling() {
            if (this.isOpenAndActive()) {
                if (Input.isTriggered('shift')) {
                    this.processRelease();
                } else if (Input.isTriggered('down')) {
                    this.processDown();
                } else {
                    super.processHandling();
                }
            }
        }

        processRelease() {
            if (this.size() > 1 && this.actor() && !this.actor().isFixed() && (this.isAliveOk() || !this.actor().isAlive())) {
                SoundManager.playOk();
                this.updateInputData();
                this.callReleaseHandler();
            } else {
                SoundManager.playBuzzer();
            }
        }

        processDown() {
            SoundManager.playCursor();
            this.updateInputData();
            this.callHandler('down');
        }

        callReleaseHandler() {
            this.updateInputData();
            this.callHandler('release');
        }

        isBattlerWindow() {
            return true;
        }

        refreshMembers() {
            this._members = this.battleMembers();
        }

        onTouchHandlerName() {
            return 'standOff';
        }
    }

    class Window_FormationStander extends Window_Formation {
        windowWidth() {
            return Math.min(standMembersSize * 60 + this.standardPadding() * 2, Graphics.boxWidth - 196);
        }

        maxRows() {
            return Math.ceil(this.maxItems() / 10);
        }

        maxItems() {
            return this.size() + 1;
        }

        maxPageRows() {
            return Math.min(Math.ceil(standMembersSize / 10), 2);
        }

        processHandling() {
            if (this.isOpenAndActive()) {
                if (Input.isTriggered('shift')) {
                    this.processAdd();
                } else {
                    super.processHandling();
                }
            }
        }

        processAdd() {
            const canAdd = ($gameParty.allMembers().length - this.size()) < $gameParty.fullMemberSize();
            if (canAdd && this.actor() && !this.actor().isFixed()) {
                SoundManager.playOk();
                this.updateInputData();
                this.callAddHandler();
            } else {
                SoundManager.playBuzzer();
            }
        }

        processUp() {
            this.updateInputData();
            this.callHandler('up');
        }

        cursorUp(wrap) {
            if (this.isTopIndex()) {
                return this.processUp();
            }
            super.cursorUp(wrap);
        }

        callAddHandler() {
            this.updateInputData();
            this.callHandler('add');
        }

        refreshMembers() {
            this._members = $gameParty.standMembers();
        }

        onTouchHandlerName() {
            return 'battleOff';
        }
    }

    class Window_FormationStatus extends Window_Base {
        initialize() {
            super.initialize(0, Graphics.boxHeight - 240, Graphics.boxWidth, 240);
            this._actor = null;
        }

        setActor(actor) {
            if (this._actor !== actor) {
                this._actor = actor;
                this.refresh();
            }
        }

        standardPadding() {
            return 8;
        }

        refresh() {
            this._setRefresh = true;
            this.checkBlt();
        }

        update() {
            super.update();
            if (this._setRefresh) {
                if (ImageManager.isReady()) {
                    this.refreshContents();
                    this._setRefresh = false;
                } else {
                    this.checkBlt();
                }
            }
        }

        checkBlt() {
            const bitmap2 = new Bitmap(1, 1);
            $gameParty.allMembers().forEach(function (actor) {
                const bitmap = ImageManager.loadFace(actor.faceName());
                bitmap2.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
            });
        }

        refreshContents() {
            this.contents.clear();
            if (this._actor) {
                this.contents.fontSize = statusWindowFontSize;
                this.drawActorFace(this._actor, 12, 32);
                this.drawActorName(this._actor, 6, 0);
                this.drawActorLevel(this._actor, 144, 0);
                this.drawActorClass(this._actor, 280, 0);
                this.drawActorNickname(this._actor, 420, 0);
                this.drawActorIcons(this._actor, 6, 32);
                this.drawActorHp(this._actor, 6, 144, 160);
                this.drawActorMp(this._actor, 6, 180, 160);
                this.drawParameters(172, 40);
                this.drawExpInfo(172, 144);
                this.drawEquipments(180 + statusBlockWidth, 32);
                this.resetFontSettings();
            }
        }

        drawParameters(x, y) {
            const blockWidth = statusBlockWidth / 2 - 6;
            const paramWidth = blockWidth / 3;
            [...Array(6).keys()].forEach(index => {
                const paramId = index + 2;
                const y2 = y + 32 * (index % 3);
                const x2 = x + Math.floor(index / 3) * blockWidth;
                this.changeTextColor(this.systemColor());
                this.drawText(TextManager.param(paramId), x2 + (12 * Math.floor(index / 3)), y2, paramWidth * 2);
                this.resetTextColor();
                this.drawText(this._actor.param(paramId), x2 + paramWidth * 2 + (12 * Math.floor(index / 3)), y2, paramWidth, 'right');
            });
        }

        drawExpInfo(x, y) {
            const lineHeight = this.lineHeight();
            const expTotal = TextManager.expTotal.format(TextManager.exp);
            const expNext = TextManager.expNext.format(TextManager.level);
            const value1 = this._actor.currentExp();
            const value2 = this._actor.nextRequiredExp();
            if (this._actor.isMaxLevel()) {
                value1 = '-------';
                value2 = '-------';
            }
            this.changeTextColor(this.systemColor());
            this.drawText(expTotal, x, y + lineHeight * 0, statusBlockWidth);
            this.drawText(expNext, x, y + lineHeight * 1, statusBlockWidth);
            this.resetTextColor();
            this.drawText(value1, x, y + lineHeight * 0, statusBlockWidth, 'right');
            this.drawText(value2, x, y + lineHeight * 1, statusBlockWidth, 'right');
        }

        drawEquipments(x, y) {
            const equips = this._actor.equips();
            const count = Math.min(equips.length, this.maxEquipmentLines());
            const width = this.width - this.standardPadding() * 2 - x - 4;
            equips.slice(0, count).forEach((equip, i) => {
                this.drawItemName(equip, x, y + this.lineHeight() * i, width);
            });
        }

        maxEquipmentLines() {
            return 6;
        }
    }

    // グローバルに公開する
    window[Window_FormationStatus.name] = Window_FormationStatus;

    class Window_FormationName extends Window_Base {
        initialize(x, y, text) {
            super.initialize(x, y, 216, 56);
            this.drawText(text, 0, 0, 192, 1);
        }

        standardPadding() {
            return 9;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////

    function Scene_FormationMixIn(sceneClass) {
        sceneClass.createBattlerWindow = function () {
            this._battlerWindow = new Window_FormationBattler(FORMATION_WINDOW_TYPE_BATTLE, 96, 72);
            this._battlerWindow.setHandler('ok', this.onMemberOk.bind(this));
            this._battlerWindow.setHandler('cancel', this.onFormationCancel.bind(this));
            this._battlerWindow.setHandler('release', this.onRelease.bind(this));
            this._battlerWindow.setHandler('down', this.onDown.bind(this));
            this._battlerWindow.setHandler('standOff', this.onStandOff.bind(this));
            this._battlerWindow.setStatusWindow(this._fStatusWindow);
            this._battlerWindow.setScopeIndexMethod(this.scopeIndex.bind(this));
            this.initializeBattlerWindow();
            this._fStatusWindow.setActor(this._battlerWindow.actor());
            this.addWindow(this._battlerWindow);
        }

        sceneClass.createStanderWindow = function () {
            this._standerWindow = new Window_FormationStander(FORMATION_WINDOW_TYPE_STAND, 96, 264);
            this._standerWindow.setHandler('ok', this.onStandOk.bind(this));
            this._standerWindow.setHandler('cancel', this.onFormationCancel.bind(this));
            this._standerWindow.setHandler('add', this.onAdd.bind(this));
            this._standerWindow.setHandler('up', this.onUp.bind(this));
            this._standerWindow.setHandler('battleOff', this.onBattleOff.bind(this));
            this._standerWindow.setStatusWindow(this._fStatusWindow);
            this._battlerWindow.setScopeIndexMethod(this.scopeIndex.bind(this));
            this._standerWindow.deactivate();
            this._standerWindow.deselect();
            if (this._standerWindow.height + this._standerWindow.y > this._fStatusWindow.y) {
                this._standerWindow.y = this._fStatusWindow.y - this._standerWindow.height;
            }
            this.addWindow(this._standerWindow);
        }

        sceneClass.createFormationStatusWindow = function () {
            this._fStatusWindow = new Window_FormationStatus();
            this.addWindow(this._fStatusWindow);
        }

        sceneClass.createNameWindow = function () {
            this._nameWindow1 = new Window_FormationName(96, this._battlerWindow.y - 48, formationSceneBattleName);
            this.addWindow(this._nameWindow1);
            this._nameWindow2 = new Window_FormationName(96, this._standerWindow.y - 48, formationSceneStandName);
            this.addWindow(this._nameWindow2);
        }

        sceneClass.clearWindows = function () {
            this._scopeIndex = null;
            this._battlerWindow.refreshMembers();
            this._standerWindow.refreshMembers();
            this._battlerWindow.releaseIndex();
            this._standerWindow.releaseIndex();
        }

        sceneClass.scopeIndex = function () {
            return this._scopeIndex;
        }

        sceneClass.onMemberOk = function () {
            if (this._scopeIndex !== null) {
                if (this._scopeIndex >= 0) {
                    if (this._battlerWindow.actor()) {
                        /**
                         * 戦闘メンバーと戦闘メンバーまたは待機メンバーを入れ替える
                         */
                        $gameParty.swapOrder(
                            this._scopeIndex,
                            $gameParty.allMembers().indexOf(this._battlerWindow.actor())
                        );
                    } else {
                        /**
                         * 戦闘メンバーまたは待機メンバーを戦闘メンバーの末尾に移動する
                         */
                        $gameParty.moveActorToIndex(
                            $gameParty.allMembers()[this._scopeIndex].actorId(),
                            this._scopeIndex >= $gameParty.maxBattleMembers() ?
                                $gameParty.maxBattleMembers() :
                                $gameParty.maxBattleMembers() - 1
                        );
                        if (this._scopeIndex >= $gameParty.maxBattleMembers()) {
                            $gameParty.increaseBattleMemberSize();
                        }
                    }
                } else if (this._scopeIndex === TAIL_OF_STANDING_MEMBER) {
                    if (this._battlerWindow.actor()) {
                        if (this._battlerWindow.size() === 1) {
                            return;
                        }
                        /**
                         * 戦闘メンバーを待機メンバーの末尾に移動する
                         */
                        $gameParty.moveActorToIndex(
                            this._battlerWindow.actor().actorId(),
                            $gameParty.allMembers().length - 1
                        );
                        $gameParty.decreaseBattleMemberSize();
                    }
                } else if (this._scopeIndex === TAIL_OF_BATTLE_MEMBER) {
                    /**
                     * 戦闘メンバーを戦闘メンバーの末尾に移動する
                     */
                    $gameParty.moveActorToIndex(
                        this._battlerWindow.actor().actorId(),
                        $gameParty.maxBattleMembers() - 1
                    );
                }
                this._scopeIndex = null;
                this.onFormationChanged(this._battlerWindow);
            } else {
                this._scopeIndex = $gameParty.allMembers().indexOf(this._battlerWindow.actor());
                onFirstActorSelected(this._battlerWindow);
            }
        }

        sceneClass.onStandOk = function() {
            if (this._scopeIndex !== null) {
                if (this._battlerWindow.size() !== 1 || !!this._standerWindow.actor()) {
                    if (this._scopeIndex >= 0) {
                        if (this._standerWindow.actor()) {
                            /**
                             * 戦闘メンバーまたは待機メンバーと待機メンバーを入れ替える
                             */
                            $gameParty.swapOrder(
                                this._scopeIndex,
                                $gameParty.allMembers().indexOf(this._standerWindow.actor())
                            );
                        } else {
                            /**
                             * 戦闘メンバーまたは待機メンバーを待機メンバーの末尾に移動する
                             */
                            $gameParty.moveActorToIndex(
                                $gameParty.allMembers()[this._scopeIndex].actorId(),
                                $gameParty.allMembers().length
                            );
                            if (this._scopeIndex < $gameParty.maxBattleMembers()) {
                                $gameParty.setBattleMemberSize(this._battlerWindow.size() - 1);
                            }
                        }
                    } else if (this._scopeIndex === TAIL_OF_BATTLE_MEMBER) {
                        if (this._standerWindow.actor()) {
                            /**
                             * 待機メンバーを戦闘メンバーの末尾に移動する
                             */
                            $gameParty.moveActorToIndex(
                                this._standerWindow.actor().actorId(),
                                $gameParty.maxBattleMembers()
                            );
                            $gameParty.setBattleMemberSize(this._battlerWindow.size() + 1);
                        }
                    } else if (this._scopeIndex === TAIL_OF_STANDING_MEMBER) {
                        /**
                         * 待機メンバーを待機メンバーの末尾に移動する
                         */
                        $gameParty.moveActorToIndex(
                            this._standerWindow.actor().actorId(),
                            $gameParty.allMembers().length - 1
                        );
                    }
                }
                this._scopeIndex = null;
                this.onFormationChanged(this._standerWindow);
            } else {
                const result = $gameParty.allMembers().indexOf(this._standerWindow.actor());
                this._scopeIndex = result === -1 ? TAIL_OF_STANDING_MEMBER : result;
                onFirstActorSelected(this._standerWindow);
            }
        }

        sceneClass.onFormationCancel = function() {
            if (this._scopeIndex === null) {
                this.returnScene();
            } else {
                this._scopeIndex = null;
                this._battlerWindow.releaseIndex();
                this._standerWindow.releaseIndex();
                this._battlerWindow.activate();
            }
        }

        sceneClass.onRelease = function() {
            onRelease(this._battlerWindow.actor().actorId());
            this.onFormationChanged(this._battlerWindow);
        }

        sceneClass.onAdd = function() {
            onAdd(this._standerWindow.actor().actorId());
            this.onFormationChanged(this._standerWindow);
        }

        sceneClass.onDown = function() {
            const index = Math.min(this._battlerWindow.index(), this._standerWindow.maxItems() - 1);
            this._battlerWindow.deactivate();
            this._battlerWindow.deselect();
            this._standerWindow.activate();
            this._standerWindow.select(index);
        }

        sceneClass.onUp = function() {
            const index = Math.min(this._standerWindow.index(), this._battlerWindow.maxItems() - 1);
            this._standerWindow.deactivate();
            this._standerWindow.deselect();
            this._battlerWindow.activate();
            this._battlerWindow.select(index);
        }

        sceneClass.onStandOff = function() {
            this._standerWindow.deactivate();
            this._standerWindow.deselect();
        }

        sceneClass.onBattleOff = function() {
            this._battlerWindow.deactivate();
            this._battlerWindow.deselect();
        }

        sceneClass.onFormationChanged = function(lastSelectedWindow) {
            this.clearWindows();
            lastSelectedWindow.activate();
            lastSelectedWindow.select(lastSelectedWindow.index());
            $gamePlayer.refresh();
        }
    };

    class Scene_Formation extends Scene_MenuBase {
        create() {
            super.create();
            this.createAllWindows();
            this._scopeIndex = null;
        }

        createAllWindows() {
            this.createFormationStatusWindow();
            this.createBattlerWindow();
            this.createStanderWindow();
            this.createNameWindow();
        }

        initializeBattlerWindow() {
            this._battlerWindow.activate();
            this._battlerWindow.select(0);
        }

        returnScene() {
            this.popScene(this);
        }
    }

    Scene_FormationMixIn(Scene_Formation.prototype);

    window.Scene_Formation = Scene_Formation;

    /**
     * 最初のアクターを選択した
     * @param {Window_Formation} selectedWindow 並び替えウィンドウ
     */
    function onFirstActorSelected(selectedWindow) {
        selectedWindow.lockIndex();
        selectedWindow.activate();
    }

    /**
     * @param {number} actorId 戦闘メンバーから外すアクターID
     */
    function onRelease(actorId) {
        $gameParty.moveActorToIndex(actorId, $gameParty.allMembers().length - 1);
        $gameParty.decreaseBattleMemberSize();
    }

    /**
     * @param {number} actorId 戦闘メンバーに加えるアクターID
     */
    function onAdd(actorId) {
        $gameParty.moveActorToIndex(actorId, $gameParty.maxBattleMembers());
        $gameParty.increaseBattleMemberSize();
    }

    ////////////////////////////////////////////////////////////////////////////////////

    Scene_FormationMixIn(Scene_Battle.prototype);

    const _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
    Scene_Battle.prototype.initialize = function () {
        _Scene_Battle_initialize.call(this);
        /**
         * 並び替え pendingカーソル
         */
        this._scopeIndex = null;
    };

    const _Form_SBattle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function () {
        _Form_SBattle_createAllWindows.call(this);
        this.createFormationStatusWindow();
        this.createBattlerWindow();
        this.createStanderWindow();
        this.createNameWindow();
    };

    const _Scene_Battle_createBattlerWindow = Scene_Battle.prototype.createBattlerWindow;
    Scene_Battle.prototype.createBattlerWindow = function () {
        _Scene_Battle_createBattlerWindow.call(this);
        this._battlerWindow.openness = 0;
    };

    Scene_Battle.prototype.initializeBattlerWindow = function () {
        this._battlerWindow.deactivate();
        this._battlerWindow.deselect();
    };

    const _Scene_Battle_createStanderWindow = Scene_Battle.prototype.createStanderWindow;
    Scene_Battle.prototype.createStanderWindow = function () {
        _Scene_Battle_createStanderWindow.call(this);
        this._standerWindow.openness = 0;
    };

    const _Scene_Battle_createFormationStatusWindow = Scene_Battle.prototype.createFormationStatusWindow;
    Scene_Battle.prototype.createFormationStatusWindow = function () {
        _Scene_Battle_createFormationStatusWindow.call(this);
        this._fStatusWindow.openness = 0;
    };

    const _Scene_Battle_createNameWindow = Scene_Battle.prototype.createNameWindow;
    Scene_Battle.prototype.createNameWindow = function () {
        _Scene_Battle_createNameWindow.call(this);
        this._nameWindow1.openness = 0;
        this._nameWindow2.openness = 0;
    };

    Scene_Battle.prototype.returnScene = function () {
        this._battlerWindow.deselect();
        this._battlerWindow.deactivate();
        this._standerWindow.deselect();
        this._standerWindow.deactivate();
        this._battlerWindow.close();
        this._standerWindow.close();
        this._fStatusWindow.close();
        this._nameWindow1.close();
        this._nameWindow2.close();
        this._partyCommandWindow.activate();
        BattleManager.endFormation();
        this._statusWindow.refresh();
    };

    const _Form_SBattle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function () {
        return (_Form_SBattle_isAnyInputWindowActive.call(this) || this._battlerWindow.active || this._standerWindow.active);
    };

    const _Form_SBattle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
    Scene_Battle.prototype.changeInputWindow = function () {
        if (!this._battlerWindow.active && !this._standerWindow.active) {
            _Form_SBattle_changeInputWindow.call(this);
        }
    };

    const _Form_SBattle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function () {
        _Form_SBattle_createPartyCommandWindow.call(this);
        if ($gameSwitches.value(useBattleFormationSwitchId)) {
            this._partyCommandWindow.setHandler('formation', this.commandFormation.bind(this))
        }
    };

    Scene_Battle.prototype.commandFormation = function () {
        this._battlerWindow.activate();
        this._battlerWindow.select(0);
        this._battlerWindow.refresh();
        this._battlerWindow.open();
        this._standerWindow.open();
        this._standerWindow.refresh();
        this._nameWindow1.open();
        this._nameWindow2.open();
        this._fStatusWindow.open();
        this._partyCommandWindow.deactivate();
        BattleManager.startFormation();
    };

    Scene_Battle.prototype.onTouchCancelFormation = function () {
        if (TouchInput.isTriggered()) {
            const x = TouchInput.x;
            const y = TouchInput.y;
            return !this._battlerWindow.isContentsArea(x, y) && !this._standerWindow.isContentsArea(x, y);
        }
        return false;
    };

    const _Form_SBattle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function () {
        _Form_SBattle_update.call(this);
        if (this.onTouchCancelFormation() && (this._battlerWindow.active || this._standerWindow.active)) {
            this.onFormationCancel();
        }
    };

    BattleManager.startFormation = function () {
        this._formation = true;
    }

    BattleManager.isFormationMode = function () {
        return this._formation;
    }

    BattleManager.endFormation = function () {
        this._formation = false;
    }

    ////////////////////////////////////////////////////////////////////////////////////

    const _Form_WPartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
    Window_PartyCommand.prototype.makeCommandList = function () {
        _Form_WPartyCommand_makeCommandList.call(this);
        if ($gameSwitches.value(useBattleFormationSwitchId)) {
            this.addCommand(battleFormationText, 'formation')
        }
    };

    // 再定義　パーティ全員のアクションを作成する
    Game_Party.prototype.makeActions = function () {
        this.allMembers().forEach(function (member) {
            member.makeActions();
        });
    };


    ////////////////////////////////////////////////////////////////////////////////////

    Game_Actor.prototype.isFixed = function () {
        if (this._fixed === undefined) {
            this._fixed = this.initFixed();
        }
        return this._fixed === true;
    };

    Game_Actor.prototype.fixFormation = function () {
        this._fixed = true;
    };

    Game_Actor.prototype.unfixFormation = function () {
        this._fixed = false;
    };

    Game_Actor.prototype.initFixed = function () {
        return this.actor().note.match(/<並び替え固定>/) !== null;
    };

    Game_Actor.prototype.escape = function () {
        Game_Battler.prototype.escape.call(this);
        this._escaped = true;
    };

    Game_Actor.prototype.onBattleStart = function () {
        this._escaped = false;
        Game_Battler.prototype.onBattleStart.call(this);
    };

    Game_Actor.prototype.isEscaped = function () {
        return this._escaped;
    };

    Game_Party.prototype.setMaxBattleMembersSize = function (number) {
        this._maxBattleMembersSize = number;
        if (this._battleMemberSize > number) {
            this._battleMemberSize = number;
        }
    };

    /**
     * 戦闘に参加しているメンバーの数
     * パーティ人数によらず戦闘参加人数を可変にするため、元々のメソッドから意味を変えている
     * @return {number}
     */
    Game_Party.prototype.maxBattleMembers = function () {
        if (!this._battleMemberSize) {
            this._battleMemberSize = this.fullMemberSize();
        }
        return this._battleMemberSize;
    };

    Game_Party.prototype.setBattleMemberSize = function (battleMemberSize) {
        this._battleMemberSize = battleMemberSize;
    };

    Game_Party.prototype.increaseBattleMemberSize = function () {
        this.setBattleMemberSize(this._battleMemberSize + 1);
    };

    Game_Party.prototype.decreaseBattleMemberSize = function () {
        this.setBattleMemberSize(this._battleMemberSize - 1);
    };

    /**
     * 戦闘に参加可能なメンバーの最大数
     * @return {number}
     */
    Game_Party.prototype.fullMemberSize = function () {
        return this._maxBattleMembersSize || maxBattleMembersSize;
    };

    /**
     * 待機メンバー一覧
     * @return {Game_Actor[]}
     */
    Game_Party.prototype.standMembers = function () {
        return this.allMembers().slice(this.maxBattleMembers());
    };

    const _Form_GParty_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function () {
        this._battleMemberSize = this.fullMemberSize();
        _Form_GParty_initialize.call(this);
    };

    Game_Party.prototype.aliveBattleMembers = function () {
        return this.battleMembers().filter(function (member) {
            return member.isAlive();
        });
    };

    /**
     * アクターのパーティ加入の挙動
     * - 戦闘メンバー数が最大数に達していない場合、戦闘メンバーの末尾に追加する
     * - 戦闘メンバー数が最大数に達している場合、待機メンバーの末尾に追加する
     */
    const _Form_GParty_addActor = Game_Party.prototype.addActor;
    Game_Party.prototype.addActor = function (actorId) {
        const battleMemberSizeBeforeAdd = this._battleMemberSize;
        _Form_GParty_addActor.call(this, actorId);
        if (battleMemberSizeBeforeAdd !== this.fullMemberSize()) {
            this.moveActorToIndex(actorId, this.maxBattleMembers());
            this.setBattleMemberSize(Math.min(this._battleMemberSize + 1, this.fullMemberSize()));
            $gamePlayer.refresh();
        }
    };

    /**
     * パーティ内のアクターを指定indexへと移動する
     * @param {number} actorId アクター
     * @param {number} index 移動先index
     */
    Game_Party.prototype.moveActorToIndex = function (actorId, index) {
        this._actors = this._actors.filter(function (actorId_) {
            return actorId_ !== actorId;
        });
        this._actors.splice(index, 0, actorId);
    };

    // 再定義　メニューを入れ替え
    const _Form_SMenu_commandFormation = Scene_Menu.prototype.commandFormation;
    Scene_Menu.prototype.commandFormation = function () {
        if (useMenuFormationScene) {
            SceneManager.push(Scene_Formation);
        } else {
            _Form_SMenu_commandFormation.call(this);
        }
    };

    const _Form_SsBattle_createActors = Spriteset_Battle.prototype.createActors;
    Spriteset_Battle.prototype.createActors = function () {
        /**
         * アクターのスプライトを人数分作成するため、一時的に最大数とする
         */
        const n = $gameParty.maxBattleMembers();
        $gameParty.setBattleMemberSize($gameParty.fullMemberSize());
        _Form_SsBattle_createActors.call(this);
        $gameParty.setBattleMemberSize(n);
    };

    /**
     * deprecated.
     * YEP_BattleEngineCoreのサポートは打ち切る予定
     */
    if (Imported['YEP_BattleEngineCore']) {
        var _Form_SActor_setActorHome = Sprite_Actor.prototype.setActorHome;
        Sprite_Actor.prototype.setActorHome = function (index) {
            const n = $gameParty.maxBattleMembers();
            $gameParty.setBattleMemberSize($gameParty.fullMemberSize());
            _Form_SActor_setActorHome.call(this, index);
            $gameParty.setBattleMemberSize(n);
        };
    }
})();
