import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getDashboardData } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const DashboardPage = () => {
  const { data, isLoading, error } = useQuery(getDashboardData);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error.message;

  const { outstandingTasks, analytics } = data;

  return (
    <div className="p-6 bg-slate-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <p>Total Tasks: {analytics.totalTasks}</p>
        <p>Pending Tasks: {analytics.pendingTasks}</p>
        <p>Completed Tasks: {analytics.completedTasks}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Outstanding Tasks</h2>
        {outstandingTasks.length > 0 ? (
          <ul>
            {outstandingTasks.map(task => (
              <li key={task.id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
                <p className="font-semibold">{task.description}</p>
                <p>Lot Number: {task.lotNumber}</p>
                <p>Contact: {task.contactDetails}</p>
                <p>Status: {task.status}</p>
                <Link to={`/work-order/${task.id}`} className="text-blue-500 hover:underline">
                  View Work Order
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No outstanding tasks.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
