# Stage 1: Build the app
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# Copy Maven wrapper and project files
COPY mvnw .
COPY .mvn/ .mvn
COPY pom.xml ./
COPY src ./src

# Give execute permission for mvnw
RUN chmod +x mvnw

# Build the project and skip tests
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the JAR from the builder stage
# Option 1: Use original JAR name
COPY --from=builder /app/target/springbootItemapi.jar springbootItemapi.jar

# Expose the port your app runs on
EXPOSE 5050

# Run the correct JAR file
ENTRYPOINT ["java", "-jar", "springbootItemapi.jar"]
