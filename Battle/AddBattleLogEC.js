//
//  バトルログ表示制御文字 ver1.00
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
Imported['AddBattleLogEC'] = 1.00;
/*:
 * @plugindesc ver1.00/メッセージをバトルログに表示する制御文字を追加します。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * バトルログにテキストを追加する制御文字を追加します。
 * 
 * 追加制御文字:
 * _ABL
 * これをメッセージの最初に記述すると、メッセージは通常のウィンドウではなく、
 * バトルログに表示されます。
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
    
    var parameters = PluginManager.parameters('AddBattleLogEC');
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    var __GInterpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function(){
        var nextCommand = this._list[this._index+1];
        if (this.nextEventCode() === 401){
            var text = nextCommand.parameters[0];
            if (text.match(/^_ABL/gi)){
                while (this.nextEventCode() === 401){
                    this._index++;
                    text = this.currentCommand().parameters[0].replace(/_ABL/gi,'');
                    BattleManager._logWindow.addText(text);
                }
                return false;
            }
        }
        return __GInterpreter_command101.call(this);
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
}());