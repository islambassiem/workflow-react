import React from "react";
import { Plus } from "lucide-react";
import { useSetupContext } from "@/Context/SetupProvider";
const EmptySteps = ({handleCreateStep}) => {
  const {t} = useSetupContext();
  return (
    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
      <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
        <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {t("No steps defined yet")}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        {t("Get started by creating the first step in your workflow process.")}
      </p>
      <button
        onClick={handleCreateStep}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        {t("Add First Step")}
      </button>
    </div>
  );
};

export default EmptySteps;
