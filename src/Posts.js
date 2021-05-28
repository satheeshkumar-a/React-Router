import React, {useState, useEffect}from "react";
import "./style.css"; 
import {Button,Table } from "reactstrap";
import { useHistory} from 'react-router-dom';

import axios from "axios";

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
 
export default function Posts() {
 const[posts,setPosts]=useState([]);
//  const[name,setName]=useState(`$(post.id)`)

  //Read
  const getPosts = async () => {
    const { data } = await axios.get(API_URL);
    setPosts(data);
  };
  
  useEffect(() => {
    getPosts();
  }, []);

 

  //  const handleChange = ({ target: { name, value } }) => {
  // setName({ [name]: value });
  // console.log(value);
  // };

 let history = useHistory();

 
  return (
    <div>
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
              {posts.map((post) => {
                return (
                  <tr key={post.id}>
                    <th scope="row">{post.id}</th>
                    <td>{post.userId}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    <td>      
                      {/* <Link to="/posts/:id" className="btn btn-primary">Edit</Link> */}
                      <Button 
                        color="primary"
                        size="sm"
                      value={post.id}
                      onClick={() =>{history.push('/posts/:id')}}
                                            
                      >
                        Edit
                      </Button>
                      
                      
                    </td>
                    {/* <td>
                      <Button
                        color="danger"
                        size="sm"
                        // onClick={() => deletePost(post.id)}
                      >
                        Delete
                      </Button>
                    </td>
                    <td>
                      <Button
                        color="info"
                        size="sm"
                        // onClick={() => getComments(post.id)}
                      >
                        comments
                      </Button>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
    </div>
  );
}