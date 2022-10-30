import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, number } from 'yup';
import styles from './styles.css';

export default function Form() {
    // useState de armazenamento da chamada a API.
    const [cities, setCities] = useState([]);
    const [country, setCountry] = useState([]);
    // useState de armazenamento dos dados percorridos no map da API
    const [selectCities, setSelectCities] = useState([]);
    const [selectCountry, setSelectCountry] = useState([]);
    // Chamanda da API das cidades.
    useEffect(() => {
        axios.get("https://amazon-api.sellead.com/city")
            .then((response) => {
                setCities(response.data);
            })
    }, []);
    // Chamanda de API dos Paises.
    useEffect(() => {
        axios.get("https://amazon-api.sellead.com/country")
            .then((response) => {
                setCountry(response.data);
            })
    }, []);
    // Coleta de dados e armazenamento dos mesmos.
    const countryOp = country.map((country) => ({
        value: country.code,
        label: country.name_ptbr,
    }));
    // Coleta de dados e armazenamento dos mesmos.
    const citiesOp = cities.map((city) => ({
        value: city.code,
        label: city.name_ptbr,
    }));
    // Requerimentos dos campos do Form
    const schema = object({
        name: string()
            .required("Campo obrigatório!")
            .min(3)
            .max(30),
        email: string()
            .required("Campo obrigatório!")
            .min(11)
            .max(30),
        fone: number()
            .required("Campo obrigatório!")
            .min(11)
            .max(12),
        cpf: number()
            .required("Campo obrigatório!")
            .min(11)
            .max(14),
    });

    // Verificação dos campos do Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        data.preventDefault();
        return;
    }
    // Aplicação completa
    return (
        <section className="containerMain">
            <form className="containerForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Nome</label>
                    <input
                        maxLength={40}
                        required
                        id="name"
                        type="text"
                        {...register("name")} />
                    <span className="error">{errors?.name?.message}</span>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        maxLength={40}
                        required
                        id="email"
                        type="email"
                    />
                </div>
                <div className="form-group">
                    <label>Telefone</label>
                    <input
                        maxLength={12}
                        required
                        id="numero"
                        type="tel"
                    />
                </div>
                <div className="form-group">
                    <label>CPF</label>
                    <input
                        maxLength={14}
                        required
                        id="CPF"
                        type="cpf"
                    />
                </div>
                <div className="containerBtn">
                    <button type="submit">Enviar</button>
                </div>
            </form>

            <div className="opDestino">
                <Select
                    className="select"
                    required
                    isMulti
                    options={countryOp}
                    placeholder="Países. Selecione um ou mais"
                    onChange={(country) => setSelectCountry(country)}
                    value={selectCountry}
                />
                <Select
                    className="select"
                    required
                    isMulti
                    options={citiesOp}
                    placeholder="Cidades. Selecione uma ou mais"
                    onChange={(cities) => setSelectCities(cities)}
                    value={selectCities}
                />
            </div>

        </section>
    )
}