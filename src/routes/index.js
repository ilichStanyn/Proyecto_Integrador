const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=> {
    res.render('index'); /* para probar http://localhost:4000/ aca irian routes*/
    
});



module.exports = router;