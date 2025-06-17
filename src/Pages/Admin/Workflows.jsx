import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "@/Context/UserContext.jsx";
import Pagination from "@mui/material/Pagination";

const Workflows = () => {
  const { token } = useUserContext();
  const [workflows, setWorkflows] = useState([]);
  const [links, setLinks] = useState({});
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);

  async function fetchWorkflows(url = "/workflows") {
    setLoading(true);
    try {
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setWorkflows(res.data.data);
          setLinks(res.data.links);
          setMeta(res.data.meta);
        });
    } catch (error) {
      console.error("Pagination fetch error", error);
    } finally {
      setLoading(false);
    }
  }

  const handlePageChange = (url) => {
    if (url) {
      fetchWorkflows(url);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold">Workflows</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {workflows.map((workflow) => {
            return (
              <div key={workflow.id}>
                <h2 className="text-xl font-bold">{workflow.name}</h2>
                <p className="text-gray-600 my-3">{workflow.description}</p>
                <hr />
              </div>
            );
          })}
        </>
      )}

      {meta.from !== meta.last_page && (
        <div className="flex justify-center space-x-2 mt-6">
          <button
            onClick={() => handlePageChange(links.first)}
            disabled={!links.first}
            className="px-3 py-1 border rounded"
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(links.prev)}
            disabled={!links.prev}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          <span className="px-3 py-1">
            Page {meta.current_page} of {meta.last_page}
          </span>
          <button
            onClick={() => handlePageChange(links.next)}
            disabled={!links.next}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(links.last)}
            disabled={!links.last}
            className="px-3 py-1 border rounded"
          >
            Last
          </button>
        </div>
      )}
    </>
  );
};

export default Workflows;
