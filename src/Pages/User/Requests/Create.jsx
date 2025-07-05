import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";
import { useSetupContext } from "@/Context/SetupProvider";
import { Button, Label, Select, Radio } from "flowbite-react";
import { IoIosSave } from "react-icons/io";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

const Create = () => {
  const effect = useRef(true);
  const [workflows, setWorkflows] = useState([]);
  const { token } = useUserContext();
  const navigate = useNavigate();
  const { t } = useSetupContext();
  const [keyValuePairs, setKeyValuePairs] = useState([
    { id: 1, key: "", value: "" },
  ]);
  const [formData, setFormData] = useState({
    workflow_id: "",
    priority: "1",
  });

  const fetchWorkflows = () => {
    axios
      .get("/workflows", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setWorkflows(res.data.data);
      });
  };

  useEffect(() => {
    if (effect.current) {
      fetchWorkflows();
    }
    return () => {
      effect.current = false;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validPairs = keyValuePairs.filter(
      (pair) => pair.key.trim() && pair.value.trim()
    );

    const dataObject = {};
    validPairs.forEach((pair) => {
      dataObject[pair.key.trim()] = pair.value.trim();
    });

    const submitData = {
      workflow_id: formData.workflow_id,
      priority: formData.priority,
      data: JSON.stringify(dataObject),
    };

    axios
      .post("/requests", submitData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => navigate("/requests"))
      .catch((err) => {
        console.log(err);
      });
  };

  const addKeyValuePair = () => {
    const newId = Math.max(...keyValuePairs.map((pair) => pair.id)) + 1;
    setKeyValuePairs([...keyValuePairs, { id: newId, key: "", value: "" }]);
  };

  const removeKeyValuePair = (id) => {
    if (keyValuePairs.length > 1) {
      setKeyValuePairs(keyValuePairs.filter((pair) => pair.id !== id));
    }
  };

  const updateKeyValuePair = (id, field, value) => {
    setKeyValuePairs(
      keyValuePairs.map((pair) =>
        pair.id === id ? { ...pair, [field]: value } : pair
      )
    );
  };

  const priorities = [
    { id: "priority-1", label: t("Low") },
    { id: "priority-2", label: t("Medium") },
    { id: "priority-3", label: t("High") },
    { id: "priority-4", label: t("Urgent") },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <div className="mb-2 block">
                <Label htmlFor="workflows">{t("Select a workflow")}</Label>
              </div>
              <Select
                id="workflows"
                required
                value={formData.workflow_id}
                onChange={(e) =>
                  setFormData({ ...formData, workflow_id: e.target.value })
                }
              >
                <option disabled value={""}>
                  {t("Select a workflow")}
                </option>
                {workflows.map((workflow) => (
                  <option key={workflow.id} value={workflow.id}>
                    {workflow.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="md:col-span-1">
              <div className="mb-5 block">{t("Priority")}</div>
              <div className="flex flex-wrap gap-4">
                {priorities.map((priority) => (
                  <div
                    key={priority.id}
                    className="flex flex-1 items-center gap-2"
                  >
                    <Radio
                      id={priority.id}
                      name="priorities"
                      value={priority.id.split("-")[1]}
                      checked={formData.priority === priority.id.split("-")[1]}
                      onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                      }
                    />
                    <Label htmlFor={priority.id}>{priority.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h2 className="mt-6 mb-3 text-2xl">{t("Details")}</h2>
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("Custom Data Fields")}
              </p>
              <button
                type="button"
                onClick={addKeyValuePair}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none"
              >
                <Plus size={16} className="mr-1" />
                {t("Add Field")}
              </button>
            </div>

            <div className="space-y-3">
              {keyValuePairs.map((pair) => (
                <div key={pair.id} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      id="key"
                      placeholder="Key (e.g., username, email)"
                      value={pair.key}
                      onChange={(e) =>
                        updateKeyValuePair(pair.id, "key", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      id="value"
                      placeholder="Value"
                      value={pair.value}
                      onChange={(e) =>
                        updateKeyValuePair(pair.id, "value", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeKeyValuePair(pair.id)}
                    disabled={keyValuePairs.length === 1}
                    className={`p-2 rounded-lg transition-colors ${
                      keyValuePairs.length === 1
                        ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    }`}
                    title={
                      keyValuePairs.length === 1
                        ? "At least one field is required"
                        : "Remove field"
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {keyValuePairs.length > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {
                  keyValuePairs.filter(
                    (pair) => pair.key.trim() && pair.value.trim()
                  ).length
                }{" "}
                {t("valid fields added")}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <Button type="submit" className="flex gap-2">
              <IoIosSave />
              {t("Save")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
