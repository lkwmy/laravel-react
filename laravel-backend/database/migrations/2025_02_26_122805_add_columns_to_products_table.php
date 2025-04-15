<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('img1')->nullable(); 
            $table->string('img2')->nullable(); 
            $table->string('img3')->nullable(); 
            $table->string('img4')->nullable(); 
            $table->string('img5')->nullable();
            $table->string('img6')->nullable();
            $table->string('img7')->nullable();   
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['img1','img2','img3','img4','img5','img6','img7']);
        });
    }
}
