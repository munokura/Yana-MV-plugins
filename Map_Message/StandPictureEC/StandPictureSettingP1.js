//
//  立ち絵表示制御文字用ピクチャ設定サンプル用 ver1.02
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
Imported['StandPictureSettingP1'] = 1.02;

/*:
 * @plugindesc ver1.02/立ち絵表示制御文字用のピクチャ設定のサンプルです。
 * @author Yana
 * 
 * @param Start Index
 * @desc 開始インデックスです。
 * 特に理由がない場合、0を指定してください。
 * @default 1
 * 
 * @param Picture0
 * @desc インデックス0番のピクチャです。
 * @default pictures/test0
 * @require 1
 * @dir img/
 * @type file
 * 
 * @param Picture1
 * @desc インデックス1番のピクチャです。
 * @default pictures/test1
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture2
 * @desc インデックス2番のピクチャです。
 * @default pictures/test2:blink,30,8,0,1,2,2,1,0
 * @require 1
 * @dir img/
 * @type file
 * 
 * @param Picture3
 * @desc インデックス3番のピクチャです。
 * @default pictures/test3:blink,30,8,0,1,2,2,1,0
 * @require 1
 * @dir img/
 * @type file
 * 
 * @param Picture4
 * @desc インデックス4番のピクチャです。
 * @default pictures/test4:lip,6,1,1,5,1,2,4,5,3
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture5
 * @desc インデックス5番のピクチャです。
 * @default pictures/test5
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture6
 * @desc インデックス6番のピクチャです。
 * @default pictures/test6
 * @require 1
 * @dir img/
 * @type file
 * 
 * @param Picture7
 * @desc インデックス7番のピクチャです。
 * @default pictures/test7
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture8
 * @desc インデックス8番のピクチャです。
 * @default pictures/test8
 * @require 1
 * @dir img/
 * @type file
 * 
 * @param Picture9
 * @desc インデックス9番のピクチャです。
 * @default pictures/pm
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture10
 * @desc インデックス10番のピクチャです。
 * @default pictures/pms1
 * @require 1
 * @dir img/
 * @type file
 * 
 * @param Picture11
 * @desc インデックス11番のピクチャです。
 * @default pictures/pms2
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture12
 * @desc インデックス12番のピクチャです。
 * @default pictures/pms3
 * @require 1
 * @dir img/
 * @type file
 * 
 * @param Picture13
 * @desc インデックス13番のピクチャです。
 * @default pictures/pms4
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture14
 * @desc インデックス14番のピクチャです。
 * @default pictures/pms5
 * @require 1
 * @dir img/
 * @type file
 * 
 * @param Picture15
 * @desc インデックス15番のピクチャです。
 * @default pictures/World
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture16
 * @desc インデックス16番のピクチャです。
 * @default pictures/tower
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture17
 * @desc インデックス17番のピクチャです。
 * @default pictures/town
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture18
 * @desc インデックス18番のピクチャです。
 * @default pictures/village
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture19
 * @desc インデックス19番のピクチャです。
 * @default pictures/desert
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture20
 * @desc インデックス20番のピクチャです。
 * @default pictures/ruins
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture21
 * @desc インデックス21番のピクチャです。
 * @default pictures/castle
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture22
 * @desc インデックス22番のピクチャです。
 * @default pictures/mountain
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture23
 * @desc インデックス23番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture24
 * @desc インデックス24番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture25
 * @desc インデックス25番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture26
 * @desc インデックス27番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture27
 * @desc インデックス27番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture28
 * @desc インデックス28番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture29
 * @desc インデックス29番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture30
 * @desc インデックス30番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture31
 * @desc インデックス31番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture32
 * @desc インデックス32番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture33
 * @desc インデックス33番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture34
 * @desc インデックス35番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture35
 * @desc インデックス735番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture36
 * @desc インデックス36番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture37
 * @desc インデックス37番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture38
 * @desc インデックス38番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture39
 * @desc インデックス39番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture40
 * @desc インデックス40番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture41
 * @desc インデックス41番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture42
 * @desc インデックス42番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture43
 * @desc インデックス43番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture44
 * @desc インデックス45番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture45
 * @desc インデックス45番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture46
 * @desc インデックス46番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture47
 * @desc インデックス47番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture48
 * @desc インデックス48番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture49
 * @desc インデックス49番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture50
 * @desc インデックス50番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture51
 * @desc インデックス51番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture52
 * @desc インデックス52番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture53
 * @desc インデックス53番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture54
 * @desc インデックス54番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture55
 * @desc インデックス55番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture56
 * @desc インデックス56番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture57
 * @desc インデックス57番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture58
 * @desc インデックス58番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture59
 * @desc インデックス59番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture60
 * @desc インデックス60番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture61
 * @desc インデックス61番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture62
 * @desc インデックス62番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture63
 * @desc インデックス63番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture64
 * @desc インデックス64番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture65
 * @desc インデックス65番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture66
 * @desc インデックス67番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture67
 * @desc インデックス67番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture68
 * @desc インデックス768番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture69
 * @desc インデックス69番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture70
 * @desc インデックス70番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture71
 * @desc インデックス71番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture72
 * @desc インデックス72番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture73
 * @desc インデックス73番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture74
 * @desc インデックス74番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture75
 * @desc インデックス75番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture76
 * @desc インデックス76番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture77
 * @desc インデックス77番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture78
 * @desc インデックス78番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture79
 * @desc インデックス79番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture80
 * @desc インデックス80番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture81
 * @desc インデックス81番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture82
 * @desc インデックス82番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture83
 * @desc インデックス83番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture84
 * @desc インデックス84番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture85
 * @desc インデックス85番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture86
 * @desc インデックス86番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture87
 * @desc インデックス87番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture88
 * @desc インデックス88番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture89
 * @desc インデックス89番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture90
 * @desc インデックス90番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture91
 * @desc インデックス91番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture92
 * @desc インデックス92番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture93
 * @desc インデックス93番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture94
 * @desc インデックス94番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture95
 * @desc インデックス95番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture96
 * @desc インデックス96番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *   
 * @param Picture97
 * @desc インデックス97番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *  
 * @param Picture98
 * @desc インデックス98番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @param Picture99
 * @desc インデックス99番のピクチャです。
 * @default
 * @require 1
 * @dir img/
 * @type file
 * 
 * @help プラグインコマンドはありません。
 * 
 * このプラグインは立ち絵表示制御文字用の設定プラグインです。
 * StandPictureEC及び、StandPictureSettingMよりも上に配置してください。
 * 
 * プラグインの設定は
 * FileName
 * または、
 * FileName:blink,瞬き頻度,瞬き確率,瞬きインデックス配列・・・
 * または、
 * FileName:lip,口パク頻度,1,口パクインデックス配列・・・
 * と設定してください。
 * 頻度は設定したフレーム毎にインデックス配列を1つずつずらして、配列のインデックス番号の画像に変更します。
 * blink,30,8,0,1,2,2,1,0と設定されている場合、30フレーム毎に瞬きの判定を行い、
 * 1/8の確率で瞬きを発生させ、画像を1フレーム毎に0,1,2,2,1,0と変更します。
 *
 * 不要素材削除機能に対応しましたが、いくつか注意点があります。
 * ・フォルダ名/画像名となっているもののみ削除対象外となります。
 * ・まばたきや口パクの画像はこのプラグインでは対象外にできません。
 * ・対象外の画像は、ExcludeAvoidanceのプラグインを使用して、削除対象から除外してください。
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
 * ver1.02:
 * 不要素材削除機能に対応
 * ver1.01:
 * 処理を修正
 * ver1.00:
 * 公開
 */

(function(){
	var parameters = PluginManager.parameters('StandPictureSettingP1');
	var startIndex = Number(parameters['Start Index'] || 0);
	
	var _stPic_picture1 = StPicManager.picture;
	StPicManager.picture = function(index){
		if (this._picture){ return this._picture[index] }
		_stPic_picture1.call(this);
		for (var i=0;i<100;i++){
			var data = String(parameters[String('Picture' + i)] || '');
			var ary = [];
			if (data !== ''){
				if (data.match(/(.+):(.+?)((?:,\d+)+)/)){
					text = RegExp.$1;
					ary[0] = RegExp.$2;
					params = RegExp.$3.split(/,/).slice(1);
					for(var j=0;j<params.length;j++){
						params[j] = parseInt(params[j]);
					}
					ary[1] = params.shift();
					ary[2] = params.shift();
					ary[3] = params;
					this._picture[i+(startIndex*100)] = [text,ary];
				}else if (data.match(/(.+)/)){
					this._picture[i+(startIndex*100)] = [RegExp.$1];
				}
			}
		}
		return this._picture[index];
	};
}());