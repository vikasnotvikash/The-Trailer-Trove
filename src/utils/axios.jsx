import axios from "axios";


//The axios.create() function is used to create a custom Axios instance.
const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjExY2VjZWY3ZjhiMDkwN2Q1ZWE5ZTIxMDViOTM1NiIsIm5iZiI6MTcyMDg5NDI5OS44NDg5NDUsInN1YiI6IjY2OTJjMWQzODIzYjAwMmY2NDAwZjcwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aB8IjSYCrXwLi5JQNebiE6txnRZf2AsKx1k_uW_oiXw'
      }
})

export default instance;
