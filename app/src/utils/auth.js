function decode(token) {
    let base = token.split('.')[1]
    return JSON.parse(window.atob(base));
}

export { decode }