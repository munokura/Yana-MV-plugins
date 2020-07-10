//
//  エネミー息遣い ver1.001
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
Imported['EnemyBreathing'] = 1.001;

/*:
 * @plugindesc ver1.001/エネミーを上に伸ばしたり、横に伸ばしたり、反転させたりします。
 * @author Yana
 * 
 * @param Breath Frequency
 * @desc 息継ぎの頻度です。
 * 設定フレーム毎にリズム配列を1つ進めます。
 * @type number
 * @default 10
 * 
 * @param Breath Rhythem
 * @desc 息継ぎのリズムの配列です。
 * 数値xExpansionX(Y)の値だけ縮み(伸び)ます。
 * @default 0,0,1,2,3,4,5,5,4,3,2,1
 * 
 * @param ExpansionX
 * @desc X方向の縮む値です。
 * @default 0.005
 * 
 * @param ExpansionX
 * @desc Y方向の伸びる値です。
 * @default 0.005
 * 
 * @param Enemy Size
 * @desc エネミーのランダムサイズ補正です。
 * +-この値%分だけ、初期サイズがランダムに変化します。
 * @type number
 * @default 10
 * 
 * @help プラグインコマンドはありません。
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
 * ver1.001:180409
 * プラグインパラメータの仕様を1.5.0に更新。
 * ver1.00:
 * 公開
 */

(function(){
    
    var parameters = PluginManager.parameters('EnemyBreathing');
    var breathFrequency = Number(parameters['Breath Frequency'] || 10);
    var breathRhythem = String(parameters['Breath Rhythem'] || '0,0,1,2,3,4,5,5,4,3,2,1').split(',');
    var expansionX = Number(parameters['ExpansionX'] || 0.005);
    var expansionY = Number(parameters['ExpansionY'] || 0.005);
    var enemySize = Number(parameters['Enemy Size'] || 10);
    
    var _eBreath_SBattler_initMembers = Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers = function(){
        _eBreath_SBattler_initMembers.call(this);
        this._settedBreathMembers = false;
    };
    
    Sprite_Battler.prototype.setBreathMembers = function(){
        this._breathFrame = Math.randomInt(100);
        this._zX = 1.0;
        this._zY = 1.0;
        this._rX = 1.0;
        if (!this.note().match(/<サイズ変更なし>/)){
            var sizeTune = this.note().match(/<サイズ補正([+-]\d+)%>/) ? RegExp.$1 : 0;
            this._zX = 1.0 + (Math.randomInt(enemySize * 2) - enemySize + Number(sizeTune)) * 0.01;
            this._zY = this._zX;
        }
        if (!this.note().match(/<反転なし>/) && !$gameSystem.isSideView()){
            this._rX = Math.randomInt(2) === 0 ? -this._rX : 1.0;
        }
        this._settedBreathMembers = true;
    };
    
    Sprite_Battler.prototype.note = function(){
        if (this._battler && this._battler.isEnemy()){ return this._battler.enemy().note }
        return '';
    };
    
    var _eBreath_SBattler_updatePosition = Sprite_Battler.prototype.updatePosition;
    Sprite_Battler.prototype.updatePosition = function(){
        _eBreath_SBattler_updatePosition.call(this);

        if (this._battler && this._battler.isEnemy()){
            if (!this._settedBreathMembers){ this.setBreathMembers() }
            if (!this.note().match(/<動作なし>/)){
                var f = Math.floor(Graphics.frameCount/breathFrequency) + this._breathFrame;
                var r = breathRhythem;
                var sX = this._zX - (expansionX * Number(r[f % r.length]));
                var sY = this._zY + (expansionY * Number(r[f % r.length]));
                this.scale = new Point(sX * this._rX, sY);
            }
        }
    };
    
}());
