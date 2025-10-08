//
//  有効度上限特徴 ver1.00
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
Imported['EfficacyLimitTrait'] = 1.00;
/*:
@plugindesc ver1.00/It will be possible to set Traits that set upper limits on states, Elements, and debuff effectiveness.
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
There are no plugin commands.
------------------------------------------------------
------------------------------------------------------
How to Set
------------------------------------------------------
If you enter
<属性有効度上限:x,y%>
in the Note field of an object with Traits such as an actor, class, weapon, armor, enemy, or state, the Elements effectiveness limit for ID x will be y%. If you set x to -1,
the effectiveness limit for all Elements will be set to y%.

<弱体有効度上限:x,y%>
If you enter x to -1,
the effectiveness limit for all debuffs will be set to y%.
The order of debuffs is:
0:HP, 1:MP, 2:ATK, 3:DEF, 4:MAG, 5:MAG, 6:AG, 7:Luck

If you enter
<ステート有効度上限:x,y%>
, the state effectiveness limit for ID x will be y%. If you specify -1 for x,
the validity limit for all states will be set to y%.
------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released.
*/


/*:ja
@plugindesc ver1.00/ステートや属性、弱体有効度の上限を設定する特徴を設定できるようにします。
@author Yana

@help
 プラグインコマンドはありません。
------------------------------------------------------
------------------------------------------------------
設定方法
------------------------------------------------------
アクター、クラス、武器、防具、エネミー、ステートなどの特徴を持つオブジェクトのメモ欄に、
<属性有効度上限:x,y%>
と記述すると、IDx番の属性有効度の上限がy%となります。xに-1を指定すると、
すべての属性の有効度の上限がy%に設定されます。

<弱体有効度上限:x,y%>
と記述すると、x番の弱体有効度の上限がy%となります。xに-1を指定すると、
すべての弱体の有効度の上限がy%に設定されます。
弱体の順番は、
0:HP,1:MP,2:攻撃力,3:防御力,4:魔法力,5:魔法防御,6:敏捷性,7:運
となります。

<ステート有効度上限:x,y%>
と記述すると、IDx番のステート有効度の上限がy%となります。xに-1を指定すると、
すべてのステートの有効度の上限がy%に設定されます。
------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開。
*/

(function () {

	DataManager.efficacyLimit = function (obj, type, id) {
		if (!obj._efficacyLimit) {
			DataManager.initEfficacyLimit(obj);
		}
		return obj._efficacyLimit[type][id];
	};

	DataManager.initEfficacyLimit = function (obj) {
		obj._efficacyLimit = { 'element': {}, 'debuff': {}, 'state': {} };
		var texts = obj.note.split('\n');
		for (var i = 0; i < texts.length; i++) {
			var text = texts[i];
			var type = null;
			if (text.match(/<属性有効度上限:(-?\d+),(\d+)[%％]?>/)) {
				type = 'element';
			} else if (text.match(/<弱体有効度上限:(-?\d+),(\d+)[%％]?>/)) {
				type = 'debuff';
			} else if (text.match(/<ステート有効度上限:(-?\d+),(\d+)[%％]?>/)) {
				type = 'state';
			}
			if (type) {
				var id = Number(RegExp.$1);
				var rate = Number(RegExp.$2);
				if (id < 0) {
					switch (type) {
						case 'element': n = $dataSystem.elements.length; break;
						case 'debuff': n = 8; break;
						case 'state': n = $dataStates.length; break;
					}
					for (var j = 0; j < n; j++) { obj._efficacyLimit[type][j] = rate }
				} else {
					obj._efficacyLimit[type][id] = rate;
				}
			}
		}
	};

	var __GBBase_elementRate = Game_BattlerBase.prototype.elementRate;
	Game_BattlerBase.prototype.elementRate = function (elementId) {
		var result = __GBBase_elementRate.call(this, elementId);
		result = Math.min(result, this.efficacyLimit('element', elementId));
		return result;
	};

	var __GBBase_debuffRate = Game_BattlerBase.prototype.debuffRate;
	Game_BattlerBase.prototype.debuffRate = function (paramId) {
		var result = __GBBase_debuffRate.call(this, paramId);
		result = Math.min(result, this.efficacyLimit('debuff', paramId));
		return result;
	};

	var __GBBase_stateRate = Game_BattlerBase.prototype.stateRate;
	Game_BattlerBase.prototype.stateRate = function (stateId) {
		var result = __GBBase_stateRate.call(this, stateId);
		result = Math.min(result, this.efficacyLimit('state', stateId));
		return result;
	};

	Game_BattlerBase.prototype.efficacyLimit = function (type, id) {
		return this.traitObjects().reduce(function (r, obj) {
			var n = DataManager.efficacyLimit(obj, type, id);
			if (n || n === 0) { r = Math.min(r, n) }
			return r;
		}, 1000000) / 100;
	};

}());