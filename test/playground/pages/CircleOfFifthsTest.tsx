import { CircleOfFifths } from "@circle-of-fifths"
import FIFTH_META from "@circle-of-fifths/static/FIFTH_META"
import { getAlterStepListByNum } from "@stave"
import { getScaleByStaveAlters } from "@stave"

export default function CircleOfFifthsTest() {
	// 获取所有大调数据（按调号数量排序）
	const majorScales = FIFTH_META.where("circleID", ">=", 0)
		.where("circleID", "<=", 12)
		.where("mode", "major")
		.where("isTonicReplaced", false)
		.all()
		.sort((a, b) => a.rawStaveAlters - b.rawStaveAlters)

	// 获取所有小调数据
	const minorScales = FIFTH_META.where("circleID", ">=", 0)
		.where("circleID", "<=", 12)
		.where("mode", "minor")
		.where("isTonicReplaced", false)
		.all()
		.sort((a, b) => a.rawStaveAlters - b.rawStaveAlters)

	// 获取 CircleOfFifths 定义的升降号顺序
	const sharpOrder = CircleOfFifths.SHARP_ORDER
	const flatOrder = CircleOfFifths.FLAT_ORDER

	// 验证升降号顺序
	const verifyAlterOrder = () => {
		const results: { num: number; list: string[]; expected: string[]; match: boolean }[] = []

		for (let i = 1; i <= 7; i++) {
			const list = getAlterStepListByNum(i)
			const expected = Array.from(sharpOrder).slice(0, i)
			results.push({ num: i, list, expected, match: JSON.stringify(list) === JSON.stringify(expected) })
		}

		for (let i = -1; i >= -7; i--) {
			const list = getAlterStepListByNum(i)
			const expected = Array.from(flatOrder).slice(0, Math.abs(i))
			results.push({ num: i, list, expected, match: JSON.stringify(list) === JSON.stringify(expected) })
		}

		return results
	}

	const alterOrderResults = verifyAlterOrder()

	return (
		<div style={{ padding: 20, fontFamily: "monospace" }}>
			<h1>五度圈测试</h1>

			{/* CircleOfFifths 定义的升降号顺序 */}
			<h2>CircleOfFifths 定义的升降号顺序</h2>
			<div style={{ marginBottom: 20, padding: 15, background: "#f5f5f5", borderRadius: 8 }}>
				<p><strong>SHARP_ORDER（升号顺序）:</strong> {Array.from(sharpOrder).join(", ")}</p>
				<p><strong>FLAT_ORDER（降号顺序）:</strong> {Array.from(flatOrder).join(", ")}</p>
			</div>

			{/* 大调数据 */}
			<h2>大调数据（按调号数量排序）</h2>
			<table style={{ borderCollapse: "collapse", marginBottom: 20 }}>
				<thead>
					<tr style={{ background: "#e0e0e0" }}>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>调号</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>rawNoteStep</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>rawNoteAlter</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>actualNoteStep</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>actualNoteAlter</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>circleID</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>显示</th>
					</tr>
				</thead>
				<tbody>
					{majorScales.map((scale) => {
						const alterSymbol = scale.rawStaveAlters > 0 ? "#" : scale.rawStaveAlters < 0 ? "b" : ""
						const noteDisplay = `${scale.rawNoteStep}${scale.rawNoteAlter === 1 ? "#" : scale.rawNoteAlter === -1 ? "b" : ""}`
						return (
							<tr key={`${scale.rawNoteStep}-${scale.rawNoteAlter}`}>
								<td style={{ border: "1px solid #ccc", padding: 8, textAlign: "center" }}>
									{scale.rawStaveAlters === 0 ? "0" : scale.rawStaveAlters + alterSymbol}
								</td>
								<td style={{ border: "1px solid #ccc", padding: 8 }}>{scale.rawNoteStep}</td>
								<td style={{ border: "1px solid #ccc", padding: 8 }}>{scale.rawNoteAlter}</td>
								<td style={{ border: "1px solid #ccc", padding: 8 }}>{scale.actualNoteStep}</td>
								<td style={{ border: "1px solid #ccc", padding: 8 }}>{scale.actualNoteAlter}</td>
								<td style={{ border: "1px solid #ccc", padding: 8, textAlign: "center" }}>{scale.circleID}</td>
								<td style={{ border: "1px solid #ccc", padding: 8 }}>
									<strong>{noteDisplay}</strong> 大调
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>

			{/* 小调数据 */}
			<h2>小调数据（按调号数量排序）</h2>
			<table style={{ borderCollapse: "collapse", marginBottom: 20 }}>
				<thead>
					<tr style={{ background: "#e0e0e0" }}>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>调号</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>rawNoteStep</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>rawNoteAlter</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>actualNoteStep</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>actualNoteAlter</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>circleID</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>显示</th>
					</tr>
				</thead>
				<tbody>
					{minorScales.map((scale) => {
						const alterSymbol = scale.rawStaveAlters > 0 ? "#" : scale.rawStaveAlters < 0 ? "b" : ""
						const noteDisplay = `${scale.rawNoteStep}${scale.rawNoteAlter === 1 ? "#" : scale.rawNoteAlter === -1 ? "b" : ""}`
						return (
							<tr key={`${scale.rawNoteStep}-${scale.rawNoteAlter}`}>
								<td style={{ border: "1px solid #ccc", padding: 8, textAlign: "center" }}>
									{scale.rawStaveAlters === 0 ? "0" : scale.rawStaveAlters + alterSymbol}
								</td>
								<td style={{ border: "1px solid #ccc", padding: 8 }}>{scale.rawNoteStep}</td>
								<td style={{ border: "1px solid #ccc", padding: 8 }}>{scale.rawNoteAlter}</td>
								<td style={{ border: "1px solid #ccc", padding: 8 }}>{scale.actualNoteStep}</td>
								<td style={{ border: "1px solid #ccc", padding: 8 }}>{scale.actualNoteAlter}</td>
								<td style={{ border: "1px solid #ccc", padding: 8, textAlign: "center" }}>{scale.circleID}</td>
								<td style={{ border: "1px solid #ccc", padding: 8 }}>
									<strong>{noteDisplay}</strong> 小调
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>

			{/* 升降号顺序验证 */}
			<h2>升降号顺序验证</h2>
			<p style={{ marginBottom: 10, color: "#666" }}>
				验证 getAlterStepListByNum() 是否返回正确的升降号顺序
			</p>
			<table style={{ borderCollapse: "collapse", marginBottom: 20 }}>
				<thead>
					<tr style={{ background: "#e0e0e0" }}>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>调号</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>实际结果</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>预期结果</th>
						<th style={{ border: "1px solid #ccc", padding: 8 }}>是否匹配</th>
					</tr>
				</thead>
				<tbody>
					{alterOrderResults.map((result) => (
						<tr key={result.num}>
							<td style={{ border: "1px solid #ccc", padding: 8, textAlign: "center" }}>
								<strong>{result.num > 0 ? `${result.num}#` : result.num < 0 ? `${Math.abs(result.num)}b` : "0"}</strong>
							</td>
							<td style={{ border: "1px solid #ccc", padding: 8 }}>[{result.list.join(", ")}]</td>
							<td style={{ border: "1px solid #ccc", padding: 8 }}>[{result.expected.join(", ")}]</td>
							<td style={{
								border: "1px solid #ccc",
								padding: 8,
								textAlign: "center",
								background: result.match ? "#d4edda" : "#f8d7da",
								fontWeight: "bold",
								color: result.match ? "#155724" : "#721c24"
							}}>
								{result.match ? "✓ 匹配" : "✗ 不匹配"}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* 说明 */}
			<div style={{ marginTop: 30, padding: 15, background: "#fff3cd", borderRadius: 8, border: "1px solid #ffc107" }}>
				<h3 style={{ marginTop: 0 }}>说明</h3>
				<ul style={{ marginBottom: 0 }}>
					<li>升降号顺序由 <code>CircleOfFifths</code> 类定义</li>
					<li><code>CircleOfFifths.SHARP_ORDER</code>: 升号顺序 F → C → G → D → A → E → B</li>
					<li><code>CircleOfFifths.FLAT_ORDER</code>: 降号顺序 B → E → A → D → G → C → F</li>
					<li><code>getAlterStepListByNum()</code> 使用这些常量返回结果</li>
				</ul>
			</div>
		</div>
	)
}
