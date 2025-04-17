const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Freelancer = require('../models/freelancerModel');
const Job = require('../models/jobModel');

// Register route
const register = async (req, res) => {
  const { name, email, password, domain, skills } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Freelancer({
    name,
    email,
    password: hashedPassword,
    domain,
    skills,
  });

  try {
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

// Login route
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Freelancer.findOne({ email });

  if (!user) {
    return res.status(400).send('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid password');
  }

  const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
  res.status(200).send({ token });
};

// Job match route
const jobMatch = async (req, res) => {
  const { jobId, freelancerId } = req.body;

  const freelancer = await Freelancer.findById(freelancerId);
  const job = await Job.findById(jobId);

  if (freelancer.domain !== job.domain) {
    return res.status(400).send('No match based on domain');
  }

  let matchScore = 0;
  freelancer.skills.forEach(skill => {
    if (job.requiredSkills.includes(skill)) {
      matchScore += 10;
    }
  });

  res.json({ matchScore });
};

module.exports = { register, login, jobMatch };
