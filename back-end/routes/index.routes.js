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
// get inicial 
router.get('/', (req, res) =>{
    res.send(jogo)
})


//get Rederizar com id /
router.get('/:id', (req, res) => {
    const idP = req.params.id;
    const jogos = jogo.find(intem => intem.ID == idP);

    
    if(!jogos) {
        res.status(404).send({error: 'Jogo nao encontrada'});
        return;
    }

    res.send(jogos);
})

// post Criar 
router.post('/New', (req, res) => {

    const jogos = req.body;

    if(!jogos) {
        res.status(400).send({
            message: 'erro Preencha todos os campos corretamente'
        })
        return;
    }else if (!jogos.nome) {
        res.status(400).send({message: 'Erro preencha o campo Nome'
     })
    return;
}else if (!jogos.image) {
        res.status(400).send({message: 'Erro preencha o campo da Imagem url'
     })
    return;
}else if (!jogos.genero) {
        res.status(400).send({message: 'Erro preencha o campo Genero'
     })
    return;
}else if (!jogos.jogou) {
        res.status(400).send({message: 'erro burla'
     })
    return;
}else if (!jogos.avaliacao){
    res.status(400).send({message: 'erro preencha o campo nota'})
    return;
}
     jogos.ID = Date.now();
    jogo.push(jogos);
    res.status(201).send({message:`jogo ${jogos.nome} adicionado com sucesso`,data:jogo});
})

// put Editar
router.put('/edit/:id', (req, res) => {

    const Edit = req.body;
    const idParam= req.params.id;

    if (!Edit){
        res.status(400).send({message:"Erro. preecha todos os campos"})
          return;
    }else if (!Edit.nome) {
        res.status(400).send({message: 'Erro. Campo de Nome nao foi preenchido, tente novamente'
     })
    return;
    }else if (!Edit.image) {
        res.status(400).send({message: 'Erro. Campo de Imagem url nao foi preenchido, tente novamente'
     })
    return;
    }else if (!Edit.genero) {
        res.status(400).send({message: 'Erro. Campo de Genero nao foi preenchido, tente novamente'
     })
    return;
    }else if (!Edit.jogou) {
        res.status(400).send({message: 'Preencha o campo nota'
     })
    return;
    }else if (!Edit.avaliacao) {
        res.status(400).send({message: 'Erro. Campo de nota nao foi preenchido, tente novamente'
     })
    return;
    }
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

// put do botao status 
router.put('/edite/:id', (req, res) => {

    const Edit = req.body;
    const idParam= req.params.id;

    if (!Edit.jogou) {
        res.status(400).send({message: 'Erro Burla'
     })
    }

    let index = jogo.findIndex(jogoz => jogoz.ID == idParam);
    
    if(index < 0) {
        res.status(404).send({error: 'O campo nao foi encontrado'})
        return;
    }
    jogo[index] = {...jogo[index],...Edit}
    res.send({
        message: `Status do ${jogo[index].nome} foi alterado com sucesso!`,
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