#!/bin/bash

npm install
npm run build
npm run typeorm:run
npm run start:dev