sudo service mysql restart
mysql -u root -D ensolvers < db.sql
(cd app && npm i)
(cd app && npm run build)
(cd api && npm i)
node api/index.js