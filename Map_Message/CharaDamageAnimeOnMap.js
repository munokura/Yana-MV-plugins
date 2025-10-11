//
//  マップでダメージ時キャラクターにアニメーション ver1.00
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
Imported['CharaDamageAnimeOnMap'] = 1.00;
/*:
@plugindesc ver1.00/Changed the flash animation that appears when a character receives slip damage on a map.
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
Changed the flash animation that appears when a character receives slip damage on a map.

It will work once installed.
------------------------------------------------------
Terms of Use
--------------------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
--------------------------------------------------------------------
Update History:
ver. 1.00:
Released

@param DamageAnimeID
@desc The ID of the animation to display when damaged.
@default 59

@param DamageSE
@desc This is the sound effect that plays when damage is received.
@default Damage1
@type file
@require 1
@dir audio/se/

@param DamageSESetting
@desc This is the setting for the sound effect that plays when damage occurs. Set the volume, pitch, and pan in that order.
@default 90,100,0
*/


/*:ja
@plugindesc ver1.00/マップでスリップダメージなどを受けた時のフラッシュをキャラクターにアニメ再生がされるように変更します。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
使用方法
------------------------------------------------------
マップでスリップダメージなどを受けた時のフラッシュをキャラクターにアニメ再生がされるように変更します。

導入すれば動作します。
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param DamageAnimeID
@desc ダメージ時に表示するアニメーションのIDです。
@default 59

@param DamageSE
@desc ダメージ時に再生するSEです。
@default Damage1
@type file
@require 1
@dir audio/se/

@param DamageSESetting
@desc ダメージ時に再生するSEの設定です。 ボリューム、ピッチ、パンの順で設定してください。
@default 90,100,0
*/

(function () {

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('CharaDamageAnimeOnMap');
    var damageAnimeId = Number(parameters['DamageAnimeID']);
    var damageSE = parameters['DamageSE'];
    var damageSESetting = parameters['DamageSESetting'].split(',').map(function (n) { return Number(n) });

    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義
    Game_Actor.prototype.performMapDamage = function () {
        if (!$gameParty.inBattle()) {
            if (!$gameParty._playedDamageSe) {
                var volume = damageSESetting[0];
                var pitch = damageSESetting[1];
                var pan = damageSESetting[2];
                var se = { name: damageSE, volume: volume, pitch: pitch, pan: pan }
                AudioManager.playSe(se);
                $gameParty._playedDamageSe = true;
            }
            if (this.index() < $gameParty.maxBattleMembers()) {
                if ($dataSystem.optFollowers && this.index() > 0) {
                    var character = $gamePlayer.followers()._data[this.index() - 1];
                    character.requestAnimation(damageAnimeId);
                } else {
                    $gamePlayer.requestAnimation(damageAnimeId);
                }
            }
        }
    };

    var __GParty_onPlayerWalk = Game_Party.prototype.onPlayerWalk;
    Game_Party.prototype.onPlayerWalk = function () {
        __GParty_onPlayerWalk.call(this);
        this._playedDamageSe = false;
    };

}());