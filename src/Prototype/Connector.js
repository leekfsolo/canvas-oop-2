import { Arrow } from "react-konva";
import Shapes from "./Shapes";
import Events from "../Utils/EventHandling";

class Connector extends Shapes {
	getConnectorPoints(from, to, fromType, toType) {
		const dx = to.x - from.x;
		const dy = to.y - from.y;
		let angle = Math.atan2(-dy, dx);

		const radius = 40;
		const fromOffset = fromType ? 0 : radius;
		const toOffset = toType ? 0 : radius;

		return [
			from.x + -radius * Math.cos(angle + Math.PI) + fromOffset,
			from.y + radius * Math.sin(angle + Math.PI) + fromOffset,
			to.x + -radius * Math.cos(angle) + toOffset,
			to.y + radius * Math.sin(angle) + toOffset,
		];
	}

	updateObjects(data = this.props.data) {
		const stage = this.props.stage.current;
		const { id, from, to } = data;

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
		Events.addListener('onShapePositionChange', arg => {
			const connectors = arg.node.attrs.connectors;
			connectors.forEach(connector => this.updateObjects(connector));
		});
	}

	componentWillUnmount() {
		Events.removeCurrentListener();
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