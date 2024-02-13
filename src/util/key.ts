// export const writeKey = (key: string): Error | boolean => {
//     try {
//         localStorage.setItem("key", key);
//     } catch (err) {
//         const error = new Error("Error writing to local storage")
//         return error;
//     }
// }

class Storage {
    constructor() {}

    public static get(key: string): string | null {
        try {
            const apiKey = localStorage.getItem(key);
            console.log("[storage]: ", apiKey)
            return apiKey;
        } catch (err) {
            const error = new Error("Error putting item")
            console.log(error); 
            return null;
        }
    }
    public static put(key: string, item: string): Error | true {
        try {
            localStorage.setItem(key, item);
            return true;
        } catch (err) {
            const error = new Error("Error putting item")
            console.log(error); 
            return error;
        }
    }
}

export default Storage;
