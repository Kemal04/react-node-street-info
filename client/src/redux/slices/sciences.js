import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Api_Address from "../../env";

const initialState = {
    sciences: [],
    pages: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllSciences = createAsyncThunk(
    "sciences/getAll",
    async (page) => {
        const { data } = await axios.get(`${Api_Address}/api/v1/staff`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
            params: {
                page: page
            }
        })
        const sciences = data.staffs
        const pages = data.pagination.pages;
        return { sciences: sciences, pages: pages };
    }
);

export const creatScience = createAsyncThunk(
    "science/create",
    async (formData) => {
        await axios.post(`${Api_Address}/api/v1/staff/create`, formData, {
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

export const deleteScience = createAsyncThunk(
    "science/delete",
    async (id) => {
        const { data } = await axios.delete(`${Api_Address}/api/v1/staff/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);


const sciencesSlice = createSlice({
    name: "science",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllSciences.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllSciences.fulfilled, (state, action) => {
            state.isLoading = false
            state.sciences = action.payload.sciences
            state.pages = action.payload.pages
        })
        builder.addCase(getAllSciences.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(creatScience.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatScience.fulfilled, (state, action) => {
            state.isSuccess = true
            // const science = action.payload.sciences
            // state.sciences.push(science)
        })
        builder.addCase(creatScience.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(deleteScience.fulfilled, (state, action) => {
            const newList = state.sciences.filter((x) => x.id !== action.payload)
            state.sciences = newList
        })
    },
});

const { reducer } = sciencesSlice;
export default reducer;