package Controller;

import model.Task;
import org.springframework.web.bind.annotation.*;
import repository.TaskRepository;

import java.util.List;

@RestController
@RequestMapping("/tasks")

public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskRepository.save(task);
    }
}
