package ir.iust.computer.network.longpolling.service;

import ir.iust.computer.network.longpolling.model.Comment;
import ir.iust.computer.network.longpolling.repository.CommentRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class CommentService {

    @Resource
    private CommentRepository commentRepository;

    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<Comment> getComments(Long postId) {
        return commentRepository.findAllByPost_Id(postId);
    }

    public Comment getComment(Long id) {
        return commentRepository.findById(id).orElseThrow(NullPointerException::new);
    }

    public void delete(Long id) {
        commentRepository.delete(commentRepository.findById(id).orElseThrow(NullPointerException::new));
    }

}
