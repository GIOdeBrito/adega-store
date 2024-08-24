

import Modal from './modal.js';

window.addEventListener('load', () => navControls());

function navControls ()
{
	window['nav-profile'].onclick = (ev) =>
	{
		ev.preventDefault();

		new Modal('login', 'login-form');
	};
}


