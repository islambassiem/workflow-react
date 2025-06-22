import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Plus, Edit2, Trash2, ChevronLeft, Users } from "lucide-react";
import EmptySteps from "@/components/WorkflowSteps/EmptySteps";
import CardTitle from "@/components/WorkflowSteps/CardTitle";
import StepCard from "@/components/WorkflowSteps/StepCard";
import DataModal from "@/components/WorkflowSteps/DataModal";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";

const WorkflowSteps = () => {
  const { workflow } = useParams();
  const { token } = useUserContext();
  const [parentWorkflow, setParentWorkflow] = useState({});
  const [steps, setSteps] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    role_name: "",
  });

  useEffect(() => {
    async function getSteps() {
      const res = await axios.get(`/workflows/${workflow}/steps`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSteps(res.data.data);
      setParentWorkflow(res.data.data[0].workflow);
    }
    getSteps();
  }, []);

  const handleCreateStep = () => {
    setFormData({ name: "", description: "", role_name: "" });
    setEditingStep(null);
    setShowCreateModal(true);
  };

  const handleEditStep = (step) => {
    setFormData({
      name: step.name,
      description: step.description,
      role_name: step.role_name,
    });
    setEditingStep(step);
    setShowCreateModal(true);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (editingStep) {
      // Update existing step
      setSteps(
        steps.map((step) =>
          step.id === editingStep.id ? { ...step, ...formData } : step
        )
      );
    } else {
      // Create new step
      const newStep = {
        id: Math.max(...steps.map((s) => s.id)) + 1,
        ...formData,
        order: steps.length + 1,
      };
      setSteps([...steps, newStep]);
    }
    setShowCreateModal(false);
    setFormData({ name: "", description: "", role_name: "" });
  };

  const handleDeleteStep = (stepId) => {
    if (window.confirm("Are you sure you want to delete this step?")) {
      setSteps(steps.filter((step) => step.id !== stepId));
    }
  };

  return (
    <div className="mx-auto p-6 dark:bg-gray-900 min-h-screen">
      {/* Header */}

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <button className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mr-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Workflows
          </button>
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

          <button
            onClick={handleCreateStep}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Step
          </button>
        </div>
      </div>

      {steps.length === 0 ? (
        <EmptySteps handleCreateStep={handleCreateStep} />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700">
          <CardTitle />
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                handleEditStep={handleEditStep}
                handleDeleteStep={handleDeleteStep}
              />
            ))}
          </div>
        </div>
      )}

      {showCreateModal && (
        <DataModal
          editingStep={editingStep}
          formData={formData}
          setFormData={setFormData}
          setShowCreateModal={setShowCreateModal}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default WorkflowSteps;
