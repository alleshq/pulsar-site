import credentials from "../credentials";
import Sequelize from "sequelize";

import Client from "./Client";

//Create Instance
const db = new Sequelize(
	credentials.db.name,
	credentials.db.username,
	credentials.db.password,
	{
		host: credentials.db.host,
		dialect: "mariadb",
		logging: false,
		dialectOptions: {
			timezone: "Etc/GMT0"
		}
	}
);
export default db;

//Models
Client(db);
