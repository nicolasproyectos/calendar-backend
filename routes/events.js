const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerEventos,crearEvento,actualizarEvento,eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {isDate} = require('../helpers/isDate');
const router = Router();

//todas tienen que pasar por la validacion del JWT
router.use(validarJWT);


router.get('/', obtenerEventos );

router.post('/',
            [
                check('title','El titulo es requerido').not().isEmpty(),
                check('start','Fecha de inicio es obligatoria').custom( isDate ),
                check('end','Fecha de finalizacion es obligatoria').custom( isDate ),
                validarCampos
            ]
            ,
            crearEvento );

router.put('/:id', actualizarEvento );

router.delete('/:id', eliminarEvento );


module.exports = router;