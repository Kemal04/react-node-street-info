import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Api_Address from "../../env";

const initialState = {
    poets: [],
    pages: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllPoets = createAsyncThunk(
    "poets/getAll",
    async (page) => {
        const { data } = await axios.get(`${Api_Address}/api/v1/blog`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
            params: {
                page: page
            }
        })
        const poets = data.blogs
        const pages = data.pagination.pages;
        return { poets: poets, pages: pages };
    }
);

export const creatPoet = createAsyncThunk(
    "poet/create",
    async (formData) => {
        await axios.post(`${Api_Address}/api/v1/blog/create`, formData, {
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

export const deletePoet = createAsyncThunk(
    "poet/delete",
    async (id) => {
        const { data } = await axios.delete(`${Api_Address}/api/v1/blog/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);


const poetsSlice = createSlice({
    name: "poet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPoets.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllPoets.fulfilled, (state, action) => {
            state.isLoading = false
            state.poets = action.payload.poets
            state.pages = action.payload.pages
        })
        builder.addCase(getAllPoets.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(creatPoet.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatPoet.fulfilled, (state, action) => {
            state.isSuccess = true
            // const poet = action.payload.poets
            // state.poets.push(poet)
        })
        builder.addCase(creatPoet.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(deletePoet.fulfilled, (state, action) => {
            const newList = state.poets.filter((x) => x.id !== action.payload)
            state.poets = newList
        })
    },
});

const { reducer } = poetsSlice;
export default reducer;