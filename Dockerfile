FROM node:alpine 

RUN apk add --update python3 git make g++ tzdata && rm -rf /var/cache/apk/*

RUN apk add --no-cache tini

RUN cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

RUN echo "America/Sao_Paulo" > /etc/timezone

ARG AMBIENTE

ARG PORTA_1

ARG PORTA_2

ARG BRANCH

EXPOSE ${PORTA_1} ${PORTA_2}

RUN git clone https://maxsonjordan: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@github.com/alcifmais/chathelpzap.git

WORKDIR /chathelpzap

RUN git fetch --all

RUN git checkout ${BRANCH}

CMD git reset --hard HEAD && git pull origin ${BRANCH} && yarn && yarn dev
