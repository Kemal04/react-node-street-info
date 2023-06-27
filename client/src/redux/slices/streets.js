import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Api_Address from "../../env";

const initialState = {
    streets: [],
    pages: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllStreets = createAsyncThunk(
    "streets/getAll",
    async (page) => {
        const { data } = await axios.get(`${Api_Address}/api/v1/street`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
            params: {
                page: page
            }
        })
        const streets = data.streets
        const pages = data.pagination.pages;
        return { streets: streets, pages: pages };
    }
);

export const creatStreet = createAsyncThunk(
    "street/create",
    async (formData) => {
        await axios.post(`${Api_Address}/api/v1/street/create`, formData, {
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

export const deleteStreet = createAsyncThunk(
    "street/delete",
    async (id) => {
        const { data } = await axios.delete(`${Api_Address}/api/v1/street/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);


const streetsSlice = createSlice({
    name: "street",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllStreets.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllStreets.fulfilled, (state, action) => {
            state.isLoading = false
            state.streets = action.payload.streets
            state.pages = action.payload.pages
        })
        builder.addCase(getAllStreets.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(creatStreet.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatStreet.fulfilled, (state, action) => {
            state.isSuccess = true
            // const street = action.payload.streets
            // state.streets.push(street)
        })
        builder.addCase(creatStreet.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(deleteStreet.fulfilled, (state, action) => {
            const newList = state.streets.filter((x) => x.id !== action.payload)
            state.streets = newList
        })
    },
});

const { reducer } = streetsSlice;
export default reducer;