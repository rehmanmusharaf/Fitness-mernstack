import React, { useEffect, useState } from "react";
import "./Commentsection.css";
import { toast } from "react-toastify";
import axios from "axios";
import { FaUser } from "react-icons/fa";
const Commentsection = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let [message, setMessage] = useState("");
  const limit = 5; // Number of comments per page
  useEffect(() => {
    fetchComments(currentPage);
  }, [currentPage]);

  const fetchComments = async (page) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/getcomments?page=${page}&limit=${limit}`
      );
      if (data.success) {
        let commentss = data.comments;
        setComments((prev) => {
          return [...commentss];
        });
        setTotalPages(data.totalPages);
        console.log("Comments Get Successfully!", commentss);
      } else {
        console.log("Comements not found");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePageChange = () => {
    setCurrentPage((prev) => ++prev);
    fetchComments(currentPage);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_server}/postcomment`,
        { comment: message },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Comment Submited Successfully!");
        fetchComments(currentPage);
      } else {
        toast.error("Something went Wrong!");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  return (
    <>
      <div class="container mt-5 mb-5">
        <div class="row height d-flex justify-content-center align-items-center">
          <div class="col-md-12">
            <div
              class="card mb-0"
              style={{ backgroundColor: "#fff", border: "none" }}
            >
              <div class="p-3">
                <h3>Comments</h3>
              </div>
              <div class="mt-3 d-flex flex-row align-items-center p-3 form-color">
                {/* <img
                  src="https://i.imgur.com/zQZSWrt.jpg"
                  width="50"
                  class="rounded-circle mr-2"
                /> */}
                <input
                  type="text"
                  class="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your comment..."
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  class="bi bi-send-fill position-relative"
                  style={{ left: "-4%", top: "-12px", cursor: "pointer" }}
                  viewBox="0 0 16 16"
                  onClick={handleSubmit}
                >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                </svg>
              </div>

              <div class="mt-2">
                {comments.length > 0
                  ? comments.map((value, index) => {
                      return (
                        <div class="d-flex flex-row p-3">
                          <FaUser className="avatar border-gray bg-white text-black rounded-circle mr-3" />

                          {/* <img
                      src="https://i.imgur.com/zQZSWrt.jpg"
                      width="40"
                      height="40"
                      class="rounded-circle mr-3"
                    /> */}

                          <div class="w-100">
                            <div class="d-flex justify-content-between align-items-center">
                              <div class="d-flex flex-row align-items-center">
                                <span class="mr-2">Author: </span>
                                <span>{value?.author}</span>
                                <small class="c-badge">Top Comment</small>
                              </div>
                              <small>
                                {value?.createdAt}
                                {/* .toISOString().split("T")[0] */}
                              </small>
                            </div>

                            <p class="text-justify comment-text mb-0">
                              {value?.text}
                            </p>

                            <div class="d-flex flex-row user-feed">
                              {/* <span class="wish">
                                <i class="fa fa-heartbeat mr-2"></i>24
                              </span> */}
                              <span class="ml-3">
                                <i class="fa fa-comments-o mr-2"></i>Reply
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ""}

                {/* <div class="d-flex flex-row p-3">
                  <img
                    src="https://i.imgur.com/3J8lTLm.jpg"
                    width="40"
                    height="40"
                    class="rounded-circle mr-3"
                  />

                  <div class="w-100">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="d-flex flex-row align-items-center">
                        <span class="mr-2">Seltos Majito</span>
                        <small class="c-badge">Top Comment</small>
                      </div>
                      <small>2h ago</small>
                    </div>

                    <p class="text-justify comment-text mb-0">
                      Tellus in hac habitasse platea dictumst vestibulum. Lectus
                      nulla at volutpat diam ut venenatis tellus. Aliquam etiam
                      erat velit scelerisque in dictum non consectetur. Sagittis
                      nisl rhoncus mattis rhoncus urna neque viverra justo nec.
                      Tellus cras adipiscing enim eu turpis egestas pretium
                      aenean pharetra. Aliquam faucibus purus in massa.
                    </p>

                    <div class="d-flex flex-row user-feed">
                      <span class="wish">
                        <i class="fa fa-heartbeat mr-2"></i>14
                      </span>
                      <span class="ml-3">
                        <i class="fa fa-comments-o mr-2"></i>Reply
                      </span>
                    </div>
                  </div>
                </div> */}

                {/* <div class="d-flex flex-row p-3">
                  <img
                    src="https://i.imgur.com/agRGhBc.jpg"
                    width="40"
                    height="40"
                    class="rounded-circle mr-3"
                  />

                  <div class="w-100">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="d-flex flex-row align-items-center">
                        <span class="mr-2">Maria Santola</span>
                        <small class="c-badge">Top Comment</small>
                      </div>
                      <small>12h ago</small>
                    </div>

                    <p class="text-justify comment-text mb-0">
                      {" "}
                      Id eu nisl nunc mi ipsum faucibus. Massa massa ultricies
                      mi quis hendrerit dolor. Arcu bibendum at varius vel
                      pharetra vel turpis nunc eget. Habitasse platea dictumst
                      quisque sagittis purus sit amet volutpat. Urna condimentum
                      mattis pellentesque id.Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam
                    </p>

                    <div class="d-flex flex-row user-feed">
                      <span class="wish">
                        <i class="fa fa-heartbeat mr-2"></i>54
                      </span>
                      <span class="ml-3">
                        <i class="fa fa-comments-o mr-2"></i>Reply
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="text-center">
                {comments.length == 5 || comments.length > 5 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-plus-circle-fill text-center"
                    style={{ cursor: "pointer" }}
                    viewBox="0 0 16 16"
                    onClick={handlePageChange}
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                  </svg>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Commentsection;
