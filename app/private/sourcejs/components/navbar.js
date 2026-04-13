
/**
* @fileoverview Navigation bar component.
* @author Giordano de Brito
* @version 1.0.0
*/

class Navbar extends HTMLElement
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
		link.href = "/style/components/navbar.css";
		this.#shadow.appendChild(link);
	}

	#createElements ()
	{
		let nav = document.createElement('nav');
		this.#shadow.appendChild(nav);

		this.#leftSection = document.createElement('section');

		this.#addLeftOption('Home');
		this.#addLeftOption('About');

		nav.appendChild(this.#leftSection);

		this.#rightSection = document.createElement('section');

		let label = document.createElement('label');
		label.innerText = "Login";
		this.#rightSection.appendChild(label);

		let img = document.createElement('img');
		img.src = "/assets/icons/profile.webp";
		img.alt = "profile";
		this.#rightSection.appendChild(img);

		nav.appendChild(this.#rightSection);
	}

	#addLeftOption (name, link)
	{
		let a = document.createElement('a');
		a.innerText = name;
		a.href = link ?? '';
		this.#leftSection.appendChild(a);
	}

	// When inserted into the DOM
	connectedCallback ()
	{
		this.#createElements();
	}

	disconnectedCallback ()
	{
		console.log('Navbar removed from DOM');
	}
}

export default Navbar;
