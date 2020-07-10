//
//  ステートヘルプ ver1.03
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
Imported['StateHelp'] = 1.03;

/*:
 * @plugindesc ver1.03/ステートにヘルプを付け、ステートの詳細を見るための仕組みを追加します。
 * @author Yana
 * 
 * @param　State Help Text
 * @desc 戦闘時、パーティコマンドに追加するステートヘルプの名称です。
 * ここを空白にすると、ステートヘルプが追加されなくなります。
 * @default ステート詳細
 * 
 * @param　Call State Window Key
 * @desc ステートヘルプを呼び出すためのショートカットキーです。
 * ここを空白にすると、ショートカットが無効になります。
 * @default left
 * 
 * @param　Use Touch Call
 * @desc 画面の左端をクリックするすることでステートヘルプを呼び出せるようにするかの設定です。
 * @default true
 * 
 * @param　Add Menu State Help
 * @desc メニュー画面にステートヘルプを追加するかの設定です。
 * @default true
 * 
 * @param　Touch Call Rect
 * @desc タッチすることで起動する領域の矩形位置です。
 * @default 0,0,128,444
 * 
 * @param　Debuff Help HP1
 * @desc 最大HP1段階減少のデバフのヘルプです。
 * @default 最大HPが25%減少します。
 * 
 * @param　Debuff Help HP2
 * @desc 最大HP2段階減少のデバフのヘルプです。
 * @default 最大HPが50%減少します。
 * 
 * @param　Debuff Help MP1
 * @desc 最大MP1段階減少のデバフのヘルプです。
 * @default 最大HPが25%減少します。
 * 
 * @param　Debuff Help HP2
 * @desc 最大MP2段階減少のデバフのヘルプです。
 * @default 最大MPが50%減少します。
 * 
 * @param　Debuff Help ATK1
 * @desc 攻撃力1段階減少のデバフのヘルプです。
 * @default 攻撃力が25%減少します。
 * 
 * @param　Debuff Help ATK2
 * @desc 攻撃力2段階減少のデバフのヘルプです。
 * @default 攻撃力がが50%減少します。
 * 
 * @param　Debuff Help DEF1
 * @desc 防御力1段階減少のデバフのヘルプです。
 * @default 防御力が25%減少します。
 * 
 * @param　Debuff Help DEF2
 * @desc 防御力2段階減少のデバフのヘルプです。
 * @default 防御力が50%減少します。
 * 
 * @param　Debuff Help MAT1
 * @desc 魔法力1段階減少のデバフのヘルプです。
 * @default 魔法力が25%減少します。
 * 
 * @param　Debuff Help MAT2
 * @desc 魔法力1段階減少のデバフのヘルプです。
 * @default 魔法力が50%減少します。
 * 
 * @param　Debuff Help MDF1
 * @desc 魔法防御1段階減少のデバフのヘルプです。
 * @default 魔法防御が25%減少します。
 * 
 * @param　Debuff Help MDF2
 * @desc 魔法防御2段階減少のデバフのヘルプです。
 * @default 魔法防御が50%減少します。
 * 
 * @param　Debuff Help AGI1
 * @desc 敏捷性1段階減少のデバフのヘルプです。
 * @default 敏捷性が25%減少します。
 * 
 * @param　Debuff Help AGI2
 * @desc 敏捷性2段階減少のデバフのヘルプです。
 * @default 敏捷性が50%減少します。
 * 
 * @param　Debuff Help LUK1
 * @desc 運1段階減少のデバフのヘルプです。
 * @default 運が25%減少します。
 * 
 * @param　Debuff Help LUK2
 * @desc 運2段階減少のデバフのヘルプです。
 * @default 運が50%減少します。
 * 
 * @param　Buff Help HP1
 * @desc 最大HP1段階上昇のデバフのヘルプです。
 * @default 最大HPが25%上昇します。
 * 
 * @param　Buff Help HP2
 * @desc 最大HP2段階上昇のデバフのヘルプです。
 * @default 最大HPが50%上昇します。
 * 
 * @param　Buff Help MP1
 * @desc 最大MP1段階上昇のデバフのヘルプです。
 * @default 最大HPが25%上昇します。
 * 
 * @param　Buff Help HP2
 * @desc 最大MP2段階上昇のデバフのヘルプです。
 * @default 最大MPが50%上昇します。
 * 
 * @param　Buff Help ATK1
 * @desc 攻撃力1段階上昇のデバフのヘルプです。
 * @default 攻撃力が25%上昇します。
 * 
 * @param　Buff Help ATK2
 * @desc 攻撃力2段階上昇のデバフのヘルプです。
 * @default 攻撃力がが50%上昇します。
 * 
 * @param　Buff Help DEF1
 * @desc 防御力1段階上昇のデバフのヘルプです。
 * @default 防御力が25%上昇します。
 * 
 * @param　Buff Help DEF2
 * @desc 防御力2段階上昇のデバフのヘルプです。
 * @default 防御力が50%上昇します。
 * 
 * @param　Buff Help MAT1
 * @desc 魔法力1段階上昇のデバフのヘルプです。
 * @default 魔法力が25%上昇します。
 * 
 * @param　Buff Help MAT2
 * @desc 魔法力1段階上昇のデバフのヘルプです。
 * @default 魔法力が50%上昇します。
 * 
 * @param　Buff Help MDF1
 * @desc 魔法防御1段階上昇のデバフのヘルプです。
 * @default 魔法防御が25%上昇します。
 * 
 * @param　Buff Help MDF2
 * @desc 魔法防御2段階上昇のデバフのヘルプです。
 * @default 魔法防御が50%上昇します。
 * 
 * @param　Buff Help AGI1
 * @desc 敏捷性1段階上昇のデバフのヘルプです。
 * @default 敏捷性が25%上昇します。
 * 
 * @param　Buff Help AGI2
 * @desc 敏捷性2段階上昇のデバフのヘルプです。
 * @default 敏捷性が50%上昇します。
 * 
 * @param　Buff Help LUK1
 * @desc 運1段階上昇のデバフのヘルプです。
 * @default 運が25%上昇します。
 * 
 * @param　Buff Help LUK2
 * @desc 運2段階上昇のデバフのヘルプです。
 * @default 運が50%上昇します。
 * 
 * @help------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------ 
 * 設定方法
 * ------------------------------------------------------
 * 
 * ステートのメモ欄に
 * 
 * <ステートヘルプ>
 * ステートの解説
 * </ステートヘルプ>
 * 
 * または、
 * 
 * <STATE_HELP>
 * ステートの解説
 * </STATE_HELP>
 * 
 * と記述することで、そのステートに説明を設定することができます。
 * 
 * ------------------------------------------------------ 
 * 仕様
 * ------------------------------------------------------
 * 
 * 戦闘中、アクターコマンドまたはパーティコマンドがアクティブな状態で、画面の左側をクリックすることで、
 * ステートヘルプウィンドウを呼び出すことができます。
 * この設定は、UseTouchCallをfalseにすることで無効化できます。
 * 
 * ステートヘルプウィンドウは、ステートヘルプウィンドウ以外の領域をクリックすることでも、閉じることができます。
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
 * ver1.03:
 * 利用規約をMITライセンスに変更
 * メニューで呼び出した際にエネミーが表示されるバグを修正
 * ver1.02:
 * YEP_X_BattleSysATBと競合しないように処理を修正
 * ver1.01:
 * 隠れているエネミーが表示されていたバグを修正
 * ver1.00:
 * 公開
 */

(function(){
    
    var parameters = PluginManager.parameters('StateHelp');
    var stateHelpText = String(parameters['State Help Text']);
    var callStateWindowKey = String(parameters['Call State Window Key']);
    var useTouchCall = String(parameters['Use Touch Call']) === 'true';
    var addMenuStateHelp = String(parameters['Add Menu State Help']) === 'true';
    var touchCallRect = String(parameters['Touch Call Rect'] || '0,0,128,444');
    var buffHelp = [
        String(parameters['Debuff Help HP2'] || '最大HPが50%減少します。'),
        String(parameters['Debuff Help HP1'] || '最大HPが25%減少します。'),
        String(parameters['Buff Help HP1'] || '最大HPが25%上昇します。'),
        String(parameters['Buff Help HP2'] || '最大HPが50%上昇します。'),
        String(parameters['Debuff Help MP2'] || '最大MPが50%減少します。'),
        String(parameters['Debuff Help MP1'] || '最大MPが25%減少します。'),
        String(parameters['Buff Help MP1'] || '最大MPが25%上昇します。'),
        String(parameters['Buff Help MP2'] || '最大MPが50%上昇します。'),
        String(parameters['Debuff Help ATK2'] || '攻撃力が50%減少します。'),
        String(parameters['Debuff Help ATK1'] || '攻撃力が25%減少します。'),
        String(parameters['Buff Help ATK1'] || '攻撃力が25%上昇します。'),
        String(parameters['Buff Help ATK2'] || '攻撃力が50%上昇します。'),
        String(parameters['Debuff Help DEF2'] || '防御力が50%減少します。'),
        String(parameters['Debuff Help DEF1'] || '防御力が25%減少します。'),
        String(parameters['Buff Help DEF1'] || '防御力が25%上昇します。'),
        String(parameters['Buff Help DEF2'] || '防御力が50%上昇します。'),
        String(parameters['Debuff Help MAT2'] || '魔法力が50%減少します。'),
        String(parameters['Debuff Help MAT1'] || '魔法力が25%減少します。'),
        String(parameters['Buff Help MAT1'] || '魔法力が25%上昇します。'),
        String(parameters['Buff Help MAT2'] || '魔法力が50%上昇します。'),
        String(parameters['Debuff Help MDF2'] || '魔法防御が50%減少します。'),
        String(parameters['Debuff Help MDF1'] || '魔法防御が25%減少します。'),
        String(parameters['Buff Help MDF1'] || '魔法防御が25%上昇します。'),
        String(parameters['Buff Help MDF2'] || '魔法防御が50%上昇します。'),
        String(parameters['Debuff Help AGI2'] || '敏捷性が50%減少します。'),
        String(parameters['Debuff Help AGI1'] || '敏捷性が25%減少します。'),
        String(parameters['Buff Help AGI1'] || '敏捷性が25%上昇します。'),
        String(parameters['Buff Help AGI2'] || '敏捷性が50%上昇します。'),
        String(parameters['Debuff Help LUK2'] || '運が50%減少します。'),
        String(parameters['Debuff Help LUK1'] || '運が25%減少します。'),
        String(parameters['Buff Help LUK1'] || '運が25%上昇します。'),
        String(parameters['Buff Help LUK2'] || '運が50%上昇します。')
    ]
    
    function Window_StateHelp() {
        this.initialize.apply(this, arguments);
    }

    Window_StateHelp.prototype = Object.create(Window_Selectable.prototype);
    Window_StateHelp.prototype.constructor = Window_StateHelp;

    Window_StateHelp.prototype.initialize = function() {
        this._posY = 120;
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = (Graphics.boxWidth - width) / 2;
        var y = this.posY();
        this._topCol = 0;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.openness = 0;
        this._subIndex = 0;
    };
    
    Window_StateHelp.prototype.posY = function() {
        return this._posY;
    };
    
    Window_StateHelp.prototype.windowWidth = function() {
        return 134 + this.fittingWidth(Math.max(Math.min(this.maxIcons(),this.numVisibleCols()),1));
    };
    
    Window_StateHelp.prototype.numVisibleCols = function() {
        return 16;
    };
    
    Window_StateHelp.prototype.fittingWidth = function(numCols){
        return numCols * this.itemWidth() + this.standardPadding() * 2; 
    };

    Window_StateHelp.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows());
    };
    
    Window_StateHelp.prototype.fittingHeight = function(numLines) {
        return numLines * this.itemHeight() + this.standardPadding() * 2;
    };

    
    Window_StateHelp.prototype.numVisibleRows = function() {
        return Math.min(this.maxItems(),7);
    };
    
    Window_StateHelp.prototype.maxItems = function() {
        return this.allBattleMembers().length;
    };
    
    Window_StateHelp.prototype.allBattleMembers = function() {
        var members = [];
        if ($gameParty.inBattle()){
            members = BattleManager.allBattleMembers().filter(function(obj){ return obj.isAppeared() });
        } else {
            members = $gameParty.members();
        }
        return members;
    };
    
    Window_StateHelp.prototype.maxPageRows = function() {
        return Math.min(this.maxItems(), 7);
    };
    
    Window_StateHelp.prototype.itemWidth = function() {
        return 40;
    };
    
    Window_StateHelp.prototype.itemHeight = function() {
        return 40;
    };
    
    Window_StateHelp.prototype.maxIcons = function() {
        var n = 0;
        for(var i=0;i<this.maxItems();i++){
            var chr = BattleManager.allBattleMembers()[i];
            if (n < chr.allIcons().length) { n = chr.allIcons().length }
        }
        return n;
    };
    
    Window_StateHelp.prototype.maxColItems = function() {
        return this.maxColIndex(this.index());
    };
    
    Window_StateHelp.prototype.maxColIndex = function(index) {
        var character = BattleManager.allBattleMembers()[index];
        if (!character){ return 1 }
        return Math.max(character.allIcons().length,1);
    };
    
    Window_StateHelp.prototype.maxTopCols = function() {
        return Math.max(this.numVisibleCols - this.maxColIndex(),0);
    };
    
    Window_StateHelp.prototype.colWidth = function(index) {
        return (this.maxColIndex(index)-1) * this.itemWidth();
    };
    
    Window_StateHelp.prototype.adjustWindowSize = function() {
        this.width = this.windowWidth();
        this.height = this.windowHeight();
        this.x = (Graphics.boxWidth - this.width) / 2;
        this.y = this.posY();
    };

    Window_StateHelp.prototype.itemRect = function(index) {
        var rect = Window_Selectable.prototype.itemRect.call(this,index);
        rect.x += 130 + (this.itemWidth() * (this._subIndex - this._topCol));
        return rect;
    };
    
    Window_StateHelp.prototype.updateHelp = function() {
        Window_Selectable.prototype.updateHelp.call(this);
        var character = BattleManager.allBattleMembers()[this.index()];
        if (character){
            var states = character.addedShowStates();
            var buffs = character.addedShowBuffs();
            var text = '';
            if (this._subIndex < states.length){
                text = DataManager.getStateHelp(states[this._subIndex]);
            } else if (this._subIndex < (states.length + buffs.length)) {
                var buff = buffs[this._subIndex - states.length];
                text = DataManager.getBuffHelp(buff);
            }
            this._helpWindow.setText(text);
        } else {
            this._helpWindow.setText('');
        }
    };
    
    Window_StateHelp.prototype.checkTopCol = function() {
        if (this._subIndex >= this.numVisibleCols()){
            this._topCol = this._subIndex - this.numVisibleCols() + 1;
            this.refresh();
        } else if (this._subIndex <= this._topCol){
            this._topCol = this._subIndex;
            this.refresh();
        }
    };
    
    Window_StateHelp.prototype.select = function(index) {
        this.checkTopCol();
        Window_Selectable.prototype.select.call(this,index);
    };
    
    Window_StateHelp.prototype.initSelect = function() {
        this.select(0);
        this._subIndex = 0;
        this._lastSubIndex = this._subIndex;
    };
    
    Window_StateHelp.prototype.cursorRight = function(wrap) {
        this._subIndex = (this._subIndex + 1) % this.maxColItems();
        this.select(this.index());
    };

    Window_StateHelp.prototype.cursorLeft = function(wrap) {
        this._subIndex = (this._subIndex + (this.maxColItems() - 1)) % this.maxColItems();
        this.select(this.index());
    };
    
    Window_StateHelp.prototype.cursorUp = function(wrap) {
        Window_Selectable.prototype.cursorUp.call(this,wrap);
        this._subIndex = Math.min(this._subIndex,this.maxColItems()-1);
        this.select(this.index());
    };
    
    Window_StateHelp.prototype.cursorDown = function(wrap) {
        Window_Selectable.prototype.cursorDown.call(this,wrap);
        this._subIndex = Math.min(this._subIndex,this.maxColItems()-1);
        this.select(this.index());
    };
    
    Window_StateHelp.prototype.processCursorMove = function() {
        Window_Selectable.prototype.processCursorMove.call(this);
        if (this._lastSubIndex !== this._subIndex){
            if (this.active){ SoundManager.playCursor() }
            this._lastSubIndex = this._subIndex;
        }
    };
    
    Window_StateHelp.prototype.scrollRight = function() {
        if (this._topCol + 1 < this.maxTopCols()) {
            this._topCol += 1;
        }
    };

    Window_Selectable.prototype.scrollLeft = function() {
        if (this._topCol > 0) {
            this._topCol -= 1;
        }
    };
    
    Window_StateHelp.prototype.onTouch = function(triggered) {
        var lastIndex = this.index();
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                if (triggered && this.isTouchOkEnabled()) {
                    this.processOk();
                }
            } else if (this.isCursorMovable()) {
                this.select(hitIndex);
            }
        } else if (this._stayCount >= 10) {
            if (y < this.padding) {
                this.cursorUp();
            } else if (y >= this.height - this.padding) {
                this.cursorDown();
            } else if (x < 132) {
                this.cursorLeft();
            } else if (x >= this.width - this.padding) {
                this.cursorRight();
            }
        }
        if (this.index() !== lastIndex) {
            if (this.active){ SoundManager.playCursor() }
        } else if (this._subIndex !== this._lastSubIndex) {
            if (this.active){ SoundManager.playCursor() }
            this._lastSubIndex = this._subIndex;
        }
    };
    
    Window_StateHelp.prototype.hitTest = function(x, y) {
        if (this.isContentsArea(x, y)) {
            var cx = x - this.padding;
            var cy = y - this.padding;
            var topIndex = this.topIndex();
            for (var i = 0; i < this.maxPageItems(); i++) {
                var index = topIndex + i;
                if (index < this.maxItems()) {
                    var rect = this.itemRect(index);
                    var left = 132;
                    var right = left + rect.width + this.colWidth(index);
                    var bottom = rect.y + rect.height;
                    if (cx >= left && cy >= rect.y && cx < right && cy < bottom) {
                        this._subIndex = Math.floor((cx - 132) / this.itemWidth()) + this._topCol;
                        this.select(index);
                        return index;
                    }
                }
            }
        }
        return -1;
    };
    
    Window_StateHelp.prototype.drawItem = function(index) {
        var rect = this.itemRect(index);
        var character = this.allBattleMembers()[index];
        //var rect = this.itemRectForText(index);
        var y = rect.y;
        var x = 0;
        var iw = this.itemWidth();
        var c = Math.min(character.allIcons().length,this.numVisibleCols());
        this.drawText(character.name(),x,y,120);
        this.drawText(':',120,y);
        for (var i=this._topCol;i<(c+this._topCol);i++){
            var ii = i-this._topCol;
            this.drawIcon(character.allIcons()[i],x+iw*ii+134,y+(iw-32)/2);
        }
    };
    
    Window_StateHelp.prototype.refresh = function() {
        this.adjustWindowSize();
        this.createContents();
        Window_Selectable.prototype.refresh.call(this);
    };
    
    ///////////////////////////////////////////////////////////////////////////////////
    
    DataManager.getStateHelp = function(state) {
        if (!state) { return '' }
        if (state.description){ return state.description }
        state.description = '';
        var texts = state.note.split('\n');
        var description = '';
        var start = false;
        for (var i=0;i<texts.length;i++){
            var text = texts[i];
            if (text.match(/^<\/ステートヘルプ>/) || text.match(/^<\/STATE_HELP>/)){
                start = false;
                state.description = description;
            } else if (text.match(/^<ステートヘルプ>/)  || text.match(/^<STATE_HELP>/)){
                start = true;
            } else if (start){
                description += text + '\n';
            }
        }
        return state.description;
    };
    
    DataManager.getBuffHelp = function(buff) {
        if (!buff){ return '' }
        var n = buff[0]*4+buff[1]+2;
        if (buff[1] > 0){ n -= 1 }
        return buffHelp[n];
    };
    
    ///////////////////////////////////////////////////////////////////////////////////
    
    Game_BattlerBase.prototype.addedShowStates = function() {
        return this.states().map(function(state) {
            return state;
        }).filter(function(state) {
            return state.iconIndex > 0;
        });
    };

    Game_BattlerBase.prototype.addedShowBuffs = function() {
        var result = [];
        for (var i = 0; i < this._buffs.length; i++) {
            if (this._buffs[i] !== 0) {
                result.push([i,this._buffs[i]]);
            }
        }
        return result;
    };
    
    ///////////////////////////////////////////////////////////////////////////////////
    
    var _sHelp_WPCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
    Window_PartyCommand.prototype.makeCommandList = function() {
        _sHelp_WPCommand_makeCommandList.call(this);
        if (stateHelpText){ this.addCommand(stateHelpText,  'stateHelp') }
    };
    
    ///////////////////////////////////////////////////////////////////////////////////
    
    var _sHelp_SBattle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _sHelp_SBattle_createDisplayObjects.call(this);
        this.createStateHelpWindow();
        this._windowLayer.removeChild(this._helpWindow);
        this.addWindow(this._helpWindow);
    };
    
    Scene_Battle.prototype.createStateHelpWindow = function() {
        this._stateHelpWindow = new Window_StateHelp();
        this._stateHelpWindow.setHelpWindow(this._helpWindow);
        this._stateHelpWindow.setHandler('cancel', this.cancelStateHelp.bind(this));
        this.addWindow(this._stateHelpWindow);
    };
    
    var _sHelp_SBattle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function() {
        _sHelp_SBattle_createPartyCommandWindow.call(this);
        this._partyCommandWindow.setHandler('stateHelp', this.commandStateHelp.bind(this));
    };
    
    Scene_Battle.prototype.commandStateHelp = function() {
        this._stateHelpWindow.refresh();
        this._stateHelpWindow.initSelect();
        this._stateHelpWindow.activate();
        this._stateHelpWindow.open();
        this._helpWindow.show();
        this._callPhaseWindow = null;
        if (this._partyCommandWindow.isOpen()) this._activedCommand = 1;
        if (this._actorCommandWindow.isOpen()) this._activedCommand = 2;
        this._partyCommandWindow.deactivate();
        this._actorCommandWindow.deactivate();
        BattleManager._phase = 'input';
    };
    
    Scene_Battle.prototype.cancelStateHelp = function() {
        this._stateHelpWindow.deactivate();
        this._stateHelpWindow.close();
        this._helpWindow.hide();
        if (BattleManager.isInputting()){
            if (this._activedCommand === 1){
                this._partyCommandWindow.activate();
            } else if (this._activedCommand === 2) {
                this._actorCommandWindow.activate();
            }
            /*
            if (BattleManager.actor()){
                this._actorCommandWindow.activate();
            }else{
                this._partyCommandWindow.activate();
            }
            */
        }
    };
    
    var _sHelp_SBattle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
    Scene_Battle.prototype.changeInputWindow = function() {
        if(!this._stateHelpWindow.active){ 
            _sHelp_SBattle_changeInputWindow.call(this);
        }
    };
    
    var _sHelp_SBattle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _sHelp_SBattle_update.call(this);
        if (this._actorCommandWindow.active || this._partyCommandWindow.active) {
            if (Input.isTriggered(callStateWindowKey) || this.onTouchCallStateHelp()){
                SoundManager.playOk();
                this.commandStateHelp();
            }
        } else if (this._stateHelpWindow.active) {
            if (this.onTouchCancelStateHelp()){
                SoundManager.playCancel();
                this.cancelStateHelp();
            }
        }
    };
    
    Scene_Battle.prototype.onTouchCallStateHelp = function() {
        if (!useTouchCall){ return false }
        if (TouchInput.isTriggered()){
            var touchPos = touchCallRect.split(','); 
            var x = TouchInput.x;
            var y = TouchInput.y;
            var ax = Number(touchPos[0]);
            var xw = ax + Number(touchPos[2]);
            var ay = Number(touchPos[1]);
            var yh = ay + Number(touchPos[3]);
            return x >= ax && x <= xw && y >= ay && y <= yh;
        }
        return false;
    };
    
    Scene_Battle.prototype.onTouchCancelStateHelp = function() {
        if (TouchInput.isTriggered()){ 
            var x = TouchInput.x;
            var y = TouchInput.y;
            var ax = this._stateHelpWindow.x;
            var xw = ax + this._stateHelpWindow.width;
            var ay = this._stateHelpWindow.y;
            var yh = ay + this._stateHelpWindow.height;
            return !(x >= ax && x <= xw && y >= ay && y <= yh);
        }
        return false;
    };
    ////////////////////////////////////////////////////////////////////////////////////    

    var _sHelp_WMCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _sHelp_WMCommand_addOriginalCommands.call(this);
        if (stateHelpText && addMenuStateHelp){ this.addCommand(stateHelpText, 'stateHelp', true) }
    };
    
    ///////////////////////////////////////////////////////////////////////////////////
    
    var _sHelp_SMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _sHelp_SMenu_createCommandWindow.call(this);
        this._commandWindow.setHandler('stateHelp',   this.commandStateHelp.bind(this));
    };
    
    Scene_Menu.prototype.commandStateHelp = function() {
        SceneManager.push(Scene_StateHelp);
    };
    
    ///////////////////////////////////////////////////////////////////////////////////
    
    
    function Scene_StateHelp() {
        this.initialize.apply(this, arguments);
    };
    
    Scene_StateHelp.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_StateHelp.prototype.constructor = Scene_StateHelp;

    Scene_StateHelp.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createAllWindows();
    };
    
    Scene_StateHelp.prototype.createAllWindows = function() {
        this.createHelpWindow();
        this.createStateHelpWindow();
    };
    
    Scene_StateHelp.prototype.createStateHelpWindow = function() {
        this._stateHelpWindow = new Window_StateHelp();
        this._stateHelpWindow.setHelpWindow(this._helpWindow);
        this._stateHelpWindow.setHandler('cancel', this.returnScene.bind(this));
        this._stateHelpWindow.show();
        this._stateHelpWindow.openness = 255;
        this._stateHelpWindow.initSelect();
        this._stateHelpWindow.activate();
        this._stateHelpWindow.y = (Graphics.boxHeight - this._helpWindow.height) / 2 - (this._stateHelpWindow.height / 2) + this._helpWindow.height;
        this._stateHelpWindow._posY = this._stateHelpWindow.y;
        this.addWindow(this._stateHelpWindow);
    };
    
    Scene_StateHelp.prototype.returnScene = function() {
        this.popScene(this);
    };
    
    Scene_StateHelp.prototype.update = function() {
        Scene_Base.prototype.update.call(this);
        if (this.onTouchCancelStateHelp()){ this.returnScene() }
    };
    
    Scene_StateHelp.prototype.onTouchCancelStateHelp = function() {
        if (TouchInput.isTriggered()){
            var x = TouchInput.x;
            var y = TouchInput.y;
            var ax = this._stateHelpWindow.x;
            var xw = ax + this._stateHelpWindow.width;
            var ay = this._stateHelpWindow.y;
            var yh = ay + this._stateHelpWindow.height;
            return !(x >= ax && x <= xw && y >= ay && y <= yh);
        }
        return false;
    };
}());
