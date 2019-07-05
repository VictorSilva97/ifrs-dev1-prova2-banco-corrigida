import React, {Component} from 'react';
import axios from 'axios';
import InclusaoLancamento from '../Lancamento/InclusaoLancamento';
import ExclusaoLancamento from '../Lancamento/ExclusaoLancamento';


export default class CardConta extends Component{
    constructor(){
        super();
        this.listarLancamentos = this.listarLancamentos.bind(this);
        this.somatoriValorLancamentos = this.somatoriValorLancamentos.bind(this);

        this.state = {
            lancamentos: [],
            descricao: '',
            valor: '',
            mostrarBotaoLancamentos: true,
            mostrarInclusaoLancamentos: false
        }
    }

    async listarLancamentos(idConta){
        this.setState({
            mostrarBotaoLancamentos: false,
            mostrarInclusaoLancamentos: true
        });
        try {
            const response = await axios.get(`http://localhost:8080/api/contas/${idConta}/lancamentos/`);
            this.setState({ lancamentos: response.data });
        }
        catch (error) {
            console.log("erro ao listar lancamentos");
        } 
        
    } 
    
    somatoriValorLancamentos = () => this.state.lancamentos.map(lancamento => lancamento.valor).reduce((accumulator, currentValue) => accumulator + currentValue);
    
    render(){
        const botaoLancamentos = <button onClick={() => this.listarLancamentos(this.props.contaId)}>Lançamentos</button>;
        const LabelLancamentos = <label>Lançamentos: {this.state.lancamentos.length}</label>;
        const botaoExcluir = (lancamentoId) => <ExclusaoLancamento contaId={this.props.contaId} lancamentoId={lancamentoId} listarLancamentos={this.listarLancamentos}/>;
        
        return(
            <ul>
                <li key={this.props.contaId}>
                    <label>{`Conta: ${this.props.contaId}`}</label>
                    <br />
                    <label>{`Cliente:  ${this.props.cliente}`}</label>
                    <br />
                    { this.state.mostrarBotaoLancamentos ? botaoLancamentos : LabelLancamentos } 
                    <ul key={this.props.contaId}> 
                        { this.state.lancamentos.map( lancamento => <li key={lancamento.id} >{`${lancamento.descricao}: ${lancamento.valor} `} {botaoExcluir(lancamento.id)} </li>) }
                        { (this.state.lancamentos.length > 0) ? <li> { `Total: ${ this.somatoriValorLancamentos() }` }</li> : null }
                        { (this.state.mostrarInclusaoLancamentos) ? <InclusaoLancamento contaId={this.props.contaId} listarLancamentos={this.listarLancamentos}/> : null }
                    </ul>
                </li>
            </ul>
        );
    }
}