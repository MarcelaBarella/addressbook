# FROM node:alpine
# WORKDIR /usr/app

# COPY package*.json ./
# RUN apt-get update && apt-get install -y postgresql-contrib
# RUN npm install

# COPY . .

# ADD createUuidExtension.sh /docker-entrypoint-initdb.d/
# RUN chmod 755 /docker-entrypoint-initdb.d/createUuidExtension.sh

# EXPOSE 3000

# CMD [ "npm", "start", "start.dev" ]

# FROM postgres

# RUN apt-get update && apt-get install -y postgresql-contrib

# ADD createUuidExtension.sh /docker-entrypoint-initdb.d/
# RUN chmod 755 /docker-entrypoint-initdb.d/createUudiExtension.sh