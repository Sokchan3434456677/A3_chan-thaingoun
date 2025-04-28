<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'is_completed',
        'due_date',
        'image_url'
    ];

    protected $casts = [
        'is_completed' => 'boolean',
        'due_date' => 'date',
        'image_url' => 'string'
    ];

    public function list()
    {
        return $this->belongsTo(TaskList::class, 'list_id');
    }
}
