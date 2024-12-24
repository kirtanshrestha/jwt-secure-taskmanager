import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];


    getFilteredTask(status?: 'OPEN' | 'IN_PROGRESS' | 'DONE', title?: string): Task[] {
        let filteredTasks = this.tasks;

        if (status) {
            filteredTasks = filteredTasks.filter(task => task.status.toLowerCase().includes(status.toLowerCase()));
        }

        if (title) {
            filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(title.toLowerCase()));
        }
        return filteredTasks;
    }

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found.`);
        }
        return task;
    }

    createTask(title: string, description: string): Task {
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: 'OPEN',
        };
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): { message: string, id: string } {
        this.tasks = this.tasks.filter(task => task.id !== id);

        return {
            message: " Task has been deleted.",
            id
        };
    }

    updateTaskStatus(id: string, status: 'OPEN' | 'IN_PROGRESS' | 'DONE'): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
