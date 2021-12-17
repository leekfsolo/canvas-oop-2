import { Component } from "react";
import { Layer, Rect } from "react-konva";

import aggregation from "../Prototype/aggregation";
import Data from "../Prototype/data";

class GridLayer extends aggregation(Component, Data) {
	constructor() {
		super();
		this.node = null;
	}

	componentDidMount() {
		const grid = this.node;
		grid.cache();
	}

	render() {
		// const { startX, endX, startY, endY } = this.get2DRange();
		const WIDTH = this.getWidth();
		const gridComponents = [];
		for (let x = 0; x < window.innerWidth; x += WIDTH) {
			for (let y = 0; y < window.innerHeight; y += WIDTH) {
				gridComponents.push(
					<Rect
						key={Math.random().toString()}
						x={x}
						y={y}
						width={WIDTH}
						height={WIDTH}
						fill="white"
						stroke="gray"
						perfectDrawEnabled={false}
						shadowForStrokeEnabled={false}
					/>
				);
			}
		}

		return <Layer ref={(n) => this.node = n}>{gridComponents}</Layer>;
	}
}

export default GridLayer;