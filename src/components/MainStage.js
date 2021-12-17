import { Component } from "react";
import { Stage } from "react-konva";
import aggregation from "../Prototype/aggregation";
import Data from "../Prototype/data";

class MainStage extends aggregation(Component, Data) {
	constructor() {
		super();
		this.state = {
			scale: this.getScale(),
			change: 0
		};
	}

	increment() {
		this.setState(curState => {
			return { change: curState.change + 1 };
		});
	}
	reset() {
		this.setState({ change: 0 });
	}

	getChange() {
		return this.state.change;
	}

	render() {
		const stagePos = this.getStagePos();
		const scaleBy = 0.99;

		const handleWheel = e => {
			e.evt.preventDefault();

			const stage = e.target.getStage();
			const oldScale = this.getScale();
			const pointer = stage.getPointerPosition();
			const mousePointTo = {
				x: (pointer.x - stage.x()) / oldScale,
				y: (pointer.y - stage.y()) / oldScale,
			};

			let direction = e.evt.deltaY > 0 ? 1 : -1;

			if (e.evt.ctrlKey) {
				direction = -direction;
			}

			const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
			if (newScale > 1.8 || newScale < 0.2) {
				return;
			}

			if (this.getChange() > 0) {
				this.reset();
				return;
			}

			this.setStagePos({
				x: pointer.x - mousePointTo.x * newScale,
				y: pointer.y - mousePointTo.y * newScale,
			});
			this.setScale(newScale);
			this.setState({ scale: newScale });
			this.increment();
		};

		return (
			<Stage
				ref={this.props.stageRef}
				width={window.innerWidth}
				height={window.innerHeight}
				draggable
				onDragEnd={e => {
					this.setStagePos({ ...e.currentTarget.position() });
				}}
				onWheel={handleWheel}
				scaleX={this.getScale()}
				scaleY={this.getScale()}
				x={stagePos.x}
				y={stagePos.y}
			>
				{this.props.children}
			</Stage>
		);
	}
}

export default MainStage;