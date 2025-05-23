<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Support\Str;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        $sortField = request("sort_field", 'created_at');
        $sortOrder = request("sort_order", 'desc');

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $projects = $query->orderBy($sortField, $sortOrder)->paginate(10)->onEachSide(1);
        return inertia("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null, //digunakan sebagai cek query ketika request seperti filter status = completed
            "success" => session("success"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia("Project/Create", [
            "project" => new ProjectResource(new Project()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadFIle */
        // jika ada image, upload ke storage
        $image = $data['image'] ?? null;
        if ($image) {
            $data['image_path'] = $image->store('project/' . Str::random(), 'public');

        }
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        Project::create($data);
        return to_route('project.index')->with('success', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks(); //relasi

        $sortField = request("sort_field", 'created_at');
        $sortOrder = request("sort_order", 'desc');

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }
        $tasks = $query->orderBy($sortField, $sortOrder)->paginate(10)->onEachSide(1);
        return Inertia("Project/Show", [
            "project" => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia("Project/Edit", [
            "project" => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadFIle */
        // jika ada image, upload ke storage
        $image = $data['image'] ?? null;
        if ($image) {
            // Hapus gambar lama jika ada dan file-nya benar-benar ada
            if ($project->image_path && Storage::disk('public')->exists($project->image_path)) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }

            // Simpan gambar baru
            $data['image_path'] = $image->store('project/' . Str::random(8), 'public');
        }

        $data['updated_by'] = Auth::id();
        $project->update($data);
        return to_route('project.index')->with('success', "Project \"$project->name \" updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        $project->delete();
        // Hapus gambar jika ada
        if ($project->image_path && Storage::disk('public')->exists($project->image_path)) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        return to_route('project.index')->with('success', "Project \"$project->name \" deleted successfully");
    }
}
