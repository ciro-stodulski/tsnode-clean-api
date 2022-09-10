#!/bin/bash
function readJson {  
  UNAMESTR=`uname`
  if [[ "$UNAMESTR" == 'Linux' ]]; then
    SED_EXTENDED='-r'
  elif [[ "$UNAMESTR" == 'Darwin' ]]; then
    SED_EXTENDED='-E'
  fi; 

  VALUE=`grep -m 1 "\"${2}\"" ${1} | sed ${SED_EXTENDED} 's/^ *//;s/.*: *"//;s/",?//'`

  if [ ! "$VALUE" ]; then
    echo "Error: Cannot find \"${2}\" in ${1}" >&2;
    exit 1;
  else
    echo $VALUE ;
  fi; 
}

APP_VERSION=`readJson ../../package.json version` || exit 1;

sed -i  "s/\$PROJECT_NAME/${{ toJSON(github.event.repository.name) }}/"   deployment.yaml
sed -i  "s/\$APP_VERSION/${APP_VERSION}/"     deployment.yaml
sed -i  "s/\$NAMESPACE/lab/"     deployment.yaml
sed -i  "s/\$DOCKER_IMAGE/${{toJSON(inputs.docker_username)}}/${{ toJSON(github.event.repository.name) }}:$(git rev-parse --short "$GITHUB_SHA")/"     deployment.yaml
sed -i  "s/\$SERVICEPORT/3000/"     deployment.yaml


sed -i  "s/\$PROJECT_NAME/${{ toJSON(github.event.repository.name )}}/"   hpa.yaml
sed -i  "s/\$NAMESPACE/lab/"     hpa.yaml


sed -i  "s/\$PROJECT_NAME/${{ toJSON(github.event.repository.name) }}/"   service.yaml
sed -i  "s/\$NAMESPACE/lab/"     service.yaml