import React, { Component } from "react";
import { Group, Rect, Arrow, Text } from "react-konva";

class Toolbar extends Component {
	constructor() {
		super();
		this.state = {
			arrow: null,
			isDrawing: false,
			startPoints: []
		};
		this.groupNode = null;
		this.textNode = null;
		this.arrowNode = null;
	}

	componentDidMount() {
		const textNode = this.textNode;
		const groupNode = this.groupNode;

		textNode.clone().cache();
		groupNode.clone().cache();

		const { stage, id: fromId } = this.props;
		let arrow;

		textNode.on('mousedown', () => {
			arrow = <Arrow />;
			this.setState({
				startPoints: [textNode.x() + 10, textNode.y() + 10],
				isDrawing: true
			});
			stage.setAttrs({ draggable: false });
		});

		stage.on('mousemove', () => {
			if (!arrow) {
				return;
			}
			const pos = this.groupNode.getRelativePointerPosition();
			const points = [...this.state.startPoints, pos.x, pos.y];
			arrow = <Arrow
				stroke="black"
				listening={false}
				points={points}
				ref={(n) => this.arrowNode = n}
			/>;

			this.setState({ arrow });
		});

		stage.on('mouseover', (e) => {
			if (e.target.hasName('shape') && this.state.isDrawing && e.target.attrs.id !== fromId) {
				e.target.stroke("black");
			}
		});

		stage.on('mouseout', (e) => {
			if (e.target.hasName('shape') && this.state.isDrawing && e.target.attrs.id !== fromId) {
				e.target.stroke("");
			}
		});

		stage.on('mouseup', (e) => {
			stage.setAttrs({ draggable: true });
			if (!arrow) {
				return;
			}
			else {
				this.setState({
					isDrawing: false,
					arrow: null
				});
				arrow = null;
				if (!e.target.parent) { return; }
				const toId = e.target.parent.attrs.id;
				const count = stage.find('.connector');
				const id = `connector-${count.length}`;

				if (!toId) { }
				else if (toId !== fromId) {
					e.target.stroke('black');
					this.props.addConnector(id, fromId, toId);
				}
			}
		});
	}

	render() {
		const { name, data } = this.props;
		let width, height, radius;
		if (name === 'rect') {
			width = data.width;
			height = data.height;
		}
		else {
			radius = data.radius;
		}
		const WIDTH = width || radius * 2;
		const HEIGHT = height / 2 || radius;

		return (
			<Group
				name="toolbar"
				x={name === 'rect' ? 0 : -radius}
				y={name === 'rect' ? -HEIGHT - 10 : -radius * 2 - 10}
				ref={(n) => this.groupNode = n}
			>
				<Rect
					width={WIDTH}
					height={HEIGHT}
					fill='white'
					stroke='black'
					shadowBlur={3}
				/>
				<Text
					x={10}
					y={10}
					text={'→'}
					fontSize={20}
					fill='black'
					onMouseUp={this.endArrow}
					onMouseOver={() => document.body.style.cursor = 'crosshair'}
					onMouseOut={() => document.body.style.cursor = 'default'}
					ref={(n) => this.textNode = n}
				/>
				{this.state.isDrawing && this.state.arrow}
			</Group>
		);
	}
}

export default React.memo(Toolbar);