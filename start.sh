#!/bin/bash

pip3 install -r requriements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
mkdir -p /var/log
python3 main.py