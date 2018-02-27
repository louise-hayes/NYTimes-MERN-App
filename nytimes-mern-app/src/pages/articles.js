import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/api";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import nytimesApi from "../utils/nytimesApi";


class Articles extends Component {
  state = {
    articles: [],
    searchTerm: "",
    noToRetrieve: "",
    startYear: "",
    endYear: "",

    nytimes:[],
    headline:"",
    abstract:"",
    pub_date:"",

    articleHeader:"",
    summary:"",
    pubdate:""

  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    console.log("loading saved articles");
    API.loadArticles()
      .then(res =>
        this.setState({ articles: res.data, articleHeader: "", summary: "", pubdate: "" })
      )
      .catch(err => console.log(err));
  };

  delArticle = id => {
    API.deleteBook(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveArticle = nytime => {
    console.log("saving NY article");
      API.saveArticle({
        articleHeader: nytime.headline.main,
        summary: nytime.abstract,
        pubdate: nytime.pub_date
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("submitting search criteria" + this.state.searchTerm);
    if (this.state.endYear.length >= 4) {
     
      nytimesApi.init({
        searchTerm: this.state.searchTerm,
        noToRetrieve: this.state.noToRetrieve,
        startYear: this.state.startYear,
        endYear: this.state.endYear  
      })
        .then(res => {console.log("displaying searched NY Articles" + res)
          this.setState({ nytimes: res, headline: "", abstract: "", pub_date: "" })
         
        }
        )
        .catch(err => console.log(err));
    }
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>NY Times Article Search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
                name="searchTerm"
                placeholder="Search Term (required)"
              />
              <Input
                value={this.state.noToRetrieve}
                onChange={this.handleInputChange}
                name="noToRetrieve"
                placeholder="Number of Items to Retrieve (optional)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Year (Required)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Year (optional)"
              />
              <FormBtn
                // disabled={!(this.state.articleHeader && this.state.startYear)}
                // onClick={this.handleFormSubmit(this.state.searchTerm, this.state.noToRetrieve, this.state.startYear, this.state.endYear)}
                onClick={this.handleFormSubmit}
              >
                Submit Search
              </FormBtn>

              {/* <button onClick={() => 
                    this.gdUploadStory(storyBtns._id, storyBtns.words)} 
                  type = "button"
                  >
                  Google Drive Upload
                  </button> */}
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.nytimes.length ? (
              <List>
                {this.state.nytimes.map(nytime => (
                  <ListItem key={nytime._id}>
                      <strong>
                        {nytime.headline.main} by {nytime.pub_date}
                      </strong>
                    <button onClick={() => this.saveArticle(nytime)} 
                  type = "button"
                  >
                  Save
                  </button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                      <strong>
                        {article.articleHeader} : {article.pubdate}{article.summary}
                      </strong>
                    <button onClick={() => this.delArticle(article)} 
                  type = "button"
                  >
                  Delete
                  </button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
