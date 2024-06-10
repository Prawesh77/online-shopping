import axios from 'axios';

const API_URL = 'http://localhost:5000/product';

const getAll = async () => {
    const response = await axios.get(API_URL);
    return response;
};

const create=async(newProduct)=>{
    const response = await axios.post(`${API_URL}/addnewproduct`, newProduct);
    return response;
}

const productAPI = { getAll, create };

export default productAPI;