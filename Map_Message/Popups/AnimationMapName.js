//
//  アニメーションマップネーム ver1.04
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
Imported['AnimationMapName'] = 1.04;

/*:
 * @plugindesc ver1.04/マップ名表示をアニメーションさせます。
 * @author Yana
 *
 * @param Pattern Variable ID
 * @desc パターンの変更に使う変数のIDです。
 * 0または、空欄で変数を使用しません。
 * @default 
 * 
 * @param Anime Font Size
 * @desc 表示マップ名のフォントサイズです。
 * @default 28
 *
 * @param Anime Pattern
 * @desc マップ名の動作パターンです。
 * Normal:普通 GrowUp:にょきにょき Stretch:うにょーん
 * @default Normal
 *
 * @param Anime Count
 * @desc マップ名の表示時間です。
 * @default 300
 * 
 * @param Anime OriginalX
 * @desc 移動前の座標Xです。
 * @default 0
 * 
 * @param Anime OriginalY
 * @desc 移動前の座標Yです。
 * @default -60
 * 
 * @param Anime MoveX
 * @desc X座標の移動距離です。
 * @default 0
 * 
 * @param Anime MoveY
 * @desc Y座標の移動距離です。
 * @default 60
 *
 * @param Fill Rect Color
 * @desc 背景の色です。
 * @default rgba(0,0,0,0.5)
 *
 * @param Back Picture
 * @desc 背景に使用するピクチャ画像です。
 * こちらを指定すると、背景を塗りつぶすRectは無効になります。
 * @default
 *
 * @help------------------------------------------------------
 * プラグインコマンド
 * ------------------------------------------------------
 * アニメーションマップネーム 設定 ～
 * AnimationMapName Setting ～
 *
 * アニメーションマップネームの設定を変更します。
 * 変更できる項目は、それぞれプラグインパラメータに対応しており、
 * size:Anime Font Size
 * pattern:Anime Pattern
 * count:Anime Count
 * ox:Anime OriginalX
 * oy:Anime OriginalY
 * mx:Anime MoveX
 * my:Anime MoveY
 * color:Fill Rect Color
 * picture:Back Picture
 * となっています。
 * 記述は以下のように「変更したい項目:変更後の設定」と記述します。
 * 例:patternをGrowUp,countを200に変更する。
 * アニメーションマップネーム 設定 pattern:GrowUp count:200
 *
 * アニメーションマップネーム 表示 ～
 * AnimationMapName Add ～
 *
 * 指定したパラメータを使って、アニメーションマップネームを呼び出します。
 * 指定できるパラメータは上記の設定に加えて、
 * text:表示するテキスト
 * が使用可能です。
 * ------------------------------------------------------
 * 使い方
 * ------------------------------------------------------
 * マップ名表示を改造し、アニメーションするように変更します。
 * また、
 * \C[x]　\I[x]　\V[x] \N[x] \P[x] \G
 * の制御文字を使用できるようになります。
 *
 * ---変数によるパターンの設定---
 * 変数IDを設定してあると、変数の値を変更するだけで、アニメーションの
 * 表示パターンが変更可能です。
 * それぞれ、対応する数値と設定は、
 * 0でNormal、-1でStretch、-2でGrowUp
 * となります。
 * この数値は、プラグインコマンドで設定が変更された際には、自動で設定された
 * 値に合わせた数値が代入されます。
 *
 * ---マップのメモによるパラメータの設定---
 * マップのメモ欄を使うことでも、アニメーションマップネームの設定を、
 * 個別に変更することが可能です。
 * マップのメモ欄に以下のように記述してください。
 *
 * <アニメーションマップネーム設定>
 * 
 * 設定項目
 *
 * </アニメーションマップネーム設定>
 * 
 * 設定項目は、プラグインコマンドの設定の変更の項目で記述されているものが
 * 使用可能です。
 *
 * ---各設定項目の優先度---
 * プラグインコマンドによる設定は、基本設定を書き換えると同時に、パターンが
 * 設定されている場合は、指定した変数の数値も書き換えます。
 * 
 * マップのメモによる設定は、基本的に優先されます。
 * プラグインコマンドで呼び出した場合も、マップに設定がある場合は、その設定を
 * ベースとして使用します。
 * また、マップのメモによるパターンの設定は、変数の値より優先されます。
 * その際、変数の値の変更は行いません。
 *
 * なので、優先度は
 * コマンドで呼び出した際の個別設定＞マップの設定＞変数のパターン設定＞基本設定
 * となります。
 *
 * ---リージョンネームの設定---
 * マップのメモ欄を使ってリージョンネームを設定することで、そのリージョンに
 * 足を踏み入れた際にリージョンネームをポップアップさせることができます。
 *
 * マップのメモ欄に
 * <RegionName○:xxx …>
 * <リージョンネーム○:xxx …>
 * のいずれかの書式で記述がある場合、○番のリージョンに侵入した際、xxxで指定した
 * テキストが、マップ名表示としてポップアップします。
 * …の部分は、プラグインコマンドと同じ設定項目が使用できます。
 * 設定せずに、<リージョンネーム○:xxx>だけでも動作します。
 * また、このポップアップは、リージョンネームの設定されたリージョンから、
 * 別のリージョンネームの設定されたリージョンに侵入したときのみ、反応します。
 *
 * 例:3番のリージョンに侵入した際、テストエリアA-1のテキストを、
 *    パターンGrowUpで60フレームの表示時間だけ表示
 * <リージョンネーム3:テストエリアA-1 pattern:GrowUp count:60>
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
 * ver1.04:
 * イベントテストが正常に機能していなかったバグを修正。
 * ver1.03:
 * イベントコマンドでマップ名表示が無効化できなかったバグを修正。
 * 表示パターン「GrowUp」「Stretch」を追加。
 * プラグインコマンドを追加。
 * 設定項目を追加。
 * ver1.02:
 * CommonPopupCoreの変更に合わせて処理を修正。
 * ver1.01:
 * イベントテストが正常に機能していなかったバグを修正。
 * ver1.00:
 * 公開
 */

////////////////////////////////////////////////////////////////////////////////////

(function() {
    var parameters = PluginManager.parameters('AnimationMapName');
    var patternVariableId = Number(parameters['Pattern Variable ID']) || 0;
    var animeFontSize = Number(parameters['Anime Font Size'] || 28);
    var animeCount = Number(parameters['Anime Count'] || 300);
    var animeOriginalX = Number(parameters['Anime OriginalX'] || 0);
    var animeOriginalY = Number(parameters['Anime OriginalY'] || 0);
    var animeMoveX = Number(parameters['Anime MoveX'] || 0);
    var animeMoveY = Number(parameters['Anime MoveY'] || 0);
    var animePattern = parameters['Anime Pattern'] || 'Normal';
    var fillRectColor = parameters['Fill Rect Color'] || 'rgba(0,0,0,0.5)';
    var backPicture = parameters['Back Picture'];

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        __GInterpreter_pluginCommand.call(this, command, args);
        if (command === 'AnimationMapName' || command === 'アニメーションマップネーム') {
            var code = args.shift();
            if (code === 'Setting' || code === '設定') this.setAmsSetting(args);
            if (code === 'Add' || code === '表示') this.showAmn(args);
        }
    };

    Game_Interpreter.prototype.setAmsSetting = function(args) {
        var params = $gameSystem.amnParameters();
        var amnParams = DataManager.makeAmnParams(params,args);
        if (patternVariableId){
            if (amnParams.pattern === 'Normal' || amnParams.pattern == 0){
                $gameVariables._data[patternVariableId] = 0;
            } else if (amnParams.pattern === 'Stretch' || amnParams.pattern == -1){
                $gameVariables._data[patternVariableId] = -1;
            } else if (amnParams.pattern === 'GrowUp' || amnParams.pattern == -2){
                $gameVariables._data[patternVariableId] = -2;
            } else {
                $gameVariables._data[patternVariableId] = Number(amnParams.pattern);
            }
        }
        $gameSystem.setAmnParameters(amnParams);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.amnMapParams = function(map) {
        if (!map) return false;
        if (map.note === undefined) return false;
        if (map._amsParams){ return map._amsParams }
        var texts = map.note.split('\n');
        var params = {};
        for (var i=0,max=texts.length;i<max;i++) {
            if (/^<(?:AnimationMapNameSetting|アニメーションマップネーム設定)>/.exec(texts[i])){
                for (var j=i;j<max;j++){
                    if (/^<\/(?:AnimationMapNameSetting|アニメーションマップネーム設定)>/.exec(texts[j])) {
                        i=j;
                        break;
                    } else {
                        if (/(.+?):(.+)?/.exec(texts[j])){
                            var code = RegExp.$1;
                            var value = RegExp.$2;
                            switch(code) {
                                case 'size':    params.size = Number(value) ; break;
                                case 'count':   params.count = Number(value);break;
                                case 'ox':      params.ox = Number(value)   ;break;
                                case 'oy':      params.oy = Number(value)   ;break;
                                case 'mx':      params.mx = Number(value)   ;break;
                                case 'my':      params.my = Number(value)   ;break;
                                case 'pattern': params.pattern = value      ;break;
                                case 'color':   params.color = value        ;break;
                                case 'picture': params.picture = value      ;break;
                                case 'text':    params.text = value         ;break;
                            }
                        }
                    }
                }
            }
        }
        map._amsParams = params;
        return map._amsParams;
    };

    DataManager.makeAmnParams = function(params,args) {
        var amnParams = { size:params.size, count:params.count,
            ox:params.ox, oy:params.oy, mx:params.mx, my:params.my,
            pattern:params.pattern, color:params.color, picture:params.picture,
            text:params.text };
        args.forEach(function(a){
            if (/(.+?):(.+)?/.exec(a)){
                var code = RegExp.$1;
                var value = RegExp.$2;
                switch(code){
                    case 'size':   amnParams.size = Number(value);  break;
                    case 'count':  amnParams.count = Number(value); break;
                    case 'ox':     amnParams.ox = Number(value);    break;
                    case 'oy':     amnParams.oy = Number(value);    break;
                    case 'mx':     amnParams.mx = Number(value);    break;
                    case 'my':     amnParams.my = Number(value);    break;
                    case 'pattern':amnParams.pattern = value;       break;
                    case 'color':  amnParams.color = value;         break;
                    case 'picture':amnParams.picture = value;       break;
                    case 'text':   amnParams.text = value;          break;
                }
            }
        }.bind(this));
        return amnParams;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_System.prototype.amnParameters = function() {
        if (!this._amnParameters) this.initAmnParameters();
        if (patternVariableId){
            this._amnParameters.pattern = $gameVariables.value(patternVariableId);
        }
        var params = DataManager.amnMapParams($dataMap);
        var amnParams = { size:this._amnParameters.size, count:this._amnParameters.count,
                          ox:this._amnParameters.ox, oy:this._amnParameters.oy,
                          mx:this._amnParameters.mx, my:this._amnParameters.my,
                          pattern:this._amnParameters.pattern, color:this._amnParameters.color,
                          picture:this._amnParameters.picture };
        for (var key in params) { amnParams[key] = params[key] }
        return amnParams;
    };

    Game_System.prototype.initAmnParameters = function() {
        this._amnParameters = { size:animeFontSize, count:animeCount, ox:animeOriginalX,
                                oy:animeOriginalY, mx:animeMoveX, my:animeMoveY,
                                pattern:animePattern, color:fillRectColor, picture:backPicture,
                                text:''};
        if (patternVariableId){
            var pattern = this._amnParameters.pattern;
            if (pattern === 'Normal'  || pattern === 0)  $gameVariables._data[patternVariableId] = 0;
            if (pattern === 'Stretch' || pattern === -1) $gameVariables._data[patternVariableId] = -1;
            if (pattern === 'GrowUp'  || pattern === -2) $gameVariables._data[patternVariableId] = -2;
        }
    };
    
    Game_System.prototype.setAmnParameters = function(params) {
        this._amnParameters = params;
    };

    ////////////////////////////////////////////////////////////////////////////////////
    
    var __GInterpreter_update = Game_Interpreter.prototype.update;
    Game_Interpreter.prototype.update = function() {
        __GInterpreter_update.call(this);
        if (this._refreshAmn){
            if (ImageManager.isReady()) {
                this.refreshMapName(this._amnParams);
                this._refreshAmn = false;
                this._amnParams = null;
            }
        }
    };
    
    Game_Interpreter.prototype.animationMapName = function(params) {
        if(params.picture){
            ImageManager.loadPicture(params.picture);
            this._refreshAmn = true;
            this._amnParams = params;
        } else {
            this.refreshMapName(params);
        }
    };

    Game_Interpreter.prototype.refreshMapName = function(params) {
        console.log(params)
        var text = (params.text ? params.text : $gameMap.displayName()) || '';
        var array = CommonPopupManager.window().convertEscapeCharacters(text).split("");
        var a2 = [];
        var flag = false;
        var cflag = false;
        var setIndex = -1;
        var count = 0;
        var s1 = '';
        var aX = 0;
        var aY = 0;
        if (params.pattern === 'GrowUp' || params.pattern == -2) aY = 1.0;
        var pattern = params.pattern;
        var afs = params.size + 8;
        var supY = 0;
        if (params.pattern === 'GrowUp' || params.pattern == -2) supY = afs;
        for(var i=0,max=array.length;i<max;i++){
            if (array[i] === '\x1b') {
                var cnt = a2.length;
                a2[cnt] = array[i];
                for (var j=i;j<max;j++){
                    if (array[j] === ']') {
                        a2[cnt] += ']';
                        //a2[i] = a2[i].replace(/\x1b/,'\\');
                        if (a2[cnt].match(/\x1bI\[\d+\]/i)) count++;
                        i = j;
                        break;
                    } else {
                      a2[cnt] += array[j];
                    }
                }
            } else {
                a2.push(array[i]);
                s1 += array[i];
            }
        }
        
        CommonPopupManager.window().resetFontSettings();
        var fs = params.size;
        var fontStr = '\\FS[' + fs + ']';
        CommonPopupManager.window().drawTextEx(fontStr,0,0);
        var textSize = CommonPopupManager.window().textWidth(s1) + params.size;
        textSize += (params.size * 1.14) * count;
        var bitmap = null;
        var bw = textSize;
        var bh = fs;
        if (params.picture) {
            bitmap = ImageManager.loadPicture(params.picture);
            var arg = CommonPopupManager.setPopup('');
            bw = bitmap.width;
            bh = bitmap.height;
            arg.x = params.ox// + textSize / 2 - bitmap.width / 2;
            arg.y = params.oy + bitmap.height * aY;
            arg.moveX = params.mx;
            arg.moveY = params.my;
            arg.bitmap = bitmap;
            arg.count = params.count;
            arg.extend = [0,arg.count]//[arg.count * 0.2, arg.count * 0.8];
            arg.fixed = false;
            arg.anchorX = aX;
            arg.anchorY = aY;
            arg.pattern = pattern;
            arg.tag = 'AnimationMapName';
            supY += bitmap.height / 2 - afs / 2;
        } else {
            bitmap = new Bitmap(textSize, params.size + 8);

            var xx = 0;
            bitmap.gradientFillRect(xx, 0, bitmap.width / 3, bitmap.height, 'rgba(0,0,0,0)', params.color);
            xx += bitmap.width / 3;
            bitmap.fillRect(xx, 0, bitmap.width / 3, bitmap.height, params.color);
            xx += bitmap.width / 3;
            bitmap.gradientFillRect(xx, 0, bitmap.width / 3, bitmap.height, params.color, 'rgba(0,0,0,0)');

            var arg = CommonPopupManager.setPopup('');
            arg.x = params.ox;
            arg.y = params.oy + supY;
            arg.moveX = params.mx;
            arg.moveY = params.my;
            arg.bitmap = bitmap;
            arg.count = params.count;
            arg.extend = [0,arg.count]//[arg.count * 0.2, arg.count * 0.8];
            arg.fixed = false;
            arg.anchorX = aX;
            arg.anchorY = aY;
            arg.pattern = pattern;
            arg.tag = 'AnimationMapName';
        }
        if(arg) CommonPopupManager._tempCommonSprites.setNullPos(arg);

        var s = Math.floor((params.count*0.4)/s1.length);
        var n = 0;
        var setColor = '';
        var ssupY = (pattern == -2 || pattern === 'GrowUp') ? 4 : 0;
        var bfs = fs;
        var cnt = 0;
        CommonPopupManager.window().contents.fontSize = fs;
        for(var i=0;i<a2.length;i++){
            if (a2[i].match(/\x1bI\[(\d+)\]/i)) a2[i] = '\\I[' + RegExp.$1 + ']';
            if (a2[i].match(/\x1bC\[(\d+)\]/i)) {
                setColor = '\\C[' + RegExp.$1 + ']';
            }else if (a2[i].match(/\x1bFS\[(\d+)\]/i)){
                fs = Number(RegExp.$1);
                fontStr = '\\FS[' + fs + ']';
            }else{
                var fsy = (bfs - fs) / 2;
                if (fsy > 0 && ssupY > 0) fsy -= 8 ;
                var arg = CommonPopupManager.setPopup('');
                var bitmap = new Bitmap(fs+12,fs+12);
                var tx = fontStr + setColor + a2[i];
                CommonPopupManager.window().contents.fontSize = fs;
                var tw = CommonPopupManager.window().textWidth(a2[i]);
                CommonPopupManager.window().contents = bitmap;
                CommonPopupManager.window().drawTextEx(tx,4,0);
                arg.bitmap = bitmap;
                arg.x = params.ox + n + (bw - textSize)/ 2 + 10;
                arg.y = params.oy + supY + ssupY + fsy;
                arg.moveX = params.mx;
                arg.moveY = params.my;
                arg.anchorX = aX;
                arg.anchorY = aY;
                arg.delay = s * (cnt + 1);
                arg.count = Math.floor((params.count-20) - (cnt * s));
                arg.extend = [0,arg.count]//[arg.count*0.2,arg.count*0.8];
                arg.fixed = false;
                arg.pattern = pattern;
                arg.tag = 'AnimationMapName';
                if (a2[i].match(/\\I\[\d+\]/i)){
                    n += 34;
                }else{
                    n += tw;
                }
                CommonPopupManager._tempCommonSprites.setNullPos(arg);
                cnt++;
            }   
        }
    };

    Game_Interpreter.prototype.showAmn = function(args) {
        CommonPopupManager.clearPopup('AnimationMapName');
        var amnParams = DataManager.makeAmnParams($gameSystem.amnParameters(),args);
        this.animationMapName(amnParams);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Map.prototype.showMapName = function() {
        if (this.displayName() !== ''){
            this._interpreter.animationMapName($gameSystem.amnParameters());
        }
    };
    
    Game_Map.prototype.displayRegionAmn = function(params) {
        if(!this.isNameDisplayEnabled()) return;
        var args = params.split(' ');
        args[0] = 'text:' + args[0];
        this._interpreter.showAmn(args);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var _animeMN_GPlayer_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function() {
        _animeMN_GPlayer_performTransfer.call(this);
        if($gameMap.isNameDisplayEnabled()) $gameMap.showMapName();
        $gameTemp._regionAmnArray = null;
        $gameTemp._lastRegionId = null;
    };
    
    var __GPlayer_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        __GPlayer_update.call(this, sceneActive);
        var ri = this.regionId();
        if (this.regionAmnArray(ri) && ri !== $gameTemp._lastRegionId) {
            $gameTemp._lastRegionId = ri;
            if ($dataMap.meta['RegionName'+ri]) {
                $gameMap.displayRegionAmn($dataMap.meta['RegionName'+ri]);
            } else if ($dataMap.meta['リージョンネーム'+ri]){
                $gameMap.displayRegionAmn($dataMap.meta['リージョンネーム'+ri]);
            }
        }
    };

    Game_Player.prototype.regionAmnArray = function(ri) {
        if ($gameTemp._regionAmnArray) return $gameTemp._regionAmnArray[ri];
        $gameTemp._regionAmnArray = [];
        for (var i=1,max=255;i<max;i++){
            if (!$dataMap.meta) break;
            if ($dataMap.meta['RegionName' + i]) $gameTemp._regionAmnArray[i] = true;
            if ($dataMap.meta['リージョンネーム' + i]) $gameTemp._regionAmnArray[i] = true;
        }
        return $gameTemp._regionAmnArray[ri];
    };

    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義　何もしなくする
    Window_MapName.prototype.open = function() {
        //this.refresh();
        this._showCount = 0;
    };

    ////////////////////////////////////////////////////////////////////////////////////

})();
