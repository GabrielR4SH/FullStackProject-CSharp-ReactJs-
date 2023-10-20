import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const EditUserModal = ({ isOpen, toggle, user, onEditUser }) => {
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleEditUser = () => {
        // Realize uma chamada PUT para atualizar o usuário no banco de dados
        fetch(`api/user/EditUser/${editedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedUser),
        })
            .then((response) => response.json())
            .then((updatedUser) => {
                onEditUser(updatedUser);
                toggle();
            });
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Editar Usuário</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input type="text" name="nome" id="nome" value={editedUser.nome} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="ultimoNome">Último Nome</Label>
                        <Input type="text" name="ultimoNome" id="ultimoNome" value={editedUser.ultimoNome} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={editedUser.email} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="senha">Senha</Label>
                        <Input type="password" name="senha" id="senha" value={editedUser.senha} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="cpf">CPF</Label>
                        <Input type="text" name="cpf" id="cpf" value={editedUser.cpf} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="telefone">Telefone</Label>
                        <Input type="text" name="telefone" id="telefone" value={editedUser.telefone} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="nivelPrivilegio">Nível de Privilégio</Label>
                        <Input type="number" name="nivelPrivilegio" id="nivelPrivilegio" value={editedUser.nivelPrivilegio} onChange={handleInputChange} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleEditUser}>
                    Salvar
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditUserModal;
