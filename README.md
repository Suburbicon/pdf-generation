# Yeanot

<img src="./Yeanot.svg" width="200" />

> **Ye**t **A**nother **Not**ification (Builder)
> https://en.wikipedia.org/wiki/Yet_another

## Table of contents

- [Description](#description)
- [Installation](#installation)
- [References](#references)
- [Troubleshooting](#troubleshooting)
- [Deploy](#deploy)
- [Sentry](#sentry)

## Description

Сервис для рендеринга HTML писем и PDF (`react-pdf`) маршрут квитанций.

Сервис получает запрос с данными в виде `JSON` и возвращает PDF файл или HTML письма

**Что этот сервис не делает?**

- Не отправляет письма и PDF файлы
- Не сохраняет PDF на S3

### Example

> Ссылку можно декодировать через [PlantUML online server](https://www.plantuml.com/plantuml/uml/)
>
> - [ссылка на картинку](//www.plantuml.com/plantuml/png/ZLBBZXCn4BpxAqhQIp9AoF96EQ1T7Yk1LYBQ81x7phYIiPWPpzezm-O7-00-aI_1LYP1h3XmiThjgkfogI-YIj2-gKthbV030zxUAKChjG6AudWf2apuO8V0agxJ-QPtjMMO6WFCSUsYieLw1Dbid3QtuC1MOtx55RMiu4F2mueA9h7otGpMbJh3zqgKGvRAs5LW9u7eP5zxiOQjHRPcpD49vlEN-4f9tILkUDipwi5RKQm-h3zY8PrR30yNdTqkr9NVg8kGP1YAOcgaL3U8SbGuV3kuNQK6-2Iri_anbXKRmMJZxNw6YfBOSVh7ZDIAi-rJUIQ4QuTC6pa6etAsUOfoYIVdvqky4djqR5X7ukp5SqlPu7yK7cM5jGPAWzMRAxpshRBDjl_wGmxn_VeBVltuYNVjWPnfVQbzu0YuOVJrmDJVruptcfSnKYCcspGWpk0QsJ5EHz2rx7slKDuTXtqEqg7Bc9DE3ZjxDC0fibGOo_ln_tljvbYh3qHWx6k5UgmVvrC6xom2Eueo5pdASSakLQMiyjICP2DkL4g3n-l9oqMgqix_1W00)

![Пример рендеринга PDF](./docs/pdf-render-sequence.png)

## Installation

Если вам в этой жизни повезло и у вас есть нода, то для разработки достаточно

1. Иметь актуальную версию **Node.JS**. Смотреть в `package.json#engines.node`
2. Установить зависимости `npm i`
3. Запустить дев сервер `npm run dev`

А если вам не повезло, но вы хотите "просто посмотреть"

1. Идем за `NPM_TOKEN` [сюда](https://wiki.yandex.ru/homepage/frontend/packages/)
2. Билдим и запускаем

```sh
docker-compose up
```