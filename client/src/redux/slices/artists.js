import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Api_Address from "../../env";

const initialState = {
    artists: [],
    pages: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllArtists = createAsyncThunk(
    "artists/getAll",
    async (page) => {
        const { data } = await axios.get(`${Api_Address}/api/v1/artist`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
            params: {
                page: page
            }
        })
        const artists = data.artists
        const pages = data.pagination.pages;
        return { artists: artists, pages: pages };
    }
);

export const creatArtist = createAsyncThunk(
    "artist/create",
    async (formData) => {
        await axios.post(`${Api_Address}/api/v1/artist/create`, formData, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            toast.success(res.data.success)
        }).catch((res) => {
            toast.error(res.response.data.error)
        });
    } 
);

export const deleteArtist = createAsyncThunk(
    "artist/delete",
    async (id) => {
        const { data } = await axios.delete(`${Api_Address}/api/v1/artist/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);


const artistsSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllArtists.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllArtists.fulfilled, (state, action) => {
            state.isLoading = false
            state.artists = action.payload.artists
            state.pages = action.payload.pages
        })
        builder.addCase(getAllArtists.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(creatArtist.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatArtist.fulfilled, (state, action) => {
            state.isSuccess = true
            // const artist = action.payload.artists
            // state.artists.push(artist)
        })
        builder.addCase(creatArtist.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(deleteArtist.fulfilled, (state, action) => {
            const newList = state.artists.filter((x) => x.id !== action.payload)
            state.artists = newList
        })
    },
});

const { reducer } = artistsSlice;
export default reducer;