import React from "react";
import Konva from "konva";
import { Circle } from "react-konva";
import aggregation from "../Prototype/aggregation";
import Data from "../Prototype/data";
import Shapes from "../Prototype/Shapes";

class CircleShape extends aggregation(Shapes, Data) {
	componentDidMount() {
	}
	render() {
		const RADIUS = this.getRadius();
		const { name, stage, id } = this.props;

		return (
			<Shapes
				name={name}
				stage={stage}
				data={{ radius: RADIUS }}
				id={id}
				generateConnectors={this.props.generateConnectors}
			>
				<Circle
					radius={RADIUS}
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

export default React.memo(CircleShape);