import { Controller, Get, Post, Delete, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @UseGuards(AuthGuard)
    @Get()
    getAllTasks(
        @Query('status') status?: 'OPEN' | 'IN_PROGRESS' | 'DONE',
        @Query('title') title?: string,
    ): Task[] {
        return this.tasksService.getFilteredTask(status, title);
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        return this.tasksService.createTask(title, description);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteTask(@Param('id') id: string): { message: string, id: string } {
        return this.tasksService.deleteTask(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: 'OPEN' | 'IN_PROGRESS' | 'DONE',
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}