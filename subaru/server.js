// const { createServer } = require('http')
// const { parse } = require('url')
const express = require("express");
const next = require("next");
const cors = require('cors')

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const redirects = [
  { from: "/", to: "/login" },
  { from: "/old-link-2", to: "https://externalsite.com/new-link-2" }
];

app.prepare().then(() => {
  const server = express();
  // const port = process.env.PORT || 5000;
  const port = 3000;

  server.use(cors())

  redirects.forEach(({ from, to, type = 301, method = "get" }) => {
    server[method](from, (req, res) => {
      res.redirect(type, to);
    });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
