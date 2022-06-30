<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BranchController extends Controller
{
    public function index()
    {
        try {
            $branches = Branch::all();

            return response()->json([
                'status' => true,
                'branches' => $branches
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
            $validatedBranch = Validator::make(
                $request->all(),
                [
                    'name' => 'required'
                ]
            );

            if ($validatedBranch->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validatedBranch->errors()
                ], 401);
            }

            $newBranch = Branch::create($request->all());

            return response()->json([
                'status' => true,
                'branch' => $newBranch
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
            $branch = Branch::findOrFail($id);

            return response()->json([
                'status' => true,
                'branch' => $branch
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
            $branch = Branch::findOrFail($id);

            $validateBranch = Validator::make(
                $request->all(),
                [
                    'name' => 'required'
                ]
            );

            if ($validateBranch->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateBranch->errors()
                ], 401);
            }

            $branch->update($request->all());

            return response()->json([
                'status' => true,
                'branch' => $branch
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
        try {
            $branch = Branch::findOrFail($id);
            $branch->delete();

            return response()->json([
                'status' => true,
                'branch' => $branch
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
