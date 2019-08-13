FROM node:10.11.0-alpine as ui-generator

WORKDIR /app

# Copy licenses
COPY licenses/ /app/licenses/

# Install root and app dependencies
COPY ../package.json ../package-lock.json ../gulpfile.js ../tsconfig.base.json ../common /app/
RUN npm run bootstrap
COPY ./package.json ./package-lock.json ./config-overrides.js ./.env /app/addons/
RUN cd ./app/addons && npm install --no-optional

# Copy sources
COPY ./src /app/addons/src
COPY ./public /app/addons/public

# Set env variables 
ENV PRODUCTION true

# Test & Build
ENV CI true
RUN npm test
RUN npm run build

FROM nginx:1.14.0-alpine
LABEL source git@github.com:kyma-project/console.git

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=ui-generator /app/addons/build var/public
COPY --from=ui-generator /app/licenses/ /app/licenses/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]