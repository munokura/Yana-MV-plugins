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
@plugindesc ver1.001/Adds the value of the specified variable to the escape rate.
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/Yana-MV-plugins ).
Original plugin by Yana.
-----
How to Use
--------------------------------------------------------------------

Specify a variable ID in the plugin parameters and assign a value to that variable using the variable operation.
The value of the variable % will be added to the escape rate.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.001:180409
Plugin parameter specifications updated to 1.5.0.
ver1.00:
Released

@param VariableID
@desc The ID of the variable to add.
@default 10
@type variable
*/


/*:ja
@plugindesc ver1.001/逃走率に指定した変数の値を加算します。
@author Yana

@help
使用方法
------------------------------------------------------

プラグインパラメータで変数IDを指定し、変数の操作でその変数に値を代入してください。
変数%の値が、逃走率に加算されます。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.001:180409
プラグインパラメータの仕様を1.5.0に更新。
ver1.00:
公開

@param VariableID
@desc 加算する変数のIDです。
@default 10
@type variable
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