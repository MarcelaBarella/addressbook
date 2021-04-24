module.exports = {
  username: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE,
  host: process.env.PSQL_HOST,
  dialect: 'postgres'
}
