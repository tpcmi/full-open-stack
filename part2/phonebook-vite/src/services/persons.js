import axios from "axios";

const urlPath = "http://localhost:3001/persons";

const addNewPerson = (personInfo) => {
  const request = axios.post(urlPath, personInfo);
  return request.then((response) => response.data);
};

const getAll = async () => {
  const request = axios.get(urlPath);
  const response = await request;
  return response.data;
};

export default { addNewPerson, getAll };
