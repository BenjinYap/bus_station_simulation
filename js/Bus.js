export class Bus {

  constructor() {

  }

  async loadPassengers() {
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
}
