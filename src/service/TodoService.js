export class TodoService {
  constructor(httpClient) {
    this.httpClient = httpClient.axiosAPI;
  }

  async get() {
    const response = await this.httpClient.get('todos');

    if (response.status === 200) return response.data;
  }

  async create(todo) {
    const response = await this.httpClient.post('todos', todo);
    if (response.status === 201) return response.data;
  }

  async update(todo) {
    const response = await this.httpClient.put(`todos/${todo.id}`, todo);
    console.log("res", response);
    if (response.status === 200) return true;
  }

  async remove(id) {
    const response = await this.httpClient.delete(`todos/${id}`);
    if (response.status === 204) return true;
  }
}
