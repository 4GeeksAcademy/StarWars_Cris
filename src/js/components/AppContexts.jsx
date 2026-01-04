import React, { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
    people: {
        data: [],
        loading: false,
        error: null
    },
    starships: {
        data: [],
        loading: false,
        error: null
    },
    films: {
        data: [],
        loading: false,
        error: null
    },
    planets: {
        data: [],
        loading: false,
        error: null
    },
    species: {
        data: [],
        loading: false,
        error: null
    },
    vehicles: {
        data: [],
        loading: false,
        error: null
    },
    favorites: []
};

const reducer = (state, action) => {
    const { entity } = action;

    switch (action.type) {
        case "FETCH_START":
            return {
                ...state,
                [entity]: {
                    ...state[entity],
                    loading: true,
                    error: null
                }
            };

        case "FETCH_SUCCESS":
            return {
                ...state,
                [entity]: {
                    data: action.payload,
                    loading: false,
                    error: null
                }
            };

        case "FETCH_ERROR":
            return {
                ...state,
                [entity]: {
                    ...state[entity],
                    loading: false,
                    error: action.payload
                }
            };

        case "ADD_FAVORITE":
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };

        case "REMOVE_FAVORITE":
            return {
                ...state,
                favorites: state.favorites.filter(
                    fav =>
                        fav.uid !== action.payload.uid ||
                        fav.type !== action.payload.type
                )
            };


        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
