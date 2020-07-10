//
//  D値 ver1.03
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
Imported['DPoint'] = 1.03;
/*:
 * @plugindesc ver1.03/ダメージ計算式に使用できるD値を設定できるようにします。
 * @author Yana
 * 
 * @param DefaultDFormula
 * @desc D値の基本計算式です。
 * @default a.atk / 5
 * 
 * @param DefaultWeaponD
 * @desc 武器やスキルの基本D値です。
 * @default 0
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * 武器やエネミー、スキルやステートのメモ欄に
 * <D値:○>
 * または
 * <DPoint:○>
 * と記述すると、武器やエネミー、スキルやステートのD値を○に設定することができます。
 * 
 * ダメージ計算式にa.dpやb.dpと記述することで、値を取得することができます。
 * また、基本D値として、DefaultDFormulaで指定した式の結果がD値に設定されます。
 * D値は武器、スキル、ステート等の合計値が適用されます。
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
 * var1.03:
 * エネミーの使用するスキルのD値が正常に加算されていなかったバグを修正。
 * ver1.02:
 * エネミーのD値設定が正常に動作していなかったバグを修正。
 * ver1.01:
 * スキルのD値が正常に計算されていなかったバグを修正。
 * ver1.00:
 * 公開
 */
(function(){
    ////////////////////////////////////////////////////////////////////////////////////
    
    var parameters = PluginManager.parameters('DPoint');
    var defaultDFormula = String(parameters['DefaultDFormula'] || 'a.atk / 5');
    var defaultWeaponD = Number(parameters['DefaultWeaponD']);
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    DataManager.dPoint = function(item) {
        if (item._dPoint === undefined){
            item._dPoint = 0;
            if (this.isWeapon(item)){ item._dPoint += defaultWeaponD }
            if (item.meta['D値']){ item._dPoint = Number(item.meta['D値']) }
            if (item.meta['DPoint']){ item._dPoint = Number(item.meta['DPoint']) }
        }
        return item._dPoint;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////

    Object.defineProperties(Game_Battler.prototype, {
        dp: { get: function() { return this.dpoint(); }, configurable: true }
    });
    
    Game_Battler.prototype.dpoint = function() {
        var a = this;
        var v = $gameVariables._data;
        var n = eval(defaultDFormula);
        var states = this.states();
        for (var i=0,max=states.length;i<max;i++){
            n += DataManager.dPoint(states[i]);
        }
        return n;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////

    Game_Actor.prototype.dpoint = function() {
        var n = Game_Battler.prototype.dpoint.call(this);
        if (this.weapons().length > 0){
            var nn = this.weapons().reduce(function(r,w){
                if (w){ r += DataManager.dPoint(w) }
                return r;
            },0);
            n += nn / this.weapons().length;
        }
        var action = BattleManager._action;
        if (action) n += DataManager.dPoint(action.item());
        return n;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Enemy.prototype.dpoint = function() {
        var n = Game_Battler.prototype.dpoint.call(this);
        n += DataManager.dPoint(this.enemy());
        var action = BattleManager._action;
        if (action) n += DataManager.dPoint(action.item());
        return n;
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());