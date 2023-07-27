package re21.ieun.sellcategory.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import re21.ieun.upcycling.entity.Upcycling;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class SellCategoryDto {

    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class Post {
        private String sellCategoryName;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        @NotBlank
        private String sellCategoryName;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long sellCategoryId;
        private String sellCategoryName;
//        private List<Upcycling> upcyclings;
    }

}