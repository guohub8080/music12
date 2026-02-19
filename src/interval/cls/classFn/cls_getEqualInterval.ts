import {t_intervalObj} from "../../static/types";
import {IntervalError} from "../../../common/processError/errorTypes";
import intervalMeta from "../../static/intervalMeta";
import {Interval} from "../IntervalClass";

export default (intervalInstance: InstanceType<typeof Interval>,
                isSelfTypeExcluded = false, isAugDimExcluded = false, isDoubleAugDimExcluded = false) => {
	if (intervalInstance.num < 1) throw new IntervalError("Interval num cannot be 0 or negative!")
	//exclude some extreme interval: dim1 / double dim1 / double dim2
	if (intervalInstance.num === 1 && [10, 11].includes(intervalInstance.semitoneLocation)) {
		throw new IntervalError("Don't calculate the interval of dim1 or double dim1!")
	}
	if (intervalInstance.num === 2 && intervalInstance.semitoneLocation === 11) {
		throw new IntervalError("Don't calculate the interval of double dim2!")
	}
	// special process of p1
	if (intervalInstance.num === 1 && intervalInstance.semitoneLocation === 0) {
		if (isSelfTypeExcluded && isAugDimExcluded) return []
		if (isSelfTypeExcluded && !isAugDimExcluded) return [new Interval("dim", 2)]
		if (!isSelfTypeExcluded && !isAugDimExcluded) return [new Interval("p", 1),
			new Interval("dim", 2)]
	}
	const findIntervalOnSameLocation = intervalMeta.where("semitoneLocation",
		intervalInstance.semitoneLocation).all()
	if (!findIntervalOnSameLocation) throw new IntervalError("Internal bugs. Can't find same intervals.")
	const resultList = []
	const doPush = (item: t_intervalObj) => {
		// To avoid aug7 or aug+7
		const readyIntervalNum = item.num + 7 * (intervalInstance.factOctaveGap - item.octaveGap)
		if (readyIntervalNum <= 0) return
		resultList.push(new Interval(item.type, readyIntervalNum))
	}
	findIntervalOnSameLocation.forEach((x: t_intervalObj) => {
		if (isSelfTypeExcluded && x.type === intervalInstance.type) return
		if (isAugDimExcluded && ["aug", "dim"].includes(x.type)) return
		if (isDoubleAugDimExcluded && ["aug+", "dim-"].includes(x.type)) return
		doPush(x)
	})
	return resultList
}