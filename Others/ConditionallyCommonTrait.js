//
//  条件コモン特徴 ver1.01
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
Imported['ConditionallyCommonTrait'] = 1.01;
/*:
 * @plugindesc ver1.01/条件を満たした時、コモンイベントを予約する特徴を追加します。
 * @author Yana
 *
 * @param CountFrame
 * @desc 何フレームに1度判定を実行するかの設定です。
 * @default 4
 *
 * @param SubjectIndex
 * @desc 起動者のインデックスを格納する変数のIDです。
 * 格納されたインデックスがエネミーの場合、+1000された値が入ります。
 * @default 12
 *
 * @help ------------------------------------------------------
 * このプラグインについて
 * ------------------------------------------------------
 *
 * このプラグインは、「条件を満たすとコモンイベントを呼び出す特徴」を追加するプラグインです。
 * 特徴を持ったオブジェクトのメモに指定のキーワードを記述してください。
 *
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 *
 * アクターやエネミー武器、防具、クラス、ステートなど特徴を持ったオブジェクトのメモに
 * <条件発動コモン:コモンID,発動率%>
 * 発動条件
 * </条件発動コモン>
 * または、
 * <ConditionallyCommon:CommonId,Rate%>
 * trigger
 * </ConditionallyCommon>
 * と記述してください。
 * この記述がある特徴オブジェクトを持っているアクターまたはエネミーがその場にいる場合、
 * 発動条件が満たされた際に指定したコモンIDを発動率%の確率で予約します。
 *
 * 発動条件は、記述した内容がevalで評価されるため、true/falseを返す条件式を記述してください。
 * また、ConditionallyCoreが導入されている場合、条件設定はそちらの方式に変更されます。
 * 条件式では、a=発動者 v=変数 s=スイッチが使用可能です。
 *
 * 例:スイッチ1番がONのとき、tabキーを押すと10%の確率でコモンイベント1番を実行
 * <条件発動コモン:1,10%>
 * s[1]
 * Input.isTriggerd('tab')
 * </条件発動コモン>
 *
 * ※ConditionallyCoreが入っている場合、同じ記述は以下になります。
 * <条件発動コモン:1,10%>
 * スクリプト条件:s[1]
 * スクリプト条件:Input.isTriggerd('tab')
 * </条件発動コモン>
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
 * 起動者のインデックスを変数に入れる処理を追加。
 * ver1.00:
 * 公開
 */


(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('ConditionallyCommonTrait');
    var countFrame = Number(parameters['CountFrame']) || 1;
    var subjectIndexVarId = Number(parameters['SubjectIndex']);

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.conditionallyCommon = function(item) {
        if (!item) return [];
        if (item._conditionallyCommon) return item._conditionallyCommon;
        item._conditionallyCommon = [];
        var texts = item.note.split('\n');
        for (var i=0,max=texts.length;i<max;i++) {
            if (texts[i].match(/<(?:条件発動コモン|ConditionallyCommon):(\d+),(\d+)[%％]>/)) {
                var result = { commonId:parseInt(RegExp.$1,10), rate:Number(RegExp.$2)*0.01, cond:[] };
                for (var j=i+1;j<max;j++) {
                    if (texts[j].match(/<\/(?:条件発動コモン|ConditionallyCommon)>/)) {
                        item._conditionallyCommon.push(result);
                        i = j;
                        break;
                    } else {
                        if (Imported['ConditionallyCore']) {
                            result.cond.push(ConditionallyManager.makeCondition(texts[j]));
                        } else {
                            result.cond.push(texts[j]);
                        }
                    }
                }
            }
        }
        return item._conditionallyCommon;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Temp.prototype.updateConditionallyCommon = function() {
        if (Graphics.frameCount % countFrame !== 0) return;
        var members = $gameParty.members();
        if ($gameParty._inBattle) members = members.concat($gameTroop.members());
        var v = $gameVariables._data;
        var s = $gameSwitches._data;
        for (var i=0,max = members.length;i<max;i++) {
            var a = members[i];
            var to = a.traitObjects();
            for (var j=0,jmax=to.length;j<jmax;j++) {
                var conds = DataManager.conditionallyCommon(to[j]);
                for (var k=0,kmax=conds.length;k<kmax;k++) {
                    var c = conds[k];
                    if (c.rate > Math.random()) {
                        var f = true;
                        if (Imported['ConditionallyCore']) {
                            f = ConditionallyManager.checkConditions(a, a, c.cond);
                        } else {
                            for (var l=0,lmax=c.cond.length;l<lmax;l++) {
                                f = eval(c.cond[l]);
                                if (!f) break;
                            }
                        }
                        if (f){
                            if (subjectIndexVarId) {
                                var index = a.index();
                                if (a.isEnemy()) index += 1000;
                                $gameVariables.setValue(subjectIndexVarId, index);
                            }
                            this.reserveCommonEvent(c.commonId);
                            return;
                        }
                    }
                }
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GMap_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        __GMap_update.call(this, sceneActive);
        if (sceneActive && !this.isEventRunning()) $gameTemp.updateConditionallyCommon();
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SBattle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        __SBattle_update.call(this);
        if (!$gameTroop.isEventRunning()) $gameTemp.updateConditionallyCommon();
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());