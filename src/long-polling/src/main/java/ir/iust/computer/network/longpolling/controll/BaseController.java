package ir.iust.computer.network.longpolling.controll;

import ir.iust.computer.network.longpolling.model.DataType;
import ir.iust.computer.network.longpolling.model.Event;
import ir.iust.computer.network.longpolling.model.EventType;

import java.util.Date;

public abstract class BaseController {

    Event createEvent(EventType eventType, DataType dataType, Long id) {
        Event event = new Event();
        event.setDataId(id);
        event.setDataType(dataType);
        event.setEventType(eventType);
        event.setEventTime(new Date());
        return event;
    }
}
