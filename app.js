const express = require(`express`);
const bodyparser = require(`body-parser`);
const urlencoded = require("body-parser/lib/types/urlencoded");
const path = require(`path`);


const router = require(`./server/routes/routes`)
require(`dotenv`).config();



const PORT = process.env.PORT || 8080;
const app = express();

require(`./server/database/connection`);



app.set(`view engine`, `ejs`);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(`/`, router);
//app.use(`images`, express.static(path.resolve(__dirname, `images`)))




app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})