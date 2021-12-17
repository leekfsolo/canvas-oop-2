import React, { Component } from "react";
import { Group } from "react-konva";
import Toolbar from "../shapes/Toolbar";
import Connector from "./Connector";
import Events from "../Utils/EventEmitter";

class Shapes extends Component {
	constructor() {
		super();
		this.state = {
			isActive: false,
			connectors: []
		};
		this.node = null;
		this.onChange = Events;
	}

	getX() {
		return this.node.attrs.x;
	}

	getY() {
		return this.node.attrs.y;
	}

	onChange() {
		console.log(this);
	}

	addConnector(id, from, to) {
		const connector = <Connector data={{ id, from, to }} stage={this.props.stage} key={Math.random().toString()} />;
		this.props.generateConnectors(connector);

		const toNode = this.props.stage.current.find('#' + to)[0];

		const prevFromNodeConnectors = this.node.attrs.connectors;
		const prevToNodeConnectors = toNode.attrs.connectors;

		this.node.setAttrs({ connectors: [...prevFromNodeConnectors, { id, from, to }] });
		toNode.setAttrs({ connectors: [...prevToNodeConnectors, { id, from, to }] });

		this.setState({ connectors: this.node.attrs.connectors });
	}

	componentDidMount() {
		const stage = this.props.stage.current;
		const group = this.node;
		const shape = group.children[0];
		const { x, y } = shape.attrs;
		this.setState({ coordinate: { x, y } });

		shape.on('mouseover', (e) => {
			document.body.style.cursor = 'pointer';
		});
		shape.on('mouseout', () => document.body.style.cursor = 'default');

		shape.on('dragstart', (e) => {
			shape.stopDrag();

			const pos = stage.getRelativePointerPosition();
			const size = group.getRelativePointerPosition();

			group.setAttrs({
				x: pos.x - size.x / 2,
				y: pos.y - size.y / 2
			});
			group.startDrag();

			// Events.emit('onShapePositionChange', {
			// 	shape: this.node.attrs.id,
			// 	data: [this.node.attrs.connectors]
			// });

			this.onChange.emit(this);
		});

		shape.on('click', (e) => {
			this.setState({ isActive: !this.state.isActive });
			shape.setAttrs({ stroke: this.state.isActive ? "black" : "" });
		});

		shape.clone().cache();
	}

	render() {
		const { name, data, stage, id } = this.props;
		return (
			<Group
				x={window.innerWidth / 2}
				y={window.innerHeight / 2}
				ref={(n) => this.node = n}
				name="group-shape"
				id={id}
				connectors={this.state.connectors}
			>
				{this.state.isActive && <Toolbar
					name={name}
					data={data}
					stage={stage.current}
					id={id}
					addConnector={this.addConnector.bind(this)}
				/>}
				{this.props.children}
			</Group>
		);
	}
}

export default Shapes;