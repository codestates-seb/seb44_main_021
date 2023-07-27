package re21.ieun.category.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import re21.ieun.category.dto.CategoryDto;
import re21.ieun.category.entity.Category;
import re21.ieun.category.mapper.CategoryMapper;
import re21.ieun.category.repository.CategoryRepository;
import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;
import re21.ieun.member.entity.Member;

import java.util.List;


@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    public Category createCategory(Category category) {

        return categoryRepository.save(category);
    }

    public Category findcategory(long categoryId) {
        Category findCategory = categoryRepository.findById(categoryId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findCategory;

//    public List<CategoryDto.Response> findCategories() {
//        List<Category> categories = categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "categoryId"));
//        return categoryMapper.categoryToCategoryResponseDtos(categories);
//    }
    }
}
