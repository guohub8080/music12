// noinspection ES6PreferShortImport

import {isNull, isUndefined} from "lodash";

const byDefault = (input: any, defaultValue: any) => {
	if (isNull(input) || isUndefined(input)) return defaultValue
	return input
}

export default byDefault