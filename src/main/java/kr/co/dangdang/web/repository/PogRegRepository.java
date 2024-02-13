package kr.co.dangdang.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.dangdang.web.entity.ReViewBoard;
import kr.co.dangdang.web.entity.PostRegView;

@Mapper
public interface PogRegRepository {
     List<PostRegView> findViewAll(int offset, int size, Long categoryId, String query);
    int savePost(ReViewBoard reviewBoard);
}
