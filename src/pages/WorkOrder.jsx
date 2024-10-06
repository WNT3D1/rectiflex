import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getTaskDetails, updateTaskStatus } from 'wasp/client/operations';

const WorkOrderPage = () => {
  const { workOrderId } = useParams();
  const { data: taskDetails, isLoading, error } = useQuery(getTaskDetails, { id: workOrderId });
  const updateTaskStatusFn = useAction(updateTaskStatus);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleStatusChange = (newStatus) => {
    updateTaskStatusFn({ taskId: taskDetails.id, newStatus });
  };

  return (
    <div className='p-4 bg-white rounded shadow'>
      <h1 className='text-2xl font-bold mb-4'>Work Order Details</h1>
      <div className='mb-4'>
        <p><strong>Date:</strong> {new Date(taskDetails.date).toLocaleDateString()}</p>
        <p><strong>Lot Number:</strong> {taskDetails.lotNumber}</p>
        <p><strong>Contact Details:</strong> {taskDetails.contactDetails}</p>
        <p><strong>Maintenance Class:</strong> {taskDetails.maintenanceClass}</p>
        <p><strong>Description:</strong> {taskDetails.description}</p>
        <p><strong>Status:</strong> {taskDetails.status}</p>
      </div>
      <div className='flex gap-2'>
        <button onClick={() => handleStatusChange('In Progress')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>In Progress</button>
        <button onClick={() => handleStatusChange('Completed')} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Completed</button>
      </div>
    </div>
  );
};

export default WorkOrderPage;
