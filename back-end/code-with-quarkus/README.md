# back-end

Бэк-енд приложения оценка 360 

## Запуск для разработки

You can run your application in dev mode that enables live coding using:

```shell script
./mvnw quarkus:dev
```

## Локальная сборка и запуск


```shell script
./mvnw package -Dquarkus.package.jar.type=uber-jar
```
```shell script
java -jar target/code-with-quarkus-1.0.0-runner.jar
```