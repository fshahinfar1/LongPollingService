package ir.iust.computer.network.longpolling.controll;

import ir.iust.computer.network.longpolling.model.DataType;
import ir.iust.computer.network.longpolling.model.Event;
import ir.iust.computer.network.longpolling.model.EventType;
import ir.iust.computer.network.longpolling.model.Post;
import ir.iust.computer.network.longpolling.service.EventService;
import ir.iust.computer.network.longpolling.service.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping(path = "/posts", produces = "application/json")
public class PostController extends BaseController {
    private final PostService postService;
    private final EventService eventService;
    Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    public PostController(PostService postService, EventService eventService) {
        this.postService = postService;
        this.eventService = eventService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Post> getPost(@PathVariable long id) {
        return new ResponseEntity<>(postService.getPost(id), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Post>> getPosts() {
        return new ResponseEntity<>(postService.getPosts(), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Post> addPost(@RequestBody Post post) {
        Post savedPost = postService.savePost(post);
        Event event = createEvent(EventType.ADD, DataType.POST, savedPost.getId());
        event.setPostId(savedPost.getId());
        eventService.saveEvent(event);
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}/delete")
    public ResponseEntity<Long> deletePost(@PathVariable long id) {
        Event event = createEvent(EventType.DELETE, DataType.POST, id);
        event.setPostId(id);
        postService.deletePost(id);
        eventService.saveEvent(event);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Post> UpdatePost(@RequestBody Post newPost, @PathVariable Long id) {
        Post post = postService.getPost(id);
        post.setDescription(newPost.getDescription());
        post.setTitle(newPost.getTitle());
        Post savedPost = postService.savePost(post);
        eventService.saveEvent(createEvent(EventType.UPDATE, DataType.POST, savedPost.getId()));
        return new ResponseEntity<>(savedPost, HttpStatus.ACCEPTED);
    }
}
