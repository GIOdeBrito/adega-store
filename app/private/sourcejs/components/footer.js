
/**
* @fileoverview Footer component.
* @author Giordano de Brito
* @version 1.0.0
*/

class Footer extends HTMLElement
{
	#shadow;
	#leftSection;
	#rightSection;

	constructor ()
	{
		super();
		this.#shadow = this.attachShadow({ mode: 'open' });

		this.#attachStyle();
	}

	#attachStyle ()
	{
		let link = document.createElement('link');
		link.rel = "stylesheet";
		link.href = "/style/components/footer.css";
		this.#shadow.appendChild(link);
	}

	#createElements ()
	{
		let p = document.createElement('p');
		p.innerText = `Giordano de Brito - ${(new Date()).getFullYear()}`;
		this.#shadow.appendChild(p);
	}

	// When inserted into the DOM
	connectedCallback ()
	{
		this.#createElements();
	}

	disconnectedCallback ()
	{
		console.log(`${this.name} removed from DOM`);
	}
}

export default Footer;
