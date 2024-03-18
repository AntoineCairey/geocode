const AbstractManager = require("./AbstractManager");

class ReservationManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "reservation" });
  }

  async create(reservation) {
    const result = await this.database.query(
      `INSERT INTO reservation (datetime, is_cancelled, user_id, charging_point_id) VALUES (?, ?, ?, ?)`,
      [
        reservation.datetime,
        reservation.is_cancelled,
        reservation.user_id,
        reservation.charging_point_id,
      ]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from reservation where id = ?`,
      [id]
    );
    return rows[0];
  }

  async readReservationByUser(userId) {
    const [rows] = await this.database.query(
      `select r.*, cp.name as charging_point_name,
        s.name as station_name, s.address as station_address
      from reservation r
      join charging_point cp on cp.id = r.charging_point_id
      join station s on s.id = cp.station_id
      where r.user_id = ?`,
      [userId]
    );
    return rows;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from reservation`);
    return rows;
  }

  async cancel(id) {
    const [rows] = await this.database.query(
      `update reservation set is_cancelled = 1 where id = ?`,
      [id]
    );
    return rows;
  }
}

module.exports = ReservationManager;
