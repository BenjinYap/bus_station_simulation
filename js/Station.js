export class Station {
  passengers = [];

  constructor() {
  }

  addPassenger(passenger) {
    this.passengers.push(passenger);
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
    }
  }
}
