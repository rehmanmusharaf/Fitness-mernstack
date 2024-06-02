import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

// const userList = [
//   { id: 12345, name: "John Doe" },
//   { id: 67890, name: "Jane Smith" },
//   { id: 54321, name: "Alice Johnson" },
// ];

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "10px",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "10px",
    transition: "background-color 0.3s",
  },
  listItemHover: {
    backgroundColor: "#f8f9fa",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    marginRight: "15px",
  },
  userId: {
    color: "#888",
  },
  button: {
    flexShrink: 0,
  },
};

const UserList = ({ activate, Users }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleActivation = async (activation, userid) => {
    try {
      if (activate) {
        try {
          const { data } = await axios.put(
            `${process.env.REACT_APP_server}/deactivateuseracount`,
            { userid: userid },
            { withCredentials: true }
          );
          if (data.success) {
            toast.success("User Acount Deactivated Successfully");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(data.message);
        }
      } else {
        try {
          const { data } = await axios.put(
            `${process.env.REACT_APP_server}/activateuseracount`,
            { userid: userid },
            { withCredentials: true }
          );
          if (data.success) {
            toast.success("User Acount Activated Successfully");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);

          toast.error(error.message);
        }
      }
    } catch (error) {
      console.error("Error activating user account:", error);
      //   throw error; // Re-throw the error for further handling
    }
  };
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div style={styles.container}>
      {Users.map((user, index) => (
        <Link
          key={user._id}
          style={{
            ...styles.listItem,
            ...(hoveredIndex === index ? styles.listItemHover : {}),
          }}
          to={`/userstats/${user._id}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div style={styles.userInfo}>
            <div style={styles.username} className=" text-decoration-none">
              {user.full_name}
            </div>
            {/* <div style={styles.userId}>ID: {user._id}</div> */}
            <div style={styles.userId}>Phone: {user.phone}</div>
          </div>
          <button
            className={`btn  ${activate ? "btn-danger" : "btn-success"}`}
            onClick={() => handleActivation(activate, user._id)}
            style={styles.button}
          >
            {activate ? "Inactivate" : "Activate"}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default UserList;
