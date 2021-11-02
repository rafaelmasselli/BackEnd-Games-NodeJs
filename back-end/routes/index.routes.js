const express = require('express');
const router = express.Router()

const jogo = [
        {
        nome: 'Pokemon Sapphire',
        image: 'https://i.pinimg.com/originals/77/0b/1d/770b1dc33cd81d6e3c3a4031c6301afa.gif',
        genero: 'RPG',
        jogou: 'Sim',
        avaliacao:9,
        ID: 1
       
    },
            {

        nome: 'Pokemon ruby',
        image: 'https://64.media.tumblr.com/f84d11d0c29a0f37cbb609f8149ccf70/tumblr_nyt6lpODCb1s3bc1no1_500.gifv',
        genero: 'RPG',
        jogou: 'Sim',
        avaliacao:9,
        ID:2

    
    },
            {
        nome: 'Pokemon Emerald',
        image: 'https://c.tenor.com/0SFCwl0e1cQAAAAC/pokemon-emerald.gif',
        genero: 'RPG',
        jogou: 'Sim',
        avaliacao:10,
        ID: 3,
    }
]
// get inicial // V
router.get('/', (req, res) =>{
    res.send(jogo)
})


//get Rederizar com id // V
router.get('/:id', (req, res) => {
    const idP = req.params.id;
    const jogos = jogo.find(intem => intem.ID == idP);

    // verifica se a vaga nao foi encontrada
    if(!jogos) {
        res.status(404).send({error: 'Jogo nao encontrada'});
        return;
    }

    res.send(jogos);
})

// post Criar // V
router.post('/New', (req, res) => {

    const jogos = req.body;

    if (!jogos){
  res.status(400).send({
        message: 'invalid ,Preecha o formulario'
        })
        console.log('Vazio')
    }
    if(!jogos.nome){
     res.status(400).send({
        message: 'invalid ,preencha o campo nome'
        })
        console.log('nome')
    }
    if(!jogos.avaliacao){
                res.status(400).send({
            message: 'invalid ,preenca o campo de nota'
        })
        console.log('nota')
    }
    if(!jogos.genero){
                res.status(400).send({
            message: 'invalid ,preencha o campo genero'
        })
        console.log('genero')
    }
    if (!jogos.image){
        res.status(400).send({
            message: 'invalid ,preenhca o campo imagem url'
        })
        console.log('imagem')
    }

     jogos.ID = Date.now();

    jogo.push(jogos);
    res.status(201).send({messsage:`Jogo adicionado com sucesso `,data:jogo});
})


// put Editar/ V
router.put('/edit/:id', (req, res) => {

    const Edit = req.body;
    const idParam= req.params.id;
    let index = jogo.findIndex(jogoz => jogoz.ID == idParam);
    
    if(index < 0) {
        res.status(404).send({error: 'O campo nao foi encontrado'})
        return;
    }
    jogo[index] = {...jogo[index],...Edit}
    res.send({
        message: `O jogo ${jogo[index].nome}foi atualizado com sucesso`,
        data: jogo[index]
    })
})

// delete /deleter / V
router.delete('/delete/:id', (req, res) => {
    const idP = req.params.id;
    const pos = jogo.findIndex(intem => intem.ID == idP);
    const nome1 = jogo[pos];
    jogo.splice(pos, 1);
    res.send({
        message: `O jogo ${nome1.nome} foi excluido com sucesso !`,
    })
})

module.exports = router;