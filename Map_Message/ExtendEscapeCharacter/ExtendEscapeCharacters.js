//
//  拡張制御文字 ver1.00
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
Imported['yExtendEscapeCharacters'] = 1.01;
/*:
@plugindesc ver1.01/Extends control characters.
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
Installation Notes
------------------------------------------------------
* The following plugins are configuration plugins for this plugin.
It will work without these, but Traits requiring the configuration plugins will be unavailable.
EECSetting_Audio (Required if using music-related control characters)
EECSetting_Macro (Required if using \m[x])
EECSetting_Picture (Optional. Required if using picture-related control characters, such as PIC<x>)

* If using this plugin in conjunction with FaceEC, place this plugin below it.
Also, in this case, this plugin's parameter, SetFace, will not be available.
The FaceEC parameter will be used.

* If using in conjunction with MessageAlignmentsEC, place this plugin above it.

* This plugin changes the face portion of messages to a sprite.
Therefore, it may be difficult to use it in conjunction with plugins that change the drawing of the face portion of messages.

* The following processing is very heavy, so it may be best not to use it too often.
- Resizing the window with the specified operation frame
(Increasing the WindowFrameSkip value will prevent the frame rate from dropping, but will result in less smooth operation.)

------------------------------------------------------
Plugin Commands
------------------------------------------------------
EEC MoveNumberInput x,y,w,h
- Changes the position of the number input window to x,y and the size to w,h.
- Only affects number input windows called after this command.

EEC MoveEventItem x,y,w,h
- Changes the position of the item selection window to x,y and the size to w,h.
- Only affects item selection windows called after this command.

EEC BindPicture n1,n2[,n3…]
- Binds n2[,n3…] with n1 as the master.
- Binding pictures will synchronize their behavior.
- Since it takes time for a picture to be displayed after being called,
before using this command, please wait a short time after displaying the picture.

-----------------------------------------------------
Setting Method
------------------------------------------------------
Adds control characters that can be used with the "Show Text" Event's Contents.
The following control characters are added.

--Initial Settings---
Changes the initial window settings.
You can set the display position, size, face, etc. when called.
Control characters beginning with _ are initial setting characters.

-Window Settings-
_MMW[x,y] Changes the initial window display position to x,y. The anchor is the top left (x=0,y=0).
_RMW[w,h] Sets the initial window size to w,h.
_OMW[o] Sets the initial window transparency to o.
_WC[r,g,b] Sets the window color to r,g,b.
_DWC Resets the window color to the one set in $gameSystem.
*MMW and RMW can also be used in the option display by setting them as the first option.

-Face Settings-
_FCR Changes the face display to the right.
_AF[n+i] Sets the face to the index i from actor n.
_SF[n+i] Sets the face to index i of actor n set in the plugin parameters.
_FRT[r] Sets the face angle to r°.
_FFH Sets the face to be mirrored horizontally.
_FFV Sets the face to be mirrored vertically.
_FO[o] Sets the face transparency to o.

--Replacement--
Converted by Window_Base and replaced with specific text.
\M[n] Replaces with the nth text set in EECSetting_Macro.
\PDAF[n] Replaces the nth actor's face with the character size displayed vertically.
\PDSF[n,i] Replaces with the ith face of the nth face set in SetFace plugin parameters.
\PDE[n] Replaces with the xxx image of <PDE:xxx> set in the nth enemy's note.
*PDAF control characters are displayed with y as the center of the face if the actor's note field contains a <PDA_CY:y> note.

--Action--
Control characters are processed by Window_Message and perform some action.

--Weight--
\WT[n] Applies a wait of n frames.

-Window Operation--
Basically, all d's are optional. If omitted, they are treated as 0.
Also, setting d to a negative value will wait for the previous action to finish before proceeding to the specified action.
\MMW[x,y[,d]] Moves the window position by x,y multiplied by d frames.
\RMW[w,h[,d]] Changes the window size by x,y multiplied by d frames. (This is heavy.)
\OMW[o[,d]] Changes the window transparency to o multiplied by d frames.
\WC[r,g,b[,d]] Changes the window color to r,g,b multiplied by d frames.
\DWC[d] Resets the window color to the $gameSystem setting multiplied by d frames.

-Face Control-
Basically, all d parameters are optional. If omitted, they will be treated as 0.
Also, setting d to a negative value will wait for the previous action to finish before proceeding to the specified action.
\FRT[r[,d]] Rotates the face angle by r° multiplied by d frames.
\FFV[d] Flips a face horizontally over d frames.
\FFH[d] Flips a face vertically over d frames.
\FO[o[,d]] Changes face transparency to o over d frames.
\FCI[n[,d]] Changes face index to n over d frames.
\AF[n[+i,d]] Changes face to actor n by shifting index i over d frames.
\SF[n[+i,d]] Changes face to index i of actor n specified in the plugin parameters over d frames.
*Note* If you call \FCI, \AF, or \SF while using either of the following two, the change will not be made correctly!
\FCT[r,g,b,gr[,d]] Changes face ColorTone to r,g,b,gr over d frames.
\FBC[r,g,b,a[,d]] Changes the BlendColor of a face to r,g,b,a over d frames.

-Event-related-
n is -1 for the player, 0 for the trigger event, and 1 or higher for the corresponding event ID.
\ANI can be set to -2 to target a face.
\BLN[n,i] Displays the i-th speech bubble on the n-th character.
\ANI[n,i] Displays the i-th animation on the n-th character.

-Music-related-
Volume (v), pitch (p), and phase (pn) can be omitted. If omitted, the default settings will be used.
n will use the name set in EECSetting_Audio.
You can also stop playback by setting n to 0.

\BGM[n[,v,p,pn]] Plays the BGM specified by n.
\BGS[n[,v,p,pn]] Plays the BGS specified by n.
\SE[n[,v,p,pn]] Plays the sound effect specified by n.
\ME[n[,v,p,pn]] Plays the medium effect specified by n.

\BGMFI[n,s[,v,p,pn]] Fades in the background music specified by n over s seconds.
\BGMFO[s] Fades out the background music over s seconds.
\BGSFI[n,s[,v,p,pn]] Fades in the background music specified by n over s seconds.
\BGSFO[s] Fades out the background music over s seconds.

-Picture-
\SPIC[n,name[,or,x,y,sx,sy,op,bm]]
Displays the picture of the image specified by name at number n with origin:or, X coordinate:x, Y coordinate:y, scale X:sx, scale Y:sy,
transparency:op, blend mode:bm. The parts after name are optional.
The following special specifications are also available for name:
P<n> Replaces with the nth picture set in EECSetting_Picture.
A<n> Replaces with xxx in the <Standing Picture: xxx> entry in the nth actor's Note field.
DT<xxx n> Displays the xxx string picture with font size n. (Requires the Dynamic String Picture Generation Plugin.)
*When using control characters, change [] to <>.

\MPIC[n,x,y[,d]] Moves the nth picture by x,y over d frames.
\ZPIC[n,sx,sy[,d]] Changes the nth picture to sx%,sy% over d frames.
\OPIC[n,op[,d]] Changes the opacity of the nth picture to op over d frames.
\ORPIC[n,or] Changes the origin of the nth picture to or. For or, 0 is the top left and 1 is the center.
\RPIC[n,rs] Rotates picture n at rotation speed rs.
\APIC[n,a] Changes the angle of picture n to a°.
\TPIC[n,r,g,b,gr[,d]] Changes the color tone of picture n to r,g,b,gr over d frames.
\NCPIC[n1,n2] Swaps the numbers of pictures n1 and n2.
\CFPIC[n,name[,d]] Changes picture n to the image named name over d frames, fading.
\CTPIC[n,name[,d]] Changes picture n to the image named name over d frames, flipping it.
\CXPIC[n,name[,d]] Changes picture n to the image named name over d frames, crossfading.
\BNPIC[n1,n2[,n3…]] Combines images n2[,n3…] with picture n1 as the master.
\FIPIC[n,nm[,d,x,y,t]] Sets image name to picture n and fades it in from direction d. x and y are offsets for the display position.
\FOPIC[n[,d,x,y]] Fades picture n in direction d. x and y are offsets for the display position.

When using \OPIC, the image position changes along with the origin. However, if the picture was rotated before use, the coordinates will not be calculated correctly.
------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.01:
Removed unused methods.
ver1.00:
Released

@param ToneRate
@desc This sets how many frames the tone changes every.
@default 2

@param WindowFrameSkip
@desc This setting determines how many frames the window size should change at each time.
@default 2

@param FadeDuration
@desc The time it takes for the picture to fade in and out.
@default 10

@param FadePosY
@desc This is the Y coordinate of the picture display position used for fading in and out pictures. It is the coordinate of the center of the image.
@default 225

@param ---------------

@param SetFace1
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace2
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace3
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace4
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace5
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace6
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace7
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace8
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace9
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace10
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param ---------------

@param SetFace11
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace12
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace13
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace14
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace15
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace16
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace17
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace18
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace19
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace20
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param ---------------

@param SetFace21
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace22
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace23
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace24
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace25
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace26
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace27
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace28
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace29
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace30
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param ---------------

@param SetFace31
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace32
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace33
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace34
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace35
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace36
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace37
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace38
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace39
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace40
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param ---------------

@param SetFace41
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace42
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace43
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace44
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace45
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace46
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace47
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace48
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace49
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param SetFace50
@desc The file name of the face to be recalled.
@type file
@require 1
@dir img/faces/

@param ---------------
*/


/*:ja
@plugindesc ver1.01/制御文字を拡張します。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
導入にあたっての注意
------------------------------------------------------
※ 以下のプラグインがこのプラグイン用の設定プラグインとなります。
導入しなくても動作はしますが、設定プラグインを必要とする機能は使用できなくなります。
EECSetting_Audio (音楽関係の制御文字を使う場合必要です)
EECSetting_Macro (\m[x]を使用する場合必要です)
EECSetting_Picture (任意です。ピクチャ関連の制御文字で、PIC<x>を使用する場合必要です)


※このプラグインをFaceECと併用する場合、こちらを下に配置してください。
また、その場合、このプラグインのパラメータ、SetFaceは使用できません。
FaceECのものが使用されます。

※MessageAlignmentsECと併用する場合、こちらを上に配置してください。

※このプラグインは、メッセージのフェイス部分をスプライトに変更しています。
なので、メッセージのフェイス部分の描画を変更するようなプラグインと併用は
難しいと思います。

※以下の処理は非常に重たいため、あまり使用しないほうが良いかもしれません。
・動作フレームを指定したウィンドウのリサイズ
(WindowFrameSkipの値を増やせばフレームレートは下がらなくなりますが、
 動作がスムーズでなくなります)

------------------------------------------------------
 プラグインコマンド
------------------------------------------------------
EEC 数値入力ウィンドウ移動 x,y,w,h
EEC MoveNumberInput x,y,w,h
・数値入力ウィンドウの位置をx,yに、サイズをw,hに変更します。
・指定した以降に呼び出された数値入力ウィンドウのみ効果があります。

EEC アイテム選択ウィンドウ移動 x,y,w,h
EEC MoveEventItem x,y,w,h
・アイテム選択ウィンドウの位置をx,yに、サイズをw,hに変更します。
・指定した以降に呼び出されたアイテム選択ウィンドウのみ効果があります。

EEC ピクチャ結合 n1,n2[,n3…]
EEC BindPicture n1,n2[,n3…]
・n1番をマスターとして、n2[,n3…]を結合します。
・結合されたピクチャは動作が同期するようになります。
・ピクチャは呼び出されてから実際に表示されるまで時間がかかるため、
  このコマンドを使用する場合はピクチャを表示して少し待ってから使用してください。

------------------------------------------------------
設定方法
------------------------------------------------------
イベントコマンド「文章の表示」で使用可能な制御文字を追加します。
以下の制御文字が追加されます。

---初期設定系---
ウィンドウの初期設定を変更します。
呼び出されたときの表示位置や、サイズ、フェイス等を設定できます。
_で始まるものが初期設定系の制御文字です。

-ウィンドウ設定-
_MMW[x,y]        ウィンドウの初期表示位置をx,yに変更します。アンカーは左上(x=0,y=0)です。
_RMW[w,h]        ウィンドウの初期サイズをw,hに設定します。
_OMW[o]          ウィンドウの初期透明度をoに設定します。
_WC[r,g,b]       ウィンドウのカラーをr,g,bに設定します。
_DWC             ウィンドウのカラーを$gameSystemで設定されているものに戻します。
※MMW,RMWは選択肢の表示でも1番目の選択肢に記述することで使用することが可能です。

-フェイス設定-
_FCR             フェイスの表示を右側に変更します。
_AF[n+i]         フェイスをアクターn番のものからインデックスをi番ずらしたものに設定します。
_SF[n+i]         フェイスをプラグインパラメータで設定したn番のもののインデックスi番に設定します。
_FRT[r]          フェイスの角度をr°に設定します。
_FFH             フェイスを左右反転した状態に設定します。
_FFV             フェイスを上下反転した状態に設定します。
_FO[o]           フェイスの透明度をoに設定します。

--置き換え系--
Window_Baseで変換され、特定のテキストに置き換わります。
\M[n]            EECSetting_Macroで設定した、n番のテキストに置き換えます。
\PDAF[n]         n番のアクターのフェイスを文字サイズの縦幅で表示したものに置き換えます。
\PDSF[n,i]       プラグインパラメータで設定したSetFaceのn番のフェイスのi番と置き換えます。
\PDE[n]          n番のエネミーのメモに設定された<PDE:xxx>のxxxの画像に置き換えます。
※PDAFの制御文字は、アクターのメモ欄に<PDA_CY:y>のメモがある場合、yをフェイスの中心として表示します。

--動作系--
Window_Messageで処理され、何らかの動作を行う制御文字です。
-
-ウエイト-
\WT[n]           nフレームウエイトをかけます。

-ウィンドウ操作-
基本的にdはすべて省略可能です。省略した場合、0として扱われます。
また、dにマイナスの値を設定すると、直前の動作の終了を待ってから、指定の動作に移ります。
\MMW[x,y[,d]]    ウィンドウの位置をdフレーム掛けてx,yに移動します。
\RMW[w,h[,d]]    ウィンドウのサイズをdフレーム掛けてx,yに変更します。(重いです)
\OMW[o[,d]]      ウィンドウの透明度をdフレーム掛けてoに変更します。
\WC[r,g,b[,d]]   ウィンドウのカラーをdフレーム掛けてr,g,bに変更します。
\DWC[d]          ウィンドウのカラーをdフレーム掛けて$gameSystemの設定値に戻します。

-フェイス操作-
基本的にdはすべて省略可能です。省略した場合、0として扱われます。
また、dにマイナスの値を設定すると、直前の動作の終了を待ってから、指定の動作に移ります。
\FRT[r[,d]]      フェイスの角度をdフレーム掛けてr°に回転します。
\FFV[d]          フェイスをdフレーム掛けて左右反転します。
\FFH[d]          フェイスをdフレーム掛けて上下反転します。
\FO[o[,d]]       フェイスの透明度をdフレーム掛けてoに変更します。
\FCI[n[,d]]      フェイスのインデックスをdフレーム掛けてn番に変更します。
\AF[n[+i,d]]     フェイスをdフレーム掛けてアクターn番のものからインデックスi番ずらしたものに変更します。
\SF[n[+i,d]]     フェイスをdフレーム掛けてプラグインパラメータで指定したn番のもののインデックスi番に変更します。
※注意※　以下2つのいずれかを使用した状態で、\FCI,\AF,\SFのいずれかを呼び出すと、正常に変更が行われません！
\FCT[r,g,b,gr[,d]]   フェイスのColorToneをdフレーム掛けてr,g,b,grに変更します。
\FBC[r,g,b,a[,d]]    フェイスのBlendColorをdフレーム掛けてr,g,b,aに変更します。

-イベント系-
nは-1がプレイヤー、0が起動イベント、1以上は対応するIDのイベントです。
\ANIは-2を指定することで、フェイスを対象にすることができます。
\BLN[n,i]        n番のキャラクターにi番の吹き出しを表示します。
\ANI[n,i]        n番のキャラクターにi番のアニメーションを表示します。

-音楽系-
ボリューム：v,ピッチ：p,位相：pnを省略することができます。省略した場合、基本設定が使用されます。
nはEECSetting_Audioで設定した名称が使用されます。
また、nに0を指定することで、再生を停止することが可能です。

\BGM[n[,v,p,pn]]     nで指定したBGMを演奏します。
\BGS[n[,v,p,pn]]     nで指定したBGSを演奏します。
\SE[n[,v,p,pn]]      nで指定したSEを演奏します。
\ME[n[,v,p,pn]]      nで指定したMEを演奏します。

\BGMFI[n,s[,v,p,pn]] nで指定したBGMをs秒かけてフェードインします。
\BGMFO[s]            BGMをs秒かけてフェードアウトします。
\BGSFI[n,s[,v,p,pn]] nで指定したBGSをs秒かけてフェードインします。
\BGSFO[s]            BGSをs秒かけてフェードアウトします。

-ピクチャ系-
\SPIC[n,name[,or,x,y,sx,sy,op,bm]]
番号n番に、nameの画像のピクチャを原点:or,X座標:x,Y座標:y,拡大率X:sx,拡大率Y:sy,
透明度:op,ブレンドモード:bmで表示します。name以降は省略可能です。
また、nameは以下の特殊な指定が可能です。
P<n>                     EECSetting_Pictureで設定した、n番のピクチャに置き換えます。
A<n>                     n番のアクターのメモ欄に記述された<立ち絵:xxx>のxxxに置き換えます。
DT<xxx n>                xxxの文字列ピクチャを文字サイズnで表示します。(動的文字列ピクチャ生成プラグインが必要です)
                         ※この中で制御文字を使用する際は、[]を<>に変更してください。

\MPIC[n,x,y[,d]]         n番のピクチャをdフレームかけてx,yに移動します。
\ZPIC[n,sx,sy[,d]]       n番のピクチャをsx%,sy%にdフレームかけて変更します。
\OPIC[n,op[,d]]          n番のピクチャを透明度をopにdフレームかけて変更します。
\ORPIC[n,or]             n番のピクチャの原点をorに変更します。orは0が左上、1が中央です。
\RPIC[n,rs]              n番のピクチャを回転速度rsで回転します。
\APIC[n,a]               n番のピクチャの角度をa°に変更します。
\TPIC[n,r,g,b,gr[,d]]    n番のピクチャの色調をr,g,b,grにdフレームかけて変更します。
\NCPIC[n1,n2]            n1番のピクチャとn2番のピクチャの番号を入れ替えます。
\CFPIC[n,name[,d]]       n番のピクチャをnameの画像にdフレームかけてフェードしながら変更します。
\CTPIC[n,name[,d]]       n番のピクチャをnameの画像にdフレームかけて反転しながら変更します。
\CXPIC[n,name[,d]]       n番のピクチャをnameの画像にdフレームかけてクロスフェードしながら変更します。
\BNPIC[n1,n2[,n3…]]     n1番のピクチャをマスターとして、n2[,n3…]の画像を結合します。
\FIPIC[n,nm[,d,x,y,t]]   n番のピクチャにnameの画像を設定しdの方向からフェードインします。x,yは表示位置の補正値です。
\FOPIC[n[,d,x,y]]        n番のピクチャをdの方向にフェードアウトします。x,yは表示位置の補正値です。

\OPIC使用時、原点の変更とともに画像の位置も変更されますが、使用前にピクチャを回転していた場合、正常に座標が計算できません。
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.01:
使用していないメソッドを削除。
ver1.00:
公開

@param ToneRate
@desc トーンの変更時、何フレームに一度行うかの設定です。
@default 2

@param WindowFrameSkip
@desc ウィンドウサイズ変更時、何フレームに一度変更を行うかの設定です。
@default 2

@param FadeDuration
@desc ピクチャのフェードイン、フェードアウトにかける時間です。
@default 10

@param FadePosY
@desc ピクチャのフェードイン、フェードアウトで使用される ピクチャの表示位置Y座標です。画像の中心の座標になります。
@default 225

@param ---------------

@param SetFace1
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace2
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace3
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace4
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace5
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace6
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace7
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace8
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace9
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace10
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param ---------------

@param SetFace11
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace12
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace13
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace14
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace15
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace16
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace17
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace18
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace19
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace20
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param ---------------

@param SetFace21
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace22
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace23
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace24
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace25
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace26
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace27
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace28
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace29
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace30
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param ---------------

@param SetFace31
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace32
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace33
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace34
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace35
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace36
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace37
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace38
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace39
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace40
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param ---------------

@param SetFace41
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace42
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace43
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace44
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace45
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace46
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace47
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace48
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace49
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param SetFace50
@desc 呼び出すフェイスのファイル名です。
@type file
@require 1
@dir img/faces/

@param ---------------
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('ExtendEscapeCharacters');
    var toneRate = Number(parameters['ToneRate'] || 6);
    var windowFrameSkip = Number(parameters['WindowFrameSkip'] || 1);
    var fadeDuration = Number(parameters['FadeDuration'] || 1);
    var fadePosY = Number(parameters['FadePosY'] || 0);

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        __GInterpreter_pluginCommand.call(this, command, args);
        if (command === 'EEC') {
            switch (args[0]) {
                case '数値入力ウィンドウ移動':
                case 'MoveNumberInput':
                    var ary = args[1].split(',').map(function (a) { return Number(a) });
                    $gameMessage.setNumberInputMove(ary);
                    break;
                case 'アイテム選択ウィンドウ移動':
                case 'MoveEventItem':
                    var ary = args[1].split(',').map(function (a) { return Number(a) });
                    $gameMessage.setEventItemMove(ary);
                    break;
                case 'ピクチャ結合':
                case 'BindPicture':
                    var ary = args[1].split(',').map(function (a) { return Number(a) });
                    $gameScreen.picture(ary.shift()).setSlave(ary);
                    this.wait(1);
                    break;
                case 'ピクチャ画像変更':
                    var ary = args[1].split(',');
                    var id = Number(ary.shift());
                    this.setChangePicture(id, ary);
                    break;
            }
        }
    };

    Game_Interpreter.prototype.setChangePicture = function (id, ary) {
        var name = DataManager.convertPictureName(ary[1]);
        var duration = ary[2] ? Math.abs(Number(ary[2])) : 0;
        var picture = $gameScreen.picture(id);
        if (!picture) { return }
        if (duration) {
            switch (ary[0]) {
                case 'F':
                case 'FADE':
                case 'Fade':
                case 'fade':
                case 'フェード':
                case '0':
                    var prs = [{ code: 'fade', value: 0, duration: duration / 2 },
                    { code: 'wait', value: duration / 2 },
                    { code: 'change', value: name },
                    { code: 'fade', value: 255, duration: duration / 2 }];
                    picture.setStack(prs);
                    break;
                case 'T':
                case 'TURN':
                case 'Turn':
                case 'turn':
                case 'ターン':
                case '1':
                    var origin = picture._origin;
                    var prs = [{ code: 'origin', value: 1 },
                    { code: 'scale', sx: 0, sy: 100, duration: duration / 2 },
                    { code: 'wait', value: duration / 2 },
                    { code: 'change', value: name },
                    { code: 'scale', sx: 100, sy: 100, duration: duration / 2 },
                    { code: 'wait', value: duration / 2 },
                    { code: 'origin', value: origin }];
                    picture.setStack(prs);
                    break;
                case 'X':
                case 'XFADE':
                case 'XFade':
                case 'xfade':
                case 'クロスフェード':
                case '2':
                    for (var i = 1; i < 100; i++) { if (!$gameScreen.picture(i)) break; }
                    $gameScreen.showPicture(i, picture._name, picture._origin, picture._x, picture._y,
                        picture._scaleX, picture._scaleY, picture._opacity, picture._blendMode);
                    var picture2 = $gameScreen.picture(i);
                    picture._opacity = 0;
                    var prs = [{ code: 'change', value: name },
                    { code: 'fade', value: 255, duration: duration }];
                    picture.setStack(prs);
                    var prs2 = [{ code: 'fade', value: 0, duration: duration },
                    { code: 'wait', value: duration },
                    { code: 'erase' }];
                    picture2.setStack(prs2);
                    break;
            }
        } else {
            picture.setPictureName(name);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    if (!Imported['FaceEC']) {
        Game_Temp.prototype.setFace = function (index) {
            if (this._setFace) {
                return this._setFace[index]
            }
            this._setFace = [];
            for (var i = 1; i < 51; i++) {
                this._setFace[i] = parameters['SetFace' + i]
            }
            return this._setFace[index];
        };
    }

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.convertPictureName = function (name) {
        if (name.match(/^P<(\d+)>$/i)) { name = $gameTemp.eecPicture(parseInt(RegExp.$1)) }
        if (name.match(/^A<(\d+)>$/i)) {
            var actor = $dataActors[parseInt(RegExp.$1)];
            if (actor.meta['StatusPicture']) { name = actor.meta['StatusPicture'] }
            if (actor.meta['ステータスピクチャ']) { name = actor.meta['ステータスピクチャ'] }
            if (actor.meta['立ち絵']) { name = actor.meta['立ち絵'] }
            if (actor.meta['StandPicture']) { name = actor.meta['StandPicture'] }
        }
        if (name.match(/^DT<(.+)>$/i)) {
            var args = RegExp.$1.split(' ');
            var interpreter = $gameParty.inBattle() ? $gameTroop._interpreter : $gameMap._interpreter;
            args[0] = args[0].replace(/\x1b(.+?)<(.+?)>/, function () {
                return '\x1b' + arguments[1] + '\[' + arguments[2] + '\]';
            }.bind(this));
            var ary = [];
            var supAry = [];
            for (var i = 0, max = args.length; i < max; i++) {
                if (i === 0) {
                    ary.push(args[i]);
                } else {
                    var cmd = args[i].split(':');
                    switch (cmd[0]) {
                        case 'SIZE':
                            ary.push(Number(cmd[1]));
                            break;
                        case 'ALIGN':
                        case 'BG_COLOR':
                        case 'FONT':
                            cmd[1] = cmd[1].replace(/\//g, ',');
                            supAry.push(cmd);
                            break;
                    }
                }
            }
            $gameScreen.clearDTextPicture();
            interpreter.pluginCommandDTextPicture('D_TEXT', ary);
            for (var i = 0, max = supAry.length; i < max; i++) {
                interpreter.pluginCommandDTextPicture('D_TEXT_SETTING', supAry[i]);
            }
            name = '';
        }
        return name;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GMessage_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function () {
        __GMessage_clear.call(this);
        this.clearEECEffect();
    };

    Game_Message.prototype.clearEECEffect = function () {
        this._windowTone = null;
        this._rightFace = null;
        this._defaultX = null;
        this._defaultY = null;
        this._defaultWidth = null;
        this._defaultHeight = null;
        this._faceOpacity = null;
        this._faceRotation = null;
        this._faceHFlip = false;
        this._faceVFlip = false;
        this._spareFaceName = '';
        this._spareFaceIndex = 0;
    };

    Game_Message.prototype.clearChoicePos = function () {
        this._choiceWindowPosX = null;
        this._choiceWindowPosY = null;
        this._choiceWindowWidth = null;
        this._choiceWindowHeight = null;
    };

    Game_Message.prototype.setChoicePos = function (x, y) {
        this._choiceWindowPosX = x;
        this._choiceWindowPosY = y;
    };

    Game_Message.prototype.setChoiceResize = function (w, h) {
        this._choiceWindowWidth = w;
        this._choiceWindowHeight = h;
    };

    Game_Message.prototype.spareFaceName = function () {
        return this._spareFaceName;
    };

    Game_Message.prototype.spareFaceIndex = function () {
        return this._spareFaceIndex;
    };

    Game_Message.prototype.setNumberInputMove = function (ary) {
        this._numberInputX = ary[0];
        this._numberInputY = ary[1];
        this._numberInputW = ary[2];
        this._numberInputH = ary[3];
    };

    Game_Message.prototype.setEventItemMove = function (ary) {
        this._eventItemX = ary[0];
        this._eventItemY = ary[1];
        this._eventItemW = ary[2];
        this._eventItemH = ary[3];
    };

    Game_Message.prototype.clearNumberMove = function () {
        this.setNumberInputMove([]);
    };

    Game_Message.prototype.clearEventMove = function () {
        this.setEventItemMove([]);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GScreen_showPicture = Game_Screen.prototype.showPicture;
    Game_Screen.prototype.showPicture = function (pictureId, name, origin, x, y,
        scaleX, scaleY, opacity, blendMode) {
        __GScreen_showPicture.apply(this, arguments);
        var realPictureId = this.realPictureId(pictureId);
        this._pictures[realPictureId]._pictureId = pictureId;
    };

    var __GScreen_erasePicture = Game_Screen.prototype.erasePicture;
    Game_Screen.prototype.erasePicture = function (pictureId) {
        var picture = this.picture(pictureId);
        if (picture.hasSlave()) {
            picture.slaves().forEach(function (a) {
                this.erasePicture(a);
            }.bind(this));
        }
        __GScreen_erasePicture.call(this, pictureId);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GPicture_update = Game_Picture.prototype.update;
    Game_Picture.prototype.update = function () {
        __GPicture_update.call(this);
        if (this._refreshOrigin) this.refreshSyncOrigin();
        if (this.isStack()) this.updateStack();
    };

    Game_Picture.prototype.isStack = function () {
        return this._stack && this._stack.length > 0;
    };

    Game_Picture.prototype.setStack = function (prs) {
        if (!this._stack) { this._stack = [] }
        this._stack.push(prs);
    };

    Game_Picture.prototype.updateStack = function () {
        for (var i = 0, max = this._stack.length; i < max; i++) {
            for (var j = 0, jmax = this._stack[i].length; j < jmax; j++) {
                var process = this._stack[i][j];
                if (process) {
                    if (process.code === 'wait') {
                        process.value--;
                        if (process.value <= 0) this._stack[i][j] = null;
                        break;
                    } else {
                        this.executeProcess(process);
                        this._stack[i][j] = null;
                    }
                }
            }
            this._stack[i] = this._stack[i].filter(function (s) { return s });
            if (this._stack[i].length === 0) { this._stack[i] = null }
        }
        this._stack = this._stack.filter(function (s) { return s });
    };

    Game_Picture.prototype.executeProcess = function (process) {
        switch (process.code) {
            case 'move':
                this.setMoveValue(process.x, process.y, process.duration);
                break;
            case 'change':
                this.setPictureName(process.value);
                break;
            case 'fade':
                this.setOpacityValue(process.value, process.duration);
                break;
            case 'rotate':
                this.setRotationSpeedValue(process.value);
                break;
            case 'scale':
                this.setScaleValue(process.sx, process.sy, process.duration);
                break;
            case 'origin':
                this.setOriginValue(process.value);
                break;
            case 'erase':
                $gameScreen.erasePicture(this._pictureId);
                break;
        }
    };

    Game_Picture.prototype.clearSlave = function () {
        this._slaves = [];
    };

    Game_Picture.prototype.setSlave = function (ary) {
        if (!this._slaves) { this.clearSlave() }
        ary.forEach(function (a) {
            this._slaves.push(a);
            var pic = $gameScreen.picture(a);
            if (pic) pic.setSyncOrigin(this._x, this._y);
        }.bind(this));
    };

    Game_Picture.prototype.hasSlave = function () {
        return this._slaves && this._slaves.length > 0;
    };

    Game_Picture.prototype.slaves = function () {
        if (!this._slaves) { this.clearSlave() }
        return this._slaves;
    };

    Game_Picture.prototype.sprite = function () {
        var chs = SceneManager._scene._spriteset._pictureContainer.children;
        var ary = chs.filter(function (c) { return c._pictureId === this._pictureId }.bind(this));
        return ary[0];
    };

    Game_Picture.prototype.refreshSyncOrigin = function () {
        var sprite = this.sprite();
        if (sprite.bitmap && ImageManager.isReady()) {
            var width = sprite.bitmap.width;
            var height = sprite.bitmap.height;
            //var scale = sprite._scale;
            var ox = this._origin === 0 ? this._x : this._x - width / 2;
            var oy = this._origin === 0 ? this._y : this._y - height / 2;
            var sx = this._orx - ox;
            var sy = this._ory - oy;
            this._origin = [sx / width, sy / height];
            this._refreshOrigin = false;
            this._x = this._orx;
            this._y = this._ory;
            this._targetX = this._orx;
            this._targetY = this._ory;
        }
    };

    Game_Picture.prototype.setSyncOrigin = function (x, y) {
        this._refreshOrigin = true;
        this._orx = x;
        this._ory = y;
    };

    var __GPicture_move = Game_Picture.prototype.move;
    Game_Picture.prototype.move = function (origin, x, y, scaleX, scaleY,
        opacity, blendMode, duration) {
        __GPicture_move.apply(this, arguments);
        if (this.hasSlave()) {
            this.slaves().forEach(function (a) {
                var pic = $gameScreen.picture(a);
                if (pic) pic.move(pic._origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
            }.bind(this));
        }
    };

    Game_Picture.prototype.setPictureName = function (name) {
        this._name = name;
    };

    Game_Picture.prototype.setMoveValue = function (x, y, duration) {
        this._targetX = x;
        this._targetY = y;
        this._duration = duration;
        if (this.hasSlave()) {
            this.slaves().forEach(function (a) {
                var pic = $gameScreen.picture(a);
                if (pic) pic.setMoveValue(x, y, duration);
            }.bind(this));
        }
    };

    Game_Picture.prototype.setOpacityValue = function (opacity, duration) {
        this._targetOpacity = opacity;
        this._duration = duration;
        if (this.hasSlave()) {
            this.slaves().forEach(function (a) {
                var pic = $gameScreen.picture(a);
                if (pic) pic.setOpacityValue(opacity, duration);
            }.bind(this));
        }
    };

    Game_Picture.prototype.setScaleValue = function (scaleX, scaleY, duration) {
        this._targetScaleX = scaleX;
        this._targetScaleY = scaleY;
        this._duration = duration;
        if (this.hasSlave()) {
            this.slaves().forEach(function (a) {
                var pic = $gameScreen.picture(a);
                if (pic) pic.setScaleValue(scaleX, scaleY, duration);
            }.bind(this));
        }
    };

    Game_Picture.prototype.setOriginValue = function (origin) {
        if (this._origin !== origin) {
            var sprite = this.sprite();
            //var ox = this._x;
            //var oy = this._y;
            if (origin === 0) {
                this._x = this._x - (sprite.bitmap.width * sprite.scale.x) / 2;
                this._y = this._y - (sprite.bitmap.height * sprite.scale.y) / 2;
            } else {
                this._x = this._x + (sprite.bitmap.width * sprite.scale.x) / 2;
                this._y = this._y + (sprite.bitmap.height * sprite.scale.y) / 2;
            }
            /*
            var sx = this._x - ox;
            var sy = this._y - oy;
            var a = 360 - this._angle;
            this._x = sx * Math.cos(a) - sy * Math.sin(a) + ox;
            this._y = sx * Math.sin(a) + sy * Math.cos(a) + oy;
            */
            this._targetX = this._x;
            this._targetY = this._y;
            this._origin = origin;
            if (this.hasSlave()) {
                this.slaves().forEach(function (a) {
                    var pic = $gameScreen.picture(a);
                    if (pic) pic.setSyncOrigin(this._x, this._y);
                }.bind(this));
            }
        }
    };

    Game_Picture.prototype.setBlendModeValue = function (blendMode) {
        this._blendMode = blendMode;
        if (this.hasSlave()) {
            this.slaves().forEach(function (a) {
                var pic = $gameScreen.picture(a);
                if (pic) pic.setBlendModeValue(blendMode);
            }.bind(this));
        }
    };

    Game_Picture.prototype.setRotationSpeedValue = function (rotationSpeed) {
        this._rotationSpeed = rotationSpeed;
        if (this.hasSlave()) {
            this.slaves().forEach(function (a) {
                var pic = $gameScreen.picture(a);
                if (pic) pic.setRotationSpeedValue(rotationSpeed);
            }.bind(this));
        }
    };

    Game_Picture.prototype.setAngleValue = function (angle) {
        this._angle = angle;
        if (this.hasSlave()) {
            this.slaves().forEach(function (a) {
                var pic = $gameScreen.picture(a);
                if (pic) pic.setAngleValue(angle);
            }.bind(this));
        }
    };

    Game_Picture.prototype.setTintValue = function (tone, duration) {
        this.tint(tone, duration);
        if (this.hasSlave()) {
            this.slaves().forEach(function (a) {
                var pic = $gameScreen.picture(a);
                if (pic) pic.setTintValue(tone, duration);
            }.bind(this));
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_command138 = Game_Interpreter.prototype.command138;
    Game_Interpreter.prototype.command138 = function () {
        var result = __GInterpreter_command138.call(this);
        SceneManager._scene._messageWindow._windowTone = $gameSystem.windowTone();
        return result;
    };

    var __GInterpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function () {
        if (!$gameMessage.isBusy()) {
            $gameMessage.clearEECEffect();
            var index = this._index + 1;
            var command = this._list[index].parameters[0];
            var text = this._list[index].parameters[0];
            text = text.replace(/\\V\[(\d+)\]/gi, function () {
                return $gameVariables.value(parseInt(arguments[1]));
            }.bind(this));
            text = text.replace(/\\M\[(\d+)\]/gi, function () {
                return $gameTemp.eecMacro(parseInt(arguments[1]));
            }.bind(this));
            text = text.replace(/_FCR/gi, function () {
                $gameMessage._rightFace = true;
                return '';
            }.bind(this));
            text = text.replace(/_FO\[(\d+)\]/gi, function () {
                $gameMessage._faceOpacity = Number(arguments[1]);
                return '';
            }.bind(this));
            text = text.replace(/_FRT\[(\d+)\]/gi, function () {
                $gameMessage._faceRotation = Number(arguments[1]) * 3.141592658 / 180;
                return '';
            }.bind(this));
            text = text.replace(/_FFV/gi, function () {
                $gameMessage._faceVFlip = true;
                return '';
            }.bind(this));
            text = text.replace(/_FFH/gi, function () {
                $gameMessage._faceHFlip = true;
                return '';
            }.bind(this));
            text = text.replace(/_AF\[(\d+)[+-]?([+-]\d+)?\]/gi, function () {
                var faceId = Number(arguments[1]);
                var faceIndex = arguments[2] ? Number(arguments[2]) : 0;
                faceIndex = Math.max($dataActors[faceId].faceIndex + faceIndex, 0);
                this._params[0] = $dataActors[faceId].faceName;
                this._params[1] = faceIndex;
                return '';
            }.bind(this));
            text = text.replace(/_SF\[(\d+)[+-]?([+-]\d+)?\]/gi, function () {
                var faceId = Number(arguments[1]);
                var faceIndex = arguments[2] ? Number(arguments[2]) : 0;
                faceIndex = Math.max(faceIndex, 0);
                this._params[0] = $gameTemp.setFace(faceId);
                this._params[1] = faceIndex;
                return '';
            }.bind(this));
            text = text.replace(/_WC\[(-?\d+),(-?\d+),(-?\d+)\]/gi, function () {
                $gameMessage._windowTone = [Number(arguments[1]), Number(arguments[2]), Number(arguments[3])];
                return '';
            }.bind(this));
            text = text.replace(/_DWC/gi, function () {
                $gameMessage._windowTone = $gameSystem.windowTone();
                return '';
            }.bind(this));
            text = text.replace(/_MMW\[(-?\d+),(-?\d+)\]/gi, function () {
                $gameMessage._defaultX = Number(arguments[1]);
                $gameMessage._defaultY = Number(arguments[2]);
                return '';
            }.bind(this));
            text = text.replace(/_RMW\[(-?\d+),(-?\d+)\]/gi, function () {
                $gameMessage._defaultWidth = Number(arguments[1]);
                $gameMessage._defaultHeight = Number(arguments[2]);
                return '';
            }.bind(this));
            text = text.replace(/_OMW\[(\d+)\]/gi, function () {
                SceneManager._scene._messageWindow.setOpacity(Number(arguments[1]));
                return '';
            }.bind(this));
            this._list[index].parameters[0] = text;
        }
        var result = __GInterpreter_command101.call(this);
        if (command) { this._list[index].parameters[0] = command }
        return result;
    };

    var __GInterpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
    Game_Interpreter.prototype.setupChoices = function (params) {
        var text = params[0][0];
        var sText = text;
        $gameMessage.clearChoicePos();
        text = text.replace(/\\V\[(\d+)\]/gi, function () {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\\M\[(\d+)\]/gi, function () {
            return $gameTemp.eecMacro(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/_MMW\[(-?\d+),(-?\d+)\]/gi, function () {
            $gameMessage.setChoicePos(arguments[1], arguments[2]);
            return '';
        }.bind(this));
        text = text.replace(/_RMW\[(-?\d+),(-?\d+)\]/gi, function () {
            $gameMessage.setChoiceResize(Number(arguments[1]), Number(arguments[2]));
            return '';
        }.bind(this));
        params[0][0] = text;
        __GInterpreter_setupChoices.call(this, params);
        params[0][0] = sText;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SPicture_updateOrigin = Sprite_Picture.prototype.updateOrigin;
    Sprite_Picture.prototype.updateOrigin = function () {
        __SPicture_updateOrigin.call(this);
        if (Array.isArray(this.picture().origin())) {
            var origin = this.picture().origin();
            this.anchor.x = origin[0];
            this.anchor.y = origin[1];
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var _WC_WBase_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function (x, y, width, height) {
        this._stack = [];
        this._frameSkip = windowFrameSkip;
        _WC_WBase_initialize.call(this, x, y, width, height);
        this.initPosParams();
    };

    Window_Base.prototype.initPosParams = function () {
        this._pWidth = this.width;
        this._pHeight = this.height;
        //this._px = null;
        //this._py = null;
    };

    Window_Base.prototype.clearPosParams = function () {
        //this._px = null;
        //this._py = null;
        this.width = this._pWidth;
        this.height = this._pHeight;
    };

    var _WC_WBase_update = Window_Base.prototype.update;
    Window_Base.prototype.update = function () {
        _WC_WBase_update.call(this);
        this.updateAction();
        this.updateRefreshEC();
    };

    Window_Base.prototype.updateAction = function () {
        if (this._stack.length === 0) { return }
        var updates = this.updatesArray();
        var max = this._stack.length;
        for (var i = 0; i < max; i++) {
            var obj = this._stack[i];
            if (obj.dur > 0) { updates[obj.index].call(this, obj) }
            if (obj.dur <= 0) { this._stack[i] = null }
            if (obj.delay > 0) {
                obj.delay--;
                break;
            }
        }
        var ary = [];
        for (var i = 0; i < max; i++) {
            if (this._stack[i] !== null) { ary.push(this._stack[i]) }
        }
        this._stack = ary;
    };

    Window_Base.prototype.updatesArray = function () {
        return [this.updateMove, this.updateResize, this.updateOpacity];
    };

    Window_Base.prototype.updateMove = function (obj) {
        if (!obj) { return }
        if (obj.dur === obj.mDur) {
            obj.bx = this.x;
            obj.by = this.y;
            if (obj.relative) {
                obj.x += obj.bx;
                obj.y += obj.by;
            }
            obj.mSpeedX = (obj.x - obj.bx) / obj.mDur;
            obj.mSpeedY = (obj.y - obj.by) / obj.mDur;
        }
        obj.dur--;
        var count = obj.mDur - obj.dur;
        var xx = obj.bx + obj.mSpeedX * count;
        var yy = obj.by + obj.mSpeedY * count;
        this.x = xx;
        this.y = yy;
        //this._px = this.x;
        //this._py = this.y;
    };

    Window_Base.prototype.updateResize = function (obj) {
        if (!obj) { return }
        if (obj.dur === obj.mDur) {
            obj.bw = this.width;
            obj.bh = this.height;
            if (obj.relative) {
                obj.width += obj.bw;
                obj.height += obj.bh;
            }
            obj.mSpeedW = (obj.width - obj.bw) / obj.mDur;
            obj.mSpeedH = (obj.height - obj.bh) / obj.mDur;
        }
        if (obj.dur % this._frameSkip !== 0) {
            obj.dur--;
            if (obj.dur > 0) { return }
            obj.dur++;
        }
        obj.dur--;
        var count = obj.mDur - obj.dur;
        var w = Math.floor(obj.bw + obj.mSpeedW * count);
        var h = Math.floor(obj.bh + obj.mSpeedH * count);
        this.move(this.x, this.y, w, h);
        //this.width = w;
        //this.height = h;
    };

    Window_Base.prototype.updateOpacity = function (obj) {
        if (!obj) { return }
        if (obj.dur === obj.mDur) {
            obj.bO = this.opacity;
            if (obj.relative) {
                obj.opacity = obj.bO + obj.opacity;
            }
            obj.oSpeed = (obj.opacity - obj.bO) / obj.mDur;
        }
        obj.dur--;
        var count = obj.mDur - obj.dur;
        var op = obj.bO + obj.oSpeed * count;
        this.opacity = op;
        this.contentsOpacity = op;
        this._windowPauseSignSprite.opacity = op;
    };

    Window_Base.prototype.setParam = function (arg) {
        var obj = {};
        obj.index = arg[0];
        obj.delay = 0;
        var duration = arg[1];
        if (!duration) { duration = 0 }
        if (duration < 0) {
            duration = Math.abs(duration);
            obj.delay = duration;
        }
        obj.dur = duration;
        obj.mDur = duration;
        return obj;
    };

    Window_Base.prototype.setMove = function (x, y, duration, relative) {
        if (duration && duration !== 0) {
            var obj = this.setParam([0, duration]);
            obj.x = x;
            obj.y = y;
            obj.relative = relative;
            this._stack.push(obj);
        } else {
            this.x = x;
            this.y = y;
        }
    };

    Window_Base.prototype.setResize = function (width, height, duration, relative) {
        if (duration && duration !== 0) {
            var obj = this.setParam([1, duration]);
            obj.width = width;
            obj.height = height;
            obj.relative = relative;
            this._stack.push(obj);
        } else {
            this.width = width;
            this.height = height;
        }
    };

    Window_Base.prototype.setOpacity = function (opacity, duration, relative) {
        if (duration && duration !== 0) {
            var obj = this.setParam([2, duration]);
            obj.opacity = opacity;
            obj.relative = relative;
            this._stack.push(obj);
        } else {
            this.opacity = opacity;
            this.contentsOpacity = opacity;
            this._windowPauseSignSprite.opacity = opacity;
        }
    };

    Window_Base.prototype.drawStretchFace = function (faceName, faceIndex, x, y, width, height, cy) {
        width = width || Window_Base._faceWidth;
        height = height || Window_Base._faceHeight;
        cy = cy || 0;
        var bitmap = ImageManager.loadFace(faceName);
        var pw = Window_Base._faceWidth;
        var ph = Window_Base._faceHeight;
        var sw = Math.min(width, pw);
        var sh = Math.min(height, ph);
        var sx = faceIndex % 4 * pw + (pw - sw) / 2;
        var sy = Math.floor(faceIndex / 4) * ph + cy - (sh / 2);
        this.contents.blt(bitmap, sx, sy, sw, sh, x, y, width, height);
    };

    Window_Base.prototype.drawStretchActorFace = function (actor, x, y, width, height) {
        var cy = actor.actor().meta['PDA_CY'] ? Number(actor.actor().meta['PDA_CY']) : Window_Base._faceHeight / 2;
        this.drawStretchFace(actor.faceName(), actor.faceIndex(), x, y, width, height, cy);
    };

    var __WBase_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function (text) {
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bM\[(\d+)\]/gi, function () {
            return $gameTemp.eecMacro(parseInt(arguments[1]));
        }.bind(this));
        return __WBase_convertEscapeCharacters.call(this, text);
    };

    Window_Base.prototype.obtainEscapeParams = function (textState) {
        var arr = /\[(.+?)\]/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            var result = [];
            while (arr[1].match(/-?\d+/)) {
                arr[1] = arr[1].replace(/(-?\d+)/, '');
                result.push(parseInt(RegExp.$1));
            }
            return result;
        } else {
            return '';
        }
    };

    Window_Base.prototype.updateRefreshEC = function () {
        if (this._drawStack && this._drawStack.length > 0) {
            if (ImageManager.isReady()) {
                this._drawStack.forEach(function (obj) {
                    switch (obj.type) {
                        case 'PDAF':
                            this.drawStretchActorFace(obj.actor, obj.x, obj.y, obj.width, obj.height);
                            break;
                        case 'PDSF':
                            this.drawStretchFace(obj.name, obj.index, obj.x, obj.y, obj.width, obj.height);
                            break;
                        case 'PDE':
                            var y = 0;
                            var w = Window_Base._faceWidth;
                            this.contents.blt(obj.bitmap, obj.sx, y, w, obj.height, obj.x, obj.y);
                            break;
                    }
                }.bind(this));
                this._drawStack = [];
            }
        }
    };

    var __WBase_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function (code, textState) {
        if (code === 'PDAF') {
            this.processDrawActorFace(this.obtainEscapeParam(textState), textState);
        } else if (code === 'PDSF') {
            this.processDrawSetFace(this.obtainEscapeParams(textState), textState);
        } else if (code === 'PDE') {
            this.processDrawEnemy(this.obtainEscapeParam(textState), textState);
        } else {
            __WBase_processEscapeCharacter.call(this, code, textState);
        }
    };

    Window_Base.prototype.processDrawActorFace = function (actorId, textState) {
        var actor = $gameActors.actor(actorId);
        var width = Window_Base._faceWidth;
        var height = this.contents.fontSize + 4;
        ImageManager.loadFace(actor.faceName());
        if (!this._drawStack) { this._drawStack = [] }
        if (ImageManager.isReady()) {
            this.drawStretchActorFace(actor, textState.x + 2, textState.y + 2, width, height);
        } else {
            this._drawStack.push({
                type: 'PDAF',
                actor: actor,
                width: width,
                height: height,
                x: textState.x + 2,
                y: textState.y + 2
            });
        }
        textState.x += Window_Base._faceWidth + 4;
    };

    Window_Base.prototype.processDrawSetFace = function (id, index, textState) {
        var name = $gameTemp.setFace(id);
        var width = Window_Base._faceWidth;
        var height = this.contents.fontSize + 4;
        ImageManager.loadFace(name);
        if (!this._drawStack) { this._drawStack = [] }
        if (ImageManager.isReady()) {
            this.drawStretchFace(name, index, textState.x + 2, textState.y + 2, width, height);
        } else {
            this._drawStack.push({
                type: 'PDSF',
                name: name,
                index: index,
                width: width,
                height: height,
                x: textState.x + 2,
                y: textState.y + 2
            });
        }
        textState.x += Window_Base._faceWidth + 4;
    };

    Window_Base.prototype.processDrawEnemy = function (enemyId, textState) {
        var enemy = $dataEnemies[enemyId];
        if (enemy.meta['PDE']) {
            var bitmap = ImageManager.loadPicture(enemy.meta['PDE']);
            var width = Math.min(Window_Base._faceWidth, bitmap.width);
            var height = this.contents.fontSize + 4;
            var sx = Math.max((bitmap.width / 2) - (width / 2), 0);
            var sy = (bitmap.height / 2) - (height / 2);
            if (!this._drawStack) {
                this._drawStack = []
            }
            if (ImageManager.isReady()) {
                this.contents.blt(bitmap, sx, sy, width, height, textState.x + 2, textState.y + 2);
            } else {
                this._drawStack.push({
                    type: 'PDE',
                    bitmap: bitmap,
                    enemy: enemy,
                    sx: sx,
                    height: height,
                    x: textState.x + 2,
                    y: textState.y + 2
                });
            }
            textState.x += Window_Base._faceWidth + 4;
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WMessage_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function () {
        __WMessage_initialize.call(this);
        this.createFaceSprite();
    };

    var __WMessage_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
        if ($gameMessage._windowTone) { this._windowTone = $gameMessage._windowTone }
        this._rightFace = $gameMessage._rightFace;
        this.width = this.windowWidth();
        this.height = this.windowHeight();
        __WMessage_startMessage.call(this);
        this.clearEffect();
        this.defaultMove();
        this.setPositionFace();
        this.checkTextBltFace();
    };

    Window_Message.prototype.checkTextBltFace = function () {
        var text = this._textState.text;
        text.replace(/\x1bAF\[(.+?)\]/gi, function () {
            if (arguments[1].match(/(\d+).+/)) {
                this.checkBlt($gameActors.actor(Number(RegExp.$1)).faceName());
            }
            return '';
        }.bind(this));
        text.replace(/\x1bSF\[(.+?)\]/gi, function () {
            if (arguments[1].match(/(\d+).+/)) {
                this.checkBlt($gameTemp.setFace(Number(RegExp.$1)));
            }
            return '';
        }.bind(this));
    };

    Window_Message.prototype.defaultMove = function () {
        var x = $gameMessage._defaultX === null ? this.x : $gameMessage._defaultX;
        var y = $gameMessage._defaultY === null ? this.y : $gameMessage._defaultY;
        var w = $gameMessage._defaultWidth === null ? this.width : $gameMessage._defaultWidth;
        var h = $gameMessage._defaultHeight === null ? this.height : $gameMessage._defaultHeight;
        this.move(x, y, w, h);
    };

    Window_Message.prototype.clearEffect = function () {
        this._faceSprite.rotation = 0;
        this._spareFaceSprite.rotation = 0;
        this._faceSprite.scale.x = 1.0;
        this._faceSprite.scale.y = 1.0;
        this._spareFaceSprite.scale.x = 1.0;
        this._spareFaceSprite.scale.y = 1.0;
        this.opacity = this._background > 0 ? 0 : 255;
        this.contentsOpacity = 255;
        this._windowPauseSignSprite.opacity = 255;
        this._stack = [];
    };

    Window_Message.prototype.open = function () {
        Window_Base.prototype.open.call(this);
        this.clearEffect();
        this._faceSprite.opacity = 255;
    };

    Window_Message.prototype.updateOpen = function () {
        if (this._opening) {
            this._faceSprite.scale.y = ((this.openness + 32) / 256);
        }
        Window_Base.prototype.updateOpen.call(this);
    };

    Window_Message.prototype.updateClose = function () {
        if (this._closing && this.openness === 223) {
            this._faceSprite.opacity = 0;
        }
        Window_Base.prototype.updateClose.call(this);
    };

    var __WMessage_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function () {
        __WMessage_update.call(this);
        if (ImageManager.isReady()) {
            if (this._refreshFace) {
                this.drawMessageFaceSprite($gameMessage.faceName(), $gameMessage.faceIndex(), this._faceSprite);
                this._refreshFace = false;
            }
            if (this._refreshSpareFace) {
                this.drawMessageFaceSprite($gameMessage.spareFaceName(), $gameMessage.spareFaceIndex(), this._spareFaceSprite);
                this._refreshSpareFace = false;
            } else {
                if (this._refreshFace) { this.checkBlt($gameMessage.faceName()) }
                if (this._refreshSpareFace) { this.checkBlt($gameMessage.spareFaceName()) }
            }
        }
    };

    Window_Message.prototype.requestFaceRefresh = function () {
        this._refreshFace = true;
        this.checkBlt($gameMessage.faceName());
    };

    Window_Message.prototype.requestSpareFaceRefresh = function () {
        this._refreshSpareFace = true;
        this.checkBlt($gameMessage.spareFaceName());
    };

    Window_Message.prototype.checkBlt = function (faceName) {
        var bitmap = new Bitmap(1, 1);
        var bitmap2 = ImageManager.loadFace(faceName);
        bitmap.blt(bitmap2, 0, 0, bitmap2.width, bitmap2.height, 0, 0);
        bitmap = null;
        bitmap2 = null;
    };

    Window_Message.prototype.updateResize = function (obj) {
        Window_Base.prototype.updateResize.call(this, obj);
        this.setPositionFace();
    };

    Window_Message.prototype.updateOpacity = function (obj) {
        Window_Base.prototype.updateOpacity.call(this, obj);
        this._faceSprite.opacity = this.opacity;
        this._spareFaceSprite.opacity = this.opacity;
    };

    Window_Message.prototype.createFaceSprite = function () {
        this._faceSprite = new Sprite_Base();
        this._faceSprite.bitmap = new Bitmap(Window_Base._faceWidth, Window_Base._faceHeight);
        this._faceSprite.x = this.standardPadding() + this._faceSprite.bitmap.width / 2;
        this._faceSprite.y = this.standardPadding() + this._faceSprite.bitmap.height / 2;
        this._faceSprite.anchor = new Point(0.5, 0.5);
        this.addChild(this._faceSprite);
        this._spareFaceSprite = new Sprite();
        this._spareFaceSprite.bitmap = new Bitmap(Window_Base._faceWidth, Window_Base._faceHeight);
        this._spareFaceSprite.x = this.standardPadding() + this._spareFaceSprite.bitmap.width / 2;
        this._spareFaceSprite.y = this.standardPadding() + this._spareFaceSprite.bitmap.height / 2;
        this._spareFaceSprite.anchor = new Point(0.5, 0.5);
        this.addChild(this._spareFaceSprite);
    };

    Window_Message.prototype.setPositionFace = function () {
        if (this._rightFace) {
            this._faceSprite.x = this.width - this._faceSprite.width * 0.5 - this.standardPadding();
            this._spareFaceSprite.x = this.width - this._spareFaceSprite.width * 0.5 - this.standardPadding();
        } else {
            this._faceSprite.x = this.standardPadding() + this._faceSprite.bitmap.width / 2;
            this._spareFaceSprite.x = this.standardPadding() + this._spareFaceSprite.bitmap.width / 2;
        }
        var h = this.height - this.standardPadding() * 2;
        var y = this.height / 2;
        this._faceSprite.height = Math.min(h, Window_Base._faceHeight);
        this._spareFaceSprite.height = Math.min(h, Window_Base._faceHeight);
        this._faceSprite.y = y;
        this._spareFaceSprite.y = y;
        if ($gameMessage._faceOpacity !== null) { this._faceSprite.opacity = $gameMessage._faceOpacity }
        if ($gameMessage._faceRotation !== null) { this._faceSprite.rotation = $gameMessage._faceRotation }
        if ($gameMessage._faceVFlip) { this._faceSprite.y = -1.0 }
        if ($gameMessage._faceHFlip) { this._faceSprite.x = -1.0 }
    };

    var __WMessage_newLineX = Window_Message.prototype.newLineX;
    Window_Message.prototype.newLineX = function () {
        var lineX = __WMessage_newLineX.call(this);
        if (this._rightFace) { lineX = Math.max(lineX - 168, 0) }
        return lineX;
    };

    // 再定義
    Window_Message.prototype.drawMessageFace = function () {
        this.drawMessageFaceSprite($gameMessage.faceName(), $gameMessage.faceIndex(), this._faceSprite);
    };

    Window_Message.prototype.drawMessageFaceSprite = function (faceName, faceIndex, sprite) {
        if (sprite.bitmap) { sprite.bitmap.clear() }
        var x = 0;
        var y = 0;
        var width = Window_Base._faceWidth;
        var height = Window_Base._faceHeight;
        var bitmap = ImageManager.loadFace(faceName);
        var pw = width;
        var ph = height;
        var sw = Math.min(width, pw);
        var sh = Math.min(height, ph);
        var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        var sx = faceIndex % 4 * pw + (pw - sw) / 2;
        var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        //console.log(sx,sy,sw,sh)
        //sprite.setFrame(sx,sy,sw,sh);
        sprite.bitmap.blt(bitmap, sx, sy, sw, sh, dx, dy);
    };

    var __WMessage_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function (code, textState) {
        switch (code) {
            // フレーム指定ウエイト
            case 'WT':
                this.startWait(this.obtainEscapeParam(textState));
                break;
            // BGMの再生
            case 'BGM':
                this.processPlayBgm(this.obtainEscapeParams(textState));
                break;
            // BGSの再生
            case 'BGS':
                this.processPlayBgs(this.obtainEscapeParams(textState));
                break;
            // BGMのフェードアウト
            case 'BGMFO':
                AudioManager.fadeOutBgm(this.obtainEscapeParam(textState));
                break;
            // BGMのフェードイン
            case 'BGMFI':
                this.processFadeInBgm(this.obtainEscapeParams(textState));
                break;
            // BGSのフェードアウト
            case 'BGSFO':
                AudioManager.fadeOutBgs(this.obtainEscapeParam(textState));
                break;
            // BGSのフェードイン
            case 'BGSFI':
                this.processFadeInBgs(this.obtainEscapeParams(textState));
                break;
            // SEの再生
            case 'SE':
                this.processPlaySe(this.obtainEscapeParams(textState));
                break;
            // MEの再生
            case 'ME':
                this.processPlayMe(this.obtainEscapeParams(textState));
                break;
            // フェイスを回転
            case 'FRT':
                var ary = this.obtainEscapeParams(textState);
                var radian = ary[0] * 3.141592653 / 180;
                if (ary[1]) {
                    this.processFaceRotation(radian, ary[1]);
                } else {
                    this._faceSprite.rotation = radian;
                }
                break;
            // フェイスを上下反転
            case 'FFV':
                var ary = this.obtainEscapeParams(textState);
                if (ary[0]) {
                    this.processFaceFlipVert(ary[0]);
                } else {
                    this._faceSprite.scale.y *= -1.0;
                }
                break;
            // フェイスを左右反転
            case 'FFH':
                var ary = this.obtainEscapeParams(textState);
                if (ary[0]) {
                    this.processFaceFlipHorz(ary[0]);
                } else {
                    this._faceSprite.scale.x *= -1.0;
                }
                break;
            // フェイスの透明度を変更
            case 'FO':
                var ary = this.obtainEscapeParams(textState);
                if (ary[1]) {
                    this.processFaceOpacity(ary[0], ary[1]);
                } else {
                    this._faceSprite.opacity = ary[0];
                }
                break;
            // フェイスインデックスの変更
            case 'FCI':
                var ary = this.obtainEscapeParams(textState);
                if (ary[1]) {
                    this.processChangeFace($gameMessage.faceName(), ary[0], ary[1]);
                } else {
                    $gameMessage._faceIndex = ary[0];
                    this.drawMessageFace();
                }
                break;
            // フェイスの変更
            case 'AF':
                var ary = /\[(.+?)\]/i.exec(textState.text.slice(textState.index));
                textState.index += ary[0].length;
                ary = ary[1].split(',');
                ary[0].match(/(\d+)[+-]?([+-]\d+)?$/i);
                var id = Number(RegExp.$1);
                var n = Number(RegExp.$2) ? Number(RegExp.$2) : 0;
                var w = Number(ary[1]) ? Number(ary[1]) : 0;
                var name = $gameActors.actor(id)._faceName;
                var index = $gameActors.actor(id)._faceIndex;
                if (w) {
                    this.processChangeFace(name, index + n, w);
                } else {
                    $gameMessage._faceName = name;
                    $gameMessage._faceIndex = index + n;
                    this.requestFaceRefresh();
                }
                break;
            // フェイスの変更
            case 'SF':
                var ary = /\[(.+?)\]/i.exec(textState.text.slice(textState.index));
                textState.index += ary[0].length;
                ary = ary[1].split(',');
                ary[0].match(/(\d+)[+-]?([+-]\d+)?$/i);
                var index = Number(RegExp.$1);
                var n = Number(RegExp.$2) ? Number(RegExp.$2) : 0;
                var w = Number(ary[1]) ? Number(ary[1]) : 0;
                var name = $gameTemp.setFace(index);
                if (w) {
                    this.processChangeFace(name, n, w);
                } else {
                    $gameMessage._faceName = name;
                    $gameMessage._faceIndex = n;
                    this.requestFaceRefresh();
                }
                break;
            case 'FCT':
                var ary = this.obtainEscapeParams(textState);
                if (ary[4]) {
                    this.processFaceColorTone(ary, ary[4]);
                } else {
                    this._faceSprite.setColorTone(ary);
                }
                break;
            case 'FBC':
                var ary = this.obtainEscapeParams(textState);
                if (ary[4]) {
                    this.processFaceBlendColor(ary, ary[4]);
                } else {
                    this._faceSprite.setBlendColor(ary);
                }
                break;
            // ウィンドウカラーの変更
            case 'WC':
                var ary = this.obtainEscapeParams(textState);
                if (ary[3]) {
                    this.processSetWindowToneWait(ary, ary[3]);
                } else {
                    this._windowTone = ary;
                }
                break;
            // ウィンドウカラーをデフォルトに戻す
            case 'DWC':
                var count = this.obtainEscapeParams(textState)[0];
                if (count) {
                    this.processSetWindowToneWait($gameSystem.windowTone(), count);
                } else {
                    this._windowTone = $gameSystem.windowTone();
                }
                break;
            // メッセージウィンドウを移動
            case 'MMW':
                this.processMoveWindow(this.obtainEscapeParams(textState));
                break;
            // メッセージウィンドウをリサイズ
            case 'RMW':
                this.processResizeWindow(this.obtainEscapeParams(textState));
                break;
            // メッセージウィンドウの透明度を変更
            case 'OMW':
                this.processOpacityWindow(this.obtainEscapeParams(textState));
                break;
            // ピクチャの表示
            case 'SPIC':
                var ary = /\[(.+?)\]/i.exec(textState.text.slice(textState.index));
                textState.index += ary[0].length;
                var ary = ary[1].split(',');
                var id = ary[0] ? Number(ary[0]) : 0;
                var name = ary[1];
                name = DataManager.convertPictureName(name);
                var origin = ary[2] ? Number(ary[2]) : 0;
                var x = ary[3] ? Number(ary[3]) : 0;
                var y = ary[4] ? Number(ary[4]) : 0;
                var scaleX = ary[5] ? Number(ary[5]) : 100;
                var scaleY = ary[6] ? Number(ary[6]) : 100;
                var opacity = ary[7] ? Number(ary[7]) : 255;
                var blendMode = ary[8] ? Number(ary[8]) : 0;
                $gameScreen.showPicture(id, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
                break;
            // ピクチャの移動
            case 'MPIC':
                var ary = this.obtainEscapeParams(textState);
                var picture = $gameScreen.picture(ary[0]);
                if (!picture) { return }
                var duration = Math.abs(ary[3]);
                duration = duration ? duration : 1;
                picture.setMoveValue(ary[1], ary[2], duration);
                if (ary[3] < 0) { this.startWait(duration) }
                break;
            // ピクチャの拡縮
            case 'ZPIC':
                var ary = this.obtainEscapeParams(textState);
                var picture = $gameScreen.picture(ary[0]);
                if (!picture) { return }
                var duration = Math.abs(ary[3]);
                duration = duration ? duration : 1;
                picture.setScaleValue(ary[1], ary[2], duration);
                if (ary[3] < 0) { this.startWait(duration) }
                break;
            // ピクチャの透明度変更
            case 'OPIC':
                var ary = this.obtainEscapeParams(textState);
                var picture = $gameScreen.picture(ary[0]);
                if (!picture) { return }
                var duration = Math.abs(ary[2]);
                duration = duration ? duration : 1;
                picture.setOpacityValue(ary[1], duration);
                if (ary[2] < 0) { this.startWait(duration) }
                break;
            // ピクチャの原点変更
            case 'ORPIC':
                var ary = this.obtainEscapeParams(textState);
                var picture = $gameScreen.picture(ary[0]);
                if (!picture) { return }
                picture.setOriginValue(ary[1]);
                break;
            // ピクチャのブレンドモード変更
            case 'BMPIC':
                var ary = this.obtainEscapeParams(textState);
                var picture = $gameScreen.picture(ary[0]);
                if (!picture) { return }
                picture.setBlendModeValue(ary[1]);
                break;
            // ピクチャの回転
            case 'RPIC':
                var ary = this.obtainEscapeParams(textState);
                var picture = $gameScreen.picture(ary[0]);
                if (!picture) { return }
                picture.setRotationSpeedValue(ary[1]);
                break;
            // ピクチャの角度変更
            case 'APIC':
                var ary = this.obtainEscapeParams(textState);
                var duration = ary[2] ? Math.abs(ary[2]) : 0;
                var angle = ary[1];
                var picture = $gameScreen.picture(ary[0]);
                if (!picture) { return }
                if (duration) {
                    var speed = angle / (duration / 2);
                    var prs = [{ code: 'rotate', value: speed },
                    { code: 'wait', value: duration },
                    { code: 'rotate', value: 0 }];
                    picture.setStack(prs);
                    if (ary[2] < 0) { this.startWait(duration) }
                } else {
                    picture.setAngleValue(angle);
                }
                break;
            // ピクチャの色調変更
            case 'TPIC':
                var ary = this.obtainEscapeParams(textState);
                var picture = $gameScreen.picture(ary[0]);
                if (!picture) { return }
                var duration = Math.abs(ary[5]);
                duration = duration ? duration : 1;
                var tone = [ary[1], ary[2], ary[3], ary[4]];
                picture.setTintValue(tone, duration);
                if (ary[5] < 0) { this.startWait(duration) }
                break;
            // ピクチャの消去
            case 'EPIC':
                var ary = this.obtainEscapeParams(textState);
                $gameScreen.erasePicture(ary[0]);
                break;
            // ピクチャの入れ替え
            case 'NCPIC':
                var ary = this.obtainEscapeParams(textState);
                var pic1 = $gameScreen.picture(ary[0]);
                var pic2 = $gameScreen.picture(ary[1]);
                if (!pic1 || !pic2) { return }
                var ary1 = [pic1._name, pic1._origin, pic1._x, pic1._y,
                pic1._scaleX, pic1._scaleY, pic1._opacity, pic1._blendMode,
                pic1._tone, pic1._angle, pic1._rotationSpeed];
                var ary2 = [pic2._name, pic2._origin, pic2._x, pic2._y,
                pic2._scaleX, pic2._scaleY, pic2._opacity, pic2._blendMode,
                pic2._tone, pic2._angle, pic2._rotationSpeed];
                pic1.show(ary2[0], ary2[1], ary2[2], ary2[3], ary2[4], ary2[5], ary2[6], ary2[7]);
                if (ary2[8]) { pic1.tint(ary2[8], 0) }
                pic1._angle = ary2[9];
                pic1._rotationSpeed = ary2[10];
                pic2.show(ary1[0], ary1[1], ary1[2], ary1[3], ary1[4], ary1[5], ary1[6], ary1[7]);
                if (ary1[8]) { pic2.tint(ary1[8], 0) }
                pic2._angle = ary1[9];
                pic2._rotationSpeed = ary1[10];
                break;
            // ピクチャの画像を変更(フェード)
            case 'CFPIC':
                var ary = /\[(.+?)\]/i.exec(textState.text.slice(textState.index));
                textState.index += ary[0].length;
                var ary = ary[1].split(',');
                var id = ary[0] ? Number(ary[0]) : 0;
                var name = DataManager.convertPictureName(ary[1]);
                var duration = ary[2] ? Math.abs(Number(ary[2])) : 0;
                var picture = $gameScreen.picture(id);
                if (!picture) { return }
                if (duration) {
                    var prs = [{ code: 'fade', value: 0, duration: duration / 2 },
                    { code: 'wait', value: duration / 2 },
                    { code: 'change', value: name },
                    { code: 'fade', value: 255, duration: duration / 2 }];
                    picture.setStack(prs);
                    if (ary[2] < 0) { this.startWait(duration) }
                } else {
                    picture.setPictureName(name);
                }
                break;
            // ピクチャの画像を変更(ターン)
            case 'CTPIC':
                var ary = /\[(.+?)\]/i.exec(textState.text.slice(textState.index));
                textState.index += ary[0].length;
                var ary = ary[1].split(',');
                var id = ary[0] ? Number(ary[0]) : 0;
                var name = DataManager.convertPictureName(ary[1]);
                var duration = ary[2] ? Math.abs(Number(ary[2])) : 0;
                var picture = $gameScreen.picture(id);
                if (!picture) { return }
                var origin = picture._origin;
                if (duration) {
                    var prs = [{ code: 'origin', value: 1 },
                    { code: 'scale', sx: 0, sy: 100, duration: duration / 2 },
                    { code: 'wait', value: duration / 2 },
                    { code: 'change', value: name },
                    { code: 'scale', sx: 100, sy: 100, duration: duration / 2 },
                    { code: 'wait', value: duration / 2 },
                    { code: 'origin', value: origin }];
                    picture.setStack(prs);
                    if (ary[2] < 0) { this.startWait(duration) }
                } else {
                    picture.setPictureName(name);
                }
                break;
            // ピクチャの画像を変更(クロスフェード)
            case 'CXPIC':
                var ary = /\[(.+?)\]/i.exec(textState.text.slice(textState.index));
                textState.index += ary[0].length;
                var ary = ary[1].split(',');
                var id = ary[0] ? Number(ary[0]) : 0;
                var name = DataManager.convertPictureName(ary[1]);
                var duration = ary[2] ? Math.abs(Number(ary[2])) : 0;
                var picture = $gameScreen.picture(id);
                if (!picture) { return }
                for (var i = 1; i < 100; i++) { if (!$gameScreen.picture(i)) break; }
                $gameScreen.showPicture(i, picture._name, picture._origin, picture._x, picture._y,
                    picture._scaleX, picture._scaleY, picture._opacity, picture._blendMode);
                var picture2 = $gameScreen.picture(i);
                picture._opacity = 0;
                if (duration) {
                    var prs = [{ code: 'change', value: name },
                    { code: 'fade', value: 255, duration: duration }];
                    picture.setStack(prs);
                    var prs2 = [{ code: 'fade', value: 0, duration: duration },
                    { code: 'wait', value: duration },
                    { code: 'erase' }];
                    picture2.setStack(prs2);
                    if (ary[2] < 0) { this.startWait(duration) }
                } else {
                    picture.setPictureName(name);
                }
                break;
            // ピクチャをフェードイン
            case 'FIPIC':
                var ary = /\[(.+?)\]/i.exec(textState.text.slice(textState.index));
                textState.index += ary[0].length;
                var ary = ary[1].split(',');
                var id = ary[0] ? Number(ary[0]) : 0;
                var name = DataManager.convertPictureName(ary[1]);
                var dir = ary[2] ? Number(ary[2]) : 0;
                var sx = ary[3] ? Number(ary[3]) : 0;
                var sy = ary[4] ? Number(ary[4]) : 0;
                var turn = ary[5] ? -100 : 100;
                var x = 0;
                var y = fadePosY;
                var mx = 0;
                if (dir === 0) { x = 0; mx = 225 }
                if (dir === 1) { x = Graphics.width / 2; mx = x }
                if (dir === 2) { x = Graphics.width, mx = Graphics.width - 225 }
                $gameScreen.showPicture(id, name, 1, x, y, turn, 100, 0, 0);
                var picture = $gameScreen.picture(id);
                if (!picture) { return }
                var prs = [{ code: 'fade', value: 255, duration: fadeDuration },
                { code: 'move', x: mx + sx, y: y + sy, duration: fadeDuration }];
                picture.setStack(prs);
                break;
            // ピクチャをフェードアウト
            case 'FOPIC':
                var ary = this.obtainEscapeParams(textState);
                var picture = $gameScreen.picture(ary[0]);
                var dir = ary[1] ? ary[1] : 0;
                var sx = ary[2] ? ary[2] : 0;
                var sy = ary[3] ? ary[3] : 0;
                var y = 225;
                if (dir === 0) { mx = 0 }
                if (dir === 1) { mx = Graphics.width / 2 }
                if (dir === 2) { mx = Graphics.width }
                if (!picture) { return }
                var prs = [{ code: 'fade', value: 0, duration: fadeDuration },
                { code: 'move', x: mx + sx, y: y + sy, duration: fadeDuration },
                { code: 'wait', value: fadeDuration },
                { code: 'erase' }];
                picture.setStack(prs);
                break;
            // ピクチャのバインド
            case 'BNPIC':
                var ary = this.obtainEscapeParams(textState);
                var picture = $gameScreen.picture(ary.shift());
                if (!picture) { return }
                picture.setSlave(ary);
                this.startWait(1);
                break;
            // フキダシバルーンの表示
            case 'BLN':
                var ary = this.obtainEscapeParams(textState);
                var character = $gameMap._interpreter.character(ary[0]);
                character.requestBalloon(ary[1]);
                break;
            // アニメーションの表示
            case 'ANI':
                var ary = this.obtainEscapeParams(textState);
                if (ary[0] >= -1) {
                    var character = $gameMap._interpreter.character(ary[0]);
                    character.requestAnimation(ary[1])
                } else {
                    var anime = $dataAnimations[ary[1]];
                    this._faceSprite.startAnimation(anime, false, 0);
                }
                break;
            default:
                __WMessage_processEscapeCharacter.call(this, code, textState);
                break;
        }
    };

    Window_Message.prototype.updatesArray = function () {
        return [this.updateMove, this.updateResize, this.updateOpacity,
        this.updateFaceRotation, this.updateFaceFlipHorz, this.updateFaceFlipVert,
        this.updateFaceOpacity, this.updateChangeFace, this.updateFaceColorTone,
        this.updateFaceBlendColor, this.updateWaitToneCount];
    };

    Window_Message.prototype.updateTone = function () {
        if (!this._windowTone) { this._windowTone = $gameSystem.windowTone() }
        var tone = this._windowTone;
        this.setTone(tone[0], tone[1], tone[2]);
    };

    Window_Message.prototype.processMoveWindow = function (ary) {
        $gameMessage._defaultX = ary[0];
        $gameMessage._defaultY = ary[1];
        this.setMove(ary[0], ary[1], ary[2]);
    };

    Window_Message.prototype.processResizeWindow = function (ary) {
        this.setResize(ary[0], ary[1], ary[2]);
    };

    Window_Message.prototype.processOpacityWindow = function (ary) {
        $gameMessage._defaultOpacity = ary[0];
        this.setOpacity(ary[0], ary[1]);
    };

    Window_Message.prototype.processFaceRotation = function (radian, duration) {
        var obj = this.setParam([3, duration]);
        obj.radian = radian;
        obj.bRadian = this._faceSprite.rotation;
        this._stack.push(obj);
    };

    Window_Message.prototype.processSetWindowToneWait = function (ary, duration) {
        var obj = this.setParam([10, duration]);
        obj.tone = [ary[0], ary[1], ary[2]];
        this._stack.push(obj);
    };

    Window_Message.prototype.processFaceFlipHorz = function (duration) {
        var obj = this.setParam([4, duration]);
        this._stack.push(obj);
    };

    Window_Message.prototype.processFaceFlipVert = function (duration) {
        var obj = this.setParam([5, duration]);
        this._stack.push(obj);
    };

    Window_Message.prototype.processFaceOpacity = function (opacity, duration) {
        var obj = this.setParam([6, duration]);
        obj.opacity = opacity;
        this._stack.push(obj);
    };

    Window_Message.prototype.processChangeFace = function (faceName, faceIndex, duration) {
        var obj = this.setParam([7, duration]);
        obj.faceName = faceName;
        obj.faceIndex = faceIndex;
        this._stack.push(obj);
    };

    Window_Message.prototype.processFaceColorTone = function (ary, duration) {
        var obj = this.setParam([8, duration]);
        obj.tone = [ary[0], ary[1], ary[2], ary[3]];
        this._stack.push(obj);

    };

    Window_Message.prototype.processFaceBlendColor = function (ary, duration) {
        var obj = this.setParam([9, duration]);
        obj.blend = [ary[0], ary[1], ary[2], ary[3]];
        this._stack.push(obj);
    };

    Window_Message.prototype.updateWaitToneCount = function (obj) {
        if (obj.dur === obj.mDur) {
            obj.bTone = this._windowTone;
        }
        obj.dur--;
        var rate = 1 - (obj.dur / obj.mDur);
        var red = obj.tone[0] - obj.bTone[0];
        var green = obj.tone[1] - obj.bTone[1];
        var blue = obj.tone[2] - obj.bTone[2];
        var ary = [Math.floor(obj.bTone[0] + (red * rate)),
        Math.floor(obj.bTone[1] + (green * rate)),
        Math.floor(obj.bTone[2] + (blue * rate)),
            0];
        if (obj.dur % toneRate === 0) { this._windowTone = ary }
    };

    Window_Message.prototype.updateFaceRotation = function (obj) {
        if (obj.dur === obj.mDur) {
            obj.bRadian = this._faceSprite.rotation;
        }
        obj.dur--;
        var rate = 1 - (obj.dur / obj.mDur);
        this._faceSprite.rotation = obj.bRadian + (obj.radian * rate);
        this._spareFaceSprite.rotation = obj.bRadian + (obj.radian * rate);
    };

    Window_Message.prototype.updateFaceFlipHorz = function (obj) {
        if (obj.dur === obj.mDur) {
            obj.bScaleX = this._faceSprite.scale.x;
        }
        obj.dur--;
        var rate = (obj.dur / obj.mDur) * 2 - 1;
        this._faceSprite.scale.x = obj.bScaleX * rate;
        this._spareFaceSprite.scale.x = obj.bScaleX * rate;
    };

    Window_Message.prototype.updateFaceFlipVert = function (obj) {
        if (obj.dur === obj.mDur) {
            obj.bScaleY = this._faceSprite.scale.y;
        }
        obj.dur--;
        var rate = (obj.dur / obj.mDur) * 2 - 1;
        this._faceSprite.scale.y = obj.bScaleY * rate;
        this._spareFaceSprite.scale.y = obj.bScaleY * rate;
    };

    Window_Message.prototype.updateFaceOpacity = function (obj) {
        if (obj.dur === obj.mDur) {
            obj.bOpacity = this._faceSprite.opacity;
        }
        obj.dur--;
        var rate = 1 - (obj.dur / obj.mDur);
        this._faceSprite.opacity = obj.bOpacity - ((obj.bOpacity - obj.opacity) * rate);
    };

    Window_Message.prototype.updateChangeFace = function (obj) {
        if (obj.dur === obj.mDur) {
            $gameMessage._spareFaceName = $gameMessage._faceName;
            $gameMessage._spareFaceIndex = $gameMessage._faceIndex;
            $gameMessage._faceName = obj.faceName;
            $gameMessage._faceIndex = obj.faceIndex;
            obj.bOpacity = this._faceSprite.opacity;
            this._spareFaceSprite.scale = this._faceSprite.scale;
            this.requestFaceRefresh();
            this.requestSpareFaceRefresh();
        }
        obj.dur--;
        var rate = 1 - (obj.dur / obj.mDur);
        this._faceSprite.opacity = obj.bOpacity * rate;
        if (obj.dur > 0) {
            this._spareFaceSprite.opacity = obj.bOpacity * (1.0 - rate);
        } else {
            this._spareFaceSprite.bitmap.clear();
        }
    };

    Window_Message.prototype.updateFaceColorTone = function (obj) {
        if (obj.dur === obj.mDur) {
            obj.bTone = this._faceSprite.getColorTone();
        }
        obj.dur--;
        var rate = 1 - (obj.dur / obj.mDur);
        var red = obj.tone[0] - obj.bTone[0];
        var green = obj.tone[1] - obj.bTone[1];
        var blue = obj.tone[2] - obj.bTone[2];
        var gray = obj.tone[3] - obj.bTone[3];
        var ary = [Math.floor(obj.bTone[0] + (red * rate)),
        Math.floor(obj.bTone[1] + (green * rate)),
        Math.floor(obj.bTone[2] + (blue * rate)),
        Math.floor(obj.bTone[3] + (gray * rate))];
        this._faceSprite.setColorTone(ary);
    };

    Window_Message.prototype.updateFaceBlendColor = function (obj) {
        if (obj.dur === obj.mDur) {
            obj.bBlend = this._faceSprite.getBlendColor();
        }
        obj.dur--;
        var rate = 1 - (obj.dur / obj.mDur);
        var red = obj.blend[0] - obj.bBlend[0];
        var green = obj.blend[1] - obj.bBlend[1];
        var blue = obj.blend[2] - obj.bBlend[2];
        var alpha = obj.blend[3] - obj.bBlend[3];
        var ary = [Math.floor(obj.bBlend[0] + (red * rate)),
        Math.floor(obj.bBlend[1] + (green * rate)),
        Math.floor(obj.bBlend[2] + (blue * rate)),
        Math.floor(obj.bBlend[3] + (alpha * rate))];
        this._faceSprite.setBlendColor(ary);
    };

    Window_Message.prototype.convertAudioName = function (index, type) {
        var text = '';
        switch (type) {
            case 'se':
                text = $gameTemp.eecSe(index);
                break;
            case 'me':
                text = $gameTemp.eecMe(index);
                break;
            case 'bgm':
                text = $gameTemp.eecBgm(index);
                break;
            case 'bgs':
                text = $gameTemp.eecBgs(index);
                break;
        }
        return text;
    };

    Window_Message.prototype.processPlaySe = function (ary) {
        var defaultSe = $gameTemp.seSetting();
        var name = this.convertAudioName(ary[0], 'se');
        if (!name) {
            AudioManager.stopSe();
        } else {
            var se = this.setAudioObject(name, ary, defaultSe);
            AudioManager.playSe(se);
        }
    };

    Window_Message.prototype.processPlayMe = function (ary) {
        var defaultMe = $gameTemp.meSetting();
        var name = this.convertAudioName(ary[0], 'me');
        if (!name) {
            AudioManager.stopMe();
        } else {
            var me = this.setAudioObject(name, ary, defaultMe);
            AudioManager.playMe(me);
        }
    };

    Window_Message.prototype.processPlayBgm = function (ary) {
        var defaultBgm = $gameTemp.bgmSetting();
        var name = this.convertAudioName(ary[0], 'bgm');
        if (!name) {
            AudioManager.stopBgm();
        } else {
            var bgm = this.setAudioObject(name, ary, defaultBgm);
            AudioManager.playBgm(bgm);
        }
    };

    Window_Message.prototype.processPlayBgs = function (ary) {
        var defaultBgs = $gameTemp.bgsSetting();
        var name = this.convertAudioName(ary[0], 'bgs');
        if (!name) {
            AudioManager.stopBgs();
        } else {
            var bgs = this.setAudioObject(name, ary, defaultBgs);
            AudioManager.playBgs(bgs);
        }
    };

    Window_Message.prototype.processFadeInBgm = function (ary) {
        var duration = ary[1];
        ary.splice(1, 1);
        this.processPlayBgm(ary);
        AudioManager.fadeInBgm(duration);
    };

    Window_Message.prototype.processFadeInBgs = function (ary) {
        var duration = ary[1];
        ary.splice(1, 1);
        this.processPlayBgs(ary);
        AudioManager.fadeInBgs(duration);
    };

    Window_Message.prototype.setAudioObject = function (name, ary, defaultSetting) {
        if (!ary[1]) { ary[1] = defaultSetting[0] }
        if (!ary[2]) { ary[2] = defaultSetting[1] }
        if (!ary[3]) { ary[3] = defaultSetting[2] }
        var obj = { name: name, volume: ary[1], pitch: ary[2], pan: ary[3] };
        return obj;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
    Window_ChoiceList.prototype.updatePlacement = function () {
        __WChoiceList_updatePlacement.call(this);
        if ($gameMessage._choiceWindowPosX !== null) { this.x = $gameMessage._choiceWindowPosX }
        if ($gameMessage._choiceWindowPosY !== null) { this.y = $gameMessage._choiceWindowPosY }
        if ($gameMessage._choiceWindowWidth !== null) { this.width = $gameMessage._choiceWindowWidth }
        if ($gameMessage._choiceWindowHeight !== null) { this.height = $gameMessage._choiceWindowHeight }
    };

    Window_ChoiceList.prototype.updateTone = function () {
        var tone = this._messageWindow._windowTone;
        this.setTone(tone[0], tone[1], tone[2]);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Window_NumberInput.prototype.updateTone = function () {
        var tone = this._messageWindow._windowTone;
        this.setTone(tone[0], tone[1], tone[2]);
    };

    var __WNumberInput_updatePlacement = Window_NumberInput.prototype.updatePlacement;
    Window_NumberInput.prototype.updatePlacement = function () {
        __WNumberInput_updatePlacement.call(this);
        if ($gameMessage._numberInputX || $gameMessage._numberInputX === 0) { this.x = $gameMessage._numberInputX }
        if ($gameMessage._numberInputY || $gameMessage._numberInputY === 0) { this.y = $gameMessage._numberInputY }
        if ($gameMessage._numberInputW) { this.width = $gameMessage._numberInputW }
        if ($gameMessage._numberInputH) { this.height = $gameMessage._numberInputH }
        $gameMessage.clearNumberMove();
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Window_EventItem.prototype.updateTone = function () {
        var tone = this._messageWindow._windowTone;
        this.setTone(tone[0], tone[1], tone[2]);
    };

    Window_EventItem.prototype.resetPlacement = function () {
        this.width = Graphics.boxWidth;
        this.height = this.windowHeight();
        this.x = 0;
        this.y = 0;
    };

    var __WEventItem_updatePlacement = Window_EventItem.prototype.updatePlacement;
    Window_EventItem.prototype.updatePlacement = function () {
        this.resetPlacement();
        __WEventItem_updatePlacement.call(this);
        if ($gameMessage._eventItemX || $gameMessage._eventItemX === 0) { this.x = $gameMessage._eventItemX }
        if ($gameMessage._eventItemY || $gameMessage._eventItemY === 0) { this.y = $gameMessage._eventItemY }
        if ($gameMessage._eventItemW) { this.width = $gameMessage._eventItemW }
        if ($gameMessage._eventItemH) { this.height = $gameMessage._eventItemH }
        $gameMessage.clearEventMove();
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());