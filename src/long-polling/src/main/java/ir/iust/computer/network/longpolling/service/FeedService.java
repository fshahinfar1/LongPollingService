package ir.iust.computer.network.longpolling.service;

import ir.iust.computer.network.longpolling.dto.FeedDto;
import ir.iust.computer.network.longpolling.model.Feed;
import ir.iust.computer.network.longpolling.repository.FeedRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class FeedService {
    @Resource
    private FeedRepository feedRepository;

    public List<FeedDto> getFeeds() {
        List<FeedDto> feeds = new ArrayList<>();
        for (Feed feed : feedRepository.findAll()) {
            feeds.add(convertFeedToDto(feed));
        }
        return feeds;
    }

    public FeedDto saveFeed(FeedDto feedDto){
        feedRepository.save(convertDtoToFeed(feedDto));
        return feedDto;
    }
    private FeedDto convertFeedToDto(Feed feed){
        return FeedDto.build(feed.getTitle(),feed.getDescription(),feed.getCreateDate());
    }

    private Feed convertDtoToFeed(FeedDto feedDto){
        return Feed.build(feedDto.getTitle(),feedDto.getDescription(),feedDto.getCreateDate());
    }
}
