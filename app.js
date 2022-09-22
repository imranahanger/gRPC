const express = require('express')
const app = express()
const client = require("./client");
const port = 8080;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.post('/', (req, res) => {
  client.addNews(
    {
      body: req.body.body,
      postImage: req.body.postImage,
      title: req.body.title,
    },
    (error, news) => {
      if (error) throw error;
      res.send({ data: news, msg: "Successfully created a news." });
    }
  );
})

app.get('/', (req, res) => {
  client.getAllNews({}, (error, news) => {
    if (error) throw error;
    res.send(news);
  });
})
app.get('/:id', (req, res) => {
  client.getNews(
    {
      id: req.params.id,
    },
    (error, news) => {
      if (error) throw error;
      res.send(news);
    }
  );
})

app.put('/:id', (req, res) => {
  client.editNews(
    {
      id: req.params.id,
      body: req.body.body,
      postImage: req.body.postImage,
      title: req.body.title,
    },
    (error, news) => {
      if (error) throw error;
      res.send(news);
    }
  );
})

app.delete('/:id', (req, res) => {
  client.deleteNews(
    {
      id: req.params.id,
    },
    (error, news) => {
      if (error) throw error;
      res.send({ msg: "Successfully deleted a news item." });
    }
  );
  client.getAllNews({}, (error, news) => {
    if (error) throw error;
    res.send(news);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})