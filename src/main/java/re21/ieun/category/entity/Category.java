package re21.ieun.category.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.member.entity.Member;
import re21.ieun.sell.entity.Sell;
import re21.ieun.upcycling.entity.Upcycling;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @Column(nullable = false)
    private String categoryName;

    //
//    @OneToMany(mappedBy = "category")
//    private List<Sell> sells;

}
