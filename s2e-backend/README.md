# Setup

This roject is based on the heroku django template: https://github.com/heroku/heroku-django-template . This uses a pipfile instead of reuirements.txt
To run the server locally, you need to install postgresql, and set up a database for the django project.
Remote repository for deployment: https://git.heroku.com/protected-citadel-34073.git

## Deploying

- After cloning the main repo, add the heroku app *protected-citadel-34073* as a remote. (https://stackoverflow.com/questions/5129598/how-to-link-a-folder-with-an-existing-heroku-app)
- Do not push the whole repository to heroku! Use git-subtree, run:

git subtree push --prefix s2e-backend heroku master


## Further Reading

- [Gunicorn](https://warehouse.python.org/project/gunicorn/)
- [WhiteNoise](https://warehouse.python.org/project/whitenoise/)
- [dj-database-url](https://warehouse.python.org/project/dj-database-url/)
