<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>tasks</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
  <div class="max-w-md mx-auto bg-white p-6 rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Tasks</h1>
      
    <form action="/tasks" method="POST" class="mb-4 flex gap-2">
      @csrf
      <input type="text" name="title" required placeholder="new task" class="border p-2 flex-1 rounded">
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>

    <ul>
      @foreach($tasks as $task)
        <li class="flex items-center justify-between py-2 border-b">
          <span class="{{ $task->is_completed ? 'line-through text-gray-400' : '' }}">
            {{ $task->title }}
          </span>
          <div class="flex gap-2">
            @if(!$task->is_completed)
            <form action="/tasks/{{ $task->id }}" method="POST">
                @csrf @method('PATCH')
                <input type="hidden" name="is_completed" value="1">
                <button type="submit" class="text-sm bg-green-500 text-white px-2 py-1 rounded">done</button>
            </form>
            @else
            <form action="/tasks/{{ $task->id }}" method="POST">
                @csrf @method('PATCH')
                <input type="hidden" name="is_completed" value="0">
                <button type="submit" class="text-sm bg-green-500 text-white px-2 py-1 rounded">make it in progress</button>
            </form>
            @endif
            <form action="/tasks/{{ $task->id }}" method="POST">
              @csrf @method('DELETE')
              <button type="submit" class="text-sm bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </form>
          </div>
        </li>
      @endforeach
    </ul>
  </div>
</body>
</html>
