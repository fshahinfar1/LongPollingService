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

    public List<Comment> getComments(Long feedId) {
        return commentRepository.findAllByFeed_Id(feedId);
    }

    public Comment getComment(Long feedId, Long id) {
        return commentRepository.findByIdAndFeed_Id(id, feedId).orElseThrow(NullPointerException::new);
    }

    public void delete(Long feedId, Long id) {
        commentRepository.delete(commentRepository.findByIdAndFeed_Id(id, feedId).orElseThrow(NullPointerException::new));
    }

    public List<Comment> getComments(Long feedId, Long startId) {
        return commentRepository.findAllByIdGreaterThanEqualAndFeed_Id(startId, feedId);
    }
}
