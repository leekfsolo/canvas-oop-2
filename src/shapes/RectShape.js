import React from "react";
import Konva from "konva";
import { Rect } from "react-konva";
import aggregation from "../Prototype/aggregation";
import Data from "../Prototype/data";
import Shapes from "../Prototype/Shapes";

class RectShape extends aggregation(Shapes, Data) {
	componentDidMount() {

	}

	render() {
		const { WIDTH, HEIGHT } = this.getRectData();
		const { name, stage, id } = this.props;

		return (
			<Shapes
				name={name}
				stage={stage}
				data={{ width: WIDTH, height: HEIGHT }}
				id={id}
				generateConnectors={this.props.generateConnectors}
			>
				<Rect
					width={WIDTH}
					height={HEIGHT}
					stroke=""
					fill={Konva.Util.getRandomColor()}
					name="shape"
					draggable
					shadowForStrokeEnabled={false}
					perfectDrawEnabled={false}
				/>
			</Shapes>
		);
	}
}

export default React.memo(RectShape);