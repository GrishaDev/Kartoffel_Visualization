var express = require('express');
var router = express.Router();
let methods = require('../logic/methods.js');

methods = new methods();

router.get('/', (req, res, next)=> { methods.getVisualization(req,res) });
router.get('/getData', (req, res, next)=> { methods.getData(req,res) });
router.get('/static', (req, res, next)=> { methods.getStatic(req,res) });

//dev:
router.get('/api/organizationgroups/path/:path', (req, res, next)=> { methods.getPath(req,res) });
router.get('/api/organizationgroups/id/:id', (req, res, next)=> { methods.getGroup(req,res) });

module.exports = router;
