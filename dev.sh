#!/usr/bin/env bash
set -e
gcloud beta emulators datastore start --no-store-on-disk &
trap "kill -- -$!" EXIT
$(gcloud beta emulators datastore env-init)
node app.js
