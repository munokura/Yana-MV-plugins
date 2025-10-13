//
//  素材削除回避プラグイン ver1.01
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
Imported['ExcludeAvoidance'] = 1.01;
/*:
@plugindesc ver1.01/To prevent deletion by the material deletion function, only definition is performed by the plugin.
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
There is no plugin command.
------------------------------------------------------
This plugin simply defines file names to prevent material deletion.

img/pictures/test
Please register with a path, such as .
------------------------------------------------------
--------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver. 1.01:
Fixed duplicate definitions of numbers 30 through 39.
ver. 1.00:
Released

@param File00
@desc Files to avoid deletion.
@type file
@require 1

@param File01
@desc Files to avoid deletion.
@type file
@require 1

@param File02
@desc Files to avoid deletion.
@type file
@require 1

@param File03
@desc Files to avoid deletion.
@type file
@require 1

@param File04
@desc Files to avoid deletion.
@type file
@require 1

@param File05
@desc Files to avoid deletion.
@type file
@require 1

@param File06
@desc Files to avoid deletion.
@type file
@require 1

@param File07
@desc Files to avoid deletion.
@type file
@require 1

@param File08
@desc Files to avoid deletion.
@type file
@require 1

@param File09
@desc Files to avoid deletion.
@type file
@require 1

@param File10
@desc Files to avoid deletion.
@type file
@require 1

@param File11
@desc Files to avoid deletion.
@type file
@require 1

@param File12
@desc Files to avoid deletion.
@type file
@require 1

@param File13
@desc Files to avoid deletion.
@type file
@require 1

@param File14
@desc Files to avoid deletion.
@type file
@require 1

@param File15
@desc Files to avoid deletion.
@type file
@require 1

@param File16
@desc Files to avoid deletion.
@type file
@require 1

@param File17
@desc Files to avoid deletion.
@type file
@require 1

@param File18
@desc Files to avoid deletion.
@type file
@require 1

@param File19
@desc Files to avoid deletion.
@type file
@require 1

@param File20
@desc Files to avoid deletion.
@type file
@require 1

@param File21
@desc Files to avoid deletion.
@type file
@require 1

@param File22
@desc Files to avoid deletion.
@type file
@require 1

@param File23
@desc Files to avoid deletion.
@type file
@require 1

@param File24
@desc Files to avoid deletion.
@type file
@require 1

@param File25
@desc Files to avoid deletion.
@type file
@require 1

@param File26
@desc Files to avoid deletion.
@type file
@require 1

@param File27
@desc Files to avoid deletion.
@type file
@require 1

@param File28
@desc Files to avoid deletion.
@type file
@require 1

@param File29
@desc Files to avoid deletion.
@type file
@require 1

@param File30
@desc Files to avoid deletion.
@type file
@require 1

@param File31
@desc Files to avoid deletion.
@type file
@require 1

@param File32
@desc Files to avoid deletion.
@type file
@require 1

@param File33
@desc Files to avoid deletion.
@type file
@require 1

@param File34
@desc Files to avoid deletion.
@type file
@require 1

@param File35
@desc Files to avoid deletion.
@type file
@require 1

@param File36
@desc Files to avoid deletion.
@type file
@require 1

@param File37
@desc Files to avoid deletion.
@type file
@require 1

@param File38
@desc Files to avoid deletion.
@type file
@require 1

@param File39
@desc Files to avoid deletion.
@type file
@require 1

@param File40
@desc Files to avoid deletion.
@type file
@require 1

@param File41
@desc Files to avoid deletion.
@type file
@require 1

@param File42
@desc Files to avoid deletion.
@type file
@require 1

@param File43
@desc Files to avoid deletion.
@type file
@require 1

@param File44
@desc Files to avoid deletion.
@type file
@require 1

@param File45
@desc Files to avoid deletion.
@type file
@require 1

@param File46
@desc Files to avoid deletion.
@type file
@require 1

@param File47
@desc Files to avoid deletion.
@type file
@require 1

@param File48
@desc Files to avoid deletion.
@type file
@require 1

@param File49
@desc Files to avoid deletion.
@type file
@require 1

@param File50
@desc Files to avoid deletion.
@type file
@require 1

@param File51
@desc Files to avoid deletion.
@type file
@require 1

@param File52
@desc Files to avoid deletion.
@type file
@require 1

@param File53
@desc Files to avoid deletion.
@type file
@require 1

@param File54
@desc Files to avoid deletion.
@type file
@require 1

@param File55
@desc Files to avoid deletion.
@type file
@require 1

@param File56
@desc Files to avoid deletion.
@type file
@require 1

@param File57
@desc Files to avoid deletion.
@type file
@require 1

@param File58
@desc Files to avoid deletion.
@type file
@require 1

@param File59
@desc Files to avoid deletion.
@type file
@require 1

@param File60
@desc Files to avoid deletion.
@type file
@require 1

@param File61
@desc Files to avoid deletion.
@type file
@require 1

@param File62
@desc Files to avoid deletion.
@type file
@require 1

@param File63
@desc Files to avoid deletion.
@type file
@require 1

@param File64
@desc Files to avoid deletion.
@type file
@require 1

@param File65
@desc Files to avoid deletion.
@type file
@require 1

@param File66
@desc Files to avoid deletion.
@type file
@require 1

@param File67
@desc Files to avoid deletion.
@type file
@require 1

@param File68
@desc Files to avoid deletion.
@type file
@require 1

@param File69
@desc Files to avoid deletion.
@type file
@require 1

@param File70
@desc Files to avoid deletion.
@type file
@require 1

@param File71
@desc Files to avoid deletion.
@type file
@require 1

@param File72
@desc Files to avoid deletion.
@type file
@require 1

@param File73
@desc Files to avoid deletion.
@type file
@require 1

@param File74
@desc Files to avoid deletion.
@type file
@require 1

@param File75
@desc Files to avoid deletion.
@type file
@require 1

@param File76
@desc Files to avoid deletion.
@type file
@require 1

@param File77
@desc Files to avoid deletion.
@type file
@require 1

@param File78
@desc Files to avoid deletion.
@type file
@require 1

@param File79
@desc Files to avoid deletion.
@type file
@require 1

@param File80
@desc Files to avoid deletion.
@type file
@require 1

@param File81
@desc Files to avoid deletion.
@type file
@require 1

@param File82
@desc Files to avoid deletion.
@type file
@require 1

@param File83
@desc Files to avoid deletion.
@type file
@require 1

@param File84
@desc Files to avoid deletion.
@type file
@require 1

@param File85
@desc Files to avoid deletion.
@type file
@require 1

@param File86
@desc Files to avoid deletion.
@type file
@require 1

@param File87
@desc Files to avoid deletion.
@type file
@require 1

@param File88
@desc Files to avoid deletion.
@type file
@require 1

@param File89
@desc Files to avoid deletion.
@type file
@require 1

@param File90
@desc Files to avoid deletion.
@type file
@require 1

@param File91
@desc Files to avoid deletion.
@type file
@require 1

@param File92
@desc Files to avoid deletion.
@type file
@require 1

@param File93
@desc Files to avoid deletion.
@type file
@require 1

@param File94
@desc Files to avoid deletion.
@type file
@require 1

@param File95
@desc Files to avoid deletion.
@type file
@require 1

@param File96
@desc Files to avoid deletion.
@type file
@require 1

@param File97
@desc Files to avoid deletion.
@type file
@require 1

@param File98
@desc Files to avoid deletion.
@type file
@require 1

@param File99
@desc Files to avoid deletion.
@type file
@require 1
*/


/*:ja
@plugindesc ver1.01/素材削除機能で削除されるのを防ぐため、プラグインで定義のみを行います。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
プラグインコマンドはありません。
------------------------------------------------------
素材削除を回避するためにファイル名を定義しておくだけのプラグインです。
img/pictures/test
など、パス付で登録してください。
------------------------------------------------------
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.01:
30~39番が重複して定義されていたのを修正。
ver1.00:
公開

@param File00
@desc 削除を回避するファイル。
@type file
@require 1

@param File01
@desc 削除を回避するファイル。
@type file
@require 1

@param File02
@desc 削除を回避するファイル。
@type file
@require 1

@param File03
@desc 削除を回避するファイル。
@type file
@require 1

@param File04
@desc 削除を回避するファイル。
@type file
@require 1

@param File05
@desc 削除を回避するファイル。
@type file
@require 1

@param File06
@desc 削除を回避するファイル。
@type file
@require 1

@param File07
@desc 削除を回避するファイル。
@type file
@require 1

@param File08
@desc 削除を回避するファイル。
@type file
@require 1

@param File09
@desc 削除を回避するファイル。
@type file
@require 1

@param File10
@desc 削除を回避するファイル。
@type file
@require 1

@param File11
@desc 削除を回避するファイル。
@type file
@require 1

@param File12
@desc 削除を回避するファイル。
@type file
@require 1

@param File13
@desc 削除を回避するファイル。
@type file
@require 1

@param File14
@desc 削除を回避するファイル。
@type file
@require 1

@param File15
@desc 削除を回避するファイル。
@type file
@require 1

@param File16
@desc 削除を回避するファイル。
@type file
@require 1

@param File17
@desc 削除を回避するファイル。
@type file
@require 1

@param File18
@desc 削除を回避するファイル。
@type file
@require 1

@param File19
@desc 削除を回避するファイル。
@type file
@require 1

@param File20
@desc 削除を回避するファイル。
@type file
@require 1

@param File21
@desc 削除を回避するファイル。
@type file
@require 1

@param File22
@desc 削除を回避するファイル。
@type file
@require 1

@param File23
@desc 削除を回避するファイル。
@type file
@require 1

@param File24
@desc 削除を回避するファイル。
@type file
@require 1

@param File25
@desc 削除を回避するファイル。
@type file
@require 1

@param File26
@desc 削除を回避するファイル。
@type file
@require 1

@param File27
@desc 削除を回避するファイル。
@type file
@require 1

@param File28
@desc 削除を回避するファイル。
@type file
@require 1

@param File29
@desc 削除を回避するファイル。
@type file
@require 1

@param File30
@desc 削除を回避するファイル。
@type file
@require 1

@param File31
@desc 削除を回避するファイル。
@type file
@require 1

@param File32
@desc 削除を回避するファイル。
@type file
@require 1

@param File33
@desc 削除を回避するファイル。
@type file
@require 1

@param File34
@desc 削除を回避するファイル。
@type file
@require 1

@param File35
@desc 削除を回避するファイル。
@type file
@require 1

@param File36
@desc 削除を回避するファイル。
@type file
@require 1

@param File37
@desc 削除を回避するファイル。
@type file
@require 1

@param File38
@desc 削除を回避するファイル。
@type file
@require 1

@param File39
@desc 削除を回避するファイル。
@type file
@require 1

@param File40
@desc 削除を回避するファイル。
@type file
@require 1

@param File41
@desc 削除を回避するファイル。
@type file
@require 1

@param File42
@desc 削除を回避するファイル。
@type file
@require 1

@param File43
@desc 削除を回避するファイル。
@type file
@require 1

@param File44
@desc 削除を回避するファイル。
@type file
@require 1

@param File45
@desc 削除を回避するファイル。
@type file
@require 1

@param File46
@desc 削除を回避するファイル。
@type file
@require 1

@param File47
@desc 削除を回避するファイル。
@type file
@require 1

@param File48
@desc 削除を回避するファイル。
@type file
@require 1

@param File49
@desc 削除を回避するファイル。
@type file
@require 1

@param File50
@desc 削除を回避するファイル。
@type file
@require 1

@param File51
@desc 削除を回避するファイル。
@type file
@require 1

@param File52
@desc 削除を回避するファイル。
@type file
@require 1

@param File53
@desc 削除を回避するファイル。
@type file
@require 1

@param File54
@desc 削除を回避するファイル。
@type file
@require 1

@param File55
@desc 削除を回避するファイル。
@type file
@require 1

@param File56
@desc 削除を回避するファイル。
@type file
@require 1

@param File57
@desc 削除を回避するファイル。
@type file
@require 1

@param File58
@desc 削除を回避するファイル。
@type file
@require 1

@param File59
@desc 削除を回避するファイル。
@type file
@require 1

@param File60
@desc 削除を回避するファイル。
@type file
@require 1

@param File61
@desc 削除を回避するファイル。
@type file
@require 1

@param File62
@desc 削除を回避するファイル。
@type file
@require 1

@param File63
@desc 削除を回避するファイル。
@type file
@require 1

@param File64
@desc 削除を回避するファイル。
@type file
@require 1

@param File65
@desc 削除を回避するファイル。
@type file
@require 1

@param File66
@desc 削除を回避するファイル。
@type file
@require 1

@param File67
@desc 削除を回避するファイル。
@type file
@require 1

@param File68
@desc 削除を回避するファイル。
@type file
@require 1

@param File69
@desc 削除を回避するファイル。
@type file
@require 1

@param File70
@desc 削除を回避するファイル。
@type file
@require 1

@param File71
@desc 削除を回避するファイル。
@type file
@require 1

@param File72
@desc 削除を回避するファイル。
@type file
@require 1

@param File73
@desc 削除を回避するファイル。
@type file
@require 1

@param File74
@desc 削除を回避するファイル。
@type file
@require 1

@param File75
@desc 削除を回避するファイル。
@type file
@require 1

@param File76
@desc 削除を回避するファイル。
@type file
@require 1

@param File77
@desc 削除を回避するファイル。
@type file
@require 1

@param File78
@desc 削除を回避するファイル。
@type file
@require 1

@param File79
@desc 削除を回避するファイル。
@type file
@require 1

@param File80
@desc 削除を回避するファイル。
@type file
@require 1

@param File81
@desc 削除を回避するファイル。
@type file
@require 1

@param File82
@desc 削除を回避するファイル。
@type file
@require 1

@param File83
@desc 削除を回避するファイル。
@type file
@require 1

@param File84
@desc 削除を回避するファイル。
@type file
@require 1

@param File85
@desc 削除を回避するファイル。
@type file
@require 1

@param File86
@desc 削除を回避するファイル。
@type file
@require 1

@param File87
@desc 削除を回避するファイル。
@type file
@require 1

@param File88
@desc 削除を回避するファイル。
@type file
@require 1

@param File89
@desc 削除を回避するファイル。
@type file
@require 1

@param File90
@desc 削除を回避するファイル。
@type file
@require 1

@param File91
@desc 削除を回避するファイル。
@type file
@require 1

@param File92
@desc 削除を回避するファイル。
@type file
@require 1

@param File93
@desc 削除を回避するファイル。
@type file
@require 1

@param File94
@desc 削除を回避するファイル。
@type file
@require 1

@param File95
@desc 削除を回避するファイル。
@type file
@require 1

@param File96
@desc 削除を回避するファイル。
@type file
@require 1

@param File97
@desc 削除を回避するファイル。
@type file
@require 1

@param File98
@desc 削除を回避するファイル。
@type file
@require 1

@param File99
@desc 削除を回避するファイル。
@type file
@require 1
*/
