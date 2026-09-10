// @ts-nocheck
/**
 * 全量构建入口(pretest/prebuild 的单进程实现)
 *
 * 背景:pretest 曾用 && 串联五个 npx tsx 子进程(pnpm 的 shell 包装层
 * 在长管道下把子进程输出缓冲进内存,实测 OOM 4GB——vitest 单跑正常、
 * 手动逐步跑全过,仅 pnpm 多命令链必挂)。改为本单入口:直接函数调用
 * 各生成器(零子进程零 shell),一个进程内顺序完成:
 *
 *   gen(定义表+实例表) → bake 3/4/5(三张哈希表) → verify(全量 round-trip)
 *
 * 运行: npx tsx ts-dev/build-all.ts(package.json 的 pretest/prebuild 调用)
 */
import { generateAll } from "./index"

// bake.ts 导出烘焙主流程(按 K 参数化);verify-hash 同理导出校验主流程。
// 这里以纯函数顺序调用取代子进程串联——不产生 shell/管道缓冲。
const runBake = async (k: number) => {
  const mod = await import("./decompose/bake")
  await mod.runBake(k)
}

const runVerify = async () => {
  const mod = await import("./decompose/verify-hash")
  await mod.runVerify()
}

const main = async () => {
  console.log("[build-all] gen:static-data")
  await generateAll()

  for (const k of [3, 4, 5]) {
    console.log(`[build-all] bake K=${k}`)
    await runBake(k)
  }

  console.log("[build-all] verify-hash")
  await runVerify()
  console.log("[build-all] 全部完成 ✓")
}

main()
