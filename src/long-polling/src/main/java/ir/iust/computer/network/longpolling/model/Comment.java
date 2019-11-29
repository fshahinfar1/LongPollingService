package ir.iust.computer.network.longpolling.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NonNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String text;
    @NonNull
    private Date createDate;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Feed.class, optional = false)
    @JoinColumn(name = "feed_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Feed feed;

    public Comment() {
    }

    private Comment(String text, Date createDate) {
        this.text = text;
        this.createDate = createDate;
    }

    public static Comment build(String text, Date createDate) {
        return new Comment(text, createDate);
    }
}
