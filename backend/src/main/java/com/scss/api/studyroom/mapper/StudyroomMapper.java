package com.scss.api.studyroom.mapper;

import com.scss.api.studyroom.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StudyroomMapper {
    public void createStudyroom(StudyroomDto studyroomDto);

    public void insertLanguageId(StudyroomLanguageDto studyroomLanguageDto);

    public void insertAlgoId(StudyroomAlgoDto studyroomAlgoDto);

    public int selectProblemCount(int algoId);

    public void insertProblemId(StudyroomProblemDto studyroomProblemDto);

    public int selectProblemId(String path);

    public void insertMemberId(StudyroomMemberDto studyroomMemberDto);

    public List<StudyroomDto> selectAllStudyroom();

    public int checkStudyroomPassword(StudyroomDto studyroomDto);

    public List<StudyroomDto> searchStudyroom(StudyroomDto studyroomDto);
}
