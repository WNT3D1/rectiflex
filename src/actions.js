import { HttpError } from 'wasp/server'

export const createTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  if (context.user.role !== 'Admin') { throw new HttpError(403) };

  const { date, lotNumber, contactDetails, maintenanceClass, description, assignedTo } = args;
  if (!date || !lotNumber || !contactDetails || !maintenanceClass || !description || !assignedTo) {
    throw new HttpError(400, 'All fields are required.');
  }

  const newTask = await context.entities.Task.create({
    data: {
      date,
      lotNumber,
      contactDetails,
      maintenanceClass,
      description,
      userId: assignedTo
    }
  });

  return newTask;
}

export const updateTaskStatus = async ({ taskId, newStatus }, context) => {
  if (!context.user) { throw new HttpError(401) };
  
  const task = await context.entities.Task.findUnique({
    where: { id: taskId }
  });
  
  if (!task) { throw new HttpError(404, 'Task not found') };
  if (task.userId !== context.user.id) { throw new HttpError(403) };
  
  return context.entities.Task.update({
    where: { id: taskId },
    data: { status: newStatus }
  });
}

export const generateWorkOrder = async ({ taskId }, context) => {
  if (!context.user) { throw new HttpError(401) };
  
  const task = await context.entities.Task.findUnique({
    where: { id: taskId }
  });
  
  if (!task) { throw new HttpError(404, 'Task not found') };
  
  if (task.status === 'Pending') {
    const workOrder = await context.entities.WorkOrder.create({
      data: {
        taskId: task.id,
        status: 'Pending'
      }
    });
    return workOrder;
  } else {
    throw new HttpError(400, 'Work order cannot be generated for a task that is not pending');
  }
}
