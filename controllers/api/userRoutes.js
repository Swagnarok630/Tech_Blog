const router = require('express').Router();
const { Users } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const userNew = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userNew.dataValues.id;
      res.status(200).json(userNew);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = user.dataValues.id;
      console.log(user.dataValues.id)
      console.log(req.session.cookie);

      res
        .status(200)
        .json({ user: user, message: 'You are now logged in!' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
