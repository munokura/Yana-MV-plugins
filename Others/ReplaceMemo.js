//
//  メモ置換 ver1.00
//
// ------------------------------------------------------
// Copyright (c) 2017 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['ReplaceMemo'] = 1.00;

/*:
 * @plugindesc ver1.00/メモ内の特定の記述を別のオブジェクトのメモに置き換えます。
 * @author Yana
 *
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * メモを持ったオブジェクトのメモ欄に、
 * <メモ置換:○x>
 * <ReplaceMemo:○x>
 * のいずれかを記述することで、記述した部分を○xで指定したオブジェクトのメモの内容に置換します。
 * ○は、
 * M:アクター
 * C:クラス
 * S:スキル
 * I:アイテム
 * W:武器
 * A:防具
 * T:ステート
 * E:エネミー
 * のいずれか、
 * xはそれぞれのIDが入ります。
 *
 * 例:10番の防具のメモの内容に置換する
 * <メモ置換:A10>
 *
 * ただし、これを記述する際、データの読み込みの順番が
 * アクター
 * クラス
 * スキル
 * エネミー
 * ステート
 * アイテム
 * 武器
 * 防具
 * タイルセット
 * (マップ)
 * (イベント)
 * となっているため、順番が上のものが、順番が下になっているデータへの置換はできません。
 * ※アクターのメモの内容をエネミーのメモで置換することはできない等
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
 * ver1.00:
 * 公開
 */

(function() {

    ////////////////////////////////////////////////////////////////////////////////////

    'use strict';

    var parameters = PluginManager.parameters('ReplaceMemo');

    ////////////////////////////////////////////////////////////////////////////////////

    var __DManager_extractMetadata = DataManager.extractMetadata;
    DataManager.extractMetadata = function(data) {
        data.note = data.note.replace(/<(?:メモ置換|ReplaceMemo):([MCSIWATE])(\d+)>/gi,function() {
            switch(arguments[1]) {
                case 'M': return $dataActors[Number(arguments[2])].note;
                case 'C': return $dataClasses[Number(arguments[2])].note;
                case 'S': return $dataSkills[Number(arguments[2])].note;
                case 'I': return $dataItems[Number(arguments[2])].note;
                case 'W': return $dataWeapons[Number(arguments[2])].note;
                case 'A': return $dataArmors[Number(arguments[2])].note;
                case 'T': return $dataStates[Number(arguments[2])].note;
                case 'E': return $dataEnemies[Number(arguments[2])].note;
            }
            return '';
        });
        __DManager_extractMetadata.call(this, data);
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());