//-------------------------------------DEPENDENCIES---------------------------
const express = require('express');  
const router = express.Router();
const debug = require('debug')('dev') // remember to set DEBUG=dev
const axios = require('axios');
//-------------------------------------METHODS---------------------------

//-------------------------------------MOCKS---------------------------
let allRepos = []

//-------------------------------------ROUTES---------------------------
router.get('/all', (req, res)=>{
    debug('request from: ', req.originalUrl);
    res.send(allRepos)
})

router.post('/new', (req,res)=>{
    debug('request from: ', req.originalUrl);
    const { body } = req

    const repo = allRepos.find(item => item.id === parseInt(body.id) )

    if(!repo){
        allRepos.push(body);
    }

    res.send( {
        status: 'success',
        newRepo: body
    });
})

router.delete('/delete/:id', (req, res)=>{
    debug('request from: ', req.originalUrl);
    const { params } = req
    const repo = allRepos.find(item => item.id === parseInt(params.id) )
    if(!repo) return res.status(404).send( { status: 'error', message: 'repo not found :('});

    const index = allRepos.indexOf(repo);
    allRepos.splice(index, 1)

    res.send(repo)
})

router.put('/edit', (req, res)=>{
    debug('request from: ', req.originalUrl);
    const { body } = req
    
    const repo = allRepos.find(item => item.id === body.id )
    if(!repo) return res.status(404).send( { status: 'error', message: 'repo not found :('});

    const index = allRepos.indexOf(repo);
    allRepos[index]=body

    res.send(allRepos[index])
})

router.get('/:id', (req, res)=>{
    debug('request from: ', req.originalUrl);
    const { params } = req
    const repo = allRepos.find(item => item.id === parseInt(params.id) )
    if(!repo) return res.status(404).send( { status: 'error', message: 'repo not found :('});

    res.send(repo)
})

module.exports = router;
