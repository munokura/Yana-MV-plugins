//
//  フェイズスキル特徴 ver1.06
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
Imported['PhaseSkillTrait'] = 1.06;

/*:
 * @plugindesc ver1.06/条件を満たすと戦闘開始時やターン開始時、ターン終了時等にスキルを発動する特徴を設定できるようになります。
 * @author Yana
 * 
 * @param Invoke Count
 * @desc それぞれのフェイズでスキル(アイテム)が発動する最大数です。
 * @default 1
 * 
 * @param Invoke Count Subject
 * @desc それぞれのフェイズで一人がスキル(アイテム)が発動できる最大数です。
 * @default 1
 * 
 * @param Sort Type
 * @desc 発動順の並び替えの種類です。
 * 0:味方→敵の順、1:0の逆順、2:行動速度順、3:ランダム
 * @default 2
 * 
 * @param Battle Start Skill Text
 * @desc 戦闘開始時に発動した時のテキスト。_nameが発動者名に
 * _mes1,_mes2がスキルのメッセージ1、2行目に置き換わります。
 * @default \C[10]_nameの先制スキルが発動した！
 * 
 * @param Turn Start Skill Text
 * @desc ターン開始時に発動した時のテキスト。_nameが発動者名に
 * _mes1,_mes2がスキルのメッセージ1、2行目に置き換わります。
 * @default _nameのスタートフェイズスキルが発動した！
 * 
 * @param Turn End Skill Text
 * @desc ターン終了時に発動した時のテキスト。_nameが発動者名に
 * _mes1,_mes2がスキルのメッセージ1、2行目に置き換わります。
 * @default _nameのエンドフェイズスキルが発動した！
 * 
 * @param Is Display Use Log
 * @desc フェイズスキル発動時に使用ログを表示するかの設定です。
 * true/falseで設定してください。
 * @default false
 * 
 * @help ------------------------------------------------------
 * 注意
 * ------------------------------------------------------
 * 
 * ・このプラグインの動作には、ConditionallyCoreのプラグインが必要です。
 * ・ConditionallyCoreよりも下に配置してください。
 * ・自身やパーティ、トループ単位以外の対象が必要な条件は、正常に動作しない可能性があります。
 * 
 * ------------------------------------------------------
 * このプラグインにプラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------
 * 設定方法
 * ------------------------------------------------------
 * アクターやクラス、装備やステートといった特徴を持つオブジェクトのメモ欄に、
 * 発動タイミングに合わせて以下のように記述します。
 * 
 * ※戦闘開始時に発動する場合
 * <バトルスタートフェイズ:xy,z%>
 * この間に条件を記述
 * </バトルスタートフェイズ>
 * 
 * ※ターン開始時に発動する場合
 * <ターンスタートフェイズ:xy,z%>
 * この間に条件を記述
 * </ターンスタートフェイズ>
 * 
 * ※ターン終了時に発動する場合
 * <ターンエンドフェイズ:xy,z%>
 * この間に条件を記述
 * </ターンエンドフェイズ>
 * 
 * 使用可能な条件はConditionallyCoreに準拠します。
 * 
 * xにはIまたはSが入ります。Iを入れた場合はアイテムが、Sを入れた場合はスキルが発動します。
 * yにはアイテムまたはスキルのIDを指定します。
 * zには発動率を設定します。
 * 
 * ver1.06より追加
 * スキルやアイテムのメモ欄に
 * <行動不能時発動可>
 * または、
 * <UnmovableEnable>
 * と記述すると、そのスキルは使用者が行動不能でも発動するようになります。
 * 
 * <混乱時発動可>
 * または、
 * <ConfuseEnable>
 * と記述すると、そのスキルは使用者が混乱状態でも発動するようになります。
 * その際、発動する対象は混乱時の対象に依存します。
 * 
 * ------------------------------------------------------
 * 仕様と解説
 * ------------------------------------------------------
 * ・注意にも記載しましたが、発動のタイミングの関係上、対象が必要な条件は対象が不明のため、
 * 正常に動作しない可能性が高いです。(一応、対象を作成し、一番先頭の対象で条件判定を行います)
 * ・この機能で発動したアイテムやスキルにはコストが発生しません。
 * ・解説には記載されていませんが、発動時のテキストには_item(発動したスキル・アイテム名に変換)を使用することができます。
 * ・発動時のテキストはnullと記述することで非表示にすることができます。
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
 * ver1.06:
 * 行動不可能な状態でもフェイズスキルが発動していたバグを修正。
 * バトルスタートフェイズに発動したスキルで敵を全滅させると、次の戦闘でバトルスタートフェイズスキルが正常に発動しないバグを修正。
 * 行動不能時や、混乱時に発動可能にする設定を追加。
 * バトルスタートフェイズ発動後にスリップダメージや回復が発動するバグを修正。
 * ver1.05:
 * ターンエンドフェイズに発動したスキルで戦闘が終了した場合、次回の戦闘でターンエンドフェイズスキルが正常に発動しないバグを修正。
 * ver1.043:
 * YEP_BattleEngineCore_v1.28dとの併用化処理を追加。
 * ver1.04:
 * 処理内容を少し変更。
 * メモ欄に記述するキーワードでISに加え、isも使用できるように追加。
 * ver1.03:
 * 逃げるのに失敗したとき、パーティのスタートフェイズスキル及びエンドフェイズスキルが発動しないように変更。
 * 逃げるのに失敗したとき、メッセージの表示終了を待たずにアニメとログが表示されるバグを修正。
 * ver1.02:
 * 使用ログを表示しない設定を追加。
 * ver1.01:
 * 条件追加効果と併用時、特定の状況下でエラーが発生するバグを修正。
 * ver1.00:
 * 公開
 */

(function(){
	////////////////////////////////////////////////////////////////////////////////////
	
	var parameters = PluginManager.parameters('PhaseSkillTrait');
	var invokeCount = Number(parameters['Invoke Count']) || 1;
	var invokeCountSubject = Number(parameters['Invoke Count Subject']) || 1;
	var sortType = Number(parameters['Sort Type']) || 2;
	var battleStartSkillText = String(parameters['Battle Start Skill Text'] || '_nameの先制スキルが発動した！');
	var turnStartSkillText = String(parameters['Turn Start Skill Text'] || '_nameのスタートフェイズスキルが発動した！');
	var turnEndSkillText = String(parameters['Turn End Skill Text'] || '_nameのエンドフェイズスキルが発動した！');
	var isDisplayUseLog = String(parameters['Is Display Use Log']) === 'true';
	
	////////////////////////////////////////////////////////////////////////////////////
	
	function SESkillManager() {
    	throw new Error('This is a static class');
	};
	
	SESkillManager.initCond = function(note){
		var texts = note.split('\n');
		var flag = false;
		var result = [];
		for(var i=0;i<texts.length;i++){
			if (flag){
				if (texts[i].match(/^<\/(?:バトル|ターン)(?:スタート|エンド)フェイズ>/)){
					result.push(effect);
					flag = false;
				}else{
					effect['conditions'].push(ConditionallyManager.makeCondition(texts[i]));
				}
			}else if (texts[i].match(/^<((?:バトル|ターン))((?:スタート|エンド))フェイズ:([ISis])(\d+),(\d+)[%％]>/)){
				var effect = {
					'var':RegExp.$1+RegExp.$2,
					'type':RegExp.$3,
					'id':parseInt(RegExp.$4),
					'rate':parseInt(RegExp.$5),
					'conditions':[]
					};
				flag = true;
			}
		}
		return result;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	DataManager.isUnmovableEnable = function(item) {
		if (!item){ return false }
		if (!!item.meta['行動不能時発動可']){ return true }
		if (!!item.meta['UnmovableEnable']){ return true }
		return false;
	};
	
	DataManager.isConfuseEnable = function(item) {
		if (!item){ return false }
		if (!!item.meta['混乱時発動可']){ return true }
		if (!!item.meta['ConfuseEnable']){ return true }
		return false;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var _SaEPS_BManager_startBattle = BattleManager.startBattle;
	BattleManager.startBattle = function() {
    	this.clearSaep();
		this._startTurn = true;
		_SaEPS_BManager_startBattle.call(this);
    };
    
    var _SaEPS_BManager_update = BattleManager.update;
    BattleManager.update = function() {
    	if (this._startTurn && this._phase === 'start'){
    		if (!this.isBusy() && !this.updateEvent()) {
    			this._saepPhase = 'battleStart';
    			this.executeSaepAction();
    		}
    	}else{
    		_SaEPS_BManager_update.call(this);
    	}
    };
    
    if (Imported.YEP_BattleEngineCore){
    var _SaEPSn_BManager_startTurn = BattleManager.startTurn;
    BattleManager.startTurn = function() {
    	this._callStartTurn = true;
    	_SaEPSn_BManager_startTurn.call(this);
    	this._callStartTurn = false;
    };
    
    var _SaEPS_BManager_getNextSubject = BattleManager.getNextSubject;
    BattleManager.getNextSubject = function() {
    	if (this._callStartTurn){ return null }
    	return _SaEPS_BManager_getNextSubject.call(this);
	};
	}
    
    var _SaEPS_BManager_startTurn = BattleManager.startTurn;
    BattleManager.startTurn = function() {
    	_SaEPS_BManager_startTurn.call(this);
    	this._saepPhase = 'turnStart';
    	this.executeSaepAction();
    };
    
    BattleManager.clearSaep = function() {
    	this._saepActions = null;
    	this._saepTurnEnd = false;
    	this._selectedEscape = false;
    	this._endSaep = false;
    	this._subject = null;
    	this._saepPhase = null;
    	this._preSaepTurn = null;
    	this._preSaepPhase = null;
    };
    
    var _SaEPS_BManager_endTurn = BattleManager.endTurn;
    BattleManager.endTurn = function() {
    	if (this._startTurn){
    		this._startTurn = false;
    		this._phase = 'turnEnd';
    		this._preemptive = false;
    		this._surprise = false;
    		this.allBattleMembers().forEach(function(battler) {
        		this.refreshStatus();
    		}, this);
    		return;
    	}
    	if (!this._saepTurnEnd){
    		this._saepTurnEnd = true;
    		this._saepPhase = 'turnEnd';
    		this.executeSaepAction();
    	}
    	if (this._phase !== 'action' && this._phase !== 'phaseChange'){
    		this._saepTurnEnd = false;
    		_SaEPS_BManager_endTurn.call(this);
    		this._selectedEscape = false;
    	}
	};
    
    var _SaEPS_BManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
    	if (this._saepActions && this._saepActions.length > 0){
    		this._logWindow.endAction(this._subject);
    		_SaEPS_BManager_endAction.call(this);
    		this.executeSaepAction();
    	}else{
    		if (this._startTurn){
    			this._logWindow.endAction(this._subject);
    			this._phase = 'start';
    		}
    		_SaEPS_BManager_endAction.call(this);
    		if (this._endSaep){ 
    			this._endSaep = false;
    			this._subject = null;
    			this._saepPhase = null;
    		}
    	}
	};
    
    BattleManager.executeSaepAction = function() {
    	var phase = this._saepPhase;
    	if ((this._saepActions && this._saepActions.length > 0) || this.checkSaepAction(phase)){
    		for(;;){
    			if ($gameParty.isAllDead() || $gameTroop.isAllDead()){
    				this._saepActions = [];
    				return;
    			}
    			if (this._saepActions.length === 0){
    				return;
    			}
    			var params = this._saepActions.shift();
    			var subject = params[0];
    			var action = params[1];
    			
    			if (this._saepActions.length === 0){ this._endSaep = true }
    			if (subject.isAlive()){
    				this.startSaepAction(subject,action,phase);
    				return;
       			}
    		}
    		//if (this._startTurn){ this._startTurn = false }
    	}else{
    		this._saepPhase = null;
    		if (this._startTurn){ this._startTurn = false }
    	}
    };
    
    BattleManager.checkSaepAction = function(phase) {
    	if (this._saepActions && this._saepActions.length > 0){ return true }
    	if (this._preSaepTurn === $gameTroop._turnCount && this._preSaepPhase === this._saepPhase){ return false }
    	this._preSaepTurn = $gameTroop._turnCount;
    	this._preSaepPhase = this._saepPhase;
    	this._saepActions = [];
    	var members = this._selectedEscape ? $gameTroop.aliveMembers() : this.allBattleMembers();
    	members.sort(function(a,b){
    		if (sortType === 2){
    			if (!a.speed()){a.makeSpeed()}
    			if (!b.speed()){b.makeSpeed()}
    			var as = a.speed();
    			var bs = b.speed();
    			if (as === Infinity){ as = a.agi }
    			if (bs === Infinity){ bs = b.agi }
    			
    			if (as < bs) return 1;
    			if (as > bs) return -1;
    		} else if (sortType === 3){
    			return (Math.randomInt(3) - 1);
    		}
    		return 0;
    	});
    	if (sortType === 1){ members = members.reverse() }
    	for (var i=0;i<members.length;i++){
    		var acnCount = 0;
    		var user = members[i];
    		var traits = user.traitObjects();
    		for (var j=0;j<traits.length;j++){
    			var trait = traits[j];
    			trait._condSaep = trait._condSaep || SESkillManager.initCond(trait.note);
    			for (var k=0;k<trait._condSaep.length;k++){
    				var cond = trait._condSaep[k];
   					if (this.checkPhase(phase,cond) && Math.random() < (cond['rate'] / 100)){
   						var action = this.makeSaepAction(user,cond);
    					if (!action.isSaepValid()){ continue }
   						var target = action.makeTargets()[0];
   						if (ConditionallyManager.checkConditions(user,target,cond['conditions'])){
    						this._saepActions.push([user,action]);
    						acnCount++;
    						if (this._saepActions.length >= invokeCount){ return true }
    						if (acnCount >= invokeCountSubject){ break }
    					}
    				}
    			}
    			if (acnCount >= invokeCountSubject){ break }
    		}
    	}
    	return this._saepActions.length === 0 ? false : true;
    };
    
    BattleManager.checkPhase = function(phase,cond) {
    	var condPhase = '';
    	switch(cond['var']){
    	case 'バトルスタート':
    		condPhase = 'battleStart';
    		break;
    	case 'ターンスタート':
    		condPhase = 'turnStart';
    		break;
    	case 'ターンエンド':
    		condPhase = 'turnEnd';
    		break;
    	}
    	return phase === condPhase;
    };
    
    BattleManager.makeSaepAction = function(subject,cond){
    	var action = new Game_Action(subject);
    	switch(cond['type']){
    	case 'I':
    	case 'i':
    		action.setItem(cond['id']);
    		break;
    	case 'S':
    	case 's':
    		action.setSkill(cond['id']);
    		break;
    	};
    	return action;
    };
    
    BattleManager.startSaepAction = function(subject,action,phase){
    	this._subject = subject;
    	if (!this._subject._actions){
    		this._subject.makeActions();
    	}
    	this._subject._actions.unshift(action);
    	this._logWindow.displayPhaseSkill(subject,action.item(),phase);
    	this._callSaep = true;
    	this.startAction();
    	this._subject.removeCurrentAction();
    	this._callSaep = false;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
	
    Window_BattleLog.prototype.displayPhaseSkill = function(subject,item,phase){
    	var text = battleStartSkillText;
    	if (phase === 'turnStart'){ text = turnStartSkillText }
    	if (phase === 'turnEnd'){ text = turnEndSkillText }
    	if (text && text != 'null') {
    		if (DataManager.isSkill(item)){
    			text = text.replace('_mes1',item.message1);
    			text = text.replace('_mes2',item.message2);
    		}
    		text = text.replace('_name',subject.name());
    		text = text.replace('_item',item.name);
    		if (BattleManager._selectedEscape){ this.push('wait') }
        	this.push('addText', text);
        	this.push('wait');
        	this.push('clear');
    	}
	};
	
	var _SaEPS_WBattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function(subject, item){
    	if (!isDisplayUseLog && BattleManager._callSaep){
			this.push('wait');
    		return;
    	}
    	_SaEPS_WBattleLog_displayAction.call(this,subject,item);
	};
		
    var _SaEPS_WBLog_updateWaitMode = Window_BattleLog.prototype.updateWaitMode;
	Window_BattleLog.prototype.updateWaitMode = function() {
		if ($gameMessage.isBusy()){ return true }
		_SaEPS_WBLog_updateWaitMode.call(this);
	}
	////////////////////////////////////////////////////////////////////////////////////
	
	Game_Action.prototype.isSaepValid = function() {
		return (this._forcing && this.item()) || this.subject().saepCanUse(this.item());
	};
	
	var _SaEPS_GAction_makeTargets = Game_Action.prototype.makeTargets
	Game_Action.prototype.makeTargets = function() {
    	var targets = [];
    	if (!this._forcing && this.subject().isConfused() && this.isForAll()){
    		targets = this.confusionTargetAll().aliveMembers();
    		targets = this.repeatTargets(targets);
    	} else if (!this._forcing && this.subject().isConfused() && this.isForRandom()){
    		var unit = this.confusionTargetAll();
        	for (var i = 0; i < this.numTargets(); i++) {
            	targets.push(unit.randomTarget());
        	}
        	targets = this.repeatTargets(targets);
    	} else {
    		targets = _SaEPS_GAction_makeTargets.call(this);
    	}
    	return targets;
	};
	
	Game_Action.prototype.confusionTargetAll = function() {
		switch (this.subject().confusionLevel()) {
		case 1:
			return this.opponentsUnit();
		case 2:
			if (Math.randomInt(2) === 0) {
				return this.opponentsUnit();
			}
			return this.friendsUnit();
		default:
			return this.friendsUnit();
		}	
	};

	////////////////////////////////////////////////////////////////////////////////////
	
	// フェイズスキルには消費が発生しない
	var _SaEPS_GBattler_useItem = Game_Battler.prototype.useItem;
	Game_Battler.prototype.useItem = function(item) {
		if (BattleManager._callSaep){ return }
		_SaEPS_GBattler_useItem.call(this,item);
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
    var _SaEPS_SBattle_commandEscape = Scene_Battle.prototype.commandEscape;
    Scene_Battle.prototype.commandEscape = function() {
    	BattleManager._selectedEscape = true;
    	_SaEPS_SBattle_commandEscape.call(this);
    };
	
	////////////////////////////////////////////////////////////////////////////////////
	
	Game_BattlerBase.prototype.isSaepMovable = function() {
		return this.isAppeared() && this.restriction() === 4;
	};
	
	Game_BattlerBase.prototype.saepMeetsUsableItemConditions = function(item) {
		return (!this.isSaepMovable() || DataManager.isUnmovableEnable(item)) &&
    		   (!this.isConfused() || DataManager.isConfuseEnable(item)) &&
    		　　  this.isOccasionOk(item);
	};

	Game_BattlerBase.prototype.saepMeetsSkillConditions = function(skill) {
    	return (this.saepMeetsUsableItemConditions(skill) &&
        	    this.isSkillWtypeOk(skill) && !this.isSkillSealed(skill.id) &&
        	    !this.isSkillTypeSealed(skill.stypeId));
	};

	Game_BattlerBase.prototype.saepMeetsItemConditions = function(item) {
    	return this.saepMeetsUsableItemConditions(item) && $gameParty.hasItem(item);
	};

	Game_BattlerBase.prototype.saepCanUse = function(item) {
    	if (!item) {
        	return false;
    	} else if (DataManager.isSkill(item)) {
        	return this.saepMeetsSkillConditions(item);
    	} else if (DataManager.isItem(item)) {
        	return this.saepMeetsItemConditions(item);
    	} else {
        	return false;
    	}
	};
	
	if (Imported.YEP_BattleEngineCore){
	var _SaEPS_GBBase_updateStateActionEnd = Game_BattlerBase.prototype.updateStateActionEnd;
	Game_BattlerBase.prototype.updateStateActionEnd = function() {
		if (!BattleManager._saepPhase){
			_SaEPS_GBBase_updateStateActionEnd.call(this);
		}
	};
	}
	
	////////////////////////////////////////////////////////////////////////////////////
	
}());
