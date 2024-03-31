# ---- Base Node ----
FROM node:lts AS base
# Create app directory
WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies
COPY ./simple-kimai-kiosk/package.json ./simple-kimai-kiosk/package-lock.json ./
# install app dependencies including 'devDependencies'
RUN npm install

# ---- Copy Files/Build ----
FROM dependencies AS build
WORKDIR /app
COPY ./simple-kimai-kiosk /app
# Build react/vue/angular bundle static files
RUN npm run build

# --- Release ----
FROM nginx:latest AS release
# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/* # is this needed?

# Copy static files from build stage to nginx
COPY --from=build /app/dist /usr/share/nginx/html/

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
