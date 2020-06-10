const apiKey = `66683917a94e703e14ca150023f4ea7c`;
let stage;

export const init = (stageInstance) => {
    stage = stageInstance;
};

const API_ENDPOINT = 'https://api.themoviedb.org/3/movie/popular';

export const getMovies = async () => {
    const result = await get(`${API_ENDPOINT}?api_key=${apiKey}`);

    return result.results;
};

const get = (url) => {
    return fetch(url, {
        Accept: 'application/json',
    }).then((response) => {
        return response.json();
    });
};
