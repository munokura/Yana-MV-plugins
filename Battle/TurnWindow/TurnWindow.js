//
//  ターン表示ウィンドウ ver1.04
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
Imported['TurnWindow'] = 1.04;
/*:
@plugindesc ver1.04/Adds a window to display the number of turns on the battle screen.
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
Adds a window to display the number of turns on the battle screen.

Sample image
https://github.com/munokura/Yana-MV-plugins/blob/master/Battle/TurnWindow/turn_window.png

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.04:
Fixed a bug that prevented some parameters from functioning properly due to full-width spaces.
ver1.03:
Added support for deleting unnecessary materials.

ver1.02:
Fixed a bug that prevented the turn window from displaying correctly when all players were Collapse at the start of battle.
Fixed a bug that prevented the number of turns from displaying correctly under certain circumstances.
Added a process for using it with YEP_BattleEngineCore.

ver1.01:
Added terms of use information to the Help section.
Fixed an issue where the transparency of attached images was incorrect.

ver1.00:
Released

@param Turn Window X
@desc The X coordinate of the turn window display value position.
@default 712

@param Turn Window Y
@desc The Y coordinate of the turn window display position.
@default 8

@param Turn Window Width
@desc The width of the turn window.
@default 96

@param Turn Window Height
@desc The vertical width of the turn window.
@default 96

@param Turn Window Name
@desc This is the "turn" part displayed in the turn window.
@default Turn

@param Turn Window Use Sprite
@desc This setting determines whether to use an image in the turn window. Specify true or false.
@default true

@param Turn Window Sprite
@desc The name of the image to display in the turn window. Prepare the image in the img/system folder.
@default turn_window
@type file
@require 1
@dir img/system/

@param Split LogWindow Back
@desc This setting determines whether the log window backsprite is truncated to the width of the window. Set this to true or false.
@default true

@param Turn Window Font Size Turn
@desc The font size of the "turn" part of the turn display.
@default 24

@param Turn Window Font Size Count
@desc The font size of the numerical part of the turn display.
@default 48

@param Turn Window TurnX
@desc The X coordinate of the turn display.
@default 8

@param Turn Window TurnY
@desc The Y coordinate of the turn display.
@default 0

@param Turn Window Turn NumX
@desc This is the X coordinate of the number part of the turn display.
@default 24

@param Turn Window Turn NumY
@desc This is the Y coordinate of the number part of the turn display.
@default 38
*/


/*:ja
@plugindesc ver1.04/戦闘画面にターン数を表示するウィンドウを追加します。
@author Yana

@help
戦闘画面にターン数を表示するウィンドウを追加します。

サンプル画像
https://github.com/munokura/Yana-MV-plugins/blob/master/Battle/TurnWindow/turn_window.png

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴：
ver1.04:
一部のパラメータに全角スペースが入っていて、正常に動作しなかったバグを修正しました。
ver1.03:
不要素材削除機能に対応しました。

ver1.02:
全員が行動不能状態で戦闘開始した場合、ターンウィンドウが正常に表示されないバグを修正しました。
特定の状況下でターン数が正常に表示されないバグを修正しました。
YEP_BattleEngineCoreとの併用化処理を追加しました。

ver1.01:
ヘルプに規約関係の追記をしました。
添付画像の透明度が正常でないのを修正しました。

ver1.00:
公開

@param Turn Window X
@desc ターンウィンドウの表示値位置X座標です。
@default 712

@param Turn Window Y
@desc ターンウィンドウの表示位置Y座標です。
@default 8

@param Turn Window Width
@desc ターンウィンドウの横幅です。
@default 96

@param Turn Window Height
@desc ターンウィンドウの縦幅です。
@default 96

@param Turn Window Name
@desc ターンウィンドウに表示する”ターン”の部分です。
@default Turn

@param Turn Window Use Sprite
@desc ターンウィンドウに画像を使用するかどうかの設定です。 true/falseで指定してください。
@default true

@param Turn Window Sprite
@desc ターンウィンドウに表示する画像の名前です。 img/systemフォルダに画像を用意してください。
@default turn_window
@type file
@require 1
@dir img/system/

@param Split LogWindow Back
@desc ログウィンドウのバックスプライトをウィンドウの横幅だけ切り詰めるかの設定です。true/falseで設定してください。
@default true

@param Turn Window Font Size Turn
@desc ターン表示の"ターン"部分の文字サイズです。
@default 24

@param Turn Window Font Size Count
@desc ターン表示の数値部分の文字サイズです。
@default 48

@param Turn Window TurnX
@desc ターン表示のX座標です。
@default 8

@param Turn Window TurnY
@desc ターン表示のY座標です。
@default 0

@param Turn Window Turn NumX
@desc ターン表示の数字部分のX座標です。
@default 24

@param Turn Window Turn NumY
@desc ターン表示の数字部分のY座標です。
@default 38
*/

(function() {

	var parameters = PluginManager.parameters('TurnWindow');
	var turnWindowX = Number(parameters['Turn Window X'] || 712);
	var turnWindowY = Number(parameters['Turn Window Y'] || 8);
	var turnWindowWidth = Number(parameters['Turn Window Width'] || 96);
	var turnWindowHeight = Number(parameters['Turn Window Height'] || 96);
	var turnWindowUseSprite = String(parameters['Turn Window Use Sprite'] || "true");
	var turnWindowSprite = String(parameters['Turn Window Sprite'] || "");
	var turnWindowTurn = String(parameters['Turn Window Name'] || "Turn");
	var turnWindowSplitLog = String(parameters['Split LogWindow Back'] || "true");
	var turnWindowFontSizeTurn = Number(parameters['Turn Window Font Size Turn'] || 24);
	var turnWindowFontSizeCount = Number(parameters['Turn Window Font Size Count'] || 48);
	var turnWindowTurnX = Number(parameters['Turn Window TurnX'] || 0);
	var turnWindowTurnY = Number(parameters['Turn Window TurnY'] || 0);
	var turnWindowTurnNumX = Number(parameters['Turn Window Turn NumX'] || 24);
	var turnWindowTurnNumY = Number(parameters['Turn Window Turn NumY'] || 38);

	function Window_Turn() {
		this.initialize.apply(this, arguments);
	};

	Window_Turn.prototype = Object.create(Window_Base.prototype);
	Window_Turn.prototype.constructor = Window_Turn;

	Window_Turn.prototype.initialize = function(x, y) {
		var width = this.windowWidth();
		var height = this.windowHeight();
		var opacity = 255;
		if (!this.isWindowUse()){
			width += this.standardPadding() * 2;
			height += this.standardPadding() * 2;
			x -= this.standardPadding();
			y -= this.standardPadding();
			opacity = 0
		}
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this.openness = 0;
		this.opacity = opacity;
		this.refresh();
	};

	Window_Turn.prototype.standardPadding = function() {
		return 8;
	};

	Window_Turn.prototype.windowWidth = function() {
		return turnWindowWidth;
	};

	Window_Turn.prototype.windowHeight = function() {
		return turnWindowHeight;
	};

	Window_Turn.prototype.isWindowUse = function() {
		return turnWindowUseSprite != "true";
	};

	Window_Turn.prototype.refresh = function() {
		var x = turnWindowTurnX;
		var y = turnWindowTurnY;
		var width = this.windowWidth() - this.standardPadding() * 2;
		this._turnCount = BattleManager.twTurnCount();
		this.contents.clear();
		if (!this.isWindowUse()){
    		var bitmap = ImageManager.loadSystem(turnWindowSprite);
			this.contents.blt(bitmap,0,0,bitmap.width,bitmap.height,0,0);
		}
		
		this.contents.fontSize = turnWindowFontSizeTurn;
		this.drawText(turnWindowTurn, x, y, width);
		
		x = turnWindowTurnNumX;
		y = turnWindowTurnNumY;
		var text = ("0" + this._turnCount).substr(-2);
		
		this.contents.fontSize = turnWindowFontSizeCount;
		this.drawText(text, x, y, width);
	};

	Window_Turn.prototype.open = function() {
		Window_Base.prototype.open.call(this);
		this.refresh();
	};

	Scene_Battle.prototype.createTurnWindow = function() {
		var x = turnWindowX;
		var y = turnWindowY;
		this._turnWindow = new Window_Turn(x,y);
		this.addWindow(this._turnWindow);
		this._turnWindow.refresh();
	};
	var _turnw_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function() {
		_turnw_Scene_Battle_createAllWindows.call(this);
		this.createTurnWindow();
	};
	
	var _turnw_Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
	Scene_Battle.prototype.onActorCancel = function() {
		_turnw_Scene_Battle_onActorCancel.call(this);
		switch (this._actorCommandWindow.currentSymbol()) {
   		case 'skill':
   		case 'item':
   			this._turnWindow.hide();
   			break;
   		}
	};
	
	var _turnw_Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
	Scene_Battle.prototype.onEnemyCancel = function() {
		_turnw_Scene_Battle_onEnemyCancel.call(this);
		switch (this._actorCommandWindow.currentSymbol()) {
   		case 'skill':
   		case 'item':
   			this._turnWindow.hide();
   			break;
   		default:
   			this._turnWindow.show();
   		}
	};
	
	var _turnw_Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
	Scene_Battle.prototype.commandSkill = function() {
		_turnw_Scene_Battle_commandSkill.call(this);
		this._turnWindow.hide();
	};
	
	var _turnw_Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
	Scene_Battle.prototype.commandItem = function() {
		_turnw_Scene_Battle_commandItem.call(this);
		this._turnWindow.hide();
	};
	
	var _turnw_Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
	Scene_Battle.prototype.onSkillOk = function() {
		_turnw_Scene_Battle_onSkillOk.call(this);
		this._turnWindow.show();
	};

	var _turnw_Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
	Scene_Battle.prototype.onSkillCancel = function() {
		_turnw_Scene_Battle_onSkillCancel.call(this);
		this._turnWindow.show();
	};

	var _turnw_Scene_Battle_onItemOk = Scene_Battle.prototype.onItemOk;
	Scene_Battle.prototype.onItemOk = function() {
		_turnw_Scene_Battle_onItemOk.call(this);
		this._turnWindow.show();
	};

	var _turnw_Scene_Battle_onItemCancel = Scene_Battle.prototype.onItemCancel;
	Scene_Battle.prototype.onItemCancel = function() {
		_turnw_Scene_Battle_onItemCancel.call(this);
		this._turnWindow.show();
	};
	
	var _turnw_Scene_Battle_update = Scene_Battle.prototype.update;
	Scene_Battle.prototype.update = function() {
		_turnw_Scene_Battle_update.call(this);
		if (BattleManager.isInputting() && this._turnWindow.isClosed()) { this._turnWindow.open() };
		if (BattleManager.isInTurn() && this._turnWindow.isClosed()) { this._turnWindow.open() };
		if (BattleManager.isAborting() || BattleManager.isBattleEnd()) { this._turnWindow.close() };
		if (this._turnWindow._turnCount !== BattleManager.twTurnCount()) { this._turnWindow.refresh() };
	};
	
	var _turnw_Window_BattleLog_windowWidth = Window_BattleLog.prototype.windowWidth;
	Window_BattleLog.prototype.windowWidth = function() {
		var width = _turnw_Window_BattleLog_windowWidth.call(this);
		if (turnWindowSplitLog == "true" ) {  width -= turnWindowWidth }
		return width
	};
	
	BattleManager.twTurnCount = function(){
		return this.isInputting() ? ($gameTroop._turnCount + 1) : $gameTroop._turnCount;
	};
	
	if (Imported.YEP_BattleEngineCore){
		Scene_Battle.prototype.onSkillOk = function() {
			_turnw_Scene_Battle_onSkillOk.call(this);
		};

		Scene_Battle.prototype.onItemOk = function() {
			_turnw_Scene_Battle_onItemOk.call(this);
		};
		
		var _turnw_Scene_Battle_commandAttack = Scene_Battle.prototype.commandAttack;
		Scene_Battle.prototype.commandAttack = function() {
			_turnw_Scene_Battle_commandAttack.call(this);
			this._turnWindow.hide();	
    	};
    	
    	var _turnw_Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
		Scene_Battle.prototype.onEnemyOk = function() {
			_turnw_Scene_Battle_onEnemyOk.call(this);	
			this._turnWindow.show();
    	};
    	
    	Window_BattleLog.prototype.windowWidth = function(){
    		return Graphics.boxWidth - 144;
    	};
    	
    	Window_BattleLog.prototype.drawSimpleActionLine = function(index) {
    		var text = this._lines[index].replace('<SIMPLE>', '');
    		var rect = this.itemRectForText(index);
    		this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    		var tw = this.textWidth(text);
     		var ix = (rect.width - tw) / 2 - 4;
      		if (this._actionIcon) { 
      			this.drawIcon(this._actionIcon, ix, rect.y + 2);
      			ix += 32
      		}
    		this.drawText(text, ix, rect.y, Graphics.boxWidth);
		};
	}
})();