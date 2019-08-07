const _ = require('lodash');
const helper = require('../helper');
// Router
const router = app => {
  app.get('/', (request, response) => {
    response.send({
      message: 'Hi ! Im rabbit.',
    });
  });

  app.get('/checkPrimes/:number', (req, res) => {
    const max = req.params.number;
    res.send(helper.checkPrimes(max));
  });
  app.post('/checkPrimesWithPaging/', (req, res) => {
    let resp = {};
    const max = req.body.number;

    const listItem = helper.checkPrimes(max);

    let page = req.body.page || 1;

    let _limit = req.body.limit || 2;

    if (!Number.isInteger(max) || max <= 0 || max > 10000000) {
      resp = { status: false, mess: 'The input number required, please check format or limit number <= 10,000,000' };
      res.send(resp);
    }
    if (!Number.isInteger(page) || page <= 0) {
      resp = { status: false, mess: 'The page number required, please check format or valid number' };
      res.send(resp);
    }
    if (!Number.isInteger(_limit) || _limit <= 0) {
      resp = { status: false, mess: 'The limit number required, please check format or valid number' };
      res.send(resp);
    }

    listItem.sort((a, b) => a - b);
    let total = listItem.length;
    start = page * _limit - _limit;
    end = page * _limit;
    pages = Math.ceil(listItem.length / _limit);
    data = listItem.slice(start, end);

    resp = {
      total: total,
      rows: data,
      page: page,
      totalPage: pages,
    };
    res.send(resp);
  });
};

// Export the router
module.exports = router;
