# 美多商城
celery -A celery_tasks.main worker -l info
python manage.py makemigrations
python manage.py migrate
