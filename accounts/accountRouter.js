// Import Express and external middleware
const express = require('express');

// Import Express middleware
const router = express.Router();

// Import database access using knex
const knex = require("../data/dbConfig.js");


//Import custom middleware
const {validateAccountData, validatePutData} = require('../middleware/custom');


// ********************************************************
// POST /accts
// ********************************************************
router.post('/', validateAccountData, (req, res) => {
  knex("accounts")
    .insert(req.body, "id")
    .then(ids=>{   //This returns the id of the new entry
      // console.log("In POSTS /accts & ids is:",ids);

      // When you have a nested promise you put it in a return 
      // is what the instructor said. Then I think you need only one catch block
      return knex("accounts")
        .select("*")
        .where({ id:ids[0] })
        .first()  // When the promise is resolved it will return an array of 1 item. This says to use the first element in the array
        .then(acct=>{
          res.status(201).json(acct);
        })

    })
    .catch(err=>{
      console.log("In POSTS /accts & error is:",err);
      res.status(500).json({errorMessage: "Error adding the account"});
    })
});


// ********************************************************
// GET /accts
// ********************************************************
router.get('/', (req,res)=>{
  knex
    .select("*")
    .from("accounts")
    .then(accts=>{
      res.status(200).json(accts)
    })
    .catch(err=>{
      console.log("In GET /accts & error is:",err);
      res.status(500).json({errorMessage: "Error getting the accounts"});
    })
})


// ********************************************************
// GET /accts/:id
// ********************************************************
router.get('/:id', (req,res)=>{
  knex
    .select("*")
    .from("accounts")
    .where({ id:req.params.id })
    .first() // equivalent to accts[0] in the then block below
    .then(accts=>{
      // console.log("In GETS /accts/:id & accts is:",accts);
      if(accts) {
        res.status(200).json(accts);
      }
      else {
        res.status(400).json({ message: "invalid account id" });
      }     
    })
    .catch(err=>{
      console.log("In GET /accts/:id & error is:",err);
      res.status(500).json({errorMessage: "Error getting the account"});
    })
})


// ********************************************************
// PUT /accts/:id
// ********************************************************
router.put('/:id', validatePutData, (req,res)=>{
  knex("accounts")
    .where({ id:req.params.id })
    .update(req.body)
    .then(count=>{
      // console.log("In PUT /accts/:id & count is:",count);
      if(count===1) {
        res.status(200).json({message:`Account with id ${req.params.id} updated`});
      }
      else {
        res.status(400).json({ message: "Invalid account id" });
      }     
    })
    .catch(err=>{
      console.log("In PUT /accts/:id & error is:",err);
      res.status(500).json({errorMessage: "Error updating the account"});
    })
})


// ********************************************************
// DELETE /accts/:id
// ********************************************************
router.delete('/:id', (req,res)=>{
  knex("accounts")
    .where({ id:req.params.id })
    .del()
    .then(count=>{
      // console.log("In DELETE /accts/:id & count is:",count);
      if(count===1) {
        res.status(200).json({message:`Account with id ${req.params.id} deleted`});
      }
      else {
        res.status(400).json({ message: "Invalid account id" });
      }     
    })
    .catch(err=>{
      console.log("In DELETE /accts/:id & error is:",err);
      res.status(500).json({errorMessage: "Error deleting the account"});
    })
})


// ********************************************************
// ********************************************************
module.exports = router;