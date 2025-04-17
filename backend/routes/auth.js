const express = require('express');
const router = express.Router();
const Freelancer = require('../models/Freelancer');
const { matchJob } = require('../utils/aiModel');


router.post('/job-match', async (req, res) => {
  const { resumeText } = req.body;

  try {
    
    const jobDescriptions = [
      "Looking for a skilled UI/UX designer with experience in Figma, Photoshop, and HTML.",
      "We need a full-stack developer with experience in React, Node.js, and MongoDB.",
      "Looking for a data scientist with Python, Machine Learning, and deep learning skills."
    ];

    // Call AI model to match the resume with job descriptions
    const matchScores = await matchJob(resumeText, jobDescriptions);

    return res.status(200).json({ matchScores });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error matching jobs');
  }
});

module.exports = router;
