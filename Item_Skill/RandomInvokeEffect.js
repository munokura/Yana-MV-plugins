//
//  ランダム発動エフェクト ver1.00
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
Imported['RandomInvokeEffect'] = 1.00;
/*:
@plugindesc ver1.00/You can now set items and skills whose effects are randomly activated from a specified number.
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
By entering
<InvokeEffectRandom:x>
in the Note field of a skill or item, x active effects from the skill or item's active effects will be randomly activated.

Also, by entering
<RandomInvokeCount:xx+y>
in the Note field of an object with a trait, you can increase the random activation count of the skill specified by xx by y.

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
@plugindesc ver1.00/使用効果が指定した数からランダムで発動するアイテムやスキルが設定できるようにします。
@author Yana

@help
使用方法
------------------------------------------------------
スキルやアイテムのメモ欄に
<ランダム効果発動:x>
または、
<InvokeEffectRandom:x>
と記述すると、そのスキルやアイテムに設定された使用効果の中から、有効なものが
ランダムでx個発動するようになります。

また、特徴を持つオブジェクトのメモ欄に
<ランダム発動数操作:xx+y>
または
<RandomInvokeCount:xx+y>
と記述することで、xxで指定したスキルのランダム発動数をy個増加させることができます。

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

	var parameters = PluginManager.parameters('RandomInvokeEffect');

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.randomEffectCount = function (item) {
		if (item._randoEffectCount === undefined) {
			item._randomEffectCount = null;
			if (item.meta['ランダム効果発動']) { item._randomEffectCount = Number(item.meta['ランダム効果発動']) }
			if (item.meta['InvokeEffectRandom']) { item._randomEffectCount = Number(item.meta['InvokeEffectRandom']) }
		}
		return item._randomEffectCount;
	};

	DataManager.randomEffectPlusCount = function (item) {
		if (item._randomEffectPlusCount === undefined) {
			item._randomEffectPlusCount = {};
			var texts = item.note.split('\n');
			for (var i = 0, max = texts.length; i < max; i++) {
				var text = texts[i];
				if (text.match(/<(?:ランダム発動数操作|RandomInvokeCount):([IS]\d+)([+-]\d+)>/)) {
					item._randomEffectPlusCount[RegExp.$1] = Number(RegExp.$2);
				}
			}
		}
		return item._randomEffectPlusCount;
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GAction_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function (target) {
		this.setInvokeEffects(target);
		__GAction_apply.call(this, target);
		this._enableEffectsList = null;
	};

	var __GAction_applyItemEffect = Game_Action.prototype.applyItemEffect;
	Game_Action.prototype.applyItemEffect = function (target, effect) {
		if (!this.isEnableEffects(effect)) { return }
		__GAction_applyItemEffect.call(this, target, effect);
	};

	Game_Action.prototype.setInvokeEffects = function (target) {
		this._enableEffectsList = null;
		var randomEffectCount = DataManager.randomEffectCount(this.item());
		randomEffectCount += this.subject().plusEffectCount(this.item());
		if (randomEffectCount) {
			this._enableEffectsList = {};
			var effects = this.item().effects;
			var array = [];
			for (var i = 0, max = effects.length; i < max; i++) {
				var effect = effects[i];
				var key = effect.code + ',' + effect.dataId + ',' + effect.value1 + ',' + effect.value2;
				if (this.testItemEffect(target, effect)) { array.push(key) }
			}
			for (var i = 0, max = array.length, count = 0; i < max; i++) {
				if (count >= randomEffectCount) { break }
				var r = Math.floor(Math.random() * array.length);
				if (array[r]) {
					this._enableEffectsList[array[r]] = true;
					array.splice(r, 1);
					count++;
				}
			}
		}
	};

	Game_Action.prototype.isEnableEffects = function (effect) {
		if (!this._enableEffectsList) { return true }
		var key = effect.code + ',' + effect.dataId + ',' + effect.value1 + ',' + effect.value2;
		return this._enableEffectsList[key];
	};

	////////////////////////////////////////////////////////////////////////////////////

	Game_Battler.prototype.plusEffectCount = function (item) {
		var letter = DataManager.isItem(item) ? 'I' : 'S';
		var key = letter + item.id;
		var r = this.traitObjects().reduce(function (r, to) {
			var count = DataManager.randomEffectPlusCount(to);
			if (count[key]) { r += count[key] }
			return r;
		}.bind(this), 0);
		return r;
	};

	////////////////////////////////////////////////////////////////////////////////////
}());