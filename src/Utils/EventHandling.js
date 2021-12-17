import { EventEmitter } from "fbemitter";

class Events extends EventEmitter {
	onShapePositionChange() {
		this.emit('change', (arg) => console.log(arg));
	}
}

export default Events;