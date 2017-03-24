# dmap
疾管署 - 疫情與輿情交叉分析比對


## 安裝步驟

1. 安裝git
- git clone https://github.com/ywchiu/dmap.git

2. 安裝nginx 
-  sudo apt-get install nginx


3. 將dmap 移到 /webapps
- sudo mkdir /webapps
- sudo mv dmap /webapps/

4. 切換到postgres 使用者
- sudo su - postgres

5. 建立資料庫 (在postgres 上)
- psql 
- CREATE DATABASE dmapdb;
-  \q

6. 建立使用者
- psql -d dmapdb
- CREATE USER ubuntu LOGIN ENCRYPTED PASSWORD 'largitdata';

7. 建立 Python 環境 (按 ctrl + d 回到原本使用者身分下)
- sudo apt-get install python-pip
- pip install virtualenv
- virtualenv venv
- source venv/bin/activate

8. 更新專案
- git pull

9. 安裝必須套件 (在venv 的環境下)
- sudo apt-get install libgeoip-dev -y
- sudo apt-get install build-essential libssl-dev libffi-dev python-dev
- sudo apt-get install postgresql postgresql-client postgresql-contrib
- sudo apt-get install libpq-dev python-dev
- sudo apt-get install python-psycopg2

