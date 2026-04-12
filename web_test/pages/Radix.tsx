/* eslint-disable no-mixed-spaces-and-tabs */
import {Radix} from "@music12/common/radix";
import {Interval} from "@music12/interval";
import {Note} from "@music12/note";

const RadixComps = () => {
	const show1 = () => {
		const note1 = new Note("C", 0, 4)
		console.log("初始音符：", note1.simpleDescription)
		const interval = new Interval("maj", 3)
		console.log("音程是", interval.simpleDescription, interval)
		console.log(note1.getNoteByInterval(interval))
	}

	return <>
		<div>
			<button onClick={show1}>点击</button>
		</div>
	</>
}

export default RadixComps

