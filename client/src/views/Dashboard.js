import Button from "@restart/ui/esm/Button";
import { useContext, useEffect } from "react";
import { Card, Col, Row, Spinner, Toast } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import addIcon from "../assets/plus-circle-fill.svg";
import AddPostModal from "../components/posts/AddPostModal";
import SinglePost from "../components/posts/SinglePost";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import { AuthContext } from "../contexts/AuthContext";
import { PostContext } from "../contexts/PostContext";

const Dashboard = () => {
  //Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  //Start: get all posts
  useEffect(() => getPosts(), []);

  let body = null;

  //check post undefine
  // console.log("post: ", posts);

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts && posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username} </Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the Button below to track your first skill to learn
            </Card.Text>
            <Button variant="primary" onClick={() => setShowAddPostModal(true)}>
              LearnIt!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts &&
            posts.map((post) => (
              <Col key={post._id} className="my-2">
                <SinglePost post={post} />
              </Col>
            ))}
        </Row>
        {/* Open Add Post Modal*/}
        <Button
          className="btn-floating"
          onClick={() => setShowAddPostModal(true)}
          data-tip
          data-for="addPostTip"
        >
          <img src={addIcon} alt="add-post" width="60" height="60" />
        </Button>
        <ReactTooltip id="addPostTip" place="left" effect="solid">
          Add a new thing to learn
        </ReactTooltip>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={() =>
          setShowToast({
            show: false,
            message: "",
            type: null,
          })
        }
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
