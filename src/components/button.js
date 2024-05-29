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
            <BottomNavigationAction icon={<AddReactionIcon />} style={{ backgroundColor: '#D5F5E3', color: '#2ECC71' }}/>
            <BottomNavigationAction icon={<WarningIcon />} style={{ backgroundColor: 'red', color: '#FFF' }} />
            <BottomNavigationAction icon={<AllInclusiveIcon />} style={{ backgroundColor: '#FAE5D3', color: '#E67E22' }}/>

            </BottomNavigation>
        </div>
    );
};

export default ButtonComponent;
