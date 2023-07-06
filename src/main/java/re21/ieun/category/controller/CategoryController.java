package re21.ieun.category.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import re21.ieun.category.dto.CategoryDto;
import re21.ieun.category.entity.Category;
import re21.ieun.category.mapper.CategoryMapper;
import re21.ieun.category.service.CategoryService;
import re21.ieun.member.dto.MemberDto;
import re21.ieun.member.entity.Member;
import re21.ieun.member.mapper.MemberMapper;
import re21.ieun.member.service.MemberService;
import re21.ieun.utils.UriCreator;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/categories")
@Validated
public class CategoryController {

    private final static String CATEGORY_DEFAULT_URL = "/categories";
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    public CategoryController(CategoryService categoryService, CategoryMapper categoryMapper) {
        this.categoryService = categoryService;
        this.categoryMapper = categoryMapper;
    }

    @PostMapping
    public ResponseEntity postCategory(@Valid @RequestBody CategoryDto.Post requestBody) {
        Category category = categoryService.createCategory(categoryMapper.categoryPostDtotoCategory(requestBody));
        URI location = UriCreator.createUri(CATEGORY_DEFAULT_URL, category.getCategoryId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping
    public ResponseEntity getCategories() {
        List<CategoryDto.Response> response = categoryService.findCategories();


        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //카테고리 메뉴를 불러오는거면 카테고리 전체 getmapping

}
