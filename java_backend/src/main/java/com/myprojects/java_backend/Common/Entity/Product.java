package com.myprojects.java_backend.Common.Entity;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
@Getter
@Setter
public class Product {
    @Id
    private String id;

    private CommonDetails commonDetails;
    private Highlights highlights;
    private AdditionalInfo additionalInfo;
}
