package com.myprojects.java_backend.Common.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "demo")
public class DemoEntity {

    @Id
    private int id;
    private String name;
    private int age;
    private String city ;
}
