FROM node:20-alpine

ARG MY_UID
ARG MY_GID

RUN apk add chromium gettext shadow

RUN deluser node
RUN groupadd -g 1001 customgroup
RUN useradd -l -u 115 -g 1001 node

RUN chown -R 115:1001 /home/node

WORKDIR /home/node/app

