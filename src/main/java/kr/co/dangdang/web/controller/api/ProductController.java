package kr.co.dangdang.web.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.dangdang.web.entity.ProductView;
import kr.co.dangdang.web.service.ProductService;

@RestController("apiProductController")
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	private ProductService service;
	
	//목록을 제공하는 API
	//@ResponseBody
	@GetMapping
	//@CrossOrigin(origins = "http://127.0.0.1:5500/") // 메서드에서 설정
	public List<ProductView> list(
		@RequestParam(name = "p", defaultValue = "1")Integer page,
		@RequestParam(name = "q", required = false)String query,
		@RequestParam(name = "c", required = false)Long categoryId
		) {
		
		List<ProductView> list = service.getViewList(page, categoryId, query);
		System.out.println(query);
		return list;
	}
	
}
