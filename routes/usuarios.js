var express = require('express');
var router = express.Router();
var models  = require('../models');

//Obtiene los usuarios
router.get('/', (req, res, next) => {
  models.User.findAll().then((users) => {
    if (users.length == 0) {
      res.status(404).json({
        status: 404,
        message: 'No existen usuarios en el sistema'
      });
    }
    res.status(200).json({
      status: 200,
      data: users
    });
  });
});

//Obtiene un usuario en particular
router.get('/:usuario_id', (req, res, next) => {
  models.Project.findOne({
    where: {
      id: req.params.usuario_id
    }
  }).then((project) => {
    if (project == null) {
      res.status(404).json({
        status: 404,
        message: 'El usuario solicitado no ha sido encontrado'
      });
    }
    res.status(200).json({
      status: 200,
      data: project
    });
  });
});

//Actualiza un proyecto con la información que tenga

module.exports = router;
