export class LocalTokenRepository {
    #TOKEN_KEY = "access_token";

    save(token) {
        localStorage.setItem(this.#TOKEN_KEY, token);
    }

    get() {
        return localStorage.getItem(this.#TOKEN_KEY);
    }

    remove() {
        localStorage.removeItem(this.#TOKEN_KEY);
    }
}
