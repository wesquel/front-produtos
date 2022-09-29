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
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem)
      }else{
        setProdutos([...produtos, retorno_convertido])
        alert('Produto cadastrado com sucesse')
        limparFormulario();
      }
    })
  }

  // remover produto

  const remover = () => {
    fetch('http://localhost:8080/remover/'+objProduto.codigo, {
      method:'delete',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido =>{
      alert(retorno_convertido.mensagem)

      let vetTemp = [...produtos]
      let indice = vetTemp.findIndex((p)=>{
        return p.codigo === objProduto.codigo;
      })

      vetTemp.splice(indice, 1)

      setProdutos(vetTemp);

      //Limpar formulario
      limparFormulario()

    })
  }

  //Alterar produto

  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido =>{
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem)
      }else{
        alert('Produto alterado com sucesse')
        let vetTemp = [...produtos]
        let indice = vetTemp.findIndex((p)=>{
          return p.codigo === objProduto.codigo;
        })

        vetTemp[indice] = objProduto
        setProdutos(vetTemp);
        limparFormulario();
      }
    })
  }

  // limpar form
  const limparFormulario = () => {
    setObjProduto(produto)
    setBtnCadastrar(true)
  }

  //Selecionar produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div>
      <p>{JSON.stringify(objProduto)}</p>
      <Form botao={btnCadastrar} alterar={alterar} eventoTeclado={aoDigitar} 
      cadastrar={cadastrar} obj={objProduto} remover={remover} cancelar={limparFormulario}/>
      <Table vetor={produtos} selecionar={selecionarProduto}/>
    </div>
  );
}

export default App;
