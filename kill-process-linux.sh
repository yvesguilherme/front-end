#!/bin/bash

PORT=9000
PID=$(lsof -t -i :9000)

if [ -n "$PID" ]; then
  echo  "PID $PID found"
  kill $PID
  echo "PID $PID terminated."
else
  echo "No process found."
fi