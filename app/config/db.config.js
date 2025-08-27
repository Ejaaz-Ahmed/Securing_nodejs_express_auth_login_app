const dbConfig = {
  HOST: "localhost",
  USER: "ejaz",
  PASSWORD: "yourpassword",
  DB: "secure_auth_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export default dbConfig;
