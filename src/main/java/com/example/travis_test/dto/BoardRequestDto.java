package com.example.travis_test.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardRequestDto {
    private Long id;        //글번호
    private String title;
    private String name;
    private String content;
}
