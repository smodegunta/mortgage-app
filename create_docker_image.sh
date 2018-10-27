#!/bin/bash
ng build --prod --base-href /ui/ --deploy-url /ui/
sudo docker build -t brimma/mortgageui .
