//
//  エネミーレター消去 ver1.00
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
Imported['EraseLetter'] = 1.00;
/*:
@target MZ MV
@plugindesc ver1.00/Erase enemy letters (A, B, etc.).
@author Yana
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_VariableCommand.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/Yana-MV-plugins ).
Original plugin by Yana.
-----
Erase enemy letters (A, B, etc.).

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver. 1.00:
Released
*/


/*:ja
@target MZ MV
@plugindesc ver1.00/エネミーのレター(A､Bなど)を消去します。
@author Yana
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_VariableCommand.js
@license MIT License

@help
エネミーのレター(A､Bなど)を消去します。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開
*/

(() => {

    "use strict";

    Game_Enemy.prototype.name = function () {
        return this.originalName();//+ (this._plural ? this._letter : '');
    };

})();