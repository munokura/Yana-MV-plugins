//
//  永続ステート ver1.00
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
Imported['PermanentState'] = 1.00;
/*:
@target MZ MV
@plugindesc ver1.00/It will now be possible to set states that will not be canceled by being Collapse or fully recovered.
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
If you write
<Permanent>
in the state's Note field, that state will not be canceled by KO or full recovery.
Otherwise, it will be canceled like a normal state: by the passage of a turn, the end of a battle, or a canceling effect.

------------------------------------------------------
Terms of Use
----------------------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php

There are no restrictions on use. It can be used for both commercial and adult purposes.
Secondary distribution is not restricted, but is not supported.
Attribution is optional. It can be used without attribution.
Use of materials is at your own risk.
*/


/*:ja
@target MZ MV
@plugindesc ver1.00/戦闘不能や全回復で解除されないステートを設定できるようにします。
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
使用方法
------------------------------------------------------
ステートのメモ欄に
<永続ステート>
または、
<Permanent>
と記述すると、そのステートは戦闘不能や全回復で解除されなくなります。
それ以外は通常のステートと同じようにターン経過、バトル終了、解除効果などで
解除されます。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php

使用に制限はありません。商用、アダルト、いずれにも使用できます。
二次配布も制限はしませんが、サポートは行いません。
著作表示は任意です。行わなくても利用できます。
素材利用は自己責任でお願いします。
*/

(function () {
	////////////////////////////////////////////////////////////////////////////////////

	var parameters = PluginManager.parameters('PermanentState');

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.isPermanent = function (state) {
		if (!state) { return false }
		return !!state.meta['永続ステート'] || !!state.meta['Permanent'];
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GBBase_clearStates = Game_BattlerBase.prototype.clearStates;
	Game_BattlerBase.prototype.clearStates = function () {
		var states = this._states ? this._states.clone() : [];
		var turns = this._stateTurns ? JsonEx.makeDeepCopy(this._stateTurns) : {};
		__GBBase_clearStates.call(this);
		if (states.length < 1) { return }
		states.forEach(function (stateId) {
			var state = $dataStates[stateId];
			if (DataManager.isPermanent(state)) {
				this._states.push(state.id);
				this._stateTurns[state.id] = turns[state.id]
			}
		}.bind(this));
	};

	////////////////////////////////////////////////////////////////////////////////////

}());