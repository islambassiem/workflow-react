import { useUserContext } from "@/Context/UserContext";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  User,
  Mail,
  MapPin,
  CreditCard,
  Hash,
  Flag,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useSetupContext } from "@/Context/SetupProvider";
import { Spinner } from "flowbite-react";
import Pagination from "@/components/ui/Pagination";
import RequestCard from "@/components/Requests/RequestCard";

const Index = () => {
  const { token } = useUserContext();
  const [requests, setRequests] = useState([]);
  const effect = useRef(true);
  const { t } = useSetupContext();
  const [expandedItem, setExpandedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchRequests = (url = "/requests") => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRequests(res.data);
      });
  };

  useEffect(() => {
    if (effect.current) {
      fetchRequests();
      setLoading(false);
    }
    return () => {
      effect.current = false;
    };
  }, []);

  const handlePageChange = (url) => {
    if (url) {
      fetchRequests(url);
    }
  };

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 px-6 pt-6 mt-6">
      <div className="pb-3">
        <section className="text-gray-600 dark:text-gray-400">
          <>
            {loading ? (
              <div className="flex justify-center items-center">
                <Spinner color="info" aria-label="Info spinner example" />
              </div>
            ) : !requests?.data?.length ? (
              <p className="text-center text-xl text-red-500">
                {t("No records found")}
              </p>
            ) : (
              <>
                {requests.data.map((request, index) => {
                  return (
                    <RequestCard
                      no={index + requests.meta.from}
                      key={request.id}
                      item={request}
                      isExpanded={expandedItem === request.id}
                      onToggle={() => toggleExpanded(request.id)}
                      relatedRecordsCount={request.steps_count}
                    />
                  );
                })}
              </>
            )}

            {requests?.meta?.last_page > 1 && (
              <Pagination
                links={requests.links}
                meta={requests.meta}
                handlePageChange={handlePageChange}
              />
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default Index;
