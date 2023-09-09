class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
        <img src="${this.image}" class="card-img-top h-50" alt="car-image" />
        <div class="flex-box-col card-body mt-3 gap-3">
          <h5 class="card-title fw-normal fs-6">${this.manufacture}/${this.model}</h5>
          <h5 class="fw-bold">Rp  ${this.rentPerDay}  / hari</h5>
          <p class="card-text desc-card">
            ${this.description}
          </p>

          <ul class="icon-list-card">
            <li>
              <p><img class="icon-card" src="../assets/icon/fi_users.png" alt="people image" /><span class="fw-light fs-6">${this.capacity} orang</span></p>
            </li>
            <li>
              <p><img class="icon-card" src="../assets/icon/fi_settings.png" alt="people image" /><span class="fw-light fs-6"> ${this.transmission}</span></p>
            </li>
            <li>
              <p><img class="icon-card" src="../assets/icon/fi_calendar.png" alt="people image" /><span class="fw-light fs-6">Tahun ${this.year}</span></p>
            </li>
          </ul>
          <a href="#" class="btn button text-white py-3 fs-5">Pilih Mobil</a>
        </div>
      
    `;
  }
}
