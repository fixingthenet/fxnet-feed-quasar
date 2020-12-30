FROM node:13.8.0-stretch

RUN apt update -y && \
    apt install -y \
    nginx

ADD .yarnrc /root/.yarnrc

RUN yarn global add @quasar/cli

ENV APP_DIR=/code
WORKDIR $APP_DIR
ENV PATH="/install/node_modules/bin:${PATH}"

ENV FORWARD_TO_HTTPS=xxxxxxxxxxx

ADD package.json package.json
ADD yarn.lock yarn.lock

RUN yarn install

ADD . $APP_DIR

CMD "/bin/bash"
