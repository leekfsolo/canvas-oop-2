class Data {
	constructor() {
		this._width = 50;
		this._scale = 1;
		this._stagePos = { x: 0, y: 0 };
		this._radius = 40;
		this._widthShape = 80;
		this._heightShape = 80;
	}

	getWidth() {
		return this._width;
	}

	getScale() {
		return this._scale;
	}

	getStagePos() {
		return this._stagePos;
	}

	get2DRange() {
		const startX = Math.floor((-this._stagePos.x - window.innerWidth) / this._width) * this._width;
		const endX = Math.floor((-this._stagePos.x + window.innerWidth * 2) / this._width) * this._width;

		const startY = Math.floor((-this._stagePos.y - window.innerHeight) / this._width) * this._width;
		const endY = Math.floor((-this._stagePos.y + window.innerHeight * 2) / this._width) * this._width;

		return { startX, endX, startY, endY };
	}

	getRadius() {
		return this._radius;
	}

	getRectData() {
		return { WIDTH: this._widthShape, HEIGHT: this._heightShape };
	}

	setWidth(width) {
		this._width = width;
	}

	setScale(scale) {
		this._scale = scale;
	}

	setStagePos(stagePos) {
		this._stagePos = stagePos;
	}
}

export default Data;