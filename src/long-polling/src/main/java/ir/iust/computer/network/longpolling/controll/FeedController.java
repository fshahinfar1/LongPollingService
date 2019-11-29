package ir.iust.computer.network.longpolling.controll;

import ir.iust.computer.network.longpolling.dto.FeedDto;
import ir.iust.computer.network.longpolling.service.FeedService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;
import java.util.concurrent.ForkJoinPool;

@RestController
@RequestMapping(path = "/feed", produces = "application/json")
public class FeedController {
    private FeedService feedService;
    Logger logger = LoggerFactory.getLogger(FeedController.class);

    @Autowired
    public FeedController(FeedService feedService) {
        this.feedService = feedService;
    }

    @GetMapping
    public DeferredResult<ResponseEntity<List<FeedDto>>> getFeeds() {
        DeferredResult<ResponseEntity<List<FeedDto>>> deferredResult = new DeferredResult<>();
        deferredResult.onTimeout(() -> deferredResult.setErrorResult(ResponseEntity
                .status(HttpStatus.REQUEST_TIMEOUT).body("Request timeout occurred.")));
        deferredResult.onError((Throwable t) -> deferredResult.setErrorResult(ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.")));
        ForkJoinPool.commonPool().submit(() -> {
            deferredResult.setResult(new ResponseEntity<>(feedService.getFeeds(), HttpStatus.OK));
        });
        return deferredResult;
    }

    @PostMapping(path = "/addFeed")
    public ResponseEntity<FeedDto> addFeed(@RequestBody FeedDto feedDto) {
        return new ResponseEntity<>(feedService.saveFeed(feedDto), HttpStatus.CREATED);
    }
}
