// import { useSetupContext } from "@/Context/SetupProvider";
import { useUserContext } from "@/Context/UserContext";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import StepCard from "@/components/Steps/StepCard";
import { useSetupContext } from "@/Context/SetupProvider";

const Steps = () => {
  const { id } = useParams();
  const effect = useRef(true);
  const { token } = useUserContext();
  const { t, locale } = useSetupContext();
  const [steps, setSteps] = useState([]);
  const [request, setRequest] = useState({});
  const [requestData, setRequestData] = useState({});

  const getSteps = () => {
    axios
      .get(`/requests/${id}/steps`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSteps(res.data.data);
      });
  };

  const getRequest = () => {
    axios
      .get(`/requests/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRequest(res.data);
        setRequestData(JSON.parse(res.data.data));
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
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "4":
        return "bg-red-500 text-gray-100 dark:bg-red-900/80 dark:text-gray-¸00";
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

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 mb-8">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {request?.workflow?.name}
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request?.status?.id)}`}>
                {locale === "en" ? request?.status?.en : request?.status?.ar}
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                request?.priority?.id
              )}`}
            >
              {t("Priority")}{" "}
              {locale === "en" ? request?.priority?.en : request?.priority?.ar}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {request?.workflow?.description}
          </p>

          {Object.entries(requestData).map(([key, value]) => (
            <div key={key} className="flex gap-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {key}
              </h3>
              <p className="flex-1 text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
      {steps.map((step) => (
        <StepCard key={step.id} step={step} />
      ))}
    </>
  );
};

export default Steps;
