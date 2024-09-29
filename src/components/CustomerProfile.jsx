// CustomerProfile.jsx (with password visibility toggle)
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useAuth} from '../context/AuthContext';
import {fetchCustomerDetails, updateCustomer} from '../services/customerService';
import {fetchAddressById, updateAddress} from '../services/addressService.js';
import AddressForm from './AddressForm.jsx';
import '../css/Password.css'; // Assuming you are using this for styling

const CustomerProfile = ({setView}) => {
    const {user} = useAuth();
    const [customer, setCustomer] = useState({
        fullname: '',
        cpf: '',
        email: '',
        password: '',
        addressid: ''
    });

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [address, setAddress] = useState({
        id: 0,
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        complement: ''
    });

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        const loadCustomerData = async () => {
            if (user && user.cpf) {
                const details = await fetchCustomerDetails(user.cpf);
                setCustomer({
                    fullname: details.fullname,
                    cpf: details.cpf,
                    email: details.email,
                    password: '',
                    addressid: details.addressid,
                });
                const address = await fetchAddressById(details.addressid);
                setAddress({
                    id: address.id,
                    cep: address.cep,
                    street: address.street,
                    number: address.number,
                    neighborhood: address.neighborhood,
                    city: address.city,
                    state: address.state,
                    complement: address.complement,
                });
            }
        };
        loadCustomerData();
    }, [user]);

    const handleUpdate = async () => {
        if (newPassword && newPassword !== confirmPassword) {
            alert('As senhas não correspondem');
            return;
        }

        try {
            const updatedCustomer = {...customer};
            newPassword ?
                updatedCustomer.password = newPassword
                : delete updatedCustomer.password;

            await updateCustomer(user.cpf, updatedCustomer);
            await updateAddress(address.id, address);
            alert('Perfil atualizado com sucesso!');
            setView(null);
        } catch (error) {
            alert('Erro ao atualizar perfil: ' + error.message);
        }
    };

    return (
        <div className="customer-profile">
            <h2>Editar Perfil</h2>
            <div className="form-group">
                <label>Nome Completo</label>
                <input type="text" name="fullname" value={customer.fullname}
                       onChange={(e) => setCustomer({...customer, fullname: e.target.value})}/>
            </div>
            <div className="form-group">
                <label>CPF</label>
                <input type="text" name="cpf" value={customer.cpf} readOnly/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="text" name="email" value={customer.email} readOnly/>
            </div>
            <div className="form-group">
                <label>Nova Senha</label>
                <div className="password-input-wrapper">
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Digite sua nova senha"
                    />
                    <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={toggleNewPasswordVisibility}
                    >
                        <i className={showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                    </button>
                </div>
            </div>
            <div className="form-group">
                <label>Confirmar Nova Senha</label>
                <div className="password-input-wrapper">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme sua nova senha"
                    />
                    <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={toggleConfirmPasswordVisibility}
                    >
                        <i className={showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                    </button>
                </div>
            </div>

            <AddressForm address={address} setAddress={setAddress}/>

            <div className="buttons">
                <button onClick={handleUpdate}>Salvar</button>
                <button onClick={() => setView(null)}>Cancelar</button>
            </div>
        </div>
    );
};
CustomerProfile.propTypes = {
    setView: PropTypes.func.isRequired,
};

export default CustomerProfile;
