//
//  ログウィンドウ&蓄積型戦闘ログ ver1.04
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
Imported['StackBattleLog'] = 1.04;

/*:
 * @plugindesc ver1.04/戦闘ログを蓄積型に変更し、戦闘ログを表示するパーティコマンドを追加します。
 * @author Yana
 * 
 * @param Stack Log UseLog
 * @desc パーティコマンドにログのコマンドを追加するかの設定です。
 * true/falseで設定してください。
 * @default true
 * 
 * @param Stack Log UseStack
 * @desc 戦闘ログを蓄積型に変更するかの設定です。
 * true/falseで設定してください。
 * @default true
 * 
 * @param Stack Log Text
 * @desc パーティコマンドに表示するコマンドの名前です。
 * @default Log
 * 
 * @param Stack Log Start
 * @desc ログウィンドウに表示する戦闘開始のテキストです。
 * @default ------Start Battle------
 * 
 * @param Stack Log TurnEnd
 * @desc ログウィンドウに表示するターン終了のテキストです。
 * %dをターン数に変換します。
 * @default ------ %d Turn End------
 * 
 * @param Stack Log MaxLines
 * @desc 戦闘ログの最大行数です。
 * @default 6
 * 
 * @param Stack Log FontSize
 * @desc 戦闘ログ及びログウィンドウの文字サイズです。
 * @default 24
 *
 * @param Stack Log Size
 * @desc 蓄積するログの行数です。
 * @default 100
 *
 * @help このプラグインにはプラグインコマンドはありません。
 * ------------------------------------------------------
 * 仕様
 * ------------------------------------------------------
 * このプラグインは、同時に以下の制御文字を追加します。
 * 
 * \FS[FontSize]
 * メッセージなど、drawTextExを使用しているテキストの文字サイズを
 * FontSizeに変更します。
 * この制御文字は\{や\}と違い、最小値、最大値を持ちません。
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
 * ver1.04:YEP_MessageCoreとの競合を回避
 * ver1.03:制御文字の変換が正常に行われていないバグを修正
 *		  :100行を超えるログを削除する際、正常に削除できていなかったバグを修正
 *		  :残っていたconsole.logを削除
 * ver1.01:パーティコマンドのログを無効化する設定にしていても、正常に動作しないバグを修正
 * ver1.00:公開
 *
 */

(function() {
	
	var parameters = PluginManager.parameters('StackBattleLog');
	var stackLogUseLog = String(parameters['Stack Log UseLog'] || "true") == "true";
	var stackLogUseStack = String(parameters['Stack Log UseStack'] || "true") == "true";
	var stackLogText = String(parameters['Stack Log Text'] || "Log");
	var stackLogStart = String(parameters['Stack Log Start'] || "------Start Battle------");
	// %dをターン数に変換します。
	var stackLogTurnEnd = String(parameters['Stack Log TurnEnd'] || "------ %d Turn End------");
	var stackLogMaxLines = Number(parameters['Stack Log LineMax'] || 6);
	var stackLogFontSize = Number(parameters['Stack Log FontSize'] || 24);
	var stackLogSize = Number(parameters['Stack Log Size'] || 24);
	
	
	// ログウィンドウの制御に関する部分です。
	Game_Temp.prototype.addLog = function (text){
		this._battleLog = this._battleLog || [];
		if (this._battleLog.length > stackLogSize){
			this._battleLog.shift();
		}
		this._battleLog.push(text);
	};
	
	Game_Temp.prototype.battleLog = function () {
		return (this._battleLog || []);
	};
	
	var _stacklogw_Window_BattleLog_addText = Window_BattleLog.prototype.addText;
	Window_BattleLog.prototype.addText = function(text){
		//text = ('00000'+Graphics.frameCount).slice(-6) + ':' + text//
		text = "\\FS[" + stackLogFontSize + "]" + text;
		_stacklogw_Window_BattleLog_addText.call(this,text);
		$gameTemp.addLog(text);
	};
	
	var _stacklogw_Game_Message_add = Game_Message.prototype.add;
	Game_Message.prototype.add = function(text){
		_stacklogw_Game_Message_add.call(this,text);
		text = "\\FS[" + stackLogFontSize + "]" + text;
		if ($gameParty.inBattle()) { $gameTemp.addLog(text) }
	};
	
	var _stacklogw_BattleManager_startBattle = BattleManager.startBattle;
	BattleManager.startBattle = function() {
		var text = stackLogStart;
		text = "\\FS[" + stackLogFontSize + "]" + text;
		$gameTemp.addLog(text);
		_stacklogw_BattleManager_startBattle.call(this);
	};
	
	var _stacklogw_BattleManager_endTurn = BattleManager.endTurn;
	BattleManager.endTurn = function(){
		var text = stackLogTurnEnd;
		text = "\\FS[" + stackLogFontSize + "]" + text;
		text = text.replace(/%d/g,$gameTroop._turnCount);
		$gameTemp.addLog(text);
		_stacklogw_BattleManager_endTurn.call(this);
	};
	
	function Window_StackLog() {
		this.initialize.apply(this, arguments);
	};

	Window_StackLog.prototype = Object.create(Window_Selectable.prototype);
	Window_StackLog.prototype.constructor = Window_StackLog;
	
	Window_StackLog.prototype.initialize = function(){
		var x = 64;
		var y = 64;
		var width = Graphics.boxWidth - 128;
		var height = Graphics.boxHeight - 128;
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		this.openness = 0;
		this.refresh();
	};
	
	Window_StackLog.prototype.contentsHeight = function() {
		return (this.lineHeight() * this.maxItems());
	};
	
	Window_StackLog.prototype.maxItems = function() {
		if ($gameTemp.battleLog() == []) {
			return 1;
		}else{
			return $gameTemp.battleLog().length;
		}
	};
	
	Window_StackLog.prototype.drawItem = function(index)　{
		var text = $gameTemp.battleLog()[index];
		var y = this.lineHeight() * (index - this.topRow());
		if (text){
			this.drawTextEx(text,0,y);
		}
	};
	
	Window_StackLog.prototype.refresh = function() {
		this.createContents();
		Window_Selectable.prototype.refresh.call(this);
	};
	Window_StackLog.prototype.lineHeight = function() {
		return stackLogFontSize + 8;
	};
	Scene_Battle.prototype.createStackLogWindow = function() {
		this._stackLogWindow = new Window_StackLog();
    	this._stackLogWindow.setHandler('ok',     this.onLogOk.bind(this));
    	this._stackLogWindow.setHandler('cancel', this.onLogOk.bind(this));
		this.addWindow(this._stackLogWindow);
	};
	var _stacklogw_Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
	Scene_Battle.prototype.createPartyCommandWindow = function() {
		_stacklogw_Scene_Battle_createPartyCommandWindow.call(this);
		if(stackLogUseLog) { this._partyCommandWindow.setHandler('log', this.commandLog.bind(this)) };
	};
	var _stacklogw_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function() {
		_stacklogw_Scene_Battle_createAllWindows.call(this);
		this.createStackLogWindow();
	};
	
	var _stacklogw_Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
	Scene_Battle.prototype.isAnyInputWindowActive = function() {
		return (_stacklogw_Scene_Battle_isAnyInputWindowActive.call(this) || this._stackLogWindow.active);
    };

	var _stacklogw_Scene_Battle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
	Scene_Battle.prototype.changeInputWindow = function() {
		if(!this._stackLogWindow.active){ 
			_stacklogw_Scene_Battle_changeInputWindow.call(this);
		}
	};
	
	Scene_Battle.prototype.commandLog = function() {
		this._stackLogWindow.refresh();
		this._stackLogWindow.open();
		this._stackLogWindow.activate();
		this._stackLogWindow.select($gameTemp.battleLog().length - 1);
		this._partyCommandWindow.deactivate();
	};
	
	Scene_Battle.prototype.onLogOk = function() {
		this._stackLogWindow.close();
		this._stackLogWindow.deactivate();
		this._partyCommandWindow.activate();
	};
	
	var _stacklogw_Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
	Window_PartyCommand.prototype.makeCommandList = function() {
		_stacklogw_Window_PartyCommand_makeCommandList.call(this);
   		if(stackLogUseLog) { this.addCommand(stackLogText,  'log') }
	};
	
	//　ログをスタック式に変換する部分です。
	
	// 再定義
	Window_BattleLog.prototype.lineHeight = function() {
		return stackLogFontSize + 8;
	};
	
	if (stackLogUseStack) { //　蓄積型ログを使用する時のみ定義を行います。
	// エイリアス　ただし、再定義に近い
	var _stacklogw_Window_BattleLog_clear = Window_BattleLog.prototype.clear;
	Window_BattleLog.prototype.clear = function() {
		  this.refresh();
	};
	Window_BattleLog.prototype.logClear = function() {
		_stacklogw_Window_BattleLog_clear.call(this)
	};
	// 再定義
	Window_BattleLog.prototype.maxLines = function() {
		return stackLogMaxLines;
	};
	//　再定義
	Window_BattleLog.prototype.popBaseLine = function() {
	};
	var _stacklogw_Window_BattleLog_refresh = Window_BattleLog.prototype.refresh;
	Window_BattleLog.prototype.refresh = function() {
		var text = "\\FS[" + stackLogFontSize + "]";
		this.drawTextEx(text,0,0,24); // 変更したダミーの文字を送ることでテキストの高さを調整する。
		_stacklogw_Window_BattleLog_refresh.call(this);
	};
	// 再定義
	Window_BattleLog.prototype.drawLineText = function(index) {
		var length = this._lines.length;
		var topLength = length - this.maxLines();
		if (topLength < 0) { topLength = 0 }
		if (index < topLength){ return }
	    var indexPos = index - topLength;
	    var rect = this.itemRectForText(indexPos);
	    
	    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
	    this.drawTextEx(this._lines[index], rect.x, rect.y, rect.width);
	};
	var _stacklogw_Window_BattleLog_numLines = Window_BattleLog.prototype.numLines;
	Window_BattleLog.prototype.numLines = function() {
		var n = _stacklogw_Window_BattleLog_numLines.call(this);
		if ( n >= this.maxLines() ) {
			return this.maxLines();
		}else{
			return n;
		}
	};
	var _stacklogw_Scene_Battle_startPartyCommandSelection =  Scene_Battle.prototype.startPartyCommandSelection;
	Scene_Battle.prototype.startPartyCommandSelection = function() {
		_stacklogw_Scene_Battle_startPartyCommandSelection.call(this);
		this._logWindow.logClear();
	};
	var _stacklogw_Scene_Battle_update = Scene_Battle.prototype.update;
	Scene_Battle.prototype.update = function() {
		_stacklogw_Scene_Battle_update.call(this);
		if (BattleManager.isAborting() || BattleManager.isBattleEnd()) { this._logWindow.logClear() };
	};
	}// 蓄積型ログ専用処理はここまでです。


	if (!Imported.YEP_MessageCore) {
		// \FS[FontSize]の制御文字を追加する部分です。
		var _stacklogw_Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
		Window_Base.prototype.processEscapeCharacter = function (code, textState) {
			if (code === 'FS') {
				this.makeFontSize(this.obtainEscapeParam(textState));
			} else {
				_stacklogw_Window_Base_processEscapeCharacter.call(this, code, textState);
			}
		};
	}
	Window_Base.prototype.makeFontSize = function(fontSize) {
        //if (fontSize >= 96){ fontSize = 96 };
       	//if (fontSize <= 24){ fontSize = 24 };
       	this.contents.fontSize = fontSize;
	};
	
})();