//
// 逃走成功率修正特徴 ver1.01
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author yana
//

var Imported = Imported || {};
Imported['EscapeRateTrait'] = 1.01;

/*:
 * @plugindesc ver1.01/逃走の成功率を補正する特徴を追加します。
 * @author Yana
 *
 * @help------------------------------------------------------
 * 使い方
 * ------------------------------------------------------
 *
 * 特徴を持ったオブジェクトのメモに
 * <逃走成功率:x>
 * <EscapeRatio:x>
 * のいずれかが記述されている場合、そのオブジェクトを所持しているアクターが
 * 戦闘メンバーに存在するとき、逃走の成功率にx%加算されます。
 * これらの効果は、特徴ごとにすべて重複します。
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
 * ver1.01:
 * processEscapeが結果を返していなかったバグを修正。
 * ver1.00:
 * 公開
 */

(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('EscapeRateTrait');

    ////////////////////////////////////////////////////////////////////////////////////

    var __BManager_processEscape = BattleManager.processEscape;
    BattleManager.processEscape = function() {
        var er = $gameParty.escapeRatio();
        this._escapeRatio += er;
        var result = __BManager_processEscape.call(this);
        this._escapeRatio -= er;
        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Party.prototype.escapeRatio = function() {
        var members = this.members();
        var rate = 0;
        var n = null;
        for (var i=0,max = members.length;i<max;i++) {
            var member = members[i];
            var to = member.traitObjects();
            for (var j=0,jmax=to.length;j<jmax;j++) {
                n = null;
                if (to[j].meta['逃走成功率'])  n = to[j].meta['逃走成功率'];
                if (to[j].meta['EscapeRatio']) n = to[j].meta['EscapeRatio'];
                if (n) {
                    n = n.replace(/[%％]/,'');
                    n = Number(n) * 0.01;
                    if (n) rate += n;
                }
            }
        }
        return rate;
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());