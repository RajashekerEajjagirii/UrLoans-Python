echo "Build bash start"

python pip install -r requirements.txt
python manage.py collectstatic
python manage.py runserver

echo "Build done using bash file"
