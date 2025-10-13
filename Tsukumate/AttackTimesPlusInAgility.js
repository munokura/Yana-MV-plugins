//
//  敏捷で攻撃回数追加 ver1.00
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
Imported['AttackTimesPlusInAgility'] = 1.00;
/*:
@target MZ MV
@plugindesc ver1.00/Adds the number of attacks based on agility value.
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Tsukumate/AttackTimesPlusInAgility.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/Yana-MV-plugins ).
Original plugin by Yana.
-----
Adds the number of attacks based on the agility value.

-----------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released

@param TimesPlusAgility
@text Agility value that increases the number of attacks
@desc This is the agility value that increases the number of attacks.
@default 100
@type number
*/


/*:ja
@target MZ MV
@plugindesc ver1.00/敏捷値で攻撃回数を追加します。
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Tsukumate/AttackTimesPlusInAgility.js
@license MIT License

@help
敏捷値で攻撃回数を追加します。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param TimesPlusAgility
@text 攻撃回数が増加する敏捷値
@desc 攻撃回数が増加する敏捷値です。
@default 100
@type number
*/

(() => {

    "use strict";

    ////////////////////////////////////////////////////////////////////////////////////

    const parameters = PluginManager.parameters('AttackTimesPlusInAgility');
    const timesPlusAgility = Number(parameters['TimesPlusAgility']);

    ////////////////////////////////////////////////////////////////////////////////////

    const __Game_BattlerBase_attackTimesAdd = Game_BattlerBase.prototype.attackTimesAdd;
    Game_BattlerBase.prototype.attackTimesAdd = function () {
        let count = __Game_BattlerBase_attackTimesAdd.call(this);
        if (!!timesPlusAgility) {
            count += Math.floor(this.agi / timesPlusAgility);
        }
        return count;
    };

})();