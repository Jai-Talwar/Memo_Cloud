let mongoconnect = require("./db");
let express = require("express");
var cors = require("cors");
mongoconnect();
let app = express();
app.use(cors());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.listen(9000);
