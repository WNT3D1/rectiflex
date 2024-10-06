import React, { useState } from 'react';
import { useAction } from 'wasp/client/operations';
import { createTask } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const MaintenanceLogPage = () => {
  const createTaskFn = useAction(createTask);
  const [formData, setFormData] = useState({
    date: '',
    lotNumber: '',
    contactDetails: '',
    maintenanceClass: '',
    description: '',
    assignedTo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTaskFn(formData);
      alert('Task created successfully!');
      setFormData({
        date: '',
        lotNumber: '',
        contactDetails: '',
        maintenanceClass: '',
        description: '',
        assignedTo: ''
      });
    } catch (error) {
      alert('Error creating task: ' + error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Log Maintenance Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Lot Number</label>
          <input
            type="text"
            name="lotNumber"
            value={formData.lotNumber}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter lot number"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Details</label>
          <input
            type="text"
            name="contactDetails"
            value={formData.contactDetails}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter contact details"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Maintenance Class</label>
          <input
            type="text"
            name="maintenanceClass"
            value={formData.maintenanceClass}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter maintenance class"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter task description"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Assign To</label>
          <input
            type="number"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter user ID"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Task
        </button>
      </form>
      <div className="mt-4">
        <Link to="/" className="text-blue-500 hover:underline">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default MaintenanceLogPage;
