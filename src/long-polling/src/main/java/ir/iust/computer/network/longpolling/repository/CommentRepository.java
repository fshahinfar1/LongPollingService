package ir.iust.computer.network.longpolling.repository;

import ir.iust.computer.network.longpolling.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByFeed_Id(Long feedId);

    Optional<Comment> findByIdAndFeed_Id(Long id, Long feedId);
}
