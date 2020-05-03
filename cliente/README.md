## Flask & React Chileparcels 
Este proyecto soluciona la API para consultar las llamadas y audios generados por su call center.  
Este proyecto es instalado y probado en Debian 9.

### Dependencias.
Nodejs LTS Release

```
sudo apt-get install curl software-properties-common
curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -

sudo apt-get install nodejs

$node -v
$npm -v
```
Postgresql
```
sudo apt-get install postgresql libpq-dev nginx ufw
```
Python
```
sudo apt-get install python3-dev python3-pip
```

#### Clone Project, install and build packages

### FrontEnd
cd ~  
git clone https://github.com/fenavillarroel/chparcels.git -b develop  
cd chparcels/cliente  
npm install  
change dataComponent.js  
//const url = 'http://192.168.10.7:5000/api/v1/allcalls';  
npm run build  
cp -a build /var/www/html


### BackEnd

cd ~/chparcels/cliente/backend  
python -m venv env  
source env/bin/activate  
pip3 install -r requirements.txt  
Test gunicorn    
gunicorn --bind 0.0.0.0:5000 wsgi:app  
deactivate

### Deploy Frontend & Backend  

Change /etc/nginx/sites-enabled/default like  
root /var/www/html/build;  

Create a systemd Unit File  

sudo nano /etc/systemd/system/app.service  

```
[Unit]
#  specifies metadata and dependencies
Description=Gunicorn instance to serve myproject
After=network.target
# tells the init system to only start this after the networking target has been reached
# We will give our regular user account ownership of the process since it owns all of the relevant files
[Service]
# Service specify the user and group under which our process will run.
User=fernando
# give group ownership to the www-data group so that Nginx can communicate easily with the Gunicorn processes.
Group=www-data
# We'll then map out the working directory and set the PATH environmental variable so that the init system knows where our th$
WorkingDirectory=/home/fernando/chparcels/cliente/backend
Environment="PATH=/home/fernando/chparcels/cliente/backend/env/bin"
# We'll then specify the commanded to start the service
ExecStart=/home/fernando/chparcels/cliente/backend/env/bin/gunicorn --workers 3 --bind unix:app.sock -m 007 wsgi:app
# This will tell systemd what to link this service to if we enable it to start at boot. We want this service to start when th$
[Install]
WantedBy=multi-user.target

```
sudo systemctl start app  
sudo systemctl enable app  

sudo nano /etc/nginx/sites-available/app  

```
server {
    listen 80;
    server_name server_domain_or_IP;
}
```
Or we’ll include the proxy_params  

```
server {
    listen 80;
    server_name server_domain_or_IP;

location / {
  include proxy_params;
  proxy_pass http://unix:/home/tasnuva/work/deployment/src/app.sock;
    }
}
```

sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled  

sudo systemctl restart nginx  
sudo ufw allow 'Nginx Full'

http://server_domain_or_IP  

Congratulations!! Your deployment is done!


#### References:  
https://medium.com/faun/deploy-flask-app-with-nginx-using-gunicorn-7fda4f50066a  

https://tecadmin.net/install-latest-nodejs-npm-on-debian/  

https://medium.com/@timmykko/deploying-create-react-app-with-nginx-and-ubuntu-e6fe83c5e9e7  
