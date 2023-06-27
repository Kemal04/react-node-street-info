import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Api_Address from "../../env";

const initialState = {
    contacts: [],
    pages: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const getAllContacts = createAsyncThunk(
    "contacts/getAll",
    async (page) => {
        const { data } = await axios.get(`${Api_Address}/api/v1/contact`, {
            params: {
                page: page
            }
        })
        const contacts = data.contacts;
        const pages = data.pagination.pages;
        return { contacts: contacts, pages: pages };
    }
);

export const creatContact = createAsyncThunk(
    "contact/create",
    async (contact) => {
        await axios.post(`${Api_Address}/api/v1/contact/create`, contact).then((res) => {
            toast.success(res.data.success)
        }).catch((res) => {
            toast.error(res.response.data.error)
        });
    }

);

export const updateContact = createAsyncThunk(
    "contact/update",
    async (contact) => {
        await axios.post(`${Api_Address}/api/v1/contact/edit/${contact.id}`, contact, {
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

export const deleteContact = createAsyncThunk(
    "contact/delete",
    async (id) => {
        const { data } = await axios.delete(`${Api_Address}/api/v1/contact/delete/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        toast.success(data.success)
        return id
    }
);


const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getAllContacts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllContacts.fulfilled, (state, action) => {
            state.isLoading = false
            state.contacts = action.payload.contacts
            state.pages = action.payload.pages
        })
        builder.addCase(getAllContacts.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(creatContact.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(creatContact.fulfilled, (state, action) => {
            state.isSuccess = true
        })
        builder.addCase(creatContact.rejected, (state, action) => {
            state.isError = true
        })

        builder.addCase(deleteContact.fulfilled, (state, action) => {
            const newList = state.contacts.filter((x) => x.id !== action.payload)
            state.contacts = newList
        })

        builder.addCase(updateContact.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(updateContact.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(updateContact.rejected, (state, action) => {
            state.isError = true
        })
    },
});

const { reducer } = contactSlice;
export default reducer;