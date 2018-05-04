const express = require('express');
const router = express.Router();
const models  = require('../models');

//Obtiene todas las tareas
router.get('/', (req, res, next) => {
  models.Task.findAll({
    include: [
      { model: models.User},
      { model: models.Milestone}
    ]
  }).then((milestones) => {
    if (milestones.length == 0) {
      return res.status(404).json({
        status: 404,
        message: 'No existen hitos en el sistema'
      });
    }
    return res.status(200).json({
      status: 200,
      data: milestones
    });
  });
});

//Obtiene una tarea en particular
router.get('/:task_id', (req, res, next) => {
  models.Task.findOne({
    include: [
      { model: models.User},
      { model: models.Milestone}
    ],
    where: {
      id: req.params.task_id
    }
  }).then((task) => {
    if (task == null) {
      return res.status(404).json({
        status: 404,
        message: 'La tarea solicitada no ha sido encontrada'
      });
    }
    res.status(200).json({
      status: 200,
      data: task
    });
  });
});

//Crea una nueva tarea
router.post('/', (req, res, next) => {
  let newTask = {
    title: req.body.title,
    milestone_id: req.body.milestone_id,
    description: req.body.description,
    user_id: req.body.user_id
  }
  models.Task.create(newTask).then((task) => {
    res.status(200).json({
      status: 200,
      data: task
    });
  }, (error) => {
    return res.status(500).json({
      status: 500,
      message: 'Ocurrió un error al guardar la tarea',
      detail: error.message
    });
  });
});

//Actualiza una nueva tarea
router.put('/:task_id', (req, res, next) => {
  let updateFields = {
    title: req.body.title,
    milestone_id: req.body.milestone_id,
    description: req.body.description,
    user_id: req.body.user_id
  };
  let taskId = req.params.task_id
  for (let prop in updateFields) {
    if (updateFields[prop] == undefined) {
      delete updateFields[prop];
    }
  }
  models.Task.update(updateFields, { where: { id: taskId }}).then((task) => {
    if (task == 1) {
      res.status(200).json({
        status: 200,
        data: task
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: 'La tarea que intenta editar no existe'
      });
    }
  }, (error) => {
    return res.status(500).json({
      status: 500,
      message: 'Ocurrió un error al actualizar la tarea'
    });
  });
});

//Borra una tarea
router.delete('/:task_id', (req, res, next) => {
  let taskId = req.params.task_id;
  models.Task.destroy({
    where: { id: taskId }
  }).then((task) => {
    if (task == 1) {
      res.status(200).json({
        status: 200,
        data: task
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: 'La tarea que intenta eliminar no existe'
      });
    }
  }, (error) => {
    return res.status(500).json({
      status: 500,
      message: 'Ocurrió un error al borrar la tarea'
    });
  });
});

module.exports = router;
