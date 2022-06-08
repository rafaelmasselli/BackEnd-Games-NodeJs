const lista = document.getElementById('lista')

const api = 'http://localhost:3000';

let edit = false;
let idEdicao = 0;

let nome = document.getElementById('nome');
let avaliacao = document.getElementById('avaliacao');
let genero = document.getElementById('genero');
let image = document.getElementById('image');
let jogou = document.getElementById('jogou')

const getGame = async () => {
  const response = await fetch(api)
  const filme = await response.json();
  filme.map((intem) => {
    lista.insertAdjacentHTML('beforeend', `
<div class="card container centralize1" style="width: 18rem;">
<br>
  <h5 class="card-title">Nome: ${intem.nome}</h5>
  <img src="${intem.image}" class="card-img-top tamanho" alt="${intem.nome}">
   <div class="card-body">
    <br>
     <button type="button" class="btn btn-secondary" onclick="gameJogou('${intem.ID}')">Alterar Status</button>
<br><br>
<P class = "Status"><b>Status:</b> Jogou ${intem.jogou}</P>
    <span class="badge bg-info text-dark">${intem.genero}</span>
    <span class="badge bg-success">${intem.avaliacao}</span>
    <br>
    <button type="button" class="btn btn-outline-dark" onclick="deleteJogo('${intem.ID}')">Excluir</button>
    <button type="button" class="btn btn-outline-dark" onclick="editJogo('${intem.ID}')" >Editar</button>
  </div>
</div>

        `)
  })
}
//botao subimit 
const submitForm = async (event) => {
    event.preventDefault();
    const jogos = {
        nome: nome.value,
        image: image.value,
        genero: genero.value,
        avaliacao: parseFloat(avaliacao.value),
        jogou: jogou.value
    }
    if(edit) {
        Egame(jogos, idEdicao);
    } else {
        createJogo(jogos);
    }
    cache();
    lista.innerHTML = '';
}
// render post 
const createJogo = async(intem) => {
    const request = new Request(`${api}/New`, {
        method: 'POST',
        body: JSON.stringify(intem),
        headers: new Headers({'Content-Type': 'application/json'})})

    const response = await fetch(request);
    const result = await response.json();
 alert(result.message)
    getGame();
    cache();
}
//render editar
const Egame = async(jogo, ID) => {
    const request = new Request(`${api}/edit/${ID}`, {
        method:  'PUT',
        body: JSON.stringify(jogo),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    const response = await fetch(request);
    const result = await response.json();
 
    alert(result.message)
    edit = false;
    idEdicao = 0;
    getGame();
}
//render deletar 
const deleteJogo = async (ID) => {
    const request = new Request(`${api}/delete/${ID}`, {
        method: 'DELETE'
    })
    const response = await fetch(request);
    const result = await response.json();

    alert(result.message);
    lista.innerHTML = '';
    getGame();
}
// id do editar 
const getById = async (ID) => {
    const response = await fetch(`${api}/${ID}`);
    return await response.json();
}
//render editar 
const editJogo = async (ID) => {
    edit = true;
    idEdicao = ID;

    const jogoS = await getById(ID);

    nome.value = jogoS.nome;
    avaliacao.value =  jogoS.avaliacao;
    image.value = jogoS.image;
    genero.value = jogoS.genero;
    jogou.value = jogoS.jogou;

}
const cache = () => {
    nome.value = '';
    image.value = '';
    genero.value = '';
    avaliacao.value = '';
    jogou.values = '';
}
// botao para editar status // jogou
const Egamee = async(jogo, ID) => {
    const request = new Request(`${api}/edite/${ID}`, {
        method:  'PUT',
        body: JSON.stringify(jogo),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    const response = await fetch(request);
    const result = await response.json();
 
    alert(result.message)
    idEdicao = 0;
    cache();
lista.innerHTML = '';
getGame();
}

//botao para mudar os status// booleano
const gameJogou = async (ID) => {

    idEdicao = ID;  
      const jogoS = await getById(ID);
 
if (jogoS.jogou === "Sim"){
    const jogos ={
        jogou: jogoS.value = "Nao"
    }
     Egamee(jogos, idEdicao)

}else if (jogoS.jogou === "Nao"){
        const jogos ={
        jogou: jogoS.value = "Sim"
    }
     Egamee(jogos, idEdicao)
}else if (jogoS.jogou === "Null"){
        const jogos ={
        jogou: jogoS.value = "Sim"
    }
     Egamee(jogos, idEdicao)
}
}
getGame();
