#!/bin/bash
ng build --prod
sudo docker build -t brimma/mortgageui .
