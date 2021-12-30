FROM maven:3.6.1-jdk-8-slim AS build
RUN mkdir -p /workspace
WORKDIR /workspace
COPY pom.xml /workspace
COPY src /workspace/src
RUN mvn -f pom.xml clean install -DskipTests=true

FROM openjdk:8-alpine
LABEL maintainer="pavitra@fanatiqa.com"
COPY --from=build /workspace/target/fanatiqa-backend.jar fanatiqa-backend.jar
EXPOSE 8085
ENTRYPOINT ["java","-jar","fanatiqa-backend.jar"]
