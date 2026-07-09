import { toPairs } from "es-toolkit/compat"
import { findNotesInScales, SCALE_MODE_GROUPS, type I_NotesInScale, type T_ScaleModeId } from "@find/index"
import { useState } from "react"

const PIANO_KEY_NAMES = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"]

// 调式族显示名称
const GROUP_NAMES: Record<string, string> = {
	DIATONIC: "自然调式",
	HARMONIC_MAJOR: "和声大调",
	MELODIC_MAJOR: "旋律大调",
	HARMONIC_MINOR: "和声小调",
	MELODIC_MINOR: "旋律小调",
	DOUBLE_HARMONIC: "双重和声",
	CHINESE_PENTATONIC: "中国五声",
	CHINESE_YAYUE: "雅乐",
	CHINESE_QINGYUE: "清乐",
	CHINESE_YANYUE: "燕乐",
}

// 调式中文名称
const MODE_NAMES: Record<string, string> = {
	NATURAL_MAJOR: "自然大调",
	DORIAN: "多利亚",
	PHRYGIAN: "弗里吉亚",
	LYDIAN: "利底亚",
	MIXOLYDIAN: "混合利底亚",
	NATURAL_MINOR: "自然小调",
	LOCRIAN: "洛克里亚",
	HARMONIC_MAJOR: "和声大调",
	MELODIC_MAJOR_DESCENDING: "旋律大调",
	HARMONIC_MINOR: "和声小调",
	LOCRIAN_SHARP6: "洛克里亚 ♯6",
	IONIAN_SHARP5: "伊奥尼亚 ♯5",
	DORIAN_SHARP4: "多利亚 ♯4",
	PHRYGIAN_DOMINANT: "弗里吉亚属",
	LYDIAN_SHARP2: "利底亚 ♯2",
	MELODIC_MINOR_ASCENDING: "旋律小调",
	DORIAN_FLAT2: "多利亚 ♭2",
	LYDIAN_AUGMENTED: "利底亚增",
	LYDIAN_DOMINANT: "利底亚属",
	LOCRIAN_SHARP2: "洛克里亚 ♯2",
	DOUBLE_HARMONIC_MAJOR: "双重和声大调",
	HUNGARIAN_MINOR: "匈牙利小调",
	ORIENTAL: "东方调式",
	IONIAN_SHARP2_SHARP5: "伊奥尼亚 ♯2♯5",
	GONG: "宫",
	SHANG: "商",
	JUE: "角",
	ZHI: "徵",
	YU: "羽",
	YA_YUE_GONG: "雅乐·宫",
	YA_YUE_SHANG: "雅乐·商",
	YA_YUE_JUE: "雅乐·角",
	YA_YUE_ZHI: "雅乐·徵",
	YA_YUE_YU: "雅乐·羽",
	QING_YUE_GONG: "清乐·宫",
	QING_YUE_SHANG: "清乐·商",
	QING_YUE_JUE: "清乐·角",
	QING_YUE_ZHI: "清乐·徵",
	QING_YUE_YU: "清乐·羽",
	YAN_YUE_GONG: "燕乐·宫",
	YAN_YUE_SHANG: "燕乐·商",
	YAN_YUE_JUE: "燕乐·角",
	YAN_YUE_ZHI: "燕乐·徵",
	YAN_YUE_YU: "燕乐·羽",
}

// 预设和弦
const CHORD_PRESETS: Record<string, number[]> = {
	"C大三和弦": [0, 4, 7],
	"C小三和弦": [0, 3, 7],
	"C属七和弦": [0, 4, 7, 10],
	"C大七和弦": [0, 4, 7, 11],
	"C小七和弦": [0, 3, 7, 10],
	"D小三和弦": [2, 5, 9],
	"D大三和弦": [2, 6, 9],
	"E小三和弦": [4, 7, 11],
	"F大三和弦": [5, 9, 0],
	"G大三和弦": [7, 11, 2],
	"A小三和弦": [9, 0, 4],
	"B减三和弦": [11, 2, 5],
}

const FindNotesInScalesTest = () => {
	const [selectedKeys, setSelectedKeys] = useState<number[]>([0, 4, 7]) // 默认 C大三和弦
	const [selectedModes, setSelectedModes] = useState<T_ScaleModeId[]>([])
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
	const [results, setResults] = useState<I_NotesInScale[]>([])

	const handleSearch = () => {
		if (selectedKeys.length === 0) return
		setResults(
			findNotesInScales(selectedKeys, {
				scaleModeIds: selectedModes.length > 0 ? selectedModes : undefined,
			})
		)
	}

	const toggleKey = (keyId: number) => {
		setSelectedKeys((prev) =>
			prev.includes(keyId)
				? prev.filter((k) => k !== keyId)
				: [...prev, keyId].sort((a, b) => a - b)
		)
	}

	const toggleMode = (modeId: T_ScaleModeId) => {
		setSelectedModes((prev) =>
			prev.includes(modeId)
				? prev.filter((m) => m !== modeId)
				: [...prev, modeId]
		)
	}

	const selectGroup = (groupKey: string | null) => {
		setSelectedGroup(groupKey)
		if (groupKey) {
			const groupModes = SCALE_MODE_GROUPS[groupKey as keyof typeof SCALE_MODE_GROUPS]
			setSelectedModes([...groupModes] as T_ScaleModeId[])
		} else {
			setSelectedModes([])
		}
	}

	const loadPreset = (keys: number[]) => {
		setSelectedKeys(keys)
	}

	// 按调式分组
	const groupedResults = results.reduce((acc, result) => {
		if (!acc[result.scale.scaleModeId]) {
			acc[result.scale.scaleModeId] = []
		}
		acc[result.scale.scaleModeId].push(result)
		return acc
	}, {} as Record<string, I_NotesInScale[]>)

	return (
		<div style={{ padding: 20, maxWidth: 1400, margin: "0 auto" }}>
			<h1>音符组合在调式中的查找</h1>
			<p style={{ color: "#666", marginBottom: 20 }}>
				选择多个音符（如和弦音），查看它们共同属于哪些调式
			</p>

			{/* 控制面板 */}
			<div style={{ marginBottom: 20, padding: 16, background: "#f8f9fa", borderRadius: 8 }}>
				{/* 预设和弦 */}
				<div style={{ marginBottom: 16 }}>
					<label style={{ marginRight: 12, fontWeight: 500 }}>预设和弦：</label>
					<select
						onChange={(e) => {
							const preset = e.target.value
							if (preset && CHORD_PRESETS[preset]) {
								loadPreset(CHORD_PRESETS[preset])
							}
						}}
						style={{
							padding: "8px 12px",
							fontSize: 14,
							borderRadius: 4,
							border: "1px solid #ccc",
							minWidth: 200,
						}}
					>
						<option value="">选择预设...</option>
						{toPairs(CHORD_PRESETS).map(([name, keys]) => (
							<option key={name} value={name}>
								{name} ({keys.map((k) => PIANO_KEY_NAMES[k]).join("-")})
							</option>
						))}
					</select>
				</div>

				{/* 音符选择 */}
				<div style={{ marginBottom: 16 }}>
					<div style={{ marginBottom: 8, fontWeight: 500 }}>选择音符（可多选）：</div>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
						{PIANO_KEY_NAMES.map((name, id) => (
							<button
								key={id}
								onClick={() => toggleKey(id)}
								style={{
									padding: "8px 12px",
									background: selectedKeys.includes(id) ? "#007bff" : "#fff",
									color: selectedKeys.includes(id) ? "#fff" : "#333",
									border: "1px solid #ccc",
									borderRadius: 4,
									cursor: "pointer",
									fontSize: 13,
								}}
							>
								{name}
							</button>
						))}
					</div>
					{selectedKeys.length > 0 && (
						<div style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
							已选择：{" "}
							<strong>
								{selectedKeys.map((k) => PIANO_KEY_NAMES[k]).join(", ")}
							</strong>
						</div>
					)}
				</div>

				{/* 调式族快速选择 */}
				<div style={{ marginBottom: 16 }}>
					<div style={{ marginBottom: 8, fontWeight: 500 }}>快速选择调式族：</div>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
						<button
							onClick={() => selectGroup(null)}
							style={{
								padding: "6px 12px",
								background: selectedGroup === null ? "#007bff" : "#fff",
								color: selectedGroup === null ? "#fff" : "#333",
								border: "1px solid #ccc",
								borderRadius: 4,
								cursor: "pointer",
								fontSize: 13,
							}}
						>
							全部
						</button>
						{toPairs(SCALE_MODE_GROUPS).map(([groupKey, modes]) => (
							<button
								key={groupKey}
								onClick={() => selectGroup(groupKey)}
								style={{
									padding: "6px 12px",
									background: selectedGroup === groupKey ? "#007bff" : "#fff",
									color: selectedGroup === groupKey ? "#fff" : "#333",
									border: "1px solid #ccc",
									borderRadius: 4,
									cursor: "pointer",
									fontSize: 13,
								}}
							>
								{GROUP_NAMES[groupKey] || groupKey} ({modes.length})
							</button>
						))}
					</div>
				</div>

				{/* 已选择的调式 */}
				<div style={{ marginBottom: 16 }}>
					<div style={{ marginBottom: 8, fontWeight: 500 }}>
						已选择 {selectedModes.length} 个调式：
					</div>
					<div style={{
						maxHeight: 120,
						overflowY: "auto",
						padding: 8,
						background: "#fff",
						border: "1px solid #ddd",
						borderRadius: 4
					}}>
						{selectedModes.length === 0 ? (
							<span style={{ color: "#999" }}>未选择（将搜索全部调式）</span>
						) : (
							<div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
								{selectedModes.map((modeId) => (
									<span
										key={modeId}
										style={{
											padding: "4px 8px",
											background: "#007bff",
											color: "#fff",
											borderRadius: 4,
											fontSize: 12,
											cursor: "pointer",
										}}
										onClick={() => toggleMode(modeId)}
									>
										{MODE_NAMES[modeId] || modeId} ×
									</span>
								))}
							</div>
						)}
					</div>
				</div>

				{/* 查找按钮 */}
				<button
					onClick={handleSearch}
					disabled={selectedKeys.length === 0}
					style={{
						padding: "8px 20px",
						background: selectedKeys.length > 0 ? "#007bff" : "#6c757d",
						color: "#fff",
						border: "none",
						borderRadius: 4,
						cursor: selectedKeys.length > 0 ? "pointer" : "not-allowed",
						fontSize: 14,
					}}
				>
					查找
				</button>

				{/* Console Log 按钮 */}
				<button
					onClick={() => console.log("findNotesInScales 结果:", results)}
					style={{
						padding: "8px 20px",
						background: "#6c757d",
						color: "#fff",
						border: "none",
						borderRadius: 4,
						cursor: "pointer",
						fontSize: 14,
						marginLeft: 8,
					}}
				>
					Console Log
				</button>
			</div>

			{/* 结果显示 */}
			{results.length > 0 && (
				<div style={{ marginBottom: 20 }}>
					<p style={{ fontSize: 14, color: "#666" }}>
						音符组合 <strong>({selectedKeys.map((k) => PIANO_KEY_NAMES[k]).join("-")})</strong> 在 <strong>{results.length}</strong> 个调式中找到：
					</p>
				</div>
			)}

			{toPairs(groupedResults).map(([modeId, modeResults]) => (
				<div key={modeId} style={{ marginBottom: 24 }}>
					<h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 16 }}>
						{MODE_NAMES[modeId] || modeId} <span style={{ color: "#999", fontSize: 12 }}> ({modeId})</span>
						<span style={{ color: "#007bff", fontSize: 12, marginLeft: 8 }}>({modeResults.length}个调式)</span>
					</h3>
					<table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
						<thead>
							<tr style={{ background: "#e8e8e8" }}>
								<th style={{ padding: 8, textAlign: "left", border: "1px solid #ccc" }}>根音</th>
								<th style={{ padding: 8, textAlign: "left", border: "1px solid #ccc" }}>音阶音符</th>
								<th style={{ padding: 8, textAlign: "left", border: "1px solid #ccc" }}>选中音符在调式中的级数</th>
							</tr>
						</thead>
						<tbody>
							{modeResults.map((result, i) => {
								// 使用 result.noteDegrees 中已计算的度数信息
								const alterSymbol = (alter: number) => {
									return alter === 0 ? "" : alter === 1 ? "#" : alter === -1 ? "♭" : alter === 2 ? "×" : "𝄫"
								}

								return (
									<tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8f8f8" }}>
										<td style={{ padding: 8, border: "1px solid #ccc", fontWeight: 500 }}>
											<code style={{ background: "#f0f0f0", padding: "2px 6px", borderRadius: 3 }}>
												{PIANO_KEY_NAMES[result.scale.pianoKeyIdRoot]}
											</code>
										</td>
										<td style={{ padding: 8, border: "1px solid #ccc", fontSize: 11, fontFamily: "monospace" }}>
											[{result.scale.pianoKeyIds.map((id) => PIANO_KEY_NAMES[id]).join(", ")}]
										</td>
										<td style={{ padding: 8, border: "1px solid #ccc" }}>
											{result.noteDegrees.map((d, j) => (
												<span key={j} style={{ marginRight: 12 }}>
													<span style={{ fontWeight: 500 }}>{PIANO_KEY_NAMES[d.pianoKeyId]}</span>
													<span style={{
														display: "inline-block",
														background: "#007bff",
														color: "#fff",
														padding: "2px 8px",
														borderRadius: 10,
														fontSize: 11,
													}}>
														{d.alter === 0 ? d.degree : alterSymbol(d.alter) + d.degree}
													</span>
												</span>
											))}
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			))}

			{results.length === 0 && selectedKeys.length > 0 && (
				<div style={{ padding: 40, textAlign: "center", color: "#999" }}>
					{selectedModes.length > 0
						? `在选定的 ${selectedModes.length} 个调式中没有找到包含这些音符组合的结果`
						: '没有找到包含这些音符组合的调式'}
				</div>
			)}

			{selectedKeys.length === 0 && (
				<div style={{ padding: 40, textAlign: "center", color: "#999" }}>
					请选择至少一个音符
				</div>
			)}
		</div>
	)
}

export default FindNotesInScalesTest
