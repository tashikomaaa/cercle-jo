import React, { createContext, useState } from 'react';

const PositionContext = createContext();

const PositionProvider = ({ children }) => {
    const [position, setPosition] = useState([48.866667, 2.333333]);

    return (
        <PositionContext.Provider value={{ position, setPosition }}>
            {children}
        </PositionContext.Provider>
    );
};

export { PositionContext, PositionProvider };