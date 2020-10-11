//
//  最低ダメージ値保障 ver1.00
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
Imported['MinimumDamage'] = 1.00;
/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Tsukumate/MinimumDamage.js
 * @plugindesc ver1.00/ダメージの最低値を設定します。
 * @author Yana
 * 
 * @param MinimumHpDamage
 * @text HPダメージ最低値
 * @type number
 * @desc HPダメージの最低値です。
 * @default 1
 * 
 * @param MinimumMpDamage
 * @text MPダメージ最低値
 * @type number
 * @desc MPダメージの最低値です。
 * @default 1
 * 
 * @help
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、
 * または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_/
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.00:
 * 公開
 */

// プラグインパラメータやエイリアスを使うため、グローバル汚染回避のためクロージャーとして定義

(() => {

	"use strict";

	////////////////////////////////////////////////////////////////////////////////////

	const parameters = PluginManager.parameters('MinimumDamage');
	const minimumHpDamage = Number(parameters['MinimumHpDamage']);
	const minimumMpDamage = Number(parameters['MinimumMpDamage']);

	////////////////////////////////////////////////////////////////////////////////////

	const __Game_Action_executeDamage = Game_Action.prototype.executeDamage;
	Game_Action.prototype.executeDamage = function (target, value) {
		if (this.isHpEffect()) {
			value = Math.max(Math.abs(value), minimumHpDamage);
			if (this.isRecover()) { value *= -1 }
		}
		if (this.isMpEffect()) {
			value = Math.max(Math.abs(value), minimumMpDamage);
			if (this.isRecover()) { value *= -1 }
		}
		__Game_Action_executeDamage.call(this, target, value);
	};

})();
