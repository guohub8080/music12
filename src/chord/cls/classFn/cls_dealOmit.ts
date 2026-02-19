import {t_intervalNum, t_transformPanel} from "../../static/types.ts";

const cls_dealOmit = (originTransformPanel: t_transformPanel, omitInterval: t_intervalNum): t_transformPanel => {
	const targetTransformPanel = originTransformPanel
	targetTransformPanel[omitInterval] = "omit"
	return targetTransformPanel
}


export default cls_dealOmit