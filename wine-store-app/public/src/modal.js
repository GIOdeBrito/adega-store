

import { Point } from "./types.js";

class ModalManager
{
	static #modalCollection = [];

	static add (item)
	{
		this.#modalCollection.push(item);
	}

	static erase (item)
	{
		let toremove = this.#modalCollection.findIndex(collected => item === collected);

		if(toremove < 0)
		{
			return;
		}

		this.#modalCollection.splice(toremove, 1);
	}

	static get all ()
	{
		return this.#modalCollection;
	}
}

class Modal
{
	#root;
	#background;

	#name = '';
	#view = '';
	#point = Point.zero;
	#zdepth = 11;

	#onload = function () { };
	#onclose = function () { };
	#escapekeyevent = (ev) => { this.#escapeKeyPress(ev); };

	constructor (name, view = "default", x = 600, y = 400, zdepth = 11)
	{
		this.#name = name;
		this.#view = view;
		this.#zdepth = zdepth;
		this.#point = new Point(x, y);

		this.#createModal();
	}

	async #createModal ()
	{
		this.#root = createBaseModal(this.#name, this.#point, this.#zdepth);
		this.#background = createBaseBackground(this.#zdepth);

		await insertContent(this.#root, this.#view);

		this?.#onload();

		this.#setControls();

		// Shows dialog
		this.#root.open = true;

		ModalManager.add(this);
	}

	get zdepth ()
	{
		return this.#zdepth;
	}

	get root ()
	{
		return this.#root;
	}

	set onload (func)
	{
		this.#onload = func;
	}

	set onclose (func)
	{
		this.#onclose = func;
	}

	#setControls ()
	{
		this.#background.onclick = () =>
		{
			this.destroy();
		};

		window.addEventListener('keydown', this.#escapekeyevent);
	}

	#escapeKeyPress (ev)
	{
		if(ev.key !== 'Escape')
		{
			return;
		}

		/* Checks if there is a modal with a higher
		z-index than this one */
		let res = ModalManager.all.some(item => item.#zdepth > this.#zdepth);

		if(res)
		{
			return;
		}

		this.destroy();
	}

	destroy ()
	{
		this.#root.remove();
		this.#background.remove();

		window.removeEventListener('keydown', this.#escapekeyevent);

		ModalManager.erase(this);

		this?.#onclose();
	}
}

function createBaseModal (name, point, zdepth)
{
	let root = document.createElement('dialog');

	root.setAttribute('data-modalv3-name', name);
	//root.open = true;
	root.style = `
		width: ${point.x};
		height: ${point.y};
		z-index: ${zdepth};
		left: calc(50% - ${point.x} / 2);
		top: calc(50% - ${point.y} / 2);
	`;

	root.classList.add('modal-base');
	root.classList.add('modal-appear-rise-fadein');

	document.body.appendChild(root);

	return root;
}

function createBaseBackground (zdepth)
{
	let background = document.createElement('div');

	background.style = `
		z-index: ${zdepth - 1};
	`;

	background.classList.add('modal-background-base');
	background.classList.add('modal-background-fadein');

	document.body.appendChild(background);

	return background;
}

async function insertContent (root, view)
{
	let data = await fetch('/api/v1/modal?name=' + view);
	let content = await data.text();

	root.innerHTML = content;

	let scriptTags = root.querySelectorAll("script[src]");

	/* Manually adds the scripts so they are properly fetch'd */
	Array.from(scriptTags).forEach(async tag =>
	{
		let src = tag.src;
		let content = tag.innerText;
		let type = tag.type ?? "text/javascript";

		tag.remove();

		let script = document.createElement('script');

		script.innerText = content;
		script.src = src;
		script.type = type;

		root.appendChild(script);
	});

	return true;
}

export default Modal;

