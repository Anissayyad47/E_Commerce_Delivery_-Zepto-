# Use an OpenJDK base image
FROM openjdk:17-jdk-slim

# Set a working directory
WORKDIR /app

# Copy the Spring Boot jar into the container
COPY target/java_backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java","-jar","app.jar"]
