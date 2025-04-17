const { PythonShell } = require('python-shell');

const matchJob = (resumeText, jobDescriptions) => {
  return new Promise((resolve, reject) => {
    const options = {
      mode: 'text',
      pythonPath: 'path/to/python', 
      pythonOptions: ['-u'],         
      scriptPath: './path/to/your/python/script',  
      args: [resumeText, ...jobDescriptions] 
    };

    PythonShell.run('model.py', options, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { matchJob };
