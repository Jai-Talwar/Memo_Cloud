let url = `http://localhost:9000/api/notes/updatenote/${id}`;
let options = {
  method: "DELETE",
  mod: "cors",
  headers: {
    "auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTA1N2VkOTI3NDAxZWFhNGRmMzJkMGMiLCJpYXQiOjE2OTQ4NTg5NzZ9.WjQHMvluEWvppnEaPwjPtdXJin0BKrV_t2nVBzGKIqA",
  },
};
await fetch(url, options);
