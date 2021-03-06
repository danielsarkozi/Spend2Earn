# Setup

 - This project is based on the heroku django template: https://github.com/heroku/heroku-django-template . This uses a pipfile instead of reuirements.txt
 - To run the server locally, you need to install postgresql, and set up a database for the django project. Then from the repo root run *s2e-backend/manage.py* with arguement: *runserver*. (Local python 3 environment needs the used packages to be installed.)
 - Remote repository for deployment: https://git.heroku.com/protected-citadel-34073.git

## Deploying

- After cloning the main repo, add the heroku app to it as a remote. App name: *protected-citadel-34073*. (https://stackoverflow.com/questions/5129598/how-to-link-a-folder-with-an-existing-heroku-app)
- Do not push the whole repository to heroku! Use git-subtree, run:

    $ git subtree push --prefix s2e-backend heroku master


## Further Reading

- [Gunicorn](https://warehouse.python.org/project/gunicorn/)
- [WhiteNoise](https://warehouse.python.org/project/whitenoise/)
- [dj-database-url](https://warehouse.python.org/project/dj-database-url/)
