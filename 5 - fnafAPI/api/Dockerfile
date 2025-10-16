# Estágio de Build (Maven)
# Usamos uma imagem completa do JDK 21 para compilar o código
FROM maven:3.9.5-amazoncorretto-21 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração do Maven para baixar as dependências primeiro
# Isso aproveita o cache do Docker se apenas o código mudar
COPY pom.xml .
COPY settings.xml .

# Baixa as dependências. Se o pom.xml não mudar, esta etapa é cacheada.
RUN mvn dependency:go-offline

# Copia o restante do código-fonte (Kotlin)
COPY src ./src

# Executa o build final, gerando o JAR executável na pasta target
RUN mvn clean package -DskipTests

# --------------------------------------------------------------------------

# Estágio de Runtime (Produção)
# Usamos uma imagem JRE menor e mais segura para rodar a aplicação
FROM amazoncorretto:21-jre-alpine-full

# Define a porta que o container irá expor (deve ser a mesma do server.port)
EXPOSE 8080

# Define o diretório de trabalho
WORKDIR /app

# Copia o JAR do estágio de Build para o estágio de Runtime
# O nome do JAR é o padrão do Maven para um projeto Spring Boot
COPY --from=build /app/target/*.jar app.jar

# Comando que será executado quando o container iniciar
# Roda a aplicação Java a partir do JAR
ENTRYPOINT ["java", "-jar", "app.jar"]