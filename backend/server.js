const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jobKeywords = require('./jobKeywords');
const recruiters = require('./recruiters'); 

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/freelance', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


const freelancerSchema = new mongoose.Schema({
  name: String,
  resumeText: String,
  jobCategories: [String],
});

const recruiterSchema = new mongoose.Schema({
  name: String,
  jobCategory: String,
});

const Freelancer = mongoose.model('Freelancer', freelancerSchema);
const Recruiter = mongoose.model('Recruiter', recruiterSchema);


function matchJobCategory(resumeText) {
  const resumeLowercase = resumeText.toLowerCase();
  let matchedCategories = [];


  for (let jobCategory in jobKeywords) {
    let keywords = jobKeywords[jobCategory];
    let matchCount = 0;


    keywords.forEach(keyword => {
      if (resumeLowercase.includes(keyword.toLowerCase())) {
        matchCount++;
      }
    });

    if (matchCount > 0) {
      matchedCategories.push({
        category: jobCategory,
        matchCount: matchCount,
        matchPercentage: (matchCount / keywords.length) * 100
      });
    }
  }

  return matchedCategories;
}


app.post('/analyze-resume', (req, res) => {
  const { resume } = req.body; 

  const matchedCategories = matchJobCategory(resume);


  res.json({ matchedCategories });
});


app.post('/find-recruiters', async (req, res) => {
  const { matchedCategories } = req.body; 


  const categories = matchedCategories.map(item => item.category);

 
  const matchedRecruiters = recruiters.filter(recruiter =>
    categories.includes(recruiter.jobCategory)
  );

 
  res.json({ recruiters: matchedRecruiters });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
