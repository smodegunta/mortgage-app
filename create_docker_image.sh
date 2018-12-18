#!/bin/bash
ng build --prod --base-href /ui/ --deploy-url /ui/
docker build -t brimma/mortgageui .
