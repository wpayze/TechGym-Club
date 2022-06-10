<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemberController;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->controller(MemberController::class)->group(function() {
    Route::get("/members", "index");
    Route::get("/member/{id}", "show");
    Route::post("/member", "store");
    Route::put("/member/{id}", "update");
    Route::delete("/member/{id}", "delete");
});
