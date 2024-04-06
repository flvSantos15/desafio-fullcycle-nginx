const express = require('express')
const mysql = require('mysql')
const { faker } = require('@faker-js/faker')

const app = express()
app.use(express.json())

const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const conection = mysql.createConnection(config)

app.get('/', (req, res) => {
  const name = faker.person.firstName()

  conection.query('USE mysql;')
  conection.query('CREATE DATABASE IF NOT EXISTS nodedb;')
  conection.query('USE nodedb;')
  conection.query(
    'CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255));'
  )
  conection.query(`INSERT INTO people(name) values ("${name}")`)
  conection.query('SELECT name FROM people', function (error, response) {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${
          response?.length > 0
            ? response?.map((user) => `<li>${user?.name}</li>`).join('')
            : ''
        }
      </ul>
    `)
  })
  conection.end()
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})
