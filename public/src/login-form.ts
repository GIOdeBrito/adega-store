
import Modal from './modal.js';
import { httpPost } from "./http.js";

function setControls (): void
{
	let wrapper = document.querySelector("dialog > article[class='login-form-wrapper']") as HTMLDialogElement;

	let fieldUsr = wrapper.querySelector("input[name='user']") as HTMLInputElement;
	let fieldPwd = wrapper.querySelector("input[name='pwd']") as HTMLInputElement;
	let bsubmit = wrapper.querySelector("button[name='submit']") as HTMLButtonElement;

	bsubmit.onclick = (ev: MouseEvent) =>
	{
		ev.preventDefault();

		authUserInput(fieldUsr.value, fieldPwd.value);
	};
}

async function authUserInput (login: string, secret: string): Promise<void>
{
	let response = await httpPost("http://localhost:3002/api/v1/user-auth", { pwd: secret });

	console.log("Server", response);
}

function openLoginForm (): void
{
	let loginForm = new Modal('login', 'login-form');
	loginForm.onLoad = () => setControls();
}

export default openLoginForm;
