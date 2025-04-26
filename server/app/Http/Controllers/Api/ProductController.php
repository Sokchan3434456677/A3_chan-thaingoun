<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TaskList;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Get product details.
     */
    public function getProduct(Request $request)
    {
        $products = TaskList::where('user_id', $request->user()->id)->get();

        return response()->json([
            'success' => true,
            'data' => $products,
        ], 200);
    }
}
