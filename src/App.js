import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Table from './components/Table';

function App() {

  //Objeto produto
  const produto = {
    codigo: 0,
    nome: "",
    marca: ""
  }

  //useState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  //useEffect
  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido))
  }, []);

  //Dados do formulário

  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value})
  }

  // Cadastrar produto

  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido =>{
      console.log(retorno_convertido)
    })
  }

  return (
    <div>
      <p>{JSON.stringify(objProduto)}</p>
      <Form botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar}/>
      <Table vetor={produtos}/>
    </div>
  );
}

export default App;
