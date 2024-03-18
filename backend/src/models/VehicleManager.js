const AbstractManager = require("./AbstractManager");

class VehicleManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "vehicle" });
  }

  async create(vehicle) {
    const result = await this.database.query(
      `INSERT INTO vehicle (brand, model, user_id, plug_type_id) VALUES (?, ?, ?, ?)`,
      [vehicle.brand, vehicle.model, vehicle.user_id, vehicle.plug_type_id]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from vehicle where id = ?`,
      [id]
    );
    return rows[0];
  }

  async readCarByUser(userId) {
    const [rows] = await this.database.query(
      `select * from vehicle where user_id = ?`,
      [userId]
    );
    return rows;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from vehicle`);
    return rows;
  }

  async countAll() {
    const [rows] = await this.database
      .query(`SELECT COUNT(*) AS vehicle_count FROM
    vehicle`);
    return rows[0];
  }

  async delete(id) {
    const result = await this.database.query(
      `delete from vehicle where id = ?`,
      [id]
    );
    return result;
  }

  async update(vehicle, id) {
    const [rows] = await this.database.query(
      `update vehicle set brand = ?, model = ?, user_id = ?, plug_type_id = ? where id = ?`,
      [vehicle.brand, vehicle.model, vehicle.user_id, vehicle.plug_type_id, id]
    );
    return rows;
  }
}

module.exports = VehicleManager;
