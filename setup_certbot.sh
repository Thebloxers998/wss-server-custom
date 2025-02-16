# setup_certbot.sh
sudo apt update
sudo apt install certbot
sudo certbot certonly --standalone -d clouddata.thebloxers998.org -d www.clouddata.thebloxers998.org
