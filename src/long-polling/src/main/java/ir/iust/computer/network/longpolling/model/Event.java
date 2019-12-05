package ir.iust.computer.network.longpolling.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Enum<DataType> dataType;
    private Enum<EventType> eventType;
    private Long dataId;
    private Date eventTime;
}
