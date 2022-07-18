<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;
    protected  $fillable = [
        "names",
        "surnames",
        "email",
        "profession",
        "address",
        "phone",
        "emergency_phone",
        "birthday",
        "gender",
        "branch_id"
    ];

    public function branch () {
        return $this->belongsTo(Branch::class);
    }

    public function image () {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function activePlans()
    {
        return $this->hasMany(ActivePlan::class);
    }
}
