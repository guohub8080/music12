import { toPairs, keys } from "lodash"
import { SCALE_MODE, SCALE_MODE_IDS, SCALE_MODE_GROUPS, type T_ScaleModeId } from "@find/index"
import { useState } from "react"

const PIANO_KEY_NAMES = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"]

// 调式族显示名称
const GROUP_NAMES: Record<string, string> = {
	DIATONIC: "自然大调族",
	HARMONIC_MAJOR: "和声大调",
	MELODIC_MAJOR: "旋律大调",
	HARMONIC_MINOR: "和声小调族",
	MELODIC_MINOR: "旋律小调族",
	DOUBLE_HARMONIC: "双重和声调式族",
	CHINESE_PENTATONIC: "中国五声调式",
	CHINESE_YAYUE: "中国雅乐七声调式",
	CHINESE_QINGYUE: "中国清乐七声调式",
	CHINESE_YANYUE: "中国燕乐七声调式",
}

const ScaleModeTypesTest = () => {
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
	const [selectedMode, setSelectedMode] = useState<T_ScaleModeId | ""> ("")
	const [copied, setCopied] = useState<string | null>(null)

	// 获取当前显示的调式列表
	const displayModes = selectedGroup
		? SCALE_MODE_GROUPS[selectedGroup as keyof typeof SCALE_MODE_GROUPS]
		: SCALE_MODE_IDS

	// 复制到剪贴板
	const copyToClipboard = (text: string, key: string) => {
		navigator.clipboard.writeText(text)
		setCopied(key)
		setTimeout(() => setCopied(null), 1500)
	}

	// 生成代码示例
	const generateImportExample = (modeId: T_ScaleModeId) => {
		return `import { findNoteDegreeInAllScales, SCALE_MODE } from "@find/index"

// 方式一：使用 SCALE_MODE 对象（推荐）
const results = findNoteDegreeInAllScales(4, {
  scaleModeIds: [SCALE_MODE.${modeId}],
  includeRoot: false,
})

// 方式二：直接使用字符串
const results2 = findNoteDegreeInAllScales(4, {
  scaleModeIds: ["${modeId}"],
  includeRoot: false,
})`
	}

	return (
		<div style={{ padding: 20, maxWidth: 1400, margin: "0 auto" }}>
			<h1>Scale Mode Types 测试</h1>
			<p style={{ color: "#666", marginBottom: 20 }}>
				调式 ID 类型系统 - 自动推导所有可用的调式
			</p>

			{/* 统计信息 */}
			<div style={{ marginBottom: 20, padding: 16, background: "#e8f4fd", borderRadius: 8 }}>
				<strong>统计：</strong> 共{" "}
				<strong style={{ color: "#007bff" }}>{SCALE_MODE_IDS.length}</strong> 个调式，
				<strong style={{ color: "#007bff" }}>{keys(SCALE_MODE_GROUPS).length}</strong> 个调式族
			</div>

			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
				{/* 左侧：调式族选择 */}
				<div>
					<h3 style={{ marginTop: 0, marginBottom: 12 }}>调式族</h3>
					<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
						<button
							onClick={() => setSelectedGroup(null)}
							style={{
								padding: "10px 16px",
								background: selectedGroup === null ? "#007bff" : "#f8f9fa",
								color: selectedGroup === null ? "#fff" : "#333",
								border: "1px solid #ccc",
								borderRadius: 6,
								cursor: "pointer",
								textAlign: "left",
								fontSize: 14,
							}}
						>
							<strong>全部</strong> ({SCALE_MODE_IDS.length})
						</button>
						{toPairs(SCALE_MODE_GROUPS).map(([groupKey, modes]) => (
							<button
								key={groupKey}
								onClick={() => setSelectedGroup(groupKey)}
								style={{
									padding: "10px 16px",
									background: selectedGroup === groupKey ? "#007bff" : "#f8f9fa",
									color: selectedGroup === groupKey ? "#fff" : "#333",
									border: "1px solid #ccc",
									borderRadius: 6,
									cursor: "pointer",
									textAlign: "left",
									fontSize: 14,
								}}
							>
								<strong>{GROUP_NAMES[groupKey] || groupKey}</strong> ({modes.length})
							</button>
						))}
					</div>
				</div>

				{/* 右侧：调式列表 */}
				<div>
					<h3 style={{ marginTop: 0, marginBottom: 12 }}>
						调式 ID 列表
						{selectedGroup && <span style={{ fontWeight: "normal", fontSize: 13, color: "#666" }}>
							{" "} - {GROUP_NAMES[selectedGroup]}
						</span>}
					</h3>
					<div style={{
						maxHeight: 500,
						overflowY: "auto",
						border: "1px solid #ddd",
						borderRadius: 6,
						background: "#fff"
					}}>
						<table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
							<thead style={{ position: "sticky", top: 0, background: "#f8f9fa", zIndex: 1 }}>
								<tr>
									<th style={{ padding: 10, textAlign: "left", borderBottom: "1px solid #ddd" }}>ID</th>
									<th style={{ padding: 10, textAlign: "left", borderBottom: "1px solid #ddd" }}>代码</th>
								</tr>
							</thead>
							<tbody>
								{displayModes.map((modeId) => (
									<tr
										key={modeId}
										onClick={() => setSelectedMode(modeId)}
										style={{
											cursor: "pointer",
											background: selectedMode === modeId ? "#e8f4fd" : undefined,
											borderBottom: "1px solid #eee"
										}}
									>
										<td style={{ padding: 10, fontFamily: "monospace" }}>
											{modeId}
										</td>
										<td style={{ padding: 10 }}>
											<code style={{ background: "#f0f0f0", padding: "2px 6px", borderRadius: 3 }}>
												"{modeId}"
											</code>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* 代码示例区域 */}
			{selectedMode && (
				<div style={{ marginTop: 24, padding: 16, background: "#f8f9fa", borderRadius: 8 }}>
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
						<h3 style={{ margin: 0 }}>代码示例: {selectedMode}</h3>
						<button
							onClick={() => copyToClipboard(generateImportExample(selectedMode), "import")}
							style={{
								padding: "6px 12px",
								background: copied === "import" ? "#28a745" : "#007bff",
								color: "#fff",
								border: "none",
								borderRadius: 4,
								cursor: "pointer",
								fontSize: 13,
							}}
						>
							{copied === "import" ? "已复制!" : "复制代码"}
						</button>
					</div>
					<pre style={{
						background: "#282c34",
						color: "#abb2bf",
						padding: 16,
						borderRadius: 6,
						overflowX: "auto",
						fontSize: 13,
						margin: 0
					}}>
						<code>{generateImportExample(selectedMode)}</code>
					</pre>
				</div>
			)}

			{/* 类型定义展示 */}
			<div style={{ marginTop: 24, padding: 16, background: "#fff8e1", borderRadius: 8 }}>
				<h3 style={{ marginTop: 0, marginBottom: 12 }}>使用方式</h3>
				<pre style={{
					background: "#282c34",
					color: "#abb2bf",
					padding: 16,
					borderRadius: 6,
					overflowX: "auto",
					fontSize: 13,
					margin: 0
				}}>
					<code>{`import { SCALE_MODE, SCALE_MODE_IDS, type T_ScaleModeId } from "@find/index"

// 方式一：使用 SCALE_MODE 对象（推荐，有类型提示）
SCALE_MODE.NATURAL_MAJOR    // "NATURAL_MAJOR"
SCALE_MODE.DORIAN           // "DORIAN"
SCALE_MODE.HUNGARIAN_MINOR  // "HUNGARIAN_MINOR"
SCALE_MODE.GONG             // "GONG"

// 方式二：使用数组
SCALE_MODE_IDS              // 全部调式 ID 数组

// 类型约束（自动补全）
const modeId: T_ScaleModeId = SCALE_MODE.NATURAL_MAJOR  // ✅ OK
// const bad: T_ScaleModeId = "INVALID"                   // ❌ Type Error`}</code>
				</pre>
			</div>
		</div>
	)
}

export default ScaleModeTypesTest
