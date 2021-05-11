package com.sjsu.ses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("api/v1/email")
public class AWSSesController {

    private AWSSesService awsSesService;

    @Autowired
    public AWSSesController(AWSSesService awsSesService) {
        this.awsSesService = awsSesService;
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> sendEmail(@Valid @RequestBody AWSSesDTO sesDTO) {
        try {
            awsSesService.sendEmail(sesDTO.getFromAddress(), sesDTO.getToAddress(), sesDTO.getHtmlBody(),
                    sesDTO.getTextBody(), sesDTO.getSubject());
            return ResponseEntity.ok("Successfully Sent Email");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error occurred ! Unable to send Email " + e);
        }
    }
}