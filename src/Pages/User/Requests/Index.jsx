import { useUserContext } from "@/Context/UserContext";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Index = () => {
  const { token } = useUserContext();
  const [requests, setRequests] = useState([]);
  const effect = useRef(true);
  const fetchRequests = () => {
    axios
      .get("/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRequests(res.data.data);
      });
  };

  useEffect(() => {
    if (effect.current) {
      fetchRequests();
    }
    return () => {
      effect.current = false;
    };
  }, []);
  console.log(requests);

  return (
    <>
      <div>Requests Index</div>
    </>
  );
};

export default Index;
