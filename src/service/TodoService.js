export class TodoService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async get() {
    const response = await this.httpClient.fetch('todos');
    return response.json();
  }

  async create(todo) {
    const response = await this.httpClient.fetch('todos', {
      method: 'POST',
      body: JSON.stringify({ todo }),
    });


    return response.json();
  }

  async update(todo) {
    const response = await this.httpClient.fetch(`todos/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...todo }),
    });

    return response.ok;
  };

  async remove(id) {
    const response = await this.httpClient.fetch(`todos/${id}`, {
      method: 'DELETE'
    });
    return response.ok;
  };
}
