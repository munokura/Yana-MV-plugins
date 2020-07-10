//
//  YEP_MessageCore用パッチ-NameBox ver1.00
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
Imported['Patch_YMC_NameBox'] = 1.00;

/*:
 * @plugindesc ver1.00/YEP_MessageCoreのネームウィンドウの背景の状態を、メッセージウィンドウと同期する処理を追加します。
 * @author Yana
 *
 * @param StandardPadding
 * @desc ウィンドウの縁の幅です。MessageCoreのデフォルト値は18です。
 * @default 8
 *
 * @help------------------------------------------------------
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
 */

(function(){

    var parameters = PluginManager.parameters('Patch_YMC_NameBox');
    var standardPadding = parameters['StandardPadding'];

    Window_NameBox.prototype.updateBackground = function () {
        if (eval(Yanfly.Param.MSGNameBoxClear)) return;
        this._background = $gameMessage.background();
        this.setBackgroundType(this._background);
    };

    Window_NameBox.prototype.standardPadding = function () {
        return Number(standardPadding);
    };

    var __WNBox_update = Window_NameBox.prototype.update;
    Window_NameBox.prototype.update = function() {
        __WNBox_update.call(this);
        this.updateBackground();
    };
}());