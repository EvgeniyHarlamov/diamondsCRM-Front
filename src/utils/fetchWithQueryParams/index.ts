function fetchWithQueryParams(url: string, { headers = {}, body }: any) {
    headers = headers instanceof Headers ? headers : new Headers(headers);

    if (body instanceof URLSearchParams) {
        headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }

    return fetch(url, {
        headers,
        body
    });
}

export default fetchWithQueryParams;