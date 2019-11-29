package ir.iust.computer.network.longpolling.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
public class Feed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;
    @NonNull
    private String title;
    @NonNull
    private String description;
    @NonNull
    private Date createDate;
    public Feed(){}
    private Feed(String title, String description, Date createDate) {
        this.title = title;
        this.description = description;
        this.createDate = createDate;
    }

    public static Feed build(String title, String description, Date createDate) {
        return new Feed(title, description, createDate);
    }
}
