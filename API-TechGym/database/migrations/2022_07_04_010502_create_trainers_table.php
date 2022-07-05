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
        Schema::create('trainers', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("branch_id");
            $table->foreign("branch_id")->references("id")->on("branches");

            $table->string("name");
            $table->string("email")->nullable();
            $table->string("phone")->nullable();
            $table->double("rate")->nullable();

            $table->tinyInteger("status")->default(1);

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
        Schema::dropIfExists('trainers');
    }
};
