package ir.iust.computer.network.longpolling.controll;


import ir.iust.computer.network.longpolling.dto.Result;
import ir.iust.computer.network.longpolling.model.DataType;
import ir.iust.computer.network.longpolling.model.Event;
import ir.iust.computer.network.longpolling.model.EventType;
import ir.iust.computer.network.longpolling.service.CommentService;
import ir.iust.computer.network.longpolling.service.EventService;
import ir.iust.computer.network.longpolling.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import static java.lang.Thread.sleep;

@CrossOrigin
@RestController
@RequestMapping(path = "/events", produces = "application/json")
public class EventController {

    private final EventService eventService;
    private final CommentService commentService;
    private final PostService postService;

    @Autowired
    public EventController(EventService eventService, PostService postService, CommentService commentService) {
        this.eventService = eventService;
        this.postService = postService;
        this.commentService = commentService;
    }

    @GetMapping()
    public ResponseEntity<List<Event>> getEventss() {
        return new ResponseEntity<>(eventService.getEvents(), HttpStatus.OK);
    }

    @GetMapping(path = "events/async/{startId}")
    public DeferredResult<ResponseEntity<List<Result>>> getCommentsAsync(@PathVariable Long startId) {
        List<Result> results = new ArrayList<>();
        DeferredResult<ResponseEntity<List<Result>>> deferredResult = createDifferResult();
        CompletableFuture.runAsync(() -> {
            List<Event> events = eventService.getEvents(startId);
            while (events.isEmpty()) {
                try {
                    sleep(1000);
                    events = eventService.getEvents(startId);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            List<Long> deletedFeeds = events.parallelStream().filter(e -> e.getEventType().name().equals(EventType.DELETE.name())).map(Event::getDataId).collect(Collectors.toList());
            for (Event event : events) {
                Result result = new Result();
                result.setPostId(event.getPostId());
                result.setEvent(event);
                if (event.getEventType().name().equals(EventType.DELETE.name())) {
                    results.add(result);
                    continue;
                }
                if (deletedFeeds.contains(event.getDataId())) {
                    continue;
                }
                if (event.getDataType().name().equals(DataType.POST.name())) {
                    result.setFeed(postService.getPost(event.getDataId()));
                } else {
                    result.setFeed(commentService.getComment(event.getDataId()));
                }
                results.add(result);
            }
            deferredResult.setResult(new ResponseEntity<>(results, HttpStatus.OK));
        });
        return deferredResult;
    }

    private DeferredResult<ResponseEntity<List<Result>>> createDifferResult() {
        DeferredResult<ResponseEntity<List<Result>>> deferredResult = new DeferredResult<>();
        deferredResult.onTimeout(() -> deferredResult.setErrorResult(ResponseEntity
                .status(HttpStatus.REQUEST_TIMEOUT).body("Request timeout occurred.")));
        deferredResult.onError((Throwable t) -> deferredResult.setErrorResult(ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.")));
        return deferredResult;
    }
}
