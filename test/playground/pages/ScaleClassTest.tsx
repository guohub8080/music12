import { toPairs } from "es-toolkit/compat"
import { Scale, SCALE_MODE_IDS, type T_ScaleModeId } from "@scale/index"
import type { I_AnalyzedChordResult } from "@find/findChord/index"
import { useState } from "react"

const PIANO_KEY_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const PIANO_KEY_NAMES_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
const DEGREE_NAMES = ["", "一度", "二度", "三度", "四度", "五度", "六度", "七度"]

const ScaleClassTest = () => {
	const [rootPianoKeyId, setRootPianoKeyId] = useState(0)
	const [scaleModeId, setScaleModeId] = useState<T_ScaleModeId>("NATURAL_MAJOR")
	const [selectedTab, setSelectedTab] = useState<string>("basic")

	// 创建 Scale 实例
	const scale = new Scale(rootPianoKeyId, scaleModeId)

	// 获取测试用的度数
	const testDegrees = [1, 2, 3, 4, 5, 6, 7]

	return (
		<div style={{ padding: 20, maxWidth: 1400, margin: "0 auto" }}>
			<h1>Scale 类测试</h1>
			<p style={{ color: "#666", marginBottom: 20 }}>
				基于 pianoKeyId 的新版 Scale 类完整测试
			</p>

			{/* 控制面板 */}
			<div style={{
				padding: 16,
				background: "#f8f9fa",
				borderRadius: 8,
				marginBottom: 20
			}}>
				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
					{/* 根音选择 */}
					<div>
						<label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>
							根音 (rootPianoKeyId): {rootPianoKeyId} = {PIANO_KEY_NAMES[rootPianoKeyId]}
						</label>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
							{PIANO_KEY_NAMES.map((name, i) => (
								<button
									key={i}
									onClick={() => setRootPianoKeyId(i)}
									style={{
										padding: "6px 12px",
										background: rootPianoKeyId === i ? "#007bff" : "#fff",
										color: rootPianoKeyId === i ? "#fff" : "#333",
										border: "1px solid #ccc",
										borderRadius: 4,
										cursor: "pointer",
									}}
								>
									{name}
								</button>
							))}
						</div>
					</div>

					{/* 调式选择 */}
					<div>
						<label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>
							调式 (scaleModeId): {scaleModeId}
						</label>
						<select
							value={scaleModeId}
							onChange={(e) => setScaleModeId(e.target.value as T_ScaleModeId)}
							style={{
								width: "100%",
								padding: "8px",
								border: "1px solid #ccc",
								borderRadius: 4,
								fontSize: 14,
							}}
						>
							{SCALE_MODE_IDS.map(mode => (
								<option key={mode} value={mode}>{mode}</option>
							))}
						</select>
					</div>
				</div>

				{/* 调式基本信息 */}
				<div style={{ marginTop: 16, padding: 12, background: "#e8f4fd", borderRadius: 6 }}>
					<strong>调式信息：</strong> {scale.modeName} ({scale.type})
					<span style={{ marginLeft: 16, color: "#666" }}>{scale.modeDescription}</span>
				</div>
			</div>

			{/* 标签页导航 */}
			<div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid #ddd" }}>
				{[
					{ id: "basic", label: "基础属性" },
					{ id: "pianoKeyIds", label: "钢琴键映射" },
					{ id: "degrees", label: "音级查询" },
					{ id: "notes", label: "音符获取" },
					{ id: "chords", label: "和弦查询" },
					{ id: "stats", label: "统计信息" },
				].map(tab => (
					<button
						key={tab.id}
						onClick={() => setSelectedTab(tab.id)}
						style={{
							padding: "10px 20px",
							background: selectedTab === tab.id ? "#007bff" : "transparent",
							color: selectedTab === tab.id ? "#fff" : "#333",
							border: "none",
							borderBottom: selectedTab === tab.id ? "2px solid #007bff" : "2px solid transparent",
							cursor: "pointer",
							fontWeight: selectedTab === tab.id ? "bold" : "normal",
						}}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* 标签页内容 */}
			<div style={{ background: "#fff", borderRadius: 8 }}>
				{/* 基础属性 */}
				{selectedTab === "basic" && (
					<div style={{ padding: 16 }}>
						<h3 style={{ marginTop: 0 }}>基础属性</h3>
						<table style={{ width: "100%", borderCollapse: "collapse" }}>
							<tbody>
								<tr style={{ borderBottom: "1px solid #eee" }}>
									<td style={{ padding: 12, fontWeight: "bold", width: 200 }}>rootPianoKeyId</td>
									<td style={{ padding: 12, fontFamily: "monospace", color: "#007bff" }}>
										{scale.rootPianoKeyId}
									</td>
								</tr>
								<tr style={{ borderBottom: "1px solid #eee" }}>
									<td style={{ padding: 12, fontWeight: "bold" }}>scaleModeId</td>
									<td style={{ padding: 12, fontFamily: "monospace", color: "#007bff" }}>
										{scale.scaleModeId}
									</td>
								</tr>
								<tr style={{ borderBottom: "1px solid #eee" }}>
									<td style={{ padding: 12, fontWeight: "bold" }}>modeName</td>
									<td style={{ padding: 12 }}>{scale.modeName}</td>
								</tr>
								<tr style={{ borderBottom: "1px solid #eee" }}>
									<td style={{ padding: 12, fontWeight: "bold" }}>type</td>
									<td style={{ padding: 12 }}>
										<span style={{
											padding: "4px 8px",
											background: scale.type === "major" ? "#d4edda" : scale.type === "minor" ? "#f8d7da" : "#fff3cd",
											borderRadius: 4,
											fontSize: 12,
										}}>
											{scale.type}
										</span>
									</td>
								</tr>
								<tr style={{ borderBottom: "1px solid #eee" }}>
									<td style={{ padding: 12, fontWeight: "bold" }}>modeDescription</td>
									<td style={{ padding: 12 }}>{scale.modeDescription}</td>
								</tr>
								<tr style={{ borderBottom: "1px solid #eee" }}>
									<td style={{ padding: 12, fontWeight: "bold" }}>simpleDescription</td>
									<td style={{ padding: 12, fontFamily: "monospace", background: "#f5f5f5", borderRadius: 4 }}>
										{scale.simpleDescription}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}

				{/* 钢琴键映射 */}
				{selectedTab === "pianoKeyIds" && (
					<div style={{ padding: 16 }}>
						<h3 style={{ marginTop: 0 }}>钢琴键映射</h3>

						{/* pianoKeyIds - 按度数顺序 */}
						<div style={{ marginBottom: 24 }}>
							<h4 style={{ color: "#007bff" }}>pianoKeyIds (按度数顺序 1-7)</h4>
							<div style={{ display: "flex", gap: 8, marginTop: 8 }}>
								{scale.pianoKeyIds.map((id, i) => (
									<div
										key={i}
										style={{
											padding: "12px 16px",
											background: "#f8f9fa",
											border: "1px solid #ddd",
											borderRadius: 6,
											textAlign: "center",
											minWidth: 80,
										}}
									>
										<div style={{ fontSize: 12, color: "#666" }}>度数 {i + 1}</div>
										<div style={{ fontSize: 18, fontWeight: "bold", color: "#007bff" }}>{id}</div>
										<div style={{ fontSize: 14 }}>{PIANO_KEY_NAMES[id]}</div>
									</div>
								))}
							</div>
						</div>

						{/* pianoKeyIdsSorted - 按音高排序 */}
						<div style={{ marginBottom: 24 }}>
							<h4 style={{ color: "#007bff" }}>pianoKeyIdsSorted (按音高排序)</h4>
							<div style={{ display: "flex", gap: 8, marginTop: 8 }}>
								{scale.pianoKeyIdsSorted.map((id, i) => (
									<div
										key={i}
										style={{
											padding: "12px 16px",
											background: "#e8f4fd",
											border: "1px solid #b3d9ff",
											borderRadius: 6,
											textAlign: "center",
											minWidth: 80,
										}}
									>
										<div style={{ fontSize: 18, fontWeight: "bold", color: "#007bff" }}>{id}</div>
										<div style={{ fontSize: 14 }}>{PIANO_KEY_NAMES[id]}</div>
									</div>
								))}
							</div>
						</div>

						{/* degreeToPianoKeyId */}
						<div style={{ marginBottom: 24 }}>
							<h4 style={{ color: "#007bff" }}>degreeToPianoKeyId</h4>
							<pre style={{ background: "#282c34", color: "#abb2bf", padding: 12, borderRadius: 6, overflowX: "auto" }}>
								{JSON.stringify(scale.degreeToPianoKeyId, null, 2)}
							</pre>
						</div>

						{/* pianoKeyIdToDegree */}
						<div style={{ marginBottom: 24 }}>
							<h4 style={{ color: "#007bff" }}>pianoKeyIdToDegree</h4>
							<pre style={{ background: "#282c34", color: "#abb2bf", padding: 12, borderRadius: 6, overflowX: "auto" }}>
								{JSON.stringify(scale.pianoKeyIdToDegree, null, 2)}
							</pre>
						</div>

						{/* degreeAlterationsMap */}
						<div>
							<h4 style={{ color: "#007bff" }}>degreeAlterationsMap (变音值)</h4>
							<div style={{ display: "flex", gap: 8, marginTop: 8 }}>
								{testDegrees.map(degree => {
									const alter = scale.getAlterByDegree(degree)
									const alterText = alter === 0 ? "" : alter > 0 ? "#".repeat(alter) : "b".repeat(Math.abs(alter))
									return (
										<div
											key={degree}
											style={{
												padding: "12px 16px",
												background: alter === 0 ? "#f8f9fa" : "#fff3cd",
												border: "1px solid #ddd",
												borderRadius: 6,
												textAlign: "center",
												minWidth: 80,
											}}
										>
											<div style={{ fontSize: 12, color: "#666" }}>{DEGREE_NAMES[degree]}</div>
											<div style={{ fontSize: 18, fontWeight: "bold", color: alter === 0 ? "#333" : "#856404" }}>
												{alter === 0 ? "—" : alter}
											</div>
											<div style={{ fontSize: 14 }}>{alterText || "自然"}</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				)}

				{/* 音级查询 */}
				{selectedTab === "degrees" && (
					<div style={{ padding: 16 }}>
						<h3 style={{ marginTop: 0 }}>音级查询方法</h3>

						{/* hasPianoKeyId */}
						<div style={{ marginBottom: 24 }}>
							<h4 style={{ color: "#007bff" }}>hasPianoKeyId(pianoKeyId)</h4>
							<div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
								{PIANO_KEY_NAMES.map((name, i) => {
									const has = scale.hasPianoKeyId(i)
									return (
										<div
											key={i}
											style={{
												padding: "8px 12px",
												background: has ? "#d4edda" : "#f8d7da",
												border: has ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
												borderRadius: 4,
												fontSize: 13,
											}}
										>
											{i}: {name} {has ? "✓" : "✗"}
										</div>
									)
								})}
							</div>
						</div>

						{/* getDegreeByPianoKeyId */}
						<div style={{ marginBottom: 24 }}>
							<h4 style={{ color: "#007bff" }}>getDegreeByPianoKeyId(pianoKeyId)</h4>
							<table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
								<thead>
									<tr style={{ background: "#f8f9fa" }}>
										<th style={{ padding: 8, textAlign: "left" }}>pianoKeyId</th>
										<th style={{ padding: 8, textAlign: "left" }}>音名</th>
										<th style={{ padding: 8, textAlign: "left" }}>度数</th>
									</tr>
								</thead>
								<tbody>
									{scale.pianoKeyIds.map((id, i) => {
										const degree = scale.getDegreeByPianoKeyId(id)
										return (
											<tr key={i} style={{ borderBottom: "1px solid #eee" }}>
												<td style={{ padding: 8 }}>{id}</td>
												<td style={{ padding: 8 }}>{PIANO_KEY_NAMES[id]}</td>
												<td style={{ padding: 8, fontWeight: "bold", color: "#007bff" }}>
													度数 {degree}
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>

						{/* getPianoKeyIdByDegree */}
						<div style={{ marginBottom: 24 }}>
							<h4 style={{ color: "#007bff" }}>getPianoKeyIdByDegree(degree)</h4>
							<div style={{ display: "flex", gap: 8, marginTop: 8 }}>
								{testDegrees.map(degree => {
									const id = scale.getPianoKeyIdByDegree(degree)
									return (
										<div
											key={degree}
											style={{
												padding: "12px 16px",
												background: "#f8f9fa",
												border: "1px solid #ddd",
												borderRadius: 6,
												textAlign: "center",
											}}
										>
											<div style={{ fontSize: 12, color: "#666" }}>{DEGREE_NAMES[degree]}</div>
											<div style={{ fontSize: 20, fontWeight: "bold", color: "#007bff" }}>{id}</div>
											<div style={{ fontSize: 14 }}>{PIANO_KEY_NAMES[id]}</div>
										</div>
									)
								})}
							</div>
						</div>

						{/* getAlterByDegree */}
						<div>
							<h4 style={{ color: "#007bff" }}>getAlterByDegree(degree)</h4>
							<table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
								<thead>
									<tr style={{ background: "#f8f9fa" }}>
										<th style={{ padding: 8, textAlign: "left" }}>度数</th>
										<th style={{ padding: 8, textAlign: "left" }}>pianoKeyId</th>
										<th style={{ padding: 8, textAlign: "left" }}>alter 值</th>
										<th style={{ padding: 8, textAlign: "left" }}>变音记号</th>
									</tr>
								</thead>
								<tbody>
									{testDegrees.map(degree => {
										const id = scale.getPianoKeyIdByDegree(degree)
										const alter = scale.getAlterByDegree(degree)
										const alterSymbol = alter === 0 ? "—" : alter > 0 ? "#".repeat(alter) : "b".repeat(Math.abs(alter))
										return (
											<tr key={degree} style={{ borderBottom: "1px solid #eee" }}>
												<td style={{ padding: 8 }}>{DEGREE_NAMES[degree]}</td>
												<td style={{ padding: 8 }}>{id} ({PIANO_KEY_NAMES[id]})</td>
												<td style={{ padding: 8, fontFamily: "monospace" }}>{alter}</td>
												<td style={{ padding: 8, fontWeight: "bold" }}>{alterSymbol}</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>

						{/* getDegreeAndAlter */}
						<div>
							<h4 style={{ color: "#007bff" }}>getDegreeAndAlter(pianoKeyId) - 合并方法</h4>
							<p style={{ color: "#666", fontSize: 14 }}>
								一步获取度数和变音值，返回 {"{ degree, alter }"} 或 null
							</p>
							<table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
								<thead>
									<tr style={{ background: "#f8f9fa" }}>
										<th style={{ padding: 8, textAlign: "left" }}>pianoKeyId</th>
										<th style={{ padding: 8, textAlign: "left" }}>音名</th>
										<th style={{ padding: 8, textAlign: "left" }}>结果</th>
									</tr>
								</thead>
								<tbody>
									{Array.from({ length: 12 }, (_, i) => {
										const result = scale.getDegreeAndAlter(i)
										const noteName = PIANO_KEY_NAMES[i]
										return (
											<tr key={i} style={{ borderBottom: "1px solid #eee", background: result === null ? "#fff0f0" : "#fff" }}>
												<td style={{ padding: 8, fontFamily: "monospace" }}>{i}</td>
												<td style={{ padding: 8, fontWeight: "bold" }}>{noteName}</td>
												<td style={{ padding: 8, fontFamily: "monospace" }}>
													{result === null
														? <span style={{ color: "#999" }}>null (不在调式中)</span>
														: <span>
															度数: <strong>{result.degree}</strong>
															{", alter: "}{result.alter}
															{result.alter !== 0 && <span> ({result.alter > 0 ? "#".repeat(result.alter) : "b".repeat(Math.abs(result.alter))})</span>}
														</span>
													}
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{/* 音符获取 */}
				{selectedTab === "notes" && (
					<div style={{ padding: 16 }}>
						<h3 style={{ marginTop: 0 }}>音符获取方法</h3>

						{/* getRootNote */}
						<div style={{ marginBottom: 24 }}>
							<h4 style={{ color: "#007bff" }}>getRootNote() - 返回 Note[] 数组</h4>
							<p style={{ color: "#666", fontSize: 14 }}>
								⚠️ 返回值是<strong>数组</strong>，包含根音的等音异名
							</p>
							<div style={{ display: "flex", gap: 12, marginTop: 8 }}>
								{scale.getRootNote().map((note, idx) => (
									<div
										key={idx}
										style={{
											padding: "12px 16px",
											background: idx === 0 ? "#007bff" : "#6c757d",
											color: "#fff",
											borderRadius: 6,
											fontSize: 16,
											fontWeight: idx === 0 ? "bold" : "normal",
										}}
									>
										{note.artName}{note.octave}
										{idx === 0 && <span style={{ fontSize: 12, marginLeft: 8 }}>(常用)</span>}
									</div>
								))}
							</div>
							<pre style={{ background: "#282c34", color: "#abb2bf", padding: 12, borderRadius: 6, marginTop: 12, fontSize: 12 }}>
								{JSON.stringify(scale.getRootNote().map(n => ({ step: n.step, alter: n.alter, octave: n.octave, artName: n.artName })), null, 2)}
							</pre>
						</div>

						{/* getNoteByDegree */}
						<div style={{ marginBottom: 24 }}>
							<h4 style={{ color: "#007bff" }}>getNoteByDegree(degree) - 返回 Note[] 数组</h4>
							<p style={{ color: "#666", fontSize: 14 }}>
								⚠️ 返回值是<strong>数组</strong>，包含该位置的等音异名（1-2 个）
							</p>
							<table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
								<thead>
									<tr style={{ background: "#f8f9fa" }}>
										<th style={{ padding: 8, textAlign: "left" }}>度数</th>
										<th style={{ padding: 8, textAlign: "left" }}>数组长度</th>
										<th style={{ padding: 8, textAlign: "left" }}>音符列表（等音异名）</th>
									</tr>
								</thead>
								<tbody>
									{testDegrees.map(degree => {
										const notes = scale.getNoteByDegree(degree)
										return (
											<tr key={degree} style={{ borderBottom: "1px solid #eee" }}>
												<td style={{ padding: 8 }}>{DEGREE_NAMES[degree]}</td>
												<td style={{ padding: 8, fontFamily: "monospace" }}>
													<span style={{
														background: notes.length > 1 ? "#fff3cd" : "#e8f4fd",
														padding: "2px 8px",
														borderRadius: 4,
														fontWeight: "bold"
													}}>
														Note[{notes.length}]
													</span>
												</td>
												<td style={{ padding: 8 }}>
													<div style={{ display: "flex", gap: 12 }}>
														{notes.map((note, idx) => (
															<span
																key={idx}
																style={{
																	padding: "4px 10px",
																	background: idx === 0 ? "#007bff" : "#6c757d",
																	color: "#fff",
																	borderRadius: 4,
																	fontSize: 14,
																	fontWeight: idx === 0 ? "bold" : "normal",
																}}
															>
																{note.artName}{note.octave}
																{notes.length > 1 && idx === 0 && " (常用)"}
															</span>
														))}
													</div>
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>

						{/* getNoteByIntervalNum */}
						<div>
							<h4 style={{ color: "#007bff" }}>getNoteByIntervalNum(num) - 跨八度音级</h4>
							<table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
								<thead>
									<tr style={{ background: "#f8f9fa" }}>
										<th style={{ padding: 8, textAlign: "left" }}>音级数</th>
										<th style={{ padding: 8, textAlign: "left" }}>pianoKeyId</th>
										<th style={{ padding: 8, textAlign: "left" }}>octave</th>
										<th style={{ padding: 8, textAlign: "left" }}>音名</th>
									</tr>
								</thead>
								<tbody>
									{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(num => {
										const result = scale.getNoteByIntervalNum(num)
										return (
											<tr key={num} style={{ borderBottom: "1px solid #eee" }}>
												<td style={{ padding: 8 }}>{num}</td>
												<td style={{ padding: 8, fontFamily: "monospace" }}>{result.pianoKeyId}</td>
												<td style={{ padding: 8, fontFamily: "monospace" }}>{result.octave}</td>
												<td style={{ padding: 8 }}>{PIANO_KEY_NAMES[result.pianoKeyId]}</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{/* 和弦查询 */}
					{selectedTab === "chords" && (
						<div style={{ padding: 16 }}>
							<h3 style={{ marginTop: 0 }}>和弦查询方法</h3>

							{/* 顺阶三和弦 */}
							<div style={{ marginBottom: 32 }}>
								<h4 style={{ color: "#007bff" }}>顺阶三和弦 getScaleDegreeChord3(degree)</h4>
								<table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
									<thead>
										<tr style={{ background: "#f8f9fa" }}>
											<th style={{ padding: 8, textAlign: "left" }}>音级</th>
											<th style={{ padding: 8, textAlign: "left" }}>和弦名</th>
											<th style={{ padding: 8, textAlign: "left" }}>根音</th>
											<th style={{ padding: 8, textAlign: "left" }}>音符</th>
											<th style={{ padding: 8, textAlign: "left" }}>相似度</th>
											<th style={{ padding: 8, textAlign: "left" }}>变换</th>
										</tr>
									</thead>
									<tbody>
										{testDegrees.map(degree => {
											const results = scale.getScaleDegreeChord3(degree)
											const rootId = scale.getPianoKeyIdByDegree(degree)
											return (
												<tr key={degree} style={{ borderBottom: "1px solid #eee" }}>
													<td style={{ padding: 8, fontWeight: "bold" }}>{PIANO_KEY_NAMES[rootId]}</td>
													<td style={{ padding: 8 }}>
														{results.map((r: I_AnalyzedChordResult, i: number) => (
															<span key={i} style={{
																display: "inline-block",
																padding: "3px 8px",
																marginRight: 4,
																marginBottom: 2,
																background: r.similarity === 1 ? "#d4edda" : "#fff3cd",
																borderRadius: 4,
																fontSize: 13,
																fontWeight: "bold",
															}}>
																{PIANO_KEY_NAMES[r.pianoKeyIdRoot]}{r.chordFormulaId}
															</span>
														))}
													</td>
													<td style={{ padding: 8, fontFamily: "monospace" }}>
														{results.map((r: I_AnalyzedChordResult, i: number) => (
															<span key={i} style={{ display: "block", fontSize: 13 }}>
																{PIANO_KEY_NAMES[r.pianoKeyIdRoot]}
																{!r.isRootPosition && <span style={{ color: "#999", marginLeft: 4 }}>(转位)</span>}
															</span>
														))}
													</td>
													<td style={{ padding: 8 }}>
														{results.map((r: I_AnalyzedChordResult, i: number) => (
															<div key={i} style={{ marginBottom: 2 }}>
																{r.pianoKeyIdsSorted.map((id: number) => (
																	<span key={id} style={{
																		display: "inline-block",
																		padding: "2px 6px",
																		marginRight: 3,
																		background: "#007bff",
																		color: "#fff",
																		borderRadius: 3,
																		fontSize: 12,
																		fontFamily: "monospace",
																	}}>
																		{PIANO_KEY_NAMES[id]}
																	</span>
																))}
															</div>
														))}
													</td>
													<td style={{ padding: 8, fontFamily: "monospace", fontSize: 13 }}>
														{results.map((r: I_AnalyzedChordResult, i: number) => (
															<span key={i} style={{ display: "block", color: r.similarity === 1 ? "#28a745" : "#856404" }}>
																{(r.similarity * 100).toFixed(0)}%
															</span>
														))}
													</td>
													<td style={{ padding: 8, fontSize: 13 }}>
														{results.map((r: I_AnalyzedChordResult, i: number) => (
															<span key={i} style={{ display: "block", color: r.transformCount === 0 ? "#28a745" : "#dc3545" }}>
																{r.transformString || "\u2014"}
															</span>
														))}
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>

							{/* 顺阶七和弦 */}
							<div>
								<h4 style={{ color: "#007bff" }}>顺阶七和弦 getScaleDegreeChord7(degree)</h4>
								<table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
									<thead>
										<tr style={{ background: "#f8f9fa" }}>
											<th style={{ padding: 8, textAlign: "left" }}>音级</th>
											<th style={{ padding: 8, textAlign: "left" }}>和弦名</th>
											<th style={{ padding: 8, textAlign: "left" }}>根音</th>
											<th style={{ padding: 8, textAlign: "left" }}>音符</th>
											<th style={{ padding: 8, textAlign: "left" }}>相似度</th>
											<th style={{ padding: 8, textAlign: "left" }}>变换</th>
										</tr>
									</thead>
									<tbody>
										{testDegrees.map(degree => {
											const results = scale.getScaleDegreeChord7(degree)
											const rootId = scale.getPianoKeyIdByDegree(degree)
											return (
												<tr key={degree} style={{ borderBottom: "1px solid #eee" }}>
													<td style={{ padding: 8, fontWeight: "bold" }}>{PIANO_KEY_NAMES[rootId]}</td>
													<td style={{ padding: 8 }}>
														{results.map((r: I_AnalyzedChordResult, i: number) => (
															<span key={i} style={{
																display: "inline-block",
																padding: "3px 8px",
																marginRight: 4,
																marginBottom: 2,
																background: r.similarity === 1 ? "#d4edda" : "#fff3cd",
																borderRadius: 4,
																fontSize: 13,
																fontWeight: "bold",
															}}>
																{PIANO_KEY_NAMES[r.pianoKeyIdRoot]}{r.chordFormulaId}
															</span>
														))}
													</td>
													<td style={{ padding: 8, fontFamily: "monospace" }}>
														{results.map((r: I_AnalyzedChordResult, i: number) => (
															<span key={i} style={{ display: "block", fontSize: 13 }}>
																{PIANO_KEY_NAMES[r.pianoKeyIdRoot]}
																{!r.isRootPosition && <span style={{ color: "#999", marginLeft: 4 }}>(转位)</span>}
															</span>
														))}
													</td>
													<td style={{ padding: 8 }}>
														{results.map((r: I_AnalyzedChordResult, i: number) => (
															<div key={i} style={{ marginBottom: 2 }}>
																{r.pianoKeyIdsSorted.map((id: number) => (
																	<span key={id} style={{
																		display: "inline-block",
																		padding: "2px 6px",
																		marginRight: 3,
																		background: "#6f42c1",
																		color: "#fff",
																		borderRadius: 3,
																		fontSize: 12,
																		fontFamily: "monospace",
																	}}>
																		{PIANO_KEY_NAMES[id]}
																	</span>
																))}
															</div>
														))}
													</td>
													<td style={{ padding: 8, fontFamily: "monospace", fontSize: 13 }}>
														{results.map((r: I_AnalyzedChordResult, i: number) => (
															<span key={i} style={{ display: "block", color: r.similarity === 1 ? "#28a745" : "#856404" }}>
																{(r.similarity * 100).toFixed(0)}%
															</span>
														))}
													</td>
													<td style={{ padding: 8, fontSize: 13 }}>
														{results.map((r: I_AnalyzedChordResult, i: number) => (
															<span key={i} style={{ display: "block", color: r.transformCount === 0 ? "#28a745" : "#dc3545" }}>
																{r.transformString || "\u2014"}
															</span>
														))}
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</div>
					)}

					{/* 统计信息 */}
				{selectedTab === "stats" && (
					<div style={{ padding: 16 }}>
						<h3 style={{ marginTop: 0 }}>统计信息</h3>

						<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
							{/* naturalNotesNum */}
							<div style={{ padding: 16, background: "#d4edda", border: "1px solid #c3e6cb", borderRadius: 6 }}>
								<div style={{ fontSize: 12, color: "#155724" }}>naturalNotesNum</div>
								<div style={{ fontSize: 32, fontWeight: "bold", color: "#155724" }}>
									{scale.naturalNotesNum}
								</div>
								<div style={{ fontSize: 13, color: "#155724" }}>自然音数量</div>
							</div>

							{/* alteredNotesNum */}
							<div style={{ padding: 16, background: "#f8d7da", border: "1px solid #f5c6cb", borderRadius: 6 }}>
								<div style={{ fontSize: 12, color: "#721c24" }}>alteredNotesNum</div>
								<div style={{ fontSize: 32, fontWeight: "bold", color: "#721c24" }}>
									{scale.alteredNotesNum}
								</div>
								<div style={{ fontSize: 13, color: "#721c24" }}>变化音数量</div>
							</div>

							{/* sharpOrFlatNotesNum */}
							<div style={{ padding: 16, background: "#fff3cd", border: "1px solid #ffeaa7", borderRadius: 6 }}>
								<div style={{ fontSize: 12, color: "#856404" }}>sharpOrFlatNotesNum</div>
								<div style={{ fontSize: 32, fontWeight: "bold", color: "#856404" }}>
									{scale.sharpOrFlatNotesNum}
								</div>
								<div style={{ fontSize: 13, color: "#856404" }}>单升降号音</div>
							</div>

							{/* doubleSharpOrFlatNotesNum */}
							<div style={{ padding: 16, background: "#e2e3e5", border: "1px solid #d6d8db", borderRadius: 6 }}>
								<div style={{ fontSize: 12, color: "#383d41" }}>doubleSharpOrFlatNotesNum</div>
								<div style={{ fontSize: 32, fontWeight: "bold", color: "#383d41" }}>
									{scale.doubleSharpOrFlatNotesNum}
								</div>
								<div style={{ fontSize: 13, color: "#383d41" }}>双升降号音</div>
							</div>

							{/* isTonicReplaced */}
							<div style={{
								padding: 16,
								background: scale.isTonicReplaced ? "#f8d7da" : "#d4edda",
								border: scale.isTonicReplaced ? "1px solid #f5c6cb" : "1px solid #c3e6cb",
								borderRadius: 6,
							}}>
								<div style={{ fontSize: 12, color: scale.isTonicReplaced ? "#721c24" : "#155724" }}>isTonicReplaced</div>
								<div style={{ fontSize: 32, fontWeight: "bold", color: scale.isTonicReplaced ? "#721c24" : "#155724" }}>
									{scale.isTonicReplaced ? "true" : "false"}
								</div>
								<div style={{ fontSize: 13, color: scale.isTonicReplaced ? "#721c24" : "#155724" }}>
									{scale.isTonicReplaced ? "全变化音（根音被替换）" : "含有自然音"}
								</div>
							</div>

							{/* pianoKeyIds length */}
							<div style={{ padding: 16, background: "#e8f4fd", border: "1px solid #b3d9ff", borderRadius: 6 }}>
								<div style={{ fontSize: 12, color: "#004085" }}>音级总数</div>
								<div style={{ fontSize: 32, fontWeight: "bold", color: "#004085" }}>
									{scale.pianoKeyIds.length}
								</div>
								<div style={{ fontSize: 13, color: "#004085" }}>个音级</div>
							</div>
						</div>

						{/* 统计详情 */}
						<div style={{ marginTop: 24, padding: 16, background: "#f8f9fa", borderRadius: 6 }}>
							<h4 style={{ marginTop: 0 }}>变音值分布</h4>
							<table style={{ width: "100%", borderCollapse: "collapse" }}>
								<thead>
									<tr style={{ background: "#e9ecef" }}>
										<th style={{ padding: 8, textAlign: "left" }}>变音值</th>
										<th style={{ padding: 8, textAlign: "left" }}>记号</th>
										<th style={{ padding: 8, textAlign: "left" }}>数量</th>
										<th style={{ padding: 8, textAlign: "left" }}>音级</th>
									</tr>
								</thead>
								<tbody>
									{[-2, -1, 0, 1, 2].map(alter => {
										const degrees = toPairs(scale.degreeAlterationsMap)
											.filter(([_, v]) => v === alter)
											.map(([d]) => parseInt(d))
										return (
											<tr key={alter} style={{ borderBottom: "1px solid #dee2e6" }}>
												<td style={{ padding: 8, fontFamily: "monospace" }}>{alter}</td>
												<td style={{ padding: 8, fontWeight: "bold" }}>
													{alter === 0 ? "♮" : alter > 0 ? "#".repeat(alter) : "b".repeat(Math.abs(alter))}
												</td>
												<td style={{ padding: 8, fontWeight: "bold", color: "#007bff" }}>{degrees.length}</td>
												<td style={{ padding: 8, fontSize: 13 }}>
													{degrees.length > 0 ? degrees.map(d => DEGREE_NAMES[d]).join(", ") : "-"}
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default ScaleClassTest
