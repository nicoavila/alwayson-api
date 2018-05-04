const express = require('express');
const router = express.Router();
const models  = require('../models');
const dotenv = require('dotenv').config();
const request = require('request');

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

//Obtiene la información de Auth0 de un usuario
router.post('/auth0', (req, res, next) => {
  if (req.body.auth0_user_id == undefined) {
    return res.json(400,{
      status: 400,
      message: 'Debe proveer un auth0_user_id'
    });
  }

  auth0Authenticate().then((auth0Token) => {
    if (auth0Token) {
      auth0UserInfo(auth0Token, req.body.auth0_user_id).then((user) => {
        if (Object.keys(user).length > 0 && user.status == 200) {
          return res.json(200,{
            status: 200,
            data: user.body,
            message: 'Usuario encontrado en Auth0'
          });  
        } else {
          return res.json(user.status,{
            status: user.status,
            message: 'Ocurrió un error al consultar la información del usuario en Auth0'
          });
        }
      });
    } else {
      return res.json(500,{
        status: 500,
        message: 'No fue posible generar un token de autenticación en Auth0'
      });
    }
  });
});

function auth0Authenticate() {
  //Obtiene un token para consultar al Management API
  let options = {
    method: 'POST',
    url: process.env.AUTH0_URL + 'oauth/token',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_MANAGEMENT_CLIENTID,
      client_secret: process.env.AUTH0_MANAGEMENT_CLIENTSECRET,
      audience: process.env.AUTH0_URL + 'api/v2/'
    },
    json: true
  };

  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(body.access_token);
    });
  });
}

function auth0UserInfo(access_token, user_id) {
  let options = {
    method: 'GET',
    url: process.env.AUTH0_URL + 'api/v2/users/' + user_id,
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    json: true
  };
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        reject(err);
      }
      let response = {
        'status': res.statusCode,
        'body': body
      }
      resolve(response);
    });
  });
}

module.exports = router;
