import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import api from './data.js'

function App() {

  const [clientes, setClientes] = useState("");
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [proximoPagamento, setProximoPagamento] = useState(Date.now());
  const [status, setStatus] = useState(0);
  const [processando, setProcessando] = useState(false)

  useEffect(() => {
    atualizar()
  }, []);


  let atualizar = () => {
    api.get("clientes").then(function (data) {
      setClientes(data.data)
    })
  }

  let salvar = () => {

    if (processando == false) {
      setProcessando(true)
      if (id == "") {

        if (nome.length > 1) {

          api.post("clientes", { nome, email, whatsapp, proximoPagamento, status }).then(function (e) {
            alert('Cadastro realizado com sucesso !')
            setProcessando(false)
            document.location.reload(true);
          })

        } else {
          alert('Nome precisa ter pelo menos 1 caractere')
          setProcessando(false)
        }
      } else {
        if (nome.length > 1) {

          api.post("atualizaclientes", {id, nome, email, whatsapp, proximoPagamento, status }).then(function (e) {
            alert('Cadastro realizado com sucesso !')
            setProcessando(false)
            document.location.reload(true);
          })

        } else {
          alert('Nome precisa ter pelo menos 1 caractere')
          setProcessando(false)
        }
      }


    }
  }

  let cadastrarNovo = () => {
    setId("")
    setNome("")
    setEmail("")
    setWhatsapp("")
    setProximoPagamento(Date.now())
    setStatus(0)
  }

  let editarCadastro = (id) => {
    clientes.forEach(element => {
      if (element.id == id) {
        setId(id)
        setNome(element.nome)
        setEmail(element.email)
        setWhatsapp(element.whatsapp)
        setProximoPagamento(element.proximo_pagamento)
        setStatus(element.status)
      }

    });
  }

  return (
    <div>
      <nav class="navbar navbar-dark bg-primary">

      </nav>

      <div className="container">
        <div className="wrapper mt-5 bg-white p-3 rounded">
          <h4 class="page-title">Listagem de Clientes
            <button type="button" onClick={() => cadastrarNovo()} class="btn btn-sm btn-success float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus me-2" viewBox="0 0 16 16">
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
              </svg>
              Novo Cliente
            </button>
          </h4>

          <div>
            <table class="table mt-5">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Cadastro</th>
                  <th scope="col">Status</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Proximo Pagamento</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  clientes.length > 0 ?
                    clientes.map(cli => (
                      <tr>
                        <th>{cli.id}</th>
                        <td>{cli.cadastro.split('-')[2] + '/' + cli.cadastro.split('-')[1] + '/' + cli.cadastro.split('-')[0]}</td>
                        <td>{cli.status == 1 ? 'Ativo' : 'Inativo'}</td>
                        <td>{cli.nome}</td>
                        <td>{cli.email}</td>
                        <td>{cli.proximo_pagamento.split('-')[2] + '/' + cli.proximo_pagamento.split('-')[1] + '/' + cli.proximo_pagamento.split('-')[0]}</td>
                        <td><button type="button" onClick={() => editarCadastro(cli.id)} class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button></td>
                      </tr>

                    ))
                    : null
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Cadastro do Cliente</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Nome</label>
                <input type="email" class="form-control" value={nome} onChange={(e) => setNome(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Whatsapp</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Proximo Pagamento</label>
                <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={proximoPagamento} onChange={(e) => setProximoPagamento(e.target.value.toString())} />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Status</label>
                <select class="form-select" aria-label="Default select example" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option selected value='selecione'>Selecione uma opcao ...</option>
                  <option value="1">Ativo</option>
                  <option value="0">Inativo</option>
                </select>
              </div>

            </div>
            <div class="modal-footer">
              <div id="emailHelp" class="form-text">A senha padrao de novos clientes 123456</div>

              <button type="button" class="btn btn-success btn-sm" onClick={() => salvar()}>Salvar</button>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
}

export default App;
