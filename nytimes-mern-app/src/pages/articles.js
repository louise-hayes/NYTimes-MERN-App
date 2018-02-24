import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/api";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    articleHeader: "",
    noToRetrieve: "",
    summary: "",
    pubdate: ""
  };

  // componentDidMount() {
  //   this.loadArticles();
  // }

  // loadArticles = () => {
  //   console.log("loading saved articles");
  //   API.loadArticles()
  //     .then(res =>
  //       this.setState({ articles: res.data, articleHeader: "", summary: "", pubdate: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  // deleteArticle = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadArticles())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // saveArticle = article => {
  //   console.log("saving NY article");
  //     API.saveArticle({
  //       articleHeader: this.state.articleHeader,
  //       summary: this.state.summary,
  //       pubdate: this.state.pubdate
  //     })
  //       .then(res => this.loadArticles())
  //       .catch(err => console.log(err));
  // };

  handleFormSubmit = (articleHeader,startYear) => {
    // event.preventDefault();
    console.log("submitting search criteria" + articleHeader);
    if (this.state.articleHeader && this.state.startYear) {
      API.searchNY({articleHeader, startYear})
        .then(
          res => {
          console.log("displaying searched NY Articles" + res)
          this.setState({ articles: res.data, articleHeader: "", summary: "", pubdate: "" })
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
                value={this.state.articleHeader}
                onChange={this.handleInputChange}
                name="articleHeader"
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
                onClick={this.handleFormSubmit(this.state.articleHeader,this.state.startYear)}
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
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.articleHeader} by {article.pubdate}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    <button onClick={() => this.saveArticle(article)} 
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
        </Row>
      </Container>
    );
  }
}

export default Articles;
