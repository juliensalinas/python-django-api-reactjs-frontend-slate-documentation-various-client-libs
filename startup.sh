# Needs to remove https active pid in case container was stopped
# woth SIGKILL (no problem if stopped with SIGTERM)
rm -f /var/run/apache2.pid

# Start httpd
/usr/sbin/apache2 -DFOREGROUND