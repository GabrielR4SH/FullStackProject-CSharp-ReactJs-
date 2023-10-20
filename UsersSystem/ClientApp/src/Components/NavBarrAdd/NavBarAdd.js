import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Importe os ícones diretamente deste pacote

const NavBarAdd = ({ onAddUser }) => {
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({ nome: '', ultimoNome: '', email: '', senha: '', cpf: '', telefone: '', nivelPrivilegio: 1 });

    const toggle = () => {
        setModal(!modal);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleAddUser = () => {
        // Realize uma chamada POST para adicionar o novo usuário no banco de dados
        fetch('api/user/AddUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((newUser) => {
                onAddUser(newUser);
                toggle();
            });
    };

    return (
        <div>
            <Button color="dark" onClick={toggle}>
                <FontAwesomeIcon icon={faPlus} />
                Add User
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Adicionar Novo Usuário</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="nome">Name</Label>
                            <Input type="text" name="nome" id="nome" value={user.nome} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ultimoNome">Last name</Label>
                            <Input type="text" name="ultimoNome" id="ultimoNome" value={user.ultimoNome} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" name="email" id="email" value={user.email} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="senha">password</Label>
                            <Input type="password" name="senha" id="senha" value={user.senha} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="cpf">CPF</Label>
                            <Input type="text" name="cpf" id="cpf" value={user.cpf} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="telefone">TEL:.</Label>
                            <Input type="text" name="telefone" id="telefone" value={user.telefone} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="nivelPrivilegio">Level</Label>
                            <Input type="number" name="nivelPrivilegio" id="nivelPrivilegio" value={user.nivelPrivilegio} onChange={handleInputChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="dark" onClick={handleAddUser}>
                        <FontAwesomeIcon icon={faPlus} />
                        Add User
                    </Button>
                    <Button color="danger" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default NavBarAdd;
