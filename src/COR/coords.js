import axios from "axios";

const _axios_coords = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/coords`
});

const listCoords = async () => {
  return await _axios_coords.get()
}

const createCoords = async (args) => {
  return await _axios_coords.post(args)
}

export { listCoords, createCoords }