function Form({botao, eventoTeclado, cadastrar, obj, cancelar}){
    return (
        <form>
            <input name="nome" value={obj.nome} type='text' onChange={eventoTeclado} 
            placeholder="Nome" className="form-control"/>

            <input name= "marca" value={obj.marca} type='text' onChange={eventoTeclado} 
            placeholder="Marca" className="form-control"/>
            {
                botao?
                <input className="btn btn-primary" type='button' onClick={cadastrar} value="Cadastrar"/>
                :
                <div>
                    <input className="btn btn-warning" type='button' value="Alterar"/>
                    <input className="btn btn-danger" type='button' value="Remover"/>
                    <input onClick={cancelar} className="btn btn-secondary" type='button' value="Cancelar"/>    
                </div> 
            }
        </form>
    )
}

export default Form;