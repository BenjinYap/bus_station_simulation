export class RemovePassengerEvent extends Event {
  constructor(passenger) {
    super('remove_passenger');
    this.passenger = passenger;
  }
}
