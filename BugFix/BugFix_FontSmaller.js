//
//  BugFix_FontSmaller ver1.00
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
Imported['BugFix_FontSmaller'] = 1.00;

/*:
 * @plugindesc ver1.00/テキストの一番最初に\}を使うと、1行目だけ高さが調整されないバグを修正します。
 * @author Yana
 * 
 * 
 * @help------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
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
 * ver1.00:
 * 公開
 */

(function(){
    
  var _BF_WBase_calcTextHeight = Window_Base.prototype.calcTextHeight;
  Window_Base.prototype.calcTextHeight = function(textState, all) {
    var lastFontSize = this.contents.fontSize;
    var text = textState.text.split('\n')[0];
    while (text.match(/\x1b[\}]/g)){
        text = text.replace(/\x1b[\}]/g,'');
        this.makeFontSmaller();
    }
    var result = _BF_WBase_calcTextHeight.call(this,textState,all);
    this.contents.fontSize = lastFontSize;
    return result;
  };
}());
