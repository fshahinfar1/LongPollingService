package ir.iust.computer.network.longpolling.repository;

import ir.iust.computer.network.longpolling.model.Feed;
import org.springframework.data.repository.CrudRepository;

public interface FeedRepository extends CrudRepository<Feed, Long> {
}
