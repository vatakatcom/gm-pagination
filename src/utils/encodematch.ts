interface Result {
	[key: string]: number | undefined;
}

export function encodeMatch(str: string | undefined, match: string[]): Result {
	const result: Result = {};
	const arr = str?.split(";") ?? [];

	match.forEach((b) => {
		arr.forEach((a) => {
			if (new RegExp(`${b}:`).test(a)) result[b] = Number(a.replace(`${b}:`, ""));
		});
	});

	return result;
}
