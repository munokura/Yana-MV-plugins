//
//  足踏み速度変更 ver1.00
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
Imported['StepSpeed'] = 1.00;
/*:
@target MZ MV
@plugindesc ver1.00/Changes the stepping speed of the event.
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Map_Message/StepSpeed.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/Yana-MV-plugins ).
Original plugin by Yana.
-----
------------------------------------------------------
How to Use
------------------------------------------------------
<StepSpeed:x>
in the event notes will change the stepping speed to 1/x.
x can be a decimal; setting it to 1 or less will increase the stepping speed.

-----------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released
*/


/*:ja
@target MZ MV
@plugindesc ver1.00/イベントの足踏み速度を変更します。
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Map_Message/StepSpeed.js
@license MIT License

@help
------------------------------------------------------
使用方法
------------------------------------------------------
イベントのメモに
<足踏み速度:x>
または、
<StepSpeed:x>
と記述すると、足踏み速度を1/xに変更します。
xには小数が指定でき、1以下に設定すると、足踏み速度が速くなります。

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

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('StepSpeed');

    ////////////////////////////////////////////////////////////////////////////////////

    var __GCBase_animationWait = Game_CharacterBase.prototype.animationWait;
    Game_CharacterBase.prototype.animationWait = function () {
        return __GCBase_animationWait.call(this) * this.stepSpeed();
    };

    Game_CharacterBase.prototype.stepSpeed = function () {
        return 1.0;
    }

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Event.prototype.stepSpeed = function () {
        var speed = 1.0;
        if (this.event().meta['足踏み速度']) { speed = Number(this.event().meta['足踏み速度']) }
        if (this.event().meta['StepSpeed']) { speed = Number(this.event().meta['StepSpeed']) }
        return speed;
    };
}());