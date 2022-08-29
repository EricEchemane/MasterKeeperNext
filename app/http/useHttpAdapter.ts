import { useCallback, useState } from "react";
import HttpAdapter from "./base-adapter";

export default function useHttpAdapter<PayloadType, ParamsType>(adapter: HttpAdapter) {

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>();
    const [error, setError] = useState<any | null>();
    const [data, setData] = useState<any | null>();

    const execute = useCallback(async (options?: {
        payload?: PayloadType,
        params?: ParamsType;
    }) => {
        setLoading(true);
        setError(null);
        setResponse(null);
        setData(null);

        if (adapter.method === 'POST' && !options?.payload) {
            throw new Error('Payload is required for POST requests');
        }

        if (options?.params) {
            adapter.parseUrlWith(options?.params);
        }

        let response: any;

        if (adapter.method === 'GET') {
            response = await fetch(adapter.url);
        }
        else {
            response = await fetch(adapter.url, {
                method: adapter.method,
                body: JSON.stringify(options?.payload),
                headers: { 'Content-Type': 'application/json' }
            });
        }

        setResponse(response);

        if (response.ok) {
            const data = await response.json();
            setData(data.data);
            return data;
        }
        else {
            setError(response.statusText);
        }

        setLoading(false);

    }, [adapter]);

    return {
        loading, data, error, response, execute
    };
}