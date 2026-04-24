
function arrayDifference (a, b)
{
	const setB = new Set(b);
	return a.filter(x => !setB.has(x));
}

export {
	arrayDifference
};
