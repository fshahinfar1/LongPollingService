package ir.iust.computer.network.longpolling.service;

import ir.iust.computer.network.longpolling.model.Post;
import ir.iust.computer.network.longpolling.repository.PostRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class PostService {
    @Resource
    private PostRepository postRepository;

    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }


    public Post getPost(long id) {
        return postRepository.findById(id).orElseThrow(NullPointerException::new);
    }

    public void deletePost(Long id) {
        postRepository.delete(postRepository.findById(id).orElseThrow(NullPointerException::new));
    }
}
