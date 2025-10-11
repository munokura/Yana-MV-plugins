//
//  使用効果発動率 ver1.00
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
Imported['InvokeEffectRate'] = 1.00;
/*:
@plugindesc ver1.00/You can now set the activation rate for the effects of using items and skills.
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
<InvokeEffectRate:x%>
in the Note field of an item or skill will set the activation rate of all effects for that skill or item to x%.

<InvokeEffectRate:x,y,z%>
will set the activation rate of the effect with code x and data ID y to z%.

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
@plugindesc ver1.00/アイテムやスキルの使用効果に発動率を設定することができるようにします。
@author Yana

@help
使用方法
------------------------------------------------------
アイテムやスキルのメモ欄に
<使用効果発動率:x%>
または、
<InvokeEffectRate:x%>
と記述すると、そのスキルやアイテムの使用効果すべての発動率がx%に設定されます。

<使用効果発動率:x,y,z%>
または、
<InvokeEffectRate:x,y,z%>
と記述すると、コードx,データIDyのエフェクトの発動率がz%に設定されます。

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

	var parameters = PluginManager.parameters('InvokeEffectRate');

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.effectRates = function (item) {
		if (item._effectRates === undefined) {
			item._effectRates = {};
			var texts = item.note.split('\n');
			for (var i = 0, max = texts.length; i < max; i++) {
				var text = texts[i];
				if (text.match(/<(?:使用効果発動率|InvokeEffectRate):(\d+)[%％]>/)) {
					item._effectRates['all'] = Number(RegExp.$1);
				}
				if (text.match(/<(?:使用効果発動率|InvokeEffectRate):(\d+,\d+),(\d+)[%％]>/)) {
					item._effectRates[RegExp.$1] = Number(RegExp.$2);
				}
			}
		}
		return item._effectRates;
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GAction_applyItemEffect = Game_Action.prototype.applyItemEffect;
	Game_Action.prototype.applyItemEffect = function (target, effect) {
		var rates = DataManager.effectRates(this.item());
		var key = effect.code + ',' + effect.dataId;
		if (rates[key] && Math.random() > rates[key] * 0.01) { return }
		if (rates['all'] && Math.random() > rates['all'] * 0.01) { return }
		__GAction_applyItemEffect.call(this, target, effect);
	};

	////////////////////////////////////////////////////////////////////////////////////

}());