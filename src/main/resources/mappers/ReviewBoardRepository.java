<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="kr.co.dangdang.web.repository.ReviewBoardRepository">

  <select id="findViewAll" resultType="ReviewBoardView">
   select * from ReViewBoard_view
   <where>
      <if test= "categoryId != null">category_id=#{categoryId}</if>
      <if test= "query != null">and name like '%${query}%'</if>
   </where>
   limit #{offset}, #{size}   
  
  </select>
  

  </mapper>