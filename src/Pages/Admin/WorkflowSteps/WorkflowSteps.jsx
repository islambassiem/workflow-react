import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import EmptySteps from "@/components/WorkflowSteps/EmptySteps";
import CardTitle from "@/components/WorkflowSteps/CardTitle";
import StepCard from "@/components/WorkflowSteps/StepCard";
import DataModal from "@/components/WorkflowSteps/DataModal";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";
import Header from "@/components/WorkflowSteps/Header";
import Swal from "sweetalert2";
import { useSetupContext } from "@/Context/SetupProvider";

const WorkflowSteps = () => {
  const { workflow } = useParams();
  const { token } = useUserContext();
  const { theme, t } = useSetupContext();
  const [steps, setSteps] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    role_id: "",
  });

  async function getSteps() {
    await axios
      .get(`/workflows/${workflow}/steps`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSteps(res.data.data);
      });
  }

  useEffect(() => {
    getSteps();
  }, []);

  async function storeStep() {
    await axios.post(`/workflows/${workflow}/steps`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getSteps();
    Swal.fire({
      position: "top-end",
      icon: "success",
      theme: theme,
      toast: true,
      title: t("The step was added successfully"),
      showConfirmButton: false,
      timer: 1500,
    });
  }

  async function updateStep(step) {
    await axios.put(`/workflows/${workflow}/steps/${step}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getSteps();
  }

  const handleCreateStep = () => {
    setFormData({ name: "", description: "", role_id: "" });
    setEditingStep(null);
    setShowCreateModal(true);
  };

  const handleEditStep = (step) => {
    setFormData({
      name: step.name,
      description: step.description,
      role_id: step.role.id,
    });
    setEditingStep(step);
    setShowCreateModal(true);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (editingStep) {
      updateStep(editingStep.id);
      Swal.fire({
        position: "top-end",
        icon: "success",
        theme: theme,
        toast: true,
        title: t("The step was saved successfully"),
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      storeStep();
    }
    setShowCreateModal(false);
    setFormData({ name: "", description: "", role_id: "" });
  };

  const handleDeleteStep = (stepId) => {
    Swal.fire({
      title: t("Are you sure?"),
      text: t("You won't be able to revert this!"),
      icon: "warning",
      theme: theme,
      showCancelButton: true,
      cancelButtonText: t("Cancel"),
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Yes, delete it!"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/workflows/${workflow}/steps/${stepId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getSteps();
        Swal.fire({
          position: "top-end",
          icon: "success",
          theme: theme,
          toast: true,
          title: t("The step was deleted successfully"),
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t("Workflows") + " / " + t("Steps")}
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-6">
        <div className="py-3">
          <section className="text-gray-600 dark:text-gray-400">
            <div className="mx-auto p-6 dark:bg-gray-900 min-h-screen">
              {/* Header */}

              <Header workflow={workflow} handleCreateStep={handleCreateStep} />

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
          </section>
        </div>
      </div>
    </>
  );
};

export default WorkflowSteps;
