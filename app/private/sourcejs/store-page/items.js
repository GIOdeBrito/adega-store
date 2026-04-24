
import { searchInElement } from "../utility/dom-elements.js";
import { isNullOrEmpty } from "../utility/strings.js";
import { arrayDifference } from "../utility/arrays.js";

const ELEMENTS = {
	search: null,
	itemTemplate: null,
	cardArea: null
};

class CardArea
{
	static #cards = [];

	static search (value)
	{
		const area = ELEMENTS.cardArea;
		const allitems = Array.from(area.querySelectorAll('div[data-item-id]'));

		const func_showAll = () => allitems.forEach(x => x.style.display = '');
		const func_hideItem = (item) => item.style.display = 'none';

		if(isNullOrEmpty(value))
		{
			func_showAll();
			return;
		}

		const items = searchInElement(area, value, 'div[data-item-id] > p')
			.map(x => x.parentElement);

		arrayDifference(allitems, items).forEach(x => func_hideItem(x));
	}

	static addCard (name, src, id)
	{
		const template = ELEMENTS.itemTemplate.cloneNode(true);

		template.querySelector('img').src = src;
		template.querySelector('p').innerText = name;

		template.setAttribute('data-item-id', id);

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
		ELEMENTS.cardArea = document.querySelector('[data-name="cards-area"]');
	}

	setControls ()
	{
		const search = ELEMENTS.search;

		search.addEventListener('input', ev => {

			const data = ev.target.value.trim();

			CardArea.search(data);
		});
	}

	hydrateCardArea ()
	{
		CardArea.addCard('Est Est', 'https://lymebaywinery.co.uk/wp-content/uploads/2025/03/WIF750-04_2.png', 1);
		CardArea.addCard('Butcher of Blaviken', 'https://lymebaywinery.co.uk/wp-content/uploads/2025/03/WIF750-04_2.png', 2);
		CardArea.addCard('Blood of Elves', 'https://lymebaywinery.co.uk/wp-content/uploads/2025/03/WIF750-04_2.png', 3);
	}

}();
