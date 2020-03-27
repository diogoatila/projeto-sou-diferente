import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';

import api from '../services/api';
import './styles.css';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const profissionalId = localStorage.getItem('profissionalId')
    const profissionalName = localStorage.getItem('profissionalName');

    useEffect(() => {
        api.get('profile', {
           headers: {
               Authorization: profissionalId,
           } 
        }).then(response => {
            setIncidents(response.data);
        })
    }, [profissionalId]);

        async function handleDeleteIncident(id) {
            try {
                await api.delete(`atuacao/${id}`, {
                    headers: {
                        Authorization: profissionalId,
                    }
                });
                
                setIncidents(incidents.filter(incident => incident.id !== id))
            }catch (err) {
                alert('Erro ao deletar, tente novamente.');
            }
        }

        function handleLogout(){
            localStorage.clear();
            history.push('/');
        }

    return (
    <div className="profile-container">
        <header>
            <img src={logoImg} alt="Sou Diferente"/>
            <span><h2>Bem vindo(a), {profissionalName}</h2></span>
            <Link className="button" to="/incidents/new">Cadastrar nova especialidade</Link>
            <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#e02041"/>
            </button>
        
        </header>

        <h1>Especialidades cadastradas</h1>

        <ul>
            {incidents.map(incident => (
                <li key={incident.id}>
                <strong>Especialização:</strong>
                <p>{incident.title}</p>

                <strong>Descrição:</strong>
                <p>{incident.description}</p>

                <strong>Valor da consulta:</strong>
                <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                <button onClick ={() => handleDeleteIncident(incident.id)} type="button">
                    <FiTrash2 size={20} color="#a8a8b3"/>
                </button>
            </li>
            ))}
          </ul>



    </div>
    
        )
}