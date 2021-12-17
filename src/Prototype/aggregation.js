const aggregation = (baseClass, ...mixins) => {
	class Base extends baseClass {
		constructor(...args) {
			super(...args);
			mixins.forEach(mixin => {
				copyProps(this, new mixin());
			});
		}

	}
	const copyProps = (target, source) => {
		Object.getOwnPropertyNames(source)
			.concat(Object.getOwnPropertySymbols(source))
			.forEach(prop => {
				if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
					Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
			});
	};
	mixins.forEach((mixin) => { // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
		copyProps(Base.prototype, mixin.prototype);
		copyProps(Base, mixin);
	});

	return Base;
};

export default aggregation;