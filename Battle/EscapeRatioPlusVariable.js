//
//  逃走率変数加算 ver1.001
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
Imported['EscapeRatioPlusVariable'] = 1.001;
/*:
 * @plugindesc ver1.001/逃走率に指定した変数の値を加算します。
 * @author Yana
 * 
 * @param VariableID
 * @desc 加算する変数のIDです。
 * @type variable
 * @default 10
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * 
 * プラグインパラメータで変数IDを指定し、変数の操作でその変数に値を代入してください。
 * 変数%の値が、逃走率に加算されます。
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
 * ver1.001:180409
 * プラグインパラメータの仕様を1.5.0に更新。
 * ver1.00:
 * 公開
 */

(function(){
    ////////////////////////////////////////////////////////////////////////////////////
    
    var parameters = PluginManager.parameters('EscapeRatioPlusVariable');
    var variableId = Number(parameters['VariableID']);
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    var __BManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
    BattleManager.makeEscapeRatio = function() {
        __BManager_makeEscapeRatio.call(this);
        this._escapeRatio += ($gameVariables.value(variableId) * 0.01);
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
}());
