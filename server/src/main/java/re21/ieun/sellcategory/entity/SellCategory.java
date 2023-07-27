package re21.ieun.sellcategory.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class SellCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sellCategoryId;

    @Column(nullable = false)
    private String sellCategoryName;

    //
//    @OneToMany(mappedBy = "category")
//    private List<Sell> sells;

}
