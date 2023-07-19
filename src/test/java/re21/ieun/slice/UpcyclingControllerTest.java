package re21.ieun.slice;

import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import re21.ieun.upcycling.dto.UpcyclingPostDto;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
/*
@SpringBootTest
@AutoConfigureMockMvc
public class UpcyclingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    // Post Test
    @Test
    void postUpcyclingTest() throws Exception {

        // given, 테스트용 request body 생성
        UpcyclingPostDto post = new UpcyclingPostDto();
        post.setMemberId(1L);
        post.setCategoryId(2L);
        post.setTitle("Test Upcycling Title");
        post.setContent("Test Upcycling Content");
        post.setTotalQuantity(100);
        post.setThumbNailImage("test_thumbnail.jpg");
        post.setDeadline(LocalDate.of(2023, 12, 31));
        post.setViewCount(0L);

        String content = gson.toJson(post);


        // when, MockMvc 객체로 테스트 대상 Controller 호출
        ResultActions actions = mockMvc.perform(
                post("/upcyclings")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );


        // then, Controller 핸들러 메서드에서 응답으로 수신한 HTTP Status 및 response body 검증
        // andExpect() 메서드를 통해 파라미터로 입력한 매처(Matcher)로 예상되는 기대 결과를 검증
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/upcyclings"))));

    }
}
 */