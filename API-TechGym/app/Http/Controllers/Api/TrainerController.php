<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Trainer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TrainerController extends Controller
{
    public function index()
    {
        try {
            $trainers = Trainer::all();

            return response()->json([
                'status' => true,
                'trainers' => $trainers
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validatedTrainer = Validator::make(
                $request->all(),
                [
                    'name' => 'required'
                ]
            );

            if ($validatedTrainer->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validatedTrainer->errors()
                ], 401);
            }

            $newTrainer = Trainer::create($request->all());

            return response()->json([
                'status' => true,
                'trainer' => $newTrainer
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $trainer = Trainer::findOrFail($id);

            return response()->json([
                'status' => true,
                'trainer' => $trainer
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $trainer = Trainer::findOrFail($id);

            $validatedTrainer = Validator::make(
                $request->all(),
                [
                    'name' => 'required'
                ]
            );

            if ($validatedTrainer->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validatedTrainer->errors()
                ], 401);
            }

            $trainer->update($request->all());

            return response()->json([
                'status' => true,
                'trainer' => $trainer
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try{
            $trainer = Trainer::findOrFail($id);
            $trainer->delete();

            return response()->json([
                'status' => true,
                'trainer' => $trainer
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
