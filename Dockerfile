# pull base image
ARG NODE_VERSION=latest
FROM node:${NODE_VERSION} as build

WORKDIR /app

COPY ./simple-kimai-kiosk/package.json ./simple-kimai-kiosk/package-lock.json ./

# set node environment
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# install dependencies
RUN npm install

COPY ./simple-kimai-kiosk ./

RUN npx expo export -p web

FROM nginx as production

# set data to use for Kimai integration
ARG KIMAI_URL
# CUSTOMER_NAME can be left blank if only one customer
ARG CUSTOMER_NAME
ARG PROJECT_NAME=Default
ENV KIMAI_URL $KIMAI_URL
ENV CUSTOMER_NAME $CUSTOMER_NAME
ENV PROJECT_NAME $PROJECT_NAME

RUN mkdir /app
COPY --from=build /app/dist /app
COPY ./nginx.conf /etc/nginx/nginx.conf
