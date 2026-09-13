// @ts-nocheck
// import 路径大小写审计:逐条 import 按精确大小写核对真实文件。
// macOS/Windows 磁盘大小写不敏感,错写在本机能跑、上 Linux CI 必炸——这是本审计的存在理由。
// 规则:@别名表与 tsconfig paths 同步;目录 → index.ts;注释行不参与。
// 运行: npx tsx ts-dev/verify/checkImportCasing.ts   (CI 可挂)
import { readFileSync, existsSync } from "fs";
import { resolve, dirname, posix } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");

const alias: Record<string, string> = {
    "@music12": "src", "@note": "src/Note", "@interval": "src/Interval", "@scale": "src/Scale",
    "@chord": "src/Chord", "@chord-formula": "src/ChordFormula", "@scale-mode": "src/ScaleMode",
    "@circle-of-fifths": "src/CircleOfFifths", "@find": "src/Find", "@pianokey": "src/PianoKey",
    "@stave": "src/Stave", "@common": "src/common", "@factory": "src/factory",
    "@static-data": "static-data", "@web": "test/playground",
};

/** 精确大小写下 base 是否可解析(自身/.ts/.tsx/.json/.json5//index.*) */
const resolvesExact = (base: string): boolean =>
    [base, `${base}.ts`, `${base}.tsx`, `${base}.json`, `${base}.json5`, `${base}/index.ts`, `${base}/index.tsx`]
        .some(c => existsSync(c));

const EXT_RE = /\.(ts|tsx|js|jsx)$/;
const walk = (dir: string, out: string[] = []): string[] => {
    const fs = require("fs");
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = resolve(dir, e.name);
        if (e.isDirectory()) {
            if (["node_modules", "dist", "build", ".git"].includes(e.name)) continue;
            walk(p, out);
        } else if (EXT_RE.test(e.name)) out.push(p);
    }
    return out;
};

const files = [
    ...walk(resolve(ROOT, "src")),
    ...walk(resolve(ROOT, "test")),
    ...walk(resolve(ROOT, "ts-dev")),
];

let fails = 0;
let checked = 0;
for (const file of files) {
    const lines = readFileSync(file, "utf-8").split("\n");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith("*") || line.trim().startsWith("//")) continue; // 注释不查
        const m = line.match(/from\s+["']([^"']+)["']/);
        if (!m) continue;
        const imp = m[1];
        checked++;
        let base: string;
        if (imp.startsWith(".")) {
            base = posix.normalize(posix.join(posix.dirname(file.slice(ROOT.length + 1)), imp));
        } else if (imp.startsWith("@")) {
            const [head, ...rest] = imp.split("/");
            base = posix.join(alias[head] ?? head, rest.join("/"));
            if (!alias[head]) { console.log(`  ? 未知别名 ${imp}(${file})`); continue; }
        } else continue; // npm 包
        if (!resolvesExact(resolve(ROOT, base))) {
            fails++;
            console.log(`  ✗ ${file.slice(ROOT.length + 1)}:${i + 1}  "${imp}" → ${base}(精确大小写不存在)`);
        }
    }
}

console.log(`import 大小写审计:${files.length} 文件 / ${checked} 条 import,精确大小写失败 ${fails} 处`);
if (fails > 0) process.exit(1);
console.log("全部精确匹配 ✓ Linux CI 安全");
