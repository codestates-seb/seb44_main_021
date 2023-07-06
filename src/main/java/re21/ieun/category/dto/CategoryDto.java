package re21.ieun.category.dto;

import lombok.*;
import re21.ieun.upcycling.entity.Upcycling;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class CategoryDto {

    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class Post {
        private String categoryName;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        @NotBlank
        private String categoryName;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long categoryId;
        private String categoryName;
        private List<Upcycling> upcyclings;
    }

}
