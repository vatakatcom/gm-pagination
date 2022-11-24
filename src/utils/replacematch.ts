export function replaceMatch(key: string, value: number, payload: string) {
	const arr = payload?.split(";") ?? [];

	return arr
		.map((a) => {
			if (new RegExp(`${key}:`).test(a)) return `${key}:${value}`;
			return a;
		})
		.join(";");
}
