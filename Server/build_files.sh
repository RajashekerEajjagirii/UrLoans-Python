echo "Build bash start"

python3.9 -m pip install -r requirements.txt
python3.9  manage.py collectstatic  --noinput --clear
# python manage.py runserver

echo "Build done using bash file"
