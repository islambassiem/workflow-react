import { useEffect, useState, useRef } from "react";
import { useUserContext } from "@/Context/UserContext";
import axios from "axios";
import { useSetupContext } from "@/Context/SetupProvider";
import { Spinner } from "flowbite-react";
import RequestCard from "@/components/Approvals/RequestCard";

const Index = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useUserContext();
  const { t } = useSetupContext();
  const effect = useRef(true);
  const [expandedItem, setExpandedItem] = useState(null);

  const getRequests = async (url = "/approvals/requests") => {
    return await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRequests(res.data));
  };

  useEffect(() => {
    if (effect.current) {
      getRequests();
      setLoading(false);
    }

    return () => {
      effect.current = false;
    };
  }, []);

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 px-6 pt-6 mt-6">
        <div className="pb-3">
          <section className="text-gray-600 dark:text-gray-400">
            <>
              {loading ? (
                <div className="flex justify-center items-center">
                  <Spinner color="info" aria-label="Info spinner example" />
                </div>
              ) : requests?.data?.length === 0 ? (
                <p className="text-center text-xl text-red-500">
                  {t("No records found")}
                </p>
              ) : (
                <>
                  {requests?.data?.map((request, index) => {
                    return (
                      <RequestCard
                        key={request.id}
                        no={index + 1}
                        item={request}
                        isExpanded={expandedItem === request.id}
                        onToggle={() => toggleExpanded(request.id)}
                        relatedRecordsCount={0}
                      />
                    );
                  })}
                </>
              )}

              {/* {requests?.meta?.last_page > 1 && (
                <Pagination
                  links={requests.links}
                  meta={requests.meta}
                  handlePageChange={handlePageChange}
                />
              )} */}
            </>
          </section>
        </div>
      </div>
    </>
  );
};

export { Index };
