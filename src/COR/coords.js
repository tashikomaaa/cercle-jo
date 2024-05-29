const _axios_coords = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/coords`
});

export const ListCoords = async () => {
  return await _axios_coords.get()
}

export const createCoords = async () => {
  return await _axios_coords.create()
} 