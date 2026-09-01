import { useState } from "react"
import { findChord } from "@find/index"
import { getNoteByPianoKeyId } from "@note"

type TestCase = {
	name: string
	midiPitches: number[]
	description: string
}

type TestResult = TestCase & {
	matches: ReturnType<typeof findChord>
	error?: string
}

/**
 * 测试用例：不同 MIDI 音高组合的和弦识别结果
 */
const testCases: TestCase[] = [
	{
		name: "C 大三和弦",
		midiPitches: [60, 64, 67], // C4, E4, G4
		description: "基础三和弦，应该返回 maj3",
	},
	{
		name: "C 小三和弦",
		midiPitches: [60, 63, 67], // C4, Eb4, G4
		description: "小三和弦，应该返回 min3",
	},
	{
		name: "C7 和弦",
		midiPitches: [60, 64, 67, 70], // C4, E4, G4, Bb4
		description: "属七和弦，应该返回 dom7",
	},
	{
		name: "Cmaj7 和弦",
		midiPitches: [60, 64, 67, 71], // C4, E4, G4, B4
		description: "大七和弦，应该返回 maj7",
	},
	{
		name: "C9 和弦",
		midiPitches: [60, 64, 67, 70, 74], // C4, E4, G4, Bb4, D5
		description: "九和弦，应该返回 dom9",
	},
	{
		name: "C13 和弦",
		midiPitches: [60, 64, 67, 70, 74, 77], // C4, E4, G4, Bb4, D5, A5
		description: "十三和弦，应该返回 dom13",
	},
	{
		name: "Csus4 和弦",
		midiPitches: [60, 65, 67], // C4, F4, G4
		description: "挂四和弦，应该返回 sus4",
	},
	{
		name: "Dsus2 和弦",
		midiPitches: [62, 64, 69], // D4, E4, A4
		description: "挂二和弦，应该返回 sus2",
	},
	{
		name: "Dsus4 和弦",
		midiPitches: [62, 67, 69], // D4, G4, A4
		description: "挂四和弦，应该返回 sus4",
	},
	{
		name: "Gsus2 和弦",
		midiPitches: [67, 69, 74], // G4, A4, D5
		description: "挂二和弦，应该返回 sus2",
	},
	{
		name: "Gsus4 和弦",
		midiPitches: [67, 72, 74], // G4, C5, D5
		description: "挂四和弦，应该返回 sus4",
	},
	{
		name: "Asus2 和弦",
		midiPitches: [69, 71, 76], // A4, B4, E5
		description: "挂二和弦，应该返回 sus2",
	},
	{
		name: "Asus4 和弦",
		midiPitches: [69, 74, 76], // A4, D5, E5
		description: "挂四和弦，应该返回 sus4",
	},
	{
		name: "D7sus4 和弦",
		midiPitches: [62, 67, 69, 71], // D4, G4, A4, B4
		description: "属七挂四和弦，应该返回 dom7sus4",
	},
	{
		name: "G7sus2 和弦",
		midiPitches: [67, 69, 74, 76], // G4, A4, D5, E5
		description: "属七挂二和弦，应该返回 dom7sus2",
	},
	{
		name: "D9sus4 和弦",
		midiPitches: [62, 67, 69, 72, 76], // D4, G4, A4, C5, E5
		description: "属九挂四和弦，应该返回 dom9sus4",
	},
	{
		name: "Bb13sus4 和弦",
		midiPitches: [63, 65, 68, 70, 72, 79], // Eb4, F4, Ab4, Bb4, C5, G5
		description: "属十三挂四和弦，包含: 根音Bb + sus4(Eb) + 五度F + b7(Ab) + 九度C + 十三度G",
	},
	{
		name: "Fmaj7sus4 和弦",
		midiPitches: [65, 70, 72, 76], // F4, Bb4, C5, E5
		description: "大七挂四和弦，应该返回 maj7sus4",
	},
	{
		name: "C7b9 和弦",
		midiPitches: [60, 64, 67, 70, 73], // C4, E4, G4, Bb4, Db5
		description: "属七降九和弦，应该返回 dom7_b9",
	},
	{
		name: "C7#5 和弦",
		midiPitches: [60, 64, 68, 70], // C4, E4, G#4, Bb4
		description: "属七增五和弦，应该返回 dom7_#5",
	},
	{
		name: "模糊匹配：省略五音",
		midiPitches: [60, 64], // C4, E4
		description: "只有根音和三音，相似度较低",
	},
	{
		name: "模糊匹配：加九音的三和弦",
		midiPitches: [60, 64, 67, 74], // C4, E4, G4, D5
		description: "可以匹配 maj3add9 或 dom9",
	},
	{
		name: "Cm11 和弦",
		midiPitches: [60, 63, 67, 70, 74, 77], // C4, Eb4, G4, Bb4, D5, F5
		description: "小十一和弦，应该返回 min11",
	},
	{
		name: "D#maj13b9 和弦",
		midiPitches: [63, 67, 70, 74, 76, 80, 84], // D#4, G4, A#4, D5, F5, C6, E6
		description: "大十三减九和弦",
	},
	{
		name: "F#7#9#11 和弦",
		midiPitches: [54, 58, 61, 65, 69, 72], // F#3, A#3, C#4, E4, G#4, B#4
		description: "属七增九增十一，爵士常用和弦",
	},
	{
		name: "Bbmaj13#11 和弦",
		midiPitches: [70, 74, 77, 81, 85, 89, 96], // Bb3, D4, F4, A4, C5, E5, G6
		description: "大十三增十一（lydian 和弦）",
	},
	{
		name: "E7b13 和弦",
		midiPitches: [64, 68, 71, 74, 84], // E4, G#4, B4, D5, C6
		description: "属七减十三，常用于爵士",
	},
	{
		name: "Am9b5 和弦",
		midiPitches: [69, 72, 76, 78, 82], // A4, C5, E5, F5, B5
		description: "小九减五",
	},
	{
		name: "Db13#11 和弦",
		midiPitches: [61, 65, 68, 72, 76, 80, 90], // Db4, F4, Ab4, C5, Eb5, G5, D6
		description: "属十三增十一",
	},
	{
		name: "G7b9#9 和弦（双重变化）",
		midiPitches: [55, 59, 62, 66, 69, 70], // G3, B3, D4, F4, Ab4, A#4
		description: "同时包含 b9 和 #9",
	},
	// ========== 随机测试用例 ==========
	{
		name: "随机：Jazz 风格",
		midiPitches: [60, 63, 67, 70, 74], // C4, Eb4, G4, Bb4, D5
		description: "小九和弦",
	},
	{
		name: "随机：蓝调七和弦",
		midiPitches: [62, 66, 69, 73], // D4, F#4, A4, C#5
		description: "大七和弦",
	},
	{
		name: "随机：悬挂和弦（可解读为 sus2 或 sus4）",
		midiPitches: [64, 69, 71], // E4, A4, B4
		description: "同一组音可解读为两种挂留和弦",
	},
	{
		name: "随机：减七和弦（对称性）",
		midiPitches: [61, 64, 67, 70], // Db4, Eb4, F#4, A4
		description: "减七和弦每隔小三度重复，会匹配多个根音",
	},
	{
		name: "随机：Hendrix 和弦",
		midiPitches: [60, 64, 67, 70, 75], // C4, E4, G4, Bb4, D#5
		description: "属七升九，Jimi Hendrix 风格",
	},
	{
		name: "随机：增三和弦（对称性）",
		midiPitches: [60, 64, 68], // C4, E4, G#4
		description: "增三和弦每隔大三度重复，会匹配多个根音",
	},
	{
		name: "随机：四度和弦排列",
		midiPitches: [60, 65, 70, 75], // C4, F4, Bb4, Eb5
		description: "Quartal voicing，爵士常用排列",
	},
	{
		name: "随机：半音簇",
		midiPitches: [60, 61, 62, 63], // C4, C#4, D4, D#4
		description: "连续半音，会匹配大量模糊结果",
	},
	{
		name: "随机：开放排列",
		midiPitches: [48, 64, 67, 72], // C3, E4, G4, C5
		description: "跨越两个八度的大三和弦",
	},
	{
		name: "随机：Lydian 和弦",
		midiPitches: [60, 64, 67, 71, 74], // C4, E4, G4, B4, D5
		description: "大九和弦",
	},
	{
		name: "随机：不完全13和弦",
		midiPitches: [60, 67, 70, 74], // C4, G4, Bb4, D5
		description: "省略三音和十一音的十三和弦",
	},
	// ========== 真正随机的 MIDI 组合（可能找不到或模糊匹配）==========
	{
		name: "随机 #1",
		midiPitches: [48, 52, 71],
		description: "随机生成",
	},
	{
		name: "随机 #2",
		midiPitches: [49, 56, 83],
		description: "随机生成",
	},
	{
		name: "随机 #3",
		midiPitches: [50, 55, 56, 75, 81],
		description: "随机生成",
	},
	{
		name: "随机 #4",
		midiPitches: [54, 56, 60, 62, 64, 79],
		description: "随机生成",
	},
	{
		name: "随机 #5",
		midiPitches: [49, 57, 58, 67, 80],
		description: "随机生成",
	},
	{
		name: "随机 #6",
		midiPitches: [53, 59, 62, 64],
		description: "随机生成",
	},
	{
		name: "随机 #7",
		midiPitches: [53, 55, 74, 75, 82],
		description: "随机生成",
	},
	{
		name: "随机 #8",
		midiPitches: [68, 71, 74, 75, 77],
		description: "随机生成",
	},
	{
		name: "随机 #9",
		midiPitches: [63, 74, 82],
		description: "随机生成",
	},
	{
		name: "随机 #10",
		midiPitches: [56, 57, 60, 70, 71, 73],
		description: "随机生成",
	},
	{
		name: "随机：E-C#-D",
		midiPitches: [61, 62, 64], // C#4, D4, E4
		description: "半音簇，模糊爆炸（101个匹配）",
	},
	// ========== 变化检测测试用例 ==========
	{
		name: "变化：大三 → 小三 (3→b3)",
		midiPitches: [60, 64, 67], // C4, E4, G4
		description: "输入大三和弦，尝试匹配小三和弦",
	},
	{
		name: "变化：小三 → 大三 (b3→3)",
		midiPitches: [60, 63, 67], // C4, Eb4, G4
		description: "输入小三和弦，尝试匹配大三和弦",
	},
	{
		name: "变化：属七 → 大七 (b7→maj7)",
		midiPitches: [60, 64, 67, 70], // C4, E4, G4, Bb4
		description: "输入属七和弦，尝试匹配大七和弦",
	},
	{
		name: "变化：大七 → 属七 (maj7→b7)",
		midiPitches: [60, 64, 67, 71], // C4, E4, G4, B4
		description: "输入大七和弦，尝试匹配属七和弦",
	},
	{
		name: "组合：省略 + 变化",
		midiPitches: [60, 64, 70, 74], // C4, E4, Bb4, D5
		description: "C7 省略五音，尝试匹配 C9",
	},
]

const FindComplexChordTest = () => {
	// 配置开关（v3：isStrict 只返回完全匹配；rootNoteLocation 指定根音区分等和弦）
	const [isStrict, setIsStrict] = useState(false)
	const [rootNoteLocation, setRootNoteLocation] = useState<number | "">("")

	// 将 MIDI 数组转换为音名数组
	const midiListToNoteNames = (midiList: number[]): string => {
		return midiList.map(midi => {
			const pianoKeyId = midi % 12
			const notes = getNoteByPianoKeyId(pianoKeyId, { octave: 4 })
			return notes.map(n => n.artName).join("/") || "?"
		}).join(", ")
	}

	// 执行查找，优雅处理错误
	const results: TestResult[] = testCases.map(testCase => {
		try {
			return {
				...testCase,
				matches: findChord(testCase.midiPitches, {
					isStrict,
					...(rootNoteLocation !== "" ? { rootNoteLocation } : {})
				})
			}
		} catch (e) {
			return {
				...testCase,
				matches: [],
				error: e instanceof Error ? e.message : String(e)
			}
		}
	})

	// 将 pianoKeyId 转换为音符名称（不带八度）
	const getNoteName = (pianoKeyId: number): string => {
		const noteNames = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
		return noteNames[pianoKeyId] ?? "?"
	}

	// 渲染音符列表，高亮根音
	const renderNoteList = (ids: number[], rootId: number) => {
		return ids.map((id, idx) => {
			const isRoot = id === rootId
			return (
				<span key={id} style={{
					color: isRoot ? "#dc3545" : "inherit",
					fontWeight: isRoot ? "bold" : "normal"
				}}>
					{getNoteName(id)}
					{idx < ids.length - 1 && ", "}
				</span>
			)
		})
	}

	// 渲染纯数字列表，高亮根音
	const renderIdList = (ids: number[], rootId: number) => {
		return ids.map((id, idx) => {
			const isRoot = id === rootId
			return (
				<span key={id} style={{
					color: isRoot ? "#dc3545" : "#999",
					fontWeight: isRoot ? "bold" : "normal"
				}}>
					{id}
					{idx < ids.length - 1 && ", "}
				</span>
			)
		})
	}

	// 获取相似度颜色
	const getSimilarityColor = (similarity: number): string => {
		if (similarity >= 0.9) return "#28a745" // 绿色
		if (similarity >= 0.7) return "#ffc107" // 黄色
		return "#dc3545" // 红色
	}

	// 获取相似度背景
	const getSimilarityBackground = (similarity: number): string => {
		if (similarity >= 0.9) return "#d4edda"
		if (similarity >= 0.7) return "#fff3cd"
		return "transparent"
	}

	return (
		<div style={{ padding: 20, fontFamily: "monospace", maxWidth: 1600 }}>
			<h1>和弦查找测试 (findChord)</h1>
			<p style={{ marginBottom: 20, color: "#666" }}>
				使用 Jaccard 相似度进行和弦匹配，支持精确匹配和模糊匹配
			</p>

			{/* 控制面板 */}
			<div style={{
				marginBottom: 20,
				padding: 16,
				background: "#f5f5f5",
				borderRadius: 8,
				border: "1px solid #ddd"
			}}>
				<h3 style={{ margin: "0 0 12px 0", fontSize: 14 }}>配置选项</h3>
				<div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: 13, alignItems: "center" }}>
					<label style={{ display: "flex", alignItems: "center", gap: 6 }}>
						<input
							type="checkbox"
							checked={isStrict}
							onChange={e => setIsStrict(e.target.checked)}
						/>
						<span>只返回完全匹配 (isStrict)</span>
					</label>
					<label style={{ display: "flex", alignItems: "center", gap: 6 }}>
						<span>指定根音位置 (rootNoteLocation，留空为自动):</span>
						<input
							type="number"
							min="0"
							step="1"
							value={rootNoteLocation}
							onChange={e => setRootNoteLocation(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
							style={{ width: 60, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
						/>
					</label>
				</div>
			</div>

			<div style={{ marginBottom: 12, display: "flex", gap: 20, fontSize: 14, flexWrap: "wrap" }}>
				<span style={{ background: "#ffe6e6", color: "#dc3545", padding: "4px 8px", borderRadius: 4 }}>
					红色 = 相似度 &lt; 70%
				</span>
				<span style={{ background: "#fff3cd", color: "#856404", padding: "4px 8px", borderRadius: 4 }}>
					黄色 = 相似度 70%-90%
				</span>
				<span style={{ background: "#d4edda", color: "#155724", padding: "4px 8px", borderRadius: 4 }}>
					绿色 = 相似度 ≥ 90%
				</span>
			</div>

			{/* 变换类型图例 */}
			<div style={{ marginBottom: 20, display: "flex", gap: 15, fontSize: 13, flexWrap: "wrap" }}>
				<span style={{ background: "#fff3cd", color: "#856404", padding: "3px 8px", borderRadius: 3 }}>
					🔄 变化 (3→b3)
				</span>
				<span style={{ background: "#f8d7da", color: "#721c24", padding: "3px 8px", borderRadius: 3 }}>
					➖ 省略 (omit5)
				</span>
				<span style={{ background: "#d1ecf1", color: "#0c5460", padding: "3px 8px", borderRadius: 3 }}>
					➕ 添加 (add9)
				</span>
			</div>

			{results.map((result, idx) => (
				<div key={idx} style={{
					marginBottom: 30,
					padding: 16,
					background: "#fafafa",
					borderRadius: 8,
					border: "1px solid #e0e0e0"
				}}>
					{/* 标题 */}
					<div style={{ marginBottom: 12 }}>
						<h3 style={{ margin: 0, color: "#333", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
							{result.name}
							<span style={{ fontSize: 12, color: "#999", fontWeight: "normal" }}>
								MIDI: [{result.midiPitches.join(", ")}]
							</span>
							<span style={{ fontSize: 12, color: "#0d47a1", fontWeight: "normal" }}>
								→ {midiListToNoteNames(result.midiPitches)}
							</span>
						</h3>
						<p style={{ margin: "6px 0 0 0", color: "#666", fontSize: 13 }}>
							{result.description}
						</p>
					</div>

					{/* 匹配结果 */}
					{result.error ? (
						<p style={{ color: "#dc3545", background: "#ffe6e6", padding: 10, borderRadius: 4 }}>
							⚠️ {result.error}
						</p>
					) : result.matches.length === 0 ? (
						<p style={{ color: "#999", fontStyle: "italic", padding: 10 }}>无匹配结果</p>
					) : (
						<table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
							<thead>
								<tr style={{ background: "#e8e8e8" }}>
									<th style={{ padding: 8, textAlign: "left", border: "1px solid #ccc" }}>和弦</th>
									<th style={{ padding: 8, textAlign: "left", border: "1px solid #ccc" }}>相似度</th>
									<th style={{ padding: 8, textAlign: "center", border: "1px solid #ccc" }}>原位</th>
									<th style={{ padding: 8, textAlign: "left", border: "1px solid #ccc" }}>交集</th>
									<th style={{ padding: 8, textAlign: "left", border: "1px solid #ccc" }}>和弦音</th>
									<th style={{ padding: 8, textAlign: "left", border: "1px solid #ccc" }}>变换</th>
								<th style={{ padding: 8, textAlign: "center", border: "1px solid #ccc" }}>次数</th>
								</tr>
							</thead>
							<tbody>
								{result.matches.map((match, matchIdx) => {
									// 检查是否有 transform 字段（分析后的结果）
									const hasTransform = "transform" in match && "transformString" in match
									const transform = hasTransform ? (match as any).transform : null
									const transformString = hasTransform ? (match as any).transformString : null
									// 检查是否为原位和弦
									const isRootPosition = "isRootPosition" in match ? (match as any).isRootPosition : undefined

									return (
										<tr key={matchIdx} style={{
											background: getSimilarityBackground(match.similarity),
										}}>
											<td style={{ padding: 8, border: "1px solid #ccc", fontWeight: 500 }}>
												<code style={{ background: "#f0f0f0", padding: "2px 6px", borderRadius: 3, fontSize: 13 }}>
													{getNoteName(match.pianoKeyIdRoot)} {match.chordFormulaId}
												</code>
											</td>
											<td style={{ padding: 8, border: "1px solid #ccc" }}>
												<span style={{
													color: getSimilarityColor(match.similarity),
													fontWeight: match.similarity >= 0.9 ? "bold" : "normal",
													fontSize: match.similarity >= 0.9 ? 14 : 13
												}}>
													{(match.similarity * 100).toFixed(1)}%
												</span>
											</td>
											<td style={{ padding: 8, border: "1px solid #ccc", textAlign: "center" }}>
												{isRootPosition === true ? (
													<span style={{ color: "#28a745", fontWeight: "bold" }}>✓</span>
												) : isRootPosition === false ? (
													<span style={{ color: "#dc3545" }}>✗</span>
												) : (
													<span style={{ color: "#ccc" }}>-</span>
												)}
											</td>
											<td style={{ padding: 8, border: "1px solid #ccc" }}>
												[{renderNoteList(match.intersection, match.pianoKeyIdRoot)}]
												<span style={{ marginLeft: 6 }}>
													({renderIdList(match.intersection, match.pianoKeyIdRoot)})
												</span>
											</td>
											<td style={{ padding: 8, border: "1px solid #ccc", fontSize: 11 }}>
												[{renderNoteList(match.pianoKeyIdsSorted, match.pianoKeyIdRoot)}]
												<span style={{ marginLeft: 6 }}>
													({renderIdList(match.pianoKeyIdsSorted, match.pianoKeyIdRoot)})
												</span>
											</td>
											<td style={{ padding: 8, border: "1px solid #ccc", fontSize: 11 }}>
												{transformString ? (
													<span style={{ fontSize: 11 }}>
														{transformString.split(",").map((part, idx) => {
															// 区分不同类型的变换
															const isAlteration = part.includes("→")
															const isOmit = part.startsWith("omit")
															const isAdd = part.startsWith("add")

															let style: React.CSSProperties = {
																padding: "2px 6px",
																borderRadius: 3,
																marginRight: idx < transformString.split(",").length - 1 ? 4 : 0
															}

															if (isAlteration) {
																style.background = "#fff3cd" // 黄色 - 变化
																style.color = "#856404"
															} else if (isOmit) {
																style.background = "#f8d7da" // 红色 - 省略
																style.color = "#721c24"
															} else if (isAdd) {
																style.background = "#d1ecf1" // 蓝色 - 添加
																style.color = "#0c5460"
															}

															return (
																<span key={idx} style={style}>
																	{part}
																</span>
															)
														})}
													</span>
												) : (
													<span style={{ color: "#ccc" }}>-</span>
												)}
											</td>
											<td style={{ padding: 8, border: "1px solid #ccc", textAlign: "center" }}>
												{hasTransform && (match as any).transformCount !== undefined ? (
													<span style={{
														fontWeight: (match as any).transformCount > 0 ? "bold" : "normal",
														color: (match as any).transformCount > 0 ? "#6c757d" : "#ccc"
													}}>
														{(match as any).transformCount}
													</span>
												) : (
													<span style={{ color: "#ccc" }}>-</span>
												)}
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					)}

					{/* 统计信息 */}
					<div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
						找到 <strong>{result.matches.length}</strong> 个匹配结果
						{result.matches.length > 0 && (
							<span style={{ marginLeft: 10 }}>
								最高相似度: <strong style={{ color: getSimilarityColor(result.matches[0].similarity) }}>
									{(result.matches[0].similarity * 100).toFixed(1)}%
								</strong>
							</span>
						)}
					</div>
				</div>
			))}
		</div>
	)
}

export default FindComplexChordTest
