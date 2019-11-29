package ir.iust.computer.network.longpolling.repository;

import ir.iust.computer.network.longpolling.model.Feed;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FeedRepository extends JpaRepository<Feed, Long> {
}
