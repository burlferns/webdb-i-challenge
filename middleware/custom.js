// ********************************************************
// validateAccountData
// ********************************************************
function validateAccountData(req, res, next) {
  const body = req.body;
    if(Object.keys(body).length === 0) {
      res.status(400).json({ message: "missing account data" });
    } 
    else if(!body.name) {
      res.status(400).json({ message: "missing required name field" });
    } 
    else if(!body.budget) {
      res.status(400).json({ message: "missing required budget field" });
    } 
    else {
      next();
    }
}

// ********************************************************
// validatePutData
// ********************************************************
function validatePutData(req, res, next) {
  const body = req.body;
    if(Object.keys(body).length === 0) {
      res.status(400).json({ message: "missing account data" });
    } 
    else if(!body.name && !body.budget) {
      res.status(400).json({ message: "missing required name and/or budget field" });
    } 
    else {
      next();
    }
}


// ********************************************************
// logger
// ********************************************************
function logger(req, res, next) {
  console.log(`[${new Date().toString()}] ${req.method} ${req.originalUrl}`);
  next();
}


// ********************************************************
// defaultResponse
// ********************************************************
function defaultResponse(req,res) {
  res.status(404).send(`<h2>You have used an unsupported URL</h2>`)
}



// ********************************************************
// ********************************************************
module.exports = {validateAccountData, logger, defaultResponse, validatePutData};