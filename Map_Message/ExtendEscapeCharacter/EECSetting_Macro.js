//
//  制御文字拡張マクロ設定 ver1.01
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
Imported['EECSetting_Macro'] = 1.00;


/*:
 * @plugindesc ver1.00/制御文字拡張用のマクロを定義するためのプラグインです。
 * @author Yana
 *
 * @param Macro0
 * @desc 0番のマクロです。
 * @default
 *
 * @param Macro1
 * @desc 1番のマクロです。
 * @default
 *
 * @param Macro2
 * @desc 2番のマクロです。
 * @default
 *
 * @param Macro3
 * @desc 3番のマクロです。
 * @default
 *
 * @param Macro4
 * @desc 4番のマクロです。
 * @default
 *
 * @param Macro5
 * @desc 5番のマクロです。
 * @default
 *
 * @param Macro6
 * @desc 6番のマクロです。
 * @default
 *
 * @param Macro7
 * @desc 7番のマクロです。
 * @default
 *
 * @param Macro8
 * @desc 8番のマクロです。
 * @default
 *
 * @param Macro9
 * @desc 9番のマクロです。
 * @default
 *
 * @param Macro10
 * @desc 10番のマクロです。
 * @default
 *
 * @param Macro11
 * @desc 11番のマクロです。
 * @default
 *
 * @param Macro12
 * @desc 12番のマクロです。
 * @default
 *
 * @param Macro13
 * @desc 13番のマクロです。
 * @default
 *
 * @param Macro14
 * @desc 14番のマクロです。
 * @default
 *
 * @param Macro15
 * @desc 15番のマクロです。
 * @default
 *
 * @param Macro16
 * @desc 16番のマクロです。
 * @default
 *
 * @param Macro17
 * @desc 17番のマクロです。
 * @default
 *
 * @param Macro18
 * @desc 18番のマクロです。
 * @default
 *
 * @param Macro19
 * @desc 19番のマクロです。
 * @default
 *
 * @param Macro20
 * @desc 20番のマクロです。
 * @default
 *
 * @param Macro21
 * @desc 21番のマクロです。
 * @default
 *
 * @param Macro22
 * @desc 22番のマクロです。
 * @default
 *
 * @param Macro23
 * @desc 23番のマクロです。
 * @default
 *
 * @param Macro24
 * @desc 24番のマクロです。
 * @default
 *
 * @param Macro25
 * @desc 25番のマクロです。
 * @default
 *
 * @param Macro26
 * @desc 26番のマクロです。
 * @default
 *
 * @param Macro27
 * @desc 27番のマクロです。
 * @default
 *
 * @param Macro28
 * @desc 28番のマクロです。
 * @default
 *
 * @param Macro29
 * @desc 29番のマクロです。
 * @default
 *
 * @param Macro30
 * @desc 30番のマクロです。
 * @default
 *
 * @param Macro31
 * @desc 31番のマクロです。
 * @default
 *
 * @param Macro32
 * @desc 32番のマクロです。
 * @default
 *
 * @param Macro33
 * @desc 33番のマクロです。
 * @default
 *
 * @param Macro34
 * @desc 34番のマクロです。
 * @default
 *
 * @param Macro35
 * @desc 35番のマクロです。
 * @default
 *
 * @param Macro36
 * @desc 36番のマクロです。
 * @default
 *
 * @param Macro37
 * @desc 37番のマクロです。
 * @default
 *
 * @param Macro38
 * @desc 38番のマクロです。
 * @default
 *
 * @param Macro39
 * @desc 39番のマクロです。
 * @default
 *
 * @param Macro40
 * @desc 40番のマクロです。
 * @default
 *
 * @param Macro41
 * @desc 41番のマクロです。
 * @default
 *
 * @param Macro42
 * @desc 42番のマクロです。
 * @default
 *
 * @param Macro43
 * @desc 43番のマクロです。
 * @default
 *
 * @param Macro44
 * @desc 44番のマクロです。
 * @default
 *
 * @param Macro45
 * @desc 45番のマクロです。
 * @default
 *
 * @param Macro46
 * @desc 46番のマクロです。
 * @default
 *
 * @param Macro47
 * @desc 47番のマクロです。
 * @default
 *
 * @param Macro48
 * @desc 48番のマクロです。
 * @default
 *
 * @param Macro49
 * @desc 49番のマクロです。
 * @default
 *
 * @param Macro50
 * @desc 50番のマクロです。
 * @default
 *
 * @help------------------------------------------------------
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

    var parameters = PluginManager.parameters('EECSetting_Macro');

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Temp.prototype.eecMacro = function (index) {
        if (this._eecMacro){ return this._eecMacro[index] }
        this._eecMacro = [];
        for (var i=0;i<51;i++) { this._eecMacro[i] = parameters['Macro'+i] }
        return this._eecMacro[index];
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());