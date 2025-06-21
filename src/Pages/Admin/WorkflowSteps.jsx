import React, { useState } from 'react';
import { Plus, Edit2, Trash2, GripVertical, ChevronLeft, Users } from 'lucide-react';

const WorkflowSteps = () => {
  const [workflow] = useState({
    id: 1,
    name: "Employee Onboarding Process"
  });

  const [steps, setSteps] = useState([
    {
      id: 1,
      name: "Initial Documentation Review",
      description: "Review and verify all submitted documents including ID, contracts, and certifications",
      role_name: "HR Manager",
      order: 1
    },
    {
      id: 2,
      name: "Department Head Approval",
      description: "Department head reviews candidate qualifications and approves hiring decision",
      role_name: "Department Head",
      order: 2
    },
    {
      id: 3,
      name: "IT Setup Authorization",
      description: "Authorize IT equipment setup and account creation for new employee",
      role_name: "IT Administrator",
      order: 3
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    role_name: ''
  });

  const handleCreateStep = () => {
    setFormData({ name: '', description: '', role_name: '' });
    setEditingStep(null);
    setShowCreateModal(true);
  };

  const handleEditStep = (step) => {
    setFormData({
      name: step.name,
      description: step.description,
      role_name: step.role_name
    });
    setEditingStep(step);
    setShowCreateModal(true);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (editingStep) {
      // Update existing step
      setSteps(steps.map(step => 
        step.id === editingStep.id 
          ? { ...step, ...formData }
          : step
      ));
    } else {
      // Create new step
      const newStep = {
        id: Math.max(...steps.map(s => s.id)) + 1,
        ...formData,
        order: steps.length + 1
      };
      setSteps([...steps, newStep]);
    }
    setShowCreateModal(false);
    setFormData({ name: '', description: '', role_name: '' });
  };

  const handleDeleteStep = (stepId) => {
    if (window.confirm('Are you sure you want to delete this step?')) {
      setSteps(steps.filter(step => step.id !== stepId));
    }
  };

  const EmptyState = () => (
    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <Plus className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No steps defined yet</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        Get started by creating the first step in your workflow process.
      </p>
      <button
        onClick={handleCreateStep}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add First Step
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <button className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Workflows
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{workflow.name}</h1>
            <p className="text-gray-600 mt-1">Manage the steps in this workflow</p>
          </div>
          {steps.length > 0 && (
            <button
              onClick={handleCreateStep}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Step
            </button>
          )}
        </div>
      </div>

      {/* Steps Content */}
      {steps.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="bg-white rounded-lg shadow border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Workflow Steps</h2>
            <p className="text-sm text-gray-500 mt-1">Steps will be executed in the order shown below</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {steps.map((step, index) => (
              <div key={step.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Drag Handle */}
                  <div className="flex-shrink-0 mt-1">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                  </div>
                  
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{step.name}</h3>
                        <p className="text-gray-600 mb-3 leading-relaxed">{step.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          <span>Approver: <span className="font-medium text-gray-700">{step.role_name}</span></span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEditStep(step)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit step"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStep(step.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete step"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {editingStep ? 'Edit Step' : 'Create New Step'}
              </h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Step Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter step name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what happens in this step"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approver Role *
                </label>
                <input
                  type="text"
                  required
                  value={formData.role_name}
                  onChange={(e) => setFormData({...formData, role_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., HR Manager, Department Head"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingStep ? 'Update Step' : 'Create Step'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowSteps;