async function register(origin: string, name: string, email: string, password: string) {
  return await fetch(`${origin}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
}

async function login(origin: string, name: string, email: string, password: string) {
  return await fetch(`${origin}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(async r => {
    if (r.status === 401) {
      return await register(origin, name, email, password);
    }
    return r;
  }).then(r => r.json());
}

async function fetchTasks(origin: string, token: string) {
  return await fetch(`${origin}/api/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      accept: "application/json",
    },
  }).then(r => r.json());
}

async function addTask(origin: string, token: string, task: { title: string }) {
  return await fetch(`${origin}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      accept: "application/json",
    },
    body: JSON.stringify(task),
  }).then(r => r.json());
}

async function updateTask(origin: string, token: string, task: { id: number; title: string; is_completed: boolean }) {
  return await fetch(`${origin}/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      accept: "application/json",
    },
    body: JSON.stringify(task),
  }).then(r => r.json());
}

async function deleteTask(origin: string, token: string, taskId: number) {
  await fetch(`${origin}/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      accept: "application/json",
    },
  });
}

async function main() {
  const origin = 'http://localhost:8000';
  const loginResponse = await login(origin, 'test_user', 'user@example.com', 'password');
  const token = loginResponse.access_token;

  const tasks = await fetchTasks(origin, token);
  console.log(tasks);
  const addedTask = await addTask(origin, token, { title: 'New Task' });
  console.log(addedTask);
  const updatedTask = await updateTask(origin, token, { id: addedTask.id, title: 'Updated Task', is_completed: true });
  console.log(updatedTask);
  await deleteTask(origin, token, addedTask.id);
}

main();
