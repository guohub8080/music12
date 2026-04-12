import { toPairs } from "lodash"
import { findNoteDegreeInAllScales, SCALE_MODE, SCALE_MODE_GROUPS, type I_NoteDegreeInScale, type T_ScaleModeId } from "@music12/Find/index"
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

const FindNotesInScaleTest = () => {
	const [selectedKey, setSelectedKey] = useState<number>(4) // 默认 E
	const [selectedModes, setSelectedModes] = useState<T_ScaleModeId[]>([]) // 默认空=全部
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
	const [results, setResults] = useState<I_NoteDegreeInScale[]>([])

	const handleSearch = () => {
		setResults(
			findNoteDegreeInAllScales(selectedKey, {
				scaleModeIds: selectedModes.length > 0 ? selectedModes : undefined,
			})
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

	// 按调式分组
	const groupedResults = results.reduce((acc, result) => {
		if (!acc[result.scale.scaleModeId]) {
			acc[result.scale.scaleModeId] = []
		}
		acc[result.scale.scaleModeId].push(result)
		return acc
	}, {} as Record<string, I_NoteDegreeInScale[]>)

	const degreeName = (degree: number): string => {
		const names = ["根音", "二度", "三度", "四度", "五度", "六度", "七度"]
		return names[degree - 1] || `${degree}度`
	}

	return (
		<div style={{ padding: 20, maxWidth: 1400, margin: "0 auto" }}>
			<h1>音符在调式中的级数查找</h1>
			<p style={{ color: "#666", marginBottom: 20 }}>
				选择一个音符，查看它在调式中的位置（默认排除根音结果）
			</p>

			{/* 控制面板 */}
			<div style={{ marginBottom: 20, padding: 16, background: "#f8f9fa", borderRadius: 8 }}>
				{/* 音符选择 */}
				<div style={{ marginBottom: 16 }}>
					<label style={{ marginRight: 12, fontWeight: 500 }}>
						选择音符：
					</label>
					<select
						value={selectedKey}
						onChange={(e) => setSelectedKey(Number(e.target.value))}
						style={{
							padding: "8px 12px",
							fontSize: 14,
							borderRadius: 4,
							border: "1px solid #ccc",
							minWidth: 200,
						}}
					>
						{PIANO_KEY_NAMES.map((name, id) => (
							<option key={id} value={id}>
								{name} (pianoKeyId={id})
							</option>
						))}
					</select>
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
							全部 ({SCALE_MODE.NATURAL_MAJOR ? "44" : "0"})
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
					style={{
						padding: "8px 20px",
						background: "#007bff",
						color: "#fff",
						border: "none",
						borderRadius: 4,
						cursor: "pointer",
						fontSize: 14,
					}}
				>
					查找
				</button>

				{/* Console Log 按钮 */}
				<button
					onClick={() => console.log("findNoteDegreeInAllScales 结果:", results)}
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
						音符 <strong>{PIANO_KEY_NAMES[selectedKey]}</strong> 在 <strong>{results.length}</strong> 个调式中找到：
					</p>
				</div>
			)}

			{toPairs(groupedResults).map(([modeId, modeResults]) => (
				<div key={modeId} style={{ marginBottom: 24 }}>
					<h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 16 }}>
						{MODE_NAMES[modeId] || modeId} <span style={{ color: "#999", fontSize: 12 }}> ({modeId})</span>
					</h3>
					<table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
						<thead>
							<tr style={{ background: "#e8e8e8" }}>
								<th style={{ padding: 8, textAlign: "left", border: "1px solid #ccc" }}>根音</th>
								<th style={{ padding: 8, textAlign: "center", border: "1px solid #ccc" }}>级数</th>
								<th style={{ padding: 8, textAlign: "center", border: "1px solid #ccc" }}>变音</th>
								<th style={{ padding: 8, textAlign: "left", border: "1px solid #ccc" }}>音阶音符</th>
							</tr>
						</thead>
						<tbody>
							{modeResults.map((result, i) => {
								const alterSymbol = result.alter === 0 ? "" : result.alter === 1 ? "#" : result.alter === -1 ? "♭" : result.alter === 2 ? "×" : "𝄫"
								return (
									<tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8f8f8" }}>
										<td style={{ padding: 8, border: "1px solid #ccc", fontWeight: 500 }}>
											<code style={{ background: "#f0f0f0", padding: "2px 6px", borderRadius: 3 }}>
												{PIANO_KEY_NAMES[result.scale.pianoKeyIdRoot]}
											</code>
										</td>
										<td style={{ padding: 8, border: "1px solid #ccc", textAlign: "center" }}>
											<span style={{
												display: "inline-block",
												background: "#007bff",
												color: "#fff",
												padding: "4px 12px",
												borderRadius: 12,
												fontWeight: "bold",
												fontSize: 12,
											}}>
												{result.alter === 0 ? result.degree : alterSymbol + result.degree}
											</span>
											<span style={{ marginLeft: 6, color: "#666", fontSize: 12 }}>
												{degreeName(result.degree)}
											</span>
										</td>
										<td style={{ padding: 8, border: "1px solid #ccc", textAlign: "center" }}>
											<span style={{
												display: "inline-block",
												background: result.alter === 0 ? "#e9ecef" : result.alter > 0 ? "#fff3cd" : "#f8d7da",
												color: result.alter === 0 ? "#6c757d" : result.alter > 0 ? "#856404" : "#721c24",
												padding: "4px 8px",
												borderRadius: 4,
												fontSize: 13,
												fontWeight: result.alter === 0 ? "normal" : "bold",
											}}>
												{result.alter === 0 ? "自然" : result.alter > 0 ? "升" : "降"} ({result.alter})
											</span>
										</td>
										<td style={{ padding: 8, border: "1px solid #ccc", fontSize: 11, fontFamily: "monospace" }}>
											[{result.scale.pianoKeyIds.map((id) => PIANO_KEY_NAMES[id]).join(", ")}]
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			))}

			{results.length === 0 && (
				<div style={{ padding: 40, textAlign: "center", color: "#999" }}>
					{selectedModes.length > 0
						? `在选定的 ${selectedModes.length} 个调式中没有找到结果`
						: '选择一个音符并点击"查找"按钮'}
				</div>
			)}
		</div>
	)
}

export default FindNotesInScaleTest
