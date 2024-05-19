import axios from "axios";

axios.defaults.baseURL = 'https://api.unsplash.com';

export const getData = async (query, page) => {
    try {
        const response = await axios.get('/search/photos', {
            params: { query, page },
            headers: {
                Authorization: 'Client-ID 3zb_mbNHFZJaYMkgp6GZ997cdbHk5MllXUfJtSgzbbc'
            }
        });
        return response.data.results;
    } catch (error) {
        throw new Error('Something went wrong. Please try again later.');
    }
};
