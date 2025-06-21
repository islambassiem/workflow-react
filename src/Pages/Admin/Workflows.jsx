import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "@/Context/UserContext.jsx";
import Pagination from "@/components/ui/Pagination";
import WorkflowCard from "@/components/Workflow/WorkflowCard";
import { Spinner } from "flowbite-react";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { LuPlus } from "react-icons/lu";
import { Link } from "react-router";
import { Button } from "flowbite-react";
import { useSetupContext } from "@/Context/SetupProvider.jsx";
import { CiSearch } from "react-icons/ci";



const Workflows = () => {
  const { token } = useUserContext();
  const { t } = useSetupContext();
  const [workflows, setWorkflows] = useState([]);
  const [links, setLinks] = useState({});
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedItem, setExpandedItem] = useState(null);
  const [searchValue, setsearchValue] = useState("");
  const debouncedSearchValue = useDebouncedValue(searchValue, 1000);

  async function fetchWorkflows(url = `/workflows?search=${searchValue}`) {
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
      fetchWorkflows(url + `&search=${searchValue}`);
    }
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (debouncedSearchValue) {
        fetchWorkflows(`/workflows?search=${debouncedSearchValue}`);
      } else {
        fetchWorkflows();
      }
    }
    return () => {
      ignore = true;
    };
  }, [debouncedSearchValue]);

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <>
      {/* Search */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"/>
            <input
              id="search"
              type="text"
              placeholder="Search records..."
              value={searchValue}
              onChange={(e) => setsearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-red-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent "
            />
          </div>
          <Link to="/workflows/create">
            <Button color="purple" className="mt-4">
              <LuPlus className="mr-2 rtl:ml-2" />
              {t("Add")}
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner color="info" aria-label="Info spinner example" />
        </div>
      ) : !workflows.length ? (
        <p className="text-center text-xl text-red-500">No workflows found.</p>
      ) : (
        <>
          {workflows.map((workflow, index) => {
            return (
              <WorkflowCard
                no={index + meta.from}
                key={workflow.id}
                item={workflow}
                isExpanded={expandedItem === workflow.id}
                onToggle={() => toggleExpanded(workflow.id)}
                relatedRecordsCount={workflow.steps_count}
              />
            );
          })}
        </>
      )}

      {meta.last_page > 1 && (
        <Pagination
          links={links}
          meta={meta}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default Workflows;
