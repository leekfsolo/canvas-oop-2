import { Component } from "react";
import { Arrow } from "react-konva";
import aggregation from "../Prototype/aggregation";
import Data from "../Prototype/data";

class Connector extends aggregation(Component, Data) {
	getConnectorPoints(from, to, fromType, toType) {
		const dx = to.x - from.x;
		const dy = to.y - from.y;
		let angle = Math.atan2(-dy, dx);

		const radius = this.getRadius();
		const fromOffset = fromType ? 0 : radius;
		const toOffset = toType ? 0 : radius;

		return [
			from.x + -radius * Math.cos(angle + Math.PI) + fromOffset,
			from.y + radius * Math.sin(angle + Math.PI) + fromOffset,
			to.x + -radius * Math.cos(angle) + toOffset,
			to.y + radius * Math.sin(angle) + toOffset,
		];
	}

	updateObjects() {
		const stage = this.props.stage.current;
		const { id, from, to } = this.props.data;

		const arrow = stage.findOne('#' + id);

		const fromNode = stage.find('#' + from)[0];
		const toNode = stage.find('#' + to)[0];

		const fromType = fromNode.findOne('.shape').attrs.hasOwnProperty('radius');
		const toType = toNode.findOne('.shape').attrs.hasOwnProperty('radius');

		const points = this.getConnectorPoints(fromNode.position(), toNode.position(), fromType, toType);
		arrow.setAttrs({ points });
	}

	componentDidMount() {
		this.updateObjects();
		const stage = this.props.stage.current;
		const groups = stage.find('.group-shape');
		groups.forEach(group => {
			group.on('dragmove', () => {
				this.updateObjects();
			});
		});
	}

	componentDidUpdate(prevProps) {
		const {
			connectors: prevConnectors,
			shapes: prevShapes
		} = prevProps;
		const {
			connectors: thisConnectors,
			shapes: thisShapes
		} = this.props;

		if (thisConnectors.length !== prevConnectors.length || thisShapes.length !== prevShapes.length) {
			this.updateObjects();
			const stage = this.props.stage.current;
			const groups = stage.find('.group-shape');
			groups.forEach(group => {
				group.on('dragmove', () => {
					this.updateObjects();
				});
			});
			if (this.arrowNode) {
				this.arrowNode.clone().cache();
			}
		}
	}

	render() {
		return <Arrow
			stroke="black"
			listening={false}
			id={this.props.data.id}
			ref={(n) => this.arrowNode = n}
			name="connector"
			shadowForStrokeEnabled={false}
			perfectDrawEnabled={false}
		/>;
	}
}

export default Connector;