// imports
const app = require('./app');
// load env
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Credit app listening on port ${PORT}`)
})