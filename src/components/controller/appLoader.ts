import Loader from './loader';


class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        if (!apiUrl || !apiKey) {
            throw new Error('API_URL и API_KEY should be defined in .env file');
        }

        super(apiUrl, {
            apiKey: apiKey,
        });
    }
}

export default AppLoader;
