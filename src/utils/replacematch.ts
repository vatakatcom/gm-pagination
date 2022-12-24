export function replaceMatch(key: string, value: number, payload: string) {
	return (payload?.split(";") ?? [])
		.map((a) => (new RegExp(`${key}:`).test(a) ? `${key}:${value}` : a))
		.join(";");
}
