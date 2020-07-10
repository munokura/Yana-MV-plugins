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
 * @plugindesc ver1.00/ダメージボーナスを与える特徴を設定できるようにします。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * 特徴を持ったオブジェクトのメモ欄に
 * <ダメージボーナス:xx,yyy>
 * または、
 * <DamageBonus:xx,yyy>
 * と記述すると、xxで指定されたスキルまたはアイテムのダメージにyyyをevalで評価して
 * 算出されたダメージが加算されます。
 * xxはスキルならS1などS+ID、アイテムならI1などI+IDで指定してください。
 * S0はスキルすべて、I0はアイテムすべて、0はすべての行動が対象になります。
 * また、それ以外を指定すると、
 * <指定したテキスト>
 * が含まれたスキルやアイテムを対象にします。
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
	
	var parameters = PluginManager.parameters('DamageBonusTrait');
	
	////////////////////////////////////////////////////////////////////////////////////
	
	DataManager.damageBonus = function(item) {
		if (item._damageBonus === undefined ){
			item._damageBonus = {};
			var texts = item.note.split('\n');
			for (var i=0,max=texts.length;i<max;i++){
				var text = texts[i];
				if (text.match(/<(?:ダメージボーナス|DamageBonus):(.+),(.+)>/)){
					item._damageBonus[RegExp.$1] = RegExp.$2;
				}
			}
		}
		return item._damageBonus;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
		
	var __GAction_evalDamageFormula = Game_Action.prototype.evalDamageFormula;
	Game_Action.prototype.evalDamageFormula = function(target) {
		var db = this.subject().damageBonus(this.item(),target);
		var damage = __GAction_evalDamageFormula.call(this,target);
		return damage + db;
	};
	
	
	////////////////////////////////////////////////////////////////////////////////////
	
	Game_Battler.prototype.damageBonus = function(item, target) {
		return this.traitObjects().reduce(function(r,to){
			var db = DataManager.damageBonus(to);
			var key = DataManager.isItem(item) ? 'I'+item.id : 'S'+item.id;
			var a = this;
			var b = target;
			var v = $gameVariables._data;
			for (i in db){
				if (i === key){ r += eval(db[i]); continue }
				var regExp = RegExp('<' + i + '>');
				if (item.note.match(regExp)){ r += eval(db[i]) }
			}
			return r;
		}.bind(this),0);
	};
	
	////////////////////////////////////////////////////////////////////////////////////
}());