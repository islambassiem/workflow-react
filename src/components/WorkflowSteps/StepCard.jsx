import React from "react";
import { Edit2, Trash2, Users } from "lucide-react";
import { useSetupContext } from "@/Context/SetupProvider";

const StepCard = ({ step, index, handleEditStep, handleDeleteStep }) => {
  const {locale, t} = useSetupContext();
  return (
    <div
      key={step.id}
      className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <div className="flex items-start gap-4">
        {/* Step Number */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full flex items-center justify-center text-sm font-medium">
            {index + 1}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {step.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                {step.description}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                <Users className="w-4 h-4 mr-1" />
                <span>
                  {t("Approver")}:
                  <span className="font-medium text-gray-700 dark:text-gray-300 ms-2">
                    {locale === 'ar' ? step.role.name_ar : step.role.name}
                  </span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => handleEditStep(step)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-500 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title={t("Edit step")}
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteStep(step.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:text-gray-500 dark:hover:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title={t("Delete step")}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
