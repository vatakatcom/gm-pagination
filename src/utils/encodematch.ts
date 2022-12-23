interface Result {
	[key: string]: number | string | undefined;
}

export function encodeMatch(str: string | undefined, match: string[]): Result {
	const result: Result = {};

	match.forEach((key) => {
		const keyString = `${key}:`;
		(str?.split(";") ?? []).forEach((item) => {
			if (new RegExp(keyString).test(item)) {
				const pureItem = item.replace(keyString, "");
				result[key] = Number(pureItem);
				if (Number.isNaN(result[key])) result[key] = pureItem;
			}
		});
	});

	return result;
}
