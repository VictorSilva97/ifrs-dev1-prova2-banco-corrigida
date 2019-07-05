import React, {Component} from 'react';
import axios from 'axios';

export default class PesquisaCliente extends Component{

    constructor(){
        super();
        this.pesquisarCliente = this.pesquisarCliente.bind(this);

        this.state = {
            pesquisa: '',
            clientes: []
        }
    }

    async pesquisarCliente(){
        try {
            const response = await axios.get(`http://localhost:8080/api/clientes/pesquisa?nome=${this.state.pesquisa}`);
            this.setState({ clientes: response.data });
        }
        catch (error) {
            console.log("erro ao pesquisar cliente");
        }
    }

    render(){
        return(
            <div>

                <label htmlFor="pesquisa">Pesquisa</label>
                <input name="pesquisa" type="text" value={this.state.pesquisa} onChange={event => this.setState({pesquisa: event.target.value})}/>
                <button onClick={this.pesquisarCliente}>Pesquisar</button>
                
                { 
                    (this.state.clientes.length > 0) ? 
                    <table>
                        <tbody>
                        <tr>
                            <th>ID</th> 
                            <th>Nome</th>
                            <th>CPF</th>
                        </tr>
                            {
                                this.state.clientes.map( 
                                    cliente => {
                                        return (
                                            <tr key={cliente.id}>
                                                <td>{cliente.id}</td>
                                                <td>{cliente.nome}</td> 
                                                <td>{cliente.cpf}</td>
                                                <td><button onClick={() => this.props.criarConta(cliente)}>Criar conta</button></td>
                                            </tr>
                                        );    
                                    }
                                )
                            }     
                        </tbody>      
                    </table>         
                    : null
                }
            </div>
        );
    }

}