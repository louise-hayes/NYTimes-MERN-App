import axios from "axios";

export default {
  // Gets all articles
  loadArticles: function() {
    return axios.get("/articles");
  },

//   // Gets the article with the given id
//   getArticle: function(id) {
//     return axios.get("/articles/" + id);
//   },

searchNY: function(article) {
  console.log("nytimes get");
  return axios.get("/nytimes");
},

  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/articles/" + id);
  },

  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/articles", articleData);
  }
};
