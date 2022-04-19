const router = require('express').Router()

const Accounts = require('./accounts-model');

const midware = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(account => {
      res.json(account)
    })
    .catch(next)
})

router.get('/:id', midware.checkAccountId, async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id)
    res.json(account)
  } catch (err) {
    next(err)
  }
})

router.post('/', midware.checkAccountPayload, midware.checkAccountNameUnique, (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
})

router.put('/:id', midware.checkAccountId, midware.checkAccountNameUnique, midware.checkAccountPayload, (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
});

router.delete('/:id', midware.checkAccountId, (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
})




router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    // customMessage: 'Uh Oh, problem!',
    message: err.message,
    // stack: err.stack
  })
})


module.exports = router;
