
function searchInElement (container, keyword, selector = '*')
{
	return Array.from(container.querySelectorAll(selector))
		.filter(el => el.textContent.toLowerCase().includes(keyword.toLowerCase()));
}

export {
	searchInElement
};
