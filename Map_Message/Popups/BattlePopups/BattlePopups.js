//
//  バトルポップアップ ver1.031
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
// author yana
//

var Imported = Imported || {};
Imported['BattlePopups'] = 1.031;
/*:
 * @plugindesc ver1.031/戦闘時、いろいろな情報をポップアップさせます。
 * @author Yana
 *
 * @param 【基本設定】
 *
 * @param HideBattleLog
 * @desc バトルログを隠す設定です。trueにするとバトルログが消えます。
 * @type boolean
 * @default false
 *
 * @param PopupSize
 * @desc ポップアップするテキストのサイズです。
 * @type number
 * @default 18
 *
 * @param PopupDelay
 * @desc 連続ポップアップ時のディレイです。
 * @type number
 * @default 8
 *
 * @param PopupPattern
 * @desc ポップアップの表示パターンです。
 * @type select
 * @option GrowUp
 * @option Normal
 * @option Stretch
 * @default GrowUp
 *
 * @param ShowCount
 * @desc ポップアップの表示時間です。
 * @type number
 * @default 60
 *
 * @param SuccessionOffsetY
 * @desc ポップアップが連続したとき、ずれるＹ座標の補正値です。
 * @default 4
 *
 * @param ShowAnchorX
 * @desc バトラーに対するポップアップのアンカー位置Xです。
 * @default 0.5
 *
 * @param ShowAnchorY
 * @desc バトラーに対するポップアップのアンカー位置Yです。
 * @default 0
 *
 * @param ShowOffsetX
 * @desc バトラーに対するポップアップの補正X値です。
 * @default 0
 *
 * @param ShowOffsetY
 * @desc バトラーに対するポップアップの補正Y値です。
 * @default 0
 *
 * @param
 * @param 【行動の表示設定】
 *
 * @param PopupActionItem
 * @desc スキルやアイテム使用時にポップアップする名前の設定です。
 * _name:名前 _icon:アイコン 空欄で無効化できます。
 * @default _icon_name
 *
 * @param AttackUseWeaponName
 * @desc アクターがスキル1番で攻撃した際、スキル名ではなく武器名を表示する設定です。trueで有効になります。
 * @type boolean
 * @default true
 *
 * @param PopupDamageActionItem
 * @desc ダメージスキル等の使用時ポップアップの背景の接尾句です。
 * 背景画像名の最後にこの接尾句を追加した画像が読み込まれます。
 * @default R
 *
 * @param PopupRecoverActionItem
 * @desc 回復スキル等の使用時のポップアップの背景の接尾句です。
 * 背景画像名の最後にこの接尾句を追加した画像が読み込まれます。
 * @default G
 *
 * @param PopupOtherActionItem
 * @desc 上2つ以外の使用時ポップアップの背景の接尾句です。
 * 背景画像名の最後にこの接尾句を追加した画像が読み込まれます。
 * @default
 *
 * @param PopupState
 * @desc ステートにかかった時にポップアップするテキストです。
 * _name:ステート名 _icon:アイコン 空欄で無効化できます。
 * @default _icon_name
 *
 * @param PopupRemoveState
 * @desc ステートが解除された時にポップアップするテキストです。
 * _name:ステート名 _icon:アイコン 空欄で無効化できます。
 * @default \\C[24]_icon_name
 *
 * @param
 * @param 【背景の設定】
 *
 * @param PopupPatternBack
 * @desc 背景ポップアップの表示パターンです。
 * @type select
 * @option GrowUp
 * @option Normal
 * @option Stretch
 * @default GrowUp
 *
 * @param PopupBackPicture
 * @desc 通常ポップアップの背景に使用する画像名です。
 * img/pictures/フォルダに用意してください。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param BigPopupSize
 * @desc 戦闘開始時や勝利時などの大写しポップアップの文字サイズです。
 * @type number
 * @default 72
 *
 * @param BigPopupCount
 * @desc 戦闘開始時や勝利時などの大写しポップアップの表示時間です。
 * @type number
 * @default 90
 *
 * @param BigPopupPattern
 * @desc 戦闘開始時や勝利時などの大写しポップアップの表示パターンです。
 * @type select
 * @option GrowUp
 * @option Normal
 * @option Stretch
 * @default Stretch
 *
 * @param BigPopupBackPicture
 * @desc 戦闘開始時や勝利時などの大写しポップアップの背景に表示する画像名です。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param StartBattleDelay
 * @desc 戦闘開始時にポップアップが表示されるまでの時間です。
 * @type number
 * @default 30
 *
 * @param
 * @param 【リザルトの設定】
 *
 * @param ResultCount
 * @desc リザルト時に表示されるポップアップの表示時間を何倍にするかの設定です。
 * @default 1
 *
 * @param RewardCount
 * @desc リザルト時に表示されるポップアップが切り替わるまでの時間です。
 * @type number
 * @default 65
 *
 * @param LevelUpPopup
 * @desc レベルアップ時に表示されるポップアップのテキストです。
 * @default レベルアップ！
 *
 * @param ExpPopup
 * @desc リザルト時に表示される経験値ポップアップのテキストです。
 * _expが取得した経験値に置き換えられます。
 * @default ＋_exp\c[24]ＥＸＰ
 *
 * @param ClassLevelUpPopup
 * @desc 【ステータスクラス導入時限定】
 * クラスレベルアップ時に表示されるポップアップのテキストです。
 * @default クラスレベルアップ！
 *
 * @param ClassLevelMaxPopup
 * @desc 【ステータスクラス導入時限定】
 * クラスマスター時に表示されるポップアップのテキストです。
 * @default \C[14]★クラスマスター！
 *
 * @param AbpPopup
 * @desc 【ステータスクラス導入時限定】
 * リザルト時に表示されるABPポップアップのテキストです。
 * @default ＋_abp\c[16]ＡＢＰ
 *
 * @param ShowNewSkillPopup
 * @desc レベルアップ時に習得スキルをポップアップするかの設定です。
 * @type boolean
 * @default true
 *
 * @param HideResultMessage
 * @desc リザルトのメッセージを隠す設定です。
 * @type boolean
 * @default false
 *
 * @param SkipResultInput
 * @desc HideResultMessage時にキー入力でリザルト時のポップアップを飛ばせるかの設定です。
 * @type boolean
 * @default true
 *
 * @param RewardDelay
 * @desc 戦闘が終了してからリザルトポップアップが表示されるまでの時間です。
 * @type number
 * @default 60
 *
 * @param
 * @param 【会敵時等の設定】
 *
 * @param EmergePopup
 * @desc 戦闘開始時に不意打ちや先制攻撃が発生しなかった時に表示するポップアップのテキストです。
 * @default ＥＮＧＡＧＥ！
 *
 * @param SurprisePopup
 * @desc 戦闘開始時に不意打ちが発生した時に表示するポップアップのテキストです。
 * @default ＳＵＲＰＲＩＳＥ！
 *
 * @param PreemptivePopup
 * @desc 戦闘開始時に先制攻撃が発生した時に表示するポップアップのテキストです。
 * @default ＰＲＥＥＭＰＴＩＶＥ！
 *
 * @param EscapePopup
 * @desc 戦闘から逃げ出した時に表示するポップアップのテキストです。
 * @default ＥＳＣＡＰＥ！
 *
 * @param VictoryPopup
 * @desc 戦闘に勝利した時に表示するポップアップのテキストです。
 * @default ＶＩＣＴＯＲＹ！
 *
 * @param DefeatedPopup
 * @desc 戦闘に敗北した時に表示するポップアップのテキストです。
 * @default ＤＥＦＥＡＴＥＤ！
 *
 * @param EscapeFailurePopup
 * @desc 戦闘から逃げ出るのに失敗した時に表示するポップアップのテキストです。
 * @default ＥＳＣＡＰＥ ＦＡＩＬＥＤ！
 *
 * @param
 * @param 【回避などの設定】
 *
 * @param CriticalPopupA
 * @desc アクターのクリティカル時にポップアップするテキストです。
 * @default クリティカル
 *
 * @param CriticalPopupE
 * @desc エネミーのクリティカル時にポップアップするテキストです。
 * @default クリティカル
 *
 * @param EffectivePopup
 * @desc 受けた属性のダメージが101～199%の時に表示されるテキストです。
 * @default 弱点
 *
 * @param NotEffectivePopup
 * @desc 受けた属性のダメージが1～99%の時に表示されるテキストです。
 * @default レジスト
 *
 * @param VeryEffectivePopup
 * @desc 受けた属性のダメージが200%以上の時に表示されるテキストです。
 * @default 大弱点
 *
 * @param NotValidPopup
 * @desc 受けた属性のダメージが0%の時に表示されるテキストです。
 * @default ブロック
 *
 * @param EvasionPopupP
 * @desc 物理攻撃を回避した時にポップアップするテキストです。
 * @default 回避
 *
 * @param EvasionPopupM
 * @desc 魔法攻撃を回避した時にポップアップするテキストです。
 * @default 魔法回避
 *
 * @param CounterPopup
 * @desc 反撃が発動した時にポップアップするテキストです。
 * @default 反撃
 *
 * @param ReflectionPopup
 * @desc 反射が発動した時にポップアップするテキストです。
 * @default 反射
 *
 * @param SubstitutePopup
 * @desc 身替りが発動した時にポップアップするテキストです。
 * @default 身代わり
 *
 * @param
 * @param 【強化の設定】
 *
 * @param BuffPopupHp
 * @desc HPアップの強化が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[32]_paramアップ
 * 
 * @param BuffPopupMp
 * @desc MPアップの強化が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[33]_paramアップ
 *
 * @param BuffPopupAtk
 * @desc 攻撃力アップの強化が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[34]_paramアップ
 *
 * @param BuffPopupDef
 * @desc 防御力アップの強化が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[35]_paramアップ
 *
 * @param BuffPopupMat
 * @desc 魔法力アップの強化が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[36]_paramアップ
 *
 * @param BuffPopupMdf
 * @desc 魔法防御力アップの強化が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[37]_paramアップ
 *
 * @param BuffPopupAgi
 * @desc 敏捷性アップの強化が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[38]_paramアップ
 *
 * @param BuffPopupLuk
 * @desc 運アップの強化が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[39]_paramアップ
 *
 * @param
 * @param 【弱体の設定】
 *
 * @param DebuffPopupHp
 * @desc HPダウンの弱体が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[48]_paramダウン
 * 
 * @param DebuffPopupMp
 * @desc MPダウンの弱体が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[49]_paramダウン
 *
 * @param DebuffPopupAtk
 * @desc 攻撃力ダウンの弱体が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[50]_paramダウン
 *
 * @param DebuffPopupDef
 * @desc 防御力ダウンの弱体が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[51]_paramダウン
 *
 * @param DebuffPopupMat
 * @desc 魔法力ダウンの弱体が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[52]_paramダウン
 *
 * @param DebuffPopupMdf
 * @desc 魔法防御力ダウンの弱体が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[53]_paramダウン
 *
 * @param DebuffPopupAgi
 * @desc 敏捷性ダウンの弱体が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[54]_paramダウン
 *
 * @param DebuffPopupLuk
 * @desc 運ダウンの弱体が付与された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default \I[55]_paramダウン
 *
 * @param
 * @param 【強化解除時の設定】
 *
 * @param BuffRemovePopupHp
 * @desc HPの強化が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param強化解除
 * 
 * @param BuffRemovePopupMp
 * @desc MPの強化が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param強化解除
 *
 * @param BuffRemovePopupAtk
 * @desc 攻撃力の強化が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param強化解除
 *
 * @param BuffRemovePopupDef
 * @desc 防御力の強化が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param強化解除
 *
 * @param BuffRemovePopupMat
 * @desc 魔法力の強化が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param強化解除
 *
 * @param BuffRemovePopupMdf
 * @desc 魔法防御力の強化が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param強化解除
 *
 * @param BuffRemovePopupAgi
 * @desc 敏捷性の強化が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param強化解除
 *
 * @param BuffRemovePopupLuk
 * @desc 運の強化が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param強化解除
 *
 * @param
 * @param 【弱体解除時の設定】
 *
 * @param DebuffRemovePopupHp
 * @desc HPの弱体が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param弱体解除
 *
 * @param DebuffRemovePopupMp
 * @desc MPの弱体が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param弱体解除
 *
 * @param DebuffRemovePopupAtk
 * @desc 攻撃力の弱体が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param弱体解除
 *
 * @param DebuffRemovePopupDef
 * @desc 防御力の弱体が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param弱体解除
 *
 * @param DebuffRemovePopupMat
 * @desc 魔法力の弱体が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param弱体解除
 *
 * @param DebuffRemovePopupMdf
 * @desc 魔法防御力の弱体が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param弱体解除
 *
 * @param DebuffRemovePopupAgi
 * @desc 敏捷性の弱体が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param弱体解除
 *
 * @param DebuffRemovePopupLuk
 * @desc 運の弱体が解除された時にポップアップするテキストです。
 * _paramをパラメータ名に置き換えます。
 * @default _param弱体解除
 *
 * @param
 * @param 【その他の設定】
 *
 * @param HitText
 * @desc 命中回避計算式導入時、2回ヒット以上で表示されるテキストです。
 * _cntを命中数に置き換えます。
 * @default _cnt回ヒット！
 *
 * @param ChainText
 * @desc 連携発動スキル導入時、連携スキルに追加表示されるテキストです。
 * @default 技連携！
 *
 * @param MagicBurstText
 * @desc 連携発動スキル導入時、マジックバーストで追加表示されるテキストです。
 * @default マジックバースト！
 *
 * @param StartPhaseText
 * @desc フェイズスキル導入時、戦闘開始フェイズのスキルに表示されるテキストです。
 * @default ファストスキル！
 *
 * @param TurnStartPhaseText
 * @desc フェイズスキル導入時、ターン開始フェイズのスキルに表示されるテキストです。
 * @default 先制発動！
 *
 * @param TurnEndPhaseText
 * @desc フェイズスキル導入時、ターン終了フェイズのスキルに表示されるテキストです。
 * @default 遅延発動！
 *
 * @param LearningText
 * @desc ラーニング導入時、ラーニング時に表示されるテキストです。
 * @default ラーニング！
 *
 * @param FlashText
 * @desc 条件付きスキル変化導入時、閃き時に表示されるテキストです。
 * @default 閃いた！
 *
 * @help ------------------------------------------------------
 * 導入に関しての注意
 * ------------------------------------------------------
 * このプラグインの動作にはCommonPopupCore_ver1.04以降が必要です。
 * このプラグインは、CommonPopupCoreよりも下に配置してください。
 * ------------------------------------------------------
 * プラグインコマンド
 * ------------------------------------------------------
 * ************************************************
 * BattlePopup pos ～
 * バトルポップアップ 位置 ～
 * ************************************************
 * バトルポップアップを指定した位置に呼び出します。
 *
 * 位置の設定は、マップシーンであれば、
 * -1:プレイヤー、0:呼び出したイベント、1以上:対応するIDのイベント
 * に設定されます。
 *
 * バトルシーンであれば、
 * 0～999:対応するメンバーインデックスのアクター
 * 1000～:-1000をして、対応するメンバーインデックスのエネミー
 * となります。
 *
 * また、x,yと記述することで、直接ポップアップ位置を指定することも可能です。
 * この際のx,yは、ポップアップの中心下端(x=0.5,y=1.0)となります。
 *
 * ～には以下のパラメータを,で区切って、任意で指定します。
 * textは必須です。必ず指定してください。
 *
 * text:表示したいテキスト
 * pattern:表示パターン Normalでフェード、GrowUpで縦ストレッチ、Stretchで横ストレッチ
 * size:文字サイズ
 * back:背景の画像名 背景画像はimg/pictures/に用意してください
 * count:表示時間
 *
 * ************************************************
 * BattlePopup SetText type ～
 * バトルポップアップ テキスト設定 種類 ～
 * ************************************************
 * 指定した種類(エンカウントや勝利時など)のポップアップするテキストを変更します。
 *
 * typeまたは種類のところには以下のいずれかを指定してください。
 * Emerge
 * エンカウント
 * Surprise
 * 不意打ち
 * Preemptive
 * 先制
 * Victory
 * 勝利
 * Escape
 * 逃亡
 * Defeated
 * 敗北
 *
 * ～の部分には、BattlePopup 位置 ～と同じ設定が可能です。
 * textは必ず指定してください。
 *
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * スキルやアイテムのメモ欄に、
 * <使用ポップアップ:xxx>
 * または、
 * <UsePopup:xxx>
 * と記述すると、スキルやアイテムを使用した際にxxxをポップアップで表示します。
 * この際、xxxに記述されたテキストのうち、_iconはそのスキルやアイテムのアイコンに、
 * _nameはそのスキルやアイテムの名前に変換されます。
 * また、xxxの後に,で区切ってパラメータを指定することが可能です。
 * 指定可能なパラメータはプラグインコマンドと同じです。
 * 例:表示パターンをStretch、背景画像をMiniWindowRに設定して、アイコン付きで名前をポップアップ
 * <使用ポップアップ:_icon_name,pattern:Stretch,back:MiniWindowR>
 *
 * スキルやアイテムのメモ欄に、
 * <対象ポップアップ>
 * <PopupTarget>
 * のいずれかを記述することで、そのスキルやアイテムの使用時のポップアップを対象に表示することができます。
 *
 * ************************************************
 * ステートのメモ欄に
 * <付与ポップアップ:xxx>
 * または、
 * <AddPopup:xxx>
 * と記述すると、ステートが付与された際にxxxをポップアップで表示します。
 * この際、上記の使用ポップアップと同じように名前の変換やパラメータの設定が可能です。
 *
 * ************************************************
 * ステートのメモ欄に
 * <解除ポップアップ:xxx>
 * または、
 * <RemovePopup:xxx>
 * と記述すると、ステートが解除された際にxxxをポップアップで表示します。
 * それ以外は同上です。
 *
 * ************************************************
 * ステートのメモ欄に
 * <継続ポップアップ:xxx>
 * または、
 * <ContinuationPopup:xxx>
 * と記述すると、継続メッセージが表示されるタイミングでxxxをポップアップで表示します。
 * それ以外は同上です。
 *
 * ************************************************
 * バトルポップアップでは、\V、\G、\N、\P、\C、\I加え、専用の制御文字、\SGが使用可能です。
 * \SG[xxx] 文字の代わりにimg/pictures/フォルダ内のxxxの画像を表示します。
 *
 * ************************************************
 * アクターやエネミーのメモ欄に
 * <バトルポップアップ補正X:n>
 * または、
 * <BattlePopupOffsetX:n>
 * と記述すると、そのアクターやエネミーに表示されるポップアップはその数値分だけ表示位置が補正されます。
 * XをYに変えることで、Y座標も補正が可能です。
 *
 * ************************************************
 *
 *
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.031:180410
 * プラグインパラメータの仕様を1.5.0に更新。
 * ver1.03:
 * ヒット数表示が正常に機能していないバグを修正。
 * ver1.02:
 * 身代わり発生時に無限ループするバグを修正。
 * スキル発動時、itemが空だとエラーが発生するバグを修正。
 * 逃走失敗時のポップアップを追加。
 * 経験値など、バトルリザルトをポップアップする機能を追加。
 * また、それに合わせてメッセージウィンドウを隠す設定を追加。
 * 命中回避計算式との併用可処理を追加。
 * ver1.01:
 * console.logを削除。
 * 強化弱体が解除された時のポップアップが正常に表示されないバグを修正。
 * 大弱点及びブロックの設定を追加。
 * 背景画像が未指定の場合、エラーが発生するバグを修正。
 * ver1.00:
 * 公開
 */

(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    'use strict';

    var parameters = PluginManager.parameters('BattlePopups');
    var hideBattleLog = parameters['HideBattleLog'] === 'true';
    var showAnchorX = Number(parameters['ShowAnchorX']);
    var showAnchorY = Number(parameters['ShowAnchorY']);
    var showOffsetX = Number(parameters['ShowOffsetX']);
    var showOffsetY = Number(parameters['ShowOffsetY']);
    var popupActionItem = parameters['PopupActionItem'] || '';
    var popupDamageActionItem = parameters['PopupDamageActionItem'] || '';
    var popupRecoverActionItem = parameters['PopupRecoverActionItem'] || '';
    var popupOtherActionItem = parameters['PopupOtherActionItem'] || '';
    var popupState = parameters['PopupState'] || '';
    var popupRemoveState = parameters['PopupRemoveState'] || '';
    var popupSize = Number(parameters['PopupSize']) || 18;
    var popupDelay = Number(parameters['PopupDelay']) || 0;
    var popupPattern = parameters['PopupPattern'] || 0;
    var popupPatternBack = parameters['PopupPatternBack'] || 0;
    var popupBackPicture = parameters['PopupBackPicture'] || 0;
    var showCount = Number(parameters['ShowCount']) || 60;
    var successionOffsetY = Number(parameters['SuccessionOffsetY']) || 0;
    var bigPopupSize = Number(parameters['BigPopupSize']);
    var bigPopupCount = Number(parameters['BigPopupCount']) || 60;
    var bigPopupPattern = parameters['BigPopupPattern'] || 0;
    var bigPopupBackPicture = parameters['BigPopupBackPicture'];
    var startBattleDelay = Number(parameters['StartBattleDelay']) || 0;
    var emergePopup = parameters['EmergePopup'];
    var surprisePopup = parameters['SurprisePopup'];
    var preemptivePopup = parameters['PreemptivePopup'];
    var escapePopup = parameters['EscapePopup'];
    var victoryPopup = parameters['VictoryPopup'];
    var defeatedPopup = parameters['DefeatedPopup'];
    var escapeFailurePopup = parameters['EscapeFailurePopup'];
    var criticalPopupA = parameters['CriticalPopupA'];
    var criticalPopupE = parameters['CriticalPopupE'];
    var effectivePopup = parameters['EffectivePopup'];
    var notEffectivePopup = parameters['NotEffectivePopup'];
    var veryEffectivePopup = parameters['VeryEffectivePopup'];
    var notValidPopup = parameters['NotValidPopup'];
    var evasionPopupP = parameters['EvasionPopupP'];
    var evasionPopupM = parameters['EvasionPopupM'];
    var counterPopup = parameters['CounterPopup'];
    var reflectionPopup = parameters['ReflectionPopup'];
    var substitutePopup = parameters['SubstitutePopup'];
    var attackUseWeaponName = parameters['AttackUseWeaponName'] === 'true';
    var buffPopups = [parameters['BuffPopupHp'],parameters['BuffPopupMp'],
                      parameters['BuffPopupAtk'],parameters['BuffPopupDef'],
                      parameters['BuffPopupMat'],parameters['BuffPopupMdf'],
                      parameters['BuffPopupAgi'],parameters['BuffPopupLuk']];
    var debuffPopups = [parameters['DebuffPopupHp'],parameters['DebuffPopupMp'],
                        parameters['DebuffPopupAtk'],parameters['DebuffPopupDef'],
                        parameters['DebuffPopupMat'],parameters['DebuffPopupMdf'],
                        parameters['DebuffPopupAgi'],parameters['DebuffPopupLuk']];
    var buffRemovePopups = [parameters['BuffRemovePopupHp'],parameters['BuffRemovePopupMp'],
                            parameters['BuffRemovePopupAtk'],parameters['BuffRemovePopupDef'],
                            parameters['BuffRemovePopupMat'],parameters['BuffRemovePopupMdf'],
                            parameters['BuffRemovePopupAgi'],parameters['BuffRemovePopupLuk']];
    var debuffRemovePopups = [parameters['DebuffRemovePopupHp'],parameters['DebuffRemovePopupMp'],
                              parameters['DebuffRemovePopupAtk'],parameters['DebuffRemovePopupDef'],
                              parameters['DebuffRemovePopupMat'],parameters['DebuffRemovePopupMdf'],
                              parameters['DebuffRemovePopupAgi'],parameters['DebuffRemovePopupLuk']];

    var resultCount = Number(parameters['ResultCount']);
    var rewardCount = Number(parameters['RewardCount']);
    var levelUpPopup = parameters['LevelUpPopup'];
    var expPopup = parameters['ExpPopup'];
    var classLevelUpPopup = parameters['ClassLevelUpPopup'];
    var classLevelMaxPopup = parameters['ClassLevelMaxPopup'];
    var abpPopup = parameters['AbpPopup'];
    var rewardDelay = Number(parameters['RewardDelay']);
    var showNewSkillPopup = parameters['ShowNewSkillPopup'] === 'true';
    var hideResultMessage = parameters['HideResultMessage'] === 'true';
    var skipResultInput = parameters['SkipResultInput'] === 'true';

    var hitText = parameters['HitText'];

    var chainText = parameters['ChainText'];
    var magicBurstText = parameters['MagicBurstText'];

    var battleStartPhaseText = parameters['StartPhaseText'];
    var turnStartPhaseText = parameters['TurnStartPhaseText'];
    var turnEndPhaseText = parameters['TurnEndPhaseText'];

    var learningText = parameters['LearningText'];

    var flashText = parameters['FlashText'];

    ////////////////////////////////////////////////////////////////////////////////////

    var __BManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        $gameMessage.setOptionalPositionY(Graphics.boxHeight);
        this.allBattleMembers().forEach(function(m){ m.result()._sIndex = 0 });
        __BManager_startBattle.call(this);
        if (this._preemptive) {
            this._logWindow.showBattlePopup(null,$gameSystem.preemptivePopup(),{size:bigPopupSize,delay:startBattleDelay});
        } else if (this._surprise) {
            this._logWindow.showBattlePopup(null,$gameSystem.surprisePopup(),{size:bigPopupSize,delay:startBattleDelay});
        } else {
            this._logWindow.showBattlePopup(null,$gameSystem.emergePopup(),{size:bigPopupSize,delay:startBattleDelay});
        }
    };

    var __BManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function() {
        $gameMessage.setOptionalPositionY(Graphics.boxHeight);
        this._rewardPopupCount = 0;
        this._logWindow.showBattlePopup(null,$gameSystem.victoryPopup(),{size:bigPopupSize});
        __BManager_processVictory.call(this);
        this.popupWait();
    };

    var __BManager_displayVictoryMessage = BattleManager.displayVictoryMessage;
    BattleManager.displayVictoryMessage = function() {
        if (hideResultMessage) {
            var message = TextManager.victory.format($gameParty.name());
            message = '\\>' + message;
            if (!skipResultInput) message = message + '\\^';
            $gameMessage.add(message);
        } else {
            __BManager_displayVictoryMessage.call(this);
        }
    };

    var __BManager_displayDefeatMessage = BattleManager.displayDefeatMessage;
    BattleManager.displayDefeatMessage = function() {
        if (hideResultMessage) {
            var message = TextManager.defeat.format($gameParty.name());
            message = '\\>' + message + '\\^';
            $gameMessage.add(message);
        } else {
            __BManager_displayDefeatMessage.call(this);
        }
    };

    var __BManager_displayEscapeSuccessMessage = BattleManager.displayEscapeSuccessMessage;
    BattleManager.displayEscapeSuccessMessage = function() {
        if (hideResultMessage) {
            var message = TextManager.escapeStart.format($gameParty.name());
            message = '\\>' + message + '\\^';
            $gameMessage.add(message);
        } else {
            __BManager_displayEscapeSuccessMessage.call(this);
        }
    };

    var __BManager_displayEscapeFailureMessage = BattleManager.displayEscapeFailureMessage;
    BattleManager.displayEscapeFailureMessage = function() {
        if (hideResultMessage) {
            var message = TextManager.escapeStart.format($gameParty.name());
            message = '\\>' + message + '\\^';
            $gameMessage.add(message);
            $gameMessage.add('\\.' + TextManager.escapeFailure);
        } else {
            __BManager_displayEscapeFailureMessage.call(this);
        }
    };

    var __BManager_displayRewards = BattleManager.displayRewards;
    BattleManager.displayRewards = function() {
        __BManager_displayRewards.call(this);
        var exp = 0;
        var abp = 0;
        $gameParty.battleMembers().forEach(function(m){
            exp = this._rewards.exp;
            if (Imported['VXandAceHybridClass']) abp = this._rewards.abp * m.finalAbpRate();
            if (Imported['ConditionallyDrop']) exp += this.conditionallyRewards('exp');
            exp = exp * m.finalExpRate();
            m.result()._sIndex = 0;
            m._rewardPopupCount = 0;
            if (exp > 0 && expPopup) {
                var text = String(Math.floor(exp));
                text = text.replace(/[A-Za-z0-9]/g, function (s) {
                    return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
                });
                text = expPopup.replace(/_exp/, text);
                this._logWindow.showBattlePopup(m, text, {count: showCount * resultCount, delay: rewardDelay});
                m.result()._sIndex = 1;
            }

            if (Imported['VXandAceHybridClass'] && abp > 0 && abpPopup) {
                var text = String(Math.floor(abp));
                text = text.replace(/[A-Za-z0-9]/g, function (s) {
                    return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
                });
                text = abpPopup.replace(/_abp/, text);
                this._logWindow.showBattlePopup(m, text, {count: showCount * resultCount, delay: rewardDelay});
            }
            m.result()._sIndex = 0;
        }.bind(this));
    };

    var __BManager_displayGold = BattleManager.displayGold;
    BattleManager.displayGold = function() {
        if (hideResultMessage) {
            var gold = this._rewards.gold;
            if (gold > 0) {
                $gameMessage.add('\\>' + TextManager.obtainGold.format(gold));
            }
        } else {
            __BManager_displayGold.call(this);
        }
    };

    var __BManager_displayDropItems = BattleManager.displayDropItems;
    BattleManager.displayDropItems = function() {
        if (hideResultMessage) return;
        __BManager_displayDropItems.call(this);
    };

    BattleManager.popupWait = function() {
        var n = 0;
        $gameParty.members().forEach(function(m){ n = n < m._rewardPopupCount ? m._rewardPopupCount : n });
        n += this._rewardPopupCount;
        if (n && hideResultMessage && !skipResultInput) {
            var mw = SceneManager._scene._messageWindow;
            //mw.startWait(this._rewardPopupCount + 60);
            mw.startWait(n + 90)
        }
    };

    var __BManager_processEscape = BattleManager.processEscape;
    BattleManager.processEscape = function() {
        var success = __BManager_processEscape.call(this);
        if(success){
            this._logWindow.showBattlePopup(null,$gameSystem.escapePopup(),{size:bigPopupSize});
        } else {
            this._logWindow.showBattlePopup(null,$gameSystem.escapeFailurePopup(),{size:bigPopupSize});
        }
        return success;
    };

    var __BManager_processDefeat = BattleManager.processDefeat;
    BattleManager.processDefeat = function() {
        this._logWindow.showBattlePopup(null,$gameSystem.defeatedPopup(),{size:bigPopupSize});
        __BManager_processDefeat.call(this);
    };

    var __BManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        __BManager_endBattle.call(this,result);
        $gameParty.members().forEach(function(m){
            m._affectedBuffs = [];
            m._affectedDebuffs = [];
        });
    };

    var __BManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function() {
        __BManager_updateBattleEnd.call(this);
        $gameMessage.clearOptionalPosition();
    };

    var __BManager_gainExp = BattleManager.gainExp;
    BattleManager.gainExp = function() {
        __BManager_gainExp.call(this);
        var n = 0;
        if (expPopup) {
            $gameParty.battleMembers().forEach(function(m){
                n = n < m._rewardPopupCount ? m._rewardPopupCount : n;
            }.bind(this));
            this._rewardPopupCount = n + showCount * resultCount;
        }
        n = 0;
        if (Imported['VXandAceHybridClass']) {
            if (abpPopup) {
                $gameParty.battleMembers().forEach(function (m) {
                    n = n < m._rewardPopupCount ? m._rewardPopupCount : n;
                }.bind(this));
                this._rewardPopupCount = n + showCount * resultCount;
            }
        }
    };

    var __BManager_gainRewards = BattleManager.gainRewards;
    BattleManager.gainRewards = function() {
        if (Imported['Learning'] && PluginManager.parameters('Learning')['Learning Skill Shared'] !== 'true') {
            if (this._learningList && learningText) {
                var length = this._learningList.length;
                for (var i = 0; i < length; i++) {
                    var l = this._learningList[i];
                    var actor = $gameActors.actor(l[0]);
                    var skill = $dataSkills[l[1]];
                    if (actor && skill) {
                        this._logWindow.showBattlePopup(actor, skill.name);
                        this._logWindow.showBattlePopup(actor, learningText);
                    }
                }
            }
        }
        __BManager_gainRewards.call(this);
    };


    ////////////////////////////////////////////////////////////////////////////////////

    Game_System.prototype.preemptivePopup = function() {
        if (this._preemptivePopup === undefined) this._preemptivePopup = preemptivePopup;
        return this._preemptivePopup;
    };

    Game_System.prototype.surprisePopup = function() {
        if (this._surprisePopup === undefined) this._surprisePopup = surprisePopup;
        return this._surprisePopup;
    };

    Game_System.prototype.emergePopup = function() {
        if (this._emergePopup === undefined) this._emergePopup = emergePopup;
        return this._emergePopup;
    };

    Game_System.prototype.victoryPopup = function() {
        if (this._victoryPopup === undefined) this._victoryPopup = victoryPopup;
        return this._victoryPopup;
    };

    Game_System.prototype.escapePopup = function() {
        if (this._escapePopup === undefined) this._escapePopup = escapePopup;
        return this._escapePopup;
    };

    Game_System.prototype.defeatedPopup = function() {
        if (this._defeatedPopup === undefined) this._defeatedPopup = defeatedPopup;
        return this._defeatedPopup;
    };

    Game_System.prototype.escapeFailurePopup = function() {
        if (this._escapeFailurePopup === undefined) this._escapeFailurePopup = escapeFailurePopup;
        return this._escapeFailurePopup;
    };

    Game_System.prototype.setPopupText = function(args) {
        switch(args[1]){
            case 'Surprise':
            case '不意打ち':
                this._surprisePopup = args[2];
                break;
            case 'Preemptive':
            case '先制':
                this._preemptivePopup = args[2];
                break;
            case 'Emerge':
            case 'エンカウント':
                this._emergePopup = args[2];
                break;
            case 'Victory':
            case '勝利':
                this._victoryPopup = args[2];
                break;
            case 'Escape':
            case '逃げる':
                this._escapePopup = args[2];
                break;
            case 'Defeated':
            case '敗北':
                this._defeatedPopup = args[2];
                break;
            case 'EscapeFailed':
            case '逃走失敗':
                this._escapeFailurePopup = args[2];
                break;
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GBBase_mostImportantStateText = Game_BattlerBase.prototype.mostImportantStateText;
    Game_BattlerBase.prototype.mostImportantStateText = function() {
        var result = __GBBase_mostImportantStateText.call(this);
        var states = this.states();
        this.result()._continuationPopup = [];
        for (var i = 0; i < states.length; i++) {
            var text = '';
            if (states[i].meta['ContinuationPopup']) text = states[i].meta['ContinuationPopup'];
            if (states[i].meta['継続ポップアップ']) text = states[i].meta['継続ポップアップ'];
            if (text){
                text = text.replace(/_name/gi,states[i].name);
                text = text.replace(/_icon/gi,'\\I[' + states[i].iconIndex + ']');
                this.result()._continuationPopup.push(text);
            }
        }
        return result;
    };

    var __GBattler_addBuff = Game_Battler.prototype.addBuff;
    Game_Battler.prototype.addBuff = function(paramId, turns) {
        __GBattler_addBuff.call(this, paramId, turns);
        if (!this._affectedBuffs) this._affectedBuffs = [];
        if (!this._affectedBuffs.contains(paramId)) this._affectedBuffs.push(paramId);
    };

    var __GBattler_addDebuff = Game_Battler.prototype.addDebuff;
    Game_Battler.prototype.addDebuff = function(paramId, turns) {
        __GBattler_addDebuff.call(this, paramId, turns);
        if (!this._affectedDebuffs) this._affectedDebuffs = [];
        if (!this._affectedDebuffs.contains(paramId)) this._affectedDebuffs.push(paramId);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Actor.prototype.popupOffsetX = function() {
        var ox = showOffsetX;
        if (this.actor().meta['BattlePopupOffsetX'] !== undefined) ox = Number(this.actor().meta['BattlePopupOffsetX']);
        if (this.actor().meta['バトルポップアップ補正X'] !== undefined) ox = Number(this.actor().meta['バトルポップアップ補正X']);
        return ox;
    };

    Game_Actor.prototype.popupOffsetY = function() {
        var oy = showOffsetY;
        if (this.actor().meta['BattlePopupOffsetY'] !== undefined) oy = Number(this.actor().meta['BattlePopupOffsetY']);
        if (this.actor().meta['バトルポップアップ補正Y'] !== undefined) oy = Number(this.actor().meta['バトルポップアップ補正Y']);
        return oy;
    };

    var __GActor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
    Game_Actor.prototype.displayLevelUp = function(newSkills) {
        if ($gameParty.inBattle()) {
            this.result()._sIndex = 0;
            if (Imported['VXandAceHybridClass']){
                if (this._fUpLevel) {
                    this.result()._sIndex = 1;
                    this._fUpLevel = false;
                } else {
                    this._fUpLevel = true;
                    this._bsPopCount = 1;
                }
            }
            var logWindow = BattleManager._logWindow;
            var n = 1;
            var delay = n * rewardCount + rewardDelay;
            if (levelUpPopup) {
                logWindow.showBattlePopup(this, levelUpPopup, {count: showCount * resultCount, delay: delay});
                this._rewardPopupCount += rewardCount;
            }
            if (showNewSkillPopup) {
                if (Imported['VXandAceHybridClass']) n = this._bsPopCount;
                newSkills.forEach(function (s) {
                    this.result()._sIndex = 0;
                    if (s) {
                        n++;
                        delay = n * rewardCount + rewardDelay;
                        logWindow.showBattlePopup(this, '\\I[' + s.iconIndex + ']' + s.name, {
                            count: showCount * resultCount,
                            delay: delay
                        });
                        this._rewardPopupCount += rewardCount;
                    }
                }.bind(this));
            }
            if (Imported['VXandAceHybridClass']) this._bsPopCount = n;
        } else {
            __GActor_displayLevelUp.call(this, newSkills);
        }
    };

    if (Imported['VXandAceHybridClass']) {
        var __GActor_displayClassLevelUp = Game_Actor.prototype.displayClassLevelUp;
        Game_Actor.prototype.displayClassLevelUp = function(newSkills) {
            if ($gameParty.inBattle()) {
                this.result()._sIndex = 0;
                if (this._fUpLevel) {
                    this.result()._sIndex = 1;
                    this._fUpLevel = false;
                } else {
                    this._fUpLevel = true;
                    this._bsPopCount = 1;
                }
                var logWindow = BattleManager._logWindow;
                var n = 1;
                var delay = n * rewardCount + rewardDelay;
                if (classLevelUpPopup) {
                    if (this.isMaxClassLevel() && classLevelMaxPopup) {
                        logWindow.showBattlePopup(this, classLevelMaxPopup, {
                            count: showCount * resultCount,
                            delay: delay
                        });
                    } else {
                        logWindow.showBattlePopup(this, classLevelUpPopup, {
                            count: showCount * resultCount,
                            delay: delay
                        });
                    }
                    this._rewardPopupCount += rewardCount;
                }

                n = this._bsPopCount;
                if (showNewSkillPopup) {
                    newSkills.forEach(function (s) {
                        this.result()._sIndex = 0;
                        if (s) {
                            n++;
                            delay = n * rewardCount + rewardDelay;
                            logWindow.showBattlePopup(this, '\\I[' + s.iconIndex + ']' + s.name, {
                                count: showCount * resultCount,
                                delay: delay
                            });
                            this._rewardPopupCount += rewardCount;
                        }
                    }.bind(this));
                }
                if (Imported['VXandAceHybridClass']) this._bsPopCount = n;
            } else {
                __GActor_displayClassLevelUp.call(this, newSkills);
            }
        };
    }
    ////////////////////////////////////////////////////////////////////////////////////

    Game_Enemy.prototype.popupOffsetX = function() {
        var ox = showOffsetX;
        if (this.enemy().meta['BattlePopupOffsetX'] !== undefined) ox = Number(this.enemy().meta['BattlePopupOffsetX']);
        if (this.enemy().meta['バトルポップアップ補正X'] !== undefined) ox = Number(this.enemy().meta['バトルポップアップ補正X']);
        return ox;
    };

    Game_Enemy.prototype.popupOffsetY = function() {
        var oy = showOffsetY;
        if (this.enemy().meta['BattlePopupOffsetY'] !== undefined) oy = Number(this.enemy().meta['BattlePopupOffsetY']);
        if (this.enemy().meta['バトルポップアップ補正Y'] !== undefined) oy = Number(this.enemy().meta['バトルポップアップ補正Y']);
        return oy;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GAction_calcElementRate = Game_Action.prototype.calcElementRate;
    Game_Action.prototype.calcElementRate = function(target) {
        var result = __GAction_calcElementRate.call(this,target);
        target.result()._effective = result;
        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////////


    var __GAResult_clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function() {
        __GAResult_clear.call(this);
        this.clearPopupStatus();
    };


    Game_ActionResult.prototype.clearPopupStatus = function() {
        //this._sIndex = 0;
        this._continuationPopup = [];
        this._effective = 1.0;
    };
    ////////////////////////////////////////////////////////////////////////////////////

    Game_Message.prototype.setOptionalPositionY = function(y) {
        if (hideResultMessage){
            this._ooy = y;
            SceneManager._scene._messageWindow.y = this._ooy;
        }
    };

    Game_Message.prototype.clearOptionalPosition = function() {
        if (hideResultMessage) this._ooy = 0;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function() {
        $gameMessage.clearOptionalPosition();
        return __GInterpreter_command101.call(this);
    };

    var __GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        __GInterpreter_pluginCommand.call(this, command, args);
        if (command === 'BattlePopup' || command === 'バトルポップアップ'){
            if (args[0] === 'SetText' || args[0] === 'テキスト設定'){
                $gameSystem.setPopupText(args);
            } else {
                this.callBattlePopup(args);
            }
        }
    };

    Game_Interpreter.prototype.callBattlePopup = function(args) {
        var pos = args[0];
        var args = args[1].split(',');
        var character = null;
        var x = 0;
        var y = 0;
        var text = '';
        var pattern = popupPattern;
        var fontSize = popupSize;
        var backPicture = popupBackPicture;
        var count = showCount;
        var sIndex = 0;
        var fixed = !$gameParty.inBattle();
        var battler = null;
        var delay = 0;

        if (/(-?\d+),(-?\d+),?(.+)?/.exec(pos)) {
            x = Number(RegExp.$1);
            y = Number(RegExp.$2);
            fixed = RegExp.$3 ? eval(RegExp.$3) : false;
        } else if ($gameParty.inBattle()){
            var id = eval(pos);
            if (id === -1) {
                character = BattleManager._subject;
            } else {
                character = id < 1000 ? $gameParty.members()[id] : $gameTroop.members()[id - 1000];
            }

            if(character) {
                if (character.isActor()) {
                    battler = BattleManager._spriteset._actorSprites[character.index()];
                    var sprite = battler._mainSprite;
                    x = sprite.width * (0.5 - showAnchorX) + character.popupOffsetX();
                    y = -(sprite.height * (1.0 - showAnchorY)) - (fontSize + 4) + character.popupOffsetY();
                } else {
                    battler = BattleManager._spriteset._enemySprites.filter(function (e) {
                        return e._battler === character;
                    })[0];
                    x = battler.width * (0.5 - showAnchorX) + character.popupOffsetX();
                    y = -(battler.height * battler.scale.y * (1.0 -showAnchorY)) - (fontSize + 4) + character.popupOffsetY();
                }
                if (!character.result()._sIndex) character.result()._sIndex = 0;
                sIndex = character.result()._sIndex;
                character.result()._sIndex++;
            }
        } else {
            character = this.character(eval(pos));
            x = 24;//character._realX * $gameMap.tileWidth() + 24;
            y = 0;//character._realY * $gameMap.tileHeight();
            battler = character;
        }
        args.forEach(function(str){
            if (/(.+?):(.+)?/.exec(str)) {
                switch (RegExp.$1) {
                    case 'text':    text = RegExp.$2;                break;
                    case 'pattern': pattern = RegExp.$2;             break;
                    case 'size':    fontSize = Number(RegExp.$2);    break;
                    case 'back':    backPicture = String(RegExp.$2); break;
                    case 'count':   count = Number(RegExp.$2);       break;
                    case 'delay':   delay = Number(RegExp.$2);       break;
                    case 'sIndex':  sIndex = Number(RegExp.$2);      break;
                }
            } else {
                text = str;
            }
        }.bind(this));
        if (backPicture === 'null') backPicture = '';
        if(!$gameParty.inBattle()) y -= (fontSize + 4);
        this.reserveShowCommonPopup(x,y,text,pattern,sIndex,fontSize,backPicture,count,fixed,battler,delay);
    };

    Game_Interpreter.prototype.reserveShowCommonPopup = function(x,y,text,pattern,sIndex,size,picture,count,fixed,battler,delay) {
        var bitmap = null;
        if (picture) bitmap = ImageManager.loadPicture(picture);
        if (!bitmap || bitmap.width > 0) {
            CommonPopupManager.showCommonPopup(x, y, text, pattern, sIndex, size, picture, count, fixed, battler, delay);
        } else {
            if (!this._reserveShowCP) this._reserveShowCP = [];
            this._reserveShowCP.push([x,y,text,pattern,sIndex,size,picture,count,fixed,battler,delay]);
        }
        bitmap = null;
    };

    var __GInterpreter_update = Game_Interpreter.prototype.update;
    Game_Interpreter.prototype.update = function() {
        __GInterpreter_update.call(this);
        if (this._reserveShowCP && this._reserveShowCP.length > 0){
            var bitmap = null;
            for (var i=0,max=this._reserveShowCP.length;i<max;i++) {
                var cp = this._reserveShowCP[i];
                bitmap = ImageManager.loadPicture(cp[6]);
                if (bitmap.width > 0) {
                    CommonPopupManager.showCommonPopup(cp[0], cp[1], cp[2], cp[3], cp[4], cp[5], cp[6], cp[7], cp[8], cp[9], cp[10]);
                    this._reserveShowCP[i] = null;
                }
            }

            this._reserveShowCP = this._reserveShowCP.filter(function(c){ return !!c });
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WMessage_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        __WMessage_updatePlacement.call(this);
        if ($gameMessage._ooy) this.y = $gameMessage._ooy;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WBLog_initialize = Window_BattleLog.prototype.initialize;
    Window_BattleLog.prototype.initialize = function() {
        this._lastPopupFrames = {};
        __WBLog_initialize.call(this);
        if (hideBattleLog) this.hide();
    };
    var __WBLog_update = Window_BattleLog.prototype.update;
    Window_BattleLog.prototype.update = function() {
        __WBLog_update.call(this);
        if (ImageManager.isReady()) this.executeBattlePopups();
        //this.updatePopupSubIndex();
    };

    Window_BattleLog.prototype.updatePopupSubIndex = function() {
        var members = BattleManager.allBattleMembers();
        for (var i=0,max=members.length;i<max;i++) {
            var m = members[i];
            var key = [m.index(),m.isActor()];
            if (!this._lastPopupFrames[key]) this._lastPopupFrames[key] = m._lastPopupFrame;
            if (this._lastPopupFrames[key]) {
                if (m.result()._sIndex && (this._lastPopupFrames[key] + 30 <= m._lastPopupFrame) ||
                    (m.result()._sIndex > 6)){
                    m.result()._sIndex = 0;
                }
                if (m._lastPopupFrame !== this._lastPopupFrames[key]) {
                    this._lastPopupFrames[key] = m._lastPopupFrame;
                }
            }
        }
    };

    var __WBLog_startAction = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function(subject, action, targets) {
        this._sPopupTargets = targets;
        __WBLog_startAction.call(this, subject, action, targets);
    };

    var __WBLog_performActionStart = Window_BattleLog.prototype.performActionStart;
    Window_BattleLog.prototype.performActionStart = function(subject, action) {
        __WBLog_performActionStart.call(this, subject, action);
        //subject.result()._sIndex = 0;
        var item = action.item();
        var backName = popupBackPicture;
        if (item) {
            if (backName) {
                if (action.isDamage() || action.isDrain()) {
                    backName += popupDamageActionItem;
                } else if (action.isRecover()) {
                    backName += popupRecoverActionItem;
                } else {
                    backName += popupOtherActionItem;
                }
            }
            var text = item.meta['使用ポップアップ'] || item.meta['UsePopup'] || '';
            if (!text && popupActionItem && item.iconIndex > 0) text = popupActionItem;
            if (attackUseWeaponName && action.isAttack() && subject.isActor() && subject.weapons()[0]) {
                item = subject.weapons()[0];
            }
            if (text) {
                text = text.replace(/_name/gi, item.name);
                text = text.replace(/_icon/gi, '\\I[' + item.iconIndex + ']');
                if (item.meta['対象ポップアップ'] || item.meta['PopupTarget']) {
                    if (this._sPopupTargets) {
                        this._sPopupTargets.forEach(function(target) {
                            this.showBattlePopup(target, text, {back: backName});
                        }.bind(this));
                    }
                } else {
                    this.showBattlePopup(subject, text, {back: backName});
                }
            }
            if (Imported['ChainInvokeSkill']) {
                var type = Number(PluginManager.parameters('ChainInvokeSkill')['ChainSkillType']);
                if (type === item.stypeId) {
                    if (item.meta['対象ポップアップ'] || item.meta['PopupTarget']) {
                        if (this._sPopupTargets) {
                            this._sPopupTargets.forEach(function(target) {
                                this.showBattlePopup(target, chainText);
                            }.bind(this));
                        }
                    } else {
                        this.showBattlePopup(subject, chainText);
                    }
                }
            }
            if (Imported['PhaseSkillTrait']) {
                var text = '';
                switch (BattleManager._saepPhase) {
                    case 'battleStart': text = battleStartPhaseText;break;
                    case 'turnStart':   text = turnStartPhaseText;  break;
                    case 'turnEnd':     text = turnEndPhaseText;    break;
                }
                if (text) this.showBattlePopup(subject,text);
            }
            if (Imported['ConditionallyChangeSkill'] && BattleManager._costSkill) {
                if (flashText) this.showBattlePopup(subject,flashText);
            }
        }
    };

    var __WBLog_displayCounter = Window_BattleLog.prototype.displayCounter;
    Window_BattleLog.prototype.displayCounter = function(target) {
        __WBLog_displayCounter.call(this, target);
        var text = counterPopup;
        if (text && !Imported['ExtendIntercept']) this.showBattlePopup(target, text);
    };

    var __WBLog_displayReflection = Window_BattleLog.prototype.displayReflection;
    Window_BattleLog.prototype.displayReflection = function(target) {
        __WBLog_displayReflection.call(this, target);
        var text = reflectionPopup;
        if (text && !Imported['ExtendIntercept']) this.showBattlePopup(target, text);
    };

    var __WBLog_displaySubstitute = Window_BattleLog.prototype.displaySubstitute;
    Window_BattleLog.prototype.displaySubstitute = function(substitute, target) {
        __WBLog_displaySubstitute.call(this, substitute, target);
        var text = substitutePopup;
        if (text && !Imported['ExtendIntercept']) this.showBattlePopup(substitute, text);
    };

    var __WBLog_displayAddedStates = Window_BattleLog.prototype.displayAddedStates;
    Window_BattleLog.prototype.displayAddedStates = function(target) {
        __WBLog_displayAddedStates.call(this,target);
        target.result().addedStateObjects().forEach(function(state){
            if (!target.isDeathStateAffected()) {
                var text = state.meta['AddedPopup'];
                if (!text) text = state.meta['付与ポップアップ'];
                if (!text && popupState && state.iconIndex > 0) text = popupState;
                if (text) {
                    text = text.replace(/_name/gi, state.name);
                    text = text.replace(/_icon/gi, '\\I[' + state.iconIndex + ']');
                    this.showBattlePopup(target, text);
                }
            }
        }.bind(this));
    };
    var __WBLog_displayRemovedStates = Window_BattleLog.prototype.displayRemovedStates;
    Window_BattleLog.prototype.displayRemovedStates = function(target) {
        __WBLog_displayRemovedStates.call(this,target);
        target.result().removedStateObjects().forEach(function(state) {
            var text = state.meta['RemovedPopup'];
            if (!text) text = state.meta['解除ポップアップ'];
            if (!text && popupRemoveState && state.iconIndex > 0) text = popupRemoveState;
            if (text) {
                text = text.replace(/_name/gi, state.name);
                text = text.replace(/_icon/gi, '\\I[' + state.iconIndex + ']');
                this.showBattlePopup(target, text);
            }
        }, this);
    };

    var __WBLog_displayChangedBuffs = Window_BattleLog.prototype.displayChangedBuffs;
    Window_BattleLog.prototype.displayChangedBuffs = function(target) {
        __WBLog_displayChangedBuffs.call(this, target);
        if (!target._affectedBuffs) target._affectedBuffs = [];
        if (!target._affectedDebuffs) target._affectedDebuffs = [];
        var result = target.result();
        result.addedBuffs.forEach(function(paramId){
            this.popupChangedBuff(target,buffPopups[paramId],paramId);
        }.bind(this));
        result.addedDebuffs.forEach(function(paramId){
            this.popupChangedBuff(target,debuffPopups[paramId],paramId);
        }.bind(this));
        result.removedBuffs.forEach(function(paramId){
            if (target._affectedBuffs.contains(paramId)) {
                this.popupChangedBuff(target, buffRemovePopups[paramId], paramId);
                var index = target._affectedBuffs.indexOf(paramId);
                target._affectedBuffs.splice(index,1);
            } else if (target._affectedDebuffs.contains(paramId)) {
                this.popupChangedBuff(target, debuffRemovePopups[paramId], paramId);
                var index = target._affectedDebuffs.indexOf(paramId);
                target._affectedDebuffs.splice(index,1);
            }
        }.bind(this));
    };

    Window_BattleLog.prototype.popupChangedBuff = function(target,text,paramId) {
        if (text){
            text = text.replace(/_param/gi,TextManager.param(paramId));
            this.showBattlePopup(target,text);
        }
    };

    var __WBLog_displayCritical = Window_BattleLog.prototype.displayCritical;
    Window_BattleLog.prototype.displayCritical = function(target) {
        __WBLog_displayCritical.call(this, target);
        var text = '';
        if (target.result()._effective > 1.0 && target.result()._effective < 2.0){
            text = effectivePopup;
        } else if (target.result()._effective > 0 && target.result()._effective < 1.0){
            text = notEffectivePopup;
        } else if (target.result()._effective >= 2.0){
            text = veryEffectivePopup;
        } else if (target.result()._effective <= 0){
            text = notValidPopup;
        }
        this._effective = 1.0;
        if (text) this.showBattlePopup(target,text);
        text = '';
        if (target.result().critical) {
            if (target.isActor()) {
                text = criticalPopupE;
            } else {
                text = criticalPopupA;
            }
            if (text) this.showBattlePopup(target,text);
        }
    };

    var __WBLog_displayEvasion = Window_BattleLog.prototype.displayEvasion;
    Window_BattleLog.prototype.displayEvasion = function(target) {
        __WBLog_displayEvasion.call(this, target);
        var text = '';
        if (target.result().physical) {
            text = evasionPopupP;
        } else {
            text = evasionPopupM;
        }
        if (text) this.showBattlePopup(target, text);
    };

    var __WBLog_displayCurrentState = Window_BattleLog.prototype.displayCurrentState;
    Window_BattleLog.prototype.displayCurrentState = function(subject) {
        __WBLog_displayCurrentState.call(this, subject);
        subject.result()._continuationPopup.forEach(function(text){
            this.showBattlePopup(subject, text);
        }.bind(this));
    };

    Window_BattleLog.prototype.showBattlePopup = function(target,text,extend){
        if (target) target._lastPopupFrame = Graphics.frameCount;
        if (text === 'null') return;
        this.updatePopupSubIndex();
        var x = 0;
        var y = 0;
        var ary = text.split(',');
        var count = target ? showCount : bigPopupCount;
        text = '';
        var pattern = target ? popupPattern : bigPopupPattern;
        var backPicture = target ? popupBackPicture : bigPopupBackPicture;
        var fontSize = popupSize;
        var battler = null;
        var delay = 0;
        if (extend) {
            for (var key in extend){
                switch(key) {
                    case 'text':    text = extend[key];        break;
                    case 'pattern': pattern = extend[key];     break;
                    case 'size':    fontSize = extend[key];    break;
                    case 'back':    backPicture = extend[key]; break;
                    case 'count':   count = extend[key];       break;
                    case 'delay':   delay = extend[key];       break;
                }
            }
        }
        ary.forEach(function(str){
            if (/(.+?):(.+)?/.exec(str)) {
                switch (RegExp.$1) {
                    case 'text':    text = RegExp.$2;                break;
                    case 'pattern': pattern = RegExp.$2;             break;
                    case 'size':    fontSize = Number(RegExp.$2);    break;
                    case 'back':    backPicture = String(RegExp.$2); break;
                    case 'count':   count = Number(RegExp.$2);       break;
                    case 'delay':   delay = Number(RegExp.$2);       break;
                }
            } else {
                text = str;
            }
        }.bind(this));

        if (backPicture === 'null') backPicture = '';
        if (target) {
            if (!target.result()._sIndex) target.result()._sIndex = 0;
            if (target.isActor()) {
                battler = BattleManager._spriteset._actorSprites[target.index()];
                var sprite = battler._mainSprite;
                x = sprite.width * (0.5 - showAnchorX) + target.popupOffsetX();
                y = -(sprite.height * (1.0 - showAnchorY)) - (fontSize + 4) + target.popupOffsetY();
            } else {
                battler = BattleManager._spriteset._enemySprites.filter(function (e) {
                    return e._battler === target
                })[0];
                x = battler.width * (0.5 - showAnchorX) + target.popupOffsetX();
                y = -(battler.height * battler.scale.y * (1.0 - showAnchorY)) - (fontSize + 4) + target.popupOffsetY();
            }
            this.stackCommonPopup(x,y,text,pattern,target.result()._sIndex, fontSize, backPicture,count,battler,delay);
            target.result()._sIndex++;
        } else {
            x = Graphics.boxWidth / 2;
            y = Graphics.boxHeight / 2 - fontSize / 2;
            this.stackCommonPopup( x, y, text, pattern, 0, fontSize, backPicture,count,battler,delay);
        }
    };

    Window_BattleLog.prototype.stackCommonPopup = function(x,y,text,pattern,sIndex,fontSize,backPicture,count,battler,delay) {
        if (!this._popupStacks) this._popupStacks = [];
        if (backPicture) ImageManager.loadPicture(backPicture);
        text.replace(/\\SG\[(.+?)\]/gi,function(){
            ImageManager.loadPicture(arguments[1]);
            return arguments[0];
        }.bind(this));
        this._popupStacks.push([x,y,text,pattern,sIndex,fontSize,backPicture,count,false,battler,delay]);
    };

    Window_BattleLog.prototype.executeBattlePopups = function() {
        this._popupStacks.forEach(function(s) {
            CommonPopupManager.showCommonPopup(s[0],s[1],s[2],s[3],s[4],s[5],s[6],s[7],s[8],s[9],s[10]);
        }.bind(this));
        this._popupStacks = [];
    };

    var __WBLog_displayDamage = Window_BattleLog.prototype.displayDamage;
    Window_BattleLog.prototype.displayDamage = function(target){
        if (Imported['ChainInvokeSkill'] && $gameTemp._mbGo && magicBurstText) {
            this.showBattlePopup(target,magicBurstText);
        }
        if (Imported['HitandEvaFormula'] && Imported['HitandEvaFormula'] >= 1.01) {
            if (hitText && target.result()._hitCount && target.result()._hitCount > 1) {
                var cnt = target.result()._hitCount;
                cnt = String(cnt).replace(/[A-Za-z0-9]/g, function(s) {
                    return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
                });
                var text = hitText.replace(/_cnt/,cnt);
                this.showBattlePopup(target,text);
            }
        }
        __WBLog_displayDamage.call(this, target);
    };


    var __WBattleLog_displayFailure = Window_BattleLog.prototype.displayFailure;
    Window_BattleLog.prototype.displayFailure = function(target){
        if (Imported['Learning'] && PluginManager.parameters('Learning')['Learning Skill Shared'] !== 'true') {
            if ($gameTemp._learnings && $gameTemp._learnings.length > 0){
                var length = $gameTemp._learnings.length;
                for (var i=0;i<length;i++){
                    var l = $gameTemp._learnings[i];
                    if (l[0] && l[1]) {
                        var lt = learningText;
                        if (l[1].popup) lt = l[1].popup;
                        //this.showBattlePopup(l[0], $dataSkills[l[1].skill].name);
                        this.showBattlePopup(l[0], lt);
                    }
                }
            }
        }
        __WBattleLog_displayFailure.call(this,target);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    CommonPopupManager.showCommonPopup = function (x, y, text, pattern, sIndex, fontSize, backPicture, count, fixed, battler, delay) {
        var fontColor = 0;
        var oneHeight = (fontSize + 8);
        var height = oneHeight;
        var n = 0;
        var m = 0;
        var backDelay = 0;
        var sy = sIndex * (fontSize + successionOffsetY);
        delay = delay ? delay : 0;
        y -= sy;
        text = this.window().convertEscapeCharacters(text);
        var ox = 0;
        var stext = text.replace(/\x1bC\[\d+\]/gi, '');
        stext = stext.replace(/\\C\[\d+\]/gi, '');
        stext = stext.replace(/\x1bI\[\d+\]/gi,'あ');
        stext = stext.replace(/\x1bSG\[(.+?)\]/gi,function() {
            var name = arguments[1];
            var bitmap = ImageManager.loadPicture(name);
            ox += bitmap.width;
            return '';
        }.bind(this));
        var textSize = stext.length;
        this.window().contents.fontSize = fontSize;
        var totalWidth = this.window().textWidth(stext) + ox;
        var bitmap = null;
        if(backPicture) {
            bitmap = ImageManager.loadPicture(backPicture);
            var arg = CommonPopupManager.setPopup([]);
            arg.bitmap = bitmap;
            var w = arg.bitmap.width;
            var h = arg.bitmap.height;
            arg.x = x - w / 2;
            arg.y = y + height / 2;// - arg.bitmap.height/2;
            arg.moveX = 0;
            arg.moveY = 0;
            arg.anchorX = 0;
            arg.anchorY = 1.0;
            arg.delay = sIndex * popupDelay + delay;
            arg.fixed = fixed ? true : false;
            arg.pattern = popupPatternBack;
            arg.count = textSize * 2 + count + 10;
            arg.extend = [20, arg.count - 10];
            //arg.y += h * arg.anchorY;
            arg.x += w * arg.anchorX;
            arg.y += arg.anchorY * h / 2;
            arg.battler = battler;
            backDelay = 10;
            this._lastIndex =this._tempCommonSprites.setNullPos(arg);
        }
        text = text.replace(/\x1b/g,'\\');
        for (var i = 0, max = text.length; i < max; i++) {
            var char = text[i];
            var flag = false;
            var offsetX = 0;
            var offsetY = 0;
            if (char === '\\') {
                var code = text[i];
                for (var j = i; j < max; j++) {
                    code += text[j];
                    if (text[j] === ']') {
                        if (code.match(/\\C\[(\d+)\]/gi)) {
                            fontColor = RegExp.$1;
                            flag = true;
                        }
                        i = j;
                        char = code;
                        break;
                    }
                }
                if (flag) continue;
            }
            char = char.replace(/\\\\/g,'\\');
            var bitmap = null;
            var oy = 0;
            var ooy = 0;
            this.window().contents.fontSize = fontSize;
            var width = this.window().textWidth(char);
            if (/\\I\[\d+\]/i.exec(char)){
                width = fontSize + 2;
                offsetY = 0;
                offsetX = -2;
                ooy = (28 - fontSize) / 2;
            }
            if (/\\SG\[(.+)\]/i.exec(char)){
                bitmap = ImageManager.loadPicture(RegExp.$1);
                this.window().contents = bitmap;
                width = bitmap.width;
                height = bitmap.height;
            } else {
                height = oneHeight;
                bitmap = new Bitmap(width + 8, height);
                oy = (fontSize - this.window().standardFontSize()) / 2 + 2 + ooy;
                var tx = '\\FS[' + fontSize + ']' + '\\C[' + fontColor + ']' + char;
                this.window().contents = bitmap;
                this.window().drawTextEx(tx, 4, oy);
            }
            var arg = this.setPopup([]);
            arg.bitmap = bitmap;
            arg.x = x + n - (totalWidth / 2) + offsetX;
            arg.y = y + offsetY - 1;
            arg.moveX = 0;
            arg.moveY = 0;
            arg.anchorX = 0;
            arg.anchorY = 0;
            arg.delay = 2 * m + sIndex * popupDelay + backDelay + delay;
            arg.fixed = fixed ? true : false;
            if (pattern === 0){
                arg.moveY = -24;
                arg.y += 24;
            } else if (pattern === -1){
                arg.anchorX = 0.5;
            } else {
                arg.anchorY = 1.0;
            }
            arg.y += height * arg.anchorY;
            arg.x += width * arg.anchorX;
            arg.pattern = pattern;
            arg.count = count;
            arg.battler = battler;
            arg.extend = [20, arg.count - 10];
            this._lastIndex = this._tempCommonSprites.setNullPos(arg);
            n += width;
            m++;
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());