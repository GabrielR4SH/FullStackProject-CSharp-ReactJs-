import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteUserModal = ({ isOpen, toggle, user, onDeleteUser }) => {
    const handleDeleteUser = () => {
        if (user && user.id) {
            fetch(`api/user/DeleteUser/${user.id}`, {
                method: 'DELETE',
            })
                .then(() => {
                    onDeleteUser(user.id);
                    toggle();
                });
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Excluir Usuário</ModalHeader>
            <ModalBody>
                Tem certeza de que deseja excluir o usuário ?
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handleDeleteUser}>
                    Excluir
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteUserModal;

