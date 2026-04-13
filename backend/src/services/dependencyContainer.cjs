
class DependencyContainer
{
	constructor() {
		this.factories = new Map();
		this.singletons = new Map();
	}

	singleton(name, factory) {
		this.factories.set(name, { factory, scope: 'singleton' });
	}

	transient(name, factory) {
		this.factories.set(name, { factory, scope: 'transient' });
	}

	get(name) {
		if (this.singletons.has(name)) {
			return this.singletons.get(name);
		}

		if (!this.factories.has(name)) {
			throw new Error(`Service '${name}' not registered`);
		}

		const { factory, scope } = this.factories.get(name);
		const instance = factory(this.get.bind(this));

		if (scope === 'singleton') {
			this.singletons.set(name, instance);
		}

		return instance;
	}
}

module.exports = DependencyContainer;
