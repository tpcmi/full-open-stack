import axios from "axios";

const urlPath = "/api/persons";
// const urlPath = "http://localhost:3000/api/persons";

const addNewPerson = (personInfo) => {
  const request = axios.post(urlPath, personInfo);
  return request.then((response) => response.data);
};

const getAll = async () => {
  const request = axios.get(urlPath);
  const response = await request;
  return response.data;
};

const deletePerson = (id) => {
  const request = axios.delete(`${urlPath}/${id}`);
  return request.then((response) => response.data);
};

const updatePerson = (updateInfo) => {
  console.log(updateInfo);
  console.log(`${urlPath}/${updateInfo.id}`);
  const request = axios.put(`${urlPath}/${updateInfo.id}`, updateInfo);
  return request.then((response) => response.data);
}

export default { addNewPerson, getAll, deletePerson, updatePerson };
