const User = require('../models/User');

const index = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

const show = async (req, res) => {
  const _id = req.params.id;

  const info = await User.findById({ _id });
  if (!info) {
    res.json({ error: 'This users does not exists' });
    return;
  }

  res.json(info);
};

const store = async (req, res) => {
  const { email } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create(req.body);

    res.json({ success: 'User created' });
    return;
  }

  res.json({ error: 'This e-mail already exists' });
};

const update = async (req, res) => {
  const _id = req.params.id;
  const { name, age } = req.body;

  const user = await User.findOneAndUpdate(
    {
      _id,
    },
    {
      name,
      age,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!user) {
    res.json({ error: 'This user does not exists' });
    return;
  }

  res.json(user);
};

const destroy = async (req, res) => {
  const _id = req.params.id;

  const deletingUser = await User.findOneAndDelete({ _id });
  if (!deletingUser) {
    res.json({ error: 'This user does not exists' });
    return;
  }

  res.json({ success: 'User deleted' });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
