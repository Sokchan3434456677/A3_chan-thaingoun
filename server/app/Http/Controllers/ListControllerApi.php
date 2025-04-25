<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ListController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->query('user_id');

        $query = DB::table('lists');

        if ($userId) {
            $query->where('user_id', $userId);
        }

        $lists = $query->get();

        return response()->json($lists);
    }
}
