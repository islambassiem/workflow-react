import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";
import { Link } from "react-router";
import { ChevronLeft, Plus } from "lucide-react";
import { useSetupContext } from "@/Context/SetupProvider";

const Header = ({ workflow, handleCreateStep }) => {
  const [parentWorkflow, setParentWorkflow] = useState({});
  const { token } = useUserContext();
  const {t} = useSetupContext();

  async function getParentWorkflow() {
    const res = await axios.get(`/workflows/${workflow}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setParentWorkflow(res.data.data);
  }

  useEffect(() => {
    getParentWorkflow();
  }, [parentWorkflow]);

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <Link to="/workflows">
          <button className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">
            <ChevronLeft className="w-4 h-4 ms-1 rtl:rotate-180" />
            {t("Back to Workflows")}
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {parentWorkflow.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {parentWorkflow.description}
          </p>
        </div>

        {parentWorkflow.steps_count > 0 && (
          <button
            onClick={handleCreateStep}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("Add Step")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
