//
//  ステータスクラス+クラスチェンジシーン ver1.05
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
Imported['VXandAceHybridClass'] = 1.05;

/*:
 * @plugindesc ver1.05/VXとAceのクラスを混合した形のシステムを提供します。また、クラスチェンジを行うシーンも追加します。
 * @author Yana
 * 
 * @param Show Name Class Point
 * @desc クラス用の経験値の表示名です。
 * @default アビリティポイント
 * 
 * @param Show Name Class Level
 * @desc クラス用のレベルの表示名です。
 * @default クラスレベル
 * 
 * @param Display Get Class Point
 * @desc クラス用の経験値を取得したときに表示されるテキストです。
 * _num:数値 _abp:クラス経験値の名前に変換します。
 * @default _numポイントの_abpを獲得！
 * 
 * @param Display Class Level Up
 * @desc クラスレベルが上がったときに表示されるテキストです。
 * _name:アクター名　_class:クラス名　_num:レベルに変換します。
 * @default _nameは_class Lv_num に上がった！
 * 
 * @param Display Class Level Up Master
 * @desc クラスをマスターしたときに表示されるテキストです。
 * _name:アクター名　_class:クラス名に変換します。
 * @default _nameは_classをマスターした！
 * 
 * @param Display Status Next
 * @desc ステータス欄でクラス経験値のNextとして表示されるテキストです。
 * @default 次のＣＬｖまで
 * 
 * @param Display Status Now
 * @desc ステータス欄でクラス経験値の現在値として表示されるテキストです。
 * @default 現在のＡＢＰ
 * 
 * @param Display Class Level A
 * @desc クラスの後ろに追加されるテキストです。
 * このテキスト+現在のクラスレベルがクラス名に追加されます。
 * @default Lv.
 * 
 * @param Default Class Point
 * @desc エネミーが持っているクラス経験値のデフォルト値です。
 * @default 1
 * 
 * @param Max Class Level
 * @desc クラスレベルの最大値のデフォルト値です。
 * @default 9
 * 
 * @param Default Status Class ID
 * @desc ステータスクラスのクラスIDのデフォルト値です。
 * -1が設定されていると、アクターIDと同じIDのクラスが設定されます。
 * @default -1
 * 
 * @param Reserve Status Class ID
 * @desc 上記の設定で無効なクラスIDが指定されたときに使用されるクラスIDです。
 * @default 1
 * 
 * @param Master Level Text
 * @desc クラスレベルが最大値に達したクラスの、レベルの代わりに表示するテキストです。
 * @default ★
 * 
 * @param -----------------
 * @desc 空白用です。この設定を変更しても何も起きません。
 * ここより下はクラスチェンジシーンに関する設定です。
 * @default -----------------------
 * 
 * @param Add Menu Class Change
 * @desc メニューにクラスチェンジを追加するかの設定です。
 * trueで追加します。
 * @default true
 * 
 * @param Class Change Command Name
 * @desc メニューに追加されるクラスチェンジの項目名です。
 * @default クラスチェンジ
 * 
 * @param Class Master
 * @desc クラスチェンジシーンでマスターしたクラスのクラスレベル表示です。
 * @default ★Master!
 * 
 * @param Master Color
 * @desc クラスチェンジシーンでマスターしたクラスのクラスレベル表示の色です。
 * テキストカラーで指定します。
 * @default 21
 * 
 * @param Hide Skills
 * @desc 習得スキルを隠すかどうかの設定です。
 * 隠す場合は隠すのに使用する1文字を指定してください。
 * @default ?
 * 
 * @param Known Changeable
 * @desc 知っているだけで転職できるかの設定です。
 * trueの場合、転職した経験があれば、条件を無視して転職可能です。
 * @default true
 * 
 * @param Cond Include Trait
 * @desc ステータスの条件判定に装備などの特徴を含むかの設定です。
 * trueの場合、装備などによる変化を含んで条件を判定します。
 * @default false
 * 
 * @param Equippable WType Title
 * @desc クラスステータス部分の装備可能武器のテキストです。
 * @default 装備可能武器タイプ
 * 
 * @param Equippable AType Title
 * @desc クラスステータス部分の装備可能防具のテキストです。
 * @default 装備可能防具タイプ
 * 
 * @param Clear Set Skills Text
 * @desc CP制と併用時、スキル設定情報がクリアされたときに表示される、ウィンドウのテキストです。
 * @default スキル設定が初期化されました！
 * 
 * @param Weapon Type Icons
 * @desc 武器タイプそれぞれに設定するアイコンです。
 * 1から順に,で区切ってアイコンインデックスを並べて下さい。
 * @default 96,97,98,99,100,101,102,103,104,105,106,107
 * 
 * @param Armor Type Icons
 * @desc 防具タイプそれぞれに設定するアイコンです。
 * 1から順に,で区切ってアイコンインデックスを並べて下さい。
 * @default 135,138,136,137,129,128
 * 
 * @help------------------------------------------------------
 *  注意
 * ------------------------------------------------------
 * 
 * このプラグインは再定義が多いため、できるだけ上の方に配置してください。
 *
 * ------------------------------------------------------
 *  プラグインコマンド
 * ------------------------------------------------------
 * 
 * ※スペースは必ず半角で入力してください。
 * 
 * ********************************************************
 * 
 * ・ActorID番のアクターのクラスチェンジシーンを呼び出します。
 *  IDを省略すると、最後に呼び出されたアクターのクラスチェンジシーンが呼び出されます。
 * 
 * クラスチェンジシーン 呼び出し ActorID
 * SceneClassChange call ActorID
 * 
 * ********************************************************
 * 
 * ・ActorID番のアクターのステータスクラスをClassIDに変更します。
 *  3つめの引数にtrueを指定すると、経験値を引き継ぎます。
 *  アクターIDを0にするとパーティ全員を対象にします。
 * 
 * ステータスクラス変更 ActorID ClassID (true/false) 
 * ChangeStatusClass ActorID ClassID (true/false)
 * 
 * ********************************************************
 * 
 * ・ActorID番のアクターの現在のクラスのレベルにxを加算します。
 *  3つめの引数にtrueを指定すると、レベルアップを表示します。
 *　　アクターIDを0に指定すると、パーティ全員を対象にします。
 * 
 * クラスレベルの増減 ActorID x (true/false)
 * ChangeClassLevel ActorID x (true/false)
 * 
 * ********************************************************
 * 
 * ・ActorID番のアクターの現在のABPにxを加算します。
 *  3つめの引数にtrueを指定すると、レベルアップを表示します。
 *  アクターIDを0に指定すると、パーティ全員を対象にします。
 * 
 * ABPの増減 ActorID x (true/false)
 * ChangeABP ActorID x (true/false)
 * 
 * ------------------------------------------------------
 * 設定方法
 * ------------------------------------------------------
 *
 *  アクターのメモ欄に
 * 
 * <ステータスクラス:ID>
 * <STATUS_CLASS:ID>
 * 
 * のいずれかを記述すると、そのアクターのステータスクラスをID番のクラスに設定できます。
 * 
 * ********************************************************
 * 
 * クラスのメモ欄に
 * 
 * <クラスチェンジ不可>
 * <NOT_CHANGE_CLASS> 
 * 
 * のいずれかを記述すると、そのクラスにクラスチェンジできなくなります。
 * 
 * ********************************************************
 * 
 * クラスのメモ欄に
 * 
 * <クラスチェンジ条件>
 * 条件
 * </クラスチェンジ条件>
 * 
 * と記述すると、そのクラスになるために条件が設定できます。
 * 設定できる条件は、
 * 
 * アクター条件:x,y…
 * アクターのIDがxまたはyまたは…のときに条件を満たします。
 * 例:アクター条件:1,2,3,4
 * 
 * レベル条件:x以上(以下)
 * アクターのレベルがx以上(以下)のときに条件を満たします。
 * 例:レベル条件:5以上
 * 
 * クラス条件:x,y…
 * アクターのクラスがxまたは、yまたは…のときに条件を満たします。
 * 例:クラス条件:1,2,3,4
 * 
 * クラスレベル条件:xがy以上(以下)
 * アクターのクラスxのレベルがy以上(以下)のときに条件を満たします。
 * 例:クラスレベル条件:2が4以上
 * 
 * スキル条件:x,y…を覚えている(いない)
 * アクターがスキルxまたは、yまたは…を覚えている(いない)ときに条件を満たします。
 * 例:スキル条件:3,4,5,6,7を覚えていない
 * 
 * アイテム条件:(IWA)x,(IWA)y…を持っている(いない)
 * (I:アイテム　W:武器　A:防具)xまたは、(IWA)yまたは…を持っている(いない)とき条件を満たします。
 * 例:アイテム条件:W1,A3,I4を持っている
 * 
 * 装備条件:(WA)x,(WA)yを装備している(いない)
 * (W:武器　A:防具)xまたは、(WA)yまたは…を装備している(いない)とき条件を満たします。
 * 例:装備条件:W1,A2を装備していない
 * 
 * ステータス条件:(能力値)x以上(以下)
 * (最大HP　最大MP　攻撃力…)がx以上(以下)のとき条件を満たします。
 * この条件には、命中率や回避率等のxparam、経験値獲得率や床ダメージ率等のsparamも設定できます。
 * 例:ステータス条件:攻撃力80以上
 * 
 * スイッチ条件:x,y…がON(OFF)
 * x番のスイッチまたは、y番のスイッチまたは、…のとき条件を満たします。
 * 例:スイッチ条件:3,4,5,6,7がOFF
 * 
 * 変数条件:xがy以上(以下)
 * x番の変数がy以上(以下)のとき条件を満たします。
 * 例:変数条件:12が100以上
 * 
 * と、なります。
 * 
 * ********************************************************
 * 
 * クラスのメモ欄に、
 * 
 * <クラス説明>
 * クラスの説明
 * </クラス説明>
 * 
 * と記述することで、クラスチェンジウィンドウでヘルプに表示されるクラスの解説が設定できます。
 * 
 * ********************************************************
 * 
 * クラスのメモ欄に
 * 
 * <最大クラスレベル:x>
 * <MAX_CLASS_LEVEL:x>
 * 
 * のいずれかを記述することで、クラスの最大レベルを個別に設定できます。
 * 
 * ********************************************************
 * 
 * スキルやアイテム等、使用効果を持ったオブジェクトのメモ欄に
 * 
 * <使用効果ABP+x>
 * 
 * と記述すると、クラス経験値をxポイント加算する効果を追加します。
 * 
 * <使用効果ABP+x~y>
 *
 * と記述して、効果量にx~yの範囲を持たせることもできます。
 * 
 * ********************************************************
 * 
 * 特徴を持ったオブジェクトのメモ欄に
 * 
 * <ABP獲得率:x%>
 * <ABPRate:x%>
 * 
 * のいずれかを記述することで、その特徴を持っている間、ABPの取得量をx%にすることができます。
 * これは経験値獲得率と同じように動作します。(sparamの10番として追加します。)
 * 
 * ********************************************************
 * 
 * エネミーのメモ欄に
 * 
 * <ABP:x>
 * 
 * と記述すると、そのエネミーの取得ABPをxに設定します。
 * xは少数も設定可能で、ABPの取得値はトループの合計値の小数点以下を繰り上げた値になります。
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
 * ver1.05:
 * スキル設定が初期化されたとき出るウィンドウが、マウスでキャンセルできないバグを修正。
 * ver1.04:
 * 装備画面改造の名称変更に伴い、こちらも修正。
 * ver1.03:
 * <クラスチェンジ不可>が正常に機能していなかったバグを修正。
 * ver1.02:
 * 装備画面改造との併用化処理を追加。
 * ver1.01:
 * console.logを削除。
 * 名無しのクラスにチェンジできないように修正。
 * ver1.00:
 * 公開。
 */

(function(){
	
	var parameters = PluginManager.parameters('VXandAceHybridClass');
	var showNameClassPoint = String(parameters['Show Name Class Point'] || 'アビリティポイント');
	var showNameClassLevel = String(parameters['Show Name Class Level'] || 'クラスレベル');
	var displayGetClassPoint = String(parameters['Display Get Class Point'] || '_numポイントの_abpを獲得！');
	var displayClassLevelUp = String(parameters['Display Class Level Up'] || '_nameは_class Lv_num に上がった！');
	var displayClassLevelUpMaster = String(parameters['Display Class Level Up Master'] || '_nameは_classをマスターした！');
	var displayStatusNext = String(parameters['Display Status Next'] || '次のＣＬｖまで');
	var displayStatusNow = String(parameters['Display Status Now'] || '現在のＡＢＰ');
	var displayClassLevelA = String(parameters['Display Class Level A'] || ' Lv.');
	var defaultClassPoint = Number(parameters['Default Class Point']) || 1;
	var maxClassLevel = Number(parameters['Max Class Level']) || 9;
	var defaultStatusClassId = Number(parameters['Default Status Class ID']) || -1;
	var reserveStatusClassId = Number(parameters['Reserve Status Class ID']) || 1;
	var masterLevelText = String(parameters['Master Level Text'] || '★');
	
	var addMenuClassChange = String(parameters['Add Menu Class Change']) === 'true';
	var classChangeCommandName = String(parameters['Class Change Command Name'] || 'クラスチェンジ');
	var classMaster = String(parameters['Class Master'] || '★Master!');
	var masterColor = Number(parameters['Master Color'] || 21);
	var hideSkills = String(parameters['Hide Skills'] || '');
	var knownChangeable = String(parameters['Known Changeable']) === 'true';
	var condIncludeTrait = String(parameters['Cond Include Trait']) === 'true';		
	var equippableWTypeTitle = String(parameters['Equippable WType Title'] || '装備可能武器タイプ');
	var equippableATypeTitle = String(parameters['Equippable AType Title'] || '装備可能防具タイプ');
	var clearSetSkillsText = String(parameters['Clear Set Skills Text'] || 'スキル設定が初期化されました！');
	var weaponTypeIcons = String(parameters['Weapon Type Icons'] || '96,97,98,99,100,101,102,103,104,105,106,107');
	var armorTypeIcons = String(parameters['Armor Type Icons'] || '135,138,136,137,129,128');

	var _HC_GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_HC_GInterpreter_pluginCommand.call(this, command, args);
		if (command === 'クラスチェンジシーン' || command === 'SceneClassChange') {
			switch (args[0]) {
			case '呼び出し':
			case 'call':
				this.callSceneClassChange(Math.floor(Number(args[1])));
				break;
			}
		}
		if (command === 'ステータスクラス変更' || command === 'ChangeStatusClass') {
			this.changeStatusClass(Math.floor(Number(args[0])),Math.floor(Number(args[1])), String(args[2]) === 'true');
		}
		if (command === 'クラスレベルの増減' || command === 'ChangeClassLevel') {
			this.changeClassLevel(Math.floor(Number(args[0])),Math.floor(Number(args[1])), String(args[2]) === 'true');
		}
		if (command === 'ABPの増減' || command === 'ChangeAbp') {
			this.changeAbp(Math.floor(Number(args[0])),Math.floor(Number(args[1])), String(args[2]) === 'true');
		}
	};
	
	Game_Interpreter.prototype.callSceneClassChange = function(actorId) {
		if(actorId > 0){ $gameParty._menuActorId = actorId };
		SceneManager.push(Scene_ClassChange);
	};

	Game_Interpreter.prototype.changeStatusClass = function(actorId,classId,keep) {
		var targets = [];
		if (actorId > 0) {
			targets.push($gameActors.actor(actorId));
		} else {
			$gameParty.members().forEach(function(actor) {
				targets.push(actor);
			});
		}
		targets.forEach(function(actor) { actor.changeStatusClass(classId,keep) });
	};
	
	Game_Interpreter.prototype.changeClassLevel = function(actorId, level, show) {
		var targets = [];
		if (actorId > 0) {
			targets.push($gameActors.actor(actorId));
		} else {
			$gameParty.members().forEach(function(actor){
				targets.push(actor);
			});
		}
		targets.forEach(function(actor){
			var value = actor.currentClassLevel() + level;
			if (value > actor.maxClassLevel()) { value = actor.maxClassLevel()}
			actor.changeClassLevel(value, show);
		});
	};
	
	Game_Interpreter.prototype.changeAbp = function(actorId, abp, show) {
		var targets = [];
		if (actorId > 0){
			targets.push($gameActors.actor(actorId));
		}else{
			$gameParty.members().forEach(function(actor){
				targets.push(actor);
			});
		}
		targets.forEach(function(actor){
			var value = actor.currentAbp() + abp;
			actor.changeAbp(value, show);
		});
	};
	
	TextManager.extCommand = function(commandId) {
		var extCommands = [showNameClassPoint,showNameClassLevel];
    	return extCommands[commandId] || '';
	};
	
	Object.defineProperties(TextManager, {
    	abp           		: TextManager.getter('extCommand', 0),
    	classLevel          : TextManager.getter('extCommand', 1),
	});
	
	/////////////////////////////////////////////////////////////////////////

	function HybridClassManager() {
    	throw new Error('This is a static class');
	};
	
	HybridClassManager.createABPRate = function(item) {
		if (!item){ return }
		if (item.abpRate !== undefined){ return }
		
		var text = item.meta['ABP獲得率'] || item.meta['ABPRate'];
		item.abpRate = text ? Number(text.replace(/[%％]/,'')) : 100;
		item.abpRate = item.abpRate / 100;
		item.traits.push({'code':23,'dataId':10,'value':item.abpRate});
	};
	
	HybridClassManager.createABPEffect = function(item) {
		if (item._abpEffects !== undefined){ return }
		item._abpEffects = [];
		if (item.meta['使用効果']){
			var ef = item.meta['使用効果'];
			if (ef.match(/ABP([+-]\d+)[~～](-?\d+)/)) {
				var value1 = Number(RegExp.$1);
				var value2 = Number(RegExp.$2);
				item._abpEffects.push({'code':100 ,'dataId':0 ,'value1':value1 ,'value2':value2})
			}else if (ef.match(/ABP([+-]\d+)/)){
				var value = Number(RegExp.$1);
				item._abpEffects.push({'code':100 ,'dataId':0 ,'value1':value ,'value2':value})
			}
		}
		item.effects = item.effects.concat(item._abpEffects);
	};
	
	HybridClassManager.createClassStatus = function(classObject) {
		if (classObject._initialized) { return }
		classObject._changeable = !classObject.note.match(/<クラスチェンジ不可>/);
		if (classObject._changeable) {
			classObject._changeable = !classObject.note.match(/<NOT_CHANGE_CLASS>/);
		}
		classObject._changeable = classObject.name === '' ? false : classObject._changeable;
		classObject._maxLevel = Number(classObject.meta['最大クラスレベル'] || classObject.meta['MAX_CLASS_LEVEL'] || maxClassLevel);
		texts = classObject.note.split('\n');
		classObject._changeCond = [];
		var flag = false;
		var decFlag = false;
		classObject.description = '';
		for(var i=0;i<texts.length;i++){
			var text = texts[i];
			if (text.match(/<\/クラスチェンジ条件>/)){
				flag = false;
			}else if (flag) {
				var cond = {'cond':null,'value':null};
				if (text.match(/^アクター条件[:：](\d+(?:,\d+)*)/)){
					cond.cond = 'actor';
					cond.value = RegExp.$1.split(',');
					classObject._changeCond.push(cond);
				}else if (text.match(/^レベル条件[:：](\d+)以([上下])/)){
					cond.cond = 'level';
					cond.value = [RegExp.$1,RegExp.$2];
					classObject._changeCond.push(cond);
				}else if (text.match(/^クラス条件[:：](\d+(?:,\d+)*)/)){
					cond.cond = 'class';
					cond.value = RegExp.$1.split(',');
					classObject._changeCond.push(cond);
				}else if (text.match(/^クラスレベル条件[:：](\d+)が(\d+)以([上下])/)){
					cond.cond = 'classLevel';
					cond.value = [RegExp.$1,RegExp.$2,RegExp.$3];
					classObject._changeCond.push(cond);
				}else if (text.match(/^スキル条件[:：](\d+(?:,\d+)*)を覚えて(いる|いない)/)){
					cond.cond = 'skill';
					cond.value = [RegExp.$1.split(','),RegExp.$2];
					classObject._changeCond.push(cond);
				}else if (text.match(/^アイテム条件[:：]([IWAiwa]\d+(?:,[IWAiwa]\d+)*)を持って(いる|いない)/)){
					cond.cond = 'item';
					cond.value = [RegExp.$1.split(','),RegExp.$2];
					classObject._changeCond.push(cond);
				}else if (text.match(/^装備条件[:：]([WAwa]\d+(?:,[WAwa]\d+)*)を装備して(いる|いない)/)){
					cond.cond = 'equip';
					cond.value = [RegExp.$1.split(','),RegExp.$2];
					classObject._changeCond.push(cond);
				}else if (text.match(/^ステータス条件[:：](.+?)(\d+)以([上下])/)){
					cond.cond = 'status';
					cond.value = [RegExp.$1,RegExp.$2,RegExp.$3];
					classObject._changeCond.push(cond);
				}else if (text.match(/^スイッチ条件[:：](\d+(?:,\d+)*)が(ON|OFF)/)){
					cond.cond = 'switch';
					cond.value = [RegExp.$1.split(','),RegExp.$2];
					classObject._changeCond.push(cond);
				}else if (text.match(/^変数条件[:：](\d+)が(\d+)以([上下])/)){
					cond.cond = 'variable';
					cond.value = [RegExp.$1,RegExp.$2,RegExp.$3];
					classObject._changeCond.push(cond);
				}
			}else if (text.match(/<クラスチェンジ条件>/)){
				flag = true;
			}else if (text.match(/<\/クラス説明>/)){
				decFlag = false;
			}else if (decFlag) {
				if (classObject.description !== '') {
					classObject.description += '\n';
				}
				classObject.description += text;
			}else if (text.match(/<クラス説明>/)){
				decFlag = true;
			}
		}
		classObject._initialized = true;
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	var _HC_BManager_makeRewards = BattleManager.makeRewards;
	BattleManager.makeRewards = function() {
		_HC_BManager_makeRewards.call(this);
		this._rewards.abp = $gameTroop.abpTotal();
	};
	
	var _HC_BManager_gainExp = BattleManager.gainExp;
	BattleManager.gainExp = function() {
		_HC_BManager_gainExp.call(this);
		this.gainAbp();
	};
	
	BattleManager.gainAbp = function() {
    	var abp = this._rewards.abp;
    	$gameParty.allMembers().forEach(function(actor) {
        	actor.gainAbp(abp);
    	});
	};
	
	var _HC_BManager_displayExp = BattleManager.displayExp;
	BattleManager.displayExp = function() {
		_HC_BManager_displayExp.call(this);
		this.displayAbp();
	}
	
	BattleManager.displayAbp = function() {
    	var abp = this._rewards.abp;
    	if (abp > 0) {
        	var text = displayGetClassPoint;
        	text = text.replace(/_num/,abp);
        	text = text.replace(/_abp/,showNameClassPoint);
        	$gameMessage.add('\\.' + text);
    	}
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	Object.defineProperties(Game_BattlerBase.prototype, {
    	// ABritypoint Rate
    	abr: { get: function() { return this.sparam(10); }, configurable: true }	
	});
	
	/////////////////////////////////////////////////////////////////////////
	
	
	Game_Action.EFFECT_GAIN_ABP         = 100;
	
	var _HC_GAction_applyItemEffect = Game_Action.prototype.applyItemEffect;
	Game_Action.prototype.applyItemEffect = function(target, effect) {
		_HC_GAction_applyItemEffect.call(this,target,effect);
    	switch (effect.code) {
    	case Game_Action.EFFECT_GAIN_ABP:
        	this.itemEffectGainAbp(target, effect);
        	break;
     	}
    };
    
    Game_Action.prototype.itemEffectGainAbp = function(target, effect) {
    	var value1 = effect.value1;
    	var value2 = effect.value2;
    	var valueMin = Math.min(value1,value2);
    	var valueDiff = Math.max(value1,value2) - valueMin + 1;
    	var value = valueMin + Math.randomInt(valueDiff);
        value *= this.subject().abr;
    	value = Math.floor(value);
    	if (value !== 0) {
        	target.gainAbp(value);
        	this.makeSuccess(target);
    	}
	};
	
	var _HC_GAction_hasItemAnyValidEffects = Game_Action.prototype.hasItemAnyValidEffects;
	Game_Action.prototype.hasItemAnyValidEffects = function(target) {
		HybridClassManager.createABPEffect(this.item());
		return _HC_GAction_hasItemAnyValidEffects.call(this,target);
    };


	var _HC_GAction_testItemEffect = Game_Action.prototype.testItemEffect;	
	Game_Action.prototype.testItemEffect = function(target, effect) {
		var result = _HC_GAction_testItemEffect.call(this,target,effect);
		if (effect.code === Game_Action.EFFECT_GAIN_ABP) {
			return target.isActor() && !target.isMaxClassLevel();
		}
		return result;
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	var _HC_GActor_setup = Game_Actor.prototype.setup;
	Game_Actor.prototype.setup = function(actorId) {
		this._classLevel = 1;
		this._abp = {};
		_HC_GActor_setup.call(this,actorId);
		this.initAbp();
		this.initClassLevel();
	};
	
	Game_Actor.prototype.initStatusClass = function() {
		var id = defaultStatusClassId;
		id = id === -1 ? this._actorId : id;
		var sId = this.actor().meta['ステータスクラス'] || this.actor().meta['STATUS_CLASS'];
		if (sId === undefined) { sId = id }
		if (!$dataClasses[Number(sId)]) { sId = reserveStatusClassId }
		this._statusClassId = Number(sId);
	};
	
	// 再定義
	Game_Actor.prototype.initExp = function() {
    	this._exp[this.statusClassId()] = this.currentLevelExp();
	};
	
	Game_Actor.prototype.initAbp = function() {
		this._abp[this._classId] = this.currentLevelAbp();
	};
	
	Game_Actor.prototype.initClassLevel = function() {
		this._classLevels = {};
		for(var i=0;i<$dataClasses.length;i++){
			if ($dataClasses[i]){
				this._classLevels[$dataClasses[i].id] = 1;
			}
		}
	};
	
	// 再定義
	Game_Actor.prototype.initSkills = function() {
    	this._skills = [];
    	this.currentClass().learnings.forEach(function(learning) {
        	if (learning.level <= this._classLevel) {
            	this.learnSkill(learning.skillId);
        	}
    	}, this);
    	this.currentStatusClass().learnings.forEach(function(learning) {
        	if (learning.level <= this._level) {
            	this.learnSkill(learning.skillId);
        	}
    	}, this);
	};
	
	Game_Actor.prototype.currentStatusClass = function() {
		return $dataClasses[this.statusClassId()];
	};
	
	Game_Actor.prototype.classLevel = function(id) {
		if (!this._classLevels){ this.initClassLevel() }
		if (this._classLevels[this._classId] !== this._classLevel){
			this._classLevels[this._classId] = this._classLevel;
		}
		return this._classLevels[id];
	};
	
	Game_Actor.prototype.currentClassLevel = function() {
		if (!this._classLevel){ this._classLevel = 1 }
		return this._classLevel;
	};
	
	Game_Actor.prototype.currentLevelAbp = function() {
    	return this.abpForLevel(this._classLevel);
	};
	
	Game_Actor.prototype.statusClassId = function() {
		if (!this._statusClassId){ this.initStatusClass() }
		return this._statusClassId;
	};
	
	// 再定義
	Game_Actor.prototype.changeClass = function(classId, keepExp) {
		this._abp = this._abp || {};
		if (keepExp) {
        	this._abp[classId] = this.currentAbp();
    	}
    	this.classLevel(classId);
    	this._changedClassList = this._changedClassList || [];
    	this.setChangedClassList(classId);
    	this._classId = classId;
    	this.changeAbp(this._abp[this._classId] || 0, false);
    	this.currentClass().learnings.forEach(function(learning) {
        	if (learning.level <= this._classLevel) {
            	this.learnSkill(learning.skillId);
        	}
    	}, this);
    	if (Imported['ySkillCPSystem']){ this._settingSkills = [] }
    	if (Imported['yPassiveSkill']){ this._passiveRefresh = true }
    	this.refresh();
	};
	
	Game_Actor.prototype.changeStatusClass = function(classId, keepExp) {
		if (keepExp) {
    	    this._exp[classId] = this.currentExp();
    	}
    	this._statusClassId = classId;
    	this.changeExp(this._exp[this._statusClassId] || 0, false);
    	this.refresh();
	};
	
	Game_Actor.prototype.setChangedClassList = function(classId) {
    	if (!this._changedClassList.contains(classId)){
    		this._changedClassList.push(classId);
    	}	
	};
	
	var _HC_GActor_releaseUnequippableItems = Game_Actor.prototype.releaseUnequippableItems;
	Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
		if (this._callForceChangeClass){ forcing = true };
		_HC_GActor_releaseUnequippableItems.call(this,forcing);
	};
	
	var _HC_GActor_traitObjects = Game_Actor.prototype.traitObjects;
	Game_Actor.prototype.traitObjects = function() {
		var objects = _HC_GActor_traitObjects.call(this);
		objects.push(this.currentStatusClass());
		objects.forEach(function(obj){
			HybridClassManager.createABPRate(obj);
		});
		return objects;
	};
	
	//再定義
	Game_Actor.prototype.paramBase = function(paramId) {
		var param1 = this.currentClass().params[paramId][this._classLevel];
		var param2 = this.currentStatusClass().params[paramId][this._level];
		return param1 + param2;
	};
	
	// 再定義
	Game_Actor.prototype.expForLevel = function(level) {
    	var c = this.currentStatusClass();
    	var basis = c.expParams[0];
    	var extra = c.expParams[1];
    	var acc_a = c.expParams[2];
    	var acc_b = c.expParams[3];
    	return Math.round(basis*(Math.pow(level-1, 0.9+acc_a/250))*level*
            	(level+1)/(6+Math.pow(level,2)/50/acc_b)+(level-1)*extra);
	};
	
	Game_Actor.prototype.abpForLevel = function(level) {
    	var c = this.currentClass();
    	var basis = c.expParams[0];
    	var extra = c.expParams[1];
    	var acc_a = c.expParams[2];
    	var acc_b = c.expParams[3];
    	return Math.round(basis*(Math.pow(level-1, 0.9+acc_a/250))*level*
            	(level+1)/(6+Math.pow(level,2)/50/acc_b)+(level-1)*extra);
	};
	
	// 再定義
	Game_Actor.prototype.changeExp = function(exp, show) {
		if (Imported['ySkillCPSystem']){ this._callMaster = true }
    	this._exp[this.statusClassId()] = Math.max(exp, 0);
    	var lastLevel = this._level;
    	var lastSkills = this.skills();
    	while (!this.isMaxLevel() && this.currentExp() >= this.nextLevelExp()) {
        	this.levelUp();
    	}
    	while (this.currentExp() < this.currentLevelExp()) {
        	this.levelDown();
    	}
    	if (show && this._level > lastLevel) {
        	this.displayLevelUp(this.findNewSkills(lastSkills));
    	}
		if (Imported['ySkillCPSystem']){ this._callMaster = false }
    	this.refresh();
	};
	
	Game_Actor.prototype.changeAbp = function(abp, show) {
		if (Imported['ySkillCPSystem']){ this._callMaster = true }
    	this._abp[this._classId] = Math.max(abp, 0);
    	var lastLevel = this.currentClassLevel();
    	var lastSkills = this.skills();
    	while (!this.isMaxClassLevel() && this.currentAbp() >= this.nextClassLevelAbp()) {
        	this.classLevelUp();
    	}
    	while (this.currentAbp() < this.currentClassLevelAbp()) {
        	this.classLevelDown();
    	}
    	if (show && this._classLevel > lastLevel) {
        	this.displayClassLevelUp(this.findNewSkills(lastSkills));
    	}
		if (Imported['ySkillCPSystem']){ this._callMaster = false }
    	this.refresh();
	};
	
	Game_Actor.prototype.changeClassLevel = function(level, show) {
    	var level = level.clamp(1, this.maxClassLevel());
    	this.changeAbp(this.abpForLevel(level), show);
	};
	
	// 再定義
	Game_Actor.prototype.currentExp = function() {
		return this._exp[this.statusClassId()];
	};
	
	Game_Actor.prototype.currentAbp = function() {
		return this._abp[this._classId];
	};
	
	Game_Actor.prototype.gainAbp = function(abp) {
		var newAbp = this.currentAbp() + Math.round(abp * this.finalAbpRate());
    	this.changeAbp(newAbp, this.shouldDisplayLevelUp());
	};
	
	Game_Actor.prototype.nextClassLevelAbp = function() {
    	return this.abpForLevel(this._classLevel + 1);
	};
	
	Game_Actor.prototype.currentClassLevelAbp = function() {
   		return this.abpForLevel(this._classLevel);
	};
	
	Game_Actor.prototype.finalAbpRate = function() {
    	return this.abr * (this.isBattleMember() ? 1 : this.benchMembersAbpRate());
	};
	
	Game_Actor.prototype.nextRequiredAbp = function() {
    	return this.nextClassLevelAbp() - this.currentAbp();
	};
	
	Game_Actor.prototype.benchMembersAbpRate = function() {
    	return $dataSystem.optExtraExp ? 1 : 0;
	};
	
	Game_Actor.prototype.maxClassLevel = function() {
		var c = this.currentClass();
		if (!c._maxLevel){ HybridClassManager.createClassStatus(c) }
		 return c._maxLevel;
	};
	
	Game_Actor.prototype.isMaxClassLevel = function() {
		return this._classLevel >= this.maxClassLevel();
	};
	
	Game_Actor.prototype.isMaster = function(classId) {
		if (classId === this._classId){
			return this.isMaxClassLevel();
		} else {
			var c = $dataClasses[classId];
			if (!c){ return false }
			return  this._classLevels[classId] >= c._maxLevel; 
		}
	};
	
	// 再定義
	Game_Actor.prototype.levelUp = function() {
    	this._level++;
    	this.currentStatusClass().learnings.forEach(function(learning) {
        	if (learning.level === this._level) {
            	this.learnSkill(learning.skillId);
        	}
    	}, this);
	};
	
	Game_Actor.prototype.classLevelUp = function() {
		if (this.isMaxClassLevel()) { return }
    	this._classLevel++;
    	this.currentClass().learnings.forEach(function(learning) {
        	if (learning.level === this._classLevel) {
            	this.learnSkill(learning.skillId);
        	}
    	}, this);
	};
	
	Game_Actor.prototype.classLevelDown = function() {
    	this._classLevel--;
	};
	
	Game_Actor.prototype.displayClassLevelUp = function(newSkills) {
    	var text = displayClassLevelUp;
    	text = text.replace(/_name/,this._name);
    	text = text.replace(/_class/,this.currentClass().name);
    	text = text.replace(/_num/,this._classLevel);
    	$gameMessage.newPage();
    	$gameMessage.add(text);
    	newSkills.forEach(function(skill) {
        	$gameMessage.add(TextManager.obtainSkill.format(skill.name));
    	});
    	if (this.isMaxClassLevel()){
    		this.displayMasterClass();
    	}
	};
	
	Game_Actor.prototype.displayMasterClass = function() {
    	var text = displayClassLevelUpMaster;
    	text = text.replace(/_name/,this._name);
    	text = text.replace(/_class/,this.currentClass().name);
    	$gameMessage.add(text);
	};
	
	Game_Actor.prototype.isClassChangeable = function(classId) {
		var c = $dataClasses[classId];
		if (!c) { return false }
		if (!c._changeable){ return false }
		if (!c._changeCond){ HybridClassManager.createClassStatus() }
		if (knownChangeable && this.isClassKnown(classId)){ return true }
		for (var i=0;i<c._changeCond.length;i++) {
			if (!this.checkClassConditions(c._changeCond[i])){
				return false;
			}
		}
		return true;
	};
	
	Game_Actor.prototype.isClassKnown = function(classId) {
		return this.changedClassList().contains(classId);
	}
	
	Game_Actor.prototype.changedClassList = function() {
		this._changedClassList = this._changedClassList || [];
		if (this._changedClassList.length === 0) {
			this._changedClassList.push(this._classId);
		}
		return this._changedClassList;
	};
	
	Game_Actor.prototype.checkClassConditions = function(cond) {
		value = cond.value;
		switch(cond.cond){
		case 'actor':
			if (!cond.value.contains(String(this._actorId))){ return false }
			break;
		case 'level':
			if (cond.value[1] === '上'){
				if ( this._level < Number(cond.value[0]) ){ return false }
			}else{
				if ( this._level > Number(cond.value[0]) ){ return false }
			}
			break;
		case 'class':
			if (!cond.value.contains(String(this._classId))){ return false }
			break;
		case 'classLevel':
			if (cond.value[2] === '上'){
				if ( this.classLevel(Number(cond.value[0])) < Number(cond.value[1]) ){ return false }
			}else{
				if ( thisclassLevel(Number(cond.value[0])) > Number(cond.value[1]) ){ return false }
			}
			break;
		case 'skill':
			var result = false;
			for(var i=0;i<cond.value[0].length;i++){
				var skillId = Number(value[0][i]);
				var flag = this.isLearnedSkill(skillId);
				if (cond.value[1] === 'いる' && flag){ result = true }
				if (cond.value[1] === 'いない' && !result) { result = true }
			}
			if (!result) { return false }
			break;
		case 'item':
			var result = false;
			for (var i=0;i<cond.value[0].length;i++){
				var value = cond.value[0][i];
				value = value.replace(/([IWA])/,'');
				var type = RegExp.$1;
				var item = null;
				if (type === 'I' || type === 'i'){ item = $dataItems[Number(value)] }
				if (type === 'W' || type === 'w'){ item = $dataWeapons[Number(value)] }
				if (type === 'A' || type === 'a'){ item = $dataArmors[Number(value)] }
				var flag = $gameParty.hasItem(item, true);
				if (cond.value[1] === 'いる' && flag ){ result = true }
				if ( cond.value[1] === 'いない' && !flag ){ result = true }
			}
			if (!result) { return false }
			break;
		case 'equip':
			var result = false;
			for (var i=0;i<cond.value[0].length;i++){
				var value = cond.value[0][i];
				value = value.replace(/([WA])/,'');
				var type = RegExp.$1;
				var flag = true;
				if (type === 'W' || type === 'w'){ flag = this.hasWeapon($dataWeapons[Number(value)]) }
				if (type === 'A' || type === 'a'){ flag = this.hasArmor($dataArmors[Number(value)]) }
				if ( cond.value[1] === 'いる' && flag ){ result = true }
				if ( cond.value[1] === 'いない' &&  !flag ){ result = true }
			}
			if (!result) { return false }
			break;
		case 'status':
			var value = this.getCondParams(cond.value[0]);
			if (cond.value[2] === '上' && value < Number(cond.value[1])){ return false }
			if (cond.value[2] === '下' && value > Number(cond.value[1])){ return false }
			break;
		case 'switch':
			var result = false;
			for (var i=0;i<cond.value[0].length;i++){
				var id = Number(cond.value[0][i]);
				var flag = $gameSwitches.value(id);
				if (cond.value[1] === 'ON' && flag ){ result = true }
				if (cond.value[1] === 'OFF' && !flag){ result = true }
			}
			if (!result) { return false }
			break;
		case 'variable':
			var num = $gameVariables.value(Number(cond.value[0]))
			if (cond.value[2] === '上'){
				if (num < Number(cond.value[1])) { return false }
			}else{
				if (num > Number(cond.value[1])) { return false }
			}
			break;
		}
		return true;
	};
	
	Game_Actor.prototype.getCondParams = function( key ) {
		switch(key){
		case 'Level':
		case 'Lv':
		case TextManager.basic(0):
		case TextManager.basic(1):
			return this.isActor() ? this._level : 0;
		case 'HP':
		case 'ＨＰ':
		case TextManager.basic(2):
		case TextManager.basic(3):
			if (conditions[2] === ''){
				return this.hp;
			}else{
				return Math.floor((this.hp / this.mhp) * 100);
			}
		case 'MP':
		case 'ＭＰ':
		case TextManager.basic(4):
		case TextManager.basic(5):
			if (conditions[2] === ''){
				return this.mp;
			}else{
				return Math.floor((this.mp / this.mmp) * 100);
			}
		case 'TP':
		case 'ＴＰ':
		case TextManager.basic(6):
		case TextManager.basic(7):
			return this.tp;
		case 'EXP':
		case 'ＥＸＰ':
		case '経験値':
		case TextManager.basic(8):
		case TextManager.basic(9):
			return this.isActor() ? this.currentExp() : 0;
		case '最大HP':
		case '最大ＨＰ':
		case TextManager.param[0]:
			return condInludeTrait ? this.mhp : this.paramBase(0);
		case '最大MP':
		case '最大ＭＰ':
		case TextManager.param[1]:
			return condIncludeTrait ? this.mmp : this.paramBase(1);
		case 'ATK':
		case 'ＡＴＫ':
		case '攻撃力':
		case TextManager.param[2]:
			return condIncludeTrait ? this.atk : this.paramBase(2);
		case 'DEF':
		case 'ＤＥＦ':
		case '防御力':
		case TextManager.param[3]:
			return condIncludeTrait ? this.def : this.paramBase(3);
		case 'MAT':
		case 'ＭＡＴ':
		case '魔法力':
		case TextManager.param[4]:
			return condIncludeTrait ? this.mat : this.paramBase(4);
		case 'MDF':
		case 'ＭＤＦ':
		case '魔法防御':
		case TextManager.param[5]:
			return condIncludeTrait ? this.mdf : this.paramBase(5);
		case 'AGI':
		case 'ＡＧＩ':
		case '敏捷性':
		case TextManager.param[6]:
			return condIncludeTrait ? this.agi : this.paramBase(6);
		case 'LUK':
		case 'ＬＵＫ':
		case '運':
		case TextManager.param[7]:
			return condIncludeTrait ? this.luk : this.paramBase(7);
		case 'HIT':
		case 'ＨＩＴ':
		case '命中率':
		case TextManager.param[8]:
			return Math.floor(this.hit * 100);
		case 'EVA':
		case 'ＥＶＡ':
		case '回避率':
		case TextManager.param[9]:
			return Math.floor(this.eva * 100);
		case 'CRI':
		case 'ＣＲＩ':
		case '会心率':
			return Math.floor(this.cri * 100);
		case 'CEV':
		case 'ＣＥＶ':
		case '会心回避率':
			return Math.floor(this.cev * 100);
		case 'MEV':
		case 'ＭＥＶ':
		case '魔法回避率':
			return Math.floor(this.mev * 100);
		case 'MRF':
		case 'ＭＲＦ':
		case '魔法反射率':
			return Math.floor(this.mrf * 100);
		case 'CNT':
		case 'ＣＮＴ':
		case '反撃率':
			return Math.floor(this.cnt * 100);
		case 'HRG':
		case 'ＨＲＧ':
		case 'HP再生率':
		case 'ＨＰ再生率':
			return Math.floor(this.hrg * 100);
		case 'MRG':
		case 'ＭＲＧ':
		case 'MP再生率':
		case 'ＭＰ再生率':
			return Math.floor(this.mrg * 100);
		case 'TRG':
		case 'ＴＲＧ':
		case 'TP再生率':
		case 'ＴＰ再生率':
			return Math.floor(this.trg * 100);
		case 'TGR':
		case 'ＴＧＲ':
		case '狙われ率':
			return Math.floor(this.tgr * 100);
		case 'GRD':
		case 'ＧＲＤ':
		case '防御効果率':
			return Math.floor(this.grd * 100);
		case 'REC':
		case 'ＲＥＣ':
		case '回復効果率':
			return Math.floor(this.rec * 100);
		case 'PHA':
		case 'ＰＨＡ':
		case '薬の知識':
			return Math.floor(this.pha * 100);
		case 'MCR':
		case 'ＭＣＲ':
		case 'MP消費率':
		case 'ＭＰ消費率':
			return Math.floor(this.mcr * 100);
		case 'TCR':
		case 'ＴＣＲ':
		case 'TPチャージ率':
		case 'ＴＰチャージ率':
			return Math.floor(this.tcr * 100);
		case 'PDR':
		case 'ＰＤＲ':
		case '物理ダメージ率':
			return Math.floor(this.pdr * 100);
		case 'MDR':
		case 'ＭＤＲ':
		case '魔法ダメージ率':
			return Math.floor(this.mdr * 100);
		case 'FDR':
		case 'ＦＤＲ':
		case '床ダメージ率':
			return Math.floor(this.fdr * 100);
		case 'EXR':
		case 'ＥＸＲ':
		case '経験値獲得率':
			return Math.floor(this.exr * 100);
		case 'ABR':
		case 'ＡＢＲ':
		case 'ABP獲得率':
		case 'ＡＢＰ獲得率':
			return Math.floor(this.abr * 100);
		default:
			return 0;
		}
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	Game_Interpreter.prototype.checkMaster = function(classId) {
		for (var i=0;i<$dataActors.length;i++){
			var actor = $dataActors[i];
			if (actor) {
				if ($gameActors[actor.id].isMaster(classId)){
					return true;
				}
			}
		}
		return false;
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	Game_Enemy.prototype.abp = function() {
		if (!this.enemy().abp) {
			var abp = this.enemy().meta['ABP'];
			if (abp === undefined || Number(abp) === NaN) {
				abp = defaultClassPoint;
			}
			this.enemy().abp = Number(abp);
		}
    	return this.enemy().abp;
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	Game_Troop.prototype.abpTotal = function() {
    	abp = this.deadMembers().reduce(function(r, enemy) {
    	    return r + enemy.abp();
    	}, 0);
    	return Math.ceil(abp);
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	// 再定義 クラスレベルの表示を追加する
	Window_Base.prototype.drawActorClass = function(actor, x, y, width) {
    	width = width || 168;
    	this.resetTextColor();
    	var text = actor.currentClass().name;
    	var levelA = displayClassLevelA;
    	if (actor.isMaxClassLevel()){
    		text = text + levelA + masterLevelText;	
    	} else {
    		text = text + levelA + actor.currentClassLevel();
    	}
    	this.drawText(text, x, y, width);
    	
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	// 再定義　表示を詰めてABPの情報を追加する
	Window_Status.prototype.drawExpInfo = function(x, y) {
    	var lineHeight = this.lineHeight();
    	var expTotal = TextManager.expTotal.format(TextManager.exp);
    	var expNext = TextManager.expNext.format(TextManager.level);
    	var value1 = this._actor.currentExp();
    	var value2 = this._actor.nextRequiredExp();
    	if (this._actor.isMaxLevel()) {
        	value1 = '-------';
        	value2 = '-------';
    	}
    	this.changeTextColor(this.systemColor());
    	this.drawText(expTotal, x, y + lineHeight * 0, 270);
    	this.drawText(expNext, x, y + lineHeight * 1, 270);
    	this.resetTextColor();
    	this.drawText(value1, x, y + lineHeight * 0, 320, 'right');
    	this.drawText(value2, x, y + lineHeight * 1, 320, 'right');
    	this.drawAbpInfo(x, y + lineHeight * 2);
	};
	
	Window_Status.prototype.drawAbpInfo = function(x, y) {
    	var lineHeight = this.lineHeight();
    	var expTotal = displayStatusNow;
    	var expNext = displayStatusNext;
    	var value1 = this._actor.currentAbp();
    	var value2 = this._actor.nextRequiredAbp();
    	if (this._actor.isMaxClassLevel()) {
        	value1 = '-------';
        	value2 = '-------';
    	}
    	this.changeTextColor(this.systemColor());
    	this.drawText(expTotal, x, y + lineHeight * 0, 270);
    	this.drawText(expNext, x, y + lineHeight * 1, 270);
    	this.resetTextColor();
    	this.drawText(value1, x, y + lineHeight * 0, 320, 'right');
    	this.drawText(value2, x, y + lineHeight * 1, 320, 'right');
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	function Window_ClassList() {
		this.initialize.apply(this, arguments);
	};

	Window_ClassList.prototype = Object.create(Window_Command.prototype);
	Window_ClassList.prototype.constructor = Window_ClassList;
	
	Window_ClassList.prototype.setActor = function(actor) {
		this._actor = actor;
		this.refresh();
	};
	
	Window_ClassList.prototype.makeCommandList = function() {
		this.clearCommandList();
		for (var i=0;i<$dataClasses.length;i++){
			var c = $dataClasses[i];
			if (this.isEnable(c)){
				var enable = this._actor.isClassChangeable(c.id);
				this.addCommand(c.name,String(c.id),enable,c);
			}
		}
	};
	
	Window_ClassList.prototype.isEnable = function( c ) {
		if (!this._actor) { return false }
		if (!c) { return false }
		if (!c._initialized){ HybridClassManager.createClassStatus(c) }
		if (!c._changeable){ return false }
		if (!(this._actor.isClassChangeable(c.id) || this._actor.isClassKnown(c.id))){ return false }
		return true;
	};
	
	Window_ClassList.prototype.windowWidth = function() {
		return 504;
	};
	
	Window_ClassList.prototype.windowHeight = function() {
		return 288;
	};
	
	Window_ClassList.prototype.setStatusWindow = function(statusWindow) {
		this._statusWindow = statusWindow;
	};
	
	Window_ClassList.prototype.setClassStatusWindow = function(classStatusWindow) {
		this._classStatusWindow = classStatusWindow;
		this.callUpdateHelp();
	};
	
	Window_ClassList.prototype.updateHelp = function() {
		Window_Command.prototype.updateHelp.call(this);
		this.setHelpWindowItem(this.currentExt());
    	if (this._actor && this._statusWindow && this.currentExt()) {
        	var actor = JsonEx.makeDeepCopy(this._actor);
        	actor._callForceChangeClass = true;
        	actor.changeClass(this.currentExt().id);
        	this._statusWindow.setTempActor(actor);
        	this._classStatusWindow.setTempActor(actor);
    	}
	};
	
	Window_ClassList.prototype.drawItem = function(index) {
    	var rect = this.itemRectForText(index);
        this.resetTextColor();
        if (this._actor._classId === this._list[index].ext.id){
        	this.changeTextColor(this.powerUpColor());
        }
    	this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index),rect.x,rect.y,rect.width);
        this.drawClassLevel(index);
	};
	
	Window_ClassList.prototype.drawClassLevel = function(index) {
		var c = this._list[index].ext;
		var text = '';
		var rect = this.itemRectForText(index);
		if (this._actor.classLevel(c.id) >= c._maxLevel) {
			this.changeTextColor(this.textColor(masterColor));
			text = classMaster;
		} else {
			this.changeTextColor(this.systemColor());
			this.drawText(showNameClassLevel,rect.x+240,rect.y,rect.width-240);
			this.changeTextColor(this.normalColor());
			text = this._actor.classLevel(c.id);
		}
		this.drawText(text,rect.x,rect.y,rect.width,'right');
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	function Window_ClassStatus() {
		this.initialize.apply(this, arguments);
	};

	Window_ClassStatus.prototype = Object.create(Window_Base.prototype);
	Window_ClassStatus.prototype.constructor = Window_ClassStatus;
	
	Window_ClassStatus.prototype.standardPadding = function() {
		return 12;
	};
	
	Window_ClassStatus.prototype.learnings = function() {
		var learnings = this._tempActor.currentClass().learnings;
		return learnings.sort(function(a, b) {
            var r = a.level - b.level;
            if (r === 0){ r = a.skillId - b.skillId }
            return r;
        });
	};
	
	Window_ClassStatus.prototype.setActor = function(actor) {
		this._actor = actor;
	};
	
	Window_ClassStatus.prototype.lineColor = function() {
    	return this.normalColor();
	};
	
	Window_ClassStatus.prototype.drawVerLine = function(x,headPos) {
		headPos = headPos ? headPos : 0;
		var lineX = x + (this.lineHeight() / 2) - 1;
		var h = this.contents.height - 12 - headPos;
		this.contents.fillRect(lineX, 6+headPos, 3, h, this.lineColor());
	};
	
	Window_ClassStatus.prototype.refresh = function() {
		this.contents.clear();
		this.drawAllItems();
	};
	
	Window_ClassStatus.prototype.setTempActor = function(tempActor) {
		if (this.tempActor == tempActor){ return }
		this._tempActor = tempActor;
		this.refresh();
	};
	
	Window_ClassStatus.prototype.drawAllItems = function() {
		this.drawVerLine(240);
		this.drawClassStatus();
		for (var i=0;i<this.learnings().length;i++) {
			this.drawItem(i);
		}
	};
	
	Window_ClassStatus.prototype.drawClassStatus = function() {
        this.resetFontSettings();
        var c = this._tempActor.currentClass();
        var r1 = c.traits.filter(function(trait){ return trait.code === 51 });
        var r2 = c.traits.filter(function(trait){ return trait.code === 52 });
        
        this.changeTextColor(this.normalColor());
        this.drawText(c.name,0,0,240);
        this.changeTextColor(this.systemColor());
        
        this.contents.fontSize = 20;
        this.drawText(equippableWTypeTitle,0,this.lineHeight(),240);
        this.contents.fontSize = this.standardFontSize();
        var wtypeIcons = weaponTypeIcons.split(',');
        for(var i=0;i<r1.length;i++) {
        	var n = Number(wtypeIcons[r1[i].dataId-1]);
        	if (n !== NaN){
        		var itemWidth = Math.min(34,Math.floor(240/r1.length));
        		this.drawIcon(n,itemWidth*i,this.lineHeight()+36);
        	}
        }
        
        this.contents.fontSize = 20;
        this.drawText(equippableATypeTitle,0,this.lineHeight()*3+12,240);
        this.contents.fontSize = this.standardFontSize();
        var atypeIcons = armorTypeIcons.split(',');
        for(var i=0;i<r2.length;i++) {
        	var n = Number(atypeIcons[r2[i].dataId-1]);
        	if (n !== NaN){
        		var itemWidth = Math.min(34,Math.floor(240/r2.length));
        		this.drawIcon(n,itemWidth*i,this.lineHeight()*3+36+12);
        	}
        }
	};
	
	Window_ClassStatus.prototype.drawItem = function(index) {
		this.resetTextColor();
		var text = 'LV:';
		var level = String(this.learnings()[index].level);
		var skill = $dataSkills[this.learnings()[index].skillId];
		var name = skill.name;
		var h = 22;
		if (level.length === 1){ level = ' ' + level }
		var hide = hideSkills !== '';
		if (hide && !this._actor.isLearnedSkill(skill.id)){
			var tmpText = '';
			for(var i=0;i<name.length;i++){
				tmpText += hideSkills;
			}
			name = tmpText;
		}
		text = text + level + ' ' + name;
		this.contents.fontSize = h;
		if (this._actor.isLearnedSkill(skill.id)){
			this.changeTextColor(this.powerUpColor());
		} 
		this.drawText(text,280+240*Math.floor(index/8),(h+2)*(index%8));
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	function Window_ClearSkill() {
		this.initialize.apply(this, arguments);
	};

	Window_ClearSkill.prototype = Object.create(Window_Selectable.prototype);
	Window_ClearSkill.prototype.constructor = Window_ClearSkill;
	
	Window_ClearSkill.prototype.initialize = function() {
    	Window_Selectable.prototype.initialize.call(this, 0,0,32,32);
		this.width = this.textWidth(clearSetSkillsText) + 48;
		this.height = this.standardFontSize() + this.standardPadding() * 2 + 8;
		this.x = Math.floor((Graphics.boxWidth - this.width) / 2);
		this.y = Math.floor((Graphics.boxHeight - this.height) / 2);
    	this.createContents();
    	this.deactivate();
    	this.hide();
    	this.refresh();
	};
	
	
	Window_ClearSkill.prototype.processTouch = function() {
    	if (this.isOpenAndActive()) {
    	    if (TouchInput.isTriggered() || TouchInput.isCancelled()) {
				this.processOk();
			}
		}
	};
	
	Window_ClearSkill.prototype.processOk = function() {
        //this.playOkSound();
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
	};
	
	Window_ClearSkill.prototype.refresh = function() {
		this.contents.clear();
		this.drawText(clearSetSkillsText,0,0,this.width);
	};
	
	//-----------------------------------------------------------------------------
	// Scene_ClassChange
	//-----------------------------------------------------------------------------

	function Scene_ClassChange() {
    	this.initialize.apply(this, arguments);
	}

	Scene_ClassChange.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_ClassChange.prototype.constructor = Scene_ClassChange;

	Scene_ClassChange.prototype.initialize = function() {
    	Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_ClassChange.prototype.create = function() {
    	Scene_MenuBase.prototype.create.call(this);
    	this.createHelpWindow();
    	this.createStatusWindow();
    	this.createSlotWindow();
    	this.createClassStatusWindow();
    	if (Imported['ySkillCPSystem']) {
    		this.createClearWindow();
    	}
    	this.refreshActor();
    	this.selectActorClass();
	};

	Scene_ClassChange.prototype.createStatusWindow = function() {
    	this._statusWindow = new Window_EquipStatus(0, this._helpWindow.height);
    	this.addWindow(this._statusWindow);
	};

	Scene_ClassChange.prototype.createSlotWindow = function() {
    	var wx = this._statusWindow.width;
    	var wy = this._helpWindow.height;
    	var ww = Graphics.boxWidth - this._statusWindow.width;
    	var wh = this._statusWindow.height;
    	this._slotWindow = new Window_ClassList(wx, wy, ww, wh);
    	this._slotWindow.setHelpWindow(this._helpWindow);
    	this._slotWindow.setStatusWindow(this._statusWindow);
    	this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
    	this._slotWindow.setHandler('cancel',   this.popScene.bind(this));
    	this._slotWindow.setHandler('pagedown', this.nextActor.bind(this));
    	this._slotWindow.setHandler('pageup',   this.previousActor.bind(this));
    	this.addWindow(this._slotWindow);
	};

	Scene_ClassChange.prototype.createClassStatusWindow = function() {
    	var wx = 0;
    	var wy = this._statusWindow.y + this._statusWindow.height;
    	var ww = Graphics.boxWidth;
    	var wh = Graphics.boxHeight - wy;
    	this._classStatusWindow = new Window_ClassStatus(wx, wy, ww, wh);
    	this._slotWindow.setClassStatusWindow(this._classStatusWindow);
    	this.addWindow(this._classStatusWindow);
	};
	
	Scene_ClassChange.prototype.createClearWindow = function() {
		this._clearWindow = new Window_ClearSkill();
		this._clearWindow.setHandler('ok', this.onClearOk.bind(this));
		this._clearWindow.close();
		this.addWindow(this._clearWindow);
	};

	Scene_ClassChange.prototype.refreshActor = function() {
    	var actor = this.actor();
    	this._statusWindow.setActor(actor);
    	this._slotWindow.setActor(actor);
    	this._classStatusWindow.setActor(actor);
	};

	Scene_ClassChange.prototype.onSlotOk = function() {
		SoundManager.playEquip();
    	this.actor().changeClass(this._slotWindow.currentExt().id);
    	if (this._clearWindow && !this.actor().settingSkills().length > 0){
    		this._clearWindow.show();
    		this._clearWindow.open();
    		this._clearWindow.activate();
    	} else {
    		this._slotWindow.activate();
    	}
    	this._slotWindow.refresh();
    	this._classStatusWindow.refresh();
    	this._statusWindow.refresh();
    };
    
    Scene_ClassChange.prototype.onClearOk = function() {
    	this._clearWindow.close();
    	this._clearWindow.deactivate();
    	this._slotWindow.activate();
    };

	Scene_ClassChange.prototype.onActorChange = function() {
    	this.refreshActor();
    	this._slotWindow.activate();
    	this.selectActorClass();
	};
	
	Scene_ClassChange.prototype.selectActorClass = function() {
    	this._slotWindow.selectSymbol(String(this.actor()._classId));
	};
	
	////////////////////////////////////////////////////////////////////////////////////	

	var _HC_WMCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
	Window_MenuCommand.prototype.addOriginalCommands = function() {
		_HC_WMCommand_addOriginalCommands.call(this);
		if (addMenuClassChange){
        	this.addCommand(classChangeCommandName, 'classChange', true);
        }
	};

	var _HC_SMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		_HC_SMenu_createCommandWindow.call(this);
    	this._commandWindow.setHandler('classChange',   this.commandPersonal.bind(this));
	}
	var _HC_SMenu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
	Scene_Menu.prototype.onPersonalOk = function() {
		_HC_SMenu_onPersonalOk.call(this);
		if (this._commandWindow.currentSymbol() === 'classChange'){
        	SceneManager.push(Scene_ClassChange);
		}
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	if (Imported['EquipAndShopStatusR']){
	Scene_ClassChange.prototype.createSlotWindow = function() {
    	var wx = this._statusWindow.width;
    	var wy = this._helpWindow.height;
    	var ww = Graphics.boxWidth - this._statusWindow.width;
    	var wh = 288;
    	this._slotWindow = new Window_ClassList(wx, wy, ww, wh);
    	this._slotWindow.setHelpWindow(this._helpWindow);
    	this._slotWindow.setStatusWindow(this._statusWindow);
    	this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
    	this._slotWindow.setHandler('cancel',   this.popScene.bind(this));
    	this._slotWindow.setHandler('pagedown', this.nextActor.bind(this));
    	this._slotWindow.setHandler('pageup',   this.previousActor.bind(this));
    	this._slotWindow.setHandler('right',	this.nextPage.bind(this));
    	this._slotWindow.setHandler('left',	   	this.prevPage.bind(this));
    	this.addWindow(this._slotWindow);
	};

	Scene_ClassChange.prototype.createClassStatusWindow = function() {
    	var wx = this._statusWindow.width;
    	var wy = this._slotWindow.y + this._slotWindow.height;
    	var ww = this._slotWindow.width;
    	var wh = Graphics.boxHeight - wy;
    	this._classStatusWindow = new Window_ClassStatus(wx, wy, ww, wh);
    	this._slotWindow.setClassStatusWindow(this._classStatusWindow);
    	this.addWindow(this._classStatusWindow);
	};
	
	var _SCChange_nextActor = Scene_ClassChange.prototype.nextActor;
	Scene_ClassChange.prototype.nextActor = function() {
    	_SCChange_nextActor.call(this);
    	this._statusWindow._pageIndex = 0;
	};

	var _SCChange_previousActor = Scene_ClassChange.prototype.previousActor;
	Scene_ClassChange.prototype.previousActor = function() {
		_SCChange_previousActor.call(this);
    	this._statusWindow._pageIndex = 0;
	};
	
	Scene_ClassChange.prototype.nextPage = function() {
		this._statusWindow.nextPage();
	};
	
	Scene_ClassChange.prototype.prevPage = function() {
		this._statusWindow.prevPage();
	};
	}
}());