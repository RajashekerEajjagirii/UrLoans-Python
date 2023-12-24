echo "Build bash start"

pip install -r requirements.txt
python manage.py collectstatic

echo "Build done using bash file"
