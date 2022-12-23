export function str2num(str: string): number {
	return [...str]
		.map((i) => (isFinite(Number(i)) === true || i === "." ? i : " "))
		.join("")
		.split(" ")
		.filter((i) => i !== "")
		.map((i) => Number(i))[0];
}
