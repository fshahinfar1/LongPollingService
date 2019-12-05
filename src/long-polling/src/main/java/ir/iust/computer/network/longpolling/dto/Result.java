package ir.iust.computer.network.longpolling.dto;

import ir.iust.computer.network.longpolling.model.Event;
import ir.iust.computer.network.longpolling.model.Feed;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class Result {
    private Event event;
    private Feed feed;
    private Long postId;

}
