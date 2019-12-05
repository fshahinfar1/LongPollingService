package ir.iust.computer.network.longpolling.service;

import ir.iust.computer.network.longpolling.model.PostLike;
import ir.iust.computer.network.longpolling.repository.LikeRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class LikeService {

    @Resource
    private LikeRepository likeRepository;

    public PostLike addLike(PostLike postLike) {
        return likeRepository.save(postLike);
    }

    public List<PostLike> getLikes(Long postId) {
        return likeRepository.findAllByPost_Id(postId);
    }

    public PostLike getLike(Long id) {
        return likeRepository.findById(id).orElseThrow(NullPointerException::new);
    }

    public void delete(Long id) {
        likeRepository.delete(likeRepository.findById(id).orElseThrow(NullPointerException::new));
    }
}
