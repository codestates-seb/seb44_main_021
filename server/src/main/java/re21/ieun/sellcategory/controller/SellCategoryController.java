package re21.ieun.sellcategory.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import re21.ieun.sellcategory.dto.SellCategoryDto;
import re21.ieun.sellcategory.entity.SellCategory;
import re21.ieun.sellcategory.mapper.SellCategoryMapper;
import re21.ieun.sellcategory.service.SellCategoryService;
import re21.ieun.utils.UriCreator;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/sellcategories")
@Validated
public class SellCategoryController {

    private final static String CATEGORY_DEFAULT_URL = "/sellcategories";
    private final SellCategoryService sellcategoryService;
    private final SellCategoryMapper sellcategoryMapper;

    public SellCategoryController(SellCategoryService sellcategoryService, SellCategoryMapper sellcategoryMapper) {
        this.sellcategoryService = sellcategoryService;
        this.sellcategoryMapper = sellcategoryMapper;
    }

    @PostMapping
    public ResponseEntity postCategory(@Valid @RequestBody SellCategoryDto.Post requestBody) {
        SellCategory sellcategory = sellcategoryService.createSellCategory(sellcategoryMapper.sellcategoryPostDtotoSellCategory(requestBody));
        URI location = UriCreator.createUri(CATEGORY_DEFAULT_URL, sellcategory.getSellCategoryId());

        return ResponseEntity.created(location).build();
    }

//    @GetMapping
//    public ResponseEntity getCategories() {
//        List<CategoryDto.Response> response = categoryService.findCategories();
//
//
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    //카테고리 메뉴를 불러오는거면 카테고리 전체 getmapping

}
