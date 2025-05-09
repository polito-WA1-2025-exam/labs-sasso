const express = require('express'); //importa il modulo express
const app = express(); //crea l'app express
const dao = require('./dao'); //importa le funzioni definite nel dao

app.use(express.json());

//get alle pokes
app.get('/api/poke', async (req, res) => {
    try{
        const pokes = await dao.getAllPokes();
        res.json(pokes);
    }catch (err){
        res.status(500).json({error: err.message});
    }
});

//get poke by id
app.get('/api/poke/:id', async (req, res) =>{
    try{
        const poke = await dao.getPokeById(req.params.id);
        if (poke) res.json(poke);
        else res.status(404).json({error: 'Poke non trovato'});
    }catch(err){
        res.status(500).json({error : err.message});
    }

});

//create new poke
app.post('/api/poke', async (req, res) => {
    try{
        const newPoke = await dao.createPoke(req.body);
        res.status(201).json(newPoke);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
});

//elimina un poke by id
app.delete('/api/poke/:id', async (req, res) => {
    try{
        await dao.deletePoke(req.params.id);
        res.status(200).json({message :'Poke eliminato'});
    }catch(err){
            res.status(500).json({error: err.message});
    }
});

//aggiorna un poke
app.put('/api/poke/:id', async (req, res) => {
    try{
        await dao.updatePoke(req.params.id, req.body);
        res.status(200).json({message : 'Poke updated'});
    }catch(err){
        res.status(500).json({error : err.message });
    }
})

app.listen(3000, ()=>{
    console.log('Server in ascolto sulla porta 3000');
});