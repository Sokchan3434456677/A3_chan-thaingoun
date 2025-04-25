<?php






namespace App\Http\Controllers;

use App\Models\TaskList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ListController extends Controller
{
    /**
     * API: Get all lists for the authenticated user
     */
    public function apiIndex()
    {
        $lists = TaskList::where('user_id', Auth::id())
            ->with('tasks')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $lists
        ], 200);
    }

    /**
     * API: Get a specific list
     */
    public function apiShow($id)
    {
        $list = TaskList::where('user_id', Auth::id())
            ->with('tasks')
            ->find($id);

        if (!$list) {
            return response()->json([
                'success' => false,
                'message' => 'List not found or you do not have permission'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $list
        ], 200);
    }

    /**
     * API: Create a new list
     */
    public function apiStore(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|url',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'size' => 'nullable|string',
            'color' => 'nullable|string',
            'quantity' => 'required|integer|min:0',
        ]);

        $list = TaskList::create([
            ...$validated,
            'user_id' => Auth::id(),
        ]);

        return response()->json([
            'success' => true,
            'data' => $list,
            'message' => 'List created successfully'
        ], 201);
    }

    /**
     * API: Update a list
     */
    public function apiUpdate(Request $request, $id)
    {
        $list = TaskList::where('user_id', Auth::id())->find($id);

        if (!$list) {
            return response()->json([
                'success' => false,
                'message' => 'List not found or you do not have permission'
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|url',
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'size' => 'nullable|string',
            'color' => 'nullable|string',
            'quantity' => 'sometimes|integer|min:0',
        ]);

        $list->update($validated);

        return response()->json([
            'success' => true,
            'data' => $list,
            'message' => 'List updated successfully'
        ], 200);
    }

    /**
     * API: Delete a list
     */
    public function apiDestroy($id)
    {
        $list = TaskList::where('user_id', Auth::id())->find($id);

        if (!$list) {
            return response()->json([
                'success' => false,
                'message' => 'List not found or you do not have permission'
            ], 404);
        }

        $list->delete();

        return response()->json([
            'success' => true,
            'message' => 'List deleted successfully'
        ], 200);
    }

    /**
     * Display a listing of the resource (Web)
     */
    public function index()
    {
        $lists = TaskList::where('user_id', Auth::id())
            ->with('tasks')
            ->get();

        return inertia('Lists/Index', [
            'lists' => $lists,
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage (Web)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|url',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'size' => 'nullable|string',
            'color' => 'nullable|string',
            'quantity' => 'required|integer|min:0',
        ]);

        TaskList::create([
            ...$validated,
            'user_id' => Auth::id()
        ]);

        return redirect()->route('lists.index')->with('success', 'List created successfully!');
    }

    /**
     * Update the specified resource in storage (Web)
     */
    public function update(Request $request, TaskList $list)
    {
        if ($list->user_id !== Auth::id()) {
            return redirect()->route('lists.index')->with('error', 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|url',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'size' => 'nullable|string',
            'color' => 'nullable|string',
            'quantity' => 'required|integer|min:0',
        ]);

        $list->update($validated);

        return redirect()->route('lists.index')->with('success', 'List updated successfully!');
    }

    /**
     * Remove the specified resource from storage (Web)
     */
    public function destroy(TaskList $list)
    {
        if ($list->user_id !== Auth::id()) {
            return redirect()->route('lists.index')->with('error', 'Unauthorized action.');
        }

        $list->delete();
        return redirect()->route('lists.index')->with('success', 'List deleted successfully!');
    }
}
