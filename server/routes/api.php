<?php

// use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
*/

Route::middleware('auth:sanctum')->group(function () {
    // Get all lists for the authenticated user
    Route::get('/lists', [ListController::class, 'apiIndex'])->name('api.lists.index');

    // Get a specific list
    Route::get('/lists/{id}', [ListController::class, 'apiShow'])->name('api.lists.show');

    // Create a new list
    Route::post('/lists', [ListController::class, 'apiStore'])->name('api.lists.store');

    // Update a list
    Route::put('/lists/{id}', [ListController::class, 'apiUpdate'])->name('api.lists.update');

    // Delete a list
    Route::delete('/lists/{id}', [ListController::class, 'apiDestroy'])->name('api.lists.destroy');
});






// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\ListController;

// Route::get('/lists', [ListController::class, 'index']);
