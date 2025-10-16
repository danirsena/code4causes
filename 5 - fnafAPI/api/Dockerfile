# ---------------------------
# Estágio 1: Build (Maven + JDK)
# ---------------------------
FROM maven:3.9.5-eclipse-temurin-21 AS build

WORKDIR /app

# Copia o pom.xml e o settings.xml (opcional)
COPY pom.xml .

# Baixa dependências para cache
RUN mvn dependency:go-offline

# Copia o restante do código-fonte
COPY src ./src

# Compila o projeto (sem testes)
RUN mvn clean package -DskipTests

# ---------------------------
# Estágio 2: Runtime (JRE leve)
# ---------------------------
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app
EXPOSE 8080

# Copia o jar gerado no build
COPY --from=build /app/target/*.jar app.jar

# Comando de inicialização
ENTRYPOINT ["java", "-jar", "app.jar"]