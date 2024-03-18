const AbstractManager = require("./AbstractManager");

class PlugTypesManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "plug_type" });
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from plug_type`);
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from plug_type where id = ?`,
      [id]
    );
    return rows[0];
  }
}

module.exports = PlugTypesManager;
