const express = require("express");
const expressWs = require("express-ws");
const path = require("path");

const app = express();
expressWs(app);

const { proxy } = require("rtsp-relay")(app);

app.use(express.static("public"));

app.ws("/api/stream", (ws, req) => {
  const url = req.query.url;
  proxy({ url, transport: "tcp" })(ws);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server running on port " + port));
