

import { Vector2 } from "./vectors.js";

class ModalManager
{
    static #modalCollection: Array<Modal> = [];

    static add (item: Modal): void
    {
        this.#modalCollection.push(item);
    }

    static erase (item: Modal): void
    {
        let toremove = this.#modalCollection.findIndex(collected => item === collected);

        if(toremove < 0)
        {
            return;
        }

        this.#modalCollection.splice(toremove, 1);
    }

    static get all (): Array<Modal>
    {
        return this.#modalCollection;
    }
}

type OnLoadCallback = () => void;
type OnCloseCallback = () => void;
type OnEscapeKeyCallback = (ev: KeyboardEvent) => void;

class Modal
{
    private root: HTMLDialogElement;
    private background: HTMLDivElement;

	private name: string = '';
	private view: string = '';
	private vector: Vector2 = Vector2.zero;
	private zdepth: number = 11;

    private onload: OnLoadCallback = function () { };
	private onclose: OnCloseCallback = function () { };
    private escapekeyevent: OnEscapeKeyCallback = (ev: KeyboardEvent) => { this.escapeKeyPress(ev); };

    constructor (name: string, view: string = "default", x: number = 600, y: number = 400, zdepth: number = 11)
    {
        this.name = name;
        this.view = view;
        this.zdepth = zdepth;
        this.vector = new Vector2(x, y);

		this.root = document.createElement('dialog');
		this.background = document.createElement('div');

        this.setElements();
        this.setControls();

        ModalManager.add(this);
    }

    get zDepth (): number
    {
		return this.zdepth;
    }

	get Root (): HTMLDialogElement
	{
		return this.root;
	}

    set onLoad (func: OnLoadCallback)
    {
        this.onload = func;
    }

	set onClose (func: OnCloseCallback)
	{
		this.onclose = func;
	}

    private setElements (): void
    {
        this.root.setAttribute('data-modalv3-name', this.name);
        this.root.open = true;
        this.root.style.cssText = `
            width: ${this.vector.x};
            height: ${this.vector.y};
            z-index: ${this.zdepth};
            left: calc(50% - ${this.vector.x} / 2);
            top: calc(50% - ${this.vector.y} / 2);
        `;

		this.root.classList.add('modal-base');
		this.root.classList.add('modal-appear-rise-fadein');

        this.background.style.cssText = `
            z-index: ${this.zdepth - 1};
        `;

		this.background.classList.add('modal-background-base');
		this.background.classList.add('modal-background-fadein');

        document.body.appendChild(this.root);
        document.body.appendChild(this.background);

        this.fetchContent();
    }

    private async fetchContent (): Promise<void>
    {
        let data = await fetch('/api/v1/modal?name=' + this.view);
        let content = await data.text();

        this.root.innerHTML = content;

		let scriptTags = this.root.querySelectorAll("script[src]") as NodeListOf<HTMLScriptElement>;

		/* Manually adds the scripts so they are properly fetch'd */
		Array.from(scriptTags).map(async tag =>
		{
			let src = tag.src;
			let content = tag.innerText;
			let ismodule = tag.type === "module" ? true : false;

			tag.remove();

			let scripttag = document.createElement('script');
			scripttag.innerText = content;
			scripttag.src = src;
			scripttag.type = (ismodule === true ? "module" : "");

			this.root.appendChild(scripttag);
		});

		if(!this.onload)
		{
			return;
		}

		this.onload();
    }

    private setControls (): void
    {
        this.background.onclick = () =>
        {
            this.destroy();
        };

        window.addEventListener('keydown', this.escapekeyevent);
    }

    private escapeKeyPress (ev: KeyboardEvent): void
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

    destroy (): void
    {
        this.root.remove();
        this.background.remove();

        window.removeEventListener('keydown', this.escapekeyevent);

        ModalManager.erase(this);

		if(!this.onclose)
		{
			return;
		}

		this.onclose();
    }
}

export default Modal;

