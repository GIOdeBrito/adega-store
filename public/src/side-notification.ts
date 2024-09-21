

/* Side notification file */

type ElementBaseArrange = { root: HTMLDivElement, icon: HTMLImageElement, p: HTMLParagraphElement };

class SideNotification
{
	static Information (text: string = ''): void
	{
		let obj: ElementBaseArrange = this.getBase();

		obj.p.innerText = text;
		obj.icon.src = '/assets/icons/lamp.webp';
	}

	static Warning (): void
	{

	}

	private static getBase (): ElementBaseArrange
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

		this.sortNotifications();

		let obj: ElementBaseArrange =
		{
			root: root,
			icon: icon,
			p: p
		};

		return obj;
	}

	private static sortNotifications (): void
	{
		let notifications = Array.from(document.querySelectorAll('div[data-notification="true"]')) as HTMLDivElement[];

		notifications.reverse().map((item: HTMLDivElement, i: number) =>
		{
			let posY: number = i * 5;
			item.style.top = `calc(4vh + ${posY}rem)`;
		});
	}
}

export default SideNotification;

