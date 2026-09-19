<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index() {
        $tasks = Task::all();
        return view('tasks.index', compact('tasks'));
    }

    public function store(Request $request) {
        $request->validate(['title' => 'required|max:255']);
        Task::create(['title' => $request->title]);
        return back();
    }

    public function update(Request $request, Task $task) 
    {
        $validated = $request->validate([
            'is_completed' => 'required|boolean',
        ]);

        $task->update([
            'is_completed' => $validated['is_completed'],
        ]);

        return back();
    }

    public function destroy(Task $task) {
        $task->delete();
        return back();
    }
}
