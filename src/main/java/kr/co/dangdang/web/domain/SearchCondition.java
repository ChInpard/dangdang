//package kr.co.dangdang.domain;
//
//import org.springframework.web.util.UriComponentsBuilder;
//
//public class SearchCondition {
//	private Integer page = 1;
//    private Integer pageSize = 10;
//    private String  option = "";
//    private String  keyword = "";
////    private Integer offset = 0;
//
//    public SearchCondition(){}
//
//    public SearchCondition(Integer page, Integer pageSize) {
//        this(page, pageSize, "", "");
//    }
//
//    public SearchCondition(Integer page, Integer pageSize, String option, String keyword) {
//        this.page = page;
//        this.pageSize = pageSize;
//        this.option = option;
//        this.keyword = keyword;
//    }
//
//    public Integer getPage() {
//        return page;
//    }
//
//    public void setPage(Integer page) {
//        this.page = page;
//    }
//
//    public Integer getPageSize() {
//        return pageSize;
//    }
//
//    public void setPageSize(Integer pageSize) {
//        this.pageSize = pageSize;
//    }
//
//    public String getOption() {
//        return option;
//    }
//
//    public void setOption(String option) {
//        this.option = option;
//    }
//
//    public String getKeyword() {
//        return keyword;
//    }
//
//    public void setKeyword(String keyword) {
//        this.keyword = keyword;
//    }
//
//    public Integer getOffset() {
//        return (page-1)*pageSize;
//    }  //offset= (page-1)*pageSize
//
//    public String getQueryString(Integer page) {
//        // ?page=1&pageSize=10&option=T&keyword="title" 생성하는 메서드
//        return UriComponentsBuilder.newInstance()
//                .queryParam("page", page)
//                .queryParam("pageSize", pageSize)
//                .queryParam("option",   option)
//                .queryParam("keyword",  keyword)
//                .build().toString();
//    }
//
//    public String getQueryString() {
//        // ?page=1&pageSize=10&option=T&keyword="title" 생성하는 메서드
//        return getQueryString(page);
//    }
//
//    @Override
//    public String toString() {
//        return "SearchCondition{" +
//                "page=" + page +
//                ", pageSize=" + pageSize +
//                ", offset=" + getOffset() +
//                ", option='" + option + '\'' +
//                ", keyword='" + keyword + '\'' +
//                '}';
//    }
//}

