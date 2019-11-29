package ir.iust.computer.network.longpolling.controll;

import ir.iust.computer.network.longpolling.model.Feed;
import ir.iust.computer.network.longpolling.service.FeedService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import static java.lang.Thread.sleep;

@RestController
@RequestMapping(path = "/feeds", produces = "application/json")
public class FeedController extends AsyncController<Feed> {
    private FeedService feedService;
    Logger logger = LoggerFactory.getLogger(FeedController.class);

    @Autowired
    public FeedController(FeedService feedService) {
        this.feedService = feedService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Feed> getFeed(@PathVariable long id) {
        return new ResponseEntity<>(feedService.getFeed(id), HttpStatus.OK);
    }

    @GetMapping(path = "/async/{startId}")
    public DeferredResult<ResponseEntity<List<Feed>>> getFeedsAsync(@PathVariable  Long startId) {
        DeferredResult<ResponseEntity<List<Feed>>> deferredResult = createDifferResult();
        CompletableFuture.runAsync(() -> {
            List<Feed> feeds = feedService.getFeeds(startId);
            while (feeds.isEmpty()) {
                try {
                    sleep(1000);
                    feeds = feedService.getFeeds(startId);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            deferredResult.setResult(new ResponseEntity<>(feeds, HttpStatus.OK));
        });
        return deferredResult;
    }

    @GetMapping()
    public ResponseEntity<List<Feed>> getFeeds() {
        return new ResponseEntity<>(feedService.getFeeds(), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Feed> addFeed(@RequestBody Feed feed) {
        return new ResponseEntity<>(feedService.saveFeed(feed), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}/delete")
    public ResponseEntity<Long> deleteFeed(@PathVariable long id) {
        feedService.deleteFeed(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
