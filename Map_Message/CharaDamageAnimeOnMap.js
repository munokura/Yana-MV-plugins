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
 * @plugindesc ver1.00/マップでスリップダメージなどを受けた時のフラッシュをキャラクターがアニメをするように変更します。
 * @author Yana
 *
 * @param DamageAnimeID
 * @desc ダメージ時に表示するアニメーションのIDです。
 * @default 59
 *
 * @param DamageSE
 * @desc ダメージ時に再生するSEです。
 * @default Damage1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param DamageSESetting
 * @desc ダメージ時に再生するSEの設定です。
 * ボリューム、ピッチ、パンの順で設定してください。
 * @default 90,100,0
 *
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * 導入すれば動作します。
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

    var parameters = PluginManager.parameters('CharaDamageAnimeOnMap');
    var damageAnimeId = Number(parameters['DamageAnimeID']);
    var damageSE = parameters['DamageSE'];
    var damageSESetting = parameters['DamageSESetting'].split(',').map(function(n){ return Number(n) });

    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義
    Game_Actor.prototype.performMapDamage = function() {
        if (!$gameParty.inBattle()) {
            if (!$gameParty._playedDamageSe){
                var volume = damageSESetting[0];
                var pitch = damageSESetting[1];
                var pan = damageSESetting[2];
                var se = {name:damageSE,volume:volume,pitch:pitch,pan:pan }
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
    Game_Party.prototype.onPlayerWalk = function() {
        __GParty_onPlayerWalk.call(this);
        this._playedDamageSe = false;
    };

}());