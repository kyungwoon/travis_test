package com.example.travis_test.service;

import com.example.travis_test.domain.Board;
import com.example.travis_test.dto.BoardRequestDto;
import com.example.travis_test.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class BoardService {
    private final BoardRepository boardRepository;

    @Transactional // 실제 DB에 반영이 되어야 한다느
    public Long update(Long id, BoardRequestDto requestDto) {
        Board board = boardRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
        board.update(requestDto);
        return board.getId();
    }
}

