package re21.ieun.sellcategory.service;

import org.springframework.stereotype.Service;
import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;
import re21.ieun.sellcategory.entity.SellCategory;
import re21.ieun.sellcategory.mapper.SellCategoryMapper;
import re21.ieun.sellcategory.repository.SellCategoryRepository;

@Service
public class SellCategoryService {
    private final SellCategoryRepository sellcategoryRepository;
    private final SellCategoryMapper sellcategoryMapper;

    public SellCategoryService(SellCategoryRepository sellcategoryRepository, SellCategoryMapper sellcategoryMapper) {
        this.sellcategoryRepository = sellcategoryRepository;
        this.sellcategoryMapper = sellcategoryMapper;
    }

    public SellCategory createSellCategory(SellCategory sellcategory) {

        return sellcategoryRepository.save(sellcategory);
    }

    public SellCategory findsellcategory(long sellcategoryId) {
        SellCategory findSellCategory = sellcategoryRepository.findById(sellcategoryId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findSellCategory;

//    public List<CategoryDto.Response> findCategories() {
//        List<Category> categories = categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "categoryId"));
//        return categoryMapper.categoryToCategoryResponseDtos(categories);
//    }
    }
}
