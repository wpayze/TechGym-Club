<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\api\BranchController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\MembershipController;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->controller(MemberController::class)->group(function() {
    Route::get("/member", "index");
    Route::get("/member/{id}", "show");
    Route::post("/member", "store");
    Route::put("/member/{id}", "update");
    Route::delete("/member/{id}", "delete");
});

Route::middleware('auth:sanctum')->controller(MembershipController::class)->group(function() {
    Route::get("/membership", "index");
    Route::get("/membership/{id}", "show");
    Route::post("/membership", "store");
    Route::put("/membership/{id}", "update");
    Route::delete("/membership/{id}", "delete");
});

Route::middleware('auth:sanctum')->controller(BranchController::class)->group(function() {
    Route::get("/branch", "index");
    Route::get("/branch/{id}", "show");
    Route::post("/branch", "store");
    Route::put("/branch/{id}", "update");
    Route::delete("/branch/{id}", "delete");
});

Route::get('/refreshToken', function () {
    return 'Hello World';
})->middleware('auth:sanctum');
