package ir.iust.computer.network.longpolling.service;

import ir.iust.computer.network.longpolling.model.Feed;
import ir.iust.computer.network.longpolling.repository.FeedRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class FeedService {
    @Resource
    private FeedRepository feedRepository;

    public List<Feed> getFeeds() {
        return feedRepository.findAll();
    }

    public Feed saveFeed(Feed feed) {
        return feedRepository.save(feed);
    }


    public Feed getFeed(long id) {
        return feedRepository.findById(id).orElseThrow(NullPointerException::new);
    }

    public void deleteFeed(Long id) {
        feedRepository.delete(feedRepository.findById(id).orElseThrow(NullPointerException::new));
    }

    public List<Feed> getFeeds(long startId) {
        return feedRepository.findAllByIdGreaterThanEqual(startId);
    }
}
