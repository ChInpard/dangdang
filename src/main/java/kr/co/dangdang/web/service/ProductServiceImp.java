package kr.co.dangdang.web.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.dangdang.web.entity.Product;
import kr.co.dangdang.web.entity.ProductView;
import kr.co.dangdang.web.repository.ProductRepository;

@Service
public class ProductServiceImp implements ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	@Override
	public List<ProductView> getViewList(Integer page, Long categoryId, String query) {
		int size = 9;
		int offset = size * (page-1);
		return repository.findViewAll(offset, size, categoryId, query/*page, category, query*/);
		
	}
	
	 @Override
	    public Product getProductById(Long id) {
	        return repository.findById(id);
	    }

	}

