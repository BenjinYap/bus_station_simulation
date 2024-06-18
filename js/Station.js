import {AddPassengerEvent} from "./Events/AddPassengerEvent.js";
import {RemovePassengerEvent} from "./Events/RemovePassengerEvent.js";

export class Station extends EventTarget {
  passengers = [];

  constructor() {
    super();
  }

  addPassenger(passenger) {
    this.passengers.push(passenger);
    this.dispatchEvent(new AddPassengerEvent(passenger));
  }

  removePassenger(passenger) {
    let theIndex = -1;

    //find the passenger to remove
    for(const i in this.passengers) {
      if(this.passengers[i].id === passenger.id) {
        theIndex = i;
        break;
      }
    }

    if(theIndex !== -1) {
      this.passengers.splice(theIndex, 1);
      this.dispatchEvent(new RemovePassengerEvent(passenger));
    }
  }
}
