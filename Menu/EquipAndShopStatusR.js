//
//  装備&ショップステータス改造 ver1.09
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
Imported['EquipAndShopStatusR'] = 1.09;

/*:
 * @plugindesc ver1.09/装備&ショップシーンのステータス表示を改造します。
 * @author Yana
 *
 * @param 【ステータスの設定】
 *
 * @param Stand Opacity
 * @desc 表示するピクチャの透明度です。
 * @type number
 * @min 0
 * @max 256
 * @default 128
 *
 * @param Font Size
 * @desc ステータス欄のフォントサイズです。
 * @type number
 * @default 24
 *
 * @param Top Space
 * @desc ステータス欄の表示部分の上部スペースです。
 * @type number
 * @default 0
 *
 * @param Page Icon Offset Y
 * @desc ステータス欄のページ表示の表示位置補正Y値です。
 * @type number
 * @default -12
 *
 * @param Line Spacing
 * @desc 1行毎のスペースです。
 * @type number
 * @default 4
 *
 * @param Max Page Line
 * @desc 1ページに表示する最大項目数です。
 * @type number
 * @default 14
 *
 * @param Slot Height
 * @desc SlotWindowの高さです。
 * @type number
 * @default 224
 *
 * @param Equip Status Help Text
 * @desc 装備ステータスの下に表示するヘルプのテキストです。
 * 装備のときにこの項目のヘルプが使用されます。
 * @default ←→:ページの切替 QW:キャラの切替
 *
 * @param Equip Status Help Text2
 * @desc 装備ステータスの下に表示するヘルプのテキスト2です。
 * アイテムウィンドウがアクティブな時にこの項目が使用されます。
 * @default ←→:ページの切替
 *
 * @param Use Slot Compact
 * @desc itemWindowがアクティブになった時、slotWindowを縮小する設定です。
 * @type boolean
 * @default true
 *
 * @param
 * @param 【内容の設定】
 *
 * @param Basic Params
 * @desc 基本ステータスの欄に表示する内容です。
 * @default name,level,class,l
 *
 * @param Page1
 * @desc 1ページ目に表示する内容です。
 * @default hp,mp,l,atk,def,mat,mdf,agi,luk
 *
 * @param Page2
 * @desc 2ページ目に表示する内容です。
 * @default hit,eva,cri,mev,mrf,cev,cnt,hrg,mrg,trg
 *
 * @param Page3
 * @desc 3ページ目に表示する内容です。
 * @default tgr,grd,rec,pha,mcr,tcr,pdr,mdr,fdr,exr
 *
 * @param Page4
 * @desc 4ページ目に表示する内容です。
 * @default e1,e2,e3,e4,e5,e6,e7,e8,e9
 *
 * @param Page5
 * @desc 5ページ目に表示する内容です。
 * @default s4,s5,s6,s7,s8,s9,s10
 *
 * @param Page6
 * @desc 6ページ目に表示する内容です。
 * @default d0,d1,d2,d3,d4,d5,d6,d7
 *
 * @param
 * @param 【ショップの設定】
 *
 * @param Is Refine Shop Status
 * @desc ショップステータスも改造するかの設定です。
 * true/falseで指定してください。
 * @type boolean
 * @default true
 *
 * @param Max Shop Equip Page Line
 * @desc ショップステータスの装備の場合の
 * 1ページ当たりの表示行数です。
 * @type number
 * @default 7
 *
 * @param Max Shop Item Page Line
 * @desc ショップステータスのアイテムの場合の
 * 1ページ当たりの表示行数です。
 * @type number
 * @default 13
 *
 * @param Shop Info
 * @desc ショップステータスのアイテムに表示する内容です。
 * @default type,price,consume,dmg,scope,occasion,l,effects
 *
 * @param Equip Info
 * @desc ショップステータスの装備に表示する内容です。
 * 空欄にすると、非表示になります。
 * @default etype,type,price
 *
 * @param Page Icon Color
 * @desc アクティブなページアイコン矩形のカラー設定です。
 * rgb(Red,Green,Blue)の書式で記述してください。
 * @default rgb(192,255,192)
 *
 * @param Item Help Text
 * @desc ショップステータスの下に表示するヘルプのテキストです。
 * アイテムのときにこの項目のヘルプが使用されます。
 * @default ←→:ページの切替
 *
 * @param Equip Help Text
 * @desc ショップステータスの下に表示するヘルプのテキストです。
 * 装備のときにこの項目のヘルプが使用されます。
 * @default ←→:ページの切替 QW:キャラの切替
 *
 * @param Performance Icon Position Y
 * @desc ショップステータスで表示される能力の上下を表すアイコンのY座標補正値です。
 * @type number
 * @default 18
 *
 * @param Performance Icon Up
 * @desc ショップステータスで表示される能力の上下を表すアイコンの能力値が上がる場合の表示です。
 * @default ▲
 *
 * @param Performance Icon Down
 * @desc ショップステータスで表示される能力の上下を表すアイコンの能力値が下がる場合の表示です。
 * @default ▼
 *
 * @param Performance Icon Equal
 * @desc ショップステータスで表示される能力の上下を表すアイコンの同じ能力の場合の表示です。
 * @default ＝
 *
 * @param Performance Icon Equipped
 * @desc ショップステータスで表示される能力の上下を表すアイコンの装備中の表示です。
 * @default E
 *
 * @param
 * @param 【用語の設定】
 *
 * @param Effect Name
 * @desc 有効度の名称です。
 * @default 有効度
 *
 * @param Down Name
 * @desc デバフ有効度の名称です。
 * @default 低下有効度
 *
 * @param Item Type Text
 * @desc アイテムタイプの名称です。
 * @default アイテムタイプ
 *
 * @param Consume Text
 * @desc 消耗の名称です。
 * @default 消耗
 *
 * @param Damage Type Text
 * @desc ダメージタイプの名称です。
 * @default ダメージタイプ
 *
 * @param Price Text
 * @desc 値段の名称です。
 * @default 価値
 *
 * @param Scope Text
 * @desc 効果範囲の名称です。
 * @default 効果範囲
 *
 * @param Occasion Text
 * @desc 使用可能時の名称です。
 * @default 使用可能時
 *
 * @param Repeat Text
 * @desc 連続回数で使用される名称です。
 * @default 発動回数
 *
 * @param TpGain Text
 * @desc 得TPで使用される名称です。
 * @default 得ＴＰ
 *
 * @param Equip Type Text
 * @desc 装備タイプの名称です。
 * @default 装備タイプ
 *
 * @param Weapon Type Text
 * @desc 武器タイプの名称です。
 * @default 武器タイプ
 *
 * @param Armor Type Text
 * @desc 防具タイプの名称です。
 * @default 防具タイプ
 *
 * @param Turn Text
 * @desc バフなどに使用されるターンの名称です。
 * @default ターン
 *
 * @param Escape Text
 * @desc 特殊効果　逃げるの名称です。
 * @default 逃げる
 *
 * @param Scope Vocab
 * @desc 効果範囲で使用される各範囲の名称です。
 * @default なし,敵単体,敵全体,敵1体 ランダム,敵2体 ランダム,敵3体 ランダム,敵4体 ランダム,味方単体,味方全体,味方単体(戦闘不能),味方全体(戦闘不能),使用者
 *
 * @param Item Type Vocab
 * @desc アイテムタイプで使用される各名称です。
 * @default 通常アイテム,貴重品,隠しアイテムA,隠しアイテムB
 *
 * @param Consume Vocab
 * @desc 消耗で使用される各名称です。
 * @default 消耗する,消耗しない
 *
 * @param Occasion Vocab
 * @desc 使用可能時で使用される各名称です。
 * @default 常時,バトル,メニュー,使用不可
 *
 * @param Damage Vocab
 * @desc ダメージタイプで使用される各名称です。
 * @default なし,HPダメージ,MPダメージ,HP回復,MP回復,HP吸収,MP吸収
 *
 * @param Xparam Names
 * @desc 追加能力値の名称です。
 * @default 命中,回避,会心率,会心回避,魔法回避,魔法反射,反撃,HP再生率,MP再生率,TP再生率
 *
 * @param Sparam Names
 * @desc 特殊能力値の名称です。
 * @default 狙われ率,防御効果率,回復効果率,薬の知識,MP消費率,TPチャージ率,物理ダメージ率,魔法ダメージ率,床ダメージ率,経験値獲得率
 *
 * @param Effects Names
 * @desc 使用効果の各効果の名称です。
 * @default HP回復,HPダメージ,MP回復,MPダメージ,TP増加,ステート付与,ステート解除,強化付与,弱体付与,強化解除,弱体解除,特殊効果,成長,スキル習得,コモン
 *
 * @param
 * @param 【オプション】
 * @param Use Equip Command
 * @desc 装備コマンドを使用するかの設定です。
 * @type boolean
 * @default true
 *
 * @param Equipped Limit Color
 * @desc 装備制限表示や追加表示で表示される項目のカラーです。
 * @type number
 * @default 6
 *
 * @noteParam StatusPicture
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam ステータスピクチャ
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 * 
 * @help------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------ 
 * 注意
 * ------------------------------------------------------
 * このプラグインは、ステータスクラス+クラスチェンジシーンまたは、スキルCP制と
 * 併用する場合、こちらをそれらのプラグインより上に配置してください。
 * また、ステータスクラス+クラスチェンジシーンはver1.04以上を、
 * スキルCP制はver1.07以上を使用してください。
 * ------------------------------------------------------ 
 * 設定方法
 * ------------------------------------------------------
 * ・項目の設定方法
 * Basic Paramsに特定のキーワードを指定することで、基本パラメータ部分の表示が、
 * 変更できるようになりました。
 * 使用できるのは以下になります。
 *
 * name→名前
 * class→クラス
 * level→レベル
 * states→現在罹っているステート
 * nickname→二つ名
 * meta[xxx]→アクターのメモに記述された<xxx:yyy>のyyy
 * l→ライン
 * s→スペース
 *
 * page1~6に特定のキーワードを指定することで、好きな順番でパラメータを、
 * 並べることができます。
 * 使用できるのは以下になります。
 *
 * hp→最大HP
 * mp→最大MP
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
 * d0→最大HP低下のデバフ有効度
 * d1→最大MP低下のデバフ有効度
 * d2→攻撃力低下のデバフ有効度
 * d3→防御力低下のデバフ有効度
 * d4→魔法攻撃力低下のデバフ有効度
 * d5→魔法防御力低下のデバフ有効度
 * d6→敏捷性低下のデバフ有効度
 * d7→運低下のデバフ有効度
 * l→ライン
 * s→スペース
 * ex<color:text:value>→colorでtextを右側に表示し、valueをevalで評価した結果を右側に表示
 * それ以外→そのまま表示されます(制御文字が使用できます)
 * 
 * それぞれのページに記載されていない項目は、装備変更時の表示項目からも
 * 除外されます。
 * また、ページに何も記載しない場合、そのページは無いものとして計算されますが、
 * その際、ページは数値の多い方から空欄にしてください。
 * 
 * ・ピクチャの設定方法
 * ステータス欄にピクチャを設定する場合、アクターのメモ欄に
 * <ステータスピクチャ:○○○>
 * または、
 * <StatusPicture:○○○>
 * と記述してください。
 * ○○○は表示するピクチャのファイル名で、img/picturesフォルダに用意してください。
 * 
 * ver1.01よりショップ時にアイテムの効果を表示する機能も追加されました。
 * これらは、Shop Infoのプラグインパラメータで表示項目を設定してください。
 * 使用できるパラメータは以下になります。
 * 
 * dmg→ダメージタイプ　なしの場合は非表示になります
 * price→価格 0の場合は非表示になります
 * scope→効果範囲 なしの場合は非表示になります
 * occasion→使用可能時 使用不可の場合は非表示になります
 * repeat→連続回数 1回の場合は非表示になります。
 * tpgain→得TP 0の場合は非表示になります。
 * effects→使用効果　まとめて全部表示されます
 * meta[○○○]→アイテムのメモ欄に記述された<○○○:×××>を○○○　×××と表示します
 * l→ライン
 * s→スペース
 * それ以外→そのまま表示されます(制御文字が使用できます)
 * 
 * priceで表示される項目は、アイテムのメモ欄に
 * <価値:xxx>
 * または
 * <value:xxx>
 * と記述されていた場合、xxxが優先で表示されます。
 * これは表示のみで、特にアイテムの売買価格に影響があるなどの機能はありません。
 *
 * ver1.05より装備制限用に専用のメタタグが追加されました。
 * ver1.061より設定するパラメータが3つになりました。
 * また、1.061より装備制限を導入していなくてもタグが使用可能になりました。
 * アイテムのメモに
 * <装備制限表示:xxx,yyy,zzz>
 * <DisplayEquippedLimit:xxx,yyy,zzz>
 * <追加表示:xxx,yyy,zzz>
 * <DisplayExtend:xxx,yyy,zzz>
 * のいずれかを記述すると、その装備のパラメータ変化を表示する部分の先頭に、
 * xxx   yyy(zzz)
 * のような形で項目が追加されます。
 * これは、実際の装備制限とは関係なく追加され、複数行の追加を行うことも可能です。
 * zzzはevalで評価され、aがアクター、vが変数、sがスイッチとして使用できます。
 * zzzにnullを指定すると(zzz)の部分は表示されなくなります。
 * また、yyy<=zzzの時、(zzz)の文字色がパワーアップカラーに、
 * それ以外の時はパワーダウンカラーに変わります。
 * 
 * ------------------------------------------------------
 * 仕様と追加機能
 * ------------------------------------------------------
 * 
 * -装備画面での操作-
 * このプラグインが導入されていると、スロットウィンドウがアクティブな状態でShiftキー
 * を押すことで、装備が解除されるようになります。
 * 
 * また、スロットウィンドウがアクティブな状態でも、LRでキャラクターの切り替えが可能に
 * なります。
 * 
 * コマンドウィンドウがアクティブなとき、コマンドウィンドウの左右のパッディング(左右の枠辺り)
 * をクリックすることで、LRと同じ動作をします。
 * 
 * スロットウィンドウやアイテムウィンドウがアクティブなとき、それぞれのウィンドウの左右の
 * パッディングをクリックすると、十字キーの左右を押した時と同じように、ステータスウィンドウの
 * ページ切替が可能です。
 * 
 * -ショップでの操作-
 * 選択しているアイテムが装備品かどうかで操作が少し変わります。
 * 通常アイテムの場合、左右キーでアイテムステータスのページの切り替え、
 * またはステータス画面のクリックでページ送りが可能です。
 * 
 * 選択しているアイテムが装備品の場合、LRで表示アクターの切り替え、
 * ステータスウィンドウをクリックで表示アクターを次のアクターに、または、
 * アクターグラフィックを直接クリックすることでも表示アクターの変更が可能です。
 * 左右キーはステータスウィンドウのページ切替になります。
 * 
 * クリックはShiftキーでも代用が可能です。
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
 * ver1.09:180315
 * 会心回避と魔法回避の表示が入れ替わっていたのを修正。
 * ver1.08:170111
 * 封印されている装備タイプがshiftキーで解除できるバグを修正。
 * ver1.07:170108
 * 基本パラメータ部分を設定できるように変更
 * ページアイコン部分のy座標を調整するパラメータを追加
 * ショップステータスで装備ステータスの上昇下降などのアイコンの位置や表示を設定できるように変更
 * 装備制限併用時にショップステータスで制限された装備が常に下降として表示されるのを修正
 * ver1.061:170104
 * 装備制限用のタグを装備制限を導入していない状態でも使用できるように変更。
 * 追加表示を行うタグのパラメータを3つ設定するように変更
 * ver1.06:170101
 * evalで評価した値をステータスに表示する機能を追加。
 * ver1.05:
 * 装備制限との併用可処理を追加。
 * ver1.04:
 * アイテム重量制との併用化処理を追加。
 * ステータスアップ報酬との併用化処理を追加。
 * ver1.03:
 * ActorFaceRとの連携処理を追加。
 * 購入ウィンドウ及び売却ウィンドウがアクティブなとき、操作説明が消えるように修正。
 * ver1.02:
 * 利用規約をMITライセンスに変更。
 * ショップステータスの表示において、2ページ目以降の表示が正常でなかったバグを修正。
 * 連続回数の表示項目を追加。
 * 得ＴＰの表示項目を追加。
 * ヘルプテキストを表示する機能を追加。
 * ver1.01:
 * ショップステータスを改造する機能を追加。
 * 上記に伴い、名称を変更。
 * ver1.00:
 * 公開
 */

(function(){
    ////////////////////////////////////////////////////////////////////////////////////

    'use strict';
    
    var parameters = PluginManager.parameters('EquipAndShopStatusR');
    var effectName = String(parameters['Effect Name'] || '有効度');
    var downName = String(parameters['Down Name'] || '低下');
    var itemTypeText = String(parameters['Item Type Text'] || 'アイテムタイプ');
    var consumeText = String(parameters['Consume Text'] || '消耗');
    var damageTypeText = String(parameters['Damage Type Text'] || 'ダメージタイプ');
    var priceText = String(parameters['Price Text'] || '価値');
    var scopeText = String(parameters['Scope Text'] || '効果範囲');
    var occasionText = String(parameters['Occasion Text'] || '使用可能時');
    var repeatText = String(parameters['Repeat Text'] || '発動回数');
    var tpGainText = String(parameters['TpGain Text'] || '得ＴＰ');
    var turnText = String(parameters['Turn Text'] || 'ターン');
    var escapeText = String(parameters['Escape Text'] || '逃げる');
    var equipTypeText = String(parameters['Equip Type Text'] || '装備タイプ');
    var weaponTypeText = String(parameters['Weapon Type Text'] || '武器タイプ');
    var armorTypeText = String(parameters['Armor Type Text'] || '防具タイプ');
    var scopeVocab = String(parameters['Scope Vocab'] || 'なし,敵単体,敵全体,敵1体 ランダム,敵2体 ランダム,敵3体 ランダム,敵4体 ランダム,味方単体,味方全体,味方単体(戦闘不能),味方全体(戦闘不能),使用者').split(',');
    var occasionVocab = String(parameters['Occasion Vocab'] || '常時,バトル,メニュー,使用不可').split(',');
    var damageVocab = String(parameters['Damage Vocab'] || 'なし,HPダメージ,MPダメージ,HP回復,MP回復,HP吸収,MP吸収').split(',');
    var itemTypeVocab = String(parameters['Item Type Vocab'] || '通常アイテム,貴重品,隠しアイテムA,隠しアイテムB').split(',');
    var consumeVocab = String(parameters['Consume Vocab'] || '消耗する,消耗しない').split(',');
    var xparamNames = String(parameters['Xparam Names'] || '命中,回避,クリティカル率,魔法回避,会心回避,魔法反射,反撃,HP再生率,MP再生率,TP再生率').split(',');
    var sparamNames = String(parameters['Sparam Names'] || '狙われ率,防御効果率,回復効果率,薬の知識,MP消費率,TPチャージ率,物理ダメージ率,魔法ダメージ率,床ダメージ率,経験値獲得率').split(',');
    var effectNames = String(parameters['Effects Names'] || 'HP回復,HPダメージ,MP回復,MPダメージ,TP増加,ステート付与,ステート解除,強化付与,弱体付与,強化解除,弱体解除,特殊効果,成長,スキル習得,コモン').split(',');
    var standOpacity = Number(parameters['Stand Opacity'] || 128);
    var fontSize = Number(parameters['Font Size'] || 24);
    var topSpace = Number(parameters['Top Space'] || 0);
    var lineSpacing = Number(parameters['Line Spacing'] || 4);
    var maxPageLine = Number(parameters['Max Page Line'] || 13);
    var maxShopEquipPageLine = Number(parameters['Max Shop Equip Page Line'] || 7);
    var maxShopItemPageLine = Number(parameters['Max Shop Item Page Line'] || 13);
    var basicParams = String(parameters['Basic Params']).split(',');
    var page1 = String(parameters['Page1']).split(',');
    var page2 = String(parameters['Page2']).split(',');
    var page3 = String(parameters['Page3']).split(',');
    var page4 = String(parameters['Page4']).split(',');
    var page5 = String(parameters['Page5']).split(',');
    var page6 = String(parameters['Page6']).split(',');
    var shopInfo = String(parameters['Shop Info']).split(',');
    var equipInfo = String(parameters['Equip Info']).split(',');
    var slotHeight = Number(parameters['Slot Height'] || 224);
    var isRefineShopStatus = String(parameters['Is Refine Shop Status']) === 'true';
    var pageIconColor = String(parameters['Page Icon Color'] || 'rgba(192,255,192,1.0)');
    var itemHelpText = String(parameters['Item Help Text']);
    var equipHelpText = String(parameters['Equip Help Text']);
    var equipStatusHelpText = String(parameters['Equip Status Help Text']);
    var equipStatusHelpText2 = String(parameters['Equip Status Help Text2']);
    var useEquipCommand = parameters['Use Equip Command'] === 'true';
    var useSlotCompact = parameters['Use Slot Compact'] === 'true';
    var equippedLimitColor = Number(parameters['Equipped Limit Color']) || 0;
    var performanceIconPositionY = Number(parameters['Performance Icon Position Y']) || 18;
    var performanceIconUp = parameters['Performance Icon Up'] || '▲';
    var performanceIconDown = parameters['Performance Icon Down'] || '▼';
    var performanceIconEqual = parameters['Performance Icon Equal'] || '＝';
    var performanceIconEquipped = parameters['Performance Icon Equipped'] || 'E';
    var pageIconOffsetY = Number(parameters['Page Icon Offset Y']) || -16;
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    Game_Actor.prototype.pictureName = function() {
        if (Imported['ActorFaceR'] && this.baseStandPictureName()) return '';
        if (this._pictureName === undefined){
            this._pictureName = '';
            if (this.actor().meta['StatusPicture']){ this._pictureName = this.actor().meta['StatusPicture'] }
            if (this.actor().meta['ステータスピクチャ']){ this._pictureName = this.actor().meta['ステータスピクチャ'] }
        }
        return this._pictureName;
    };

    Game_Actor.prototype.calcEquipItemPerformanceCopy = function(item) {
        return item.params.reduce(function(a, b) {
            return a + b;
        });
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    Window_Base.prototype.drawStandup = function(name,x,y,opacity,anchorX,anchorY) {
        var bitmap = ImageManager.loadPicture(name);
        var opacity = opacity === undefined ? 255 : opacity;
        var anchorX = anchorX === undefined ? 0.5 : anchorX;
        var anchorY = anchorY === undefined ? 1.0 : anchorY;
        
        var sx = x - (bitmap.width * anchorX);
        var sy = y - (bitmap.height * anchorY);
        
        this.contents.paintOpacity = opacity;
        
        this.contents.blt(bitmap,0,0,bitmap.width,bitmap.height,sx,sy);
        
        this.contents.paintOpacity = 255;
        
        bitmap = null;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    var _WEquipStatus_initialize = Window_EquipStatus.prototype.initialize;
    Window_EquipStatus.prototype.initialize = function(x, y) {
        _WEquipStatus_initialize.call(this,x,y);
        this._pageIndex = 0;
    };
    
    Window_EquipStatus.prototype.standardPadding = function() {
        return 6;
    };
    
    Window_EquipStatus.prototype.windowHeight = function() {
        return Graphics.height - 108;
    };
    
    Window_EquipStatus.prototype.exParams = function(index) {
        var ary = xparamNames;
        return ary[index];
    };
    
    Window_EquipStatus.prototype.spParams = function(index) {
        var ary = sparamNames;
        return ary[index];
    };
    
    Window_EquipStatus.prototype.drawHorzLine = function(y) {
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, y, this.contentsWidth(), 2, this.lineColor());
        this.contents.paintOpacity = 255;
    };

    Window_EquipStatus.prototype.lineColor = function() {
        return this.normalColor();
    };
    
    Window_EquipStatus.prototype.fontSize = function() {
        return fontSize;
    };
    
    Window_EquipStatus.prototype.refresh = function() {
        this._callRefresh = true;
        this.execRefresh();
    };

    Window_EquipStatus.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.execRefresh();
        this.updatePage();
    };

    Window_EquipStatus.prototype.execRefresh = function() {
        if (this._callRefresh){
            if (this.checkBlt()){
                this.refreshContents();
                this._callRefresh = false;
                if (!this._initStandPicture){
                    this.loadStandPictures();
                    this._initStandPicture = true;
                }
            }
        }
    };
    
    Window_EquipStatus.prototype.paramAry = function() {
        return ['hp','mp','atk','def','mat','mdf','agi','luk',
                'hit','eva','cri','cev','mev','mrf','cnt','hrg','mrg','trg',
                'tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];
    };
    
    Window_EquipStatus.prototype.refreshContents = function() {
        this.contents.clear();
        this.resetFontSettings();
        if (Imported['ActorFaceR']) this.clearSprites();
        
        var xx = 6;
        var yy = topSpace;
        var size = this.fontSize();
        var paramAry = this.paramAry();
        
        if (!this._actor){ return }
        if (this._actor.pictureName()){
            this.drawStandup(this._actor.pictureName(),this.width/2,this.height,standOpacity);
        } else if (Imported['ActorFaceR'] && this._actor.baseStandPictureName()) {
            var actor = this._tempActor ? this._tempActor : this._actor;
            var x = -16;
            var y = -this.standardPadding() - 1;
            var width = this.contentsWidth() + 4;
            var height = this.contentsHeight();
            this.clearSprites();
            this.contents.paintOpacity = standOpacity;
            this.drawActorStSprite(actor, x, y, width, height, true);
            this.contents.paintOpacity = 255;
        }

        var lineHeight = this.lineHeight();
        var max = basicParams.length;
        
        if (this.maxPage() > 1) this.drawPageIcon(lineHeight * max + pageIconOffsetY);

        for (var i=0;i<max;i++) {
            var bs = basicParams[i];
            switch (bs) {
                case 'name': this.drawActorName(this._actor, this.textPadding(), yy); break;
                case 'level': this.drawActorLevel(this._actor, this.textPadding(), yy); break;
                case 'class': this.drawActorClass(this._actor, this.textPadding(), yy); break;
                case 'states': this.drawActorIcons(this._actor, this.textPadding(), yy); break;
                case 'nickname': this.drawActorNickname(this._actor, this.textPadding(), yy); break;
                case 's': break;
                case 'l': this.drawHorzLine(yy+this.fontSize()/2 + 2); break;
                default:
                    if (bs.match(/meta\[(.+)\]/i)) {
                        this.drawTextEx(this._actor.actor().meta[RegExp.$1], this.textPadding(), yy); break;
                    } else {
                        this.drawTextEx(bs, this.textPadding(), yy); break;
                    }
            }
            yy += lineHeight;
        }

        var defaultSize = this.contents.fontSize;
        this.contents.fontSize = size;
        
        //yy = yy + 8;
        size = size + lineSpacing;
        if (this._tempActor){
            this.drawChangeStatus(xx, yy, size);
        } else {
            var rowMax = this.getRowMax();
            var page = this.getPage();
            for (var i=0;i<rowMax;i++){
                this.contents.fontSize = this.fontSize();
                if (page[i] === 'l'){
                    this.drawHorzLine(size * i + yy + 2 + (this.fontSize() / 2));
                } else if (page[i] === 's'){
                } else {
                    var n = paramAry.indexOf(page[i]);
                    if (n === -1){
                        if (page[i].match(/e(\d+)/)){
                            n = Number(RegExp.$1) + 28;
                        } else if (page[i].match(/s(\d+)/)){
                            n = Number(RegExp.$1) + 28 + $dataSystem.elements.length;
                        } else if (page[i].match(/d(\d+)/)){
                            n = Number(RegExp.$1) + 28 + $dataSystem.elements.length + $dataStates.length;
                        }
                    }
                    if (n >= 0){
                        this.drawItem( n, xx, size *  i + yy)
                    } else if (page[i].match(/ex<(\d+)[:：](.+)?[:：](.+)>/i)) {
                        this.drawExParams(RegExp.$2, RegExp.$3, Number(RegExp.$1),xx, size * i + yy);
                    } else {
                        this.drawTextEx(page[i], xx, size * i + yy);
                    }
                }
            }
        }
        if (this._tempActor && equipStatusHelpText2) {
            this.changeTextColor(this.textColor(6));
            this.contents.fontSize = 18;
            this.drawText(equipStatusHelpText2,16,this.contentsHeight()-28,this.contentsWidth()-24);
        } else if (equipStatusHelpText) {
            this.changeTextColor(this.textColor(6));
            this.contents.fontSize = 18;
            this.drawText(equipStatusHelpText,16,this.contentsHeight()-28,this.contentsWidth()-24);
        }
        this.contents.fontSize = defaultSize;
    };

    Window_EquipStatus.prototype.drawExParams = function(text, value, color, x, y) {
        var a = this._actor;
        var v = $gameVariables._data;
        var s = $gameSwitches._data;
        this.changeTextColor(this.textColor(color));
        this.drawText(text, x + 4, y, 288);
        this.changeTextColor(this.normalColor());
        this.drawText(eval(value), x + 144, y, 64, 'right');
    };

    Window_EquipStatus.prototype.getRowMax = function() {
        switch(this._pageIndex){
        case 0: return page1.length;
        case 1: return page2.length;
        case 2: return page3.length;
        case 3: return page4.length;
        case 4: return page5.length;
        case 5: return page6.length;
        }
        return 18;
    };
    
    Window_EquipStatus.prototype.getPage = function() {
        switch(this._pageIndex){
        case 0: return page1;
        case 1: return page2;
        case 2: return page3;
        case 3: return page4;
        case 4: return page5;
        case 5: return page6;
        }
        return 0;
    };
    
    Window_EquipStatus.prototype.maxPageLine = function() {
        return maxPageLine;
    };
    
    Window_EquipStatus.prototype.countDrawStatus = function(){
        var l = 0;

        var item = null;
        if (SceneManager._scene._itemWindow) item = SceneManager._scene._itemWindow.item();
        if (SceneManager._scene._buyWindow) item = SceneManager._scene._buyWindow.item();
        if (item && this._actor.canEquip(item) && !this._actor.equips().contains(item)) {
            var texts = item.note.split('\n');
            for (var i=0,max=texts.length;i<max;i++) {
                var text = texts[i];
                if (text.match(/<(?:装備制限表示|DisplayEquippedLimit|追加表示|DisplayExtend)[:：](.+)?,(.+)>/)) l++;
            }
        }

        for (var i=0;i<8;i++){
            if (this._actor.param(i) !== this._tempActor.param(i)){ l++ }
        }
        for (var i=0;i<10;i++){
            if (this._actor.xparam(i) !== this._tempActor.xparam(i)){ l++ }
        }
        for (var i=0;i<10;i++){
            if (this._actor.sparam(i) !== this._tempActor.sparam(i)){ l++ }
        }
        var elements = $dataSystem.elements;
        var lEle = elements.length;
        for (var i=0;i<lEle;i++){
            if (this._actor.elementRate(i) !== this._tempActor.elementRate(i)){ l++ }
        }
        var states = $dataStates;
        var lSt = states.length;
        for (var i=0;i<lSt;i++){
            if (!states[i]){ continue }
            var sta = states[i].id;
            if (this._actor.stateRate(sta) !== this._tempActor.stateRate(sta)){ l++ }
        }
        return l;
    };
    
    Window_EquipStatus.prototype.drawPageIcon = function(y) {
        for (var i=0;i<this.maxPage();i++){
            var color = this._pageIndex === i ? pageIconColor : 'rgba(0,0,0,0.5)';
            this.contents.fillRect((this.contentsWidth() - 12) - (14 * this.maxPage()) + i*14,y,12,12,color);
        }
    };
    
    Window_EquipStatus.prototype.drawChangeStatus = function(x,y,size) {
        var l = this._pageIndex * this.maxPageLine() * -1;

        var item = null;
        var a = this._tempActor;
        var v = $gameVariables._data;
        var s = $gameSwitches._data;
        if (SceneManager._scene._itemWindow) item = SceneManager._scene._itemWindow.item();
        if (SceneManager._scene._buyWindow) item = SceneManager._scene._buyWindow.item();
        if (item && this._actor.canEquip(item) && !this._actor.equips().contains(item)) {
            var texts = item.note.split('\n');
            for (var i=0,max=texts.length;i<max;i++) {
                var text = texts[i];
                if (text.match(/<(?:装備制限表示|DisplayEquippedLimit|追加表示|DisplayExtend)[:：](.+)?,(.+)?,(.+)>/)) {
                    if (l >= 0) {
                        var text1 = RegExp.$1;
                        var text2 = RegExp.$2;
                        var text3 = RegExp.$3;
                        var value = eval(text3);
                        var w = value === null ? 0 : this.textWidth('('+value+')');
                        this.changeTextColor(this.textColor(equippedLimitColor));
                        this.drawText(text1, x + 4, y + size * l, 288);
                        this.changeTextColor(this.normalColor());
                        this.drawText(text2, x, y + size * l, 288-w, 'right');
                        if (value !== null) {
                            this.changeTextColor(value >= Number(text2) ? this.powerUpColor() : this.powerDownColor());
                            this.drawText('(' + value + ')', x, y + size * l, 288, 'right');
                        }
                    }
                    l++;
                }
                if (l >= this.maxPageLine()) return;
            }
        }

        for (var i=0;i<8;i++){
            if (this._actor.param(i) !== this._tempActor.param(i) && this.includeEnableParams(i)){
                if (l >= 0){ this.drawLineStatus(i,x,y + size * l) }
                l++;
            }
            if (l >= this.maxPageLine()){ return }
        }
        for (var i=0;i<10;i++){
            if (this._actor.xparam(i) !== this._tempActor.xparam(i) && this.includeEnableParams(i+8)){
                if (l >= 0){ this.drawLineStatus(i+8,x,y + size * l) }
                l++;                
            }
            if (l >= this.maxPageLine()){ return }
        }
        for (var i=0;i<10;i++){
            if (this._actor.sparam(i) !== this._tempActor.sparam(i) && this.includeEnableParams(i+18)){
                if (l >= 0){ this.drawLineStatus(i+18,x,y + size * l) }
                l++;                
            }
            if (l >= this.maxPageLine()){ return }
        }
        var elements = $dataSystem.elements;
        var lEle = elements.length;
        for (var i=0;i<lEle;i++){
            if (this._actor.elementRate(i) !== this._tempActor.elementRate(i) && this.includeEnableParams(i+28)){
                if (l >= 0){ this.drawLineStatus(i+28,x,y + size * l) }
                l++;
            }
            if (l >= this.maxPageLine()){ return }
        }
        var states = $dataStates;
        var lSt = states.length;
        for (var i=0;i<lSt;i++){
            if (!states[i]){ continue }
            var sta = states[i].id;
            if (this._actor.stateRate(sta) !== this._tempActor.stateRate(sta) && this.includeEnableParams(sta+28+lEle)){
                if (l >= 0){ this.drawLineStatus(sta+28+lEle,x,y + size * l) }
                l++;
            }
            if (l >= this.maxPageLine()){ return }
        }
        for (var i=0;i<8;i++){
            if (this._actor.debuffRate(i) !== this._tempActor.debuffRate(i) && this.includeEnableParams(i+28+lEle+lSt)){
                if (l >= 0){ this.drawLineStatus(i+28+lEle+lSt,x,y + size * l) }
                l++;
            }
        }
        if (Imported['StatusUpReward']) {
            if (SceneManager._scene._slotWindow) {
                var wTv = $dataSystem.weaponTypes.length;
                var slotIndex = SceneManager._scene._slotWindow.index();
                for (var i = 0; i < wTv; i++) {
                    var tempWeapon = this._tempActor._equips[slotIndex].object();
                    var weapon = this._actor._equips[slotIndex].object();
                    var wt1 = DataManager.itemExWeaponType(weapon);
                    if (wt1 === i) {
                        var wt2 = DataManager.itemExWeaponType(tempWeapon);
                        if (wt1 !== wt2) {
                            if (l >= 0) this.drawWLStatus(i, x, y + size * l);
                            l++;
                        }
                    }
                }
            }
        }
    };
    
    Window_EquipStatus.prototype.includeEnableParams = function(paramId) {
        var ary = page1.concat(page2).concat(page3).concat(page4).concat(page5).concat(page6);
        if (paramId < 28){
            return ary.contains(this.paramAry()[paramId]);
        } else if (paramId < 28 + $dataSystem.elements.length){
            var n = paramId - 28;
            return ary.contains('e'+ n);
        } else if (paramId < 28 + $dataSystem.elements.length + $dataStates.length){
            var n = paramId - (28 + $dataSystem.elements.length);
            return ary.contains('s'+ n);
        } else {
            var n = paramId - (28 + $dataSystem.elements.length + $dataStates.length);
            return ary.contains('d'+ n);
        }
    };
    
    Window_EquipStatus.prototype.drawLineStatus = function(index, x, y, eraseArrow) {
        var x1 = 4;
        var x2 = 144;
        var x3 = 204;
        var x4 = 224;
        
        this.drawParamName(index, x + x1, y);
        if (this._actor){ this.drawParams(0, index, x + x2, y) }
        if (!eraseArrow){ this.drawRightArrow(x + x3, y) }
        if (this._tempActor){ this.drawParams(1, index, x + x4, y) }
    };
    
    Window_EquipStatus.prototype.drawItem = function(paramId, x, y){
        this.drawLineStatus(paramId, x, y, true);
    };
    
    Window_EquipStatus.prototype.drawParamName = function(paramId, x, y){
        var lEle = $dataSystem.elements.length;
        var lSta = $dataStates.length;
        this.changeTextColor(this.systemColor());
        if (paramId < 8){
            this.drawText(TextManager.param(paramId), x, y, 128);
        } else if (paramId < 18) {
            this.drawText(this.exParams(paramId-8), x, y, 128);
        } else if (paramId < 28) {
            this.drawText(this.spParams(paramId-18), x, y, 128);
        } else if (paramId < 28 + lEle){
            var text = $dataSystem.elements[paramId-28] + effectName;
            this.drawText(text, x, y, 128);
        } else if (paramId < 28 + lEle + lSta) {
            if (!!$dataStates[paramId-(28+lEle)]){
                var text = $dataStates[paramId-(28+lEle)].name + effectName;
                this.drawText(text, x, y, 128);
            }
        } else {
            var id = paramId - (28+lEle+lSta);
            var text = TextManager.param(id) + downName;
            this.drawText(text, x, y, 128); 
        }
    };

    Window_EquipStatus.prototype.drawWLStatus = function(index, x, y) {
        var x1 = 4;
        var x2 = 128;
        var x3 = 158;

        if (this._actor) this.drawWLParameter(0, index, x + x1, y);
        this.drawRightArrow(x + x2, y);
        if (this._tempActor) this.drawWLParameter(1, index, x + x3, y);
    };

    Window_EquipStatus.prototype.drawWLParameter = function(trg, paramId, x, y) {
        var ww = 132;
        var noWeaponTypeName = PluginManager.parameters('StatusUpReward')['NoWeaponTypeName'];
        var levelNameCompact = PluginManager.parameters('StatusUpReward')['LevelNameCompact'];
        this.changeTextColor(this.normalColor());
        var slotIndex = SceneManager._scene._slotWindow.index();
        var actor = trg === 0 ? this._actor : this._tempActor;
        var id = DataManager.itemExWeaponType(actor._equips[slotIndex].object());
        var name = id ? $dataSystem.weaponTypes[id] : noWeaponTypeName;
        if (id === 0 && actor.weapons().length > 0) {
            this.drawText('------', x, y, ww,'center');
        } else {
            this.drawText(name, x, y, ww - 48);
            this.drawText(levelNameCompact + actor.weaponLevel(id), x, y, ww, 'right');
        }
    };
    
    Window_EquipStatus.prototype.drawParams = function(trg, paramId, x, y) {
        var ww = 64;
        var lEle = $dataSystem.elements.length;
        var lSta = $dataStates.length;
        var actor = trg === 0 ? this._actor : this._tempActor;
        
        if (trg === 0){
            this.changeTextColor(this.normalColor());
        } else {
            this.changeColorParam(paramId);
        }
        if (paramId < 8){ 
            this.drawText(Math.floor(actor.param(paramId)), x, y, ww, 'right');
        } else if (paramId < 18) {
            this.drawText(Math.floor(actor.xparam(paramId-8) * 100) + '%', x, y, ww, 'right');
        } else if (paramId < 28) {
            this.drawText(Math.floor(actor.sparam(paramId-18) * 100) + '%', x, y, ww, 'right');
        } else if (paramId < 28 + lEle){
            this.drawText(Math.floor(actor.elementRate(paramId-28) * 100) + '%', x, y, ww, 'right');
        } else if (paramId < 28 + lEle + lSta){
            this.drawText(Math.floor(actor.stateRate(paramId-(28+lEle)) * 100) + '%', x, y, ww, 'right');
        } else {
            this.drawText(Math.floor(actor.debuffRate(paramId-(28+lEle+lSta)) * 100) + '%', x, y, ww, 'right');
        }
    };

    Window_EquipStatus.prototype.changeColorParam = function(paramId) {
        var lEle = $dataSystem.elements.length;
        var lSta = $dataStates.length;
        var value1 = 0;
        var value2 = 0;
        
        if (paramId < 8){
            value1 = this._actor.param(paramId);
            value2 = this._tempActor.param(paramId);
        } else if (paramId < 18) {
            value1 = this._actor.xparam(paramId-8);
            value2 = this._tempActor.xparam(paramId-8);
        } else if (paramId < 28) {
            value1 = this._actor.sparam(paramId-18);
            value2 = this._tempActor.sparam(paramId-18);
        } else if (paramId < 28 + lEle){
            value2 = this._actor.elementRate(paramId-28);
            value1 = this._tempActor.elementRate(paramId-28);
        } else if (paramId < 28 + lEle + lSta){
            value2 = this._actor.stateRate(paramId-(28+lEle));
            value1 = this._tempActor.stateRate(paramId-(28+lEle));
        } else {
            value2 = this._actor.debuffRate(paramId-(28+lEle+lSta));
            value1 = this._tempActor.debuffRate(paramId-(28+lEle+lSta));
        }
        var change = value2 - value1;
        if ([22,24,25,26].contains(paramId)){ change *= -1 }
        this.changeTextColor(this.paramchangeTextColor(change));
    };
    
    Window_EquipStatus.prototype.loadImage = function() {
        if (!this._actor){ return true }
        if (!this._actor.pictureName()){ return true }
        var bitmap1 = ImageManager.loadPicture(this._actor.pictureName());
        var bitmap2 = new Bitmap(1,1);
        bitmap2.blt(bitmap1,0,0,bitmap1.width,bitmap1.height,0,0);
        var result = ImageManager.isReady();
        bitmap1 = null;
        bitmap2 = null;
        return result;
    };
    
    Window_EquipStatus.prototype.loadStandPictures = function(){
        $gameParty.members().forEach(function(actor) {
            if (actor && actor.pictureName()){
                ImageManager.loadPicture(actor.pictureName());
            }
        });
    };
    
    Window_EquipStatus.prototype.checkBlt = function(){
        return this.loadImage();
    };
    
    Window_EquipStatus.prototype.maxPage = function() {
        if (this._tempActor){
            return Math.ceil(this.countDrawStatus() / this.maxPageLine());
        } else {
            if (!this._maxPage){ 
                this._maxPage = [page1,page2,page3,page4,page5,page6].reduce(function(c,a){
                    if (a[0]){ c += 1 }
                    return c;
                },0);
            }
            return this._maxPage;
        }
    };
    
    Window_EquipStatus.prototype.nextPage = function() {
        if (this.maxPage() > 1){
            SoundManager.playCursor();
            this._pageIndex = (this._pageIndex + 1) % this.maxPage();
            this.refresh();
        }
    };
    
    Window_EquipStatus.prototype.prevPage = function() {
        if (this.maxPage() > 1){
            SoundManager.playCursor();
            this._pageIndex = (this._pageIndex + (this.maxPage() - 1)) % this.maxPage();
            this.refresh();
        }
    };
    
    Window_EquipStatus.prototype.updatePage = function() {
        if (this.isPageChangeEnabled() && this.isPageChangeRequested()) {
            this.changePage();
        }
    };
    
    Window_EquipStatus.prototype.isPageChangeRequested = function() {
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            return true;
        }
        return false;
    };

    Window_EquipStatus.prototype.isTouchedInsideFrame = function() {
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };
    
    Window_EquipStatus.prototype.changePage = function() {
        if ($gameParty.size() >= 2){
            SceneManager._scene.nextActor();
            SoundManager.playCursor();
        }
    };
    
    Window_EquipStatus.prototype.isPageChangeEnabled = function() {
        return this.visible;
    };

    ////////////////////////////////////////////////////////////////////////////////////
    
    Window_EquipCommand.prototype.onTouch = function(triggered) {
        var lastIndex = this.index();
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                if (triggered && this.isTouchOkEnabled()) {
                    this.processOk();
                }
            } else if (this.isCursorMovable()) {
                    this.select(hitIndex);
            }
        } else if (this._stayCount >= 10) {
            if (x < this.padding) {
                this.processPagedown();
                this._stayCount = 0;
            } else if (x >= this.width - this.padding) {
                this.processPageup();
                this._stayCount = 0;
            }
        }
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    };

    // 再定義
    Window_EquipStatus.prototype.setTempActor = function(tempActor) {
    //    if (this._tempActor !== tempActor) {
            this._tempActor = tempActor;
            this.refresh();
    //    }
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    Window_EquipItem.prototype.maxCols = function() {
        return 1;
    };
    
    Window_EquipItem.prototype.cursorRight = function(wrap) {
        this.callHandler('right');
    };

    Window_EquipItem.prototype.cursorLeft = function(wrap) {
        this.callHandler('left');
    };
    
    Window_EquipItem.prototype.onTouch = function(triggered) {
        var lastIndex = this.index();
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                if (triggered && this.isTouchOkEnabled()) {
                    this.processOk();
                }
            } else if (this.isCursorMovable()) {
                    this.select(hitIndex);
            }
        } else if (this._stayCount >= 10) {
            if (y < this.padding) {
                this.cursorUp();
            } else if (y >= this.height - this.padding) {
                this.cursorDown();
            } else if (x < this.padding) {
                this.cursorLeft();
                this._stayCount = 0;
            } else if (x >= this.width - this.padding) {
                this.cursorRight();
                this._stayCount = 0;
            }
        }
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    };

    // 再定義
    Window_EquipItem.prototype.updateHelp = function() {
        Window_ItemList.prototype.updateHelp.call(this);
        if (this._actor && this._statusWindow) {
            if (!this._tempActor) this._tempActor = JsonEx.makeDeepCopy(this._actor);
            var actor = this._tempActor;
            actor.forceChangeEquip(this._slotId, this.item());
            console.log(actor.equips())
            this._statusWindow.setTempActor(actor);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
    
    var _WEquipSlot_processHandling = Window_EquipSlot.prototype.processHandling;
    Window_EquipSlot.prototype.processHandling = function() {
        if (this.isOpenAndActive() && Input.isTriggered('shift')){
            this.processRelease();
        } else {
            _WEquipSlot_processHandling.call(this);
        }
    };
    
    Window_EquipSlot.prototype.processRelease = function() {
        if (Imported['LimitPossession']) {
            if ($gameParty.allItemsWeight() + DataManager.itemWeight(this.item()) > $gameParty.maxWeight()) {
                SoundManager.playBuzzer();
                return;
            }
        }
        if (this.isCurrentItemEnabled()) {
            this.callHandler('release');
        } else {
            SoundManager.playBuzzer();
        }
    };

    Window_EquipSlot.prototype.cursorRight = function(wrap) {
        this.callHandler('right');
    };

    Window_EquipSlot.prototype.cursorLeft = function(wrap) {
        this.callHandler('left');
    };
    
    Window_EquipSlot.prototype.onTouch = function(triggered) {
        var lastIndex = this.index();
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                if (triggered && this.isTouchOkEnabled()) {
                    this.processOk();
                }
            } else if (this.isCursorMovable()) {
                    this.select(hitIndex);
            }
        } else if (this._stayCount >= 10) {
            if (y < this.padding) {
                this.cursorUp();
            } else if (y >= this.height - this.padding) {
                this.cursorDown();
            } else if (x < this.padding) {
                this.cursorLeft();
                this._stayCount = 0;
            } else if (x >= this.width - this.padding) {
                this.cursorRight();
                this._stayCount = 0;
            }
        }
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    Scene_Equip.prototype.createStatusWindow = function() {
        this._statusWindow = new Window_EquipStatus(0, this._helpWindow.height);
        this._statusWindow._pageIndex = 0;
        this.addWindow(this._statusWindow);
    };

    var __SEquip_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function() {
        __SEquip_create.call(this);
        if (!useEquipCommand) {
            this._commandWindow.deactivate();
            this.commandEquip();
            this._slotWindow.callUpdateHelp();
        }
    };

    Scene_Equip.prototype.createCommandWindow = function() {
        var wx = this._statusWindow.width;
        var wy = this._helpWindow.height;
        var ww = Graphics.boxWidth - this._statusWindow.width;
        this._commandWindow = new Window_EquipCommand(wx, wy, ww);
        this._commandWindow.setHelpWindow(this._helpWindow);
        this._commandWindow.setHandler('equip',    this.commandEquip.bind(this));
        this._commandWindow.setHandler('optimize', this.commandOptimize.bind(this));
        this._commandWindow.setHandler('clear',    this.commandClear.bind(this));
        this._commandWindow.setHandler('cancel',   this.popScene.bind(this));
        this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._commandWindow.setHandler('pageup',   this.previousActor.bind(this));
        this.addWindow(this._commandWindow);
        if (!useEquipCommand) this._commandWindow.hide();
    };

    Scene_Equip.prototype.createSlotWindow = function() {
        var wx = this._statusWindow.width;
        var wy = this._commandWindow.y + this._commandWindow.height;
        if (!useEquipCommand) wy = this._commandWindow.y;
        var ww = Graphics.boxWidth - this._statusWindow.width;
        var wh = slotHeight;
        this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
        this._slotWindow.setHelpWindow(this._helpWindow);
        this._slotWindow.setStatusWindow(this._statusWindow);
        this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
        if (useEquipCommand){
            this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
        } else {
            this._slotWindow.setHandler('cancel',   this.popScene.bind(this));
        }
        this._slotWindow.setHandler('release',  this.onSlotRelease.bind(this));
        this._slotWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._slotWindow.setHandler('pageup',   this.previousActor.bind(this));
        this._slotWindow.setHandler('right',    this.nextPage.bind(this));
        this._slotWindow.setHandler('left',     this.prevPage.bind(this));
        this.addWindow(this._slotWindow);
    };

    Scene_Equip.prototype.createItemWindow = function() {
        var wx = this._slotWindow.x;
        var wy = this._slotWindow.y + this._slotWindow.height;
        var ww = this._slotWindow.width;
        var wh = Graphics.boxHeight - wy;
        this._itemWindow = new Window_EquipItem(wx, wy, ww, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setStatusWindow(this._statusWindow);
        this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this._itemWindow.setHandler('right',  this.nextPage.bind(this));
        this._itemWindow.setHandler('left',   this.prevPage.bind(this));
        this._slotWindow.setItemWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
    };
    
    Scene_Equip.prototype.onSlotRelease = function() {
        SoundManager.playEquip();
        this.actor().changeEquip(this._slotWindow.index(), null);
        this._slotWindow.activate();
        this._slotWindow.refresh();
        this._itemWindow.deselect();
        this._itemWindow.refresh();
        this._statusWindow.refresh();
    };
    
    var _SEquip_nextActor = Scene_Equip.prototype.nextActor;
    Scene_Equip.prototype.nextActor = function() {
        _SEquip_nextActor.call(this);
        this._statusWindow._pageIndex = 0;
        this._itemWindow.deactivate();
        this._itemWindow.deselect();
        if (useEquipCommand) {
            this._slotWindow.deselect();
            this._slotWindow.deactivate();
        } else {
            this.commandEquip();
            this._commandWindow.deactivate();
        }
    };

    var _SEquip_previousActor = Scene_Equip.prototype.previousActor;
    Scene_Equip.prototype.previousActor = function() {
        _SEquip_previousActor.call(this);
        this._statusWindow._pageIndex = 0;
        this._itemWindow.deactivate();
        this._itemWindow.deselect();
        if (useEquipCommand) {
            this._slotWindow.deselect();
            this._slotWindow.deactivate();
        } else {
            this.commandEquip();
            this._commandWindow.deactivate();
        }
    };

    var _SEquip_onSlotOk = Scene_Equip.prototype.onSlotOk;
    Scene_Equip.prototype.onSlotOk = function() {
        this.smallSlotWindow();
        _SEquip_onSlotOk.call(this);
        this._statusWindow._pageIndex = 0;
        this._itemWindow._tempActor = null;
        this._itemWindow.updateHelp();
        this._statusWindow.refresh();
        this._itemWindow.refresh();
    };

    Scene_Equip.prototype.smallSlotWindow = function() {
        if (!useSlotCompact) return;
        this._slotWindow.height = this._slotWindow.lineHeight() + this._slotWindow.standardPadding() * 2;
        var wy = this._slotWindow.y + this._slotWindow.height;
        var wh = Graphics.boxHeight - wy;
        if (this._guideWindow) wh -= 36;
        this._itemWindow.y = wy;
        this._itemWindow.height = wh;
        this._sScrollY = this._slotWindow._scrollY;
        this._slotWindow.setTopRow(this._slotWindow.index());
        //this._slotWindow.refresh();
        this._itemWindow.refresh();
    };

    Scene_Equip.prototype.bigSlotWindow = function() {
        if (!useSlotCompact) return;
        this._slotWindow.height = slotHeight;
        var wy = this._slotWindow.y + this._slotWindow.height;
        var wh = Graphics.boxHeight - wy;
        if (this._guideWindow) wh -= 36;
        this._itemWindow.y = wy;
        this._itemWindow.height = wh;
        this._slotWindow.setTopRow(this._sScrollY ? this._sScrollY : 0);
        //this._slotWindow.refresh();
        this._itemWindow.refresh();
    };

    var __SEquip_onItemOk = Scene_Equip.prototype.onItemOk;
    Scene_Equip.prototype.onItemOk = function() {
        this.bigSlotWindow();
        __SEquip_onItemOk.call(this);
    };

    var __SEquip_onItemCancel = Scene_Equip.prototype.onItemCancel;
    Scene_Equip.prototype.onItemCancel = function() {
        this.bigSlotWindow();
        __SEquip_onItemCancel.call(this);
    };
    
    var _SEquip_onSlotCancel = Scene_Equip.prototype.onSlotCancel;
    Scene_Equip.prototype.onSlotCancel = function() {
        _SEquip_onSlotCancel.call(this);
        this._statusWindow._pageIndex = 0;
        this._statusWindow.refresh();
    };
    
    Scene_Equip.prototype.nextPage = function() {
        this._statusWindow.nextPage();
    };
    
    Scene_Equip.prototype.prevPage = function() {
        this._statusWindow.prevPage();
    };

    function Window_RefineShopStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_RefineShopStatus.prototype = Object.create(Window_EquipStatus.prototype);
    Window_RefineShopStatus.prototype.constructor = Window_RefineShopStatus;

    Window_RefineShopStatus.prototype.updateHelp = function() {
    };

    Window_RefineShopStatus.prototype.setItem = function(item) {
        this._item = item;
        if (this.isItemEquip()){
            var actor = JsonEx.makeDeepCopy(this.actor());
            if (actor.canEquip(this._item)){ actor.forceChangeEquip(item.etypeId-1, item) }
            this.setTempActor(actor);
        } else {
            this.setTempActor(null);
        }
        this.refresh();
    };

    Window_RefineShopStatus.prototype.maxPageLine = function() {
        var line = this.isItemEquip() ? maxShopEquipPageLine : maxShopItemPageLine;
        if (Imported['LimitPossession']) line -= 1;
        return line;
    };

    Window_RefineShopStatus.prototype.maxPage = function() {
        if (this._tempActor){
            return Math.ceil(this.countDrawStatus() / this.maxPageLine());
        } else {
            return Math.ceil(this.countDrawEffects() / this.maxPageLine());
        }
    };

    Window_RefineShopStatus.prototype.countDrawEffects = function(){
        var l=0;
        for(var i=0;i<shopInfo.length;i++){
            var info = shopInfo[i];
            switch(info) {
                case 'price':
                    var price = this._item.price;
                    if (this._item.meta['value']) price = this._item.meta['value'];
                    if (this._item.meta['価値']) price = this._item.meta['価値'];
                    if (price > 0) l++;
                    break;
                case 'consume':
                    l++;
                    break;
                case 'dmg':
                    if (this._item.damage.type > 0) l++;
                    break;
                case 'scope':
                    if (this._item.scope > 0 && this._item.occasion < 3) l++;
                    break;
                case 'occasion':
                    if (this._item.occasion < 3) l++;
                    break;
                case 'repeat':
                    if (this._item.repeats > 1) l++;
                    break;
                case 'tpgain':
                    if (this._item.tpGain !== 0) l++;
                    break;
                case 'effects':
                    var effects = this._item.effects;
                    for (var j = 0; j < effects.length; j++) {
                        if (effects[j].code === 11 || effects[j].code === 12) {
                            var type = effects[j].code === 11 ? 'hp' : 'mp';
                            if (this.checkCodeEnabled(effects[j].code)) {
                                if (effects[j].value1) l++;
                                if (effects[j].value2) l++;
                            }
                        } else {
                            if (this.checkCodeEnabled(effects[j].code)) l++;
                        }
                    }
                    break;
                default:
                    l++;
            }
        }
        return l;
    };

    Window_RefineShopStatus.prototype.isItemEquip = function() {
        return DataManager.isWeapon(this._item) || DataManager.isArmor(this._item);
    };

    Window_RefineShopStatus.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._item = null;
        this._tempActor = null;
        this._pageIndex = 0;
        this.refresh();
    };

    Window_RefineShopStatus.prototype.actor = function() {
        return $gameParty.menuActor();
    };

    Window_RefineShopStatus.prototype.refreshContents = function() {
        this.contents.clear();
        this.resetFontSettings();
        if (Imported['ActorFaceR']) this.clearSprites();

        //this._actor = this.actor();

        var lineHeight = this.lineHeight();
        var xx = 6;

        if (!this._actor){ return }
        if (this.isItemEquip()) {
            if (this._actor.pictureName()) {
                this.drawStandup(this._actor.pictureName(), this.width / 2, this.height, standOpacity);
            } else if (Imported['ActorFaceR'] && this._actor.baseStandPictureName()) {
                var actor = this._tempActor ? this._tempActor : this._actor;
                var x = -16;
                var y = -this.standardPadding() - 1;
                var width = this.contentsWidth() + 4;
                var height = this.contentsHeight();
                this.contents.paintOpacity = standOpacity;
                this.drawActorStSprite(actor, x, y, width, height,true);
                this.contents.paintOpacity = 255;
            }
        }

        var yy = 12;

        this.drawPossession(xx, yy);
        yy+=lineHeight-4;
        if (Imported['LimitPossession']) {
            this.drawWeight(xx, yy);
            yy+=lineHeight-4;
        }

        this.drawHorzLine(yy + 2);

        var bw = SceneManager._scene._buyWindow;
        var f = bw && bw.visible;

        if (this.isItemEquip()){
            this.drawEquipStatus(xx,yy);
            if (equipHelpText && f){
                this.changeTextColor(this.textColor(6));
                this.contents.fontSize = 18;
                this.drawText(equipHelpText,16,this.contentsHeight()-28,this.contentsWidth()-24);
            }
        } else {
            yy += 16;
            this.drawItemStatus(xx,yy+8);
            if (itemHelpText && f){
                this.changeTextColor(this.textColor(6));
                this.contents.fontSize = 18;
                this.drawText(itemHelpText,16,this.contentsHeight()-28,this.contentsWidth()-24);
            }
        }
    };

    Window_RefineShopStatus.prototype.drawEquipStatus = function(xx,yy) {

        var lineHeight = this.lineHeight();
        var size = this.fontSize();
        var paramAry = this.paramAry();
        this._actorPosArray = [];
        if (!!equipInfo[0]){
            this.contents.fontSize = size;
            var l = this.drawEquipItemStatus(xx+6,yy);
            this.resetFontSettings();

            yy += l * (size+2) + 12;

            this.drawHorzLine(yy);
        }

        yy += 4;

        this.drawPartyMembers(yy);

        yy += 44;//(44 * Math.ceil($gameParty.size() / 8));

        this.drawHorzLine(yy + 8);

        yy += 10;

        this.drawActorName(this._actor,6,yy);

        if (this.maxPage() > 1){ this.drawPageIcon(yy+4) }

        var defaultSize = this.contents.fontSize;
        this.contents.fontSize = size;

        //yy = yy + 8;
        size = size + lineSpacing;
        if (this._tempActor){
            this.drawChangeStatus(xx,size * 1 + yy, size);
        }
        this.contents.fontSize = defaultSize;
    };

    Window_RefineShopStatus.prototype.drawEquipItemStatus = function(x, y) {
        var size = this.fontSize()+2;
        var l = 0;

        for (var i=0;i<equipInfo.length;i++){
            this.resetFontSettings();
            this.contents.fontSize = this.fontSize();
            switch(equipInfo[i]){
            case 'price':
                var price = this._item.price;
                if (this._item.meta['value']){ price = this._item.meta['value'] }
                if (this._item.meta['価値']){ price = this._item.meta['価値'] }
                if (price > 0){
                    this.drawPrice(price, x, y+size*l+4);
                } else {
                    l--;
                }
                break;
            case 'etype':
                this.drawEquipType(this._item.etypeId,x,y+size*l+4);
                break;
            case 'type':
                this.drawWAType(this._item,x,y+size*l+4);
                break;
            case 's':break;
            case 'l':
                if (l>0){ this.drawHorzLine(size*l+yy+8+(size/2)) }
                break;
            default:
                if (equipInfo[i].match(/meta\[(.+)\]/)){
                    var text = RegExp.$1;
                    if (this._item.meta[text]){
                        this.drawMetaTag(text, x, y+size*l+4);
                    } else {
                        l--;
                    }
                } else {
                    this.drawTextEx(equipInfo[i], x, y+size*l+4);
                }
            }
            l++;
        }
        return l;
    };

    Window_RefineShopStatus.prototype.drawItemStatus = function(xx, yy) {
        if (!this._item){ return }

        var effects = this._item.effects;
        var lineHeight = this.lineHeight();
        var size = this.fontSize();
        var pageLine = this.maxPageLine() * this._pageIndex;
        this.contents.fontSize = size;
        size += 2;

        //this.drawItemName(this._item,xx,yy);

        if (this.maxPage() > 1) {
            var py = yy - 48;
            if (Imported['LimitPossession']) py += 32;
            this.drawPageIcon(py);
        }

        //this.drawHorzLine(yy + size + 10);

        var l=0;
        l -= pageLine;
        yy -= 8;
        var xxx = xx;
        for (var i=0;i<shopInfo.length;i++) {
            this.resetFontSettings();
            this.contents.fontSize = this.fontSize();
            switch (shopInfo[i]) {
                case 'type':
                    if (l >= 0) this.drawItemType(this._item.itypeId, xxx, yy + size * l + 4);
                    break;
                case 'price':
                    var price = this._item.price;
                    if (this._item.meta['value']) price = Number(this._item.meta['value']);
                    if (this._item.meta['価値']) price = Number(this._item.meta['価値']);
                    if (price > 0) {
                        if (l >= 0) this.drawPrice(price, xxx, yy + size * l + 4);
                    } else {
                        l--;
                    }
                    break;
                case 'consume':
                    if (l >= 0) this.drawConsume(this._item.consumable, xxx, yy + size * l + 4);
                    break;
                case 'dmg':
                    if (this._item.damage.type > 0) {
                        if (l >= 0) this.drawDamageType(this._item.damage.type, xxx, yy + size * l + 4);
                    } else {
                        l--;
                    }
                    break;
                case 'scope':
                    if (this._item.scope > 0 && this._item.occasion < 3) {
                        if (l >= 0) this.drawScope(this._item.scope, xxx, yy + size * l + 4);
                    } else {
                        l--;
                    }
                    break;
                case 'occasion':
                    if (this._item.occasion < 3) {
                        if (l >= 0) this.drawOccasion(this._item.occasion, xxx, yy + size * l + 4);
                    } else {
                        l--;
                    }
                    break;
                case 'repeat':
                    if (this._item.repeats > 1) {
                        if (l >= 0) this.drawRepeat(this._item.repeats, xxx, yy + size * l + 4);
                    } else {
                        l--;
                    }
                    break;
                case 'tpGain':
                    if (this._item.tpGain !== 0) {
                        if (l >= 0) this.drawTpGain2(this._item.tpGain, xxx, yy + size * l + 4);
                    } else {
                        l--;
                    }
                    break;
                case 'effects':
                    for (var j = 0; j < effects.length; j++) {
                        if (effects[j].code === 11 || effects[j].code === 12) {
                            var type = effects[j].code === 11 ? 'hp' : 'mp';
                            if (this.checkCodeEnabled(effects[j].code)) {
                                if (effects[j].value1) {
                                    if (l >= 0) this.drawRecover(type, effects[j].value1, 0, xxx, yy + size * l + 4);
                                    l++;
                                }
                                if (effects[j].value2) {
                                    if (l >= 0) this.drawRecover(type, 0, effects[j].value2, xxx, yy + size * l + 4);
                                    l++;
                                }
                            }
                        } else {
                            if (this.checkCodeEnabled(effects[j].code)) {
                                if (l >= 0) this.drawEffect(effects[j], xxx, yy + size * l + 4);
                                l++;
                            }
                        }
                        if (this.maxPageLine() - 1 < l) return;
                    }
                    l--;
                    break;
                case 's':
                    break;
                case 'l':
                    if (l >= 0) this.drawHorzLine(size * l + yy + 8 + (size / 2));
                    break;
                case 'weight':
                    if (l >= 0 && Imported['LimitPossession']){
                        var weight = DataManager.itemWeight(this._item);
                        if (weight > 0) {
                            var s = PluginManager.parameters('LimitPossession')['NumberOfDecimalPlace'];
                            this.drawItemWeight(weight.toFixed(s), xxx, yy + size * l + 4);
                        } else {
                            l--;
                        }
                    }
                    break;
                default:
                    if (shopInfo[i].match(/meta\[(.+)\]/)) {
                        var text = RegExp.$1;
                        if (l >= 0) {
                            if (this._item.meta[text]) {
                                this.drawMetaTag(text, xxx, yy + size * l + 4);
                            } else {
                                l--;
                            }
                        }
                    } else {
                        if (l >= 0) this.drawTextEx(shopInfo[i], xxx, yy + size * l + 4);
                    }
            }
            l++;
            if (this.maxPageLine() < l) return;
        }
    };

    Window_RefineShopStatus.prototype.drawPartyMembers = function(y) {
        var mLength = $gameParty.size();
        var rowMax = mLength;
        var ww = (this.contentsWidth() / rowMax) - 2;

        for (var i=0;i<mLength;i++){
            var member = $gameParty.members()[i];
            var xxx = this.width - ww * (rowMax - i) - 22 + ww/2;
            var yyy = y;
            this.changePaintOpacity(this._actor === member);
            this.drawActorCharacter(member, xxx, yyy+48);
            this.changePaintOpacity(true);
            this._actorPosArray[i] = [xxx-24,yyy];
        }
        for (var i=0;i<mLength;i++){
            var member = $gameParty.members()[i];
            var xxx = this.width - ww * (rowMax - i) - 24 + ww/2;
            var yyy = y;
            if (!member.canEquip(this._item)){
                this.changeTextColor('rgb(255,128,128)');
                this.drawText('x', xxx + 8, yyy + 16);
            }
            this.resetTextColor();
            if (member.isEquipped(this._item)){
                this.drawText(performanceIconEquipped,xxx + 8, yyy + 16);
            } else if (member.canEquip(this._item)){
                var item = member.equips()[this._item.etypeId-1];
                var a = item ? member.calcEquipItemPerformanceCopy(item) : 0;
                var b = member.calcEquipItemPerformanceCopy(this._item);
                if (a < b){
                    this.changeTextColor(this.paramchangeTextColor(b-a));
                    if (Imported['EquippedLimit'] && !member.isLeEquippable(this._item)) this.changeTextColor(this.textColor(4));
                    this.contents.fontSize = 16;
                    this.drawText(performanceIconUp,xxx + 4, yyy + performanceIconPositionY);
                } else if(a > b){
                    this.changeTextColor(this.paramchangeTextColor(b-a));
                    if (Imported['EquippedLimit'] && !member.isLeEquippable(this._item)) this.changeTextColor(this.textColor(4));
                    this.contents.fontSize = 16;
                    this.drawText(performanceIconDown,xxx + 4, yyy + performanceIconPositionY);
                } else {
                    this.changeTextColor(this.textColor(6));
                    if (Imported['EquippedLimit'] && !member.isLeEquippable(this._item)) this.changeTextColor(this.textColor(4));
                    this.contents.fontSize = 16;
                    this.drawText(performanceIconEqual,xxx + 4, yyy + performanceIconPositionY);
                }
            }
            this.resetFontSettings();
        }
    };

    Window_RefineShopStatus.prototype.checkCodeEnabled = function(code){
        switch(code){
        case 11: return !!effectNames[0] && !!effectNames[1];
        case 12: return !!effectNames[2] && !!effectNames[3];
        case 13: return !!effectNames[4];
        case 21: return !!effectNames[5];
        case 22: return !!effectNames[6];
        case 31: return !!effectNames[7];
        case 32: return !!effectNames[8];
        case 33: return !!effectNames[9];
        case 34: return !!effectNames[10];
        case 41: return !!effectNames[11];
        case 42: return !!effectNames[12];
        case 43: return !!effectNames[13];
        case 44: return !!effectNames[14];
        }
        return true;
    };

    Window_RefineShopStatus.prototype.maxItemStatusLine = function() {
        if (!this._item){ return 0 }

        var effects = this._item.effects;

        var l=1;
        for (var i=0;i<shopInfo.length;i++){
            switch(shopInfo[i]){
            case 'effects':
                for (var j=0;j<effects.length;j++){
                    l++;
                    if (effects[j].code === 11 || effects.code === 12){
                        if (effects[j].value1 && effects[j].value2){
                            l++;
                        }
                    }
                }
                break;
            }
            l++;
        }
        return l;
    };

    Window_RefineShopStatus.prototype.basicTextWidth = function() {
        return 160;
    };

    Window_RefineShopStatus.prototype.drawEffectText = function(text1,text2,x,y){
        var w = this.contentsWidth() - this.basicTextWidth()-18;
        this.changeTextColor(this.systemColor());
        this.drawText(text1, x, y,this.basicTextWidth());
        this.changeTextColor(this.normalColor());
        this.drawText(text2, x + this.basicTextWidth()+6, y,w,'center');
    };

    Window_RefineShopStatus.prototype.drawItemType = function(type, x, y){
        var text = itemTypeVocab[type-1];
        this.drawEffectText(itemTypeText,text,x,y);
    };

    Window_RefineShopStatus.prototype.drawConsume = function(flag, x, y){
        var text = flag ? consumeVocab[0] : consumeVocab[1];
        this.drawEffectText(consumeText,text,x,y);
    };

    Window_RefineShopStatus.prototype.drawDamageType = function(type, x, y){
        var text = damageVocab[type];
        this.drawEffectText(damageTypeText,text,x,y);
    };

    Window_RefineShopStatus.prototype.drawPrice = function(price, x, y){
        this.drawEffectText(priceText,price,x,y);
    };

    Window_RefineShopStatus.prototype.drawScope = function(scope, x, y){
        var text = scopeVocab[scope];
        this.drawEffectText(scopeText,text,x,y);
    };

    Window_RefineShopStatus.prototype.drawOccasion = function(occasion, x, y){
        var text = occasionVocab[occasion];
        this.drawEffectText(occasionText,text,x,y);
    };

    Window_RefineShopStatus.prototype.drawRepeat = function(repeat, x, y){
        this.drawEffectText(repeatText,repeat,x,y);
    };

    Window_RefineShopStatus.prototype.drawTpGain2 = function(tp, x, y){
        this.drawEffectText(tpGainText,tp,x,y);
    };

    Window_RefineShopStatus.prototype.drawEffect = function(effect, x, y){
        switch(effect.code){
        case 13:
            this.drawTpGain(effect.value1, x, y);
            break;
        case 21:
            this.drawState('add',effect.dataId,effect.value1, x, y);
            break;
        case 22:
            this.drawState('remove',effect.dataId,effect.value1, x, y);
            break;
        case 31:
            this.drawBuff('buff',effect.dataId, effect.value1, x, y);
            break;
        case 32:
            this.drawBuff('debuff',effect.dataId, effect.value1, x, y);
            break;
        case 33:
            this.drawRemoveBuff('buff',effect.dataId, x, y);
            break;
        case 34:
            this.drawRemoveBuff('debuff',effect.dataId, x, y);
            break;
        case 41:
            this.drawSpecialEffect(x, y);
            break;
        case 42:
            this.drawGrowEffect(effect.dataId, effect.value1, x, y);
            break;
        case 43:
            this.drawLearnSkill(effect.dataId, x, y);
            break;
        case 44:
            this.drawCommon(effect.dataId, x, y);
            break;
        }
    };

    Window_RefineShopStatus.prototype.drawRecover = function(type, value1, value2, x, y){
        var text1 = effectNames[0];
        if (value1 < 0){ text1 = effectNames[1] }
        if (type === 'mp' && (value1 > 0 || value2 > 0)){ text1 = effectNames[2] }
        if (type === 'mp' && (value1 < 0 || value2 < 0)){ text1 = effectNames[3] }
        var text2 = '';
        if (value2 === 0){
            text2 = Math.abs(value1)*100+'%';
        } else if (value1 === 0) {
            text2 = Math.abs(value2);
        }
        this.drawEffectText(text1,text2,x,y);
    };

    Window_RefineShopStatus.prototype.drawTpGain = function(value1, x, y){
        var text = effectNames[4];
        this.drawEffectText(text,value1,x,y);
    };
    Window_RefineShopStatus.prototype.drawState = function(type, dataId, value1, x, y){
        var text = effectNames[5];
        var w = this.contentsWidth() - this.basicTextWidth();
        if (type === 'remove'){ text = effectNames[6] }
        var name = $dataStates[dataId].name;
        this.drawEffectText(text,name + ':' + value1*100 + '%',x,y);
    };
    Window_RefineShopStatus.prototype.drawBuff = function(type, dataId, value1, x, y){
        var text = effectNames[7];
        var w = this.contentsWidth() - this.basicTextWidth();
        if (type === 'debuff'){ text = effectNames[8] }
        var name = TextManager.param(dataId);
        this.drawEffectText(text,name + ':' + value1 + turnText,x,y);
    };
    Window_RefineShopStatus.prototype.drawRemoveBuff = function(type, dataId, x, y){
        var text = effectNames[9];
        var w = this.contentsWidth() - this.basicTextWidth();
        if (type === 'debuff'){ text = effectNames[10] }
        var name = TextManager.param(dataId);
        this.drawEffectText(text,name,x,y);
    };
    Window_RefineShopStatus.prototype.drawSpecialEffect = function(x, y){
        var text = effectNames[11];
        var w = this.contentsWidth() - this.basicTextWidth();
        var name = escapeText;
        this.drawEffectText(text,name,x,y);
    };
    Window_RefineShopStatus.prototype.drawGrowEffect = function(dataId, value1, x, y){
        var text = effectNames[12];
        var w = this.contentsWidth() - this.basicTextWidth();
        var name = TextManager.param(dataId);
        this.drawEffectText(text,name + '+' + value1,x,y);
    };
    Window_RefineShopStatus.prototype.drawLearnSkill = function(dataId, x, y){
        var text = effectNames[13];
        var w = this.contentsWidth() - this.basicTextWidth();
        var name = $dataSkills[dataId].name;
        this.drawEffectText(text,name,x,y);
    };
    Window_RefineShopStatus.prototype.drawCommon = function(dataId, x, y){
        var text = effectNames[14];
        var w = this.contentsWidth() - this.basicTextWidth();
        var name = $dataCommonEvents[dataId].name;
        this.drawEffectText(text,name,x,y);
    };

    Window_RefineShopStatus.prototype.drawItemWeight = function(weight, x, y) {
        var text = '重量';
        this.drawEffectText(text,weight,x,y);
    };

    Window_RefineShopStatus.prototype.drawMetaTag = function(text, x, y){
        this.drawEffectText(text,this._item.meta[text],x,y);
    };

    Window_RefineShopStatus.prototype.drawEquipType = function(etype, x, y){
        var text = $dataSystem.equipTypes[etype];
        this.drawEffectText(equipTypeText,text,x,y);
    };

    Window_RefineShopStatus.prototype.drawWAType = function(item, x, y){
        var text1 = '';
        var text2 = '';
        if (DataManager.isWeapon(item)){
            text1 = weaponTypeText;
            text2 = $dataSystem.weaponTypes[item.wtypeId];
        } else if (DataManager.isArmor(item)){
            text1 = armorTypeText;
            text2 = $dataSystem.armorTypes[item.atypeId];
        }
        this.drawEffectText(text1,text2,x,y);
    };

    Window_RefineShopStatus.prototype.updatePage = function() {
        if (this.isPageChangeEnabled() && this.isPageChangeRequested()) {
            this.changePage();
        }
    };

    Window_RefineShopStatus.prototype.drawPossession = function(x, y) {
        this.contents.fontSize = fontSize;
        var width = this.contents.width - this.textPadding() - x;
        var possessionWidth = this.textWidth('0000');
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.possession, x, y, width - possessionWidth);
        this.resetTextColor();
        this.drawText($gameParty.numItems(this._item), x, y, width, 'right');
        this.contents.fontSize = this.standardFontSize();
    };

    Window_RefineShopStatus.prototype.drawWeight = function(x, y) {
        this.contents.fontSize = fontSize;
        var width = this.contents.width - this.textPadding() - x;
        var weightText = PluginManager.parameters('LimitPossession')['WeightText'];
        var s = Number(PluginManager.parameters('LimitPossession')['NumberOfDecimalPlace']);
        this.changeTextColor(this.systemColor());
        this.drawText(weightText, x, y, width);
        this.resetTextColor();
        var value1 = $gameParty.allItemsWeight();
        var value2 = $gameParty.maxWeight();
        value1 += $gameParty.reserveItemsWeight();
        var w = DataManager.itemWeight(this._item);
        var nw = SceneManager._scene._numberWindow;
        if (nw.active) w *= nw._number;
        if ($gameTemp._callShopWindow === 'sell') w *= -1;
        value1 += w;
        if (value1 >= value2) this.changeTextColor(this.textColor(2));
        this.drawText(value1.toFixed(s), x, y, width-100, 'right');
        this.resetTextColor();
        this.drawText('/', x+80, y, width-160, 'right');
        this.drawText(value2.toFixed(s), x+100, y, width-100, 'right');
        this.contents.fontSize = this.standardFontSize();
    };

    Window_RefineShopStatus.prototype.isPageChangeRequested = function() {
        if (Input.isTriggered('shift')) {
            this._triggeredShift = true;
            return true;
        }
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            this._triggeredShift = false;
            return true;
        }
        return false;
    };

    Window_RefineShopStatus.prototype.isTouchedInsideFrame = function() {
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    Window_RefineShopStatus.prototype.changePage = function() {
        if (this.isItemEquip()){
            if ($gameParty.size() >= 2){
                var touchIndex = this.touchCharacter();
                if (this._triggeredShift){
                    $gameParty.makeMenuActorNext();
                } else if (touchIndex >= 0){
                    $gameParty.setMenuActor($gameParty.members()[touchIndex]);
                } else {
                    $gameParty.makeMenuActorNext();
                }
                this._pageIndex = 0;
                this.setItem(this._item);
                this.refresh();
                SoundManager.playCursor();
            }
        } else {
            if (this.maxPage() > 1){
                this._pageIndex = (this._pageIndex + 1) % this.maxPage();
                this.refresh();
                SoundManager.playCursor();
            }
        }
    };

    Window_RefineShopStatus.prototype.touchCharacter = function() {
        if (!this._actorPosArray){ return -1 }
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var mLength = $gameParty.members().length;
        for (var i=0;i<mLength;i++){
            var xxx = this._actorPosArray[i][0];
            var yyy = this._actorPosArray[i][1];
            var sx = this.x + this.standardPadding() + xxx;
            var sy = this.y + this.standardPadding() + yyy;
            if (x >= xxx && x <= (xxx + 48) && y >= yyy && y <= (yyy + 48)){
                return i;
            }
        }
        return -1;
    };

    Window_RefineShopStatus.prototype.isPageChangeEnabled = function() {
        return this.visible;
    };

    Window_RefineShopStatus.prototype.loadImage = function() {
        this._actor = this.actor();
        var result = Window_EquipStatus.prototype.loadImage.call(this);
        for (var i=0;i<$gameParty.size();i++){
            var actor = $gameParty.members()[i];
            if (actor){
                var bitmap1 = ImageManager.loadCharacter(actor.characterName());
                var bitmap2 = new Bitmap(1,1);
                bitmap2.blt(bitmap1,0,0,bitmap1.width,bitmap1.height,0,0);
                result = result && ImageManager.isReady();
                bitmap1 = null;
                bitmap2 = null;
            }
        }
        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Window_ShopBuy.prototype.cursorRight = function(wrap) {
        if (this.item()) this.callHandler('right');
    };

    Window_ShopBuy.prototype.cursorLeft = function(wrap) {
        if (this.item()) this.callHandler('left');
    };

    var _WShopBuy_select = Window_ShopBuy.prototype.select;
    Window_ShopBuy.prototype.select = function(index) {
        _WShopBuy_select.call(this,index);
        if (this._statusWindow){ this._statusWindow._pageIndex = 0 }
    };


    Window_ShopBuy.prototype.onTouch = function(triggered) {
        var lastIndex = this.index();
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                if (triggered && this.isTouchOkEnabled()) {
                    this.processOk();
                }
            } else if (this.isCursorMovable()) {
                    this.select(hitIndex);
            }
        } else if (this._stayCount >= 10) {
            if (y < this.padding) {
                this.cursorUp();
            } else if (y >= this.height - this.padding) {
                this.cursorDown();
            } else if (x < this.padding && this._statusWindow._tempActor) {
                this.cursorLeft();
                this._stayCount = 0;
            } else if (x >= this.width - this.padding && this._statusWindow._tempActor) {
                this.cursorRight();
                this._stayCount = 0;
            }
        }
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    if (isRefineShopStatus) {

        var __SShop_initialize = Scene_Shop.prototype.initialize;
        Scene_Shop.prototype.initialize = function () {
            __SShop_initialize.call(this);
            this._menuActorId = $gameParty._menuActorId;
        };

        Scene_Shop.prototype.createBuyWindow = function () {
            var wy = this._dummyWindow.y;
            var wh = this._dummyWindow.height;
            this._buyWindow = new Window_ShopBuy(0, wy, wh, this._goods);
            this._buyWindow.setHelpWindow(this._helpWindow);
            this._buyWindow.setStatusWindow(this._statusWindow);
            this._buyWindow.hide();
            this._buyWindow.setHandler('ok', this.onBuyOk.bind(this));
            this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
            this._buyWindow.setHandler('pagedown', this.nextActor.bind(this));
            this._buyWindow.setHandler('pageup', this.previousActor.bind(this));
            this._buyWindow.setHandler('right', this.nextPage.bind(this));
            this._buyWindow.setHandler('left', this.prevPage.bind(this));
            this.addWindow(this._buyWindow);
        };

        Scene_Shop.prototype.createStatusWindow = function () {
            var wx = this._numberWindow.width;
            var wy = this._dummyWindow.y;
            var ww = Graphics.boxWidth - wx;
            var wh = this._dummyWindow.height;
            this._statusWindow = new Window_RefineShopStatus(wx, wy, ww, wh);
            this._statusWindow.hide();
            this.addWindow(this._statusWindow);
        };

        var _SShop_nextActor = Scene_Shop.prototype.nextActor;
        Scene_Shop.prototype.nextActor = function () {
            _SShop_nextActor.call(this);
            this._statusWindow._pageIndex = 0;
            this._statusWindow.refresh();
            this._buyWindow.activate();
        };

        var _SShop_previousActor = Scene_Shop.prototype.previousActor;
        Scene_Shop.prototype.previousActor = function () {
            _SShop_previousActor.call(this);
            this._statusWindow._pageIndex = 0;
            this._statusWindow.refresh();
            this._buyWindow.activate();
        };

        var _SShop_onBuyOk = Scene_Shop.prototype.onBuyOk;
        Scene_Shop.prototype.onBuyOk = function () {
            _SShop_onBuyOk.call(this);
            this._statusWindow._pageIndex = 0;
            this._statusWindow.refresh();
        };

        var _SShop_onBuyCancel = Scene_Shop.prototype.onBuyCancel;
        Scene_Shop.prototype.onBuyCancel = function () {
            _SShop_onBuyCancel.call(this);
            this._statusWindow._pageIndex = 0;
            this._statusWindow.refresh();
        };

        Scene_Shop.prototype.nextPage = function () {
            this._statusWindow.nextPage();
        };

        Scene_Shop.prototype.prevPage = function () {
            this._statusWindow.prevPage();
        };

        var __SShop_popScene = Scene_Shop.prototype.popScene;
        Scene_Shop.prototype.popScene = function () {
            $gameParty._menuActorId = this._menuActorId;
            __SShop_popScene.call(this);
        };

    }
}());
