//
//  マルチアタック特徴 ver1.00
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
Imported['MultiAttackTrait'] = 1.00;
/*:
@plugindesc ver1.00/You can now set a Traits that increases the number of attacks with a certain probability.
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
<MultiAttack: x,y%>
in the Note field of an object with this Traits.
There is a y% chance that the number of attacks will increase by x.
Each Traits is evaluated independently.

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
@plugindesc ver1.00/確率で攻撃回数が増加する特徴を設定できるようになります。
@author Yana

@help
使用方法
------------------------------------------------------
特徴を持ったオブジェクトのメモ欄に
<攻撃回数追加:x,y%>
または、
<MultiAttack:x,y%>
と記述してください。
y%の確率でx回攻撃回数が増加します。
それぞれの特徴は単独で判定が行われます。

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

	var parameters = PluginManager.parameters('MultiAttackTrait');

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.multiAttack = function (item) {
		if (item._multiAttack === undefined) {
			item._multiAttack = [];
			var texts = item.note.split('\n');
			for (var i = 0, max = texts.length; i < max; i++) {
				var text = texts[i];
				if (text.match(/<(?:攻撃回数追加|MultiAttack):(\d+),(\d+)[%％]?>/)) {
					item._multiAttack.push([Number(RegExp.$1), Number(RegExp.$2)]);
				}
			}
		}
		return item._multiAttack;
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GBBase_attackTimesAdd = Game_BattlerBase.prototype.attackTimesAdd;
	Game_BattlerBase.prototype.attackTimesAdd = function () {
		return this.traitObjects().reduce(function (r, to) {
			var ma = DataManager.multiAttack(to);
			for (var i = 0, max = ma.length; i < max; i++) {
				if (Math.random() < ma[i][1] * 0.01) { r += ma[i][0] }
			}
			return r;
		}.bind(this), __GBBase_attackTimesAdd.call(this));
	};

	////////////////////////////////////////////////////////////////////////////////////

}());