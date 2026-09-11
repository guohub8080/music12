# scale-modes 补全研究底稿(2026-09-11)

> 用户指令「乐理知识先搜索保存」的落盘。来源与查证记录,新增调式的命名依据全在这里。
> 动手结论:A1+A2 共 14 形可入表;blues 与 DH VII 因同度双音缓行(见「可表达边界」)。

## 一、来源

1. **Wikipedia「List of musical scales and modes」**(整数记谱,0-11 半音):
   - Altered/Super Locrian = (0,1,3,4,6,8,10)
   - Neapolitan major = (0,1,3,5,7,9,11);Neapolitan minor = (0,1,3,5,7,8,11)
   - Hungarian major = (0,3,4,6,7,9,10)
   - Lydian diminished = (0,2,3,6,7,9,11)(= 和声大调 IV 级)
   - Major Locrian = (0,2,4,5,6,8,10);Enigmatic = (0,1,4,6,8,10,11)
2. **和声大调七调式名**(Solfege 文档 + jazz-guitar-licks.com 交叉确认):
   I Ionian♭6(已有) / II Dorian♭5 / III Phrygian♭4 / IV Lydian♭3(即 Lydian diminished) /
   V Mixolydian♭2 / VI Lydian augmented♯2 / VII Locrian♭♭7
3. **双重和声七调式名**(Wikipedia「Double harmonic scale」mode 表):
   I Double harmonic major(已有) / II Lydian♯2♯6 / III Ultraphrygian(= Ultralocrian♮5,
   Phrygian♭4♭♭7) / IV Hungarian minor(已有) / V Oriental(已有) /
   VI Ionian♯2♯5(已有) / VII Locrian♮3♭♭7 ← 缓行(同度双音)

## 二、家族调式推导(父音阶 offsets 旋转,脚本算出+人工对拍)

| 调式 | 键 | offsets(根音外半音) | 度数写法 | 特殊音程 |
|---|---|---|---|---|
| mm V | MIXOLYDIAN_FLAT6 | 2,4,5,7,8,10 | 1 2 3 4 5 ♭6 ♭7 | — |
| mm VII | ALTERED | 1,3,4,6,8,10 | 1 ♭2 ♭3 ♭4 ♭5 ♭6 ♭7 | dim4 |
| hm VII | ULTRA_LOCRIAN | 1,3,4,6,8,9 | 1 ♭2 ♭3 ♭4 ♭5 ♭6 ♭♭7 | dim4+dim7 |
| hM II | DORIAN_FLAT5 | 2,3,5,6,9,10 | 1 2 ♭3 4 ♭5 6 ♭7 | — |
| hM III | PHRYGIAN_FLAT4 | 1,3,4,7,8,10 | 1 ♭2 ♭3 ♭4 5 ♭6 ♭7 | dim4 |
| hM IV | LYDIAN_FLAT3 | 2,3,6,7,9,11 | 1 2 ♭3 ♯4 5 6 7 | aug4 |
| hM V | MIXOLYDIAN_FLAT2 | 1,4,5,7,9,10 | 1 ♭2 3 4 5 6 ♭7 | — |
| hM VI | LYDIAN_AUGMENTED_SHARP2 | 3,4,6,8,9,11 | 1 ♯2 3 ♯4 ♯5 6 7 | aug2+aug4+aug5 |
| hM VII | LOCRIAN_DOUBLE_FLAT7 | 1,3,5,6,8,9 | 1 ♭2 ♭3 4 ♭5 ♭6 ♭♭7 | dim7 |
| DH II | LYDIAN_SHARP2_SHARP6 | 3,4,6,7,10,11 | 1 ♯2 3 ♯4 5 ♯6 7 | aug2+aug4+aug6 |
| DH III | ULTRAPHRYGIAN | 1,3,4,7,8,9 | 1 ♭2 ♭3 ♭4 5 ♭6 ♭♭7 | dim4+dim7 |
| 独立 | NEAPOLITAN_MAJOR | 1,3,5,7,9,11 | 1 ♭2 ♭3 4 5 6 7 | — |
| 独立 | NEAPOLITAN_MINOR | 1,3,5,7,8,11 | 1 ♭2 ♭3 4 5 ♭6 7 | — |
| 独立 | HUNGARIAN_MAJOR | 3,4,6,7,9,10 | 1 ♯2 3 ♯4 5 6 ♭7 | aug2+aug4 |

mm=旋律小调 hm=和声小调 hM=和声大调 DH=双重和声。父推导例:hM=C D E F G A♭ B,
VII 级从 B 旋转 = B C D E F G A♭ → {1,3,5,6,8,9}。

## 三、度数槽表达约束(6 槽单音模型的可表达边界)

intervalList 是 6 槽(2~7 度)每槽一音。offset→槽的映射区间:

```
slot2: 1=min2  2=maj2  3=aug2      slot5: 6=dim5  7=p5   8=aug5
slot3: 3=min3  4=maj3              slot6: 8=min6  9=maj6 10=aug6
slot4: 4=dim4  5=p4    6=aug4      slot7: 9=dim7 10=min7 11=maj7
```

歧义 offset(可落两槽)由贪心消歧:offset 升序、每个取最低可用槽,恰好唯一解的才可表达。

**同度双音形(不可表达,缓行清单)**:
- blues 六声 {3,5,6,7,10}:5 槽里 ♭5(6) 与 ♮5(7) 并存——蓝调音的本质就是同度双音,
  与 special-sets 的「分叉三和弦 ♭3·♮3」同构。需 6 槽模型升级数组槽(scoreDisplay 先例)
  或走 set 通道。minor pentatonic(=YU 羽调式)已覆盖其可表达核心。
- DH VII Locrian♮3♭♭7 {1,2,5,6,8,9}:♭2(1) 与 ♮2(2) 并存,同款问题。
- bebop 八声(0,2,4,5,7,9,10,11):♭7 与 ♮7 并存且 8 音>7 槽,双重不可表达。

## 四、intervals 表可行性(已验证)

39 条里 dim4=4 / dim7=9 / aug6=10 / aug2=3 全部在册;compileStaticData 的 gap()
动态查表,`["dim",4]` 等写法零改动直接可用。

## 五、B 项设计(已批准)

- **tags**:json5 源手写(家族+用途),编译透传;src 侧新增 getScaleModeByTags
  (镜像 getChordFormulaByTags)
- **forte**:推导脚本算素数形对照 Wikipedia Forte 表(上午查证管线)后写死进源,
  与 special-sets 的「查证后落源」一致;60 键全回填(五声也有编号,如 GONG=5-23系)
- **sameShapeAs**:编译时自动算(46 键→29 形的分组,组内源顺序首个为 canonical,
  其余 emit sameShapeAs);源保持极简不动
- **type 编译断言**:七声(无 null)必须有 3 度且 type↔3 度半音匹配
  (major=4/minor=3/halfdim7=3+6+10);五声缺 3 度者(商/徵)跳过
