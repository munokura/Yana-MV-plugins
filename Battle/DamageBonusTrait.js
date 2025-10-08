//
//  ダメージボーナス特徴 ver1.00
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
Imported['DamageBonusTrait'] = 1.00;
/*:
@plugindesc ver1.00/Allows you to set Traits that give damage bonuses.
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
Entering
<DamageBonus:xx,yyy>
in the Note field of an object with the Traits will add the damage calculated by evaluating yyy with eval
to the damage of the skill or item specified by xx.
Specify xx as S+ID (e.g., S1) for skills, or I+ID (e.g., I1) for items.
S0 applies to all skills, I0 applies to all items, and 0 applies to all actions.
Also, specifying anything other than this will target skills or items containing
<specified text>.

------------------------------------------------------
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
@plugindesc ver1.00/ダメージボーナスを与える特徴を設定できるようにします。
@author Yana

@help
使用方法
------------------------------------------------------
特徴を持ったオブジェクトのメモ欄に
<ダメージボーナス:xx,yyy>
または、
<DamageBonus:xx,yyy>
と記述すると、xxで指定されたスキルまたはアイテムのダメージにyyyをevalで評価して
算出されたダメージが加算されます。
xxはスキルならS1などS+ID、アイテムならI1などI+IDで指定してください。
S0はスキルすべて、I0はアイテムすべて、0はすべての行動が対象になります。
また、それ以外を指定すると、
<指定したテキスト>
が含まれたスキルやアイテムを対象にします。

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

	var parameters = PluginManager.parameters('DamageBonusTrait');

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.damageBonus = function (item) {
		if (item._damageBonus === undefined) {
			item._damageBonus = {};
			var texts = item.note.split('\n');
			for (var i = 0, max = texts.length; i < max; i++) {
				var text = texts[i];
				if (text.match(/<(?:ダメージボーナス|DamageBonus):(.+),(.+)>/)) {
					item._damageBonus[RegExp.$1] = RegExp.$2;
				}
			}
		}
		return item._damageBonus;
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GAction_evalDamageFormula = Game_Action.prototype.evalDamageFormula;
	Game_Action.prototype.evalDamageFormula = function (target) {
		var db = this.subject().damageBonus(this.item(), target);
		var damage = __GAction_evalDamageFormula.call(this, target);
		return damage + db;
	};


	////////////////////////////////////////////////////////////////////////////////////

	Game_Battler.prototype.damageBonus = function (item, target) {
		return this.traitObjects().reduce(function (r, to) {
			var db = DataManager.damageBonus(to);
			var key = DataManager.isItem(item) ? 'I' + item.id : 'S' + item.id;
			var a = this;
			var b = target;
			var v = $gameVariables._data;
			for (i in db) {
				if (i === key) { r += eval(db[i]); continue }
				var regExp = RegExp('<' + i + '>');
				if (item.note.match(regExp)) { r += eval(db[i]) }
			}
			return r;
		}.bind(this), 0);
	};

	////////////////////////////////////////////////////////////////////////////////////
}());