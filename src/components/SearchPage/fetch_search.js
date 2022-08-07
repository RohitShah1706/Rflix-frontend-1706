const fetch_search = async (url, signal) => {
    return await fetch(url, { signal })
        .then(response => {
            const toSend = response.json();
            return toSend;
        })
        .catch(err => {
            if (err.name !== "AbortError")
                console.log(err);
            return null;
        });
}
module.exports = { fetch_search };