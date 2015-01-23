{
    init: function(elevators, floors) {
		// helper functions
		sendOneElevatorTo = function(floor) {
			// TODO: for now, always send the first elevator
			sendElevatorTo(0,floor);
		}

		sendElevatorTo = function(elevator, floor) {
			// we might want to reschedule stuff here
			// for now, let's try a weird trick: stop everywhere on the way!
			// TODO: go from the last queued destination to floor, instead of "here to floor"
			var distance = elevators[elevator].currentFloor() - floor;
			if (distance > 1) {
				// going down
				for (var stop = elevators[elevator].currentFloor() - 1; stop >= floor; stop--) {
					elevators[elevator].goToFloor(stop);
				}
			} else if (distance < 1) {
				// going up
				for (var stop = elevators[elevator].currentFloor() + 1; stop >= floor; stop++) {
					elevators[elevator].goToFloor(stop);
				}

			} else {
				// it's right here!
				elevators[elevator].goToFloor(floor);
			}
		}

		// elevator events
		for (var e = 0; e < elevators.length; e++) {
        	var elevator = elevators[e];
        	elevator.on("idle", function() {
	       	});
			elevator.on("floor_button_pressed", function(floor) {
        	    this.goToFloor(floor);
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
