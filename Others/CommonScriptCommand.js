//
//  汎用スクリプトコマンド ver1.01
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
Imported['CommonScriptCommand'] = 1.01;
/*:
 * @plugindesc ver1.01/スクリプトコマンドに指定したテキストを追加します。
 * @author Yana
 *
 * @param ExScript1
 * @desc スクリプトコマンドの最初に追加するテキスト1です。
 * @default var v = $gameVariables._data;
 *
 * @param ExScript2
 * @desc スクリプトコマンドの最初に追加するテキスト2です。
 * @default var s = $gameSwitches._data;
 *
 * @param ExScript3
 * @desc スクリプトコマンドの最初に追加するテキスト3です。
 * @default
 *
 * @param ExScript4
 * @desc スクリプトコマンドの最初に追加するテキスト4です。
 * @default
 *
 * @param ExScript5
 * @desc スクリプトコマンドの最初に追加するテキスト5です。
 * @default
 *
 * @param ExScript6
 * @desc スクリプトコマンドの最初に追加するテキスト6です。
 * @default
 *
 * @param ExScript7
 * @desc スクリプトコマンドの最初に追加するテキスト7です。
 * @default
 *
 * @param ExScript8
 * @desc スクリプトコマンドの最初に追加するテキスト8です。
 * @default
 *
 * @param ExScript9
 * @desc スクリプトコマンドの最初に追加するテキスト9です。
 * @default
 *
 * @param ExScript10
 * @desc スクリプトコマンドの最初に追加するテキスト10です。
 * @default
 *
 * @help------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * プラグインを導入し、パラメータを設定することで動作します。
 *
 * このプラグインは、イベントコマンドのスクリプトにおいて、パラメータで設定した
 * テキストを記述したテキストの上に追加します。
 *
 * 例えば、ExScript1に
 * var v = $gameVariables._data;
 * を記述した場合、スクリプト内でv[x]と記述することで、x番の変数にアクセスが可能になります。
 * v[10] = 1000;
 * と記述すると、変数10番の値が1000に設定されます。
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
 * 同じスクリプトコマンドが呼び出された際の処理を修正
 * ver1.00:
 * 公開
 */

(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('CommonScriptCommand');
    var exCommand = '';

    for (var i=1;i<=10;i++) {
        if (parameters['ExScript' + i]) exCommand += parameters['ExScript' + i] + '\n';
    }

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_command355 = Game_Interpreter.prototype.command355;
    Game_Interpreter.prototype.command355 = function() {
        var command = this.currentCommand();
        command.parameters[0] = exCommand + this.currentCommand().parameters[0];
        var result = __GInterpreter_command355.call(this);
        var texts = command.parameters[0].split('\n');
        command.parameters[0] = texts[texts.length-1];
        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());