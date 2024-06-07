

/* Side notification file */

class SideNotification
{
	static Information (text = '')
	{
		let obj = this.#_getBase();

		obj['paragraph'].innerText = text;
		obj['icon'].src = '/public/assets/icons/lamp.webp';
	}

	static Warning ()
	{

	}

	static #_getBase ()
	{
		let root = document.createElement('div');
		root.classList.add('s-notification');
		root.setAttribute('data-notification', 'true');
		document.body.appendChild(root);

		let icon = document.createElement('img');
		icon.alt = 'icon';
		root.appendChild(icon);

		let p = document.createElement('p');
		p.innerText = '?text?';
		root.appendChild(p);

		setTimeout(() => root.classList.add('s-notification-reveal'), 100);

		this.#_sortNotifications();

		return { root: root, icon: icon, paragraph: p };
	}

	static #_sortNotifications ()
	{
		let notifications = Array.from(document.querySelectorAll('div[data-notification="true"]'));

		notifications.reverse().map((item, i) =>
		{
			let posY = i * 5;
			item.style.top = `calc(4vh + ${posY}rem)`;
		});
	}
}

export default SideNotification;

