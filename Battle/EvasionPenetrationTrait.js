//
//  回避無視特徴 ver1.00
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
Imported['EvasionPenetration'] = 1.00;
/*:
 * @plugindesc ver1.00/対象の回避を無視する特徴を設定できるようにします。
 * @author Yana
 * 
 * @help------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------ 
 * 特徴を持ったオブジェクトまたは、スキル、アイテムのメモ欄に
 * <物理回避無視>
 * または、
 * <PhysicalEvasionPenetrate>
 * と記述すると、その特徴を持ったバトラーまたはスキルやアイテムは物理回避を無視します。
 * 
 * 特徴を持ったオブジェクトまたは、スキル、アイテムのメモ欄に
 * <魔法回避無視>
 * または、
 * <MagicalEvasionPenetrate>
 * と記述すると、その特徴を持ったバトラーまたはスキルやアイテムは魔法回避を無視します。
 * 
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

(function(){
	////////////////////////////////////////////////////////////////////////////////////
	
	var parameters = PluginManager.parameters('EvasionPenetration');
	
	////////////////////////////////////////////////////////////////////////////////////

	DataManager.isEvaPenetrate = function(item,type) {
		switch(type){
		case 1:
			if (item._pEvaPenetrate === undefined){
				item._pEvaPenetrate = (!!item.note.match(/<物理回避無視>/) || !!item.note.match(/<PhysicalEvasionPenetrate>/));
			}
			return item._pEvaPenetrate;
		case 2:
			if (item._mEvaPenetrate === undefined){
				item._mEvaPenetrate = (!!item.note.match(/<魔法回避無視>/) || !!item.note.match(/<MagicalEvasionPenetrate>/));
			}
			return item._mEvaPenetrate;
		}
		return false;
	};
	
	var __Game_Action_itemEva = Game_Action.prototype.itemEva;
	Game_Action.prototype.itemEva = function(target) {
		if (this.evaPenetrate()){ return 0 }
		return __Game_Action_itemEva.call(this,target);
	};
	
	Game_Action.prototype.evaPenetrate = function() {
		if (DataManager.isEvaPenetrate(this.item(),this.item().hitType)){ return true }
		for(var i=0;i<this.subject().traitObjects().length;i++){
			var trait = this.subject().traitObjects()[i];
			if (DataManager.isEvaPenetrate(trait,this.item().hitType)){ return true }
		};
		return false;
	};
}());