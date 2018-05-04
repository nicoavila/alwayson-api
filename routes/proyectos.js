const express = require('express');
const router = express.Router();
const models  = require('../models');

//Obtiene los proyectos
router.get('/', (req, res, next) => {
  models.Project.findAll({
    include: [
      { model: models.Milestone }
    ]
  }).then((projects) => {
    res.status(200).json({
      status: 200,
      data: projects
    });
  });
});

//Obtiene un proyecto en particular
router.get('/:projecto_id', (req, res, next) => {
  models.Project.findOne({
    where: {
      id: req.params.projecto_id
    }
  }).then((project) => {
    if (project == null) {
      return res.status(404).json({
        status: 404,
        message: 'El proyecto solicitado no ha sido encontrado'
      });
    }
    res.status(200).json({
      status: 200,
      data: project
    });
  });
});

//Crea un nuevo proyecto
router.post('/', (req, res, next) => {
  let newProject = {
    name: req.body.name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    description: req.body.description
  }
  models.Project.create(newProject).then((project) => {
    res.status(200).json({
      status: 200,
      data: project
    });
  }, (error) => {
    return res.status(500).json({
      status: 500,
      message: 'Ocurrió un error al guardar el proyecto',
      detail: error.message
    });
  });
});

//Actualiza un nuevo proyecto
router.put('/:project_id', (req, res, next) => {
  let updateFields = {
    name: req.body.name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    description: req.body.description
  };
  let projectId = req.params.project_id;
  for (let prop in updateFields) {
    if (updateFields[prop] == undefined) {
      delete updateFields[prop];
    }
  }
  models.Project.update(updateFields, { where: { id: projectId }}).then((project) => {
    if (project == 1) {
      res.status(200).json({
        status: 200,
        data: project
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: 'El proyecto que intenta editar no existe'
      });
    }
  }, (error) => {
    return res.status(500).json({
      status: 500,
      message: 'Ocurrió un error al actualizar el proyecto'
    });
  });
});

//Borra un proyecto
router.delete('/:project_id', (req, res, next) => {
  let projectId = req.params.project_id;
  models.Project.destroy({
    where: { id: projectId }
  }).then((project) => {
    if (project == 1) {
      res.status(200).json({
        status: 200,
        data: project
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: 'El proyecto que intenta eliminar no existe'
      });
    }
  }, (error) => {
    return res.status(500).json({
      status: 500,
      message: 'Ocurrió un error al borrar el proyecto'
    });
  });
});

module.exports = router;
