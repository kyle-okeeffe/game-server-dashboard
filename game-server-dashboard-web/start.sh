#/bin/sh

# runtime-config.js replacements
escaped_api_url=$(echo $API_URL | sed -e 's/[\/&]/\\&/g')
sed -i "s/__API_URL__/$escaped_api_url/g" /usr/share/nginx/html/runtime-config.js
sed -i "s/__API_PORT__/$API_PORT/g" /usr/share/nginx/html/runtime-config.js

nginx -g "daemon off;"