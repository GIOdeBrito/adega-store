

class Vector2
{
    #x;
    #y;

    constructor (x = Number(), y = Number())
    {
        this.#x = x;
        this.#y = y;
		
        this.#parseNumbers();
    }

	get x ()
	{
		return this.#x;
	}

	get y ()
	{
		return this.#y;
	}

    static get zero ()
    {
        return new Vector2(0, 0);
    }

    #parseNumbers ()
    {
        (typeof this.#x === 'number' ? this.#x = this.#x + 'px' : '');
        (typeof this.#y === 'number' ? this.#y = this.#y + 'px' : '');
    }
}

export {
	Vector2
}

