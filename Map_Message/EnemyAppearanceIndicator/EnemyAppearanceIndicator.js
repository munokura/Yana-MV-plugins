//
//  エネミーアピアランスインジケーター ver1.02
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
Imported['EnemyAppearanceIndicator'] = 1.02;
/*:
@plugindesc ver1.02/Adds a window that visualizes approaching enemies during random encounters.
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
Settings
------------------------------------------------------
- Attached Images
Please place the attached images in img/system.
https://github.com/munokura/Yana-MV-plugins/blob/master/Map_Message/EnemyAppearanceIndicator/front_sprite.png

- FrontSprite and BackSprite
The FrontSprite setting specifies the image that appears in front of the indicator,
while BackSprite specifies the image that appears behind the indicator.
You can leave either setting blank to display nothing.

- Animation Mechanism
The indicator animates by changing the saturation in sequence,
such as 0>1>2>3>4>5...,
creating a trailing animation.
Saturation is a value from 0-255, with 0 being pure white.

- Pattern Settings
Patterns 0-9 specify the dot placement and animation pattern, respectively.
0, 1, 2, 3, 4, 5, 6, 7, 8, 9
will create a trailing animation in the direction of the arrow.
Dots will not be drawn where n is specified.
To add more horizontal columns, change the Col value and increase the Pattern value accordingly.
To add more vertical columns, you'll need to edit the JS file directly.

-----------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
ver1.02:
Added support for deleting unnecessary materials.
ver1.01:
Added a commentary.
ver1.00:
Released.

@param Hide Key Switch
@desc The ID of the switch to hide the indicator. When the switch with this ID is on, the indicator will be hidden.
@default 12

@param Size W
@desc The width of the indicator.
@default 90

@param Size H
@desc The vertical width of the indicator.
@default 90

@param Col
@desc This is the number of squares in the indicator row. If you change this, please also change the number of patterns.
@default 10

@param Row
@desc This is the number of squares in the vertical column of the indicator. Generally, do not change this value.
@default 10

@param Pos X
@desc The upper left x-coordinate of the indicator.
@default 726

@param Pos Y
@desc The Y coordinate of the top left corner of the indicator.
@default 534

@param Saturation
@desc The saturation of the indicator. Decreasing this value will animate the indicator.
@default 255

@param Brightness
@desc The brightness of the indicator.
@default 255

@param Update Frame
@desc The indicator update frequency. The indicator will be updated every specified number of frames.
@default 8

@param Anime Frame
@desc Indicator animation frame addition value. Increasing this value will decrease the indicator animation frequency.
@default 8

@param Anime Count
@desc The number of tails to draw for the indicator. If you specify 0, there will be no animation.
@default 9

@param Red Count
@desc The remaining count to turn the indicator red. If the remaining number of steps until the encounter is below this number, the indicator will turn red.
@default 2

@param Front Sprite
@desc The file name of the image to display in front of the indicator. Place the image with the name specified here in img/system.
@default front_sprite
@type file
@require 1
@dir img/system/

@param Back Sprite
@desc The file name of the image to be displayed behind the indicator. Place the image with the name specified here in img/system.
@type file
@require 1
@dir img/system/

@param Pattern0
@desc This is the first row of the animation pattern array. Please arrange the number of elements specified by Col. n is hidden.
@default n,n,n,n,n,n,n,n,n,n

@param Pattern1
@desc This is the second row of the animation pattern array.
@default n,n,n,n,n,n,n,8,8,8

@param Pattern2
@desc This is the third row of the animation pattern array.
@default n,n,n,n,n,8,8,7,7,7

@param Pattern3
@desc This is the fourth row of the animation pattern array.
@default n,n,n,n,8,7,7,6,6,6

@param Pattern4
@desc This is the 5th row of the animation pattern array.
@default n,n,n,8,7,6,6,5,5,5

@param Pattern5
@desc This is the 6th row of the animation pattern array.
@default n,n,8,7,6,5,5,5,4,4

@param Pattern6
@desc This is the 7th row of the animation pattern array.
@default n,n,8,7,6,5,4,4,3,3

@param Pattern7
@desc This is the 8th row of the animation pattern array.
@default n,8,7,6,5,5,4,3,2,2

@param Pattern8
@desc This is the 9th line of the animation pattern array.
@default n,8,7,6,5,4,3,2,1,1

@param Pattern9
@desc This is the 10th row of the animation pattern array.
@default n,8,7,6,5,4,3,2,1,0
*/


/*:ja
@plugindesc ver1.02/ランダムエンカウントにおいて、敵の接近を視覚化したウィンドウを追加します。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
 プラグインコマンドはありません。
------------------------------------------------------
------------------------------------------------------
 設定
------------------------------------------------------
・添付の画像
添付されている画像はimg/systemに入れてください。
https://github.com/munokura/Yana-MV-plugins/blob/master/Map_Message/EnemyAppearanceIndicator/front_sprite.png

・FrontSpriteとBackSprite
設定項目のFrontSpriteはインジケータよりも前面に表示される画像を、
BackSpriteはインジケータよりも背面に表示される画像を指定します。
どちらも空白にすることで、何も表示しない設定にすることが可能です。

・アニメーションの仕組み
インジケータのアニメーションは0>1>2>3>4>5…といったように、
順番に彩度が変化することで、尾を引くようなアニメーションを行います。
彩度は0-255の値で、0を指定すると真っ白になります。

・Patternの設定
Pattern0-9はそれぞれ、ドットの配置とアニメーションのパターンになっています。
0,1,2,3,4,5,6,7,8,9
となっている場合、→方向へ尾を引くアニメーションを行います。
nを指定した部分はドットを描画しません。
横列を増やす場合、Colの値を変更して、Patternにそれぞれ、
Colの値になるまで数値を増やしてください。
縦列を増やす場合は、直接jsファイルを編集する必要があります。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
ver1.02:
不要素材削除機能に対応しました。
ver1.01:
解説を追加しました。
ver1.00:
公開。

@param Hide Key Switch
@desc インジケータを非表示にするためのスイッチのIDです。 このIDのスイッチがオンのときインジケータが非表示になります。
@default 12

@param Size W
@desc インジケータの横幅です。
@default 90

@param Size H
@desc インジケータの縦幅です。
@default 90

@param Col
@desc インジケータの横列の□の数です。 ここを変更した場合併せてPatternの数も同じにしてください。
@default 10

@param Row
@desc インジケータの縦列の□の数です。 この数値は基本的に変更しないでください。
@default 10

@param Pos X
@desc インジケータの左上X座標です。
@default 726

@param Pos Y
@desc インジケータの左上Y座標です。
@default 534

@param Saturation
@desc インジケータの彩度です。 この値が減少することで、インジケータがアニメーションします。
@default 255

@param Brightness
@desc インジケータの明度です。
@default 255

@param Update Frame
@desc インジケータの更新頻度です。 指定した数値フレーム毎にインジケータの更新を行います。
@default 8

@param Anime Frame
@desc インジケータのアニメフレーム加算値です。 この値を増やすとインジケータのアニメ頻度が減少します。
@default 8

@param Anime Count
@desc インジケータの尾を引く数です。 0を指定するとアニメしなくなります。
@default 9

@param Red Count
@desc インジケータを真っ赤にする残りカウントです。 エンカウントまでの残り歩数がこの数値以下で真っ赤にします。
@default 2

@param Front Sprite
@desc インジケータの前面に表示する画像のファイル名です。 img/systemにここで指定した名前の画像を配置してください。
@default front_sprite
@type file
@require 1
@dir img/system/

@param Back Sprite
@desc インジケータの背面に表示する画像のファイル名です。 img/systemにここで指定した名前の画像を配置してください。
@type file
@require 1
@dir img/system/

@param Pattern0
@desc アニメパターンの配列1行目です。 Colで指定した数値分並べてください。nは非表示です。
@default n,n,n,n,n,n,n,n,n,n

@param Pattern1
@desc アニメパターンの配列2行目です。
@default n,n,n,n,n,n,n,8,8,8

@param Pattern2
@desc アニメパターンの配列3行目です。
@default n,n,n,n,n,8,8,7,7,7

@param Pattern3
@desc アニメパターンの配列4行目です。
@default n,n,n,n,8,7,7,6,6,6

@param Pattern4
@desc アニメパターンの配列5行目です。
@default n,n,n,8,7,6,6,5,5,5

@param Pattern5
@desc アニメパターンの配列6行目です。
@default n,n,8,7,6,5,5,5,4,4

@param Pattern6
@desc アニメパターンの配列7行目です。
@default n,n,8,7,6,5,4,4,3,3

@param Pattern7
@desc アニメパターンの配列8行目です。
@default n,8,7,6,5,5,4,3,2,2

@param Pattern8
@desc アニメパターンの配列9行目です。
@default n,8,7,6,5,4,3,2,1,1

@param Pattern9
@desc アニメパターンの配列10行目です。
@default n,8,7,6,5,4,3,2,1,0
*/

(function () {
	var parameters = PluginManager.parameters('EnemyAppearanceIndicator');
	var hideKeySwitch = Number(parameters['Hide Key Switch'] || 12);
	var eaSizeW = Number(parameters['Size W'] || 120);
	var eaSizeH = Number(parameters['Size H'] || 120);
	var eaCol = Number(parameters['Col'] || 10);
	var eaRow = Number(parameters['Row'] || 10);
	var eaPosX = Number(parameters['Pos X'] || 816 - 120);
	var eaPosY = Number(parameters['Pos Y'] || 624 - 120);
	var eaSaturation = Number(parameters['Saturation'] || 255);
	var eaBrightness = Number(parameters['Brightness'] || 255);
	var eaUpdateFrame = Number(parameters['Update Frame'] || 8);
	var eaAnimeFrame = Number(parameters['Anime Frame'] || 8);
	var eaAnimeCount = Number(parameters['Anime Count'] || 9);
	var eaRedCount = Number(parameters['Red Count'] || 1);
	var eaFrontSprite = String(parameters['Front Sprite'] || '');
	var eaBackSprite = String(parameters['Back Sprite'] || '');

	var eaPattern = [String(parameters['Pattern0'] || 'n,n,n,n,n,n,n,n,n,n'),
	String(parameters['Pattern1'] || 'n,n,n,n,n,n,n,8,8,8'),
	String(parameters['Pattern2'] || 'n,n,n,n,n,8,8,7,7,7'),
	String(parameters['Pattern3'] || 'n,n,n,n,8,7,7,6,6,6'),
	String(parameters['Pattern4'] || 'n,n,n,8,7,6,6,5,5,5'),
	String(parameters['Pattern5'] || 'n,n,8,7,6,5,5,5,4,4'),
	String(parameters['Pattern6'] || 'n,n,8,7,6,5,4,4,3,3'),
	String(parameters['Pattern7'] || 'n,8,7,6,5,5,4,3,2,2'),
	String(parameters['Pattern8'] || 'n,8,7,6,5,4,3,2,1,1'),
	String(parameters['Pattern9'] || 'n,8,7,6,5,4,3,2,1,0')];

	var _EAI_GPlayer_makeEncounterCount = Game_Player.prototype.makeEncounterCount;
	Game_Player.prototype.makeEncounterCount = function () {
		_EAI_GPlayer_makeEncounterCount.call(this);
		this._maxEncounterCount = this._encounterCount;
	};

	var _EAI_SMap_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function () {
		_EAI_SMap_start.call(this);
		this.createEaiWindow();
	};

	var _EAI_SMap_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function () {
		_EAI_SMap_update.call(this);
		if (!DataManager.isEventTest()) { this.checkEaiShow() }
	};

	Scene_Map.prototype.createEaiWindow = function () {
		this._eaWindow = new Window_EnemyAppearance();
		this.addWindow(this._eaWindow);
		this._callEaiSceneChange = false;
	};

	Scene_Map.prototype.checkEaiShow = function () {
		if (this._callEaiSceneChange) { return }
		if ($gameMap.encounterList().length > 0 && !$gameMap.isEventRunning() && !this._messageWindow.isOpen()) {
			if (this._eaWindow.visible && $gameSwitches.value(hideKeySwitch)) {
				this._eaWindow.hide();
			} else if (!this._eaWindow.visible && !$gameSwitches.value(hideKeySwitch)) {
				this._eaWindow.show();
			}
		} else {
			if (this._eaWindow.visible) { this._eaWindow.hide() }
		}
	};

	Scene_Map.prototype.hideEai = function () {
		if (this._eaWindow) {
			this._callEaiSceneChange = true;
			this._eaWindow.hide();
		}
	};

	var _EAI_SMap_callMenu = Scene_Map.prototype.callMenu;
	Scene_Map.prototype.callMenu = function () {
		this.hideEai();
		_EAI_SMap_callMenu.call(this);
	};

	var _EAI_SMap_launchBattle = Scene_Map.prototype.launchBattle;
	Scene_Map.prototype.launchBattle = function () {
		this.hideEai();
		_EAI_SMap_launchBattle.call(this);
	};

	var _EAI_GMap_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function (mapId) {
		_EAI_GMap_setup.call(this, mapId);
		if (eaFrontSprite) { ImageManager.loadSystem(eaFrontSprite) }
		if (eaFrontSprite) { ImageManager.loadSystem(eaBackSprite) }
	}

	function Window_EnemyAppearance() {
		this.initialize.apply(this, arguments);
	};

	Window_EnemyAppearance.prototype = Object.create(Window_Base.prototype);
	Window_EnemyAppearance.prototype.constructor = Window_EnemyAppearance;

	Window_EnemyAppearance.prototype.initialize = function () {
		var sp = this.standardPadding();
		var x = eaPosX - sp;
		var y = eaPosY - sp;
		var w = eaSizeW + sp * 2;
		var h = eaSizeH + sp * 2;
		Window_Base.prototype.initialize.call(this, -sp, -sp, w, h);
		this.x += x + sp;
		this.y += y + sp;
		this.hide();
		this.opacity = 0;
		this.clearCount();
		this.refresh();
	};

	Window_EnemyAppearance.prototype.clearCount = function () {
		this._count = 0;
		this._aCount = 0;
		this._arrayCount = new Array(eaCol * eaRow);
		for (var i = 0; i < this._arrayCount.length; i++) {
			this._arrayCount[i] = Math.floor(eaSaturation / 2);
		}
	};

	Window_EnemyAppearance.prototype.redraw = function () {
		if (!this._array) {
			this._array = String(Array.prototype.concat.apply([], eaPattern)).split(',');
			this._fr = this._array.reduce(function (r, a) {
				return a !== 'n' && Number(a) > r ? Number(a) : r;
			}, 0);
		}
		var pixW = Math.max((eaSizeW / eaCol), 1);
		var pixH = Math.max((eaSizeH / eaRow), 1);
		var encounterCount = $gamePlayer._encounterCount;
		var frr = this._fr + eaAnimeFrame;
		if (this._fr > 0 && eaAnimeCount > 0) {
			this._aCount++;
			this._aCount = this._aCount % frr;
			for (var i = 0; i < this._array.length; i++) {
				for (var j = 0; j <= eaAnimeCount; j++) {
					var acc = eaSaturation - Math.floor(((eaSaturation / 2) / eaAnimeCount) * j);
					if (((this._aCount + j) % frr) == Number(this._array[i]) && this._fr > (j - 1)) {
						this._arrayCount[i] = acc
					}
				}
			}
		}

		var a = this._arrayCount;

		this.contents.clear();
		if (eaBackSprite) {
			var bitmap = ImageManager.loadSystem(eaBackSprite);
			this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, eaSizeW, eaSizeH);
		}
		this.contents.fillRect(0, 0, eaSizeW, eaSizeH, 'rgba(0,0,0,1.0)');
		for (var i = 0; i < this._array.length; i++) {
			var x = Math.floor(i % eaCol) * pixW;
			var y = Math.floor(i / eaCol) * pixH;

			if (this._array[i] != 'n') {
				var hue = Math.floor(224 * (encounterCount / $gamePlayer._maxEncounterCount));
				if (encounterCount <= eaRedCount) { hue = 0 }
				var color = this.changeRGB(hue, a[i], eaBrightness);
				this.contents.fillRect(x + 1, y + 1, pixW - 1, pixH - 1, color);
			} else {
				this.contents.clearRect(x, y, pixW, pixH);
			}
		}
		if (eaFrontSprite) {
			var bitmap = ImageManager.loadSystem(eaFrontSprite);
			this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, eaSizeW, eaSizeH);
		}
	};

	// HSV値をRGB値に変換
	Window_EnemyAppearance.prototype.changeRGB = function (hue, sat, v, opacity) {
		sat = sat || 255;
		v = v || 255;
		opacity = opacity || 1.0;
		hue = Math.max(Math.min(hue, 359), 0);
		v = Math.max(Math.min(v, 255), 0);
		sat = Math.max(Math.min(sat, 255), 0);
		var h1 = Math.floor(hue / 60);
		var f = (hue / 60) - h1;

		var m = v * (1 - (sat / 255));
		var n = v * (1 - (sat / 255) * f);
		var k = v * (1 - (sat / 255) * (1 - f));
		var red = 0;
		var green = 0;
		var blue = 0;

		switch (h1) {
			case 0:
				red = v;
				green = k;
				blue = m;
				break;
			case 1:
				red = n;
				green = v;
				blue = m;
				break;
			case 2:
				red = m;
				green = v;
				blue = k;
				break;
			case 3:
				red = m;
				green = n;
				blue = v;
				break;
			case 4:
				red = k;
				green = m;
				blue = v;
				break;
			case 5:
				red = v;
				green = m;
				blue = n;
				break;
		}
		var color = 'rgba(' + String([Math.floor(red),
		Math.floor(green),
		Math.floor(blue),
			opacity]) + ')';
		return color
	};


	Window_EnemyAppearance.prototype.refresh = function () {
		this.redraw();
	};

	Window_EnemyAppearance.prototype.update = function () {
		Window_Base.prototype.update.call(this);
		if (this._count === 0) { this.redraw() }
		this._count++;
		this._count = this._count % eaUpdateFrame;
	};
})();