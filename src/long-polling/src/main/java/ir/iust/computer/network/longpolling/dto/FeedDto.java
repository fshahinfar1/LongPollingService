package ir.iust.computer.network.longpolling.dto;


import lombok.Data;
import lombok.NonNull;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@Component
public class FeedDto {
    @NonNull
    private String title;
    @NonNull
    private String description;
    @NonNull
    private Date createDate;

    public FeedDto() {
    }

    private FeedDto(String title, String description, Date createDate) {
        this.title = title;
        this.description = description;
        this.createDate = createDate;
    }

    public static FeedDto build(String title, String description, Date createDate) {
        return new FeedDto(title, description, createDate);
    }
}
