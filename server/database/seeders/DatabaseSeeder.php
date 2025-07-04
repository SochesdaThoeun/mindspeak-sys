<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            TagSeeder::class,
            PostSeeder::class,
            CommentSeeder::class,
            LikeSeeder::class,
            FaqSeeder::class,
            MessageSeeder::class,
            NotificationSeeder::class,
        ]);
    }
}
