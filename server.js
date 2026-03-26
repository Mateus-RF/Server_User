const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const SECRET = "meu_segredo"

const users = []

const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET,
    { expiresIn: "1h" }
  )

/* REGISTER */
app.post("/register", (req, res) => {

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: "username e password obrigatórios" })
  }

  const userExists = users.find(u => u.username === username)

  if (userExists) {
    return res.status(400).json({ message: "Usuário já existe" })
  }

  const newUser = {
    id: users.length + 1,
    username,
    password
  }

  users.push(newUser)

  res.json({
    message: "Usuário criado",
    user: {
      id: newUser.id,
      username: newUser.username
    },
    token: token
  })
})

/* LOGIN */
app.get("/login", (req, res) => {

  const { username, password } = req.query

  const user = users.find(
    u => u.username === username && u.password === password
  )

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" })
  }


  res.json({
    user: {
      id: user.id,
      username: user.username
    },
    token
  })
})

app.listen(3333, () => {
  console.log("API rodando em http://localhost:3333")
})