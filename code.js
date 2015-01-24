{
    init: function(elevators, floors) {
		// helper global variables
		var lastElevatorUsed = 0;
		var powersaving = false;
        var lastCalls = [];

		// helper functions
		sendOneElevatorTo = function(floor) {
			// if there's already an elevator scheduled there, ditch this
			for (var e = 0; e < elevators.length; e++) {
				if (elevators[e].destinationQueue.indexOf(floor) != -1) {
					lastCall.push(floor);
					return;
				}
			}

			// TODO: round robin? seriously?
			if (lastElevatorUsed == elevators.length-1) {
				lastElevatorUsed = 0;
			} else {
				++lastElevatorUsed;
			}
			sendElevatorTo(elevators[lastElevatorUsed],floor);
		}

		sendElevatorTo = function(elevator, floor) {
			if (typeof(floor) == 'undefined') return;
			// if this elevator is already scheduled there, don't add to the queue
			if (elevator.destinationQueue.indexOf(floor) != -1) return;

				elevator.goToFloor(floor);
		}

		// elevator events
		var functioningElevators = elevators.length;
		if (powersaving) functioningElevators = 1;
		for (var e = 0; e < functioningElevators; e++) {
        	var elevator = elevators[e];
        	elevator.on("idle", function() {
				// TODO: we should send to where are people waiting
				sendElevatorTo(this,lastCalls.pop());
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
