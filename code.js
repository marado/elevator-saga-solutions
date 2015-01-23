{
    init: function(elevators, floors) {
		// helper functions
		sendOneElevatorTo = function(floor) {
			// TODO: for now, always send the first elevator
			sendElevatorTo(elevators[0],floor);
		}

		sendElevatorTo = function(elevator, floor) {
			// if this elevator is already scheduled there, don't add to the queue
			if (elevator.destinationQueue.indexOf(floor) != -1) return;

				elevator.goToFloor(floor);
		}

		// elevator events
		for (var e = 0; e < elevators.length; e++) {
        	var elevator = elevators[e];
        	elevator.on("idle", function() {
	       	});
			elevator.on("floor_button_pressed", function(floor) {
				sendElevatorTo(this,floor);
			});
			elevator.on("stopped_at_floor", function(floorNum) {
				// let's rethink our schedule
				var queue = this.destinationQueue;
				if (queue.length > 0) {
					// TODO: this is where we do voodoo:
					// this.stop(); // yeah, I'm drastic
					// this.currentFloor();
				}
			});
		}

		// floor events
		for (var f = 0; f < floors.length; f++) {
			var floor = floors[f];
			floor.on("up_button_pressed down_button_pressed", function() {
				sendOneElevatorTo(this.floorNum());
			});
		}
    },

    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
