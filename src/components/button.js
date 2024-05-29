import React, { useState } from 'react';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import WarningIcon from '@mui/icons-material/Warning';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import './button.css'

const ButtonComponent = () => {
    const [value, setValue] = useState(0);

    return (
        <Box sx={{ width: '100%' }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                style={{ position: 'relative', bottom: 0, left: 0, right: 0}}
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