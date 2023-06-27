import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Api_Address from "../../env";

const initialState = {
    historicals: [],
    pages: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllHistoricals = createAsyncThunk(
    "historicals/getAll",
    async (page) => {
        const { data } = await axios.get(`${Api_Address}/api/v1/individ`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
            params: {
                page: page
            }
        })
        const historicals = data.individs
        const pages = data.pagination.pages;
        return { historicals: historicals, pages: pages };
    }
);

export const creatHistorical = createAsyncThunk(
    "historical/create",
    async (formData) => {
        await axios.post(`${Api_Address}/api/v1/individ/create`, formData, {
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

export const deleteHistorical = createAsyncThunk(
    "historical/delete",
    async (id) => {
        const { data } = await axios.delete(`${Api_Address}/api/v1/individ/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);


const historicalsSlice = createSlice({
    name: "historical",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllHistoricals.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllHistoricals.fulfilled, (state, action) => {
            state.isLoading = false
            state.historicals = action.payload.historicals
            state.pages = action.payload.pages
        })
        builder.addCase(getAllHistoricals.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(creatHistorical.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatHistorical.fulfilled, (state, action) => {
            state.isSuccess = true
            // state.historicals.push(action.payload)
        })
        builder.addCase(creatHistorical.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(deleteHistorical.fulfilled, (state, action) => {
            const newList = state.historicals.filter((x) => x.id !== action.payload)
            state.historicals = newList
        })
    },
});

const { reducer } = historicalsSlice;
export default reducer;