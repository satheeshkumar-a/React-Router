import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Col,
  Container,
  Navbar,
  NavbarBrand,
 
  Table,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userId: "",
      title: "",
      body: "",
      posts: [],
      comments: [],
      dropdownOpen: false,
      users: [],
      selectedUser: "",
    };
    // this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.getUsers();
    this.getPosts();
  }

  getUsers = () => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      console.log(response.data);
      this.setState({ users: response.data });
      console.log(this.state);
    });
  };
  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }
  getPosts = async () => {
    const { data } = await axios.get(API_URL);
    this.setState({ posts: data });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  // DELETE
  deletePost = async (postId) => {
    await axios.delete(`${API_URL}/${postId}`);
    let posts = [...this.state.posts];
    posts = posts.filter((post) => post.id !== postId);
    this.setState({ posts, comments: [] });
  };

  // CREATE
  createPost = async () => {
    let selectedUser = this.state.users.filter((user) => {
      return user.name === this.state.selectedUser;
    });
    console.log(selectedUser);
    let id = selectedUser[0].id;

    await this.setState({ userId: id });

    const { data } = await axios.post(API_URL, {
      userId: this.state.userId,
      title: this.state.title,
      body: this.state.body,
    });
    const posts = [...this.state.posts];
    posts.push(data);
    this.setState({ posts, userId: "", title: "", body: "" });
  };

  // UPDATE
  updatePost = async () => {
    const { data } = await axios.put(`${API_URL}/${this.state.id}`, {
      userId: this.state.userId,
      title: this.state.title,
      body: this.state.body,
    });
    const posts = [...this.state.posts];
    const postIndex = posts.findIndex((post) => post.id === this.state.id);
    posts[postIndex] = data;
    this.setState({ posts, userId: "", title: "", body: "", id: "", selectedUser: "" });
  };

  //get comments
  getComments = async (postId) => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    this.setState({
      comments: data,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.id) {
      this.updatePost();
    } else {
      this.createPost();
    }
  };

  selectPost = async (post) => {
    let user = this.state.users.filter((user) => {
      return user.id === post.userId;
    });
    console.log(user);
    await this.setState({ ...post, comments: [], selectedUser: user[0].name });
  };

  render() {
    return (
      <>
         <Navbar color="Light" Light>
          <NavbarBrand href="/" style={{ marginLeft: '45%', fontSize: 25, marginBottom: '0px'}}>
          User Information 
          </NavbarBrand>
        </Navbar>
        <Container>
          <br></br>
          
          <Form onSubmit={this.handleSubmit}>
            {this.state.id && (
              <>
                <FormGroup row>
                  <Label for="userId" sm={2}>
                    Post ID
                  </Label>
                  <Col sm={10}>
                    <input
                      name="userId"
                      type="text"
                      value={this.state.id}
                      disabled
                    />
                  </Col>
                </FormGroup>
              </>
            )}

            <FormGroup row>
              <Label for="selectedUser" sm={2}>
                User Name
              </Label>
              <Col sm={10}>
                <select
                  name="selectedUser"
                  value={this.state.selectedUser}
                  onChange={this.handleChange}
                >
                  <option value=""></option>
                  {this.state.users.map((user) => {
                    return <option value={user.name}>{user.name}</option>;
                  })}
                </select>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="title" sm={2}>
                Title{" "}
              </Label>
              <Col sm={10}>
                <input
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="body" sm={2}>
                Body
              </Label>
              <Col sm={10}>
                <input
                  name="body"
                  type="text"
                  value={this.state.body}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Button 
                color="primary"
                type="submit">
                {this.state.id ? "Update" : "Add"} Post
              </Button>
            </FormGroup>
            <br />
          </Form>
          
          {this.state.comments.length > 0 ? <h2> List of Comments</h2> : null}
          {this.state.comments.map((comment) => {
            return (
              <ListGroup >
                <ListGroupItem style={{backgroundColor: '#FFE7C7'}}>{comment.body}</ListGroupItem>
              </ListGroup>
            );
          })}

          <br></br>
          <br></br>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>User ID</th>
                <th>Title</th>
                <th>Body</th>
                <th >Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((post) => {
                return (
                  <tr key={post.id}>
                    <th scope="row">{post.id}</th>
                    <td>{post.userId}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    <td>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => this.selectPost(post)}
                      >
                        Edit
                      </Button>
                      {"  "}
                    </td>
                    <td>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => this.deletePost(post.id)}
                      >
                        Delete
                      </Button>
                    </td>
                    <td>
                      <Button
                        color="info"
                        size="sm"
                        onClick={() => this.getComments(post.id)}
                      >
                        comments
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}