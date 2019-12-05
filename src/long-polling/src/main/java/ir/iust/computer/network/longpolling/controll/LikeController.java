package ir.iust.computer.network.longpolling.controll;


import ir.iust.computer.network.longpolling.model.DataType;
import ir.iust.computer.network.longpolling.model.Event;
import ir.iust.computer.network.longpolling.model.EventType;
import ir.iust.computer.network.longpolling.model.PostLike;
import ir.iust.computer.network.longpolling.service.EventService;
import ir.iust.computer.network.longpolling.service.LikeService;
import ir.iust.computer.network.longpolling.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(produces = "application/json")
public class LikeController extends BaseController {

    private final PostService postService;
    private final LikeService likeService;
    private final EventService eventService;

    @Autowired
    public LikeController(PostService postService, LikeService likeService, EventService eventService) {
        this.postService = postService;
        this.likeService = likeService;
        this.eventService = eventService;
    }

    @PostMapping(path = "posts/{postId}/likes")
    public ResponseEntity<PostLike> addLike(@PathVariable Long postId, @RequestBody PostLike postLike) {
        PostLike savedPostLike;
        postLike.setPost(postService.getPost(postId));
        savedPostLike = likeService.addLike(postLike);
        Event event = createEvent(EventType.ADD, DataType.LIKE, savedPostLike.getId());
        event.setPostId(postId);
        eventService.saveEvent(event);
        return new ResponseEntity<>(savedPostLike, HttpStatus.CREATED);
    }

    @GetMapping(path = "posts/{postId}/likes")
    public ResponseEntity<List<PostLike>> getLikes(@PathVariable Long postId) {
        return new ResponseEntity<>(likeService.getLikes(postId), HttpStatus.OK);
    }

    @DeleteMapping(path = "likes/{id}")
    public ResponseEntity<Long> deleteLike(@PathVariable Long id) {
        Event event = createEvent(EventType.DELETE, DataType.LIKE, id);
        event.setPostId(likeService.getLike(id).getPost().getId());
        likeService.delete(id);
        eventService.saveEvent(event);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "likes/{id}")
    public ResponseEntity<PostLike> getLike(@PathVariable Long id) {
        return new ResponseEntity<>(likeService.getLike(id), HttpStatus.OK);
    }
}
