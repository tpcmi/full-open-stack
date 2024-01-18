import axios from "axios";
// 使用db.json json-server
const baseUrl = "http://localhost:3001/notes";
// const baseUrl = "https://restless-glade-433.fly.dev/api/notes"
// 同项目下build好的server
// const baseUrl = "/api/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((res) => res.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((res) => res.data);
};

const noteService = {
  getAll,
  create,
  update
};

export default noteService
