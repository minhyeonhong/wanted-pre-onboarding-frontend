import axios from 'axios';

export class AxiosInstance {
    constructor(baseURL, tokenRepository) {
        this.axiosAPI = axios.create({
            baseURL: '',//baseURL,
            headers: {
                Authorization: `Bearer ${tokenRepository.get()}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        this.axiosAPI.interceptors.response.use(
            function (response) {
                return response;
            },
            function (error) {
                switch (error.response.data.statusCode) {
                    case 400:
                        alert(error.response.data.message);
                        break;
                    case 401:
                        alert('로그인 실패');
                        break;
                    case 404:
                        alert(error.response.data.message);
                        break;
                    default:
                        break;
                }

                switch (error.response.status) {
                    case 500:
                        alert(error.response.statusText);
                        break;
                    default:
                        break;
                }

                return Promise.reject(error);
            }
        );
    }
}
