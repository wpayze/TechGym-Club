<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('active_plans', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("member_id");
            $table->foreign("member_id")->references("id")->on("members");

            $table->unsignedBigInteger("membership_id");
            $table->foreign("membership_id")->references("id")->on("memberships");

            $table->unsignedBigInteger("trainer_id")->nullable();
            $table->foreign("trainer_id")->references("id")->on("trainers");
            
            $table->dateTime('end');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('active_plans');
    }
};
