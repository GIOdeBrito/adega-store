

class Point
{
    #x;
    #y;

    constructor (x, y)
    {
        this.#x = this.#parseValue(x);
        this.#y = this.#parseValue(y);
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
        return new Point(0, 0);
    }

    #parseValue (val)
    {
		if(typeof val !== 'number')
		{
			return val;
		}

		return String(val) + 'px';
    }
}

export {
	Point
}

