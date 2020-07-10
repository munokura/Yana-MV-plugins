//
//  行動時評価式追加 ver1.00
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
Imported['ActionEvals'] = 1.00;

/*:
 * @plugindesc ver1.00/行動時に設定した式を判定するように機能を追加します。
 * @author Yana
 *
 * @param UseTraits
 * @desc 特徴を評価するかの設定です。
 * trueで行動者の特徴に記述された評価式も評価を行います。
 * @default true
 *
 * @help プラグインコマンドはありません。
 *
 * 行動前、行動後などに評価されるeval式を特徴やスキル、アイテムに設定できるようにします。
 *
 * ※このプラグインはBeforeCommon(行動前コモン)よりも下に配置してください。
 *
 * ------------------------------------------------------
 * 使い方
 * ------------------------------------------------------
 * *************************************************
 *  ・行動前に式を評価する
 *  (BattleManager.startActionの後)
 * *************************************************
 * アイテムやスキル、または特徴を持ったオブジェクトのメモ欄に、
 * <行動前評価式>
 * 計算式1行目
 * 計算式2行目
 * ・・・
 * </行動前評価式>
 * または、
 * <BeforeActionEval>
 * formula1
 * formula2
 * ・・・
 * </BeforeActionEval>
 *
 * *************************************************
 * ・ダメージを計算する直前に対象毎に式を評価する
 * (Game_Action.makeDamageValueの前)
 * *************************************************
 * アイテムやスキル、または特徴を持ったオブジェクトのメモ欄に、
 * <行動前対象毎評価式>
 * 計算式1行目
 * 計算式2行目
 * ・・・
 * </行動前対象毎評価式>
 * または、
 * <BeforeTargetsActionEval>
 * formula1
 * formula2
 * ・・・
 * </BeforeTargetsActionEval>
 *
 * *************************************************
 * ・使用効果適用後に対象毎に式を評価する
 * (Game_Action.applyItemUserEffectの後)
 * *************************************************
 * アイテムやスキル、または特徴を持ったオブジェクトのメモ欄に、
 * <行動後対象毎評価式>
 * 計算式1行目
 * 計算式2行目
 * ・・・
 * </行動後対象毎評価式>
 * または、
 * <AfterTargetsActionEval>
 * formula1
 * formula2
 * ・・・
 * </AfterTargetsActionEval>
 *
 * *************************************************
 * ・行動を終了する直前に式を評価する
 * (BattleManager.endActionの前)
 * *************************************************
 * アイテムやスキル、または特徴を持ったオブジェクトのメモ欄に、
 * <行動後評価式>
 * 計算式1行目
 * 計算式2行目
 * ・・・
 * </行動後評価式>
 * または、
 * <AfterActionEval>
 * formula1
 * formula2
 * ・・・
 * </AfterActionEval>
 *
 * それぞれの計算式では、ダメージ計算式と同じように、
 * a:使用者
 * b:対象
 * v:変数
 * が使用可能です。
 * また、
 * s:スイッチ
 * action:現在のアクション
 *
 * 実行されるタイミングが対象毎以外の場合は、
 * b:すべて対象の配列
 * となります。
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

    var parameters = PluginManager.parameters('ActionEvals');
    var useTraits = parameters['UseTraits'] === 'true';

    ////////////////////////////////////////////////////////////////////////////////////

    var executeActionEval = function(mode, target) {
        if (BattleManager._subject) {
            var a = BattleManager._subject;
            var b = target ? target : BattleManager._targets;
            var action = BattleManager._action;
            var v = $gameVariables._data;
            var s = $gameSwitches._data;
            if (action) {
                var evals = [];
                if (useTraits) {
                    var traits = a.traitObjects();
                    for (var i = 0, max = traits.length; i < max; i++) {
                        evals.push(actionEvals(traits[i])[mode]);
                    }
                }
                evals.push(actionEvals(action.item())[mode]);
                if (target) b = target;
                for (var i = 0, max = evals.length; i < max; i++){
                    if (evals[i]) eval(evals[i]);
                }
            }
        }
    };

    var actionEvals = function(item) {
        if (item._actionEvals) return item._actionEvals;
        item._actionEvals = {before1:'',before2:'',after1:'',after2:'' };
        var texts = item.note.split('\n');
        for (var i=0,max=texts.length;i<max;i++) {
            if (/<(?:行動前評価式|BeforeActionEval)>/.test(texts[i])) {
                i++;
                for (var j=i;j<max;j++) {
                    if (/<\/(?:行動前評価式|BeforeActionEval)>/.test(texts[j])) {
                        i = j;
                        break;
                    } else {
                        item._actionEvals.before1 += '\n' + texts[j];
                    }
                }
            } else if (/<(?:行動前対象毎評価式|BeforeTargetsActionEval)>/.test(texts[i])) {
                i++;
                for (var j=i;j<max;j++) {
                    if (/<\/(?:行動前対象毎評価式|BeforeTargetsActionEval)>/.test(texts[j])) {
                        i = j;
                        break;
                    } else {
                        item._actionEvals.before2 += '\n' + texts[j];
                    }
                }
            } else if (/<(?:行動後評価式|AfterActionEval)>/.test(texts[i])) {
                i++;
                for (var j=i;j<max;j++) {
                    if (/<\/(?:行動後評価式|AfterActionEval)>/.test(texts[j])) {
                        i = j;
                        break;
                    } else {
                        item._actionEvals.after1 += '\n' + texts[j];
                    }
                }
            } else if (/<(?:行動後対象毎評価式|AfterTargetsActionEval)>/.test(texts[i])) {
                i++;
                for (var j=i;j<max;j++) {
                    if (/<\/(?:行動後対象毎評価式|AfterTargetsActionEval)>/.test(texts[j])) {
                        i = j;
                        break;
                    } else {
                        item._actionEvals.after2 += '\n' + texts[j];
                    }
                }
            }
        }
        return item._actionEvals;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __BManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        __BManager_startAction.call(this);
        if (Imported['BeforeCommon'] && this._execBeforeCommon) return;
        executeActionEval('before1');
    };

    var __BManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        executeActionEval('after1');
        __BManager_endAction.call(this);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GAction_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function(target, critical) {
        if (!$gameTemp._callTestEvaluate) executeActionEval('before2', target);
        return __GAction_makeDamageValue.call(this, target, critical);
    };

    var __GAction_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        __GAction_applyItemUserEffect.call(this, target);
        executeActionEval('after2', target);
    };

    var __GAction_evaluate = Game_Action.prototype.evaluate;
    Game_Action.prototype.evaluate = function() {
        this._callTestEvaluate = true;
        var result = __GAction_evaluate.call(this);
        this._callTestEvaluate = false;
        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());