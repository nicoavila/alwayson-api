var express = require('express');
var router = express.Router();
var models  = require('../models');

//Obtiene todos los hitos
router.get('/', (req, res, next) => {
  models.Milestone.findAll({
    include: [{
      model: models.User,
    }]
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

//Obtiene un hito en particular
router.get('/:milestone_id', (req, res, next) => {
  models.Milestone.findOne({
    where: {
      id: req.params.milestone_id
    }
  }).then((milestone) => {
    if (milestone == null) {
      return res.status(404).json({
        status: 404,
        message: 'El hito solicitado no ha sido encontrado'
      });
    }
    res.status(200).json({
      status: 200,
      data: milestone
    });
  });
});

//Crea un nuevo hito
router.post('/', (req, res, next) => {
  let newMilestone = {
    name: req.body.name,
    leader_id: req.body.leader_id,
    project_id: req.body.project_id,
    due_date: req.body.due_date
  }
  models.Milestone.create(newMilestone).then((milestone) => {
    res.status(200).json({
      status: 200,
      data: milestone
    });
  }, (error) => {
    return res.status(500).json({
      status: 500,
      message: 'Ocurrió un error al guardar el hito',
      detail: error.message
    });
  });
});

//Actualiza un nuevo hito
router.put('/:milestone_id', (req, res, next) => {
  let updateFields = {
    name: req.body.name,
    leader_id: req.body.leader_id,
    project_id: req.body.leader_id,
    due_date: req.body.due_date
  };
  let milestoneId = req.params.milestone_id
  for (let prop in updateFields) {
    if (updateFields[prop] == undefined) {
      delete updateFields[prop];
    }
  }
  models.Milestone.update(updateFields, { where: { id: milestoneId }}).then((milestone) => {
    if (milestone == 1) {
      res.status(200).json({
        status: 200,
        data: milestone
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: 'El hito que intenta editar no existe'
      });
    }
  }, (error) => {
    return res.status(500).json({
      status: 500,
      message: 'Ocurrió un error al actualizar el hito'
    });
  });
});

//Borra un hito
router.delete('/:milestone_id', (req, res, next) => {
  let milestoneId = req.params.milestone_id;
  models.Milestone.destroy({
    where: { id: milestoneId }
  }).then((milestone) => {
    if (milestone == 1) {
      res.status(200).json({
        status: 200,
        data: milestone
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: 'El hito que intenta eliminar no existe'
      });
    }
  }, (error) => {
    return res.status(500).json({
      status: 500,
      message: 'Ocurrió un error al borrar el hito'
    });
  });
});

module.exports = router;
