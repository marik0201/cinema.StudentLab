export const getLocalStorageItem = name => { return localStorage.getItem(name) } 

export const deleteLocalStorageItem = name => {
    localStorage.removeItem(name);
} 