import { HttpError } from 'wasp/server'

export const getDashboardData = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const outstandingTasks = await context.entities.Task.findMany({
    where: { status: 'Pending', assignedTo: { id: context.user.id } },
    include: { WorkOrder: true }
  });

  const analytics = {
    totalTasks: await context.entities.Task.count(),
    pendingTasks: await context.entities.Task.count({ where: { status: 'Pending' } }),
    completedTasks: await context.entities.Task.count({ where: { status: 'Completed' } })
  };

  return { outstandingTasks, analytics };
}

export const getTaskDetails = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const task = await context.entities.Task.findUnique({
    where: { id },
    include: {
      assignedTo: {
        select: {
          id: true,
          role: true
        }
      }
    }
  });

  if (!task) throw new HttpError(404, 'No task with id ' + id);

  return task;
}

export const getReports = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  const filters = {};
  if (args.startDate) {
    filters.date = { gte: new Date(args.startDate) };
  }
  if (args.endDate) {
    filters.date = filters.date || {};
    filters.date.lte = new Date(args.endDate);
  }
  if (args.status) {
    filters.status = args.status;
  }
  if (args.assignedTo) {
    filters.userId = args.assignedTo;
  }

  const tasks = await context.entities.Task.findMany({
    where: filters,
    include: {
      WorkOrder: true
    }
  });

  return tasks.map(task => ({
    taskId: task.id,
    date: task.date,
    status: task.status,
    lotNumber: task.lotNumber,
    workOrders: task.WorkOrder.map(order => ({
      workOrderId: order.id,
      status: order.status
    }))
  }));
}
