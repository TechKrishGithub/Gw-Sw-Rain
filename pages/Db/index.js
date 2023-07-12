import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("Monitoring.db");

export default db;