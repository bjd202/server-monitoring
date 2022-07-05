FROM node:16-alpine

ENV DB_HOST=172.18.0.2

WORKDIR /app

COPY . .

# RUN yum -y update
# RUN curl -fsSL https://rpm.nodesource.com/setup_lts.x | bash -
# RUN yum -y install nodejs
RUN npm install

CMD [ "npm", "run", "dev" ]