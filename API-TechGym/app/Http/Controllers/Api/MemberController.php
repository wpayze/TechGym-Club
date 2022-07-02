<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MemberController extends Controller
{
    public function index()
    {
        try {
            $members = Member::all();

            return response()->json([
                'status' => true,
                'members' => $members
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
            $validatedMember = Validator::make(
                $request->all(),
                [
                    'names' => 'required',
                    'surnames' => 'required',
                    'birthday' => 'required',
                    'branch_id' => 'required'
                ]
            );

            if ($validatedMember->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validatedMember->errors()
                ], 401);
            }

            $newMember = Member::create($request->all());

            return response()->json([
                'status' => true,
                'member' => $newMember
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
            $member = Member::findOrFail($id);

            return response()->json([
                'status' => true,
                'member' => $member
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
            $member = Member::findOrFail($id);

            $validatedMember = Validator::make(
                $request->all(),
                [
                    'names' => 'required',
                    'surnames' => 'required',
                    'birthday' => 'required'
                ]
            );

            if ($validatedMember->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validatedMember->errors()
                ], 401);
            }

            $member->update($request->all());

            return response()->json([
                'status' => true,
                'member' => $member
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
            $member = Member::findOrFail($id);
            $member->delete();

            return response()->json([
                'status' => true,
                'member' => $member
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
