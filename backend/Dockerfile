FROM gradle:8.5-jdk17 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
# 테스트 코드는 제외하고 빌드 (속도 향상)
RUN gradle build --no-daemon -x test

# 실행 단계: 빌드된 jar 파일만 복사해서 실행
FROM eclipse-temurin:17-jdk-alpine
EXPOSE 8080
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]