<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BannerController extends Controller
{
    // API Methods
    public function apiIndex()
    {
        $banners = Banner::all();

        return response()->json([
            'success' => true,
            'data' => $banners
        ], 200);
    }

    public function apiShow($id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json([
                'success' => false,
                'message' => 'Banner not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $banner
        ], 200);
    }

    public function apiStore(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|url',
        ]);

        $validated['user_id'] = Auth::id();
        $banner = Banner::create($validated);

        return response()->json([
            'success' => true,
            'data' => $banner,
            'message' => 'Banner created successfully'
        ], 201);
    }

    public function apiUpdate(Request $request, $id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json([
                'success' => false,
                'message' => 'Banner not found'
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|url',
        ]);

        $banner->update($validated);

        return response()->json([
            'success' => true,
            'data' => $banner,
            'message' => 'Banner updated successfully'
        ], 200);
    }

    public function apiDestroy($id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json([
                'success' => false,
                'message' => 'Banner not found'
            ], 404);
        }

        $banner->delete();

        return response()->json([
            'success' => true,
            'message' => 'Banner deleted successfully'
        ], 200);
    }

    // Web Methods
    public function index()
    {
        $banners = Banner::where('user_id', Auth::id())->get();

        return inertia('Banner/Index', [
            'banners' => $banners,
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|url',
        ]);

        $validated['user_id'] = Auth::id();
        Banner::create($validated);

        return redirect()->route('banner.index')->with('success', 'Banner created successfully!');
    }

    public function update(Request $request, Banner $banner)
    {
        $this->authorize('update', $banner);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|url',
        ]);

        $banner->update($validated);

        return redirect()->route('banner.index')->with('success', 'Banner updated successfully!');
    }

    public function destroy(Banner $banner)
    {
        $this->authorize('delete', $banner);

        $banner->delete();
        return redirect()->route('banner.index')->with('success', 'Banner deleted successfully!');
    }
}