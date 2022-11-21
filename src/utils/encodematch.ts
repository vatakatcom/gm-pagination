interface Result {
	[key: string]: number;
}

export function encodeMatch(str: string, match: string[], defaultValue = 1): Result {
	const result: Result = {};
	const arr = str?.split(";") ?? [];

	arr.forEach((a) => {
		match.forEach((b) => {
			if (new RegExp(`${b}:`).test(a)) {
				result[b] = Number(a.replace(`${b}:`, ""));
			} else {
				result[b] = defaultValue;
			}

			if (Number.isNaN(result[b])) throw new Error("Value is NaN");
		});
	});

	return result;
}
