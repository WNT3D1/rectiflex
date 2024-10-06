import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getReports } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const ReportsPage = () => {
  const { data: reports, isLoading, error } = useQuery(getReports);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error.message;

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Maintenance Reports</h1>
      <div className="grid grid-cols-1 gap-4">
        {reports.map((report) => (
          <div key={report.taskId} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Task ID: {report.taskId}</p>
                <p>Date: {new Date(report.date).toLocaleDateString()}</p>
                <p>Status: {report.status}</p>
                <p>Lot Number: {report.lotNumber}</p>
              </div>
              <div>
                <h2 className="font-semibold mb-2">Work Orders</h2>
                {report.workOrders.map((order) => (
                  <p key={order.workOrderId}>
                    Order ID: {order.workOrderId}, Status: {order.status}
                  </p>
                ))}
              </div>
            </div>
            <Link to={`/work-order/${report.taskId}`} className="text-blue-500 hover:underline mt-2 block">
              View Work Order Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
