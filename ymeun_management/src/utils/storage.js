export const storageMsg = (msg) => {
    localStorage.setItem('message', JSON.stringify(msg));
    localStorage.removeItem('message');
}
