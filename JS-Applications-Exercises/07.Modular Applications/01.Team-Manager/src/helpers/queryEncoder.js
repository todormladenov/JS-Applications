export const encodeQuery = (queryObject) =>
    Object.entries(queryObject)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');