import { Component } from "react";
import { Layer } from "react-konva";
import aggregation from "../Prototype/aggregation";
import Data from "../Prototype/data";

class ContentLayer extends aggregation(Component, Data) {
	render() {
		return (
			<Layer>
				{this.props.connectors}
				{this.props.shapes}
			</Layer>
		);
	}
}

export default ContentLayer;