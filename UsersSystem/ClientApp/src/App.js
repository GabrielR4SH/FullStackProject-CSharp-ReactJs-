import React, { useEffect, useState } from "react";
import NavBarAdd from './Components/NavBarrAdd/NavBarAdd';
import EditUserModal from './Components/EditUserModal/EditUserModal';
import DeleteUserModal from './Components/DeleteUserModal/DeleteUserModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [users, setUsers] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        fetch("api/user/GetUsers")
            .then((response) => response.json())
            .then((responseJson) => {
                setUsers(responseJson);
            });
    }, []);

    const handleAddUser = (newUser) => {
        setUsers([...users, newUser]);
    };

    const handleEditUser = (user) => {
        setUserToEdit(user);
        setEditModalOpen(true);
    };

    const handleUpdateUser = (updatedUser) => {
        // Atualize a lista de usuários com o usuário atualizado
        const updatedUsers = users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
        setUsers(updatedUsers);
        setEditModalOpen(false);
    };

    const handleDeleteUser = (userId) => {
        // Encontre o objeto de usuário com base no ID
        const userToDelete = users.find((user) => user.id === userId);

        if (userToDelete) {
            setUserToDelete(userToDelete);
            setDeleteModalOpen(true);
        }
    };


    const handleConfirmDelete = (user) => {
        // Realize uma chamada DELETE para excluir o usuário do banco de dados
        fetch(`api/user/DeleteUser/${user.id}`, {
            method: 'DELETE',
        })
            .then(() => {
                // Atualize o estado local para refletir a exclusão do usuário
                const updatedUsers = users.filter((u) => u.id !== user.id);
                setUsers(updatedUsers);
                setDeleteModalOpen(false); // Feche o modal após a exclusão
            });
    };



    return (
        <div className="container">
            <h1>Users</h1>
            <NavBarAdd onAddUser={handleAddUser} />
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>CPF</th>
                            <th>Tel:.</th>
                            <th>Level</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nome}</td>
                                <td>{user.ultimoNome}</td>
                                <td>{user.email}</td>
                                <td>{user.cpf}</td>
                                <td>{user.telefone}</td>
                                <td>{user.nivelPrivilegio}</td>
                                <td>
                                    <button className='success' onClick={() => handleEditUser(user.id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </td>
                                <td>
                                    <button className='danger' onClick={() => handleDeleteUser(user.id)}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {userToEdit && (
                <EditUserModal
                    userToEdit={userToEdit}
                    isOpen={isEditModalOpen}
                    toggle={() => setEditModalOpen(!isEditModalOpen)}
                    onUpdateUser={handleUpdateUser}
                />
            )}
            {userToDelete && (
                <DeleteUserModal
                    user={userToDelete}
                    isOpen={isDeleteModalOpen}
                    toggle={() => setDeleteModalOpen(!isDeleteModalOpen)}
                    onDeleteUser={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default App;

