# 三音哈希表完整报告(C(12,3) = 220)

> 按 tier 分大区:Tier 1(完全命中)在最前 → Tier 6(极端)在最后。
> tier 语义:1=零变换 / 2=纯省略 / 3=自然扩展 / 4=组合变换 / 5=avoid note / 6=双变化
> 来源标注:✋ = 人工裁决钦定(bake-rules.verdicts) / ⚙ = 类型化规则 / 🗑 = 被保留管线过滤(灰显)
> 审核流:看完报告 → 改 ts-dev/raw-static/bake-rules.json5 → 重新 bake
> 生成:`npx tsx ts-dev/decompose/hash3-report.ts`

| tier | 含义 | 键集数 |
|---|---|---|
| ✅1 | 完全命中(零变换) | 76 |
| 🔵2 | 预期省略(纯 omit5/omit11) | 132 |
| 🟢3 | 自然扩展(色彩音/属七变化) | 0 |
| 🟡4 | 组合变换(多重省略+扩展) | 12 |
| 🟠5 | 边缘(avoid note) | 0 |
| 🔴6 | 极端(双变化/多重冲突) | 0 |

# ✅ Tier 1 — 完全命中(零变换)

## C-P-D  `{0,1,2}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **C·半音簇** | — | 0 |

> 🗑 已过滤(保留管线):~~Pmaj7sus2(♭2 omit5) / Pdom7sus2(♯7 ♭2 omit5) / Psus2(♭2 omit5 add7) / Csus2(omit5 add♯1)~~

## C-P-Q  `{0,1,3}`  ✋ verdict(0,1,3) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **C·Phrygian三音** ✋ | — | 0 |
| 🔵2 | **Pmaj7sus2** ✋ | (omit5) | 0 |

> 🗑 已过滤(保留管线):~~Psus2(omit5 add7) / Pdom7sus2(♯7 omit5) / Cdim3(omit5 add♯1) / Cmin3(omit5 add♯1) / Cmin3add9(♭9 omit5) / Pminmaj7(♭3 omit5) …等 14 条~~

## C-P-A  `{0,1,9}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **A·分叉三和弦** | — | 0 |

> 🗑 已过滤(保留管线):~~Amin3(omit5 add3) / Aaug3(omit5 add♯2) / Amaj3(omit5 add♯2) / Amaj3add9(♯9 omit5) / Amin3add11(♭11 omit5)~~

## C-P-B  `{0,1,11}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **B·半音簇** | — | 0 |

> 🗑 已过滤(保留管线):~~Cmaj7sus2(♭2 omit5) / Cdom7sus2(♭2 ♯7 omit5) / Csus2(♭2 omit5 add7) / Bsus2(omit5 add♯1)~~

## C-D-Y  `{0,2,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Ymaj3b5** | — | 0 |
| 🟢3 | **Ddom7sus4** | (♯4 omit5) | 1 |
| 🟡4 | **Csus2** | (♯5) | 1.5 |
| 🟠5 | **Ydim3** | (♯3) | 3 |
| 🟠5 | **Ymaj3** | (♭5) | 3 |
| 🟠5 | **Ymaj3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Dmaj7sus4** | (♭7 ♯4 omit5) | 3 |
| 🟠5 | **Ysus4** | (♭4 ♭5) | 3 |
| 🔴6 | **Dsus4** | (♯4 omit5 add♯6) | 4.5 |
| 🔴6 | **Cmin3** | (♭3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Ymin3(♯3 ♭5)~~

## C-D-B  `{0,2,11}`  ✋ verdict(0,1,3) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **B·Phrygian三音** ✋ | — | 0 |
| 🔵2 | **Cmaj7sus2** ✋ | (omit5) | 0 |

> 🗑 已过滤(保留管线):~~Csus2(omit5 add7) / Cdom7sus2(♯7 omit5) / Bdim3(omit5 add♯1) / Bmin3(omit5 add♯1) / Bmin3add9(♭9 omit5) / Cminmaj7(♭3 omit5) …等 14 条~~

## C-Q-E  `{0,3,4}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **C·分叉三和弦** | — | 0 |

> 🗑 已过滤(保留管线):~~Cmin3(omit5 add3) / Qdom7sus2(♭7 ♭2 omit5) / Caug3(omit5 add♯2) / Cmaj3(omit5 add♯2) / Cmaj3add9(♯9 omit5) / Cmin3add11(♭11 omit5)~~

## C-Q-X  `{0,3,6}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Cdim3** | — | 0 |
| 🔵2 | **Qdim7** | (omit5) | 0 |
| 🔵2 | **Qmin3add6** | (omit5) | 0 |
| 🟢3 | **Qdim3** | (omit5 add6) | 0.5 |
| 🟡4 | **Qdom7** | (♭7 ♭3 omit5) | 2 |
| 🟡4 | **Qdom7sus2** | (♭7 ♯2 omit5) | 2 |
| 🟠5 | **Qhalfdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Qmaj3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Cmaj3b5** | (♭3) | 3 |
| 🟠5 | **Cmin3** | (♭5) | 3 |

> 🗑 已过滤(保留管线):~~Cmin3add11(♯11 omit5) / Qmin7(♭7 omit5) / Csus2(♯2 ♭5) / Qaug3(♯5 ♭3) / Cmaj3(♭3 ♭5) / Cmaj3add11(♭3 ♯11 omit5)~~

## C-Q-Y  `{0,3,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Ymaj3** | — | 0 |
| 🟢3 | **Qdom7sus4** | (♭7 omit5) | 1 |
| 🟡4 | **Ysus4** | (♭4) | 1.5 |
| 🟡4 | **Qdom7** | (♭7 ♯3 omit5) | 2 |
| 🟠5 | **Caug3** | (♭3) | 3 |
| 🟠5 | **Yaug3** | (♭5) | 3 |
| 🟠5 | **Qmaj3add6** | (♯3 omit5) | 3 |
| 🟠5 | **Ymaj3b5** | (♯5) | 3 |
| 🟠5 | **Cmin3** | (♯5) | 3 |
| 🟠5 | **Ymin3** | (♯3) | 3 |

> 🗑 已过滤(保留管线):~~Csus2(♯2 ♯5) / Qaug3(♯5 ♯3) / Cmaj3(♭3 ♯5)~~

## C-Q-A  `{0,3,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Adim3** | — | 0 |
| 🔵2 | **Cdim7** | (omit5) | 0 |
| 🔵2 | **Cmin3add6** | (omit5) | 0 |
| 🟢3 | **Cdim3** | (omit5 add6) | 0.5 |
| 🟡4 | **Qdom7sus4** | (♭7 ♯4 omit5) | 2 |
| 🟠5 | **Chalfdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Cmaj3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Amaj3b5** | (♭3) | 3 |
| 🟠5 | **Amin3** | (♭5) | 3 |
| 🟠5 | **Amin3add11** | (♯11 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Asus2(♯2 ♭5) / Caug3(♭3 ♯5) / Amaj3(♭3 ♭5) / Amaj3add11(♭3 ♯11 omit5)~~

## C-E-X  `{0,4,6}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Cmaj3b5** | — | 0 |
| 🟡4 | **Esus2** | (♯5) | 1.5 |
| 🟠5 | **Cdim3** | (♯3) | 3 |
| 🟠5 | **Cmaj3** | (♭5) | 3 |
| 🟠5 | **Cmaj3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Csus4** | (♭4 ♭5) | 3 |
| 🔴6 | **Edim7** | (♭7 ♭3 omit5) | 6 |
| 🔴6 | **Cmin3** | (♯3 ♭5) | 6 |
| 🔴6 | **Emin3** | (♯5 ♭3) | 6 |
| 🔴6 | **Cmin3add11** | (♯3 ♯11 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Emin3add6(♭6 ♭3 omit5)~~

## C-E-G  `{0,4,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Cmaj3** | — | 0 |
| 🟡4 | **Csus4** | (♭4) | 1.5 |
| 🟠5 | **Caug3** | (♭5) | 3 |
| 🟠5 | **Eaug3** | (♭3) | 3 |
| 🟠5 | **Edim7** | (♭7 omit5) | 3 |
| 🟠5 | **Cmaj3b5** | (♯5) | 3 |
| 🟠5 | **Cmin3** | (♯3) | 3 |
| 🟠5 | **Emin3** | (♯5) | 3 |
| 🟠5 | **Emin3add6** | (♭6 omit5) | 3 |
| 🟠5 | **Esus2** | (♯5 ♯2) | 3 |

> 🗑 已过滤(保留管线):~~Gaug3(♯3 ♯5) / Cdim3(♯3 ♯5) / Emaj3(♯5 ♭3) / Emaj3add6(♭6 ♭3 omit5)~~

## C-E-Y  `{0,4,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Caug3** | — | 0 |
| ✅1 | **Eaug3** | — | 0 |
| ✅1 | **Yaug3** | — | 0 |
| 🟠5 | **Cmaj3** | (♯5) | 3 |
| 🟠5 | **Emaj3** | (♯5) | 3 |
| 🟠5 | **Ymaj3** | (♯5) | 3 |
| 🟠5 | **Emaj3add6** | (♭6 omit5) | 3 |
| 🟠5 | **Csus4** | (♭4 ♯5) | 3 |
| 🟠5 | **Esus4** | (♯5 ♭4) | 3 |
| 🟠5 | **Ysus4** | (♭4 ♯5) | 3 |

> 🗑 已过滤(保留管线):~~Edim7(♭7 ♯3 omit5) / Cmin3(♯3 ♯5) / Emin3(♯5 ♯3) / Ymin3(♯3 ♯5) / Emin3add6(♭6 ♯3 omit5)~~

## C-F-A  `{0,5,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Fmaj3** | — | 0 |
| 🟡4 | **Fsus4** | (♭4) | 1.5 |
| 🟠5 | **Faug3** | (♭5) | 3 |
| 🟠5 | **Aaug3** | (♭3) | 3 |
| 🟠5 | **Cmaj3add6** | (♯3 omit5) | 3 |
| 🟠5 | **Fmaj3b5** | (♯5) | 3 |
| 🟠5 | **Fmin3** | (♯3) | 3 |
| 🟠5 | **Amin3** | (♯5) | 3 |
| 🟠5 | **Asus2** | (♯2 ♯5) | 3 |
| 🔴6 | **Caug3** | (♯3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Fdim3(♯5 ♯3) / Amaj3(♭3 ♯5)~~

## C-X-A  `{0,6,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Xdim3** | — | 0 |
| 🔵2 | **Adim7** | (omit5) | 0 |
| 🔵2 | **Amin3add6** | (omit5) | 0 |
| 🟢3 | **Adim3** | (omit5 add6) | 0.5 |
| 🟠5 | **Ahalfdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Amaj3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Xmaj3b5** | (♭3) | 3 |
| 🟠5 | **Xmin3** | (♭5) | 3 |
| 🟠5 | **Xsus2** | (♭5 ♯2) | 3 |
| 🔴6 | **Aaug3** | (♭3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Xmaj3(♭5 ♭3)~~

## C-X-Z  `{0,6,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Xmaj3b5** | — | 0 |
| 🟢3 | **Cdom7sus4** | (♯4 omit5) | 1 |
| 🟡4 | **Zsus2** | (♯5) | 1.5 |
| 🟠5 | **Xdim3** | (♯3) | 3 |
| 🟠5 | **Xmaj3** | (♭5) | 3 |
| 🟠5 | **Cmaj7sus4** | (♯4 ♭7 omit5) | 3 |
| 🟠5 | **Xsus4** | (♭5 ♭4) | 3 |
| 🔴6 | **Csus4** | (♯4 omit5 add♯6) | 4.5 |
| 🔴6 | **Xmin3** | (♭5 ♯3) | 6 |
| 🔴6 | **Zmin3** | (♭3 ♯5) | 6 |

## C-Y-B  `{0,8,11}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Y·分叉三和弦** | — | 0 |

> 🗑 已过滤(保留管线):~~Ymin3(omit5 add3) / Yaug3(omit5 add♯2) / Ymaj3(omit5 add♯2) / Ymaj3add9(♯9 omit5) / Ymin3add11(♭11 omit5) / Ysus4(♭4 omit5 add♯2)~~

## C-A-Z  `{0,9,10}`  ✋ verdict(0,1,3) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **A·Phrygian三音** ✋ | — | 0 |
| 🔵2 | **Zmaj7sus2** ✋ | (omit5) | 0 |

> 🗑 已过滤(保留管线):~~Zsus2(omit5 add7) / Zdom7sus2(♯7 omit5) / Adim3(omit5 add♯1) / Amin3(omit5 add♯1) / Amin3add9(♭9 omit5) / Zminmaj7(♭3 omit5) …等 14 条~~

## C-Z-B  `{0,10,11}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Z·半音簇** | — | 0 |

> 🗑 已过滤(保留管线):~~Bmaj7sus2(♭2 omit5) / Bdom7sus2(♭2 ♯7 omit5) / Bsus2(♭2 omit5 add7) / Zsus2(omit5 add♯1) / Zdim3(♭3 omit5 add♯1) / Zmin3(♭3 omit5 add♯1)~~

## P-D-Q  `{1,2,3}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **P·半音簇** | — | 0 |

> 🗑 已过滤(保留管线):~~Dmaj7sus2(♭2 omit5) / Ddom7sus2(♯7 ♭2 omit5) / Dsus2(♭2 omit5 add7) / Psus2(omit5 add♯1)~~

## P-D-E  `{1,2,4}`  ✋ verdict(0,1,3) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **P·Phrygian三音** ✋ | — | 0 |
| 🔵2 | **Dmaj7sus2** ✋ | (omit5) | 0 |

> 🗑 已过滤(保留管线):~~Dsus2(omit5 add7) / Ddom7sus2(♯7 omit5) / Pdim3(omit5 add♯1) / Pmin3(omit5 add♯1) / Pmin3add9(♭9 omit5) / Dminmaj7(♭3 omit5) …等 14 条~~

## P-D-Z  `{1,2,10}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Z·分叉三和弦** | — | 0 |

> 🗑 已过滤(保留管线):~~Zmin3(omit5 add3) / Zaug3(omit5 add♯2) / Zmaj3(omit5 add♯2) / Zmaj3add9(♯9 omit5) / Zmin3add11(♭11 omit5)~~

## P-Q-A  `{1,3,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Amaj3b5** | — | 0 |
| 🟢3 | **Qdom7sus4** | (♯4 omit5) | 1 |
| 🟡4 | **Psus2** | (♯5) | 1.5 |
| 🟠5 | **Adim3** | (♯3) | 3 |
| 🟠5 | **Amaj3** | (♭5) | 3 |
| 🟠5 | **Amaj3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Qmaj7sus4** | (♭7 ♯4 omit5) | 3 |
| 🟠5 | **Asus4** | (♭4 ♭5) | 3 |
| 🔴6 | **Qsus4** | (♯4 omit5 add♯6) | 4.5 |
| 🔴6 | **Pmin3** | (♭3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Amin3(♯3 ♭5) / Amin3add11(♯3 ♯11 omit5)~~

## P-E-F  `{1,4,5}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **P·分叉三和弦** | — | 0 |

> 🗑 已过滤(保留管线):~~Pmin3(omit5 add3) / Edom7sus2(♭7 ♭2 omit5) / Paug3(omit5 add♯2) / Pmaj3(omit5 add♯2) / Pmaj3add9(♯9 omit5) / Pmin3add11(♭11 omit5)~~

## P-E-G  `{1,4,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Pdim3** | — | 0 |
| 🔵2 | **Edim7** | (omit5) | 0 |
| 🔵2 | **Emin3add6** | (omit5) | 0 |
| 🟢3 | **Edim3** | (omit5 add6) | 0.5 |
| 🟡4 | **Edom7** | (♭7 ♭3 omit5) | 2 |
| 🟡4 | **Edom7sus2** | (♭7 ♯2 omit5) | 2 |
| 🟠5 | **Ehalfdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Emaj3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Pmaj3b5** | (♭3) | 3 |
| 🟠5 | **Pmin3** | (♭5) | 3 |

> 🗑 已过滤(保留管线):~~Pmin3add11(♯11 omit5) / Emin7(♭7 omit5) / Psus2(♯2 ♭5) / Eaug3(♯5 ♭3) / Pmaj3(♭3 ♭5) / Pmaj3add11(♭3 ♯11 omit5)~~

## P-E-A  `{1,4,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Amaj3** | — | 0 |
| 🟢3 | **Edom7sus4** | (♭7 omit5) | 1 |
| 🟡4 | **Asus4** | (♭4) | 1.5 |
| 🟡4 | **Edom7** | (♭7 ♯3 omit5) | 2 |
| 🟠5 | **Paug3** | (♭3) | 3 |
| 🟠5 | **Aaug3** | (♭5) | 3 |
| 🟠5 | **Emaj3add6** | (♯3 omit5) | 3 |
| 🟠5 | **Amaj3b5** | (♯5) | 3 |
| 🟠5 | **Pmin3** | (♯5) | 3 |
| 🟠5 | **Amin3** | (♯3) | 3 |

> 🗑 已过滤(保留管线):~~Psus2(♯2 ♯5) / Eaug3(♯5 ♯3) / Adim3(♯3 ♯5) / Pmaj3(♭3 ♯5)~~

## P-E-Z  `{1,4,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Zdim3** | — | 0 |
| 🔵2 | **Pdim7** | (omit5) | 0 |
| 🔵2 | **Pmin3add6** | (omit5) | 0 |
| 🟢3 | **Pdim3** | (omit5 add6) | 0.5 |
| 🟡4 | **Edom7sus4** | (♭7 ♯4 omit5) | 2 |
| 🟠5 | **Phalfdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Pmaj3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Zmaj3b5** | (♭3) | 3 |
| 🟠5 | **Zmin3** | (♭5) | 3 |
| 🟠5 | **Zmin3add11** | (♯11 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Zsus2(♯2 ♭5) / Paug3(♭3 ♯5) / Zmaj3(♭3 ♭5) / Zmaj3add11(♭3 ♯11 omit5)~~

## P-F-G  `{1,5,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Pmaj3b5** | — | 0 |
| 🟢3 | **Gdom7sus4** | (♯4 omit5) | 1 |
| 🟡4 | **Fsus2** | (♯5) | 1.5 |
| 🟠5 | **Pdim3** | (♯3) | 3 |
| 🟠5 | **Pmaj3** | (♭5) | 3 |
| 🟠5 | **Pmaj3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Gmaj7sus4** | (♯4 ♭7 omit5) | 3 |
| 🟠5 | **Psus4** | (♭4 ♭5) | 3 |
| 🔴6 | **Gsus4** | (♯4 omit5 add♯6) | 4.5 |
| 🔴6 | **Fdim7** | (♭7 ♭3 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Pmin3(♯3 ♭5) / Fmin3(♯5 ♭3) / Pmin3add11(♯3 ♯11 omit5)~~

## P-F-Y  `{1,5,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Pmaj3** | — | 0 |
| 🟡4 | **Psus4** | (♭4) | 1.5 |
| 🟠5 | **Paug3** | (♭5) | 3 |
| 🟠5 | **Faug3** | (♭3) | 3 |
| 🟠5 | **Fdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Ymaj3add6** | (♯3 omit5) | 3 |
| 🟠5 | **Pmaj3b5** | (♯5) | 3 |
| 🟠5 | **Pmin3** | (♯3) | 3 |
| 🟠5 | **Fmin3** | (♯5) | 3 |
| 🟠5 | **Fsus2** | (♯5 ♯2) | 3 |

> 🗑 已过滤(保留管线):~~Yaug3(♯3 ♯5) / Pdim3(♯3 ♯5) / Fmaj3(♯5 ♭3)~~

## P-F-A  `{1,5,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Paug3** | — | 0 |
| ✅1 | **Faug3** | — | 0 |
| ✅1 | **Aaug3** | — | 0 |
| 🟠5 | **Pmaj3** | (♯5) | 3 |
| 🟠5 | **Fmaj3** | (♯5) | 3 |
| 🟠5 | **Amaj3** | (♯5) | 3 |
| 🟠5 | **Psus4** | (♭4 ♯5) | 3 |
| 🟠5 | **Fsus4** | (♯5 ♭4) | 3 |
| 🟠5 | **Asus4** | (♭4 ♯5) | 3 |
| 🔴6 | **Fdim7** | (♭7 ♯3 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Pmin3(♯3 ♯5) / Fmin3(♯5 ♯3) / Amin3(♯3 ♯5)~~

## P-X-Z  `{1,6,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Xmaj3** | — | 0 |
| 🟡4 | **Xsus4** | (♭4) | 1.5 |
| 🟠5 | **Xaug3** | (♭5) | 3 |
| 🟠5 | **Zaug3** | (♭3) | 3 |
| 🟠5 | **Pmaj3add6** | (♯3 omit5) | 3 |
| 🟠5 | **Xmaj3b5** | (♯5) | 3 |
| 🟠5 | **Xmin3** | (♯3) | 3 |
| 🟠5 | **Zmin3** | (♯5) | 3 |
| 🟠5 | **Zsus2** | (♯2 ♯5) | 3 |
| 🔴6 | **Paug3** | (♯3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Xdim3(♯5 ♯3) / Zmaj3(♭3 ♯5)~~

## P-G-Z  `{1,7,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Gdim3** | — | 0 |
| 🔵2 | **Zdim7** | (omit5) | 0 |
| 🔵2 | **Zmin3add6** | (omit5) | 0 |
| 🟢3 | **Zdim3** | (omit5 add6) | 0.5 |
| 🟠5 | **Zhalfdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Zmaj3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Gmaj3b5** | (♭3) | 3 |
| 🟠5 | **Gmin3** | (♭5) | 3 |
| 🟠5 | **Gmin3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Gsus2** | (♭5 ♯2) | 3 |

> 🗑 已过滤(保留管线):~~Gsus4(♯4 omit5 add♯2) / Zaug3(♭3 ♯5) / Gmaj3(♭5 ♭3) / Gmaj3add11(♯11 ♭3 omit5)~~

## P-G-B  `{1,7,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Gmaj3b5** | — | 0 |
| 🟢3 | **Pdom7sus4** | (♯4 omit5) | 1 |
| 🟡4 | **Bsus2** | (♯5) | 1.5 |
| 🟠5 | **Gdim3** | (♯3) | 3 |
| 🟠5 | **Gmaj3** | (♭5) | 3 |
| 🟠5 | **Gmaj3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Pmaj7sus4** | (♯4 ♭7 omit5) | 3 |
| 🔴6 | **Psus4** | (♯4 omit5 add♯6) | 4.5 |
| 🔴6 | **Gmin3** | (♭5 ♯3) | 6 |
| 🔴6 | **Bmin3** | (♭3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Gmin3add11(♯11 ♯3 omit5)~~

## P-Z-B  `{1,10,11}`  ✋ verdict(0,1,3) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Z·Phrygian三音** ✋ | — | 0 |
| 🔵2 | **Bmaj7sus2** ✋ | (omit5) | 0 |

> 🗑 已过滤(保留管线):~~Bsus2(omit5 add7) / Bdom7sus2(♯7 omit5) / Zdim3(omit5 add♯1) / Zmin3(omit5 add♯1) / Zmin3add9(♭9 omit5) / Bminmaj7(♭3 omit5) …等 13 条~~

## D-Q-E  `{2,3,4}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **D·半音簇** | — | 0 |

> 🗑 已过滤(保留管线):~~Qmaj7sus2(♭2 omit5) / Qdom7sus2(♯7 ♭2 omit5) / Qsus2(♭2 omit5 add7) / Dsus2(omit5 add♯1)~~

## D-Q-F  `{2,3,5}`  ✋ verdict(0,1,3) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **D·Phrygian三音** ✋ | — | 0 |
| 🔵2 | **Qmaj7sus2** ✋ | (omit5) | 0 |

> 🗑 已过滤(保留管线):~~Qsus2(omit5 add7) / Qdom7sus2(♯7 omit5) / Ddim3(omit5 add♯1) / Dmin3(omit5 add♯1) / Dmin3add9(♭9 omit5) / Qminmaj7(♭3 omit5) …等 14 条~~

## D-Q-B  `{2,3,11}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **B·分叉三和弦** | — | 0 |

> 🗑 已过滤(保留管线):~~Bmin3(omit5 add3) / Ddom7sus2(♭2 ♭7 omit5) / Baug3(omit5 add♯2) / Bmaj3(omit5 add♯2) / Bmaj3add9(♯9 omit5) / Bmin3add11(♭11 omit5)~~

## D-E-Z  `{2,4,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Zmaj3b5** | — | 0 |
| 🟢3 | **Edom7sus4** | (♯4 omit5) | 1 |
| 🟡4 | **Dsus2** | (♯5) | 1.5 |
| 🟠5 | **Zdim3** | (♯3) | 3 |
| 🟠5 | **Zmaj3** | (♭5) | 3 |
| 🟠5 | **Zmaj3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Emaj7sus4** | (♭7 ♯4 omit5) | 3 |
| 🟠5 | **Zsus4** | (♭4 ♭5) | 3 |
| 🔴6 | **Esus4** | (♯4 omit5 add♯6) | 4.5 |
| 🔴6 | **Dmin3** | (♭3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Zmin3(♯3 ♭5) / Zmin3add11(♯3 ♯11 omit5)~~

## D-F-X  `{2,5,6}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **D·分叉三和弦** | — | 0 |

> 🗑 已过滤(保留管线):~~Dmin3(omit5 add3) / Daug3(omit5 add♯2) / Dmaj3(omit5 add♯2) / Dmaj3add9(♯9 omit5) / Dmin3add11(♭11 omit5)~~

## D-F-Y  `{2,5,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Ddim3** | — | 0 |
| 🔵2 | **Fdim7** | (omit5) | 0 |
| 🔵2 | **Fmin3add6** | (omit5) | 0 |
| 🟢3 | **Fdim3** | (omit5 add6) | 0.5 |
| 🟠5 | **Fhalfdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Fmaj3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Dmaj3b5** | (♭3) | 3 |
| 🟠5 | **Dmin3** | (♭5) | 3 |
| 🟠5 | **Dmin3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Dsus2** | (♯2 ♭5) | 3 |

> 🗑 已过滤(保留管线):~~Faug3(♯5 ♭3) / Dmaj3(♭3 ♭5) / Dmaj3add11(♭3 ♯11 omit5)~~

## D-F-Z  `{2,5,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Zmaj3** | — | 0 |
| 🟡4 | **Zsus4** | (♭4) | 1.5 |
| 🟠5 | **Daug3** | (♭3) | 3 |
| 🟠5 | **Zaug3** | (♭5) | 3 |
| 🟠5 | **Zmaj3b5** | (♯5) | 3 |
| 🟠5 | **Dmin3** | (♯5) | 3 |
| 🟠5 | **Zmin3** | (♯3) | 3 |
| 🟠5 | **Dsus2** | (♯2 ♯5) | 3 |
| 🔴6 | **Faug3** | (♯5 ♯3) | 6 |
| 🔴6 | **Zdim3** | (♯3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Dmaj3(♭3 ♯5)~~

## D-F-B  `{2,5,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Bdim3** | — | 0 |
| 🔵2 | **Ddim7** | (omit5) | 0 |
| 🔵2 | **Dmin3add6** | (omit5) | 0 |
| 🟢3 | **Ddim3** | (omit5 add6) | 0.5 |
| 🟡4 | **Ddom7** | (♭3 ♭7 omit5) | 2 |
| 🟡4 | **Ddom7sus2** | (♯2 ♭7 omit5) | 2 |
| 🟠5 | **Dhalfdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Dmaj3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Bmaj3b5** | (♭3) | 3 |
| 🟠5 | **Bmin3** | (♭5) | 3 |

> 🗑 已过滤(保留管线):~~Bmin3add11(♯11 omit5) / Dmin7(♭7 omit5) / Bsus2(♯2 ♭5) / Daug3(♭3 ♯5) / Bmaj3(♭3 ♭5) / Bmaj3add11(♭3 ♯11 omit5)~~

## D-X-Y  `{2,6,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Dmaj3b5** | — | 0 |
| 🟢3 | **Ydom7sus4** | (♯4 omit5) | 1 |
| 🟡4 | **Xsus2** | (♯5) | 1.5 |
| 🟠5 | **Ddim3** | (♯3) | 3 |
| 🟠5 | **Dmaj3** | (♭5) | 3 |
| 🟠5 | **Dmaj3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Ymaj7sus4** | (♯4 ♭7 omit5) | 3 |
| 🟠5 | **Dsus4** | (♭4 ♭5) | 3 |
| 🔴6 | **Ysus4** | (♯4 omit5 add♯6) | 4.5 |
| 🔴6 | **Dmin3** | (♯3 ♭5) | 6 |

> 🗑 已过滤(保留管线):~~Xmin3(♯5 ♭3) / Dmin3add11(♯3 ♯11 omit5)~~

## D-X-A  `{2,6,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Dmaj3** | — | 0 |
| 🟡4 | **Dsus4** | (♭4) | 1.5 |
| 🟠5 | **Daug3** | (♭5) | 3 |
| 🟠5 | **Xaug3** | (♭3) | 3 |
| 🟠5 | **Amaj3add6** | (♯3 omit5) | 3 |
| 🟠5 | **Dmaj3b5** | (♯5) | 3 |
| 🟠5 | **Dmin3** | (♯3) | 3 |
| 🟠5 | **Xmin3** | (♯5) | 3 |
| 🟠5 | **Xsus2** | (♯5 ♯2) | 3 |
| 🔴6 | **Aaug3** | (♯3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Ddim3(♯3 ♯5) / Xmaj3(♯5 ♭3)~~

## D-X-Z  `{2,6,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Daug3** | — | 0 |
| ✅1 | **Xaug3** | — | 0 |
| ✅1 | **Zaug3** | — | 0 |
| 🟠5 | **Dmaj3** | (♯5) | 3 |
| 🟠5 | **Xmaj3** | (♯5) | 3 |
| 🟠5 | **Zmaj3** | (♯5) | 3 |
| 🟠5 | **Dsus4** | (♭4 ♯5) | 3 |
| 🟠5 | **Xsus4** | (♯5 ♭4) | 3 |
| 🟠5 | **Zsus4** | (♭4 ♯5) | 3 |
| 🔴6 | **Dmin3** | (♯3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Xmin3(♯5 ♯3) / Zmin3(♯3 ♯5)~~

## D-G-B  `{2,7,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Gmaj3** | — | 0 |
| 🟢3 | **Ddom7sus4** | (♭7 omit5) | 1 |
| 🟡4 | **Gsus4** | (♭4) | 1.5 |
| 🟡4 | **Ddom7** | (♯3 ♭7 omit5) | 2 |
| 🟠5 | **Gaug3** | (♭5) | 3 |
| 🟠5 | **Baug3** | (♭3) | 3 |
| 🟠5 | **Dmaj3add6** | (♯3 omit5) | 3 |
| 🟠5 | **Gmaj3b5** | (♯5) | 3 |
| 🟠5 | **Gmin3** | (♯3) | 3 |
| 🟠5 | **Bmin3** | (♯5) | 3 |

> 🗑 已过滤(保留管线):~~Bsus2(♯2 ♯5) / Daug3(♯3 ♯5) / Gdim3(♯5 ♯3) / Bmaj3(♭3 ♯5)~~

## D-Y-B  `{2,8,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Ydim3** | — | 0 |
| 🔵2 | **Bdim7** | (omit5) | 0 |
| 🔵2 | **Bmin3add6** | (omit5) | 0 |
| 🟢3 | **Bdim3** | (omit5 add6) | 0.5 |
| 🟡4 | **Ddom7sus4** | (♯4 ♭7 omit5) | 2 |
| 🟠5 | **Bhalfdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Bmaj3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Ymaj3b5** | (♭3) | 3 |
| 🟠5 | **Ymin3** | (♭5) | 3 |
| 🟠5 | **Ymin3add11** | (♯11 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Ysus2(♭5 ♯2) / Ysus4(♯4 omit5 add♯2) / Baug3(♭3 ♯5)~~

## Q-E-F  `{3,4,5}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Q·半音簇** | — | 0 |

> 🗑 已过滤(保留管线):~~Emaj7sus2(♭2 omit5) / Edom7sus2(♯7 ♭2 omit5) / Esus2(♭2 omit5 add7) / Qsus2(omit5 add♯1)~~

## Q-E-X  `{3,4,6}`  ✋ verdict(0,1,3) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Q·Phrygian三音** ✋ | — | 0 |
| 🔵2 | **Emaj7sus2** ✋ | (omit5) | 0 |

> 🗑 已过滤(保留管线):~~Esus2(omit5 add7) / Edom7sus2(♯7 omit5) / Qdim3(omit5 add♯1) / Qmin3(omit5 add♯1) / Qmin3add9(♭9 omit5) / Eminmaj7(♭3 omit5) …等 14 条~~

## Q-F-B  `{3,5,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Bmaj3b5** | — | 0 |
| 🟡4 | **Qsus2** | (♯5) | 1.5 |
| 🟠5 | **Bdim3** | (♯3) | 3 |
| 🟠5 | **Bmaj3** | (♭5) | 3 |
| 🟠5 | **Bmaj3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Bsus4** | (♭4 ♭5) | 3 |
| 🔴6 | **Qdim7** | (♭3 ♭7 omit5) | 6 |
| 🔴6 | **Qmin3** | (♭3 ♯5) | 6 |
| 🔴6 | **Bmin3** | (♯3 ♭5) | 6 |
| 🔴6 | **Bmin3add11** | (♯3 ♯11 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Qmin3add6(♭3 ♭6 omit5)~~

## Q-X-G  `{3,6,7}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Q·分叉三和弦** | — | 0 |

> 🗑 已过滤(保留管线):~~Qmin3(omit5 add3) / Qaug3(omit5 add♯2) / Qmaj3(omit5 add♯2) / Qmaj3add9(♯9 omit5) / Qmin3add11(♭11 omit5)~~

## Q-X-A  `{3,6,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Qdim3** | — | 0 |
| 🔵2 | **Xdim7** | (omit5) | 0 |
| 🔵2 | **Xmin3add6** | (omit5) | 0 |
| 🟢3 | **Xdim3** | (omit5 add6) | 0.5 |
| 🟠5 | **Xhalfdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Xmaj3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Qmaj3b5** | (♭3) | 3 |
| 🟠5 | **Qmin3** | (♭5) | 3 |
| 🟠5 | **Qmin3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Qsus2** | (♯2 ♭5) | 3 |

> 🗑 已过滤(保留管线):~~Xaug3(♯5 ♭3) / Qmaj3(♭3 ♭5) / Qmaj3add11(♭3 ♯11 omit5)~~

## Q-X-B  `{3,6,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Bmaj3** | — | 0 |
| 🟡4 | **Bsus4** | (♭4) | 1.5 |
| 🟠5 | **Qaug3** | (♭3) | 3 |
| 🟠5 | **Baug3** | (♭5) | 3 |
| 🟠5 | **Qdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Bmaj3b5** | (♯5) | 3 |
| 🟠5 | **Qmin3** | (♯5) | 3 |
| 🟠5 | **Bmin3** | (♯3) | 3 |
| 🟠5 | **Qmin3add6** | (♭6 omit5) | 3 |
| 🟠5 | **Qsus2** | (♯2 ♯5) | 3 |

> 🗑 已过滤(保留管线):~~Xaug3(♯5 ♯3) / Bdim3(♯3 ♯5) / Qmaj3(♭3 ♯5) / Qmaj3add6(♭3 ♭6 omit5)~~

## Q-G-A  `{3,7,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Qmaj3b5** | — | 0 |
| 🟢3 | **Adom7sus4** | (♯4 omit5) | 1 |
| 🟡4 | **Gsus2** | (♯5) | 1.5 |
| 🟠5 | **Qdim3** | (♯3) | 3 |
| 🟠5 | **Qmaj3** | (♭5) | 3 |
| 🟠5 | **Qmaj3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Amaj7sus4** | (♯4 ♭7 omit5) | 3 |
| 🟠5 | **Qsus4** | (♭4 ♭5) | 3 |
| 🔴6 | **Asus4** | (♯4 omit5 add♯6) | 4.5 |
| 🔴6 | **Qmin3** | (♯3 ♭5) | 6 |

> 🗑 已过滤(保留管线):~~Gmin3(♯5 ♭3) / Qmin3add11(♯3 ♯11 omit5)~~

## Q-G-Z  `{3,7,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Qmaj3** | — | 0 |
| 🟡4 | **Qsus4** | (♭4) | 1.5 |
| 🟠5 | **Qaug3** | (♭5) | 3 |
| 🟠5 | **Gaug3** | (♭3) | 3 |
| 🟠5 | **Zmaj3add6** | (♯3 omit5) | 3 |
| 🟠5 | **Qmaj3b5** | (♯5) | 3 |
| 🟠5 | **Qmin3** | (♯3) | 3 |
| 🟠5 | **Gmin3** | (♯5) | 3 |
| 🟠5 | **Gsus2** | (♯5 ♯2) | 3 |
| 🔴6 | **Zaug3** | (♯3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Qdim3(♯3 ♯5) / Gmaj3(♯5 ♭3)~~

## Q-G-B  `{3,7,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Qaug3** | — | 0 |
| ✅1 | **Gaug3** | — | 0 |
| ✅1 | **Baug3** | — | 0 |
| 🟠5 | **Qmaj3** | (♯5) | 3 |
| 🟠5 | **Gmaj3** | (♯5) | 3 |
| 🟠5 | **Bmaj3** | (♯5) | 3 |
| 🟠5 | **Qmaj3add6** | (♭6 omit5) | 3 |
| 🟠5 | **Qsus4** | (♭4 ♯5) | 3 |
| 🟠5 | **Gsus4** | (♯5 ♭4) | 3 |
| 🟠5 | **Bsus4** | (♭4 ♯5) | 3 |

> 🗑 已过滤(保留管线):~~Qdim7(♯3 ♭7 omit5) / Qmin3(♯3 ♯5) / Gmin3(♯5 ♯3) / Bmin3(♯3 ♯5) / Qmin3add6(♯3 ♭6 omit5)~~

## E-F-X  `{4,5,6}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **E·半音簇** | — | 0 |

> 🗑 已过滤(保留管线):~~Fmaj7sus2(♭2 omit5) / Fdom7sus2(♯7 ♭2 omit5) / Fsus2(♭2 omit5 add7) / Esus2(omit5 add♯1)~~

## E-F-G  `{4,5,7}`  ✋ verdict(0,1,3) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **E·Phrygian三音** ✋ | — | 0 |
| 🔵2 | **Fmaj7sus2** ✋ | (omit5) | 0 |

> 🗑 已过滤(保留管线):~~Fsus2(omit5 add7) / Fdom7sus2(♯7 omit5) / Edim3(omit5 add♯1) / Emin3(omit5 add♯1) / Emin3add9(♭9 omit5) / Fminmaj7(♭3 omit5) …等 14 条~~

## E-G-Y  `{4,7,8}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **E·分叉三和弦** | — | 0 |

> 🗑 已过滤(保留管线):~~Emin3(omit5 add3) / Eaug3(omit5 add♯2) / Emaj3(omit5 add♯2) / Emaj3add9(♯9 omit5) / Emin3add11(♭11 omit5)~~

## E-G-Z  `{4,7,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Edim3** | — | 0 |
| 🔵2 | **Gdim7** | (omit5) | 0 |
| 🔵2 | **Gmin3add6** | (omit5) | 0 |
| 🟢3 | **Gdim3** | (omit5 add6) | 0.5 |
| 🟠5 | **Ghalfdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Gmaj3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Emaj3b5** | (♭3) | 3 |
| 🟠5 | **Emin3** | (♭5) | 3 |
| 🟠5 | **Emin3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Esus2** | (♯2 ♭5) | 3 |

> 🗑 已过滤(保留管线):~~Gaug3(♯5 ♭3) / Emaj3(♭3 ♭5) / Emaj3add11(♭3 ♯11 omit5)~~

## E-Y-Z  `{4,8,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Emaj3b5** | — | 0 |
| 🟢3 | **Zdom7sus4** | (♯4 omit5) | 1 |
| 🟡4 | **Ysus2** | (♯5) | 1.5 |
| 🟠5 | **Edim3** | (♯3) | 3 |
| 🟠5 | **Emaj3** | (♭5) | 3 |
| 🟠5 | **Emaj3add11** | (♯11 omit5) | 3 |
| 🟠5 | **Zmaj7sus4** | (♯4 ♭7 omit5) | 3 |
| 🟠5 | **Esus4** | (♭4 ♭5) | 3 |
| 🔴6 | **Zsus4** | (♯4 omit5 add♯6) | 4.5 |
| 🔴6 | **Emin3** | (♯3 ♭5) | 6 |

> 🗑 已过滤(保留管线):~~Ymin3(♯5 ♭3) / Emin3add11(♯3 ♯11 omit5)~~

## E-Y-B  `{4,8,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Emaj3** | — | 0 |
| 🟡4 | **Esus4** | (♭4) | 1.5 |
| 🟠5 | **Eaug3** | (♭5) | 3 |
| 🟠5 | **Yaug3** | (♭3) | 3 |
| 🟠5 | **Bmaj3add6** | (♯3 omit5) | 3 |
| 🟠5 | **Emaj3b5** | (♯5) | 3 |
| 🟠5 | **Emin3** | (♯3) | 3 |
| 🟠5 | **Ymin3** | (♯5) | 3 |
| 🟠5 | **Ysus2** | (♯5 ♯2) | 3 |
| 🔴6 | **Baug3** | (♯3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Edim3(♯3 ♯5) / Ymaj3(♯5 ♭3)~~

## F-X-G  `{5,6,7}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **F·半音簇** | — | 0 |

> 🗑 已过滤(保留管线):~~Xmaj7sus2(♭2 omit5) / Xdom7sus2(♯7 ♭2 omit5) / Xsus2(♭2 omit5 add7) / Fsus2(omit5 add♯1)~~

## F-X-Y  `{5,6,8}`  ✋ verdict(0,1,3) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **F·Phrygian三音** ✋ | — | 0 |
| 🔵2 | **Xmaj7sus2** ✋ | (omit5) | 0 |

> 🗑 已过滤(保留管线):~~Xsus2(omit5 add7) / Xdom7sus2(♯7 omit5) / Fdim3(omit5 add♯1) / Fmin3(omit5 add♯1) / Fmin3add9(♭9 omit5) / Xminmaj7(♭3 omit5) …等 14 条~~

## F-Y-A  `{5,8,9}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **F·分叉三和弦** | — | 0 |

> 🗑 已过滤(保留管线):~~Fmin3(omit5 add3) / Faug3(omit5 add♯2) / Fmaj3(omit5 add♯2) / Fmaj3add9(♯9 omit5) / Fmin3add11(♭11 omit5)~~

## F-Y-B  `{5,8,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Fdim3** | — | 0 |
| 🔵2 | **Ydim7** | (omit5) | 0 |
| 🔵2 | **Ymin3add6** | (omit5) | 0 |
| 🟢3 | **Ydim3** | (omit5 add6) | 0.5 |
| 🟠5 | **Yhalfdim7** | (♭7 omit5) | 3 |
| 🟠5 | **Ymaj3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Fmaj3b5** | (♭3) | 3 |
| 🟠5 | **Fmin3** | (♭5) | 3 |
| 🟠5 | **Fsus2** | (♯2 ♭5) | 3 |
| 🔴6 | **Yaug3** | (♯5 ♭3) | 6 |

> 🗑 已过滤(保留管线):~~Fmaj3(♭3 ♭5)~~

## F-A-B  `{5,9,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Fmaj3b5** | — | 0 |
| 🟢3 | **Bdom7sus4** | (♯4 omit5) | 1 |
| 🟡4 | **Asus2** | (♯5) | 1.5 |
| 🟠5 | **Fdim3** | (♯3) | 3 |
| 🟠5 | **Fmaj3** | (♭5) | 3 |
| 🟠5 | **Bmaj7sus4** | (♯4 ♭7 omit5) | 3 |
| 🟠5 | **Fsus4** | (♭4 ♭5) | 3 |
| 🔴6 | **Bsus4** | (♯4 omit5 add♯6) | 4.5 |
| 🔴6 | **Fmin3** | (♯3 ♭5) | 6 |
| 🔴6 | **Amin3** | (♯5 ♭3) | 6 |

## X-G-Y  `{6,7,8}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **X·半音簇** | — | 0 |

> 🗑 已过滤(保留管线):~~Gmaj7sus2(♭2 omit5) / Gdom7sus2(♯7 ♭2 omit5) / Gsus2(♭2 omit5 add7) / Xsus2(omit5 add♯1)~~

## X-G-A  `{6,7,9}`  ✋ verdict(0,1,3) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **X·Phrygian三音** ✋ | — | 0 |
| 🔵2 | **Gmaj7sus2** ✋ | (omit5) | 0 |

> 🗑 已过滤(保留管线):~~Gsus2(omit5 add7) / Gdom7sus2(♯7 omit5) / Xdim3(omit5 add♯1) / Xmin3(omit5 add♯1) / Xmin3add9(♭9 omit5) / Gminmaj7(♭3 omit5) …等 14 条~~

## X-A-Z  `{6,9,10}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **X·分叉三和弦** | — | 0 |

> 🗑 已过滤(保留管线):~~Xmin3(omit5 add3) / Xaug3(omit5 add♯2) / Xmaj3(omit5 add♯2) / Xmaj3add9(♯9 omit5) / Xmin3add11(♭11 omit5)~~

## G-Y-A  `{7,8,9}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **G·半音簇** | — | 0 |

> 🗑 已过滤(保留管线):~~Ymaj7sus2(♭2 omit5) / Ydom7sus2(♯7 ♭2 omit5) / Ysus2(♭2 omit5 add7) / Gsus2(omit5 add♯1)~~

## G-Y-Z  `{7,8,10}`  ✋ verdict(0,1,3) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **G·Phrygian三音** ✋ | — | 0 |
| 🔵2 | **Ymaj7sus2** ✋ | (omit5) | 0 |

> 🗑 已过滤(保留管线):~~Ysus2(omit5 add7) / Ydom7sus2(♯7 omit5) / Gdim3(omit5 add♯1) / Gmin3(omit5 add♯1) / Gmin3add9(♭9 omit5) / Yminmaj7(♭3 omit5) …等 14 条~~

## G-Z-B  `{7,10,11}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **G·分叉三和弦** | — | 0 |

> 🗑 已过滤(保留管线):~~Gmin3(omit5 add3) / Gaug3(omit5 add♯2) / Gmaj3(omit5 add♯2) / Gmaj3add9(♯9 omit5) / Gmin3add11(♭11 omit5)~~

## Y-A-Z  `{8,9,10}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Y·半音簇** | — | 0 |

> 🗑 已过滤(保留管线):~~Amaj7sus2(♭2 omit5) / Adom7sus2(♯7 ♭2 omit5) / Asus2(♭2 omit5 add7) / Ysus2(omit5 add♯1)~~

## Y-A-B  `{8,9,11}`  ✋ verdict(0,1,3) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Y·Phrygian三音** ✋ | — | 0 |
| 🔵2 | **Amaj7sus2** ✋ | (omit5) | 0 |

> 🗑 已过滤(保留管线):~~Asus2(omit5 add7) / Adom7sus2(♯7 omit5) / Ydim3(omit5 add♯1) / Ymin3(omit5 add♯1) / Ymin3add9(♭9 omit5) / Aminmaj7(♭3 omit5) …等 14 条~~

## A-Z-B  `{9,10,11}`  ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **A·半音簇** | — | 0 |

> 🗑 已过滤(保留管线):~~Zmaj7sus2(♭2 omit5) / Zdom7sus2(♯7 ♭2 omit5) / Zsus2(♭2 omit5 add7) / Asus2(omit5 add♯1)~~

# 🔵 Tier 2 — 预期省略(纯 omit5/omit11)

## C-P-E  `{0,1,4}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Pminmaj7** | (omit5) | 0 |
| 🟢3 | **Pdim3** | (omit5 add7) | 0.5 |
| 🟢3 | **Pmin3** | (omit5 add7) | 0.5 |
| 🟡4 | **Pmaj7sus2** | (♯2 omit5) | 1.5 |
| 🟡4 | **Pdom7** | (♯7 ♭3 omit5) | 2 |
| 🟡4 | **Pdom7sus2** | (♯7 ♯2 omit5) | 2 |
| 🟡4 | **Psus2** | (♯2 omit5 add7) | 2 |
| 🟠5 | **Caug3** | (omit5 add♯1) | 3 |
| 🟠5 | **Paugmaj7** | (♭3 omit5) | 3 |
| 🟠5 | **Phalfdim7** | (♯7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Cmaj3(omit5 add♯1) / Cmaj3add9(♭9 omit5) / Pmaj7(♭3 omit5) / Pmin7(♯7 omit5) / Paug3(♭3 omit5 add7) / Pmaj3(♭3 omit5 add7) …等 8 条~~

## C-P-F  `{0,1,5}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Paugmaj7** | (omit5) | 0 |
| 🔵2 | **Pmaj7** | (omit5) | 0 |
| 🟢3 | **Paug3** | (omit5 add7) | 0.5 |
| 🟢3 | **Pmaj3** | (omit5 add7) | 0.5 |
| 🟢3 | **Pdom7** | (♯7 omit5) | 1 |
| 🟡4 | **Pmaj7sus4** | (♭4 omit5) | 1.5 |
| 🟡4 | **Pdom7sus4** | (♯7 ♭4 omit5) | 2 |
| 🟡4 | **Psus4** | (♭4 omit5 add7) | 2 |
| 🟠5 | **Pminmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Csus4** | (omit5 add♯1) | 3 |

> 🗑 已过滤(保留管线):~~Pdim3(♯3 omit5 add7) / Pmin3(♯3 omit5 add7) / Caug3(♯3 omit5 add♯1) / Phalfdim7(♯7 ♯3 omit5) / Cmaj3(♯3 omit5 add♯1) / Cmaj3add9(♭9 ♯3 omit5) …等 7 条~~

## C-P-X  `{0,1,6}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Pmaj7sus4** | (omit5) | 0 |
| 🟢3 | **Psus4** | (omit5 add7) | 0.5 |
| 🟢3 | **Pdom7sus4** | (♯7 omit5) | 1 |
| 🟡4 | **Xsus4** | (♯4) | 1.5 |
| 🟡4 | **Pdom7** | (♯7 ♯3 omit5) | 2 |
| 🟠5 | **Paugmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Pmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Csus2** | (♭2 ♭5) | 3 |
| 🔴6 | **Paug3** | (♯3 omit5 add7) | 3.5 |
| 🔴6 | **Pmaj3** | (♯3 omit5 add7) | 3.5 |

> 🗑 已过滤(保留管线):~~Csus4(♯4 omit5 add♯1)~~

## C-P-Y  `{0,1,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ymaj3add11** | (omit5) | 0 |
| 🟢3 | **Yaug3** | (omit5 add4) | 0.5 |
| 🟠5 | **Ymaj3b5** | (♭5) | 3 |
| 🟠5 | **Ymin3add11** | (♯3 omit5) | 3 |
| 🟠5 | **Csus2** | (♭2 ♯5) | 3 |

## C-P-Z  `{0,1,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zmin3add9** | (omit5) | 0 |
| 🟢3 | **Zdim3** | (omit5 add2) | 0.5 |
| 🟢3 | **Zmin3** | (omit5 add2) | 0.5 |
| 🟢3 | **Cdom7sus2** | (♭2 omit5) | 1 |
| 🟠5 | **Zmaj3add9** | (♭3 omit5) | 3 |
| 🟠5 | **Cmaj7sus2** | (♭2 ♭7 omit5) | 3 |
| 🟠5 | **Zsus2** | (omit5 add♯2) | 3 |
| 🔴6 | **Csus2** | (♭2 omit5 add♯6) | 4.5 |

## C-D-Q  `{0,2,3}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Cmin3add9** | (omit5) | 0 |
| 🟢3 | **Cdim3** | (omit5 add2) | 0.5 |
| 🟢3 | **Cmin3** | (omit5 add2) | 0.5 |
| 🟢3 | **Ddom7sus2** | (♭2 omit5) | 1 |
| 🟠5 | **Cmaj3add9** | (♭3 omit5) | 3 |
| 🟠5 | **Dmaj7sus2** | (♭7 ♭2 omit5) | 3 |
| 🟠5 | **Csus2** | (omit5 add♯2) | 3 |
| 🔴6 | **Dsus2** | (♭2 omit5 add♯6) | 4.5 |

## C-D-E  `{0,2,4}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ddom7sus2** | (omit5) | 0 |
| 🔵2 | **Cmaj3add9** | (omit5) | 0 |
| 🟢3 | **Caug3** | (omit5 add2) | 0.5 |
| 🟢3 | **Cmaj3** | (omit5 add2) | 0.5 |
| 🟡4 | **Dmaj7sus2** | (♭7 omit5) | 1.5 |
| 🟡4 | **Csus4** | (♭4 omit5 add2) | 2 |
| 🟠5 | **Dhalfdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Cmin3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Dmin7** | (♭3 omit5) | 3 |
| 🟠5 | **Dsus2** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Cmin3(♭3 omit5 add3) / Ddim3(♭3 omit5 add♯6) / Ddim7(♯7 ♭3 omit5) / Dmin3(♭3 omit5 add♯6) / Cmin3add11(♭3 ♭11 omit5) / Dmin3add6(♯6 ♭3 omit5) …等 7 条~~

## C-D-F  `{0,2,5}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Dhalfdim7** | (omit5) | 0 |
| 🔵2 | **Dmin7** | (omit5) | 0 |
| 🟢3 | **Csus4** | (omit5 add2) | 0.5 |
| 🟢3 | **Ddom7** | (♭3 omit5) | 1 |
| 🟢3 | **Ddom7sus2** | (♯2 omit5) | 1 |
| 🟠5 | **Ddim3** | (omit5 add♯6) | 3 |
| 🟠5 | **Ddim7** | (♯7 omit5) | 3 |
| 🟠5 | **Cmaj3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Dmaj7sus2** | (♭7 ♯2 omit5) | 3 |
| 🟠5 | **Dmin3** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Cmin3add11(♭3 omit5) / Dmin3add6(♯6 omit5) / Dminmaj7(♭7 omit5) / Dsus2(♯2 omit5 add♯6) / Daugmaj7(♭7 ♭3 omit5) / Cdim3(♭3 ♭5) …等 9 条~~

## C-D-X  `{0,2,6}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ddom7** | (omit5) | 0 |
| 🟢3 | **Ddom7sus4** | (♭4 omit5) | 1 |
| 🟡4 | **Csus2** | (♭5) | 1.5 |
| 🟡4 | **Csus4** | (♯4 omit5 add2) | 2 |
| 🟠5 | **Daugmaj7** | (♭7 omit5) | 3 |
| 🟠5 | **Cdim3** | (♭3) | 3 |
| 🟠5 | **Dhalfdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Dmaj3** | (omit5 add♯6) | 3 |
| 🟠5 | **Dmaj3add6** | (♯6 omit5) | 3 |
| 🟠5 | **Dmaj7** | (♭7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Dmaj7sus4(♭7 ♭4 omit5) / Dmin7(♯3 omit5) / Dsus4(♭4 omit5 add♯6) / Ddim3(♯3 omit5 add♯6) / Ddim7(♯7 ♯3 omit5) / Cmin3(♭3 ♭5) …等 10 条~~

## C-D-G  `{0,2,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ddom7sus4** | (omit5) | 0 |
| ✅1 | **Csus2** | — | 0 |
| ✅1 | **Gsus4** | — | 0 |
| 🟢3 | **Ddom7** | (♯3 omit5) | 1 |
| 🟡4 | **Dmaj7sus4** | (♭7 omit5) | 1.5 |
| 🟠5 | **Gmaj3** | (♯3) | 3 |
| 🟠5 | **Cmin3** | (♭3) | 3 |
| 🟠5 | **Dsus4** | (omit5 add♯6) | 3 |
| 🔴6 | **Gaug3** | (♯3 ♭5) | 6 |
| 🔴6 | **Daugmaj7** | (♭7 ♯3 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Cdim3(♭3 ♯5) / Dmaj3(♯3 omit5 add♯6) / Dmaj3add6(♯6 ♯3 omit5) / Dmaj7(♭7 ♯3 omit5)~~

## C-D-A  `{0,2,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Amin3add11** | (omit5) | 0 |
| 🟠5 | **Adim3** | (♭5) | 3 |
| 🟠5 | **Cdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Amaj3add11** | (♭3 omit5) | 3 |
| 🟠5 | **Cmin3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Asus4** | (omit5 add♯2) | 3 |
| 🔴6 | **Aaug3** | (♭3 omit5 add4) | 3.5 |
| 🔴6 | **Cdim3** | (♭3 omit5 add6) | 3.5 |
| 🔴6 | **Chalfdim7** | (♭3 ♭7 omit5) | 6 |
| 🔴6 | **Amaj3b5** | (♭3 ♭5) | 6 |

## C-D-Z  `{0,2,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Cdom7sus2** | (omit5) | 0 |
| 🔵2 | **Zmaj3add9** | (omit5) | 0 |
| 🟢3 | **Zaug3** | (omit5 add2) | 0.5 |
| 🟢3 | **Zmaj3** | (omit5 add2) | 0.5 |
| 🟡4 | **Cmaj7sus2** | (♭7 omit5) | 1.5 |
| 🟡4 | **Zsus4** | (♭4 omit5 add2) | 2 |
| 🟠5 | **Chalfdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Zmin3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Cmin7** | (♭3 omit5) | 3 |
| 🟠5 | **Csus2** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Zmin3(♭3 omit5 add3) / Cdim3(♭3 omit5 add♯6) / Cdim7(♭3 ♯7 omit5) / Cmin3(♭3 omit5 add♯6) / Zmin3add11(♭3 ♭11 omit5) / Cmin3add6(♭3 ♯6 omit5) …等 7 条~~

## C-Q-F  `{0,3,5}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Cmin3add11** | (omit5) | 0 |
| 🟢3 | **Qdom7sus2** | (♭7 omit5) | 1 |
| 🟠5 | **Cdim3** | (♭5) | 3 |
| 🟠5 | **Qdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Cmaj3add11** | (♭3 omit5) | 3 |
| 🟠5 | **Qmin3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Csus4** | (omit5 add♯2) | 3 |
| 🔴6 | **Caug3** | (♭3 omit5 add4) | 3.5 |
| 🔴6 | **Qdim3** | (♭3 omit5 add6) | 3.5 |
| 🔴6 | **Qhalfdim7** | (♭7 ♭3 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Cmaj3add9(♯9 ♯3 omit5) / Cmaj3b5(♭3 ♭5) / Qmin7(♭7 ♭3 omit5)~~

## C-Q-G  `{0,3,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qmaj3add6** | (omit5) | 0 |
| ✅1 | **Cmin3** | — | 0 |
| 🟢3 | **Qdom7** | (♭7 omit5) | 1 |
| 🟡4 | **Csus2** | (♯2) | 1.5 |
| 🟡4 | **Gsus4** | (♯5) | 1.5 |
| 🟡4 | **Qdom7sus4** | (♭7 ♭4 omit5) | 2 |
| 🟠5 | **Qaug3** | (♯5) | 3 |
| 🟠5 | **Gaug3** | (♯3) | 3 |
| 🟠5 | **Cdim3** | (♯5) | 3 |
| 🟠5 | **Qdim7** | (♯3 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Cmaj3(♭3) / Qmin3add6(♯3 omit5) / Qdim3(♯3 omit5 add6) / Caug3(♭3 ♭5) / Qhalfdim7(♭7 ♯3 omit5) / Cmaj3b5(♭3 ♯5) …等 7 条~~

## C-Q-Z  `{0,3,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Chalfdim7** | (omit5) | 0 |
| 🔵2 | **Cmin7** | (omit5) | 0 |
| 🟢3 | **Zsus4** | (omit5 add2) | 0.5 |
| 🟢3 | **Cdom7** | (♭3 omit5) | 1 |
| 🟢3 | **Cdom7sus2** | (♯2 omit5) | 1 |
| 🟠5 | **Cdim3** | (omit5 add♯6) | 3 |
| 🟠5 | **Cdim7** | (♯7 omit5) | 3 |
| 🟠5 | **Zmaj3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Cmaj7sus2** | (♯2 ♭7 omit5) | 3 |
| 🟠5 | **Cmin3** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Zmin3add11(♭3 omit5) / Cmin3add6(♯6 omit5) / Cminmaj7(♭7 omit5) / Csus2(♯2 omit5 add♯6) / Zdim3(♭3 ♭5) / Cmaj3(♭3 omit5 add♯6) …等 8 条~~

## C-Q-B  `{0,3,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Cminmaj7** | (omit5) | 0 |
| 🟢3 | **Cdim3** | (omit5 add7) | 0.5 |
| 🟢3 | **Cmin3** | (omit5 add7) | 0.5 |
| 🟡4 | **Cmaj7sus2** | (♯2 omit5) | 1.5 |
| 🟡4 | **Cdom7** | (♭3 ♯7 omit5) | 2 |
| 🟡4 | **Cdom7sus2** | (♯2 ♯7 omit5) | 2 |
| 🟡4 | **Csus2** | (♯2 omit5 add7) | 2 |
| 🟠5 | **Baug3** | (omit5 add♯1) | 3 |
| 🟠5 | **Caugmaj7** | (♭3 omit5) | 3 |
| 🟠5 | **Chalfdim7** | (♯7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Bmaj3(omit5 add♯1) / Bmaj3add9(♭9 omit5) / Cmaj7(♭3 omit5) / Cmin7(♯7 omit5) / Caug3(♭3 omit5 add7) / Cmaj3(♭3 omit5 add7) …等 8 条~~

## C-E-F  `{0,4,5}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Cmaj3add11** | (omit5) | 0 |
| 🟢3 | **Caug3** | (omit5 add4) | 0.5 |
| 🟠5 | **Cmaj3b5** | (♭5) | 3 |
| 🟠5 | **Cmin3add11** | (♯3 omit5) | 3 |
| 🟠5 | **Esus2** | (♯5 ♭2) | 3 |
| 🔴6 | **Cdim3** | (♯3 ♭5) | 6 |

## C-E-A  `{0,4,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Cmaj3add6** | (omit5) | 0 |
| ✅1 | **Amin3** | — | 0 |
| 🟡4 | **Asus2** | (♯2) | 1.5 |
| 🟡4 | **Esus4** | (♯5) | 1.5 |
| 🟠5 | **Caug3** | (♯5) | 3 |
| 🟠5 | **Eaug3** | (♯3) | 3 |
| 🟠5 | **Adim3** | (♯5) | 3 |
| 🟠5 | **Cdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Amaj3** | (♭3) | 3 |
| 🟠5 | **Cmin3add6** | (♯3 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Cdim3(♯3 omit5 add6) / Aaug3(♭3 ♭5) / Chalfdim7(♯3 ♭7 omit5) / Emaj3(♯5 ♯3) / Emaj3add6(♭6 ♯3 omit5) / Amaj3b5(♭3 ♯5)~~

## C-E-Z  `{0,4,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Cdom7** | (omit5) | 0 |
| 🟢3 | **Cdom7sus4** | (♭4 omit5) | 1 |
| 🟡4 | **Zsus2** | (♭5) | 1.5 |
| 🟡4 | **Zsus4** | (♯4 omit5 add2) | 2 |
| 🟠5 | **Zdim3** | (♭3) | 3 |
| 🟠5 | **Chalfdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Cmaj3** | (omit5 add♯6) | 3 |
| 🟠5 | **Cmaj3add6** | (♯6 omit5) | 3 |
| 🟠5 | **Cmaj7** | (♭7 omit5) | 3 |
| 🟠5 | **Cmaj7sus4** | (♭4 ♭7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Cmin7(♯3 omit5) / Esus4(♯5 ♯4) / Csus4(♭4 omit5 add♯6) / Cdim3(♯3 omit5 add♯6) / Cdim7(♯3 ♯7 omit5) / Zmin3(♭3 ♭5) …等 10 条~~

## C-E-B  `{0,4,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Caugmaj7** | (omit5) | 0 |
| 🔵2 | **Cmaj7** | (omit5) | 0 |
| 🟢3 | **Caug3** | (omit5 add7) | 0.5 |
| 🟢3 | **Cmaj3** | (omit5 add7) | 0.5 |
| 🟢3 | **Cdom7** | (♯7 omit5) | 1 |
| 🟡4 | **Cmaj7sus4** | (♭4 omit5) | 1.5 |
| 🟡4 | **Cdom7sus4** | (♭4 ♯7 omit5) | 2 |
| 🟡4 | **Csus4** | (♭4 omit5 add7) | 2 |
| 🟠5 | **Cminmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Bsus4** | (omit5 add♯1) | 3 |

> 🗑 已过滤(保留管线):~~Cdim3(♯3 omit5 add7) / Cmin3(♯3 omit5 add7) / Baug3(♯3 omit5 add♯1) / Chalfdim7(♯3 ♯7 omit5) / Bmaj3(♯3 omit5 add♯1) / Bmaj3add9(♭9 ♯3 omit5) …等 7 条~~

## C-F-G  `{0,5,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gdom7sus4** | (omit5) | 0 |
| ✅1 | **Fsus2** | — | 0 |
| ✅1 | **Csus4** | — | 0 |
| 🟡4 | **Gmaj7sus4** | (♭7 omit5) | 1.5 |
| 🟠5 | **Cmaj3** | (♯3) | 3 |
| 🟠5 | **Fmin3** | (♭3) | 3 |
| 🟠5 | **Gsus4** | (omit5 add♯6) | 3 |
| 🔴6 | **Caug3** | (♯3 ♭5) | 6 |
| 🔴6 | **Fdim3** | (♯5 ♭3) | 6 |
| 🔴6 | **Cmaj3b5** | (♯3 ♯5) | 6 |

## C-F-Y  `{0,5,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ymaj3add6** | (omit5) | 0 |
| ✅1 | **Fmin3** | — | 0 |
| 🟡4 | **Fsus2** | (♯2) | 1.5 |
| 🟡4 | **Csus4** | (♯5) | 1.5 |
| 🟠5 | **Caug3** | (♯3) | 3 |
| 🟠5 | **Yaug3** | (♯5) | 3 |
| 🟠5 | **Fdim3** | (♯5) | 3 |
| 🟠5 | **Fmaj3** | (♭3) | 3 |
| 🟠5 | **Ymin3add6** | (♯3 omit5) | 3 |
| 🔴6 | **Faug3** | (♭5 ♭3) | 6 |

> 🗑 已过滤(保留管线):~~Cmaj3(♯3 ♯5) / Fmaj3b5(♯5 ♭3)~~

## C-F-Z  `{0,5,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Cdom7sus4** | (omit5) | 0 |
| ✅1 | **Zsus2** | — | 0 |
| ✅1 | **Fsus4** | — | 0 |
| 🟢3 | **Cdom7** | (♯3 omit5) | 1 |
| 🟡4 | **Cmaj7sus4** | (♭7 omit5) | 1.5 |
| 🟠5 | **Fmaj3** | (♯3) | 3 |
| 🟠5 | **Zmin3** | (♭3) | 3 |
| 🟠5 | **Csus4** | (omit5 add♯6) | 3 |
| 🔴6 | **Faug3** | (♭5 ♯3) | 6 |
| 🔴6 | **Zdim3** | (♭3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Cmaj3(♯3 omit5 add♯6) / Cmaj3add6(♯3 ♯6 omit5) / Fmaj3b5(♯5 ♯3) / Cmaj7(♯3 ♭7 omit5)~~

## C-F-B  `{0,5,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Cmaj7sus4** | (omit5) | 0 |
| 🟢3 | **Csus4** | (omit5 add7) | 0.5 |
| 🟢3 | **Cdom7sus4** | (♯7 omit5) | 1 |
| 🟡4 | **Fsus4** | (♯4) | 1.5 |
| 🟡4 | **Cdom7** | (♯3 ♯7 omit5) | 2 |
| 🟠5 | **Caugmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Cmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Bsus2** | (♭2 ♭5) | 3 |
| 🔴6 | **Caug3** | (♯3 omit5 add7) | 3.5 |
| 🔴6 | **Cmaj3** | (♯3 omit5 add7) | 3.5 |

> 🗑 已过滤(保留管线):~~Bsus4(♯4 omit5 add♯1)~~

## C-X-G  `{0,6,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gmaj7sus4** | (omit5) | 0 |
| 🟢3 | **Gsus4** | (omit5 add7) | 0.5 |
| 🟢3 | **Gdom7sus4** | (♯7 omit5) | 1 |
| 🟡4 | **Csus4** | (♯4) | 1.5 |
| 🟠5 | **Gaugmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Xsus2** | (♭5 ♭2) | 3 |
| 🔴6 | **Gaug3** | (♯3 omit5 add7) | 3.5 |

## C-X-Y  `{0,6,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ydom7** | (omit5) | 0 |
| 🟢3 | **Ydom7sus4** | (♭4 omit5) | 1 |
| 🟡4 | **Xsus2** | (♭5) | 1.5 |
| 🟠5 | **Xdim3** | (♭3) | 3 |
| 🟠5 | **Ymaj3** | (omit5 add♯6) | 3 |
| 🟠5 | **Ymaj3add6** | (♯6 omit5) | 3 |
| 🟠5 | **Ymaj7** | (♭7 omit5) | 3 |
| 🟠5 | **Ymaj7sus4** | (♭4 ♭7 omit5) | 3 |
| 🟠5 | **Ymin7** | (♯3 omit5) | 3 |
| 🟠5 | **Csus4** | (♯4 ♯5) | 3 |

> 🗑 已过滤(保留管线):~~Ysus4(♭4 omit5 add♯6) / Xmin3(♭5 ♭3) / Ymin3(♯3 omit5 add♯6) / Ymin3add6(♯3 ♯6 omit5) / Yminmaj7(♯3 ♭7 omit5)~~

## C-G-Y  `{0,7,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Yaugmaj7** | (omit5) | 0 |
| 🔵2 | **Ymaj7** | (omit5) | 0 |
| 🟢3 | **Yaug3** | (omit5 add7) | 0.5 |
| 🟢3 | **Ymaj3** | (omit5 add7) | 0.5 |
| 🟢3 | **Ydom7** | (♯7 omit5) | 1 |
| 🟡4 | **Ymaj7sus4** | (♭4 omit5) | 1.5 |
| 🟡4 | **Ydom7sus4** | (♭4 ♯7 omit5) | 2 |
| 🟡4 | **Ysus4** | (♭4 omit5 add7) | 2 |
| 🟠5 | **Yminmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Gsus4** | (omit5 add♯1) | 3 |

> 🗑 已过滤(保留管线):~~Ymin3(♯3 omit5 add7) / Gaug3(♯3 omit5 add♯1) / Ymin7(♯3 ♯7 omit5)~~

## C-G-A  `{0,7,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ahalfdim7** | (omit5) | 0 |
| 🔵2 | **Amin7** | (omit5) | 0 |
| 🟢3 | **Gsus4** | (omit5 add2) | 0.5 |
| 🟢3 | **Adom7** | (♭3 omit5) | 1 |
| 🟢3 | **Adom7sus2** | (♯2 omit5) | 1 |
| 🟠5 | **Adim3** | (omit5 add♯6) | 3 |
| 🟠5 | **Adim7** | (♯7 omit5) | 3 |
| 🟠5 | **Amaj7sus2** | (♯2 ♭7 omit5) | 3 |
| 🟠5 | **Amin3** | (omit5 add♯6) | 3 |
| 🟠5 | **Gmin3add11** | (♭3 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Amin3add6(♯6 omit5) / Aminmaj7(♭7 omit5) / Gaug3(♯3 omit5 add2) / Asus2(♯2 omit5 add♯6) / Gdim3(♭5 ♭3) / Amaj3(♭3 omit5 add♯6) …等 8 条~~

## C-G-Z  `{0,7,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gmin3add11** | (omit5) | 0 |
| 🟠5 | **Gdim3** | (♭5) | 3 |
| 🟠5 | **Zdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Gmaj3add11** | (♭3 omit5) | 3 |
| 🟠5 | **Zmin3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Gsus4** | (omit5 add♯2) | 3 |
| 🔴6 | **Zdim3** | (♭3 omit5 add6) | 3.5 |
| 🔴6 | **Gaug3** | (♯3 omit5 add♯2) | 6 |
| 🔴6 | **Zhalfdim7** | (♭3 ♭7 omit5) | 6 |
| 🔴6 | **Gmaj3b5** | (♭5 ♭3) | 6 |

## C-G-B  `{0,7,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gmaj3add11** | (omit5) | 0 |
| 🟢3 | **Gaug3** | (omit5 add4) | 0.5 |
| 🟠5 | **Gmaj3b5** | (♭5) | 3 |
| 🟠5 | **Gmin3add11** | (♯3 omit5) | 3 |
| 🟠5 | **Bsus2** | (♭2 ♯5) | 3 |
| 🔴6 | **Gdim3** | (♭5 ♯3) | 6 |

## C-Y-A  `{0,8,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Aminmaj7** | (omit5) | 0 |
| 🟢3 | **Adim3** | (omit5 add7) | 0.5 |
| 🟢3 | **Amin3** | (omit5 add7) | 0.5 |
| 🟡4 | **Amaj7sus2** | (♯2 omit5) | 1.5 |
| 🟡4 | **Adom7** | (♭3 ♯7 omit5) | 2 |
| 🟡4 | **Adom7sus2** | (♯2 ♯7 omit5) | 2 |
| 🟡4 | **Asus2** | (♯2 omit5 add7) | 2 |
| 🟠5 | **Yaug3** | (omit5 add♯1) | 3 |
| 🟠5 | **Aaugmaj7** | (♭3 omit5) | 3 |
| 🟠5 | **Ahalfdim7** | (♯7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Ymaj3(omit5 add♯1) / Ymaj3add9(♭9 omit5) / Amaj7(♭3 omit5) / Amin7(♯7 omit5) / Aaug3(♭3 omit5 add7) / Amaj3(♭3 omit5 add7) …等 8 条~~

## C-Y-Z  `{0,8,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zdom7sus2** | (omit5) | 0 |
| 🔵2 | **Ymaj3add9** | (omit5) | 0 |
| 🟢3 | **Yaug3** | (omit5 add2) | 0.5 |
| 🟢3 | **Ymaj3** | (omit5 add2) | 0.5 |
| 🟡4 | **Zmaj7sus2** | (♭7 omit5) | 1.5 |
| 🟡4 | **Ysus4** | (♭4 omit5 add2) | 2 |
| 🟠5 | **Zhalfdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Ymin3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Zmin7** | (♭3 omit5) | 3 |
| 🟠5 | **Zsus2** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Ymin3(♯3 omit5 add2) / Zdim3(♭3 omit5 add♯6) / Zdim7(♭3 ♯7 omit5) / Zmin3(♭3 omit5 add♯6) / Ymin3add11(♭11 ♭3 omit5) / Zmin3add6(♭3 ♯6 omit5) …等 7 条~~

## C-A-B  `{0,9,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Amin3add9** | (omit5) | 0 |
| 🟢3 | **Adim3** | (omit5 add2) | 0.5 |
| 🟢3 | **Amin3** | (omit5 add2) | 0.5 |
| 🟢3 | **Bdom7sus2** | (♭2 omit5) | 1 |
| 🟠5 | **Amaj3add9** | (♭3 omit5) | 3 |
| 🟠5 | **Bmaj7sus2** | (♭2 ♭7 omit5) | 3 |
| 🟠5 | **Asus2** | (omit5 add♯2) | 3 |
| 🔴6 | **Aaug3** | (♭3 omit5 add2) | 3.5 |
| 🔴6 | **Amaj3** | (♭3 omit5 add2) | 3.5 |
| 🔴6 | **Bsus2** | (♭2 omit5 add♯6) | 4.5 |

## P-D-F  `{1,2,5}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Dminmaj7** | (omit5) | 0 |
| 🟢3 | **Ddim3** | (omit5 add7) | 0.5 |
| 🟢3 | **Dmin3** | (omit5 add7) | 0.5 |
| 🟡4 | **Dmaj7sus2** | (♯2 omit5) | 1.5 |
| 🟡4 | **Ddom7** | (♯7 ♭3 omit5) | 2 |
| 🟡4 | **Ddom7sus2** | (♯7 ♯2 omit5) | 2 |
| 🟡4 | **Dsus2** | (♯2 omit5 add7) | 2 |
| 🟠5 | **Paug3** | (omit5 add♯1) | 3 |
| 🟠5 | **Daugmaj7** | (♭3 omit5) | 3 |
| 🟠5 | **Dhalfdim7** | (♯7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Pmaj3(omit5 add♯1) / Pmaj3add9(♭9 omit5) / Dmaj7(♭3 omit5) / Dmin7(♯7 omit5) / Daug3(♭3 omit5 add7) / Dmaj3(♭3 omit5 add7) …等 8 条~~

## P-D-X  `{1,2,6}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Daugmaj7** | (omit5) | 0 |
| 🔵2 | **Dmaj7** | (omit5) | 0 |
| 🟢3 | **Daug3** | (omit5 add7) | 0.5 |
| 🟢3 | **Dmaj3** | (omit5 add7) | 0.5 |
| 🟢3 | **Ddom7** | (♯7 omit5) | 1 |
| 🟡4 | **Dmaj7sus4** | (♭4 omit5) | 1.5 |
| 🟡4 | **Ddom7sus4** | (♯7 ♭4 omit5) | 2 |
| 🟡4 | **Dsus4** | (♭4 omit5 add7) | 2 |
| 🟠5 | **Dminmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Psus4** | (omit5 add♯1) | 3 |

> 🗑 已过滤(保留管线):~~Ddim3(♯3 omit5 add7) / Dmin3(♯3 omit5 add7) / Paug3(♯3 omit5 add♯1) / Dhalfdim7(♯7 ♯3 omit5) / Pmaj3(♯3 omit5 add♯1) / Pmaj3add9(♭9 ♯3 omit5) …等 7 条~~

## P-D-G  `{1,2,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Dmaj7sus4** | (omit5) | 0 |
| 🟢3 | **Dsus4** | (omit5 add7) | 0.5 |
| 🟢3 | **Ddom7sus4** | (♯7 omit5) | 1 |
| 🟡4 | **Gsus4** | (♯4) | 1.5 |
| 🟡4 | **Ddom7** | (♯7 ♯3 omit5) | 2 |
| 🟠5 | **Daugmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Dmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Psus2** | (♭2 ♭5) | 3 |
| 🔴6 | **Daug3** | (♯3 omit5 add7) | 3.5 |
| 🔴6 | **Dmaj3** | (♯3 omit5 add7) | 3.5 |

> 🗑 已过滤(保留管线):~~Psus4(♯4 omit5 add♯1)~~

## P-D-A  `{1,2,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Amaj3add11** | (omit5) | 0 |
| 🟢3 | **Aaug3** | (omit5 add4) | 0.5 |
| 🟠5 | **Amaj3b5** | (♭5) | 3 |
| 🟠5 | **Amin3add11** | (♯3 omit5) | 3 |
| 🟠5 | **Psus2** | (♭2 ♯5) | 3 |
| 🔴6 | **Adim3** | (♯3 ♭5) | 6 |

## P-D-B  `{1,2,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bmin3add9** | (omit5) | 0 |
| 🟢3 | **Bdim3** | (omit5 add2) | 0.5 |
| 🟢3 | **Bmin3** | (omit5 add2) | 0.5 |
| 🟢3 | **Pdom7sus2** | (♭2 omit5) | 1 |
| 🟠5 | **Bmaj3add9** | (♭3 omit5) | 3 |
| 🟠5 | **Pmaj7sus2** | (♭2 ♭7 omit5) | 3 |
| 🟠5 | **Bsus2** | (omit5 add♯2) | 3 |
| 🔴6 | **Psus2** | (♭2 omit5 add♯6) | 4.5 |

## P-Q-E  `{1,3,4}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Pmin3add9** | (omit5) | 0 |
| 🟢3 | **Pdim3** | (omit5 add2) | 0.5 |
| 🟢3 | **Pmin3** | (omit5 add2) | 0.5 |
| 🟢3 | **Qdom7sus2** | (♭2 omit5) | 1 |
| 🟠5 | **Pmaj3add9** | (♭3 omit5) | 3 |
| 🟠5 | **Qmaj7sus2** | (♭7 ♭2 omit5) | 3 |
| 🟠5 | **Psus2** | (omit5 add♯2) | 3 |
| 🔴6 | **Qsus2** | (♭2 omit5 add♯6) | 4.5 |

## P-Q-F  `{1,3,5}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qdom7sus2** | (omit5) | 0 |
| 🔵2 | **Pmaj3add9** | (omit5) | 0 |
| 🟢3 | **Paug3** | (omit5 add2) | 0.5 |
| 🟢3 | **Pmaj3** | (omit5 add2) | 0.5 |
| 🟡4 | **Qmaj7sus2** | (♭7 omit5) | 1.5 |
| 🟡4 | **Psus4** | (♭4 omit5 add2) | 2 |
| 🟠5 | **Qhalfdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Pmin3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Qmin7** | (♭3 omit5) | 3 |
| 🟠5 | **Qsus2** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Pmin3(♭3 omit5 add3) / Qdim3(♭3 omit5 add♯6) / Qdim7(♯7 ♭3 omit5) / Qmin3(♭3 omit5 add♯6) / Pmin3add11(♭3 ♭11 omit5) / Qmin3add6(♯6 ♭3 omit5) …等 7 条~~

## P-Q-X  `{1,3,6}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qhalfdim7** | (omit5) | 0 |
| 🔵2 | **Qmin7** | (omit5) | 0 |
| 🟢3 | **Psus4** | (omit5 add2) | 0.5 |
| 🟢3 | **Qdom7** | (♭3 omit5) | 1 |
| 🟢3 | **Qdom7sus2** | (♯2 omit5) | 1 |
| 🟠5 | **Qdim3** | (omit5 add♯6) | 3 |
| 🟠5 | **Qdim7** | (♯7 omit5) | 3 |
| 🟠5 | **Pmaj3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Qmaj7sus2** | (♭7 ♯2 omit5) | 3 |
| 🟠5 | **Qmin3** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Pmin3add11(♭3 omit5) / Qmin3add6(♯6 omit5) / Qminmaj7(♭7 omit5) / Qsus2(♯2 omit5 add♯6) / Qaugmaj7(♭7 ♭3 omit5) / Pdim3(♭3 ♭5) …等 9 条~~

## P-Q-G  `{1,3,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qdom7** | (omit5) | 0 |
| 🟢3 | **Qdom7sus4** | (♭4 omit5) | 1 |
| 🟡4 | **Psus2** | (♭5) | 1.5 |
| 🟡4 | **Psus4** | (♯4 omit5 add2) | 2 |
| 🟠5 | **Qaugmaj7** | (♭7 omit5) | 3 |
| 🟠5 | **Pdim3** | (♭3) | 3 |
| 🟠5 | **Qhalfdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Qmaj3** | (omit5 add♯6) | 3 |
| 🟠5 | **Qmaj3add6** | (♯6 omit5) | 3 |
| 🟠5 | **Qmaj7** | (♭7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Qmaj7sus4(♭7 ♭4 omit5) / Qmin7(♯3 omit5) / Gsus4(♯4 ♯5) / Qsus4(♭4 omit5 add♯6) / Qdim3(♯3 omit5 add♯6) / Qdim7(♯7 ♯3 omit5) …等 11 条~~

## P-Q-Y  `{1,3,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qdom7sus4** | (omit5) | 0 |
| ✅1 | **Psus2** | — | 0 |
| ✅1 | **Ysus4** | — | 0 |
| 🟢3 | **Qdom7** | (♯3 omit5) | 1 |
| 🟡4 | **Qmaj7sus4** | (♭7 omit5) | 1.5 |
| 🟠5 | **Ymaj3** | (♯3) | 3 |
| 🟠5 | **Pmin3** | (♭3) | 3 |
| 🟠5 | **Qsus4** | (omit5 add♯6) | 3 |
| 🔴6 | **Yaug3** | (♯3 ♭5) | 6 |
| 🔴6 | **Qaugmaj7** | (♭7 ♯3 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Pdim3(♭3 ♯5) / Qmaj3(♯3 omit5 add♯6) / Qmaj3add6(♯6 ♯3 omit5) / Ymaj3b5(♯3 ♯5) / Qmaj7(♭7 ♯3 omit5)~~

## P-Q-Z  `{1,3,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zmin3add11** | (omit5) | 0 |
| 🟠5 | **Zdim3** | (♭5) | 3 |
| 🟠5 | **Pdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Zmaj3add11** | (♭3 omit5) | 3 |
| 🟠5 | **Pmin3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Zsus4** | (omit5 add♯2) | 3 |
| 🔴6 | **Zaug3** | (♭3 omit5 add4) | 3.5 |
| 🔴6 | **Pdim3** | (♭3 omit5 add6) | 3.5 |
| 🔴6 | **Phalfdim7** | (♭3 ♭7 omit5) | 6 |
| 🔴6 | **Zmaj3add9** | (♯9 ♯3 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Zmaj3b5(♭3 ♭5)~~

## P-Q-B  `{1,3,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Pdom7sus2** | (omit5) | 0 |
| 🔵2 | **Bmaj3add9** | (omit5) | 0 |
| 🟢3 | **Baug3** | (omit5 add2) | 0.5 |
| 🟢3 | **Bmaj3** | (omit5 add2) | 0.5 |
| 🟡4 | **Pmaj7sus2** | (♭7 omit5) | 1.5 |
| 🟡4 | **Bsus4** | (♭4 omit5 add2) | 2 |
| 🟠5 | **Phalfdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Bmin3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Pmin7** | (♭3 omit5) | 3 |
| 🟠5 | **Psus2** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Bmin3(♭3 omit5 add3) / Pdim3(♭3 omit5 add♯6) / Pdim7(♭3 ♯7 omit5) / Pmin3(♭3 omit5 add♯6) / Bmin3add11(♭3 ♭11 omit5) / Pmin3add6(♭3 ♯6 omit5) …等 7 条~~

## P-E-X  `{1,4,6}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Pmin3add11** | (omit5) | 0 |
| 🟢3 | **Edom7sus2** | (♭7 omit5) | 1 |
| 🟠5 | **Pdim3** | (♭5) | 3 |
| 🟠5 | **Edim7** | (♭3 omit5) | 3 |
| 🟠5 | **Pmaj3add11** | (♭3 omit5) | 3 |
| 🟠5 | **Emin3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Psus4** | (omit5 add♯2) | 3 |
| 🔴6 | **Paug3** | (♭3 omit5 add4) | 3.5 |
| 🔴6 | **Edim3** | (♭3 omit5 add6) | 3.5 |
| 🔴6 | **Ehalfdim7** | (♭7 ♭3 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Pmaj3add9(♯9 ♯3 omit5) / Pmaj3b5(♭3 ♭5) / Emin7(♭7 ♭3 omit5)~~

## P-E-Y  `{1,4,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Emaj3add6** | (omit5) | 0 |
| ✅1 | **Pmin3** | — | 0 |
| 🟢3 | **Edom7** | (♭7 omit5) | 1 |
| 🟡4 | **Psus2** | (♯2) | 1.5 |
| 🟡4 | **Ysus4** | (♯5) | 1.5 |
| 🟡4 | **Edom7sus4** | (♭7 ♭4 omit5) | 2 |
| 🟠5 | **Eaug3** | (♯5) | 3 |
| 🟠5 | **Yaug3** | (♯3) | 3 |
| 🟠5 | **Pdim3** | (♯5) | 3 |
| 🟠5 | **Edim7** | (♯3 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Pmaj3(♭3) / Emin3add6(♯3 omit5) / Edim3(♯3 omit5 add6) / Paug3(♭3 ♭5) / Ehalfdim7(♭7 ♯3 omit5) / Ymaj3(♯3 ♯5) …等 8 条~~

## P-E-B  `{1,4,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Phalfdim7** | (omit5) | 0 |
| 🔵2 | **Pmin7** | (omit5) | 0 |
| 🟢3 | **Bsus4** | (omit5 add2) | 0.5 |
| 🟢3 | **Pdom7** | (♭3 omit5) | 1 |
| 🟢3 | **Pdom7sus2** | (♯2 omit5) | 1 |
| 🟠5 | **Pdim3** | (omit5 add♯6) | 3 |
| 🟠5 | **Pdim7** | (♯7 omit5) | 3 |
| 🟠5 | **Bmaj3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Pmaj7sus2** | (♯2 ♭7 omit5) | 3 |
| 🟠5 | **Pmin3** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Bmin3add11(♭3 omit5) / Pmin3add6(♯6 omit5) / Pminmaj7(♭7 omit5) / Psus2(♯2 omit5 add♯6) / Paugmaj7(♭3 ♭7 omit5) / Bdim3(♭3 ♭5) …等 9 条~~

## P-F-X  `{1,5,6}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Pmaj3add11** | (omit5) | 0 |
| 🟢3 | **Paug3** | (omit5 add4) | 0.5 |
| 🟠5 | **Pmaj3b5** | (♭5) | 3 |
| 🟠5 | **Pmin3add11** | (♯3 omit5) | 3 |
| 🟠5 | **Fsus2** | (♯5 ♭2) | 3 |
| 🔴6 | **Pdim3** | (♯3 ♭5) | 6 |

## P-F-Z  `{1,5,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Pmaj3add6** | (omit5) | 0 |
| ✅1 | **Zmin3** | — | 0 |
| 🟡4 | **Zsus2** | (♯2) | 1.5 |
| 🟡4 | **Fsus4** | (♯5) | 1.5 |
| 🟠5 | **Paug3** | (♯5) | 3 |
| 🟠5 | **Faug3** | (♯3) | 3 |
| 🟠5 | **Zdim3** | (♯5) | 3 |
| 🟠5 | **Pdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Zmaj3** | (♭3) | 3 |
| 🟠5 | **Pmin3add6** | (♯3 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Pdim3(♯3 omit5 add6) / Zaug3(♭3 ♭5) / Phalfdim7(♯3 ♭7 omit5) / Fmaj3(♯5 ♯3) / Zmaj3b5(♭3 ♯5)~~

## P-F-B  `{1,5,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Pdom7** | (omit5) | 0 |
| 🟢3 | **Pdom7sus4** | (♭4 omit5) | 1 |
| 🟡4 | **Bsus2** | (♭5) | 1.5 |
| 🟡4 | **Bsus4** | (♯4 omit5 add2) | 2 |
| 🟠5 | **Paugmaj7** | (♭7 omit5) | 3 |
| 🟠5 | **Bdim3** | (♭3) | 3 |
| 🟠5 | **Phalfdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Pmaj3** | (omit5 add♯6) | 3 |
| 🟠5 | **Pmaj3add6** | (♯6 omit5) | 3 |
| 🟠5 | **Pmaj7** | (♭7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Pmaj7sus4(♭4 ♭7 omit5) / Pmin7(♯3 omit5) / Fsus4(♯5 ♯4) / Psus4(♭4 omit5 add♯6) / Pdim3(♯3 omit5 add♯6) / Pdim7(♯3 ♯7 omit5) …等 11 条~~

## P-X-Y  `{1,6,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ydom7sus4** | (omit5) | 0 |
| ✅1 | **Xsus2** | — | 0 |
| ✅1 | **Psus4** | — | 0 |
| 🟢3 | **Ydom7** | (♯3 omit5) | 1 |
| 🟡4 | **Ymaj7sus4** | (♭7 omit5) | 1.5 |
| 🟠5 | **Pmaj3** | (♯3) | 3 |
| 🟠5 | **Xmin3** | (♭3) | 3 |
| 🟠5 | **Ysus4** | (omit5 add♯6) | 3 |
| 🔴6 | **Paug3** | (♯3 ♭5) | 6 |
| 🔴6 | **Xdim3** | (♯5 ♭3) | 6 |

> 🗑 已过滤(保留管线):~~Ymaj3(♯3 omit5 add♯6) / Ymaj3add6(♯3 ♯6 omit5) / Pmaj3b5(♯3 ♯5) / Ymaj7(♯3 ♭7 omit5)~~

## P-X-A  `{1,6,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Amaj3add6** | (omit5) | 0 |
| ✅1 | **Xmin3** | — | 0 |
| 🟡4 | **Xsus2** | (♯2) | 1.5 |
| 🟡4 | **Psus4** | (♯5) | 1.5 |
| 🟠5 | **Paug3** | (♯3) | 3 |
| 🟠5 | **Aaug3** | (♯5) | 3 |
| 🟠5 | **Xdim3** | (♯5) | 3 |
| 🟠5 | **Adim7** | (♯3 omit5) | 3 |
| 🟠5 | **Xmaj3** | (♭3) | 3 |
| 🟠5 | **Amin3add6** | (♯3 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Adim3(♯3 omit5 add6) / Xaug3(♭5 ♭3) / Ahalfdim7(♯3 ♭7 omit5) / Pmaj3(♯3 ♯5) / Xmaj3b5(♯5 ♭3)~~

## P-X-B  `{1,6,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Pdom7sus4** | (omit5) | 0 |
| ✅1 | **Bsus2** | — | 0 |
| ✅1 | **Xsus4** | — | 0 |
| 🟢3 | **Pdom7** | (♯3 omit5) | 1 |
| 🟡4 | **Pmaj7sus4** | (♭7 omit5) | 1.5 |
| 🟠5 | **Xmaj3** | (♯3) | 3 |
| 🟠5 | **Bmin3** | (♭3) | 3 |
| 🟠5 | **Psus4** | (omit5 add♯6) | 3 |
| 🔴6 | **Xaug3** | (♭5 ♯3) | 6 |
| 🔴6 | **Paugmaj7** | (♯3 ♭7 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Bdim3(♭3 ♯5) / Pmaj3(♯3 omit5 add♯6) / Pmaj3add6(♯3 ♯6 omit5) / Xmaj3b5(♯5 ♯3) / Pmaj7(♯3 ♭7 omit5)~~

## P-G-Y  `{1,7,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ymaj7sus4** | (omit5) | 0 |
| 🟢3 | **Ysus4** | (omit5 add7) | 0.5 |
| 🟢3 | **Ydom7sus4** | (♯7 omit5) | 1 |
| 🟡4 | **Psus4** | (♯4) | 1.5 |
| 🟡4 | **Ydom7** | (♯3 ♯7 omit5) | 2 |
| 🟠5 | **Yaugmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Ymaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Gsus2** | (♭5 ♭2) | 3 |
| 🔴6 | **Yaug3** | (♯3 omit5 add7) | 3.5 |
| 🔴6 | **Ymaj3** | (♯3 omit5 add7) | 3.5 |

> 🗑 已过滤(保留管线):~~Gsus4(♯4 omit5 add♯1)~~

## P-G-A  `{1,7,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Adom7** | (omit5) | 0 |
| 🟢3 | **Adom7sus4** | (♭4 omit5) | 1 |
| 🟡4 | **Gsus2** | (♭5) | 1.5 |
| 🟡4 | **Gsus4** | (♯4 omit5 add2) | 2 |
| 🟠5 | **Gdim3** | (♭3) | 3 |
| 🟠5 | **Ahalfdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Amaj3** | (omit5 add♯6) | 3 |
| 🟠5 | **Amaj3add6** | (♯6 omit5) | 3 |
| 🟠5 | **Amaj7** | (♭7 omit5) | 3 |
| 🟠5 | **Amaj7sus4** | (♭4 ♭7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Amin7(♯3 omit5) / Psus4(♯4 ♯5) / Asus4(♭4 omit5 add♯6) / Adim3(♯3 omit5 add♯6) / Adim7(♯3 ♯7 omit5) / Gmin3(♭5 ♭3) …等 10 条~~

## P-Y-A  `{1,8,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Aaugmaj7** | (omit5) | 0 |
| 🔵2 | **Amaj7** | (omit5) | 0 |
| 🟢3 | **Aaug3** | (omit5 add7) | 0.5 |
| 🟢3 | **Amaj3** | (omit5 add7) | 0.5 |
| 🟢3 | **Adom7** | (♯7 omit5) | 1 |
| 🟡4 | **Amaj7sus4** | (♭4 omit5) | 1.5 |
| 🟡4 | **Adom7sus4** | (♭4 ♯7 omit5) | 2 |
| 🟡4 | **Asus4** | (♭4 omit5 add7) | 2 |
| 🟠5 | **Aminmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Ysus4** | (omit5 add♯1) | 3 |

> 🗑 已过滤(保留管线):~~Adim3(♯3 omit5 add7) / Amin3(♯3 omit5 add7) / Yaug3(♯3 omit5 add♯1) / Ahalfdim7(♯3 ♯7 omit5) / Ymaj3(♯3 omit5 add♯1) / Ymaj3add9(♯3 ♭9 omit5) …等 7 条~~

## P-Y-Z  `{1,8,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zhalfdim7** | (omit5) | 0 |
| 🔵2 | **Zmin7** | (omit5) | 0 |
| 🟢3 | **Ysus4** | (omit5 add2) | 0.5 |
| 🟢3 | **Zdom7** | (♭3 omit5) | 1 |
| 🟢3 | **Zdom7sus2** | (♯2 omit5) | 1 |
| 🟠5 | **Zdim3** | (omit5 add♯6) | 3 |
| 🟠5 | **Zdim7** | (♯7 omit5) | 3 |
| 🟠5 | **Ymaj3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Zmaj7sus2** | (♯2 ♭7 omit5) | 3 |
| 🟠5 | **Zmin3** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Ymin3add11(♭3 omit5) / Zmin3add6(♯6 omit5) / Zminmaj7(♭7 omit5) / Yaug3(♯3 omit5 add2) / Ymaj3(♯3 omit5 add2) / Zsus2(♯2 omit5 add♯6) …等 10 条~~

## P-Y-B  `{1,8,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ymin3add11** | (omit5) | 0 |
| 🟠5 | **Ydim3** | (♭5) | 3 |
| 🟠5 | **Bdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Ymaj3add11** | (♭3 omit5) | 3 |
| 🟠5 | **Bmin3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Ysus4** | (omit5 add♯2) | 3 |
| 🔴6 | **Bdim3** | (♭3 omit5 add6) | 3.5 |
| 🔴6 | **Yaug3** | (♯3 omit5 add♯2) | 6 |
| 🔴6 | **Bhalfdim7** | (♭3 ♭7 omit5) | 6 |
| 🔴6 | **Ymaj3** | (♯3 omit5 add♯2) | 6 |

> 🗑 已过滤(保留管线):~~Ymaj3add9(♯3 ♯9 omit5)~~

## P-A-Z  `{1,9,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zminmaj7** | (omit5) | 0 |
| 🟢3 | **Zdim3** | (omit5 add7) | 0.5 |
| 🟢3 | **Zmin3** | (omit5 add7) | 0.5 |
| 🟡4 | **Zmaj7sus2** | (♯2 omit5) | 1.5 |
| 🟡4 | **Zdom7** | (♭3 ♯7 omit5) | 2 |
| 🟡4 | **Zdom7sus2** | (♯2 ♯7 omit5) | 2 |
| 🟡4 | **Zsus2** | (♯2 omit5 add7) | 2 |
| 🟠5 | **Aaug3** | (omit5 add♯1) | 3 |
| 🟠5 | **Zaugmaj7** | (♭3 omit5) | 3 |
| 🟠5 | **Zhalfdim7** | (♯7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Amaj3(omit5 add♯1) / Amaj3add9(♭9 omit5) / Zmaj7(♭3 omit5) / Zmin7(♯7 omit5) / Zaug3(♭3 omit5 add7) / Zmaj3(♭3 omit5 add7) …等 10 条~~

## P-A-B  `{1,9,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bdom7sus2** | (omit5) | 0 |
| 🔵2 | **Amaj3add9** | (omit5) | 0 |
| 🟢3 | **Aaug3** | (omit5 add2) | 0.5 |
| 🟢3 | **Amaj3** | (omit5 add2) | 0.5 |
| 🟡4 | **Bmaj7sus2** | (♭7 omit5) | 1.5 |
| 🟡4 | **Asus4** | (♭4 omit5 add2) | 2 |
| 🟠5 | **Bhalfdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Amin3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Bmin7** | (♭3 omit5) | 3 |
| 🟠5 | **Bsus2** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Adim3(♯3 omit5 add2) / Amin3(♯3 omit5 add2) / Bdim3(♭3 omit5 add♯6) / Bdim7(♭3 ♯7 omit5) / Bmin3(♭3 omit5 add♯6) / Bmin3add6(♭3 ♯6 omit5) …等 7 条~~

## D-Q-X  `{2,3,6}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qminmaj7** | (omit5) | 0 |
| 🟢3 | **Qdim3** | (omit5 add7) | 0.5 |
| 🟢3 | **Qmin3** | (omit5 add7) | 0.5 |
| 🟡4 | **Qmaj7sus2** | (♯2 omit5) | 1.5 |
| 🟡4 | **Qdom7** | (♯7 ♭3 omit5) | 2 |
| 🟡4 | **Qdom7sus2** | (♯7 ♯2 omit5) | 2 |
| 🟡4 | **Qsus2** | (♯2 omit5 add7) | 2 |
| 🟠5 | **Daug3** | (omit5 add♯1) | 3 |
| 🟠5 | **Qaugmaj7** | (♭3 omit5) | 3 |
| 🟠5 | **Qhalfdim7** | (♯7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Dmaj3(omit5 add♯1) / Dmaj3add9(♭9 omit5) / Qmaj7(♭3 omit5) / Qmin7(♯7 omit5) / Qaug3(♭3 omit5 add7) / Qmaj3(♭3 omit5 add7) …等 8 条~~

## D-Q-G  `{2,3,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qaugmaj7** | (omit5) | 0 |
| 🔵2 | **Qmaj7** | (omit5) | 0 |
| 🟢3 | **Qaug3** | (omit5 add7) | 0.5 |
| 🟢3 | **Qmaj3** | (omit5 add7) | 0.5 |
| 🟢3 | **Qdom7** | (♯7 omit5) | 1 |
| 🟡4 | **Qmaj7sus4** | (♭4 omit5) | 1.5 |
| 🟡4 | **Qdom7sus4** | (♯7 ♭4 omit5) | 2 |
| 🟡4 | **Qsus4** | (♭4 omit5 add7) | 2 |
| 🟠5 | **Qminmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Dsus4** | (omit5 add♯1) | 3 |

> 🗑 已过滤(保留管线):~~Qdim3(♯3 omit5 add7) / Qmin3(♯3 omit5 add7) / Daug3(♯3 omit5 add♯1) / Qhalfdim7(♯7 ♯3 omit5) / Dmaj3(♯3 omit5 add♯1) / Dmaj3add9(♭9 ♯3 omit5) …等 7 条~~

## D-Q-Y  `{2,3,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qmaj7sus4** | (omit5) | 0 |
| 🟢3 | **Qsus4** | (omit5 add7) | 0.5 |
| 🟢3 | **Qdom7sus4** | (♯7 omit5) | 1 |
| 🟡4 | **Ysus4** | (♯4) | 1.5 |
| 🟡4 | **Qdom7** | (♯7 ♯3 omit5) | 2 |
| 🟠5 | **Qaugmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Qmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Dsus2** | (♭2 ♭5) | 3 |
| 🔴6 | **Qaug3** | (♯3 omit5 add7) | 3.5 |
| 🔴6 | **Qmaj3** | (♯3 omit5 add7) | 3.5 |

> 🗑 已过滤(保留管线):~~Dsus4(♯4 omit5 add♯1)~~

## D-Q-Z  `{2,3,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zmaj3add11** | (omit5) | 0 |
| 🟢3 | **Zaug3** | (omit5 add4) | 0.5 |
| 🟠5 | **Zmaj3b5** | (♭5) | 3 |
| 🟠5 | **Zmin3add11** | (♯3 omit5) | 3 |
| 🟠5 | **Dsus2** | (♭2 ♯5) | 3 |
| 🔴6 | **Zdim3** | (♯3 ♭5) | 6 |

## D-E-F  `{2,4,5}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Dmin3add9** | (omit5) | 0 |
| 🟢3 | **Ddim3** | (omit5 add2) | 0.5 |
| 🟢3 | **Dmin3** | (omit5 add2) | 0.5 |
| 🟢3 | **Edom7sus2** | (♭2 omit5) | 1 |
| 🟠5 | **Dmaj3add9** | (♭3 omit5) | 3 |
| 🟠5 | **Emaj7sus2** | (♭7 ♭2 omit5) | 3 |
| 🟠5 | **Dsus2** | (omit5 add♯2) | 3 |
| 🔴6 | **Esus2** | (♭2 omit5 add♯6) | 4.5 |

## D-E-X  `{2,4,6}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Edom7sus2** | (omit5) | 0 |
| 🔵2 | **Dmaj3add9** | (omit5) | 0 |
| 🟢3 | **Daug3** | (omit5 add2) | 0.5 |
| 🟢3 | **Dmaj3** | (omit5 add2) | 0.5 |
| 🟡4 | **Emaj7sus2** | (♭7 omit5) | 1.5 |
| 🟡4 | **Dsus4** | (♭4 omit5 add2) | 2 |
| 🟠5 | **Ehalfdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Dmin3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Emin7** | (♭3 omit5) | 3 |
| 🟠5 | **Esus2** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Dmin3(♭3 omit5 add3) / Edim3(♭3 omit5 add♯6) / Edim7(♯7 ♭3 omit5) / Emin3(♭3 omit5 add♯6) / Dmin3add11(♭3 ♭11 omit5) / Emin3add6(♯6 ♭3 omit5) …等 7 条~~

## D-E-G  `{2,4,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ehalfdim7** | (omit5) | 0 |
| 🔵2 | **Emin7** | (omit5) | 0 |
| 🟢3 | **Dsus4** | (omit5 add2) | 0.5 |
| 🟢3 | **Edom7** | (♭3 omit5) | 1 |
| 🟢3 | **Edom7sus2** | (♯2 omit5) | 1 |
| 🟠5 | **Edim3** | (omit5 add♯6) | 3 |
| 🟠5 | **Edim7** | (♯7 omit5) | 3 |
| 🟠5 | **Dmaj3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Emaj7sus2** | (♭7 ♯2 omit5) | 3 |
| 🟠5 | **Emin3** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Dmin3add11(♭3 omit5) / Emin3add6(♯6 omit5) / Eminmaj7(♭7 omit5) / Esus2(♯2 omit5 add♯6) / Ddim3(♭3 ♭5) / Emaj3(♭3 omit5 add♯6) …等 8 条~~

## D-E-Y  `{2,4,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Edom7** | (omit5) | 0 |
| 🟢3 | **Edom7sus4** | (♭4 omit5) | 1 |
| 🟡4 | **Dsus2** | (♭5) | 1.5 |
| 🟡4 | **Dsus4** | (♯4 omit5 add2) | 2 |
| 🟠5 | **Ddim3** | (♭3) | 3 |
| 🟠5 | **Ehalfdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Emaj3** | (omit5 add♯6) | 3 |
| 🟠5 | **Emaj3add6** | (♯6 omit5) | 3 |
| 🟠5 | **Emaj7** | (♭7 omit5) | 3 |
| 🟠5 | **Emaj7sus4** | (♭7 ♭4 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Emin7(♯3 omit5) / Ysus4(♯4 ♯5) / Esus4(♭4 omit5 add♯6) / Edim3(♯3 omit5 add♯6) / Edim7(♯7 ♯3 omit5) / Dmin3(♭3 ♭5) …等 10 条~~

## D-E-A  `{2,4,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Edom7sus4** | (omit5) | 0 |
| ✅1 | **Dsus2** | — | 0 |
| ✅1 | **Asus4** | — | 0 |
| 🟢3 | **Edom7** | (♯3 omit5) | 1 |
| 🟡4 | **Emaj7sus4** | (♭7 omit5) | 1.5 |
| 🟠5 | **Amaj3** | (♯3) | 3 |
| 🟠5 | **Dmin3** | (♭3) | 3 |
| 🟠5 | **Esus4** | (omit5 add♯6) | 3 |
| 🔴6 | **Aaug3** | (♯3 ♭5) | 6 |
| 🔴6 | **Ddim3** | (♭3 ♯5) | 6 |

> 🗑 已过滤(保留管线):~~Emaj3(♯3 omit5 add♯6) / Emaj3add6(♯6 ♯3 omit5) / Amaj3b5(♯3 ♯5) / Emaj7(♭7 ♯3 omit5)~~

## D-E-B  `{2,4,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bmin3add11** | (omit5) | 0 |
| 🟢3 | **Ddom7sus2** | (♭7 omit5) | 1 |
| 🟠5 | **Bdim3** | (♭5) | 3 |
| 🟠5 | **Ddim7** | (♭3 omit5) | 3 |
| 🟠5 | **Bmaj3add11** | (♭3 omit5) | 3 |
| 🟠5 | **Dmin3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Bsus4** | (omit5 add♯2) | 3 |
| 🔴6 | **Baug3** | (♭3 omit5 add4) | 3.5 |
| 🔴6 | **Ddim3** | (♭3 omit5 add6) | 3.5 |
| 🔴6 | **Dhalfdim7** | (♭3 ♭7 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Bmaj3add9(♯9 ♯3 omit5) / Bmaj3b5(♭3 ♭5) / Dmin7(♭3 ♭7 omit5)~~

## D-F-G  `{2,5,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Dmin3add11** | (omit5) | 0 |
| 🟠5 | **Ddim3** | (♭5) | 3 |
| 🟠5 | **Fdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Dmaj3add11** | (♭3 omit5) | 3 |
| 🟠5 | **Fmin3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Dsus4** | (omit5 add♯2) | 3 |
| 🔴6 | **Daug3** | (♭3 omit5 add4) | 3.5 |
| 🔴6 | **Fdim3** | (♭3 omit5 add6) | 3.5 |
| 🔴6 | **Fhalfdim7** | (♭7 ♭3 omit5) | 6 |
| 🔴6 | **Dmaj3add9** | (♯9 ♯3 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Dmaj3b5(♭3 ♭5)~~

## D-F-A  `{2,5,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fmaj3add6** | (omit5) | 0 |
| ✅1 | **Dmin3** | — | 0 |
| 🟡4 | **Dsus2** | (♯2) | 1.5 |
| 🟡4 | **Asus4** | (♯5) | 1.5 |
| 🟠5 | **Faug3** | (♯5) | 3 |
| 🟠5 | **Aaug3** | (♯3) | 3 |
| 🟠5 | **Ddim3** | (♯5) | 3 |
| 🟠5 | **Fdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Dmaj3** | (♭3) | 3 |
| 🟠5 | **Fmin3add6** | (♯3 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Fdim3(♯3 omit5 add6) / Daug3(♭3 ♭5) / Fhalfdim7(♭7 ♯3 omit5) / Amaj3(♯3 ♯5) / Dmaj3b5(♭3 ♯5)~~

## D-X-G  `{2,6,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Dmaj3add11** | (omit5) | 0 |
| 🟢3 | **Daug3** | (omit5 add4) | 0.5 |
| 🟠5 | **Dmaj3b5** | (♭5) | 3 |
| 🟠5 | **Dmin3add11** | (♯3 omit5) | 3 |
| 🟠5 | **Xsus2** | (♯5 ♭2) | 3 |
| 🔴6 | **Ddim3** | (♯3 ♭5) | 6 |

## D-X-B  `{2,6,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Dmaj3add6** | (omit5) | 0 |
| ✅1 | **Bmin3** | — | 0 |
| 🟢3 | **Ddom7** | (♭7 omit5) | 1 |
| 🟡4 | **Bsus2** | (♯2) | 1.5 |
| 🟡4 | **Xsus4** | (♯5) | 1.5 |
| 🟡4 | **Ddom7sus4** | (♭4 ♭7 omit5) | 2 |
| 🟠5 | **Daug3** | (♯5) | 3 |
| 🟠5 | **Xaug3** | (♯3) | 3 |
| 🟠5 | **Bdim3** | (♯5) | 3 |
| 🟠5 | **Ddim7** | (♯3 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Bmaj3(♭3) / Dmin3add6(♯3 omit5) / Ddim3(♯3 omit5 add6) / Baug3(♭3 ♭5) / Dhalfdim7(♯3 ♭7 omit5) / Xmaj3(♯5 ♯3) …等 8 条~~

## D-G-A  `{2,7,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Adom7sus4** | (omit5) | 0 |
| ✅1 | **Gsus2** | — | 0 |
| ✅1 | **Dsus4** | — | 0 |
| 🟢3 | **Adom7** | (♯3 omit5) | 1 |
| 🟡4 | **Amaj7sus4** | (♭7 omit5) | 1.5 |
| 🟠5 | **Dmaj3** | (♯3) | 3 |
| 🟠5 | **Gmin3** | (♭3) | 3 |
| 🟠5 | **Asus4** | (omit5 add♯6) | 3 |
| 🔴6 | **Daug3** | (♯3 ♭5) | 6 |
| 🔴6 | **Gdim3** | (♯5 ♭3) | 6 |

> 🗑 已过滤(保留管线):~~Amaj3(♯3 omit5 add♯6) / Amaj3add6(♯3 ♯6 omit5) / Dmaj3b5(♯3 ♯5) / Amaj7(♯3 ♭7 omit5)~~

## D-G-Z  `{2,7,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zmaj3add6** | (omit5) | 0 |
| ✅1 | **Gmin3** | — | 0 |
| 🟡4 | **Gsus2** | (♯2) | 1.5 |
| 🟡4 | **Dsus4** | (♯5) | 1.5 |
| 🟠5 | **Daug3** | (♯3) | 3 |
| 🟠5 | **Zaug3** | (♯5) | 3 |
| 🟠5 | **Gdim3** | (♯5) | 3 |
| 🟠5 | **Zdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Gmaj3** | (♭3) | 3 |
| 🟠5 | **Zmin3add6** | (♯3 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Zdim3(♯3 omit5 add6) / Gaug3(♭5 ♭3) / Zhalfdim7(♯3 ♭7 omit5) / Dmaj3(♯3 ♯5) / Gmaj3b5(♯5 ♭3)~~

## D-Y-A  `{2,8,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Amaj7sus4** | (omit5) | 0 |
| 🟢3 | **Asus4** | (omit5 add7) | 0.5 |
| 🟢3 | **Adom7sus4** | (♯7 omit5) | 1 |
| 🟡4 | **Dsus4** | (♯4) | 1.5 |
| 🟡4 | **Adom7** | (♯3 ♯7 omit5) | 2 |
| 🟠5 | **Aaugmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Amaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Ysus2** | (♭5 ♭2) | 3 |
| 🔴6 | **Aaug3** | (♯3 omit5 add7) | 3.5 |
| 🔴6 | **Amaj3** | (♯3 omit5 add7) | 3.5 |

> 🗑 已过滤(保留管线):~~Ysus4(♯4 omit5 add♯1)~~

## D-Y-Z  `{2,8,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zdom7** | (omit5) | 0 |
| 🟢3 | **Zdom7sus4** | (♭4 omit5) | 1 |
| 🟡4 | **Ysus2** | (♭5) | 1.5 |
| 🟡4 | **Ysus4** | (♯4 omit5 add2) | 2 |
| 🟠5 | **Ydim3** | (♭3) | 3 |
| 🟠5 | **Zhalfdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Zmaj3** | (omit5 add♯6) | 3 |
| 🟠5 | **Zmaj3add6** | (♯6 omit5) | 3 |
| 🟠5 | **Zmaj7** | (♭7 omit5) | 3 |
| 🟠5 | **Zmaj7sus4** | (♭4 ♭7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Zmin7(♯3 omit5) / Dsus4(♯4 ♯5) / Zsus4(♭4 omit5 add♯6) / Zdim3(♯3 omit5 add♯6) / Zdim7(♯3 ♯7 omit5) / Ymin3(♭5 ♭3) …等 10 条~~

## D-A-Z  `{2,9,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zaugmaj7** | (omit5) | 0 |
| 🔵2 | **Zmaj7** | (omit5) | 0 |
| 🟢3 | **Zaug3** | (omit5 add7) | 0.5 |
| 🟢3 | **Zmaj3** | (omit5 add7) | 0.5 |
| 🟢3 | **Zdom7** | (♯7 omit5) | 1 |
| 🟡4 | **Zmaj7sus4** | (♭4 omit5) | 1.5 |
| 🟡4 | **Zdom7sus4** | (♭4 ♯7 omit5) | 2 |
| 🟡4 | **Zsus4** | (♭4 omit5 add7) | 2 |
| 🟠5 | **Zminmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Asus4** | (omit5 add♯1) | 3 |

> 🗑 已过滤(保留管线):~~Zdim3(♯3 omit5 add7) / Zmin3(♯3 omit5 add7) / Aaug3(♯3 omit5 add♯1) / Zhalfdim7(♯3 ♯7 omit5) / Amaj3(♯3 omit5 add♯1) / Amaj3add9(♯3 ♭9 omit5) …等 7 条~~

## D-A-B  `{2,9,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bhalfdim7** | (omit5) | 0 |
| 🔵2 | **Bmin7** | (omit5) | 0 |
| 🟢3 | **Asus4** | (omit5 add2) | 0.5 |
| 🟢3 | **Bdom7** | (♭3 omit5) | 1 |
| 🟢3 | **Bdom7sus2** | (♯2 omit5) | 1 |
| 🟠5 | **Bdim3** | (omit5 add♯6) | 3 |
| 🟠5 | **Bdim7** | (♯7 omit5) | 3 |
| 🟠5 | **Amaj3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Bmaj7sus2** | (♯2 ♭7 omit5) | 3 |
| 🟠5 | **Bmin3** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Amin3add11(♭3 omit5) / Bmin3add6(♯6 omit5) / Bminmaj7(♭7 omit5) / Aaug3(♯3 omit5 add2) / Amaj3(♯3 omit5 add2) / Bsus2(♯2 omit5 add♯6) …等 9 条~~

## D-Z-B  `{2,10,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bminmaj7** | (omit5) | 0 |
| 🟢3 | **Bdim3** | (omit5 add7) | 0.5 |
| 🟢3 | **Bmin3** | (omit5 add7) | 0.5 |
| 🟡4 | **Bmaj7sus2** | (♯2 omit5) | 1.5 |
| 🟡4 | **Bdom7** | (♭3 ♯7 omit5) | 2 |
| 🟡4 | **Bdom7sus2** | (♯2 ♯7 omit5) | 2 |
| 🟡4 | **Bsus2** | (♯2 omit5 add7) | 2 |
| 🟠5 | **Zaug3** | (omit5 add♯1) | 3 |
| 🟠5 | **Baugmaj7** | (♭3 omit5) | 3 |
| 🟠5 | **Bhalfdim7** | (♯7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Zmaj3(omit5 add♯1) / Zmaj3add9(♭9 omit5) / Bmaj7(♭3 omit5) / Bmin7(♯7 omit5) / Baug3(♭3 omit5 add7) / Bmaj3(♭3 omit5 add7) …等 9 条~~

## Q-E-G  `{3,4,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Eminmaj7** | (omit5) | 0 |
| 🟢3 | **Edim3** | (omit5 add7) | 0.5 |
| 🟢3 | **Emin3** | (omit5 add7) | 0.5 |
| 🟡4 | **Emaj7sus2** | (♯2 omit5) | 1.5 |
| 🟡4 | **Edom7** | (♯7 ♭3 omit5) | 2 |
| 🟡4 | **Edom7sus2** | (♯7 ♯2 omit5) | 2 |
| 🟡4 | **Esus2** | (♯2 omit5 add7) | 2 |
| 🟠5 | **Qaug3** | (omit5 add♯1) | 3 |
| 🟠5 | **Eaugmaj7** | (♭3 omit5) | 3 |
| 🟠5 | **Ehalfdim7** | (♯7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Qmaj3(omit5 add♯1) / Qmaj3add9(♭9 omit5) / Emaj7(♭3 omit5) / Emin7(♯7 omit5) / Eaug3(♭3 omit5 add7) / Emaj3(♭3 omit5 add7) …等 8 条~~

## Q-E-Y  `{3,4,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Eaugmaj7** | (omit5) | 0 |
| 🔵2 | **Emaj7** | (omit5) | 0 |
| 🟢3 | **Eaug3** | (omit5 add7) | 0.5 |
| 🟢3 | **Emaj3** | (omit5 add7) | 0.5 |
| 🟢3 | **Edom7** | (♯7 omit5) | 1 |
| 🟡4 | **Emaj7sus4** | (♭4 omit5) | 1.5 |
| 🟡4 | **Edom7sus4** | (♯7 ♭4 omit5) | 2 |
| 🟡4 | **Esus4** | (♭4 omit5 add7) | 2 |
| 🟠5 | **Eminmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Qsus4** | (omit5 add♯1) | 3 |

> 🗑 已过滤(保留管线):~~Edim3(♯3 omit5 add7) / Emin3(♯3 omit5 add7) / Qaug3(♯3 omit5 add♯1) / Ehalfdim7(♯7 ♯3 omit5) / Qmaj3(♯3 omit5 add♯1) / Qmaj3add9(♭9 ♯3 omit5) …等 7 条~~

## Q-E-A  `{3,4,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Emaj7sus4** | (omit5) | 0 |
| 🟢3 | **Esus4** | (omit5 add7) | 0.5 |
| 🟢3 | **Edom7sus4** | (♯7 omit5) | 1 |
| 🟡4 | **Asus4** | (♯4) | 1.5 |
| 🟡4 | **Edom7** | (♯7 ♯3 omit5) | 2 |
| 🟠5 | **Eaugmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Emaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Qsus2** | (♭2 ♭5) | 3 |
| 🔴6 | **Eaug3** | (♯3 omit5 add7) | 3.5 |
| 🔴6 | **Emaj3** | (♯3 omit5 add7) | 3.5 |

> 🗑 已过滤(保留管线):~~Qsus4(♯4 omit5 add♯1)~~

## Q-E-B  `{3,4,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bmaj3add11** | (omit5) | 0 |
| 🟢3 | **Baug3** | (omit5 add4) | 0.5 |
| 🟠5 | **Bmaj3b5** | (♭5) | 3 |
| 🟠5 | **Bmin3add11** | (♯3 omit5) | 3 |
| 🟠5 | **Qsus2** | (♭2 ♯5) | 3 |
| 🔴6 | **Bdim3** | (♯3 ♭5) | 6 |

## Q-F-X  `{3,5,6}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qmin3add9** | (omit5) | 0 |
| 🟢3 | **Qdim3** | (omit5 add2) | 0.5 |
| 🟢3 | **Qmin3** | (omit5 add2) | 0.5 |
| 🟢3 | **Fdom7sus2** | (♭2 omit5) | 1 |
| 🟠5 | **Qmaj3add9** | (♭3 omit5) | 3 |
| 🟠5 | **Fmaj7sus2** | (♭7 ♭2 omit5) | 3 |
| 🟠5 | **Qsus2** | (omit5 add♯2) | 3 |
| 🔴6 | **Fsus2** | (♭2 omit5 add♯6) | 4.5 |

## Q-F-G  `{3,5,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fdom7sus2** | (omit5) | 0 |
| 🔵2 | **Qmaj3add9** | (omit5) | 0 |
| 🟢3 | **Qaug3** | (omit5 add2) | 0.5 |
| 🟢3 | **Qmaj3** | (omit5 add2) | 0.5 |
| 🟡4 | **Fmaj7sus2** | (♭7 omit5) | 1.5 |
| 🟡4 | **Qsus4** | (♭4 omit5 add2) | 2 |
| 🟠5 | **Fhalfdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Qmin3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Fmin7** | (♭3 omit5) | 3 |
| 🟠5 | **Fsus2** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Qmin3(♭3 omit5 add3) / Fdim3(♭3 omit5 add♯6) / Fdim7(♯7 ♭3 omit5) / Fmin3(♭3 omit5 add♯6) / Qmin3add11(♭3 ♭11 omit5) / Fmin3add6(♯6 ♭3 omit5) …等 7 条~~

## Q-F-Y  `{3,5,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fhalfdim7** | (omit5) | 0 |
| 🔵2 | **Fmin7** | (omit5) | 0 |
| 🟢3 | **Qsus4** | (omit5 add2) | 0.5 |
| 🟢3 | **Fdom7** | (♭3 omit5) | 1 |
| 🟢3 | **Fdom7sus2** | (♯2 omit5) | 1 |
| 🟠5 | **Fdim3** | (omit5 add♯6) | 3 |
| 🟠5 | **Fdim7** | (♯7 omit5) | 3 |
| 🟠5 | **Qmaj3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Fmaj7sus2** | (♭7 ♯2 omit5) | 3 |
| 🟠5 | **Fmin3** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Qmin3add11(♭3 omit5) / Fmin3add6(♯6 omit5) / Fminmaj7(♭7 omit5) / Fsus2(♯2 omit5 add♯6) / Qdim3(♭3 ♭5) / Fmaj3(♭3 omit5 add♯6) …等 8 条~~

## Q-F-A  `{3,5,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fdom7** | (omit5) | 0 |
| 🟢3 | **Fdom7sus4** | (♭4 omit5) | 1 |
| 🟡4 | **Qsus2** | (♭5) | 1.5 |
| 🟡4 | **Qsus4** | (♯4 omit5 add2) | 2 |
| 🟠5 | **Qdim3** | (♭3) | 3 |
| 🟠5 | **Fhalfdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Fmaj3** | (omit5 add♯6) | 3 |
| 🟠5 | **Fmaj3add6** | (♯6 omit5) | 3 |
| 🟠5 | **Fmaj7** | (♭7 omit5) | 3 |
| 🟠5 | **Fmaj7sus4** | (♭7 ♭4 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Fmin7(♯3 omit5) / Asus4(♯4 ♯5) / Fsus4(♭4 omit5 add♯6) / Fdim3(♯3 omit5 add♯6) / Fdim7(♯7 ♯3 omit5) / Qmin3(♭3 ♭5) …等 10 条~~

## Q-F-Z  `{3,5,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fdom7sus4** | (omit5) | 0 |
| ✅1 | **Qsus2** | — | 0 |
| ✅1 | **Zsus4** | — | 0 |
| 🟡4 | **Fmaj7sus4** | (♭7 omit5) | 1.5 |
| 🟠5 | **Zmaj3** | (♯3) | 3 |
| 🟠5 | **Qmin3** | (♭3) | 3 |
| 🟠5 | **Fsus4** | (omit5 add♯6) | 3 |
| 🔴6 | **Zaug3** | (♯3 ♭5) | 6 |
| 🔴6 | **Qdim3** | (♭3 ♯5) | 6 |
| 🔴6 | **Zmaj3b5** | (♯3 ♯5) | 6 |

## Q-X-Y  `{3,6,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qmin3add11** | (omit5) | 0 |
| 🟠5 | **Qdim3** | (♭5) | 3 |
| 🟠5 | **Xdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Qmaj3add11** | (♭3 omit5) | 3 |
| 🟠5 | **Xmin3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Qsus4** | (omit5 add♯2) | 3 |
| 🔴6 | **Qaug3** | (♭3 omit5 add4) | 3.5 |
| 🔴6 | **Xdim3** | (♭3 omit5 add6) | 3.5 |
| 🔴6 | **Xhalfdim7** | (♭7 ♭3 omit5) | 6 |
| 🔴6 | **Qmaj3add9** | (♯9 ♯3 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Qmaj3b5(♭3 ♭5)~~

## Q-X-Z  `{3,6,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xmaj3add6** | (omit5) | 0 |
| ✅1 | **Qmin3** | — | 0 |
| 🟡4 | **Qsus2** | (♯2) | 1.5 |
| 🟡4 | **Zsus4** | (♯5) | 1.5 |
| 🟠5 | **Xaug3** | (♯5) | 3 |
| 🟠5 | **Zaug3** | (♯3) | 3 |
| 🟠5 | **Qdim3** | (♯5) | 3 |
| 🟠5 | **Qmaj3** | (♭3) | 3 |
| 🟠5 | **Xmin3add6** | (♯3 omit5) | 3 |
| 🔴6 | **Qaug3** | (♭3 ♭5) | 6 |

> 🗑 已过滤(保留管线):~~Zmaj3(♯3 ♯5) / Qmaj3b5(♭3 ♯5)~~

## Q-G-Y  `{3,7,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qmaj3add11** | (omit5) | 0 |
| 🟢3 | **Qaug3** | (omit5 add4) | 0.5 |
| 🟠5 | **Qmaj3b5** | (♭5) | 3 |
| 🟠5 | **Qmin3add11** | (♯3 omit5) | 3 |
| 🟠5 | **Gsus2** | (♯5 ♭2) | 3 |
| 🔴6 | **Qdim3** | (♯3 ♭5) | 6 |

## Q-Y-Z  `{3,8,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zdom7sus4** | (omit5) | 0 |
| ✅1 | **Ysus2** | — | 0 |
| ✅1 | **Qsus4** | — | 0 |
| 🟢3 | **Zdom7** | (♯3 omit5) | 1 |
| 🟡4 | **Zmaj7sus4** | (♭7 omit5) | 1.5 |
| 🟠5 | **Qmaj3** | (♯3) | 3 |
| 🟠5 | **Ymin3** | (♭3) | 3 |
| 🟠5 | **Zsus4** | (omit5 add♯6) | 3 |
| 🔴6 | **Qaug3** | (♯3 ♭5) | 6 |
| 🔴6 | **Ydim3** | (♯5 ♭3) | 6 |

> 🗑 已过滤(保留管线):~~Zmaj3(♯3 omit5 add♯6) / Zmaj3add6(♯3 ♯6 omit5) / Qmaj3b5(♯3 ♯5) / Zmaj7(♯3 ♭7 omit5)~~

## Q-Y-B  `{3,8,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bmaj3add6** | (omit5) | 0 |
| ✅1 | **Ymin3** | — | 0 |
| 🟡4 | **Ysus2** | (♯2) | 1.5 |
| 🟡4 | **Qsus4** | (♯5) | 1.5 |
| 🟠5 | **Qaug3** | (♯3) | 3 |
| 🟠5 | **Baug3** | (♯5) | 3 |
| 🟠5 | **Ydim3** | (♯5) | 3 |
| 🟠5 | **Bdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Ymaj3** | (♭3) | 3 |
| 🟠5 | **Bmin3add6** | (♯3 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Bdim3(♯3 omit5 add6) / Yaug3(♭5 ♭3) / Bhalfdim7(♯3 ♭7 omit5) / Qmaj3(♯3 ♯5) / Qmaj3add6(♯3 ♭6 omit5) / Ymaj3b5(♯5 ♭3)~~

## Q-A-Z  `{3,9,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zmaj7sus4** | (omit5) | 0 |
| 🟢3 | **Zsus4** | (omit5 add7) | 0.5 |
| 🟢3 | **Zdom7sus4** | (♯7 omit5) | 1 |
| 🟡4 | **Qsus4** | (♯4) | 1.5 |
| 🟡4 | **Zdom7** | (♯3 ♯7 omit5) | 2 |
| 🟠5 | **Zaugmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Zmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Asus2** | (♭5 ♭2) | 3 |
| 🔴6 | **Zaug3** | (♯3 omit5 add7) | 3.5 |
| 🔴6 | **Zmaj3** | (♯3 omit5 add7) | 3.5 |

> 🗑 已过滤(保留管线):~~Asus4(♯4 omit5 add♯1)~~

## Q-A-B  `{3,9,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bdom7** | (omit5) | 0 |
| 🟢3 | **Bdom7sus4** | (♭4 omit5) | 1 |
| 🟡4 | **Asus2** | (♭5) | 1.5 |
| 🟡4 | **Asus4** | (♯4 omit5 add2) | 2 |
| 🟠5 | **Adim3** | (♭3) | 3 |
| 🟠5 | **Bhalfdim7** | (♯3 omit5) | 3 |
| 🟠5 | **Bmaj3** | (omit5 add♯6) | 3 |
| 🟠5 | **Bmaj3add6** | (♯6 omit5) | 3 |
| 🟠5 | **Bmaj7** | (♭7 omit5) | 3 |
| 🟠5 | **Bmaj7sus4** | (♭4 ♭7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Bmin7(♯3 omit5) / Qsus4(♯4 ♯5) / Bsus4(♭4 omit5 add♯6) / Bdim3(♯3 omit5 add♯6) / Bdim7(♯3 ♯7 omit5) / Amin3(♭5 ♭3) …等 10 条~~

## Q-Z-B  `{3,10,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Baugmaj7** | (omit5) | 0 |
| 🔵2 | **Bmaj7** | (omit5) | 0 |
| 🟢3 | **Baug3** | (omit5 add7) | 0.5 |
| 🟢3 | **Bmaj3** | (omit5 add7) | 0.5 |
| 🟢3 | **Bdom7** | (♯7 omit5) | 1 |
| 🟡4 | **Bmaj7sus4** | (♭4 omit5) | 1.5 |
| 🟡4 | **Bdom7sus4** | (♭4 ♯7 omit5) | 2 |
| 🟡4 | **Bsus4** | (♭4 omit5 add7) | 2 |
| 🟠5 | **Bminmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Zsus4** | (omit5 add♯1) | 3 |

> 🗑 已过滤(保留管线):~~Bdim3(♯3 omit5 add7) / Bmin3(♯3 omit5 add7) / Zaug3(♯3 omit5 add♯1) / Bhalfdim7(♯3 ♯7 omit5) / Zmaj3(♯3 omit5 add♯1) / Zmaj3add9(♯3 ♭9 omit5) …等 7 条~~

## E-F-Y  `{4,5,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fminmaj7** | (omit5) | 0 |
| 🟢3 | **Fdim3** | (omit5 add7) | 0.5 |
| 🟢3 | **Fmin3** | (omit5 add7) | 0.5 |
| 🟡4 | **Fmaj7sus2** | (♯2 omit5) | 1.5 |
| 🟡4 | **Fdom7** | (♯7 ♭3 omit5) | 2 |
| 🟡4 | **Fdom7sus2** | (♯7 ♯2 omit5) | 2 |
| 🟡4 | **Fsus2** | (♯2 omit5 add7) | 2 |
| 🟠5 | **Eaug3** | (omit5 add♯1) | 3 |
| 🟠5 | **Faugmaj7** | (♭3 omit5) | 3 |
| 🟠5 | **Fhalfdim7** | (♯7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Emaj3(omit5 add♯1) / Emaj3add9(♭9 omit5) / Fmaj7(♭3 omit5) / Fmin7(♯7 omit5) / Faug3(♭3 omit5 add7) / Fmaj3(♭3 omit5 add7) …等 8 条~~

## E-F-A  `{4,5,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Faugmaj7** | (omit5) | 0 |
| 🔵2 | **Fmaj7** | (omit5) | 0 |
| 🟢3 | **Faug3** | (omit5 add7) | 0.5 |
| 🟢3 | **Fmaj3** | (omit5 add7) | 0.5 |
| 🟢3 | **Fdom7** | (♯7 omit5) | 1 |
| 🟡4 | **Fmaj7sus4** | (♭4 omit5) | 1.5 |
| 🟡4 | **Fdom7sus4** | (♯7 ♭4 omit5) | 2 |
| 🟡4 | **Fsus4** | (♭4 omit5 add7) | 2 |
| 🟠5 | **Fminmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Esus4** | (omit5 add♯1) | 3 |

> 🗑 已过滤(保留管线):~~Fdim3(♯3 omit5 add7) / Fmin3(♯3 omit5 add7) / Eaug3(♯3 omit5 add♯1) / Fhalfdim7(♯7 ♯3 omit5) / Emaj3(♯3 omit5 add♯1) / Emaj3add9(♭9 ♯3 omit5) …等 7 条~~

## E-F-Z  `{4,5,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fmaj7sus4** | (omit5) | 0 |
| 🟢3 | **Fsus4** | (omit5 add7) | 0.5 |
| 🟢3 | **Fdom7sus4** | (♯7 omit5) | 1 |
| 🟡4 | **Zsus4** | (♯4) | 1.5 |
| 🟠5 | **Faugmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Esus2** | (♭2 ♭5) | 3 |
| 🔴6 | **Faug3** | (♯3 omit5 add7) | 3.5 |
| 🔴6 | **Esus4** | (♯4 omit5 add♯1) | 4.5 |

## E-X-G  `{4,6,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Emin3add9** | (omit5) | 0 |
| 🟢3 | **Edim3** | (omit5 add2) | 0.5 |
| 🟢3 | **Emin3** | (omit5 add2) | 0.5 |
| 🟢3 | **Xdom7sus2** | (♭2 omit5) | 1 |
| 🟠5 | **Emaj3add9** | (♭3 omit5) | 3 |
| 🟠5 | **Xmaj7sus2** | (♭7 ♭2 omit5) | 3 |
| 🟠5 | **Esus2** | (omit5 add♯2) | 3 |
| 🔴6 | **Xsus2** | (♭2 omit5 add♯6) | 4.5 |

## E-X-Y  `{4,6,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xdom7sus2** | (omit5) | 0 |
| 🔵2 | **Emaj3add9** | (omit5) | 0 |
| 🟢3 | **Eaug3** | (omit5 add2) | 0.5 |
| 🟢3 | **Emaj3** | (omit5 add2) | 0.5 |
| 🟡4 | **Xmaj7sus2** | (♭7 omit5) | 1.5 |
| 🟡4 | **Esus4** | (♭4 omit5 add2) | 2 |
| 🟠5 | **Xhalfdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Emin3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Xmin7** | (♭3 omit5) | 3 |
| 🟠5 | **Xsus2** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Emin3(♭3 omit5 add3) / Xdim3(♭3 omit5 add♯6) / Xdim7(♯7 ♭3 omit5) / Xmin3(♭3 omit5 add♯6) / Emin3add11(♭3 ♭11 omit5) / Xmin3add6(♯6 ♭3 omit5) …等 7 条~~

## E-X-A  `{4,6,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xhalfdim7** | (omit5) | 0 |
| 🔵2 | **Xmin7** | (omit5) | 0 |
| 🟢3 | **Esus4** | (omit5 add2) | 0.5 |
| 🟢3 | **Xdom7** | (♭3 omit5) | 1 |
| 🟢3 | **Xdom7sus2** | (♯2 omit5) | 1 |
| 🟠5 | **Xdim3** | (omit5 add♯6) | 3 |
| 🟠5 | **Xdim7** | (♯7 omit5) | 3 |
| 🟠5 | **Emaj3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Xmaj7sus2** | (♭7 ♯2 omit5) | 3 |
| 🟠5 | **Xmin3** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Emin3add11(♭3 omit5) / Xmin3add6(♯6 omit5) / Xminmaj7(♭7 omit5) / Xsus2(♯2 omit5 add♯6) / Edim3(♭3 ♭5) / Xmaj3(♭3 omit5 add♯6) …等 8 条~~

## E-X-Z  `{4,6,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xdom7** | (omit5) | 0 |
| 🟢3 | **Xdom7sus4** | (♭4 omit5) | 1 |
| 🟡4 | **Esus2** | (♭5) | 1.5 |
| 🟡4 | **Esus4** | (♯4 omit5 add2) | 2 |
| 🟠5 | **Edim3** | (♭3) | 3 |
| 🟠5 | **Xmaj3** | (omit5 add♯6) | 3 |
| 🟠5 | **Xmaj3add6** | (♯6 omit5) | 3 |
| 🟠5 | **Xmaj7** | (♭7 omit5) | 3 |
| 🟠5 | **Xmaj7sus4** | (♭7 ♭4 omit5) | 3 |
| 🟠5 | **Xmin7** | (♯3 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Zsus4(♯4 ♯5) / Xsus4(♭4 omit5 add♯6) / Emin3(♭3 ♭5) / Xmin3(♯3 omit5 add♯6) / Emin3add11(♭3 ♯11 omit5) / Xmin3add6(♯6 ♯3 omit5) …等 7 条~~

## E-X-B  `{4,6,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xdom7sus4** | (omit5) | 0 |
| ✅1 | **Esus2** | — | 0 |
| ✅1 | **Bsus4** | — | 0 |
| 🟡4 | **Xmaj7sus4** | (♭7 omit5) | 1.5 |
| 🟠5 | **Bmaj3** | (♯3) | 3 |
| 🟠5 | **Emin3** | (♭3) | 3 |
| 🟠5 | **Xsus4** | (omit5 add♯6) | 3 |
| 🔴6 | **Baug3** | (♯3 ♭5) | 6 |
| 🔴6 | **Edim3** | (♭3 ♯5) | 6 |
| 🔴6 | **Bmaj3b5** | (♯3 ♯5) | 6 |

## E-G-A  `{4,7,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Emin3add11** | (omit5) | 0 |
| 🟠5 | **Edim3** | (♭5) | 3 |
| 🟠5 | **Gdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Emaj3add11** | (♭3 omit5) | 3 |
| 🟠5 | **Gmin3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Esus4** | (omit5 add♯2) | 3 |
| 🔴6 | **Eaug3** | (♭3 omit5 add4) | 3.5 |
| 🔴6 | **Gdim3** | (♭3 omit5 add6) | 3.5 |
| 🔴6 | **Ghalfdim7** | (♭7 ♭3 omit5) | 6 |
| 🔴6 | **Emaj3add9** | (♯9 ♯3 omit5) | 6 |

> 🗑 已过滤(保留管线):~~Emaj3b5(♭3 ♭5)~~

## E-G-B  `{4,7,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gmaj3add6** | (omit5) | 0 |
| ✅1 | **Emin3** | — | 0 |
| 🟡4 | **Esus2** | (♯2) | 1.5 |
| 🟡4 | **Bsus4** | (♯5) | 1.5 |
| 🟠5 | **Gaug3** | (♯5) | 3 |
| 🟠5 | **Baug3** | (♯3) | 3 |
| 🟠5 | **Edim3** | (♯5) | 3 |
| 🟠5 | **Emaj3** | (♭3) | 3 |
| 🟠5 | **Gmin3add6** | (♯3 omit5) | 3 |
| 🔴6 | **Eaug3** | (♭3 ♭5) | 6 |

> 🗑 已过滤(保留管线):~~Bmaj3(♯3 ♯5) / Emaj3b5(♭3 ♯5)~~

## E-Y-A  `{4,8,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Emaj3add11** | (omit5) | 0 |
| 🟢3 | **Eaug3** | (omit5 add4) | 0.5 |
| 🟠5 | **Emaj3b5** | (♭5) | 3 |
| 🟠5 | **Emin3add11** | (♯3 omit5) | 3 |
| 🟠5 | **Ysus2** | (♯5 ♭2) | 3 |
| 🔴6 | **Edim3** | (♯3 ♭5) | 6 |

## E-A-B  `{4,9,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bdom7sus4** | (omit5) | 0 |
| ✅1 | **Asus2** | — | 0 |
| ✅1 | **Esus4** | — | 0 |
| 🟢3 | **Bdom7** | (♯3 omit5) | 1 |
| 🟡4 | **Bmaj7sus4** | (♭7 omit5) | 1.5 |
| 🟠5 | **Emaj3** | (♯3) | 3 |
| 🟠5 | **Amin3** | (♭3) | 3 |
| 🟠5 | **Bsus4** | (omit5 add♯6) | 3 |
| 🔴6 | **Eaug3** | (♯3 ♭5) | 6 |
| 🔴6 | **Adim3** | (♯5 ♭3) | 6 |

> 🗑 已过滤(保留管线):~~Bmaj3(♯3 omit5 add♯6) / Bmaj3add6(♯3 ♯6 omit5) / Emaj3b5(♯3 ♯5) / Bmaj7(♯3 ♭7 omit5)~~

## E-Z-B  `{4,10,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bmaj7sus4** | (omit5) | 0 |
| 🟢3 | **Bsus4** | (omit5 add7) | 0.5 |
| 🟢3 | **Bdom7sus4** | (♯7 omit5) | 1 |
| 🟡4 | **Esus4** | (♯4) | 1.5 |
| 🟡4 | **Bdom7** | (♯3 ♯7 omit5) | 2 |
| 🟠5 | **Baugmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Bmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Zsus2** | (♭5 ♭2) | 3 |
| 🔴6 | **Baug3** | (♯3 omit5 add7) | 3.5 |
| 🔴6 | **Bmaj3** | (♯3 omit5 add7) | 3.5 |

> 🗑 已过滤(保留管线):~~Zsus4(♯4 omit5 add♯1)~~

## F-X-A  `{5,6,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xminmaj7** | (omit5) | 0 |
| 🟢3 | **Xdim3** | (omit5 add7) | 0.5 |
| 🟢3 | **Xmin3** | (omit5 add7) | 0.5 |
| 🟡4 | **Xmaj7sus2** | (♯2 omit5) | 1.5 |
| 🟡4 | **Xdom7** | (♯7 ♭3 omit5) | 2 |
| 🟡4 | **Xdom7sus2** | (♯7 ♯2 omit5) | 2 |
| 🟡4 | **Xsus2** | (♯2 omit5 add7) | 2 |
| 🟠5 | **Faug3** | (omit5 add♯1) | 3 |
| 🟠5 | **Xaugmaj7** | (♭3 omit5) | 3 |
| 🟠5 | **Xhalfdim7** | (♯7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Fmaj3(omit5 add♯1) / Fmaj3add9(♭9 omit5) / Xmaj7(♭3 omit5) / Xmin7(♯7 omit5) / Xaug3(♭3 omit5 add7) / Xmaj3(♭3 omit5 add7) …等 8 条~~

## F-X-Z  `{5,6,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xaugmaj7** | (omit5) | 0 |
| 🔵2 | **Xmaj7** | (omit5) | 0 |
| 🟢3 | **Xaug3** | (omit5 add7) | 0.5 |
| 🟢3 | **Xmaj3** | (omit5 add7) | 0.5 |
| 🟢3 | **Xdom7** | (♯7 omit5) | 1 |
| 🟡4 | **Xmaj7sus4** | (♭4 omit5) | 1.5 |
| 🟡4 | **Xdom7sus4** | (♯7 ♭4 omit5) | 2 |
| 🟡4 | **Xsus4** | (♭4 omit5 add7) | 2 |
| 🟠5 | **Xminmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Fsus4** | (omit5 add♯1) | 3 |

> 🗑 已过滤(保留管线):~~Xmin3(♯3 omit5 add7) / Faug3(♯3 omit5 add♯1) / Xmin7(♯7 ♯3 omit5)~~

## F-X-B  `{5,6,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xmaj7sus4** | (omit5) | 0 |
| 🟢3 | **Xsus4** | (omit5 add7) | 0.5 |
| 🟢3 | **Xdom7sus4** | (♯7 omit5) | 1 |
| 🟡4 | **Bsus4** | (♯4) | 1.5 |
| 🟠5 | **Xaugmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Fsus2** | (♭2 ♭5) | 3 |
| 🔴6 | **Xaug3** | (♯3 omit5 add7) | 3.5 |

## F-G-Y  `{5,7,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fmin3add9** | (omit5) | 0 |
| 🟢3 | **Fdim3** | (omit5 add2) | 0.5 |
| 🟢3 | **Fmin3** | (omit5 add2) | 0.5 |
| 🟢3 | **Gdom7sus2** | (♭2 omit5) | 1 |
| 🟠5 | **Fmaj3add9** | (♭3 omit5) | 3 |
| 🟠5 | **Gmaj7sus2** | (♭7 ♭2 omit5) | 3 |
| 🟠5 | **Fsus2** | (omit5 add♯2) | 3 |
| 🔴6 | **Gsus2** | (♭2 omit5 add♯6) | 4.5 |

## F-G-A  `{5,7,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gdom7sus2** | (omit5) | 0 |
| 🔵2 | **Fmaj3add9** | (omit5) | 0 |
| 🟢3 | **Faug3** | (omit5 add2) | 0.5 |
| 🟢3 | **Fmaj3** | (omit5 add2) | 0.5 |
| 🟡4 | **Gmaj7sus2** | (♭7 omit5) | 1.5 |
| 🟡4 | **Fsus4** | (♭4 omit5 add2) | 2 |
| 🟠5 | **Ghalfdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Fmin3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Gmin7** | (♭3 omit5) | 3 |
| 🟠5 | **Gsus2** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Fmin3(♭3 omit5 add3) / Gdim3(♭3 omit5 add♯6) / Gdim7(♯7 ♭3 omit5) / Gmin3(♭3 omit5 add♯6) / Fmin3add11(♭3 ♭11 omit5) / Gmin3add6(♯6 ♭3 omit5) …等 7 条~~

## F-G-Z  `{5,7,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ghalfdim7** | (omit5) | 0 |
| 🔵2 | **Gmin7** | (omit5) | 0 |
| 🟢3 | **Fsus4** | (omit5 add2) | 0.5 |
| 🟢3 | **Gdom7** | (♭3 omit5) | 1 |
| 🟢3 | **Gdom7sus2** | (♯2 omit5) | 1 |
| 🟠5 | **Gdim3** | (omit5 add♯6) | 3 |
| 🟠5 | **Gdim7** | (♯7 omit5) | 3 |
| 🟠5 | **Gmaj7sus2** | (♭7 ♯2 omit5) | 3 |
| 🟠5 | **Gmin3** | (omit5 add♯6) | 3 |
| 🟠5 | **Fmin3add11** | (♭3 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Gmin3add6(♯6 omit5) / Gminmaj7(♭7 omit5) / Gsus2(♯2 omit5 add♯6) / Fdim3(♭3 ♭5) / Gmaj3(♭3 omit5 add♯6) / Gmaj3add6(♯6 ♭3 omit5) …等 7 条~~

## F-G-B  `{5,7,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gdom7** | (omit5) | 0 |
| 🟢3 | **Gdom7sus4** | (♭4 omit5) | 1 |
| 🟡4 | **Fsus2** | (♭5) | 1.5 |
| 🟠5 | **Fdim3** | (♭3) | 3 |
| 🟠5 | **Gmaj3** | (omit5 add♯6) | 3 |
| 🟠5 | **Gmaj3add6** | (♯6 omit5) | 3 |
| 🟠5 | **Gmaj7** | (♭7 omit5) | 3 |
| 🟠5 | **Gmaj7sus4** | (♭7 ♭4 omit5) | 3 |
| 🟠5 | **Gmin7** | (♯3 omit5) | 3 |
| 🟠5 | **Bsus4** | (♯4 ♯5) | 3 |

> 🗑 已过滤(保留管线):~~Gsus4(♭4 omit5 add♯6) / Fmin3(♭3 ♭5) / Gmin3(♯3 omit5 add♯6) / Gmin3add6(♯6 ♯3 omit5) / Gminmaj7(♭7 ♯3 omit5)~~

## F-Y-Z  `{5,8,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fmin3add11** | (omit5) | 0 |
| 🟠5 | **Fdim3** | (♭5) | 3 |
| 🟠5 | **Ydim7** | (♭3 omit5) | 3 |
| 🟠5 | **Fmaj3add11** | (♭3 omit5) | 3 |
| 🟠5 | **Ymin3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Fsus4** | (omit5 add♯2) | 3 |
| 🔴6 | **Faug3** | (♭3 omit5 add4) | 3.5 |
| 🔴6 | **Ydim3** | (♭3 omit5 add6) | 3.5 |
| 🔴6 | **Yhalfdim7** | (♭7 ♭3 omit5) | 6 |
| 🔴6 | **Fmaj3b5** | (♭3 ♭5) | 6 |

## F-A-Z  `{5,9,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fmaj3add11** | (omit5) | 0 |
| 🟢3 | **Faug3** | (omit5 add4) | 0.5 |
| 🟠5 | **Fmaj3b5** | (♭5) | 3 |
| 🟠5 | **Fmin3add11** | (♯3 omit5) | 3 |
| 🟠5 | **Asus2** | (♯5 ♭2) | 3 |
| 🔴6 | **Fdim3** | (♯3 ♭5) | 6 |

## X-G-Z  `{6,7,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gminmaj7** | (omit5) | 0 |
| 🟢3 | **Gdim3** | (omit5 add7) | 0.5 |
| 🟢3 | **Gmin3** | (omit5 add7) | 0.5 |
| 🟡4 | **Gmaj7sus2** | (♯2 omit5) | 1.5 |
| 🟡4 | **Gdom7** | (♯7 ♭3 omit5) | 2 |
| 🟡4 | **Gdom7sus2** | (♯7 ♯2 omit5) | 2 |
| 🟡4 | **Gsus2** | (♯2 omit5 add7) | 2 |
| 🟠5 | **Xaug3** | (omit5 add♯1) | 3 |
| 🟠5 | **Gaugmaj7** | (♭3 omit5) | 3 |
| 🟠5 | **Ghalfdim7** | (♯7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Xmaj3(omit5 add♯1) / Xmaj3add9(♭9 omit5) / Gmaj7(♭3 omit5) / Gmin7(♯7 omit5) / Gaug3(♭3 omit5 add7) / Gmaj3(♭3 omit5 add7) …等 8 条~~

## X-G-B  `{6,7,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gaugmaj7** | (omit5) | 0 |
| 🔵2 | **Gmaj7** | (omit5) | 0 |
| 🟢3 | **Gaug3** | (omit5 add7) | 0.5 |
| 🟢3 | **Gmaj3** | (omit5 add7) | 0.5 |
| 🟢3 | **Gdom7** | (♯7 omit5) | 1 |
| 🟡4 | **Gmaj7sus4** | (♭4 omit5) | 1.5 |
| 🟡4 | **Gdom7sus4** | (♯7 ♭4 omit5) | 2 |
| 🟡4 | **Gsus4** | (♭4 omit5 add7) | 2 |
| 🟠5 | **Gminmaj7** | (♯3 omit5) | 3 |
| 🟠5 | **Xsus4** | (omit5 add♯1) | 3 |

> 🗑 已过滤(保留管线):~~Gmin3(♯3 omit5 add7) / Xaug3(♯3 omit5 add♯1) / Gmin7(♯7 ♯3 omit5)~~

## X-Y-A  `{6,8,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xmin3add9** | (omit5) | 0 |
| 🟢3 | **Xdim3** | (omit5 add2) | 0.5 |
| 🟢3 | **Xmin3** | (omit5 add2) | 0.5 |
| 🟢3 | **Ydom7sus2** | (♭2 omit5) | 1 |
| 🟠5 | **Xmaj3add9** | (♭3 omit5) | 3 |
| 🟠5 | **Ymaj7sus2** | (♭7 ♭2 omit5) | 3 |
| 🟠5 | **Xsus2** | (omit5 add♯2) | 3 |
| 🔴6 | **Ysus2** | (♭2 omit5 add♯6) | 4.5 |

## X-Y-Z  `{6,8,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ydom7sus2** | (omit5) | 0 |
| 🔵2 | **Xmaj3add9** | (omit5) | 0 |
| 🟢3 | **Xaug3** | (omit5 add2) | 0.5 |
| 🟢3 | **Xmaj3** | (omit5 add2) | 0.5 |
| 🟡4 | **Ymaj7sus2** | (♭7 omit5) | 1.5 |
| 🟡4 | **Xsus4** | (♭4 omit5 add2) | 2 |
| 🟠5 | **Yhalfdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Xmin3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Ymin7** | (♭3 omit5) | 3 |
| 🟠5 | **Ysus2** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Xmin3(♭3 omit5 add3) / Ydim3(♭3 omit5 add♯6) / Ydim7(♯7 ♭3 omit5) / Ymin3(♭3 omit5 add♯6) / Xmin3add11(♭3 ♭11 omit5) / Ymin3add6(♯6 ♭3 omit5) …等 7 条~~

## X-Y-B  `{6,8,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Yhalfdim7** | (omit5) | 0 |
| 🔵2 | **Ymin7** | (omit5) | 0 |
| 🟢3 | **Xsus4** | (omit5 add2) | 0.5 |
| 🟢3 | **Ydom7** | (♭3 omit5) | 1 |
| 🟢3 | **Ydom7sus2** | (♯2 omit5) | 1 |
| 🟠5 | **Ydim3** | (omit5 add♯6) | 3 |
| 🟠5 | **Ydim7** | (♯7 omit5) | 3 |
| 🟠5 | **Ymaj7sus2** | (♭7 ♯2 omit5) | 3 |
| 🟠5 | **Ymin3** | (omit5 add♯6) | 3 |
| 🟠5 | **Xmin3add11** | (♭3 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Ymin3add6(♯6 omit5) / Yminmaj7(♭7 omit5) / Ysus2(♯2 omit5 add♯6) / Xdim3(♭3 ♭5) / Ymaj3(♭3 omit5 add♯6) / Ymaj3add6(♯6 ♭3 omit5) …等 7 条~~

## X-A-B  `{6,9,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xmin3add11** | (omit5) | 0 |
| 🟠5 | **Xdim3** | (♭5) | 3 |
| 🟠5 | **Adim7** | (♭3 omit5) | 3 |
| 🟠5 | **Xmaj3add11** | (♭3 omit5) | 3 |
| 🟠5 | **Amin3add6** | (♭3 omit5) | 3 |
| 🟠5 | **Xsus4** | (omit5 add♯2) | 3 |
| 🔴6 | **Xaug3** | (♭3 omit5 add4) | 3.5 |
| 🔴6 | **Adim3** | (♭3 omit5 add6) | 3.5 |
| 🔴6 | **Ahalfdim7** | (♭7 ♭3 omit5) | 6 |
| 🔴6 | **Xmaj3b5** | (♭3 ♭5) | 6 |

## X-Z-B  `{6,10,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xmaj3add11** | (omit5) | 0 |
| 🟢3 | **Xaug3** | (omit5 add4) | 0.5 |
| 🟠5 | **Xmaj3b5** | (♭5) | 3 |
| 🟠5 | **Xmin3add11** | (♯3 omit5) | 3 |
| 🟠5 | **Zsus2** | (♯5 ♭2) | 3 |

## G-Y-B  `{7,8,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Yminmaj7** | (omit5) | 0 |
| 🟢3 | **Ydim3** | (omit5 add7) | 0.5 |
| 🟢3 | **Ymin3** | (omit5 add7) | 0.5 |
| 🟡4 | **Ymaj7sus2** | (♯2 omit5) | 1.5 |
| 🟡4 | **Ydom7** | (♯7 ♭3 omit5) | 2 |
| 🟡4 | **Ydom7sus2** | (♯7 ♯2 omit5) | 2 |
| 🟡4 | **Ysus2** | (♯2 omit5 add7) | 2 |
| 🟠5 | **Gaug3** | (omit5 add♯1) | 3 |
| 🟠5 | **Yaugmaj7** | (♭3 omit5) | 3 |
| 🟠5 | **Yhalfdim7** | (♯7 omit5) | 3 |

> 🗑 已过滤(保留管线):~~Gmaj3(omit5 add♯1) / Gmaj3add9(♭9 omit5) / Ymaj7(♭3 omit5) / Ymin7(♯7 omit5) / Yaug3(♭3 omit5 add7) / Ymaj3(♭3 omit5 add7) …等 8 条~~

## G-A-Z  `{7,9,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gmin3add9** | (omit5) | 0 |
| 🟢3 | **Gdim3** | (omit5 add2) | 0.5 |
| 🟢3 | **Gmin3** | (omit5 add2) | 0.5 |
| 🟢3 | **Adom7sus2** | (♭2 omit5) | 1 |
| 🟠5 | **Gmaj3add9** | (♭3 omit5) | 3 |
| 🟠5 | **Amaj7sus2** | (♭7 ♭2 omit5) | 3 |
| 🟠5 | **Gsus2** | (omit5 add♯2) | 3 |
| 🔴6 | **Asus2** | (♭2 omit5 add♯6) | 4.5 |

## G-A-B  `{7,9,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Adom7sus2** | (omit5) | 0 |
| 🔵2 | **Gmaj3add9** | (omit5) | 0 |
| 🟢3 | **Gaug3** | (omit5 add2) | 0.5 |
| 🟢3 | **Gmaj3** | (omit5 add2) | 0.5 |
| 🟡4 | **Amaj7sus2** | (♭7 omit5) | 1.5 |
| 🟡4 | **Gsus4** | (♭4 omit5 add2) | 2 |
| 🟠5 | **Ahalfdim7** | (♭3 omit5) | 3 |
| 🟠5 | **Gmin3add9** | (♯3 omit5) | 3 |
| 🟠5 | **Amin7** | (♭3 omit5) | 3 |
| 🟠5 | **Asus2** | (omit5 add♯6) | 3 |

> 🗑 已过滤(保留管线):~~Gmin3(♭3 omit5 add3) / Adim3(♭3 omit5 add♯6) / Adim7(♯7 ♭3 omit5) / Amin3(♭3 omit5 add♯6) / Gmin3add11(♭3 ♭11 omit5) / Amin3add6(♯6 ♭3 omit5) …等 7 条~~

## Y-Z-B  `{8,10,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ymin3add9** | (omit5) | 0 |
| 🟢3 | **Ydim3** | (omit5 add2) | 0.5 |
| 🟢3 | **Ymin3** | (omit5 add2) | 0.5 |
| 🟢3 | **Zdom7sus2** | (♭2 omit5) | 1 |
| 🟠5 | **Ymaj3add9** | (♭3 omit5) | 3 |
| 🟠5 | **Zmaj7sus2** | (♭7 ♭2 omit5) | 3 |
| 🟠5 | **Ysus2** | (omit5 add♯2) | 3 |
| 🔴6 | **Zsus2** | (♭2 omit5 add♯6) | 4.5 |

# 🟡 Tier 4 — 组合变换(多重省略+扩展)

## C-P-G  `{0,1,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | **Pmaj7sus4** | (♯4 omit5) | 1.5 |
| 🟡4 | **Csus2** | (♭2) | 1.5 |
| 🟡4 | **Gsus4** | (♭5) | 1.5 |
| 🟡4 | **Pdom7sus4** | (♯7 ♯4 omit5) | 2 |
| 🟡4 | **Psus4** | (♯4 omit5 add7) | 2 |
| 🟠5 | **Gmaj3b5** | (♯3) | 3 |

## C-F-X  `{0,5,6}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | **Fsus2** | (♭2) | 1.5 |
| 🟡4 | **Csus4** | (♭5) | 1.5 |
| 🟠5 | **Cmaj3b5** | (♯3) | 3 |
| 🔴6 | **Cmaj3** | (♯3 ♭5) | 6 |

## C-X-B  `{0,6,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | **Cmaj7sus4** | (♯4 omit5) | 1.5 |
| 🟡4 | **Bsus2** | (♭2) | 1.5 |
| 🟡4 | **Xsus4** | (♭5) | 1.5 |
| 🟡4 | **Cdom7sus4** | (♯4 ♯7 omit5) | 2 |
| 🟡4 | **Csus4** | (♯4 omit5 add7) | 2 |
| 🟠5 | **Xmaj3b5** | (♯3) | 3 |
| 🔴6 | **Xmaj3** | (♭5 ♯3) | 6 |

## P-D-Y  `{1,2,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | **Dmaj7sus4** | (♯4 omit5) | 1.5 |
| 🟡4 | **Psus2** | (♭2) | 1.5 |
| 🟡4 | **Ysus4** | (♭5) | 1.5 |
| 🟡4 | **Ddom7sus4** | (♯7 ♯4 omit5) | 2 |
| 🟡4 | **Dsus4** | (♯4 omit5 add7) | 2 |
| 🟠5 | **Ymaj3b5** | (♯3) | 3 |
| 🔴6 | **Ymaj3** | (♯3 ♭5) | 6 |

## P-X-G  `{1,6,7}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | **Gmaj7sus4** | (♯4 omit5) | 1.5 |
| 🟡4 | **Xsus2** | (♭2) | 1.5 |
| 🟡4 | **Psus4** | (♭5) | 1.5 |
| 🟡4 | **Gdom7sus4** | (♯4 ♯7 omit5) | 2 |
| 🟡4 | **Gsus4** | (♯4 omit5 add7) | 2 |
| 🟠5 | **Pmaj3b5** | (♯3) | 3 |
| 🔴6 | **Pmaj3** | (♯3 ♭5) | 6 |

## D-Q-A  `{2,3,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | **Qmaj7sus4** | (♯4 omit5) | 1.5 |
| 🟡4 | **Dsus2** | (♭2) | 1.5 |
| 🟡4 | **Asus4** | (♭5) | 1.5 |
| 🟡4 | **Qdom7sus4** | (♯7 ♯4 omit5) | 2 |
| 🟡4 | **Qsus4** | (♯4 omit5 add7) | 2 |
| 🟠5 | **Amaj3b5** | (♯3) | 3 |
| 🔴6 | **Amaj3** | (♯3 ♭5) | 6 |

## D-G-Y  `{2,7,8}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | **Ymaj7sus4** | (♯4 omit5) | 1.5 |
| 🟡4 | **Gsus2** | (♭2) | 1.5 |
| 🟡4 | **Dsus4** | (♭5) | 1.5 |
| 🟡4 | **Ydom7sus4** | (♯4 ♯7 omit5) | 2 |
| 🟡4 | **Ysus4** | (♯4 omit5 add7) | 2 |
| 🟠5 | **Dmaj3b5** | (♯3) | 3 |
| 🔴6 | **Dmaj3** | (♯3 ♭5) | 6 |

## Q-E-Z  `{3,4,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | **Emaj7sus4** | (♯4 omit5) | 1.5 |
| 🟡4 | **Qsus2** | (♭2) | 1.5 |
| 🟡4 | **Zsus4** | (♭5) | 1.5 |
| 🟡4 | **Edom7sus4** | (♯7 ♯4 omit5) | 2 |
| 🟡4 | **Esus4** | (♯4 omit5 add7) | 2 |
| 🟠5 | **Zmaj3b5** | (♯3) | 3 |
| 🔴6 | **Zmaj3** | (♯3 ♭5) | 6 |

## Q-Y-A  `{3,8,9}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | **Amaj7sus4** | (♯4 omit5) | 1.5 |
| 🟡4 | **Ysus2** | (♭2) | 1.5 |
| 🟡4 | **Qsus4** | (♭5) | 1.5 |
| 🟡4 | **Adom7sus4** | (♯4 ♯7 omit5) | 2 |
| 🟡4 | **Asus4** | (♯4 omit5 add7) | 2 |
| 🟠5 | **Qmaj3b5** | (♯3) | 3 |
| 🔴6 | **Qmaj3** | (♯3 ♭5) | 6 |

## E-F-B  `{4,5,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | **Esus2** | (♭2) | 1.5 |
| 🟡4 | **Bsus4** | (♭5) | 1.5 |
| 🟠5 | **Bmaj3b5** | (♯3) | 3 |
| 🔴6 | **Bmaj3** | (♯3 ♭5) | 6 |

## E-A-Z  `{4,9,10}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | **Zmaj7sus4** | (♯4 omit5) | 1.5 |
| 🟡4 | **Asus2** | (♭2) | 1.5 |
| 🟡4 | **Esus4** | (♭5) | 1.5 |
| 🟡4 | **Zdom7sus4** | (♯4 ♯7 omit5) | 2 |
| 🟡4 | **Zsus4** | (♯4 omit5 add7) | 2 |
| 🟠5 | **Emaj3b5** | (♯3) | 3 |
| 🔴6 | **Emaj3** | (♯3 ♭5) | 6 |

## F-Z-B  `{5,10,11}`

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | **Bmaj7sus4** | (♯4 omit5) | 1.5 |
| 🟡4 | **Zsus2** | (♭2) | 1.5 |
| 🟡4 | **Fsus4** | (♭5) | 1.5 |
| 🟡4 | **Bdom7sus4** | (♯4 ♯7 omit5) | 2 |
| 🟡4 | **Bsus4** | (♯4 omit5 add7) | 2 |
| 🟠5 | **Fmaj3b5** | (♯3) | 3 |
