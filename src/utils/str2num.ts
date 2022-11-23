export function str2num(str: string) {
	return [...str]
		.map((i: number | string) => {
			if (isFinite(i as number) === true || i === ".") {
				return i;
			} else {
				return " ";
			}
		})
		.join("")
		.split(" ")
		.filter((i) => i != "")
		.map((i) => Number(i))[0];
}
