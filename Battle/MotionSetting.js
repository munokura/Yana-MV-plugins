//
// 行動モーション設定 ver1.021
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author yana
//

var Imported = Imported || {};
Imported['MotionSetting'] = 1.021;
/*:
@plugindesc ver1.021/Reconfigure skill action motions.
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
How to Use
------------------------------------------------------
Note: In version 1.01, the ability to display weapon graphics with various motions was added, making it necessary to set skill types that do not display weapon graphics set for weapons and shields.
If you do not specify this, the weapon will be swung even for skills that do not require it.
(If specifying the skill type is difficult, please specify the motion individually or disable weapon graphics.)
As a result, the following two specifications apply:
- When using defense, weapon graphics set for weapons are ignored.
- When using items, weapon graphics set for weapons and shields are ignored.

Weapon image indexes are set to 12. This also applies to Weapon 3 and later.
By default, Weapon 3 images are only half the size, so if you want to use images 31-36,
resize Weapon 3 and position them the same as Weapon 1 and 2.

Basic motion settings can be configured using the plugin parameters.
You can also change the motion of a skill or other item you've set to xxx by entering
<MotionChange: xxx>
in the Note field for an actor, skill, weapon, or shield.
The priority order is skill > shield > weapon > actor.
The available options for xxx are:
attack → Normal attack motion
swing → Swing motion (If the weapon is not a swing motion, the weapon will not be displayed)
thrust → Thrust motion (If the weapon is not a thrust motion, the weapon will not be displayed)
missile → Shooting motion (If the weapon is not a shooting motion, the weapon will not be displayed)
skill → Skill motion
spell → Magic motion
item → Item motion
escape → Escape motion
victory → Victory motion
dying → Dying motion
abnormal → Abnormal status motion
sleep → Sleeping motion
dead → Collapse motion
walk → Walking motion
wait → Waiting motion
chant → Chanting motion
guard → Defensive motion
damage → Damage motion
Evasion → Evasion motion
In addition, by adding 2 to the end of any motion name other than attack, you can set a motion that switches between loop states.

Additionally, you can change the weapon image displayed during the skill's animation by entering
<ChangeWeaponGraphics:x>
in the Note field for an actor, skill, weapon, or shield.
In this case, x is calculated using eval.
Available variables are:
a → User
w → Topmost equipped weapon
wtypeId → Weapon type of the weapon in question
mid → Weapon image ID of the weapon in question
s → Topmost equipped shield
atypeId → Armor type of the shield in question
sid → Weapon image ID of the shield in question (0 if the shield does not have a direct setting).
If the result of this calculation is less than 0, the weapon graphic will not be displayed.
To hide the weapon graphic, set it to <ChangeWeaponGraphics:-1>.

Example: Set the weapon image ID to a value 12 spaces off the weapon image ID.
<ChangeWeaponGraphics: mid+12>

Also,
<ChangeDamageMotion:xxx>
<ChangeEvasionMotion:xxx>
<ChangeMagicEvasionMotion:xxx>
<ChangeVictoryMotion:xxx>
<ChangeEscapeMotion:xxx>

You can use the following to display weapon images during each action:

<ShowDamageWeaponGraphic:x>
<ShowEvasionWeaponGraphic:x>
<ShowMagicEvasionWeaponGraphic:x>
<ShowVictoryWeaponGraphic:x>
<ShowEscapeWeaponGraphic:x>

You can also use the following to display weapon images during each action.

In addition, you can specify 2 at the end of the weapon image display.
The image specified in weapon image display 2 will be displayed in front of the player and can coexist with the image displayed by the regular weapon image display.

Example: Display the dodge motion and shield in the shield Note field.
<ChangeEvasionMotion:guard> ← Changes the dodge motion to guard.
<ShowEvasionWeaponGraphic2:26> ← Displays weapon image number 26 (the second weapon in Weapon 3) in front of the character during dodge.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.021:180917
Updated plugin parameter specifications to 1.5.0.
ver1.02:
Added the ability to change the color tone of weapon images.
ver1.01:
Added the ability to change weapon images and expand their display.
ver1.00:
Released

@param PhysicalSkillMotion
@desc The motion to use for physical skills. If blank, it will be the default.
@default attack
@type select
@option Normal attack motion
@value attack
@option Swing motion (if the weapon is not in swing motion, the weapon will not be displayed)
@value swing
@option Thrust motion (if the weapon is not in thrust motion, the weapon will not be displayed)
@value thrust
@option Shooting animation (if the weapon is not in shooting animation, the weapon will not be displayed)
@value missile
@option Skill activation motion
@value skill
@option Magic activation motion
@value spell
@option Item activation motion
@value item
@option Escape motion
@value escape
@option Victory motion
@value victory
@option Dying Motion
@value dying
@option Abnormal status motion
@value abnormal
@option Sleep motion
@value sleep
@option Collapse motion
@value dead
@option Walking motion
@value walk
@option Waiting motion
@value wait
@option Chanting motion
@value chant
@option Defensive Motion
@value guard
@option Damage Motion
@value damage
@option Evasion Motion
@value evade
@option none

@param MagicalSkillMotion
@desc This is the motion used for magic skills. If left blank, it will be the default.
@type select
@option Normal attack motion
@value attack
@option Swing motion (if the weapon is not in swing motion, the weapon will not be displayed)
@value swing
@option Thrust motion (if the weapon is not in thrust motion, the weapon will not be displayed)
@value thrust
@option Shooting animation (if the weapon is not in shooting animation, the weapon will not be displayed)
@value missile
@option Skill activation motion
@value skill
@option Magic activation motion
@value spell
@option Item activation motion
@value item
@option Escape motion
@value escape
@option Victory motion
@value victory
@option Dying Motion
@value dying
@option Abnormal status motion
@value abnormal
@option Sleep motion
@value sleep
@option Collapse motion
@value dead
@option Walking motion
@value walk
@option Waiting motion
@value wait
@option Chanting motion
@value chant
@option Defensive Motion
@value guard
@option Damage Motion
@value damage
@option Evasion Motion
@value evade
@option none

@param CertainSkillMotion
@desc This is the motion used for guaranteed hit skills. If left blank, it will be the default.
@type select
@option Normal attack motion
@value attack
@option Swing motion (if the weapon is not in swing motion, the weapon will not be displayed)
@value swing
@option Thrust motion (if the weapon is not in thrust motion, the weapon will not be displayed)
@value thrust
@option Shooting animation (if the weapon is not in shooting animation, the weapon will not be displayed)
@value missile
@option Skill activation motion
@value skill
@option Magic activation motion
@value spell
@option Item activation motion
@value item
@option Escape motion
@value escape
@option Victory motion
@value victory
@option Dying Motion
@value dying
@option Abnormal status motion
@value abnormal
@option Sleep motion
@value sleep
@option Collapse motion
@value dead
@option Walking motion
@value walk
@option Waiting motion
@value wait
@option Chanting motion
@value chant
@option Defensive Motion
@value guard
@option Damage Motion
@value damage
@option Evasion Motion
@value evade
@option none

@param HideWeaponSkillTypes
@desc This is a skill type whose motion and image are not affected by weapons or shields.
@default 1
@type number
*/


/*:ja
@plugindesc ver1.021/スキルの行動モーションを再設定します。
@author Yana

@help
使い方
------------------------------------------------------
※使用上の注意
ver1.01で武器グラフィックをさまざまなモーションで表示する機能が追加されたため、
武器と盾に設定された武器グラフィックを表示しないスキルタイプを設定する必要性が
でてきました。
ここの指定を行わないと、武器を振らなくてもよいスキルの場合も武器を振ってしまいます。
(スキルタイプでの指定が難しい場合、個別にモーション指定や武器グラフィックを表示しない
設定を行ってください)
それに伴い、以下2つは仕様となります。
・防御使用時、武器に設定した武器グラフィックは無視されます。
・アイテム使用時、武器と盾に設定した武器グラフィックは無視されます。

武器画像のインデックスは12個1組となります。これは、Weapon3以降も同様です。
デフォルトでは、Weapon3の画像は半分しかないため、31～36の画像を使用する場合は、
Weapon3のサイズを変更し、Weapon1,2と同じように配置してください。

プラグインパラメータで基本的なモーションの設定が可能です。
また、アクターやスキル、武器や盾のメモ欄に
<モーション変更:xxx>
または、
<MotionChange:xxx>
と記述することで、設定したスキルなどのモーションをxxxに変更することができます。
この際の優先度は、スキル>盾>武器>アクターです。
xxxに使用可能なのは、
attack   →通常攻撃のモーション
swing    →振りのモーション(武器が振りモーションでない場合、武器は表示されない)
thrust   →突きのモーション(武器が突きモーションでない場合、武器は表示されない)
missile  →射撃のモーション(武器が射撃モーションでない場合、武器は表示されない)
skill    →スキルのモーション
spell    →魔法のモーション
item     →アイテムのモーション
escape   →逃げるモーション
victory  →勝利のモーション
dying    →瀕死のモーション
abnormal →状態異常のモーション
sleep    →睡眠のモーション
dead     →戦闘不能のモーション
walk     →歩きモーション
wait     →待機モーション
chant    →詠唱モーション
guard    →防御モーション
damage   →ダメージモーション
evade    →回避モーション
また、これに加えattack以外のモーション名の最後に2を付けることで、
ループ状態が切り替わったモーションを設定することが可能です。

更に、アクターやスキル、武器や盾のメモ欄に
<武器画像変更:x>
または、
<ChangeWeaponGraphics:x>
と記述することで、そのスキルのモーション時に表示される武器画像を変更することができます。
この際、xはevalを用いて計算が行われます。
使用可能な変数は、
a        → 使用者
w        → 一番上に装備している武器
wtypeId  → ↑の武器の武器タイプ
mid      → ↑↑の武器の武器画像ID
s        → 一番上に装備している盾
atypeId  → ↑の盾の防具タイプ
sid      → ↑↑の盾の武器画像ID(盾に直接設定がない場合は0)
が使用可能です。
計算の結果が0未満になった場合、武器グラフィックは表示されません。
武器グラフィックを非表示にしたい場合、<武器画像変更:-1>と設定してください。

例:武器に設定された画像から12個ずらしたIDを武器画像に指定
<武器画像変更:mid+12>

また、
<ダメージモーション変更:xxx>
<ChangeDamageMotion:xxx>

<回避モーション変更:xxx>
<ChangeEvasionMotion:xxx>

<魔法回避モーション変更:xxx>
<ChangeMagicEvasionMotion:xxx>

<勝利モーション変更:xxx>
<ChangeVictoryMotion:xxx>

<逃亡モーション変更:xxx>
<ChangeEscapeMotion:xxx>

で、それぞれの行動モーションを、

<ダメージ武器画像表示:x>
<ShowDamageWeaponGraphic:x>

<回避武器画像表示:x>
<ShowEvasionWeaponGraphic:x>

<魔法回避武器画像表示:x>
<ShowMagicEvasionWeaponGraphic:x>

<勝利武器画像表示:x>
<ShowVictoryWeaponGraphic:x>

<逃亡武器画像表示:x>
<ShowEscapeWeaponGraphic:x>

で、それぞれの行動時に武器画像を表示するこができます。

それに加えて、武器画像表示では最後に2を指定することができます。
武器画像表示2で指定された画像は、プレイヤーより前に表示され、
通常の武器画像表示で表示されたものと共存することができます。

例:盾のメモ欄で回避時のモーションと盾の表示を行う
<回避モーション変更:guard> ←回避時のモーションをguardに変更
<回避武器画像表示2:26>     ←回避時にキャラクターより前に26番(Weapon3の2番目)の武器画像を表示

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.021:180917
プラグインパラメータの仕様を1.5.0に更新。
ver1.02:
武器画像の色調を変更する機能を追加。
ver1.01:
武器画像を変更したり、表示を拡張したりする機能を追加。
ver1.00:
公開

@param PhysicalSkillMotion
@desc 物理スキルに使用するモーションです。 空白を指定すると、デフォルトになります。
@default attack
@type select
@option 通常攻撃のモーション
@value attack
@option 振りのモーション(武器が振りモーションでない場合、武器は表示されない)
@value swing
@option 突きのモーション(武器が突きモーションでない場合、武器は表示されない)
@value thrust
@option 射撃のモーション(武器が射撃モーションでない場合、武器は表示されない)
@value missile
@option スキルの発動モーション
@value skill
@option 魔法の発動モーション
@value spell
@option アイテムの発動モーション
@value item
@option 逃げるモーション
@value escape
@option 勝利のモーション
@value victory
@option 瀕死のモーション
@value dying
@option 状態異常のモーション
@value abnormal
@option 睡眠のモーション
@value sleep
@option 戦闘不能のモーション
@value dead
@option 歩きモーション
@value walk
@option 待機モーション
@value wait
@option 詠唱モーション
@value chant
@option 防御モーション
@value guard
@option ダメージモーション
@value damage
@option 回避モーション
@value evade
@option なし

@param MagicalSkillMotion
@desc 魔法スキルに使用するモーションです。 空白を指定すると、デフォルトになります。
@type select
@option 通常攻撃のモーション
@value attack
@option 振りのモーション(武器が振りモーションでない場合、武器は表示されない)
@value swing
@option 突きのモーション(武器が突きモーションでない場合、武器は表示されない)
@value thrust
@option 射撃のモーション(武器が射撃モーションでない場合、武器は表示されない)
@value missile
@option スキルの発動モーション
@value skill
@option 魔法の発動モーション
@value spell
@option アイテムの発動モーション
@value item
@option 逃げるモーション
@value escape
@option 勝利のモーション
@value victory
@option 瀕死のモーション
@value dying
@option 状態異常のモーション
@value abnormal
@option 睡眠のモーション
@value sleep
@option 戦闘不能のモーション
@value dead
@option 歩きモーション
@value walk
@option 待機モーション
@value wait
@option 詠唱モーション
@value chant
@option 防御モーション
@value guard
@option ダメージモーション
@value damage
@option 回避モーション
@value evade
@option なし

@param CertainSkillMotion
@desc 必中スキルに使用するモーションです。 空白を指定すると、デフォルトになります。
@type select
@option 通常攻撃のモーション
@value attack
@option 振りのモーション(武器が振りモーションでない場合、武器は表示されない)
@value swing
@option 突きのモーション(武器が突きモーションでない場合、武器は表示されない)
@value thrust
@option 射撃のモーション(武器が射撃モーションでない場合、武器は表示されない)
@value missile
@option スキルの発動モーション
@value skill
@option 魔法の発動モーション
@value spell
@option アイテムの発動モーション
@value item
@option 逃げるモーション
@value escape
@option 勝利のモーション
@value victory
@option 瀕死のモーション
@value dying
@option 状態異常のモーション
@value abnormal
@option 睡眠のモーション
@value sleep
@option 戦闘不能のモーション
@value dead
@option 歩きモーション
@value walk
@option 待機モーション
@value wait
@option 詠唱モーション
@value chant
@option 防御モーション
@value guard
@option ダメージモーション
@value damage
@option 回避モーション
@value evade
@option なし

@param HideWeaponSkillTypes
@desc モーションや画像が武器や盾に影響されないスキルタイプです。
@default 1
@type number
*/

(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('MotionSetting');
    var physicalSkillMotion = parameters['PhysicalSkillMotion'];
    var magicalSkillMotion = parameters['MagicalSkillMotion'];
    var certainSkillMotion = parameters['CertainSkillMotion'];
    var hideWeaponSkillTypes = parameters['HideWeaponSkillTypes'].split(',').map(function (n) { return parseInt(n, 10) });

    ////////////////////////////////////////////////////////////////////////////////////

    var __GActor_performAction = Game_Actor.prototype.performAction;
    Game_Actor.prototype.performAction = function (action) {
        __GActor_performAction.call(this, action);
        if (action && action.item()) {
            var item = action.item();
            var motion = this._motionType;
            if (action.isPhysical() && physicalSkillMotion) motion = physicalSkillMotion;
            if (action.isMagical() && magicalSkillMotion) motion = magicalSkillMotion;
            if (action.isCertainHit() && certainSkillMotion) motion = certainSkillMotion;
            var m = this.setRequestMotionName(item, 'モーション変更', 'MotionChange', motion);
            if (m && m !== 'attack') this.setWeaponImageId(item, '武器画像変更', 'ChangeWeaponGraphic');
        }
    };

    Game_Actor.prototype.setRequestMotionName = function (item, text1, text2, motion) {
        var motion = motion;
        var w = this.weapons()[0];
        var s = this.armors().filter(function (aa) { return aa.etypeId === 2 })[0];
        if (item && DataManager.isItem(item)) { w = null; s = null; }
        if (item && item.id === this.guardSkillId()) w = null;
        if (item && hideWeaponSkillTypes.contains(item.stypeId)) { w = null; s = null; }
        if (this.actor().meta[text1]) motion = this.actor().meta[text1];
        if (this.actor().meta[text2]) motion = this.actor().meta[text2];
        if (w && w.meta[text1]) motion = w.meta[text1];
        if (w && w.meta[text2]) motion = w.meta[text2];
        if (s && s.meta[text1]) motion = s.meta[text1];
        if (s && s.meta[text2]) motion = s.meta[text2];
        if (item && item.meta[text1]) motion = item.meta[text1];
        if (item && item.meta[text2]) motion = item.meta[text2];
        if (motion === 'attack') {
            this.performAttack();
        } else if (motion) {
            this.requestMotion(motion);
        }
        return motion;
    };

    var __GActor_performAttack = Game_Actor.prototype.performAttack;
    Game_Actor.prototype.performAttack = function () {
        __GActor_performAttack.call(this);
        this.setWeaponImageId($dataSkills[this.attackSkillId()], '武器画像変更', 'ChangeWeaponGraphic');
    };

    Game_Actor.prototype.setWeaponImageId = function (item, text1, text2) {
        var w = this.weapons()[0];
        var s = this.armors().filter(function (aa) { return aa.etypeId === 2 })[0];
        if (item && DataManager.isItem(item)) { w = null; s = null; }
        if (item && item.id === this.guardSkillId()) w = null;
        if (item && hideWeaponSkillTypes.contains(item.stypeId)) { w = null; s = null; }
        var wtypeId = w ? w.wtypeId : 0;
        var atypeId = s ? s.atypeId : 0;
        var a = $gameActors.actor(this.actorId());
        var am = $dataSystem.attackMotions[wtypeId];
        var mid = am.weaponImageId - 1;
        var sid = 0;
        var wAId = this.getWeaponIdMetaData(item, w, s, a, mid, sid, text1, text2);
        wAId = eval(wAId);
        if (wAId < 0) this.startWeaponAnimation(-1);
        if (wAId > 0) this.startWeaponAnimation(wAId);
        var hue = this.getWeaponIdMetaData(item, w, s, a, mid, sid, text1 + 'Hue', text2 + 'Hue');
        if (hue) this._weapon1Hue = eval(hue);
        wAId = this.getWeaponIdMetaData(item, w, s, a, mid, sid, text1 + '2', text2 + '2');
        wAId = eval(wAId);
        if (wAId > 0) this.startWeaponAnimation2(wAId);
        hue = this.getWeaponIdMetaData(item, w, s, a, mid, sid, text1 + '2Hue', text2 + '2Hue');
        if (hue) this._weapon2Hue = eval(hue);
    };

    Game_Actor.prototype.getWeaponIdMetaData = function (item, w, s, a, mid, sid, text1, text2) {
        var wAId = 0;
        var v = $gameVariables._data;
        if (this.actor().meta[text1]) wAId = this.actor().meta[text1];
        if (this.actor().meta[text2]) wAId = this.actor().meta[text2];
        if (w && w.meta[text1]) { wAId = w.meta[text1]; mid = eval(wAId); }
        if (w && w.meta[text2]) { wAId = w.meta[text2]; mid = eval(wAId); }
        if (s && s.meta[text1]) { wAId = s.meta[text1]; sid = eval(wAId); }
        if (s && s.meta[text2]) { wAId = s.meta[text2]; sid = eval(wAId); }
        if (item && item.meta[text1]) wAId = item.meta[text1];
        if (item && item.meta[text2]) wAId = item.meta[text2];
        return wAId;
    };

    var __GActor_performDamage = Game_Actor.prototype.performDamage;
    Game_Actor.prototype.performDamage = function () {
        __GActor_performDamage.call(this);
        if (this.isSpriteVisible()) {
            var m = this.setRequestMotionName(null, 'ダメージモーション変更', 'ChangeDamageMotion');
            if (m && m !== 'attack') this.setWeaponImageId(null, 'ダメージ武器画像表示', 'ShowDamageWeaponGraphic');
        }
    };

    var __GActor_performEvasion = Game_Actor.prototype.performEvasion;
    Game_Actor.prototype.performEvasion = function () {
        __GActor_performEvasion.call(this);
        var m = this.setRequestMotionName(null, '回避モーション変更', 'ChangeEvasionMotion');
        if (m && m !== 'attack') this.setWeaponImageId(null, '回避武器画像表示', 'ShowEvasionWeaponGraphic');
    };

    var __GActor_performMagicEvasion = Game_Actor.prototype.performMagicEvasion;
    Game_Actor.prototype.performMagicEvasion = function () {
        __GActor_performMagicEvasion.call(this);
        var m = this.setRequestMotionName(null, '魔法回避モーション変更', 'ChangeMagicEvasionMotion');
        if (m && m !== 'attack') this.setWeaponImageId(null, '魔法回避武器画像表示', 'ShowMagicEvasionWeaponGraphic');
    };

    var __GActor_performVictory = Game_Actor.prototype.performVictory;
    Game_Actor.prototype.performVictory = function () {
        __GActor_performVictory.call(this);
        if (this.canMove()) {
            var m = this.setRequestMotionName(null, '勝利モーション変更', 'ChangeVictoryMotion');
            if (m && m !== 'attack') this.setWeaponImageId(null, '勝利武器画像表示', 'ShowWinWeaponGraphic');
        }
    };

    var __GActor_performEscape = Game_Actor.prototype.performEscape;
    Game_Actor.prototype.performEscape = function () {
        __GActor_performEscape.call(this);
        if (this.canMove()) {
            var m = this.setRequestMotionName(null, '逃亡モーション変更', 'ChangeEscapeMotion');
            if (m && m !== 'attack') this.setWeaponImageId(null, '逃亡武器画像表示', 'ShowEscapeWeaponGraphic');
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GBattler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function () {
        __GBattler_initMembers.call(this);
        this._weaponImageId2 = 0;
    };

    Game_Battler.prototype.isWeaponAnimationRequested2 = function () {
        return this._weaponImageId2 > 0;
    };

    Game_Battler.prototype.weaponImageId2 = function () {
        return this._weaponImageId2;
    };

    Game_Battler.prototype.startWeaponAnimation2 = function (weaponImageId) {
        this._weaponImageId2 = weaponImageId;
    };

    Game_Battler.prototype.clearWeaponAnimation2 = function () {
        this._weaponImageId2 = 0;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Sprite_Actor.MOTIONS['walk2'] = { index: 0, loop: false };
    Sprite_Actor.MOTIONS['wait2'] = { index: 1, loop: false };
    Sprite_Actor.MOTIONS['chant2'] = { index: 2, loop: false };
    Sprite_Actor.MOTIONS['guard2'] = { index: 3, loop: false };
    Sprite_Actor.MOTIONS['damage2'] = { index: 4, loop: true };
    Sprite_Actor.MOTIONS['evade2'] = { index: 5, loop: true };
    Sprite_Actor.MOTIONS['thrust2'] = { index: 6, loop: true };
    Sprite_Actor.MOTIONS['swing2'] = { index: 7, loop: true };
    Sprite_Actor.MOTIONS['missile2'] = { index: 8, loop: true };
    Sprite_Actor.MOTIONS['skill2'] = { index: 9, loop: true };
    Sprite_Actor.MOTIONS['spell2'] = { index: 10, loop: true };
    Sprite_Actor.MOTIONS['item2'] = { index: 11, loop: true };
    Sprite_Actor.MOTIONS['escape2'] = { index: 12, loop: false };
    Sprite_Actor.MOTIONS['victory2'] = { index: 13, loop: false };
    Sprite_Actor.MOTIONS['dying2'] = { index: 14, loop: false };
    Sprite_Actor.MOTIONS['abnormal2'] = { index: 15, loop: false };
    Sprite_Actor.MOTIONS['sleep2'] = { index: 16, loop: false };
    Sprite_Actor.MOTIONS['dead2'] = { index: 17, loop: false };

    var __SActor_createMainSprite = Sprite_Actor.prototype.createMainSprite;
    Sprite_Actor.prototype.createMainSprite = function () {
        __SActor_createMainSprite.call(this);
        this.createWeaponSprite2();
    };

    Sprite_Actor.prototype.createWeaponSprite2 = function () {
        this._weaponSprite2 = new Sprite_Weapon();
        this.addChild(this._weaponSprite2);
    };

    var __SActor_setupWeaponAnimation = Sprite_Actor.prototype.setupWeaponAnimation;
    Sprite_Actor.prototype.setupWeaponAnimation = function () {
        if (this._actor._weapon1Hue) {
            this._weaponSprite._hue = this._actor._weapon1Hue;
            this._actor.weapon1Hue = 0;
        }
        if (this._actor._weapon2Hue) {
            this._weaponSprite2._hue = this._actor._weapon2Hue;
            this._actor.weapon2Hue = 0;
        }
        __SActor_setupWeaponAnimation.call(this);
        if (this._actor.isWeaponAnimationRequested2()) {
            this._weaponSprite2.setup(this._actor.weaponImageId2());
            this._actor.clearWeaponAnimation2();
        }
    };

    if (Imported.YEP_BattleEngineCore) {
        var __SActor_updateMotion = Sprite_Actor.prototype.updateMotion;
        Sprite_Actor.prototype.updateMotion = function () {
            __SActor_updateMotion.call(this);
            this.setupWeaponAnimation();
        };
    }

    var __SWeapon_setup = Sprite_Weapon.prototype.setup;
    Sprite_Weapon.prototype.setup = function (weaponImageId) {
        if (this._hue) ImageManager._weaponHue = this._hue;
        __SWeapon_setup.call(this, weaponImageId);
        if (this._hue) {
            ImageManager._weaponHue = 0;
            this._hue = 0;
        }
    };

    var __IManager_loadSystem = ImageManager.loadSystem;
    ImageManager.loadSystem = function (filename, hue) {
        if (this._weaponHue && !hue) hue = this._weaponHue;
        return __IManager_loadSystem.call(this, filename, hue);
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());