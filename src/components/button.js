import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import WarningIcon from '@mui/icons-material/Warning';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import './button.css'
import { listCoords, createCoords } from '../COR/index';

const ButtonComponent = () => {
    const [value, setValue] = useState(0);

    return (
        <div>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                style={{ position: 'relative', bottom: 0, left: 0, right: 0}}
                size="60px"
            >
            <BottomNavigationAction onChange={createCoords()} icon={<AddReactionIcon />} id="add-reaction-icon" />
            <BottomNavigationAction onChange={listCoords()} icon={<WarningIcon />} id="warning-icon" />
            <BottomNavigationAction icon={<AllInclusiveIcon />} id="all-inclusive-icon" />

            </BottomNavigation>
        </div>
    );
};

export default ButtonComponent;