import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://startup-summer-proxy-production.up.railway.app/2.0/',
  headers: {
    "x-secret-key": "GEU4nvd3rej*jeh.eqp",
    "x-api-app-id": "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948"
  }
})

export const setHeaders = (token) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const getToken = async () => {
  const params = {
    login: "sergei.stralenia@gmail.com",
    password: "paralect123",
    client_id: "2356",
    client_secret: "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
    hr: "0",
  }

  try {
    const result = await instance.post('oauth2/password/', params);

    if (result.status === 200) {
      localStorage.setItem('access_token', result.data.access_token);
      setHeaders(result.data.access_token);
    }

  } catch (err) {
    console.log(err);
  }
};

export const getVacancies = async (currentPage = 0, rejectedWithValue) => {
  const pageSize = 4;
  try {
    const result = await instance.get(`vacancies/?page=${currentPage}&count=${pageSize}`);

    if (result.status !== 200) {
      throw new Error('Что-то пошло не так');
    }
    return result.data.objects;
  } catch (err) {
    return rejectedWithValue(err.message);
  }

};

export const getVacancy = async (id, rejectedWithValue) => {
  try {

    const result = await instance.get(`vacancies/${id}`);

    if (result.status !== 200) {
      throw new Error('Что-то пошло не так');
    }
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

export const getDefaultData = async (currentPage = 0, rejectedWithValue) => {
  const pageSize = 4;
  let vacancies, catalogues;

  const cataloguesResult = instance.get("catalogues");
  const vacanciesResult = instance.get(`vacancies/?page=${currentPage}&count=${pageSize}`);

  

  await Promise.all([cataloguesResult, vacanciesResult])
  .then((values) => { 
    catalogues = values[0].data;
    vacancies = values[1].data.objects
  }, (err) => {
    if (err.response.status === 500) {
      console.log('Что-то пошло не так')
    }
  })
  return { catalogues, vacancies }
}
