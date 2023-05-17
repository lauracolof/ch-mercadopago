const app = require('./src/app');
require('dotenv').config()

const PORT = process.env.PORT;


app.listen(PORT, () => {
  console.log(`:: Server running on PORT: /${PORT} ::`)
})