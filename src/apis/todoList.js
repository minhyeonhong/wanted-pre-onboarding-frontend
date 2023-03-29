import { instance } from './instance';

const commonURL = '/todos';

export const todoListApis = {
  //todo 작성
  createTodoAX: todo => instance.post(`${commonURL}`, todo),
  //todo 리스트
  getTodosAX: () => instance.get(`${commonURL}`),
  //todo 수정
  updateTodoAX: obj => instance.put(`${commonURL}/${obj.id}`, obj.todo),
  //todo 삭제
  deleteTodoAX: id => instance.delete(`${commonURL}/${id}`),
};
