import React, {Component} from 'react';
import axios from 'axios';

export default class ExclusaoLancamento extends Component{

    constructor(){
        super();
        this.excluirLancamento = this.excluirLancamento.bind(this);
    }

    excluirLancamento(contaId, lancamentoId){
        axios.delete(`http://localhost:8080/api/contas/${contaId}/lancamentos/${lancamentoId}`)
        .then(() => this.props.listarLancamentos(contaId))
        .catch(e => console.log(e))
    }

    render(){
        return(
            <button onClick={() => this.excluirLancamento(this.props.contaId, this.props.lancamentoId)}>X</button>
        );
    }
}