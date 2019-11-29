package ir.iust.computer.network.longpolling.controll;

import ir.iust.computer.network.longpolling.model.Comment;
import ir.iust.computer.network.longpolling.model.Feed;
import ir.iust.computer.network.longpolling.service.CommentService;
import ir.iust.computer.network.longpolling.service.FeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import static java.lang.Thread.sleep;

@RestController
@RequestMapping(produces = "application/json")
public class CommentController extends AsyncController<Comment> {
    private final FeedService feedService;

    private final CommentService commentService;

    @Autowired
    public CommentController(FeedService feedService, CommentService commentService) {
        this.feedService = feedService;
        this.commentService = commentService;
    }

    @PostMapping(path = "feeds/{feedId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable Long feedId, @RequestBody Comment comment) {
        comment.setFeed(feedService.getFeed(feedId));
        return new ResponseEntity<>(commentService.addComment(comment), HttpStatus.CREATED);
    }

    @GetMapping(path = "feeds/{feedId}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long feedId) {
        return new ResponseEntity<>(commentService.getComments(feedId), HttpStatus.OK);
    }

    @GetMapping(path = "feeds/{feedId}/comments/async/{startId}")
    public DeferredResult<ResponseEntity<List<Comment>>> getCommentsAsync(@PathVariable Long feedId, @PathVariable Long startId) {
        DeferredResult<ResponseEntity<List<Comment>>> deferredResult = createDifferResult();
        CompletableFuture.runAsync(() -> {
            List<Comment> comments = commentService.getComments(feedId,startId);
            while (comments.isEmpty()) {
                try {
                    sleep(1000);
                    comments = commentService.getComments(feedId,startId);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            deferredResult.setResult(new ResponseEntity<>(comments, HttpStatus.OK));
        });
        return deferredResult;
    }


    @DeleteMapping(path = "feeds/{feedId}/comments/{id}")
    public ResponseEntity<Long> deleteComment(@PathVariable Long feedId, @PathVariable Long id) {
        commentService.delete(feedId, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "feeds/{feedId}/comments/{id}")
    public ResponseEntity<Comment> getComment(@PathVariable Long feedId, @PathVariable Long id) {
        return new ResponseEntity<>(commentService.getComment(feedId, id), HttpStatus.OK);
    }
}
