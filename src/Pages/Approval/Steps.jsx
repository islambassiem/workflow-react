import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";

const Steps = () => {
  const { id } = useParams();
  const [request, setRequest] = useState({});
  const [steps, setSteps] = useState([]);
  const { token } = useUserContext();
  const effect = useRef(true);

  const getSteps = (url = `approvals/requests/${id}/steps`) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSteps(res.data);
      });
  };

  const getRequest = (url = `/requests/${id}`) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRequest(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    if (effect.current) {
      getSteps();
      getRequest();
    }
    return () => {
      effect.current = false;
    };
  });
  console.log(steps);
  return <div>Steps {id}</div>;
};

export { Steps };
