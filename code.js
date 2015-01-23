{
    init: function(elevators, floors) {
		// helper functions
		sendElevatorTo = function(floor) {
			// for now, send the first elevator
			elevators[0].goToFloor(floor);
		}

		// elevator events
		for (var e = 0; e < elevators.length; e++) {
        	var elevator = elevators[e];
        	elevator.on("idle", function() {
	       	});
			elevator.on("floor_button_pressed", function(floor) {
        	    elevator.goToFloor(floor);
			});
		}

		// floor events
		for (var f = 0; f < floors.length; f++) {
			var floor = floors[f];
			floor.on("up_button_pressed down_button_pressed", function() {
				sendElevatorTo(this.floorNum());
			});
		}
    },

    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
