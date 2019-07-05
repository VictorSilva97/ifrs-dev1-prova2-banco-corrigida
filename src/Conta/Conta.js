import React, {Component} from 'react';
import axios from 'axios';
import CardConta from './CardConta';
import PesquisaCliente from '../Cliente/PesquisaCliente';

export default class Conta extends Component{
    constructor(){
        super();
        this.criarConta = this.criarConta.bind(this);
        this.listarContas = this.listarContas.bind(this);        

        this.state = {
            contas: []
        }
    }

    componentDidMount = () => this.listarContas();

    async listarContas(){
        try {
            const response = await axios.get(`http://localhost:8080/api/contas/`);
            this.setState({ contas: response.data });
        }
        catch (error) {
            console.log("erro ao listar contas. ",error );
        }
    }

    criarConta(pCliente){
        const cliente = {
            cliente: {
                id: pCliente.id,
                nome: pCliente.nome,
                cpf: pCliente.cpf
            }
        }

        axios.post(`http://localhost:8080/api/contas/`, cliente)
        .then( () => this.listarContas() )        
        .catch( error => console.log("Erro ao incluir conta", error) );        
    }

    render(){
        return(  
            <div>     
                { this.state.contas.map( conta => <CardConta key={conta.id} contaId={conta.id} cliente={conta.cliente.nome} /> ) }
                <PesquisaCliente criarConta={this.criarConta}/>
            </div>
        );
    }
}