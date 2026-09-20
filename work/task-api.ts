async function fetchTasks(origin: string) {
  return await fetch(`${origin}/api/tasks`).then(r => r.json());
}

async function addTask(origin: string, task: { title: string }) {
  return await fetch(`${origin}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then(r => r.json());
}

async function updateTask(origin: string, task: { id: number; title: string; is_completed: boolean }) {
  return await fetch(`${origin}/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then(r => r.json());
}

async function deleteTask(origin: string, taskId: number) {
  await fetch(`${origin}/api/tasks/${taskId}`, {
    method: 'DELETE',
  });
}

async function main() {
  const origin = 'http://localhost:8000';
  const tasks = await fetchTasks(origin);
  console.log(tasks);
  const addedTask = await addTask(origin, { title: 'New Task' });
  console.log(addedTask);
  const updatedTask = await updateTask(origin, { id: addedTask.id, title: 'Updated Task', is_completed: true });
  console.log(updatedTask);
  await deleteTask(origin, addedTask.id);
}

main();
