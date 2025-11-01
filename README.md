<img width="1060" height="546" alt="Frame 111" src="https://github.com/user-attachments/assets/6617e422-5b51-4eea-84d5-e567056b8f18" />

# Green Team

Привет! Мы команда **Зелёные**. И это наш проект по оценке 360 для корпораций в рамках хакатона "Войти в IT".

Миронова Ольга - PO

Припеченков Илья - BE

Сикорский Игорь -  Design

Хамикоева Ольга - BA

## Описание решения

Наше решение представляет собой веб-версию с ролевой моделью. Сотрудник в своем кабинете может поставить себе цели и привязать их к целям руководителя, пройти самооценку, оценить коллег и ознакомиться с рекомендациями и динамикой оценки. Руководитель в своём личном кабинете может поставить цели на команду, оценить задачи сотрудника и оценить потенциал сотрудника.


Отличительной особенностью нашего решения является машинное обучение и искусственный интеллект - по результатам оценки 360 руководителю будет выдан список рекомендованных курсов для сотрудника, а также текстовая рекомендация с подробным планом развития подчиненного. Большому боссу остается отредактировать оценку из своего виденья и утвердить ее - после чего она отразится в кабинете сотрудника.

## Решение

> [!WARNING]
> _Перед просмотром сайта рекомендуем ознакомиться с демо функционала в артефактах_

Сайт: http://194.87.30.33:3000/ (заходить только с компьютера)

Данные для входа: 

1. Руководитель:

   boss/boss

2. Сотрудники:

   ilya/ilya

   igor/igor

   olga.m/olga

   olga.h/olga

## Артефакты
1. Презентация:

_Здесь вы можете ознакомиться с бизнес представлением нашего решения_

2. Конкурентный анализ: https://miro.com/app/board/uXjVJ59qo0E=/?moveToWidget=3458764644826332127&cot=14 

_Любому продукту важно понимать свою оценку на рынке, а для этого нужно сравнить себя с действующими игроками_

3. Демо функционала:

_Рассказываем и показываем, как работает наш МВП_

4. Макеты: https://www.figma.com/design/IJ9Wq1w28BLGnedFuLn181/%D0%92%D0%BE%D0%B9%D1%82%D0%B8-%D0%B2-%D0%98%D0%A2?node-id=171-2025&t=yWgLZr7nsfwBnP5b-1

_Мы стремимся к идеальному решению, но в короткие сроки выпускаем МВП. С целевой картиной можно ознакомиться в макетах._

5. Прототип: https://www.figma.com/proto/IJ9Wq1w28BLGnedFuLn181/%D0%92%D0%BE%D0%B9%D1%82%D0%B8-%D0%B2-%D0%98%D0%A2?page-id=0%3A1&node-id=176-2264&viewport=-128%2C-1194%2C0.21&t=yTmGhh0AfmdGvBpV-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=28%3A197

_Когда-то будет так!_

7. Демо прототипа:

_Рассказываем и показываем, как в будущем должен будет выглядеть проект_

8. Рабочее пространство команды: https://miro.com/welcomeonboard/aTZLQUJPL0diRjA0dFpMZ1pzMU9WQlRsb01PS3VsZmJqZUg3YjhXcmhDZlUzRE56STVKODZaQ3lJNkZCeklzNG9mTjlrTkt2U2NDZTFob0o2b1BkK24wSkdtR0Zvb0gyT3Y5YTBSQVNrL3hFdTdQbitLcmxUTjAzZzQ4YXR6eEhzVXVvMm53MW9OWFg5bkJoVXZxdFhRPT0hdjE=?share_link_id=688751937884

_Здесь всё: как мы мыслили, как мы работали и как шутили! Тут же вы найдете бизнес-требования, схемы данных и другую важную документацию_

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Quarkus](https://img.shields.io/badge/quarkus-%234794EB.svg?style=for-the-badge&logo=quarkus&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Google Gemini](https://img.shields.io/badge/google%20gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white)
![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)
![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Google Colab](https://img.shields.io/badge/Google%20Colab-%23F9A825.svg?style=for-the-badge&logo=googlecolab&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
+Keycloak

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

**For backend**
1. Собрать jar
2. `mvn clean package -Dquarkus.package.type=uber-jar`
3. Запустить:
   `java -jar target/code-with-quarkus-1.0.0.jar`
   
