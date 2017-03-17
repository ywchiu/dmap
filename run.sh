#!/bin/sh

usage()
{
    echo ""
    echo "    Usage:"
    echo ""
    echo "        `basename $0` start/stop/reload [\$MODE] [\$PORT]"
    echo ""
    echo "        \$MODE: [dev/prod] default is prod"
    echo "        \$PORT: default will bind to 8088"
    echo ""
    echo "        ex. for development:  ./run.sh start dev"
    echo "                              ./run.sh start dev 9898"
    echo ""
    echo "            for production:   ./run.sh start"
    echo "                NOTE: You should bind sock file and static folder by any web server."
    echo ""
    exit
}
if [ -z $1 ];
then
    usage
fi

MODE=${2-prod}
PORT=${3-8088}
echo ""
echo "Running in Mode: <${MODE}>, Action: <${1}> and binding to port: <${PORT}>"
echo ""

case $MODE in

    "dev")
        python manage.py runserver localhost:${PORT}
        #uwsgi --py-autoreload 1 --master --http :${PORT} --wsgi-file dmap/wsgi.py --static-map /=static/
        ;;
    "prod")
        case $1 in
            "start")
                uwsgi --ini dmap_uwsgi.ini
                #uwsgi --ini dmap_uwsgi.ini
                ;;
            "stop")
                uwsgi --stop /run/tmp/dmap_master.pid
                ;;
            "reload")
                uwsgi --reload /run/tmp/dmap_master.pid
                ;;
            *)
                usage
                ;;
        esac
        ;;
    *)
        usage
        ;;
esac

