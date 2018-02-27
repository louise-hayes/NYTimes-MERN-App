import axios from "axios";

export default {
  // Gets all articles
  loadArticles: function() {
    console.log("axios loadArticle");
    
    return axios.get("/articles");
  },

//   // Gets the article with the given id
//   getArticle: function(id) {
//     return axios.get("/articles/" + id);
//   },


  // Deletes the article with the given id
  deleteArticle: function(id) {
    console.log("axios deleteArticle");
    
    return axios.delete("/articles/" + id);
  },

  // Saves a article to the database
  saveArticle: function(articleData) {
    console.log("axios saveArticle");
    return axios.post("/articles", articleData);
  }
};
