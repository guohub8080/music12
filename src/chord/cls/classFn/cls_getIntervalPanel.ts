import {t_intervalPanel, t_transformPanel} from "../../static/types.ts";
import {keys} from "lodash";


const cls_getIntervalPanel = (baseIntervalPanel: t_intervalPanel,
                              transformPanel: t_transformPanel): t_intervalPanel => {
	const targetIntervalPanel = {...baseIntervalPanel}
	for (const i_key of keys(baseIntervalPanel)) {
		if (!transformPanel[i_key]) continue
		if (transformPanel[i_key] === "omit") {
			targetIntervalPanel[i_key] = void 0
			continue
		}
		if (["maj", "min", "p", "dim", "aug"].includes(transformPanel[i_key])) {
			targetIntervalPanel[i_key] = transformPanel[i_key]
		}
	}
	return targetIntervalPanel
}


export default cls_getIntervalPanel