# ETAPA 1: Build del JAR con Maven
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

# Copiam primero el pom.xml
# Si el pom no cambia, Docker no re-descarga las dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia el código fuente y construimos
COPY src ./src
RUN mvn clean package -DskipTests -B

# ETAPA 2: Imagen final solo con el JAR
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copia solo el JAR generado en la etapa anterior
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]