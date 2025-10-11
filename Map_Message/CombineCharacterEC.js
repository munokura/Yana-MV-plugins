//
//  文字合体制御文字 ver1.00
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
Imported['CombineCharacterEC'] = 1.00;
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
Adds the following control characters to scenes that use drawTextEx (such as text display and battle logs).

\VS[text]
Adds a voiced consonant mark to the text.

\PS[text]
Adds a handakuten consonant mark to the text.

\EC[text]
Adds a footnote to the text.

\AT[text]
Adds a strikethrough to the text.

\WAT[text]
Adds a double strikethrough to the text.

\UL[text]
Adds an underline to the text.

*Somewhat complicated control characters*

\CC[text to add behind, text, overlay from the front]
Adds text behind and in front of the text.

Each character is displayed as an icon instead of a regular character.
i<icon index>: Overlays an index icon as the character.
L○<x/y/w/h>: Overlays a rectangle with the text color specified by x, y, w, and h.
You can also use these two options.
In this case, specify x, y, w, and h as the scale factor for the font size.
You can also specify multiple <x/y/w/h> options.
If no value is specified for ○, the current text color will be used.

Example 1: Fill the back of the text with text color number 2.
\CC[L2<0/0/1/1>,FillText]
Example 2: Draw two lines on the front of the text in text color number 3.
\CC[,FillText,L3<0/0/1/0.1><0/0.9/1/0.1>]

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
Ver. 1.00:
Released

@param PlusRate
@desc This is the display position of voiced consonants and semi-voiced consonants. Please specify it as a magnification factor relative to the character size.
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
drawTextExを通る場面(文章の表示やバトルログ)などに以下の制御文字を追加します。

\VS[テキスト]
と記述することで、そのテキストに濁点を付けることができます。

\PS[テキスト]
と記述することで、そのテキストに半濁点を付けることができます。

\EC[テキスト]
と記述することで、そのテキストに傍点を付けることができます。

\AT[テキスト]
と記述することで、そのテキストに打ち消し線を付けることができます。

\WAT[テキスト]
と記述することで、そのテキストに二重打ち消し線を付けることができます。

\UL[テキスト]
と記述することで、そのテキストに下線を付けることができます。


※ちょっと難しい制御文字※

\CC[裏に入れる文字,テキスト,表から重ねる文字]
と記述することで、そのテキストの裏と表に文字を重ねることができます。

それぞれの文字は、通常の文字の代わりに、
i<アイコンインデックス> :インデックスのアイコンを文字として重ねる。
L○<x/y/w/h> :x,y,w,hで指定した大きさで○のテキストカラーをした矩形を重ねる。
の2つを使うこともできます。
この際、x,y,w,hは文字サイズに対する倍率で指定してください。
また、<x/y/w/h>は複数指定することもできます。
○に何も指定しない場合、現在のテキストカラーが使用されます。

例1:テキストの裏を2番のテキストカラーで塗りつぶす。
\CC[L2<0/0/1/1>,塗りつぶすテキスト]
例2:テキストの表に3番のテキストカラーで線を2本引く。
\CC[,塗りつぶすテキスト,L3<0/0/1/0.1><0/0.9/1/0.1>]

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
@desc 濁点や半濁点の表示位置です。文字サイズに対する倍率で指定してください。
@default 0.75
*/

(function(){
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('CombineCharacterEC');
    var plusRate = Number(parameters['PlusRate']);

    ////////////////////////////////////////////////////////////////////////////////////

    var __WBase_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        switch(code) {
            case 'VS':
                var arr = /^\[(.+?)\]/.exec(textState.text.slice(textState.index));
                textState.index += arr[0].length;
                this.processDrawCombineCharacter('', arr[1], '゛', textState, plusRate);
                break;
            case 'PS':
                var arr = /^\[(.+?)\]/.exec(textState.text.slice(textState.index));
                textState.index += arr[0].length;
                this.processDrawCombineCharacter('', arr[1], '゜',textState, plusRate);
                break;
            case 'EC':
                var arr = /^\[(.+?)\]/.exec(textState.text.slice(textState.index));
                textState.index += arr[0].length;
                this.processDrawCombineCharacter('', arr[1],'・', textState, 0,-0.4);
                break;
            case 'CC':
                var arr = /^\[(.+?)\]/.exec(textState.text.slice(textState.index));
                var ary = arr[1].split(',');
                textState.index += arr[0].length;
                this.processDrawCombineCharacter(ary[0],ary[1],ary[2], textState);
                break;
            case 'AT':
                var arr = /^\[(.+?)\]/.exec(textState.text.slice(textState.index));
                textState.index += arr[0].length;
                var rect = 'L0<0/0.475/1/0.05>';//{x:0,y:0.475,w:1,h:0.05};
                this.processDrawCombineCharacter('', arr[1], rect, textState);
                break;
            case 'UL':
                var arr = /^\[(.+?)\]/.exec(textState.text.slice(textState.index));
                textState.index += arr[0].length;
                var rect = 'L<0/0.95/1/0.05>';//{x:0,y:0.95,w:1,h:0.05};
                this.processDrawCombineCharacter('', arr[1], rect, textState);
                break;
            case 'WAT':
                var arr = /^\[(.+?)\]/.exec(textState.text.slice(textState.index));
                textState.index += arr[0].length;
                //var r1 = {x:0,y:0.375,w:1,h:0.05};
                //var r2 = {x:0,y:0.575,w:1,h:0.05};
                var rect = 'L0<0/0.375/1/0.05><0/0.575/1/0.05>';
                this.processDrawCombineCharacter('', arr[1], rect,textState);
                break;
            default:
                __WBase_processEscapeCharacter.call(this, code, textState);
                break;
        }
    };

    Window_Base.prototype.processDrawCombineCharacter = function(char1, text, char2, textState, sx, sy) {
        sx = sx ? sx : 0;
        sy = sy ? sy : 0;
        var obj1 = this.checkCharParameters(char1);
        var obj2 = this.checkCharParameters(char2);
        for(var i=0,max=text.length;i<max;i++){
            var c = text[i];
            var w = this.textWidth(c);
            var x = textState.x + Math.floor(w * sx);
            var y =  textState.y + Math.floor(textState.height * sy);
            this.drawCombineCharacter(obj1,x,y,w,textState.height);
            this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
            this.drawCombineCharacter(obj2,x,y,w,textState.height);
            textState.x += w;
        }
    };
    
    Window_Base.prototype.checkCharParameters = function(text) {
        var obj = {text:text, type:'char', sx:0, sy:0, sw:1, sh:1, rects:[]};
        if (text) {
            if (text.match(/^L(\d+)?((?:<-?\d+(?:\.\d+)?\/-?\d+(?:\.\d+)?\/-?\d+(?:\.\d+)?\/-?\d+(?:\.\d+)?>)+)$/i)) {
                obj.text = RegExp.$1 === '' ? -1 : Number(RegExp.$1);
                var ary = RegExp.$2.replace(/</,'').split('>');
                for (var i=0,max=ary.length;i<max;i++){
                    var a = ary[i];
                    if (a) ary[i] = a.replace(/</,'').split('/').map(function(aa){ return Number(aa) });
                }
                obj.rects = ary;
                obj.type = 'line';
            } else if (text.match(/^(.+)<(-?\d+\.\d+)\/(-?\d+\.\d+)>$/)) {
                if (RegExp.$2) obj.sx = Number(RegExp.$2);
                if (RegExp.$3) obj.sy = Number(RegExp.$3);
                obj.text = RegExp.$1;
            } else if (text.match(/^I<(\d+)>$/i)){
                obj.text = RegExp.$1;
                obj.type = 'icon';
            }
        }
        return obj;
    };
    
    Window_Base.prototype.drawCombineCharacter = function(obj,x,y,width,height) {
        if(obj.type === 'line') {
            for(var i=0,max=obj.rects.length;i<max;i++) {
                if (obj.rects[i]) {
                    var r = obj.rects[i];
                    var lx = x + Math.floor(width * r[0]);
                    var ly = y + Math.floor(height * r[1]);
                    var color = obj.text === -1 ? this.contents.textColor : this.textColor(obj.text);
                    this.contents.fillRect(lx, ly, width * r[2], height * r[3], color);
                }
            }
        } else {
            var sx = Math.floor(obj.sx * width) + x;
            var sy = Math.floor(obj.sy * height) + y;
            if (obj.type === 'icon') this.drawIcon(obj.text, sx-2, sy+2);
            if (obj.type === 'char') this.contents.drawText(obj.text, sx, sy, width * 2, height);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());