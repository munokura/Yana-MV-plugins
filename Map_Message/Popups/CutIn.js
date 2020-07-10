//
//  カットイン ver1.02
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
Imported['CutIn'] = 1.02;

/*:
 * @plugindesc ver1.02/スキルやアイテムに記述することで、発動前にカットインを表示することができます。
 * @author Yana
 *
 * @param Count
 * @desc カットインの表示時間の基本値です。
 * フレームで指定してください。
 * @default 60
 *
 * @param AnchorX
 * @desc カットインのアンカー位置Xです。
 * @default 0
 *
 * @param AnchorY
 * @desc カットインのアンカー位置Yです。
 * @default 0.5
 *
 * @param ActorHomeX
 * @desc アクターのカットインの移動前のX座標です。
 * @default 816
 *
 * @param ActorHomeY
 * @desc アクターのカットインの移動前のY座標です。
 * @default 312
 *
 * @param ActorMoveX
 * @desc アクターのカットインの移動量X値です。
 * @default -816
 *
 * @param ActorMoveY
 * @desc アクターのカットインの移動量Y値です。
 * @default 0
 *
 * @param EnemyHomeX
 * @desc エネミーのカットインの移動前のX座標です。
 * @default -816
 *
 * @param EnemyHomeY
 * @desc エネミーのカットインの移動前のY座標です。
 * @default 312
 *
 * @param EnemyMoveX
 * @desc エネミーのカットインの移動量X値です。
 * @default 816
 *
 * @param EnemyMoveY
 * @desc エネミーのカットインの移動量Y値です。
 * @default 0
 *
 * @noteParam CutIn1
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン1
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn2
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン2
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn3
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン3
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn4
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン4
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn5
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン5
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn6
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン6
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn7
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン7
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn8
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン8
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn9
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン9
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn10
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン10
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * ////////////////////////////////////////////////////////////////////////////////////
 *
 * @noteParam CutIn11
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン11
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn12
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン12
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn13
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン13
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn14
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン14
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn15
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン15
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn16
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン16
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn17
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン17
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn18
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン18
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn19
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン19
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn20
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン20
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * ////////////////////////////////////////////////////////////////////////////////////
 *
 * @noteParam CutIn21
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン21
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn22
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン22
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn23
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン23
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn24
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン24
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn25
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン25
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn26
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン26
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn27
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン27
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn28
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン28
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn29
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン29
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn30
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン30
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * ////////////////////////////////////////////////////////////////////////////////////
 *
 * @noteParam CutIn31
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン31
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn32
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン32
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn33
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン33
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn34
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン34
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn35
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン35
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn36
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン36
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn37
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン37
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn38
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン38
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn39
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン39
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn40
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン40
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * ////////////////////////////////////////////////////////////////////////////////////
 *
 * @noteParam CutIn41
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン41
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn42
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン42
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn43
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン43
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn44
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン44
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn45
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン45
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn46
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン46
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn47
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン47
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn48
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン48
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn49
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン49
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam CutIn50
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam カットイン50
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @help------------------------------------------------------
 *  プラグインコマンド
 * ------------------------------------------------------
 * ShowCutIn 対象指定 アイテム指定
 * カットイン表示 対象指定 アイテム指定
 *
 * 対象指定は、A○,E○,V○のように指定します。
 * A○の場合、ID○番のアクターが対象に指定され、そのアクターのメモに
 * 記述されたカットイン画像が使用されます。
 * E○の場合は、ID○番のエネミーが、V○の場合は、パーティの変数○番の値
 * のアクター(値が1000以上ならエネミー)となります。
 *
 * アイテム指定は、I○,S○,V○のように指定します。
 * I○の場合は、ID○番のアイテムに設定されたカットインが使用されます。
 * S○の場合は、ID○番のスキルが、V○の場合は、変数○番の値のスキルが
 * 使用されます。
 *
 * ------------------------------------------------------
 * 設定方法
 * ------------------------------------------------------
 *
 * スキルやアイテムのメモ欄に
 * <カットイン:xxx>
 * または、
 * <CutIn:xxx>
 * と記述すると、行動者のメモに<xxx:yyy>と記述されたyyyの
 * 画像をカットインとして表示します。
 * yyyは、カットイン1～50とCutIn1～50が、素材削除ツールの機能
 * を回避するためにアクターとエネミーに予約されています。
 *
 * また、スキルやアイテムのメモに記述するカットインの指定は、
 * 追加パラメータとして、ポップアップ用のパラメータが指定できます。
 * 指定可能なパラメータは以下となります。
 *
 * パラメータ詳細:
 * count:表示時間
 * delay:表示遅延
 * moveX:目標地点X(相対座標)
 * moveY:目標地点Y(相対座標)
 * sx:表示位置補正X
 * sy:表示位置補正Y
 * pattern:表示パターン
 * extend:表示タイミングの調整用配列で指定。 例:extend:[20,50] 20フレーム掛けて出現し、50フレーム目から消え始める。
 * fixed:画面に固定するか？ true/falseで指定。
 * anchorX:ポップアップのアンカーX値
 * anchorY:ポップアップのアンカーY値
 * slideCount:新しいポップアップが発生した際、上にスライドさせる速度。
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
 * ver1.02:
 * CommonPopupCoreの更新に合わせて修正
 * ver1.01:
 * fixedのパラメータの初期値がtrueになっているのを修正
 * ver1.00:
 * 公開
 */

(function() {

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('CutIn');
    var countCutIn = Number(parameters['Count'] || 60);
    var anchorXCutIn = Number(parameters['AnchorX'] || 0);
    var anchorYCutIn = Number(parameters['AnchorY'] || 0);
    var actorHomeXCutIn = Number(parameters['ActorHomeX'] || 0);
    var actorHomeYCutIn = Number(parameters['ActorHomeY'] || 0);
    var actorMoveXCutIn = Number(parameters['ActorMoveX'] || 0);
    var actorMoveYCutIn = Number(parameters['ActorMoveY'] || 0);
    var enemyHomeXCutIn = Number(parameters['EnemyHomeX'] || 0);
    var enemyHomeYCutIn = Number(parameters['EnemyHomeY'] || 0);
    var enemyMoveXCutIn = Number(parameters['EnemyMoveX'] || 0);
    var enemyMoveYCutIn = Number(parameters['EnemyMoveY'] || 0);

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        __GInterpreter_pluginCommand.call(this, command, args);
        if (command === 'ShowCutIn' || command === 'カットイン表示') {
            this.showCutIn(args[0],args[1]);
        }
    };

    Game_Interpreter.prototype.showCutIn = function(subject, item) {
        var s = null;
        var it = null;
        var isActor = true;
        if (/^([AEV])(\d+)/i.exec(subject)) {
            if (RegExp.$1 === 'A'){
                s = $dataActors[Number(RegExp.$2)];
            } else if (RegExp.$1 === 'E') {
                s = $dataEnemies[Number(RegExp.$2)];
                isActor = false;
            } else if (RegExp.$1 === 'V') {
                var n = $gameVariables.value(Number(RegExp.$2));
                if (n < 1000){
                    s = $gameParty.members()[n];
                } else {
                    s = $gameTroop.members()[n-1000];
                    isActor = false;
                }
            }
        } else {
            subject = Number(subject);
            if (subject < 1000){
                s = $gameParty.members()[subject];
            } else {
                s = $gameTroop.members()[subject-1000];
                isActor = false;
            }
        }
        if (/^([ISV])(\d+)/i.exec(item)){
            if (RegExp.$1 === 'I') {
                it = $dataItems[Number(RegExp.$2)];
            } else if (RegExp.$1 === 'S') {
                it = $dataSkills[Number(RegExp.$2)];
            } else if (RegExp.$1 === 'V') {
                it = $dataSkills[$gameVariables.value(Number(RegExp.$2))];
            }
        } else {
            it = $dataSkills[Number(item)];
        }
        CommonPopupManager.displayCutIn(s, it, isActor);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.isCutIn = function(item) {
        if (!item){ return false }
        if (item.meta['カットイン']){ return true }
        if (item.meta['CutIn']){ return true }
        return false;
    };

    DataManager.cutIn = function(item) {
        var ary = [];
        var texts = item.note.split('\n');
        for(var i=0,max=texts.length;i<max;i++){
            if (/<(?:カットイン|CutIn):(.+)>/.exec(texts[i])){ ary.push(RegExp.$1.split(' ')) }
        }
        return ary;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __BManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        var action = this._subject.currentAction();
        if (action && action.item() && DataManager.isCutIn(action.item())){
            this._logWindow.displayCutIn(this._subject, action.item());
        }
        __BManager_startAction.call(this);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Window_BattleLog.prototype.displayCutIn = function(subject, item) {
        var sj = subject.isActor() ? subject.actor() : subject.enemy();
        CommonPopupManager.displayCutIn(sj, item, subject.isActor());
    };

    Window_BattleLog.prototype.showWindows = function() {
        this.visible = this._showStatus;
        SceneManager._scene._statusWindow.show();
        if (Imported['TurnWindow']) { SceneManager._scene._turnWindow.show() }
        if (Imported['yAutoBattle']) { SceneManager._scene._autoBattleWindow.show() }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    CommonPopupManager.displayCutIn = function(subject, item, isActor) {
        var array = DataManager.cutIn(item);
        this.hideWindows();
        var speed = this.isFastForward() ? 3 : 1;
        var pos = [actorHomeXCutIn,actorHomeYCutIn,actorMoveXCutIn,actorMoveYCutIn];
        if (!isActor){ pos = [enemyHomeXCutIn,enemyHomeYCutIn,enemyMoveXCutIn,enemyMoveYCutIn] }
        for(var i=0,max=array.length;i<max;i++) {
            var ary = array[i];
            var arg = CommonPopupManager.setPopup(ary);
            var fileName = ary[0];
            if (isActor) {
                fileName = subject.meta[fileName];
            } else {
                fileName = subject.meta[fileName];
            }
            if (fileName) {
                var bitmap = ImageManager.loadPicture(fileName);
                arg.count = countCutIn;
                arg.bitmap = bitmap;
                arg.anchorX = anchorXCutIn;
                arg.anchorY = anchorYCutIn;
                arg.x = pos[0];
                arg.moveX = pos[2];
                arg.y = pos[1];
                arg.moveY = pos[3];
                arg.fixed = false;
                for (var j = 0, jmax = ary.length; j < jmax; j++) {
                    if (/^count:(\d+)/.exec(ary[j])) {
                        arg.count = Number(RegExp.$1);
                    } else if (/^x:(-?\d+)/.exec(ary[j])) {
                        arg.x = Number(RegExp.$1);
                    } else if (/^moveX:(-?\d+)/.exec(ary[j])) {
                        arg.moveX = Number(RegExp.$1);
                    } else if (/^y:(-?\d+)/.exec(ary[j])) {
                        arg.y = Number(RegExp.$1);
                    } else if (/^moveY:(-?\d+)/.exec(ary[j])) {
                        arg.moveY = Number(RegExp.$1);
                    } else if (/^anchorX:(.+)/.exec(ary[j])) {
                        arg.anchorX = Number(RegExp.$1);
                    } else if (/^anchorY:(.+)/.exec(ary[j])) {
                        arg.anchorY = Number(RegExp.$1);
                    } else if (/^pattern:(.+)/.exec(ary[j])){
                        arg.pattern = RegExp.$1;
                    }
                }
                arg.count = Math.floor(arg.count / speed);
                arg.delay = Math.floor(arg.delay / speed);
                this._lastIndex = this._tempCommonSprites.setNullPos(arg);
                if ($gameParty.inBattle()) {
                    var count = Math.floor((arg.count + arg.delay) / speed);
                    if (SceneManager._scene._logWindow._waitCount <= 0) {
                        SceneManager._scene._logWindow._waitCount = count;
                    }
                    if (SceneManager._scene._logWindow._waitCount < count) {
                        SceneManager._scene._logWindow._waitCount = count;
                    }
                }
                bitmap = null;
            }
            this.showWindows();
        }
    };
    
    CommonPopupManager.hideWindows = function() {
        if ($gameParty.inBattle()) {
            SceneManager._scene._logWindow._showStatus = SceneManager._scene._logWindow.visible;
            SceneManager._scene._logWindow.hide();
            SceneManager._scene._statusWindow.hide();
            if (Imported['TurnWindow']) { SceneManager._scene._turnWindow.hide() }
            if (Imported['yAutoBattle']) {SceneManager._scene._autoBattleWindow.hide() }
        }
    };

    CommonPopupManager.showWindows = function() {
        if ($gameParty.inBattle()) {
            SceneManager._scene._logWindow.push('showWindows');
        }
    };

    CommonPopupManager.isFastForward = function() {
        if ($gameParty.inBattle()) {
            return SceneManager._scene._logWindow.isFastForward();
        }
        return false;
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());
