
const ELEMENTS = {
	search: null,
	itemTemplate: null
};

class CardArea
{
	static #cards = [];

	static addCard (name, src, id)
	{
		const template = ELEMENTS.itemTemplate.cloneNode(true);

		template.querySelector('img').src = src;
		template.querySelector('p').innerText = name;

		template.querySelector('[data-button="view"]').addEventListener('pointerdown', () => {

			console.log('View ' + id);
		});

		template.querySelector('[data-button="add"]').addEventListener('pointerdown', () => {

			console.log('Add ' + id);
		});

		document.querySelector('[data-name="cards-area"]').appendChild(template);

		this.#cards.push({
			name: name,
			card: template,
			content: template.textContent.trim()
		});
	}
}

export default new class {

	initialize ()
	{
		ELEMENTS.search = document.querySelector('input[data-name="search-item"]');
		ELEMENTS.itemTemplate = document.querySelector('template[data-template-name="item-card"]').content.firstElementChild.cloneNode(true);
	}

	setControls ()
	{
		const search = ELEMENTS.search;

		search.addEventListener('input', ev => {

			const data = ev.target.value.trim();

			filterCards(data);
		});
	}

	hydrateCardArea ()
	{
		for(let i = 0; i < 12; i++)
		{
			CardArea.addCard('Wine', 'https://lymebaywinery.co.uk/wp-content/uploads/2025/03/WIF750-04_2.png', i);
		}
	}

}();
