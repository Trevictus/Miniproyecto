package iesrafaelalberti.miniproyectobackend.repository;

import iesrafaelalberti.miniproyectobackend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
