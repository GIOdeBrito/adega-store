
import Modal from './modal.js';
import { httpPost } from "./http.js";

function setControls ()
{
	let wrapper = document.querySelector("dialog > article[class='login-form-wrapper']");

	let fieldUsr = wrapper.querySelector("input[name='user']");
	let fieldPwd = wrapper.querySelector("input[name='pwd']");
	let bsubmit = wrapper.querySelector("button[name='submit']");

	bsubmit.onclick = (ev) =>
	{
		ev.preventDefault();

		authUserInput(fieldUsr.value, fieldPwd.value);
	};
}

async function authUserInput (login, secret)
{
	let response = await httpPost("http://localhost:3002/api/v1/user-auth", { pwd: secret });

	console.log("Server", response);
}

function openLoginForm ()
{
	let loginForm = new Modal('login', 'login-form');
	loginForm.onLoad = () => setControls();
}

export default openLoginForm;
