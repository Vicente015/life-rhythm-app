#!/bin/bash
# Add location from error as argument
# Stackoverflow issue: https://stackoverflow.com/questions/73107234/how-to-fix-jlink-does-not-exist

# Get route via flatpak
BINARIES_LOCATION="$(flatpak info --show-location com.google.AndroidStudio)/files/extra/android-studio/jre/bin"

sudo cp $BINARIES_LOCATION/{jlink,javac,jmod} $1
