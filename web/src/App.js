import React, { useState, useEffect } from 'react'
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

// 3 Conceitos principais do React:
  // Componente
    // Uma função (bloco isolado) que retorna um conteúdo HTML, CSS, JS, etc
  // Estado
    // Informações mantidas pelo componente (Lembrar: imutabilidade)
  // Propriedade
    // Informações que um componente PAI passa para o componente FILHO

    //EXEMPLO DE ALGUNS DESTES CONCEITOS
/*function App() { // Primeira letra sempre maiúscula! Isso mostra que é um componente
  const [counter, setCounter] = useState(0) // Desestruturação do nosso counter
  // o react trabalha com "imutabilidade", assim uma varável nunca será mudada, e sim uma nova variável será criada a partir de outra
  // No caso, usamos o useState para fazer isso e aumentar o nosso contador
  function incrementCounter() {
    setCounter(counter + 1)
  }
  return (
    <>
      <h1>Contador: {counter}</h1>
      <button onClick = {incrementCounter}>Incrementar</button>
    </>
  );
}
*/
function App() {
  const [devs, setDevs] = useState([]) // Como são vários devs, já é bom identificar isso colocando um array

  useEffect(() => {
    async function loadDevs() { //Criando uma função aqui dentro para poder usar o async await
      const response = await api.get('/devs')

      setDevs(response.data)
    }
    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    console.log(response) //Debugging
    // Isso irá colocar o nosso novo dev dentro do array de devs que nós temo como "banco de dados", desta forma, o novo usuário irá aparecer automaticamente
    setDevs([...devs, response.data]) // Assim que se adiciona algo no final de um array no react
  }

  return (
    <div id = "app">
      <aside>
        <strong> Cadastrar </strong>
        <DevForm onSubmit = {handleAddDev} />
      </aside>
      <main>
        <ul>
        {devs.map(dev => { // Com o .map, iremos iterar por cada dev que estiver no banco
          return ( // O "key" é para não der erro de que cada li não tem um valor único
            <DevItem key = {dev._id} dev = {dev}/>
          )})}
        </ul>
      </main>
    </div>
  )
}

export default App;
