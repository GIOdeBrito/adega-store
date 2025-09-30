
class Modal
{
	#shadow;

	constructor ()
	{
		super();

		const shadow = this.attachShadow({ mode: 'open' });
		this.#shadow = shadow;

		this.#createElements();
	}

	#createElements ()
	{
		let background = document.createElement('div');
		background.style = `
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: #000;
			transition: background-color .22s ease;
		`;

		this.#shadow.appendChild(background);
	}
}

customElements.define('g-modal', Modal);

export default Modal;
