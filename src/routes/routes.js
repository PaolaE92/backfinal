const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//Modelos
let propietarioSchema = require("../models/propietario");

//Crear 
router.route("/crear-propietario").post((req, res, next) => {
  console.log(req.body);
  propietarioSchema.create(req.body, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      console.log(data);
      console.log("propietario agregado con exito");
      res.json(data);
    }
  });
});

//Leer 
router.route("/listar-propietario").get((req, res, next) => {
  propietarioSchema
    .find((error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        console.log(data);
        res.json(data);
      }
    })
    .sort({ nombre: 1 });
  //.limit(2);
});

//Actualizar 
router.route("/actualizar-propietario/:id").put((req, res, next) => {
  propietarioSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        console.log(data);
        console.log("propietario actualizado con exito");
        res.json(data);
      }
    }
  );
});

//Borrar Estudiantes
router.route("/borrar-propietario/:id").delete((req, res, next) => {
  propietarioSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      console.log(data);
      console.log(" eliminado con exito");
      res.status(200).json({
        msg: data,
      });
    }
  });
});

//Obtener 
router.route("/obtener-propietario/:id").get((req, res, next) => {
  propietarioSchema.findById(req.params.id, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

//Busqueda 
router.route("/busqueda-propietario/:texto").get((req, res, next) => {
  propietarioSchema.find(
    {
      $or: [
        { nombre: { $regex: req.params.texto, $options: "i" } },
        { email: { $regex: req.params.texto, $options: "i" } },
        { cedula: { $regex: req.params.texto, $options: "i" } },
      ],
    },
    //{ nombre: { $regex: req.params.texto } },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
});

module.exports = router;