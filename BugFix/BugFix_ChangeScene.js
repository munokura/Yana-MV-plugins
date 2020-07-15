//
//  バグ修正-シーンチェンジ ver1.00
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
Imported['BugFix_ChangeScene'] = 1.00;

/*:
 * @plugindesc ver1.00/メッセージウィンドウが開いていない状態でシーンチェンジを行うと、正常にウィンドウが閉じない不具合を修正します。
 * @author Yana
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

(function() {

    'use strict';

    ////////////////////////////////////////////////////////////////////////////////////

    Window_Message.prototype.isClosing = function() {
        return Window_Base.prototype.isClosing.call(this) || this.isSubWindowsClosing();
    };

    Window_Message.prototype.isSubWindowsClosing = function() {
        return this.subWindows().some(function(w){ return w.isClosing() });
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());