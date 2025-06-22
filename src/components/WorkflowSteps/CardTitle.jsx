import React from "react";

const CardTitle = () => {
  return (
    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
        Workflow Steps
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Steps will be executed in the order shown below
      </p>
    </div>
  );
};

export default CardTitle;
