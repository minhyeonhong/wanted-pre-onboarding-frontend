// AuthServiceInterface
// signin(email, password):Promise<undefined>
// signup(email, password):Promise<undefined>
// logout():undefined
//

export class AuthService {
  constructor(httpClient, tokenRepository) {
    this.httpClient = httpClient;
    this.tokenRepository = tokenRepository;
  }

  async signin(email, password) {
    const response = await this.httpClient.fetch('auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const { access_token } = await response.json();
    this.tokenRepository.save(access_token);

    localStorage.setItem('user_email', email);

    return response;
  }

  async login(email, password) {
    const response = await this.httpClient.axiosAPI.post('auth/signin', {
      email,
      password,
    });
    const { access_token } = await response.data;
    this.tokenRepository.save(access_token);

    localStorage.setItem('user_email', email);

    return response;
  }

  async signup(email, password) {
    const response = await this.httpClient.fetch('auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  }

  async join(email, password) {
    const response = await this.httpClient.axiosAPI.post('auth/signup', {
      email,
      password,
    });

    if (response.status !== 201) throw response;

    return response;
  }

  logout() {
    this.tokenRepository.remove();
  }
}
