<?php

namespace App\Http\Controllers;

use App\Models\ActivePlan;
use Illuminate\Http\Request;

class ActivePlanController extends Controller
{
    public function index()
    {
        try {
            $activePlans = ActivePlan::all();

            return response()->json([
                'status' => true,
                'activePlans' => $activePlans
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
