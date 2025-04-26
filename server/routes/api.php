<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// API routes for TaskList
Route::get('/lists', [ListController::class, 'apiIndex']); // Get all lists
Route::get('/lists/{id}', [ListController::class, 'apiShow']); // Get a specific list
Route::post('/lists', [ListController::class, 'apiStore'])->middleware('auth:sanctum'); // Create a new list
Route::put('/lists/{id}', [ListController::class, 'apiUpdate'])->middleware('auth:sanctum'); // Update a list
Route::delete('/lists/{id}', [ListController::class, 'apiDestroy'])->middleware('auth:sanctum'); // Delete a list
