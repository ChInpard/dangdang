package kr.co.dangdang.web.service;

import java.util.List;

import kr.co.dangdang.web.entity.Product;
import kr.co.dangdang.web.entity.ProductView;

public interface ProductService {


	List<ProductView> getViewList(Integer page, Long categoryId, String query);
	
	Product getProductById(Long id);

}
