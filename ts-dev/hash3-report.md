**统计:完全匹配 40 / 简单 178 / 复杂 2 = 220 组,全覆盖。**

# 三音哈希表完整报告(C(12,3) = 220)

> 每个三音组合的全部倒推方案,按加权 cost 排序(奥卡姆剃刀)。
> cost 语义:0=完全匹配或纯 omit5/omit11 / 0.5=自然扩展 / 1=属七变化 / 3=avoid note / 4=双变化
> 生成:`npx tsx ts-dev/decompose/hash3-report.ts`

## C-P-D  `{0,1,2}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Pmaj7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 2 | **P7sus2** | (♯7 ♭2 omit5) | 2 | 多重变换 |
| 3 | **Csus2** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 4 | **Psus2** | (♭2 omit5 add7) | 3.5 | avoid note / 双变化 |
| 5 | **Cmadd9** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 6 | **PmM7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 7 | **C°** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 8 | **P°** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 9 | **Cm** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 10 | **Pm** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |

## C-P-Q  `{0,1,3}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Pmaj7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Psus2** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **P7sus2** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **C°** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 5 | **Cm** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 6 | **Cmadd9** | (♭9 omit5) | 3 | avoid note / 双变化 |
| 7 | **PmM7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **P°** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Pm** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Pmaj7#5** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## C-P-E  `{0,1,4}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **PmM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **P°** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Pm** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Pmaj7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 5 | **P7** | (♯7 ♭3 omit5) | 2 | 多重变换 |
| 6 | **P7sus2** | (♯7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **C+** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 8 | **Pmaj7#5** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Pø** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 10 | **C** | (omit5 add♯1) | 3 | avoid note / 双变化 |

## C-P-F  `{0,1,5}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Pmaj7#5** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **PM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **P+** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **P** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 5 | **P7** | (♯7 omit5) | 1 | 属七变化(张力) |
| 6 | **Pmaj7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 7 | **P7sus4** | (♯7 ♭4 omit5) | 2 | 多重变换 |
| 8 | **PmM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Csus4** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 10 | **P°** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |

## C-P-X  `{0,1,6}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Pmaj7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Psus4** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **P7sus4** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **P7** | (♯7 ♯3 omit5) | 2 | 多重变换 |
| 5 | **Pmaj7#5** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **PM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Xsus4** | (♯4) | 3 | avoid note / 双变化 |
| 8 | **P+** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **P** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **C°** | (♭♭3) | 4 | avoid note / 双变化 |

## C-P-G  `{0,1,7}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Pmaj7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 2 | **P7sus4** | (♯7 ♯4 omit5) | 2 | 多重变换 |
| 3 | **Gb5** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **Csus2** | (♭2) | 3 | avoid note / 双变化 |
| 5 | **Gsus4** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Psus4** | (♯4 omit5 add7) | 3.5 | avoid note / 双变化 |
| 7 | **Pmaj7#5** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 8 | **G°** | (♯♯3) | 4 | avoid note / 双变化 |
| 9 | **PM7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Cm** | (♭♭3) | 4 | avoid note / 双变化 |

## C-P-Y  `{0,1,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Yadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Y+** | (omit5 add4) | 0.5 | 自然扩展(色彩音) |
| 3 | **Yb5** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Ymadd11** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Y** | (♭♭5) | 4 | avoid note / 双变化 |
| 6 | **Csus2** | (♭2 ♯5) | 6 | avoid note / 双变化 |
| 7 | **Cm** | (♭♭3 ♯5) | 7 | avoid note / 双变化 |
| 8 | **Ym** | (♯3 ♭♭5) | 7 | avoid note / 双变化 |
| 9 | **C°** | (♭♭3 ♯♯5) | 8 | avoid note / 双变化 |
| 10 | **Y°** | (♭♭5 ♯♯3) | 8 | avoid note / 双变化 |

## C-P-A  `{0,1,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Am** | (omit5 add3) | 0.5 | 自然扩展(色彩音) |
| 2 | **A+** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 3 | **A** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 4 | **Aadd9** | (♯9 omit5) | 3 | avoid note / 双变化 |
| 5 | **Amadd11** | (♭11 omit5) | 3 | avoid note / 双变化 |
| 6 | **A°** | (♭♭5) | 4 | avoid note / 双变化 |
| 7 | **C°7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 8 | **Aadd11** | (♭♭11 omit5) | 4 | avoid note / 双变化 |
| 9 | **Cmadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Amadd9** | (♯♯9 omit5) | 4 | avoid note / 双变化 |

## C-P-Z  `{0,1,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Zmadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Z°** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 3 | **Zm** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **C7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 5 | **Cmaj7sus2** | (♭2 ♭7 omit5) | 2 | 多重变换 |
| 6 | **Zadd9** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Zsus2** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **Cø** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Cm7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Zsus4** | (♭♭4 omit5 add2) | 4.5 | avoid note / 双变化 |

## C-P-B  `{0,1,11}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Cmaj7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 2 | **C7sus2** | (♭2 ♯7 omit5) | 2 | 多重变换 |
| 3 | **Bsus2** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 4 | **Csus2** | (♭2 omit5 add7) | 3.5 | avoid note / 双变化 |
| 5 | **Bmadd9** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 6 | **CmM7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 7 | **C°** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 8 | **B°** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 9 | **Cm** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 10 | **Bm** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |

## C-D-Q  `{0,2,3}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Cmadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **C°** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 3 | **Cm** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **D7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 5 | **Dmaj7sus2** | (♭7 ♭2 omit5) | 2 | 多重变换 |
| 6 | **Cadd9** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Csus2** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **Dø** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Dm7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Csus4** | (♭♭4 omit5 add2) | 4.5 | avoid note / 双变化 |

## C-D-E  `{0,2,4}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **D7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Cadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **C+** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **C** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 5 | **Dmaj7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Dø** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Cmadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Dm7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Dsus2** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Cm** | (♭3 omit5 add3) | 3.5 | avoid note / 双变化 |

## C-D-F  `{0,2,5}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Dø** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Dm7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Csus4** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **D7** | (♭3 omit5) | 1 | 属七变化(张力) |
| 5 | **D7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 6 | **Dmaj7sus2** | (♭7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **D°** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **D°7** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Cadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Dm** | (omit5 add♯6) | 3 | avoid note / 双变化 |

## C-D-X  `{0,2,6}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **D7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **D7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 3 | **Dmaj7sus4** | (♭7 ♭4 omit5) | 2 | 多重变换 |
| 4 | **Dmaj7#5** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 5 | **C°** | (♭3) | 3 | avoid note / 双变化 |
| 6 | **Dø** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **D** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **Dadd6** | (♯6 omit5) | 3 | avoid note / 双变化 |
| 9 | **DM7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 10 | **Dm7** | (♯3 omit5) | 3 | avoid note / 双变化 |

## C-D-G  `{0,2,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **D7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Csus2** | — | 0 | 零变换 |
| 3 | **Gsus4** | — | 0 | 零变换 |
| 4 | **D7** | (♯3 omit5) | 1 | 属七变化(张力) |
| 5 | **Dmaj7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **G** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Cm** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Dsus4** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 9 | **Dø** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **C** | (♭♭3) | 4 | avoid note / 双变化 |

## C-D-Y  `{0,2,8}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Yb5** | — | 0 | 零变换 |
| 2 | **D7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 3 | **Dmaj7sus4** | (♭7 ♯4 omit5) | 2 | 多重变换 |
| 4 | **Y°** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **Y** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Yadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 7 | **Csus2** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **C+** | (♭♭3) | 4 | avoid note / 双变化 |
| 9 | **Y+** | (♭♭5) | 4 | avoid note / 双变化 |
| 10 | **D7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## C-D-A  `{0,2,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Amadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **A°** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **C°7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 4 | **Aadd11** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Cmadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Asus4** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 7 | **A+** | (♭3 omit5 add4) | 3.5 | avoid note / 双变化 |
| 8 | **C°** | (♭3 omit5 add6) | 3.5 | avoid note / 双变化 |
| 9 | **Cadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Am** | (♭♭5) | 4 | avoid note / 双变化 |

## C-D-Z  `{0,2,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **C7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Zadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Z+** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **Z** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 5 | **Cmaj7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Cø** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Zmadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Cm7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Csus2** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Zm** | (♭3 omit5 add3) | 3.5 | avoid note / 双变化 |

## C-D-B  `{0,2,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Cmaj7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Csus2** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **C7sus2** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **B°** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 5 | **Bm** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 6 | **Bmadd9** | (♭9 omit5) | 3 | avoid note / 双变化 |
| 7 | **CmM7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **C°** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Cm** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Cmaj7#5** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## C-Q-E  `{0,3,4}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Cm** | (omit5 add3) | 0.5 | 自然扩展(色彩音) |
| 2 | **Q7sus2** | (♭7 ♭2 omit5) | 2 | 多重变换 |
| 3 | **C+** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 4 | **C** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 5 | **Cadd9** | (♯9 omit5) | 3 | avoid note / 双变化 |
| 6 | **Cmadd11** | (♭11 omit5) | 3 | avoid note / 双变化 |
| 7 | **C°** | (♭♭5) | 4 | avoid note / 双变化 |
| 8 | **Q°7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Cadd11** | (♭♭11 omit5) | 4 | avoid note / 双变化 |
| 10 | **Qmadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## C-Q-F  `{0,3,5}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Cmadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Q7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 3 | **C°** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Q°7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Cadd11** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Qmadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Csus4** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **C+** | (♭3 omit5 add4) | 3.5 | avoid note / 双变化 |
| 9 | **Q°** | (♭3 omit5 add6) | 3.5 | avoid note / 双变化 |
| 10 | **Qadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## C-Q-X  `{0,3,6}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **C°** | — | 0 | 零变换 |
| 2 | **Q°7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Qmadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 4 | **Q°** | (omit5 add6) | 0.5 | 自然扩展(色彩音) |
| 5 | **Q7** | (♭7 ♭3 omit5) | 2 | 多重变换 |
| 6 | **Q7sus2** | (♭7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **Qø** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 8 | **Qadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Cb5** | (♭3) | 3 | avoid note / 双变化 |
| 10 | **Cm** | (♭5) | 3 | avoid note / 双变化 |

## C-Q-G  `{0,3,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Qadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Cm** | — | 0 | 零变换 |
| 3 | **Q7** | (♭7 omit5) | 1 | 属七变化(张力) |
| 4 | **Q7sus4** | (♭7 ♭4 omit5) | 2 | 多重变换 |
| 5 | **Q+** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **G+** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **C°** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **Q°7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **C** | (♭3) | 3 | avoid note / 双变化 |
| 10 | **Qmadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |

## C-Q-Y  `{0,3,8}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Y** | — | 0 | 零变换 |
| 2 | **Q7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 3 | **Q7** | (♭7 ♯3 omit5) | 2 | 多重变换 |
| 4 | **C+** | (♭3) | 3 | avoid note / 双变化 |
| 5 | **Y+** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Qadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Yb5** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **Cm** | (♯5) | 3 | avoid note / 双变化 |
| 9 | **Ym** | (♯3) | 3 | avoid note / 双变化 |
| 10 | **Ysus4** | (♭4) | 3 | avoid note / 双变化 |

## C-Q-A  `{0,3,9}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **A°** | — | 0 | 零变换 |
| 2 | **C°7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Cmadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 4 | **C°** | (omit5 add6) | 0.5 | 自然扩展(色彩音) |
| 5 | **Q7sus4** | (♭7 ♯4 omit5) | 2 | 多重变换 |
| 6 | **Cø** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 7 | **Cadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Ab5** | (♭3) | 3 | avoid note / 双变化 |
| 9 | **Am** | (♭5) | 3 | avoid note / 双变化 |
| 10 | **Amadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |

## C-Q-Z  `{0,3,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Cø** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Cm7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Zsus4** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **C7** | (♭3 omit5) | 1 | 属七变化(张力) |
| 5 | **C7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 6 | **Cmaj7sus2** | (♯2 ♭7 omit5) | 2 | 多重变换 |
| 7 | **C°** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **C°7** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Zadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Cm** | (omit5 add♯6) | 3 | avoid note / 双变化 |

## C-Q-B  `{0,3,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **CmM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **C°** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Cm** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Cmaj7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 5 | **C7** | (♭3 ♯7 omit5) | 2 | 多重变换 |
| 6 | **C7sus2** | (♯2 ♯7 omit5) | 2 | 多重变换 |
| 7 | **B+** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 8 | **Cmaj7#5** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Cø** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 10 | **B** | (omit5 add♯1) | 3 | avoid note / 双变化 |

## C-E-F  `{0,4,5}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Cadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **C+** | (omit5 add4) | 0.5 | 自然扩展(色彩音) |
| 3 | **Cb5** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Cmadd11** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **C** | (♭♭5) | 4 | avoid note / 双变化 |
| 6 | **E7sus2** | (♭♭7 ♭2 omit5) | 5 | avoid note / 双变化 |
| 7 | **C°** | (♯3 ♭5) | 6 | avoid note / 双变化 |
| 8 | **Esus2** | (♯5 ♭2) | 6 | avoid note / 双变化 |
| 9 | **E°7** | (♭7 ♭♭3 omit5) | 7 | avoid note / 双变化 |
| 10 | **Cm** | (♯3 ♭♭5) | 7 | avoid note / 双变化 |

## C-E-X  `{0,4,6}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Cb5** | — | 0 | 零变换 |
| 2 | **C°** | (♯3) | 3 | avoid note / 双变化 |
| 3 | **C** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Cadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 5 | **Esus2** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **C+** | (♭♭5) | 4 | avoid note / 双变化 |
| 7 | **E+** | (♭♭3) | 4 | avoid note / 双变化 |
| 8 | **E7sus2** | (♭♭7 omit5) | 4 | avoid note / 双变化 |
| 9 | **E°7** | (♭7 ♭3 omit5) | 6 | avoid note / 双变化 |
| 10 | **Cm** | (♯3 ♭5) | 6 | avoid note / 双变化 |

## C-E-G  `{0,4,7}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **C** | — | 0 | 零变换 |
| 2 | **C+** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **E+** | (♭3) | 3 | avoid note / 双变化 |
| 4 | **E°7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 5 | **Cb5** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Cm** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Em** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **Emadd6** | (♭6 omit5) | 3 | avoid note / 双变化 |
| 9 | **Csus4** | (♭4) | 3 | avoid note / 双变化 |
| 10 | **E°** | (♯♯5) | 4 | avoid note / 双变化 |

## C-E-Y  `{0,4,8}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **C+** | — | 0 | 零变换 |
| 2 | **E+** | — | 0 | 零变换 |
| 3 | **Y+** | — | 0 | 零变换 |
| 4 | **C** | (♯5) | 3 | avoid note / 双变化 |
| 5 | **E** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Y** | (♯5) | 3 | avoid note / 双变化 |
| 7 | **Eadd6** | (♭6 omit5) | 3 | avoid note / 双变化 |
| 8 | **E7** | (♭♭7 omit5) | 4 | avoid note / 双变化 |
| 9 | **Cb5** | (♯♯5) | 4 | avoid note / 双变化 |
| 10 | **Eb5** | (♯♯5) | 4 | avoid note / 双变化 |

## C-E-A  `{0,4,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Cadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Am** | — | 0 | 零变换 |
| 3 | **C+** | (♯5) | 3 | avoid note / 双变化 |
| 4 | **E+** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **A°** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **C°7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **A** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Cmadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Asus2** | (♯2) | 3 | avoid note / 双变化 |
| 10 | **Esus4** | (♯5) | 3 | avoid note / 双变化 |

## C-E-Z  `{0,4,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **C7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **C7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 3 | **Cmaj7sus4** | (♭4 ♭7 omit5) | 2 | 多重变换 |
| 4 | **Z°** | (♭3) | 3 | avoid note / 双变化 |
| 5 | **Cø** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **C** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 7 | **Cadd6** | (♯6 omit5) | 3 | avoid note / 双变化 |
| 8 | **CM7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Cm7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Zsus2** | (♭5) | 3 | avoid note / 双变化 |

## C-E-B  `{0,4,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Cmaj7#5** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **CM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **C+** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **C** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 5 | **C7** | (♯7 omit5) | 1 | 属七变化(张力) |
| 6 | **Cmaj7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 7 | **C7sus4** | (♭4 ♯7 omit5) | 2 | 多重变换 |
| 8 | **CmM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Bsus4** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 10 | **C°** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |

## C-F-X  `{0,5,6}`

**最佳解释:🔴 复杂(avoid note/双变化)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Cb5** | (♯3) | 3 | avoid note / 双变化 |
| 2 | **Fsus2** | (♭2) | 3 | avoid note / 双变化 |
| 3 | **Csus4** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **C°** | (♯♯3) | 4 | avoid note / 双变化 |
| 5 | **Cadd11** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 6 | **Fm** | (♭♭3) | 4 | avoid note / 双变化 |
| 7 | **C** | (♯3 ♭5) | 6 | avoid note / 双变化 |
| 8 | **C+** | (♯3 ♭♭5) | 7 | avoid note / 双变化 |
| 9 | **F°** | (♯5 ♭♭3) | 7 | avoid note / 双变化 |
| 10 | **Cm** | (♯♯3 ♭5) | 7 | avoid note / 双变化 |

## C-F-G  `{0,5,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **G7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Fsus2** | — | 0 | 零变换 |
| 3 | **Csus4** | — | 0 | 零变换 |
| 4 | **Gmaj7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 5 | **C** | (♯3) | 3 | avoid note / 双变化 |
| 6 | **Fm** | (♭3) | 3 | avoid note / 双变化 |
| 7 | **Gsus4** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **F** | (♭♭3) | 4 | avoid note / 双变化 |
| 9 | **Cm** | (♯♯3) | 4 | avoid note / 双变化 |
| 10 | **C+** | (♯3 ♭5) | 6 | avoid note / 双变化 |

## C-F-Y  `{0,5,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Yadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Fm** | — | 0 | 零变换 |
| 3 | **C+** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **Y+** | (♯5) | 3 | avoid note / 双变化 |
| 5 | **F°** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **F** | (♭3) | 3 | avoid note / 双变化 |
| 7 | **Ymadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Fsus2** | (♯2) | 3 | avoid note / 双变化 |
| 9 | **Csus4** | (♯5) | 3 | avoid note / 双变化 |
| 10 | **F°7** | (♭♭7 omit5) | 4 | avoid note / 双变化 |

## C-F-A  `{0,5,9}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **F** | — | 0 | 零变换 |
| 2 | **F+** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **A+** | (♭3) | 3 | avoid note / 双变化 |
| 4 | **Cadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Fb5** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Fm** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Am** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **Fsus4** | (♭4) | 3 | avoid note / 双变化 |
| 9 | **A°** | (♯♯5) | 4 | avoid note / 双变化 |
| 10 | **C°7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## C-F-Z  `{0,5,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **C7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Zsus2** | — | 0 | 零变换 |
| 3 | **Fsus4** | — | 0 | 零变换 |
| 4 | **C7** | (♯3 omit5) | 1 | 属七变化(张力) |
| 5 | **Cmaj7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **F** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Zm** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Csus4** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 9 | **Cø** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Z** | (♭♭3) | 4 | avoid note / 双变化 |

## C-F-B  `{0,5,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Cmaj7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Csus4** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **C7sus4** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **C7** | (♯3 ♯7 omit5) | 2 | 多重变换 |
| 5 | **Cmaj7#5** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **CM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Fsus4** | (♯4) | 3 | avoid note / 双变化 |
| 8 | **C+** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **C** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **B°** | (♭♭3) | 4 | avoid note / 双变化 |

## C-X-G  `{0,6,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Gmaj7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Gsus4** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **G7sus4** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **Gmaj7#5** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Csus4** | (♯4) | 3 | avoid note / 双变化 |
| 6 | **G+** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 7 | **X°** | (♭♭3) | 4 | avoid note / 双变化 |
| 8 | **C** | (♯♯3) | 4 | avoid note / 双变化 |
| 9 | **Xsus2** | (♭5 ♭2) | 6 | avoid note / 双变化 |
| 10 | **C+** | (♯♯3 ♭5) | 7 | avoid note / 双变化 |

## C-X-Y  `{0,6,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Y7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Y7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 3 | **Ymaj7sus4** | (♭4 ♭7 omit5) | 2 | 多重变换 |
| 4 | **X°** | (♭3) | 3 | avoid note / 双变化 |
| 5 | **Y** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 6 | **Yadd6** | (♯6 omit5) | 3 | avoid note / 双变化 |
| 7 | **YM7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 8 | **Ym7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Xsus2** | (♭5) | 3 | avoid note / 双变化 |
| 10 | **C+** | (♯♯3) | 4 | avoid note / 双变化 |

## C-X-A  `{0,6,9}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **X°** | — | 0 | 零变换 |
| 2 | **A°7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Amadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 4 | **A°** | (omit5 add6) | 0.5 | 自然扩展(色彩音) |
| 5 | **Aø** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 6 | **Aadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Xb5** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Xm** | (♭5) | 3 | avoid note / 双变化 |
| 9 | **Cadd6** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Am** | (♯♯5) | 4 | avoid note / 双变化 |

## C-X-Z  `{0,6,10}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Xb5** | — | 0 | 零变换 |
| 2 | **C7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 3 | **Cmaj7sus4** | (♯4 ♭7 omit5) | 2 | 多重变换 |
| 4 | **X°** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **X** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Zsus2** | (♯5) | 3 | avoid note / 双变化 |
| 7 | **X+** | (♭♭5) | 4 | avoid note / 双变化 |
| 8 | **Z+** | (♭♭3) | 4 | avoid note / 双变化 |
| 9 | **C7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Xm** | (♭5 ♯3) | 6 | avoid note / 双变化 |

## C-X-B  `{0,6,11}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Cmaj7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 2 | **C7sus4** | (♯4 ♯7 omit5) | 2 | 多重变换 |
| 3 | **Xb5** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **Bsus2** | (♭2) | 3 | avoid note / 双变化 |
| 5 | **Xsus4** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Csus4** | (♯4 omit5 add7) | 3.5 | avoid note / 双变化 |
| 7 | **Cmaj7#5** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 8 | **X°** | (♯♯3) | 4 | avoid note / 双变化 |
| 9 | **CM7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Bm** | (♭♭3) | 4 | avoid note / 双变化 |

## C-G-Y  `{0,7,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Ymaj7#5** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **YM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Y+** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Y** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 5 | **Y7** | (♯7 omit5) | 1 | 属七变化(张力) |
| 6 | **Ymaj7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 7 | **Y7sus4** | (♭4 ♯7 omit5) | 2 | 多重变换 |
| 8 | **YmM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Gsus4** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 10 | **Ym** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |

## C-G-A  `{0,7,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Aø** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Am7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Gsus4** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **A7** | (♭3 omit5) | 1 | 属七变化(张力) |
| 5 | **A7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 6 | **Amaj7sus2** | (♯2 ♭7 omit5) | 2 | 多重变换 |
| 7 | **A°** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **A°7** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Am** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Gmadd11** | (♭3 omit5) | 3 | avoid note / 双变化 |

## C-G-Z  `{0,7,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Gmadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **G°** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **Z°7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 4 | **Gadd11** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Zmadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Gsus4** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 7 | **Z°** | (♭3 omit5 add6) | 3.5 | avoid note / 双变化 |
| 8 | **Zadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Gm** | (♭♭5) | 4 | avoid note / 双变化 |
| 10 | **Zsus2** | (♯♯5) | 4 | avoid note / 双变化 |

## C-G-B  `{0,7,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Gadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **G+** | (omit5 add4) | 0.5 | 自然扩展(色彩音) |
| 3 | **Gb5** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Gmadd11** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **G** | (♭♭5) | 4 | avoid note / 双变化 |
| 6 | **G°** | (♭5 ♯3) | 6 | avoid note / 双变化 |
| 7 | **Bsus2** | (♭2 ♯5) | 6 | avoid note / 双变化 |
| 8 | **Gm** | (♭♭5 ♯3) | 7 | avoid note / 双变化 |
| 9 | **Bm** | (♭♭3 ♯5) | 7 | avoid note / 双变化 |
| 10 | **B°** | (♭♭3 ♯♯5) | 8 | avoid note / 双变化 |

## C-Y-A  `{0,8,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **AmM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **A°** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Am** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Amaj7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 5 | **A7** | (♭3 ♯7 omit5) | 2 | 多重变换 |
| 6 | **A7sus2** | (♯2 ♯7 omit5) | 2 | 多重变换 |
| 7 | **Y+** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 8 | **Amaj7#5** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Aø** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 10 | **Y** | (omit5 add♯1) | 3 | avoid note / 双变化 |

## C-Y-Z  `{0,8,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Z7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Yadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Y+** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **Y** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 5 | **Zmaj7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Zø** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Ymadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Zm7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Zsus2** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Ym** | (♯3 omit5 add2) | 3.5 | avoid note / 双变化 |

## C-Y-B  `{0,8,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Ym** | (omit5 add3) | 0.5 | 自然扩展(色彩音) |
| 2 | **Y+** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 3 | **Y** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 4 | **Yadd9** | (♯9 omit5) | 3 | avoid note / 双变化 |
| 5 | **Ymadd11** | (♭11 omit5) | 3 | avoid note / 双变化 |
| 6 | **Y°** | (♭♭5) | 4 | avoid note / 双变化 |
| 7 | **B°7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 8 | **Yadd11** | (♭♭11 omit5) | 4 | avoid note / 双变化 |
| 9 | **Bmadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Ymadd9** | (♯♯9 omit5) | 4 | avoid note / 双变化 |

## C-A-Z  `{0,9,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Zmaj7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Zsus2** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Z7sus2** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **A°** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 5 | **Am** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 6 | **Amadd9** | (♭9 omit5) | 3 | avoid note / 双变化 |
| 7 | **ZmM7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Z°** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Zm** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Zmaj7#5** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## C-A-B  `{0,9,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Amadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **A°** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 3 | **Am** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **B7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 5 | **Bmaj7sus2** | (♭2 ♭7 omit5) | 2 | 多重变换 |
| 6 | **Aadd9** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Asus2** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **A+** | (♭3 omit5 add2) | 3.5 | avoid note / 双变化 |
| 9 | **A** | (♭3 omit5 add2) | 3.5 | avoid note / 双变化 |
| 10 | **Bø** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## C-Z-B  `{0,10,11}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Bmaj7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 2 | **B7sus2** | (♭2 ♯7 omit5) | 2 | 多重变换 |
| 3 | **Zsus2** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 4 | **Bsus2** | (♭2 omit5 add7) | 3.5 | avoid note / 双变化 |
| 5 | **Zmadd9** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 6 | **BmM7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 7 | **B°** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 8 | **Bm** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 9 | **Z°** | (♭3 omit5 add♯1) | 6 | avoid note / 双变化 |
| 10 | **Zm** | (♭3 omit5 add♯1) | 6 | avoid note / 双变化 |

## P-D-Q  `{1,2,3}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Dmaj7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 2 | **D7sus2** | (♯7 ♭2 omit5) | 2 | 多重变换 |
| 3 | **Psus2** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 4 | **Dsus2** | (♭2 omit5 add7) | 3.5 | avoid note / 双变化 |
| 5 | **Pmadd9** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 6 | **DmM7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 7 | **P°** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 8 | **D°** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 9 | **Pm** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 10 | **Dm** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |

## P-D-E  `{1,2,4}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Dmaj7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Dsus2** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **D7sus2** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **P°** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 5 | **Pm** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 6 | **Pmadd9** | (♭9 omit5) | 3 | avoid note / 双变化 |
| 7 | **DmM7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **D°** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Dm** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Dmaj7#5** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## P-D-F  `{1,2,5}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **DmM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **D°** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Dm** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Dmaj7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 5 | **D7** | (♯7 ♭3 omit5) | 2 | 多重变换 |
| 6 | **D7sus2** | (♯7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **P+** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 8 | **Dmaj7#5** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Dø** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 10 | **P** | (omit5 add♯1) | 3 | avoid note / 双变化 |

## P-D-X  `{1,2,6}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Dmaj7#5** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **DM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **D+** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **D** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 5 | **D7** | (♯7 omit5) | 1 | 属七变化(张力) |
| 6 | **Dmaj7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 7 | **D7sus4** | (♯7 ♭4 omit5) | 2 | 多重变换 |
| 8 | **DmM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Psus4** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 10 | **D°** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |

## P-D-G  `{1,2,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Dmaj7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Dsus4** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **D7sus4** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **D7** | (♯7 ♯3 omit5) | 2 | 多重变换 |
| 5 | **Dmaj7#5** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **DM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Gsus4** | (♯4) | 3 | avoid note / 双变化 |
| 8 | **D+** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **D** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **P°** | (♭♭3) | 4 | avoid note / 双变化 |

## P-D-Y  `{1,2,8}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Dmaj7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 2 | **D7sus4** | (♯7 ♯4 omit5) | 2 | 多重变换 |
| 3 | **Yb5** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **Psus2** | (♭2) | 3 | avoid note / 双变化 |
| 5 | **Ysus4** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Dsus4** | (♯4 omit5 add7) | 3.5 | avoid note / 双变化 |
| 7 | **Dmaj7#5** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 8 | **Y°** | (♯♯3) | 4 | avoid note / 双变化 |
| 9 | **Yadd11** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **DM7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## P-D-A  `{1,2,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Aadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **A+** | (omit5 add4) | 0.5 | 自然扩展(色彩音) |
| 3 | **Ab5** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Amadd11** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **A** | (♭♭5) | 4 | avoid note / 双变化 |
| 6 | **A°** | (♯3 ♭5) | 6 | avoid note / 双变化 |
| 7 | **Psus2** | (♭2 ♯5) | 6 | avoid note / 双变化 |
| 8 | **Pm** | (♭♭3 ♯5) | 7 | avoid note / 双变化 |
| 9 | **Am** | (♯3 ♭♭5) | 7 | avoid note / 双变化 |
| 10 | **P°** | (♭♭3 ♯♯5) | 8 | avoid note / 双变化 |

## P-D-Z  `{1,2,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Zm** | (omit5 add3) | 0.5 | 自然扩展(色彩音) |
| 2 | **Z+** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 3 | **Z** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 4 | **Zadd9** | (♯9 omit5) | 3 | avoid note / 双变化 |
| 5 | **Zmadd11** | (♭11 omit5) | 3 | avoid note / 双变化 |
| 6 | **Z°** | (♭♭5) | 4 | avoid note / 双变化 |
| 7 | **P°7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 8 | **Zadd11** | (♭♭11 omit5) | 4 | avoid note / 双变化 |
| 9 | **Pmadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Zmadd9** | (♯♯9 omit5) | 4 | avoid note / 双变化 |

## P-D-B  `{1,2,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Bmadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **B°** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 3 | **Bm** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **P7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 5 | **Pmaj7sus2** | (♭2 ♭7 omit5) | 2 | 多重变换 |
| 6 | **Badd9** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Bsus2** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **Pø** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Pm7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Bsus4** | (♭♭4 omit5 add2) | 4.5 | avoid note / 双变化 |

## P-Q-E  `{1,3,4}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Pmadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **P°** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 3 | **Pm** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **Q7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 5 | **Qmaj7sus2** | (♭7 ♭2 omit5) | 2 | 多重变换 |
| 6 | **Padd9** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Psus2** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **Qø** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Qm7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Psus4** | (♭♭4 omit5 add2) | 4.5 | avoid note / 双变化 |

## P-Q-F  `{1,3,5}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Q7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Padd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **P+** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **P** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 5 | **Qmaj7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Qø** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Pmadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Qm7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Qsus2** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Pm** | (♭3 omit5 add3) | 3.5 | avoid note / 双变化 |

## P-Q-X  `{1,3,6}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Qø** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Qm7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Psus4** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **Q7** | (♭3 omit5) | 1 | 属七变化(张力) |
| 5 | **Q7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 6 | **Qmaj7sus2** | (♭7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **Q°** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **Q°7** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Padd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Qm** | (omit5 add♯6) | 3 | avoid note / 双变化 |

## P-Q-G  `{1,3,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Q7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Q7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 3 | **Qmaj7sus4** | (♭7 ♭4 omit5) | 2 | 多重变换 |
| 4 | **Qmaj7#5** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 5 | **P°** | (♭3) | 3 | avoid note / 双变化 |
| 6 | **Qø** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Q** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **Qadd6** | (♯6 omit5) | 3 | avoid note / 双变化 |
| 9 | **QM7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 10 | **Qm7** | (♯3 omit5) | 3 | avoid note / 双变化 |

## P-Q-Y  `{1,3,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Q7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Psus2** | — | 0 | 零变换 |
| 3 | **Ysus4** | — | 0 | 零变换 |
| 4 | **Q7** | (♯3 omit5) | 1 | 属七变化(张力) |
| 5 | **Qmaj7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Y** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Pm** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Qsus4** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 9 | **Qø** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **P** | (♭♭3) | 4 | avoid note / 双变化 |

## P-Q-A  `{1,3,9}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Ab5** | — | 0 | 零变换 |
| 2 | **Q7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 3 | **Qmaj7sus4** | (♭7 ♯4 omit5) | 2 | 多重变换 |
| 4 | **A°** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **A** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Aadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 7 | **Psus2** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **P+** | (♭♭3) | 4 | avoid note / 双变化 |
| 9 | **A+** | (♭♭5) | 4 | avoid note / 双变化 |
| 10 | **Q7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## P-Q-Z  `{1,3,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Zmadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Z°** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **P°7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 4 | **Zadd11** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Pmadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Zsus4** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 7 | **Z+** | (♭3 omit5 add4) | 3.5 | avoid note / 双变化 |
| 8 | **P°** | (♭3 omit5 add6) | 3.5 | avoid note / 双变化 |
| 9 | **Padd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Pmaj7sus2** | (♭♭7 omit5) | 4 | avoid note / 双变化 |

## P-Q-B  `{1,3,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **P7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Badd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **B+** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **B** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 5 | **Pmaj7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Pø** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Bmadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Pm7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Psus2** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Bm** | (♭3 omit5 add3) | 3.5 | avoid note / 双变化 |

## P-E-F  `{1,4,5}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Pm** | (omit5 add3) | 0.5 | 自然扩展(色彩音) |
| 2 | **E7sus2** | (♭7 ♭2 omit5) | 2 | 多重变换 |
| 3 | **P+** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 4 | **P** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 5 | **Padd9** | (♯9 omit5) | 3 | avoid note / 双变化 |
| 6 | **Pmadd11** | (♭11 omit5) | 3 | avoid note / 双变化 |
| 7 | **P°** | (♭♭5) | 4 | avoid note / 双变化 |
| 8 | **E°7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Padd11** | (♭♭11 omit5) | 4 | avoid note / 双变化 |
| 10 | **Emadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## P-E-X  `{1,4,6}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Pmadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **E7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 3 | **P°** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **E°7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Padd11** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Emadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Psus4** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **P+** | (♭3 omit5 add4) | 3.5 | avoid note / 双变化 |
| 9 | **E°** | (♭3 omit5 add6) | 3.5 | avoid note / 双变化 |
| 10 | **Eadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## P-E-G  `{1,4,7}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **P°** | — | 0 | 零变换 |
| 2 | **E°7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Emadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 4 | **E°** | (omit5 add6) | 0.5 | 自然扩展(色彩音) |
| 5 | **E7** | (♭7 ♭3 omit5) | 2 | 多重变换 |
| 6 | **E7sus2** | (♭7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **Eø** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 8 | **Eadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Pb5** | (♭3) | 3 | avoid note / 双变化 |
| 10 | **Pm** | (♭5) | 3 | avoid note / 双变化 |

## P-E-Y  `{1,4,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Eadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Pm** | — | 0 | 零变换 |
| 3 | **E7** | (♭7 omit5) | 1 | 属七变化(张力) |
| 4 | **E7sus4** | (♭7 ♭4 omit5) | 2 | 多重变换 |
| 5 | **E+** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Y+** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **P°** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **E°7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **P** | (♭3) | 3 | avoid note / 双变化 |
| 10 | **Emadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |

## P-E-A  `{1,4,9}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **A** | — | 0 | 零变换 |
| 2 | **E7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 3 | **E7** | (♭7 ♯3 omit5) | 2 | 多重变换 |
| 4 | **P+** | (♭3) | 3 | avoid note / 双变化 |
| 5 | **A+** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Eadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Ab5** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **Pm** | (♯5) | 3 | avoid note / 双变化 |
| 9 | **Am** | (♯3) | 3 | avoid note / 双变化 |
| 10 | **Asus4** | (♭4) | 3 | avoid note / 双变化 |

## P-E-Z  `{1,4,10}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Z°** | — | 0 | 零变换 |
| 2 | **P°7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Pmadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 4 | **P°** | (omit5 add6) | 0.5 | 自然扩展(色彩音) |
| 5 | **E7sus4** | (♭7 ♯4 omit5) | 2 | 多重变换 |
| 6 | **Pø** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 7 | **Padd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Zb5** | (♭3) | 3 | avoid note / 双变化 |
| 9 | **Zm** | (♭5) | 3 | avoid note / 双变化 |
| 10 | **Zmadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |

## P-E-B  `{1,4,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Pø** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Pm7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Bsus4** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **P7** | (♭3 omit5) | 1 | 属七变化(张力) |
| 5 | **P7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 6 | **Pmaj7sus2** | (♯2 ♭7 omit5) | 2 | 多重变换 |
| 7 | **P°** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **P°7** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Badd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Pm** | (omit5 add♯6) | 3 | avoid note / 双变化 |

## P-F-X  `{1,5,6}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Padd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **P+** | (omit5 add4) | 0.5 | 自然扩展(色彩音) |
| 3 | **Pb5** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Pmadd11** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **P** | (♭♭5) | 4 | avoid note / 双变化 |
| 6 | **P°** | (♯3 ♭5) | 6 | avoid note / 双变化 |
| 7 | **Fsus2** | (♯5 ♭2) | 6 | avoid note / 双变化 |
| 8 | **F°7** | (♭7 ♭♭3 omit5) | 7 | avoid note / 双变化 |
| 9 | **Pm** | (♯3 ♭♭5) | 7 | avoid note / 双变化 |
| 10 | **Fm** | (♯5 ♭♭3) | 7 | avoid note / 双变化 |

## P-F-G  `{1,5,7}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Pb5** | — | 0 | 零变换 |
| 2 | **G7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 3 | **Gmaj7sus4** | (♯4 ♭7 omit5) | 2 | 多重变换 |
| 4 | **P°** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **P** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Padd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 7 | **Fsus2** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **P+** | (♭♭5) | 4 | avoid note / 双变化 |
| 9 | **F+** | (♭♭3) | 4 | avoid note / 双变化 |
| 10 | **F°7** | (♭7 ♭3 omit5) | 6 | avoid note / 双变化 |

## P-F-Y  `{1,5,8}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **P** | — | 0 | 零变换 |
| 2 | **P+** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **F+** | (♭3) | 3 | avoid note / 双变化 |
| 4 | **F°7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 5 | **Yadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Pb5** | (♯5) | 3 | avoid note / 双变化 |
| 7 | **Pm** | (♯3) | 3 | avoid note / 双变化 |
| 8 | **Fm** | (♯5) | 3 | avoid note / 双变化 |
| 9 | **Psus4** | (♭4) | 3 | avoid note / 双变化 |
| 10 | **F°** | (♯♯5) | 4 | avoid note / 双变化 |

## P-F-A  `{1,5,9}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **P+** | — | 0 | 零变换 |
| 2 | **F+** | — | 0 | 零变换 |
| 3 | **A+** | — | 0 | 零变换 |
| 4 | **P** | (♯5) | 3 | avoid note / 双变化 |
| 5 | **F** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **A** | (♯5) | 3 | avoid note / 双变化 |
| 7 | **Pb5** | (♯♯5) | 4 | avoid note / 双变化 |
| 8 | **Fb5** | (♯♯5) | 4 | avoid note / 双变化 |
| 9 | **Ab5** | (♯♯5) | 4 | avoid note / 双变化 |
| 10 | **F°7** | (♭7 ♯3 omit5) | 6 | avoid note / 双变化 |

## P-F-Z  `{1,5,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Padd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Zm** | — | 0 | 零变换 |
| 3 | **P+** | (♯5) | 3 | avoid note / 双变化 |
| 4 | **F+** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **Z°** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **P°7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Z** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Pmadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Zsus2** | (♯2) | 3 | avoid note / 双变化 |
| 10 | **Fsus4** | (♯5) | 3 | avoid note / 双变化 |

## P-F-B  `{1,5,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **P7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **P7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 3 | **Pmaj7sus4** | (♭4 ♭7 omit5) | 2 | 多重变换 |
| 4 | **Pmaj7#5** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 5 | **B°** | (♭3) | 3 | avoid note / 双变化 |
| 6 | **Pø** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **P** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **Padd6** | (♯6 omit5) | 3 | avoid note / 双变化 |
| 9 | **PM7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 10 | **Pm7** | (♯3 omit5) | 3 | avoid note / 双变化 |

## P-X-G  `{1,6,7}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Gmaj7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 2 | **G7sus4** | (♯4 ♯7 omit5) | 2 | 多重变换 |
| 3 | **Pb5** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **Xsus2** | (♭2) | 3 | avoid note / 双变化 |
| 5 | **Psus4** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Gsus4** | (♯4 omit5 add7) | 3.5 | avoid note / 双变化 |
| 7 | **P°** | (♯♯3) | 4 | avoid note / 双变化 |
| 8 | **Padd11** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Xm** | (♭♭3) | 4 | avoid note / 双变化 |
| 10 | **P** | (♯3 ♭5) | 6 | avoid note / 双变化 |

## P-X-Y  `{1,6,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Y7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Xsus2** | — | 0 | 零变换 |
| 3 | **Psus4** | — | 0 | 零变换 |
| 4 | **Y7** | (♯3 omit5) | 1 | 属七变化(张力) |
| 5 | **Ymaj7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **P** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Xm** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Ysus4** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 9 | **X** | (♭♭3) | 4 | avoid note / 双变化 |
| 10 | **Pm** | (♯♯3) | 4 | avoid note / 双变化 |

## P-X-A  `{1,6,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Aadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Xm** | — | 0 | 零变换 |
| 3 | **P+** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **A+** | (♯5) | 3 | avoid note / 双变化 |
| 5 | **X°** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **A°7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **X** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Amadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Xsus2** | (♯2) | 3 | avoid note / 双变化 |
| 10 | **Psus4** | (♯5) | 3 | avoid note / 双变化 |

## P-X-Z  `{1,6,10}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **X** | — | 0 | 零变换 |
| 2 | **X+** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **Z+** | (♭3) | 3 | avoid note / 双变化 |
| 4 | **Padd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Xb5** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Xm** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Zm** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **Xsus4** | (♭4) | 3 | avoid note / 双变化 |
| 9 | **Z°** | (♯♯5) | 4 | avoid note / 双变化 |
| 10 | **P°7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## P-X-B  `{1,6,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **P7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Bsus2** | — | 0 | 零变换 |
| 3 | **Xsus4** | — | 0 | 零变换 |
| 4 | **P7** | (♯3 omit5) | 1 | 属七变化(张力) |
| 5 | **Pmaj7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **X** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Bm** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Psus4** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 9 | **Pø** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **B** | (♭♭3) | 4 | avoid note / 双变化 |

## P-G-Y  `{1,7,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Ymaj7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Ysus4** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Y7sus4** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **Y7** | (♯3 ♯7 omit5) | 2 | 多重变换 |
| 5 | **Ymaj7#5** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **YM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Psus4** | (♯4) | 3 | avoid note / 双变化 |
| 8 | **Y+** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Y** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **G°** | (♭♭3) | 4 | avoid note / 双变化 |

## P-G-A  `{1,7,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **A7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **A7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 3 | **Amaj7sus4** | (♭4 ♭7 omit5) | 2 | 多重变换 |
| 4 | **G°** | (♭3) | 3 | avoid note / 双变化 |
| 5 | **Aø** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **A** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 7 | **Aadd6** | (♯6 omit5) | 3 | avoid note / 双变化 |
| 8 | **AM7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Am7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Gsus2** | (♭5) | 3 | avoid note / 双变化 |

## P-G-Z  `{1,7,10}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **G°** | — | 0 | 零变换 |
| 2 | **Z°7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Zmadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 4 | **Z°** | (omit5 add6) | 0.5 | 自然扩展(色彩音) |
| 5 | **Zø** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 6 | **Zadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Gb5** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Gm** | (♭5) | 3 | avoid note / 双变化 |
| 9 | **Gmadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 10 | **Padd6** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## P-G-B  `{1,7,11}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Gb5** | — | 0 | 零变换 |
| 2 | **P7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 3 | **Pmaj7sus4** | (♯4 ♭7 omit5) | 2 | 多重变换 |
| 4 | **G°** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **G** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Gadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 7 | **Bsus2** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **G+** | (♭♭5) | 4 | avoid note / 双变化 |
| 9 | **B+** | (♭♭3) | 4 | avoid note / 双变化 |
| 10 | **P7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## P-Y-A  `{1,8,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Amaj7#5** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **AM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **A+** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **A** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 5 | **A7** | (♯7 omit5) | 1 | 属七变化(张力) |
| 6 | **Amaj7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 7 | **A7sus4** | (♭4 ♯7 omit5) | 2 | 多重变换 |
| 8 | **AmM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Ysus4** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 10 | **A°** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |

## P-Y-Z  `{1,8,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Zø** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Zm7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Ysus4** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **Z7** | (♭3 omit5) | 1 | 属七变化(张力) |
| 5 | **Z7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 6 | **Zmaj7sus2** | (♯2 ♭7 omit5) | 2 | 多重变换 |
| 7 | **Z°** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **Z°7** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Yadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Zm** | (omit5 add♯6) | 3 | avoid note / 双变化 |

## P-Y-B  `{1,8,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Ymadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Y°** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **B°7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 4 | **Yadd11** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Bmadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Ysus4** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 7 | **B°** | (♭3 omit5 add6) | 3.5 | avoid note / 双变化 |
| 8 | **Badd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Ym** | (♭♭5) | 4 | avoid note / 双变化 |
| 10 | **Bsus2** | (♯♯5) | 4 | avoid note / 双变化 |

## P-A-Z  `{1,9,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **ZmM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Z°** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Zm** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Zmaj7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 5 | **Z7** | (♭3 ♯7 omit5) | 2 | 多重变换 |
| 6 | **Z7sus2** | (♯2 ♯7 omit5) | 2 | 多重变换 |
| 7 | **A+** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 8 | **Zmaj7#5** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Zø** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 10 | **A** | (omit5 add♯1) | 3 | avoid note / 双变化 |

## P-A-B  `{1,9,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **B7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Aadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **A+** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **A** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 5 | **Bmaj7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Bø** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Amadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Bm7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Bsus2** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **A°** | (♯3 omit5 add2) | 3.5 | avoid note / 双变化 |

## P-Z-B  `{1,10,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Bmaj7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Bsus2** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **B7sus2** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **Z°** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 5 | **Zm** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 6 | **Zmadd9** | (♭9 omit5) | 3 | avoid note / 双变化 |
| 7 | **BmM7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **B°** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Bm** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Bmaj7#5** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## D-Q-E  `{2,3,4}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Qmaj7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 2 | **Q7sus2** | (♯7 ♭2 omit5) | 2 | 多重变换 |
| 3 | **Dsus2** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 4 | **Qsus2** | (♭2 omit5 add7) | 3.5 | avoid note / 双变化 |
| 5 | **Dmadd9** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 6 | **QmM7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 7 | **D°** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 8 | **Q°** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 9 | **Dm** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 10 | **Qm** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |

## D-Q-F  `{2,3,5}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Qmaj7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Qsus2** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Q7sus2** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **D°** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 5 | **Dm** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 6 | **Dmadd9** | (♭9 omit5) | 3 | avoid note / 双变化 |
| 7 | **QmM7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Q°** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Qm** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Qmaj7#5** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## D-Q-X  `{2,3,6}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **QmM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Q°** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Qm** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Qmaj7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 5 | **Q7** | (♯7 ♭3 omit5) | 2 | 多重变换 |
| 6 | **Q7sus2** | (♯7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **D+** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 8 | **Qmaj7#5** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Qø** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 10 | **D** | (omit5 add♯1) | 3 | avoid note / 双变化 |

## D-Q-G  `{2,3,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Qmaj7#5** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **QM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Q+** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Q** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 5 | **Q7** | (♯7 omit5) | 1 | 属七变化(张力) |
| 6 | **Qmaj7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 7 | **Q7sus4** | (♯7 ♭4 omit5) | 2 | 多重变换 |
| 8 | **QmM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Dsus4** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 10 | **Q°** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |

## D-Q-Y  `{2,3,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Qmaj7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Qsus4** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Q7sus4** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **Q7** | (♯7 ♯3 omit5) | 2 | 多重变换 |
| 5 | **Qmaj7#5** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **QM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Ysus4** | (♯4) | 3 | avoid note / 双变化 |
| 8 | **Q+** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Q** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **D°** | (♭♭3) | 4 | avoid note / 双变化 |

## D-Q-A  `{2,3,9}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Qmaj7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 2 | **Q7sus4** | (♯7 ♯4 omit5) | 2 | 多重变换 |
| 3 | **Ab5** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **Dsus2** | (♭2) | 3 | avoid note / 双变化 |
| 5 | **Asus4** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Qsus4** | (♯4 omit5 add7) | 3.5 | avoid note / 双变化 |
| 7 | **Qmaj7#5** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 8 | **A°** | (♯♯3) | 4 | avoid note / 双变化 |
| 9 | **Aadd11** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **QM7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## D-Q-Z  `{2,3,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Zadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Z+** | (omit5 add4) | 0.5 | 自然扩展(色彩音) |
| 3 | **Zb5** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Zmadd11** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Z** | (♭♭5) | 4 | avoid note / 双变化 |
| 6 | **D7sus2** | (♭2 ♭♭7 omit5) | 5 | avoid note / 双变化 |
| 7 | **Z°** | (♯3 ♭5) | 6 | avoid note / 双变化 |
| 8 | **Dsus2** | (♭2 ♯5) | 6 | avoid note / 双变化 |
| 9 | **Dm** | (♭♭3 ♯5) | 7 | avoid note / 双变化 |
| 10 | **Zm** | (♯3 ♭♭5) | 7 | avoid note / 双变化 |

## D-Q-B  `{2,3,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Bm** | (omit5 add3) | 0.5 | 自然扩展(色彩音) |
| 2 | **D7sus2** | (♭2 ♭7 omit5) | 2 | 多重变换 |
| 3 | **B+** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 4 | **B** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 5 | **Badd9** | (♯9 omit5) | 3 | avoid note / 双变化 |
| 6 | **Bmadd11** | (♭11 omit5) | 3 | avoid note / 双变化 |
| 7 | **B°** | (♭♭5) | 4 | avoid note / 双变化 |
| 8 | **D°7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Badd11** | (♭♭11 omit5) | 4 | avoid note / 双变化 |
| 10 | **Dmadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## D-E-F  `{2,4,5}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Dmadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **D°** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 3 | **Dm** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **E7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 5 | **Emaj7sus2** | (♭7 ♭2 omit5) | 2 | 多重变换 |
| 6 | **Dadd9** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Dsus2** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **Eø** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Em7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Dsus4** | (♭♭4 omit5 add2) | 4.5 | avoid note / 双变化 |

## D-E-X  `{2,4,6}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **E7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Dadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **D+** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **D** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 5 | **Emaj7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Eø** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Dmadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Em7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Esus2** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Dm** | (♭3 omit5 add3) | 3.5 | avoid note / 双变化 |

## D-E-G  `{2,4,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Eø** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Em7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Dsus4** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **E7** | (♭3 omit5) | 1 | 属七变化(张力) |
| 5 | **E7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 6 | **Emaj7sus2** | (♭7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **E°** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **E°7** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Dadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Em** | (omit5 add♯6) | 3 | avoid note / 双变化 |

## D-E-Y  `{2,4,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **E7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **E7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 3 | **Emaj7sus4** | (♭7 ♭4 omit5) | 2 | 多重变换 |
| 4 | **D°** | (♭3) | 3 | avoid note / 双变化 |
| 5 | **Eø** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **E** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 7 | **Eadd6** | (♯6 omit5) | 3 | avoid note / 双变化 |
| 8 | **EM7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Em7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Dsus2** | (♭5) | 3 | avoid note / 双变化 |

## D-E-A  `{2,4,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **E7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Dsus2** | — | 0 | 零变换 |
| 3 | **Asus4** | — | 0 | 零变换 |
| 4 | **E7** | (♯3 omit5) | 1 | 属七变化(张力) |
| 5 | **Emaj7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **A** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Dm** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Esus4** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 9 | **Eø** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **D** | (♭♭3) | 4 | avoid note / 双变化 |

## D-E-Z  `{2,4,10}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Zb5** | — | 0 | 零变换 |
| 2 | **E7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 3 | **Emaj7sus4** | (♭7 ♯4 omit5) | 2 | 多重变换 |
| 4 | **Z°** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **Z** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Zadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 7 | **Dsus2** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **D+** | (♭♭3) | 4 | avoid note / 双变化 |
| 9 | **Z+** | (♭♭5) | 4 | avoid note / 双变化 |
| 10 | **E7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## D-E-B  `{2,4,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Bmadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **D7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 3 | **B°** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **D°7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Badd11** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Dmadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Bsus4** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **B+** | (♭3 omit5 add4) | 3.5 | avoid note / 双变化 |
| 9 | **D°** | (♭3 omit5 add6) | 3.5 | avoid note / 双变化 |
| 10 | **Dadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## D-F-X  `{2,5,6}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Dm** | (omit5 add3) | 0.5 | 自然扩展(色彩音) |
| 2 | **D+** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 3 | **D** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 4 | **Dadd9** | (♯9 omit5) | 3 | avoid note / 双变化 |
| 5 | **Dmadd11** | (♭11 omit5) | 3 | avoid note / 双变化 |
| 6 | **D°** | (♭♭5) | 4 | avoid note / 双变化 |
| 7 | **F°7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 8 | **Dadd11** | (♭♭11 omit5) | 4 | avoid note / 双变化 |
| 9 | **Fmadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Dmadd9** | (♯♯9 omit5) | 4 | avoid note / 双变化 |

## D-F-G  `{2,5,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Dmadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **D°** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **F°7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 4 | **Dadd11** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Fmadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Dsus4** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 7 | **D+** | (♭3 omit5 add4) | 3.5 | avoid note / 双变化 |
| 8 | **F°** | (♭3 omit5 add6) | 3.5 | avoid note / 双变化 |
| 9 | **Fadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Dm** | (♭♭5) | 4 | avoid note / 双变化 |

## D-F-Y  `{2,5,8}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **D°** | — | 0 | 零变换 |
| 2 | **F°7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Fmadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 4 | **F°** | (omit5 add6) | 0.5 | 自然扩展(色彩音) |
| 5 | **Fø** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 6 | **Fadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Db5** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Dm** | (♭5) | 3 | avoid note / 双变化 |
| 9 | **Dmadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 10 | **Yadd6** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## D-F-A  `{2,5,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Fadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Dm** | — | 0 | 零变换 |
| 3 | **F+** | (♯5) | 3 | avoid note / 双变化 |
| 4 | **A+** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **D°** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **F°7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **D** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Fmadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Dsus2** | (♯2) | 3 | avoid note / 双变化 |
| 10 | **Asus4** | (♯5) | 3 | avoid note / 双变化 |

## D-F-Z  `{2,5,10}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Z** | — | 0 | 零变换 |
| 2 | **D+** | (♭3) | 3 | avoid note / 双变化 |
| 3 | **Z+** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Zb5** | (♯5) | 3 | avoid note / 双变化 |
| 5 | **Dm** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Zm** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Zsus4** | (♭4) | 3 | avoid note / 双变化 |
| 8 | **D°** | (♯♯5) | 4 | avoid note / 双变化 |
| 9 | **F°7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Dø** | (♭♭7 omit5) | 4 | avoid note / 双变化 |

## D-F-B  `{2,5,11}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **B°** | — | 0 | 零变换 |
| 2 | **D°7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Dmadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 4 | **D°** | (omit5 add6) | 0.5 | 自然扩展(色彩音) |
| 5 | **D7** | (♭3 ♭7 omit5) | 2 | 多重变换 |
| 6 | **D7sus2** | (♯2 ♭7 omit5) | 2 | 多重变换 |
| 7 | **Dø** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 8 | **Dadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Bb5** | (♭3) | 3 | avoid note / 双变化 |
| 10 | **Bm** | (♭5) | 3 | avoid note / 双变化 |

## D-X-G  `{2,6,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Dadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **D+** | (omit5 add4) | 0.5 | 自然扩展(色彩音) |
| 3 | **Db5** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Dmadd11** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **D** | (♭♭5) | 4 | avoid note / 双变化 |
| 6 | **D°** | (♯3 ♭5) | 6 | avoid note / 双变化 |
| 7 | **Xsus2** | (♯5 ♭2) | 6 | avoid note / 双变化 |
| 8 | **Dm** | (♯3 ♭♭5) | 7 | avoid note / 双变化 |
| 9 | **Xm** | (♯5 ♭♭3) | 7 | avoid note / 双变化 |
| 10 | **X°** | (♯♯5 ♭♭3) | 8 | avoid note / 双变化 |

## D-X-Y  `{2,6,8}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Db5** | — | 0 | 零变换 |
| 2 | **Y7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 3 | **Ymaj7sus4** | (♯4 ♭7 omit5) | 2 | 多重变换 |
| 4 | **D°** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **D** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Dadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 7 | **Xsus2** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **D+** | (♭♭5) | 4 | avoid note / 双变化 |
| 9 | **X+** | (♭♭3) | 4 | avoid note / 双变化 |
| 10 | **Y7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## D-X-A  `{2,6,9}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **D** | — | 0 | 零变换 |
| 2 | **D+** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **X+** | (♭3) | 3 | avoid note / 双变化 |
| 4 | **Aadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Db5** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Dm** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Xm** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **Dsus4** | (♭4) | 3 | avoid note / 双变化 |
| 9 | **X°** | (♯♯5) | 4 | avoid note / 双变化 |
| 10 | **A°7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## D-X-Z  `{2,6,10}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **D+** | — | 0 | 零变换 |
| 2 | **X+** | — | 0 | 零变换 |
| 3 | **Z+** | — | 0 | 零变换 |
| 4 | **D** | (♯5) | 3 | avoid note / 双变化 |
| 5 | **X** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Z** | (♯5) | 3 | avoid note / 双变化 |
| 7 | **D7** | (♭♭7 omit5) | 4 | avoid note / 双变化 |
| 8 | **Db5** | (♯♯5) | 4 | avoid note / 双变化 |
| 9 | **Xb5** | (♯♯5) | 4 | avoid note / 双变化 |
| 10 | **Zb5** | (♯♯5) | 4 | avoid note / 双变化 |

## D-X-B  `{2,6,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Dadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Bm** | — | 0 | 零变换 |
| 3 | **D7** | (♭7 omit5) | 1 | 属七变化(张力) |
| 4 | **D7sus4** | (♭4 ♭7 omit5) | 2 | 多重变换 |
| 5 | **D+** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **X+** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **B°** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **D°7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **B** | (♭3) | 3 | avoid note / 双变化 |
| 10 | **Dmadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |

## D-G-Y  `{2,7,8}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Ymaj7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 2 | **Y7sus4** | (♯4 ♯7 omit5) | 2 | 多重变换 |
| 3 | **Db5** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **Gsus2** | (♭2) | 3 | avoid note / 双变化 |
| 5 | **Dsus4** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Ysus4** | (♯4 omit5 add7) | 3.5 | avoid note / 双变化 |
| 7 | **Ymaj7#5** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 8 | **D°** | (♯♯3) | 4 | avoid note / 双变化 |
| 9 | **Dadd11** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **YM7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## D-G-A  `{2,7,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **A7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Gsus2** | — | 0 | 零变换 |
| 3 | **Dsus4** | — | 0 | 零变换 |
| 4 | **A7** | (♯3 omit5) | 1 | 属七变化(张力) |
| 5 | **Amaj7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **D** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Gm** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Asus4** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 9 | **Aø** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **G** | (♭♭3) | 4 | avoid note / 双变化 |

## D-G-Z  `{2,7,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Zadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Gm** | — | 0 | 零变换 |
| 3 | **D+** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **Z+** | (♯5) | 3 | avoid note / 双变化 |
| 5 | **G°** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Z°7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **G** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Zmadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Gsus2** | (♯2) | 3 | avoid note / 双变化 |
| 10 | **Dsus4** | (♯5) | 3 | avoid note / 双变化 |

## D-G-B  `{2,7,11}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **G** | — | 0 | 零变换 |
| 2 | **D7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 3 | **D7** | (♯3 ♭7 omit5) | 2 | 多重变换 |
| 4 | **G+** | (♭5) | 3 | avoid note / 双变化 |
| 5 | **B+** | (♭3) | 3 | avoid note / 双变化 |
| 6 | **Dadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Gb5** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **Gm** | (♯3) | 3 | avoid note / 双变化 |
| 9 | **Bm** | (♯5) | 3 | avoid note / 双变化 |
| 10 | **Gsus4** | (♭4) | 3 | avoid note / 双变化 |

## D-Y-A  `{2,8,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Amaj7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Asus4** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **A7sus4** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **A7** | (♯3 ♯7 omit5) | 2 | 多重变换 |
| 5 | **Amaj7#5** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **AM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Dsus4** | (♯4) | 3 | avoid note / 双变化 |
| 8 | **A+** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **A** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Y°** | (♭♭3) | 4 | avoid note / 双变化 |

## D-Y-Z  `{2,8,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Z7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Z7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 3 | **Zmaj7sus4** | (♭4 ♭7 omit5) | 2 | 多重变换 |
| 4 | **Y°** | (♭3) | 3 | avoid note / 双变化 |
| 5 | **Zø** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Z** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 7 | **Zadd6** | (♯6 omit5) | 3 | avoid note / 双变化 |
| 8 | **ZM7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Zm7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Ysus2** | (♭5) | 3 | avoid note / 双变化 |

## D-Y-B  `{2,8,11}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Y°** | — | 0 | 零变换 |
| 2 | **B°7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Bmadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 4 | **B°** | (omit5 add6) | 0.5 | 自然扩展(色彩音) |
| 5 | **D7sus4** | (♯4 ♭7 omit5) | 2 | 多重变换 |
| 6 | **Bø** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 7 | **Badd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Yb5** | (♭3) | 3 | avoid note / 双变化 |
| 9 | **Ym** | (♭5) | 3 | avoid note / 双变化 |
| 10 | **Ymadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |

## D-A-Z  `{2,9,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Zmaj7#5** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **ZM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Z+** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Z** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 5 | **Z7** | (♯7 omit5) | 1 | 属七变化(张力) |
| 6 | **Zmaj7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 7 | **Z7sus4** | (♭4 ♯7 omit5) | 2 | 多重变换 |
| 8 | **ZmM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Asus4** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 10 | **Z°** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |

## D-A-B  `{2,9,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Bø** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Bm7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Asus4** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **B7** | (♭3 omit5) | 1 | 属七变化(张力) |
| 5 | **B7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 6 | **Bmaj7sus2** | (♯2 ♭7 omit5) | 2 | 多重变换 |
| 7 | **B°** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **B°7** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Aadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Bm** | (omit5 add♯6) | 3 | avoid note / 双变化 |

## D-Z-B  `{2,10,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **BmM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **B°** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Bm** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Bmaj7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 5 | **B7** | (♭3 ♯7 omit5) | 2 | 多重变换 |
| 6 | **B7sus2** | (♯2 ♯7 omit5) | 2 | 多重变换 |
| 7 | **Z+** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 8 | **Bmaj7#5** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Bø** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 10 | **Z** | (omit5 add♯1) | 3 | avoid note / 双变化 |

## Q-E-F  `{3,4,5}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Emaj7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 2 | **E7sus2** | (♯7 ♭2 omit5) | 2 | 多重变换 |
| 3 | **Qsus2** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 4 | **Esus2** | (♭2 omit5 add7) | 3.5 | avoid note / 双变化 |
| 5 | **Qmadd9** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 6 | **EmM7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 7 | **Q°** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 8 | **E°** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 9 | **Qm** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 10 | **Em** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |

## Q-E-X  `{3,4,6}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Emaj7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Esus2** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **E7sus2** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **Q°** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 5 | **Qm** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 6 | **Qmadd9** | (♭9 omit5) | 3 | avoid note / 双变化 |
| 7 | **EmM7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **E°** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Em** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Emaj7#5** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## Q-E-G  `{3,4,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **EmM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **E°** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Em** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Emaj7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 5 | **E7** | (♯7 ♭3 omit5) | 2 | 多重变换 |
| 6 | **E7sus2** | (♯7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **Q+** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 8 | **Emaj7#5** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Eø** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 10 | **Q** | (omit5 add♯1) | 3 | avoid note / 双变化 |

## Q-E-Y  `{3,4,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Emaj7#5** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **EM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **E+** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **E** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 5 | **E7** | (♯7 omit5) | 1 | 属七变化(张力) |
| 6 | **Emaj7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 7 | **E7sus4** | (♯7 ♭4 omit5) | 2 | 多重变换 |
| 8 | **EmM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Qsus4** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 10 | **E°** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |

## Q-E-A  `{3,4,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Emaj7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Esus4** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **E7sus4** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **E7** | (♯7 ♯3 omit5) | 2 | 多重变换 |
| 5 | **Emaj7#5** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **EM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Asus4** | (♯4) | 3 | avoid note / 双变化 |
| 8 | **E+** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **E** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Q°** | (♭♭3) | 4 | avoid note / 双变化 |

## Q-E-Z  `{3,4,10}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Emaj7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 2 | **E7sus4** | (♯7 ♯4 omit5) | 2 | 多重变换 |
| 3 | **Zb5** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **Qsus2** | (♭2) | 3 | avoid note / 双变化 |
| 5 | **Zsus4** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Esus4** | (♯4 omit5 add7) | 3.5 | avoid note / 双变化 |
| 7 | **Z°** | (♯♯3) | 4 | avoid note / 双变化 |
| 8 | **Zadd11** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 9 | **EM7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Qm** | (♭♭3) | 4 | avoid note / 双变化 |

## Q-E-B  `{3,4,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Badd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **B+** | (omit5 add4) | 0.5 | 自然扩展(色彩音) |
| 3 | **Bb5** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Bmadd11** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **B** | (♭♭5) | 4 | avoid note / 双变化 |
| 6 | **Q7sus2** | (♭2 ♭♭7 omit5) | 5 | avoid note / 双变化 |
| 7 | **B°** | (♯3 ♭5) | 6 | avoid note / 双变化 |
| 8 | **Qsus2** | (♭2 ♯5) | 6 | avoid note / 双变化 |
| 9 | **Q°7** | (♭♭3 ♭7 omit5) | 7 | avoid note / 双变化 |
| 10 | **Qm** | (♭♭3 ♯5) | 7 | avoid note / 双变化 |

## Q-F-X  `{3,5,6}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Qmadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Q°** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 3 | **Qm** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **F7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 5 | **Fmaj7sus2** | (♭7 ♭2 omit5) | 2 | 多重变换 |
| 6 | **Qadd9** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Qsus2** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **Fø** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Fm7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Qsus4** | (♭♭4 omit5 add2) | 4.5 | avoid note / 双变化 |

## Q-F-G  `{3,5,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **F7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Qadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Q+** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **Q** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 5 | **Fmaj7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Fø** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Qmadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Fm7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Fsus2** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Qm** | (♭3 omit5 add3) | 3.5 | avoid note / 双变化 |

## Q-F-Y  `{3,5,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Fø** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Fm7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Qsus4** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **F7** | (♭3 omit5) | 1 | 属七变化(张力) |
| 5 | **F7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 6 | **Fmaj7sus2** | (♭7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **F°** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **F°7** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Qadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Fm** | (omit5 add♯6) | 3 | avoid note / 双变化 |

## Q-F-A  `{3,5,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **F7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **F7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 3 | **Fmaj7sus4** | (♭7 ♭4 omit5) | 2 | 多重变换 |
| 4 | **Q°** | (♭3) | 3 | avoid note / 双变化 |
| 5 | **Fø** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **F** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 7 | **Fadd6** | (♯6 omit5) | 3 | avoid note / 双变化 |
| 8 | **FM7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Fm7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Qsus2** | (♭5) | 3 | avoid note / 双变化 |

## Q-F-Z  `{3,5,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **F7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Qsus2** | — | 0 | 零变换 |
| 3 | **Zsus4** | — | 0 | 零变换 |
| 4 | **Fmaj7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 5 | **Z** | (♯3) | 3 | avoid note / 双变化 |
| 6 | **Qm** | (♭3) | 3 | avoid note / 双变化 |
| 7 | **Fsus4** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **Fø** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Q** | (♭♭3) | 4 | avoid note / 双变化 |
| 10 | **Zm** | (♯♯3) | 4 | avoid note / 双变化 |

## Q-F-B  `{3,5,11}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Bb5** | — | 0 | 零变换 |
| 2 | **B°** | (♯3) | 3 | avoid note / 双变化 |
| 3 | **B** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Badd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 5 | **Qsus2** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Q+** | (♭♭3) | 4 | avoid note / 双变化 |
| 7 | **B+** | (♭♭5) | 4 | avoid note / 双变化 |
| 8 | **Q7sus2** | (♭♭7 omit5) | 4 | avoid note / 双变化 |
| 9 | **Q°7** | (♭3 ♭7 omit5) | 6 | avoid note / 双变化 |
| 10 | **Qm** | (♭3 ♯5) | 6 | avoid note / 双变化 |

## Q-X-G  `{3,6,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Qm** | (omit5 add3) | 0.5 | 自然扩展(色彩音) |
| 2 | **Q+** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 3 | **Q** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 4 | **Qadd9** | (♯9 omit5) | 3 | avoid note / 双变化 |
| 5 | **Qmadd11** | (♭11 omit5) | 3 | avoid note / 双变化 |
| 6 | **Q°** | (♭♭5) | 4 | avoid note / 双变化 |
| 7 | **X°7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 8 | **Qadd11** | (♭♭11 omit5) | 4 | avoid note / 双变化 |
| 9 | **Xmadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Qmadd9** | (♯♯9 omit5) | 4 | avoid note / 双变化 |

## Q-X-Y  `{3,6,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Qmadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Q°** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **X°7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 4 | **Qadd11** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Xmadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Qsus4** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 7 | **Q+** | (♭3 omit5 add4) | 3.5 | avoid note / 双变化 |
| 8 | **X°** | (♭3 omit5 add6) | 3.5 | avoid note / 双变化 |
| 9 | **Xadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Qm** | (♭♭5) | 4 | avoid note / 双变化 |

## Q-X-A  `{3,6,9}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Q°** | — | 0 | 零变换 |
| 2 | **X°7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Xmadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 4 | **X°** | (omit5 add6) | 0.5 | 自然扩展(色彩音) |
| 5 | **Xø** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 6 | **Xadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Qb5** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Qm** | (♭5) | 3 | avoid note / 双变化 |
| 9 | **Qmadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 10 | **Aadd6** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## Q-X-Z  `{3,6,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Xadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Qm** | — | 0 | 零变换 |
| 3 | **X+** | (♯5) | 3 | avoid note / 双变化 |
| 4 | **Z+** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **Q°** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Q** | (♭3) | 3 | avoid note / 双变化 |
| 7 | **Xmadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Qsus2** | (♯2) | 3 | avoid note / 双变化 |
| 9 | **Zsus4** | (♯5) | 3 | avoid note / 双变化 |
| 10 | **Q°7** | (♭♭7 omit5) | 4 | avoid note / 双变化 |

## Q-X-B  `{3,6,11}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **B** | — | 0 | 零变换 |
| 2 | **Q+** | (♭3) | 3 | avoid note / 双变化 |
| 3 | **B+** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Q°7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 5 | **Bb5** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Qm** | (♯5) | 3 | avoid note / 双变化 |
| 7 | **Bm** | (♯3) | 3 | avoid note / 双变化 |
| 8 | **Qmadd6** | (♭6 omit5) | 3 | avoid note / 双变化 |
| 9 | **Bsus4** | (♭4) | 3 | avoid note / 双变化 |
| 10 | **Q°** | (♯♯5) | 4 | avoid note / 双变化 |

## Q-G-Y  `{3,7,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Qadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Q+** | (omit5 add4) | 0.5 | 自然扩展(色彩音) |
| 3 | **Qb5** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Qmadd11** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Q** | (♭♭5) | 4 | avoid note / 双变化 |
| 6 | **Q°** | (♯3 ♭5) | 6 | avoid note / 双变化 |
| 7 | **Gsus2** | (♯5 ♭2) | 6 | avoid note / 双变化 |
| 8 | **Qm** | (♯3 ♭♭5) | 7 | avoid note / 双变化 |
| 9 | **Gm** | (♯5 ♭♭3) | 7 | avoid note / 双变化 |
| 10 | **G°** | (♯♯5 ♭♭3) | 8 | avoid note / 双变化 |

## Q-G-A  `{3,7,9}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Qb5** | — | 0 | 零变换 |
| 2 | **A7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 3 | **Amaj7sus4** | (♯4 ♭7 omit5) | 2 | 多重变换 |
| 4 | **Q°** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **Q** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Qadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 7 | **Gsus2** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **Q+** | (♭♭5) | 4 | avoid note / 双变化 |
| 9 | **G+** | (♭♭3) | 4 | avoid note / 双变化 |
| 10 | **A7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## Q-G-Z  `{3,7,10}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Q** | — | 0 | 零变换 |
| 2 | **Q+** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **G+** | (♭3) | 3 | avoid note / 双变化 |
| 4 | **Zadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Qb5** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Qm** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Gm** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **Qsus4** | (♭4) | 3 | avoid note / 双变化 |
| 9 | **G°** | (♯♯5) | 4 | avoid note / 双变化 |
| 10 | **Z°7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## Q-G-B  `{3,7,11}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Q+** | — | 0 | 零变换 |
| 2 | **G+** | — | 0 | 零变换 |
| 3 | **B+** | — | 0 | 零变换 |
| 4 | **Q** | (♯5) | 3 | avoid note / 双变化 |
| 5 | **G** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **B** | (♯5) | 3 | avoid note / 双变化 |
| 7 | **Qadd6** | (♭6 omit5) | 3 | avoid note / 双变化 |
| 8 | **Q7** | (♭♭7 omit5) | 4 | avoid note / 双变化 |
| 9 | **Qb5** | (♯♯5) | 4 | avoid note / 双变化 |
| 10 | **Gb5** | (♯♯5) | 4 | avoid note / 双变化 |

## Q-Y-A  `{3,8,9}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Amaj7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 2 | **A7sus4** | (♯4 ♯7 omit5) | 2 | 多重变换 |
| 3 | **Qb5** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **Ysus2** | (♭2) | 3 | avoid note / 双变化 |
| 5 | **Qsus4** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Asus4** | (♯4 omit5 add7) | 3.5 | avoid note / 双变化 |
| 7 | **Amaj7#5** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 8 | **Q°** | (♯♯3) | 4 | avoid note / 双变化 |
| 9 | **Qadd11** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **AM7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## Q-Y-Z  `{3,8,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Z7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Ysus2** | — | 0 | 零变换 |
| 3 | **Qsus4** | — | 0 | 零变换 |
| 4 | **Z7** | (♯3 omit5) | 1 | 属七变化(张力) |
| 5 | **Zmaj7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Q** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Ym** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Zsus4** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 9 | **Zø** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Y** | (♭♭3) | 4 | avoid note / 双变化 |

## Q-Y-B  `{3,8,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Badd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Ym** | — | 0 | 零变换 |
| 3 | **Q+** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **B+** | (♯5) | 3 | avoid note / 双变化 |
| 5 | **Y°** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **B°7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Y** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Bmadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Ysus2** | (♯2) | 3 | avoid note / 双变化 |
| 10 | **Qsus4** | (♯5) | 3 | avoid note / 双变化 |

## Q-A-Z  `{3,9,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Zmaj7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Zsus4** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Z7sus4** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **Z7** | (♯3 ♯7 omit5) | 2 | 多重变换 |
| 5 | **Zmaj7#5** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **ZM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Qsus4** | (♯4) | 3 | avoid note / 双变化 |
| 8 | **Z+** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Z** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **A°** | (♭♭3) | 4 | avoid note / 双变化 |

## Q-A-B  `{3,9,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **B7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **B7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 3 | **Bmaj7sus4** | (♭4 ♭7 omit5) | 2 | 多重变换 |
| 4 | **A°** | (♭3) | 3 | avoid note / 双变化 |
| 5 | **Bø** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **B** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 7 | **Badd6** | (♯6 omit5) | 3 | avoid note / 双变化 |
| 8 | **BM7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Bm7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Asus2** | (♭5) | 3 | avoid note / 双变化 |

## Q-Z-B  `{3,10,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Bmaj7#5** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **BM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **B+** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **B** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 5 | **B7** | (♯7 omit5) | 1 | 属七变化(张力) |
| 6 | **Bmaj7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 7 | **B7sus4** | (♭4 ♯7 omit5) | 2 | 多重变换 |
| 8 | **BmM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Zsus4** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 10 | **B°** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |

## E-F-X  `{4,5,6}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Fmaj7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 2 | **F7sus2** | (♯7 ♭2 omit5) | 2 | 多重变换 |
| 3 | **Esus2** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 4 | **Fsus2** | (♭2 omit5 add7) | 3.5 | avoid note / 双变化 |
| 5 | **Emadd9** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 6 | **FmM7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 7 | **E°** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 8 | **F°** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 9 | **Em** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 10 | **Fm** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |

## E-F-G  `{4,5,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Fmaj7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Fsus2** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **F7sus2** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **E°** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 5 | **Em** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 6 | **Emadd9** | (♭9 omit5) | 3 | avoid note / 双变化 |
| 7 | **FmM7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **F°** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Fm** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Fmaj7#5** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## E-F-Y  `{4,5,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **FmM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **F°** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Fm** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Fmaj7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 5 | **F7** | (♯7 ♭3 omit5) | 2 | 多重变换 |
| 6 | **F7sus2** | (♯7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **E+** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 8 | **Fmaj7#5** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Fø** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 10 | **E** | (omit5 add♯1) | 3 | avoid note / 双变化 |

## E-F-A  `{4,5,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Fmaj7#5** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **FM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **F+** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **F** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 5 | **F7** | (♯7 omit5) | 1 | 属七变化(张力) |
| 6 | **Fmaj7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 7 | **F7sus4** | (♯7 ♭4 omit5) | 2 | 多重变换 |
| 8 | **FmM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Esus4** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 10 | **F°** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |

## E-F-Z  `{4,5,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Fmaj7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Fsus4** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **F7sus4** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **Fmaj7#5** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Zsus4** | (♯4) | 3 | avoid note / 双变化 |
| 6 | **F+** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 7 | **E°** | (♭♭3) | 4 | avoid note / 双变化 |
| 8 | **Z** | (♯♯3) | 4 | avoid note / 双变化 |
| 9 | **F°** | (♯♯3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 10 | **Esus2** | (♭2 ♭5) | 6 | avoid note / 双变化 |

## E-F-B  `{4,5,11}`

**最佳解释:🔴 复杂(avoid note/双变化)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Bb5** | (♯3) | 3 | avoid note / 双变化 |
| 2 | **Esus2** | (♭2) | 3 | avoid note / 双变化 |
| 3 | **Bsus4** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **B°** | (♯♯3) | 4 | avoid note / 双变化 |
| 5 | **Badd11** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 6 | **Em** | (♭♭3) | 4 | avoid note / 双变化 |
| 7 | **B** | (♯3 ♭5) | 6 | avoid note / 双变化 |
| 8 | **B+** | (♯3 ♭♭5) | 7 | avoid note / 双变化 |
| 9 | **E°** | (♭♭3 ♯5) | 7 | avoid note / 双变化 |
| 10 | **Bm** | (♯♯3 ♭5) | 7 | avoid note / 双变化 |

## E-X-G  `{4,6,7}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Emadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **E°** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 3 | **Em** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **X7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 5 | **Xmaj7sus2** | (♭7 ♭2 omit5) | 2 | 多重变换 |
| 6 | **Eadd9** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Esus2** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **Xø** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Xm7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Esus4** | (♭♭4 omit5 add2) | 4.5 | avoid note / 双变化 |

## E-X-Y  `{4,6,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **X7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Eadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **E+** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **E** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 5 | **Xmaj7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Xø** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Emadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Xm7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Xsus2** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Em** | (♭3 omit5 add3) | 3.5 | avoid note / 双变化 |

## E-X-A  `{4,6,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Xø** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Xm7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Esus4** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **X7** | (♭3 omit5) | 1 | 属七变化(张力) |
| 5 | **X7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 6 | **Xmaj7sus2** | (♭7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **X°** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **X°7** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Eadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 10 | **Xm** | (omit5 add♯6) | 3 | avoid note / 双变化 |

## E-X-Z  `{4,6,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **X7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **X7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 3 | **Xmaj7sus4** | (♭7 ♭4 omit5) | 2 | 多重变换 |
| 4 | **E°** | (♭3) | 3 | avoid note / 双变化 |
| 5 | **X** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 6 | **Xadd6** | (♯6 omit5) | 3 | avoid note / 双变化 |
| 7 | **XM7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 8 | **Xm7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Esus2** | (♭5) | 3 | avoid note / 双变化 |
| 10 | **Esus4** | (♯4 omit5 add2) | 3.5 | avoid note / 双变化 |

## E-X-B  `{4,6,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **X7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Esus2** | — | 0 | 零变换 |
| 3 | **Bsus4** | — | 0 | 零变换 |
| 4 | **Xmaj7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 5 | **B** | (♯3) | 3 | avoid note / 双变化 |
| 6 | **Em** | (♭3) | 3 | avoid note / 双变化 |
| 7 | **Xsus4** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **E** | (♭♭3) | 4 | avoid note / 双变化 |
| 9 | **Bm** | (♯♯3) | 4 | avoid note / 双变化 |
| 10 | **B+** | (♯3 ♭5) | 6 | avoid note / 双变化 |

## E-G-Y  `{4,7,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Em** | (omit5 add3) | 0.5 | 自然扩展(色彩音) |
| 2 | **E+** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 3 | **E** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 4 | **Eadd9** | (♯9 omit5) | 3 | avoid note / 双变化 |
| 5 | **Emadd11** | (♭11 omit5) | 3 | avoid note / 双变化 |
| 6 | **E°** | (♭♭5) | 4 | avoid note / 双变化 |
| 7 | **G°7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 8 | **Eadd11** | (♭♭11 omit5) | 4 | avoid note / 双变化 |
| 9 | **Gmadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Emadd9** | (♯♯9 omit5) | 4 | avoid note / 双变化 |

## E-G-A  `{4,7,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Emadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **E°** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **G°7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 4 | **Eadd11** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Gmadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Esus4** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 7 | **E+** | (♭3 omit5 add4) | 3.5 | avoid note / 双变化 |
| 8 | **G°** | (♭3 omit5 add6) | 3.5 | avoid note / 双变化 |
| 9 | **Gadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Em** | (♭♭5) | 4 | avoid note / 双变化 |

## E-G-Z  `{4,7,10}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **E°** | — | 0 | 零变换 |
| 2 | **G°7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Gmadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 4 | **G°** | (omit5 add6) | 0.5 | 自然扩展(色彩音) |
| 5 | **Gø** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 6 | **Gadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Eb5** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Em** | (♭5) | 3 | avoid note / 双变化 |
| 9 | **Emadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 10 | **Zadd6** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## E-G-B  `{4,7,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Gadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Em** | — | 0 | 零变换 |
| 3 | **G+** | (♯5) | 3 | avoid note / 双变化 |
| 4 | **B+** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **E°** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **E** | (♭3) | 3 | avoid note / 双变化 |
| 7 | **Gmadd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Esus2** | (♯2) | 3 | avoid note / 双变化 |
| 9 | **Bsus4** | (♯5) | 3 | avoid note / 双变化 |
| 10 | **E°7** | (♭♭7 omit5) | 4 | avoid note / 双变化 |

## E-Y-A  `{4,8,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Eadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **E+** | (omit5 add4) | 0.5 | 自然扩展(色彩音) |
| 3 | **Eb5** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Emadd11** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **E** | (♭♭5) | 4 | avoid note / 双变化 |
| 6 | **E°** | (♯3 ♭5) | 6 | avoid note / 双变化 |
| 7 | **Ysus2** | (♯5 ♭2) | 6 | avoid note / 双变化 |
| 8 | **Em** | (♯3 ♭♭5) | 7 | avoid note / 双变化 |
| 9 | **Ym** | (♯5 ♭♭3) | 7 | avoid note / 双变化 |
| 10 | **Y°** | (♯♯5 ♭♭3) | 8 | avoid note / 双变化 |

## E-Y-Z  `{4,8,10}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Eb5** | — | 0 | 零变换 |
| 2 | **Z7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 3 | **Zmaj7sus4** | (♯4 ♭7 omit5) | 2 | 多重变换 |
| 4 | **E°** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **E** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Eadd11** | (♯11 omit5) | 3 | avoid note / 双变化 |
| 7 | **Ysus2** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **E+** | (♭♭5) | 4 | avoid note / 双变化 |
| 9 | **Y+** | (♭♭3) | 4 | avoid note / 双变化 |
| 10 | **Z7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## E-Y-B  `{4,8,11}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **E** | — | 0 | 零变换 |
| 2 | **E+** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **Y+** | (♭3) | 3 | avoid note / 双变化 |
| 4 | **Badd6** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Eb5** | (♯5) | 3 | avoid note / 双变化 |
| 6 | **Em** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Ym** | (♯5) | 3 | avoid note / 双变化 |
| 8 | **Esus4** | (♭4) | 3 | avoid note / 双变化 |
| 9 | **Y°** | (♯♯5) | 4 | avoid note / 双变化 |
| 10 | **B°7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## E-A-Z  `{4,9,10}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Zmaj7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 2 | **Z7sus4** | (♯4 ♯7 omit5) | 2 | 多重变换 |
| 3 | **Eb5** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **Asus2** | (♭2) | 3 | avoid note / 双变化 |
| 5 | **Esus4** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Zsus4** | (♯4 omit5 add7) | 3.5 | avoid note / 双变化 |
| 7 | **Zmaj7#5** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 8 | **E°** | (♯♯3) | 4 | avoid note / 双变化 |
| 9 | **Eadd11** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **ZM7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |

## E-A-B  `{4,9,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **B7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Asus2** | — | 0 | 零变换 |
| 3 | **Esus4** | — | 0 | 零变换 |
| 4 | **B7** | (♯3 omit5) | 1 | 属七变化(张力) |
| 5 | **Bmaj7sus4** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **E** | (♯3) | 3 | avoid note / 双变化 |
| 7 | **Am** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Bsus4** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 9 | **Bø** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **A** | (♭♭3) | 4 | avoid note / 双变化 |

## E-Z-B  `{4,10,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Bmaj7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Bsus4** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **B7sus4** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **B7** | (♯3 ♯7 omit5) | 2 | 多重变换 |
| 5 | **Bmaj7#5** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 6 | **BM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Esus4** | (♯4) | 3 | avoid note / 双变化 |
| 8 | **B+** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **B** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Z°** | (♭♭3) | 4 | avoid note / 双变化 |

## F-X-G  `{5,6,7}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Xmaj7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 2 | **X7sus2** | (♯7 ♭2 omit5) | 2 | 多重变换 |
| 3 | **Fsus2** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 4 | **Xsus2** | (♭2 omit5 add7) | 3.5 | avoid note / 双变化 |
| 5 | **Fmadd9** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 6 | **XmM7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 7 | **F°** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 8 | **X°** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 9 | **Fm** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 10 | **Xm** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |

## F-X-Y  `{5,6,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Xmaj7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Xsus2** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **X7sus2** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **F°** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 5 | **Fm** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 6 | **Fmadd9** | (♭9 omit5) | 3 | avoid note / 双变化 |
| 7 | **XmM7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **X°** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Xm** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Xmaj7#5** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## F-X-A  `{5,6,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **XmM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **X°** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Xm** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Xmaj7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 5 | **X7** | (♯7 ♭3 omit5) | 2 | 多重变换 |
| 6 | **X7sus2** | (♯7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **F+** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 8 | **Xmaj7#5** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Xø** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 10 | **F** | (omit5 add♯1) | 3 | avoid note / 双变化 |

## F-X-Z  `{5,6,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Xmaj7#5** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **XM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **X+** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **X** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 5 | **X7** | (♯7 omit5) | 1 | 属七变化(张力) |
| 6 | **Xmaj7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 7 | **X7sus4** | (♯7 ♭4 omit5) | 2 | 多重变换 |
| 8 | **XmM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Fsus4** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 10 | **Xm** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |

## F-X-B  `{5,6,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Xmaj7sus4** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Xsus4** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **X7sus4** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **Xmaj7#5** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Bsus4** | (♯4) | 3 | avoid note / 双变化 |
| 6 | **X+** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 7 | **F°** | (♭♭3) | 4 | avoid note / 双变化 |
| 8 | **B** | (♯♯3) | 4 | avoid note / 双变化 |
| 9 | **Fsus2** | (♭2 ♭5) | 6 | avoid note / 双变化 |
| 10 | **B+** | (♯♯3 ♭5) | 7 | avoid note / 双变化 |

## F-G-Y  `{5,7,8}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Fmadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **F°** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 3 | **Fm** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **G7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 5 | **Gmaj7sus2** | (♭7 ♭2 omit5) | 2 | 多重变换 |
| 6 | **Fadd9** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Fsus2** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **Gø** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Gm7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Fsus4** | (♭♭4 omit5 add2) | 4.5 | avoid note / 双变化 |

## F-G-A  `{5,7,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **G7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Fadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **F+** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **F** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 5 | **Gmaj7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Gø** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Fmadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Gm7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Gsus2** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Fm** | (♭3 omit5 add3) | 3.5 | avoid note / 双变化 |

## F-G-Z  `{5,7,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Gø** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Gm7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Fsus4** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **G7** | (♭3 omit5) | 1 | 属七变化(张力) |
| 5 | **G7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 6 | **Gmaj7sus2** | (♭7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **G°** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **G°7** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Gm** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Fmadd11** | (♭3 omit5) | 3 | avoid note / 双变化 |

## F-G-B  `{5,7,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **G7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **G7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 3 | **Gmaj7sus4** | (♭7 ♭4 omit5) | 2 | 多重变换 |
| 4 | **F°** | (♭3) | 3 | avoid note / 双变化 |
| 5 | **G** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 6 | **Gadd6** | (♯6 omit5) | 3 | avoid note / 双变化 |
| 7 | **GM7** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 8 | **Gm7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Fsus2** | (♭5) | 3 | avoid note / 双变化 |
| 10 | **G+** | (♯♯5) | 4 | avoid note / 双变化 |

## F-Y-A  `{5,8,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Fm** | (omit5 add3) | 0.5 | 自然扩展(色彩音) |
| 2 | **F+** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 3 | **F** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 4 | **Fadd9** | (♯9 omit5) | 3 | avoid note / 双变化 |
| 5 | **Fmadd11** | (♭11 omit5) | 3 | avoid note / 双变化 |
| 6 | **F°** | (♭♭5) | 4 | avoid note / 双变化 |
| 7 | **Y°7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 8 | **Fadd11** | (♭♭11 omit5) | 4 | avoid note / 双变化 |
| 9 | **Ymadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Fmadd9** | (♯♯9 omit5) | 4 | avoid note / 双变化 |

## F-Y-Z  `{5,8,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Fmadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **F°** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **Y°7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 4 | **Fadd11** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Ymadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Fsus4** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 7 | **F+** | (♭3 omit5 add4) | 3.5 | avoid note / 双变化 |
| 8 | **Y°** | (♭3 omit5 add6) | 3.5 | avoid note / 双变化 |
| 9 | **Yadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Fm** | (♭♭5) | 4 | avoid note / 双变化 |

## F-Y-B  `{5,8,11}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **F°** | — | 0 | 零变换 |
| 2 | **Y°7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Ymadd6** | (omit5) | 0 | 纯 omit(预期行为) |
| 4 | **Y°** | (omit5 add6) | 0.5 | 自然扩展(色彩音) |
| 5 | **Yø** | (♭7 omit5) | 3 | avoid note / 双变化 |
| 6 | **Yadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Fb5** | (♭3) | 3 | avoid note / 双变化 |
| 8 | **Fm** | (♭5) | 3 | avoid note / 双变化 |
| 9 | **Badd6** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Ym** | (♯♯5) | 4 | avoid note / 双变化 |

## F-A-Z  `{5,9,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Fadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **F+** | (omit5 add4) | 0.5 | 自然扩展(色彩音) |
| 3 | **Fb5** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Fmadd11** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **F** | (♭♭5) | 4 | avoid note / 双变化 |
| 6 | **F°** | (♯3 ♭5) | 6 | avoid note / 双变化 |
| 7 | **Asus2** | (♯5 ♭2) | 6 | avoid note / 双变化 |
| 8 | **Fm** | (♯3 ♭♭5) | 7 | avoid note / 双变化 |
| 9 | **Am** | (♯5 ♭♭3) | 7 | avoid note / 双变化 |
| 10 | **A°** | (♯♯5 ♭♭3) | 8 | avoid note / 双变化 |

## F-A-B  `{5,9,11}`

**最佳解释:✅ 完全匹配**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Fb5** | — | 0 | 零变换 |
| 2 | **B7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 3 | **Bmaj7sus4** | (♯4 ♭7 omit5) | 2 | 多重变换 |
| 4 | **F°** | (♯3) | 3 | avoid note / 双变化 |
| 5 | **F** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Asus2** | (♯5) | 3 | avoid note / 双变化 |
| 7 | **F+** | (♭♭5) | 4 | avoid note / 双变化 |
| 8 | **A+** | (♭♭3) | 4 | avoid note / 双变化 |
| 9 | **B7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Fm** | (♯3 ♭5) | 6 | avoid note / 双变化 |

## F-Z-B  `{5,10,11}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Bmaj7sus4** | (♯4 omit5) | 1 | 属七变化(张力) |
| 2 | **B7sus4** | (♯4 ♯7 omit5) | 2 | 多重变换 |
| 3 | **Fb5** | (♯3) | 3 | avoid note / 双变化 |
| 4 | **Zsus2** | (♭2) | 3 | avoid note / 双变化 |
| 5 | **Fsus4** | (♭5) | 3 | avoid note / 双变化 |
| 6 | **Bsus4** | (♯4 omit5 add7) | 3.5 | avoid note / 双变化 |
| 7 | **Bmaj7#5** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 8 | **F°** | (♯♯3) | 4 | avoid note / 双变化 |
| 9 | **BM7** | (♯♯3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Zm** | (♭♭3) | 4 | avoid note / 双变化 |

## X-G-Y  `{6,7,8}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Gmaj7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 2 | **G7sus2** | (♯7 ♭2 omit5) | 2 | 多重变换 |
| 3 | **Xsus2** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 4 | **Gsus2** | (♭2 omit5 add7) | 3.5 | avoid note / 双变化 |
| 5 | **Xmadd9** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 6 | **GmM7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 7 | **X°** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 8 | **G°** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 9 | **Xm** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 10 | **Gm** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |

## X-G-A  `{6,7,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Gmaj7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Gsus2** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **G7sus2** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **X°** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 5 | **Xm** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 6 | **Xmadd9** | (♭9 omit5) | 3 | avoid note / 双变化 |
| 7 | **GmM7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **G°** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Gm** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Gmaj7#5** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## X-G-Z  `{6,7,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **GmM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **G°** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Gm** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Gmaj7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 5 | **G7** | (♯7 ♭3 omit5) | 2 | 多重变换 |
| 6 | **G7sus2** | (♯7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **X+** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 8 | **Gmaj7#5** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Gø** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 10 | **X** | (omit5 add♯1) | 3 | avoid note / 双变化 |

## X-G-B  `{6,7,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Gmaj7#5** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **GM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **G+** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **G** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 5 | **G7** | (♯7 omit5) | 1 | 属七变化(张力) |
| 6 | **Gmaj7sus4** | (♭4 omit5) | 1 | 属七变化(张力) |
| 7 | **G7sus4** | (♯7 ♭4 omit5) | 2 | 多重变换 |
| 8 | **GmM7** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Xsus4** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 10 | **Gm** | (♯3 omit5 add7) | 3.5 | avoid note / 双变化 |

## X-Y-A  `{6,8,9}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Xmadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **X°** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 3 | **Xm** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **Y7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 5 | **Ymaj7sus2** | (♭7 ♭2 omit5) | 2 | 多重变换 |
| 6 | **Xadd9** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Xsus2** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **Yø** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Ym7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Xsus4** | (♭♭4 omit5 add2) | 4.5 | avoid note / 双变化 |

## X-Y-Z  `{6,8,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Y7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Xadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **X+** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **X** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 5 | **Ymaj7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Yø** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Xmadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Ym7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Ysus2** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Xm** | (♭3 omit5 add3) | 3.5 | avoid note / 双变化 |

## X-Y-B  `{6,8,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Yø** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Ym7** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **Xsus4** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **Y7** | (♭3 omit5) | 1 | 属七变化(张力) |
| 5 | **Y7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 6 | **Ymaj7sus2** | (♭7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **Y°** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 8 | **Y°7** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 9 | **Ym** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Xmadd11** | (♭3 omit5) | 3 | avoid note / 双变化 |

## X-A-Z  `{6,9,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Xm** | (omit5 add3) | 0.5 | 自然扩展(色彩音) |
| 2 | **X+** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 3 | **X** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 4 | **Xadd9** | (♯9 omit5) | 3 | avoid note / 双变化 |
| 5 | **Xmadd11** | (♭11 omit5) | 3 | avoid note / 双变化 |
| 6 | **X°** | (♭♭5) | 4 | avoid note / 双变化 |
| 7 | **A°7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 8 | **Xadd11** | (♭♭11 omit5) | 4 | avoid note / 双变化 |
| 9 | **Amadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Xmadd9** | (♯♯9 omit5) | 4 | avoid note / 双变化 |

## X-A-B  `{6,9,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Xmadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **X°** | (♭5) | 3 | avoid note / 双变化 |
| 3 | **A°7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 4 | **Xadd11** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 5 | **Amadd6** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 6 | **Xsus4** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 7 | **X+** | (♭3 omit5 add4) | 3.5 | avoid note / 双变化 |
| 8 | **A°** | (♭3 omit5 add6) | 3.5 | avoid note / 双变化 |
| 9 | **Aadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Xm** | (♭♭5) | 4 | avoid note / 双变化 |

## X-Z-B  `{6,10,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Xadd11** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **X+** | (omit5 add4) | 0.5 | 自然扩展(色彩音) |
| 3 | **Xb5** | (♭5) | 3 | avoid note / 双变化 |
| 4 | **Xmadd11** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 5 | **X** | (♭♭5) | 4 | avoid note / 双变化 |
| 6 | **Zsus2** | (♯5 ♭2) | 6 | avoid note / 双变化 |
| 7 | **Xm** | (♯3 ♭♭5) | 7 | avoid note / 双变化 |
| 8 | **Zm** | (♯5 ♭♭3) | 7 | avoid note / 双变化 |
| 9 | **X°** | (♭♭5 ♯♯3) | 8 | avoid note / 双变化 |
| 10 | **Z°** | (♯♯5 ♭♭3) | 8 | avoid note / 双变化 |

## G-Y-A  `{7,8,9}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Ymaj7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 2 | **Y7sus2** | (♯7 ♭2 omit5) | 2 | 多重变换 |
| 3 | **Gsus2** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 4 | **Ysus2** | (♭2 omit5 add7) | 3.5 | avoid note / 双变化 |
| 5 | **Gmadd9** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 6 | **YmM7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 7 | **G°** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 8 | **Y°** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 9 | **Gm** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 10 | **Ym** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |

## G-Y-Z  `{7,8,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Ymaj7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Ysus2** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Y7sus2** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **G°** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 5 | **Gm** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 6 | **Gmadd9** | (♭9 omit5) | 3 | avoid note / 双变化 |
| 7 | **YmM7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Y°** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Ym** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Ymaj7#5** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## G-Y-B  `{7,8,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **YmM7** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Y°** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **Ym** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 4 | **Ymaj7sus2** | (♯2 omit5) | 1 | 属七变化(张力) |
| 5 | **Y7** | (♯7 ♭3 omit5) | 2 | 多重变换 |
| 6 | **Y7sus2** | (♯7 ♯2 omit5) | 2 | 多重变换 |
| 7 | **G+** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 8 | **Ymaj7#5** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Yø** | (♯7 omit5) | 3 | avoid note / 双变化 |
| 10 | **G** | (omit5 add♯1) | 3 | avoid note / 双变化 |

## G-A-Z  `{7,9,10}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Gmadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **G°** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 3 | **Gm** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **A7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 5 | **Amaj7sus2** | (♭7 ♭2 omit5) | 2 | 多重变换 |
| 6 | **Gadd9** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Gsus2** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **Aø** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Am7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Gsus4** | (♭♭4 omit5 add2) | 4.5 | avoid note / 双变化 |

## G-A-B  `{7,9,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **A7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Gadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 3 | **G+** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **G** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 5 | **Amaj7sus2** | (♭7 omit5) | 1 | 属七变化(张力) |
| 6 | **Aø** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Gmadd9** | (♯3 omit5) | 3 | avoid note / 双变化 |
| 8 | **Am7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 9 | **Asus2** | (omit5 add♯6) | 3 | avoid note / 双变化 |
| 10 | **Gm** | (♭3 omit5 add3) | 3.5 | avoid note / 双变化 |

## G-Z-B  `{7,10,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Gm** | (omit5 add3) | 0.5 | 自然扩展(色彩音) |
| 2 | **G+** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 3 | **G** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 4 | **Gadd9** | (♯9 omit5) | 3 | avoid note / 双变化 |
| 5 | **Gmadd11** | (♭11 omit5) | 3 | avoid note / 双变化 |
| 6 | **G°** | (♭♭5) | 4 | avoid note / 双变化 |
| 7 | **Z°7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 8 | **Gadd11** | (♭♭11 omit5) | 4 | avoid note / 双变化 |
| 9 | **Zmadd6** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Gmadd9** | (♯♯9 omit5) | 4 | avoid note / 双变化 |

## Y-A-Z  `{8,9,10}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Amaj7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 2 | **A7sus2** | (♯7 ♭2 omit5) | 2 | 多重变换 |
| 3 | **Ysus2** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 4 | **Asus2** | (♭2 omit5 add7) | 3.5 | avoid note / 双变化 |
| 5 | **Ymadd9** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 6 | **AmM7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 7 | **Y°** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 8 | **A°** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 9 | **Ym** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 10 | **Am** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |

## Y-A-B  `{8,9,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Amaj7sus2** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Asus2** | (omit5 add7) | 0.5 | 自然扩展(色彩音) |
| 3 | **A7sus2** | (♯7 omit5) | 1 | 属七变化(张力) |
| 4 | **Y°** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 5 | **Ym** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 6 | **Ymadd9** | (♭9 omit5) | 3 | avoid note / 双变化 |
| 7 | **AmM7** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 8 | **A°** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 9 | **Am** | (♭3 omit5 add7) | 3.5 | avoid note / 双变化 |
| 10 | **Amaj7#5** | (♭♭3 omit5) | 4 | avoid note / 双变化 |

## Y-Z-B  `{8,10,11}`

**最佳解释:🔵 简单(省略/扩展)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Ymadd9** | (omit5) | 0 | 纯 omit(预期行为) |
| 2 | **Y°** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 3 | **Ym** | (omit5 add2) | 0.5 | 自然扩展(色彩音) |
| 4 | **Z7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 5 | **Zmaj7sus2** | (♭7 ♭2 omit5) | 2 | 多重变换 |
| 6 | **Yadd9** | (♭3 omit5) | 3 | avoid note / 双变化 |
| 7 | **Ysus2** | (omit5 add♯2) | 3 | avoid note / 双变化 |
| 8 | **Zø** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 9 | **Zm7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 10 | **Ysus4** | (♭♭4 omit5 add2) | 4.5 | avoid note / 双变化 |

## A-Z-B  `{9,10,11}`

**最佳解释:🟡 合理(属七变化/组合变换)**

| # | 和弦 | 变换 | cost | 说明 |
|---|---|---|---|---|
| 1 | **Zmaj7sus2** | (♭2 omit5) | 1 | 属七变化(张力) |
| 2 | **Z7sus2** | (♯7 ♭2 omit5) | 2 | 多重变换 |
| 3 | **Asus2** | (omit5 add♯1) | 3 | avoid note / 双变化 |
| 4 | **Zsus2** | (♭2 omit5 add7) | 3.5 | avoid note / 双变化 |
| 5 | **Amadd9** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 6 | **ZmM7** | (♭♭3 omit5) | 4 | avoid note / 双变化 |
| 7 | **A°** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 8 | **Z°** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
| 9 | **Am** | (♭♭3 omit5 add2) | 4.5 | avoid note / 双变化 |
| 10 | **Zm** | (♭♭3 omit5 add7) | 4.5 | avoid note / 双变化 |
