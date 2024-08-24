

import { Vector2 } from "./vectors.js";

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
    #root = null;
    #background = null;
    #frame = null;
    #frameWindow = null;

    #options = new Map
    ([
        ['name', ''],
        ['view', ''],
        ['vector', Vector2.zero],
        ['zdepth', 11],
    ]);

    #onload = function () { };
	#onclose = function () { };
    #escapekeyevent = (ev) => { this.#escapeKeyPress(ev); }

    constructor (name, view = "default", x = 600, y = 400, zdepth = 11)
    {
        this.#options.set('name', name);
        this.#options.set('view', view);
        this.#options.set('zdepth', zdepth);
        this.#options.set('vector', new Vector2(x, y));

        this.#setElements();
        this.#setControls();

        ModalManager.add(this);
    }

    get zDepth ()
    {
        return parseInt(this.#options.get('zdepth'));
    }

	get Root ()
	{
		return this.#root;
	}

    set onLoad (func)
    {
        this.#onload = func;
    }

	set onClose (func)
	{
		this.#onclose = func;
	}

    #setElements ()
    {
        this.#root = document.createElement('dialog');
        this.#root.setAttribute('data-modalv3-name', this.#options.get('name'));
        this.#root.open = true;
        this.#root.style = `
            width: ${this.#options.get('vector').x};
            height: ${this.#options.get('vector').y};
            z-index: ${this.#options.get('zdepth')};
            left: calc(50% - ${this.#options.get('vector').x} / 2);
            top: calc(50% - ${this.#options.get('vector').y} / 2);
        `;

		this.#root.classList.add('modal-base');
		this.#root.classList.add('modal-appear-rise-fadein');

        this.#background = document.createElement('div');
        this.#background.style = `
            z-index: ${this.#options.get('zdepth') - 1};
        `;

		this.#background.classList.add('modal-background-base');
		this.#background.classList.add('modal-background-fadein');

        document.body.appendChild(this.#root);
        document.body.appendChild(this.#background);

        this.#fetchContent();
    }

    async #fetchContent ()
    {
        let data = await fetch('/api/v1/modal?name=' + this.#options.get('view'));
        let content = await data.text();

        this.#root.innerHTML = content;

		if(!this.#onload)
		{
			return;
		}

		this.#onload();
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
        let res = ModalManager.all.some(item => item.zDepth > this.zDepth);

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

		if(!this.#onclose)
		{
			return;
		}

		this.#onclose();
    }
}

export default Modal;

