//
//  立ち絵表示制御文字用マクロ設定 ver1.01
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
Imported['StandPictureSettingM'] = 1.01

if (!Imported.StandPictureSettingP) {
	console.error('StandPictureSettingPを導入してください。')
}
/*:
@plugindesc ver1.01/This is a plugin for setting macros for character control of character character display.
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

This plugin is a settings plugin for character control characters used to display standing pictures.
Place it above StandPictureEC and below StandPictureSettingP.

Plugin settings should be set in the format
△△△:×××

Please use the △△△ part as a help field to make the macro easier to understand.
The XXX part is what is actually used as a macro.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.01:
Fixed processing
ver1.00:
Released

@param Start Index
@desc The starting index. Unless there is a specific reason, specify 0.
@default 0

@param Macro0
@desc This is the macro at index 0.

@param Macro1
@desc This is the macro at index 1.

@param Macro2
@desc This is the macro at index 2.

@param Macro3
@desc This is the macro at index 3.

@param Macro4
@desc This is the macro at index 4.

@param Macro5
@desc This is the macro at index 5.

@param Macro6
@desc This is the macro at index 6.

@param Macro7
@desc This is the macro at index 7.

@param Macro8
@desc This is the macro at index 8.

@param Macro9
@desc This is the macro at index 9.

@param Macro10
@desc This is the macro at index 10.

@param Macro11
@desc This is the macro at index 11.

@param Macro12
@desc This is the macro at index 12.

@param Macro13
@desc This is the macro at index 13.

@param Macro14
@desc This is the macro at index 14.

@param Macro15
@desc This is the macro at index 15.

@param Macro16
@desc This is the macro at index 16.

@param Macro17
@desc This is the macro at index 17.

@param Macro18
@desc This is the macro at index 18.

@param Macro19
@desc This is the macro at index 19.

@param Macro20
@desc This is the macro at index 20.

@param Macro21
@desc This is the macro at index 21.

@param Macro22
@desc This is the macro at index 22.

@param Macro23
@desc This is the macro at index 23.

@param Macro24
@desc This is the macro at index 24.

@param Macro25
@desc This is the macro at index 25.

@param Macro26
@desc This is the macro at index 26.

@param Macro27
@desc This is the macro at index 27.

@param Macro28
@desc This is the macro at index 28.

@param Macro29
@desc This is the macro at index 29.

@param Macro30
@desc This is the macro at index 30.

@param Macro31
@desc This is the macro at index 31.

@param Macro32
@desc This is the macro at index 32.

@param Macro33
@desc This is the macro at index 33.

@param Macro34
@desc This is the macro at index 34.

@param Macro35
@desc This is the macro at index 35.

@param Macro36
@desc This is the macro at index 36.

@param Macro37
@desc This is the macro at index 37.

@param Macro38
@desc This is the macro at index 38.

@param Macro39
@desc This is the macro at index 39.

@param Macro40
@desc This is the macro at index 40.

@param Macro41
@desc This is the macro at index 41.

@param Macro42
@desc This is the macro at index 42.

@param Macro43
@desc This is the macro at index 43.

@param Macro44
@desc This is the macro at index 44.

@param Macro45
@desc This is the macro at index 45.

@param Macro46
@desc This is the macro at index 46.

@param Macro47
@desc This is the macro at index 47.

@param Macro48
@desc This is the macro at index 48.

@param Macro49
@desc This is the macro at index 49.

@param Macro50
@desc This is the macro at index 50.

@param Macro51
@desc This is the macro at index 51.

@param Macro52
@desc This is the macro at index 52.

@param Macro53
@desc This is the macro at index 53.

@param Macro54
@desc This is the macro at index 54.

@param Macro55
@desc This is the macro at index 55.

@param Macro56
@desc This is the macro at index 56.

@param Macro57
@desc This is the macro at index 57.

@param Macro58
@desc This is the macro at index 58.

@param Macro59
@desc This is the macro at index 59.

@param Macro60
@desc This is the macro at index 60.

@param Macro61
@desc This is the macro at index 61.

@param Macro62
@desc This is the macro at index 62.

@param Macro63
@desc This is the macro at index 63.

@param Macro64
@desc This is the macro at index 64.

@param Macro65
@desc This is the macro at index 65.

@param Macro66
@desc This is the macro at index 66.

@param Macro67
@desc This is the macro at index 67.

@param Macro68
@desc This is the macro at index 68.

@param Macro69
@desc This is the macro at index 69.

@param Macro70
@desc This is the macro at index 70.

@param Macro71
@desc This is the macro at index 71.

@param Macro72
@desc This is the macro at index 72.

@param Macro73
@desc This is the macro at index 73.

@param Macro74
@desc This is the macro at index 75.

@param Macro75
@desc This is the macro at index 75.

@param Macro76
@desc This is the macro at index 76.

@param Macro77
@desc This is the macro at index 77.

@param Macro78
@desc This is the macro at index 78.

@param Macro79
@desc This is the macro at index 79.

@param Macro80
@desc This is the macro at index 80.

@param Macro81
@desc This is the macro at index 81.

@param Macro82
@desc This is the macro at index 82.

@param Macro83
@desc This is the macro at index 83.

@param Macro84
@desc This is the macro at index 84.

@param Macro85
@desc This is the macro at index 85.

@param Macro86
@desc This is the macro at index 86.

@param Macro87
@desc This is the macro at index 87.

@param Macro88
@desc This is the macro at index 88.

@param Macro89
@desc This is the macro at index 89.

@param Macro90.
@desc This is the macro at index 90.

@param Macro91
@desc This is the macro at index 91.

@param Macro92
@desc This is the macro at index 92.

@param Macro93
@desc This is the macro at index 94.

@param Macro95
@desc This is the macro at index 95.

@param Macro96
@desc This is the macro at index 96.

@param Macro97
@desc This is the macro at index 97.

@param Macro98
@desc This is the macro at index 98.

@param Macro99
@desc This is the macro at index 99.
*/


/*:ja
@plugindesc ver1.01/立ち絵表示制御文字用のマクロ設定用プラグインです。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help

このプラグインは立ち絵表示制御文字用の設定プラグインです。
StandPictureECよりも上、StandPictureSettingPよりも下に配置してください。

プラグインの設定は、
○○○:×××
という形式で設定してください。
○○○の部分はマクロの内容をわかりやすくするためのヘルプ欄としてご活用ください。
実際にマクロとして使用されるのは、×××の部分になります。
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.01:
処理を修正
ver1.00:
公開

@param Start Index
@desc 開始インデックスです。 特に理由がない場合、0を指定してください。
@default 0

@param Macro0
@desc インデックス0番のマクロです。

@param Macro1
@desc インデックス1番のマクロです。

@param Macro2
@desc インデックス2番のマクロです。

@param Macro3
@desc インデックス3番のマクロです。

@param Macro4
@desc インデックス4番のマクロです。

@param Macro5
@desc インデックス5番のマクロです。

@param Macro6
@desc インデックス6番のマクロです。

@param Macro7
@desc インデックス7番のマクロです。

@param Macro8
@desc インデックス8番のマクロです。

@param Macro9
@desc インデックス9番のマクロです。

@param Macro10
@desc インデックス10番のマクロです。

@param Macro11
@desc インデックス11番のマクロです。

@param Macro12
@desc インデックス12番のマクロです。

@param Macro13
@desc インデックス13番のマクロです。

@param Macro14
@desc インデックス14番のマクロです。

@param Macro15
@desc インデックス15番のマクロです。

@param Macro16
@desc インデックス16番のマクロです。

@param Macro17
@desc インデックス17番のマクロです。

@param Macro18
@desc インデックス18番のマクロです。

@param Macro19
@desc インデックス19番のマクロです。

@param Macro20
@desc インデックス20番のマクロです。

@param Macro21
@desc インデックス21番のマクロです。

@param Macro22
@desc インデックス22番のマクロです。

@param Macro23
@desc インデックス23番のマクロです。

@param Macro24
@desc インデックス24番のマクロです。

@param Macro25
@desc インデックス25番のマクロです。

@param Macro26
@desc インデックス26番のマクロです。

@param Macro27
@desc インデックス27番のマクロです。

@param Macro28
@desc インデックス28番のマクロです。

@param Macro29
@desc インデックス29番のマクロです。

@param Macro30
@desc インデックス30番のマクロです。

@param Macro31
@desc インデックス31番のマクロです。

@param Macro32
@desc インデックス32番のマクロです。

@param Macro33
@desc インデックス33番のマクロです。

@param Macro34
@desc インデックス34番のマクロです。

@param Macro35
@desc インデックス35番のマクロです。

@param Macro36
@desc インデックス36番のマクロです。

@param Macro37
@desc インデックス37番のマクロです。

@param Macro38
@desc インデックス38番のマクロです。

@param Macro39
@desc インデックス39番のマクロです。

@param Macro40
@desc インデックス40番のマクロです。

@param Macro41
@desc インデックス41番のマクロです。

@param Macro42
@desc インデックス42番のマクロです。

@param Macro43
@desc インデックス43番のマクロです。

@param Macro44
@desc インデックス44番のマクロです。

@param Macro45
@desc インデックス45番のマクロです。

@param Macro46
@desc インデックス46番のマクロです。

@param Macro47
@desc インデックス47番のマクロです。

@param Macro48
@desc インデックス48番のマクロです。

@param Macro49
@desc インデックス49番のマクロです。

@param Macro50
@desc インデックス50番のマクロです。

@param Macro51
@desc インデックス51番のマクロです。

@param Macro52
@desc インデックス52番のマクロです。

@param Macro53
@desc インデックス53番のマクロです。

@param Macro54
@desc インデックス54番のマクロです。

@param Macro55
@desc インデックス55番のマクロです。

@param Macro56
@desc インデックス56番のマクロです。

@param Macro57
@desc インデックス57番のマクロです。

@param Macro58
@desc インデックス58番のマクロです。

@param Macro59
@desc インデックス59番のマクロです。

@param Macro60
@desc インデックス60番のマクロです。

@param Macro61
@desc インデックス61番のマクロです。

@param Macro62
@desc インデックス62番のマクロです。

@param Macro63
@desc インデックス63番のマクロです。

@param Macro64
@desc インデックス64番のマクロです。

@param Macro65
@desc インデックス65番のマクロです。

@param Macro66
@desc インデックス66番のマクロです。

@param Macro67
@desc インデックス67番のマクロです。

@param Macro68
@desc インデックス68番のマクロです。

@param Macro69
@desc インデックス69番のマクロです。

@param Macro70
@desc インデックス70番のマクロです。

@param Macro71
@desc インデックス71番のマクロです。

@param Macro72
@desc インデックス72番のマクロです。

@param Macro73
@desc インデックス73番のマクロです。

@param Macro74
@desc インデックス75番のマクロです。

@param Macro75
@desc インデックス75番のマクロです。

@param Macro76
@desc インデックス76番のマクロです。

@param Macro77
@desc インデックス77番のマクロです。

@param Macro78
@desc インデックス78番のマクロです。

@param Macro79
@desc インデックス79番のマクロです。

@param Macro80
@desc インデックス80番のマクロです。

@param Macro81
@desc インデックス81番のマクロです。

@param Macro82
@desc インデックス82番のマクロです。

@param Macro83
@desc インデックス83番のマクロです。

@param Macro84
@desc インデックス84番のマクロです。

@param Macro85
@desc インデックス85番のマクロです。

@param Macro86
@desc インデックス86番のマクロです。

@param Macro87
@desc インデックス87番のマクロです。

@param Macro88
@desc インデックス88番のマクロです。

@param Macro89
@desc インデックス89番のマクロです。

@param Macro90.
@desc インデックス90番のマクロです。

@param Macro91
@desc インデックス91番のマクロです。

@param Macro92
@desc インデックス92番のマクロです。

@param Macro93
@desc インデックス94番のマクロです。

@param Macro95
@desc インデックス95番のマクロです。

@param Macro96
@desc インデックス96番のマクロです。

@param Macro97
@desc インデックス97番のマクロです。

@param Macro98
@desc インデックス98番のマクロです。

@param Macro99
@desc インデックス99番のマクロです。
*/

(function () {
	var parameters = PluginManager.parameters('StandPictureSettingM');
	var startIndex = Number(parameters['Start Index'] || 0);

	StPicManager.macro = function (index) {
		if (this._macro) { return this._macro[index] }
		this._macro = [];
		for (var i = 0; i < 100; i++) {
			text = String(parameters[String('Macro' + i)] || '');
			if (text.match(/(.+?:)?(.+)/)) {
				this._macro[i + (startIndex * 100)] = RegExp.$2;
			}
		}
		return this._macro[index];
	}
}());