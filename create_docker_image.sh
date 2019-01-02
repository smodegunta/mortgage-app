#!/bin/bash
ng build --prod
#ng build --prod --base-href /ui/ --deploy-url /ui/
docker build -t 961085435907.dkr.ecr.us-east-1.amazonaws.com/brimma/mortgageui .
#docker build -t brimma/mortgageui .
docker push 961085435907.dkr.ecr.us-east-1.amazonaws.com/brimma/mortgageui:latest
