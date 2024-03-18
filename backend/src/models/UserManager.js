const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `INSERT INTO user (email, password) VALUES (?, ?)`,
      [user.email, user.password]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from user where id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from user`);
    return rows;
  }

  async countAll() {
    const [rows] = await this.database.query(
      `SELECT COUNT(*) AS user_count FROM user`
    );
    return rows[0];
  }

  async update(user, id) {
    const result = await this.database.query(
      `UPDATE user SET first_name = ?, last_name = ?, birth_date = ?, postal_code = ?, city = ? WHERE id = ?`,
      [
        user.first_name,
        user.last_name,
        user.birth_date,
        user.postal_code,
        user.city,
        id,
      ]
    );
    return result;
  }

  async delete(id) {
    const result = await this.database.query(`DELETE FROM user WHERE id = ?`, [
      id,
    ]);
    return result;
  }

  async findUserByEmail(email) {
    const [rows] = await this.database.query(
      `select id, password from user where email = ?`,
      [email]
    );
    return rows[0];
  }

  async getEmail(email) {
    const [rows] = await this.database.query(
      `select * from user where email = ?`,
      [email]
    );
    return rows[0];
  }

  async isAdmin(id) {
    const [rows] = await this.database.query(
      `select is_admin from user where id = ?`,
      [id]
    );
    return rows[0];
  }
}

module.exports = UserManager;
