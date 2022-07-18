<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivePlan extends Model
{
    use HasFactory;

    protected $fillable = [
        "member_id",
        "membership_id",
        "trainer_id",
        "end"
    ];

    public function member () {
        return $this->belongsTo(Member::class);
    }

    public function membership () {
        return $this->belongsTo(Membership::class);
    }

    public function trainer () {
        return $this->belongsTo(Trainer::class);
    }

}
