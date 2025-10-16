# Estágio de Build (Maven/JDK)
# Usamos a imagem oficial do Maven com o JDK 21
FROM maven:3.9.5-jdk-21 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração do Maven para cache
COPY pom.xml .
# O settings.xml geralmente é opcional, mas mantemos
COPY settings.xml .

# Baixa as dependências.
RUN mvn dependency:go-offline

# Copia o restante do código-fonte (Kotlin)
COPY src ./src

# Executa o build final, gerando o JAR executável na pasta target
RUN mvn clean package -DskipTests

# --------------------------------------------------------------------------

# Estágio de Runtime (Produção - JRE)
# Usamos o Eclipse Temurin JRE 21 (mais popular e confiável) baseado em Alpine (pequeno)
FROM eclipse-temurin:21-jre-alpine

# Define a porta
EXPOSE 8080

# Define o diretório de trabalho
WORKDIR /app

# Copia o JAR do estágio de Build para o estágio de Runtime
COPY --from=build /app/target/*.jar app.jar

# Comando que será executado quando o container iniciar
ENTRYPOINT ["java", "-jar", "app.jar"]