package ir.iust.computer.network.longpolling.controll;

import ir.iust.computer.network.longpolling.model.Comment;
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

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping(produces = "application/json")
public class CommentController extends BaseController {
    private final PostService postService;
    private final CommentService commentService;
    private final EventService eventService;

    @Autowired
    public CommentController(PostService postService, CommentService commentService, EventService eventService) {
        this.postService = postService;
        this.commentService = commentService;
        this.eventService = eventService;
    }

    @PostMapping(path = "posts/{postId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable Long postId, @RequestBody Comment comment) {
        Comment savedComment;
        comment.setPost(postService.getPost(postId));
        savedComment = commentService.addComment(comment);
        Event event = createEvent(EventType.ADD, DataType.COMMENT, savedComment.getId());
        event.setPostId(postId);
        eventService.saveEvent(event);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    @GetMapping(path = "posts/{postId}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        return new ResponseEntity<>(commentService.getComments(postId), HttpStatus.OK);
    }

    @DeleteMapping(path = "comments/{id}")
    public ResponseEntity<Long> deleteComment(@PathVariable Long id) {
        Event event = createEvent(EventType.DELETE, DataType.COMMENT, id);
        event.setPostId(commentService.getComment(id).getPost().getId());
        commentService.delete(id);
        eventService.saveEvent(event);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "comments/{id}")
    public ResponseEntity<Comment> getComment(@PathVariable Long id) {
        return new ResponseEntity<>(commentService.getComment(id), HttpStatus.OK);
    }

}
