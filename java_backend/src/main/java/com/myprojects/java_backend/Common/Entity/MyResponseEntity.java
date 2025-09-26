package com.myprojects.java_backend.Common.Entity;

public class MyResponseEntity<T> {
    public int status;
    public String message;
    public T data;
    public MyResponseEntity(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
