package ir.iust.computer.network.longpolling.repository;

import ir.iust.computer.network.longpolling.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findAllByIdGreaterThanEqual(Long id);
}
