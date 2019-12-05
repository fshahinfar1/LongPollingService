package ir.iust.computer.network.longpolling.repository;

import ir.iust.computer.network.longpolling.model.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<PostLike, Long> {
    List<PostLike> findAllByPost_Id(Long postId);
}
