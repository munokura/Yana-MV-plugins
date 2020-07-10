//
//  不意打ち軽減特徴 ver1.00
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
Imported['CancelSurpriseRateTrait'] = 1.00;
/*:
 * @plugindesc ver1.00/不意打ち確率を軽減する特徴を設定できるようにします。。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
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
    
    var parameters = PluginManager.parameters('CancelSurpriseRateTrait');
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    DataManager.cancelSurpriseRate = function(item) {
        if (item._cancelSurpriseRate === undefined){
            item._cancelSurpriseRate = 0;
            if (item.meta['不意打ち軽減']){ item._cancelSurpriseRate = Number(item.meta['不意打ち軽減'].replace(/[%％]/,'')) }
            if (item.meta['CancelSurpriseRate']){ item._cancelSurpriseRate = Number(item.meta['CancelSurpriseRate'].replace(/[%％]/,'')) }
        }
        return item._cancelSurpriseRate;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    Game_Actor.prototype.cancelSurpriseRate = function() {
        return this.traitObjects().reduce(function(r,to){
            return r + DataManager.cancelSurpriseRate(to);
        },0);
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    var __GParty_rateSurprise = Game_Party.prototype.rateSurprise;
    Game_Party.prototype.rateSurprise = function(troopAgi) {
        var rate = __GParty_rateSurprise.call(this,troopAgi);
        rate *= Math.max(this.cancelSurpriseRate(),0);
        return rate;
    };
    
    Game_Party.prototype.cancelSurpriseRate = function() {
        return this.members().reduce(function(r,m){
            return r - m.cancelSurpriseRate() * 0.01;
        },1.0);
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
}());