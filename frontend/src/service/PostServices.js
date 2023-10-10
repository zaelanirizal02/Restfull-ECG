import axios from "axios";

export default class PostService {
  getPosts() {
    return axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data);
  }
}
