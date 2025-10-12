//
//  入手インフォメーション ver1.171
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
Imported['GetInformation'] = 1.171;

if (!Imported.CommonPopupCore) {
    console.error('CommonPopupCoreを導入してください。')
}
/*:
@plugindesc ver1.171/This is a plugin that adds animated slide information when obtaining items, etc.
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
Plugin Commands
--------------------------------------------------------------------
ShowInfo DisplayText

*Please use half-width spaces.
------------------------------------------------------
This plugin requires the "Generic Popup Base" plugin.
Place it below the Generic Popup Base.
Also, you can disable the information by leaving the Show Text blank.
------------------------------------------------------
How to Use
------------------------------------------------------
Just install it and it will work.
For detailed settings, see the plugin parameters.

170524
A special control character has been added to the beginning of each text to add a sound effect when a popup occurs.
_SE[Name[,Volume,Pitch,Phase]]
*Volume, pitch, and phase are optional. If omitted, they will be treated as volume = 90, pitch = 100, and phase = 0.
Example: Play Skill 3 sound effect when the level-up popup appears.
_SE[Skill3]_actor's \C[4]_name\C[0] has increased by \C[14]_num points\C[24]!
-----------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.171:190213
Fixed a bug that caused an error when unequipping equipment.
ver1.17:190212
Added a setting to hide hidden items.
ver1.16:180514
Added an exit animation setting.
Added a logging function.
ver1.151:171025
Updated plugin parameter specifications to 1.5.0.
ver1.15:170525
Fixed a bug that caused popups to be misaligned when the message window was not at the bottom during battle.
Added a control character to play a sound effect when a popup occurs.
Fixed behavior when setting the behavior pattern to GrowUp and positioning the display at the top.
ver1.14:170216
Fixed a bug that prevented actor name conversion from working properly.
ver1.131:170104
Fixed a bug that could cause errors in certain situations.
ver1.13:
Adjusted the position of popups during battle.
Added a setting to delay the loot display at the end of battle.
Added a function to display a popup when a formation level increases.
ver1.12:
Changed the terms of use to the MIT License.
Fixed a bug that caused an infinite loop when displaying a popup for an actor that had never been allied.
ver1.11:
Added a behavior pattern setting.
Added a plugin parameter.
ver1.10:
Made some changes to the processing.
Added and revised help.
Added a plugin command to display custom text.
ver1.09:
Fixed a bug that prevented popups from displaying when a skill was forgotten.
Adjusted the display position of skill acquisition upon leveling up or class leveling up.
ver1.08:
Fixed a bug where experience points and ABP would not be displayed when disabling EXP and ABP during battle.
ver1.07:
Fixed a bug where the information disabling function was not working properly.
Added a Battle Show List setting for configuring the information displayed during battle.
ver1.06:
Fixed a bug where the position of popups during battle was incorrect.
var1.05:
Added a plugin parameter to correct the display position.
Added a setting to operate from top to bottom.
var1.04:
Fixed so that arbitrary text can be passed.
ver1.03:
Added popup processing for ABP and class level.
ver1.02:
Fixed a bug where popup display was reversed during leveling up.
ver1.01:
Fixed a bug where popups would appear even when value was 0.
Added conflict avoidance processing with YEP_CoreEngine.
ver1.00:
Released

@param Info Disable Switch Id
@desc The ID of the switch to disable the information obtained. When this switch is ON, the information is disabled.
@default 10
@type switch

@param Use Battle Info
@desc This setting determines whether the acquired information is used during battle. Set this to true or false.
@default true
@type boolean

@param Use Rewards Info
@desc This setting determines whether to display loot in the acquisition information. Set this to true or false.
@default true
@type boolean

@param Info Pattern
@desc This is the behavior pattern of the information you get. Normal: Normal GrowUp: Nyoki Stretch: Unyon
@default GrowUp
@type select
@option GrowUp
@option Normal
@option Stretch

@param Info Font Size
@desc Font size of the information provided.
@default 20
@type number

@param Info Count
@desc The display time for the information you get.
@default 120
@type number

@param Info Delay
@desc This is the delay for the information obtained. When set repeatedly, this value will be displayed with a delay.
@default 20
@type number

@param Info MoveWait
@desc The time when the acquisition information is fully displayed.
@default 100
@type number

@param Info MoveFade
@desc It's time to fade the information you get.
@default 10
@type number

@param Enable Out Move
@desc This setting determines whether or not to move when exiting.
@default false
@type boolean

@param Info Position
@desc The display position of the information you get. If you select "Up", it will be at the top of the screen.
@type select
@option Up

@param Info Slide Action
@desc The slide direction of the information you get. If you specify Down, it will slide from top to bottom.
@type select
@option Down

@param Info Sup X
@desc This is the X coordinate for correcting the display position of the information you get.
@default 0
@type number

@param Info Sup Y
@desc This is the Y coordinate for correcting the display position of the information obtained.
@default 0
@type number

@param Info Width
@desc The width of the information available.
@default 816
@type number

@param Gold Icon Index
@desc The index of the icon to use as the money icon.
@default 314
@type number

@param Actor Icon Start Index
@desc The first index of the icon to use as the actor's icon.
@default 320
@type number

@param Reward Popup Delay
@desc This is the delay before the loot display starts.
@default 0
@type number

@param Show Get Hide Item A
@desc This setting determines whether a popup will be displayed when hidden item A is obtained.
@default false
@type boolean

@param Show Get Hide Item B
@desc This setting determines whether a popup will be displayed when hidden item B is obtained.
@default false
@type boolean

@param Log Key
@desc This is the key setting for calling up the information log.
@default control
@type select
@option menu
@option control
@option pageup
@option pagedown
@option shift
@option tab

@param Log Max
@desc The maximum number of logs to save.
@default 100
@type number

@param Log Row
@desc The number of lines per log.
@default 2
@type number

@param Log Reverse
@desc This setting determines whether to reverse the order of the logs.
@default false
@type boolean

@param Menu Info Log Name
@desc The name of the infolog call command to add to the menu. Leave blank to not add the command to the menu.

@param Battle Show List
@desc This is a list of information to display during battle. Please specify item, gold, exp, skill, params, level, abp, classLevel.
@default item,gold,exp,skill,params,level,abp,classLevel

@param Get Gold Text
@desc This is the text that will be displayed when the amount of money increases. _icon: Icon index set above _num: Amount
@default \C[24]Got \I[_icon]_num\C[14]\G\C[0]!

@param Lost Gold Text
@desc This is the text displayed when money is reduced. _icon: Icon index set above _num: Amount
@default \C[2]Lost \I[_icon]_num\C[14]\G\C[0]...

@param Get Item Text
@desc This is the text displayed when an item is increased. _icon: Icon _name: Name _desc1: First line of explanation _desc2: Second line of explanation
@default \C[24]You got \I[_icon]_name!
@param Lost Item Text
@desc This is the text displayed when an item is reduced. _icon: Icon _name: Name _desc1: First line of explanation _desc2: Second line of explanation
@default \C[2]Lost \I[_icon]_name...\n\C[6]_desc1

@param Get Item Text Num
@desc Increased items. 2 or more. _icon: Icon _name: Name _num: Quantity _desc1: Explanation 1st line _desc2: Explanation 2nd line
@default Got \C[14]_num \I[_icon]_name!\n\C[6]_desc1

@param Lost Item Text Num
@desc Item reduction. 2 or more. _icon: Icon _name: Name _num: Quantity _desc1: Explanation 1st line _desc2: Explanation 2nd line
@default \C[2]Lost \C[14]_num \I[_icon]_name...\n\C[6]_desc1

@param Get Skill Text
@desc This is the text that will be displayed when you acquire the skill. _actor: Actor name _icon: Icon _name: Name _desc1: First line of explanation _desc2: Second line of explanation
@default _actor \C[24]learned \I[_icon]_name!\n\C[6]_desc1

@param Lost Skill Text
@desc This is the text displayed when the skill is forgotten. _actor: Actor name _icon: Icon _name: Name _desc1: First line of explanation _desc2: Second line of explanation
@default _actor \C[2]forgot \I[_icon]_name ...\n\C[6]_desc1

@param Exp Up Text
@desc This is the text displayed when the experience point increases. _actor: Actor name _name: Experience point name _num: Experience point
@default _actor \C[24]got \C[14]_num points\C[0]\C[4]_name\C[0]!

@param Exp Down Text
@desc This is the text displayed when the experience point decreases. _actor: Actor name _name: Experience point name _num: Experience point
@default _actor \C[2]lost \C[4]_name\C[0] at \C[14]_num point\C[0]...

@param Lv Up Text
@desc The text displayed when the level increases. _actor: Actor name _name: Level name _num: Level increased
@default _actor's \C[4]_name\C[24] has increased by \C[14]_num points\C[0]!

@param Lv Down Text
@desc The text displayed when the level is decreased. _actor: Actor name _name: Level name _num: Level decreased
@default _actor's \C[4]_name\C[2] has dropped \C[14]_num points\C[0]...

@param Param Up Text
@desc This is the text displayed when an ability score increases. _actor: Actor name _name: Param score name _num: Increased level
@default _actor's \C[4]_name\C[24] has increased by \C[14]_num points\C[0]!

@param Param Down Text
@desc This is the text displayed when an ability score is decreased. _actor: Actor name _name: Name of ability score _num: Level decreased
@default _actor's \C[4]_name\C[2] has dropped \C[14]_num points\C[0]...

@param Abp Up Text
@desc This is the text displayed when class experience points increase. _actor: Actor name _name: Experience point name _num: Experience point
@default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[24]得た！
_actor got \C[14]_num points \C[4]_name \C[24]!

@param Abp Down Text
@desc This is the text displayed when class experience points decrease. _actor: Actor name _name: Experience point name _num: Experience point
@default _actor \C[2]lost \C[4]_name\C[0] at \C[14]_num point\C[0]...

@param Class Lv Up Text
@desc This is the text displayed when the class level increases. _class: Class name _actor: Actor name _name: Level name _num: Level increased
@default _actor's _name\C[0] of \C[4]_class \C[24]has increased \C[0]by \C[14]_num points!

@param Class Lv Down Text
@desc This is the text displayed when the class level is decreased. _class: Class name _actor: Actor name _name: Level name _num: Level decreased
@default _actorは\C[4]_classの_name\C[0]が\C[14]_numポイント\C[2]下がった・・・
_actor's _name of \C[4]_class\C[2] has dropped \C[0]by \C[14]_num points...

@param Formation Lv Up Text
@desc This is the text displayed when the formation level increases. _name: Formation name _num: Increased level
@default \C[4]_name's proficiency\C[24] has increased \C[0]by \C[14]_num points!

@param Formation Lv Max Text
@desc This is the text that will be displayed when you have mastered the formation. _name: The name of the formation
@default \C[14]Mastered \C[4]_name\C[0]!
*/


/*:ja
@plugindesc ver1.171/アイテムの入手などにスライドアニメするインフォメーションを追加するプラグインです。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
プラグインコマンド
------------------------------------------------------
ShowInfo 表示したいテキスト
インフォ表示 表示したいテキスト

※スペースは必ず半角で入力してください。
------------------------------------------------------
このプラグインには「汎用ポップアップベース」のプラグインが必要です。
汎用ポップアップベースより下に配置してください。
また、それぞれの表示テキストに何も記載しない場合、そのインフォメーションを無効化できます。
------------------------------------------------------
使い方
------------------------------------------------------
導入するだけで動作します。
詳細な設定は、プラグインパラメータを参照してください。

170524
それぞれのテキストの最初に追加することで、ポップアップ発生時にSEを追加する専用制御文字を追加しました。
_SE[名前[,音量,ピッチ,位相]]
※音量、ピッチ、位相は省略可能です。省略した場合、音量=90,ピッチ=100，位相=0として扱われます。
例：レベルアップのポップアップ時にSkill3のSEを鳴らす。
_SE[Skill3]_actorは\C[4]_name\C[0]が\C[14]_numポイント\C[24]上がった！
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.171:190213
装備解除時にエラーが発生するバグを修正
ver1.17:190212
隠しアイテムを表示しない設定を追加
ver1.16:180514
退場演出の設定を追加。
ログ機能を追加。
ver1.151:171025
プラグインパラメータの仕様を1.5.0に更新。
ver1.15:170525
戦闘中にメッセージウィンドウが下以外の場合、ポップアップの位置がずれるバグを修正しました。
ポップアップ時にSEを再生する制御文字を追加しました。
動作パターンをGrowUpに指定して、表示位置を上にした場合の動作を修正しました。
ver1.14:170216
アクター名の変換が正常に動作していなかったバグを修正しました。
ver1.131:170104
特定の状況でエラーが発生することのあるバグを修正しました。
ver1.13:
戦闘中のポップアップ位置を調整しました。
戦闘終了時の戦利品表示にディレイをかける設定を追加しました。
陣形レベルが上がった時にポップアップを表示する機能を追加しました。
ver1.12:
利用規約をMITライセンスに変更しました。
一度も仲間になっていないアクターに対してポップアップを表示すると、無限ループに陥るバグを修正しました。
ver1.11:
動作パターンの設定を追加しました。
プラグインパラメータを追加しました。
ver1.10:
処理内容を少し変更しました。
ヘルプを追加・修正しました。
任意のテキストを表示するプラグインコマンドを追加しました。
ver1.09:
スキルを忘れさせた際のポップアップが表示されないバグを修正しました。
レベルアップ時やクラスレベルアップ時のスキル習得の表示位置を調整しました。
ver1.08:
戦闘中の表示をexpとabpを無効化すると、経験値やABPが入らないバグを修正しました。
ver1.07:
インフォメーションを無効化する機能が正常に機能していなかったバグを修正しました。
戦闘時に表示するインフォメーションを設定するBattle Show Listの設定項目を追加しました。
ver1.06:
戦闘中のポップアップの位置が正常でなかったバグを修正しました。
var1.05:
表示位置を補正するためのプラグインパラメータを追加しました。
上から下へ動作する設定を追加しました。
var1.04:
任意のテキストを渡せるように修正しました。
ver1.03:
ABPとクラスレベルのポップアップ処理を追加しました。
ver1.02:
レベルアップ処理でポップアップ表示が逆になっていたバグを修正しました。
ver1.01:
valueが0の状態でもポップアップしていたバグを修正しました。
YEP_CoreEngineとの競合回避処理を追加しました。
ver1.00:
公開

@param Info Disable Switch Id
@desc 入手インフォメーションを無効化するためのスイッチのIDです。 このスイッチがONの時、インフォメーションが無効化されます。
@default 10
@type switch

@param Use Battle Info
@desc 入手インフォメーションを戦闘中に使用するかの設定です。 true/falseで設定してください。
@default true
@type boolean

@param Use Rewards Info
@desc 戦利品を入手インフォメーションで表示するかの設定です。 true/falseで設定してください。
@default true
@type boolean

@param Info Pattern
@desc 入手インフォメーションの動作パターンです。 Normal:普通 GrowUp:にょき Stretch:うにょーん
@default GrowUp
@type select
@option GrowUp
@option Normal
@option Stretch

@param Info Font Size
@desc 入手インフォメーションの文字サイズです。
@default 20
@type number

@param Info Count
@desc 入手インフォメーションの表示時間です。
@default 120
@type number

@param Info Delay
@desc 入手インフォメーションのディレイです。 連続で設定された時、この数値の表示ディレイがかかります。
@default 20
@type number

@param Info MoveWait
@desc 入手インフォメーションが完全に表示された状態の時間です。
@default 100
@type number

@param Info MoveFade
@desc 入手インフォメーションのフェードの時間です。
@default 10
@type number

@param Enable Out Move
@desc 退場時の移動を行うかの設定です。
@default false
@type boolean

@param Info Position
@desc 入手インフォメーションの表示位置です。 Upを指定すると、画面上部になります。
@type select
@option Up

@param Info Slide Action
@desc 入手インフォメーションのスライド方向です。 Downを指定すると、上から下になります。
@type select
@option Down

@param Info Sup X
@desc 入手インフォメーションの表示位置補正X座標です。
@default 0
@type number

@param Info Sup Y
@desc 入手インフォメーションの表示位置補正Y座標です。
@default 0
@type number

@param Info Width
@desc 入手インフォメーションの横幅です。
@default 816
@type number

@param Gold Icon Index
@desc 所持金のアイコンとして使用するアイコンのインデックスです。
@default 314
@type number

@param Actor Icon Start Index
@desc アクターのアイコンとして使用するアイコンの最初のインデックスです。
@default 320
@type number

@param Reward Popup Delay
@desc 戦利品表示時に表示開始までにかけるディレイの数値です。
@default 0
@type number

@param Show Get Hide Item A
@desc 隠しアイテムAを取得したときにポップアップを表示するかの設定です。
@default false
@type boolean

@param Show Get Hide Item B
@desc 隠しアイテムBを取得したときにポップアップを表示するかの設定です。
@default false
@type boolean

@param Log Key
@desc インフォメーションログを呼び出すためのキー設定です。
@default control
@type select
@option menu
@option control
@option pageup
@option pagedown
@option shift
@option tab

@param Log Max
@desc 保存するログの最大数です。
@default 100
@type number

@param Log Row
@desc ログ1つ当たりの行数です。
@default 2
@type number

@param Log Reverse
@desc ログの並び順を逆にするかの設定です。
@default false
@type boolean

@param Menu Info Log Name
@desc メニューに追加するインフォログ呼び出しコマンドの名前です。 空白にすると、メニューにコマンドを追加しません。

@param Battle Show List
@desc 戦闘中に表示するインフォメーションのリストです。item,gold, exp,skill,params,level,abp,classLevelで指定してください。
@default item,gold,exp,skill,params,level,abp,classLevel

@param Get Gold Text
@desc 所持金の増加で表示されるテキストです。。 _icon:上記で設定したアイコンインデックス _num:金額
@default 「\I[_icon]_num\C[14]\G\C[0]」 を\C[24]手に入れた！

@param Lost Gold Text
@desc 所持金の減少で表示されるテキストです。 _icon:上記で設定したアイコンインデックス _num:金額
@default 「\I[_icon]_num\C[14]\G\C[0]」 を\C[2]失った・・・

@param Get Item Text
@desc アイテムの増加で表示されるテキストです。 _icon:アイコン _name:名前 _desc1:解説1行目 _desc2:解説2行目
@default 「\I[_icon]_name」 を\C[24]手に入れた！\n\C[6]_desc1

@param Lost Item Text
@desc アイテムの減少で表示されるテキストです。 _icon:アイコン _name:名前 _desc1:解説1行目 _desc2:解説2行目
@default 「\I[_icon]_name」 を\C[2]失った・・・\n\C[6]_desc1

@param Get Item Text Num
@desc アイテム増加。2個以上。_icon:アイコン _name:名前 _num:個数 _desc1:解説1行目 _desc2:解説2行目
@default 「\I[_icon]_name」 を\C[14]_num個\C[24]手に入れた！\n\C[6]_desc1

@param Lost Item Text Num
@desc アイテム減少。2個以上。_icon:アイコン _name:名前 _num:個数 _desc1:解説1行目 _desc2:解説2行目
@default 「\I[_icon]_name」を\C[14]_num個\C[2]失った・・・\n\C[6]_desc1

@param Get Skill Text
@desc スキルの習得で表示されるテキストです。_actor:アクター名 _icon:アイコン _name:名前 _desc1:解説1行目 _desc2:解説2行目
@default _actorは「\I[_icon]_name」 を\C[24]覚えた！\n\C[6]_desc1

@param Lost Skill Text
@desc スキルの忘却で表示されるテキストです。_actor:アクター名 _icon:アイコン _name:名前 _desc1:解説1行目 _desc2:解説2行目
@default _actorは「\I[_icon]_name」を \C[2]忘れてしまった・・・\n\C[6]_desc1

@param Exp Up Text
@desc 経験値の増加で表示されるテキストです。 _actor:アクター名 _name:経験値の名前 _num:経験値
@default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[24]得た！

@param Exp Down Text
@desc 経験値の減少で表示されるテキストです。 _actor:アクター名 _name:経験値の名前 _num:経験値
@default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[2]失った・・・

@param Lv Up Text
@desc レベルの増加で表示されるテキストです。 _actor:アクター名 _name:レベルの名前 _num:上がったレベル
@default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[24]上がった！

@param Lv Down Text
@desc レベルの減少で表示されるテキストです。 _actor:アクター名 _name:レベルの名前 _num:下がったレベル
@default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[2]下がった・・・

@param Param Up Text
@desc 能力値の増加で表示されるテキストです。 _actor:アクター名 _name:能力値の名前 _num:上がったレベル
@default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[24]上がった！

@param Param Down Text
@desc 能力値の減少で表示されるテキストです。 _actor:アクター名 _name:能力値の名前 _num:下がったレベル
@default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[2]下がった・・・

@param Abp Up Text
@desc クラス経験値の増加で表示されるテキストです。 _actor:アクター名 _name:経験値の名前 _num:経験値
@default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[24]得た！

@param Abp Down Text
@desc クラス経験値の減少で表示されるテキストです。 _actor:アクター名 _name:経験値の名前 _num:経験値
@default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[2]失った・・・

@param Class Lv Up Text
@desc クラスレベルの増加で表示されるテキストです。 _class:クラス名 _actor:アクター名 _name:レベルの名前 _num:上がったレベル
@default _actorは\C[4]_classの_name\C[0]が\C[14]_numポイント\C[24]上がった！

@param Class Lv Down Text
@desc クラスレベルの減少で表示されるテキストです。 _class:クラス名 _actor:アクター名 _name:レベルの名前 _num:下がったレベル
@default _actorは\C[4]_classの_name\C[0]が\C[14]_numポイント\C[2]下がった・・・

@param Formation Lv Up Text
@desc 陣形レベルの増加で表示されるテキストです。 _name:陣形の名前 _num:上がったレベル
@default \C[4]_nameの熟練度\C[0]が\C[14]_numポイント\C[24]上がった！

@param Formation Lv Max Text
@desc 陣形をマスターした時に表示されるテキストです。 _name:陣形の名前
@default \C[4]_name\C[0]を\C[14]マスターした！
*/

(function () {
    var parameters = PluginManager.parameters('GetInformation');
    var infoDisableSwitchId = Number(parameters['Info Disable Switch Id'] || 10);
    var getGoldText = String(parameters['Get Gold Text']);
    var lostGoldText = String(parameters['Lost Gold Text']);
    var getInfoText = String(parameters['Get Item Text']);
    var lostInfoText = String(parameters['Lost Item Text']);
    var getInfoTextNum = String(parameters['Get Item Text Num']);
    var lostInfoTextNum = String(parameters['Lost Item Text Num']);
    var getInfoSkillText = String(parameters['Get Skill Text']);
    var lostInfoSkillText = String(parameters['Lost Skill Text']);
    var ExpUpText = String(parameters['Exp Up Text']);
    var ExpDownText = String(parameters['Exp Down Text']);
    var lvUpText = String(parameters['Lv Up Text']);
    var lvDownText = String(parameters['Lv Down Text']);
    var ParamUpText = String(parameters['Param Up Text']);
    var ParamDownText = String(parameters['Param Down Text']);
    var infoFontSize = Number(parameters['Info Font Size'] || 20);
    var infoCount = Number(parameters['Info Count'] || 120);
    var infoDelay = Number(parameters['Info Delay'] || 20);
    var infoMoveWait = Number(parameters['Info MoveWait'] || infoCount);
    var infoMoveFade = Number(parameters['Info MoveFade'] || 0);
    var enableOutMove = parameters['Enable Out Move'] === 'true';
    var goldIconIndex = Number(parameters['Gold Icon Index'] || 314);
    var actorIconStartIndex = Number(parameters['Actor Icon Start Index']);
    var useBattleInfo = String(parameters['Use Battle Info'] || 'true') === 'true';
    var useRewardsInfo = String(parameters['Use Rewards Info'] || 'true') === 'true';
    var infoSlideCount = 60;
    var infoPosition = String(parameters['Info Position'] || '');
    var infoSlideAction = String(parameters['Info Slide Action'] || '');
    var infoSupX = Number(parameters['Info Sup X'] || 0);
    var infoSupY = Number(parameters['Info Sup Y'] || 0);
    var infoPattern = parameters['Info Pattern'] || 'Normal';
    var infoWidth = parameters['Info Width'] || 816;
    var rewardPopupDelay = Number(parameters['Reward Popup Delay']);
    var logKey = parameters['Log Key'] || "";
    var logMax = Number(parameters['Log Max'] || 100);
    var logRow = Number(parameters['Log Row'] || 1);
    var logReverse = parameters['Log Reverse'] === 'true';
    var menuInfoLogName = parameters["Menu Info Log Name"] || '';

    var abpUpText = String(parameters['Abp Up Text']);
    var abpDownText = String(parameters['Abp Down Text']);
    var clvUpText = String(parameters['Class Lv Up Text']);
    var clvDownText = String(parameters['Class Lv Down Text']);

    var fLvUpText = String(parameters['Formation Lv Up Text']);
    var fLvMaxText = String(parameters['Formation Lv Max Text']);

    var battleShowList = String(parameters['Battle Show List']).split(',');

    var showGetHideItemA = parameters['Show Get Hide Item A'] === 'true';
    var showGetHideItemB = parameters['Show Get Hide Item B'] === 'true';

    var _gInfo_GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _gInfo_GInterpreter_pluginCommand.call(this, command, args);
        if (command === 'ShowInfo' || command === 'インフォ表示') {
            CommonPopupManager.showInfo({}, args[0], null);
        }
    };

    CommonPopupManager.popEnable = function () {
        var useBattle = $gameParty.inBattle() ? useBattleInfo : true;
        return !$gameSwitches.value(infoDisableSwitchId) && useBattle;
    };

    // Change Gold
    var _gInfo_GInterpreter_command125 = Game_Interpreter.prototype.command125;
    Game_Interpreter.prototype.command125 = function () {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command125.call(this);
        CommonPopupManager._popEnable = false;
        return result;
    };
    // Change Item
    var _gInfo_GInterpreter_command126 = Game_Interpreter.prototype.command126;
    Game_Interpreter.prototype.command126 = function () {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command126.call(this);
        CommonPopupManager._popEnable = false;
        return result;
    };
    // Change Weapon
    var _gInfo_GInterpreter_command127 = Game_Interpreter.prototype.command127;
    Game_Interpreter.prototype.command127 = function () {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command127.call(this);
        CommonPopupManager._popEnable = false;
        return result;
    };
    // Change Armor
    var _gInfo_GInterpreter_command128 = Game_Interpreter.prototype.command128;
    Game_Interpreter.prototype.command128 = function () {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command128.call(this);
        CommonPopupManager._popEnable = false;
        return result;
    };
    // Change EXP
    var _gInfo_GInterpreter_command315 = Game_Interpreter.prototype.command315;
    Game_Interpreter.prototype.command315 = function () {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command315.call(this);
        CommonPopupManager._popEnable = false;
        return result;
    };
    // Change Level
    var _gInfo_GInterpreter_command316 = Game_Interpreter.prototype.command316;
    Game_Interpreter.prototype.command316 = function () {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command316.call(this);
        CommonPopupManager._popEnable = false;
        return result;
    };
    // Change Parameter
    var _gInfo_GInterpreter_command317 = Game_Interpreter.prototype.command317;
    Game_Interpreter.prototype.command317 = function () {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command317.call(this);
        CommonPopupManager._popEnable = false;
        return result;
    };
    // Change Skill
    var _gInfo_GInterpreter_command318 = Game_Interpreter.prototype.command318;
    Game_Interpreter.prototype.command318 = function () {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        var result = _gInfo_GInterpreter_command318.call(this);
        CommonPopupManager._popEnable = false;
        return result;
    };

    Game_Actor.prototype.addParam = function (paramId, value) {
        Game_BattlerBase.prototype.addParam.call(this, paramId, value);
        if (CommonPopupManager._popEnable) {
            if ($gameParty.inBattle() && !battleShowList.contains('params')) { return }
            CommonPopupManager.showInfo({
                'name': TextManager.param(paramId),
                'value': value > 0
            }, value, 'param', this.actorId());
        }
    };
    var _gInfo_GParty_gainGold = Game_Party.prototype.gainGold;
    Game_Party.prototype.gainGold = function (amount) {
        _gInfo_GParty_gainGold.call(this, amount);
        if (CommonPopupManager._popEnable) {
            if ($gameParty.inBattle() && !battleShowList.contains('gold')) { return }
            var hash = {
                'name': '',
                'iconIndex': goldIconIndex,
                'description': '',
                'value': Math.abs(amount)
            };
            CommonPopupManager.showInfo(hash, amount, 'gold');
        }
    };

    var _gInfo_GParty_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
        var result = _gInfo_GParty_gainItem.call(this, item, amount, includeEquip);
        if (item) {
            var flag = (item.itypeId === 3 && showGetHideItemA) || (item.itypeId === 4 && showGetHideItemB);
            if (CommonPopupManager._popEnable) {
                if (!(this.inBattle() && !battleShowList.contains('item'))) {
                    if ([3, 4].indexOf(item.itypeId) < 0 || flag) {
                        CommonPopupManager.showInfo(item, amount, 'item');
                    }
                }
            }
        }
        if (Imported.YEP_CoreEngine) return result;
    };

    var _gInfo_GActor_learnSkill = Game_Actor.prototype.learnSkill;
    Game_Actor.prototype.learnSkill = function (skillId) {
        var isLearn = this.isLearnedSkill(skillId);
        _gInfo_GActor_learnSkill.call(this, skillId);
        if (CommonPopupManager._popEnable && !isLearn) {
            if ($gameParty.inBattle() && !battleShowList.contains('skill')) { return }
            CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
        }
    };
    var _gInfo_GActor_forgetSkill = Game_Actor.prototype.forgetSkill;
    Game_Actor.prototype.forgetSkill = function (skillId) {
        var isLearn = this.isLearnedSkill(skillId);
        _gInfo_GActor_forgetSkill.call(this, skillId);
        if (CommonPopupManager._popEnable && isLearn) {
            if ($gameParty.inBattle() && !battleShowList.contains('skill')) { return }
            CommonPopupManager.showInfo($dataSkills[skillId], 2, 'skill', this.actorId());
        }
    };
    var _gInfo_GActor_changeExp = Game_Actor.prototype.changeExp;
    Game_Actor.prototype.changeExp = function (exp, show) {
        var tExp = exp - this.currentExp();
        var plevel = this.level;
        var pSkills = this._skills.clone();
        if (CommonPopupManager._popEnable) {
            if (!$gameParty.inBattle() || battleShowList.contains('exp')) {
                CommonPopupManager.showInfo({
                    'name': TextManager.exp,
                    'value': tExp > 0
                }, tExp, 'exp', this.actorId());
            }
        }
        var tempEnable = CommonPopupManager._popEnable;
        CommonPopupManager._popEnable = false;
        _gInfo_GActor_changeExp.call(this, exp, show);
        CommonPopupManager._popEnable = tempEnable;
        if ((this.level - plevel) !== 0) {
            var upLevel = this.level - plevel;
            if (CommonPopupManager._popEnable) {
                if ($gameParty.inBattle() && !battleShowList.contains('level')) { return }
                CommonPopupManager.showInfo({
                    'name': TextManager.level,
                    'value': upLevel > 0
                }, upLevel, 'level', this.actorId());
            }
        }
        if (CommonPopupManager._popEnable) {
            this._skills.forEach(function (skillId) {
                if (!pSkills.contains(skillId)) {
                    CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
                }
            }.bind(this));
        }
    };

    var _gInfo_GActor_changeLevel = Game_Actor.prototype.changeLevel;
    Game_Actor.prototype.changeLevel = function (level, show) {
        var upLevel = level - this.level;
        var tempEnable = CommonPopupManager._popEnable;
        var pSkills = this._skills.clone();
        CommonPopupManager._popEnable = false;
        _gInfo_GActor_changeLevel.call(this, level, show);
        CommonPopupManager._popEnable = tempEnable;
        if (CommonPopupManager._popEnable) {
            if ($gameParty.inBattle() && !battleShowList.contains('level')) { return }
            CommonPopupManager.showInfo({
                'name': TextManager.level,
                'value': upLevel > 0
            }, upLevel, 'level', this.actorId());

            this._skills.forEach(function (skillId) {
                if (!pSkills.contains(skillId)) {
                    CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
                }
            }.bind(this));
        }
    };

    if (Imported['VXandAceHybridClass']) {

        // Change Class Level
        var _gInfo_GInterpreter_changeClassLevel = Game_Interpreter.prototype.changeClassLevel;
        Game_Interpreter.prototype.changeClassLevel = function (actorId, level, show) {
            CommonPopupManager._popEnable = CommonPopupManager.popEnable();
            _gInfo_GInterpreter_changeClassLevel.call(this, actorId, level, show);
            CommonPopupManager._popEnable = false;
        };

        // Change Abp
        var _gInfo_GInterpreter_changeAbp = Game_Interpreter.prototype.changeAbp;
        Game_Interpreter.prototype.changeAbp = function (actorId, abp, show) {
            CommonPopupManager._popEnable = CommonPopupManager.popEnable();
            var result = _gInfo_GInterpreter_changeAbp.call(this, actorId, abp, show);
            CommonPopupManager._popEnable = false;
            return result;
        };

        var _gInfo_GActor_changeAbp = Game_Actor.prototype.changeAbp;
        Game_Actor.prototype.changeAbp = function (abp, show) {
            var tAbp = abp - this.currentAbp();
            var plevel = this.currentClassLevel();
            var pSkills = this._skills.clone();
            if (CommonPopupManager._popEnable) {
                if (!$gameParty.inBattle() || battleShowList.contains('abp')) {
                    CommonPopupManager.showInfo({
                        'name': TextManager.abp,
                        'value': tAbp > 0
                    }, tAbp, 'abp', this.actorId());
                }
            }

            var tempEnable = CommonPopupManager._popEnable;
            CommonPopupManager._popEnable = false;

            _gInfo_GActor_changeAbp.call(this, abp, show);

            CommonPopupManager._popEnable = tempEnable;

            if ((this.currentClassLevel() - plevel) !== 0) {
                var upLevel = this.currentClassLevel() - plevel;
                if (CommonPopupManager._popEnable) {
                    if ($gameParty.inBattle() && !battleShowList.contains('classLevel')) { return }
                    CommonPopupManager.showInfo({
                        'name': TextManager.classLevel,
                        'value': upLevel > 0
                    }, upLevel, 'classLevel', this.actorId(), this.currentClass().name);
                }
            }
            if (CommonPopupManager._popEnable) {
                this._skills.forEach(function (skillId) {
                    if (!pSkills.contains(skillId)) {
                        CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
                    }
                }.bind(this));
            }
        };

        var _gInfo_GActor_changeClassLevel = Game_Actor.prototype.changeClassLevel;
        Game_Actor.prototype.changeClassLevel = function (level, show) {
            var upLevel = level - this.currentClassLevel();
            var tempEnable = CommonPopupManager._popEnable;
            var pSkills = this._skills.clone();
            CommonPopupManager._popEnable = false;
            _gInfo_GActor_changeClassLevel.call(this, level, show);
            CommonPopupManager._popEnable = tempEnable;
            if (CommonPopupManager._popEnable) {
                if ($gameParty.inBattle() && !battleShowList.contains('classLevel')) { return }
                CommonPopupManager.showInfo({
                    'name': TextManager.classLevel,
                    'value': upLevel > 0
                }, upLevel, 'classLevel', this.actorId(), this.currentClass().name);

                this._skills.forEach(function (skillId) {
                    if (!pSkills.contains(skillId)) {
                        CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this.actorId());
                    }
                }.bind(this));
            }
        };
    }

    var __BManager_displayRewards = BattleManager.displayRewards;
    BattleManager.displayRewards = function () {
        __BManager_displayRewards.call(this);
        if (Imported['BattleFormation']) {
            $gameTemp._popupDelay = rewardPopupDelay;
            var upLevel = this._upBfLevel;
            var item = $gameParty.battleFormation();
            if (CommonPopupManager.popEnable() && item) {
                if ($gameParty.inBattle() && !battleShowList.contains('formationLevel')) return;
                if ($gameParty.isMaxBfLevel(item.id)) {
                    CommonPopupManager.showInfo({
                        'name': item.name,
                        'iconIndex': item.iconIndex,
                        'value': 'max'
                    }, upLevel, 'formationLevel', null, null);
                } else {
                    CommonPopupManager.showInfo({
                        'name': item.name,
                        'iconIndex': item.iconIndex,
                        'value': upLevel > 0
                    }, upLevel, 'formationLevel', null, null);
                }
            }
            $gameTemp._popupDelay = 0;
        }
    };

    CommonPopupManager.showInfo = function (object, value, type, actor, c) {
        var text1 = null;
        if (value === 0) { return }
        var se = { name: '', volume: 90, pitch: 100, pan: 0 };
        switch (type) {
            case 'gold':
                text1 = getGoldText;
                if (value < 0) {
                    text1 = lostGoldText
                }
                break;
            case 'item':
                text1 = getInfoText;
                if (value > 1) {
                    text1 = getInfoTextNum
                } else if (value === -1) {
                    text1 = lostInfoText
                } else if (value < -1) {
                    text1 = lostInfoTextNum
                }
                break;
            case 'exp':
                text1 = object.value ? ExpUpText : ExpDownText;
                break;
            case 'level':
                text1 = object.value ? lvUpText : lvDownText;
                break;
            case 'abp':
                text1 = object.value ? abpUpText : abpDownText;
                break;
            case 'classLevel':
                text1 = object.value ? clvUpText : clvDownText;
                break;
            case 'param':
                text1 = object.value ? ParamUpText : ParamDownText;
                break;
            case 'skill':
                text1 = value === 1 ? getInfoSkillText : lostInfoSkillText;
                break;
            case 'formationLevel':
                text1 = object.value === 'max' ? fLvMaxText : fLvUpText;
                break;
            default:
                text1 = value;
        }
        if (text1 === '') return;
        if (text1 === 'null') return;
        text1 = text1.replace(/^_se\[(.+?)\]/i, function () {
            var tx = arguments[1].split(',');
            se.name = tx[0];
            if (tx[1]) se.volume = parseInt(tx[1], 10);
            if (tx[2]) se.pitch = parseInt(tx[2], 10);
            if (tx[3]) se.pan = parseInt(tx[3], 10);
            return '';
        }.bind(this));
        var descs = object.description ? object.description.split(/\n/) : [];
        if (actor) {
            actor = $gameActors.actor(actor);
            text1 = text1.replace(/_actor/g, actor.name());
            text1 = text1.replace(/_aicon/g, actor.actorId() + actorIconStartIndex - 1);
        }
        if (c) { text1 = text1.replace(/_class/g, c) }
        text1 = text1.replace(/_name/g, object.name);
        text1 = text1.replace(/_icon/g, object.iconIndex);
        text1 = text1.replace(/_num/g, Math.abs(value));
        text1 = descs[0] ? text1.replace(/_desc1/g, descs[0]) : text1.replace(/_desc1/g, '');
        text1 = descs[1] ? text1.replace(/_desc2/g, descs[1]) : text1.replace(/_desc2/g, '');
        var texts = text1.split(/\n|\\n/);
        for (var i = 0; i < texts.length; i++) {
            var text = texts[i].replace(/\\C\[\d+\]/g, '');
            if (text === '') { delete texts[i] }
        }
        texts = texts.compact();
        $gameSystem.pushInfoLog(text1);
        var oneHeight = (infoFontSize + 8)
        var height = oneHeight * texts.length;
        var bitmap = new Bitmap(Graphics.boxWidth, height);
        bitmap.fillRect(0, 0, infoWidth / 2, bitmap.height, 'rgba(0,0,0,0.5)');
        bitmap.gradientFillRect(infoWidth / 2, 0, infoWidth / 2, bitmap.height, 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0)');
        this.window().contents = bitmap;
        this.window().drawTextEx('\\FS[' + infoFontSize + ']', 0, 0);
        for (var i = 0; i < texts.length; i++) {
            var text = '\\FS[' + infoFontSize + ']' + texts[i]
            this.window().drawTextEx(text, 8, i * oneHeight);
        }
        var arg = this.setPopup([]);
        arg.bitmap = bitmap;
        arg.se = se;
        arg.enableOutEffect = enableOutMove;
        if (infoPattern === 'GrowUp') {
            arg.x = 0 + infoSupX;//Graphics.boxWidth * -1 + infoSupX;
            arg.y = Graphics.boxHeight;// - height;
            arg.moveX = 0;//Graphics.boxWidth;
            arg.anchorX = 0;
            arg.anchorY = 1.0;
            arg.pattern = -2;
            if (infoSlideAction === 'Down') arg.anchorY = 0;
        } else if (infoPattern === 'Stretch') {
            arg.x = 0 + infoSupX;
            arg.y = Graphics.boxHeight - height;
            arg.moveX = 0;
            arg.anchorX = 0;
            arg.anchorY = 0;
            arg.pattern = -1;
        } else {
            arg.x = Graphics.boxWidth * -1 + infoSupX;
            arg.y = Graphics.boxHeight - height;
            arg.moveX = Graphics.boxWidth;
            arg.anchorX = 0;
            arg.anchorY = 0;
        }
        if (infoPosition === 'Up') {
            arg.y = 0;
            if (infoPattern === 'GrowUp' && infoSlideAction !== 'Down') arg.y = height;
        }
        arg.y += infoSupY;
        if ($gameParty.inBattle() && (SceneManager._scene._messageWindow && SceneManager._scene._messageWindow.active)) {
            if (SceneManager._scene._messageWindow._positionType === 2) {
                var my = SceneManager._scene._messageWindow.y;
                arg.y = Math.min(arg.y, my - height + height * arg.anchorY);
            }
        }
        if ((SceneManager._scene._statusWindow && SceneManager._scene._statusWindow.isOpen())) {
            var sy = SceneManager._scene._statusWindow.y;
            arg.y = Math.min(arg.y, sy - height + height * arg.anchorY);
        }
        arg.moveY = 0;
        arg.count = infoCount;
        arg.fixed = false;
        arg.extend = [infoMoveFade, infoMoveWait];
        arg.slideCount = infoSlideCount;
        arg.delay = 0;
        arg.slideAction = infoSlideAction;
        if (!CommonPopupManager._tempCommonSprites) CommonPopupManager._tempCommonSprites = [];
        var array = CommonPopupManager._tempCommonSprites.compact();
        var ld = CommonPopupManager._lastIndex;
        if (ld !== undefined && ld >= 0 && array[ld]) {
            array.sort(function (a, b) { return a.delay > b.delay ? -1 : 1 });
            arg.delay = array[0].delay + infoDelay;
        }
        if ($gameTemp._popupDelay && arg.delay === 0) arg.delay += $gameTemp._popupDelay;
        CommonPopupManager._lastIndex = this._tempCommonSprites.setNullPos(arg);
    };

    var _gInfo_BManager_gainRewards = BattleManager.gainRewards;
    BattleManager.gainRewards = function () {
        CommonPopupManager._popEnable = CommonPopupManager.popEnable() && useRewardsInfo;
        $gameTemp._popupDelay = rewardPopupDelay;
        _gInfo_BManager_gainRewards.call(this);
        CommonPopupManager._popEnable = false;
        $gameTemp._popupDelay = 0;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_System.prototype.pushInfoLog = function (text) {
        if (!this._infoLog) this._infoLog = [];
        this._infoLog.unshift(text);
        if (this._infoLog.length > logMax) {
            for (; ;) {
                if (this._infoLog.length <= logMax) break;
                this._infoLog.pop();
            }
        }
    };

    Game_System.prototype.infoLog = function () {
        if (!this._infoLog) this._infoLog = [];
        return this._infoLog;
    };


    var __SMap_updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function () {
        __SMap_updateScene.call(this);
        if (!SceneManager.isSceneChanging()) {
            this.updateCallInfoLog();
        }
    };
    Scene_Map.prototype.updateCallInfoLog = function () {
        if (this.isInfoLogEnabled()) {
            if (this.isInfoLogCalled()) {
                this.infoLogCalling = true;
            }
            if (this.infoLogCalling && !$gamePlayer.isMoving()) {
                this.callInfoLog();
            }
        } else {
            this.infoLogCalling = false;
        }
    };

    Scene_Map.prototype.isInfoLogEnabled = function () {
        return logKey && !$gameMap.isEventRunning();
    };

    Scene_Map.prototype.isInfoLogCalled = function () {
        return Input.isTriggered(logKey) || TouchInput.isCancelled();
    };

    Scene_Map.prototype.callInfoLog = function () {
        SoundManager.playOk();
        SceneManager.push(Scene_InfoLog);
        $gameTemp.clearDestination();
        this._mapNameWindow.hide();
        this._waitCount = 2;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Scene_InfoLog() {
        this.initialize.apply(this, arguments);
    }

    Scene_InfoLog.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_InfoLog.prototype.constructor = Scene_InfoLog;

    Scene_InfoLog.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createInfoLogWindow();
    };

    Scene_InfoLog.prototype.createInfoLogWindow = function () {
        this._logWindow = new Window_InfoLog();
        this._logWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._logWindow);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_InfoLog() {
        this.initialize.apply(this, arguments);
    }

    Window_InfoLog.prototype = Object.create(Window_Selectable.prototype);
    Window_InfoLog.prototype.constructor = Window_InfoLog;

    Window_InfoLog.prototype.initialize = function () {
        var x = -this.standardPadding();
        var y = -this.standardPadding();
        var width = Graphics.boxWidth + this.standardPadding() * 2;
        var height = Graphics.boxHeight + this.standardPadding() * 2;
        this._max = $gameSystem.infoLog().length;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._upArrowSprite.x = this.contentsWidth() - 16;
        this._upArrowSprite.y += 16;
        this._downArrowSprite.x = this.contentsWidth() - 16;
        this._downArrowSprite.y -= 16;
        this.backOpacity = 0;
        this.refresh();
        this.activate();
        logReverse ? this.select(this.maxItems() - 1) : this.select(0);
    };

    Window_InfoLog.prototype.itemHeight = function () {
        return this.lineHeight() * logRow;
    };

    Window_InfoLog.prototype.drawItem = function (index) {
        var rect = this.itemRect(index);
        var texts = $gameSystem.infoLog();
        if (logReverse) texts = texts.slice(0).reverse();
        var color = 'rgba(0,0,0,0.5)';
        var ts = texts[index].split('\\n');
        var yy = rect.y;
        var l = ts.length;
        var h = rect.height;
        var id = index + 1;
        if (logReverse) id = this.maxItems() - id + 1;
        this.contents.fillRect(8, yy, this.contentsWidth() - 16, h, color);
        this.contents.fontSize = infoFontSize;
        this.changeTextColor(this.systemColor());
        this.drawText(('000' + id).slice(-3) + ':', 12, yy, 64);
        for (var i = 0, max = ts.length; i < max; i++) {
            if (i >= logRow) break;
            yy = rect.y + this.lineHeight() * i;
            if (max === 1 && logRow > 1) yy += (this.lineHeight() * logRow) / 2 - (this.lineHeight() / 2);
            this.drawTextEx('\\fs[' + infoFontSize + ']' + ts[i], 64, yy);
        }
    };

    Window_InfoLog.prototype.maxItems = function () {
        return this._max;
    };

    Window_InfoLog.prototype.lineHeight = function () {
        return infoFontSize + 8;
    };

    Window_InfoLog.prototype.itemRect = function (index) {
        var rect = Window_Selectable.prototype.itemRect.call(this, index);
        rect.y += 4;
        rect.x += 8;
        rect.width -= 16;
        return rect;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        __GInterpreter_pluginCommand.call(this, command, args);
        if (command === 'インフォログ' || command === 'SceneInfoLog') {
            switch (args[0]) {
                case '呼び出し':
                case 'call':
                    SceneManager.push(Scene_InfoLog);;
                    break;
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WMCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        __WMCommand_addOriginalCommands.call(this);
        if (menuInfoLogName) this.addCommand(menuInfoLogName, 'infoLog', true);
    };

    var __SMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        __SMenu_createCommandWindow.call(this);
        this._commandWindow.setHandler('infoLog', this.commandInfoLog.bind(this));
    };

    Scene_Menu.prototype.commandInfoLog = function () {
        SceneManager.push(Scene_InfoLog);
    };

    ////////////////////////////////////////////////////////////////////////////////////
})();