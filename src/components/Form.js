function Form({botao, eventoTeclado, cadastrar}){
    return (
        <form>
            <input name="nome" type='text' onChange={eventoTeclado} 
            placeholder="Nome" className="form-control"/>

            <input name= "marca" type='text' onChange={eventoTeclado} 
            placeholder="Marca" className="form-control"/>
            {
                botao?
                <input className="btn btn-primary" type='button' onClick={cadastrar} value="Cadastrar"/>
                :
                <div>
                    <input className="btn btn-warning" type='button' value="Alterar"/>
                    <input className="btn btn-danger" type='button' value="Remover"/>
                    <input className="btn btn-secondary" type='button' value="Cancelar"/>    
                </div> 
            }
        </form>
    )
}

export default Form;