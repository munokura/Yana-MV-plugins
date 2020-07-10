//
//  立ち絵表示制御文字 ver1.043
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
Imported['StandPictureEC'] = 1.043;

if (!Imported.StandPictureSettingP) {
	console.error('StandPictureSettingPを導入してください。')
}

if (!Imported.StandPictureSettingM) {
	console.error('StandPictureSettingMを導入してください。')
}

/*:
 * @plugindesc ver1.043/立ち絵を表示したり動かしたりする制御文字を追加します。
 * @author Yana
 * 
 * @param Show Front
 * @desc 画像の表示位置Z座標です。
 * メッセージウィンドウより前面に表示する場合はtrueを指定してください。
 * @default false
 * 
 * @param Use Preloading
 * @desc 画像の事前読み込みを行うかの設定です。trueにすると、マップ切り替え時にイベントをチェックし、キャッシュを作成します。
 * @default true
 * 
 * @param Use Delete Cache
 * @desc マップ切り替え時に使用した画像のキャッシュを削除するかの設定です。trueにするとマップ切り替え毎にキャッシュを削除します。
 * @default true
 * 
 * @param Default Anchor X
 * @desc ピクチャのアンカー位置Xです。
 * デフォルトは0.5(画像の中心)です。0~1.0で指定してください。
 * @default 0.5
 * 
 * @param Default Anchor Y
 * @desc ピクチャのアンカー位置Yです。
 * デフォルトは1.0(画像の下端)です。0~1.0で指定してください。
 * @default 1.0
 * 
 * @param Default Opacity
 * @desc ピクチャの透明度の初期値です。
 * デフォルトは0(非表示)です。0~255で指定してください。
 * @default 0
 * 
 * @param Proxy Variable ID
 * @desc \PVの制御文字がこの数値と置き換わります。
 * 同じマクロを使いまわしたり、汎用性を上げるための仕組みです。
 * @default 1
 * 
 * @param Cursor Name
 * @desc スプライト選択時にカーソルとして使用する画像名です。
 * img/system/内に指定した画像を配置してください。
 * @default cursor
 * @require 1
 * @dir img/system/
 * @type file
 * 
 * 
 * @help------------------------------------------------------
 *  プラグインコマンド
 * ------------------------------------------------------
 * 
 * ・スプライトをクリックで選択するための状態にする。
 * ChoicePicture 変数ID キャンセル許可状態
 * 
 * このプラグインコマンドは、必ずメッセージを表示して、制御文字でスプライトを表示した状態で呼び出してください。
 * コントローラや十字キーでカーソルを動かすと、専用のカーソルスプライトが表示されます。
 * キャンセル許可状態は、ture または false で指定してください。
 * falseの場合は省略することもできます。
 * また、画像名の項目で空欄を指定することで、カーソルによる選択自体を無効化することができます。
 * cursor.pngの画像データはimg/pictures/systemに配置してください。
 * 
 * ------------------------------------------------------
 *　注意
 * ------------------------------------------------------
 * 
 * このプラグインが動作するためには、StandPictureSettingP及び、
 * StandPictureSettingMのプラグインが必要です。
 * 各プラグインは、
 * 
 * StandPictureSettingP
 * StandPictureSettingM
 * StandPictureEC
 * 
 * の順番で配置してください。
 * 
 * ------------------------------------------------------
 *　使い方
 * ------------------------------------------------------
 * 
 * 用意する画像のファイル名は
 * ○○○_×
 * として、img/picturesに用意してください。
 * ○○○の部分がStandPictureSettingPで設定したファイル名、
 * xの部分は画像インデックスになります。
 * このインデックスで瞬きや口パクなどの画像の切り替えを行います。
 * 瞬きや口パクを行わない場合はインデックスを付ける必要はありません。
 * 例:設定したファイル名がtest0の場合、test0.pngをimg/picturesに用意する。
 * 例:ファイル名がtest1で、[0,1,0]と瞬きをする場合、test1_0.pngとtest1_1.pngを用意する。
 * 
 * ※ver1.02より、img/pictures以外からも読み込めるようになりました。
 * 読み込むフォルダ/ファイル名 と指定することで、pictures以外のフォルダからも読み込めます。
 * 例:battleback1/DarkSpace
 * 
 * ver1.01より、事前ロードの設定とキャッシュ削除の設定が追加されました。
 * Use Preloadingをtrueにすると、Game_Mapのsetup実行時にそのマップで使われる可能性のある、
 * 全ての画像を抽出し、キャッシュを作成しておきます。
 * これにより、ブラウザなどで実行したとき、ロード待ちで画像が表示されないということが少なくなります。
 * (場所移動を行った直後にメッセージを表示して、立ち絵を使用すると発生する可能性があります)
 * Use Delete Cacheをtrueにすると、Game_Mapのsetup実行時に前回のマップで生成した、
 * 立ち絵画像のキャッシュをImageManager._cacheから削除します。
 * これを行うことで、メモリにかかる負担が減りますが、ブラウザで実行した場合、
 * 再生成時に通信が発生するため、通信量が増加します。
 * 通信量の上限が決まっている環境で実行される可能性がある場合、falseを推奨します。
 * 
 * ------------------------------------------------------
 *　追加制御文字
 * ------------------------------------------------------
 * 
 * ---画像操作系---
 * \SP[index,x,y]
 * StandPictureSettingPで設定したindex番のスプライトをx,yに表示します。
 * スプライトのアンカーはx=0.5,y=1.0に設定されているため、
 * スプライトの下側中央を基準として設定してください。
 * ※ver1.01よりアンカー位置を設定可能になりました。
 * indexに-1を指定すると、何も行いません。
 * 
 * \HP[index]
 * StandPictureSettingPで設定したindex番のスプライトを非表示にします。
 * 
 * \MP[index,x,y,duration]
 * index番目のスプライトを画面のx,yの位置にdurationフレームかけて動かします。
 * durationを省略した場合、一瞬で移動します。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトを動かします。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * 
 * \RMP[index,x,y,duration]
 * index番目のスプライトをx,yの数値分、durationフレームかけて動かします。
 * こちらはMPとは違い、相対値でスプライトを移動するための制御文字です。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、一瞬で移動します。
 * 
 * \TP[index,duration]
 * index番目のスプライトをdurationフレームかけて反転します。
 * durationを省略した場合、瞬時に反転します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトを反転します。
 * 
 * \OP[index,opacity,duration]
 * index番目のスプライトの透明度をdurationフレームかけてopacityにします。
 * durationを省略した場合、瞬時に透明度が変化します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトの透明度を変更します。
 * 
 * \AP[index,animationId,mirror]
 * index番目のスプライトにanimationId番のアニメを表示します。
 * mirrorに1を指定すると、アニメが反転します。
 * 
 * \CP[index,nIndex,duration]
 * index番目のスプライトをnIndex番目のスプライトにdurationフレームかけて変更します。
 * 変更する際、反転して入れ替わるようなアクションをします。
 * durationを省略した場合、瞬時に画像を変更します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * スプライトのIDは最初に決めたものから変わらないため、注意が必要です。
 * 
 * \CFP[index,nIndex,duration]
 * index番目のスプライトをnIndex番目のスプライトにdurationフレームかけて変更します。
 * 変更する際、フェードして入れ替わるようなアクションをします。
 * durationを省略した場合、瞬時に画像を変更します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * スプライトのIDは最初に決めたものから変わらないため、注意が必要です。
 * 
 * \COP[index,red,green,blue,gray,duration]
 * index番目のスプライトのColorToneをred,green,blue,grayにdurationフレームかけて変更します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、瞬時にColorToneが変更されます。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトのColorToneを変更します。 
 *
 * \BCP[index,red,green,blue,alpha,duration]
 * index番目のスプライトのBlendColorをred,green,blue,alphaにdurationフレームかけて変更します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、瞬時にBlendColorが変更されます。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトのBlendColorを変更します。 
 * 
 * \ZP[index,zoomX,zoomY,duration]
 * index番目のスプライトのScaleをzoomX%,zoomY%にdurationフレームかけて変更します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、瞬時Scaleが変更されます。
 * 拡大はanchorを基準として行われます。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトを拡縮します。
 * 
 * \RZP[index,zoomX,zoomY,duration]
 * index番目のスプライトのScaleをzoomX%,zoomY%の数値分、durationフレームかけて増加(減少)します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、瞬時Scaleが変更されます。
 * 拡大はanchorを基準として行われます。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトを拡縮します。
 * 
 * \RP[index,angle,duration]
 * index番目のスプライトのRotationをangle°にdurationフレームかけて変更します。
 * rotationの数値は通常ラジアンで設定しますが、ここの数値は角度で設定してください。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、瞬時にRotationが変更されます。
 * 回転はanchorを基準として行われます。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトを回転します。
 * 
 * \RRP[index,angle,duration]
 * index番目のスプライトのRotationをangle°の数値分、durationフレームかけて増加(減少)します。
 * rotationの数値は通常ラジアンで設定しますが、ここの数値は角度で設定してください。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、瞬時にRotationが変更されます。
 * 回転はanchorを基準として行われます。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトを回転します。
 * 
 * \BP[index,index1,index2,index3…]
 * index番目のスプライトをマスターとして、index1,index2,index3…をグループ化します。
 * また、グループ化を行った際、グループ化されたスプライトのanchorをマスター画像のanchorに同期します。
 * これにより、拡大や回転、反転等の動作が正常に行われるようになります。
 * 
 * \LS[index]
 * index番目のスプライトの口パクをスタートします。
 * グループ化されている場合、マスター画像に設定すれば、グループ化されたほかの画像も口パク状態になります。
 * 
 * \LE[index]
 * index番目のスプライトの口パクを止めます。
 * 
 * \SFR[index]
 * index番目のスプライトを最前面に移動します。
 * 
 * \SBK[index]
 * index番目のスプライトを最背面に移動します。
 * 
 * ---カメラ操作系---
 * \MC[x,y,duration]
 * カメラをx,yの位置にdurationフレームかけて移動します。
 * 
 * \RMC[x,y,duration]
 * カメラをx,yの数値分だけdurationフレームかけて移動します。
 * 数値が相対値なこと以外は、\MCと同じです。
 * 
 * \RC[angle,duration]
 * カメラをangle°にdurationフレームかけて回転します。
 * 
 * \RRC[angle,duration]
 * カメラをangleの数値分だけ、durationフレームかけて回転します。
 * 数値が相対値なこと以外は\RCと同じです。
 * 
 * \RPC[x,y,angle,duration]
 * カメラのアンカーをx,yに変更したうえで、カメラをangle°にdurationフレームかけて回転します。
 * 要するに、x,yを中心としてカメラを回転します。
 * 
 * \ZC[zx,zy,duration]
 * カメラのスケールをzx%,zy%にdurationフレームかけて変更します。
 * 
 * \ZPC[x,y,zx,zy,duration]
 * カメラのアンカーをx,yに変更したうえで、カメラのスケールをzx%,zy%にdurationフレームかけて変更します。
 * 要するに、x,yを中心として、スケールを変更します。
 * 
 * \SAC[x,y]
 * カメラのアンカーをx,yに変更します。見た目上は一切変化はありません。
 * 
 * ---置き換え、その他系---
 * \SM[index]
 * StandPictureSettingMで設定したindex番のテキストに置き換えられます。
 * 
 * \VI[id,num]
 * ID番の変数の中身にnumの数値を加算した値に変換します。
 * 
 * \WT[duration]
 * durationフレームWaitします。
 * 
 * \PV
 * プラグインの設定で指定した数値に置き換わります。
 * マクロを汎用的に使用するための仕組みです。
 * 
 * \NNUM[num]
 * numの数値を―1を掛けた数値に変更します。
 * durationのウエイト指定や、indexのそれ以外の指定などに使います。
 * 
 * \CALC[formula]
 * formulaをevalで計算します。
 * 
 * \BXW
 * 画面の横幅(Graphics.boxWidth)に変換されます。
 * 
 * \BXH
 * 画面の縦幅(Graphics.boxHeight)に変換されます。
 * 
 * \MWW
 * メッセージウィンドウの横幅(Message_Window.width)に変換されます。
 * 
 * \MWH
 * メッセージウィンドウの縦幅(Message_Window.height)に変換されます。
 * 
 * \MWX
 * メッセージウィンドウのX座標に変換されます。
 * 
 * \MWY
 * メッセージウィンドウのY座標に変換されます。
 * 
 * _N_
 * \に変換されます。\\が正常に機能しなかったため、追加しました。
 * 
 * ------------------------------------------------------
 *　既知の不具合
 * ------------------------------------------------------
 * 
 * \SPをウエイト無しで連続で呼び出すと、メッセージを高速スキップした際、エラーが発生します。
 * 間に\WT[1]等、ウエイトを追加することで、回避することが可能です。
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
 * ver1.043:
 * バージョン1.3.0に対応。
 * ver1.042:
 * 既に表示している立ち絵番号にもう一度SPをした際、前の立ち絵が消えないバグを修正。
 * いくつかのバグっぽい部分を修正。
 * YEP_MessageCoreとの併用化処理を追加。
 * ver1.04:
 * カメラを操作する制御文字を追加。
 * \MCの制御文字を追加。
 * \RMCの制御文字を追加。
 * \RCの制御文字を追加。
 * \RRCの制御文字を追加。
 * \ZCの制御文字を追加。
 * \RPCの制御文字を追加。
 * \ZPCの制御文字を追加。
 * \SACの制御文字を追加。
 * 全体的に処理方法をスタックに変更。
 * ChoicePictureが回転した画像を正常に判定できなかったバグを修正。
 * 画像操作の制御文字で、存在しない画像IDが指定された際エラーが出ないように変更。
 * キャッシュ生成時、イベントコマンドのスイッチ操作を使用していたのを直接操作するものに変更。
 * ver1.03:
 * 新しいプラグインコマンド、ChoicePictureを追加。
 * 画面サイズがデフォルト以外のとき、表示がずれるバグを修正。
 * 設定されていないピクチャを読み込んだ際、コンソールにログを出力し、エラーが発生しないように修正。
 * フォルダパスの一部が大文字になっていて特定の環境に出力した際、エラーが発生するバグを修正。
 * ピクチャを表示したまま戦闘に突入すると、ピクチャが背景に残ってしまうバグを修正。
 * ver1.02:
 * 呼び出した際の透明度の初期値の設定を追加。
 * \PVで変換される数値を設定するための項目を追加。
 * \RMPの制御文字を追加。
 * \RZPの制御文字を追加。
 * \RRPの制御文字を追加。
 * \CFPの制御文字を追加。
 * \SFRの制御文字を追加。
 * \SBKの制御文字を追加。
 * \WTの制御文字を追加。
 * \PVの制御文字を追加。
 * \CALCの制御文字を追加。
 * \BXW,\BXH,\MWW,\MWH,\MWX,\MWYの制御文字を追加。
 * \NNUMの制御文字を追加。
 * \MP,\OP,\TP,\COP,\BCP\RPに機能を追加。
 * \MPをduration0で使用時、グループ化されたスプライトが正常に追随しないバグを修正。
 * 処理を修正、スプライトの関連付けをメッセージウィンドウからスプライトセットかシーンに変更
 * ver1.01:
 * 事前ロードを行う設定を追加。
 * アンカー位置の設定を追加。
 * 使用した画像キャッシュを削除する仕組みを追加。
 * 画像表示をメッセージウィンドウより手前か、後ろかを設定するための項目を追加。
 * \BCPの制御文字を追加。
 * \ZPの制御文字を追加。
 * \RPの制御文字を追加。
 * ver1.00:
 * 公開
 */

(function(){
	
	var parameters = PluginManager.parameters('StandPictureEC');
	var showFront = String(parameters['Show Front']) === 'true';
	var usePreloading = String(parameters['Use Preloading']) === 'true';
	var useDeleteCache = String(parameters['Use Delete Cache']) === 'true';
	var defaultAnchorX = Number(parameters['Default Anchor X']);
	var defaultAnchorY = Number(parameters['Default Anchor Y']);
	var defaultOpacity = Number(parameters['Default Opacity']);
	var proxyVariableId = Number(parameters['Proxy Variable ID']);
	var cursorName = String(parameters['Cursor Name']);
	
	function Sprite_StPic() {
		this.initialize.apply(this, arguments);
	};

	Sprite_StPic.prototype = Object.create(Sprite_Base.prototype);
	Sprite_StPic.prototype.constructor = Sprite_StPic;
	
	Sprite_StPic.prototype.initialize = function(id){
		Sprite_Base.prototype.initialize.call(this);
		this.initMembers(id);
	};
	
	Sprite_StPic.prototype.initMembers = function(id){
		this._id = id;
		this._pictureArray = StPicManager.picture(id);
		this.setBitmap(0);
		this._blink = false;
		this._pause = false;
		this._lip = false;
		this._stopLip = false;
		this._bindPic = [];
		this._bCount = 0;
		this._lCount = 0;
		
		this.anchor.x = defaultAnchorX;
		this.anchor.y = defaultAnchorY; 
		this.z = -10;
		this.opacity = defaultOpacity;
		this._stack = [];
	};
	
	Sprite_StPic.prototype.setBitmap = function(index){
		var picName = this.pictureName(index);
		if (picName.match(/\//)) {
			var name = picName.split('/');
			var folder = 'img/' + name[0] + '/';
			this.bitmap = ImageManager.loadBitmap(folder, name[1], null, true);
		} else {
			this.bitmap = ImageManager.loadPicture(picName);
		}
		this.setFrame(0,0,this.bitmap.width,this.bitmap.height);
	};
	
	Sprite_StPic.prototype.pictureName = function(index){
		if (!!this._pictureArray[1]) {
			return this._pictureArray[0] + '_' + index;	
		} else {
			return this._pictureArray[0];
		}
	};

	Sprite_StPic.prototype.update = function(){
		var updates = [this.updateMove,this.updateOpacity,null,null,
					   this.updateTurn,this.updateChange,
					   this.updateColor,this.updateBlend,
					   this.updateZoom,this.updateRotation,
					   this.updateChangeFade];
		Sprite_Base.prototype.update.call(this);
		this.updateBlink();
		if (this._lip){ this.updateLip() }
		if (this._stack.length === 0){ return }
		for (var i=0;i<this._stack.length;i++){
			var obj = this._stack[i];
			if (obj.dur > 0){ updates[obj.index].call(this,obj) }
			if (obj.dur <= 0){ this._stack[i] = null }
			if (obj.delay > 0){
				obj.delay--;
				break;
			}
		}
		var ary = [];
		for (var i=0;i<this._stack.length;i++){
			if (this._stack[i] !== null) { ary.push(this._stack[i]) }
		}
		this._stack = ary;
	};
	
	Sprite_StPic.prototype.updateBlink = function(){
		var b = this._pictureArray.filter(function(a){
			return a[0] === 'blink';
		});
		if (b.length > 0){
			b = b[0];
			if ((Graphics.frameCount % b[1]) === 0 && Math.randomInt(b[2]) === 0 && !this._blink){
				this._blink = true;
				this._bCount = 0;
			}
			if (this._blink){
				if (this._bCount >= b[3].length){
					this._blink = false;
					return;
				}
				var bindex = b[3][this._bCount];
				this.setBitmap(bindex);
				this._bCount++;
			}
		}
	};
	
	Sprite_StPic.prototype.updateLip = function(){
		if (this._pause){
			this._lip = false;
			this.setBitmap(0);
			return;
		}else if (this._stopLip){
			this.setBitmap(0);
			return
		}
		var l = this._pictureArray.filter(function(a){
			return a[0] === 'lip';
		});
		if (l.length > 0){
			l = l[0];
			if (Math.randomInt(l[2]) !== 0){ return }
			if (Graphics.frameCount % l[1] !== 0){ return }
			var lindex = l[3][this._lCount];
			this.setBitmap(lindex);
			this._lCount++;
			if (this._lCount === l[3].length){ this._lCount = 0 }
		}else{
			this._lip = false;
		}
	};
	
	Sprite_StPic.prototype.updateMove = function(obj){
		if (!obj){ return }
		if (obj.dur === obj.mDur){
			obj.bx = this.x;
			obj.by = this.y;
			if (obj.relative){
				obj.x = obj.bx + obj.x;
				obj.y = obj.by + obj.y;
			}
			obj.xSpeed = (obj.x - obj.bx) / obj.mDur;
			obj.ySpeed = (obj.y - obj.by) / obj.mDur;
		}
		obj.dur--;
		var count = obj.mDur - obj.dur;
		var xx = obj.bx + obj.xSpeed * count;
		var yy = obj.by + obj.ySpeed * count;
		this.x = xx;
		this.y = yy;
	};
	
	Sprite_StPic.prototype.updateOpacity = function(obj){
		if (!obj){ return }
		if (obj.dur === obj.mDur){
			obj.bO = this.opacity;
			if (obj.relative) {
				obj.opacity = obj.bO + obj.opacity;
			}
			obj.oSpeed = (obj.opacity - obj.bO) / obj.mDur;
		}
		obj.dur--;
		var count = obj.mDur - obj.dur;
		this.opacity = obj.bO + obj.oSpeed * count;
	};
	
	Sprite_StPic.prototype.updateTurn = function(obj){
		if (!obj){ return }
		if (obj.dur === obj.mDur){
			obj.bsx = this.scale.x;
			obj.tSpeed = obj.bsx / (obj.mDur /2);
		}
		obj.dur--;
		var count = obj.mDur - obj.dur;
		var zX = obj.bsx - (obj.tSpeed * count);
		this.scale = new Point( zX, this.scale.y);
	};
	
	Sprite_StPic.prototype.updateChange = function(obj){
		if (!obj){ return }
		if (obj.dur === obj.mDur){
			obj.bsx = this.scale.x;
			obj.cSpeed = obj.bsx / (obj.mDur / 2);
		}
		obj.dur--;
		var count = obj.mDur - obj.dur;
		var zX = Math.abs(obj.bsx - (obj.cSpeed * count));
		this.scale = new Point( zX, this.scale.y);
		if (count === obj.dur){ this.changePic(obj.cId) }
	};
	
	Sprite_StPic.prototype.updateChangeFade = function(obj){
		if (!obj){ return }
		if (obj.dur === obj.mDur){
			obj.bo = this.opacity;
			obj.cfSpeed = obj.bo / (obj.mDur / 2);
		}
		obj.dur--;
		var count = obj.mDur - obj.dur;
		var zO = Math.abs(obj.bo - (obj.cfSpeed * count));
		this.opacity = zO;
		if (count === obj.dur){ this.changePic(obj.cId) }
	};
	
	Sprite_StPic.prototype.updateColor = function(obj){
		if (!obj){ return }
		if (obj.dur === obj.mDur){
			obj.coColor = this.getColorTone();
			if (obj.relative){
				obj.color[0] = obj.coColor[0] + obj.color[0];
				obj.color[1] = obj.coColor[1] + obj.color[1];
				obj.color[2] = obj.coColor[2] + obj.color[2];
				obj.color[3] = obj.coColor[3] + obj.color[3];
			}
			obj.coSpeed = [
				(obj.color[0] - obj.coColor[0]) / obj.mDur,
				(obj.color[1] - obj.coColor[1]) / obj.mDur,
				(obj.color[2] - obj.coColor[2]) / obj.mDur,
				(obj.color[3] - obj.coColor[3]) / obj.mDur
			];	
		}
		obj.dur--;
		var count = obj.mDur - obj.dur;
		var red   = obj.coColor[0] + obj.coSpeed[0] * count;
		var green = obj.coColor[1] + obj.coSpeed[1] * count;
		var blue  = obj.coColor[2] + obj.coSpeed[2] * count;
		var gray  = obj.coColor[3] + obj.coSpeed[3] * count;
		this.setColorTone([red,green,blue,gray]);
	};
	
	Sprite_StPic.prototype.updateBlend = function(obj){
		if (!obj){ return }
		if (obj.dur === obj.mDur){
			obj.coColor = this.getBlendColor();
			if (obj.relative){
				obj.color[0] = obj.coColor[0] + obj.color[0];
				obj.color[1] = obj.coColor[1] + obj.color[1];
				obj.color[2] = obj.coColor[2] + obj.color[2];
				obj.color[3] = obj.coColor[3] + obj.color[3];
			}
			obj.bcSpeed = [
				(obj.color[0] - obj.coColor[0]) / obj.mDur,
				(obj.color[1] - obj.coColor[1]) / obj.mDur,
				(obj.color[2] - obj.coColor[2]) / obj.mDur,
				(obj.color[3] - obj.coColor[3]) / obj.mDur
			];	
		}
		obj.dur--;
		var count = obj.mDur - obj.dur;
		var red    = obj.coColor[0] + obj.bcSpeed[0] * count;
		var green  = obj.coColor[1] + obj.bcSpeed[1] * count;
		var blue   = obj.coColor[2] + obj.bcSpeed[2] * count;
		var alpha  = obj.coColor[3] + obj.bcSpeed[3] * count;
		this.setBlendColor([red,green,blue,alpha]);
	};
	
	Sprite_StPic.prototype.updateZoom = function(obj){
		if (!obj){ return }
		if (obj.dur === obj.mDur){
			obj.zsx = this.scale.x;
			obj.zsy = this.scale.y;
			if (obj.relative){
				obj.zx = obj.zsx + obj.zx;
				obj.zy = obj.zsy + obj.zy;
			}
			obj.zSpeed = [
				(obj.zx - obj.zsx) / obj.mDur,
				(obj.zy - obj.zsy) / obj.mDur
			];
		}
		obj.dur--;
		var count = obj.mDur - obj.dur;
		var zX = obj.zsx + (obj.zSpeed[0] * count);
		var zY = obj.zsy + (obj.zSpeed[1] * count);
		this.scale = new Point( zX, zY);
	};
	
	Sprite_StPic.prototype.updateRotation = function(obj){
		if (!obj){ return }
		if (obj.dur === obj.mDur){
			obj.bR = this.rotation;
			if (obj.relative){
				obj.rotate = obj.bR + obj.rotate;
			}
			obj.rSpeed = (obj.rotate - obj.bR) / obj.mDur;
		}
		obj.dur--;
		var count = obj.mDur - obj.dur;
		this.rotation = obj.bR + (obj.rSpeed * count);
	};
	
	Sprite_StPic.prototype.setParam = function(arg){
		var duration = arg[1];
		var delay = 0;
		if (!duration){ duration = 0 }
		if (duration < 0){
			duration = Math.abs(duration);
			delay = duration;
		}
		var obj = {
			'index':arg[0],
			'dur':duration,
			'mDur':duration,
			'delay':delay
		};
		switch (arg[0]){
		case 0:
		case 11:
			obj.x = arg[2];
			obj.y = arg[3];
			break;
		case 1:
			obj.opacity = arg[2];
			break;
		case 5:
		case 10:
			obj.cId = arg[2];
			break;
		case 6:
		case 7:
			obj.color = arg[2];
			break;
		case 8:
			obj.zx = arg[2];
			obj.zy = arg[3];
			break;
		case 9:
			obj.rotate = arg[2];
			break;
		}
		return obj;
	};
	
	Sprite_StPic.prototype.setMove = function(xx,yy,duration,relative){
		if (!xx){ xx = 0 }
		if (!yy){ yy = 0 }
		
		var obj = this.setParam([0,duration,xx,yy]);
		obj.relative = relative;
		
		if (obj.dur < 1){ 
			this.x = xx;
			this.y = yy;
		} else {
			this._stack.push(obj);
		}
	};
	
	Sprite_StPic.prototype.setOpacity = function(opacity,duration,relative){
		var obj = this.setParam([1,duration,opacity]);
		obj.relative = relative;
		this._stack.push(obj);
	};
	
	Sprite_StPic.prototype.setTurn = function(duration){
		var obj = this.setParam([4,duration]);
		this._stack.push(obj);
	};
	
	Sprite_StPic.prototype.setChange = function(index,duration){
		var obj = this.setParam([5,duration,index]);
		this._stack.push(obj);
	};
	
	Sprite_StPic.prototype.setChangeFade = function(index,duration){
		var obj = this.setParam([10,duration,index]);
		this._stack.push(obj);
	};
	
	Sprite_StPic.prototype.setColor = function(colors,duration,relative){
		var obj = this.setParam([6,duration,colors]);
		obj.relative = relative;
		this._stack.push(obj);
	};
	
	Sprite_StPic.prototype.setBlend = function(colors,duration,relative){
		var obj = this.setParam([7,duration,colors]);
		obj.relative = relative;
		this._stack.push(obj);
	};
	
	Sprite_StPic.prototype.setZoom = function(zx,zy,duration,relative){
		var obj = this.setParam([8,duration,zx/100,zy/100]);
		obj.relative = relative;
		this._stack.push(obj);
	};
		
	Sprite_StPic.prototype.setRotation = function(rotate,duration,relative){
		var obj = this.setParam([9,duration,rotate]);
		obj.relative = relative;
		this._stack.push(obj);
	};
	
	Sprite_StPic.prototype.changePic = function(index){
		this._id = index;
		this._pictureArray = StPicManager.picture(this._id);
		this.setBitmap(0);
		this._blink = this._pictureArray.filter(function(a){
			return a[0] === 'blink'
		}).length > 0;
		this._bCount = 1;
	};
	
	Sprite_StPic.prototype.setLip = function(){
		this._stopLip = false;
		this._lip = true;
		this._lCount = 0;
	};
	
	Sprite_StPic.prototype.setLipEnd = function(){
		this._stopLip = true;
	};
	
	Sprite_StPic.prototype.maxDelay = function(){
		var delay = 0;
		for(var i=0;i<this._stack.length;i++){
			var obj = this._stack[i];
			if (obj.delay > delay){ delay = obj.delay }
		}
		return delay;
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	var _stPic_WBase_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
	Window_Base.prototype.convertEscapeCharacters = function(text){
		text = _stPic_WBase_convertEscapeCharacters.call(this, text);
		text = text.replace(/\x1bVI\[(\d+),(-?\d+)\]/gi,function() {
			return ($gameVariables.value(parseInt(arguments[1])) + parseInt(arguments[2]));
		}.bind(this));
		return text;
	};
	
	
	Window_Base.prototype.obtainEscapeParams = function(textState){
		var arr = /\[(.+?)\]/.exec(textState.text.slice(textState.index));
		if (arr){
			textState.index += arr[0].length;
			var result = [];
			while(arr[1].match(/-?\d+/)){
				arr[1] = arr[1].replace(/(-?\d+)/,'');
				result.push(parseInt(RegExp.$1));
			}
			return result;
		}else{
			return '';
		}
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	var _stPic_WMessage_initialize = Window_Message.prototype.initialize;
	Window_Message.prototype.initialize = function(){
		_stPic_WMessage_initialize.call(this);
		this._spriteStPics = {};
	};
	
	Window_Message.prototype.clearPic = function(){
		for (var i in this._spriteStPics){
			if (this._spriteStPics[i]){
				this.removeStSprite(this._spriteStPics[i]);
				//this.removeChild(this._spriteStPics[i]);
			}
		}
		this._spriteStPics = {};
	};
	
	var _stPic_WMessage_close = Window_Message.prototype.close;
	Window_Message.prototype.close = function(){
		_stPic_WMessage_close.call(this);
		this._picClearCount = Graphics.frameCount;
	};
	
	Window_Message.prototype.convertEscapeCharacters = function(text){
    	text = text.replace(/\\/g, '\x1b');
    	text = text.replace(/\x1b\x1b/g, '\\');
    	text = text.replace(/\x1bPV/gi,proxyVariableId);
    	text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
   		text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
		text = text.replace(/\x1bSM\[(\d+)\]/gi, function() {
			return this.stPicMacro(parseInt(arguments[1]));
		}.bind(this));
    	text = text.replace(/\\/g, '\x1b');
    	text = text.replace(/\x1b\x1b/g, '\\');
    	text = text.replace(/\x1bPV/gi,proxyVariableId);
    	text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
   		text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
		
		text = text.replace(/\x1bBXW/gi,Graphics.boxWidth);
		text = text.replace(/\x1bBXH/gi,Graphics.boxHeight);
		text = text.replace(/\x1bMWW/gi,this.width);
		text = text.replace(/\x1bMWH/gi,this.height);
		text = text.replace(/\x1bMWX/gi,this.x);
		text = text.replace(/\x1bMWY/gi,this.y);
		text = text.replace(/\x1bCALC\[(.+?)\]/gi, function() {
			var t = eval(arguments[1]);
			return t ? t : '';
		}.bind(this));
		
		text = Window_Base.prototype.convertEscapeCharacters.call(this,text);
		
		text = text.replace(/\x1bNNUM\[(-?\d+)\]/gi, function() {
			return parseInt(arguments[1]) * -1;
		}.bind(this));
		
		text = text.replace(/_N_/gi,'\\');

        if (Imported.YEP_MessageCore){
            text = this.convertNameBox(text);
            text = this.convertMessageCharacters(text);
        }
		
		return text;
	};
	
	Window_Message.prototype.stPicMacro = function(index){
		return StPicManager.macro(index);
	};
	
	var _stPic_WMessage_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
	Window_Message.prototype.processEscapeCharacter = function(code, textState){
		switch(code){
		// ウエイト
		case 'WT':
			this.startWait(this.obtainEscapeParam(textState));
			break;
		// ピクチャ表示
		case 'SP':
			this.processShowPic(this.obtainEscapeParams(textState));
			break;
		// ピクチャ削除
		case 'HP':
			this.processHidePic(this.obtainEscapeParam(textState));
			break;
		// ピクチャ移動
		case 'MP':
			this.processMovePic(this.obtainEscapeParams(textState));
			break;
		// ピクチャ移動(相対)
		case 'RMP':
			this.processRelativeMovePic(this.obtainEscapeParams(textState));
			break;
		// ピクチャ反転
		case 'TP':
			this.processTurnPic(this.obtainEscapeParams(textState));
			break;
		// ピクチャ透明度変更
		case 'OP':
			this.processOpacityPic(this.obtainEscapeParams(textState));
			break;
		// ピクチャアニメーション表示
		case 'AP':
			this.processAnimationPic(this.obtainEscapeParams(textState));
			break;
		// ピクチャ変更(ターン)
		case 'CP':
			this.processChangePic(this.obtainEscapeParams(textState));
			break;
		// ピクチャ変更(フェード)
		case 'CFP':
			this.processChangeFadePic(this.obtainEscapeParams(textState));
			break;
		// ピクチャカラー変更
		case 'COP':
			this.processColorPic(this.obtainEscapeParams(textState));
			break;
		// ピクチャブレンドカラー変更
		case 'BCP':
			this.processBlendColorPic(this.obtainEscapeParams(textState));
			break;
		// ピクチャ拡縮
		case 'ZP':
			this.processZoomPic(this.obtainEscapeParams(textState));
			break;
		// ピクチャ拡縮(相対)
		case 'RZP':
			this.processRelativeZoomPic(this.obtainEscapeParams(textState));
			break;
		// ピクチャ回転
		case 'RP':
			this.processRotationPic(this.obtainEscapeParams(textState));
			break;
		// ピクチャ回転(相対)
		case 'RRP':
			this.processRelativeRotationPic(this.obtainEscapeParams(textState));
			break;
		// 口パクスタート
		case 'LS':
			this.processLipStartPic(this.obtainEscapeParam(textState));
			break;
		// 口パクエンド
		case 'LE':
			this.processLipEndPic(this.obtainEscapeParam(textState));
			break;
		// ピクチャグループ化
		case 'BP':
			this.processSetBindPic(this.obtainEscapeParams(textState));
			break;
		// ピクチャを最前面へ
		case 'SFR':
			this.processShowFrontPic(this.obtainEscapeParam(textState));
			break;
		// ピクチャを最背面へ
		case 'SBK':
			this.processShowBackPic(this.obtainEscapeParam(textState));
			break;
		// カメラ移動
		case 'MC':
			this.processMoveCamera(this.obtainEscapeParams(textState));
			break;
		// カメラ移動(相対)
		case 'RMC':
			this.processRelativeMoveCamera(this.obtainEscapeParams(textState));
			break;
		case 'TC':
			this.processTurnCamera(this.obtainEscapeParam(textState));
			break;
		// カメラ拡縮
		case 'ZC':
			this.processZoomCamera(this.obtainEscapeParams(textState));
			break;
		// カメラ拡縮(相対)
		case 'RZC':
			this.processRelativeZoomCamera(this.obtainEscapeParams(textState));
			break;
		// カメラアンカー設定
		case 'SAC':
			this.processSetAnchorCamera(this.obtainEscapeParams(textState));
			break;
		// カメラ回転
		case 'RC':
			this.processRotateCamera(this.obtainEscapeParams(textState));
			break;
		// カメラ回転(相対)
		case 'RRC':
			this.processRelativeRotateCamera(this.obtainEscapeParams(textState));
			break;
		// カメラポイント指定拡縮
		case 'ZPC':
			this.processPointZoomCamera(this.obtainEscapeParams(textState));
			break;
		// カメラポイント指定回転
		case 'RPC':
			this.processPointRotateCamera(this.obtainEscapeParams(textState));
			break;
		default:
			_stPic_WMessage_processEscapeCharacter.call(this, code, textState);
			break;
		}
	};
	
	Window_Message.prototype.processShowPic = function(ary){
		if (Number(ary[0]) <= -1) { return }
		if (this._spriteStPics[ary[0]]) this.removeStSprite(this._spriteStPics[ary[0]]);
		var sprite = new Sprite_StPic(ary[0]);
		sprite.x = ary[1] !== undefined ? ary[1] : Graphics.boxWidth * defaultAnchorX;
		sprite.y = (ary[2] !== undefined ? ary[2] : Graphics.boxHeight * defaultAnchorY - this.height);
		sprite.x -= (this.camera().anchor.x * this.camera().width);
		sprite.y -= (this.camera().anchor.y * this.camera().height);
		sprite.z = this.stPicLength();
		this.addStSprite(sprite);
		this._spriteStPics[ary[0]] = sprite;
	};
	
	Window_Message.prototype.addStSprite = function(sprite) {
		SceneManager._scene.addStPic(sprite);
	};
	
	Window_Message.prototype.removeStSprite = function(sprite) {
		SceneManager._scene.removeStPic(sprite);
	};
	
	Window_Message.prototype.stPicLength = function() {
		var count = 0;
		for (var i in this._spriteStPics){
			if (this._spriteStPics[i]) { count++ }
		}
		return count;
	};
	
	Window_Message.prototype.processHidePic = function(id){
		if (this._spriteStPics[id]){
			if (this._hidePics === undefined){ this._hidePics = [] }
			this._hidePics.push(id);
		}
	};
	
	Window_Message.prototype.processMovePic = function(ary){
		//ary[2] -= this.y;
		ary[1] -= (this.camera().anchor.x * this.camera().width);
		ary[2] -= (this.camera().anchor.y * this.camera().height);
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]]
		} else {
			var id = Math.abs(ary[0]);
			if (!sprites[id]){ return }
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					var x = ary[1] - sprites[id].x + sprites[bid].x;
					var y = ary[2] - sprites[id].y + sprites[bid].y;
					if (ary[3] && ary[3] !== 0){
						sprites[bid].setMove(x,y,ary[3],false);
					}else{
						sprites[bid].x = x;
						sprites[bid].y = y;
					}
				}
			});
			if (ary[3] && ary[3] !== 0){
				this._spriteStPics[id].setMove(ary[1],ary[2],ary[3],false);
			}else{
				this._spriteStPics[id].x = ary[1];
				this._spriteStPics[id].y = ary[2];
			}
		}
	};
	
	Window_Message.prototype.processRelativeMovePic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]]
		} else {
			var id = Math.abs(ary[0]);
			if (!sprites[id]){ return }
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			var rx = ary[1] + this._spriteStPics[id].x;
			var ry = ary[2] + this._spriteStPics[id].y;
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					var x = ary[1] + sprites[bid].x;
					var y = ary[2] + sprites[bid].y;
					if (ary[3] && ary[3] !== 0){
						sprites[bid].setMove(ary[1],ary[2],ary[3],true);
					}else{
						sprites[bid].x = x;
						sprites[bid].y = y;
					}
				}
			});
			if (ary[3] && ary[3] !== 0){
				this._spriteStPics[id].setMove(ary[1],ary[2],ary[3],true);
			}else{
				this._spriteStPics[id].x = rx;
				this._spriteStPics[id].y = ry;
			}
		}
	};
	
	Window_Message.prototype.processTurnPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]]
		} else {
			var id = Math.abs(ary[0]);
			if (!sprites[id]){ return }
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			if (ary[1] && ary[1] !== 0){
				this._spriteStPics[id].setTurn(ary[1]);
			}else{
				this._spriteStPics[id].setTurn(2);
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[1] && ary[1] !== 0){
						sprites[bid].setTurn(ary[1]);
					}else{
						sprites[bid].setTurn(2);
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processOpacityPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]]
		} else {
			var id = Math.abs(ary[0]);
			if (!sprites[id]){ return }
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			if (ary[2] && ary[2] !== 0){
				this._spriteStPics[id].setOpacity(ary[1],ary[2],false);
			}else{
				this._spriteStPics[id].opacity = ary[1];
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[2] && ary[2] !== 0){
						sprites[bid].setOpacity(ary[1],ary[2],false);
					}else{
						sprites[bid].opacity = ary[1];
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processAnimationPic = function(ary){
		var id = ary[0];
		if (!this._spriteStPics[id]){ return }
		var anim = $dataAnimations[ary[1]];
		this._spriteStPics[id].startAnimation(anim,ary[2]===1,0);
	};
	
	Window_Message.prototype.processChangePic = function(ary){
		var id = ary[0];
		if (!this._spriteStPics[id]){ return }
		if (ary[2] && ary[2] !== 0){
			this._spriteStPics[id].setChange(ary[1],ary[2]);
		}else{
			this._spriteStPics[id].changePic(ary[1]);
		}
	};
	
	Window_Message.prototype.processChangeFadePic = function(ary){
		var id = ary[0];
		if (!this._spriteStPics[id]){ return }
		if (ary[2] && ary[2] !== 0){
			this._spriteStPics[id].setChangeFade(ary[1],ary[2]);
		}else{
			this._spriteStPics[id].changePic(ary[1]);
		}
	};
	
	Window_Message.prototype.processColorPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]]
		} else {
			var id = Math.abs(ary[0]);
			if (!sprites[id]){ return }
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			if (ary[5] && ary[5] !== 0){
				this._spriteStPics[id].setColor([ary[1],ary[2],ary[3],ary[4]],ary[5],false);
			}else{
				this._spriteStPics[id].setColorTone([ary[1],ary[2],ary[3],ary[4]]);
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[5] && ary[5] !== 0){
						sprites[bid].setColor([ary[1],ary[2],ary[3],ary[4]],ary[5],false);
					}else{
						sprites[bid].setColorTone([ary[1],ary[2],ary[3],ary[4]]);
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processBlendColorPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]];
		} else {
			var id = Math.abs(ary[0]);
			if (!sprites[id]){ return }
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			if (ary[5] && ary[5] !== 0){
				this._spriteStPics[id].setBlend([ary[1],ary[2],ary[3],ary[4]],ary[5],false);
			}else{
				this._spriteStPics[id].setBlendColor([ary[1],ary[2],ary[3],ary[4]]);
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[5] && ary[5] !== 0){
						sprites[bid].setBlend([ary[1],ary[2],ary[3],ary[4]],ary[5],false);
					}else{
						sprites[bid].setBlendColor([ary[1],ary[2],ary[3],ary[4]]);
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processZoomPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]];
		} else {
			var id = Math.abs(ary[0]);
			if (!sprites[id]){ return }
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for(var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			if (ary[3] && ary[3] !== 0){
				this._spriteStPics[id].setZoom(ary[1],ary[2],ary[3],false);
			}else{
				this._spriteStPics[id].scale.x = ary[1] / 100;
				this._spriteStPics[id].scale.y = ary[2] / 100;
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[3] && ary[3] !== 0){
						sprites[bid].setZoom(ary[1],ary[2],ary[3],false);
					}else{
						sprites[bid].scale.x = ary[1] / 100;
						sprites[bid].scale.y = ary[2] / 100;
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processRelativeZoomPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]];
		} else {
			var id = Math.abs(ary[0]);
			if (!sprites[id]){ return }
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for(var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			if (ary[3] && ary[3] !== 0){
				//var zx = this._spriteStPics[id].scale.x * 100 + ary[1];
				//var zy = this._spriteStPics[id].scale.y * 100 + ary[2];
				this._spriteStPics[id].setZoom(ary[1],ary[2],ary[3],true);
			}else{
				this._spriteStPics[id].scale.x += ary[1] / 100;
				this._spriteStPics[id].scale.y += ary[2] / 100;
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[3] && ary[3] !== 0){
						//var zx = sprites[bid].scale.x * 100 + ary[1];
						//var zy = sprites[bid].scale.y * 100 + ary[2];	
						sprites[bid].setZoom(ary[1],ary[2],ary[3],true);
					}else{
						sprites[bid].scale.x += ary[1] / 100;
						sprites[bid].scale.y += ary[2] / 100;
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processRotationPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]];
		} else {
			var id = Math.abs(ary[0]);
			if (!sprites[id]){ return }
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			var radian = ary[1] * 3.141592653 / 180;
			if (!this._spriteStPics[id]){ continue }
			if (ary[2] && ary[2] !== 0){
				this._spriteStPics[id].setRotation(radian,ary[2],false);
			}else{
				this._spriteStPics[id].rotation = radian;
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[2] && ary[2] !== 0){
						sprites[bid].setRotation(radian,ary[2],false);
					}else{
						sprites[bid].rotation = radian;
					}
				}
			});
		}
	};
	
		
	Window_Message.prototype.processRelativeRotationPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]];
		} else {
			var id = Math.abs(ary[0]);
			if (!sprites[id]){ return }
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			var radian = ary[1] * 3.141592653 / 180;
			if (!this._spriteStPics[id]){ continue }
			if (ary[2] && ary[2] !== 0){
				//radian = this._spriteStPics[id].rotation + radian;
				this._spriteStPics[id].setRotation(radian,ary[2],true);
			}else{
				this._spriteStPics[id].rotation += radian;
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[2] && ary[2] !== 0){
						//radian = sprites[bid].rotation + radian;
						sprites[bid].setRotation(radian,ary[2],true);
					}else{
						sprites[bid].rotation += radian;
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processLipStartPic = function(id){
		if (this._spriteStPics[id]){
			var sprites = this._spriteStPics;
			this._spriteStPics[id].setLip();
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					sprites[bid].setLip();
				}
			});
		}
	};
	
	Window_Message.prototype.processLipEndPic = function(id){
		if (this._spriteStPics[id]){
			var sprites = this._spriteStPics;
			this._spriteStPics[id].setLipEnd();
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					sprites[bid].setLipEnd();
				}
			});
		}
	};
	
	Window_Message.prototype.processSetBindPic = function(ary){
		var id = ary[0];
		if (!this._spriteStPics[id]){ return }
		ary = ary.slice(1);
		this._spriteStPics[id]._bindPic = ary;
		this.setAnchorBindPics(id);
	};
	
	Window_Message.prototype.processShowFrontPic = function(id){
		var array1 = [];
		var array2 = [];
		for(var i in this._spriteStPics){
			if (this._spriteStPics[i]){
				this.removeStSprite(this._spriteStPics[i]);
				//this.removeChild(this._spriteStPics[i]);
				if (i == id || this._spriteStPics[id]._bindPic.contains(Number(i))) {
					array1.push([i,this._spriteStPics[i].z]);
				} else {
					array2.push([i,this._spriteStPics[i].z]);
				}
			}
		}
		array1 = array1.sort(function(a,b){ return a[1] > b[1] ? 1 : -1 });
		array2 = array2.sort(function(a,b){ return a[1] > b[1] ? 1 : -1 });
		for(var i=0;i<array2.length;i++){
			var a = array2[i];
			if (this._spriteStPics[a[0]]) {
				this._spriteStPics[a[0]].z = i;
				this.addStSprite(this._spriteStPics[a[0]]);
			}
		}
		for(var i=0;i<array1.length;i++){
			var a = array1[i];
			if (this._spriteStPics[a[0]]) {
				this._spriteStPics[a[0]].z = i+array2.length;
				this.addStSprite(this._spriteStPics[a[0]]);
			}
		}
	};
	
	Window_Message.prototype.processShowBackPic = function(id){
		var array1 = [];
		var array2 = [];
		for(var i in this._spriteStPics){
			if (this._spriteStPics[i]){
				this.removeStSprite(this._spriteStPics[i]);
				//this.removeChild(this._spriteStPics[i]);
				if (i == id || this._spriteStPics[id]._bindPic.contains(Number(i))) {
					array1.push([i,this._spriteStPics[i].z]);
				} else {
					array2.push([i,this._spriteStPics[i].z]);
				}
			}
		}
		array1 = array1.sort(function(a,b){ return a[1] > b[1] ? 1 : -1 });
		array2 = array2.sort(function(a,b){ return a[1] > b[1] ? 1 : -1 });
		for(var i=0;i<array1.length;i++){
			var a = array1[i];
			if (this._spriteStPics[a[0]]) {
				this._spriteStPics[a[0]].z = i;
				this.addStSprite(this._spriteStPics[a[0]]);
			}
		}
		for(var i=0;i<array2.length;i++){
			var a = array2[i];
			if (this._spriteStPics[a[0]]) {
				this._spriteStPics[a[0]].z = i+array1.length;
				this.addStSprite(this._spriteStPics[a[0]]);
			}
		}
	};
	
	Window_Message.prototype.camera = function() {
		return SceneManager._scene.standContainer();
	};
	
	Window_Message.prototype.processMoveCamera = function(ary) {
		var x = ary[0];
		var y = ary[1];
		var duration = ary[2];
		this.camera().setMoveStCamera(x,y,duration,false);
	};
	
	Window_Message.prototype.processRelativeMoveCamera = function(ary) {
		var x = ary[0];
		var y = ary[1];
		var duration = ary[2];
		this.camera().setMoveStCamera(x,y,duration,true);
	};
	
	Window_Message.prototype.processTurnCamera = function(duration) {
		this.camera().setTurnStCamera(duration);
	};
	
	Window_Message.prototype.processZoomCamera = function(ary) {
		this.camera().setZoomStCamera(ary[0],ary[1],ary[2],false);
	};
	
	Window_Message.prototype.processRelativeZoomCamera = function(ary) {
		this.camera().setZoomStCamera(ary[0],ary[1],ary[2],true);
	};
	
	Window_Message.prototype.processSetAnchorCamera = function(ary) {
		this.camera().setAnchorStCamera(ary[0],ary[1]);
	};
	
	Window_Message.prototype.processRotateCamera = function(ary) {
		var radian = ary[0] * 3.141592653 / 180;
		this.camera().setRotateStCamera(radian,ary[1],false);
	};
	
	Window_Message.prototype.processRelativeRotateCamera = function(ary) {
		var radian = ary[0] * 3.141592653 / 180;
		this.camera().setRotateStCamera(radian,ary[1],true);
	};
	
	Window_Message.prototype.processPointZoomCamera = function(ary) {
		this.camera().setPointZoomCamera(ary[0],ary[1],ary[2],ary[3],ary[4]);
	};
	
	Window_Message.prototype.processPointRotateCamera = function(ary) {
		var radian = ary[2] * 3.141592653 / 180;
		this.camera().setPointRotateCamera(ary[0],ary[1],radian,ary[3]);
	};
	
	// アンカーの位置をマスター画像に同期
	Window_Message.prototype.setAnchorBindPics = function(id) {
		var my = this.y;
		var ax = this._spriteStPics[id].x;
		var ay = this._spriteStPics[id].y + my;
		var sprites = this._spriteStPics;
		this._spriteStPics[id]._bindPic.forEach(function(bid){
			var sprite = sprites[bid];
			if (id !== bid && sprite){
				var sx = sprite.x - (sprite.width*sprite.anchor.x);
				var sy = sprite.y + my - (sprite.height * sprite.anchor.y);
				sprite.anchor.x = (ax - sx) / sprite.width;
				sprite.anchor.y = (ay - sy) / sprite.height;
				sprite.x = sx + (sprite.anchor.x * sprite.width);
				sprite.y = sy + (sprite.anchor.y * sprite.height) - my;
			}
		});
	};
	
	var _stPic_WMessage_update = Window_Message.prototype.update;
	Window_Message.prototype.update = function(){
		_stPic_WMessage_update.call(this);
		var pause = this.pause;
		for (i in this._spriteStPics){
			if (this._spriteStPics[i]){
				this._spriteStPics[i]._pause = pause;
			}
		}
		if (this._picClearCount > 0 && this._picClearCount <= (Graphics.frameCount - 2)){
			if (!this.isOpen()){
				this.clearPic();
				this._picClearCount = 0;
				this.camera().resetStCamera();
			}
		}
		if (this._hidePics){
			var ary = [];
			for(var i=0;i<this._hidePics.length;i++){
				var index = this._hidePics[i];
				if (!this._spriteStPics[index]){ continue }
				if (this._spriteStPics[index].maxDelay() <= 0){
					this.removeStSprite(this._spriteStPics[index]);
					//this.removeChild(this._spriteStPics[index]);
					delete this._spriteStPics[index];
				} else {
					ary.push(index);
				}
			}
			this._hidePics = ary;
		}
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	var _stPic_GMap_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function(mapId) {
		_stPic_GMap_setup.call(this,mapId);
		if (usePreloading){ this.checkStandEC() }
	};
	
	// マップ内のイベントを全チェックして、キャッシュ化
	Game_Map.prototype.checkStandEC = function() {
		this.makeStandArray();
		for(var i=0;i<this._standArray.length;i++){
			var n = this._standArray[i];
			var pic = StPicManager.picture(n);
			if (!pic){ 
				console.error(n+'番のピクチャは登録されていません！');
				continue;
			}
			if (pic[1]){
				var ary = pic[1][3].filter(function(x,i,self){
					return self.indexOf(x) === i;
				});
				if (!ary.contains(0)){ ary.push(0) }
				for (var j=0;j<ary.length;j++) {
					var fileName = pic[0] + '_' + ary[j];
					if (fileName.match(/\//)){
						var name = fileName.split('/');
						var folder = 'img/' + name[0] + '/';
						ImageManager.loadBitmap(folder,name[1],null,true);
					} else {
						ImageManager.loadPicture(fileName);
					}
				}
			}else{
				var fileName = pic[0];
				if (fileName.match(/\//)){
					var name = fileName.split('/');
					var folder = 'img/' + name[0] + '/';
					ImageManager.loadBitmap(folder,name[1],null,true);
				} else {
					ImageManager.loadPicture(fileName);
				}
			}
		}
	};
	
	Game_Map.prototype.makeStandArray = function() {
		if (useDeleteCache){
			this.clearStandArray();
		}else{
			this._standArray = this._standArray || [];
		}
		
		// $gameTempにキャッシュがあればロードする。
		if ($gameTemp._cacheStandArrays && $gameTemp._cacheStandArrays[this._mapId]){
			this._standArray = $gameTemp._cacheStandArrays[this._mapId];
			return;
		}
		var dummyVar = $gameVariables._data.clone();
		
		this._commonStArray = [];
		for (var i=0;i<this._events.length;i++) {
			if (this._events[i]){ 
				var event = this._events[i].event();
				for (var j=0;j<event.pages.length;j++){
					var list = event.pages[j].list;
					for (var k=0;k<list.length;k++) {
						if (list[k].code === 401){
							var text = list[k].parameters[0];
							this.addStandArray(text);
						}else if(list[k].code === 117){
							var commonId = list[k].parameters[0];
							if (!this._commonStArray.contains(commonId)){ 
								this._commonStArray.push( commonId );
							}
						}else if(list[k].code === 122){
							this._interpreter._params = list[k].parameters;
							this._interpreter.command122Dummy();
						}
					}
				}
			}
		}
		for (var i=0;i<this._commonEvents.length;i++){
			var commonId = this._commonEvents[i]._commonEventId;
			if (!this._commonStArray.contains(commonId)){ 
				this._commonStArray.push( commonId );
			}
		}
		this._checkCompleteCommon = [];
		for (;;){
			if (this.checkCommonSt(this._commonStArray.clone())){ break }
		}
		for (var i=0;i<this._commonStArray;i++){
			var id = this._commonStArray[i];
			if (id){
				var event = $dataCommonEvents[id];
				for (var j=0;j<event.list.length;j++){
					if (event.list[j]){
						if  (event.list[j].code === 401) {
							var text = event.list[j].parameters[0];
							this.addStandArray(text);
						} else if (event.list[j].code === 122) {
							this._interpreter._params = event.list[j].parameters;
							this._interpreter.command122Dummy();
						}
					}
				}
			}
		}
		$gameTemp._cacheStandArrays = $gameTemp._cacheStandArrays || {};
		$gameTemp._cacheStandArrays[this._mapId] = this._standArray.clone();
		
		$gameVariables._data = dummyVar;
	};
	
	Game_Map.prototype.addStandArray = function(text) {
		text = this.convertEscapeCharacters(text);
		var result = [];
		result = result.concat(text.match(/\x1bSP\[(?:(\d+),?)+\]/gi));
		result = result.concat(text.match(/\x1bCP\[(?:(\d+),?)+\]/gi));
		for (var l=0;l<result.length;l++){
			if (result[l]){
				result[l].match(/(\d+)(?:,(\d+))?/);
				var r = Number(RegExp.$1);
				var r2 = Number(RegExp.$2);
				if (r <= -1){ continue }
				if (r2 <= -1){ continue }
				if (!this._standArray.contains(r)){
					this._standArray.push(r);
				}
				if (result[l].match(/\x1bCP/gi)){
					if (!this._standArray.contains(r2)){
						this._standArray.push(r2);
					}
				}
			}
		}
		result = text.match(/\x1bAP\[\d+,(\d+)\]/);
		if (result){
			var anime = $dataAnimations[result[1]];
			if (!anime){ return }
			if (anime.animation1Name){ ImageManager.loadAnimation(anime.animation1Name) }
			if (anime.animation2Name){ ImageManager.loadAnimation(anime.animation2Name) }
		}
	};
	
	// コモンイベント内のコモンイベントをチェックして配列化　再帰的呼び出しを行います
	Game_Map.prototype.checkCommonSt = function(commonArray) {
		var endFlag = true;
		for (var i=0;i<commonArray.length;i++){
			var id = commonArray[i];
			if (id && !this._checkCompleteCommon.contains(id)){
				var event = $dataCommonEvents[id];
				for (var j=0;j<event.list.length;j++){
					if (event.list[j] && event.list[j].code === 117){
						var commonId = event.list[j].parameters[0];
						if (!this._commonStArray.contains(commonId)){ 
							this._commonStArray.push( commonId );
						}
					}
				}
				this._checkCompleteCommon.push(id);
				endFlag = false;
			}
		}
		return endFlag;
	};
	
	// キャッシュ化されている立ち絵をImageManagerのキャッシュから削除します
	Game_Map.prototype.clearStandArray = function() {
		if (this._standArray){
			this._standArray.forEach(function(picId) {
				var pic = StPicManager.picture(picId);
				if (pic){
					if (pic[1]){
						var ary = pic[1][3].filter(function(x,i,self){
							return self.indexOf(x) === i;
						});
						for (var j=0;j<ary.length;j++) {
							var fileName = pic[0];
							if (fileName.match(/\//)){
								var name = fileName.split('/');
								fileName = 'img/' + fileName + '_' + ary[j] + '.png:0';
							} else {
								fileName = 'img/pictures/' + pic[0] + '_' + ary[j] + '.png:0';
							}
							if (ImageManager._cache) delete ImageManager._cache[fileName];
						}
					}else{
						var fileName = pic[0];
						if (fileName.match(/\//)){
						fileName = 'img/' + fileName + '.png:0';
						}else{
							fileName = 'img/pictures/' + pic[0] + '.png:0';
						}
						if (ImageManager._cache) delete ImageManager._cache[fileName];
					}
				}
			});
		}
		this._standArray = [];
	};
	
	Game_Map.prototype.stPicMacro = function(index){
		return StPicManager.macro(index);
	};
	
	Game_Map.prototype.convertEscapeCharacters = function(text) {
		text = this.preCECs(text);
		text = text.replace(/\x1bSM\[(\d+)\]/gi, function() {
			return this.stPicMacro(parseInt(arguments[1]));
		}.bind(this));
		text = this.preCECs(text);
    	return text;
	};
	
	Game_Map.prototype.preCECs = function(text) {
		text = text.replace(/\\/g, '\x1b');
    	text = text.replace(/\x1b\x1b/g, '\\');
    	text = text.replace(/\x1bPV/gi,proxyVariableId);
    	text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
   		text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
		text = text.replace(/\x1bSM\[(\d+)\]/gi, function() {
			return this.stPicMacro(parseInt(arguments[1]));
		}.bind(this));
    	text = text.replace(/\\/g, '\x1b');
    	text = text.replace(/\x1b\x1b/g, '\\');
    	text = text.replace(/\x1bPV/gi,proxyVariableId);
    	text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
   		text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
		
		text = text.replace(/\x1bBXW/gi,Graphics.boxWidth);
		text = text.replace(/\x1bBXH/gi,Graphics.boxHeight);
		text = text.replace(/\x1bMWW/gi,0);
		text = text.replace(/\x1bMWH/gi,0);
		text = text.replace(/\x1bMWX/gi,0);
		text = text.replace(/\x1bMWY/gi,0);
		text = text.replace(/\x1bCALC\[(.+?)\]/gi, function() {
			var t = eval(arguments[1]);
			return t ? t : '';
		}.bind(this));
		
		text = text.replace(/\\/g, '\x1b');
    	text = text.replace(/\x1b\x1b/g, '\\');
   		text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
    	text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
    	
		text = text.replace(/\x1bVI\[(\d+),(-?\d+)\]/gi,function() {
			return ($gameVariables.value(parseInt(arguments[1])) + parseInt(arguments[2]));
		}.bind(this));
		
		text = text.replace(/\x1bNNUM\[(-?\d+)\]/gi, function() {
			return parseInt(arguments[1]) * -1;
		}.bind(this));
		
		return text;
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	Game_Interpreter.prototype.command122Dummy = function() {
    	var value = 0;
    	switch (this._params[3]) {  // Operand
    	case 0:  // Constant
        	value = this._params[4];
        	break;
    	case 1:  // Variable
        	value = $gameVariables.value(this._params[4]);
        	break;
    	case 2:  // Random
        	value = this._params[4] + Math.randomInt(this._params[5] - this._params[4] + 1);
        	break;
    	case 3:  // Game Data
        	value = this.gameDataOperand(this._params[4], this._params[5], this._params[6]);
        	break;
    	case 4:  // Script
        	value = eval(this._params[4]);
        	break;
    	}
    	for (var i = this._params[0]; i <= this._params[1]; i++) {
        	this.operateVariableDummy(i, this._params[2], value);
    	}
    	return true;
	};
	
	Game_Interpreter.prototype.operateVariableDummy = function(variableId, operationType, value) {
		   try {
        	var oldValue = $gameVariables.value(variableId);
        	switch (operationType) {
        	case 0:  // Set
            	$gameVariables._data[variableId] = value;
            	break;
        	case 1:  // Add
            	$gameVariables._data[variableId] = oldValue + value;
            	break;
        	case 2:  // Sub
            	$gameVariables._data[variableId] = oldValue - value;
            	break;
        	case 3:  // Mul
            	$gameVariables._data[variableId] = oldValue * value;
           		break;
        	case 4:  // Div
            	$gameVariables._data[variableId] = oldValue / value;
            	break;
        	case 5:  // Mod
            	$gameVariables._data[variableId] = oldValue % value;
        	    break;
    	    }
    	 } catch (e) {
        	$gameVariables._data[variableId] = 0;
    	}
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	function SpriteStContainer() {
		this.initialize.apply(this, arguments);
	};

	SpriteStContainer.prototype = Object.create(Sprite.prototype);
	SpriteStContainer.prototype.constructor = SpriteStContainer;
	
	SpriteStContainer.prototype.initialize = function(){
		Sprite.prototype.initialize.call(this);
		this.initMembers();
	};
	
	SpriteStContainer.prototype.initMembers = function () {
		//var initArray = [0];
		this.scale.x = 1;
		this.scale.y = 1;
		this._stack = [];
		//this.bitmap = new Bitmap(Graphics.boxWidth,Graphics.boxHeight);
		//this.bitmap.fillRect(0,0,this.width,this.height,'rgba(0,0,0,0.5)');
		//this.bitmap.fillRect(this.width/2,this.height/2,this.width/4,this.height/4,'rgba(0,0,0,0.5)');
	};
	
	SpriteStContainer.prototype.update = function (){
		var updates = [this.updateMoveCamera,this.updateTurnCamera,
					   this.updateZoomCamera,this.updateAnchor,
					   this.updateRotationCamera];
		Sprite.prototype.update.call(this);
		if (this._stack.length === 0){ return }
		for (var i=0;i<this._stack.length;i++){
			var obj = this._stack[i];
			if (obj.dur > 0){ updates[obj.index].call(this,obj) }
			if (obj.dur <= 0){ this._stack[i] = null }
			if (obj.delay > 0){
				obj.delay--;
				break;
			}
		}
		var ary = [];
		for (var i=0;i<this._stack.length;i++){
			if (this._stack[i] !== null) { ary.push(this._stack[i]) }
		}
		this._stack = ary;
	};
	
	SpriteStContainer.prototype.updateMoveCamera = function(obj) {
		if (!obj) { return }
		if (obj.dur === obj.mDur){
			obj.bx = this.x;
			obj.by = this.y;
			if (obj.relative){
				obj.x += obj.bx;
				obj.y += obj.by;
			}
			obj.mSpeedX = (obj.x - obj.bx) / obj.mDur;
			obj.mSpeedY = (obj.y - obj.by) / obj.mDur;
		}
		obj.dur--;
		var count = obj.mDur - obj.dur;
		var xx = obj.bx + obj.mSpeedX * count;
		var yy = obj.by + obj.mSpeedY * count;
		this.x = xx;
		this.y = yy;
	};
	
	SpriteStContainer.prototype.updateTurnCamera = function(obj) {
		if (!obj){ return }
		if (obj.dur === obj.mDur){
			obj.bsx = this.scale.x;
			obj.tSpeed = obj.bsx / (obj.mDur / 2);
		}
		obj.dur--;
		var count = obj.mDur - obj.dur;
		var zX = obj.bsx - (obj.tSpeed * count);
		this.scale = new Point( zX, this.scale.y);
	};
	
	SpriteStContainer.prototype.updateZoomCamera = function(obj) {
		if (!obj){ return }
		if (obj.dur === obj.mDur){
			obj.bsx = this.scale.x;
			obj.bsy = this.scale.y;
			if (obj.relative){
				obj.zx += obj.bsx;
				obj.zy += obj.bsy;
			}
			obj.zSpeedX = (obj.zx - obj.bsx) / obj.mDur;
			obj.zSpeedY = (obj.zy - obj.bsy) / obj.mDur;
		}
		obj.dur--;
		var count = obj.mDur - obj.dur;
		var zX = obj.bsx + (obj.zSpeedX * count);
		var zY = obj.bsy + (obj.zSpeedY * count);
		this.scale = new Point(zX, zY);
	};
	
	SpriteStContainer.prototype.updateAnchor = function(obj) {
		if (!obj){ return }
		obj.dur--;
		var xx = this.x - obj.ax;
		var yy = this.y - obj.ay;
		this.x = obj.ax;
		this.y = obj.ay;
		this.anchor.x = obj.ax / this.width;
		this.anchor.y = obj.ay / this.height;
		var cs = this.children;
		for (var i=0;i<cs.length;i++){
			cs[i].x += xx;
			cs[i].y += yy;
		}
	};
	
	SpriteStContainer.prototype.updateRotationCamera = function(obj) {
		if (!obj){ return }
		if (obj.dur === obj.mDur){
			obj.bR = this.rotation;
			if (obj.relative){
				obj.rotate = obj.bR + obj.rotate;
			}
			obj.rSpeed = (obj.rotate - obj.bR) / obj.mDur;
		}
		obj.dur--;
		var count = obj.mDur - obj.dur;
		this.rotation = obj.bR + (obj.rSpeed * count);
	};
	
	SpriteStContainer.prototype.setParam = function(arg){
		var obj = {};
		obj.index = arg[0];
		obj.delay = 0;
		var duration = arg[1];
		if (!duration){ duration = 0 }
		if (duration < 0){
			duration = Math.abs(duration);
			obj.delay = duration;
		}
		obj.dur = duration;
		obj.mDur = duration;
		return obj;
	};
	
	SpriteStContainer.prototype.setMoveStCamera = function(x,y,duration,relative) {
		if (duration){
			if (!x){ x = 0 }
			if (!y){ y = 0 }
			var obj = this.setParam([0,duration]);
			obj.x = x;
			obj.y = y;
			obj.relative = relative;
			this._stack.push(obj);
		} else {
			if (relative){
				this.x += x;
				this.y += y;
			} else {	
				this.x = x;
				this.y = y;
			}
		}
	};
	
	SpriteStContainer.prototype.setTurnStCamera = function(duration) {
		if (duration){
			var obj = this.setParam([1,duration]);
			this._stack.push(obj);
		} else {
			this.scale.x = -1.0;
		}
	};
	
	SpriteStContainer.prototype.setZoomStCamera = function(zx,zy,duration,relative) {
		if (duration){
			if (!zx){ zx = 1.0 }
			if (!zy){ zy = 1.0 }
			var obj = this.setParam([2,duration]);
			obj.zx = zx/100;
			obj.zy = zy/100;
			obj.relative = relative;
			this._stack.push(obj);
		} else {
			if (relative){
				this.scale.x += zx / 100;
				this.scale.y += zy / 100;
			} else {	
				this.scale.x = zx / 100;
				this.scale.y = zy / 100;
			}
		}
	};
	
	SpriteStContainer.prototype.setAnchorStCamera = function(ax,ay) {
		var obj = this.setParam([3,1]);
		obj.ax = ax;
		obj.ay = ay;
		this._stack.push(obj);
	};
	
	SpriteStContainer.prototype.setRotateStCamera = function(radian,duration,relative){
		if (duration){
			var obj = this.setParam([4,duration]);
			obj.rotate = radian;
			obj.relative = relative;
			this._stack.push(obj);
		} else {
			if (relative) {
				this.rotation = radian;
			} else {
				this.rotation += radian;
			}
		}
	};
	
	SpriteStContainer.prototype.setPointZoomCamera = function(x,y,zx,zy,duration){
		this.setAnchorStCamera(x,y);
		this.setZoomStCamera(zx,zy,duration);
	};
	
	SpriteStContainer.prototype.setPointRotateCamera = function(x,y,radian,duration){
		this.setAnchorStCamera(x,y);
		this.setRotateStCamera(radian,duration);
	};
	
	SpriteStContainer.prototype.resetStCamera = function(){
		this.x = 0;
		this.y = 0;
		this.scale.x = 1.0;
		this.scale.y = 1.0;
		this.anchor.x = 0;
		this.anchor.y = 0;
		this.rotation = 0;
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	var _stPic_SBase_createPictures = Spriteset_Base.prototype.createPictures;
	Spriteset_Base.prototype.createPictures = function() {
		_stPic_SBase_createPictures.call(this);
		if (!showFront) { this.createStPicContainer() }
	};
	
	Spriteset_Base.prototype.createStPicContainer = function() {
    	var width = Graphics.boxWidth;
    	var height = Graphics.boxHeight;
    	var x = 0;
    	var y = 0;
    	this._stPicContainer = new SpriteStContainer();
    	this._stPicContainer.setFrame(x, y, width, height);
    	this._stPicContainer.y = 0;
    	this.addChild(this._stPicContainer);	
	};
	
	Spriteset_Base.prototype.addStPic = function(sprite) {
		this._stPicContainer.addChild(sprite);
	};
	
	Spriteset_Base.prototype.removeStPic = function(sprite) {
		this._stPicContainer.removeChild(sprite);
	};

	//////////////////////////////////////////////////////////////////////////////////////////
	
	var _stPic_SMap_createMessageWindow = Scene_Map.prototype.createMessageWindow;
	Scene_Map.prototype.createMessageWindow = function() {
		_stPic_SMap_createMessageWindow.call(this);
		if (showFront){ this.createStPicContainer() }
	};
	
	Scene_Map.prototype.createStPicContainer = function() {
    	var width = Graphics.boxWidth;
    	var height = Graphics.boxHeight;
    	var x = 0;
    	var y = 0;
    	this._stPicContainer = new SpriteStContainer();
    	this._stPicContainer.setFrame(x, y, width, height);
    	this._stPicContainer.y = 0;
    	this.addChild(this._stPicContainer);	
	};

	Scene_Map.prototype.addStPic = function(sprite) {
		if (showFront){
			this._stPicContainer.addChild(sprite);	
		} else {
			this._spriteset.addStPic(sprite);
		}
	};
	
	Scene_Map.prototype.removeStPic = function(sprite) {
		if (showFront){
			this._stPicContainer.removeChild(sprite);	
		} else {
			this._spriteset.removeStPic(sprite);
		}
	};
	
	Scene_Map.prototype.standContainer = function() {
		if (showFront){
			return this._stPicContainer;
		} else {
			return this._spriteset._stPicContainer;
		}
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	var _stPic_GInterpreter_command301 = Game_Interpreter.prototype.command301;
	Game_Interpreter.prototype.command301 = function() {
		SceneManager._scene._messageWindow.clearPic();
		return _stPic_GInterpreter_command301.call(this);
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	Scene_Battle.prototype.createStPicContainer = function() {
    	var width = Graphics.boxWidth;
    	var height = Graphics.boxHeight;
    	var x = 0;
    	var y = 0;
    	this._stPicContainer = new SpriteStContainer();
    	this._stPicContainer.setFrame(x, y, width, height);
    	this._stPicContainer.y = 0;
    	this.addChild(this._stPicContainer);	
	};

	var _stPic_SBattle_createMessageWindow = Scene_Battle.prototype.createMessageWindow;
	Scene_Battle.prototype.createMessageWindow = function() {
		_stPic_SBattle_createMessageWindow.call(this);
		if (showFront){ this.createStPicContainer() }
	};
	
	
	Scene_Battle.prototype.addStPic = function(sprite) {
		if (showFront){
			this._stPicContainer.addChild(sprite);	
		} else {
			this._spriteset.addStPic(sprite);
		}
	};
	
	Scene_Battle.prototype.removeStPic = function(sprite) {
		if (showFront){
			this._stPicContainer.removeChild(sprite);	
		} else {
			this._spriteset.removeStPic(sprite);
		}
	};
	
	Scene_Battle.prototype.standContainer = function() {
		if (showFront){
			return this._stPicContainer;
		} else {
			return this._spriteset._stPicContainer;
		}
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	function Window_ChoicePic() {
    	this.initialize.apply(this, arguments);
	}

	Window_ChoicePic.prototype = Object.create(Window_Selectable.prototype);
	Window_ChoicePic.prototype.constructor = Window_ChoicePic;

	Window_ChoicePic.prototype.initialize = function(messageWindow) {
    	this._messageWindow = messageWindow;
    	Window_Selectable.prototype.initialize.call(this, -64, 0, 64, 64);
    	this.openness = 0;
    	this.deactivate();
    	this._subCursor = new Sprite();
    	if (cursorName) { 
    		this._subCursor.bitmap = ImageManager.loadSystem('cursor');
    		this._subCursor.x = 0;
    		this._subCursor.y = 0;
    		this.addChild(this._subCursor);
    	}
	};
	
	Window_ChoicePic.prototype.start = function() {
		this.show();
		this.open();
    	this.activate();
    	this.select(0);
    	if (cursorName){
    		this._subCursor.opacity = 0;
    		this._subCursor.x = Graphics.boxWidth / 2 - 8;
    		this._subCursor.y = Graphics.boxHeight / 2 - 8;
    		this._prevKeyRepeatWait = Input.keyRepeatWait;
    		Input.keyRepeatWait = 1;
    		this._prevKeyRepeatInterval = Input.keyRepeatInterval;
    		Input.keyRepeatInterval = 1;
    	}
	};
	
	Window_ChoicePic.prototype.isOkEnabled = function() {
    	return true;
	};
	
	Window_ChoicePic.prototype.processHandling = function() {
    	if (this.isOpenAndActive()) {
        	if (this.isOkEnabled() && this.isOkTriggered()) {
            	this.processOk();
        	} else if (this.isCancelEnabled() && this.isCancelTriggered()) {
            	this.processCancel();
        	}
   		}
	};
	
	Window_ChoicePic.prototype.isCursorMovable = function() {
    	return true;
	};
	
	Window_ChoicePic.prototype.cursorLeft = function() {
		if (!cursorName){ return }
		this.callCursor();
		if (this._subCursor.x >= 64) {
			this._subCursor.x -= 8;
		}
	};
	
	Window_ChoicePic.prototype.cursorRight = function() {
		if (!cursorName){ return }
		this.callCursor();
		if (this._subCursor.x <= Graphics.boxWidth+64) {
			this._subCursor.x += 8;
		}
	};
	
	Window_ChoicePic.prototype.cursorDown = function() {
		if (!cursorName){ return }
		this.callCursor();
		if (this._subCursor.y <= Graphics.boxHeight) {
			this._subCursor.y += 8;
		}
	};
	
	Window_ChoicePic.prototype.cursorUp = function() {
		if (!cursorName){ return }
		this.callCursor();
		if (this._subCursor.y >= 0) {
			this._subCursor.y -= 8;
		}
	};
	
	Window_ChoicePic.prototype.isCancelEnabled = function() {
    	return $gameMessage.isEnablePicChoiceCancel();
	};
	
	Window_ChoicePic.prototype.processTouch = function() {
   		if (this.isOpenAndActive()) {
        	if (TouchInput.isTriggered()) {
            	this._touching = true;
            	this.onTouch(true);
        	} else if (TouchInput.isCancelled()) {
            	if (this.isCancelEnabled()) {
                	this.processCancel();
            	}
        	}
        	if (this._touching) {
            	if (TouchInput.isPressed()) {
                	this.onTouch(false);
            	} else {
                	this._touching = false;
            	}
        	}
    	} else {
        	this._touching = false;
    	}
	};
	
	Window_ChoicePic.prototype.cordinateTrans = function(x,y,radian) {
        var ax = Math.cos(-radian) * x;
        var ay = Math.sin(-radian) * x;
        ax -= Math.sin(-radian) * y;
        ay += Math.cos(-radian) * y;
        return [ax,ay];
	};
	
	Window_ChoicePic.prototype.getIndex = function(x, y) {
		x = x + this.x;
        //var ary = [];
        var ox = x;
        var oy = y;
        var camera = SceneManager._scene.standContainer();
        ox -= camera.x;
        oy -= camera.y;
        var ary = this.cordinateTrans(ox,oy,camera.rotation);
        ox = (ary[0] + camera.x * camera.scale.x) / camera.scale.x;
        oy = (ary[1] + camera.y * camera.scale.y) / camera.scale.y;
        for(var i in this._messageWindow._spriteStPics){
        	var x = ox;
        	var y = oy;
        	var sprite = this._messageWindow._spriteStPics[i];
        	var sw = Math.abs(sprite.width * sprite.scale.x);
        	var sh = Math.abs(sprite.height * sprite.scale.y);
        	var cx = sprite.x - sw * sprite.anchor.x + camera.x;
        	var cy = sprite.y - sh * sprite.anchor.y + camera.y;
        	var sx = x - (sprite.x + camera.x);
        	var sy = y - (sprite.y + camera.y);
        	var ac = this.cordinateTrans(sx,sy,sprite.rotation);
        	var ax = ac[0] + camera.x + sprite.x;
        	var ay = ac[1] + camera.y + sprite.y;
        	if (ax >= cx && ax <= (cx + sw) && ay >= cy && ay <= (cy + sh)){
        		var xx = (ax - cx) * (1 / sprite.scale.x);
        		var yy = (ay - cy) * (1 / sprite.scale.y);
        		if (xx < 0){ xx = sprite.width + xx }
        		if (yy < 0){ yy = sprite.height + yy } 
        		var pixel = sprite.bitmap.getPixel(xx,yy);
        		if (pixel != '#000000'){ ary.push(sprite) }
        	}
        }
        if (ary.length > 0){
        	var az = -9999;
        	var s = 0;
        	for (var i=0;i<ary.length;i++){
        		if (az <= ary[i].z){ s = ary[i]._id }
        	}
        	return s;
        }
    	return -1;
	};
	
	Window_ChoicePic.prototype.hitTest = function(x, y) {
		return this.getIndex(x,y);
	};
	
	Window_ChoicePic.prototype.onTouch = function(triggered) {
    	//var lastIndex = this.index();
   		var x = this.canvasToLocalX(TouchInput.x);
    	var y = this.canvasToLocalY(TouchInput.y);
    	var hitIndex = this.hitTest(x, y);
    	if (hitIndex >= 0) {
            if (triggered && this.isTouchOkEnabled()) {
                this.processOk(hitIndex);
            }
       }
	};
	
	Window_ChoicePic.prototype.processOk = function(hitIndex) {
		if (!hitIndex && this.subCursorActive()){
			hitIndex = this.getIndex(this._subCursor.x,this._subCursor.y);
		}
		if (hitIndex !== undefined && hitIndex > -1){
    		//SoundManager.playOk();
    		$gameVariables.setValue($gameMessage.picChoiceVariableId(), hitIndex);
    		this._messageWindow.terminateMessage();
    		this.deactivate();
    		this.close();
    		Input.keyRepeatWait = this._prevKeyRepeatWait;
    		Input.keyRepeatInterval = this._prevKeyRepeatInterval;
    	} else {
			if (!cursorName){ return }
    		this.callCursor();
    	}
	};
	
	Window_ChoicePic.prototype.subCursorActive = function() {
		return this._subCursor && this._subCursor.opacity === 255;
	};
	
	Window_ChoicePic.prototype.callCursor = function() {
		if (this._subCursor.opacity <= 0){
    		//SoundManager.playCursor(); 
			this._subCursor.opacity = 255;
		}
	};
	
	Window_ChoicePic.prototype.processCancel = function() {	
    	//SoundManager.playCancel();
    	$gameVariables.setValue($gameMessage.picChoiceVariableId(), -1);
    	this._messageWindow.terminateMessage();
    	this.deactivate();
    	this.close();
    	Input.keyRepeatWait = this._prevKeyRepeatWait;
    	Input.keyRepeatInterval = this._prevKeyRepeatInterval;
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	var _stPic_GMessage_clear = Game_Message.prototype.clear;
	Game_Message.prototype.clear = function() {
		_stPic_GMessage_clear.call(this);
		this._picChoiceVariableId = 0;
	};
	
	var _stPic_GMessage_isBusy = Game_Message.prototype.isBusy;
	Game_Message.prototype.isBusy = function() {
		return (_stPic_GMessage_isBusy.call(this) || this.isPicChoice());
	};
	
	Game_Message.prototype.isPicChoice = function() {
    	return this._picChoiceVariableId > 0;
	};
	
	Game_Message.prototype.setPicChoice = function(params) {
    	this._picChoiceVariableId = Number(params[1]);
    	this._picChoiceEnableCancel = params[2] === 'true';
	};
	
	Game_Message.prototype.picChoiceVariableId = function() {
		return this._picChoiceVariableId;
	};
	
	Game_Message.prototype.isEnablePicChoiceCancel = function() {
		return this._picChoiceEnableCancel;
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	var _stPic_WMessage_createSubWindows = Window_Message.prototype.createSubWindows;
	Window_Message.prototype.createSubWindows = function() {
		_stPic_WMessage_createSubWindows.call(this);
		this._picSelectWindow = new Window_ChoicePic(this);
    };
	
	var _stPic_WMessage_startInput = Window_Message.prototype.startInput;
	Window_Message.prototype.startInput = function() {
		var result = _stPic_WMessage_startInput.call(this);
		if (!result && $gameMessage.isPicChoice()) { 
			this.picSelectStart();
			result = true;
		}
		return result;
	};
	
	Window_Message.prototype.picSelectStart = function() {
		this.deactivate();
		this._picSelectWindow.start();
	};
	
	var _stPic_WMessage_isAnySubWindowActive = Window_Message.prototype.isAnySubWindowActive;
	Window_Message.prototype.isAnySubWindowActive = function() {
		return (_stPic_WMessage_isAnySubWindowActive.call(this) ||
				this._picSelectWindow.active);
    };
    
    var _stPic_WMessage_subWindows = Window_Message.prototype.subWindows;
    Window_Message.prototype.subWindows = function() {
    	return _stPic_WMessage_subWindows.call(this).concat(this._picSelectWindow);
    };

	//////////////////////////////////////////////////////////////////////////////////////////
	
	Game_Interpreter.prototype.setupPicChoice = function(params) {
    	$gameMessage.setPicChoice(params);
	};

	/*
	Game_Interpreter.prototype.prevEventCode = function() {
    	var command = this._list[this._index - 1];
    	if (command) {
        	return command.code;
    	} else {
        	return 0;
    	}
	};
	*/
	
	var _stPic_GInterpreter_command101 = Game_Interpreter.prototype.command101;
	Game_Interpreter.prototype.command101 = function() {
		_stPic_GInterpreter_command101.call(this);
		var command = this._list[this._index];
		//var size = Object.keys(SceneManager._scene._messageWindow._spriteStPics).length;
		if (command && command.code === 356){
			var params = command.parameters[0].split(' ');
			if (params[0] === 'ChoicePicture'){
        		this.setupPicChoice(params);
        		this._index++;
			}
		}
	};
}());
