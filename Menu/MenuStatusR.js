//
//  メニューステータス改造 ver1.01
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
Imported['MenuStatusR'] = 1.01;
/*:
 * @plugindesc ver1.01/メニュー画面等の簡易ステータス表示を改造します。
 * @author Yana
 *
 * @param 【基本設定】
 * @param FaceWidth
 * @desc フェイスの横幅の数値です。
 * @default 144
 * @type number
 *
 * @param MaxCols
 * @desc ステータス一人当たりの列数です。
 * @default 2
 * @type number
 *
 * @param MaxRows
 * @desc ステータス一人当たりの行数です。
 * @default 3
 * @type number
 *
 * @param MenuStatusFontSize
 * @desc メニューステータスのフォントサイズです。
 * @default 28
 * @type number
 *
 * @param UseSkillStatus
 * @desc スキルのステータス表示にも機能を拡張するかの設定です。
 * true/falseで設定してください。
 * @default true
 * @type boolean
 *
 * @param SkillStatusFontSize
 * @desc スキルステータスのフォントサイズです。
 * @default 28
 * @type number
 *
 * @param
 * @param 【ページの設定】
 * @param Page1
 * @desc 1ページ目に表示する内容です。
 * @default name,lv,states,class,hp,mp
 *
 * @param Page2
 * @desc 2ページ目に表示する内容です。
 * @default atk,def,mat,mdf,agi,luk
 *
 * @param Page3
 * @desc 3ページ目に表示する内容です。
 * @default q1,q2,q3,q4,q5
 *
 * @param Page4
 * @desc 4ページ目に表示する内容です。
 * @default
 *
 * @param Page5
 * @desc 5ページ目に表示する内容です。
 * @default
 *
 * @param Page6
 * @desc 6ページ目に表示する内容です。
 * @default
 *
 * @param Page7
 * @desc 7ページ目に表示する内容です。
 * @default
 *
 * @param Page8
 * @desc 8ページ目に表示する内容です。
 * @default
 *
 * @param Page9
 * @desc 9ページ目に表示する内容です。
 * @default
 *
 * @param Page10
 * @desc 10ページ目に表示する内容です。
 * @default
 *
 * @param
 * @param 【用語の設定】
 * @param EfficacyTexts
 * @desc 有効度などの名称です。
 * @default 有効度,有効度,低下有効度,無効化
 *
 * @param XparamTexts
 * @desc 追加能力値の名称です。
 * @default _hit,_eva,会心率,会心回避,魔法回避,魔法反射,反撃,_hp再生率,_mp再生率,_tp再生率
 *
 * @param SparamTexts
 * @desc 特殊能力値の名称です。
 * @default 狙われ率,防御効果率,回復効果率,薬の知識,_mp消費率,_tpチャージ率,物理ダメージ率,魔法ダメージ率,床ダメージ率,_exp獲得率
 *
 * @help ------------------------------------------------------
 * プラグインコマンド
 * ------------------------------------------------------
 * このプラグインにはプラグインコマンドはありません。
 * ------------------------------------------------------
 * 使い方
 * ------------------------------------------------------
 * プラグインを導入し、プラグインパラメータを設定することで動作します。
 *
 * このプラグインを導入して、Page1～10のうち、2つ以上空白以外に指定してある場合、
 * メニューコマンドがアクティブなときやメニューステータスがアクティブなときに、
 * 左右キーでページの切り替えができるようになります。
 *
 *・項目の設定方法
 * Page1～10に特定のキーワードを指定することで、
 * 好きな順番でパラメータを並べることができます。
 * 使用できるのは以下になります。
 *
 * name→アクターの名前
 * lv→アクターのレベル
 * nickname→アクターの二つ名
 * states→アクターに付与されているステートのアイコン
 * class→アクターのクラス名
 * hp→HP(ゲージ付き)
 * mp→MP(ゲージ付き)
 * tp→TP(ゲージ付き)
 * exp→現在のEXP
 * next→次のレベルまでの残りEXP(ゲージ付き)
 * atk→攻撃力
 * def→防御力
 * mat→魔法攻撃力
 * mdf→魔法防御力
 * agi→敏捷性
 * luk→運
 * hit→命中率
 * eva→回避率
 * cri→クリティカル率
 * mev→魔法回避率
 * mrf→魔法反射率
 * cev→会心回避率
 * cnt→反撃率
 * hrg→HP再生率
 * mrg→MP再生率
 * trg→TP再生率
 * tgr→狙われ率
 * grd→防御効果率
 * rec→回復効果率
 * pha→薬の知識
 * mcr→MP消費率
 * tcr→TPチャージ率
 * pdr→物理ダメージ率
 * mdr→魔法ダメージ率
 * fdr→床ダメージ率
 * exr→経験値獲得率
 * e○→ID○番の属性有効度
 * s○→ID○番のステート有効度
 * d0→最大HP低下の弱体有効度
 * d1→最大MP低下の弱体有効度
 * d2→攻撃力低下の弱体有効度
 * d3→防御力低下の弱体有効度
 * d4→魔法攻撃力低下の弱体有効度
 * d5→魔法防御力低下の弱体有効度
 * d6→敏捷性低下の弱体有効度
 * d7→運低下の弱体有効度
 * q○→アクターの○番目の装備
 * それ以外→そのまま表示(制御文字が使用可能です)
 *
 * ・用語の設定について
 * 用語の設定では以下の記述が対応する用語に置き換えられます。
 * また、上記のキーワードの設定で「それ以外」を指定した場合も、
 * この置き換えが行われます。
 *
 * _hp→用語で設定したHPの名称(略称)
 * _mp→用語で設定したMPの名称(略称)
 * _tp→用語で設定したTPの名称(略称)
 * _lv→用語で設定したLvの名称(略称)
 * _exp→用語で設定した経験値の名称(略称)
 * _hit→用語で設定した命中率の名称
 * _eva→用語で設定した回避率の名称
 * _id→アクターのID
 * _profile1→アクターのプロフィール1行目
 * _profile2→アクターのプロフィール2行目
 * _note○→アクターのメモ○行目
 * _eval<○○○>→○○○をevalで判定
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
 * ver1.01:180410
 * ステータスのページが1つの場合にも左右キーの入力でカーソル音が鳴っていたバグを修正。
 * プラグインパラメータの仕様を1.5.0に更新。
 * ver1.00:
 * 公開
 */

(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('MenuStatusR');
    var faceWidth = Number(parameters['FaceWidth'] || 144);
    var maxCols = Number(parameters['MaxCols'] || 2);
    var maxRows = Number(parameters['MaxRows'] || 3);
    var efficacyTexts = parameters['EfficacyTexts'].split(',');
    var xparamTexts = parameters['XparamTexts'].split(',');
    var sparamTexts = parameters['SparamTexts'].split(',');
    var menuStatusFontSize = Number(parameters['MenuStatusFontSize']);
    var skillStatusFontSize = Number(parameters['SkillStatusFontSize']);
    var useSkillStatus = parameters['UseSkillStatus'] === 'true';
    var pages = [];

    var n = 0;
    for (var i=0; i<10; i++) {
        if (parameters['Page'+(i+1)]){
            pages[n] = parameters['Page'+(i+1)].split(',');
            n++;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義
    var __WBase_drawActorSimpleStatus = Window_Base.prototype.drawActorSimpleStatus;
    Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
        if (useSkillStatus) {
            if (this._pageIndex === undefined) this.initPages();
            var rect = {x: x, y: y, width: width, height: this.contentsHeight()};
            this.drawStatusContents(actor, rect);
        } else {
            __WBase_drawActorSimpleStatus.call(this, actor, x, y, width);
        }
    };

    Window_Base.prototype.initPages = function() {
        this._pageIndex = 0;
        this._pageMax = pages.length;
    };

    Window_Base.prototype.paramAry = function() {
        return ['hp','mp','atk','def','mat','mdf','agi','luk',
            'hit','eva','cri','mev','mrf','cev','cnt','hrg','mrg','trg',
            'tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];
    };

    Window_Base.prototype.drawStatusContents = function(actor, rect) {
        var x = rect.x;
        var y = rect.y + rect.height / 2 - this.lineHeight() * (maxRows / 2);
        var width = (rect.width - this.textPadding()) / maxCols - 12;
        var height = this.lineHeight();
        for (var i=0,max=pages[this._pageIndex].length;i<max;i++) {
            var xx = x + (width + 12) * Math.floor(i / maxRows);
            var yy = y + height * Math.floor(i % maxRows);
            var code = pages[this._pageIndex][i];
            switch(code) {
                case 'name': this.drawActorName(actor, xx, yy); break;
                case 'lv': this.drawActorLevel(actor, xx, yy); break;
                case 'states': this.drawActorIcons(actor, xx, yy, width); break;
                case 'class': this.drawActorClass(actor, xx, yy, width); break;
                case 'nickname': this.drawActorNickname(actor, xx, yy, width); break;
                case 'hp': this.drawActorHp(actor, xx, yy, width); break;
                case 'mp': this.drawActorMp(actor, xx, yy, width); break;
                case 'tp': this.drawActorTp(actor, xx, yy, width); break;
                case 'exp': this.drawLineActorExp(actor, xx, yy, width); break;
                case 'next': this.drawLineActorNextExp(actor, xx, yy, width); break;
                default: this.drawLineParameter(actor, code, xx, yy, width);
            }
        }
    };

    Window_Base.prototype.drawLineParameter = function(actor, code, xx, yy, width) {
        var n = this.paramAry().indexOf(code);
        this.resetFontSettings();
        if (n === -1) {
            if (code.match(/^q(\d+)/i)) {
                var index = RegExp.$1;
                var w = (this.standardFontSize() + 4) + 2;
                var equip = actor.equips()[index-1];
                if (equip) {
                    this.drawIcon(equip.iconIndex, xx, yy + ((this.lineHeight() - this.standardFontSize()) / 2)-2);
                    this.drawText(equip.name, xx + w, yy, width - w);
                }
            } else if (code.match(/^e(\d+)/i)) {
                var id = Number(RegExp.$1);
                var text = $dataSystem.elements[id];
                text += efficacyTexts[0];
                this.changeTextColor(this.systemColor());
                this.drawText(text, xx, yy, (width * 2 / 3));
                this.changeTextColor(this.normalColor());
                this.drawText(Math.floor(actor.elementRate(id)*100)+'%', xx, yy, width,'right');
            } else if (code.match(/^s(\d+)/i)) {
                var id = Number(RegExp.$1);
                var text = $dataStates[id].name;
                text += efficacyTexts[1];
                this.changeTextColor(this.systemColor());
                this.drawText(text, xx, yy, (width * 2 / 3));
                this.changeTextColor(this.normalColor());
                this.drawText(Math.floor(actor.stateRate(id) * 100) + '%', xx, yy, width, 'right');
            } else if (code.match(/^d(\d+)/i)) {
                var id = Number(RegExp.$1);
                var text = TextManager.param(id);
                text += efficacyTexts[2];
                this.changeTextColor(this.systemColor());
                this.drawText(text, xx, yy, (width * 2 / 3));
                this.changeTextColor(this.normalColor());
                this.drawText(Math.floor(actor.debuffRate(id) * 100) + '%', xx, yy, width, 'right');
            } else {
                var text = this.replaceText(actor, code);
                if (text) this.drawTextEx(text,xx,yy);
            }
        } else {
            this.changeTextColor(this.systemColor());
            if (n < 8) {
                this.drawText(TextManager.param(n), xx, yy, 108);
                this.changeTextColor(this.normalColor());
                this.drawText(actor.param(n), xx, yy, width, 'right');
            } else if (n < 18) {
                n = n - 8;
                var text = this.replaceText(actor,xparamTexts[n]);
                this.drawText(text, xx, yy, 108);
                this.changeTextColor(this.normalColor());
                this.drawText(Math.floor(actor.xparam(n)*100)+'%', xx, yy, width, 'right');
            } else {
                n = n - 18;
                var text = this.replaceText(actor,sparamTexts[n]);
                this.drawText(text, xx, yy, 108);
                this.changeTextColor(this.normalColor());
                this.drawText(Math.floor(actor.sparam(n)*100)+'%', xx, yy, width, 'right');
            }
        }
    };

    Window_Base.prototype.replaceText = function(actor, text) {
        var desc = actor.actor().profile.split('\n');
        var notes = actor.actor().note.split('\n');
        if (!desc[0]) desc[0] = '';
        if (!desc[1]) desc[1] = '';
        text = text.replace(/_id/, actor.actorId());
        if (text.contains('_eval')) {
            text = text.replace(/\\V\[(\d+)\]/gi, function() {
                return $gameVariables.value(parseInt(arguments[1]));
            }.bind(this));
            text = text.replace(/_eval<(.+?)>/,function() {
                return eval(arguments[1]);
            }.bind(this));
        }
        text = text.replace(/_hp/,TextManager.hpA);
        text = text.replace(/_mp/,TextManager.mpA);
        text = text.replace(/_tp/,TextManager.tpA);
        text = text.replace(/_lv/,TextManager.levelA);
        text = text.replace(/_exp/,TextManager.expA);
        text = text.replace(/_hit/,TextManager.param(8));
        text = text.replace(/_eva/,TextManager.param(9));
        text = text.replace(/_profile1/,desc[0]);
        text = text.replace(/_profile2/,desc[1]);
        if (text.contains('_note')) {
            for (var i = 0, max = notes.length; i < max; i++) {
                if (!notes[i]) notes[i] = '';
                var r = new RegExp('_note' + (i + 1));
                text = text.replace(r, notes[i]);
            }
        }
        return text;
    };

    Window_Base.prototype.drawLineActorExp = function(actor, x, y, width) {
        var expTotal = TextManager.expTotal.format(TextManager.exp);
        var value1 = actor.currentExp();
        if (actor.isMaxLevel()) {
            value1 = '-----';
        }
        this.changeTextColor(this.systemColor());
        this.contents.fontSize = this.standardFontSize() / 1.5;
        this.drawText(expTotal, x, y, width);
        this.resetTextColor();
        this.contents.fontSize = this.standardFontSize();
        this.drawText(value1, x, y, width, 'right');
    };

    Window_Base.prototype.drawLineActorNextExp = function(actor, x, y, width) {
        var expNext = TextManager.expNext.format(TextManager.level);
        var value2 = actor.nextRequiredExp();
        var next = actor.nextLevelExp();
        var clexp = actor.currentLevelExp();
        var rate = (actor.currentExp() - clexp) / (next - clexp);
        if (actor.isMaxLevel()) {
            value2 = '-----';
            rate = 1.0;
        }
        this.drawGauge(x, y, width, rate,'rgb(0,0,255)','rgb(128,128,255)');
        this.changeTextColor(this.systemColor());
        this.contents.fontSize = this.standardFontSize() / 1.5;
        this.drawText(expNext, x, y, width);
        this.resetTextColor();
        this.contents.fontSize = this.standardFontSize();
        this.drawText(value2, x, y, width, 'right');
    };

    Window_Base.prototype.maxPages = function() {
        return this._pageMax;
    };

    Window_Base.prototype.changePage = function(pageIndex) {
        this._pageIndex = pageIndex;
    };

    Window_Base.prototype.nextPage = function() {
        this.changePage((this._pageIndex + 1) % this.maxPages());
    };

    Window_Base.prototype.prevPage = function() {
        this.changePage((this._pageIndex + (this.maxPages() - 1)) % this.maxPages());
    };

    Window_Base.prototype.maxBattleMembers = function() {
        if (Imported['SceneFormation']) {
            return Number(PluginManager.parameters('SceneFormation')['Max Battle Members Size'] || 4);
        } else {
            return $gameParty.maxBattleMembers();
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WSelectable_onTouch = Window_Selectable.prototype.onTouch;
    Window_Selectable.prototype.onTouch = function(triggered) {
        __WSelectable_onTouch.call(this, triggered);
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex < 0 && this._stayCount >= 10 && triggered) {
            if (x < this.padding) {
                this.cursorLeft();
            } else if (x >= this.width - this.padding) {
                this.cursorRight();
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Window_MenuCommand.prototype.cursorRight = function(wrap) {
        if (SceneManager._scene._statusWindow.maxPages() < 2) return;
        SoundManager.playCursor();
        this.callHandler('right');
    };

    Window_MenuCommand.prototype.cursorLeft = function(wrap) {
        if (SceneManager._scene._statusWindow.maxPages() < 2) return;
        SoundManager.playCursor();
        this.callHandler('left');
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WMStatus_initialize = Window_MenuStatus.prototype.initialize;
    Window_MenuStatus.prototype.initialize = function(x, y) {
        this.initPages();
        __WMStatus_initialize.call(this, x, y);
    };

    // 再定義
    Window_MenuStatus.prototype.drawItemImage = function (index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        this.changePaintOpacity(actor.isBattleMember());
        var w = Math.min(rect.width, faceWidth);
        var h = rect.height - 6;
        this.drawActorFace(actor, rect.x + 1, rect.y + 5, w, h);
        this.changePaintOpacity(true);
    };

    // 再定義
    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        var fw = faceWidth + 18;
        rect.x += fw;
        rect.width -= fw;
        this.drawStatusContents(actor, rect);
    };

    // 再定義
    Window_MenuStatus.prototype.lineHeight = function() {
        var h = Window_Base.prototype.lineHeight.call(this);
        h = Math.floor(Math.min(this.contentsHeight() / (this.maxBattleMembers() * maxRows),h));
        return h - 2;
    };

    // 再定義
    Window_MenuStatus.prototype.standardFontSize = function() {
        var s = Window_Base.prototype.standardFontSize.call(this);
        return menuStatusFontSize || s;
    };

    //再定義
    Window_MenuStatus.prototype.numVisibleRows = function () {
        return this.maxBattleMembers();
    };

    // 再定義
    Window_MenuStatus.prototype.drawIcon = function(iconIndex, x, y) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        var n = Math.floor(this.standardFontSize()+4);
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, n, n);
    };

    // 再定義
    Window_MenuStatus.prototype.processDrawIcon = function(iconIndex, textState) {
        this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
        textState.x += this.standardFontSize() + 8;
    };

    Window_MenuStatus.prototype.cursorRight = function(wrap) {
        if (this.maxPages() < 2) return;
        SoundManager.playCursor();
        this.callHandler('right');
    };

    Window_MenuStatus.prototype.cursorLeft = function(wrap) {
        if (this.maxPages() < 2) return;
        SoundManager.playCursor();
        this.callHandler('left');
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        __SMenu_createCommandWindow.call(this);
        this._commandWindow.setHandler('right', this.changeStatus.bind(this, 'right'));
        this._commandWindow.setHandler('left', this.changeStatus.bind(this, 'left'));
    };

    var __SMenu_createStatusWindow = Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow = function() {
        __SMenu_createStatusWindow.call(this);
        this._statusWindow.setHandler('right', this.changeStatus.bind(this, 'right'));
        this._statusWindow.setHandler('left', this.changeStatus.bind(this, 'left'));
    };

    Scene_Menu.prototype.changeStatus = function(dir) {
        if (dir === 'right') this._statusWindow.nextPage();
        if (dir === 'left') this._statusWindow.prevPage();
        this._statusWindow.refresh();
    };

    ////////////////////////////////////////////////////////////////////////////////////

    if (useSkillStatus) {

        Window_SkillType.prototype.cursorRight = function(wrap) {
            SoundManager.playCursor();
            this.callHandler('right');
        };

        Window_SkillType.prototype.cursorLeft = function(wrap) {
            SoundManager.playCursor();
            this.callHandler('left');
        };

        ////////////////////////////////////////////////////////////////////////////////////

        // 再定義
        Window_SkillStatus.prototype.refresh = function() {
            this.contents.clear();
            if (this._actor) {
                var w = this.width - this.padding * 2;
                var h = this.height - this.padding * 2;
                var y = 0;//h / 2 - this.lineHeight() * 1.5;
                var width = w - (faceWidth + 18) - this.textPadding();
                this.drawActorFace(this._actor, 0, 0, faceWidth, h);
                this.drawActorSimpleStatus(this._actor, faceWidth + 18, y, width);
            }
        };

        // 再定義
        Window_SkillStatus.prototype.lineHeight = function() {
            var h = Window_Base.prototype.lineHeight.call(this);
            h = Math.floor(Math.min(this.contentsHeight() / maxRows,h));
            return h - 2;
        };

        // 再定義
        Window_SkillStatus.prototype.standardFontSize = function() {
            var s = Window_Base.prototype.standardFontSize.call(this);
            return skillStatusFontSize || s;
        };

        // 再定義
        Window_SkillStatus.prototype.drawIcon = function(iconIndex, x, y) {
            var bitmap = ImageManager.loadSystem('IconSet');
            var pw = Window_Base._iconWidth;
            var ph = Window_Base._iconHeight;
            var sx = iconIndex % 16 * pw;
            var sy = Math.floor(iconIndex / 16) * ph;
            var n = Math.floor(this.standardFontSize()+4);
            this.contents.blt(bitmap, sx, sy, pw, ph, x, y, n, n);
        };

        // 再定義
        Window_SkillStatus.prototype.processDrawIcon = function(iconIndex, textState) {
            this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
            textState.x += this.standardFontSize() + 8;
        };

        ////////////////////////////////////////////////////////////////////////////////////

        var __SSkill_createSkillTypeWindow = Scene_Skill.prototype.createSkillTypeWindow;
        Scene_Skill.prototype.createSkillTypeWindow = function () {
            __SSkill_createSkillTypeWindow.call(this);
            this._skillTypeWindow.setHandler('right', this.changeStatus.bind(this, 'right'));
            this._skillTypeWindow.setHandler('left', this.changeStatus.bind(this, 'left'));
        };

        Scene_Skill.prototype.changeStatus = function (dir) {
            if (dir === 'right') this._statusWindow.nextPage();
            if (dir === 'left') this._statusWindow.prevPage();
            this._statusWindow.refresh();
        };
    }

    ////////////////////////////////////////////////////////////////////////////////////

}());