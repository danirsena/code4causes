# Estágio de Build (Maven)
FROM maven:3.9.5-amazoncorretto-21 AS build

WORKDIR /app

COPY pom.xml .
COPY settings.xml .

RUN mvn dependency:go-offline

COPY src ./src

# Executa o build final
RUN mvn clean package -DskipTests

# --------------------------------------------------------------------------

# Estágio de Runtime (Produção)
# CORREÇÃO AQUI: Troque '21-jre-alpine-full' por '21-jre-alpine'
FROM amazoncorretto:21-jre-alpine

# Define a porta
EXPOSE 8080

WORKDIR /app

# Copia o JAR do estágio de Build
COPY --from=build /app/target/*.jar app.jar

# Comando que será executado
ENTRYPOINT ["java", "-jar", "app.jar"]