// providerArticulos.js
import React, { createContext, useState } from 'react';

export const ArticulosContext = createContext();

export const ArticulosProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [datos, setDatos] = useState([]);

    return (
        <ArticulosContext.Provider value={{ items, setItems, datos, setDatos }}>
            {children}
        </ArticulosContext.Provider>
    );
};
