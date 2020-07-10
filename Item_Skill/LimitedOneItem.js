//
//  限定品 ver1.01
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
Imported['LimitedOneItem'] = 1.01;

/*:
 * @plugindesc ver1.01/1つしか所持できないアイテムを設定できるようにします。
 * @author Yana
 * 
 * @param LimitedKey
 * @desc 限定品を指定するためのメモに記述するキーワードです。
 * @default <限定品>
 * 
 * @param KeyItemLimited
 * @desc キーアイテムをすべて限定品として扱う場合、trueに指定してください。
 * @default false
 * @type boolean
 * 
 * @param IncludeMemberEquips
 * @desc パーティメンバーの装備を所持数に含む場合、trueを指定してください。
 * @default true
 * @type boolean
 * 
 * @param IncludeOutMemberEquips
 * @desc パーティ外のメンバーの装備を所持数に含む場合、trueを指定してください。
 * @default true
 * @type boolean
 *
 * @param ItemFullSwitchID
 * @desc アイテムが所持限界を超えていた場合、ONにするスイッチのIDです。
 * @default 24
 * @type switch
 * 
 * @param UngettableMessage
 * @desc 所持限界で入手できなかった時ポップアップするテキストです。
 * ※GetInformationの導入が必要です。
 * @default 「\I[_icon]_name」は\c[4]これ以上持てない！
 *  
 * @help------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------ 
 * 設定方法
 * ------------------------------------------------------ 
 * アイテムや武器、防具のメモ欄に、LimitedKeyで設定したテキストが含まれている場合、
 * そのアイテムは限定品となり、1つ以上持てず、新たに手に入れることができなくなります。
 * また、追加機能として、アイテムの所持限界でそれ以上持てなかった場合、
 * ItemFullSwitchIDで指定したIDのスイッチがONになります。
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
 * ver1.01:180409
 * プラグインパラメータの仕様を1.5.0に更新。
 * 所持限界時の表示メッセージが無効化できないバグを修正。
 * ver1.00:
 * 公開
 */


(function(){
    
    var parameters = PluginManager.parameters('LimitedOneItem');
    var limitedKey = new RegExp(parameters['LimitedKey'] || '<限定品>');
    var keyItemLimited = String(parameters['KeyItemLimited']) === 'true';
    var includeMemberEquips = String(parameters['IncludeMemberEquips']) === 'true';
    var includeOutMemberEquips = String(parameters['IncludeOutMemberEquips']) === 'true';
    
    var itemFullSwitchId = Number(parameters['ItemFullSwitchID']) || 24;
    
    var ungettableMessage = String(parameters['UngettableMessage'] || '');
    
    DataManager.isLimitedOne = function(item) {
        if (!item){ return false }
        if (item._limitedOne === undefined) {
            if (keyItemLimited && item.itypeId === 2){
                item._limitedOne = true;
            } else {
                item._limitedOne = !!item.note.match(limitedKey);
            }
        }
        return item._limitedOne;
    };
    
    Game_Party.prototype.isOnlyOne = function(item) {
        var limitedOne = DataManager.isLimitedOne(item);
        if (!limitedOne){ return false }
        if (!includeMemberEquips){ return false }
        for(var i=0;i<$dataActors.length;i++){
            var actor = $dataActors[i];
            if (!!actor){
                var aa = $gameActors.actor(actor.id);
                if (includeOutMemberEquips || this.members().contains(aa)){
                    if (!!aa && aa.equips().contains(item)){ return true }
                }
            }
        }
        return false;
    };
    
    var _LOI_GParty_maxItems = Game_Party.prototype.maxItems;
    Game_Party.prototype.maxItems = function(item) {
        if (DataManager.isLimitedOne(item)){ return 1 }
        return _LOI_GParty_maxItems.call(this,item);
    };
    
    var _LOI_GParty_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        var n = this.numItems(item);
        var flag = (n+amount)>this.maxItems(item);
        $gameSwitches.setValue(itemFullSwitchId,flag);
        if (flag){
            if (Imported['GetInformation']) {
                if (ungettableMessage !== ''){
                    CommonPopupManager.showInfo(item, ungettableMessage);
                }
            }
            return;
        }
        _LOI_GParty_gainItem.call(this, item, amount, includeEquip);
    };
    
    var _LOI_GParty_hasMaxItems = Game_Party.prototype.hasMaxItems;
    Game_Party.prototype.hasMaxItems = function(item) {
        var result = _LOI_GParty_hasMaxItems.call(this,item);
        return result || this.isOnlyOne(item);
    };
}());
