package ir.iust.computer.network.longpolling.service;

import ir.iust.computer.network.longpolling.model.Event;
import ir.iust.computer.network.longpolling.repository.EventRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class EventService {

    @Resource
    private EventRepository eventRepository;

    public void saveEvent(Event event) {
        eventRepository.save(event);
    }

    public List<Event> getEvents(Long id) {
        return eventRepository.findAllLatest(id);
    }

    public List<Event> getEvents() {
        return eventRepository.findAllLatest(0L);
    }
}
