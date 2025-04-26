<?php


namespace App\Http\Controllers;

use App\Models\TaskList;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Get all products (lists) with their tasks.
     */
    public function index()
    {
        $products = TaskList::with('tasks')->get();

        return response()->json([
            'success' => true,
            'data' => $products
        ], 200);
    }
}
