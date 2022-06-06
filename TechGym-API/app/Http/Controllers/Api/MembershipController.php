<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Membership;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MembershipController extends Controller
{
    public function index()
    {
        try {
            $memberships = Membership::all();

            return response()->json([
                'status' => true,
                'memberships' => $memberships
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
            $validatedMembership = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'price' => 'required',
                    'months' => 'required'
                ]
            );

            if ($validatedMembership->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validatedMembership->errors()
                ], 401);
            }

            $newMembership = Membership::create($request->all());

            return response()->json([
                'status' => true,
                'membership' => $newMembership
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
            $member = Membership::findOrFail($id);

            return response()->json([
                'status' => true,
                'membership' => $member
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
            $membership = Membership::findOrFail($id);

            $validatedMembership = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'price' => 'required',
                    'months' => 'required'
                ]
            );

            if ($validatedMembership->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validatedMembership->errors()
                ], 401);
            }

            $membership->update($request->all());

            return response()->json([
                'status' => true,
                'membership' => $membership
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
            $membership = Membership::findOrFail($id);
            $membership->delete();

            return response()->json([
                'status' => true,
                'membership' => $membership
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
