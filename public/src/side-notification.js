
class SideNotification
{
    /**
	* @param {string} text
	* @static
	*/
    static Success (text)
    {
        let base = createBase();

        
    }

    /**
	* @param {string} text
	* @static
	*/
    static Information (text)
    {
        let base = createBase();


    }

    /**
	* @param {string} text
	* @static
	*/
    static Warning (text)
    {
        let base = createBase();


    }

    /**
	* Returns all active notification elements.
	* @returns {Array<HTMLDivElement>}
	* @static
	*/
    static getArray ()
    {
        let elems = Array.from(document.querySelectorAll('div[data-side-notification="true"]')));

        return elems.reverse();
    }

    static pushToQueue ()
    {
		this.getArray().forEach((item, i) =>
        {
            let posY = i * 8;

            item.style.top = `calc(10vh + ${posY}rem)`;
        });
    }
}

function createBase ()
{
	if(this.getArray().length > 2)
	{
		return;
	}

	let elem = document.createElement('div');
	elem.style = `
		width: 40rem;
		height: 7rem;
		position: fixed;
		top: 9vh;
		right: 0;
		padding: .6rem;
		background-color: rgb(23, 0, 217);
		z-index: 60000;
		box-sizing: border-box;
		overflow: hidden;
		display: flex;
		transition: top .3s ease-in-out, right .45s ease-in-out, transform .45s ease-in-out;
		transform: translateX(120%);
		border-radius: 1.8rem;
		box-shadow: 0 0 1.5rem #00000054;
	`;

	document.body.appendChild(elem);

	let img = document.createElement('img');
	img.alt = 'icon';
	img.style = `
		filter: invert(1);
		padding: .3rem;
		margin: 1rem;
		box-sizing: border-box;
	`;

	elem.appendChild(img);

	let text = document.createElement('p');
	text.innerText = "?text?";
	text.style = `
		word-break: break-word;
		margin: auto 1rem;
		box-sizing: border-box;
		color: #fff;
		overflow: hidden;
		font-weight: bold;
	`;

	elem.appendChild(text);

	elem.setAttribute('data-side-notification', 'true');

	showNotification(elem);
	pushToQueue();

	setTimeout(() => destroyNotification(elem), 2000);

	return elem;
}

function showNotification (elem)
{
	setTimeout(() => elem.style.transform = 'translateX(-5%)', 50);
}

function destroyNotification (elem)
{
	elem.style.transform = 'translateX(100%)';

	setTimeout(() => elem.remove(), 500);
}

export default SideNotification;
