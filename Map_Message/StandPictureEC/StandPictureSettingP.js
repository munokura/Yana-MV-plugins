//
//  立ち絵表示制御文字用ピクチャ設定 ver1.02
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
Imported['StandPictureSettingP'] = 1.02;
/*:
@plugindesc ver1.02/This is a plugin for setting pictures for character control characters.
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

This plugin is a settings plugin for character control characters used to display standing images.
Place it above StandPictureEC and StandPictureSettingM.

The plugin settings are as follows:
FileName
or
FileName:blink,[blink frequency],[blink probability],[blink index array]...
or
FileName:lip,[lip-sync frequency],[1],[lip-sync index array]...

The frequency shifts the index array by one for each frame you set, changing the image to the index number of the array.
For example, if you set it to
blink,30,8,0,1,2,2,1,0
, a blink will be detected every 30 frames,
a blink will occur with a 1/8 probability, and the image will be changed to 0,1,2,2,1,0 every frame.

The unnecessary material deletion function is now supported, but there are a few things to note.
- Only folder names/image names will be excluded from deletion.
- Blinking and lip-syncing images cannot be excluded with this plugin.
- Use the ExcludeAvoidance plugin to exclude unwanted images from deletion.

-----------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver. 1.02:
Added support for deleting unnecessary materials
ver. 1.01:
Fixed processing
ver. 1.00:
Released

@param Start Index
@desc The starting index. Unless there is a specific reason, specify 0.
@default 0
@type file
@require 1
@dir img/

@param Picture0
@desc This is picture No. 0
@type file
@require 1
@dir img/

@param Picture1
@desc This is picture No. 1
@type file
@require 1
@dir img/

@param Picture2
@desc This is picture No. 2
@type file
@require 1
@dir img/

@param Picture3
@desc This is picture No. 3
@type file
@require 1
@dir img/

@param Picture4
@desc This is picture No. 4
@type file
@require 1
@dir img/

@param Picture5
@desc This is picture No. 5
@type file
@require 1
@dir img/

@param Picture6
@desc This is picture No. 6
@type file
@require 1
@dir img/

@param Picture7
@desc This is picture No. 7
@type file
@require 1
@dir img/

@param Picture8
@desc This is picture No. 8
@type file
@require 1
@dir img/

@param Picture9
@desc This is picture No. 9
@type file
@require 1
@dir img/

@param Picture10
@desc This is picture No. 10
@type file
@require 1
@dir img/

@param Picture11
@desc This is picture No. 11
@type file
@require 1
@dir img/

@param Picture12
@desc This is picture No. 12
@type file
@require 1
@dir img/

@param Picture13
@desc This is picture No. 13
@type file
@require 1
@dir img/

@param Picture14
@desc This is picture No. 14
@type file
@require 1
@dir img/

@param Picture15
@desc This is picture No. 15
@type file
@require 1
@dir img/

@param Picture16
@desc This is picture No. 16
@type file
@require 1
@dir img/

@param Picture17
@desc This is picture No. 17
@type file
@require 1
@dir img/

@param Picture18
@desc This is picture No. 18
@type file
@require 1
@dir img/

@param Picture19
@desc This is picture No. 19
@type file
@require 1
@dir img/

@param Picture20
@desc This is picture No. 20
@type file
@require 1
@dir img/

@param Picture21
@desc This is picture No. 21
@type file
@require 1
@dir img/

@param Picture22
@desc This is picture No. 22
@type file
@require 1
@dir img/

@param Picture23
@desc This is picture No. 23
@type file
@require 1
@dir img/

@param Picture24
@desc This is picture No. 24
@type file
@require 1
@dir img/

@param Picture25
@desc This is picture No. 25
@type file
@require 1
@dir img/

@param Picture26
@desc This is picture No. 26
@type file
@require 1
@dir img/

@param Picture27
@desc This is picture No. 27
@type file
@require 1
@dir img/

@param Picture28
@desc This is picture No. 28
@type file
@require 1
@dir img/

@param Picture29
@desc This is picture No. 29
@type file
@require 1
@dir img/

@param Picture30
@desc This is picture No. 30
@type file
@require 1
@dir img/

@param Picture31
@desc This is picture No. 31
@type file
@require 1
@dir img/

@param Picture32
@desc This is picture No. 32
@type file
@require 1
@dir img/

@param Picture33
@desc This is picture No. 33
@type file
@require 1
@dir img/

@param Picture34
@desc This is picture No. 34
@type file
@require 1
@dir img/

@param Picture35
@desc This is picture No. 35
@type file
@require 1
@dir img/

@param Picture36
@desc This is picture No. 36
@type file
@require 1
@dir img/

@param Picture37
@desc This is picture No. 37
@type file
@require 1
@dir img/

@param Picture38
@desc This is picture No. 38
@type file
@require 1
@dir img/

@param Picture39
@desc This is picture No. 39
@type file
@require 1
@dir img/

@param Picture40
@desc This is picture No. 40
@type file
@require 1
@dir img/

@param Picture41
@desc This is picture No. 41
@type file
@require 1
@dir img/

@param Picture42
@desc This is picture No. 42
@type file
@require 1
@dir img/

@param Picture43
@desc This is picture No. 43
@type file
@require 1
@dir img/

@param Picture44
@desc This is picture No. 44
@type file
@require 1
@dir img/

@param Picture45
@desc This is picture No. 45
@type file
@require 1
@dir img/

@param Picture46
@desc This is picture No. 46
@type file
@require 1
@dir img/

@param Picture47
@desc This is picture No. 47
@type file
@require 1
@dir img/

@param Picture48
@desc This is picture No. 48
@type file
@require 1
@dir img/

@param Picture49
@desc This is picture No. 49
@type file
@require 1
@dir img/

@param Picture50
@desc This is picture No. 50
@type file
@require 1
@dir img/

@param Picture51
@desc This is picture No. 51
@type file
@require 1
@dir img/

@param Picture52
@desc This is picture No. 52
@type file
@require 1
@dir img/

@param Picture53
@desc This is picture No. 53
@type file
@require 1
@dir img/

@param Picture54
@desc This is picture No. 54
@type file
@require 1
@dir img/

@param Picture55
@desc This is picture No. 55
@type file
@require 1
@dir img/

@param Picture56
@desc This is picture No. 56
@type file
@require 1
@dir img/

@param Picture57
@desc This is picture No. 57
@type file
@require 1
@dir img/

@param Picture58
@desc This is picture No. 58
@type file
@require 1
@dir img/

@param Picture59
@desc This is picture No. 59
@type file
@require 1
@dir img/

@param Picture60
@desc This is picture No. 60
@type file
@require 1
@dir img/

@param Picture61
@desc This is picture No. 61
@type file
@require 1
@dir img/

@param Picture62
@desc This is picture No. 62
@type file
@require 1
@dir img/

@param Picture63
@desc This is picture No. 63
@type file
@require 1
@dir img/

@param Picture64
@desc This is picture No. 64
@type file
@require 1
@dir img/

@param Picture65
@desc This is picture No. 65
@type file
@require 1
@dir img/

@param Picture66
@desc This is picture No. 66
@type file
@require 1
@dir img/

@param Picture67
@desc This is picture No. 67
@type file
@require 1
@dir img/

@param Picture68
@desc This is picture No. 68
@type file
@require 1
@dir img/

@param Picture69
@desc This is picture No. 69
@type file
@require 1
@dir img/

@param Picture70
@desc This is picture No. 70
@type file
@require 1
@dir img/

@param Picture71
@desc This is picture No. 71
@type file
@require 1
@dir img/

@param Picture72
@desc This is picture No. 72
@type file
@require 1
@dir img/

@param Picture73
@desc This is picture No. 73
@type file
@require 1
@dir img/

@param Picture74
@desc This is picture No. 74
@type file
@require 1
@dir img/

@param Picture75
@desc This is picture No. 75
@type file
@require 1
@dir img/

@param Picture76
@desc This is picture No. 76
@type file
@require 1
@dir img/

@param Picture77
@desc This is picture No. 77
@type file
@require 1
@dir img/

@param Picture78
@desc This is picture No. 78
@type file
@require 1
@dir img/

@param Picture79
@desc This is picture No. 79
@type file
@require 1
@dir img/

@param Picture80
@desc This is picture No. 80
@type file
@require 1
@dir img/

@param Picture81
@desc This is picture No. 81
@type file
@require 1
@dir img/

@param Picture82
@desc This is picture No. 82
@type file
@require 1
@dir img/

@param Picture83
@desc This is picture No. 83
@type file
@require 1
@dir img/

@param Picture84
@desc This is picture No. 84
@type file
@require 1
@dir img/

@param Picture85
@desc This is picture No. 85
@type file
@require 1
@dir img/

@param Picture86
@desc This is picture No. 86
@type file
@require 1
@dir img/

@param Picture87
@desc This is picture No. 87
@type file
@require 1
@dir img/

@param Picture88
@desc This is picture No. 88
@type file
@require 1
@dir img/

@param Picture89
@desc This is picture No. 89
@type file
@require 1
@dir img/

@param Picture90
@desc This is picture No. 90
@type file
@require 1
@dir img/

@param Picture91
@desc This is picture No. 91
@type file
@require 1
@dir img/

@param Picture92
@desc This is picture No. 92
@type file
@require 1
@dir img/

@param Picture93
@desc This is picture No. 93
@type file
@require 1
@dir img/

@param Picture94
@desc This is picture No. 94
@type file
@require 1
@dir img/

@param Picture95
@desc This is picture No. 95
@type file
@require 1
@dir img/

@param Picture96
@desc This is picture No. 96
@type file
@require 1
@dir img/

@param Picture97
@desc This is picture No. 97
@type file
@require 1
@dir img/

@param Picture98
@desc This is picture No. 98
@type file
@require 1
@dir img/

@param Picture99
@desc This is picture No. 99
@type file
@require 1
@dir img/
*/


/*:ja
@plugindesc ver1.02/立ち絵表示制御文字用のピクチャ設定用プラグインです。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help

このプラグインは立ち絵表示制御文字用の設定プラグインです。
StandPictureEC及び、StandPictureSettingMよりも上に配置してください。

プラグインの設定は
FileName
または、
FileName:blink,瞬き頻度,瞬き確率,瞬きインデックス配列・・・
または、
FileName:lip,口パク頻度,1,口パクインデックス配列・・・
と設定してください。
頻度は設定したフレーム毎にインデックス配列を1つずつずらして、配列のインデックス番号の画像に変更します。
blink,30,8,0,1,2,2,1,0と設定されている場合、30フレーム毎に瞬きの判定を行い、
1/8の確率で瞬きを発生させ、画像を1フレーム毎に0,1,2,2,1,0と変更します。

不要素材削除機能に対応しましたが、いくつか注意点があります。
・フォルダ名/画像名となっているもののみ削除対象外となります。
・まばたきや口パクの画像はこのプラグインでは対象外にできません。
・対象外の画像は、ExcludeAvoidanceのプラグインを使用して、削除対象から除外してください。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.02:
不要素材削除機能に対応
ver1.01:
処理を修正
ver1.00:
公開

@param Start Index
@desc 開始インデックスです。 特に理由がない場合、0を指定してください。
@default 0
@type file
@require 1
@dir img/

@param Picture0
@desc インデックス0番のピクチャです。
@type file
@require 1
@dir img/

@param Picture1
@desc インデックス1番のピクチャです。
@type file
@require 1
@dir img/

@param Picture2
@desc インデックス2番のピクチャです。
@type file
@require 1
@dir img/

@param Picture3
@desc インデックス3番のピクチャです。
@type file
@require 1
@dir img/

@param Picture4
@desc インデックス4番のピクチャです。
@type file
@require 1
@dir img/

@param Picture5
@desc インデックス5番のピクチャです。
@type file
@require 1
@dir img/

@param Picture6
@desc インデックス6番のピクチャです。
@type file
@require 1
@dir img/

@param Picture7
@desc インデックス7番のピクチャです。
@type file
@require 1
@dir img/

@param Picture8
@desc インデックス8番のピクチャです。
@type file
@require 1
@dir img/

@param Picture9
@desc インデックス9番のピクチャです。
@type file
@require 1
@dir img/

@param Picture10
@desc インデックス10番のピクチャです。
@type file
@require 1
@dir img/

@param Picture11
@desc インデックス11番のピクチャです。
@type file
@require 1
@dir img/

@param Picture12
@desc インデックス12番のピクチャです。
@type file
@require 1
@dir img/

@param Picture13
@desc インデックス13番のピクチャです。
@type file
@require 1
@dir img/

@param Picture14
@desc インデックス14番のピクチャです。
@type file
@require 1
@dir img/

@param Picture15
@desc インデックス15番のピクチャです。
@type file
@require 1
@dir img/

@param Picture16
@desc インデックス16番のピクチャです。
@type file
@require 1
@dir img/

@param Picture17
@desc インデックス17番のピクチャです。
@type file
@require 1
@dir img/

@param Picture18
@desc インデックス18番のピクチャです。
@type file
@require 1
@dir img/

@param Picture19
@desc インデックス19番のピクチャです。
@type file
@require 1
@dir img/

@param Picture20
@desc インデックス20番のピクチャです。
@type file
@require 1
@dir img/

@param Picture21
@desc インデックス21番のピクチャです。
@type file
@require 1
@dir img/

@param Picture22
@desc インデックス22番のピクチャです。
@type file
@require 1
@dir img/

@param Picture23
@desc インデックス23番のピクチャです。
@type file
@require 1
@dir img/

@param Picture24
@desc インデックス24番のピクチャです。
@type file
@require 1
@dir img/

@param Picture25
@desc インデックス25番のピクチャです。
@type file
@require 1
@dir img/

@param Picture26
@desc インデックス27番のピクチャです。
@type file
@require 1
@dir img/

@param Picture27
@desc インデックス27番のピクチャです。
@type file
@require 1
@dir img/

@param Picture28
@desc インデックス28番のピクチャです。
@type file
@require 1
@dir img/

@param Picture29
@desc インデックス29番のピクチャです。
@type file
@require 1
@dir img/

@param Picture30
@desc インデックス30番のピクチャです。
@type file
@require 1
@dir img/

@param Picture31
@desc インデックス31番のピクチャです。
@type file
@require 1
@dir img/

@param Picture32
@desc インデックス32番のピクチャです。
@type file
@require 1
@dir img/

@param Picture33
@desc インデックス33番のピクチャです。
@type file
@require 1
@dir img/

@param Picture34
@desc インデックス35番のピクチャです。
@type file
@require 1
@dir img/

@param Picture35
@desc インデックス735番のピクチャです。
@type file
@require 1
@dir img/

@param Picture36
@desc インデックス36番のピクチャです。
@type file
@require 1
@dir img/

@param Picture37
@desc インデックス37番のピクチャです。
@type file
@require 1
@dir img/

@param Picture38
@desc インデックス38番のピクチャです。
@type file
@require 1
@dir img/

@param Picture39
@desc インデックス39番のピクチャです。
@type file
@require 1
@dir img/

@param Picture40
@desc インデックス40番のピクチャです。
@type file
@require 1
@dir img/

@param Picture41
@desc インデックス41番のピクチャです。
@type file
@require 1
@dir img/

@param Picture42
@desc インデックス42番のピクチャです。
@type file
@require 1
@dir img/

@param Picture43
@desc インデックス43番のピクチャです。
@type file
@require 1
@dir img/

@param Picture44
@desc インデックス45番のピクチャです。
@type file
@require 1
@dir img/

@param Picture45
@desc インデックス45番のピクチャです。
@type file
@require 1
@dir img/

@param Picture46
@desc インデックス46番のピクチャです。
@type file
@require 1
@dir img/

@param Picture47
@desc インデックス47番のピクチャです。
@type file
@require 1
@dir img/

@param Picture48
@desc インデックス48番のピクチャです。
@type file
@require 1
@dir img/

@param Picture49
@desc インデックス49番のピクチャです。
@type file
@require 1
@dir img/

@param Picture50
@desc インデックス50番のピクチャです。
@type file
@require 1
@dir img/

@param Picture51
@desc インデックス51番のピクチャです。
@type file
@require 1
@dir img/

@param Picture52
@desc インデックス52番のピクチャです。
@type file
@require 1
@dir img/

@param Picture53
@desc インデックス53番のピクチャです。
@type file
@require 1
@dir img/

@param Picture54
@desc インデックス54番のピクチャです。
@type file
@require 1
@dir img/

@param Picture55
@desc インデックス55番のピクチャです。
@type file
@require 1
@dir img/

@param Picture56
@desc インデックス56番のピクチャです。
@type file
@require 1
@dir img/

@param Picture57
@desc インデックス57番のピクチャです。
@type file
@require 1
@dir img/

@param Picture58
@desc インデックス58番のピクチャです。
@type file
@require 1
@dir img/

@param Picture59
@desc インデックス59番のピクチャです。
@type file
@require 1
@dir img/

@param Picture60
@desc インデックス60番のピクチャです。
@type file
@require 1
@dir img/

@param Picture61
@desc インデックス61番のピクチャです。
@type file
@require 1
@dir img/

@param Picture62
@desc インデックス62番のピクチャです。
@type file
@require 1
@dir img/

@param Picture63
@desc インデックス63番のピクチャです。
@type file
@require 1
@dir img/

@param Picture64
@desc インデックス64番のピクチャです。
@type file
@require 1
@dir img/

@param Picture65
@desc インデックス65番のピクチャです。
@type file
@require 1
@dir img/

@param Picture66
@desc インデックス67番のピクチャです。
@type file
@require 1
@dir img/

@param Picture67
@desc インデックス67番のピクチャです。
@type file
@require 1
@dir img/

@param Picture68
@desc インデックス768番のピクチャです。
@type file
@require 1
@dir img/

@param Picture69
@desc インデックス69番のピクチャです。
@type file
@require 1
@dir img/

@param Picture70
@desc インデックス70番のピクチャです。
@type file
@require 1
@dir img/

@param Picture71
@desc インデックス71番のピクチャです。
@type file
@require 1
@dir img/

@param Picture72
@desc インデックス72番のピクチャです。
@type file
@require 1
@dir img/

@param Picture73
@desc インデックス73番のピクチャです。
@type file
@require 1
@dir img/

@param Picture74
@desc インデックス74番のピクチャです。
@type file
@require 1
@dir img/

@param Picture75
@desc インデックス75番のピクチャです。
@type file
@require 1
@dir img/

@param Picture76
@desc インデックス76番のピクチャです。
@type file
@require 1
@dir img/

@param Picture77
@desc インデックス77番のピクチャです。
@type file
@require 1
@dir img/

@param Picture78
@desc インデックス78番のピクチャです。
@type file
@require 1
@dir img/

@param Picture79
@desc インデックス79番のピクチャです。
@type file
@require 1
@dir img/

@param Picture80
@desc インデックス80番のピクチャです。
@type file
@require 1
@dir img/

@param Picture81
@desc インデックス81番のピクチャです。
@type file
@require 1
@dir img/

@param Picture82
@desc インデックス82番のピクチャです。
@type file
@require 1
@dir img/

@param Picture83
@desc インデックス83番のピクチャです。
@type file
@require 1
@dir img/

@param Picture84
@desc インデックス84番のピクチャです。
@type file
@require 1
@dir img/

@param Picture85
@desc インデックス85番のピクチャです。
@type file
@require 1
@dir img/

@param Picture86
@desc インデックス86番のピクチャです。
@type file
@require 1
@dir img/

@param Picture87
@desc インデックス87番のピクチャです。
@type file
@require 1
@dir img/

@param Picture88
@desc インデックス88番のピクチャです。
@type file
@require 1
@dir img/

@param Picture89
@desc インデックス89番のピクチャです。
@type file
@require 1
@dir img/

@param Picture90
@desc インデックス90番のピクチャです。
@type file
@require 1
@dir img/

@param Picture91
@desc インデックス91番のピクチャです。
@type file
@require 1
@dir img/

@param Picture92
@desc インデックス92番のピクチャです。
@type file
@require 1
@dir img/

@param Picture93
@desc インデックス93番のピクチャです。
@type file
@require 1
@dir img/

@param Picture94
@desc インデックス94番のピクチャです。
@type file
@require 1
@dir img/

@param Picture95
@desc インデックス95番のピクチャです。
@type file
@require 1
@dir img/

@param Picture96
@desc インデックス96番のピクチャです。
@type file
@require 1
@dir img/

@param Picture97
@desc インデックス97番のピクチャです。
@type file
@require 1
@dir img/

@param Picture98
@desc インデックス98番のピクチャです。
@type file
@require 1
@dir img/

@param Picture99
@desc インデックス99番のピクチャです。
@type file
@require 1
@dir img/
*/

function StPicManager() {
	throw new Error('This is a static class');
}

(function () {
	var parameters = PluginManager.parameters('StandPictureSettingP');
	var startIndex = Number(parameters['Start Index'] || 0);

	StPicManager.picture = function (index) {
		if (this._picture) { return this._picture[index] }
		this._picture = [];
		for (var i = 0; i < 100; i++) {
			var data = String(parameters[String('Picture' + i)] || '');
			var ary = [];
			if (data !== '') {
				if (data.match(/(.+):(.+?)((?:,\d+)+)/)) {
					text = RegExp.$1;
					ary[0] = RegExp.$2;
					params = RegExp.$3.split(/,/).slice(1);
					for (var j = 0; j < params.length; j++) {
						params[j] = parseInt(params[j]);
					}
					ary[1] = params.shift();
					ary[2] = params.shift();
					ary[3] = params;
					this._picture[i + (startIndex * 100)] = [text, ary];
				} else if (data.match(/(.+)/)) {
					this._picture[i + (startIndex * 100)] = [RegExp.$1];
				}
			}
		}
		return this._picture[index];
	};
}());