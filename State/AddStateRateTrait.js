//
//  ステート付着率操作特徴 ver1.00
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
Imported['AddStateRateTrait'] = 1.00;
/*:
 * @plugindesc ver1.00/ステートの付着率を操作する特徴を設定できるようにします。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * 特徴を持ったオブジェクトやスキル、アイテムのメモ欄に
 * <ステート付着率:x+y%>
 * または、
 * <AddStateRate:x+y%>
 * と記述すると、IDxのステートの付着率をy%増加します。
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
(function(){
    ////////////////////////////////////////////////////////////////////////////////////
    
    var parameters = PluginManager.parameters('AddStateRateTrait');
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    DataManager.addStateRate = function(item) {
        if (!item){ return {} }
        if (item._addStateRate === undefined){
            item._addStateRate = {};
            var texts = item.note.split('\n');
            for (var i=0,max=texts.length;i<max;i++){
                var text = texts[i];
                if (text.match(/<(?:ステート付着率|AddStateRate):(\d+)([+-]\d+)[%％]>/)){
                    item._addStateRate[RegExp.$1] = Number(RegExp.$2);
                }
            }
        }
        return item._addStateRate;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    var __GAction_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
    Game_Action.prototype.itemEffectAddState = function(target, effect) {
        this._tempEffect = effect;
        this._tempCallCount = 0;
        __GAction_itemEffectAddState.call(this,target,effect);
        this._tempEffect = null;
    };
    
    var __GAction_lukEffectRate = Game_Action.prototype.lukEffectRate;
    Game_Action.prototype.lukEffectRate = function(target) {
        var r = __GAction_lukEffectRate.call(this,target);
        if (this._tempEffect){
            var stateId = this._tempEffect.dataId;
            if (stateId === 0){
                stateId = this.subject().attackStates()[this._tempCallCount];
                this._tempCallCount++;
            }
            var iS = DataManager.addStateRate(this.item())[String(stateId)];
            if (iS){ r += iS * 0.01 }
            this.subject().traitObjects().forEach(function(to){
                var stateRate = DataManager.addStateRate(to)[String(stateId)];
                if (stateRate){ r += stateRate * 0.01 }
            }.bind(this));
        }
        return r;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
}());