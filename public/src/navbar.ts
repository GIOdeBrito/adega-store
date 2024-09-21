

import Modal from './modal.js';

window.addEventListener('load', () => navControls());

function navControls (): void
{
	let profile = document.querySelector('img[id="nav-profile"]') as HTMLImageElement;

	profile.onclick = (ev: MouseEvent) =>
	{
		ev.preventDefault();

		new Modal('login', 'login-form');
	};
}


