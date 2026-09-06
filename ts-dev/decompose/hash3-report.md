# 3 音哈希表完整报告(C(12,3) = 220)

> 按 tier 分大区:Tier 1(完全命中)在最前 → Tier 6(极端)在最后。
> tier 语义:1=零变换 / 2=纯省略 / 3=自然扩展 / 4=组合变换 / 5=avoid note / 6=双变化
> 来源标注:✋ = 人工裁决钦定(bake-rules.verdicts) / ⚙ = 类型化规则
> 🗑 每组下方完整列出被保留管线过滤的条目(tier/变换/cost)——想捞回某条就改 bake-rules.json5
> 审核流:看完报告 → 改 ts-dev/raw-static/bake-rules.json5 → 重新 bake
> 生成:`npx tsx ts-dev/decompose/hash3-report.ts 3`

| tier | 含义 | 键集数 |
|---|---|---|
| ✅1 | 完全命中(零变换) | 172 |
| 🔵2 | 预期省略(纯 omit5/omit11) | 48 |
| 🟢3 | 自然扩展(色彩音/属七变化) | 0 |
| 🟡4 | 组合变换(多重省略+扩展) | 0 |
| 🟠5 | 边缘(avoid note) | 0 |
| 🔴6 | 极端(双变化/多重冲突) | 0 |

# ✅ Tier 1 — 完全命中(零变换)

## C-P-D  `{0,1,2}`  ✋ verdict(0,1,2) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):半音簇为唯一解释(硬规则):maj7sus2(♭2 omit5) 是 cost=1.5 凑数非恒等,改判不保留,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **C·半音簇** | ♭2·2 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Pmaj7sus2~~ | omit5 ♭2 | 1.5 |
| 🟡4 | ~~Pdom7sus2~~ | omit5 ♭2 ♯7 | 2 |
| 🟡4 | ~~Psus2~~ | omit5 ♭2 add7 | 2 |
| 🔴6 | ~~Cmin3~~ | omit5 ♭3 ♭2 | 6 |

## C-P-Q  `{0,1,3}`  ✋ verdict(0,1,3) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **C·Phrygian特征前三音** | ♭2·♭3 | 0 |
| 🔵2 | **Pmaj7sus2** | omit5 | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Psus2~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Pdom7sus2~~ | omit5 ♯7 | 1 |
| 🟠5 | ~~Cmin3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Cmin3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Pminmaj7~~ | omit5 ♭3 | 3 |
| 🔴6 | ~~Pmin3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Cmaj3~~ | omit5 ♭3 ♭2 | 6 |
| 🔴6 | ~~Cmaj3add9~~ | omit5 ♭9 ♭3 | 6 |
| 🔴6 | ~~Pmin7~~ | omit5 ♭3 ♯7 | 6 |

## C-P-E  `{0,1,4}`  ⚙ zero-cost-exclusive ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **C·Hijaz特征前三音** | ♭2·3 | 0 |
| 🔵2 | **Pminmaj7** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Pmin3~~ | omit5 add7 | 0.5 |
| 🟡4 | ~~Pmaj7sus2~~ | omit5 ♯2 | 1.5 |
| 🟡4 | ~~Pdom7~~ | omit5 ♭3 ♯7 | 2 |
| 🟡4 | ~~Pdom7sus2~~ | omit5 ♯7 ♯2 | 2 |
| 🟡4 | ~~Psus2~~ | omit5 ♯2 add7 | 2 |
| 🟠5 | ~~Cmaj3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Cmaj3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Pmaj7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Pmin7~~ | omit5 ♯7 | 3 |
| 🔴6 | ~~Pmaj3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Csus4~~ | omit5 ♭4 ♭2 | 4.5 |
| 🔴6 | ~~Cmin3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Cmin3add9~~ | omit5 ♭9 ♯3 | 6 |

## C-P-F  `{0,1,5}`  ✋ verdict(0,1,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian挂留三音(半音对低音根,♭2+纯四)+ maj7(omit5)(半音对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **C·Phrygian挂留前三音** | ♭2·4 | 0 |
| 🔵2 | **Pmaj7** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Pmaj3~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Pdom7~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Pmaj7sus4~~ | omit5 ♭4 | 1.5 |
| 🟡4 | ~~Pdom7sus4~~ | omit5 ♭4 ♯7 | 2 |
| 🟡4 | ~~Csus2~~ | omit5 ♭2 add4 | 2 |
| 🟡4 | ~~Psus4~~ | omit5 ♭4 add7 | 2 |
| 🟠5 | ~~Pminmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Csus4~~ | omit5 ♭2 | 3 |
| 🔴6 | ~~Pmin3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Cmaj3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Cmaj3add9~~ | omit5 ♭9 ♯3 | 6 |
| 🔴6 | ~~Pmin7~~ | omit5 ♯7 ♯3 | 6 |

## C-P-X  `{0,1,6}`  ✋ verdict(0,1,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Viennese三音(C 根,集合身份)+ maj7sus4(omit5)(P 根,爵士壳)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **C·Viennese特征前三音** | ♭2·♭5 | 0 |
| 🔵2 | **Pmaj7sus4** | omit5 | 0 |

🗑 已过滤 8 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Psus4~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Pdom7sus4~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Xsus4~~ | ♯4 | 1.5 |
| 🟡4 | ~~Pdom7~~ | omit5 ♯7 ♯3 | 2 |
| 🟠5 | ~~Pmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Csus2~~ | ♭2 ♭5 | 3 |
| 🔴6 | ~~Pmaj3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Csus4~~ | omit5 ♭2 ♯4 | 4.5 |

## C-P-G  `{0,1,7}`  ✋ verdict(0,1,7) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian五度为唯一解释(硬规则):R+♭2+纯五 pedal 声响,chord 解释全扭曲,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **C·Phrygian五度** | ♭2·5 | 0 |

🗑 已过滤 7 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Pmaj7sus4~~ | omit5 ♯4 | 1.5 |
| 🟡4 | ~~Csus2~~ | ♭2 | 1.5 |
| 🟡4 | ~~Gsus4~~ | ♭5 | 1.5 |
| 🟡4 | ~~Pdom7sus4~~ | omit5 ♯7 ♯4 | 2 |
| 🟡4 | ~~Psus4~~ | omit5 ♯4 add7 | 2 |
| 🟠5 | ~~Gmaj3b5~~ | ♯3 | 3 |
| 🔴6 | ~~Gmaj3~~ | ♭5 ♯3 | 6 |

## C-P-A  `{0,1,9}`  ✋ verdict(0,1,9) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):分叉三和弦为唯一解释(硬规则):大/小三度并存本质不可 tertian 表达,任何 chord 解释都是扭曲,全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **A·分叉三和弦** | ♭3·3 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Cdom7sus2~~ | omit5 ♭2 ♭7 | 2 |
| 🟡4 | ~~Csus2~~ | omit5 ♭2 add6 | 2 |
| 🟠5 | ~~Amaj3~~ | omit5 ♯2 | 3 |
| 🟠5 | ~~Amaj3add9~~ | omit5 ♯9 | 3 |
| 🟠5 | ~~Amin3add11~~ | omit5 ♭11 | 3 |
| 🔴6 | ~~Asus4~~ | omit5 ♭4 ♯2 | 4.5 |

## C-P-B  `{0,1,11}`  ✋ verdict(0,1,2) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):半音簇为唯一解释(硬规则):maj7sus2(♭2 omit5) 是 cost=1.5 凑数非恒等,改判不保留,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **B·半音簇** | ♭2·2 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Cmaj7sus2~~ | omit5 ♭2 | 1.5 |
| 🟡4 | ~~Cdom7sus2~~ | omit5 ♭2 ♯7 | 2 |
| 🟡4 | ~~Csus2~~ | omit5 ♭2 add7 | 2 |
| 🔴6 | ~~Bmin3~~ | omit5 ♭3 ♭2 | 6 |

## C-D-F  `{0,2,5}`  ✋ verdict(0,2,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):四度碎片(二度对低音根)+ min7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **C·四度碎片** | 2·4 | 0 |
| 🔵2 | **Dmin7** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Csus2~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Csus4~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Ddom7~~ | omit5 ♭3 | 1 |
| 🟢3 | ~~Ddom7sus2~~ | omit5 ♯2 | 1 |
| 🟠5 | ~~Cmaj3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Dmaj7sus2~~ | omit5 ♭7 ♯2 | 3 |
| 🟠5 | ~~Dmin3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Cmin3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Dmin3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Dminmaj7~~ | omit5 ♭7 | 3 |
| 🔴6 | ~~Cmaj3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Cmin3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Dsus2~~ | omit5 ♯2 ♯6 | 4.5 |
| 🔴6 | ~~Cdim3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Dmaj3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Dmaj3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Dmaj7~~ | omit5 ♭7 ♭3 | 6 |

## C-D-X  `{0,2,6}`  ✋ verdict(0,2,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):全音叠三全音(二度对低音根)+ dom7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **C·全音叠三全音** | 2·♭5 | 0 |
| 🔵2 | **Ddom7** | omit5 | 0 |

🗑 已过滤 15 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ddom7sus4~~ | omit5 ♭4 | 1 |
| 🟡4 | ~~Csus2~~ | ♭5 | 1.5 |
| 🟡4 | ~~Csus4~~ | omit5 ♯4 add2 | 2 |
| 🟠5 | ~~Cdim3~~ | ♭3 | 3 |
| 🟠5 | ~~Dmaj3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Dmaj3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Dmaj7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Dmaj7sus4~~ | omit5 ♭7 ♭4 | 3 |
| 🟠5 | ~~Dmin7~~ | omit5 ♯3 | 3 |
| 🔴6 | ~~Dsus4~~ | omit5 ♭4 ♯6 | 4.5 |
| 🔴6 | ~~Cmin3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Dmin3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Cmin3add11~~ | omit5 ♭3 ♯11 | 6 |
| 🔴6 | ~~Dmin3add6~~ | omit5 ♯6 ♯3 | 6 |
| 🔴6 | ~~Dminmaj7~~ | omit5 ♭7 ♯3 | 6 |

## C-D-G  `{0,2,7}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Csus2** | — | 0 |
| ✅1 | **Gsus4** | — | 0 |
| 🔵2 | **Ddom7sus4** | omit5 | 0 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ddom7~~ | omit5 ♯3 | 1 |
| 🟡4 | ~~Dmaj7sus4~~ | omit5 ♭7 | 1.5 |
| 🟠5 | ~~Gmaj3~~ | ♯3 | 3 |
| 🟠5 | ~~Cmin3~~ | ♭3 | 3 |
| 🟠5 | ~~Dsus4~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Gaug3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Cdim3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Dmaj3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Dmaj3add6~~ | omit5 ♯6 ♯3 | 6 |
| 🔴6 | ~~Dmaj7~~ | omit5 ♭7 ♯3 | 6 |

## C-D-Y  `{0,2,8}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Ymaj3b5** | — | 0 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ddom7sus4~~ | omit5 ♯4 | 1 |
| 🟡4 | ~~Csus2~~ | ♯5 | 1.5 |
| 🟠5 | ~~Ydim3~~ | ♯3 | 3 |
| 🟠5 | ~~Ymaj3~~ | ♭5 | 3 |
| 🟠5 | ~~Ymaj3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Dmaj7sus4~~ | omit5 ♭7 ♯4 | 3 |
| 🟠5 | ~~Ysus4~~ | ♭4 ♭5 | 3 |
| 🔴6 | ~~Dsus4~~ | omit5 ♯4 ♯6 | 4.5 |
| 🔴6 | ~~Cmin3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Ymin3~~ | ♭5 ♯3 | 6 |

## C-D-B  `{0,2,11}`  ✋ verdict(0,1,3) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **B·Phrygian特征前三音** | ♭2·♭3 | 0 |
| 🔵2 | **Cmaj7sus2** | omit5 | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Csus2~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Cdom7sus2~~ | omit5 ♯7 | 1 |
| 🟠5 | ~~Bmin3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Bmin3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Cminmaj7~~ | omit5 ♭3 | 3 |
| 🔴6 | ~~Cmin3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Bmaj3~~ | omit5 ♭3 ♭2 | 6 |
| 🔴6 | ~~Bmaj3add9~~ | omit5 ♭9 ♭3 | 6 |
| 🔴6 | ~~Cmin7~~ | omit5 ♭3 ♯7 | 6 |

## C-Q-E  `{0,3,4}`  ✋ verdict(0,1,9) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):分叉三和弦为唯一解释(硬规则):大/小三度并存本质不可 tertian 表达,任何 chord 解释都是扭曲,全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **C·分叉三和弦** | ♭3·3 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Qdom7sus2~~ | omit5 ♭7 ♭2 | 2 |
| 🟡4 | ~~Qsus2~~ | omit5 ♭2 add6 | 2 |
| 🟠5 | ~~Cmaj3~~ | omit5 ♯2 | 3 |
| 🟠5 | ~~Cmaj3add9~~ | omit5 ♯9 | 3 |
| 🟠5 | ~~Cmin3add11~~ | omit5 ♭11 | 3 |
| 🔴6 | ~~Csus4~~ | omit5 ♭4 ♯2 | 4.5 |

## C-Q-X  `{0,3,6}`  ✋ verdict(0,3,6) ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

> ✋ 人工裁决(2026-09-05):减三和弦完全命中即唯一解释:dim7 对称性副产品与换根音凑数解释全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Cdim3** | — | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Qmin3add6~~ | omit5 | 0 |
| 🟢3 | ~~Qmin3~~ | omit5 add6 | 0.5 |
| 🟡4 | ~~Qdom7~~ | omit5 ♭7 ♭3 | 2 |
| 🟡4 | ~~Qdom7sus2~~ | omit5 ♭7 ♯2 | 2 |
| 🟡4 | ~~Qsus2~~ | omit5 ♯2 add6 | 2 |
| 🟠5 | ~~Qmaj3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Cmaj3b5~~ | ♭3 | 3 |
| 🟠5 | ~~Cmin3~~ | ♭5 | 3 |
| 🟠5 | ~~Cmin3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Qmin7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Csus2~~ | ♭5 ♯2 | 3 |
| 🔴6 | ~~Qmaj3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Csus4~~ | omit5 ♯4 ♯2 | 4.5 |
| 🔴6 | ~~Qaug3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Cmaj3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Cmaj3add11~~ | omit5 ♭3 ♯11 | 6 |

## C-Q-G  `{0,3,7}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Cmin3** | — | 0 |
| 🔵2 | **Qmaj3add6** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Qmaj3~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Qdom7~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Csus2~~ | ♯2 | 1.5 |
| 🟡4 | ~~Gsus4~~ | ♯5 | 1.5 |
| 🟡4 | ~~Qdom7sus4~~ | omit5 ♭7 ♭4 | 2 |
| 🟡4 | ~~Qsus4~~ | omit5 ♭4 add6 | 2 |
| 🟠5 | ~~Qaug3~~ | ♯5 | 3 |
| 🟠5 | ~~Gaug3~~ | ♯3 | 3 |
| 🟠5 | ~~Cdim3~~ | ♯5 | 3 |
| 🟠5 | ~~Cmaj3~~ | ♭3 | 3 |
| 🟠5 | ~~Qmin3add6~~ | omit5 ♯3 | 3 |
| 🔴6 | ~~Qmin3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Caug3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Gmaj3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Cmaj3b5~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Qmin7~~ | omit5 ♭7 ♯3 | 6 |

## C-Q-Y  `{0,3,8}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Ymaj3** | — | 0 |

🗑 已过滤 15 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Qsus4~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Qdom7sus4~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Ysus4~~ | ♭4 | 1.5 |
| 🟡4 | ~~Qdom7~~ | omit5 ♭7 ♯3 | 2 |
| 🟠5 | ~~Caug3~~ | ♭3 | 3 |
| 🟠5 | ~~Yaug3~~ | ♭5 | 3 |
| 🟠5 | ~~Qmaj3add6~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Ymaj3b5~~ | ♯5 | 3 |
| 🟠5 | ~~Cmin3~~ | ♯5 | 3 |
| 🟠5 | ~~Ymin3~~ | ♯3 | 3 |
| 🟠5 | ~~Csus2~~ | ♯2 ♯5 | 3 |
| 🔴6 | ~~Qmaj3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Qaug3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Ydim3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Cmaj3~~ | ♭3 ♯5 | 6 |

## C-Q-A  `{0,3,9}`  ✋ verdict(0,3,6) ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

> ✋ 人工裁决(2026-09-05):减三和弦完全命中即唯一解释:dim7 对称性副产品与换根音凑数解释全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Adim3** | — | 0 |

🗑 已过滤 18 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Cmin3add6~~ | omit5 | 0 |
| 🟢3 | ~~Cmin3~~ | omit5 add6 | 0.5 |
| 🟡4 | ~~Cdom7~~ | omit5 ♭3 ♭7 | 2 |
| 🟡4 | ~~Cdom7sus2~~ | omit5 ♭7 ♯2 | 2 |
| 🟡4 | ~~Qdom7sus4~~ | omit5 ♭7 ♯4 | 2 |
| 🟡4 | ~~Csus2~~ | omit5 ♯2 add6 | 2 |
| 🟡4 | ~~Qsus4~~ | omit5 ♯4 add6 | 2 |
| 🟠5 | ~~Cmaj3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Amaj3b5~~ | ♭3 | 3 |
| 🟠5 | ~~Amin3~~ | ♭5 | 3 |
| 🟠5 | ~~Amin3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Cmin7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Asus2~~ | ♭5 ♯2 | 3 |
| 🔴6 | ~~Cmaj3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Asus4~~ | omit5 ♯4 ♯2 | 4.5 |
| 🔴6 | ~~Caug3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Amaj3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Amaj3add11~~ | omit5 ♭3 ♯11 | 6 |

## C-Q-Z  `{0,3,10}`  ✋ verdict(0,2,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):四度碎片(二度对低音根)+ min7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Z·四度碎片** | 2·4 | 0 |
| 🔵2 | **Cmin7** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Zsus2~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Zsus4~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Cdom7~~ | omit5 ♭3 | 1 |
| 🟢3 | ~~Cdom7sus2~~ | omit5 ♯2 | 1 |
| 🟠5 | ~~Zmaj3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Cmaj7sus2~~ | omit5 ♭7 ♯2 | 3 |
| 🟠5 | ~~Cmin3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Zmin3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Cmin3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Cminmaj7~~ | omit5 ♭7 | 3 |
| 🔴6 | ~~Zmaj3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Zmin3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Csus2~~ | omit5 ♯2 ♯6 | 4.5 |
| 🔴6 | ~~Zdim3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Cmaj3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Cmaj3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Cmaj7~~ | omit5 ♭3 ♭7 | 6 |

## C-Q-B  `{0,3,11}`  ⚙ zero-cost-exclusive ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **B·Hijaz特征前三音** | ♭2·3 | 0 |
| 🔵2 | **Cminmaj7** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Cmin3~~ | omit5 add7 | 0.5 |
| 🟡4 | ~~Cmaj7sus2~~ | omit5 ♯2 | 1.5 |
| 🟡4 | ~~Cdom7~~ | omit5 ♭3 ♯7 | 2 |
| 🟡4 | ~~Cdom7sus2~~ | omit5 ♯2 ♯7 | 2 |
| 🟡4 | ~~Csus2~~ | omit5 ♯2 add7 | 2 |
| 🟠5 | ~~Bmaj3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Bmaj3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Cmaj7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Cmin7~~ | omit5 ♯7 | 3 |
| 🔴6 | ~~Cmaj3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Bsus4~~ | omit5 ♭4 ♭2 | 4.5 |
| 🔴6 | ~~Bmin3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Bmin3add9~~ | omit5 ♭9 ♯3 | 6 |

## C-E-X  `{0,4,6}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Cmaj3b5** | — | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Esus2~~ | ♯5 | 1.5 |
| 🟠5 | ~~Cdim3~~ | ♯3 | 3 |
| 🟠5 | ~~Cmaj3~~ | ♭5 | 3 |
| 🟠5 | ~~Cmaj3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Csus4~~ | ♭4 ♭5 | 3 |
| 🔴6 | ~~Cmin3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Emin3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Cmin3add11~~ | omit5 ♯3 ♯11 | 6 |
| 🔴6 | ~~Emin3add6~~ | omit5 ♭6 ♭3 | 6 |

## C-E-G  `{0,4,7}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Cmaj3** | — | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Gsus4~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Gdom7sus4~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Csus4~~ | ♭4 | 1.5 |
| 🟡4 | ~~Gdom7~~ | omit5 ♭7 ♯3 | 2 |
| 🟠5 | ~~Caug3~~ | ♭5 | 3 |
| 🟠5 | ~~Eaug3~~ | ♭3 | 3 |
| 🟠5 | ~~Gmaj3add6~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Cmaj3b5~~ | ♯5 | 3 |
| 🟠5 | ~~Cmin3~~ | ♯3 | 3 |
| 🟠5 | ~~Emin3~~ | ♯5 | 3 |
| 🟠5 | ~~Emin3add6~~ | omit5 ♭6 | 3 |
| 🟠5 | ~~Esus2~~ | ♯5 ♯2 | 3 |
| 🔴6 | ~~Gmaj3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Gaug3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Cdim3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Emaj3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Emaj3add6~~ | omit5 ♭6 ♭3 | 6 |

## C-E-Y  `{0,4,8}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Caug3** | — | 0 |
| ✅1 | **Eaug3** | — | 0 |
| ✅1 | **Yaug3** | — | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟠5 | ~~Cmaj3~~ | ♯5 | 3 |
| 🟠5 | ~~Emaj3~~ | ♯5 | 3 |
| 🟠5 | ~~Ymaj3~~ | ♯5 | 3 |
| 🟠5 | ~~Emaj3add6~~ | omit5 ♭6 | 3 |
| 🟠5 | ~~Csus4~~ | ♭4 ♯5 | 3 |
| 🟠5 | ~~Esus4~~ | ♭4 ♯5 | 3 |
| 🟠5 | ~~Ysus4~~ | ♭4 ♯5 | 3 |
| 🔴6 | ~~Cmin3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Emin3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Ymin3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Emin3add6~~ | omit5 ♭6 ♯3 | 6 |

## C-E-A  `{0,4,9}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Amin3** | — | 0 |
| 🔵2 | **Cmaj3add6** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Cmaj3~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Cdom7~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Asus2~~ | ♯2 | 1.5 |
| 🟡4 | ~~Esus4~~ | ♯5 | 1.5 |
| 🟡4 | ~~Cdom7sus4~~ | omit5 ♭4 ♭7 | 2 |
| 🟡4 | ~~Csus4~~ | omit5 ♭4 add6 | 2 |
| 🟠5 | ~~Caug3~~ | ♯5 | 3 |
| 🟠5 | ~~Eaug3~~ | ♯3 | 3 |
| 🟠5 | ~~Adim3~~ | ♯5 | 3 |
| 🟠5 | ~~Amaj3~~ | ♭3 | 3 |
| 🟠5 | ~~Cmin3add6~~ | omit5 ♯3 | 3 |
| 🔴6 | ~~Cmin3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Aaug3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Emaj3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Emaj3add6~~ | omit5 ♭6 ♯3 | 6 |
| 🔴6 | ~~Amaj3b5~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Cmin7~~ | omit5 ♭7 ♯3 | 6 |

## C-E-Z  `{0,4,10}`  ✋ verdict(0,2,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):全音叠三全音(二度对低音根)+ dom7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Z·全音叠三全音** | 2·♭5 | 0 |
| 🔵2 | **Cdom7** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Cdom7sus4~~ | omit5 ♭4 | 1 |
| 🟡4 | ~~Zsus2~~ | ♭5 | 1.5 |
| 🟡4 | ~~Zsus4~~ | omit5 ♯4 add2 | 2 |
| 🟠5 | ~~Zdim3~~ | ♭3 | 3 |
| 🟠5 | ~~Cmaj3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Cmaj3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Cmaj7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Cmaj7sus4~~ | omit5 ♭4 ♭7 | 3 |
| 🟠5 | ~~Cmin7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Esus4~~ | ♯5 ♯4 | 3 |
| 🔴6 | ~~Csus4~~ | omit5 ♭4 ♯6 | 4.5 |
| 🔴6 | ~~Zmin3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Cmin3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Zmin3add11~~ | omit5 ♭3 ♯11 | 6 |
| 🔴6 | ~~Cmin3add6~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Cminmaj7~~ | omit5 ♭7 ♯3 | 6 |

## C-E-B  `{0,4,11}`  ✋ verdict(0,1,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian挂留三音(半音对低音根,♭2+纯四)+ maj7(omit5)(半音对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **B·Phrygian挂留前三音** | ♭2·4 | 0 |
| 🔵2 | **Cmaj7** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Cmaj3~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Cdom7~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Cmaj7sus4~~ | omit5 ♭4 | 1.5 |
| 🟡4 | ~~Cdom7sus4~~ | omit5 ♭4 ♯7 | 2 |
| 🟡4 | ~~Bsus2~~ | omit5 ♭2 add4 | 2 |
| 🟡4 | ~~Csus4~~ | omit5 ♭4 add7 | 2 |
| 🟠5 | ~~Cminmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Bsus4~~ | omit5 ♭2 | 3 |
| 🔴6 | ~~Cmin3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Bmaj3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Bmaj3add9~~ | omit5 ♭9 ♯3 | 6 |
| 🔴6 | ~~Cmin7~~ | omit5 ♯3 ♯7 | 6 |

## C-F-X  `{0,5,6}`  ✋ verdict(0,1,7) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian五度为唯一解释(硬规则):R+♭2+纯五 pedal 声响,chord 解释全扭曲,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **F·Phrygian五度** | ♭2·5 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Fsus2~~ | ♭2 | 1.5 |
| 🟡4 | ~~Csus4~~ | ♭5 | 1.5 |
| 🟠5 | ~~Cmaj3b5~~ | ♯3 | 3 |
| 🔴6 | ~~Cmaj3~~ | ♭5 ♯3 | 6 |

## C-F-G  `{0,5,7}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Fsus2** | — | 0 |
| ✅1 | **Csus4** | — | 0 |
| 🔵2 | **Gdom7sus4** | omit5 | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Gdom7~~ | omit5 ♯3 | 1 |
| 🟡4 | ~~Gmaj7sus4~~ | omit5 ♭7 | 1.5 |
| 🟠5 | ~~Cmaj3~~ | ♯3 | 3 |
| 🟠5 | ~~Fmin3~~ | ♭3 | 3 |
| 🟠5 | ~~Gsus4~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Caug3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Fdim3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Gmaj3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Gmaj3add6~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Cmaj3b5~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Gmaj7~~ | omit5 ♭7 ♯3 | 6 |

## C-F-Y  `{0,5,8}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Fmin3** | — | 0 |
| 🔵2 | **Ymaj3add6** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ymaj3~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Ydom7~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Fsus2~~ | ♯2 | 1.5 |
| 🟡4 | ~~Csus4~~ | ♯5 | 1.5 |
| 🟡4 | ~~Ydom7sus4~~ | omit5 ♭4 ♭7 | 2 |
| 🟡4 | ~~Ysus4~~ | omit5 ♭4 add6 | 2 |
| 🟠5 | ~~Caug3~~ | ♯3 | 3 |
| 🟠5 | ~~Yaug3~~ | ♯5 | 3 |
| 🟠5 | ~~Fdim3~~ | ♯5 | 3 |
| 🟠5 | ~~Fmaj3~~ | ♭3 | 3 |
| 🟠5 | ~~Ymin3add6~~ | omit5 ♯3 | 3 |
| 🔴6 | ~~Ymin3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Faug3~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Cmaj3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Fmaj3b5~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Ymin7~~ | omit5 ♭7 ♯3 | 6 |

## C-F-A  `{0,5,9}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Fmaj3** | — | 0 |

🗑 已过滤 15 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Csus4~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Cdom7sus4~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Fsus4~~ | ♭4 | 1.5 |
| 🟡4 | ~~Cdom7~~ | omit5 ♭7 ♯3 | 2 |
| 🟠5 | ~~Faug3~~ | ♭5 | 3 |
| 🟠5 | ~~Aaug3~~ | ♭3 | 3 |
| 🟠5 | ~~Cmaj3add6~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Fmaj3b5~~ | ♯5 | 3 |
| 🟠5 | ~~Fmin3~~ | ♯3 | 3 |
| 🟠5 | ~~Amin3~~ | ♯5 | 3 |
| 🟠5 | ~~Asus2~~ | ♯2 ♯5 | 3 |
| 🔴6 | ~~Cmaj3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Caug3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Fdim3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Amaj3~~ | ♭3 ♯5 | 6 |

## C-F-Z  `{0,5,10}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Zsus2** | — | 0 |
| ✅1 | **Fsus4** | — | 0 |
| 🔵2 | **Cdom7sus4** | omit5 | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Cdom7~~ | omit5 ♯3 | 1 |
| 🟡4 | ~~Cmaj7sus4~~ | omit5 ♭7 | 1.5 |
| 🟠5 | ~~Fmaj3~~ | ♯3 | 3 |
| 🟠5 | ~~Zmin3~~ | ♭3 | 3 |
| 🟠5 | ~~Csus4~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Faug3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Zdim3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Cmaj3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Cmaj3add6~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Fmaj3b5~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Cmaj7~~ | omit5 ♭7 ♯3 | 6 |

## C-F-B  `{0,5,11}`  ✋ verdict(0,1,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Viennese三音(C 根,集合身份)+ maj7sus4(omit5)(P 根,爵士壳)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **B·Viennese特征前三音** | ♭2·♭5 | 0 |
| 🔵2 | **Cmaj7sus4** | omit5 | 0 |

🗑 已过滤 8 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Csus4~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Cdom7sus4~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Fsus4~~ | ♯4 | 1.5 |
| 🟡4 | ~~Cdom7~~ | omit5 ♯3 ♯7 | 2 |
| 🟠5 | ~~Cmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Bsus2~~ | ♭2 ♭5 | 3 |
| 🔴6 | ~~Cmaj3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Bsus4~~ | omit5 ♭2 ♯4 | 4.5 |

## C-X-G  `{0,6,7}`  ✋ verdict(0,1,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Viennese三音(C 根,集合身份)+ maj7sus4(omit5)(P 根,爵士壳)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **X·Viennese特征前三音** | ♭2·♭5 | 0 |
| 🔵2 | **Gmaj7sus4** | omit5 | 0 |

🗑 已过滤 7 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Gsus4~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Gdom7sus4~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Csus4~~ | ♯4 | 1.5 |
| 🟡4 | ~~Gdom7~~ | omit5 ♯3 ♯7 | 2 |
| 🟠5 | ~~Gmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Xsus2~~ | ♭5 ♭2 | 3 |
| 🔴6 | ~~Gmaj3~~ | omit5 ♯3 add7 | 3.5 |

## C-X-Y  `{0,6,8}`  ✋ verdict(0,2,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):全音叠三全音(二度对低音根)+ dom7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **X·全音叠三全音** | 2·♭5 | 0 |
| 🔵2 | **Ydom7** | omit5 | 0 |

🗑 已过滤 14 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ydom7sus4~~ | omit5 ♭4 | 1 |
| 🟡4 | ~~Xsus2~~ | ♭5 | 1.5 |
| 🟠5 | ~~Xdim3~~ | ♭3 | 3 |
| 🟠5 | ~~Ymaj3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Ymaj3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Ymaj7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Ymaj7sus4~~ | omit5 ♭4 ♭7 | 3 |
| 🟠5 | ~~Ymin7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Csus4~~ | ♯4 ♯5 | 3 |
| 🔴6 | ~~Ysus4~~ | omit5 ♭4 ♯6 | 4.5 |
| 🔴6 | ~~Xmin3~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Ymin3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Ymin3add6~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Yminmaj7~~ | omit5 ♭7 ♯3 | 6 |

## C-X-A  `{0,6,9}`  ✋ verdict(0,3,6) ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

> ✋ 人工裁决(2026-09-05):减三和弦完全命中即唯一解释:dim7 对称性副产品与换根音凑数解释全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Xdim3** | — | 0 |

🗑 已过滤 15 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Amin3add6~~ | omit5 | 0 |
| 🟢3 | ~~Amin3~~ | omit5 add6 | 0.5 |
| 🟡4 | ~~Adom7~~ | omit5 ♭3 ♭7 | 2 |
| 🟡4 | ~~Adom7sus2~~ | omit5 ♭7 ♯2 | 2 |
| 🟡4 | ~~Cdom7sus4~~ | omit5 ♭7 ♯4 | 2 |
| 🟡4 | ~~Asus2~~ | omit5 ♯2 add6 | 2 |
| 🟡4 | ~~Csus4~~ | omit5 ♯4 add6 | 2 |
| 🟠5 | ~~Amaj3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Xmaj3b5~~ | ♭3 | 3 |
| 🟠5 | ~~Xmin3~~ | ♭5 | 3 |
| 🟠5 | ~~Amin7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Xsus2~~ | ♭5 ♯2 | 3 |
| 🔴6 | ~~Amaj3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Aaug3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Xmaj3~~ | ♭5 ♭3 | 6 |

## C-X-Z  `{0,6,10}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Xmaj3b5** | — | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Cdom7sus4~~ | omit5 ♯4 | 1 |
| 🟡4 | ~~Zsus2~~ | ♯5 | 1.5 |
| 🟠5 | ~~Xdim3~~ | ♯3 | 3 |
| 🟠5 | ~~Xmaj3~~ | ♭5 | 3 |
| 🟠5 | ~~Cmaj7sus4~~ | omit5 ♭7 ♯4 | 3 |
| 🟠5 | ~~Xsus4~~ | ♭5 ♭4 | 3 |
| 🔴6 | ~~Csus4~~ | omit5 ♯4 ♯6 | 4.5 |
| 🔴6 | ~~Xmin3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Zmin3~~ | ♭3 ♯5 | 6 |

## C-X-B  `{0,6,11}`  ✋ verdict(0,1,7) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian五度为唯一解释(硬规则):R+♭2+纯五 pedal 声响,chord 解释全扭曲,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **B·Phrygian五度** | ♭2·5 | 0 |

🗑 已过滤 7 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Cmaj7sus4~~ | omit5 ♯4 | 1.5 |
| 🟡4 | ~~Bsus2~~ | ♭2 | 1.5 |
| 🟡4 | ~~Xsus4~~ | ♭5 | 1.5 |
| 🟡4 | ~~Cdom7sus4~~ | omit5 ♯4 ♯7 | 2 |
| 🟡4 | ~~Csus4~~ | omit5 ♯4 add7 | 2 |
| 🟠5 | ~~Xmaj3b5~~ | ♯3 | 3 |
| 🔴6 | ~~Xmaj3~~ | ♭5 ♯3 | 6 |

## C-G-Y  `{0,7,8}`  ✋ verdict(0,1,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian挂留三音(半音对低音根,♭2+纯四)+ maj7(omit5)(半音对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **G·Phrygian挂留前三音** | ♭2·4 | 0 |
| 🔵2 | **Ymaj7** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ymaj3~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Ydom7~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Ymaj7sus4~~ | omit5 ♭4 | 1.5 |
| 🟡4 | ~~Ydom7sus4~~ | omit5 ♭4 ♯7 | 2 |
| 🟡4 | ~~Gsus2~~ | omit5 ♭2 add4 | 2 |
| 🟡4 | ~~Ysus4~~ | omit5 ♭4 add7 | 2 |
| 🟠5 | ~~Yminmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Gsus4~~ | omit5 ♭2 | 3 |
| 🔴6 | ~~Ymin3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Gmaj3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Gmaj3add9~~ | omit5 ♭9 ♯3 | 6 |
| 🔴6 | ~~Ymin7~~ | omit5 ♯3 ♯7 | 6 |

## C-G-A  `{0,7,9}`  ✋ verdict(0,2,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):四度碎片(二度对低音根)+ min7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **G·四度碎片** | 2·4 | 0 |
| 🔵2 | **Amin7** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Gsus2~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Gsus4~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Adom7~~ | omit5 ♭3 | 1 |
| 🟢3 | ~~Adom7sus2~~ | omit5 ♯2 | 1 |
| 🟠5 | ~~Gmaj3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Amaj7sus2~~ | omit5 ♭7 ♯2 | 3 |
| 🟠5 | ~~Amin3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Gmin3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Amin3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Aminmaj7~~ | omit5 ♭7 | 3 |
| 🔴6 | ~~Gmaj3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Gmin3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Asus2~~ | omit5 ♯2 ♯6 | 4.5 |
| 🔴6 | ~~Gdim3~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Amaj3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Amaj3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Amaj7~~ | omit5 ♭3 ♭7 | 6 |

## C-Y-A  `{0,8,9}`  ⚙ zero-cost-exclusive ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Y·Hijaz特征前三音** | ♭2·3 | 0 |
| 🔵2 | **Aminmaj7** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Amin3~~ | omit5 add7 | 0.5 |
| 🟡4 | ~~Amaj7sus2~~ | omit5 ♯2 | 1.5 |
| 🟡4 | ~~Adom7~~ | omit5 ♭3 ♯7 | 2 |
| 🟡4 | ~~Adom7sus2~~ | omit5 ♯2 ♯7 | 2 |
| 🟡4 | ~~Asus2~~ | omit5 ♯2 add7 | 2 |
| 🟠5 | ~~Ymaj3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Ymaj3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Amaj7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Amin7~~ | omit5 ♯7 | 3 |
| 🔴6 | ~~Amaj3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Ysus4~~ | omit5 ♭4 ♭2 | 4.5 |
| 🔴6 | ~~Ymin3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Ymin3add9~~ | omit5 ♭9 ♯3 | 6 |

## C-Y-B  `{0,8,11}`  ✋ verdict(0,1,9) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):分叉三和弦为唯一解释(硬规则):大/小三度并存本质不可 tertian 表达,任何 chord 解释都是扭曲,全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Y·分叉三和弦** | ♭3·3 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Bdom7sus2~~ | omit5 ♭2 ♭7 | 2 |
| 🟡4 | ~~Bsus2~~ | omit5 ♭2 add6 | 2 |
| 🟠5 | ~~Ymaj3~~ | omit5 ♯2 | 3 |
| 🟠5 | ~~Ymaj3add9~~ | omit5 ♯9 | 3 |
| 🟠5 | ~~Ymin3add11~~ | omit5 ♭11 | 3 |
| 🔴6 | ~~Ysus4~~ | omit5 ♭4 ♯2 | 4.5 |

## C-A-Z  `{0,9,10}`  ✋ verdict(0,1,3) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **A·Phrygian特征前三音** | ♭2·♭3 | 0 |
| 🔵2 | **Zmaj7sus2** | omit5 | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Zsus2~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Zdom7sus2~~ | omit5 ♯7 | 1 |
| 🟠5 | ~~Amin3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Amin3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Zminmaj7~~ | omit5 ♭3 | 3 |
| 🔴6 | ~~Zmin3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Amaj3~~ | omit5 ♭3 ♭2 | 6 |
| 🔴6 | ~~Amaj3add9~~ | omit5 ♭3 ♭9 | 6 |
| 🔴6 | ~~Zmin7~~ | omit5 ♭3 ♯7 | 6 |

## C-Z-B  `{0,10,11}`  ✋ verdict(0,1,2) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):半音簇为唯一解释(硬规则):maj7sus2(♭2 omit5) 是 cost=1.5 凑数非恒等,改判不保留,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Z·半音簇** | ♭2·2 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Bmaj7sus2~~ | omit5 ♭2 | 1.5 |
| 🟡4 | ~~Bdom7sus2~~ | omit5 ♭2 ♯7 | 2 |
| 🟡4 | ~~Bsus2~~ | omit5 ♭2 add7 | 2 |
| 🔴6 | ~~Zmin3~~ | omit5 ♭3 ♭2 | 6 |

## P-D-Q  `{1,2,3}`  ✋ verdict(0,1,2) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):半音簇为唯一解释(硬规则):maj7sus2(♭2 omit5) 是 cost=1.5 凑数非恒等,改判不保留,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **P·半音簇** | ♭2·2 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Dmaj7sus2~~ | omit5 ♭2 | 1.5 |
| 🟡4 | ~~Ddom7sus2~~ | omit5 ♭2 ♯7 | 2 |
| 🟡4 | ~~Dsus2~~ | omit5 ♭2 add7 | 2 |
| 🔴6 | ~~Pmin3~~ | omit5 ♭3 ♭2 | 6 |

## P-D-E  `{1,2,4}`  ✋ verdict(0,1,3) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **P·Phrygian特征前三音** | ♭2·♭3 | 0 |
| 🔵2 | **Dmaj7sus2** | omit5 | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Dsus2~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Ddom7sus2~~ | omit5 ♯7 | 1 |
| 🟠5 | ~~Pmin3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Pmin3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Dminmaj7~~ | omit5 ♭3 | 3 |
| 🔴6 | ~~Dmin3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Pmaj3~~ | omit5 ♭3 ♭2 | 6 |
| 🔴6 | ~~Pmaj3add9~~ | omit5 ♭9 ♭3 | 6 |
| 🔴6 | ~~Dmin7~~ | omit5 ♭3 ♯7 | 6 |

## P-D-F  `{1,2,5}`  ⚙ zero-cost-exclusive ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **P·Hijaz特征前三音** | ♭2·3 | 0 |
| 🔵2 | **Dminmaj7** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Dmin3~~ | omit5 add7 | 0.5 |
| 🟡4 | ~~Dmaj7sus2~~ | omit5 ♯2 | 1.5 |
| 🟡4 | ~~Ddom7~~ | omit5 ♭3 ♯7 | 2 |
| 🟡4 | ~~Ddom7sus2~~ | omit5 ♯7 ♯2 | 2 |
| 🟡4 | ~~Dsus2~~ | omit5 ♯2 add7 | 2 |
| 🟠5 | ~~Pmaj3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Pmaj3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Dmaj7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Dmin7~~ | omit5 ♯7 | 3 |
| 🔴6 | ~~Dmaj3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Psus4~~ | omit5 ♭4 ♭2 | 4.5 |
| 🔴6 | ~~Pmin3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Pmin3add9~~ | omit5 ♭9 ♯3 | 6 |

## P-D-X  `{1,2,6}`  ✋ verdict(0,1,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian挂留三音(半音对低音根,♭2+纯四)+ maj7(omit5)(半音对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **P·Phrygian挂留前三音** | ♭2·4 | 0 |
| 🔵2 | **Dmaj7** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Dmaj3~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Ddom7~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Dmaj7sus4~~ | omit5 ♭4 | 1.5 |
| 🟡4 | ~~Ddom7sus4~~ | omit5 ♭4 ♯7 | 2 |
| 🟡4 | ~~Psus2~~ | omit5 ♭2 add4 | 2 |
| 🟡4 | ~~Dsus4~~ | omit5 ♭4 add7 | 2 |
| 🟠5 | ~~Dminmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Psus4~~ | omit5 ♭2 | 3 |
| 🔴6 | ~~Dmin3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Pmaj3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Pmaj3add9~~ | omit5 ♭9 ♯3 | 6 |
| 🔴6 | ~~Dmin7~~ | omit5 ♯7 ♯3 | 6 |

## P-D-G  `{1,2,7}`  ✋ verdict(0,1,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Viennese三音(C 根,集合身份)+ maj7sus4(omit5)(P 根,爵士壳)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **P·Viennese特征前三音** | ♭2·♭5 | 0 |
| 🔵2 | **Dmaj7sus4** | omit5 | 0 |

🗑 已过滤 8 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Dsus4~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Ddom7sus4~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Gsus4~~ | ♯4 | 1.5 |
| 🟡4 | ~~Ddom7~~ | omit5 ♯7 ♯3 | 2 |
| 🟠5 | ~~Dmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Psus2~~ | ♭2 ♭5 | 3 |
| 🔴6 | ~~Dmaj3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Psus4~~ | omit5 ♭2 ♯4 | 4.5 |

## P-D-Y  `{1,2,8}`  ✋ verdict(0,1,7) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian五度为唯一解释(硬规则):R+♭2+纯五 pedal 声响,chord 解释全扭曲,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **P·Phrygian五度** | ♭2·5 | 0 |

🗑 已过滤 7 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Dmaj7sus4~~ | omit5 ♯4 | 1.5 |
| 🟡4 | ~~Psus2~~ | ♭2 | 1.5 |
| 🟡4 | ~~Ysus4~~ | ♭5 | 1.5 |
| 🟡4 | ~~Ddom7sus4~~ | omit5 ♯7 ♯4 | 2 |
| 🟡4 | ~~Dsus4~~ | omit5 ♯4 add7 | 2 |
| 🟠5 | ~~Ymaj3b5~~ | ♯3 | 3 |
| 🔴6 | ~~Ymaj3~~ | ♭5 ♯3 | 6 |

## P-D-Z  `{1,2,10}`  ✋ verdict(0,1,9) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):分叉三和弦为唯一解释(硬规则):大/小三度并存本质不可 tertian 表达,任何 chord 解释都是扭曲,全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Z·分叉三和弦** | ♭3·3 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Pdom7sus2~~ | omit5 ♭2 ♭7 | 2 |
| 🟡4 | ~~Psus2~~ | omit5 ♭2 add6 | 2 |
| 🟠5 | ~~Zmaj3~~ | omit5 ♯2 | 3 |
| 🟠5 | ~~Zmaj3add9~~ | omit5 ♯9 | 3 |
| 🟠5 | ~~Zmin3add11~~ | omit5 ♭11 | 3 |
| 🔴6 | ~~Zsus4~~ | omit5 ♭4 ♯2 | 4.5 |

## P-Q-X  `{1,3,6}`  ✋ verdict(0,2,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):四度碎片(二度对低音根)+ min7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **P·四度碎片** | 2·4 | 0 |
| 🔵2 | **Qmin7** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Psus2~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Psus4~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Qdom7~~ | omit5 ♭3 | 1 |
| 🟢3 | ~~Qdom7sus2~~ | omit5 ♯2 | 1 |
| 🟠5 | ~~Pmaj3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Qmaj7sus2~~ | omit5 ♭7 ♯2 | 3 |
| 🟠5 | ~~Qmin3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Pmin3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Qmin3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Qminmaj7~~ | omit5 ♭7 | 3 |
| 🔴6 | ~~Pmaj3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Pmin3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Qsus2~~ | omit5 ♯2 ♯6 | 4.5 |
| 🔴6 | ~~Pdim3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Qmaj3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Qmaj3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Qmaj7~~ | omit5 ♭7 ♭3 | 6 |

## P-Q-G  `{1,3,7}`  ✋ verdict(0,2,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):全音叠三全音(二度对低音根)+ dom7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **P·全音叠三全音** | 2·♭5 | 0 |
| 🔵2 | **Qdom7** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Qdom7sus4~~ | omit5 ♭4 | 1 |
| 🟡4 | ~~Psus2~~ | ♭5 | 1.5 |
| 🟡4 | ~~Psus4~~ | omit5 ♯4 add2 | 2 |
| 🟠5 | ~~Pdim3~~ | ♭3 | 3 |
| 🟠5 | ~~Qmaj3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Qmaj3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Qmaj7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Qmaj7sus4~~ | omit5 ♭7 ♭4 | 3 |
| 🟠5 | ~~Qmin7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Gsus4~~ | ♯4 ♯5 | 3 |
| 🔴6 | ~~Qsus4~~ | omit5 ♭4 ♯6 | 4.5 |
| 🔴6 | ~~Pmin3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Qmin3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Pmin3add11~~ | omit5 ♭3 ♯11 | 6 |
| 🔴6 | ~~Qmin3add6~~ | omit5 ♯6 ♯3 | 6 |
| 🔴6 | ~~Qminmaj7~~ | omit5 ♭7 ♯3 | 6 |

## P-Q-Y  `{1,3,8}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Psus2** | — | 0 |
| ✅1 | **Ysus4** | — | 0 |
| 🔵2 | **Qdom7sus4** | omit5 | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Qdom7~~ | omit5 ♯3 | 1 |
| 🟡4 | ~~Qmaj7sus4~~ | omit5 ♭7 | 1.5 |
| 🟠5 | ~~Ymaj3~~ | ♯3 | 3 |
| 🟠5 | ~~Pmin3~~ | ♭3 | 3 |
| 🟠5 | ~~Qsus4~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Yaug3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Pdim3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Qmaj3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Qmaj3add6~~ | omit5 ♯6 ♯3 | 6 |
| 🔴6 | ~~Ymaj3b5~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Qmaj7~~ | omit5 ♭7 ♯3 | 6 |

## P-Q-A  `{1,3,9}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Amaj3b5** | — | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Qdom7sus4~~ | omit5 ♯4 | 1 |
| 🟡4 | ~~Psus2~~ | ♯5 | 1.5 |
| 🟠5 | ~~Adim3~~ | ♯3 | 3 |
| 🟠5 | ~~Amaj3~~ | ♭5 | 3 |
| 🟠5 | ~~Amaj3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Qmaj7sus4~~ | omit5 ♭7 ♯4 | 3 |
| 🟠5 | ~~Asus4~~ | ♭4 ♭5 | 3 |
| 🔴6 | ~~Qsus4~~ | omit5 ♯4 ♯6 | 4.5 |
| 🔴6 | ~~Pmin3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Amin3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Amin3add11~~ | omit5 ♯3 ♯11 | 6 |

## P-E-F  `{1,4,5}`  ✋ verdict(0,1,9) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):分叉三和弦为唯一解释(硬规则):大/小三度并存本质不可 tertian 表达,任何 chord 解释都是扭曲,全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **P·分叉三和弦** | ♭3·3 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Edom7sus2~~ | omit5 ♭7 ♭2 | 2 |
| 🟡4 | ~~Esus2~~ | omit5 ♭2 add6 | 2 |
| 🟠5 | ~~Pmaj3~~ | omit5 ♯2 | 3 |
| 🟠5 | ~~Pmaj3add9~~ | omit5 ♯9 | 3 |
| 🟠5 | ~~Pmin3add11~~ | omit5 ♭11 | 3 |
| 🔴6 | ~~Psus4~~ | omit5 ♭4 ♯2 | 4.5 |

## P-E-G  `{1,4,7}`  ✋ verdict(0,3,6) ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

> ✋ 人工裁决(2026-09-05):减三和弦完全命中即唯一解释:dim7 对称性副产品与换根音凑数解释全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Pdim3** | — | 0 |

🗑 已过滤 18 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Emin3add6~~ | omit5 | 0 |
| 🟢3 | ~~Emin3~~ | omit5 add6 | 0.5 |
| 🟡4 | ~~Edom7~~ | omit5 ♭7 ♭3 | 2 |
| 🟡4 | ~~Edom7sus2~~ | omit5 ♭7 ♯2 | 2 |
| 🟡4 | ~~Gdom7sus4~~ | omit5 ♭7 ♯4 | 2 |
| 🟡4 | ~~Esus2~~ | omit5 ♯2 add6 | 2 |
| 🟡4 | ~~Gsus4~~ | omit5 ♯4 add6 | 2 |
| 🟠5 | ~~Emaj3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Pmaj3b5~~ | ♭3 | 3 |
| 🟠5 | ~~Pmin3~~ | ♭5 | 3 |
| 🟠5 | ~~Pmin3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Emin7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Psus2~~ | ♭5 ♯2 | 3 |
| 🔴6 | ~~Emaj3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Psus4~~ | omit5 ♯4 ♯2 | 4.5 |
| 🔴6 | ~~Eaug3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Pmaj3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Pmaj3add11~~ | omit5 ♭3 ♯11 | 6 |

## P-E-Y  `{1,4,8}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Pmin3** | — | 0 |
| 🔵2 | **Emaj3add6** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Emaj3~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Edom7~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Psus2~~ | ♯2 | 1.5 |
| 🟡4 | ~~Ysus4~~ | ♯5 | 1.5 |
| 🟡4 | ~~Edom7sus4~~ | omit5 ♭7 ♭4 | 2 |
| 🟡4 | ~~Esus4~~ | omit5 ♭4 add6 | 2 |
| 🟠5 | ~~Eaug3~~ | ♯5 | 3 |
| 🟠5 | ~~Yaug3~~ | ♯3 | 3 |
| 🟠5 | ~~Pdim3~~ | ♯5 | 3 |
| 🟠5 | ~~Pmaj3~~ | ♭3 | 3 |
| 🟠5 | ~~Emin3add6~~ | omit5 ♯3 | 3 |
| 🔴6 | ~~Emin3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Paug3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Ymaj3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Pmaj3b5~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Emin7~~ | omit5 ♭7 ♯3 | 6 |

## P-E-A  `{1,4,9}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Amaj3** | — | 0 |

🗑 已过滤 15 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Esus4~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Edom7sus4~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Asus4~~ | ♭4 | 1.5 |
| 🟡4 | ~~Edom7~~ | omit5 ♭7 ♯3 | 2 |
| 🟠5 | ~~Paug3~~ | ♭3 | 3 |
| 🟠5 | ~~Aaug3~~ | ♭5 | 3 |
| 🟠5 | ~~Emaj3add6~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Amaj3b5~~ | ♯5 | 3 |
| 🟠5 | ~~Pmin3~~ | ♯5 | 3 |
| 🟠5 | ~~Amin3~~ | ♯3 | 3 |
| 🟠5 | ~~Psus2~~ | ♯2 ♯5 | 3 |
| 🔴6 | ~~Emaj3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Eaug3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Adim3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Pmaj3~~ | ♭3 ♯5 | 6 |

## P-E-Z  `{1,4,10}`  ✋ verdict(0,3,6) ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

> ✋ 人工裁决(2026-09-05):减三和弦完全命中即唯一解释:dim7 对称性副产品与换根音凑数解释全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Zdim3** | — | 0 |

🗑 已过滤 18 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Pmin3add6~~ | omit5 | 0 |
| 🟢3 | ~~Pmin3~~ | omit5 add6 | 0.5 |
| 🟡4 | ~~Pdom7~~ | omit5 ♭3 ♭7 | 2 |
| 🟡4 | ~~Pdom7sus2~~ | omit5 ♭7 ♯2 | 2 |
| 🟡4 | ~~Edom7sus4~~ | omit5 ♭7 ♯4 | 2 |
| 🟡4 | ~~Psus2~~ | omit5 ♯2 add6 | 2 |
| 🟡4 | ~~Esus4~~ | omit5 ♯4 add6 | 2 |
| 🟠5 | ~~Pmaj3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Zmaj3b5~~ | ♭3 | 3 |
| 🟠5 | ~~Zmin3~~ | ♭5 | 3 |
| 🟠5 | ~~Zmin3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Pmin7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Zsus2~~ | ♭5 ♯2 | 3 |
| 🔴6 | ~~Pmaj3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Zsus4~~ | omit5 ♯4 ♯2 | 4.5 |
| 🔴6 | ~~Paug3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Zmaj3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Zmaj3add11~~ | omit5 ♭3 ♯11 | 6 |

## P-E-B  `{1,4,11}`  ✋ verdict(0,2,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):四度碎片(二度对低音根)+ min7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **B·四度碎片** | 2·4 | 0 |
| 🔵2 | **Pmin7** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Bsus2~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Bsus4~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Pdom7~~ | omit5 ♭3 | 1 |
| 🟢3 | ~~Pdom7sus2~~ | omit5 ♯2 | 1 |
| 🟠5 | ~~Bmaj3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Pmaj7sus2~~ | omit5 ♭7 ♯2 | 3 |
| 🟠5 | ~~Pmin3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Bmin3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Pmin3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Pminmaj7~~ | omit5 ♭7 | 3 |
| 🔴6 | ~~Bmaj3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Bmin3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Psus2~~ | omit5 ♯2 ♯6 | 4.5 |
| 🔴6 | ~~Bdim3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Pmaj3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Pmaj3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Pmaj7~~ | omit5 ♭3 ♭7 | 6 |

## P-F-G  `{1,5,7}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Pmaj3b5** | — | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Gdom7sus4~~ | omit5 ♯4 | 1 |
| 🟡4 | ~~Fsus2~~ | ♯5 | 1.5 |
| 🟠5 | ~~Pdim3~~ | ♯3 | 3 |
| 🟠5 | ~~Pmaj3~~ | ♭5 | 3 |
| 🟠5 | ~~Pmaj3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Gmaj7sus4~~ | omit5 ♭7 ♯4 | 3 |
| 🟠5 | ~~Psus4~~ | ♭4 ♭5 | 3 |
| 🔴6 | ~~Gsus4~~ | omit5 ♯4 ♯6 | 4.5 |
| 🔴6 | ~~Pmin3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Fmin3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Pmin3add11~~ | omit5 ♯3 ♯11 | 6 |

## P-F-Y  `{1,5,8}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Pmaj3** | — | 0 |

🗑 已过滤 15 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ysus4~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Ydom7sus4~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Psus4~~ | ♭4 | 1.5 |
| 🟡4 | ~~Ydom7~~ | omit5 ♭7 ♯3 | 2 |
| 🟠5 | ~~Paug3~~ | ♭5 | 3 |
| 🟠5 | ~~Faug3~~ | ♭3 | 3 |
| 🟠5 | ~~Ymaj3add6~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Pmaj3b5~~ | ♯5 | 3 |
| 🟠5 | ~~Pmin3~~ | ♯3 | 3 |
| 🟠5 | ~~Fmin3~~ | ♯5 | 3 |
| 🟠5 | ~~Fsus2~~ | ♯5 ♯2 | 3 |
| 🔴6 | ~~Ymaj3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Yaug3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Pdim3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Fmaj3~~ | ♭3 ♯5 | 6 |

## P-F-A  `{1,5,9}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Paug3** | — | 0 |
| ✅1 | **Faug3** | — | 0 |
| ✅1 | **Aaug3** | — | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟠5 | ~~Pmaj3~~ | ♯5 | 3 |
| 🟠5 | ~~Fmaj3~~ | ♯5 | 3 |
| 🟠5 | ~~Amaj3~~ | ♯5 | 3 |
| 🟠5 | ~~Psus4~~ | ♭4 ♯5 | 3 |
| 🟠5 | ~~Fsus4~~ | ♭4 ♯5 | 3 |
| 🟠5 | ~~Asus4~~ | ♭4 ♯5 | 3 |
| 🔴6 | ~~Pmin3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Fmin3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Amin3~~ | ♯3 ♯5 | 6 |

## P-F-Z  `{1,5,10}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Zmin3** | — | 0 |
| 🔵2 | **Pmaj3add6** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Pmaj3~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Pdom7~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Zsus2~~ | ♯2 | 1.5 |
| 🟡4 | ~~Fsus4~~ | ♯5 | 1.5 |
| 🟡4 | ~~Pdom7sus4~~ | omit5 ♭4 ♭7 | 2 |
| 🟡4 | ~~Psus4~~ | omit5 ♭4 add6 | 2 |
| 🟠5 | ~~Paug3~~ | ♯5 | 3 |
| 🟠5 | ~~Faug3~~ | ♯3 | 3 |
| 🟠5 | ~~Zdim3~~ | ♯5 | 3 |
| 🟠5 | ~~Zmaj3~~ | ♭3 | 3 |
| 🟠5 | ~~Pmin3add6~~ | omit5 ♯3 | 3 |
| 🔴6 | ~~Pmin3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Zaug3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Fmaj3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Zmaj3b5~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Pmin7~~ | omit5 ♭7 ♯3 | 6 |

## P-F-B  `{1,5,11}`  ✋ verdict(0,2,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):全音叠三全音(二度对低音根)+ dom7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **B·全音叠三全音** | 2·♭5 | 0 |
| 🔵2 | **Pdom7** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Pdom7sus4~~ | omit5 ♭4 | 1 |
| 🟡4 | ~~Bsus2~~ | ♭5 | 1.5 |
| 🟡4 | ~~Bsus4~~ | omit5 ♯4 add2 | 2 |
| 🟠5 | ~~Bdim3~~ | ♭3 | 3 |
| 🟠5 | ~~Pmaj3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Pmaj3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Pmaj7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Pmaj7sus4~~ | omit5 ♭4 ♭7 | 3 |
| 🟠5 | ~~Pmin7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Fsus4~~ | ♯5 ♯4 | 3 |
| 🔴6 | ~~Psus4~~ | omit5 ♭4 ♯6 | 4.5 |
| 🔴6 | ~~Bmin3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Pmin3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Bmin3add11~~ | omit5 ♭3 ♯11 | 6 |
| 🔴6 | ~~Pmin3add6~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Pminmaj7~~ | omit5 ♭7 ♯3 | 6 |

## P-X-G  `{1,6,7}`  ✋ verdict(0,1,7) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian五度为唯一解释(硬规则):R+♭2+纯五 pedal 声响,chord 解释全扭曲,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **X·Phrygian五度** | ♭2·5 | 0 |

🗑 已过滤 7 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Gmaj7sus4~~ | omit5 ♯4 | 1.5 |
| 🟡4 | ~~Xsus2~~ | ♭2 | 1.5 |
| 🟡4 | ~~Psus4~~ | ♭5 | 1.5 |
| 🟡4 | ~~Gdom7sus4~~ | omit5 ♯4 ♯7 | 2 |
| 🟡4 | ~~Gsus4~~ | omit5 ♯4 add7 | 2 |
| 🟠5 | ~~Pmaj3b5~~ | ♯3 | 3 |
| 🔴6 | ~~Pmaj3~~ | ♭5 ♯3 | 6 |

## P-X-Y  `{1,6,8}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Xsus2** | — | 0 |
| ✅1 | **Psus4** | — | 0 |
| 🔵2 | **Ydom7sus4** | omit5 | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ydom7~~ | omit5 ♯3 | 1 |
| 🟡4 | ~~Ymaj7sus4~~ | omit5 ♭7 | 1.5 |
| 🟠5 | ~~Pmaj3~~ | ♯3 | 3 |
| 🟠5 | ~~Xmin3~~ | ♭3 | 3 |
| 🟠5 | ~~Ysus4~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Paug3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Xdim3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Ymaj3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Ymaj3add6~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Pmaj3b5~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Ymaj7~~ | omit5 ♭7 ♯3 | 6 |

## P-X-A  `{1,6,9}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Xmin3** | — | 0 |
| 🔵2 | **Amaj3add6** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Amaj3~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Adom7~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Xsus2~~ | ♯2 | 1.5 |
| 🟡4 | ~~Psus4~~ | ♯5 | 1.5 |
| 🟡4 | ~~Adom7sus4~~ | omit5 ♭4 ♭7 | 2 |
| 🟡4 | ~~Asus4~~ | omit5 ♭4 add6 | 2 |
| 🟠5 | ~~Paug3~~ | ♯3 | 3 |
| 🟠5 | ~~Aaug3~~ | ♯5 | 3 |
| 🟠5 | ~~Xdim3~~ | ♯5 | 3 |
| 🟠5 | ~~Xmaj3~~ | ♭3 | 3 |
| 🟠5 | ~~Amin3add6~~ | omit5 ♯3 | 3 |
| 🔴6 | ~~Amin3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Xaug3~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Pmaj3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Xmaj3b5~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Amin7~~ | omit5 ♭7 ♯3 | 6 |

## P-X-Z  `{1,6,10}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Xmaj3** | — | 0 |

🗑 已过滤 15 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Psus4~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Pdom7sus4~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Xsus4~~ | ♭4 | 1.5 |
| 🟡4 | ~~Pdom7~~ | omit5 ♭7 ♯3 | 2 |
| 🟠5 | ~~Xaug3~~ | ♭5 | 3 |
| 🟠5 | ~~Zaug3~~ | ♭3 | 3 |
| 🟠5 | ~~Pmaj3add6~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Xmaj3b5~~ | ♯5 | 3 |
| 🟠5 | ~~Xmin3~~ | ♯3 | 3 |
| 🟠5 | ~~Zmin3~~ | ♯5 | 3 |
| 🟠5 | ~~Zsus2~~ | ♯2 ♯5 | 3 |
| 🔴6 | ~~Pmaj3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Paug3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Xdim3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Zmaj3~~ | ♭3 ♯5 | 6 |

## P-X-B  `{1,6,11}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Bsus2** | — | 0 |
| ✅1 | **Xsus4** | — | 0 |
| 🔵2 | **Pdom7sus4** | omit5 | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Pdom7~~ | omit5 ♯3 | 1 |
| 🟡4 | ~~Pmaj7sus4~~ | omit5 ♭7 | 1.5 |
| 🟠5 | ~~Xmaj3~~ | ♯3 | 3 |
| 🟠5 | ~~Bmin3~~ | ♭3 | 3 |
| 🟠5 | ~~Psus4~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Xaug3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Bdim3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Pmaj3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Pmaj3add6~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Xmaj3b5~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Pmaj7~~ | omit5 ♭7 ♯3 | 6 |

## P-G-Y  `{1,7,8}`  ✋ verdict(0,1,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Viennese三音(C 根,集合身份)+ maj7sus4(omit5)(P 根,爵士壳)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **G·Viennese特征前三音** | ♭2·♭5 | 0 |
| 🔵2 | **Ymaj7sus4** | omit5 | 0 |

🗑 已过滤 8 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ysus4~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Ydom7sus4~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Psus4~~ | ♯4 | 1.5 |
| 🟡4 | ~~Ydom7~~ | omit5 ♯3 ♯7 | 2 |
| 🟠5 | ~~Ymaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Gsus2~~ | ♭5 ♭2 | 3 |
| 🔴6 | ~~Ymaj3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Gsus4~~ | omit5 ♭2 ♯4 | 4.5 |

## P-G-A  `{1,7,9}`  ✋ verdict(0,2,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):全音叠三全音(二度对低音根)+ dom7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **G·全音叠三全音** | 2·♭5 | 0 |
| 🔵2 | **Adom7** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Adom7sus4~~ | omit5 ♭4 | 1 |
| 🟡4 | ~~Gsus2~~ | ♭5 | 1.5 |
| 🟡4 | ~~Gsus4~~ | omit5 ♯4 add2 | 2 |
| 🟠5 | ~~Gdim3~~ | ♭3 | 3 |
| 🟠5 | ~~Amaj3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Amaj3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Amaj7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Amaj7sus4~~ | omit5 ♭4 ♭7 | 3 |
| 🟠5 | ~~Amin7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Psus4~~ | ♯4 ♯5 | 3 |
| 🔴6 | ~~Asus4~~ | omit5 ♭4 ♯6 | 4.5 |
| 🔴6 | ~~Gmin3~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Amin3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Gmin3add11~~ | omit5 ♭3 ♯11 | 6 |
| 🔴6 | ~~Amin3add6~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Aminmaj7~~ | omit5 ♭7 ♯3 | 6 |

## P-G-Z  `{1,7,10}`  ✋ verdict(0,3,6) ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

> ✋ 人工裁决(2026-09-05):减三和弦完全命中即唯一解释:dim7 对称性副产品与换根音凑数解释全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Gdim3** | — | 0 |

🗑 已过滤 18 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Zmin3add6~~ | omit5 | 0 |
| 🟢3 | ~~Zmin3~~ | omit5 add6 | 0.5 |
| 🟡4 | ~~Zdom7~~ | omit5 ♭3 ♭7 | 2 |
| 🟡4 | ~~Zdom7sus2~~ | omit5 ♭7 ♯2 | 2 |
| 🟡4 | ~~Pdom7sus4~~ | omit5 ♭7 ♯4 | 2 |
| 🟡4 | ~~Zsus2~~ | omit5 ♯2 add6 | 2 |
| 🟡4 | ~~Psus4~~ | omit5 ♯4 add6 | 2 |
| 🟠5 | ~~Zmaj3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Gmaj3b5~~ | ♭3 | 3 |
| 🟠5 | ~~Gmin3~~ | ♭5 | 3 |
| 🟠5 | ~~Gmin3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Zmin7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Gsus2~~ | ♭5 ♯2 | 3 |
| 🔴6 | ~~Zmaj3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Gsus4~~ | omit5 ♯4 ♯2 | 4.5 |
| 🔴6 | ~~Zaug3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Gmaj3~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Gmaj3add11~~ | omit5 ♭3 ♯11 | 6 |

## P-G-B  `{1,7,11}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Gmaj3b5** | — | 0 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Pdom7sus4~~ | omit5 ♯4 | 1 |
| 🟡4 | ~~Bsus2~~ | ♯5 | 1.5 |
| 🟠5 | ~~Gdim3~~ | ♯3 | 3 |
| 🟠5 | ~~Gmaj3~~ | ♭5 | 3 |
| 🟠5 | ~~Gmaj3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Pmaj7sus4~~ | omit5 ♭7 ♯4 | 3 |
| 🔴6 | ~~Psus4~~ | omit5 ♯4 ♯6 | 4.5 |
| 🔴6 | ~~Gmin3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Bmin3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Gmin3add11~~ | omit5 ♯11 ♯3 | 6 |

## P-Y-A  `{1,8,9}`  ✋ verdict(0,1,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian挂留三音(半音对低音根,♭2+纯四)+ maj7(omit5)(半音对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Y·Phrygian挂留前三音** | ♭2·4 | 0 |
| 🔵2 | **Amaj7** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Amaj3~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Adom7~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Amaj7sus4~~ | omit5 ♭4 | 1.5 |
| 🟡4 | ~~Adom7sus4~~ | omit5 ♭4 ♯7 | 2 |
| 🟡4 | ~~Ysus2~~ | omit5 ♭2 add4 | 2 |
| 🟡4 | ~~Asus4~~ | omit5 ♭4 add7 | 2 |
| 🟠5 | ~~Aminmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Ysus4~~ | omit5 ♭2 | 3 |
| 🔴6 | ~~Amin3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Ymaj3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Ymaj3add9~~ | omit5 ♭9 ♯3 | 6 |
| 🔴6 | ~~Amin7~~ | omit5 ♯3 ♯7 | 6 |

## P-Y-Z  `{1,8,10}`  ✋ verdict(0,2,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):四度碎片(二度对低音根)+ min7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Y·四度碎片** | 2·4 | 0 |
| 🔵2 | **Zmin7** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ysus2~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Ysus4~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Zdom7~~ | omit5 ♭3 | 1 |
| 🟢3 | ~~Zdom7sus2~~ | omit5 ♯2 | 1 |
| 🟠5 | ~~Ymaj3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Zmaj7sus2~~ | omit5 ♭7 ♯2 | 3 |
| 🟠5 | ~~Zmin3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Ymin3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Zmin3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Zminmaj7~~ | omit5 ♭7 | 3 |
| 🔴6 | ~~Ymaj3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Ymin3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Zsus2~~ | omit5 ♯2 ♯6 | 4.5 |
| 🔴6 | ~~Ydim3~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Zmaj3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Zmaj3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Zmaj7~~ | omit5 ♭3 ♭7 | 6 |

## P-A-Z  `{1,9,10}`  ⚙ zero-cost-exclusive ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **A·Hijaz特征前三音** | ♭2·3 | 0 |
| 🔵2 | **Zminmaj7** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Zmin3~~ | omit5 add7 | 0.5 |
| 🟡4 | ~~Zmaj7sus2~~ | omit5 ♯2 | 1.5 |
| 🟡4 | ~~Zdom7~~ | omit5 ♭3 ♯7 | 2 |
| 🟡4 | ~~Zdom7sus2~~ | omit5 ♯2 ♯7 | 2 |
| 🟡4 | ~~Zsus2~~ | omit5 ♯2 add7 | 2 |
| 🟠5 | ~~Amaj3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Amaj3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Zmaj7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Zmin7~~ | omit5 ♯7 | 3 |
| 🔴6 | ~~Zmaj3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Asus4~~ | omit5 ♭4 ♭2 | 4.5 |
| 🔴6 | ~~Amin3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Amin3add9~~ | omit5 ♭9 ♯3 | 6 |

## P-Z-B  `{1,10,11}`  ✋ verdict(0,1,3) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Z·Phrygian特征前三音** | ♭2·♭3 | 0 |
| 🔵2 | **Bmaj7sus2** | omit5 | 0 |

🗑 已过滤 8 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Bsus2~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Bdom7sus2~~ | omit5 ♯7 | 1 |
| 🟠5 | ~~Zmin3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Zmin3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Bminmaj7~~ | omit5 ♭3 | 3 |
| 🔴6 | ~~Bmin3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Zmaj3~~ | omit5 ♭3 ♭2 | 6 |
| 🔴6 | ~~Bmin7~~ | omit5 ♭3 ♯7 | 6 |

## D-Q-E  `{2,3,4}`  ✋ verdict(0,1,2) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):半音簇为唯一解释(硬规则):maj7sus2(♭2 omit5) 是 cost=1.5 凑数非恒等,改判不保留,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **D·半音簇** | ♭2·2 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Qmaj7sus2~~ | omit5 ♭2 | 1.5 |
| 🟡4 | ~~Qdom7sus2~~ | omit5 ♭2 ♯7 | 2 |
| 🟡4 | ~~Qsus2~~ | omit5 ♭2 add7 | 2 |
| 🔴6 | ~~Dmin3~~ | omit5 ♭3 ♭2 | 6 |

## D-Q-F  `{2,3,5}`  ✋ verdict(0,1,3) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **D·Phrygian特征前三音** | ♭2·♭3 | 0 |
| 🔵2 | **Qmaj7sus2** | omit5 | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Qsus2~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Qdom7sus2~~ | omit5 ♯7 | 1 |
| 🟠5 | ~~Dmin3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Dmin3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Qminmaj7~~ | omit5 ♭3 | 3 |
| 🔴6 | ~~Qmin3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Dmaj3~~ | omit5 ♭3 ♭2 | 6 |
| 🔴6 | ~~Dmaj3add9~~ | omit5 ♭9 ♭3 | 6 |
| 🔴6 | ~~Qmin7~~ | omit5 ♭3 ♯7 | 6 |

## D-Q-X  `{2,3,6}`  ⚙ zero-cost-exclusive ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **D·Hijaz特征前三音** | ♭2·3 | 0 |
| 🔵2 | **Qminmaj7** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Qmin3~~ | omit5 add7 | 0.5 |
| 🟡4 | ~~Qmaj7sus2~~ | omit5 ♯2 | 1.5 |
| 🟡4 | ~~Qdom7~~ | omit5 ♭3 ♯7 | 2 |
| 🟡4 | ~~Qdom7sus2~~ | omit5 ♯7 ♯2 | 2 |
| 🟡4 | ~~Qsus2~~ | omit5 ♯2 add7 | 2 |
| 🟠5 | ~~Dmaj3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Dmaj3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Qmaj7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Qmin7~~ | omit5 ♯7 | 3 |
| 🔴6 | ~~Qmaj3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Dsus4~~ | omit5 ♭4 ♭2 | 4.5 |
| 🔴6 | ~~Dmin3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Dmin3add9~~ | omit5 ♭9 ♯3 | 6 |

## D-Q-G  `{2,3,7}`  ✋ verdict(0,1,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian挂留三音(半音对低音根,♭2+纯四)+ maj7(omit5)(半音对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **D·Phrygian挂留前三音** | ♭2·4 | 0 |
| 🔵2 | **Qmaj7** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Qmaj3~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Qdom7~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Qmaj7sus4~~ | omit5 ♭4 | 1.5 |
| 🟡4 | ~~Qdom7sus4~~ | omit5 ♭4 ♯7 | 2 |
| 🟡4 | ~~Dsus2~~ | omit5 ♭2 add4 | 2 |
| 🟡4 | ~~Qsus4~~ | omit5 ♭4 add7 | 2 |
| 🟠5 | ~~Qminmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Dsus4~~ | omit5 ♭2 | 3 |
| 🔴6 | ~~Qmin3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Dmaj3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Dmaj3add9~~ | omit5 ♭9 ♯3 | 6 |
| 🔴6 | ~~Qmin7~~ | omit5 ♯7 ♯3 | 6 |

## D-Q-Y  `{2,3,8}`  ✋ verdict(0,1,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Viennese三音(C 根,集合身份)+ maj7sus4(omit5)(P 根,爵士壳)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **D·Viennese特征前三音** | ♭2·♭5 | 0 |
| 🔵2 | **Qmaj7sus4** | omit5 | 0 |

🗑 已过滤 8 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Qsus4~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Qdom7sus4~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Ysus4~~ | ♯4 | 1.5 |
| 🟡4 | ~~Qdom7~~ | omit5 ♯7 ♯3 | 2 |
| 🟠5 | ~~Qmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Dsus2~~ | ♭2 ♭5 | 3 |
| 🔴6 | ~~Qmaj3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Dsus4~~ | omit5 ♭2 ♯4 | 4.5 |

## D-Q-A  `{2,3,9}`  ✋ verdict(0,1,7) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian五度为唯一解释(硬规则):R+♭2+纯五 pedal 声响,chord 解释全扭曲,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **D·Phrygian五度** | ♭2·5 | 0 |

🗑 已过滤 7 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Qmaj7sus4~~ | omit5 ♯4 | 1.5 |
| 🟡4 | ~~Dsus2~~ | ♭2 | 1.5 |
| 🟡4 | ~~Asus4~~ | ♭5 | 1.5 |
| 🟡4 | ~~Qdom7sus4~~ | omit5 ♯7 ♯4 | 2 |
| 🟡4 | ~~Qsus4~~ | omit5 ♯4 add7 | 2 |
| 🟠5 | ~~Amaj3b5~~ | ♯3 | 3 |
| 🔴6 | ~~Amaj3~~ | ♭5 ♯3 | 6 |

## D-Q-B  `{2,3,11}`  ✋ verdict(0,1,9) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):分叉三和弦为唯一解释(硬规则):大/小三度并存本质不可 tertian 表达,任何 chord 解释都是扭曲,全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **B·分叉三和弦** | ♭3·3 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Ddom7sus2~~ | omit5 ♭2 ♭7 | 2 |
| 🟡4 | ~~Dsus2~~ | omit5 ♭2 add6 | 2 |
| 🟠5 | ~~Bmaj3~~ | omit5 ♯2 | 3 |
| 🟠5 | ~~Bmaj3add9~~ | omit5 ♯9 | 3 |
| 🟠5 | ~~Bmin3add11~~ | omit5 ♭11 | 3 |
| 🔴6 | ~~Bsus4~~ | omit5 ♭4 ♯2 | 4.5 |

## D-E-G  `{2,4,7}`  ✋ verdict(0,2,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):四度碎片(二度对低音根)+ min7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **D·四度碎片** | 2·4 | 0 |
| 🔵2 | **Emin7** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Dsus2~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Dsus4~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Edom7~~ | omit5 ♭3 | 1 |
| 🟢3 | ~~Edom7sus2~~ | omit5 ♯2 | 1 |
| 🟠5 | ~~Dmaj3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Emaj7sus2~~ | omit5 ♭7 ♯2 | 3 |
| 🟠5 | ~~Emin3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Dmin3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Emin3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Eminmaj7~~ | omit5 ♭7 | 3 |
| 🔴6 | ~~Dmaj3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Dmin3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Esus2~~ | omit5 ♯2 ♯6 | 4.5 |
| 🔴6 | ~~Ddim3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Emaj3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Emaj3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Emaj7~~ | omit5 ♭7 ♭3 | 6 |

## D-E-Y  `{2,4,8}`  ✋ verdict(0,2,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):全音叠三全音(二度对低音根)+ dom7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **D·全音叠三全音** | 2·♭5 | 0 |
| 🔵2 | **Edom7** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Edom7sus4~~ | omit5 ♭4 | 1 |
| 🟡4 | ~~Dsus2~~ | ♭5 | 1.5 |
| 🟡4 | ~~Dsus4~~ | omit5 ♯4 add2 | 2 |
| 🟠5 | ~~Ddim3~~ | ♭3 | 3 |
| 🟠5 | ~~Emaj3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Emaj3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Emaj7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Emaj7sus4~~ | omit5 ♭7 ♭4 | 3 |
| 🟠5 | ~~Emin7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Ysus4~~ | ♯4 ♯5 | 3 |
| 🔴6 | ~~Esus4~~ | omit5 ♭4 ♯6 | 4.5 |
| 🔴6 | ~~Dmin3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Emin3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Dmin3add11~~ | omit5 ♭3 ♯11 | 6 |
| 🔴6 | ~~Emin3add6~~ | omit5 ♯6 ♯3 | 6 |
| 🔴6 | ~~Eminmaj7~~ | omit5 ♭7 ♯3 | 6 |

## D-E-A  `{2,4,9}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Dsus2** | — | 0 |
| ✅1 | **Asus4** | — | 0 |
| 🔵2 | **Edom7sus4** | omit5 | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Edom7~~ | omit5 ♯3 | 1 |
| 🟡4 | ~~Emaj7sus4~~ | omit5 ♭7 | 1.5 |
| 🟠5 | ~~Amaj3~~ | ♯3 | 3 |
| 🟠5 | ~~Dmin3~~ | ♭3 | 3 |
| 🟠5 | ~~Esus4~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Aaug3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Ddim3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Emaj3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Emaj3add6~~ | omit5 ♯6 ♯3 | 6 |
| 🔴6 | ~~Amaj3b5~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Emaj7~~ | omit5 ♭7 ♯3 | 6 |

## D-E-Z  `{2,4,10}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Zmaj3b5** | — | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Edom7sus4~~ | omit5 ♯4 | 1 |
| 🟡4 | ~~Dsus2~~ | ♯5 | 1.5 |
| 🟠5 | ~~Zdim3~~ | ♯3 | 3 |
| 🟠5 | ~~Zmaj3~~ | ♭5 | 3 |
| 🟠5 | ~~Zmaj3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Emaj7sus4~~ | omit5 ♭7 ♯4 | 3 |
| 🟠5 | ~~Zsus4~~ | ♭4 ♭5 | 3 |
| 🔴6 | ~~Esus4~~ | omit5 ♯4 ♯6 | 4.5 |
| 🔴6 | ~~Dmin3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Zmin3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Zmin3add11~~ | omit5 ♯3 ♯11 | 6 |

## D-F-X  `{2,5,6}`  ✋ verdict(0,1,9) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):分叉三和弦为唯一解释(硬规则):大/小三度并存本质不可 tertian 表达,任何 chord 解释都是扭曲,全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **D·分叉三和弦** | ♭3·3 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Fdom7sus2~~ | omit5 ♭7 ♭2 | 2 |
| 🟡4 | ~~Fsus2~~ | omit5 ♭2 add6 | 2 |
| 🟠5 | ~~Dmaj3~~ | omit5 ♯2 | 3 |
| 🟠5 | ~~Dmaj3add9~~ | omit5 ♯9 | 3 |
| 🟠5 | ~~Dmin3add11~~ | omit5 ♭11 | 3 |
| 🔴6 | ~~Dsus4~~ | omit5 ♭4 ♯2 | 4.5 |

## D-F-Y  `{2,5,8}`  ✋ verdict(0,3,6) ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

> ✋ 人工裁决(2026-09-05):减三和弦完全命中即唯一解释:dim7 对称性副产品与换根音凑数解释全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Ddim3** | — | 0 |

🗑 已过滤 18 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Fmin3add6~~ | omit5 | 0 |
| 🟢3 | ~~Fmin3~~ | omit5 add6 | 0.5 |
| 🟡4 | ~~Fdom7~~ | omit5 ♭7 ♭3 | 2 |
| 🟡4 | ~~Fdom7sus2~~ | omit5 ♭7 ♯2 | 2 |
| 🟡4 | ~~Ydom7sus4~~ | omit5 ♭7 ♯4 | 2 |
| 🟡4 | ~~Fsus2~~ | omit5 ♯2 add6 | 2 |
| 🟡4 | ~~Ysus4~~ | omit5 ♯4 add6 | 2 |
| 🟠5 | ~~Fmaj3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Dmaj3b5~~ | ♭3 | 3 |
| 🟠5 | ~~Dmin3~~ | ♭5 | 3 |
| 🟠5 | ~~Dmin3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Fmin7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Dsus2~~ | ♭5 ♯2 | 3 |
| 🔴6 | ~~Fmaj3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Dsus4~~ | omit5 ♯4 ♯2 | 4.5 |
| 🔴6 | ~~Faug3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Dmaj3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Dmaj3add11~~ | omit5 ♭3 ♯11 | 6 |

## D-F-A  `{2,5,9}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Dmin3** | — | 0 |
| 🔵2 | **Fmaj3add6** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Fmaj3~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Fdom7~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Dsus2~~ | ♯2 | 1.5 |
| 🟡4 | ~~Asus4~~ | ♯5 | 1.5 |
| 🟡4 | ~~Fdom7sus4~~ | omit5 ♭7 ♭4 | 2 |
| 🟡4 | ~~Fsus4~~ | omit5 ♭4 add6 | 2 |
| 🟠5 | ~~Faug3~~ | ♯5 | 3 |
| 🟠5 | ~~Aaug3~~ | ♯3 | 3 |
| 🟠5 | ~~Ddim3~~ | ♯5 | 3 |
| 🟠5 | ~~Dmaj3~~ | ♭3 | 3 |
| 🟠5 | ~~Fmin3add6~~ | omit5 ♯3 | 3 |
| 🔴6 | ~~Fmin3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Daug3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Amaj3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Dmaj3b5~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Fmin7~~ | omit5 ♭7 ♯3 | 6 |

## D-F-Z  `{2,5,10}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Zmaj3** | — | 0 |

🗑 已过滤 15 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Fsus4~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Fdom7sus4~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Zsus4~~ | ♭4 | 1.5 |
| 🟡4 | ~~Fdom7~~ | omit5 ♭7 ♯3 | 2 |
| 🟠5 | ~~Daug3~~ | ♭3 | 3 |
| 🟠5 | ~~Zaug3~~ | ♭5 | 3 |
| 🟠5 | ~~Fmaj3add6~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Zmaj3b5~~ | ♯5 | 3 |
| 🟠5 | ~~Dmin3~~ | ♯5 | 3 |
| 🟠5 | ~~Zmin3~~ | ♯3 | 3 |
| 🟠5 | ~~Dsus2~~ | ♯2 ♯5 | 3 |
| 🔴6 | ~~Fmaj3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Faug3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Zdim3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Dmaj3~~ | ♭3 ♯5 | 6 |

## D-F-B  `{2,5,11}`  ✋ verdict(0,3,6) ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

> ✋ 人工裁决(2026-09-05):减三和弦完全命中即唯一解释:dim7 对称性副产品与换根音凑数解释全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Bdim3** | — | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Dmin3add6~~ | omit5 | 0 |
| 🟢3 | ~~Dmin3~~ | omit5 add6 | 0.5 |
| 🟡4 | ~~Ddom7~~ | omit5 ♭3 ♭7 | 2 |
| 🟡4 | ~~Ddom7sus2~~ | omit5 ♭7 ♯2 | 2 |
| 🟡4 | ~~Dsus2~~ | omit5 ♯2 add6 | 2 |
| 🟠5 | ~~Dmaj3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Bmaj3b5~~ | ♭3 | 3 |
| 🟠5 | ~~Bmin3~~ | ♭5 | 3 |
| 🟠5 | ~~Bmin3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Dmin7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Bsus2~~ | ♭5 ♯2 | 3 |
| 🔴6 | ~~Dmaj3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Bsus4~~ | omit5 ♯4 ♯2 | 4.5 |
| 🔴6 | ~~Daug3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Bmaj3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Bmaj3add11~~ | omit5 ♭3 ♯11 | 6 |

## D-X-Y  `{2,6,8}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Dmaj3b5** | — | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ydom7sus4~~ | omit5 ♯4 | 1 |
| 🟡4 | ~~Xsus2~~ | ♯5 | 1.5 |
| 🟠5 | ~~Ddim3~~ | ♯3 | 3 |
| 🟠5 | ~~Dmaj3~~ | ♭5 | 3 |
| 🟠5 | ~~Dmaj3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Ymaj7sus4~~ | omit5 ♭7 ♯4 | 3 |
| 🟠5 | ~~Dsus4~~ | ♭4 ♭5 | 3 |
| 🔴6 | ~~Ysus4~~ | omit5 ♯4 ♯6 | 4.5 |
| 🔴6 | ~~Dmin3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Xmin3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Dmin3add11~~ | omit5 ♯3 ♯11 | 6 |

## D-X-A  `{2,6,9}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Dmaj3** | — | 0 |

🗑 已过滤 15 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Asus4~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Adom7sus4~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Dsus4~~ | ♭4 | 1.5 |
| 🟡4 | ~~Adom7~~ | omit5 ♭7 ♯3 | 2 |
| 🟠5 | ~~Daug3~~ | ♭5 | 3 |
| 🟠5 | ~~Xaug3~~ | ♭3 | 3 |
| 🟠5 | ~~Amaj3add6~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Dmaj3b5~~ | ♯5 | 3 |
| 🟠5 | ~~Dmin3~~ | ♯3 | 3 |
| 🟠5 | ~~Xmin3~~ | ♯5 | 3 |
| 🟠5 | ~~Xsus2~~ | ♯5 ♯2 | 3 |
| 🔴6 | ~~Amaj3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Aaug3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Ddim3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Xmaj3~~ | ♭3 ♯5 | 6 |

## D-X-Z  `{2,6,10}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Daug3** | — | 0 |
| ✅1 | **Xaug3** | — | 0 |
| ✅1 | **Zaug3** | — | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟠5 | ~~Dmaj3~~ | ♯5 | 3 |
| 🟠5 | ~~Xmaj3~~ | ♯5 | 3 |
| 🟠5 | ~~Zmaj3~~ | ♯5 | 3 |
| 🟠5 | ~~Dsus4~~ | ♭4 ♯5 | 3 |
| 🟠5 | ~~Xsus4~~ | ♭4 ♯5 | 3 |
| 🟠5 | ~~Zsus4~~ | ♭4 ♯5 | 3 |
| 🔴6 | ~~Dmin3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Xmin3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Zmin3~~ | ♯3 ♯5 | 6 |

## D-X-B  `{2,6,11}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Bmin3** | — | 0 |
| 🔵2 | **Dmaj3add6** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Dmaj3~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Ddom7~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Bsus2~~ | ♯2 | 1.5 |
| 🟡4 | ~~Xsus4~~ | ♯5 | 1.5 |
| 🟡4 | ~~Ddom7sus4~~ | omit5 ♭4 ♭7 | 2 |
| 🟡4 | ~~Dsus4~~ | omit5 ♭4 add6 | 2 |
| 🟠5 | ~~Daug3~~ | ♯5 | 3 |
| 🟠5 | ~~Xaug3~~ | ♯3 | 3 |
| 🟠5 | ~~Bdim3~~ | ♯5 | 3 |
| 🟠5 | ~~Bmaj3~~ | ♭3 | 3 |
| 🟠5 | ~~Dmin3add6~~ | omit5 ♯3 | 3 |
| 🔴6 | ~~Dmin3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Baug3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Xmaj3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Bmaj3b5~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Dmin7~~ | omit5 ♭7 ♯3 | 6 |

## D-G-Y  `{2,7,8}`  ✋ verdict(0,1,7) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian五度为唯一解释(硬规则):R+♭2+纯五 pedal 声响,chord 解释全扭曲,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **G·Phrygian五度** | ♭2·5 | 0 |

🗑 已过滤 7 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Ymaj7sus4~~ | omit5 ♯4 | 1.5 |
| 🟡4 | ~~Gsus2~~ | ♭2 | 1.5 |
| 🟡4 | ~~Dsus4~~ | ♭5 | 1.5 |
| 🟡4 | ~~Ydom7sus4~~ | omit5 ♯4 ♯7 | 2 |
| 🟡4 | ~~Ysus4~~ | omit5 ♯4 add7 | 2 |
| 🟠5 | ~~Dmaj3b5~~ | ♯3 | 3 |
| 🔴6 | ~~Dmaj3~~ | ♭5 ♯3 | 6 |

## D-G-A  `{2,7,9}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Gsus2** | — | 0 |
| ✅1 | **Dsus4** | — | 0 |
| 🔵2 | **Adom7sus4** | omit5 | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Adom7~~ | omit5 ♯3 | 1 |
| 🟡4 | ~~Amaj7sus4~~ | omit5 ♭7 | 1.5 |
| 🟠5 | ~~Dmaj3~~ | ♯3 | 3 |
| 🟠5 | ~~Gmin3~~ | ♭3 | 3 |
| 🟠5 | ~~Asus4~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Daug3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Gdim3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Amaj3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Amaj3add6~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Dmaj3b5~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Amaj7~~ | omit5 ♭7 ♯3 | 6 |

## D-G-Z  `{2,7,10}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Gmin3** | — | 0 |
| 🔵2 | **Zmaj3add6** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Zmaj3~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Zdom7~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Gsus2~~ | ♯2 | 1.5 |
| 🟡4 | ~~Dsus4~~ | ♯5 | 1.5 |
| 🟡4 | ~~Zdom7sus4~~ | omit5 ♭4 ♭7 | 2 |
| 🟡4 | ~~Zsus4~~ | omit5 ♭4 add6 | 2 |
| 🟠5 | ~~Daug3~~ | ♯3 | 3 |
| 🟠5 | ~~Zaug3~~ | ♯5 | 3 |
| 🟠5 | ~~Gdim3~~ | ♯5 | 3 |
| 🟠5 | ~~Gmaj3~~ | ♭3 | 3 |
| 🟠5 | ~~Zmin3add6~~ | omit5 ♯3 | 3 |
| 🔴6 | ~~Zmin3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Gaug3~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Dmaj3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Gmaj3b5~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Zmin7~~ | omit5 ♭7 ♯3 | 6 |

## D-G-B  `{2,7,11}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Gmaj3** | — | 0 |

🗑 已过滤 15 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Dsus4~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Ddom7sus4~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Gsus4~~ | ♭4 | 1.5 |
| 🟡4 | ~~Ddom7~~ | omit5 ♭7 ♯3 | 2 |
| 🟠5 | ~~Gaug3~~ | ♭5 | 3 |
| 🟠5 | ~~Baug3~~ | ♭3 | 3 |
| 🟠5 | ~~Dmaj3add6~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Gmaj3b5~~ | ♯5 | 3 |
| 🟠5 | ~~Gmin3~~ | ♯3 | 3 |
| 🟠5 | ~~Bmin3~~ | ♯5 | 3 |
| 🟠5 | ~~Bsus2~~ | ♯2 ♯5 | 3 |
| 🔴6 | ~~Dmaj3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Daug3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Gdim3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Bmaj3~~ | ♭3 ♯5 | 6 |

## D-Y-A  `{2,8,9}`  ✋ verdict(0,1,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Viennese三音(C 根,集合身份)+ maj7sus4(omit5)(P 根,爵士壳)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Y·Viennese特征前三音** | ♭2·♭5 | 0 |
| 🔵2 | **Amaj7sus4** | omit5 | 0 |

🗑 已过滤 8 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Asus4~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Adom7sus4~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Dsus4~~ | ♯4 | 1.5 |
| 🟡4 | ~~Adom7~~ | omit5 ♯3 ♯7 | 2 |
| 🟠5 | ~~Amaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Ysus2~~ | ♭5 ♭2 | 3 |
| 🔴6 | ~~Amaj3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Ysus4~~ | omit5 ♭2 ♯4 | 4.5 |

## D-Y-Z  `{2,8,10}`  ✋ verdict(0,2,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):全音叠三全音(二度对低音根)+ dom7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Y·全音叠三全音** | 2·♭5 | 0 |
| 🔵2 | **Zdom7** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Zdom7sus4~~ | omit5 ♭4 | 1 |
| 🟡4 | ~~Ysus2~~ | ♭5 | 1.5 |
| 🟡4 | ~~Ysus4~~ | omit5 ♯4 add2 | 2 |
| 🟠5 | ~~Ydim3~~ | ♭3 | 3 |
| 🟠5 | ~~Zmaj3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Zmaj3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Zmaj7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Zmaj7sus4~~ | omit5 ♭4 ♭7 | 3 |
| 🟠5 | ~~Zmin7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Dsus4~~ | ♯4 ♯5 | 3 |
| 🔴6 | ~~Zsus4~~ | omit5 ♭4 ♯6 | 4.5 |
| 🔴6 | ~~Ymin3~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Zmin3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Ymin3add11~~ | omit5 ♭3 ♯11 | 6 |
| 🔴6 | ~~Zmin3add6~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Zminmaj7~~ | omit5 ♭7 ♯3 | 6 |

## D-Y-B  `{2,8,11}`  ✋ verdict(0,3,6) ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

> ✋ 人工裁决(2026-09-05):减三和弦完全命中即唯一解释:dim7 对称性副产品与换根音凑数解释全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Ydim3** | — | 0 |

🗑 已过滤 18 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Bmin3add6~~ | omit5 | 0 |
| 🟢3 | ~~Bmin3~~ | omit5 add6 | 0.5 |
| 🟡4 | ~~Bdom7~~ | omit5 ♭3 ♭7 | 2 |
| 🟡4 | ~~Bdom7sus2~~ | omit5 ♭7 ♯2 | 2 |
| 🟡4 | ~~Ddom7sus4~~ | omit5 ♭7 ♯4 | 2 |
| 🟡4 | ~~Bsus2~~ | omit5 ♯2 add6 | 2 |
| 🟡4 | ~~Dsus4~~ | omit5 ♯4 add6 | 2 |
| 🟠5 | ~~Bmaj3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Ymaj3b5~~ | ♭3 | 3 |
| 🟠5 | ~~Ymin3~~ | ♭5 | 3 |
| 🟠5 | ~~Ymin3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Bmin7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Ysus2~~ | ♭5 ♯2 | 3 |
| 🔴6 | ~~Bmaj3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Ysus4~~ | omit5 ♯4 ♯2 | 4.5 |
| 🔴6 | ~~Baug3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Ymaj3~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Ymaj3add11~~ | omit5 ♭3 ♯11 | 6 |

## D-A-Z  `{2,9,10}`  ✋ verdict(0,1,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian挂留三音(半音对低音根,♭2+纯四)+ maj7(omit5)(半音对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **A·Phrygian挂留前三音** | ♭2·4 | 0 |
| 🔵2 | **Zmaj7** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Zmaj3~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Zdom7~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Zmaj7sus4~~ | omit5 ♭4 | 1.5 |
| 🟡4 | ~~Zdom7sus4~~ | omit5 ♭4 ♯7 | 2 |
| 🟡4 | ~~Asus2~~ | omit5 ♭2 add4 | 2 |
| 🟡4 | ~~Zsus4~~ | omit5 ♭4 add7 | 2 |
| 🟠5 | ~~Zminmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Asus4~~ | omit5 ♭2 | 3 |
| 🔴6 | ~~Zmin3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Amaj3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Amaj3add9~~ | omit5 ♭9 ♯3 | 6 |
| 🔴6 | ~~Zmin7~~ | omit5 ♯3 ♯7 | 6 |

## D-A-B  `{2,9,11}`  ✋ verdict(0,2,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):四度碎片(二度对低音根)+ min7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **A·四度碎片** | 2·4 | 0 |
| 🔵2 | **Bmin7** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Asus2~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Asus4~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Bdom7~~ | omit5 ♭3 | 1 |
| 🟢3 | ~~Bdom7sus2~~ | omit5 ♯2 | 1 |
| 🟠5 | ~~Amaj3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Bmaj7sus2~~ | omit5 ♭7 ♯2 | 3 |
| 🟠5 | ~~Bmin3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Amin3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Bmin3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Bminmaj7~~ | omit5 ♭7 | 3 |
| 🔴6 | ~~Amaj3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Amin3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Bsus2~~ | omit5 ♯2 ♯6 | 4.5 |
| 🔴6 | ~~Adim3~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Bmaj3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Bmaj3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Bmaj7~~ | omit5 ♭3 ♭7 | 6 |

## D-Z-B  `{2,10,11}`  ⚙ zero-cost-exclusive ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Z·Hijaz特征前三音** | ♭2·3 | 0 |
| 🔵2 | **Bminmaj7** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Bmin3~~ | omit5 add7 | 0.5 |
| 🟡4 | ~~Bmaj7sus2~~ | omit5 ♯2 | 1.5 |
| 🟡4 | ~~Bdom7~~ | omit5 ♭3 ♯7 | 2 |
| 🟡4 | ~~Bdom7sus2~~ | omit5 ♯2 ♯7 | 2 |
| 🟡4 | ~~Bsus2~~ | omit5 ♯2 add7 | 2 |
| 🟠5 | ~~Zmaj3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Zmaj3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Bmaj7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Bmin7~~ | omit5 ♯7 | 3 |
| 🔴6 | ~~Bmaj3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Zsus4~~ | omit5 ♭4 ♭2 | 4.5 |
| 🔴6 | ~~Zmin3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Zmin3add9~~ | omit5 ♭9 ♯3 | 6 |

## Q-E-F  `{3,4,5}`  ✋ verdict(0,1,2) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):半音簇为唯一解释(硬规则):maj7sus2(♭2 omit5) 是 cost=1.5 凑数非恒等,改判不保留,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Q·半音簇** | ♭2·2 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Emaj7sus2~~ | omit5 ♭2 | 1.5 |
| 🟡4 | ~~Edom7sus2~~ | omit5 ♭2 ♯7 | 2 |
| 🟡4 | ~~Esus2~~ | omit5 ♭2 add7 | 2 |
| 🔴6 | ~~Qmin3~~ | omit5 ♭3 ♭2 | 6 |

## Q-E-X  `{3,4,6}`  ✋ verdict(0,1,3) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Q·Phrygian特征前三音** | ♭2·♭3 | 0 |
| 🔵2 | **Emaj7sus2** | omit5 | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Esus2~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Edom7sus2~~ | omit5 ♯7 | 1 |
| 🟠5 | ~~Qmin3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Qmin3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Eminmaj7~~ | omit5 ♭3 | 3 |
| 🔴6 | ~~Emin3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Qmaj3~~ | omit5 ♭3 ♭2 | 6 |
| 🔴6 | ~~Qmaj3add9~~ | omit5 ♭9 ♭3 | 6 |
| 🔴6 | ~~Emin7~~ | omit5 ♭3 ♯7 | 6 |

## Q-E-G  `{3,4,7}`  ⚙ zero-cost-exclusive ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Q·Hijaz特征前三音** | ♭2·3 | 0 |
| 🔵2 | **Eminmaj7** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Emin3~~ | omit5 add7 | 0.5 |
| 🟡4 | ~~Emaj7sus2~~ | omit5 ♯2 | 1.5 |
| 🟡4 | ~~Edom7~~ | omit5 ♭3 ♯7 | 2 |
| 🟡4 | ~~Edom7sus2~~ | omit5 ♯7 ♯2 | 2 |
| 🟡4 | ~~Esus2~~ | omit5 ♯2 add7 | 2 |
| 🟠5 | ~~Qmaj3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Qmaj3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Emaj7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Emin7~~ | omit5 ♯7 | 3 |
| 🔴6 | ~~Emaj3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Qsus4~~ | omit5 ♭4 ♭2 | 4.5 |
| 🔴6 | ~~Qmin3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Qmin3add9~~ | omit5 ♭9 ♯3 | 6 |

## Q-E-Y  `{3,4,8}`  ✋ verdict(0,1,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian挂留三音(半音对低音根,♭2+纯四)+ maj7(omit5)(半音对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Q·Phrygian挂留前三音** | ♭2·4 | 0 |
| 🔵2 | **Emaj7** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Emaj3~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Edom7~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Emaj7sus4~~ | omit5 ♭4 | 1.5 |
| 🟡4 | ~~Edom7sus4~~ | omit5 ♭4 ♯7 | 2 |
| 🟡4 | ~~Qsus2~~ | omit5 ♭2 add4 | 2 |
| 🟡4 | ~~Esus4~~ | omit5 ♭4 add7 | 2 |
| 🟠5 | ~~Eminmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Qsus4~~ | omit5 ♭2 | 3 |
| 🔴6 | ~~Emin3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Qmaj3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Qmaj3add9~~ | omit5 ♭9 ♯3 | 6 |
| 🔴6 | ~~Emin7~~ | omit5 ♯7 ♯3 | 6 |

## Q-E-A  `{3,4,9}`  ✋ verdict(0,1,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Viennese三音(C 根,集合身份)+ maj7sus4(omit5)(P 根,爵士壳)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Q·Viennese特征前三音** | ♭2·♭5 | 0 |
| 🔵2 | **Emaj7sus4** | omit5 | 0 |

🗑 已过滤 8 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Esus4~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Edom7sus4~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Asus4~~ | ♯4 | 1.5 |
| 🟡4 | ~~Edom7~~ | omit5 ♯7 ♯3 | 2 |
| 🟠5 | ~~Emaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Qsus2~~ | ♭2 ♭5 | 3 |
| 🔴6 | ~~Emaj3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Qsus4~~ | omit5 ♭2 ♯4 | 4.5 |

## Q-E-Z  `{3,4,10}`  ✋ verdict(0,1,7) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian五度为唯一解释(硬规则):R+♭2+纯五 pedal 声响,chord 解释全扭曲,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Q·Phrygian五度** | ♭2·5 | 0 |

🗑 已过滤 7 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Emaj7sus4~~ | omit5 ♯4 | 1.5 |
| 🟡4 | ~~Qsus2~~ | ♭2 | 1.5 |
| 🟡4 | ~~Zsus4~~ | ♭5 | 1.5 |
| 🟡4 | ~~Edom7sus4~~ | omit5 ♯7 ♯4 | 2 |
| 🟡4 | ~~Esus4~~ | omit5 ♯4 add7 | 2 |
| 🟠5 | ~~Zmaj3b5~~ | ♯3 | 3 |
| 🔴6 | ~~Zmaj3~~ | ♭5 ♯3 | 6 |

## Q-F-Y  `{3,5,8}`  ✋ verdict(0,2,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):四度碎片(二度对低音根)+ min7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Q·四度碎片** | 2·4 | 0 |
| 🔵2 | **Fmin7** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Qsus2~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Qsus4~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Fdom7~~ | omit5 ♭3 | 1 |
| 🟢3 | ~~Fdom7sus2~~ | omit5 ♯2 | 1 |
| 🟠5 | ~~Qmaj3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Fmaj7sus2~~ | omit5 ♭7 ♯2 | 3 |
| 🟠5 | ~~Fmin3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Qmin3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Fmin3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Fminmaj7~~ | omit5 ♭7 | 3 |
| 🔴6 | ~~Qmaj3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Qmin3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Fsus2~~ | omit5 ♯2 ♯6 | 4.5 |
| 🔴6 | ~~Qdim3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Fmaj3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Fmaj3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Fmaj7~~ | omit5 ♭7 ♭3 | 6 |

## Q-F-A  `{3,5,9}`  ✋ verdict(0,2,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):全音叠三全音(二度对低音根)+ dom7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Q·全音叠三全音** | 2·♭5 | 0 |
| 🔵2 | **Fdom7** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Fdom7sus4~~ | omit5 ♭4 | 1 |
| 🟡4 | ~~Qsus2~~ | ♭5 | 1.5 |
| 🟡4 | ~~Qsus4~~ | omit5 ♯4 add2 | 2 |
| 🟠5 | ~~Qdim3~~ | ♭3 | 3 |
| 🟠5 | ~~Fmaj3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Fmaj3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Fmaj7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Fmaj7sus4~~ | omit5 ♭7 ♭4 | 3 |
| 🟠5 | ~~Fmin7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Asus4~~ | ♯4 ♯5 | 3 |
| 🔴6 | ~~Fsus4~~ | omit5 ♭4 ♯6 | 4.5 |
| 🔴6 | ~~Qmin3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Fmin3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Qmin3add11~~ | omit5 ♭3 ♯11 | 6 |
| 🔴6 | ~~Fmin3add6~~ | omit5 ♯6 ♯3 | 6 |
| 🔴6 | ~~Fminmaj7~~ | omit5 ♭7 ♯3 | 6 |

## Q-F-Z  `{3,5,10}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Qsus2** | — | 0 |
| ✅1 | **Zsus4** | — | 0 |
| 🔵2 | **Fdom7sus4** | omit5 | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Fdom7~~ | omit5 ♯3 | 1 |
| 🟡4 | ~~Fmaj7sus4~~ | omit5 ♭7 | 1.5 |
| 🟠5 | ~~Zmaj3~~ | ♯3 | 3 |
| 🟠5 | ~~Qmin3~~ | ♭3 | 3 |
| 🟠5 | ~~Fsus4~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Zaug3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Qdim3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Fmaj3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Fmaj3add6~~ | omit5 ♯6 ♯3 | 6 |
| 🔴6 | ~~Zmaj3b5~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Fmaj7~~ | omit5 ♭7 ♯3 | 6 |

## Q-F-B  `{3,5,11}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Bmaj3b5** | — | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Qsus2~~ | ♯5 | 1.5 |
| 🟠5 | ~~Bdim3~~ | ♯3 | 3 |
| 🟠5 | ~~Bmaj3~~ | ♭5 | 3 |
| 🟠5 | ~~Bmaj3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Bsus4~~ | ♭4 ♭5 | 3 |
| 🔴6 | ~~Qmin3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Bmin3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Bmin3add11~~ | omit5 ♯3 ♯11 | 6 |
| 🔴6 | ~~Qmin3add6~~ | omit5 ♭3 ♭6 | 6 |

## Q-X-G  `{3,6,7}`  ✋ verdict(0,1,9) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):分叉三和弦为唯一解释(硬规则):大/小三度并存本质不可 tertian 表达,任何 chord 解释都是扭曲,全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Q·分叉三和弦** | ♭3·3 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Xdom7sus2~~ | omit5 ♭7 ♭2 | 2 |
| 🟡4 | ~~Xsus2~~ | omit5 ♭2 add6 | 2 |
| 🟠5 | ~~Qmaj3~~ | omit5 ♯2 | 3 |
| 🟠5 | ~~Qmaj3add9~~ | omit5 ♯9 | 3 |
| 🟠5 | ~~Qmin3add11~~ | omit5 ♭11 | 3 |
| 🔴6 | ~~Qsus4~~ | omit5 ♭4 ♯2 | 4.5 |

## Q-X-A  `{3,6,9}`  ✋ verdict(0,3,6) ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

> ✋ 人工裁决(2026-09-05):减三和弦完全命中即唯一解释:dim7 对称性副产品与换根音凑数解释全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Qdim3** | — | 0 |

🗑 已过滤 18 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Xmin3add6~~ | omit5 | 0 |
| 🟢3 | ~~Xmin3~~ | omit5 add6 | 0.5 |
| 🟡4 | ~~Xdom7~~ | omit5 ♭7 ♭3 | 2 |
| 🟡4 | ~~Xdom7sus2~~ | omit5 ♭7 ♯2 | 2 |
| 🟡4 | ~~Adom7sus4~~ | omit5 ♭7 ♯4 | 2 |
| 🟡4 | ~~Xsus2~~ | omit5 ♯2 add6 | 2 |
| 🟡4 | ~~Asus4~~ | omit5 ♯4 add6 | 2 |
| 🟠5 | ~~Xmaj3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Qmaj3b5~~ | ♭3 | 3 |
| 🟠5 | ~~Qmin3~~ | ♭5 | 3 |
| 🟠5 | ~~Qmin3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Xmin7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Qsus2~~ | ♭5 ♯2 | 3 |
| 🔴6 | ~~Xmaj3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Qsus4~~ | omit5 ♯4 ♯2 | 4.5 |
| 🔴6 | ~~Xaug3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Qmaj3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Qmaj3add11~~ | omit5 ♭3 ♯11 | 6 |

## Q-X-Z  `{3,6,10}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Qmin3** | — | 0 |
| 🔵2 | **Xmaj3add6** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Xmaj3~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Xdom7~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Qsus2~~ | ♯2 | 1.5 |
| 🟡4 | ~~Zsus4~~ | ♯5 | 1.5 |
| 🟡4 | ~~Xdom7sus4~~ | omit5 ♭7 ♭4 | 2 |
| 🟡4 | ~~Xsus4~~ | omit5 ♭4 add6 | 2 |
| 🟠5 | ~~Xaug3~~ | ♯5 | 3 |
| 🟠5 | ~~Zaug3~~ | ♯3 | 3 |
| 🟠5 | ~~Qdim3~~ | ♯5 | 3 |
| 🟠5 | ~~Qmaj3~~ | ♭3 | 3 |
| 🟠5 | ~~Xmin3add6~~ | omit5 ♯3 | 3 |
| 🔴6 | ~~Xmin3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Qaug3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Zmaj3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Qmaj3b5~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Xmin7~~ | omit5 ♭7 ♯3 | 6 |

## Q-X-B  `{3,6,11}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Bmaj3** | — | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Xsus4~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Xdom7sus4~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Bsus4~~ | ♭4 | 1.5 |
| 🟡4 | ~~Xdom7~~ | omit5 ♭7 ♯3 | 2 |
| 🟠5 | ~~Qaug3~~ | ♭3 | 3 |
| 🟠5 | ~~Baug3~~ | ♭5 | 3 |
| 🟠5 | ~~Xmaj3add6~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Bmaj3b5~~ | ♯5 | 3 |
| 🟠5 | ~~Qmin3~~ | ♯5 | 3 |
| 🟠5 | ~~Bmin3~~ | ♯3 | 3 |
| 🟠5 | ~~Qmin3add6~~ | omit5 ♭6 | 3 |
| 🟠5 | ~~Qsus2~~ | ♯2 ♯5 | 3 |
| 🔴6 | ~~Xmaj3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Xaug3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Bdim3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Qmaj3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Qmaj3add6~~ | omit5 ♭3 ♭6 | 6 |

## Q-G-A  `{3,7,9}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Qmaj3b5** | — | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Adom7sus4~~ | omit5 ♯4 | 1 |
| 🟡4 | ~~Gsus2~~ | ♯5 | 1.5 |
| 🟠5 | ~~Qdim3~~ | ♯3 | 3 |
| 🟠5 | ~~Qmaj3~~ | ♭5 | 3 |
| 🟠5 | ~~Qmaj3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Amaj7sus4~~ | omit5 ♭7 ♯4 | 3 |
| 🟠5 | ~~Qsus4~~ | ♭4 ♭5 | 3 |
| 🔴6 | ~~Asus4~~ | omit5 ♯4 ♯6 | 4.5 |
| 🔴6 | ~~Qmin3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Gmin3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Qmin3add11~~ | omit5 ♯3 ♯11 | 6 |

## Q-G-Z  `{3,7,10}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Qmaj3** | — | 0 |

🗑 已过滤 15 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Zsus4~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Zdom7sus4~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Qsus4~~ | ♭4 | 1.5 |
| 🟡4 | ~~Zdom7~~ | omit5 ♭7 ♯3 | 2 |
| 🟠5 | ~~Qaug3~~ | ♭5 | 3 |
| 🟠5 | ~~Gaug3~~ | ♭3 | 3 |
| 🟠5 | ~~Zmaj3add6~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Qmaj3b5~~ | ♯5 | 3 |
| 🟠5 | ~~Qmin3~~ | ♯3 | 3 |
| 🟠5 | ~~Gmin3~~ | ♯5 | 3 |
| 🟠5 | ~~Gsus2~~ | ♯5 ♯2 | 3 |
| 🔴6 | ~~Zmaj3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Zaug3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Qdim3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Gmaj3~~ | ♭3 ♯5 | 6 |

## Q-G-B  `{3,7,11}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Qaug3** | — | 0 |
| ✅1 | **Gaug3** | — | 0 |
| ✅1 | **Baug3** | — | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟠5 | ~~Qmaj3~~ | ♯5 | 3 |
| 🟠5 | ~~Gmaj3~~ | ♯5 | 3 |
| 🟠5 | ~~Bmaj3~~ | ♯5 | 3 |
| 🟠5 | ~~Qmaj3add6~~ | omit5 ♭6 | 3 |
| 🟠5 | ~~Qsus4~~ | ♭4 ♯5 | 3 |
| 🟠5 | ~~Gsus4~~ | ♭4 ♯5 | 3 |
| 🟠5 | ~~Bsus4~~ | ♭4 ♯5 | 3 |
| 🔴6 | ~~Qmin3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Gmin3~~ | ♯5 ♯3 | 6 |
| 🔴6 | ~~Bmin3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Qmin3add6~~ | omit5 ♭6 ♯3 | 6 |

## Q-Y-A  `{3,8,9}`  ✋ verdict(0,1,7) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian五度为唯一解释(硬规则):R+♭2+纯五 pedal 声响,chord 解释全扭曲,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Y·Phrygian五度** | ♭2·5 | 0 |

🗑 已过滤 7 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Amaj7sus4~~ | omit5 ♯4 | 1.5 |
| 🟡4 | ~~Ysus2~~ | ♭2 | 1.5 |
| 🟡4 | ~~Qsus4~~ | ♭5 | 1.5 |
| 🟡4 | ~~Adom7sus4~~ | omit5 ♯4 ♯7 | 2 |
| 🟡4 | ~~Asus4~~ | omit5 ♯4 add7 | 2 |
| 🟠5 | ~~Qmaj3b5~~ | ♯3 | 3 |
| 🔴6 | ~~Qmaj3~~ | ♭5 ♯3 | 6 |

## Q-Y-Z  `{3,8,10}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Ysus2** | — | 0 |
| ✅1 | **Qsus4** | — | 0 |
| 🔵2 | **Zdom7sus4** | omit5 | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Zdom7~~ | omit5 ♯3 | 1 |
| 🟡4 | ~~Zmaj7sus4~~ | omit5 ♭7 | 1.5 |
| 🟠5 | ~~Qmaj3~~ | ♯3 | 3 |
| 🟠5 | ~~Ymin3~~ | ♭3 | 3 |
| 🟠5 | ~~Zsus4~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Qaug3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Ydim3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Zmaj3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Zmaj3add6~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Qmaj3b5~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Zmaj7~~ | omit5 ♭7 ♯3 | 6 |

## Q-Y-B  `{3,8,11}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Ymin3** | — | 0 |
| 🔵2 | **Bmaj3add6** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Bmaj3~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Bdom7~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Ysus2~~ | ♯2 | 1.5 |
| 🟡4 | ~~Qsus4~~ | ♯5 | 1.5 |
| 🟡4 | ~~Bdom7sus4~~ | omit5 ♭4 ♭7 | 2 |
| 🟡4 | ~~Bsus4~~ | omit5 ♭4 add6 | 2 |
| 🟠5 | ~~Qaug3~~ | ♯3 | 3 |
| 🟠5 | ~~Baug3~~ | ♯5 | 3 |
| 🟠5 | ~~Ydim3~~ | ♯5 | 3 |
| 🟠5 | ~~Ymaj3~~ | ♭3 | 3 |
| 🟠5 | ~~Bmin3add6~~ | omit5 ♯3 | 3 |
| 🔴6 | ~~Bmin3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Yaug3~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Qmaj3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Qmaj3add6~~ | omit5 ♭6 ♯3 | 6 |
| 🔴6 | ~~Ymaj3b5~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Bmin7~~ | omit5 ♭7 ♯3 | 6 |

## Q-A-Z  `{3,9,10}`  ✋ verdict(0,1,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Viennese三音(C 根,集合身份)+ maj7sus4(omit5)(P 根,爵士壳)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **A·Viennese特征前三音** | ♭2·♭5 | 0 |
| 🔵2 | **Zmaj7sus4** | omit5 | 0 |

🗑 已过滤 8 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Zsus4~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Zdom7sus4~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Qsus4~~ | ♯4 | 1.5 |
| 🟡4 | ~~Zdom7~~ | omit5 ♯3 ♯7 | 2 |
| 🟠5 | ~~Zmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Asus2~~ | ♭5 ♭2 | 3 |
| 🔴6 | ~~Zmaj3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Asus4~~ | omit5 ♭2 ♯4 | 4.5 |

## Q-A-B  `{3,9,11}`  ✋ verdict(0,2,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):全音叠三全音(二度对低音根)+ dom7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **A·全音叠三全音** | 2·♭5 | 0 |
| 🔵2 | **Bdom7** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Bdom7sus4~~ | omit5 ♭4 | 1 |
| 🟡4 | ~~Asus2~~ | ♭5 | 1.5 |
| 🟡4 | ~~Asus4~~ | omit5 ♯4 add2 | 2 |
| 🟠5 | ~~Adim3~~ | ♭3 | 3 |
| 🟠5 | ~~Bmaj3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Bmaj3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Bmaj7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Bmaj7sus4~~ | omit5 ♭4 ♭7 | 3 |
| 🟠5 | ~~Bmin7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Qsus4~~ | ♯4 ♯5 | 3 |
| 🔴6 | ~~Bsus4~~ | omit5 ♭4 ♯6 | 4.5 |
| 🔴6 | ~~Amin3~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Bmin3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Amin3add11~~ | omit5 ♭3 ♯11 | 6 |
| 🔴6 | ~~Bmin3add6~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Bminmaj7~~ | omit5 ♭7 ♯3 | 6 |

## Q-Z-B  `{3,10,11}`  ✋ verdict(0,1,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian挂留三音(半音对低音根,♭2+纯四)+ maj7(omit5)(半音对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Z·Phrygian挂留前三音** | ♭2·4 | 0 |
| 🔵2 | **Bmaj7** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Bmaj3~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Bdom7~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Bmaj7sus4~~ | omit5 ♭4 | 1.5 |
| 🟡4 | ~~Bdom7sus4~~ | omit5 ♭4 ♯7 | 2 |
| 🟡4 | ~~Zsus2~~ | omit5 ♭2 add4 | 2 |
| 🟡4 | ~~Bsus4~~ | omit5 ♭4 add7 | 2 |
| 🟠5 | ~~Bminmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Zsus4~~ | omit5 ♭2 | 3 |
| 🔴6 | ~~Bmin3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Zmaj3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Zmaj3add9~~ | omit5 ♭9 ♯3 | 6 |
| 🔴6 | ~~Bmin7~~ | omit5 ♯3 ♯7 | 6 |

## E-F-X  `{4,5,6}`  ✋ verdict(0,1,2) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):半音簇为唯一解释(硬规则):maj7sus2(♭2 omit5) 是 cost=1.5 凑数非恒等,改判不保留,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **E·半音簇** | ♭2·2 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Fmaj7sus2~~ | omit5 ♭2 | 1.5 |
| 🟡4 | ~~Fdom7sus2~~ | omit5 ♭2 ♯7 | 2 |
| 🟡4 | ~~Fsus2~~ | omit5 ♭2 add7 | 2 |
| 🔴6 | ~~Emin3~~ | omit5 ♭3 ♭2 | 6 |

## E-F-G  `{4,5,7}`  ✋ verdict(0,1,3) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **E·Phrygian特征前三音** | ♭2·♭3 | 0 |
| 🔵2 | **Fmaj7sus2** | omit5 | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Fsus2~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Fdom7sus2~~ | omit5 ♯7 | 1 |
| 🟠5 | ~~Emin3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Emin3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Fminmaj7~~ | omit5 ♭3 | 3 |
| 🔴6 | ~~Fmin3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Emaj3~~ | omit5 ♭3 ♭2 | 6 |
| 🔴6 | ~~Emaj3add9~~ | omit5 ♭9 ♭3 | 6 |
| 🔴6 | ~~Fmin7~~ | omit5 ♭3 ♯7 | 6 |

## E-F-Y  `{4,5,8}`  ⚙ zero-cost-exclusive ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **E·Hijaz特征前三音** | ♭2·3 | 0 |
| 🔵2 | **Fminmaj7** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Fmin3~~ | omit5 add7 | 0.5 |
| 🟡4 | ~~Fmaj7sus2~~ | omit5 ♯2 | 1.5 |
| 🟡4 | ~~Fdom7~~ | omit5 ♭3 ♯7 | 2 |
| 🟡4 | ~~Fdom7sus2~~ | omit5 ♯7 ♯2 | 2 |
| 🟡4 | ~~Fsus2~~ | omit5 ♯2 add7 | 2 |
| 🟠5 | ~~Emaj3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Emaj3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Fmaj7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Fmin7~~ | omit5 ♯7 | 3 |
| 🔴6 | ~~Fmaj3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Esus4~~ | omit5 ♭4 ♭2 | 4.5 |
| 🔴6 | ~~Emin3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Emin3add9~~ | omit5 ♭9 ♯3 | 6 |

## E-F-A  `{4,5,9}`  ✋ verdict(0,1,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian挂留三音(半音对低音根,♭2+纯四)+ maj7(omit5)(半音对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **E·Phrygian挂留前三音** | ♭2·4 | 0 |
| 🔵2 | **Fmaj7** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Fmaj3~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Fdom7~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Fmaj7sus4~~ | omit5 ♭4 | 1.5 |
| 🟡4 | ~~Fdom7sus4~~ | omit5 ♭4 ♯7 | 2 |
| 🟡4 | ~~Esus2~~ | omit5 ♭2 add4 | 2 |
| 🟡4 | ~~Fsus4~~ | omit5 ♭4 add7 | 2 |
| 🟠5 | ~~Fminmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Esus4~~ | omit5 ♭2 | 3 |
| 🔴6 | ~~Fmin3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Emaj3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Emaj3add9~~ | omit5 ♭9 ♯3 | 6 |
| 🔴6 | ~~Fmin7~~ | omit5 ♯7 ♯3 | 6 |

## E-F-Z  `{4,5,10}`  ✋ verdict(0,1,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Viennese三音(C 根,集合身份)+ maj7sus4(omit5)(P 根,爵士壳)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **E·Viennese特征前三音** | ♭2·♭5 | 0 |
| 🔵2 | **Fmaj7sus4** | omit5 | 0 |

🗑 已过滤 8 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Fsus4~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Fdom7sus4~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Zsus4~~ | ♯4 | 1.5 |
| 🟡4 | ~~Fdom7~~ | omit5 ♯7 ♯3 | 2 |
| 🟠5 | ~~Fmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Esus2~~ | ♭2 ♭5 | 3 |
| 🔴6 | ~~Fmaj3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Esus4~~ | omit5 ♭2 ♯4 | 4.5 |

## E-F-B  `{4,5,11}`  ✋ verdict(0,1,7) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian五度为唯一解释(硬规则):R+♭2+纯五 pedal 声响,chord 解释全扭曲,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **E·Phrygian五度** | ♭2·5 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Esus2~~ | ♭2 | 1.5 |
| 🟡4 | ~~Bsus4~~ | ♭5 | 1.5 |
| 🟠5 | ~~Bmaj3b5~~ | ♯3 | 3 |
| 🔴6 | ~~Bmaj3~~ | ♭5 ♯3 | 6 |

## E-X-A  `{4,6,9}`  ✋ verdict(0,2,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):四度碎片(二度对低音根)+ min7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **E·四度碎片** | 2·4 | 0 |
| 🔵2 | **Xmin7** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Esus2~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Esus4~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Xdom7~~ | omit5 ♭3 | 1 |
| 🟢3 | ~~Xdom7sus2~~ | omit5 ♯2 | 1 |
| 🟠5 | ~~Emaj3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Xmaj7sus2~~ | omit5 ♭7 ♯2 | 3 |
| 🟠5 | ~~Xmin3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Emin3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Xmin3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Xminmaj7~~ | omit5 ♭7 | 3 |
| 🔴6 | ~~Emaj3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Emin3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Xsus2~~ | omit5 ♯2 ♯6 | 4.5 |
| 🔴6 | ~~Edim3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Xmaj3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Xmaj3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Xmaj7~~ | omit5 ♭7 ♭3 | 6 |

## E-X-Z  `{4,6,10}`  ✋ verdict(0,2,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):全音叠三全音(二度对低音根)+ dom7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **E·全音叠三全音** | 2·♭5 | 0 |
| 🔵2 | **Xdom7** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Xdom7sus4~~ | omit5 ♭4 | 1 |
| 🟡4 | ~~Esus2~~ | ♭5 | 1.5 |
| 🟡4 | ~~Esus4~~ | omit5 ♯4 add2 | 2 |
| 🟠5 | ~~Edim3~~ | ♭3 | 3 |
| 🟠5 | ~~Xmaj3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Xmaj3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Xmaj7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Xmaj7sus4~~ | omit5 ♭7 ♭4 | 3 |
| 🟠5 | ~~Xmin7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Zsus4~~ | ♯4 ♯5 | 3 |
| 🔴6 | ~~Xsus4~~ | omit5 ♭4 ♯6 | 4.5 |
| 🔴6 | ~~Emin3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Xmin3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Emin3add11~~ | omit5 ♭3 ♯11 | 6 |
| 🔴6 | ~~Xmin3add6~~ | omit5 ♯6 ♯3 | 6 |
| 🔴6 | ~~Xminmaj7~~ | omit5 ♭7 ♯3 | 6 |

## E-X-B  `{4,6,11}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Esus2** | — | 0 |
| ✅1 | **Bsus4** | — | 0 |
| 🔵2 | **Xdom7sus4** | omit5 | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Xdom7~~ | omit5 ♯3 | 1 |
| 🟡4 | ~~Xmaj7sus4~~ | omit5 ♭7 | 1.5 |
| 🟠5 | ~~Bmaj3~~ | ♯3 | 3 |
| 🟠5 | ~~Emin3~~ | ♭3 | 3 |
| 🟠5 | ~~Xsus4~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Baug3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Edim3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Xmaj3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Xmaj3add6~~ | omit5 ♯6 ♯3 | 6 |
| 🔴6 | ~~Bmaj3b5~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Xmaj7~~ | omit5 ♭7 ♯3 | 6 |

## E-G-Y  `{4,7,8}`  ✋ verdict(0,1,9) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):分叉三和弦为唯一解释(硬规则):大/小三度并存本质不可 tertian 表达,任何 chord 解释都是扭曲,全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **E·分叉三和弦** | ♭3·3 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Gdom7sus2~~ | omit5 ♭7 ♭2 | 2 |
| 🟡4 | ~~Gsus2~~ | omit5 ♭2 add6 | 2 |
| 🟠5 | ~~Emaj3~~ | omit5 ♯2 | 3 |
| 🟠5 | ~~Emaj3add9~~ | omit5 ♯9 | 3 |
| 🟠5 | ~~Emin3add11~~ | omit5 ♭11 | 3 |
| 🔴6 | ~~Esus4~~ | omit5 ♭4 ♯2 | 4.5 |

## E-G-Z  `{4,7,10}`  ✋ verdict(0,3,6) ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

> ✋ 人工裁决(2026-09-05):减三和弦完全命中即唯一解释:dim7 对称性副产品与换根音凑数解释全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Edim3** | — | 0 |

🗑 已过滤 18 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Gmin3add6~~ | omit5 | 0 |
| 🟢3 | ~~Gmin3~~ | omit5 add6 | 0.5 |
| 🟡4 | ~~Gdom7~~ | omit5 ♭7 ♭3 | 2 |
| 🟡4 | ~~Gdom7sus2~~ | omit5 ♭7 ♯2 | 2 |
| 🟡4 | ~~Zdom7sus4~~ | omit5 ♭7 ♯4 | 2 |
| 🟡4 | ~~Gsus2~~ | omit5 ♯2 add6 | 2 |
| 🟡4 | ~~Zsus4~~ | omit5 ♯4 add6 | 2 |
| 🟠5 | ~~Gmaj3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Emaj3b5~~ | ♭3 | 3 |
| 🟠5 | ~~Emin3~~ | ♭5 | 3 |
| 🟠5 | ~~Emin3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Gmin7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Esus2~~ | ♭5 ♯2 | 3 |
| 🔴6 | ~~Gmaj3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Esus4~~ | omit5 ♯4 ♯2 | 4.5 |
| 🔴6 | ~~Gaug3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Emaj3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Emaj3add11~~ | omit5 ♭3 ♯11 | 6 |

## E-G-B  `{4,7,11}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Emin3** | — | 0 |
| 🔵2 | **Gmaj3add6** | omit5 | 0 |

🗑 已过滤 16 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Gmaj3~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Gdom7~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Esus2~~ | ♯2 | 1.5 |
| 🟡4 | ~~Bsus4~~ | ♯5 | 1.5 |
| 🟡4 | ~~Gdom7sus4~~ | omit5 ♭7 ♭4 | 2 |
| 🟡4 | ~~Gsus4~~ | omit5 ♭4 add6 | 2 |
| 🟠5 | ~~Gaug3~~ | ♯5 | 3 |
| 🟠5 | ~~Baug3~~ | ♯3 | 3 |
| 🟠5 | ~~Edim3~~ | ♯5 | 3 |
| 🟠5 | ~~Emaj3~~ | ♭3 | 3 |
| 🟠5 | ~~Gmin3add6~~ | omit5 ♯3 | 3 |
| 🔴6 | ~~Gmin3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Eaug3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Bmaj3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Emaj3b5~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Gmin7~~ | omit5 ♭7 ♯3 | 6 |

## E-Y-Z  `{4,8,10}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Emaj3b5** | — | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Zdom7sus4~~ | omit5 ♯4 | 1 |
| 🟡4 | ~~Ysus2~~ | ♯5 | 1.5 |
| 🟠5 | ~~Edim3~~ | ♯3 | 3 |
| 🟠5 | ~~Emaj3~~ | ♭5 | 3 |
| 🟠5 | ~~Emaj3add11~~ | omit5 ♯11 | 3 |
| 🟠5 | ~~Zmaj7sus4~~ | omit5 ♭7 ♯4 | 3 |
| 🟠5 | ~~Esus4~~ | ♭4 ♭5 | 3 |
| 🔴6 | ~~Zsus4~~ | omit5 ♯4 ♯6 | 4.5 |
| 🔴6 | ~~Emin3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Ymin3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Emin3add11~~ | omit5 ♯3 ♯11 | 6 |

## E-Y-B  `{4,8,11}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Emaj3** | — | 0 |

🗑 已过滤 15 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Bsus4~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Bdom7sus4~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Esus4~~ | ♭4 | 1.5 |
| 🟡4 | ~~Bdom7~~ | omit5 ♭7 ♯3 | 2 |
| 🟠5 | ~~Eaug3~~ | ♭5 | 3 |
| 🟠5 | ~~Yaug3~~ | ♭3 | 3 |
| 🟠5 | ~~Bmaj3add6~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Emaj3b5~~ | ♯5 | 3 |
| 🟠5 | ~~Emin3~~ | ♯3 | 3 |
| 🟠5 | ~~Ymin3~~ | ♯5 | 3 |
| 🟠5 | ~~Ysus2~~ | ♯5 ♯2 | 3 |
| 🔴6 | ~~Bmaj3~~ | omit5 ♯3 add6 | 3.5 |
| 🔴6 | ~~Baug3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Edim3~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Ymaj3~~ | ♭3 ♯5 | 6 |

## E-A-Z  `{4,9,10}`  ✋ verdict(0,1,7) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian五度为唯一解释(硬规则):R+♭2+纯五 pedal 声响,chord 解释全扭曲,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **A·Phrygian五度** | ♭2·5 | 0 |

🗑 已过滤 7 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Zmaj7sus4~~ | omit5 ♯4 | 1.5 |
| 🟡4 | ~~Asus2~~ | ♭2 | 1.5 |
| 🟡4 | ~~Esus4~~ | ♭5 | 1.5 |
| 🟡4 | ~~Zdom7sus4~~ | omit5 ♯4 ♯7 | 2 |
| 🟡4 | ~~Zsus4~~ | omit5 ♯4 add7 | 2 |
| 🟠5 | ~~Emaj3b5~~ | ♯3 | 3 |
| 🔴6 | ~~Emaj3~~ | ♭5 ♯3 | 6 |

## E-A-B  `{4,9,11}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Asus2** | — | 0 |
| ✅1 | **Esus4** | — | 0 |
| 🔵2 | **Bdom7sus4** | omit5 | 0 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Bdom7~~ | omit5 ♯3 | 1 |
| 🟡4 | ~~Bmaj7sus4~~ | omit5 ♭7 | 1.5 |
| 🟠5 | ~~Emaj3~~ | ♯3 | 3 |
| 🟠5 | ~~Amin3~~ | ♭3 | 3 |
| 🟠5 | ~~Bsus4~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Eaug3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Adim3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Bmaj3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Bmaj3add6~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Emaj3b5~~ | ♯3 ♯5 | 6 |
| 🔴6 | ~~Bmaj7~~ | omit5 ♭7 ♯3 | 6 |

## E-Z-B  `{4,10,11}`  ✋ verdict(0,1,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Viennese三音(C 根,集合身份)+ maj7sus4(omit5)(P 根,爵士壳)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Z·Viennese特征前三音** | ♭2·♭5 | 0 |
| 🔵2 | **Bmaj7sus4** | omit5 | 0 |

🗑 已过滤 8 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Bsus4~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Bdom7sus4~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Esus4~~ | ♯4 | 1.5 |
| 🟡4 | ~~Bdom7~~ | omit5 ♯3 ♯7 | 2 |
| 🟠5 | ~~Bmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Zsus2~~ | ♭5 ♭2 | 3 |
| 🔴6 | ~~Bmaj3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Zsus4~~ | omit5 ♭2 ♯4 | 4.5 |

## F-X-G  `{5,6,7}`  ✋ verdict(0,1,2) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):半音簇为唯一解释(硬规则):maj7sus2(♭2 omit5) 是 cost=1.5 凑数非恒等,改判不保留,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **F·半音簇** | ♭2·2 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Xmaj7sus2~~ | omit5 ♭2 | 1.5 |
| 🟡4 | ~~Xdom7sus2~~ | omit5 ♭2 ♯7 | 2 |
| 🟡4 | ~~Xsus2~~ | omit5 ♭2 add7 | 2 |
| 🔴6 | ~~Fmin3~~ | omit5 ♭3 ♭2 | 6 |

## F-X-Y  `{5,6,8}`  ✋ verdict(0,1,3) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **F·Phrygian特征前三音** | ♭2·♭3 | 0 |
| 🔵2 | **Xmaj7sus2** | omit5 | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Xsus2~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Xdom7sus2~~ | omit5 ♯7 | 1 |
| 🟠5 | ~~Fmin3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Fmin3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Xminmaj7~~ | omit5 ♭3 | 3 |
| 🔴6 | ~~Xmin3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Fmaj3~~ | omit5 ♭3 ♭2 | 6 |
| 🔴6 | ~~Fmaj3add9~~ | omit5 ♭9 ♭3 | 6 |
| 🔴6 | ~~Xmin7~~ | omit5 ♭3 ♯7 | 6 |

## F-X-A  `{5,6,9}`  ⚙ zero-cost-exclusive ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **F·Hijaz特征前三音** | ♭2·3 | 0 |
| 🔵2 | **Xminmaj7** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Xmin3~~ | omit5 add7 | 0.5 |
| 🟡4 | ~~Xmaj7sus2~~ | omit5 ♯2 | 1.5 |
| 🟡4 | ~~Xdom7~~ | omit5 ♭3 ♯7 | 2 |
| 🟡4 | ~~Xdom7sus2~~ | omit5 ♯7 ♯2 | 2 |
| 🟡4 | ~~Xsus2~~ | omit5 ♯2 add7 | 2 |
| 🟠5 | ~~Fmaj3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Fmaj3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Xmaj7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Xmin7~~ | omit5 ♯7 | 3 |
| 🔴6 | ~~Xmaj3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Fsus4~~ | omit5 ♭4 ♭2 | 4.5 |
| 🔴6 | ~~Fmin3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Fmin3add9~~ | omit5 ♭9 ♯3 | 6 |

## F-X-Z  `{5,6,10}`  ✋ verdict(0,1,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian挂留三音(半音对低音根,♭2+纯四)+ maj7(omit5)(半音对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **F·Phrygian挂留前三音** | ♭2·4 | 0 |
| 🔵2 | **Xmaj7** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Xmaj3~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Xdom7~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Xmaj7sus4~~ | omit5 ♭4 | 1.5 |
| 🟡4 | ~~Xdom7sus4~~ | omit5 ♭4 ♯7 | 2 |
| 🟡4 | ~~Fsus2~~ | omit5 ♭2 add4 | 2 |
| 🟡4 | ~~Xsus4~~ | omit5 ♭4 add7 | 2 |
| 🟠5 | ~~Xminmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Fsus4~~ | omit5 ♭2 | 3 |
| 🔴6 | ~~Xmin3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Fmaj3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Fmaj3add9~~ | omit5 ♭9 ♯3 | 6 |
| 🔴6 | ~~Xmin7~~ | omit5 ♯7 ♯3 | 6 |

## F-X-B  `{5,6,11}`  ✋ verdict(0,1,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Viennese三音(C 根,集合身份)+ maj7sus4(omit5)(P 根,爵士壳)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **F·Viennese特征前三音** | ♭2·♭5 | 0 |
| 🔵2 | **Xmaj7sus4** | omit5 | 0 |

🗑 已过滤 7 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Xsus4~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Xdom7sus4~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Bsus4~~ | ♯4 | 1.5 |
| 🟡4 | ~~Xdom7~~ | omit5 ♯7 ♯3 | 2 |
| 🟠5 | ~~Xmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Fsus2~~ | ♭2 ♭5 | 3 |
| 🔴6 | ~~Xmaj3~~ | omit5 ♯3 add7 | 3.5 |

## F-G-Z  `{5,7,10}`  ✋ verdict(0,2,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):四度碎片(二度对低音根)+ min7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **F·四度碎片** | 2·4 | 0 |
| 🔵2 | **Gmin7** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Fsus2~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Fsus4~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Gdom7~~ | omit5 ♭3 | 1 |
| 🟢3 | ~~Gdom7sus2~~ | omit5 ♯2 | 1 |
| 🟠5 | ~~Fmaj3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Gmaj7sus2~~ | omit5 ♭7 ♯2 | 3 |
| 🟠5 | ~~Gmin3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Fmin3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Gmin3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Gminmaj7~~ | omit5 ♭7 | 3 |
| 🔴6 | ~~Fmaj3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Fmin3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Gsus2~~ | omit5 ♯2 ♯6 | 4.5 |
| 🔴6 | ~~Fdim3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Gmaj3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Gmaj3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Gmaj7~~ | omit5 ♭7 ♭3 | 6 |

## F-G-B  `{5,7,11}`  ✋ verdict(0,2,6) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):全音叠三全音(二度对低音根)+ dom7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **F·全音叠三全音** | 2·♭5 | 0 |
| 🔵2 | **Gdom7** | omit5 | 0 |

🗑 已过滤 14 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Gdom7sus4~~ | omit5 ♭4 | 1 |
| 🟡4 | ~~Fsus2~~ | ♭5 | 1.5 |
| 🟠5 | ~~Fdim3~~ | ♭3 | 3 |
| 🟠5 | ~~Gmaj3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Gmaj3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Gmaj7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Gmaj7sus4~~ | omit5 ♭7 ♭4 | 3 |
| 🟠5 | ~~Gmin7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Bsus4~~ | ♯4 ♯5 | 3 |
| 🔴6 | ~~Gsus4~~ | omit5 ♭4 ♯6 | 4.5 |
| 🔴6 | ~~Fmin3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Gmin3~~ | omit5 ♯3 ♯6 | 6 |
| 🔴6 | ~~Gmin3add6~~ | omit5 ♯6 ♯3 | 6 |
| 🔴6 | ~~Gminmaj7~~ | omit5 ♭7 ♯3 | 6 |

## F-Y-A  `{5,8,9}`  ✋ verdict(0,1,9) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):分叉三和弦为唯一解释(硬规则):大/小三度并存本质不可 tertian 表达,任何 chord 解释都是扭曲,全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **F·分叉三和弦** | ♭3·3 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Ydom7sus2~~ | omit5 ♭7 ♭2 | 2 |
| 🟡4 | ~~Ysus2~~ | omit5 ♭2 add6 | 2 |
| 🟠5 | ~~Fmaj3~~ | omit5 ♯2 | 3 |
| 🟠5 | ~~Fmaj3add9~~ | omit5 ♯9 | 3 |
| 🟠5 | ~~Fmin3add11~~ | omit5 ♭11 | 3 |
| 🔴6 | ~~Fsus4~~ | omit5 ♭4 ♯2 | 4.5 |

## F-Y-B  `{5,8,11}`  ✋ verdict(0,3,6) ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

> ✋ 人工裁决(2026-09-05):减三和弦完全命中即唯一解释:dim7 对称性副产品与换根音凑数解释全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Fdim3** | — | 0 |

🗑 已过滤 15 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Ymin3add6~~ | omit5 | 0 |
| 🟢3 | ~~Ymin3~~ | omit5 add6 | 0.5 |
| 🟡4 | ~~Ydom7~~ | omit5 ♭7 ♭3 | 2 |
| 🟡4 | ~~Ydom7sus2~~ | omit5 ♭7 ♯2 | 2 |
| 🟡4 | ~~Bdom7sus4~~ | omit5 ♭7 ♯4 | 2 |
| 🟡4 | ~~Ysus2~~ | omit5 ♯2 add6 | 2 |
| 🟡4 | ~~Bsus4~~ | omit5 ♯4 add6 | 2 |
| 🟠5 | ~~Ymaj3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Fmaj3b5~~ | ♭3 | 3 |
| 🟠5 | ~~Fmin3~~ | ♭5 | 3 |
| 🟠5 | ~~Ymin7~~ | omit5 ♭7 | 3 |
| 🟠5 | ~~Fsus2~~ | ♭5 ♯2 | 3 |
| 🔴6 | ~~Ymaj3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Yaug3~~ | ♭3 ♯5 | 6 |
| 🔴6 | ~~Fmaj3~~ | ♭3 ♭5 | 6 |

## F-A-B  `{5,9,11}`  ⚙ zero-cost-exclusive ⚙ same-root-exact-preferred

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Fmaj3b5** | — | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Bdom7sus4~~ | omit5 ♯4 | 1 |
| 🟡4 | ~~Asus2~~ | ♯5 | 1.5 |
| 🟠5 | ~~Fdim3~~ | ♯3 | 3 |
| 🟠5 | ~~Fmaj3~~ | ♭5 | 3 |
| 🟠5 | ~~Bmaj7sus4~~ | omit5 ♭7 ♯4 | 3 |
| 🟠5 | ~~Fsus4~~ | ♭4 ♭5 | 3 |
| 🔴6 | ~~Bsus4~~ | omit5 ♯4 ♯6 | 4.5 |
| 🔴6 | ~~Fmin3~~ | ♭5 ♯3 | 6 |
| 🔴6 | ~~Amin3~~ | ♭3 ♯5 | 6 |

## F-Z-B  `{5,10,11}`  ✋ verdict(0,1,7) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian五度为唯一解释(硬规则):R+♭2+纯五 pedal 声响,chord 解释全扭曲,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Z·Phrygian五度** | ♭2·5 | 0 |

🗑 已过滤 7 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Bmaj7sus4~~ | omit5 ♯4 | 1.5 |
| 🟡4 | ~~Zsus2~~ | ♭2 | 1.5 |
| 🟡4 | ~~Fsus4~~ | ♭5 | 1.5 |
| 🟡4 | ~~Bdom7sus4~~ | omit5 ♯4 ♯7 | 2 |
| 🟡4 | ~~Bsus4~~ | omit5 ♯4 add7 | 2 |
| 🟠5 | ~~Fmaj3b5~~ | ♯3 | 3 |
| 🔴6 | ~~Fmaj3~~ | ♭5 ♯3 | 6 |

## X-G-Y  `{6,7,8}`  ✋ verdict(0,1,2) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):半音簇为唯一解释(硬规则):maj7sus2(♭2 omit5) 是 cost=1.5 凑数非恒等,改判不保留,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **X·半音簇** | ♭2·2 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Gmaj7sus2~~ | omit5 ♭2 | 1.5 |
| 🟡4 | ~~Gdom7sus2~~ | omit5 ♭2 ♯7 | 2 |
| 🟡4 | ~~Gsus2~~ | omit5 ♭2 add7 | 2 |
| 🔴6 | ~~Xmin3~~ | omit5 ♭3 ♭2 | 6 |

## X-G-A  `{6,7,9}`  ✋ verdict(0,1,3) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **X·Phrygian特征前三音** | ♭2·♭3 | 0 |
| 🔵2 | **Gmaj7sus2** | omit5 | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Gsus2~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Gdom7sus2~~ | omit5 ♯7 | 1 |
| 🟠5 | ~~Xmin3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Xmin3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Gminmaj7~~ | omit5 ♭3 | 3 |
| 🔴6 | ~~Gmin3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Xmaj3~~ | omit5 ♭3 ♭2 | 6 |
| 🔴6 | ~~Xmaj3add9~~ | omit5 ♭9 ♭3 | 6 |
| 🔴6 | ~~Gmin7~~ | omit5 ♭3 ♯7 | 6 |

## X-G-Z  `{6,7,10}`  ⚙ zero-cost-exclusive ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **X·Hijaz特征前三音** | ♭2·3 | 0 |
| 🔵2 | **Gminmaj7** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Gmin3~~ | omit5 add7 | 0.5 |
| 🟡4 | ~~Gmaj7sus2~~ | omit5 ♯2 | 1.5 |
| 🟡4 | ~~Gdom7~~ | omit5 ♭3 ♯7 | 2 |
| 🟡4 | ~~Gdom7sus2~~ | omit5 ♯7 ♯2 | 2 |
| 🟡4 | ~~Gsus2~~ | omit5 ♯2 add7 | 2 |
| 🟠5 | ~~Xmaj3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Xmaj3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Gmaj7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Gmin7~~ | omit5 ♯7 | 3 |
| 🔴6 | ~~Gmaj3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Xsus4~~ | omit5 ♭4 ♭2 | 4.5 |
| 🔴6 | ~~Xmin3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Xmin3add9~~ | omit5 ♭9 ♯3 | 6 |

## X-G-B  `{6,7,11}`  ✋ verdict(0,1,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):Phrygian挂留三音(半音对低音根,♭2+纯四)+ maj7(omit5)(半音对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **X·Phrygian挂留前三音** | ♭2·4 | 0 |
| 🔵2 | **Gmaj7** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Gmaj3~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Gdom7~~ | omit5 ♯7 | 1 |
| 🟡4 | ~~Gmaj7sus4~~ | omit5 ♭4 | 1.5 |
| 🟡4 | ~~Gdom7sus4~~ | omit5 ♭4 ♯7 | 2 |
| 🟡4 | ~~Xsus2~~ | omit5 ♭2 add4 | 2 |
| 🟡4 | ~~Gsus4~~ | omit5 ♭4 add7 | 2 |
| 🟠5 | ~~Gminmaj7~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Xsus4~~ | omit5 ♭2 | 3 |
| 🔴6 | ~~Gmin3~~ | omit5 ♯3 add7 | 3.5 |
| 🔴6 | ~~Xmaj3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Xmaj3add9~~ | omit5 ♭9 ♯3 | 6 |
| 🔴6 | ~~Gmin7~~ | omit5 ♯7 ♯3 | 6 |

## X-Y-B  `{6,8,11}`  ✋ verdict(0,2,5) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):四度碎片(二度对低音根)+ min7(omit5)(二度对高音根)双保留

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **X·四度碎片** | 2·4 | 0 |
| 🔵2 | **Ymin7** | omit5 | 0 |

🗑 已过滤 17 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Xsus2~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Xsus4~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Ydom7~~ | omit5 ♭3 | 1 |
| 🟢3 | ~~Ydom7sus2~~ | omit5 ♯2 | 1 |
| 🟠5 | ~~Xmaj3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Ymaj7sus2~~ | omit5 ♭7 ♯2 | 3 |
| 🟠5 | ~~Ymin3~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Xmin3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Ymin3add6~~ | omit5 ♯6 | 3 |
| 🟠5 | ~~Yminmaj7~~ | omit5 ♭7 | 3 |
| 🔴6 | ~~Xmaj3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Xmin3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Ysus2~~ | omit5 ♯2 ♯6 | 4.5 |
| 🔴6 | ~~Xdim3~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Ymaj3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Ymaj3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Ymaj7~~ | omit5 ♭7 ♭3 | 6 |

## X-A-Z  `{6,9,10}`  ✋ verdict(0,1,9) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):分叉三和弦为唯一解释(硬规则):大/小三度并存本质不可 tertian 表达,任何 chord 解释都是扭曲,全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **X·分叉三和弦** | ♭3·3 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Adom7sus2~~ | omit5 ♭7 ♭2 | 2 |
| 🟡4 | ~~Asus2~~ | omit5 ♭2 add6 | 2 |
| 🟠5 | ~~Xmaj3~~ | omit5 ♯2 | 3 |
| 🟠5 | ~~Xmaj3add9~~ | omit5 ♯9 | 3 |
| 🟠5 | ~~Xmin3add11~~ | omit5 ♭11 | 3 |
| 🔴6 | ~~Xsus4~~ | omit5 ♭4 ♯2 | 4.5 |

## G-Y-A  `{7,8,9}`  ✋ verdict(0,1,2) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):半音簇为唯一解释(硬规则):maj7sus2(♭2 omit5) 是 cost=1.5 凑数非恒等,改判不保留,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **G·半音簇** | ♭2·2 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Ymaj7sus2~~ | omit5 ♭2 | 1.5 |
| 🟡4 | ~~Ydom7sus2~~ | omit5 ♭2 ♯7 | 2 |
| 🟡4 | ~~Ysus2~~ | omit5 ♭2 add7 | 2 |
| 🔴6 | ~~Gmin3~~ | omit5 ♭3 ♭2 | 6 |

## G-Y-Z  `{7,8,10}`  ✋ verdict(0,1,3) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **G·Phrygian特征前三音** | ♭2·♭3 | 0 |
| 🔵2 | **Ymaj7sus2** | omit5 | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ysus2~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Ydom7sus2~~ | omit5 ♯7 | 1 |
| 🟠5 | ~~Gmin3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Gmin3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Yminmaj7~~ | omit5 ♭3 | 3 |
| 🔴6 | ~~Ymin3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Gmaj3~~ | omit5 ♭3 ♭2 | 6 |
| 🔴6 | ~~Gmaj3add9~~ | omit5 ♭9 ♭3 | 6 |
| 🔴6 | ~~Ymin7~~ | omit5 ♭3 ♯7 | 6 |

## G-Y-B  `{7,8,11}`  ⚙ zero-cost-exclusive ⚙ set-exclusive

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **G·Hijaz特征前三音** | ♭2·3 | 0 |
| 🔵2 | **Yminmaj7** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ymin3~~ | omit5 add7 | 0.5 |
| 🟡4 | ~~Ymaj7sus2~~ | omit5 ♯2 | 1.5 |
| 🟡4 | ~~Ydom7~~ | omit5 ♭3 ♯7 | 2 |
| 🟡4 | ~~Ydom7sus2~~ | omit5 ♯7 ♯2 | 2 |
| 🟡4 | ~~Ysus2~~ | omit5 ♯2 add7 | 2 |
| 🟠5 | ~~Gmaj3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Gmaj3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Ymaj7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Ymin7~~ | omit5 ♯7 | 3 |
| 🔴6 | ~~Ymaj3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Gsus4~~ | omit5 ♭4 ♭2 | 4.5 |
| 🔴6 | ~~Gmin3~~ | omit5 ♭2 ♯3 | 6 |
| 🔴6 | ~~Gmin3add9~~ | omit5 ♭9 ♯3 | 6 |

## G-Z-B  `{7,10,11}`  ✋ verdict(0,1,9) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):分叉三和弦为唯一解释(硬规则):大/小三度并存本质不可 tertian 表达,任何 chord 解释都是扭曲,全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **G·分叉三和弦** | ♭3·3 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Zdom7sus2~~ | omit5 ♭7 ♭2 | 2 |
| 🟡4 | ~~Zsus2~~ | omit5 ♭2 add6 | 2 |
| 🟠5 | ~~Gmaj3~~ | omit5 ♯2 | 3 |
| 🟠5 | ~~Gmaj3add9~~ | omit5 ♯9 | 3 |
| 🟠5 | ~~Gmin3add11~~ | omit5 ♭11 | 3 |
| 🔴6 | ~~Gsus4~~ | omit5 ♭4 ♯2 | 4.5 |

## Y-A-Z  `{8,9,10}`  ✋ verdict(0,1,2) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):半音簇为唯一解释(硬规则):maj7sus2(♭2 omit5) 是 cost=1.5 凑数非恒等,改判不保留,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Y·半音簇** | ♭2·2 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Amaj7sus2~~ | omit5 ♭2 | 1.5 |
| 🟡4 | ~~Adom7sus2~~ | omit5 ♭2 ♯7 | 2 |
| 🟡4 | ~~Asus2~~ | omit5 ♭2 add7 | 2 |
| 🔴6 | ~~Ymin3~~ | omit5 ♭3 ♭2 | 6 |

## Y-A-B  `{8,9,11}`  ✋ verdict(0,1,3) ⚙ zero-cost-exclusive ⚙ set-exclusive

> ✋ 人工裁决(2026-09-04):Phrygian 三音为主解释(弗拉门戈/安达卢西亚终止核心音响);maj7sus2(omit5) 为数学恒等(cost=0),保留供记谱参考

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **Y·Phrygian特征前三音** | ♭2·♭3 | 0 |
| 🔵2 | **Amaj7sus2** | omit5 | 0 |

🗑 已过滤 9 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Asus2~~ | omit5 add7 | 0.5 |
| 🟢3 | ~~Adom7sus2~~ | omit5 ♯7 | 1 |
| 🟠5 | ~~Ymin3~~ | omit5 ♭2 | 3 |
| 🟠5 | ~~Ymin3add9~~ | omit5 ♭9 | 3 |
| 🟠5 | ~~Aminmaj7~~ | omit5 ♭3 | 3 |
| 🔴6 | ~~Amin3~~ | omit5 ♭3 add7 | 3.5 |
| 🔴6 | ~~Ymaj3~~ | omit5 ♭3 ♭2 | 6 |
| 🔴6 | ~~Ymaj3add9~~ | omit5 ♭9 ♭3 | 6 |
| 🔴6 | ~~Amin7~~ | omit5 ♭3 ♯7 | 6 |

## A-Z-B  `{9,10,11}`  ✋ verdict(0,1,2) ⚙ set-exclusive

> ✋ 人工裁决(2026-09-05):半音簇为唯一解释(硬规则):maj7sus2(♭2 omit5) 是 cost=1.5 凑数非恒等,改判不保留,纯 set

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| ✅1 | **A·半音簇** | ♭2·2 | 0 |

🗑 已过滤 4 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟡4 | ~~Zmaj7sus2~~ | omit5 ♭2 | 1.5 |
| 🟡4 | ~~Zdom7sus2~~ | omit5 ♭2 ♯7 | 2 |
| 🟡4 | ~~Zsus2~~ | omit5 ♭2 add7 | 2 |
| 🔴6 | ~~Amin3~~ | omit5 ♭3 ♭2 | 6 |

# 🔵 Tier 2 — 预期省略(纯 omit5/omit11)

## C-P-Y  `{0,1,8}`  ✋ verdict(0,1,8) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):maj3add11(omit5) 为唯一解释(硬规则):大三+纯四壳,与正形半边 maj7 壳对称,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ymaj3add11** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ymaj3~~ | omit5 add4 | 0.5 |
| 🟠5 | ~~Ymaj3b5~~ | ♭5 | 3 |
| 🟠5 | ~~Ymin3add11~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Csus2~~ | ♭2 ♯5 | 3 |
| 🔴6 | ~~Ymin3~~ | omit5 ♯3 add4 | 3.5 |
| 🔴6 | ~~Ydim3~~ | ♭5 ♯3 | 6 |

## C-P-Z  `{0,1,10}`  ✋ verdict(0,1,10) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add9(omit5) 为唯一解释(硬规则):小三+九壳(Phrygian 倒影紧凑),挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zmin3add9** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Zmin3~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Cdom7sus2~~ | omit5 ♭2 | 1 |
| 🟠5 | ~~Zmaj3add9~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Cmaj7sus2~~ | omit5 ♭2 ♭7 | 3 |
| 🔴6 | ~~Zmaj3~~ | omit5 ♭3 add2 | 3.5 |
| 🔴6 | ~~Csus2~~ | omit5 ♭2 ♯6 | 4.5 |

## C-D-Q  `{0,2,3}`  ✋ verdict(0,1,10) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add9(omit5) 为唯一解释(硬规则):小三+九壳(Phrygian 倒影紧凑),挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Cmin3add9** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Cmin3~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Ddom7sus2~~ | omit5 ♭2 | 1 |
| 🟠5 | ~~Cmaj3add9~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Dmaj7sus2~~ | omit5 ♭7 ♭2 | 3 |
| 🔴6 | ~~Cmaj3~~ | omit5 ♭3 add2 | 3.5 |
| 🔴6 | ~~Dsus2~~ | omit5 ♭2 ♯6 | 4.5 |

## C-D-E  `{0,2,4}`  ✋ verdict(0,2,4) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):双根音双保留:C 根 maj3(omit5 add2)(add2 记法诚实于三音语境)+ D 根 dom7sus2(omit5);add9 记法与挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ddom7sus2** | omit5 | 0 |
| 🟢3 | **Cmaj3** | omit5 add2 | 0.5 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Cmaj3add9~~ | omit5 | 0 |
| 🟡4 | ~~Dmaj7sus2~~ | omit5 ♭7 | 1.5 |
| 🟡4 | ~~Csus4~~ | omit5 ♭4 add2 | 2 |
| 🟠5 | ~~Cmin3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Dmin7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Dsus2~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Dmin3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Cmin3add11~~ | omit5 ♭3 ♭11 | 6 |
| 🔴6 | ~~Dmin3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Dminmaj7~~ | omit5 ♭7 ♭3 | 6 |

## C-D-A  `{0,2,9}`  ✋ verdict(0,2,9) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add11(omit5) 为唯一解释(硬规则):小三+纯四五声碎片,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Amin3add11** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Amin3~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Csus2~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Cdom7sus2~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Asus2~~ | omit5 ♯2 add4 | 2 |
| 🟠5 | ~~Adim3~~ | ♭5 | 3 |
| 🟠5 | ~~Amaj3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Cmin3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Asus4~~ | omit5 ♯2 | 3 |
| 🔴6 | ~~Amaj3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Cmin3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Amaj3b5~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Cmin7~~ | omit5 ♭3 ♭7 | 6 |

## C-D-Z  `{0,2,10}`  ✋ verdict(0,2,4) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):双根音双保留:C 根 maj3(omit5 add2)(add2 记法诚实于三音语境)+ D 根 dom7sus2(omit5);add9 记法与挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Cdom7sus2** | omit5 | 0 |
| 🟢3 | **Zmaj3** | omit5 add2 | 0.5 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Zmaj3add9~~ | omit5 | 0 |
| 🟡4 | ~~Cmaj7sus2~~ | omit5 ♭7 | 1.5 |
| 🟡4 | ~~Zsus4~~ | omit5 ♭4 add2 | 2 |
| 🟠5 | ~~Zmin3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Cmin7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Csus2~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Cmin3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Zmin3add11~~ | omit5 ♭3 ♭11 | 6 |
| 🔴6 | ~~Cmin3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Cminmaj7~~ | omit5 ♭3 ♭7 | 6 |

## C-Q-F  `{0,3,5}`  ✋ verdict(0,2,9) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add11(omit5) 为唯一解释(硬规则):小三+纯四五声碎片,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Cmin3add11** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Cmin3~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Qsus2~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Qdom7sus2~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Csus2~~ | omit5 ♯2 add4 | 2 |
| 🟠5 | ~~Cdim3~~ | ♭5 | 3 |
| 🟠5 | ~~Cmaj3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Qmin3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Csus4~~ | omit5 ♯2 | 3 |
| 🔴6 | ~~Cmaj3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Qmin3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Cmaj3add9~~ | omit5 ♯9 ♯3 | 6 |
| 🔴6 | ~~Cmaj3b5~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Qmin7~~ | omit5 ♭7 ♭3 | 6 |

## C-E-F  `{0,4,5}`  ✋ verdict(0,1,8) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):maj3add11(omit5) 为唯一解释(硬规则):大三+纯四壳,与正形半边 maj7 壳对称,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Cmaj3add11** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Cmaj3~~ | omit5 add4 | 0.5 |
| 🟠5 | ~~Cmaj3b5~~ | ♭5 | 3 |
| 🟠5 | ~~Cmin3add11~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Esus2~~ | ♭2 ♯5 | 3 |
| 🔴6 | ~~Cmin3~~ | omit5 ♯3 add4 | 3.5 |
| 🔴6 | ~~Cdim3~~ | ♭5 ♯3 | 6 |

## C-G-Z  `{0,7,10}`  ✋ verdict(0,2,9) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add11(omit5) 为唯一解释(硬规则):小三+纯四五声碎片,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gmin3add11** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Gmin3~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Zsus2~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Zdom7sus2~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Gsus2~~ | omit5 ♯2 add4 | 2 |
| 🟠5 | ~~Gdim3~~ | ♭5 | 3 |
| 🟠5 | ~~Gmaj3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Zmin3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Gsus4~~ | omit5 ♯2 | 3 |
| 🔴6 | ~~Zmin3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Gmaj3~~ | omit5 ♯3 ♯2 | 6 |
| 🔴6 | ~~Gmaj3add9~~ | omit5 ♯3 ♯9 | 6 |
| 🔴6 | ~~Gmaj3b5~~ | ♭5 ♭3 | 6 |
| 🔴6 | ~~Zmin7~~ | omit5 ♭3 ♭7 | 6 |

## C-G-B  `{0,7,11}`  ✋ verdict(0,1,8) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):maj3add11(omit5) 为唯一解释(硬规则):大三+纯四壳,与正形半边 maj7 壳对称,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gmaj3add11** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Gmaj3~~ | omit5 add4 | 0.5 |
| 🟠5 | ~~Gmaj3b5~~ | ♭5 | 3 |
| 🟠5 | ~~Gmin3add11~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Bsus2~~ | ♭2 ♯5 | 3 |
| 🔴6 | ~~Gmin3~~ | omit5 ♯3 add4 | 3.5 |
| 🔴6 | ~~Gdim3~~ | ♭5 ♯3 | 6 |

## C-Y-Z  `{0,8,10}`  ✋ verdict(0,2,4) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):双根音双保留:C 根 maj3(omit5 add2)(add2 记法诚实于三音语境)+ D 根 dom7sus2(omit5);add9 记法与挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zdom7sus2** | omit5 | 0 |
| 🟢3 | **Ymaj3** | omit5 add2 | 0.5 |

🗑 已过滤 11 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Ymaj3add9~~ | omit5 | 0 |
| 🟡4 | ~~Zmaj7sus2~~ | omit5 ♭7 | 1.5 |
| 🟡4 | ~~Ysus4~~ | omit5 ♭4 add2 | 2 |
| 🟠5 | ~~Ymin3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Zmin7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Zsus2~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Ymin3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Zmin3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Ymin3add11~~ | omit5 ♭11 ♭3 | 6 |
| 🔴6 | ~~Zmin3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Zminmaj7~~ | omit5 ♭3 ♭7 | 6 |

## C-A-B  `{0,9,11}`  ✋ verdict(0,1,10) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add9(omit5) 为唯一解释(硬规则):小三+九壳(Phrygian 倒影紧凑),挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Amin3add9** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Amin3~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Bdom7sus2~~ | omit5 ♭2 | 1 |
| 🟠5 | ~~Amaj3add9~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Bmaj7sus2~~ | omit5 ♭2 ♭7 | 3 |
| 🔴6 | ~~Amaj3~~ | omit5 ♭3 add2 | 3.5 |
| 🔴6 | ~~Bsus2~~ | omit5 ♭2 ♯6 | 4.5 |

## P-D-A  `{1,2,9}`  ✋ verdict(0,1,8) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):maj3add11(omit5) 为唯一解释(硬规则):大三+纯四壳,与正形半边 maj7 壳对称,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Amaj3add11** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Amaj3~~ | omit5 add4 | 0.5 |
| 🟠5 | ~~Amaj3b5~~ | ♭5 | 3 |
| 🟠5 | ~~Amin3add11~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Psus2~~ | ♭2 ♯5 | 3 |
| 🔴6 | ~~Amin3~~ | omit5 ♯3 add4 | 3.5 |
| 🔴6 | ~~Adim3~~ | ♭5 ♯3 | 6 |

## P-D-B  `{1,2,11}`  ✋ verdict(0,1,10) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add9(omit5) 为唯一解释(硬规则):小三+九壳(Phrygian 倒影紧凑),挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bmin3add9** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Bmin3~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Pdom7sus2~~ | omit5 ♭2 | 1 |
| 🟠5 | ~~Bmaj3add9~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Pmaj7sus2~~ | omit5 ♭2 ♭7 | 3 |
| 🔴6 | ~~Bmaj3~~ | omit5 ♭3 add2 | 3.5 |
| 🔴6 | ~~Psus2~~ | omit5 ♭2 ♯6 | 4.5 |

## P-Q-E  `{1,3,4}`  ✋ verdict(0,1,10) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add9(omit5) 为唯一解释(硬规则):小三+九壳(Phrygian 倒影紧凑),挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Pmin3add9** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Pmin3~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Qdom7sus2~~ | omit5 ♭2 | 1 |
| 🟠5 | ~~Pmaj3add9~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Qmaj7sus2~~ | omit5 ♭7 ♭2 | 3 |
| 🔴6 | ~~Pmaj3~~ | omit5 ♭3 add2 | 3.5 |
| 🔴6 | ~~Qsus2~~ | omit5 ♭2 ♯6 | 4.5 |

## P-Q-F  `{1,3,5}`  ✋ verdict(0,2,4) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):双根音双保留:C 根 maj3(omit5 add2)(add2 记法诚实于三音语境)+ D 根 dom7sus2(omit5);add9 记法与挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qdom7sus2** | omit5 | 0 |
| 🟢3 | **Pmaj3** | omit5 add2 | 0.5 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Pmaj3add9~~ | omit5 | 0 |
| 🟡4 | ~~Qmaj7sus2~~ | omit5 ♭7 | 1.5 |
| 🟡4 | ~~Psus4~~ | omit5 ♭4 add2 | 2 |
| 🟠5 | ~~Pmin3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Qmin7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Qsus2~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Qmin3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Pmin3add11~~ | omit5 ♭3 ♭11 | 6 |
| 🔴6 | ~~Qmin3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Qminmaj7~~ | omit5 ♭7 ♭3 | 6 |

## P-Q-Z  `{1,3,10}`  ✋ verdict(0,2,9) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add11(omit5) 为唯一解释(硬规则):小三+纯四五声碎片,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zmin3add11** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Zmin3~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Psus2~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Pdom7sus2~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Zsus2~~ | omit5 ♯2 add4 | 2 |
| 🟠5 | ~~Zdim3~~ | ♭5 | 3 |
| 🟠5 | ~~Zmaj3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Pmin3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Zsus4~~ | omit5 ♯2 | 3 |
| 🔴6 | ~~Zmaj3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Pmin3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Zmaj3add9~~ | omit5 ♯9 ♯3 | 6 |
| 🔴6 | ~~Zmaj3b5~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Pmin7~~ | omit5 ♭3 ♭7 | 6 |

## P-Q-B  `{1,3,11}`  ✋ verdict(0,2,4) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):双根音双保留:C 根 maj3(omit5 add2)(add2 记法诚实于三音语境)+ D 根 dom7sus2(omit5);add9 记法与挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Pdom7sus2** | omit5 | 0 |
| 🟢3 | **Bmaj3** | omit5 add2 | 0.5 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Bmaj3add9~~ | omit5 | 0 |
| 🟡4 | ~~Pmaj7sus2~~ | omit5 ♭7 | 1.5 |
| 🟡4 | ~~Bsus4~~ | omit5 ♭4 add2 | 2 |
| 🟠5 | ~~Bmin3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Pmin7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Psus2~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Pmin3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Bmin3add11~~ | omit5 ♭3 ♭11 | 6 |
| 🔴6 | ~~Pmin3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Pminmaj7~~ | omit5 ♭3 ♭7 | 6 |

## P-E-X  `{1,4,6}`  ✋ verdict(0,2,9) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add11(omit5) 为唯一解释(硬规则):小三+纯四五声碎片,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Pmin3add11** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Pmin3~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Esus2~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Edom7sus2~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Psus2~~ | omit5 ♯2 add4 | 2 |
| 🟠5 | ~~Pdim3~~ | ♭5 | 3 |
| 🟠5 | ~~Pmaj3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Emin3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Psus4~~ | omit5 ♯2 | 3 |
| 🔴6 | ~~Pmaj3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Emin3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Pmaj3add9~~ | omit5 ♯9 ♯3 | 6 |
| 🔴6 | ~~Pmaj3b5~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Emin7~~ | omit5 ♭7 ♭3 | 6 |

## P-F-X  `{1,5,6}`  ✋ verdict(0,1,8) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):maj3add11(omit5) 为唯一解释(硬规则):大三+纯四壳,与正形半边 maj7 壳对称,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Pmaj3add11** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Pmaj3~~ | omit5 add4 | 0.5 |
| 🟠5 | ~~Pmaj3b5~~ | ♭5 | 3 |
| 🟠5 | ~~Pmin3add11~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Fsus2~~ | ♭2 ♯5 | 3 |
| 🔴6 | ~~Pmin3~~ | omit5 ♯3 add4 | 3.5 |
| 🔴6 | ~~Pdim3~~ | ♭5 ♯3 | 6 |

## P-Y-B  `{1,8,11}`  ✋ verdict(0,2,9) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add11(omit5) 为唯一解释(硬规则):小三+纯四五声碎片,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ymin3add11** | omit5 | 0 |

🗑 已过滤 12 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ymin3~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Bsus2~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Bdom7sus2~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Ysus2~~ | omit5 ♯2 add4 | 2 |
| 🟠5 | ~~Ydim3~~ | ♭5 | 3 |
| 🟠5 | ~~Ymaj3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Bmin3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Ysus4~~ | omit5 ♯2 | 3 |
| 🔴6 | ~~Bmin3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Ymaj3~~ | omit5 ♯3 ♯2 | 6 |
| 🔴6 | ~~Ymaj3add9~~ | omit5 ♯3 ♯9 | 6 |
| 🔴6 | ~~Bmin7~~ | omit5 ♭3 ♭7 | 6 |

## P-A-B  `{1,9,11}`  ✋ verdict(0,2,4) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):双根音双保留:C 根 maj3(omit5 add2)(add2 记法诚实于三音语境)+ D 根 dom7sus2(omit5);add9 记法与挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bdom7sus2** | omit5 | 0 |
| 🟢3 | **Amaj3** | omit5 add2 | 0.5 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Amaj3add9~~ | omit5 | 0 |
| 🟡4 | ~~Bmaj7sus2~~ | omit5 ♭7 | 1.5 |
| 🟡4 | ~~Asus4~~ | omit5 ♭4 add2 | 2 |
| 🟠5 | ~~Amin3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Bmin7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Bsus2~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Amin3~~ | omit5 ♯3 add2 | 3.5 |
| 🔴6 | ~~Bmin3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Bmin3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Bminmaj7~~ | omit5 ♭3 ♭7 | 6 |

## D-Q-Z  `{2,3,10}`  ✋ verdict(0,1,8) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):maj3add11(omit5) 为唯一解释(硬规则):大三+纯四壳,与正形半边 maj7 壳对称,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Zmaj3add11** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Zmaj3~~ | omit5 add4 | 0.5 |
| 🟠5 | ~~Zmaj3b5~~ | ♭5 | 3 |
| 🟠5 | ~~Zmin3add11~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Dsus2~~ | ♭2 ♯5 | 3 |
| 🔴6 | ~~Zmin3~~ | omit5 ♯3 add4 | 3.5 |
| 🔴6 | ~~Zdim3~~ | ♭5 ♯3 | 6 |

## D-E-F  `{2,4,5}`  ✋ verdict(0,1,10) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add9(omit5) 为唯一解释(硬规则):小三+九壳(Phrygian 倒影紧凑),挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Dmin3add9** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Dmin3~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Edom7sus2~~ | omit5 ♭2 | 1 |
| 🟠5 | ~~Dmaj3add9~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Emaj7sus2~~ | omit5 ♭7 ♭2 | 3 |
| 🔴6 | ~~Dmaj3~~ | omit5 ♭3 add2 | 3.5 |
| 🔴6 | ~~Esus2~~ | omit5 ♭2 ♯6 | 4.5 |

## D-E-X  `{2,4,6}`  ✋ verdict(0,2,4) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):双根音双保留:C 根 maj3(omit5 add2)(add2 记法诚实于三音语境)+ D 根 dom7sus2(omit5);add9 记法与挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Edom7sus2** | omit5 | 0 |
| 🟢3 | **Dmaj3** | omit5 add2 | 0.5 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Dmaj3add9~~ | omit5 | 0 |
| 🟡4 | ~~Emaj7sus2~~ | omit5 ♭7 | 1.5 |
| 🟡4 | ~~Dsus4~~ | omit5 ♭4 add2 | 2 |
| 🟠5 | ~~Dmin3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Emin7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Esus2~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Emin3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Dmin3add11~~ | omit5 ♭3 ♭11 | 6 |
| 🔴6 | ~~Emin3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Eminmaj7~~ | omit5 ♭7 ♭3 | 6 |

## D-E-B  `{2,4,11}`  ✋ verdict(0,2,9) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add11(omit5) 为唯一解释(硬规则):小三+纯四五声碎片,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bmin3add11** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Bmin3~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Dsus2~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Ddom7sus2~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Bsus2~~ | omit5 ♯2 add4 | 2 |
| 🟠5 | ~~Bdim3~~ | ♭5 | 3 |
| 🟠5 | ~~Bmaj3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Dmin3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Bsus4~~ | omit5 ♯2 | 3 |
| 🔴6 | ~~Bmaj3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Dmin3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Bmaj3add9~~ | omit5 ♯9 ♯3 | 6 |
| 🔴6 | ~~Bmaj3b5~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Dmin7~~ | omit5 ♭3 ♭7 | 6 |

## D-F-G  `{2,5,7}`  ✋ verdict(0,2,9) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add11(omit5) 为唯一解释(硬规则):小三+纯四五声碎片,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Dmin3add11** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Dmin3~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Fsus2~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Fdom7sus2~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Dsus2~~ | omit5 ♯2 add4 | 2 |
| 🟠5 | ~~Ddim3~~ | ♭5 | 3 |
| 🟠5 | ~~Dmaj3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Fmin3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Dsus4~~ | omit5 ♯2 | 3 |
| 🔴6 | ~~Dmaj3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Fmin3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Dmaj3add9~~ | omit5 ♯9 ♯3 | 6 |
| 🔴6 | ~~Dmaj3b5~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Fmin7~~ | omit5 ♭7 ♭3 | 6 |

## D-X-G  `{2,6,7}`  ✋ verdict(0,1,8) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):maj3add11(omit5) 为唯一解释(硬规则):大三+纯四壳,与正形半边 maj7 壳对称,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Dmaj3add11** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Dmaj3~~ | omit5 add4 | 0.5 |
| 🟠5 | ~~Dmaj3b5~~ | ♭5 | 3 |
| 🟠5 | ~~Dmin3add11~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Xsus2~~ | ♭2 ♯5 | 3 |
| 🔴6 | ~~Dmin3~~ | omit5 ♯3 add4 | 3.5 |
| 🔴6 | ~~Ddim3~~ | ♭5 ♯3 | 6 |

## Q-E-B  `{3,4,11}`  ✋ verdict(0,1,8) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):maj3add11(omit5) 为唯一解释(硬规则):大三+纯四壳,与正形半边 maj7 壳对称,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Bmaj3add11** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Bmaj3~~ | omit5 add4 | 0.5 |
| 🟠5 | ~~Bmaj3b5~~ | ♭5 | 3 |
| 🟠5 | ~~Bmin3add11~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Qsus2~~ | ♭2 ♯5 | 3 |
| 🔴6 | ~~Bmin3~~ | omit5 ♯3 add4 | 3.5 |
| 🔴6 | ~~Bdim3~~ | ♭5 ♯3 | 6 |

## Q-F-X  `{3,5,6}`  ✋ verdict(0,1,10) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add9(omit5) 为唯一解释(硬规则):小三+九壳(Phrygian 倒影紧凑),挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qmin3add9** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Qmin3~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Fdom7sus2~~ | omit5 ♭2 | 1 |
| 🟠5 | ~~Qmaj3add9~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Fmaj7sus2~~ | omit5 ♭7 ♭2 | 3 |
| 🔴6 | ~~Qmaj3~~ | omit5 ♭3 add2 | 3.5 |
| 🔴6 | ~~Fsus2~~ | omit5 ♭2 ♯6 | 4.5 |

## Q-F-G  `{3,5,7}`  ✋ verdict(0,2,4) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):双根音双保留:C 根 maj3(omit5 add2)(add2 记法诚实于三音语境)+ D 根 dom7sus2(omit5);add9 记法与挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fdom7sus2** | omit5 | 0 |
| 🟢3 | **Qmaj3** | omit5 add2 | 0.5 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Qmaj3add9~~ | omit5 | 0 |
| 🟡4 | ~~Fmaj7sus2~~ | omit5 ♭7 | 1.5 |
| 🟡4 | ~~Qsus4~~ | omit5 ♭4 add2 | 2 |
| 🟠5 | ~~Qmin3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Fmin7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Fsus2~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Fmin3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Qmin3add11~~ | omit5 ♭3 ♭11 | 6 |
| 🔴6 | ~~Fmin3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Fminmaj7~~ | omit5 ♭7 ♭3 | 6 |

## Q-X-Y  `{3,6,8}`  ✋ verdict(0,2,9) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add11(omit5) 为唯一解释(硬规则):小三+纯四五声碎片,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qmin3add11** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Qmin3~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Xsus2~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Xdom7sus2~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Qsus2~~ | omit5 ♯2 add4 | 2 |
| 🟠5 | ~~Qdim3~~ | ♭5 | 3 |
| 🟠5 | ~~Qmaj3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Xmin3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Qsus4~~ | omit5 ♯2 | 3 |
| 🔴6 | ~~Qmaj3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Xmin3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Qmaj3add9~~ | omit5 ♯9 ♯3 | 6 |
| 🔴6 | ~~Qmaj3b5~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Xmin7~~ | omit5 ♭7 ♭3 | 6 |

## Q-G-Y  `{3,7,8}`  ✋ verdict(0,1,8) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):maj3add11(omit5) 为唯一解释(硬规则):大三+纯四壳,与正形半边 maj7 壳对称,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Qmaj3add11** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Qmaj3~~ | omit5 add4 | 0.5 |
| 🟠5 | ~~Qmaj3b5~~ | ♭5 | 3 |
| 🟠5 | ~~Qmin3add11~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Gsus2~~ | ♭2 ♯5 | 3 |
| 🔴6 | ~~Qmin3~~ | omit5 ♯3 add4 | 3.5 |
| 🔴6 | ~~Qdim3~~ | ♭5 ♯3 | 6 |

## E-X-G  `{4,6,7}`  ✋ verdict(0,1,10) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add9(omit5) 为唯一解释(硬规则):小三+九壳(Phrygian 倒影紧凑),挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Emin3add9** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Emin3~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Xdom7sus2~~ | omit5 ♭2 | 1 |
| 🟠5 | ~~Emaj3add9~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Xmaj7sus2~~ | omit5 ♭7 ♭2 | 3 |
| 🔴6 | ~~Emaj3~~ | omit5 ♭3 add2 | 3.5 |
| 🔴6 | ~~Xsus2~~ | omit5 ♭2 ♯6 | 4.5 |

## E-X-Y  `{4,6,8}`  ✋ verdict(0,2,4) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):双根音双保留:C 根 maj3(omit5 add2)(add2 记法诚实于三音语境)+ D 根 dom7sus2(omit5);add9 记法与挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xdom7sus2** | omit5 | 0 |
| 🟢3 | **Emaj3** | omit5 add2 | 0.5 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Emaj3add9~~ | omit5 | 0 |
| 🟡4 | ~~Xmaj7sus2~~ | omit5 ♭7 | 1.5 |
| 🟡4 | ~~Esus4~~ | omit5 ♭4 add2 | 2 |
| 🟠5 | ~~Emin3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Xmin7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Xsus2~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Xmin3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Emin3add11~~ | omit5 ♭3 ♭11 | 6 |
| 🔴6 | ~~Xmin3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Xminmaj7~~ | omit5 ♭7 ♭3 | 6 |

## E-G-A  `{4,7,9}`  ✋ verdict(0,2,9) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add11(omit5) 为唯一解释(硬规则):小三+纯四五声碎片,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Emin3add11** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Emin3~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Gsus2~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Gdom7sus2~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Esus2~~ | omit5 ♯2 add4 | 2 |
| 🟠5 | ~~Edim3~~ | ♭5 | 3 |
| 🟠5 | ~~Emaj3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Gmin3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Esus4~~ | omit5 ♯2 | 3 |
| 🔴6 | ~~Emaj3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Gmin3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Emaj3add9~~ | omit5 ♯9 ♯3 | 6 |
| 🔴6 | ~~Emaj3b5~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Gmin7~~ | omit5 ♭7 ♭3 | 6 |

## E-Y-A  `{4,8,9}`  ✋ verdict(0,1,8) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):maj3add11(omit5) 为唯一解释(硬规则):大三+纯四壳,与正形半边 maj7 壳对称,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Emaj3add11** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Emaj3~~ | omit5 add4 | 0.5 |
| 🟠5 | ~~Emaj3b5~~ | ♭5 | 3 |
| 🟠5 | ~~Emin3add11~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Ysus2~~ | ♭2 ♯5 | 3 |
| 🔴6 | ~~Emin3~~ | omit5 ♯3 add4 | 3.5 |
| 🔴6 | ~~Edim3~~ | ♭5 ♯3 | 6 |

## F-G-Y  `{5,7,8}`  ✋ verdict(0,1,10) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add9(omit5) 为唯一解释(硬规则):小三+九壳(Phrygian 倒影紧凑),挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fmin3add9** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Fmin3~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Gdom7sus2~~ | omit5 ♭2 | 1 |
| 🟠5 | ~~Fmaj3add9~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Gmaj7sus2~~ | omit5 ♭7 ♭2 | 3 |
| 🔴6 | ~~Fmaj3~~ | omit5 ♭3 add2 | 3.5 |
| 🔴6 | ~~Gsus2~~ | omit5 ♭2 ♯6 | 4.5 |

## F-G-A  `{5,7,9}`  ✋ verdict(0,2,4) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):双根音双保留:C 根 maj3(omit5 add2)(add2 记法诚实于三音语境)+ D 根 dom7sus2(omit5);add9 记法与挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gdom7sus2** | omit5 | 0 |
| 🟢3 | **Fmaj3** | omit5 add2 | 0.5 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Fmaj3add9~~ | omit5 | 0 |
| 🟡4 | ~~Gmaj7sus2~~ | omit5 ♭7 | 1.5 |
| 🟡4 | ~~Fsus4~~ | omit5 ♭4 add2 | 2 |
| 🟠5 | ~~Fmin3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Gmin7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Gsus2~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Gmin3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Fmin3add11~~ | omit5 ♭3 ♭11 | 6 |
| 🔴6 | ~~Gmin3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Gminmaj7~~ | omit5 ♭7 ♭3 | 6 |

## F-Y-Z  `{5,8,10}`  ✋ verdict(0,2,9) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add11(omit5) 为唯一解释(硬规则):小三+纯四五声碎片,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fmin3add11** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Fmin3~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Ysus2~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Ydom7sus2~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Fsus2~~ | omit5 ♯2 add4 | 2 |
| 🟠5 | ~~Fdim3~~ | ♭5 | 3 |
| 🟠5 | ~~Fmaj3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Ymin3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Fsus4~~ | omit5 ♯2 | 3 |
| 🔴6 | ~~Fmaj3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Ymin3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Fmaj3add9~~ | omit5 ♯9 ♯3 | 6 |
| 🔴6 | ~~Fmaj3b5~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Ymin7~~ | omit5 ♭7 ♭3 | 6 |

## F-A-Z  `{5,9,10}`  ✋ verdict(0,1,8) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):maj3add11(omit5) 为唯一解释(硬规则):大三+纯四壳,与正形半边 maj7 壳对称,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Fmaj3add11** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Fmaj3~~ | omit5 add4 | 0.5 |
| 🟠5 | ~~Fmaj3b5~~ | ♭5 | 3 |
| 🟠5 | ~~Fmin3add11~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Asus2~~ | ♭2 ♯5 | 3 |
| 🔴6 | ~~Fmin3~~ | omit5 ♯3 add4 | 3.5 |
| 🔴6 | ~~Fdim3~~ | ♭5 ♯3 | 6 |

## X-Y-A  `{6,8,9}`  ✋ verdict(0,1,10) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add9(omit5) 为唯一解释(硬规则):小三+九壳(Phrygian 倒影紧凑),挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xmin3add9** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Xmin3~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Ydom7sus2~~ | omit5 ♭2 | 1 |
| 🟠5 | ~~Xmaj3add9~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Ymaj7sus2~~ | omit5 ♭7 ♭2 | 3 |
| 🔴6 | ~~Xmaj3~~ | omit5 ♭3 add2 | 3.5 |
| 🔴6 | ~~Ysus2~~ | omit5 ♭2 ♯6 | 4.5 |

## X-Y-Z  `{6,8,10}`  ✋ verdict(0,2,4) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):双根音双保留:C 根 maj3(omit5 add2)(add2 记法诚实于三音语境)+ D 根 dom7sus2(omit5);add9 记法与挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ydom7sus2** | omit5 | 0 |
| 🟢3 | **Xmaj3** | omit5 add2 | 0.5 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Xmaj3add9~~ | omit5 | 0 |
| 🟡4 | ~~Ymaj7sus2~~ | omit5 ♭7 | 1.5 |
| 🟡4 | ~~Xsus4~~ | omit5 ♭4 add2 | 2 |
| 🟠5 | ~~Xmin3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Ymin7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Ysus2~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Ymin3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Xmin3add11~~ | omit5 ♭3 ♭11 | 6 |
| 🔴6 | ~~Ymin3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Yminmaj7~~ | omit5 ♭7 ♭3 | 6 |

## X-A-B  `{6,9,11}`  ✋ verdict(0,2,9) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add11(omit5) 为唯一解释(硬规则):小三+纯四五声碎片,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xmin3add11** | omit5 | 0 |

🗑 已过滤 13 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Xmin3~~ | omit5 add4 | 0.5 |
| 🟢3 | ~~Asus2~~ | omit5 add6 | 0.5 |
| 🟢3 | ~~Adom7sus2~~ | omit5 ♭7 | 1 |
| 🟡4 | ~~Xsus2~~ | omit5 ♯2 add4 | 2 |
| 🟠5 | ~~Xdim3~~ | ♭5 | 3 |
| 🟠5 | ~~Xmaj3add11~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Amin3add6~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Xsus4~~ | omit5 ♯2 | 3 |
| 🔴6 | ~~Xmaj3~~ | omit5 ♭3 add4 | 3.5 |
| 🔴6 | ~~Amin3~~ | omit5 ♭3 add6 | 3.5 |
| 🔴6 | ~~Xmaj3add9~~ | omit5 ♯9 ♯3 | 6 |
| 🔴6 | ~~Xmaj3b5~~ | ♭3 ♭5 | 6 |
| 🔴6 | ~~Amin7~~ | omit5 ♭7 ♭3 | 6 |

## X-Z-B  `{6,10,11}`  ✋ verdict(0,1,8) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):maj3add11(omit5) 为唯一解释(硬规则):大三+纯四壳,与正形半边 maj7 壳对称,挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Xmaj3add11** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Xmaj3~~ | omit5 add4 | 0.5 |
| 🟠5 | ~~Xmaj3b5~~ | ♭5 | 3 |
| 🟠5 | ~~Xmin3add11~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Zsus2~~ | ♭2 ♯5 | 3 |
| 🔴6 | ~~Xmin3~~ | omit5 ♯3 add4 | 3.5 |
| 🔴6 | ~~Xdim3~~ | ♭5 ♯3 | 6 |

## G-A-Z  `{7,9,10}`  ✋ verdict(0,1,10) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add9(omit5) 为唯一解释(硬规则):小三+九壳(Phrygian 倒影紧凑),挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Gmin3add9** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Gmin3~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Adom7sus2~~ | omit5 ♭2 | 1 |
| 🟠5 | ~~Gmaj3add9~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Amaj7sus2~~ | omit5 ♭7 ♭2 | 3 |
| 🔴6 | ~~Gmaj3~~ | omit5 ♭3 add2 | 3.5 |
| 🔴6 | ~~Asus2~~ | omit5 ♭2 ♯6 | 4.5 |

## G-A-B  `{7,9,11}`  ✋ verdict(0,2,4) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):双根音双保留:C 根 maj3(omit5 add2)(add2 记法诚实于三音语境)+ D 根 dom7sus2(omit5);add9 记法与挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Adom7sus2** | omit5 | 0 |
| 🟢3 | **Gmaj3** | omit5 add2 | 0.5 |

🗑 已过滤 10 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | ~~Gmaj3add9~~ | omit5 | 0 |
| 🟡4 | ~~Amaj7sus2~~ | omit5 ♭7 | 1.5 |
| 🟡4 | ~~Gsus4~~ | omit5 ♭4 add2 | 2 |
| 🟠5 | ~~Gmin3add9~~ | omit5 ♯3 | 3 |
| 🟠5 | ~~Amin7~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Asus2~~ | omit5 ♯6 | 3 |
| 🔴6 | ~~Amin3~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Gmin3add11~~ | omit5 ♭3 ♭11 | 6 |
| 🔴6 | ~~Amin3add6~~ | omit5 ♭3 ♯6 | 6 |
| 🔴6 | ~~Aminmaj7~~ | omit5 ♭7 ♭3 | 6 |

## Y-Z-B  `{8,10,11}`  ✋ verdict(0,1,10) ⚙ zero-cost-exclusive

> ✋ 人工裁决(2026-09-05):min3add9(omit5) 为唯一解释(硬规则):小三+九壳(Phrygian 倒影紧凑),挂尾全滤

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🔵2 | **Ymin3add9** | omit5 | 0 |

🗑 已过滤 6 条(未进哈希表):

| tier | 和弦 | 变换 | cost |
|---|---|---|---|
| 🟢3 | ~~Ymin3~~ | omit5 add2 | 0.5 |
| 🟢3 | ~~Zdom7sus2~~ | omit5 ♭2 | 1 |
| 🟠5 | ~~Ymaj3add9~~ | omit5 ♭3 | 3 |
| 🟠5 | ~~Zmaj7sus2~~ | omit5 ♭7 ♭2 | 3 |
| 🔴6 | ~~Ymaj3~~ | omit5 ♭3 add2 | 3.5 |
| 🔴6 | ~~Zsus2~~ | omit5 ♭2 ♯6 | 4.5 |
