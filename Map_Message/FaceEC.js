//
//  フェイス設定制御文字 ver1.02
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
Imported['FaceEC'] = 1.02;
/*:
@plugindesc ver1.02/Added control characters to set the face.
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
How to Set
--------------------------------------------------------------------
Write
_af[x+y]
or
_sf[x+y]
on the first line of the "Show Text" Event's Contents.

With _af, the face is set by adding y to the index of the face of the actor with the xth face.

With _sf, the face with the yth index of the face image with the ID set in the plugin parameters is set.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver 1.02:
Added compatibility with the control character extension.
ver 1.01:
Allowed the use of the \V[x] control character.
ver 1.00:
Released

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
*/

/*:ja
@plugindesc ver1.02/フェイスを設定する制御文字を追加します。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
設定方法
------------------------------------------------------
イベントコマンド「文章の表示」の1行目で
_af[x+y]
または、
_sf[x+y]
と記述します。

_afの場合は、x番のアクターのフェイスのインデックスにyを加算した
フェイスを設定します。

_sfの場合は、プラグインパラメータで設定したID、x番のフェイス画像
のインデックスy番のフェイスを設定します。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.02:
制御文字拡張との併用化処理を追加。
ver1.01:
\V[x]の制御文字を使用できるように変更。
ver1.00:
公開

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
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('FaceEC');

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Temp.prototype.setFace = function (index) {
        if (this._setFace) { return this._setFace[index] }
        this._setFace = [];
        for (var i = 1; i < 51; i++) { this._setFace[i] = parameters['SetFace' + i] }
        return this._setFace[index]
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function () {
        if (!$gameMessage.isBusy()) {
            var index = this._index + 1;
            var nextParam = this._list[index];
            var text = nextParam.parameters[0];
            var text2 = text.replace(/\\v\[(\d+)\]/gi, function () { return $gameVariables.value(Number(arguments[1])) });
            this._list[index].parameters[0] = text2.replace(/_([asAS])[fF]\[(\d+)[+-]?([+-]\d+)?\]/, function () {
                var isActor = arguments[1].search(/[Aa]/) >= 0;
                var faceId = Number(arguments[2]);
                var faceIndex = Number(arguments[3]) || 0;
                this._params[0] = isActor ? $dataActors[faceId].faceName : $gameTemp.setFace(faceId - 1);
                this._params[1] = isActor ? $dataActors[faceId].faceIndex + faceIndex : faceIndex;
                return '';
            }.bind(this));
            var result = __GInterpreter_command101.call(this);
            this._list[index].parameters[0] = text;
            return result;
        } else {
            return false;
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());