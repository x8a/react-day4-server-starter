const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Project = require('../models/project-model')
const Task = require('../models/task-model')

router.post('/projects', (req, res, next) => {
    Project
    .create({
        title: req.body.title,
        description: req.body.description,
        tasks: [],
        owner: req.user._id
    })
    .then(response => res.json(response))
    .catch(e => res.json(e))
})

router.get('/projects', (req, res, next) => {
    Project
    .find()
    .populate('tasks')
    .then(projects => res.json(projects))
    .catch(e => res.json(e))
})

router.get('/projects/:id', (req, res, next) => {
    Project
    .findById(req.params.id)
    .populate('tasks')
    .then(project => res.json(project))
    .catch(e => res.json(e))
})

// PUT route => to update a specific project
router.put('/projects/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Project.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.json({ message: `Project with ${req.params.id} is updated successfully.` });
      })
      .catch(error => {
        res.json(error);
      });
  });
   
  // DELETE route => to delete a specific project
  router.delete('/projects/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Project.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ message: `Project with ${req.params.id} is removed successfully.` });
      })
      .catch(error => {
        res.json(error);
      });
  });

module.exports = router