<?php


use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;
use App\Http\Controllers\BannerController;

use App\Http\Controllers\PaymentController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {

Route::post('/Logout', [AuthController::class, 'Logout']);
Route::get('/profile', [AuthController::class, 'profile']);


// Route::get('/api', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource('lists', ListController::class);

// API routes for TaskList
Route::get('/lists', [ListController::class, 'apiIndex']);
Route::get('/lists/{id}', [ListController::class, 'apiShow']);
Route::post('/lists', [ListController::class, 'apiStore'])->middleware('auth:sanctum');
Route::put('/lists/{id}', [ListController::class, 'apiUpdate'])->middleware('auth:sanctum');
Route::delete('/lists/{id}', [ListController::class, 'apiDestroy'])->middleware('auth:sanctum');

// API routes for Banners
Route::get('/banners', [BannerController::class, 'apiIndex']);
        Route::get('/banners/{id}', [BannerController::class, 'apiShow']);
        Route::post('/banners', [BannerController::class, 'apiStore']);
        Route::put('/banners/{id}', [BannerController::class, 'apiUpdate']);
        Route::delete('/banners/{id}', [BannerController::class, 'apiDestroy']);

});

Route::get('/init-payment', [PaymentController::class, 'initPayment']);
Route::get('/check-status/{txnId}', [PaymentController::class, 'checkStatus']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// // API routes for TaskList
// Route::get('/lists', [ListController::class, 'apiIndex']); // Get all lists
// Route::get('/lists/{id}', [ListController::class, 'apiShow']); // Get a specific list
// Route::post('/lists', [ListController::class, 'apiStore'])->middleware('auth:sanctum'); // Create a new list
// Route::put('/lists/{id}', [ListController::class, 'apiUpdate'])->middleware('auth:sanctum'); // Update a list
// Route::delete('/lists/{id}', [ListController::class, 'apiDestroy'])->middleware('auth:sanctum'); // Delete a list