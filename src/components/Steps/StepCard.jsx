import { useSetupContext } from "@/Context/SetupProvider";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

const StepCard = ({ step }) => {
  const { t, locale } = useSetupContext();

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

  return (
    <div className="bg-white dark:bg-gray-800 my-4 rounded-xl shadow-lg border dark:border-gray-700">
      <div className="space-y-4">
        <div key={step.id} className="relative">
          <div className="flex items-start space-x-4 p-4 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex-shrink-0 mt-1">
              {getStatusIcon(step.status.id)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {step.step.name}
                </h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status.id)}`}>
                  {locale === "en"
                    ? step.status.en
                    : step.status.ar}
                </span>
              </div>

              <div className="flex gap-4 mb-3">
                <span className="text-gray-500 dark:text-gray-400">
                  {t("Approver")}:
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {step?.approver?.name}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {step.action_by && (
                  <div className="flex gap-4">
                    <span className="text-gray-500 dark:text-gray-400">
                      {t("Action By")}:{" "}
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {step?.action_by?.name}
                    </span>
                  </div>
                )}

                {step.updated_at && (
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      {t("Last Update")}:{" "}
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {new Date(step.updated_at).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {step.comment && (
                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.comment}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
