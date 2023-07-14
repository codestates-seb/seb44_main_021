package re21.ieun.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@RestController
public class imageController {

    @Autowired
    private S3Client s3Client;

    private static final String BUCKET_NAME = "s3forimage";

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            // 파일이 없는 경우 처리
            return "파일이 없습니다.";
        }

        String objectKey = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // S3에 업로드
            s3Client.putObject(PutObjectRequest.builder()
                    .bucket(BUCKET_NAME)
                    .key(objectKey)
                    .build(), RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            String objectUrl = "https://s3.amazonaws.com/" + BUCKET_NAME + "/" + objectKey;
            System.out.println("Object URL: " + objectUrl);

            // 업로드 완료 후 추가 처리
            return objectUrl;
        } catch (IOException e) {
            // 업로드 중 에러 발생 시 처리
            return "파일 업로드 중 에러가 발생했습니다.";
        }
    }
}