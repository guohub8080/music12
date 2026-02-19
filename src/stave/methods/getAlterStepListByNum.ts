// noinspection ES6PreferShortImport
import {reverse} from "lodash";

const li = ["F", "C", "G", "D", "A", "E", "B"]
const liReverse = reverse([...li])

export const getAlterStepListByNum = (num: number) => {
	if (num === 0) return [];
	if (num > 7 || num < -7) throw new Error("num must be between -7 and 7")
	if (num > 0) {
		return li.slice(0, num)
	}
	return liReverse.slice(0, Math.abs(num))
}

export default getAlterStepListByNum
