

import openLoginForm from "./login-form.js";

window.addEventListener('load', () => navControls());

function navControls ()
{
	let profileElements = document.querySelectorAll('img[id="nav-profile"], label[for="nav-profile"]')

	Array.from(profileElements).forEach(element =>
	{
		element.onclick = (ev) =>
		{
			ev.preventDefault();

			openLoginForm();
		};
	});
}


