# Jeff Innovations

Personal + business site for Jephthah Ampadu Boateng — showcase, services
(Mr. Jeff's Designs, Mr. Blackee's Data Hub, web development), and a
"Request a Service" form that saves submissions to a database.

## Setup

1. Install Python 3.10+ if you don't have it.
2. In this folder, create a virtual environment and install dependencies:

   ```
   python -m venv venv
   venv\Scripts\activate        (on Windows)
   pip install -r requirements.txt
   ```

3. Add your own photo at `static/images/profile.jpeg` (the hero and about
   sections will just hide the image if it's missing, so the site still
   works without it).

4. Run the app:

   ```
   python app.py
   ```

5. Visit `http://127.0.0.1:5000` in your browser.

## Viewing service requests

Go to `http://127.0.0.1:5000/admin`. The default password is
`jeffinnovations2026` — **change this in `app.py`** (the `ADMIN_PASSWORD`
variable) before you deploy anywhere public. Also change `SECRET_KEY` in
`app.py` to something random.

## Deploying

This needs a host that runs Python (GitHub Pages won't work — it only
serves static files). Good free/cheap options for a Flask app like this:

- **PythonAnywhere** (you already used this for the GNAAS AYM portal, so
  the setup will feel familiar)
- **Render** (free tier, deploys straight from a GitHub repo)

The SQLite database (`jeff_innovations.db`) is created automatically the
first time you run the app.

## Project structure

```
jeff-innovations/
├── app.py                 Flask app + routes + database model
├── requirements.txt
├── templates/
│   ├── index.html         Main site
│   ├── admin_login.html   Admin password gate
│   └── admin.html         List of service requests
└── static/
    ├── style.css
    ├── script.js
    └── images/            Put profile.jpeg here
```
