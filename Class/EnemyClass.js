//
//  エネミークラス ver1.00
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
Imported['EnemyClass'] = 1.00;
/*:
@plugindesc ver1.00/Adds a mechanism to set classes for enemies.
@author Yana
@url https://github.com/munokura/Yana-MV-plugins
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/Yana-MV-plugins ).
Original plugin by Yana.
-----
There are no plugin commands.
-----------------------------------------------------
------------------------------------------------------
Explanation
-------------------------------------------------------
This plugin assigns classes to enemies and adds the concept of levels to them.
This allows you to set up enemies to grow as they level up.
Also, enemies will be unable to use skills they don't know, so you can set up mechanisms for them to use new skills as they level up.
Passive skills also work in the same way, so by introducing them at the same time, you can give them new Traits depending on their level.

# Plugin parameter settings
- Usable Skills Setting Details
An enemy with a set class cannot use any skills other than those set in Usable Skills unless they have learned them.

- Growing Pattern Setting Details
This setting allows you to set one of four values: -2, -1, 0, or 1.
The meaning of each value is as follows:
-2: Damage taken is accumulated as experience points and the level is determined.
-1: The level is determined based on the average level of the party's Battle members.
0: The level is determined based on the average level of all party members.
1 or higher: Determines the level based on the value of the corresponding ID variable.
------------------------------------------------------
Setting Method
------------------------------------------------------
# Settings entered in the enemy's Note field

Sets the enemy's class to the class with ID x.
<ENEMY_CLASS: x>

Sets the enemy's minimum level to x. Regardless of the growth pattern or range settings,
the enemy will never fall below this level.
<ENEMY_MIN_LEVEL: x>

Sets the enemy's maximum level to x.
<ENEMY_MAX_LEVEL: x>

Sets the base value for experience points gained by enemy level.
Experience points are calculated as the original experience points + (level * base value).
Decimals are allowed in this value; the final value will be truncated.
<LEVEL_EXP_BASE: x>

Sets the base amount of gold gained based on enemy level.
EXP is calculated as original EXP + (level * base).
This value can be a decimal; the final value will be rounded down.
<LEVEL_GOLD_BASE: x>

Sets the base amount of ABP gained based on enemy level.
EXP is calculated as original EXP + (level * base).
This value can be a decimal; the final value will be rounded down.
<LEVEL_ABP_BASE: x>

Sets the amount of drops added based on enemy level.
a: IWA, b: Item ID, c: Drop level, d: Drop rate (%)
<ADDITIONAL_DROP: ab, LVc, d%>
Example:
Weapon ID 5 has a 20% chance of dropping at level 5 or above.
<ADDITIONAL_DROP: W5, LV5, 20%>

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released

@param Empty Class ID
@desc The ID of the class to be used as an empty class. The class with the specified ID will no longer be available for normal use.
@default 1000

@param Default Level
@desc This is the initial level set for the enemy. If there is no minimum level setting, this value will be used.
@default 1

@param Usable Skills
@desc This is a skill that can be used even if the enemy does not know it. Please refer to the help for a detailed explanation.
@default 1,2,3,4,5,6,7

@param Growing Pattern
@desc Enemy growth patterns. Please refer to the help for a detailed explanation.
@default -2

@param Level Amplitude
@desc This is the range of the level. The level will go up or down by this value. *If you set it to 2, enemies from -2 to +2 will appear.
@default 2

@param Show Level ESWindow
@desc This setting determines whether enemy levels are displayed in the enemy selection window.
@default true
*/


/*:ja
@plugindesc ver1.00/エネミーにクラスを設定するための仕組みを追加します。
@author Yana

@help
 プラグインコマンドはありません。
------------------------------------------------------
------------------------------------------------------
解説
------------------------------------------------------
このプラグインはエネミーにクラスを設定し、エネミーにレベルの概念を追加します。
これにより、エネミーがレベルで成長していくような設定が可能です。
また、エネミーは覚えていないスキルは使用できなくなるため、レベルで新しいスキルを使用してくる
などの仕組みも設定することができるようになります。
パッシブスキルも同様に機能するため、同時に導入することでレベルによって新たに特徴を付与する
ような設定も可能です。

# プラグインパラメーター設定
- Usable Skillsの設定詳細
クラスが設定されているエネミーはUsable Skillsで設定されているスキル以外は、
習得していなければ使用できません。

- Growing Patternの設定詳細
この設定では、-2,-1,0,1以上の4種類のいずれかの値を設定します。
それぞれの値の意味は、
-2:被ダメージを経験値として蓄積し、レベルを決めます。
-1:パーティの戦闘メンバーの平均レベルを参照して、レベルを決めます。
0:パーティ全員の平均レベルを参照して、レベルを決めます。
1以上:対応するIDの変数の値を参照して、レベルを決めます。
------------------------------------------------------
設定方法
------------------------------------------------------
・エネミーのメモ欄に記述する設定

エネミーのクラスをIDx番のクラスに設定します。
<エネミークラス:x>
<ENEMY_CLASS:x>

エネミーの最低レベルをxに設定します。成長パターンや振れ幅の設定がどうなっていても、
この値以下のレベルになることはありません。
<敵最低レベル:x>
<ENEMY_MIN_LEVEL:x>

エネミーの最大レベルをxに設定します。
<敵最大レベル:x>
<ENEMY_MAX_LEVEL:x>

エネミーのレベルによって上昇する経験値の基準値を設定します。
経験値は元の経験値+(レベル*基準値)で計算されます。
この値には小数も設定可能で、最終的な値は小数点以下が切り捨てられます。
<レベル経験値基準値:x>
<LEVEL_EXP_BASE:x>

エネミーのレベルによって上昇するゴールドの基準値を設定します。
経験値は元の経験値+(レベル*基準値)で計算されます。
この値には小数も設定可能で、最終的な値は小数点以下が切り捨てられます。
<レベルゴールド基準値:x>
<LEVEL_GOLD_BASE:x>

エネミーのレベルによって上昇するABPの基準値を設定します。
経験値は元の経験値+(レベル*基準値)で計算されます。
この値には小数も設定可能で、最終的な値は小数点以下が切り捨てられます。
<レベルABP基準値:x>
<LEVEL_ABP_BASE:x>

エネミーのレベルによって追加されるドロップを設定します。
a:IWAのいずれか,b:アイテムID,c:ドロップするレベル,d:ドロップ率%
<追加ドロップ:ab,LVc,d%>
<ADDITIONAL_DROP:ab,LVc,d%>
例:Lv5以上でID5番の武器を20%の確率でドロップする
<追加ドロップ:W5,LV5,20%>

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param Empty Class ID
@desc 空クラスとして使用されるクラスのIDです。 指定したIDのクラスは通常使用はできなくなります。
@default 1000

@param Default Level
@desc エネミーのレベルの初期値として設定されるレベルです。 最低レベル設定がない場合、この値が使用されます。
@default 1

@param Usable Skills
@desc エネミーが覚えていなくても使用できるスキルです。 詳しい解説はヘルプを参照してください。
@default 1,2,3,4,5,6,7

@param Growing Pattern
@desc エネミーの成長パターンです。 詳しい解説はヘルプを参照してください。
@default -2

@param Level Amplitude
@desc レベルの振れ幅です。この値の分だけ+-でレベルが上下します。 ※2に設定すると、-2~+2のエネミーが出現します。
@default 2

@param Show Level ESWindow
@desc エネミー選択のウィンドウで敵レベルを描画するかの設定です。
@default true
*/

(function () {

	var parameters = PluginManager.parameters('EnemyClass');
	var emptyClassId = Number(parameters['Empty Class ID'] || 1000);
	var defaultLevel = Number(parameters['Default Level'] || 1);
	var usableSkills = String(parameters['Usable Skills'] || '1,2,3,4,5,6,7').split(',');
	var growingPattern = Number(parameters['Growing Pattern'] || -2);
	var levelAmplitude = Number(parameters['Level Amplitude'] || 2);
	var showLevelESWindow = String(parameters['Show Level ESWindow']) === 'true'

	for (var i = 0; i < usableSkills.length; i++) {
		usableSkills[i] = Number(usableSkills[i]);
	}

	showLevelESWindow = true;

	DataManager.itemObject = function (kind, itemId) {
		switch (kind) {
			case 1:
				return $dataItems[itemId];
			case 2:
				return $dataWeapons[itemId];
			case 3:
				return $dataArmors[itemId];
		}
		return null;
	};

	Game_System.prototype.enemyExpList = function (enemyId, value, exp) {
		if (this._enemyExpList === undefined) { this._enemyExpList = {} }
		if (value === undefined || value === null) {
			var enemy = $dataEnemies[enemyId];
			if (this._enemyExpList[enemyId] === undefined || exp !== undefined) {
				if (exp === undefined) { exp = 0 }
				this._enemyExpList[enemyId] = exp;
			}
		} else {
			this._enemyExpList[enemyId] = this._enemyExpList[enemyId] + value;
		}
		return this._enemyExpList[enemyId];
	};

	var _EnC_GEnemy_initialize = Game_Enemy.prototype.initialize;
	Game_Enemy.prototype.initialize = function (enemyId, x, y) {
		_EnC_GEnemy_initialize.call(this, enemyId, x, y);
		this.setLevel();
		this._hp = this.mhp;
		this._mp = this.mmp;
	};

	Game_Enemy.prototype.levelForExp = function () {
		var eexp = $gameSystem.enemyExpList(this.enemy().id);
		for (var i = this.level(); i < this.maxLevel(); i++) {
			if (this.expForLevel(i) > eexp) { return i - 1 }
		}
		return this.maxLevel();
	};

	Game_Enemy.prototype.expForLevel = function (level) {
		var c = this.enemyClass();
		var basis = c.expParams[0];
		var extra = c.expParams[1];
		var acc_a = c.expParams[2];
		var acc_b = c.expParams[3];
		return Math.round(basis * (Math.pow(level - 1, 0.9 + acc_a / 250)) * level *
			(level + 1) / (6 + Math.pow(level, 2) / 50 / acc_b) + (level - 1) * extra);
	};

	Game_Enemy.prototype.setLevel = function () {
		var lv = 1;
		var r = 0;
		switch (growingPattern) {
			case -2:
				lv = this._level;
				if ($gameSystem._enemyExpList && $gameSystem._enemyExpList[this.enemy().id]) {
					lv = this.levelForExp();
				} else {
					$gameSystem.enemyExpList(this.enemy().id, null, this.expForLevel(lv));
				}
				break;
			case -1:
				var r = $gameParty.battleMembers().reduce(function (r, m) { return r + m._level }, 0);
				lv = Math.floor(r / $gameParty.battleMembers().length);
				break;
			case 0:
				var r = $gameParty.members().reduce(function (r, m) { return r + m._level }, 0);
				lv = Math.floor(r / $gameParty.members().length);
				break;
			default:
				lv = $gameVariables.value(growingPattern);
		}
		lv = Math.max(lv, this.level());
		amplitude = levelAmplitude;
		this._level = Math.min(Math.max(Math.max((lv - amplitude) + Math.randomInt(amplitude * 2) + 1, 1), this.level()), this.maxLevel());
	};

	Game_Enemy.prototype.level = function () {
		if (this._level) { return this._level }
		if (this.enemy().meta['敵最低レベル']) {
			this._level = Number(this.enemy().meta['敵最低レベル']);
		} else if (this.enemy().meta['ENEMY_MIN_LEVEL']) {
			this._level = Number(this.enemy().meta['ENEMY_MIN_LEVEL']);
		} else {
			this._level = defaultLevel;
			if (this._level === 0) { this._level = Math.floor(this.enemy().id / 10) }
		}
		this._level = Math.max(this._level, 1);
		return this._level;
	};

	Game_Enemy.prototype.expBase = function () {
		if (this.enemy().meta['レベル経験値基準値']) {
			return Number(this.enemy().meta['レベル経験値基準値']);
		} else if (this.enemy().meta['LEVEL_EXP_BASE']) {
			return Number(this.enemy().meta['LEVEL_EXP_BASE']);
		}
		return 0;
	};
	Game_Enemy.prototype.goldBase = function () {
		if (this.enemy().meta['レベルゴールド基準値']) {
			return Number(this.enemy().meta['レベルゴールド基準値']);
		} else if (this.enemy().meta['LEVEL_GOLD_BASE']) {
			return Number(this.enemy().meta['LEVEL_GOLD_BASE']);
		}
		return 0;
	};
	if (Imported['VXandAceHybridClass']) {
		var _EnC_GEnemy_abp = Game_Enemy.prototype.abp;
		Game_Enemy.prototype.abp = function () {
			var abp = _EnC_GEnemy_abp.call(this);
			return abp + Math.floor(this.abpBase() * this.level());
		};
		Game_Enemy.prototype.abpBase = function () {
			if (this.enemy().meta['レベルABP基準値']) {
				return Number(this.enemy().meta['レベルABP基準値']);
			} else if (this.enemy().meta['LEVEL_ABP_BASE']) {
				return Number(this.enemy().meta['LEVEL_ABP_BASE']);
			}
			return 0;
		};
	}

	Game_Enemy.prototype.additionalDrop = function () {
		var texts = this.enemy().note.split('\n');
		var drop = [];
		var kind = 0;
		for (var i = 0; i < texts.length; i++) {
			var text = texts[i];
			if (text.match(/^[<＜](?:追加ドロップ|ADDITIONAL_DROP)[:：]([IWA])(\d+)[,，]LV(\d+)[,，](\d+)[%％][＞>]/)) {
				switch (RegExp.$1) {
					case 'I':
						kind = 1;
						break;
					case 'W':
						kind = 2;
						break;
					case 'A':
						kind = 3;
						break;
				}
				var r = [DataManager.itemObject(kind, Number(RegExp.$2)), Number(RegExp.$3), Number(RegExp.$4)];
				drop.push(r);
			}
		}
		return drop;
	};

	Game_Enemy.prototype.additionalDropForReal = function () {
		var result = [];
		var drops = this.additionalDrop();
		for (var i = 0; i < drops.length; i++) {
			var drop = drops[i];
			if (drop[1] <= this.level() && ((drop[2] * this.dropItemRate()) / 100) > Math.random()) {
				result.push(drop[0]);
			}
		}
		return result;
	};

	var _EnC_GEnemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
	Game_Enemy.prototype.makeDropItems = function () {
		var dropItems = _EnC_GEnemy_makeDropItems.call(this);
		var additionalDrop = this.additionalDropForReal();
		return dropItems.concat(additionalDrop);
	};

	var _EnC_GEnemy_exp = Game_Enemy.prototype.exp;
	Game_Enemy.prototype.exp = function () {
		var exp = _EnC_GEnemy_exp.call(this);
		return exp + Math.floor(this.expBase() * this.level());
	};

	var _EnC_GEnemy_gold = Game_Enemy.prototype.gold;
	Game_Enemy.prototype.gold = function () {
		var gold = _EnC_GEnemy_gold.call(this);
		return gold + Math.floor(this.goldBase() * this.level());
	};

	Game_Enemy.prototype.maxLevel = function () {
		if (this.enemy().meta['敵最大レベル']) {
			return Number(this.enemy().meta['敵最大レベル']);
		} else if (this.enemy().meta['ENEMY_MAX_LEVEL']) {
			return Number(this.enemy().meta['ENEMY_MAX_LEVEL']);
		} else if (this._classId === emptyClassId) {
			return 1;
		} else {
			return 99;
		}
	};

	Game_Enemy.prototype.enemyClass = function () {
		if (!this._classId) { this.initEnemyClass() }
		if (!$dataClasses[this._classId]) { this.initEmptyClass() }
		return $dataClasses[this._classId];
	};

	Game_Enemy.prototype.initEnemyClass = function () {
		if (this.enemy().meta['敵クラス']) {
			this._classId = Number(this.enemy().meta['敵クラス']);
		} else if (this.enemy().meta['ENEMY_CLASS']) {
			this._classId = Number(this.enemy().meta['ENEMY_CLASS']);
		} else {
			if (!$dataClasses[emptyClassId]) {
				this.initEmptyClass();
			}
			this._classId = emptyClassId;
		}
	};

	Game_Enemy.prototype.initEmptyClass = function () {
		var c = {
			'id': emptyClassId,
			'name': '',
			'note': '',
			'traits': [],
			'params': [],
			'expParams': [30, 20, 30, 30],
			'learnings': [],
			'meta': {}
		};
		for (var i = 0; i < 8; i++) {
			c['params'][i] = [];
			for (var j = 0; j < 100; j++) {
				c['params'][i][j] = 0;
			}
		}
		//if (Imported['VXandAceHybridClass']){ c.note　+= '<クラスチェンジ不可>' }
		$dataClasses[emptyClassId] = c;
	};

	var _EnC_GEnemy_paramBase = Game_Enemy.prototype.paramBase;
	Game_Enemy.prototype.paramBase = function (paramId) {
		var param1 = _EnC_GEnemy_paramBase.call(this, paramId);
		var param2 = this.enemyClass().params[paramId][this.level()];
		return param1 + param2;
	};

	var _EnC_GEnemy_selectAllActions = Game_Enemy.prototype.selectAllActions;
	Game_Enemy.prototype.selectAllActions = function (actionList) {
		var result = actionList;
		if (this.enemyClass().id !== emptyClassId) {
			result = [];
			for (var i = 0; i < actionList.length; i++) {
				var action = actionList[i];
				if (usableSkills.contains(action.skillId) || this.eSkills().contains(action.skillId)) {
					result.push(action);
				}
			}
		}
		return _EnC_GEnemy_selectAllActions.call(this, result);
	};

	Game_Enemy.prototype.eSkills = function () {
		var learnings = this.enemyClass().learnings;
		var result = [];
		for (var i = 0; i < learnings.length; i++) {
			if (learnings[i].level <= this.level()) {
				result.push(learnings[i].skillId);
			}
		}
		return result;
	};

	var _EnC_GEnemy_traitObjects = Game_Enemy.prototype.traitObjects;
	Game_Enemy.prototype.traitObjects = function () {
		var objects = [];
		if (Imported['yPassiveSkill']) {
			var skills = this.eSkills().concat(usableSkills);
			var result = [];
			for (var i = 0; i < skills.length; i++) {
				var skill = $dataSkills[skills[i]];
				PassiveSkillManager.initPassiveSkill(skill);
				if (skill.traits && skill.traits.length > 0) {
					result.push(skill);
				}
			}
			objects = objects.concat(result);
		}
		return _EnC_GEnemy_traitObjects.call(this).concat(objects);
	};

	var _EnC_GAction_executeHpDamage = Game_Action.prototype.executeHpDamage;
	Game_Action.prototype.executeHpDamage = function (target, value) {
		_EnC_GAction_executeHpDamage.call(this, target, value);
		if (target.isEnemy() && value > 0 && $gameSystem._enemyExpList) {
			$gameSystem.enemyExpList(target.enemy().id, value);
		};
	};
	if (showLevelESWindow) {
		Window_BattleEnemy.prototype.drawItem = function (index) {
			this.resetTextColor();
			var enemy = this._enemies[index];
			var name = enemy.name();
			name += enemy._classId === emptyClassId ? '' : '(Lv' + enemy.level() + ')'
			var rect = this.itemRectForText(index);
			this.drawText(name, rect.x, rect.y, rect.width);
		};
	}
}());