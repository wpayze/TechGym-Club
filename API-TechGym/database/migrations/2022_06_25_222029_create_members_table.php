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
        Schema::create('members', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("branch_id");
            $table->foreign("branch_id")->references("id")->on("branches");

            $table->string("names");
            $table->string("surnames");
            $table->string("email")->nullable();
            $table->string("profession")->nullable();
            $table->string("address")->nullable();
            $table->string("phone")->nullable();
            $table->string("emergency_phone")->nullable();
            $table->dateTime('birthday');
            $table->char('gender', 1);

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
        Schema::dropIfExists('members');
    }
};
