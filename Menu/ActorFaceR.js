//
//  アクターフェイス改造 ver1.03
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
Imported['ActorFaceR'] = 1.03;
/*:
 * @plugindesc ver1.03/メニュー画面等のフェイスの表示を変更します。
 * @author Yana
 *
 * @param FaceImage
 * @desc フェイスに何を使用するかの設定です。
 * walkだと歩行グラ、battlerだとSVグラ、standだと立ち絵です。
 * @default walk
 * @type select
 * @option 歩行グラフィック
 * @value walk
 * @option 立ち絵
 * @value stand
 * @option サイドビューバトラー
 * @value battler
 *
 * @param Offsets
 * @desc クラス毎のオフセット値です。
 * クラス名,x,y クラス名,x,y…というように記述してください。
 * @default Window_FormationStatus,0,-48
 *
 * @param PictureSyncActor
 * @desc ピクチャの表示でアクターの立ち絵と同期するかの設定です。
 * @type boolean
 * @default true
 *
 * @param DamagePictureName
 * @desc 瀕死のピクチャに追加する文字列です。
 * 使用しない場合は、空欄を指定してください。
 * @default
 *
 * @param NonSyncDamagePicture
 * @desc 瀕死やステートの立ち絵をピクチャと同期するかの設定です。
 * @type boolean
 * @default false
 *
 * @param NoExistFileThroughLocal
 * @desc ローカル環境で画像ファイルが存在しない時、画像を差し戻すかの設定です。
 * @type boolean
 * @default false
 *
 * @param OffsetX
 * @desc 画像のX補正値です。
 * @default 0
 *
 * @param OffsetY
 * @desc 画像のY補正値です。
 * @default 0
 *
 * @noteParam StandPicture
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam 立ち絵
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam DamageGraphic
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam 倒れグラ
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam ExStandPicture1
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam 追加立ち絵1
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam ExStandPicture2
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam 追加立ち絵2
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam ExStandPicture3
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam 追加立ち絵3
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam ExStandPicture4
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam 追加立ち絵4
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam ExStandPicture5
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam 追加立ち絵5
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam ExStandPicture6
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam 追加立ち絵6
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam ExStandPicture7
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam 追加立ち絵7
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam ExStandPicture8
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam 追加立ち絵8
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam ExStandPicture9
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam 追加立ち絵9
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam ExStandPicture10
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @noteParam 追加立ち絵10
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 *
 * @help ------------------------------------------------------
 * プラグインコマンド
 * ------------------------------------------------------
 * このプラグインには、プラグインコマンドはありません。
 * ------------------------------------------------------
 * 使い方
 * ------------------------------------------------------
 * プラグインを導入し、プラグインパラメータを設定することで動作します。
 * FaceImageを変更することで、それぞれのイメージをアクターフェイスの代わりに使用します。
 *
 * ------------------------------------------------------
 * FaceImageにWalkを指定した場合、アクターのメモに戦闘不能用画像の指定があると、その画像が使用されます。
 *
 * <倒れグラ:xxx>
 * <DamageGraphic:xxx>
 *
 * のいずれかで画像の指定を、
 *
 * <倒れインデックス:x>
 * <DamageIndex:x>
 *
 * のいずれかで倒れ画像のインデックスを指定します。
 *
 * この際、
 * 0  8 16 24 …
 * 1  9 17 25 …
 * 2 10 18 26 …
 * 3 11 19 27 …
 * 4 12 20 28 …
 * 5 13 21 29 …
 * 6 14 22 30 …
 * 7 15 23 31 …
 * のようにインデックスを指定します。
 * インデックスの指定がない場合、インデックス0番として扱われます。
 * ------------------------------------------------------
 * FaceImageにStandを指定した場合、アクターのメモに立ち絵画像指定用の記述が必要になります。
 *
 * <立ち絵:xxx>
 * <StandPicture:xxx>
 * <ステータスピクチャ:xxx>
 * <StatusPicture:xxx>
 *
 * のいずれかをアクターのメモに記述すると、そのアクターの立ち絵をxxxの画像に指定します。
 * この画像は、img/pictures/に用意してください。
 *
 * また、アクターのメモに以下のいずれかを記述することで、表示領域の関係で立ち絵が小さくなったとき
 * 立ち絵の表示される範囲を補正することができます。
 *
 * X座標を補正:
 * <立ち絵X:x>
 * <StandPictureX:x>
 * <ステータスピクチャX:x>
 * <StatusPictureX:x>
 *
 * Y座標を補正:
 * <立ち絵Y:y>
 * <StandPictureY:y>
 * <ステータスピクチャY:y>
 * <StatusPictureY:y>
 *
 * ------------------------------------------------------
 * ※ver1.01追記
 * ver1.01より、クラスと装備で画像名を補正できるようになりました。
 * アクターの立ち絵名+クラスの立ち絵名+装備の立ち絵名　で画像名が生成されます。
 * 例えば、アクターの立ち絵名が'a1'、クラスの立ち絵名が'-c1'、身体防具の立ち絵名が'-b1'だった場合、
 * 使用される画像は「a1-c1-b1」となります。
 * この仕様を使うことにより、アクター1番がクラス1番の時の立ち絵とアクター2番がクラス1番の時の立ち絵で
 * それぞれの立ち絵を変更することができるようになります。
 *
 * ------------------------------------------------------
 * ※ver1.02追記
 * ver1.02より、瀕死時や特定のステート時も立ち絵を変更できるようになりました。
 * 瀕死時はアクターのメモより、
 *
 * <瀕死立ち絵:xxx>
 * <DyingStandPicture:xxx>
 *
 * のxxxが立ち絵で指定した画像名に追加されます
 * ※アクターの立ち絵が「a1」、瀕死の立ち絵が「-d」の場合、「a1-d」の画像が使用されます。
 *
 *
 * ステートによる変化は、アクターの立ち絵名+ステートの立ち絵名となります。
 * ステートの立ち絵名はステートのメモに
 *
 * <立ち絵:xxx>
 * <StandPicture:xxx>
 *
 * のいずれかを記述して指定します。
 * クラスや装備の追加立ち絵名は、さらにそのあとに追加されます。
 * 瀕死とステートの立ち絵の変化が重なっている場合、ステートが優先されます。
 * ※アクターが戦闘不能で、アクターの立ち絵が「a1」、戦闘不能ステートの立ち絵が「-s1」、
 * 　クラスの立ち絵が「-c1」の場合、使用される画像は「a1-s1-c1」となります。
 *
 * また、アクターのメモに
 *
 * <追加立ち絵1:xxx>
 * <ExStandPicture1:xxx>
 *
 * のいずれかを記述すると、xxxで指定した画像はピクチャの表示を行ったときに、
 * 立ち絵と同じクラスや装備による補正を加算することができます。
 * 1の部分は複数指定する際、1,2,3,4,5…と増やしていってください。
 * 10番までは、未使用素材として判定されません。
 * これは、同じ記述を複数追加することで、複数指定することができます。
 * (表情の変化などで、立ち絵を変える必要がある場合などを想定しています)
 *
 *
 * ※ピクチャの表示との連携※
 * ver1.02より、ピクチャの表示と連携できるようになりました。
 * アクターで指定されている立ち絵の画像名をピクチャの表示で指定した場合、
 * 実際に表示されるピクチャは、クラスや装備などで補正された画像に差し替えられます。
 * この機能はプラグインパラメータよりオフが可能です。
 *
 *
 * ※装備&ショップステータス改造との連携※
 * ver1.02より、装備&ショップステータス改造で表示される立ち絵が、クラスや装備などで
 * 補正された画像に差し替えられるようになりました。
 * この際、アクターに立ち絵の指定があれば、このプラグインのFaceImageがstandになっている必要はありません。
 *
 * ------------------------------------------------------
 * ※注意※
 * クラスや装備などで生成された画像名を使った場合、それらの画像はデプロイメントを行うとき、
 * 「未使用素材を含まない」のオプションをオンにすると削除されてしまいます。
 * デプロイメント後、画像をフォルダに入れなおしたり、素材削除回避プラグインを導入して、
 * そちらで削除回避の対象に指定するなどの処置が必要です。
 * 素材削除回避プラグイン>http://rpg.mitukasa.jp/src/ogrpg1408.zip
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
 * ver1.03:
 * 画像の位置調整用のパラメータを追加。
 * ver1.021:171018
 * プラグインパラメータの仕様を1.5.0に更新。
 * ver1.02:
 * 立ち絵をピクチャと同期する機能を追加。
 * 装備&ショップステータス改造との連携処理を追加。
 * 処理の一部を見直し。
 * 瀕死状態やステートにかかった状態でも立ち絵が変えられるように機能を追加。
 * ローカル環境時、存在しないピクチャをスルーできる機能を追加。
 * ver1.01:
 * 立ち絵の画像をアクターのメモ+クラスのメモ+装備のメモになるように変更。
 * 歩行グラフィック表示時に戦闘不能なアクターの表示を変更。
 * ver1.00:
 * 公開
 */

(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    'use strict';

    var parameters = PluginManager.parameters('ActorFaceR');
    var faceImage = parameters['FaceImage'];
    var offsets = parameters['Offsets'].split(' ');
    var pictureSyncActor = parameters['PictureSyncActor'] === 'true';
    var nonSyncDamagePicture = parameters['NonSyncDamagePicture'] === 'true';
    var damagePictureName = parameters['DamagePictureName'];
    var noExistFileThroughLocal = parameters['NoExistFileThroughLocal'] === 'true';
    var spriteLayer = 2;
    var spriteOffsetX = Number(parameters['OffsetX']);
    var spriteOffsetY = Number(parameters['OffsetY']);

    offsets = offsets.reduce(function(r,o){
        var ary = o.split(',');
        r[ary[0]] = {x:Number(ary[1]), y:Number(ary[2])};
        return r;
    },{});

    ////////////////////////////////////////////////////////////////////////////////////

    var fileExists = function(name) {
        if (!noExistFileThroughLocal) return true;
        if (!StorageManager.isLocalMode()) return true;
        var base = require('path').dirname(process.mainModule.filename);
        var fs = require('fs');
        var ns = name.split('/');
        ns[-1] = encodeURIComponent(ns[-1]);
        var n = '';
        for (var i=0,max=ns.length;i<max;i++) n += ns[i] + '/';
        var path = base + '/img/pictures/' + n.substr(0,n.length-1);
        return fs.existsSync(path + '.png') || fs.existsSync(path + '.rpgmvp');
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Actor.prototype.baseStandPictureName = function() {
        return this.actor().meta['StandPicture'] || this.actor().meta['立ち絵'] ||
            this.actor().meta['StatusPicture'] || this.actor().meta['ステータスピクチャ'] || '';
    };

    Game_Actor.prototype.includeExPictureName = function(name) {
        if (!this._exPictureNames) {
            this._exPictureNames = [];
            var texts = this.actor().note.split('\n');
            for (var i=0,max=texts.length;i<max;i++) {
                if (texts[i].match(/^<(?:追加立ち絵|ExStandPicture)\d+:(.+)>/)) {
                    this._exPictureNames.push(RegExp.$1);
                }
            }
        }
        return this._exPictureNames.contains(name);
    };

    Game_Actor.prototype.stateStandPictureName = function() {
        var n = '';
        for (var i=0,max=this._states.length;i<max;i++) {
            var state = $dataStates[this._states[i]];
            if (state) {
                n = state.meta['StandPicture'] || state.meta['立ち絵'] ||
                    state.meta['StatusPicture'] || state.meta['ステータスピクチャ'] || '';
                if (n) return n;
            }
        }
        if (this.isDying()) {
            n = this.actor().meta['DyingPicture'] || this.actor().meta['瀕死立ち絵'] || damagePictureName || '';
            if (n) return n;
        }
        return '';
    };

    Game_Actor.prototype.standPictureName = function(callPicture, pictureName) {
        var oName = pictureName ? pictureName : this.baseStandPictureName();
        var name = oName;
        if (name) {
            if (!callPicture || !nonSyncDamagePicture) name += this.stateStandPictureName();
            name += this.currentClass().meta['StandPicture'] || this.currentClass().meta['立ち絵'] ||
                this.currentClass().meta['StatusPicture'] || this.currentClass().meta['ステータスピクチャ'] || '';
            for (var i = 0, max = this.equips().length; i < max; i++) {
                var equip = this.equips()[i];
                if (!equip) continue;
                name += equip.meta['StandPicture'] || equip.meta['立ち絵'] ||
                    equip.meta['StatusPicture'] || equip.meta['ステータスピクチャ'] || '';
            }
        }
        if (!fileExists(name)) name = oName;
        return name;
    };

    Game_Actor.prototype.standPictureX = function() {
        var x = this.actor().meta['StandPictureX'] || this.actor().meta['立ち絵X'] ||
            this.actor().meta['StatusPictureX'] || this.actor().meta['ステータスピクチャX'];
        return Number(x ? x : 0);
    };

    Game_Actor.prototype.standPictureY = function() {
        var y = this.actor().meta['StandPictureY'] || this.actor().meta['立ち絵Y'] ||
            this.actor().meta['StatusPictureY'] || this.actor().meta['ステータスピクチャY'];
        return Number(y ? y : 0);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GScreen_showPicture = Game_Screen.prototype.showPicture;
    Game_Screen.prototype.showPicture = function(pictureId, name, origin, x, y,
                                                 scaleX, scaleY, opacity, blendMode) {
        if (pictureSyncActor) {
            for (var i=1,max=$dataActors.length+1;i<max;i++) {
                var actor = $gameActors.actor(i);
                if (actor) {
                    if (actor.baseStandPictureName() === name) {
                        name = actor.standPictureName(true);
                        break;
                    } else {
                        if (actor.includeExPictureName(name)) {
                            name = actor.standPictureName(true, name);
                            break;
                        }
                    }
                }
            }
        }
        __GScreen_showPicture.call(this, pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WBase_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        this._spriteFrameCount = 0;
        this._isSpriteClear = true;
        __WBase_initialize.call(this,x,y,width,height)
    };

    // エイリアスだけど実質再定義
    var __WBase_drawActorFace = Window_Base.prototype.drawActorFace;
    Window_Base.prototype.drawActorFace = function(actor, x, y, width, height) {
        if (this._isSpriteClear) this.clearSprites();
        switch(faceImage) {
            case 'walk':
                this.drawActorGraphicSprite(actor, x, y, width, height);
                break;
            case 'battler':
                this.drawActorSvSprite(actor, x, y, width, height);
                break;
            case 'stand':
                this.drawActorStSprite(actor, x, y, width, height);
                break;
            default:
                __WBase_drawActorFace.call(this, actor, x, y, width, height);
                break;
        }
    };

    var __WBase_update = Window_Base.prototype.update;
    Window_Base.prototype.update = function() {
        if (Imported['SceneFormation'] && this._setRefresh) this.clearSprites();
        __WBase_update.call(this);
        this.updateFaceSprites();
    };

    Window_Base.prototype.updateFaceSprites = function() {
        if (this._tvSprites && this._spriteFrameCount % 12 === 0) {
            var ary = [0,1,2,1];
            for (var i in this._tvSprites){
                if (!this._tvSprites[i]) continue;
                var frame = ary[(this._spriteFrameCount / 12) % 4];
                var sprite = this._tvSprites[i];
                var actor = $gameActors.actor(i);
                var index = actor.characterIndex();
                var big = ImageManager.isBigCharacter(actor.characterName());
                var sw = Math.floor(sprite.bitmap.width / (big ? 3 : 12));
                var sh = Math.floor(sprite.bitmap.height / (big ? 4 : 8));
                var ox = 0;
                var oy = 0;
                if (actor.isDead()) {
                    var n = 3;
                    if (sprite._useDamage) {
                        n = 0;
                        ox = -1;
                        index = 0;
                        if (actor.actor().meta['倒れインデックス']) {
                            n = Number(actor.actor().meta['倒れインデックス']);
                            ox = Math.floor(n / 8) - 1;
                        } else if (actor.actor().meta['DamageGraphic']) {
                            n = Number(actor.actor().meta['DamageIndex']);
                            ox = Math.floor(n / 8) - 1;
                        }
                    }
                    oy = n % 8;
                    frame = 1;
                }
                var x = sw * frame + ox * sw + sw * (index % 4) * 3;
                var y = oy * sh + sh * Math.floor(index / 4) * 4;
                sprite.setFrame(x, y, sw, sh);
            }
        }
        if (this._svSprites && this._spriteFrameCount % 12 === 0) {
            var frame = (this._spriteFrameCount / 12) % 3;
            var sFrame = (this._spriteFrameCount / 12) % 8;
            for (var i in this._svSprites){
                if (!this._svSprites[i]) continue;
                var sprite = this._svSprites[i];
                var actor = $gameActors.actor(i);
                var sw = sprite.bitmap.width / 9;
                var sh = sprite.bitmap.height / 6;
                var ox = 0;
                var oy = 0;
                if (this._index !== undefined && this._index === actor.index()) { ox = 6; oy = 1; }
                if (actor.isDying()){ ox = 6; oy = 2; }
                switch (actor.stateMotionIndex()) {
                    case 1: ox = 6; oy = 3; break;
                    case 2: ox = 6; oy = 4; break;
                    case 3: ox = 6; oy = 5; break;
                }
                sprite.setFrame(sw * frame + ox * sw, oy * sh, sw, sh);
                if (actor.stateOverlayIndex() > 0) {
                    var sSprite = this._stateSprites[i];
                    var sx = 96 * sFrame;
                    var sy = 96 * (actor.stateOverlayIndex() - 1);
                    sSprite.setFrame(sx, sy, 96, 96);
                }
            }
        }
        if (this._stSprites) {
            for (var i in this._stSprites) {
                var sprite = this._stSprites[i];
                if (sprite && sprite._actor && sprite.bitmap.width > 0) {
                    var actor = sprite._actor;
                    var width = sprite._sw;
                    var height = sprite._sh;
                    var opacity = sprite._so;
                    var sx = Math.max(actor.standPictureX() + sprite.bitmap.width / 2 - width / 2, 0);
                    var sy = Math.max(actor.standPictureY(), 0);
                    if (width >= sprite.bitmap.width) sx = 0;
                    if (height >= sprite.bitmap.height) sy = 0;
                    sprite.setFrame(sx, sy, width, height);
                    sprite.opacity = actor.standPictureName() ? opacity : 0;
                    sprite._actor = null;
                }
            }
        }
        this._spriteFrameCount++;
    };

    Window_Base.prototype.drawActorGraphicSprite = function(actor, x, y, width, height) {
        if (!this._tvSprites) this._tvSprites = {};
        if (!this._tvSprites[actor.actorId()]) this.initActorGraphicSprite(actor);
        if (!width) width = 144;
        if (!height) height = 144;
        var sprite = this._tvSprites[actor.actorId()];
        var opacity = this.contents.paintOpacity;
        if (sprite) {
            if (actor.isDead()) {
                var cName = '';
                if (actor.actor().meta['倒れグラ']) cName = actor.actor().meta['倒れグラ'];
                if (actor.actor().meta['DamageGraphic']) cName = actor.actor().meta['DamageGraphic'];
                if (cName) {
                    var bitmap = ImageManager.loadCharacter(cName);
                    sprite.bitmap = bitmap;
                    sprite._useDamage = true;
                }
                sprite._dead = true;
            } else if (sprite._dead){
                var index = actor.characterIndex();
                var bitmap = ImageManager.loadCharacter(actor.characterName());
                sprite.bitmap = bitmap;
                sprite._dead = false;
                sprite.setFrame(48 + 144*(index % 4),192 * Math.floor(index / 4),48,48);
            }
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.x = x + Math.floor(width / 2) + 20 + spriteOffsetX;
            sprite.y = y + Math.floor(height / 2) + 20 + spriteOffsetX;
            sprite.opacity = opacity;
        }
    };

    Window_Base.prototype.drawActorSvSprite = function(actor, x, y, width, height) {
        if (!this._svSprites) this._svSprites = {};
        if (!this._svSprites[actor.actorId()]) this.initActorSvSprite(actor);
        if (!width) width = 144;
        if (!height) height = 144;
        var sprite = this._svSprites[actor.actorId()];
        var opacity = this.contents.paintOpacity;
        var name = JsonEx._getConstructorName(this);
        var ox = 0;
        var oy = 0;
        if (offsets[name]) {
            ox = offsets[name].x;
            oy = offsets[name].y;
        }
        if (sprite) {
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 1.0;
            sprite.x = x + Math.floor(width / 2) + 20 + ox + spriteOffsetX;
            sprite.y = y + height + 8 + oy + spriteOffsetY;
            sprite.opacity = opacity;
            var oSprite = this._stateSprites[actor.actorId()];
            oSprite.x = sprite.x - 48 + spriteOffsetX;
            oSprite.y = sprite.y - 96 + spriteOffsetX;
            if (actor.stateOverlayIndex() > 0) oSprite.opacity = opacity;
            var sSprite = this._shadowSprites[actor.actorId()];
            sSprite.x = sprite.x - 41 + spriteOffsetX;
            sSprite.y = sprite.y - 20 + spriteOffsetX;
            sSprite.opacity = opacity;
        }
    };

    Window_Base.prototype.drawActorStSprite = function(actor, x, y, width, height) {
        if (!this._stSprites) this._stSprites = {};
        if (!this._stSprites[actor.actorId()]) this.initActorStSprite(actor);
        if (!width) width = 144;
        if (!height) height = 144;
        var sprite = this._stSprites[actor.actorId()];
        var opacity = this.contents.paintOpacity;
        if (sprite) {
            if (sprite._bitmapName !== actor.standPictureName()) {
                var bitmap = ImageManager.loadPicture(actor.standPictureName());
                sprite._bitmapName = actor.standPictureName();
                sprite.bitmap = bitmap;
            }
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 1.0;
            sprite.x = x + Math.floor(width / 2) + 20 + spriteOffsetX;
            sprite.y = y + height + 16 + spriteOffsetX;
            if (sprite.bitmap.width > 0) {
                var ax = actor.standPictureX();
                var ay = actor.standPictureY();
                var sx = Math.max(ax + sprite.bitmap.width / 2 - width / 2, 0);
                var sy = Math.max(ay, 0);
                if ((width + sx) > sprite.bitmap.width ) sx = 0;
                if ((height + sy) > sprite.bitmap.height) sy = 0;
                //if (width >= sprite.bitmap.width) sx = 0;
                //if (height >= sprite.bitmap.height) sy = 0;
                sprite.setFrame(sx, sy, width, height);
                sprite.opacity = actor.standPictureName() ? opacity : 0;
            } else {
                sprite._actor = actor;
                sprite._sw = width;
                sprite._sh = height;
                sprite._so = opacity;
            }
        }
    };

    Window_Base.prototype.initActorGraphicSprite = function(actor) {
        var bitmap = ImageManager.loadCharacter(actor.characterName());
        var sprite = new Sprite(bitmap);
        var index = actor.characterIndex();
        sprite.setFrame(48 + 144*(index % 4),192 * Math.floor(index / 4),48,48);
        sprite.opacity = 0;
        this.addChildAt(sprite, spriteLayer);
        this._tvSprites[actor.actorId()] = sprite;
    };

    Window_Base.prototype.initActorSvSprite = function(actor) {
        if (!this._stateSprites) {
            this._stateSprites = {};
            this._shadowSprites = {};
        }

        var bitmap = ImageManager.loadSvActor(actor.battlerName());
        var sprite = new Sprite(bitmap);
        sprite.setFrame(0,0,64,64);
        sprite.opacity = 0;
        this.addChildAt(sprite, spriteLayer);
        this._svSprites[actor.actorId()] = sprite;
        var oBitmap = ImageManager.loadSystem('States');
        var sSprite = new Sprite(oBitmap);
        sSprite.setFrame(0,0,0,96);
        sSprite.opacity = 0;
        this.addChildAt(sSprite, spriteLayer+1);
        this._stateSprites[actor.actorId()] = sSprite;

        var hBitmap = ImageManager.loadSystem('Shadow2');
        var hSprite = new Sprite(hBitmap);
        hSprite.setFrame(0,0,82,38);
        hSprite.opacity = 0;
        this.addChildAt(hSprite, spriteLayer);
        this._shadowSprites[actor.actorId()] = hSprite;
    };

    Window_Base.prototype.initActorStSprite = function(actor) {
        var bitmap = ImageManager.loadPicture(actor.standPictureName());
        var sprite = new Sprite(bitmap);
        sprite._bitmapName = actor.standPictureName();
        sprite.setFrame(sprite.width / 2, sprite.height, sprite.width, sprite.height);
        sprite.opacity = 0;
        this.addChildAt(sprite, spriteLayer);
        this._stSprites[actor.actorId()] = sprite;
    };

    Window_Base.prototype.clearSprites = function() {
        if (this._tvSprites){
            for (var i in this._tvSprites){
                if (this._tvSprites[i]) this._tvSprites[i].opacity = 0;
            }
        }
        if (this._svSprites){
            for (var i in this._svSprites){
                if (this._svSprites[i]) this._svSprites[i].opacity = 0;
                if (this._stateSprites[i]) this._stateSprites[i].opacity = 0;
                if (this._shadowSprites[i]) this._shadowSprites[i].opacity = 0;
            }
        }
        if (this._stSprites){
            for (var i in this._stSprites){
                if (this._stSprites[i]) this._stSprites[i].opacity = 0;
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WSelectable_refresh = Window_Selectable.prototype.refresh;
    Window_Selectable.prototype.refresh = function() {
        this._isSpriteClear = false;
        this.clearSprites();
        __WSelectable_refresh.call(this);
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());