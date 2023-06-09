import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDefaultData, getToken, getVacancies, getVacancy, setHeaders } from "../api/mainApi";

export const fetchDefaultData = createAsyncThunk(
    'mainSlice/fetchDefaultData',
    getDefaultData
)

export const fetchVacancies = createAsyncThunk(
    'mainSlice/fetchVacancies',
    getVacancies
)

export const fetchVacancy = createAsyncThunk(
    'mainSlice/fetchVacancy',
    getVacancy
)

export const fetchToken = createAsyncThunk(
    'mainSlice/fetchToken',
    getToken
)

const toolkitSlice = createSlice({
    name: "mainSlice",
    initialState: {
        vacancies: null,
        totalVacancies: 0,
        catalogues: null,
        favorite: null,
        isLoading: true,
        currentVacanciesPage: 0,
        authorization: null,
        filters: {
            paymentFrom: '',
            paymentTo: '',
            keyword: '',
            catalog: '',
        },
        vacancy: null
    },
    reducers: {
        toggleFavorite(state, action) {
            
            const vacancyFavorite = state.favorite.find(vacancy => vacancy.id === action.payload);

            if (vacancyFavorite) {
                state.favorite = state.favorite.filter(item => item.id !== vacancyFavorite.id);
                state.vacancies = state.vacancies?.map((item) => {
                    if (item.id === vacancyFavorite.id) {
                        item.isFavorite = false;
                    }
                    return item;
                });
                if (state.vacancy?.id === vacancyFavorite.id) {
                    state.vacancy.isFavorite = false;
                }
            } else {
                if (state.vacancies?.length) {
                    state.vacancies = state.vacancies?.map((item) => {
                        if (item.id === action.payload) {
                            item.isFavorite = true;
                            state.favorite.push(item);
                        }
                        return item;
                    })

                    if (state.vacancy) {
                        state.vacancy.isFavorite = true;
                    }
                } else {
                    if (state.vacancy) {
                        state.vacancy.isFavorite = true;
                        state.favorite.push(state.vacancy);
                    }
                }
            }

            localStorage.setItem('favorite', JSON.stringify(state.favorite));
        },
        setDataFromStorage(state) {
            const favorite = JSON.parse(localStorage.getItem('favorite'));
            state.favorite = favorite || [];
            const Authorization = JSON.parse(localStorage.getItem('access_token'));
            if (Authorization) {
                state.authorization = Authorization;
                setHeaders(Authorization.access_token);
            }
            else {
                state.authorization = 'empty';
            }
        },
        setCurrentVacanciesPage(state, action) {
            state.currentVacanciesPage = action.payload;
        },
        setVacancy(state, action) {
            state.vacancy = action.payload;
        },
        toggleLoader(state, action) {
            state.isLoading = action.payload;
        },
        setFilters(state, action) {
            state.filters = action.payload;
        },
        clearFilters(state) {
            const filters = {
                paymentFrom: '',
                paymentTo: '',
                keyword: '',
                catalog: '',
            }
            state.filters = filters;
            state.currentVacanciesPage = 0;
        }
    },
    extraReducers: {
        [fetchDefaultData.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchDefaultData.fulfilled]: (state, action) => {
            if (state.favorite?.length) {
                state.vacancies = action.payload.vacancies.objects.map((vacancy) => {
                    state.favorite.forEach((favoriteVacancy) => {
                        if (vacancy.id === favoriteVacancy.id) {
                            vacancy.isFavorite = true;
                        }
                    })
                    return vacancy;
                })
            } else {
                state.vacancies = action.payload.vacancies.objects;
            }
            state.catalogues = action.payload.catalogues;
            state.isLoading = false;
            state.totalVacancies = action.payload.vacancies.total;
        },
        [fetchVacancies.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchVacancies.fulfilled]: (state, action) => {
            if (state.favorite?.length) {
                state.vacancies = action.payload.objects.map((vacancy) => {
                    state.favorite.forEach((favoriteVacancy) => {
                        if (vacancy.id === favoriteVacancy.id) {
                            vacancy.isFavorite = true;
                        }
                    })
                    return vacancy;
                })
            } else {
                state.vacancies = action.payload.objects;
            }
            state.totalVacancies = action.payload.total;
            state.isLoading = false;
        },
        [fetchVacancy.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchVacancy.fulfilled]: (state, action) => {
            if (state.favorite?.length) {
                state.favorite.forEach((favoriteVacancy) => {
                    if (action.payload.id === favoriteVacancy.id) {
                        action.payload.isFavorite = true;
                        state.vacancy = action.payload;
                        return;
                    }
                })
            } 
            state.vacancy = action.payload;
            state.isLoading = false;
        },
        [fetchToken.fulfilled]: (state, action) => {
            const access_token = {
                ttl: action.payload.ttl,
                access_token: action.payload.access_token
            }
            state.authorization = access_token;
            setHeaders(access_token.access_token);
            localStorage.setItem("access_token", JSON.stringify(access_token));
        }
    }
});

export default toolkitSlice.reducer;

export const { clearFilters, setVacancies, toggleFavorite, setDataFromStorage, setCurrentVacanciesPage, setVacancy, toggleLoader, setFilters } = toolkitSlice.actions;