package com.example.travis_test.repository;

import com.example.travis_test.domain.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findAllByOrderByModifiedAtDesc(Pageable pageable);
    //ModifiedAt(수정된 일자로) OrderBy(정렬) Desc(내림차순)

}
