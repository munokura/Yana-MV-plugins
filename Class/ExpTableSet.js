//
//  経験値テーブル設定 ver1.00
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
Imported['ExpTableSet'] = 1.00;
/*:
@plugindesc ver1.00/Experience tables can now be set individually.
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Class/ExpTableSet.js
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/Yana-MV-plugins ).
Original plugin by Yana.
-----
------------------------------------------------------
There is no plugin command.
------------------------------------------------------
------------------------------------------------------
How to Set Up
------------------------------------------------------

Entering
<ExpTable:x>
in the Note field of a job will change the job's EXP table to table x.

Experience points are the values required to reach the next level, separated by commas, in groups of 10.

------------------------------------------------------
Terms of Use
------------------------------------------------------
This plugin is released under the MIT License.
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
Update History:
ver1.00:
Released

@param Table Key
@text Notetag Key
@desc This is the regular expression used for reading. There is no need to change it unless you have a specific reason.
@default <ExpTable:(\d+)>

@param Table1
@text Table 1

@param Table1-0
@text Table 1-0
@desc Table 1, Next from Level 1 to 9. Please specify 0 for 0th and 1st.
@default 0,0,10,20,30,50,100,200,300,500
@parent Table1

@param Table1-1
@text Table 1-1
@desc Table 1, Next from Level 10 to 19.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-2
@text Table 1-2
@desc Table 1, Next from level 20 to 29.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-3
@text Table 1-3
@desc Table 1, Next from level 30 to 39.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-4
@text Table 1-4
@desc Table 1, Next from level 40 to 49.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-5
@text Table 1-5
@desc Table 1, Next from level 50 to 59.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-6
@text Table 1-6
@desc Table 1, Next from level 60 to 69.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-7
@text Table 1-7
@desc Table 1, Next from level 70 to 79.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-8
@text Table 1-8
@desc Table 1, Next from level 80 to 89.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-9
@text Table 1-9
@desc Table 1, Next from level 90 to 99.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table2
@text Table 2

@param Table2-0
@text Table 2-0
@desc Table 2, Next from Level 1 to 9. Please specify 0 for 0th and 1st.
@default 0,0,10,20,30,50,100,200,300,500
@parent Table2

@param Table2-1
@text Table 2-1
@desc Table 2, Next from Level 10 to 19.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-2
@text Table 2-2
@desc Table 2, Next from level 20 to 29.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-3
@text Table 2-3
@desc Table 2, Next from level 30 to 39.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-4
@text Table 2-4
@desc Table 2, Next from level 40 to 49.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-5
@text Table 2-5
@desc Table 2, Next from level 50 to 59.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-6
@text Table 2-6
@desc Table 1, Next from level 60 to 69.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-7
@text Table 2-7
@desc Table 1, Next from level 70 to 79.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-8
@text Table 2-8
@desc Table 2, Next from level 80 to 89.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-9
@text Table 2-9
@desc Table 2, Next from level 90 to 99.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table3
@text Table 3

@param Table3-0
@text Table 3-0
@desc Table 3, Next from Level 1 to 9. Please specify 0 for 0th and 1st.
@default 0,0,10,20,30,50,100,200,300,500
@parent Table3

@param Table3-1
@text Table 3-1
@desc Table 3, Next from Level 10 to 19.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-2
@text Table 3-2
@desc Table 3, Next from level 20 to 29.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-3
@text Table 3-3
@desc Table 3, Next from level 30 to 39.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-4
@text Table 3-4
@desc Table 3, Next from level 40 to 49.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-5
@text Table 3-5
@desc Table 3, Next from level 50 to 59.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-6
@text Table 3-6
@desc Table 3, Next from level 60 to 69.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-7
@text Table 3-7
@desc Table 3, Next from level 70 to 79.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-8
@text Table 3-8
@desc Table 3, Next from level 80 to 89.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-9
@text Table 3-9
@desc Table 3, Next from level 90 to 99.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table4
@text Table 4

@param Table4-0
@text Table 4-0
@desc Table 4, Next for levels 1 to 9. Please specify 0 for 0th and 1st.
@default 0,0,10,20,30,50,100,200,300,500
@parent Table4

@param Table4-1
@text Table 4-1
@desc Table 4, Next from Level 10 to 19.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-2
@text Table 4-2
@desc Table 4, Next from level 20 to 29.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-3
@text Table 4-3
@desc Table 4, Next from Level 30 to 39.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-4
@text Table 4-4
@desc Table 4, Next from Level 40 to 49.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-5
@text Table 4-5
@desc Table 4, Next from level 50 to 59.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-6
@text Table 4-6
@desc Table 4, Next from level 60 to 69.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-7
@text Table 4-7
@desc Table 4, Next from level 70 to 79.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-8
@text Table 4-8
@desc Table 4, Next from level 80 to 89.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-9
@text Table 4-9
@desc Table 4, Next from level 90 to 99.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table5
@text Table 5

@param Table5-0
@text Table 5-0
@desc Table 5, Next for levels 1 to 9. Please specify 0 for 0th and 1st.
@default 0,0,10,20,30,50,100,200,300,500
@parent Table5

@param Table5-1
@text Table 5-1
@desc Table 5, Next from Level 10 to 19.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-2
@text Table 5-2
@desc Table 5, Next from level 20 to 29.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-3
@text Table 5-3
@desc Table 5, Next from Level 30 to 39.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-4
@text Table 5-4
@desc Table 5, Next from level 40 to 49.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-5
@text Table 5-5
@desc Table 5, Next from level 50 to 59.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-6
@text Table 5-6
@desc Table 5, Next from level 60 to 69.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-7
@text Table 5-7
@desc Table 5, Next from level 70 to 79.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-8
@text Table 5-8
@desc Table 5, Next from level 80 to 89.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-9
@text Table 5-9
@desc Table 5, Next from level 90 to 99.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table6
@text Table 6

@param Table6-0
@text Table 6-0
@desc Table 6, Next for levels 1 to 9. Please specify 0 for 0th and 1st.
@default 0,0,10,20,30,50,100,200,300,500
@parent Table6

@param Table6-1
@text Table 6-1
@desc Table 6, Next from Level 10 to 19.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-2
@text Table 6-2
@desc Table 6, Next from level 20 to 29.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-3
@text Table 6-3
@desc Table 6, Next from Level 30 to 39.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-4
@text Table 6-4
@desc Table 6, Next from level 40 to 49.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-5
@text Table 6-5
@desc Table 6, Next from level 50 to 59.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-6
@text Table 6-6
@desc Table 6, Next from level 60 to 69.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-7
@text Table 6-7
@desc Table 6, Next from level 70 to 79.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-8
@text Table 6-8
@desc Table 6, Next from level 80 to 89.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-9
@text Table 6-9
@desc Table 6, Next from level 90 to 99.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table7
@text Table 7

@param Table7-0
@text Table 7-0
@desc Table 7, Next for Level 1 to 9. Please specify 0 for 0th and 1st.
@default 0,0,10,20,30,50,100,200,300,500
@parent Table7

@param Table7-1
@text Table 7-1
@desc Table 7, Next from Level 10 to 19.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-2
@text Table 7-2
@desc Table 7, Next from level 20 to 29.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-3
@text Table 7-3
@desc Table 7, Next from Level 30 to 39.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-4
@text Table 7-4
@desc Table 7, Next from Level 40 to 49.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-5
@text Table 7-5
@desc Table 7, Next from level 50 to 59.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-6
@text Table 7-6
@desc Table 7, Next from level 60 to 69.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-7
@text Table 7-7
@desc Table 7, Next from level 70 to 79.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-8
@text Table 7-8
@desc Table 7, Next from level 80 to 89.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-9
@text Table 7-9
@desc Table 7, Next from Level 90 to 99.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table8
@text Table 8

@param Table8-0
@text Table 8-0
@desc Table 8, Next for levels 1 to 9. Please specify 0 for 0th and 1st.
@default 0,0,10,20,30,50,100,200,300,500
@parent Table8

@param Table8-1
@text Table 8-1
@desc Table 8, Next from Level 10 to 19.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-2
@text Table 8-2
@desc Table 8, Next from level 20 to 29.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-3
@text Table 8-3
@desc Table 8, Next from Level 30 to 39.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-4
@text Table 8-4
@desc Table 8, Next from level 40 to 49.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-5
@text Table 8-5
@desc Table 8, Next from level 50 to 59.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-6
@text Table 8-6
@desc Table 8, Next from level 60 to 69.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-7
@text Table 8-7
@desc Table 8, Next from level 70 to 79.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-8
@text Table 8-8
@desc Table 8, Next from level 80 to 89.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-9
@text Table 8-9
@desc Table 8, Next from Level 90 to 99.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table9
@text Table 9

@param Table9-0
@text Table 9-0
@desc Table 9, Next from Level 1 to 9. Please specify 0 for 0th and 1st.
@default 0,0,10,20,30,50,100,200,300,500
@parent Table9

@param Table9-1
@text Table 9-1
@desc Table 9, Next from Level 10 to 19.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-2
@text Table 9-2
@desc Table 9, Next from Level 20 to 29.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-3
@text Table 9-3
@desc Table 9, Next from Level 30 to 39.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-4
@text Table 9-4
@desc Table 9, Next from Level 40 to 49.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-5
@text Table 9-5
@desc Table 9, Next from level 50 to 59.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-6
@text Table 9-6
@desc Table 9, Next from level 60 to 69.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-7
@text Table 9-7
@desc Table 9, Next from level 70 to 79.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-8
@text Table 9-8
@desc Table 9, Next from level 80 to 89.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-9
@text Table 9-9
@desc Table 9, Next from Level 90 to 99.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table10
@text Table 10

@param Table10-0
@text Table 10-0
@desc Table 5, Next for levels 1 to 9. Please specify 0 for 0th and 1st.
@default 0,0,10,20,30,50,100,200,300,500
@parent Table10

@param Table10-1
@text Table 10-1
@desc Table 10, Next from Level 10 to 19.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-2
@text Table 10-2
@desc Table 10, Next from Level 20 to 29.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-3
@text Table 10-3
@desc Table 10, Next from Level 30 to 39.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-4
@text Table 10-4
@desc Table 10, Next from Level 40 to 49.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-5
@text Table 10-5
@desc Table 10, Next from level 50 to 59.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-6
@text Table 10-6
@desc Table 10, Next from level 60 to 69.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-7
@text Table 10-7
@desc Table 10, Next from level 70 to 79.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-8
@text Table 10-8
@desc Table 10, Next from level 80 to 89.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-9
@text Table 10-9
@desc Table 10, Next from level 90 to 99.
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10
*/


/*:ja
@plugindesc ver1.00/経験値テーブルを個別に設定できるようにします。
@author Yana
@url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Class/ExpTableSet.js

@help
------------------------------------------------------
 プラグインコマンドはありません。
------------------------------------------------------
------------------------------------------------------
設定方法
------------------------------------------------------

職業のメモ欄に
<経験値テーブル:x>
と記述すると、その職業の経験値テーブルをx番のテーブルに変更します。

経験値は次のレベルまでに必要な値をカンマ区切りで10項目ずつ並べてください。

------------------------------------------------------
利用規約
------------------------------------------------------
当プラグインはMITライセンスで公開されています。
http://opensource.org/licenses/mit-license.php
------------------------------------------------------
更新履歴:
ver1.00:
公開

@param Table Key
@text メモタグキー
@desc 読み取りに使う正規表現です。 特に理由がない限り、変更する必要はありません。
@default <経験値テーブル:(\d+)>

@param Table1
@text テーブル1

@param Table1-0
@text テーブル1-0
@desc テーブル1、Lv1から9のNextです。 0番目と1番目は0を指定してください。
@default 0,0,10,20,30,50,100,200,300,500
@parent Table1

@param Table1-1
@text テーブル1-1
@desc テーブル1、Lv10から19のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-2
@text テーブル1-2
@desc テーブル1、Lv20から29のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-3
@text テーブル1-3
@desc テーブル1、Lv30から39のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-4
@text テーブル1-4
@desc テーブル1、Lv40から49のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-5
@text テーブル1-5
@desc テーブル1、Lv50から59のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-6
@text テーブル1-6
@desc テーブル1、Lv60から69のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-7
@text テーブル1-7
@desc テーブル1、Lv70から79のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-8
@text テーブル1-8
@desc テーブル1、Lv80から89のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table1-9
@text テーブル1-9
@desc テーブル1、Lv90から99のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table1

@param Table2
@text テーブル2

@param Table2-0
@text テーブル2-0
@desc テーブル2、Lv1から9のNextです。 0番目と1番目は0を指定してください。
@default 0,0,10,20,30,50,100,200,300,500
@parent Table2

@param Table2-1
@text テーブル2-1
@desc テーブル2、Lv10から19のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-2
@text テーブル2-2
@desc テーブル2、Lv20から29のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-3
@text テーブル2-3
@desc テーブル2、Lv30から39のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-4
@text テーブル2-4
@desc テーブル2、Lv40から49のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-5
@text テーブル2-5
@desc テーブル2、Lv50から59のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-6
@text テーブル2-6
@desc テーブル1、Lv60から69のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-7
@text テーブル2-7
@desc テーブル1、Lv70から79のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-8
@text テーブル2-8
@desc テーブル2、Lv80から89のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table2-9
@text テーブル2-9
@desc テーブル2、Lv90から99のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table2

@param Table3
@text テーブル3

@param Table3-0
@text テーブル3-0
@desc テーブル3、Lv1から9のNextです。 0番目と1番目は0を指定してください。
@default 0,0,10,20,30,50,100,200,300,500
@parent Table3

@param Table3-1
@text テーブル3-1
@desc テーブル3、Lv10から19のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-2
@text テーブル3-2
@desc テーブル3、Lv20から29のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-3
@text テーブル3-3
@desc テーブル3、Lv30から39のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-4
@text テーブル3-4
@desc テーブル3、Lv40から49のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-5
@text テーブル3-5
@desc テーブル3、Lv50から59のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-6
@text テーブル3-6
@desc テーブル3、Lv60から69のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-7
@text テーブル3-7
@desc テーブル3、Lv70から79のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-8
@text テーブル3-8
@desc テーブル3、Lv80から89のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table3-9
@text テーブル3-9
@desc テーブル3、Lv90から99のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table3

@param Table4
@text テーブル4

@param Table4-0
@text テーブル4-0
@desc テーブル4、Lv1から9のNextです。 0番目と1番目は0を指定してください。
@default 0,0,10,20,30,50,100,200,300,500
@parent Table4

@param Table4-1
@text テーブル4-1
@desc テーブル4、Lv10から19のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-2
@text テーブル4-2
@desc テーブル4、Lv20から29のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-3
@text テーブル4-3
@desc テーブル4、Lv30から39のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-4
@text テーブル4-4
@desc テーブル4、Lv40から49のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-5
@text テーブル4-5
@desc テーブル4、Lv50から59のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-6
@text テーブル4-6
@desc テーブル4、Lv60から69のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-7
@text テーブル4-7
@desc テーブル4、Lv70から79のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-8
@text テーブル4-8
@desc テーブル4、Lv80から89のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table4-9
@text テーブル4-9
@desc テーブル4、Lv90から99のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table4

@param Table5
@text テーブル5

@param Table5-0
@text テーブル5-0
@desc テーブル5、Lv1から9のNextです。 0番目と1番目は0を指定してください。
@default 0,0,10,20,30,50,100,200,300,500
@parent Table5

@param Table5-1
@text テーブル5-1
@desc テーブル5、Lv10から19のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-2
@text テーブル5-2
@desc テーブル5、Lv20から29のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-3
@text テーブル5-3
@desc テーブル5、Lv30から39のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-4
@text テーブル5-4
@desc テーブル5、Lv40から49のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-5
@text テーブル5-5
@desc テーブル5、Lv50から59のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-6
@text テーブル5-6
@desc テーブル5、Lv60から69のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-7
@text テーブル5-7
@desc テーブル5、Lv70から79のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-8
@text テーブル5-8
@desc テーブル5、Lv80から89のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table5-9
@text テーブル5-9
@desc テーブル5、Lv90から99のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table5

@param Table6
@text テーブル6

@param Table6-0
@text テーブル6-0
@desc テーブル6、Lv1から9のNextです。 0番目と1番目は0を指定してください。
@default 0,0,10,20,30,50,100,200,300,500
@parent Table6

@param Table6-1
@text テーブル6-1
@desc テーブル6、Lv10から19のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-2
@text テーブル6-2
@desc テーブル6、Lv20から29のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-3
@text テーブル6-3
@desc テーブル6、Lv30から39のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-4
@text テーブル6-4
@desc テーブル6、Lv40から49のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-5
@text テーブル6-5
@desc テーブル6、Lv50から59のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-6
@text テーブル6-6
@desc テーブル6、Lv60から69のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-7
@text テーブル6-7
@desc テーブル6、Lv70から79のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-8
@text テーブル6-8
@desc テーブル6、Lv80から89のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table6-9
@text テーブル6-9
@desc テーブル6、Lv90から99のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table6

@param Table7
@text テーブル7

@param Table7-0
@text テーブル7-0
@desc テーブル7、Lv1から9のNextです。 0番目と1番目は0を指定してください。
@default 0,0,10,20,30,50,100,200,300,500
@parent Table7

@param Table7-1
@text テーブル7-1
@desc テーブル7、Lv10から19のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-2
@text テーブル7-2
@desc テーブル7、Lv20から29のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-3
@text テーブル7-3
@desc テーブル7、Lv30から39のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-4
@text テーブル7-4
@desc テーブル7、Lv40から49のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-5
@text テーブル7-5
@desc テーブル7、Lv50から59のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-6
@text テーブル7-6
@desc テーブル7、Lv60から69のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-7
@text テーブル7-7
@desc テーブル7、Lv70から79のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-8
@text テーブル7-8
@desc テーブル7、Lv80から89のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table7-9
@text テーブル7-9
@desc テーブル7、Lv90から99のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table7

@param Table8
@text テーブル8

@param Table8-0
@text テーブル8-0
@desc テーブル8、Lv1から9のNextです。 0番目と1番目は0を指定してください。
@default 0,0,10,20,30,50,100,200,300,500
@parent Table8

@param Table8-1
@text テーブル8-1
@desc テーブル8、Lv10から19のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-2
@text テーブル8-2
@desc テーブル8、Lv20から29のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-3
@text テーブル8-3
@desc テーブル8、Lv30から39のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-4
@text テーブル8-4
@desc テーブル8、Lv40から49のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-5
@text テーブル8-5
@desc テーブル8、Lv50から59のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-6
@text テーブル8-6
@desc テーブル8、Lv60から69のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-7
@text テーブル8-7
@desc テーブル8、Lv70から79のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-8
@text テーブル8-8
@desc テーブル8、Lv80から89のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table8-9
@text テーブル8-9
@desc テーブル8、Lv90から99のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table8

@param Table9
@text テーブル9

@param Table9-0
@text テーブル9-0
@desc テーブル9、Lv1から9のNextです。 0番目と1番目は0を指定してください。
@default 0,0,10,20,30,50,100,200,300,500
@parent Table9

@param Table9-1
@text テーブル9-1
@desc テーブル9、Lv10から19のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-2
@text テーブル9-2
@desc テーブル9、Lv20から29のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-3
@text テーブル9-3
@desc テーブル9、Lv30から39のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-4
@text テーブル9-4
@desc テーブル9、Lv40から49のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-5
@text テーブル9-5
@desc テーブル9、Lv50から59のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-6
@text テーブル9-6
@desc テーブル9、Lv60から69のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-7
@text テーブル9-7
@desc テーブル9、Lv70から79のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-8
@text テーブル9-8
@desc テーブル9、Lv80から89のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table9-9
@text テーブル9-9
@desc テーブル9、Lv90から99のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table9

@param Table10
@text テーブル10

@param Table10-0
@text テーブル10-0
@desc テーブル5、Lv1から9のNextです。 0番目と1番目は0を指定してください。
@default 0,0,10,20,30,50,100,200,300,500
@parent Table10

@param Table10-1
@text テーブル10-1
@desc テーブル10、Lv10から19のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-2
@text テーブル10-2
@desc テーブル10、Lv20から29のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-3
@text テーブル10-3
@desc テーブル10、Lv30から39のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-4
@text テーブル10-4
@desc テーブル10、Lv40から49のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-5
@text テーブル10-5
@desc テーブル10、Lv50から59のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-6
@text テーブル10-6
@desc テーブル10、Lv60から69のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-7
@text テーブル10-7
@desc テーブル10、Lv70から79のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-8
@text テーブル10-8
@desc テーブル10、Lv80から89のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10

@param Table10-9
@text テーブル10-9
@desc テーブル10、Lv90から99のNextです。
@default 999,999,999,999,999,999,999,999,999,999
@parent Table10
*/

(function () {

	var parameters = PluginManager.parameters('ExpTableSet');
	var tableKey = RegExp(parameters['Table Key'] || '<経験値テーブル:(\\d+)>');


	function ExpTableManager() {
		throw new Error('This is a static class');
	};

	ExpTableManager.getExpForLevel = function (classObject, level) {
		if (classObject._expTable === undefined) { this.initExpTable(classObject) }
		if (classObject._expTable.length === 0) { return false }
		var exp = classObject._expTable[level];
		if (!exp) { exp = classObject._expTable[classObject._expTable.length] }
		return exp;
	};

	ExpTableManager.initExpTable = function (classObject) {
		classObject._expTable = [];
		if (classObject.note.match(tableKey)) {
			var table = Number(RegExp.$1);
			var text = 'Table' + table;
			for (var i = 0; i < 10; i++) {
				var exps = parameters[text + '-' + i].split(',');
				for (j = 0; j < 10; j++) {
					if (i === 0 && j === 0) {
						classObject._expTable[0] = 0;
						continue;
					}
					classObject._expTable[i * 10 + j] = Number(classObject._expTable[i * 10 + j - 1]) + Number(exps[j]);
				}
			}
		}
	};


	var _ETS_GActor_expForLevel = Game_Actor.prototype.expForLevel;
	Game_Actor.prototype.expForLevel = function (level) {
		var c = this.currentClass();
		if (Imported['VXandAceHybridClass']) { c = this.currentStatusClass() }
		var exp = _ETS_GActor_expForLevel.call(this, level);
		var texp = ExpTableManager.getExpForLevel(c, level);
		if (texp) { exp = texp }
		return exp;
	};

	if (Imported['EnemyClass']) {
		var _ETS_GEnemy_expForLevel = Game_Enemy.prototype.expForLevel;
		Game_Enemy.prototype.expForLevel = function (level) {
			var c = this.enemyClass();
			var exp = _ETS_GEnemy_expForLevel.call(this, level);
			var texp = ExpTableManager.getExpForLevel(c, level);
			if (texp) { exp = texp }
			return exp;
		};
	}
	if (Imported['VXandAceHybridClass']) {
		var _ETS_GActor_abpForLevel = Game_Actor.prototype.abpForLevel;
		Game_Actor.prototype.abpForLevel = function (level) {
			var c = this.currentClass();
			var abp = _ETS_GActor_abpForLevel.call(this, level);
			var tabp = ExpTableManager.getExpForLevel(c, level);
			if (tabp) { abp = tabp }
			return abp;
		};
	}
}());