

class Vector2
{
    #x: string;
    #y: string;

    constructor (x: string | number, y: string | number)
    {
        this.#x = this.#parseValue(x);
        this.#y = this.#parseValue(y);
    }

	get x (): string
	{
		return this.#x;
	}

	get y (): string
	{
		return this.#y;
	}

    static get zero (): Vector2
    {
        return new Vector2(0, 0);
    }

    #parseValue (val: string | number): string
    {
		if(typeof val !== 'number')
		{
			return val;
		}

		return String(val) + 'px';
    }
}

export {
	Vector2
}

