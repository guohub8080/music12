import { useState, useMemo } from "react"
import { toPairs, keys, includes } from "lodash"
import { Chord } from "@music12/Chord"

// 变换类型
type TTransformValue = "aug" | "dim" | "omit" | "add" | undefined

const DEGREES = [2, 3, 4, 5, 6, 7, 9, 11, 13] as const

// 和弦公式按家族分类
const chordFormulasByFamily = {
	"三和弦": ["maj3", "min3", "aug3", "dim3"],
	"七和弦": ["maj7", "min7", "dom7", "dim7", "halfdim7"],
	"九和弦": ["maj9", "min9", "dom9"],
	"十一和弦": ["maj11", "min11", "dom11"],
	"十三和弦": ["maj13", "min13", "dom13"],
	"SUS和弦": ["sus2", "sus4", "dom7sus2", "dom7sus4"],
	"扩展和弦": ["add9", "maj7add3", "min7add3"],
}

// 所有度数的变换选项
const TRANSFORM_OPTIONS = [
	{ value: undefined as TTransformValue, label: "默认", color: "#e9ecef", textColor: "#666" },
	{ value: "add", label: "添加", color: "#28a745", textColor: "#fff", symbol: "+" },
	{ value: "aug", label: "升", color: "#6610f2", textColor: "#fff", suffix: "#" },
	{ value: "dim", label: "降", color: "#dc3545", textColor: "#fff", suffix: "b" },
	{ value: "omit", label: "省略", color: "#6c757d", textColor: "#fff", symbol: "×" },
] as const

const ChordClassTest = () => {
	const [selectedRoot, setSelectedRoot] = useState(0)
	const [selectedFormula, setSelectedFormula] = useState("dom7")
	const [transformPanel, setTransformPanel] = useState<Record<number, TTransformValue>>({})

	const pianoKeyNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

	// 获取基础和弦中存在的度数
	const getBaseDegrees = useMemo(() => {
		const tempChord = new Chord(selectedRoot, selectedFormula as any)
		const baseIntervals = tempChord.baseIntervalList
		return baseIntervals.map(([_, degree]) => degree)
	}, [selectedRoot, selectedFormula])

	// 判断某个度数是否在基础和弦中
	const isDegreeInBaseChord = (degree: number) => {
		return includes(getBaseDegrees, degree)
	}

	// 创建和弦并应用变换
	const chord = useMemo(() => {
		const c = new Chord(selectedRoot, selectedFormula as any)
		toPairs(transformPanel).forEach(([degree, value]) => {
			const deg = Number(degree)
			if (value === "omit") {
				c.setOmit(deg as any)
			} else if (value === "aug") {
				c.set(`#${deg}` as any)
			} else if (value === "dim") {
				c.set(`b${deg}` as any)
			} else if (value === "add") {
				c.set(deg as any)
			}
		})
		return c
	}, [selectedRoot, selectedFormula, transformPanel])

	// 获取某个度数当前有效的音程
	const getEffectiveInterval = (degree: number): string | null => {
		const panel = chord.intervalPanel
		return panel[degree as keyof typeof panel] || null
	}

	// 设置某个度数的变换
	const setDegreeTransform = (degree: number, value: TTransformValue) => {
		setTransformPanel(prev => {
			const newPanel = { ...prev }
			if (value === undefined) {
				delete newPanel[degree]
			} else {
				newPanel[degree] = value
			}
			return newPanel
		})
	}

	// 重置所有变换
	const resetTransforms = () => {
		setTransformPanel({})
	}

	// 应用预设
	const applyPreset = (transforms: Record<number, TTransformValue>) => {
		setTransformPanel(transforms)
	}

	// 判断某个度数是否被修改
	const isDegreeModified = (degree: number) => {
		return transformPanel[degree] !== undefined
	}

	return (
		<div style={{ padding: 20, fontFamily: "monospace" }}>
			<h1>🎹 Chord 变换面板测试</h1>

			{/* 基础设置 */}
			<section style={{ marginBottom: 20, padding: 16, background: "#f8f9fa", borderRadius: 8 }}>
				<h2 style={{ marginTop: 0 }}>基础设置</h2>
				<div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
					<div>
						<label>根音:</label>
						<select value={selectedRoot} onChange={(e) => setSelectedRoot(Number(e.target.value))} style={{ marginLeft: 8, padding: 6 }}>
							{pianoKeyNames.map((name, i) => <option key={i} value={i}>{name}</option>)}
						</select>
					</div>
					<div>
						<label>和弦公式:</label>
						<select value={selectedFormula} onChange={(e) => setSelectedFormula(e.target.value)} style={{ marginLeft: 8, padding: 6 }}>
							{toPairs(chordFormulasByFamily).map(([family, formulas]) => (
								<optgroup key={family} label={family}>
									{formulas.map(f => <option key={f} value={f}>{f}</option>)}
								</optgroup>
							))}
						</select>
					</div>
					<button onClick={resetTransforms} style={{ padding: "6px 12px", cursor: "pointer", background: "#dc3545", color: "#fff", border: "none", borderRadius: 4 }}>
						重置变换
					</button>
					<button onClick={() => console.log(chord)} style={{ padding: "6px 12px", cursor: "pointer", background: "#17a2b8", color: "#fff", border: "none", borderRadius: 4 }}>
						🖥️ Console
					</button>
				</div>
				<div style={{ marginTop: 12, fontSize: 14 }}>
					<strong>{pianoKeyNames[selectedRoot]}</strong> {chord.baseSymbol}
					{keys(transformPanel).length > 0 && <span style={{ color: "#dc3545" }}> + {keys(transformPanel).length} 个变换</span>}
					<span style={{ marginLeft: 12, color: "#666" }}>({chord.cnName})</span>
					<span style={{ marginLeft: 12, color: "#666" }}>scoreSymbol: "{chord.scoreSymbol}"</span>
				</div>
			</section>

			{/* 变换面板 */}
			<section style={{ marginBottom: 20 }}>
				<h2>🎚️ 变换面板</h2>
				<div style={{ overflowX: "auto" }}>
					<table style={{ borderCollapse: "collapse", background: "#fff" }}>
						<thead>
							<tr style={{ background: "#f8f9fa" }}>
								<th style={{ padding: 12, border: "1px solid #dee2e6", textAlign: "left" }}>度数</th>
								{DEGREES.map(d => (
									<th key={d} style={{ padding: 12, border: "1px solid #dee2e6", minWidth: 80 }}>
										度数 {d}
										{isDegreeInBaseChord(d) && <span style={{ marginLeft: 4, fontSize: 11, color: "#28a745" }}>●</span>}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{/* 变换选项按钮行 */}
							<tr>
								<td style={{ padding: 12, border: "1px solid #dee2e6", fontWeight: "bold", background: "#f8f9fa" }}>变换</td>
								{DEGREES.map(degree => {
									const currentValue = transformPanel[degree]
									const inBaseChord = isDegreeInBaseChord(degree)
									return (
										<td key={degree} style={{ padding: 8, border: "1px solid #dee2e6", background: isDegreeModified(degree) ? "#fff3cd" : "#fff" }}>
											<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
												{TRANSFORM_OPTIONS.map(opt => {
													const isSelected = currentValue === opt.value
													return (
														<button
															key={opt.label}
															onClick={() => setDegreeTransform(degree, opt.value)}
															style={{
																padding: "6px 8px",
																border: isSelected ? "2px solid #000" : "1px solid #dee2e6",
																background: opt.color,
																color: opt.textColor,
																borderRadius: 4,
																cursor: "pointer",
																fontSize: 12,
																fontWeight: isSelected ? "bold" : "normal",
																opacity: isSelected ? 1 : 0.7,
															}}
															onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.opacity = "1" }}
															onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.opacity = "0.7" }}
														>
															{opt.label === "默认" ? "—" :
															 opt.label === "省略" ? opt.symbol :
															 opt.label === "添加" ? `+${degree}` :
															 (opt.suffix || "") + degree}
														</button>
													)
												})}
											</div>
										</td>
									)
								})}
							</tr>
							{/* 当前音程行 */}
							<tr style={{ background: "#f0f8ff" }}>
								<td style={{ padding: 12, border: "1px solid #dee2e6", fontWeight: "bold" }}>音程</td>
								{DEGREES.map(degree => {
									const interval = getEffectiveInterval(degree)
									return (
										<td key={degree} style={{ padding: 12, border: "1px solid #dee2e6", textAlign: "center", fontSize: 13 }}>
											{interval || <span style={{ color: "#ccc" }}>—</span>}
										</td>
									)
								})}
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			{/* 结果展示 */}
			<section style={{ marginBottom: 20 }}>
				<h2>📊 结果展示</h2>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
					{/* Init Meta (基础和弦定义) */}
					<div style={{ padding: 16, background: "#e7f3ff", borderRadius: 6, border: "2px solid #0066cc" }}>
						<h3 style={{ marginTop: 0, color: "#0066cc" }}>📐 Init Meta (基础和弦)</h3>
						<div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
							和弦公式定义的度数→音程映射
						</div>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
							{getBaseDegrees.size > 0 ? Array.from(getBaseDegrees).sort((a, b) => a - b).map(degree => {
								const tempChord = new Chord(selectedRoot, selectedFormula as any)
								const intervalType = tempChord.intervalPanel[degree as keyof typeof tempChord.intervalPanel]
								return (
									<div key={degree} style={{
										padding: "6px 10px",
										background: "#0066cc",
										color: "#fff",
										borderRadius: 4,
										fontSize: 13,
									}}>
										<strong>{degree}</strong>: {intervalType}
									</div>
								)
							}) : <span style={{ color: "#999" }}>无</span>}
						</div>
					</div>

					{/* Transform Panel (用户变换) */}
					<div style={{ padding: 16, background: "#fff3cd", borderRadius: 6, border: "2px solid #856404" }}>
						<h3 style={{ marginTop: 0, color: "#856404" }}>🎛️ Transform Panel (用户变换)</h3>
						<div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
							用户设置的度数变换
						</div>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
							{keys(transformPanel).length > 0 ? toPairs(transformPanel).map(([degree, value]) => (
								<div key={degree} style={{
									padding: "6px 10px",
									background: value === "omit" ? "#6c757d" : value === "add" ? "#28a745" : value === "aug" ? "#6610f2" : "#dc3545",
									color: "#fff",
									borderRadius: 4,
									fontSize: 13,
								}}>
									<strong>{degree}</strong>: {
										value === "omit" ? "省略" :
										value === "add" ? "添加" :
										value === "aug" ? `#${degree}` :
										value === "dim" ? `b${degree}` : value
									}
								</div>
							)) : <span style={{ color: "#999" }}>无变换</span>}
						</div>
					</div>

					{/* Final Interval Panel (最终结果) */}
					<div style={{ padding: 16, background: "#d4edda", borderRadius: 6, border: "2px solid #28a745" }}>
						<h3 style={{ marginTop: 0, color: "#28a745" }}>✅ Final Interval Panel (最终音程)</h3>
						<div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
							Init Meta + Transform Panel 合并结果
						</div>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
							{toPairs(chord.intervalPanel).filter(([_, v]) => v).map(([degree, intervalType]) => (
								<div key={degree} style={{
									padding: "6px 10px",
									background: "#28a745",
									color: "#fff",
									borderRadius: 4,
									fontSize: 13,
								}}>
									<strong>{degree}</strong>: {intervalType}
								</div>
							))}
						</div>
					</div>
				</div>

				{/* 音符 */}
				<div style={{ padding: 16, background: "#f8f9fa", borderRadius: 6, marginTop: 16 }}>
					<h3 style={{ marginTop: 0 }}>🎹 音符</h3>
					<div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
						{chord.simpleDescription}
					</div>
					<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
						{chord.pianoKeyIdsSorted.map((kid, i) => (
							<div key={kid} style={{
								padding: "6px 10px",
								background: i === 0 ? "#007bff" : "#28a745",
								color: "#fff",
								borderRadius: 4,
								fontSize: 13,
							}}>
								{pianoKeyNames[kid]}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Notes Panel */}
			<section style={{ marginBottom: 20 }}>
				<h2>🎹 Notes List</h2>
				<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
					{chord.getNotesList().map((note, i) => (
						<div key={i} style={{
							padding: "12px 16px",
							background: i === 0 ? "#007bff" : "#28a745",
							color: "#fff",
							borderRadius: 6,
							textAlign: "center",
							minWidth: 70,
						}}>
							<div style={{ fontSize: 11, opacity: 0.8 }}>音 {i + 1}</div>
							<div style={{ fontSize: 18, fontWeight: "bold" }}>{note.artName}{note.octave}</div>
						</div>
					))}
				</div>
			</section>

			{/* 快捷预设 */}
			<section style={{ marginBottom: 20 }}>
				<h2>⚡ 快捷预设</h2>
				<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
					{[
						{ name: "标准", transforms: {} },
						{ name: "b5", transforms: { 5: "dim" } },
						{ name: "#5", transforms: { 5: "aug" } },
						{ name: "b9", transforms: { 9: "dim" } },
						{ name: "#9", transforms: { 9: "aug" } },
						{ name: "#11", transforms: { 11: "aug" } },
						{ name: "b13", transforms: { 13: "dim" } },
						{ name: "b5#9", transforms: { 5: "dim", 9: "aug" } },
						{ name: "7#9b13", transforms: { 9: "aug", 13: "dim" } },
						{ name: "alt", transforms: { 5: "aug", 9: "aug", 13: "dim" } },
						{ name: "no5", transforms: { 5: "omit" } },
						{ name: "no3", transforms: { 3: "omit" } },
					].map(preset => (
						<button
							key={preset.name}
							onClick={() => applyPreset(preset.transforms)}
							style={{ padding: "6px 12px", border: "1px solid #dee2e6", background: "#fff", borderRadius: 4, cursor: "pointer" }}
						>
							{preset.name}
						</button>
					))}
				</div>
				<div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
					<strong style={{ width: "100%", marginBottom: 4 }}>添加音程 (需要先选三和弦):</strong>
					{[
						{ name: "add2", formula: "maj3", transforms: { 2: "add" } },
						{ name: "add4", formula: "maj3", transforms: { 4: "add" } },
						{ name: "add9", formula: "maj3", transforms: { 9: "add" } },
						{ name: "add11", formula: "maj3", transforms: { 11: "add" } },
						{ name: "add6", formula: "maj3", transforms: { 6: "add" } },
						{ name: "add6/9", formula: "maj3", transforms: { 6: "add", 9: "add" } },
					].map(preset => (
						<button
							key={preset.name}
							onClick={() => {
								setSelectedFormula(preset.formula)
								setTransformPanel(preset.transforms)
							}}
							style={{ padding: "6px 12px", border: "1px solid #28a745", background: "#fff", borderRadius: 4, cursor: "pointer", color: "#28a745" }}
						>
							{preset.name}
						</button>
					))}
				</div>
			</section>

			{/* 说明 */}
			<section style={{ padding: 16, background: "#e7f5ff", borderRadius: 6 }}>
				<h3 style={{ marginTop: 0 }}>说明</h3>
				<ul style={{ marginBottom: 0, fontSize: 13 }}>
					<li><strong>—</strong> = 默认（使用和弦公式定义的音程）</li>
					<li><strong>#度数</strong> = 升（如 #5 表示5度音升高半音）</li>
					<li><strong>b度数</strong> = 降（如 b9 表示9度音降低半音）</li>
					<li><strong>×</strong> = 省略（该度数不发音）</li>
				</ul>
			</section>
		</div>
	)
}

export default ChordClassTest
