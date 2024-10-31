<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $genres = [
            'Adventure',
            'Biography',
            'Classics',
            'Fantasy',
            'Horror',
            'History',
            'Mystery',
            'Romance',
            'Sci-Fi',
            'Thriller',
        ];

        return [
            'title' => $this->faker->sentence,
            'author' => $this->faker->name,
            'published_year' => $this->faker->year,
            'genre' => $this->faker->randomElement($genres),
            'description' => $this->faker->paragraph,
        ];
    }
}
