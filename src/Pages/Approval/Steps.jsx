import { useParams } from "react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";
import { useSetupContext } from "@/Context/SetupProvider";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

const Steps = () => {
  const { id } = useParams();
  const [request, setRequest] = useState({});
  const [steps, setSteps] = useState([]);
  const { token } = useUserContext();
  const { locale, t } = useSetupContext();
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

  const getRequest = (url = `/approvals/requests`) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRequest(res.data?.data?.find((req) => req.id == id));
      });
  };

  const parsedData = useMemo(() => {
    try {
      return request?.data ? JSON.parse(request.data) : null;
    } catch {
      return {};
    }
  }, [request?.data]);
  useEffect(() => {
    if (effect.current) {
      getSteps();
      getRequest();
    }
    return () => {
      effect.current = false;
    };
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "1":
      case "2":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "3":
      case "4":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "5":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "1":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "2":
        return "bg-yellow-400 text-yellow-100 dark:bg-yellow-400/30 dark:text-yellow-100";
      case "3":
      case "4":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "5":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "4":
        return "bg-red-500 text-gray-100 dark:bg-red-900/80 dark:text-gray-300";
      case "3":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "2":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "1":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };
console.log(steps)
  return (
    <div className="mt-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Card Header */}
      <div className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {request?.user?.name} {request.id}
                </h3>
                <p>{request?.workflow?.name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 ">
            <div className="text-right ">
              <div className="p-6 border-gray-100 ">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
                        request?.priority?.id
                      )}`}
                    >
                      {locale === "en"
                        ? request?.priority?.en
                        : request?.priority?.ar}
                    </span>
                    <span
                      className={`inline-flex gap-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                         ${getStatusColor(request?.status?.id)} 
                    `}
                    >
                      {locale === "en"
                        ? request?.status?.en
                        : request?.status?.ar}
                      {getStatusIcon(request?.status?.id)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {parsedData && (
        Object.keys(parsedData).length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 m-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("Data Preview")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(parsedData).map(([key, value]) => (
                <div key={key} className="inline-flex items-center gap-3">
                  <span>{key}:</span>
                  <span>{value?.toString()}</span>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export { Steps };
