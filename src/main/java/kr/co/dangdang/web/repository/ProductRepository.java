package kr.co.dangdang.web.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.dangdang.web.entity.Product;
import kr.co.dangdang.web.entity.ProductView;

@Mapper
public interface ProductRepository {
	
//	List<Product> findProductList(String string);

	List<ProductView> findViewAll(int offset, int size, Long categoryId, String query);

	Product findById(Long id);

	List<ProductView> searchWithLikeStatus(Map<String, Object> params);

	List<Product> findByQuery(String query);
	
	}
	

