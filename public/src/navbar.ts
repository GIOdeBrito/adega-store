

import openLoginForm from "./login-form.js";

window.addEventListener('load', () => navControls());

function navControls (): void
{
	let profileElements = document.querySelectorAll('img[id="nav-profile"], label[for="nav-profile"]') as NodeListOf<HTMLElement>;

	Array.from(profileElements).map(element =>
	{
		element.onclick = (ev: MouseEvent) =>
		{
			ev.preventDefault();

			openLoginForm();
		};
	});
}


