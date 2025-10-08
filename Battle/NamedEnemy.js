//
// 二つ名ステートエネミー ver1.00
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
Imported['NamedEnemy'] = 1.00;
/*:
@plugindesc ver1.00/Enemies with nickname states can be made to appear randomly.
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
------------------------------------------------------
Write the following in the enemy's Note:
<Nickname:id,rate%[,Ix:drop%...]>

If the enemy's Note contains the following:
<Nickname:21,100%,I1:100%,A1:100%,W1:100%>

There is a 100% chance that an enemy with state number 21 will appear.

The enemy's state name will be added before its regular name, and when defeated,
they will have a 100% chance of dropping item number 1 (I1), weapon number 1 (W1), and weapon number 1 (A1).

If you write
<ExpRate: x%>
in a state's memo, enemies with that state as a nickname will receive x% of the experience.

Similarly, if you write
<GoldRate: x%>
in a state's memo, enemies with that state as a nickname will receive x% of the gold.

*Nicknames are processed in order from top to bottom of the memo.
------------------------------------------------------
Terms of Use
-------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php

@param AddNameNum
@desc This sets how many nickname states can be added at once. Because it uses eval, you can use $gameVariables and calculation expressions.
@default 0

@param AddNameRate
@desc This is the ID of the variable that determines the correction value for the nickname grant rate. The numerical value % of the variable specified here will be multiplied by the grant rate for each nickname.
@default 0

@param AddNameAnime
@desc The ID of the animation that will be played for enemies with nicknames.
@default 0
*/


/*:ja
@plugindesc ver1.00/二つ名ステートの付いたエネミーをランダムで出現させることができます。
@author Yana

@help
使い方
------------------------------------------------------
エネミーのメモ欄に
<二つ名:id,rate%[,Ix:drop%…]>
または、
<Nickname:id,rate%[,Ix:drop%…]>
と記述します。

エネミーのメモに
<二つ名:21,100%,I1:100%,A1:100%,W1:100%>
と記述されていた場合、
100%の確率で21番のステートが付与されたエネミーが出現します。
エネミーはステートの名前が通常の名前の前に追加され、このエネミーを倒したとき、
1番のアイテム(I1)、1番の武器(W1)、1番の武器(A1)を100%の確率でドロップします。

ステートのメモに
<経験値獲得率:x%>
または、
<ExpRate:x%>
と記述すると、そのステートが二つ名ステートとして付与されているエネミーの経験値がx%になります。

同じように、
<ゴールド獲得率:x%>
または、
<GoldRate:x%>
と記述すると、そのステ―トが二つ名ステートとして付与されているエネミーのゴールドがx%になります。

※二つ名はメモの上から順に処理されます。
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php

@param AddNameNum
@desc 一度に二つ名ステートをいくつつけられるかの設定です。evalを使用している為、$gameVariablesや計算式が使用できます。
@default 0

@param AddNameRate
@desc 二つ名付与率の補正値を決める変数のIDです。ここで指定した変数の数値%が、各二つ名の付与率に乗算されます。
@default 0

@param AddNameAnime
@desc 二つ名付与されたエネミーに再生されるアニメのIDです。
@default 0
*/

(function () {

    var parameters = PluginManager.parameters('NamedEnemy');
    var addNameNum = parameters['AddNameNum'];
    var addNameRate = parameters['AddNameRate'];
    var addNameAnime = Number(parameters['AddNameAnime']) || 0;

    var __GEnemy_setup = Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup = function (enemyId, x, y) {
        this._nicknameStateId = [];
        this._nicknameDrop = [];
        __GEnemy_setup.call(this, enemyId, x, y);
        this.initNickname();
        this.recoverAll();
    };

    Game_Enemy.prototype.initNickname = function () {
        var texts = this.enemy().note.split('\n');
        var num = 0;
        var rate = 1.0;
        if (addNameNum) num = eval(addNameNum);
        if (addNameRate) rate = $gameVariables.value(addNameRate) * 0.01 + 1.0;
        var n = 0;
        for (var i = 0, max = texts.length; i < max; i++) {
            if (texts[i].match(/<(?:二つ名|Nickname)[:：](\d+),(\d+)[%％]?,?(.+)?>/)) {
                if (Math.random() <= (Number(RegExp.$2) * 0.01) * rate) {
                    this._nicknameStateId.push(parseInt(RegExp.$1, 10));
                    this._nicknameDrop.concat(RegExp.$3.split(','));
                    n++;
                    if (num && num <= n) break;
                }
            }
        }
        if (n > 0 && addNameAnime) this.startAnimation(addNameAnime, false, 30);
    };

    var __GEnemy_traitObjects = Game_Enemy.prototype.traitObjects;
    Game_Enemy.prototype.traitObjects = function () {
        var objects = __GEnemy_traitObjects.call(this);
        if (this._nicknameStateId !== []) {
            this._nicknameStateId.forEach(function (stateId) {
                objects.push($dataStates[stateId]);
            }.bind(this));
        }
        return objects;
    };

    var __GEnemy_name = Game_Enemy.prototype.name;
    Game_Enemy.prototype.name = function () {
        var name = __GEnemy_name.call(this);
        if (this._nicknameStateId !== []) {
            this._nicknameStateId.forEach(function (stateId) {
                name = $dataStates[stateId].name + name;
            }.bind(this));
        }
        return name;
    };

    var __GEnemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
    Game_Enemy.prototype.makeDropItems = function () {
        var dropItems = __GEnemy_makeDropItems.call(this);
        this._nicknameDrop.forEach(function (drop) {
            if (drop) {
                var di = drop.split(':');
                di[1] = di[1].replace(/[%％]/, '');
                if (Math.random() <= Number(di[1]) * this.dropItemRate() * 0.01) {
                    var item = null;
                    var type = di[0].slice(0, 1);
                    var id = parseInt(di[0].slice(1), 10);
                    if (type === 'I') item = $dataItems[id];
                    if (type === 'W') item = $dataWeapons[id];
                    if (type === 'A') item = $dataArmors[id];
                    dropItems.push(item);
                }
            }
        }.bind(this));
        return dropItems;
    };

    var __GEnemy_exp = Game_Enemy.prototype.exp;
    Game_Enemy.prototype.exp = function () {
        var exp = __GEnemy_exp.call(this);
        var exr = 1.0;
        if (this._nicknameStateId !== []) {
            this._nicknameStateId.forEach(function (stateId) {
                var state = $dataStates[stateId];
                if (state.meta['経験値獲得率']) exr *= Number(state.meta['経験値獲得率'].replace(/[%％]/, '')) * 0.01;
                if (state.meta['ExpRate']) exr *= Number(state.meta['ExpRate'].replace(/[%％]/, '')) * 0.01;
            }.bind(this));
        }
        exp *= exr;
        return exp;
    };

    var __GEnemy_gold = Game_Enemy.prototype.gold;
    Game_Enemy.prototype.gold = function () {
        var gold = __GEnemy_gold.call(this);
        var gdr = 1.0;
        if (this._nicknameStateId !== []) {
            this._nicknameStateId.forEach(function (stateId) {
                var state = $dataStates[stateId];
                if (state.meta['ゴールド獲得率']) gdr *= Number(state.meta['ゴールド獲得率'].replace(/[%％]/, '')) * 0.01;
                if (state.meta['GoldRate']) gdr *= Number(state.meta['GoldRate'].replace(/[%％]/, '')) * 0.01;
            }.bind(this));
        }
        gold *= gdr;
        return gold;
    };

}());