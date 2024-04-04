import React, { useContext, useState } from 'react';
import '../../estilos/estilos.css'
import logo from '../../header/logoreason.png'
import { Categorias } from "./categorias";
import { ArticulosContext } from '../context/providerArticulos';

import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    
    const navigate = useNavigate();


    const handleIncio = () => {

        navigate('/');
    }

    return (
        <>
            <header className="header   d-flex ">

                <div className="navHeader ps-5  d-flex justify-content-between">
                    <div onClick={handleIncio}>
                        <img src={logo} />
                    </div>

                    <div>
                        <Categorias  />
                    </div>
                </div>



            </header>


        </>
    )
}