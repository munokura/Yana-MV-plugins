//
//  メッセージアライメント制御文字 ver1.04
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
Imported['MessageAlignmentEC'] = 1.04;
/*:
 * @plugindesc ver1.04/メッセージのアライメントを変更する制御文字を追加します。
 * @author Yana
 *
 * @param ExtendEC
 * @desc メッセージ内で制御文字として扱う文字です。
 * 詳細はヘルプを参照してください。
 * @default
 *
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * イベントコマンド「文章の表示」及び、「文章のスクロール表示」内に
 * アライメントを変更する制御文字を追加します。
 * 追加される制御文字は、
 *
 * \LL 文字を左寄せにします。
 * \CL 文字を中央寄せにします。
 * \RL 文字を右寄せにします。
 *
 * の3つです。
 * 呼び出された時点で、同ページのそれより下の行は自動的に
 * 設定したアライメントに変更されます。
 *
 * ※プラグインパラメータについて
 *
 * プラグインパラメータで指定した制御文字は、幅0として計算される
 * ようになります。
 *
 * この際、制御文字が\aの場合は、aを指定します。
 * 制御文字が\a[x]の場合は、aのみを指定します。
 *
 * 指定する制御文字はカンマ区切りで複数個指定可能です。
 * a,b,d
 * と指定すると、\a及び\a[x]、\b及び\b[x]、\d及び\d[x]が、
 * 文字幅0として計算されます。
 *
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.04:
 * 一つの行に複数の色変更やアイコンがあった時、正常にテキストの幅が取得できないバグを修正。
 * ver1.03:
 * 拡張制御文字に合わせて処理を修正。
 * ver1.02:
 * プラグインパラメータに何も指定していない時、アライメント指定が正常に機能しないバグを修正。
 * ver1.01:
 * 文章のスクロール表示に対応。
 * }{を使用すると、正常に文字の横幅を取得できていなかったバグを修正。
 * 指定した制御文字を幅0で計算するためのパラメータを追加。
 * ver1.00:
 * 公開
 */

(function() {

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('MessageAlignmentEC');
    var extendEC = parameters['ExtendEC'].split(',');

    ////////////////////////////////////////////////////////////////////////////////////

    Window_Base.prototype.textWidthEx = function (text) {
        var result = 0;
        text = text.replace(/\x1bC\[\d+\]/gi, '');
        text = text.replace(/\x1bI\[\d+\]/gi, function () {
            result += Window_Base._iconWidth;
            return '';
        }.bind(this));
        for (var i = 0, max = text.length;i < max; i++) {
            var c = text[i];
            if (c === '\x1b') {
                i++;
                c = text[i];
                if (c === '{') {
                    this.makeFontBigger();
                } else if (c === '}') {
                    this.makeFontSmaller();
                } else if (c === 'F' && text[i+1] === 'S') {
                    var cc = '\x1b';
                    for (var j=i;j<max;j++){
                        cc += text[j];
                        if (text[j] === ']'){
                            if (cc.match(/\x1bFS\[(\d+)\]/i)) this.contents.fontSize =  Number(RegExp.$1);
                            i = j;
                            break;
                        }
                    }
                }
            } else {
                result += this.textWidth(c);
            }
        }
        return result;
    };

    Window_Base.prototype.setAlignment = function (text, col, max) {
        if (this._aligns === undefined) {
            this._aligns = [];
        }
        text = text.replace(/\x1bLL/i, function () {
            for (var j = col; j < max; j++) {
                this._aligns[j] = null;
            }
            return '';
        }.bind(this));
        text = text.replace(/\x1bCL/i, function () {
            for (var j = col; j < max; j++) {
                this._aligns[j] = 'center';
            }
            return '';
        }.bind(this));
        text = text.replace(/\x1bRL/i, function () {
            for (var j = col; j < max; j++) {
                this._aligns[j] = 'right';
            }
            return '';
        }.bind(this));
        return text;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義
    Window_ScrollText.prototype.refresh = function() {
        var textState = { index: 0 };
        textState.text = this.convertEscapeCharacters(this._text);
        this.resetFontSettings();
        this._allTextHeight = this.calcTextHeight(textState, true);
        var texts = this._text.split('\n');
        this.createContents();
        this.origin.y = -this.height;
        var yy = 0;
        var fontSize = this.contents.fontSize;
        this._aligns = [];
        for (var i=0,max=texts.length;i<max;i++){
            var text = texts[i];
            var text2 = this.convertEscapeCharacters(text);
            if (fontSize > this.standardFontSize()){
                var n = Math.ceil((fontSize - this.standardFontSize()) / 12);
                for (var j=0;j<n;j++){ text = '\\{' + text } }
            if (fontSize < this.standardFontSize()){ text = '\\}' + text }
            var height = this.calcTextHeight({index:0,text:text2}, false);
            text2 = this.setAlignment(text2,i,max);
            var textWidth = this.textWidthEx(text2);
            var sx = 0;
            if (this._aligns[i] === 'center'){
                sx = (this.contentsWidth() - this.textPadding() - textWidth) / 2;
            } else if (this._aligns[i] === 'right'){
                sx = this.contentsWidth() - this.textPadding() - textWidth;
            }
            this.drawTextEx(text, this.textPadding() + sx, 1 + yy);
            fontSize = this.contents.fontSize;
            yy += height;
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WMessage_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
        this._callStart = true;
        __WMessage_startMessage.call(this);
        this._callStart = false;
    };

    Window_Message.prototype.checkTextWidth = function () {
        this._currentPage = 0;
        var texts = this._textState.text.split('\n');
        this._corX = [0, 0, 0, 0];
        this._aligns = [];
        var fontSize = this.contents.fontSize;
        var ary = this.zeroWidthEscapes();
        for (var i = 0, max = texts.length; i < max; i++) {
            var text = texts[i];
            for (var j=0,jmax=ary.length;j<jmax;j++){
                var regExp = new RegExp('\\x1b'+ary[j]+'(?:\\[.+?\\])*','gi');
                text = text.replace(regExp, '');
            }
            text = this.setAlignment(text, i, max);
            this._corX[i] = this.textWidthEx(text);
        }
        this.contents.fontSize = fontSize;
    };
    
    Window_Message.prototype.zeroWidthEscapes = function() {
        var ary = ['\\.','\\|','\\$','>','<','!','\\^'];
        if (extendEC.length > 0 && extendEC[0] !== ''){ ary = ary.concat(extendEC) }
        if (Imported['yExtendEscapeCharacters']){
            var ary2 = ['BGM','BGS','SE','ME','FRT','FFV','FFH','FO','FCI','FSN','FCT','FBC',
                        'WC','WCW','DWC','DWCW','MMW','RMW','OMW','BLN','ANI','SPIC','MPIC',
                        'ZPIC','OPIC','ORPIC','RPIC','APIC','TPIC','NCPIC','CFPIC','CTPIC',
                        'CXPIC','BNPIC','FIPIC','FOPIC'];
            ary = ary.concat(ary2);
        }
        if (Imported['StandPictureEC']){
            var ary2 = ['WT','SP','HP','CP','RP','MP','ZP','RMP','RRP','RZP','TP','CFP',
                        'COP','BCP','LS','LE','BP','OP','SFR','SBK','MC','RMC','ZC','RZC',
                        'RC','RRC','RPC','ZPC','SAC'];
            ary = ary.concat(ary2);
        }
        return ary;
    };

    var __WMessage_newLineX = Window_Message.prototype.newLineX;
    Window_Message.prototype.newLineX = function () {
        if (this._callStart) {
            this.checkTextWidth()
        }
        var newX = __WMessage_newLineX.call(this);
        var width = this.contents.width;
        if (this._rightFace){ width -= 168 }
        if (this._aligns[this._currentPage] === 'center') {
            newX = ((width - newX) - this._corX[this._currentPage]) / 2 + newX;
        } else if (this._aligns[this._currentPage] === 'right') {
            newX = width - this._corX[this._currentPage];
        }
        return newX;
    };

    var __WMessage_processNewLine = Window_BattleLog.prototype.processNewLine;
    Window_Message.prototype.processNewLine = function (textState) {
        __WMessage_processNewLine.call(this, textState);
        this._currentPage += 1;
        this._textState.x = this.newLineX();
    };

////////////////////////////////////////////////////////////////////////////////////
}());