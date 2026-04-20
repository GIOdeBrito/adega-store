
import ModalFactory from "./factories/modal-factory.js";
import AnimationFactory from "./factories/animation-factory.js";

var NAVBAR_ELEMENT = null;

function elementLookup ()
{
	NAVBAR_ELEMENT = document.querySelector('[data-label="navbar"]');
}

function setControls ()
{
	const navbar = NAVBAR_ELEMENT;

	const blogin = navbar.querySelector('a[data-label="b-login-form"]');
	setLoginControls(blogin);
}

// Marks the selected page option on the navigation bar
function markSelected ()
{
	const path = window.location.pathname;

	const selected = NAVBAR_ELEMENT.querySelector(`a[href="${path}"]`);
	selected.classList.add('navbar-option-underline-current');
}

function setLoginControls (button)
{
	button.addEventListener('pointerdown', () => {

		ModalFactory.new('login', 'login-form-modal');

		const article = document.querySelector('dialog[data-modal-name="login"]');

		AnimationFactory.new(article)
			.rule("0%", "transform: translateY(30%); opacity: 0")
			.rule("100%", "transform: translateY(0%); opacity: 1")
			.duration(.65)
			.smooth()
			.play();
	});
}

export default new class {

	initialize ()
	{
		elementLookup();
		setControls();
		markSelected();
	}

}();
