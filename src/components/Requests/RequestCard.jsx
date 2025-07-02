import { Link } from "react-router";
import { useSetupContext } from "@/Context/SetupProvider";
import { Hash, AlertCircle, Clock, CheckCircle, Flag } from "lucide-react";

const WorkflowCard = ({
  no,
  item,
  isExpanded,
  onToggle,
  relatedRecordsCount = 0,
}) => {
  const { t } = useSetupContext();

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 1:
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          label: "High",
          icon: AlertCircle,
        };
      case 2:
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          label: "Medium",
          icon: Clock,
        };
      case 3:
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          label: "Low",
          icon: CheckCircle,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          label: "Unknown",
          icon: Flag,
        };
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 0:
        return { color: "bg-gray-100 text-gray-800", label: "Pending" };
      case 1:
        return { color: "bg-blue-100 text-blue-800", label: "In Progress" };
      case 2:
        return { color: "bg-green-100 text-green-800", label: "Completed" };
      default:
        return { color: "bg-gray-100 text-gray-800", label: "Unknown" };
    }
  };

  const priorityConfig = getPriorityConfig(item.priority);
  const statusConfig = getStatusConfig(item.status);
  const PriorityIcon = priorityConfig.icon;

  return (
    <div className="mt-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Card Header */}
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                #{no}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {item.workflow.name}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 ">
            <div className="text-right ">
              <div className="p-6 border-gray-100 ">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityConfig.color}`}
                    >
                      <PriorityIcon className="h-3 w-3 mr-1" />
                      {priorityConfig.label}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}
                    >
                      {statusConfig.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`transform transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <svg
                className="w-5 h-5 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
          <div className="pt-4 space-y-4">
            {/* Full Description */}
            {item?.description && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {t("Full Description")}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  {item?.description}
                </p>
              </div>
            )}

            {/* Related Records Section */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-indigo-600 dark:text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                      {t("Related Records")}
                    </p>
                    <p className="text-xs text-indigo-500 dark:text-indigo-400">
                      {relatedRecordsCount} {t("dependent records")}
                      {relatedRecordsCount !== 1 ? "s" : ""} {t("found")}
                    </p>
                  </div>
                </div>
                <Link to={`/requests/${item.id}/steps`}>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2 shadow-sm">
                    <span>{t("View Details")}</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;
