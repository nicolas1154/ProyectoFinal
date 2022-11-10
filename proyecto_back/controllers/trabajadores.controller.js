const Trabajador = require ("../models/trabajadores.model")

let response ={
    msg: "",
    exito: false
}

exports.create = function(req,res){
    let trabajador = new Trabajador({
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_p,
        apellido_m: req.body.apellido_m,
        telefono: req.body.telefono,
        mail: req.body.mail,
        direccion : req.body.direccion
    })

    trabajador.save(function(err){
        if(err){
            console.error(err), 
            response.exito = false,
            response.msg = "Error al guardar el trabajador"
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "El trabajador se guardó correctamente"
        res.json(response)
    })
}
exports.find = function(req,res){
    Trabajador.find(function(err, trabajadores){
        res.json(trabajadores)
    })
}

exports.findOne = function(req,res){
    Trabajador.findOne({_id: req.params.id},function(err, trabajador){
        res.json(trabajador)
    })
}

exports.update = function(req,res){
    let trabajador = {
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_p,
        apellido_m: req.body.apellido_m,
        telefono: req.body.telefono,
        mail: req.body.mail,
        direccion : req.body.direccion
    }

    Trabajador.findByIdAndUpdate(req.params.id, {$set: trabajador}, function(err){
        if(err){
            console.error(err), 
            response.exito = false,
            response.msg = "Error al modificar el trabajador"
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "El trabajador modifico correctamente"
        res.json(response)
    })
}
exports.remove = function(req,res){
    Trabajador.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err){
            console.error(err), 
            response.exito = false,
            response.msg = "Error al eliminar el trabajador"
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "El trabajador eliminado correctamente"
        res.json(response)
    })
}