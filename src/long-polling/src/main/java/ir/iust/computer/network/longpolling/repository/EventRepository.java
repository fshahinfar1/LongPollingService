package ir.iust.computer.network.longpolling.repository;

import ir.iust.computer.network.longpolling.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findAllByIdGreaterThanEqual(Long id);
    @Query(value = "SELECT e.* FROM EVENT e " +
            "INNER JOIN " +
            "(SELECT data_Id, data_type, MAX(event_Time) as maxTime from EVENT GROUP by data_Id, data_type) groupe" +
            " ON e.data_Id = groupe.data_Id AND e.event_Time = groupe.maxTime AND e.data_Type = groupe.data_type" +
            " Where id >= :startId", nativeQuery = true)
    List<Event> findAllLatest(@Param("startId") Long id);
}
