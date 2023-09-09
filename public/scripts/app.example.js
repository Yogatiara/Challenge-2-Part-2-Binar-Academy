class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carsContainerElement = document.getElementById("cars-container");
    this.tipeDriver = document.getElementById("tipeDriver");
    this.tanggal = document.getElementById("tanggal");
    this.waktuJemput = document.getElementById("waktuJemput");
    this.jumlahPenumpang = document.getElementById("jumlahPenumpang");
  }

  async init() {
    // await this.filterCar();
    await this.load()
    this.run()


    // Register click listener
    // this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run();
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.classList.add('col', 'shadow-sm', 'p-4', 'border', 'rounded-3', 'card-size');
      node.innerHTML = car.render();
      this.carsContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars();

    Car.init(cars);

  }

  async filterCar() {
    const cars = await Binar.listCars((data) => {
      const tanggalJemputData = new Date(data.availableAt).getTime();
      // console.log(tanggalJemputData);
      const tanggal = new Date(`${this.tanggal.value} ${this.waktuJemput.value}`).getTime();
      // console.log(tanggal);
      const checkWaktu = tanggalJemputData >= tanggal
      const availableAt = (this.tipeDriver.value === 'true' && data.available ? true : false)
      const notAvailableAt = (this.tipeDriver.value === 'false' && !data.available ? true : false)
      const penumpang = data.capacity >= this.jumlahPenumpang.value
      if (this.tipeDriver.value !== 'default' && this.tanggal.value !== '' && this.waktuJemput.value !== 'false' && this.jumlahPenumpang.value >= 0) {
        return (availableAt || notAvailableAt) && checkWaktu && penumpang
      } else if (this.tipeDriver.value !== 'default' && this.jumlahPenumpang.value > 0) {
        return (availableAt || notAvailableAt) && penumpang
      } else if (this.tanggal.value !== '' && this.waktuJemput.value !== 'false' && this.jumlahPenumpang.value > 0) {
        return checkWaktu && penumpang
      } else if (this.tanggal.value !== '' && this.waktuJemput.value !== 'false') {
        return checkWaktu
      } else if (this.tipeDriver.value !== 'default') {
        return (availableAt || notAvailableAt)
      } else {
        return penumpang
      }



      // console.log(data);
    });
    Car.init(cars);

  }

  clear = () => {
    let child = this.carsContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carsContainerElement.firstElementChild;
    }
  };
}
