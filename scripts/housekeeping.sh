#!/bin/bash
# 
# Housekeeping script that runs when the site is compiled in both staging and production environments
# - Moves redirects file into the published directory
# 

## Move redirects into the static site's published directory (/dist)
echo -e "Moving redirects into publish directory...\n"
cp -vr _redirects dist

## Feel free to add any other compile time functionality here
