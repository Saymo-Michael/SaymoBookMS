<?php

namespace App\Http\Controllers\api;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $books = Book::all();
            return response()->json($books, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving books. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255|unique:books,title',
                'author' => 'required|string|max:255',
                'published_year' => 'required|integer|min:1700|max:' . date('Y'),
                'genre' => 'required|string|max:100',
                'description' => 'required|string',
            ]);

            $book = Book::create($request->all());
            return response()->json($book, 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the book. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $book = Book::findOrFail($id);
            return response()->json($book, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Book not found',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving the book. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $book = Book::findOrFail($id);

            $request->validate([
                'title' => 'required|string|max:255|unique:books,title,' . $book->id,
                'author' => 'required|string|max:255',
                'published_year' => 'required|integer|min:1700|max:' . date('Y'),
                'genre' => 'required|string|max:100',
                'description' => 'required|string',
            ]);

            $book->update($request->all());

            return response()->json($book, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Book not found',
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the book. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $book = Book::findOrFail($id);
            $book->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Book not found',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the book. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
