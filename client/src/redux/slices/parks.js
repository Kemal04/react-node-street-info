import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Api_Address from "../../env";

const initialState = {
    parks: [],
    pages: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllParks = createAsyncThunk(
    "parks/getAll",
    async (page) => {
        const { data } = await axios.get(`${Api_Address}/api/v1/building`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
            params: {
                page: page
            }
        })
        const parks = data.buildings
        const pages = data.pagination.pages;
        return { parks: parks, pages: pages };
    }
);

export const creatPark = createAsyncThunk(
    "park/create",
    async (formData) => {
        await axios.post(`${Api_Address}/api/v1/building/create`, formData, {
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

export const deletePark = createAsyncThunk(
    "park/delete",
    async (id) => {
        const { data } = await axios.delete(`${Api_Address}/api/v1/building/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);


const parksSlice = createSlice({
    name: "park",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllParks.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllParks.fulfilled, (state, action) => {
            state.isLoading = false
            state.parks = action.payload.parks
            state.pages = action.payload.pages
        })
        builder.addCase(getAllParks.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(creatPark.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatPark.fulfilled, (state, action) => {
            state.isSuccess = true
            // const park = action.payload.parks
            // state.parks.push(park)
        })
        builder.addCase(creatPark.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(deletePark.fulfilled, (state, action) => {
            const newList = state.parks.filter((x) => x.id !== action.payload)
            state.parks = newList
        })
    },
});

const { reducer } = parksSlice;
export default reducer;