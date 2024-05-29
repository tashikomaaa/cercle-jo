import React, { useState, useContext } from 'react';
import { PositionContext } from '../core/context/PositionContext';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import WarningIcon from '@mui/icons-material/Warning';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import './button.css'
import { createCoords } from '../core/index';

const ButtonComponent = () => {
    const [value, setValue] = useState(0);
    const { position } = useContext(PositionContext);
    return (
        <Box sx={{ width: '100%' }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    switch (newValue) {
                        case 0:
                            return '0';
                        case 1:
                            // code that we will 'try' to run
                            let res = createCoords(position)
                                .then(function (response) {
                                    // handle success
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    // handle error
                                    console.log(error);
                                })
                            return;
                        case 2:
                            return '2';
                    }
                }}
                style={{ position: 'relative', bottom: 0, left: 0, right: 0 }}
                size="60px"
            >
                <BottomNavigationAction icon={<AddReactionIcon />} id="add-reaction-icon" />
                <BottomNavigationAction icon={<WarningIcon />} id="warning-icon" />
                <BottomNavigationAction icon={<AllInclusiveIcon />} id="all-inclusive-icon" />

            </BottomNavigation>
        </Box>
    );
};

export default ButtonComponent;