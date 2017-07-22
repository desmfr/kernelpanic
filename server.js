const express = require('express');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.static('_site'));

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send({ error: err.message })
  } else {
    try {
      next();
    } catch(e) {
      res.status(500).send({ error: e.message })
    }
  }
});

app.listen(port, () => {
  console.log(`KernelPanic is listening on ${port} !`)
});
