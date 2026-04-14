
import ModalFactory from "./factories/modal-factory.js";
import AnimationFactory from "./factories/animation-factory.js";

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

	setControls ()
	{
		const navbar = document.querySelector('[data-label="navbar"]');

		const blogin = navbar.querySelector('a[data-label="b-login-form"]');
		setLoginControls(blogin);
	}

}();
