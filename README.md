<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Instalación

```bash
$ yarn install
```

## Como ejecutar la aplicación

1. Crear un archivo `.env` basado en el archivo `.env.example`
2. Ingresar el Api Key de la API de Coin Market Cap en el archivo `.env`
3. Ejecutar el siguiente comando

```bash
yarn start:dev
```

## CURLS para probar la aplicación

### Top 5 por capitalización de mercado

```bash
curl --location 'http://localhost:3000/api/v1/crypto/top'
```

### Obtener por symbol

```bash
curl --location 'http://localhost:3000/api/v1/crypto/:symbol'
```

## Respuestas

### ¿Cómo se podrían aprovechar éstas funcionalidades dentro del producto de Takenos?

1. Portafolio de Inversiones: Los usuarios pueden crear y gestionar un portafolio de criptomonedas. La API puede ofrecer actualizaciones en tiempo real sobre el valor de su portafolio en Pesos.

2. Alertas de Precios: Los usuarios pueden configurar alertas de precios para recibir notificaciones cuando el precio de una criptomoneda alcance un valor específico.

3. Gráficos e Informes: Ofrecer gráficos interactivos que muestren la evolución de los precios y capitalización de mercado de las criptomonedas.

4. Noticias y Análisis: Integrar noticias y análisis sobre el mercado de criptomonedas para mantener a los usuarios informados.

5. Conversor de Monedas: Permitir a los usuarios convertir el valor de una criptomoneda a Pesos o a otra criptomoneda.

### ¿Cómo se vería una arquitectura completa en la que se guarden datos relacionados a éstas funcionalidades?

1. Almacenamiento: Utilizar una base de datos relacional (p.ej., PostgreSQL) para almacenar datos históricos de precios, información de usuarios, y configuraciones de alertas.

2. Caching: Implementar caching (p.ej., Redis) para almacenar datos frecuentemente consultados y mejorar la velocidad de respuesta.

3. Microservicios: Dividir la aplicación en microservicios para manejar distintas funcionalidades, como autenticación, gestión de portafolios, y notificaciones.

4. APIs Externas: Crear servicios dedicados para interactuar con las APIs de CoinMarketCap y CriptoYa, asegurando que se manejan correctamente los límites de rate y se implementan estrategias de reintento.

5. Inclusión de Websockets: Utilizar Websockets para ofrecer actualizaciones en tiempo real sobre el valor de las criptomonedas y notificaciones de alertas.

6. Considerar herramientas como AWS, Google Cloud, o Azure para alojar la aplicación y garantizar escalabilidad y disponibilidad.

7. Implementar un sistema de monitoreo y logging para rastrear el rendimiento de la aplicación y detectar posibles problemas.

8. Pruebas Automatizadas: Realizar pruebas unitarias y de integración para garantizar la calidad del código y la funcionalidad de la aplicación.


### ¿Cómo se manejarían algunos aspectos técnicos como la autenticación, el cifrado de datos, y otros aspectos relevantes a la hora de terminar de implementar éstas funcionalidades?

1. JWT: Implementar JWT para autenticación segura de los usuarios.

2. OAuth: Ofrecer opciones de inicio de sesión con OAuth (p.ej., Google, Facebook) para mejorar la experiencia del usuario.

3. CORS: Configurar CORS para restringir el acceso a la API desde dominios no autorizados.

4. SSL/TLS: Asegurar que todas las comunicaciones con la API se realizan a través de HTTPS.

5. Encriptación: Utilizar encriptación para proteger datos sensibles almacenados en la base de datos (p. ej. bcrypt para contraseñas).

6. Rate Limiting: Implementar límites de tasa para prevenir ataques de denegación de servicio y proteger la API de abusos.

