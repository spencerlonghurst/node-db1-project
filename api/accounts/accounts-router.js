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
  res.json(req.account)
})

router.post('/', midware.checkAccountPayload, midware.checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create({name: req.body.name.trim(), budget:req.body.budget});
    res.json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', midware.checkAccountId, midware.checkAccountNameUnique, async (req, res, next) => {
  const updated = await Accounts.updateById(req.params.id, req.body)
  res.json(updated)
  try {
    req.json('update account')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', midware.checkAccountId, async (req, res, next) => {
  try {
    await Accounts.deleteById(req.params.id)
    res.json(req.account)
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
