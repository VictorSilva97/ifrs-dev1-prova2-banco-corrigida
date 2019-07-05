import React, {Component} from 'react';
import axios from 'axios';

export default class InclusaoLancamento extends Component{

    constructor(){
        super();
        this.incluirLancamento = this.incluirLancamento.bind(this);

        this.state = {
            descricao: '',
            valor: ''
        }
    }

    incluirLancamento(idConta){

        const lancamento = {
            descricao: this.state.descricao,
            valor: this.state.valor
        }

        axios.post(`http://localhost:8080/api/contas/${idConta}/lancamentos/`, lancamento)
        .then(() => {
            this.props.listarLancamentos(idConta);
            this.setState({descricao: '', valor: ''})
        })        
        .catch(resp => console.log("Erro ao incluir lancamento de conta", resp) );
    }

    render(){
        return(
            <li>
                <label htmlFor="descricao">Descrição:</label>
                <input type="text" value={this.state.descricao} onChange={event => this.setState({descricao: event.target.value})} name="descricao"></input>
                
                <label htmlFor="valor">Valor:</label>
                <input type="text" value={this.state.valor} onChange={event => this.setState({valor: event.target.value})} name="valor"></input>
                
                <button onClick={() => this.incluirLancamento(this.props.contaId)}>Adicionar</button>
            </li>
        );
    }
}
