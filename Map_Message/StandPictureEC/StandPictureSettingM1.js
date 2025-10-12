//
//  立ち絵表示制御文字用マクロ設定サンプルマクロ ver1.01
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
Imported['StandPictureSettingM1'] = 1.01;

if (!Imported.StandPictureSettingP) {
	console.error('StandPictureSettingPを導入してください。')
}
/*:
@plugindesc ver1.01/This is a sample macro setting plugin for character control of character image display.
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
.
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
@default 1

@param Macro0
@desc This is the macro at index 0.
@default Register test0~5 and have them appear from the left.:\SP[\V[1],200,624]\SP[\VI[1,1],193,453]\SP[\VI[1,3],206,212]\SP[\VI[1,4],209,254]\SP[\VI[1,5],204,226]\BP[\V[1],\VI[1,1],\VI[1,2],\VI[1,3],\VI[1,4],\VI[1,5],\VI[1,6]]\OP[\V[1],255,30]\MP[\V[1],380,624,30]

@param Macro1
@desc This is the macro at index 1.
@default Slide in from the right while fading No. 1:\SP[\V[\PV],\CALC[\BXW+240],\MWY]\MP[\V[\PV],\CALC[\BXW-240],\MWY,\V[\CALC[\PV+5]]]\OP[\V[\PV],255,\VI[\CALC[\PV+5],5]]

@param Macro2
@desc This is the macro at index 2.
@default Slide out to the right while fading No. 1:\OP[\V[\PV],0,\V[\CALC[\PV+5]]]\MP[\V[\PV],\CALC[\BXW],\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\PV]]

@param Macro3
@desc This is the macro at index 3.
@default Slide in from the left while fading No. 1:\SP[\V[\PV],-240,\MWY]\MP[\V[\PV],240,\MWY,\V[\CALC[\PV+5]]]\OP[\V[\PV],255,\VI[\CALC[\PV+5],5]]

@param Macro4
@desc This is the macro at index 4.
@default Slide out to the left while fading No. 1:\OP[\V[\PV],0,\V[\CALC[\PV+5]]]\MP[\V[\PV],0,\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\PV]]

@param Macro5
@desc This is the macro at index 5.
@default Fade in No. 1 to the right:\SP[\V[\PV],\CALC[\BXW-240],\MWY]\OP[\V[\PV],255,\V[\CALC[\PV+5]]]

@param Macro6
@desc This is the macro at index 6.
@default Fade in No. 1 to the left:\SP[\V[\PV],240,\MWY]\OP[\V[\PV],255,\V[\CALC[\PV+5]]]

@param Macro7
@desc This is the macro at index 7.
@default Fade change from No. 1 to No. 2:\CFP[\V[\PV],\V[\CALC[\PV+1]],\V[\CALC[\PV+5]]]

@param Macro8
@desc This is the macro at index 8.
@default Turn No. 1 to No. 2:\CP[\V[\PV],\V[\CALC[\PV+1]],\V[\CALC[\PV+5]]]

@param Macro9
@desc This is the macro at index 9.
@default Fade in No. 1 to the center of the screen:\SP[\V[\PV],\CALC[\BXW*0.5],\MWY]\OP[\V[\PV],255,\NNUM[\V[\CALC[\PV+5]]]]

@param Macro10
@desc This is the macro at index 10.
@default Fade out the first verse:\OP[\V[\PV],0,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\PV]]

@param Macro11
@desc This is the macro at index 11.
@default Slide in from the right while fading No. 2:\SP[\V[\CALC[\PV+1]],\CALC[\BXW+240],\MWY]\MP[\V[\CALC[\PV+1]],\CALC[\BXW-240],\MWY,\V[\CALC[\PV+5]]]\OP[\V[\CALC[\PV+1]],255,\VI[\CALC[\PV+5],5]]

@param Macro12
@desc This is the macro at index 12.
@default Slide out to the right while fading No. 2:\OP[\V[\CALC[\PV+1]],0,\V[\CALC[\PV+5]]]\MP[\V[\CALC[\PV+1]],\CALC[\BXW+240],\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+1]]]

@param Macro13
@desc This is the macro at index 13.
@default Slide in from the left while fading No. 2:\SP[\V[\CALC[\PV+1]],-240,\MWY]\MP[\V[\CALC[\PV+1]],240,\MWY,\V[\CALC[\PV+5]]]\OP[\V[\CALC[\PV+1]],255,\VI[\CALC[\PV+5],5]]

@param Macro14
@desc This is the macro at index 14.
@default Slide out to the left while fading No. 2:\OP[\V[\CALC[\PV+1]],0,\V[\CALC[\PV+5]]]\MP[\V[\CALC[\PV+1]],-240,\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+1]]]

@param Macro15
@desc This is the macro at index 15.
@default Fade in No. 2 to the right:\SP[\V[\CALC[\PV+1]],\CALC[\BXW-240],\MWY]\OP[\V[\CALC[\PV+1]],255,\V[\CALC[\PV+5]]]

@param Macro16
@desc This is the macro at index 16.
@default Fade in No. 2 to the left:\SP[\V[\CALC[\PV+1]],240,\MWY]\OP[\V[\CALC[\PV+1]],255,\V[\CALC[\PV+5]]]

@param Macro17
@desc This is the macro at index 17.
@default Fade change from No. 2 to No. 3:\CFP[\V[\CALC[\PV+1]],\V[\CALC[\PV+2]],\V[\CALC[\PV+5]]]

@param Macro18
@desc This is the macro at index 18.
@default No. 2 turns to No. 3:\CP[\V[\CALC[\PV+1]],\V[\CALC[\PV+2]],\V[\CALC[\PV+5]]]

@param Macro19
@desc This is the macro at index 19.
@default Fade in No. 2 to the center of the screen:\SP[\V[\CALC[\PV+1]],\CALC[\BXW/2],\MWY]\OP[\V[\CALC[\PV+1]],255,\NNUM[\V[\CALC[\PV+5]]]]

@param Macro20
@desc This is the macro at index 20.
@default Fade out verse 2:\OP[\V[\CALC[\PV+1]],0,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+1]]]

@param Macro21
@desc This is the macro at index 21.
@default Slide in from the right while fading No. 3:\SP[\V[\CALC[\PV+2]],\CALC[\BXW+240],\MWY]\MP[\V[\CALC[\PV+2]],\CALC[\BXW-240],\MWY,\V[\CALC[\PV+5]]]\OP[\V[\CALC[\PV+2]],255,\VI[\CALC[\PV+5],5]]

@param Macro22
@desc This is the macro at index 22.
@default Slide out to the right while fading No. 3:\OP[\V[\CALC[\PV+2]],0,\V[\CALC[\PV+5]]]\MP[\V[\CALC[\PV+2]],\CALC[\BXW+240],\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+2]]]

@param Macro23
@desc This is the macro at index 23.
@default Slide in from the left while fading No. 3:\SP[\V[\CALC[\PV+2]],-240,\MWY]\MP[\V[\CALC[\PV+2]],240,\MWY,\V[\CALC[\PV+5]]]\OP[\V[\CALC[\PV+2]],255,\VI[\CALC[\PV+5],5]]

@param Macro24
@desc This is the macro at index 24.
@default Slide out to the left while fading No. 3:\OP[\V[\CALC[\PV+2]],0,\V[\CALC[\PV+5]]]\MP[\V[\CALC[\PV+2]],-240,\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+2]]]

@param Macro25
@desc This is the macro at index 25.
@default Fade in No. 3 to the right:\SP[\V[\CALC[\PV+2]],\CALC[\BXW-240],\MWY]\OP[\V[\CALC[\PV+2]],255,\V[\CALC[\PV+5]]]

@param Macro26
@desc This is the macro at index 26.
@default Fade in No. 3 to the left:\SP[\V[\CALC[\PV+2]],240,\MWY]\OP[\V[\CALC[\PV+2]],255,\V[\CALC[\PV+5]]]

@param Macro27
@desc This is the macro at index 27.
@default Fade change from No. 3 to No. 4:\CFP[\V[\CALC[\PV+2]],\V[\CALC[\PV+3]],\V[\CALC[\PV+5]]]

@param Macro28
@desc This is the macro at index 28.
@default Turn No. 3 to No. 4:\CP[\V[\CALC[\PV+2]],\V[\CALC[\PV+3]],\V[\CALC[\PV+5]]]

@param Macro29
@desc This is the macro at index 29.
@default Fade in No. 3 to the center of the screen:\SP[\V[\CALC[\PV+2]],\CALC[\BXW/2],\MWY]\OP[\V[\CALC[\PV+2]],255,\NNUM[\V[\CALC[\PV+5]]]]

@param Macro30
@desc This is the macro at index 30.
@default Fade out No. 3:\OP[\V[\CALC[\PV+2]],0,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+2]]]

@param Macro31
@desc This is the macro at index 31.
@default Slide in from the right while fading No. 4:\SP[\V[\CALC[\PV+3]],\CALC[\BXW+240],\MWY]\MP[\V[\CALC[\PV+3]],\CALC[\BXW-240],\MWY,\V[\CALC[\PV+5]]]\OP[\V[\CALC[\PV+3]],255,\VI[\CALC[\PV+5],5]]

@param Macro32
@desc This is the macro at index 32.
@default Slide out to the right while fading No. 4:\OP[\V[\CALC[\PV+3]],0,\V[\CALC[\PV+5]]]\MP[\V[\CALC[\PV+3]],\CALC[\BXW+240],\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+3]]]

@param Macro33
@desc This is the macro at index 33.
@default Slide in from the left while fading No. 4:\SP[\V[\CALC[\PV+3]],-240,\MWY]\MP[\V[\CALC[\PV+3]],240,\MWY,\V[\CALC[\PV+5]]]\OP[\V[\CALC[\PV+3]],255,\VI[\CALC[\PV+5],5]]

@param Macro34
@desc This is the macro at index 34.
@default Slide out to the left while fading No. 4:\OP[\V[\CALC[\PV+3]],0,\V[\CALC[\PV+5]]]\MP[\V[\CALC[\PV+3]],-240,\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+3]]]

@param Macro35
@desc This is the macro at index 35.
@default Fade in No. 4 to the right:\SP[\V[\CALC[\PV+3]],\CALC[\BXW-240],\MWY]\OP[\V[\CALC[\PV+3]],255,\V[\CALC[\PV+5]]]

@param Macro36
@desc This is the macro at index 36.
@default Fade in No. 4 to the left:\SP[\V[\CALC[\PV+3]],240,\MWY]\OP[\V[\CALC[\PV+3]],255,\V[\CALC[\PV+5]]]

@param Macro37
@desc This is the macro at index 37.
@default Fade change from No. 4 to No. 5:\CFP[\V[\CALC[\PV+3]],\V[\CALC[\PV+4]],\V[\CALC[\PV+5]]]

@param Macro38
@desc This is the macro at index 38.
@default No. 4 turns to No. 5:\CP[\V[\CALC[\PV+3]],\V[\CALC[\PV+4]],\V[\CALC[\PV+5]]]

@param Macro39
@desc This is the macro at index 39.
@default Fade in No. 4 to the center of the screen:\SP[\V[\CALC[\PV+3]],\CALC[\BXW/2],\MWY]\OP[\V[\CALC[\PV+3]],255,\NNUM[\V[\CALC[\PV+5]]]]

@param Macro40
@desc This is the macro at index 40.
@default Fade out No. 4:\OP[\V[\CALC[\PV+3]],0,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+3]]]

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
@plugindesc ver1.01/立ち絵表示制御文字用のサンプルマクロ設定プラグインです。
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
@default 1

@param Macro0
@desc インデックス0番のマクロです。
@default test0~5を登録して左から登場させます。:\SP[\V[1],200,624]\SP[\VI[1,1],193,453]\SP[\VI[1,3],206,212]\SP[\VI[1,4],209,254]\SP[\VI[1,5],204,226]\BP[\V[1],\VI[1,1],\VI[1,2],\VI[1,3],\VI[1,4],\VI[1,5],\VI[1,6]]\OP[\V[1],255,30]\MP[\V[1],380,624,30]

@param Macro1
@desc インデックス1番のマクロです。
@default 1番をフェードさせながら右からスライドイン:\SP[\V[\PV],\CALC[\BXW+240],\MWY]\MP[\V[\PV],\CALC[\BXW-240],\MWY,\V[\CALC[\PV+5]]]\OP[\V[\PV],255,\VI[\CALC[\PV+5],5]]

@param Macro2
@desc インデックス2番のマクロです。
@default 1番をフェードさせながら右にスライドアウト:\OP[\V[\PV],0,\V[\CALC[\PV+5]]]\MP[\V[\PV],\CALC[\BXW],\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\PV]]

@param Macro3
@desc インデックス3番のマクロです。
@default 1番をフェードさせながら左からスライドイン:\SP[\V[\PV],-240,\MWY]\MP[\V[\PV],240,\MWY,\V[\CALC[\PV+5]]]\OP[\V[\PV],255,\VI[\CALC[\PV+5],5]]

@param Macro4
@desc インデックス4番のマクロです。
@default 1番をフェードさせながら左にスライドアウト:\OP[\V[\PV],0,\V[\CALC[\PV+5]]]\MP[\V[\PV],0,\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\PV]]

@param Macro5
@desc インデックス5番のマクロです。
@default 1番を右側にフェードイン:\SP[\V[\PV],\CALC[\BXW-240],\MWY]\OP[\V[\PV],255,\V[\CALC[\PV+5]]]

@param Macro6
@desc インデックス6番のマクロです。
@default 1番を左側にフェードイン:\SP[\V[\PV],240,\MWY]\OP[\V[\PV],255,\V[\CALC[\PV+5]]]

@param Macro7
@desc インデックス7番のマクロです。
@default 1番を2番にフェードチェンジ:\CFP[\V[\PV],\V[\CALC[\PV+1]],\V[\CALC[\PV+5]]]

@param Macro8
@desc インデックス8番のマクロです。
@default 1番を2番にターンチェンジ:\CP[\V[\PV],\V[\CALC[\PV+1]],\V[\CALC[\PV+5]]]

@param Macro9
@desc インデックス9番のマクロです。
@default 1番を画面中央にフェードイン:\SP[\V[\PV],\CALC[\BXW*0.5],\MWY]\OP[\V[\PV],255,\NNUM[\V[\CALC[\PV+5]]]]

@param Macro10
@desc インデックス10番のマクロです。
@default 1番をフェードアウト:\OP[\V[\PV],0,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\PV]]

@param Macro11
@desc インデックス11番のマクロです。
@default 2番をフェードさせながら右からスライドイン:\SP[\V[\CALC[\PV+1]],\CALC[\BXW+240],\MWY]\MP[\V[\CALC[\PV+1]],\CALC[\BXW-240],\MWY,\V[\CALC[\PV+5]]]\OP[\V[\CALC[\PV+1]],255,\VI[\CALC[\PV+5],5]]

@param Macro12
@desc インデックス12番のマクロです。
@default 2番をフェードさせながら右にスライドアウト:\OP[\V[\CALC[\PV+1]],0,\V[\CALC[\PV+5]]]\MP[\V[\CALC[\PV+1]],\CALC[\BXW+240],\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+1]]]

@param Macro13
@desc インデックス13番のマクロです。
@default 2番をフェードさせながら左からスライドイン:\SP[\V[\CALC[\PV+1]],-240,\MWY]\MP[\V[\CALC[\PV+1]],240,\MWY,\V[\CALC[\PV+5]]]\OP[\V[\CALC[\PV+1]],255,\VI[\CALC[\PV+5],5]]

@param Macro14
@desc インデックス14番のマクロです。
@default 2番をフェードさせながら左にスライドアウト:\OP[\V[\CALC[\PV+1]],0,\V[\CALC[\PV+5]]]\MP[\V[\CALC[\PV+1]],-240,\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+1]]]

@param Macro15
@desc インデックス15番のマクロです。
@default 2番を右側にフェードイン:\SP[\V[\CALC[\PV+1]],\CALC[\BXW-240],\MWY]\OP[\V[\CALC[\PV+1]],255,\V[\CALC[\PV+5]]]

@param Macro16
@desc インデックス16番のマクロです。
@default 2番を左側にフェードイン:\SP[\V[\CALC[\PV+1]],240,\MWY]\OP[\V[\CALC[\PV+1]],255,\V[\CALC[\PV+5]]]

@param Macro17
@desc インデックス17番のマクロです。
@default 2番を3番にフェードチェンジ:\CFP[\V[\CALC[\PV+1]],\V[\CALC[\PV+2]],\V[\CALC[\PV+5]]]

@param Macro18
@desc インデックス18番のマクロです。
@default 2番を3番にターンチェンジ:\CP[\V[\CALC[\PV+1]],\V[\CALC[\PV+2]],\V[\CALC[\PV+5]]]

@param Macro19
@desc インデックス19番のマクロです。
@default 2番を画面中央にフェードイン:\SP[\V[\CALC[\PV+1]],\CALC[\BXW/2],\MWY]\OP[\V[\CALC[\PV+1]],255,\NNUM[\V[\CALC[\PV+5]]]]

@param Macro20
@desc インデックス20番のマクロです。
@default 2番をフェードアウト:\OP[\V[\CALC[\PV+1]],0,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+1]]]

@param Macro21
@desc インデックス21番のマクロです。
@default 3番をフェードさせながら右からスライドイン:\SP[\V[\CALC[\PV+2]],\CALC[\BXW+240],\MWY]\MP[\V[\CALC[\PV+2]],\CALC[\BXW-240],\MWY,\V[\CALC[\PV+5]]]\OP[\V[\CALC[\PV+2]],255,\VI[\CALC[\PV+5],5]]

@param Macro22
@desc インデックス22番のマクロです。
@default 3番をフェードさせながら右にスライドアウト:\OP[\V[\CALC[\PV+2]],0,\V[\CALC[\PV+5]]]\MP[\V[\CALC[\PV+2]],\CALC[\BXW+240],\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+2]]]

@param Macro23
@desc インデックス23番のマクロです。
@default 3番をフェードさせながら左からスライドイン:\SP[\V[\CALC[\PV+2]],-240,\MWY]\MP[\V[\CALC[\PV+2]],240,\MWY,\V[\CALC[\PV+5]]]\OP[\V[\CALC[\PV+2]],255,\VI[\CALC[\PV+5],5]]

@param Macro24
@desc インデックス24番のマクロです。
@default 3番をフェードさせながら左にスライドアウト:\OP[\V[\CALC[\PV+2]],0,\V[\CALC[\PV+5]]]\MP[\V[\CALC[\PV+2]],-240,\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+2]]]

@param Macro25
@desc インデックス25番のマクロです。
@default 3番を右側にフェードイン:\SP[\V[\CALC[\PV+2]],\CALC[\BXW-240],\MWY]\OP[\V[\CALC[\PV+2]],255,\V[\CALC[\PV+5]]]

@param Macro26
@desc インデックス26番のマクロです。
@default 3番を左側にフェードイン:\SP[\V[\CALC[\PV+2]],240,\MWY]\OP[\V[\CALC[\PV+2]],255,\V[\CALC[\PV+5]]]

@param Macro27
@desc インデックス27番のマクロです。
@default 3番を4番にフェードチェンジ:\CFP[\V[\CALC[\PV+2]],\V[\CALC[\PV+3]],\V[\CALC[\PV+5]]]

@param Macro28
@desc インデックス28番のマクロです。
@default 3番を4番にターンチェンジ:\CP[\V[\CALC[\PV+2]],\V[\CALC[\PV+3]],\V[\CALC[\PV+5]]]

@param Macro29
@desc インデックス29番のマクロです。
@default 3番を画面中央にフェードイン:\SP[\V[\CALC[\PV+2]],\CALC[\BXW/2],\MWY]\OP[\V[\CALC[\PV+2]],255,\NNUM[\V[\CALC[\PV+5]]]]

@param Macro30
@desc インデックス30番のマクロです。
@default 3番をフェードアウト:\OP[\V[\CALC[\PV+2]],0,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+2]]]

@param Macro31
@desc インデックス31番のマクロです。
@default 4番をフェードさせながら右からスライドイン:\SP[\V[\CALC[\PV+3]],\CALC[\BXW+240],\MWY]\MP[\V[\CALC[\PV+3]],\CALC[\BXW-240],\MWY,\V[\CALC[\PV+5]]]\OP[\V[\CALC[\PV+3]],255,\VI[\CALC[\PV+5],5]]

@param Macro32
@desc インデックス32番のマクロです。
@default 4番をフェードさせながら右にスライドアウト:\OP[\V[\CALC[\PV+3]],0,\V[\CALC[\PV+5]]]\MP[\V[\CALC[\PV+3]],\CALC[\BXW+240],\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+3]]]

@param Macro33
@desc インデックス33番のマクロです。
@default 4番をフェードさせながら左からスライドイン:\SP[\V[\CALC[\PV+3]],-240,\MWY]\MP[\V[\CALC[\PV+3]],240,\MWY,\V[\CALC[\PV+5]]]\OP[\V[\CALC[\PV+3]],255,\VI[\CALC[\PV+5],5]]

@param Macro34
@desc インデックス34番のマクロです。
@default 4番をフェードさせながら左にスライドアウト:\OP[\V[\CALC[\PV+3]],0,\V[\CALC[\PV+5]]]\MP[\V[\CALC[\PV+3]],-240,\MWY,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+3]]]

@param Macro35
@desc インデックス35番のマクロです。
@default 4番を右側にフェードイン:\SP[\V[\CALC[\PV+3]],\CALC[\BXW-240],\MWY]\OP[\V[\CALC[\PV+3]],255,\V[\CALC[\PV+5]]]

@param Macro36
@desc インデックス36番のマクロです。
@default 4番を左側にフェードイン:\SP[\V[\CALC[\PV+3]],240,\MWY]\OP[\V[\CALC[\PV+3]],255,\V[\CALC[\PV+5]]]

@param Macro37
@desc インデックス37番のマクロです。
@default 4番を5番にフェードチェンジ:\CFP[\V[\CALC[\PV+3]],\V[\CALC[\PV+4]],\V[\CALC[\PV+5]]]

@param Macro38
@desc インデックス38番のマクロです。
@default 4番を5番にターンチェンジ:\CP[\V[\CALC[\PV+3]],\V[\CALC[\PV+4]],\V[\CALC[\PV+5]]]

@param Macro39
@desc インデックス39番のマクロです。
@default 4番を画面中央にフェードイン:\SP[\V[\CALC[\PV+3]],\CALC[\BXW/2],\MWY]\OP[\V[\CALC[\PV+3]],255,\NNUM[\V[\CALC[\PV+5]]]]

@param Macro40
@desc インデックス40番のマクロです。
@default 4番をフェードアウト:\OP[\V[\CALC[\PV+3]],0,\NNUM[\V[\CALC[\PV+5]]]]\HP[\V[\CALC[\PV+3]]]

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
	var parameters = PluginManager.parameters('StandPictureSettingM1');
	var startIndex = Number(parameters['Start Index'] || 0);

	var _stPic_macro1 = StPicManager.macro;
	StPicManager.macro = function (index) {
		if (this._macro) { return this._macro[index] }
		_stPic_macro1.call(this);
		for (var i = 0; i < 100; i++) {
			text = String(parameters[String('Macro' + i)] || '');
			if (text.match(/(.+?:)?(.+)/)) {
				this._macro[i + (startIndex * 100)] = RegExp.$2;
			}
		}
		return this._macro[index];
	}
}());