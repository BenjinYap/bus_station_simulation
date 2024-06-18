export class AddPassengerEvent extends Event {
  constructor(passenger) {
    super('add_passenger');
    this.passenger = passenger;
  }
}
