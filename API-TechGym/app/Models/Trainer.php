<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trainer extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "email",
        "phone",
        "rate",
        "active",
        "branch_id"
    ];

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function activePlans()
    {
        return $this->hasMany(ActivePlan::class);
    }
}
