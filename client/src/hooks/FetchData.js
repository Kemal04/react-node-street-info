import { useState, useEffect } from "react";
import axios from 'axios'
import Api_Address from "../env";

const FetchData = (url, req, page) => {

    const [data, setData] = useState(null);
    const [pages, setPages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(Api_Address + url, {
                params: {
                    page: page
                }
            });

            if (response.status === 422 || response.status === 401) {
                return response;
            }
            if (!response.ok) {
                setError(response.status);
                setLoading(false);
            }

            setData(response.data[req]);
            setPages(response.data.pagination.pages);
            setLoading(false);
        };

        fetchData();
    }, [req, url, page]);
    return [data, loading, error, pages];
};

export default FetchData;