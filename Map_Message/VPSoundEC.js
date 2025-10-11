//
//  濁点、半濁点制御文字 ver1.00
//
// author yana
//

var Imported = Imported || {};
Imported['VPSoundEC'] = 1.00;
/*:
@plugindesc ver1.00/Adds control characters that add voiced or semi-voiced marks to specified characters.
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
How to Use
--------------------------------------------------------------------
In situations where drawTextEx is used (such as displaying text or the battle log), you can add voiced consonants to text by writing \VS[text to which you want to add voiced consonants].

You can also add voiced consonants to text by writing \PS[text to which you want to add voiced consonants].
------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver. 1.00:
Released

@param PlusRate
@text Voiced mark rate
@desc The display position of the voiced mark. Please specify it as a magnification of the character size.
@default 0.75
*/


/*:ja
@plugindesc ver1.00/指定した文字に濁点や半濁点を付ける制御文字を追加します。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
使用方法
------------------------------------------------------
drawTextExを通る場面(文章の表示やバトルログ)などで、
\VS[濁点を付けたいテキスト]
と記述することで、そのテキストに濁点を付けることができます。

また、
\PS[半濁点を付けたいテキスト]
と記述することで、そのテキストに半濁点を付けることができます。
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param PlusRate
@text 濁点の表示倍率
@desc 濁点の表示位置です。文字サイズに対する倍率で指定してください。
@default 0.75
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('VPSoundEC');
    var plusRate = Number(parameters['PlusRate']);

    ////////////////////////////////////////////////////////////////////////////////////

    var __WBase_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function (code, textState) {
        switch (code) {
            case 'VS':
                var arr = /^\[(.+?)\]/.exec(textState.text.slice(textState.index));
                textState.index += arr[0].length;
                this.processDrawVSound(arr[1], textState);
                break;
            case 'PS':
                var arr = /^\[(.+?)\]/.exec(textState.text.slice(textState.index));
                textState.index += arr[0].length;
                this.processDrawPSound(arr[1], textState);
                break;
                break;
            default:
                __WBase_processEscapeCharacter.call(this, code, textState);
                break;
        }
    };

    Window_Base.prototype.processDrawVSound = function (text, textState) {
        for (var i = 0, max = text.length; i < max; i++) {
            var c = text[i];
            var w = this.textWidth(c);
            this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
            this.contents.drawText('゛', textState.x + Math.floor(w * plusRate), textState.y, w * 2, textState.height);
            textState.x += w;
        }
    };

    Window_Base.prototype.processDrawPSound = function (text, textState) {
        for (var i = 0, max = text.length; i < max; i++) {
            var c = text[i];
            var w = this.textWidth(c);
            this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
            this.contents.drawText('゜', textState.x + Math.floor(w * plusRate), textState.y, w * 2, textState.height);
            textState.x += w;
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());