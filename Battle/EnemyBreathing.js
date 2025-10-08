//
//  エネミー息遣い ver1.01
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
Imported['EnemyBreathing'] = 1.01;
/*:
@plugindesc ver1.01/Stretch enemies upwards, horizontally, or flip them.
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
------------------------------------------------------
How to Use
------------------------------------------------------
Basically, it works just by installing it.

*Enemies Note field*
<反転なし>
- The enemy will not be inverted.
<サイズ変更なし>
- The enemy will not have random size adjustments applied.
<サイズ補正+○>
- The enemy's initial size will be adjusted by +○%.
<動作なし>
- The enemy will not take a breath.
------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released

@param Breath Frequency
@desc The frequency of breaths. The rhythm sequence advances by one for each set frame.
@default 10

@param Breath Rhythem
@desc This is the rhythmic sequence of breaths. It contracts (expands) by the value of xExpansionX(Y).
@default 0,0,1,2,3,4,5,5,4,3,2,1

@param ExpansionX
@desc The shrink value in the X direction.
@default 0.005

@param ExpansionY
@desc The stretch value in the Y direction.
@default 0.005

@param Enemy Size
@desc Enemy random size correction. +- This value % will randomly change the initial size.
@default 10
*/


/*:ja
@plugindesc ver1.01/エネミーを上に伸ばしたり、横に伸ばしたり、反転させたりします。
@author Yana

@help
------------------------------------------------------
使い方
------------------------------------------------------
基本的に導入するだけで動作します。

※メモによる設定※
エネミーのメモ欄に、<反転なし>という記述がある場合、そのエネミーは反転しません。
エネミーのメモ欄に、<サイズ変更なし>という記述がある場合、そのエネミーはランダムなサイズ補正が掛かりません。
エネミーのメモ欄に、<サイズ補正+○>という記述がある場合、そのエネミーの初期サイズに+○%のサイズ補正がかかります。
エネミーのメモ欄に、<動作なし>という記述がある場合、そのエネミーは息継ぎ動作を行いません。
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param Breath Frequency
@desc 息継ぎの頻度です。 設定フレーム毎にリズム配列を1つ進めます。
@default 10

@param Breath Rhythem
@desc 息継ぎのリズムの配列です。 数値xExpansionX(Y)の値だけ縮み(伸び)ます。
@default 0,0,1,2,3,4,5,5,4,3,2,1

@param ExpansionX
@desc X方向の縮む値です。
@default 0.005

@param ExpansionY
@desc Y方向の伸びる値です。
@default 0.005

@param Enemy Size
@desc エネミーのランダムサイズ補正です。 +-この値%分だけ、初期サイズがランダムに変化します。
@default 10
*/

(function () {

    var parameters = PluginManager.parameters('EnemyBreathing');
    var breathFrequency = Number(parameters['Breath Frequency'] || 10);
    var breathRhythem = String(parameters['Breath Rhythem'] || '0,0,1,2,3,4,5,5,4,3,2,1').split(',');
    var expansionX = Number(parameters['ExpansionX'] || 0.005);
    var expansionY = Number(parameters['ExpansionY'] || 0.005);
    var enemySize = Number(parameters['Enemy Size'] || 10);

    var _eBreath_SBattler_initMembers = Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers = function () {
        _eBreath_SBattler_initMembers.call(this);
        this._settedBreathMembers = false;
    };

    Sprite_Battler.prototype.setBreathMembers = function () {
        this._breathFrame = Math.randomInt(100);
        this._zX = 1.0;
        this._zY = 1.0;
        this._rX = 1.0;
        if (!this.note().match(/<サイズ変更なし>/)) {
            var sizeTune = this.note().match(/<サイズ補正([+-]\d+)%>/) ? RegExp.$1 : 0;
            this._zX = 1.0 + (Math.randomInt(enemySize * 2) - enemySize + Number(sizeTune)) * 0.01;
            this._zY = this._zX;
        }
        if (!this.note().match(/<反転なし>/) && !$gameSystem.isSideView()) {
            this._rX = Math.randomInt(2) === 0 ? -this._rX : 1.0;
        }
        this._settedBreathMembers = true;
    };

    Sprite_Battler.prototype.note = function () {
        if (this._battler && this._battler.isEnemy()) { return this._battler.enemy().note }
        return '';
    };

    var _eBreath_SBattler_updatePosition = Sprite_Battler.prototype.updatePosition;
    Sprite_Battler.prototype.updatePosition = function () {
        _eBreath_SBattler_updatePosition.call(this);

        if (this._battler && this._battler.isEnemy()) {
            if (!this._settedBreathMembers) { this.setBreathMembers() }
            if (!this.note().match(/<動作なし>/)) {
                var f = Math.floor(Graphics.frameCount / breathFrequency) + this._breathFrame;
                var r = breathRhythem;
                var sX = this._zX - (expansionX * Number(r[f % r.length]));
                var sY = this._zY + (expansionY * Number(r[f % r.length]));
                this.scale = new Point(sX * this._rX, sY);
            }
        }
    };

}());