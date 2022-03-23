package com.example.travis_test.controller;

import com.example.boards.domain.Board;
import com.example.boards.dto.BoardRequestDto;
import com.example.boards.repository.BoardRepository;
import com.example.boards.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardRepository boardRepository;
    private final BoardService boardService;

    @PostMapping("/api/boards") // 생성
    public Board createBoard(@RequestBody BoardRequestDto requestDto) {
        log.info("생성");
        Board board = new Board(requestDto);
        return boardRepository.save(board);


    }

    //게시물 전체 조회
    @GetMapping("/api/boards")
    public Page<Board> getPosts(@RequestParam(value = "title", required = false, defaultValue = "") String title,
                                @RequestParam(value = "name", required = false, defaultValue = "") String name,
                                @RequestParam(value = "content", required = false, defaultValue = "") String content,
                                @RequestParam(value = "page", required = false, defaultValue = "0") String page) {
        Page<Board> result;
        int currnt_page = Integer.parseInt(page);
        PageRequest boardRequest = PageRequest.of(currnt_page, 10);
        return result = boardRepository.findAllByOrderByModifiedAtDesc(boardRequest);
    }

    //게시물 상세내용 조회
    @GetMapping("/api/boards/{id}")
    public Board getPost(@PathVariable Long id) {
        Board board = boardRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
        return board;
    }

    //게시물 수정
    @PutMapping("/api/boards/{id}")
    public Long updateBoard(@PathVariable Long id, @RequestBody BoardRequestDto requestDto) {
        return boardService.update(id, requestDto);
    }

    //게시물 삭제
    @DeleteMapping("/api/boards/{id}")
    public Long deleteMemo(@PathVariable Long id) {
        boardRepository.deleteById(id);
        return id;
    }
}
