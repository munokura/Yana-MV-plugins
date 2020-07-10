//
//  立ち絵表示制御文字用マクロ設定 ver1.01
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
Imported['StandPictureSettingM'] = 1.01

if (!Imported.StandPictureSettingP) {
	console.error('StandPictureSettingPを導入してください。')
}

/*:
 * @plugindesc ver1.01/立ち絵表示制御文字用のマクロ設定用プラグインです。
 * @author Yana
 * 
 * @param Start Index
 * @desc 開始インデックスです。
 * 特に理由がない場合、0を指定してください。
 * @default 0
 * 
 * @param Macro0
 * @desc インデックス0番のマクロです。
 * @default 
 * 
 * @param Macro1
 * @desc インデックス1番のマクロです。
 * @default 
 * 
 * @param Macro2
 * @desc インデックス2番のマクロです。
 * @default 
 * 
 * @param Macro3
 * @desc インデックス3番のマクロです。
 * @default 
 * 
 * @param Macro4
 * @desc インデックス4番のマクロです。
 * @default 
 * 
 * @param Macro5
 * @desc インデックス5番のマクロです。
 * @default 
 * 
 * @param Macro6
 * @desc インデックス6番のマクロです。
 * @default 
 * 
 * @param Macro7
 * @desc インデックス7番のマクロです。
 * @default 
 * 
 * @param Macro8
 * @desc インデックス8番のマクロです。
 * @default 
 * 
 * @param Macro9
 * @desc インデックス9番のマクロです。
 * @default 
 * 
 * @param Macro10
 * @desc インデックス10番のマクロです。
 * @default 
 * 
 * @param Macro11
 * @desc インデックス11番のマクロです。
 * @default 
 * 
 * @param Macro12
 * @desc インデックス12番のマクロです。
 * @default 
 * 
 * @param Macro13
 * @desc インデックス13番のマクロです。
 * @default 
 * 
 * @param Macro14
 * @desc インデックス14番のマクロです。
 * @default 
 * 
 * @param Macro15
 * @desc インデックス15番のマクロです。
 * @default 
 * 
 * @param Macro16
 * @desc インデックス16番のマクロです。
 * @default 
 * 
 * @param Macro17
 * @desc インデックス17番のマクロです。
 * @default 
 * 
 * @param Macro18
 * @desc インデックス18番のマクロです。
 * @default 
 * 
 * @param Macro19
 * @desc インデックス19番のマクロです。
 * @default 
 * 
 * @param Macro20
 * @desc インデックス20番のマクロです。
 * @default 
 * 
 * @param Macro21
 * @desc インデックス21番のマクロです。
 * @default 
 * 
 * @param Macro22
 * @desc インデックス22番のマクロです。
 * @default 
 * 
 * @param Macro23
 * @desc インデックス23番のマクロです。
 * @default 
 * 
 * @param Macro24
 * @desc インデックス24番のマクロです。
 * @default 
 * 
 * @param Macro25
 * @desc インデックス25番のマクロです。
 * @default 
 * 
 * @param Macro26
 * @desc インデックス26番のマクロです。
 * @default 
 * 
 * @param Macro27
 * @desc インデックス27番のマクロです。
 * @default 
 * 
 * @param Macro28
 * @desc インデックス28番のマクロです。
 * @default 
 * 
 * @param Macro29
 * @desc インデックス29番のマクロです。
 * @default 
 * 
 * @param Macro30
 * @desc インデックス30番のマクロです。
 * @default 
 * 
 * @param Macro31
 * @desc インデックス31番のマクロです。
 * @default 
 * 
 * @param Macro32
 * @desc インデックス32番のマクロです。
 * @default 
 * 
 * @param Macro33
 * @desc インデックス33番のマクロです。
 * @default 
 * 
 * @param Macro34
 * @desc インデックス34番のマクロです。
 * @default 
 * 
 * @param Macro35
 * @desc インデックス35番のマクロです。
 * @default 
 * 
 * @param Macro36
 * @desc インデックス36番のマクロです。
 * @default 
 * 
 * @param Macro37
 * @desc インデックス37番のマクロです。
 * @default 
 * 
 * @param Macro38
 * @desc インデックス38番のマクロです。
 * @default 
 * 
 * @param Macro39
 * @desc インデックス39番のマクロです。
 * @default 
 * 
 * @param Macro40
 * @desc インデックス40番のマクロです。
 * @default 
 * 
 * @param Macro41
 * @desc インデックス41番のマクロです。
 * @default 
 *
 * @param Macro42
 * @desc インデックス42番のマクロです。
 * @default 
 *
 * @param Macro43
 * @desc インデックス43番のマクロです。
 * @default 
 *
 * @param Macro44
 * @desc インデックス44番のマクロです。
 * @default
 *  
 * @param Macro45
 * @desc インデックス45番のマクロです。
 * @default 
 *
 * @param Macro46
 * @desc インデックス46番のマクロです。
 * @default 
 *
 * @param Macro47
 * @desc インデックス47番のマクロです。
 * @default 
 *
 * @param Macro48
 * @desc インデックス48番のマクロです。
 * @default 
 *  
 * @param Macro49
 * @desc インデックス49番のマクロです。
 * @default 
 *
 * @param Macro50
 * @desc インデックス50番のマクロです。
 * @default 
 *
 * @param Macro51
 * @desc インデックス51番のマクロです。
 * @default 
 *
 * @param Macro52
 * @desc インデックス52番のマクロです。
 * @default
 *  
 * @param Macro53
 * @desc インデックス53番のマクロです。
 * @default 
 *
 * @param Macro54
 * @desc インデックス54番のマクロです。
 * @default 
 *
 * @param Macro55
 * @desc インデックス55番のマクロです。
 * @default 
 *
 * @param Macro56
 * @desc インデックス56番のマクロです。
 * @default
 * 
 * @param Macro57
 * @desc インデックス57番のマクロです。
 * @default 
 *
 * @param Macro58
 * @desc インデックス58番のマクロです。
 * @default 
 *
 * @param Macro59
 * @desc インデックス59番のマクロです。
 * @default 
 *
 * @param Macro60
 * @desc インデックス60番のマクロです。
 * @default
 *  
 * @param Macro61
 * @desc インデックス61番のマクロです。
 * @default 
 *
 * @param Macro62
 * @desc インデックス62番のマクロです。
 * @default 
 *
 * @param Macro63
 * @desc インデックス63番のマクロです。
 * @default 
 *
 * @param Macro64
 * @desc インデックス64番のマクロです。
 * @default
 * 
 * @param Macro65
 * @desc インデックス65番のマクロです。
 * @default 
 *
 * @param Macro66
 * @desc インデックス66番のマクロです。
 * @default
 * 
 * @param Macro67
 * @desc インデックス67番のマクロです。
 * @default 
 *
 * @param Macro68
 * @desc インデックス68番のマクロです。
 * @default 
 *
 * @param Macro69
 * @desc インデックス69番のマクロです。
 * @default 
 *
 * @param Macro70
 * @desc インデックス70番のマクロです。
 * @default
 *  
 * @param Macro71
 * @desc インデックス71番のマクロです。
 * @default 
 *
 * @param Macro72
 * @desc インデックス72番のマクロです。
 * @default 
 *
 * @param Macro73
 * @desc インデックス73番のマクロです。
 * @default 
 *
 * @param Macro74
 * @desc インデックス75番のマクロです。
 * @default
 *
 * @param Macro75
 * @desc インデックス75番のマクロです。
 * @default 
 *
 * @param Macro76
 * @desc インデックス76番のマクロです。
 * @default 
 *
 * @param Macro77
 * @desc インデックス77番のマクロです。
 * @default 
 *
 * @param Macro78
 * @desc インデックス78番のマクロです。
 * @default
 *  
 * @param Macro79
 * @desc インデックス79番のマクロです。
 * @default 
 *
 * @param Macro80
 * @desc インデックス80番のマクロです。
 * @default 
 *
 * @param Macro81
 * @desc インデックス81番のマクロです。
 * @default 
 *
 * @param Macro82
 * @desc インデックス82番のマクロです。
 * @default 
 *  
 * @param Macro83
 * @desc インデックス83番のマクロです。
 * @default 
 *
 * @param Macro84
 * @desc インデックス84番のマクロです。
 * @default 
 *
 * @param Macro85
 * @desc インデックス85番のマクロです。
 * @default 
 *
 * @param Macro86
 * @desc インデックス86番のマクロです。
 * @default
 *  
 * @param Macro87
 * @desc インデックス87番のマクロです。
 * @default 
 *
 * @param Macro88
 * @desc インデックス88番のマクロです。
 * @default 
 *
 * @param Macro89
 * @desc インデックス89番のマクロです。
 * @default 
 *
 * @param Macro90.
 * @desc インデックス90番のマクロです。
 * @default
 * 
 * @param Macro91
 * @desc インデックス91番のマクロです。
 * @default 
 *
 * @param Macro92
 * @desc インデックス92番のマクロです。
 * @default 
 *
 * @param Macro93
 * @desc インデックス94番のマクロです。
 * @default 
 *
 * @param Macro95
 * @desc インデックス95番のマクロです。
 * @default
 *  
 * @param Macro96
 * @desc インデックス96番のマクロです。
 * @default 
 *
 * @param Macro97
 * @desc インデックス97番のマクロです。
 * @default 
 *
 * @param Macro98
 * @desc インデックス98番のマクロです。
 * @default 
 *
 * @param Macro99
 * @desc インデックス99番のマクロです。
 * @default
 * 
 * @help プラグインコマンドはありません。
 * 
 * このプラグインは立ち絵表示制御文字用の設定プラグインです。
 * StandPictureECよりも上、StandPictureSettingPよりも下に配置してください。
 * 
 * プラグインの設定は、
 * ○○○:×××
 * という形式で設定してください。
 * ○○○の部分はマクロの内容をわかりやすくするためのヘルプ欄としてご活用ください。
 * 実際にマクロとして使用されるのは、×××の部分になります。
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
 * ver1.01:
 * 処理を修正
 * ver1.00:
 * 公開
 */

(function(){
	var parameters = PluginManager.parameters('StandPictureSettingM');
	var startIndex = Number(parameters['Start Index'] || 0);
	
	StPicManager.macro = function(index){
		if (this._macro){ return this._macro[index] }
		this._macro = [];
		for (var i=0;i<100;i++){
			text = String(parameters[String('Macro' + i)] || '');
			if (text.match(/(.+?:)?(.+)/)){
				this._macro[i + (startIndex*100)] = RegExp.$2;
			}
		}
		return this._macro[index];
	}
}());