import axios from 'axios';

const _axios_coords = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

const listCoords = async () => {
    return await _axios_coords.get('/coords')
}

const createCoords = async (args) => {

    console.log("in create Coords:")
    console.log(args)
    return await _axios_coords.post('/coords', args)
}

export { listCoords, createCoords }