import { configureStore } from '@reduxjs/toolkit'
import contactsReducer from './slices/contact';
import artistsReducer from './slices/artists';
import historicalsReducer from './slices/historicals';
import parksReducer from './slices/parks';
import poetsReducer from './slices/poets';
import sciencesReducer from './slices/sciences';
import streetsReducer from './slices/streets';

const reducer = {
    contacts: contactsReducer,
    artists: artistsReducer,
    historicals: historicalsReducer,
    parks: parksReducer,
    poets: poetsReducer,
    sciences: sciencesReducer,
    streets: streetsReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;