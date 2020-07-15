//
//  濁点、半濁点制御文字 ver1.00
//
// author yana
//

var Imported = Imported || {};
Imported['VPSoundEC'] = 1.00;
/*:
 * @plugindesc ver1.00/指定した文字に濁点や半濁点を付ける制御文字を追加します。
 * @author Yana
 *
 * @param PlusRate
 * @desc 濁点の表示位置です。文字サイズに対する倍率で指定してください。
 * @default 0.75
 *
 * @help------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * drawTextExを通る場面(文章の表示やバトルログ)などで、
 * \VS[濁点を付けたいテキスト]
 * と記述することで、そのテキストに濁点を付けることができます。
 *
 * また、
 * \PS[半濁点を付けたいテキスト]
 * と記述することで、そのテキストに半濁点を付けることができます。
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
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
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('VPSoundEC');
    var plusRate = Number(parameters['PlusRate']);

    ////////////////////////////////////////////////////////////////////////////////////

    var __WBase_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        switch(code) {
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

    Window_Base.prototype.processDrawVSound = function(text, textState) {
        for(var i=0,max=text.length;i<max;i++){
            var c = text[i];
            var w = this.textWidth(c);
            this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
            this.contents.drawText('゛', textState.x+Math.floor(w*plusRate), textState.y, w * 2, textState.height);
            textState.x += w;
        }
    };

    Window_Base.prototype.processDrawPSound = function(text, textState) {
        for(var i=0,max=text.length;i<max;i++){
            var c = text[i];
            var w = this.textWidth(c);
            this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
            this.contents.drawText('゜', textState.x+Math.floor(w*plusRate), textState.y, w * 2, textState.height);
            textState.x += w;
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());