Roadway Report App

The Roadway Report App is a web application developed with Angular (Frontend), Django (Backend), and PostgreSQL (Database) for reporting and tracking potholes in Miami Dade County. This document provides instructions on how to set up and run the project locally.

Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
What things you need to install the software and how to install them:

Node.js and npm,
Python,
Django,
Angular CLI,
PostgreSQL

Installing
A step-by-step series of examples that tell you how to get a development environment running.

Setting up the Backend (Django with PostgreSQL)
Install PostgreSQL and set up a database for the project.

Navigate to the Django project directory:
cd path/to/RoadwayReportDjangoAPI

Create a virtual environment:
python -m venv venv

Activate the virtual environment:
On Windows:
.\venv\Scripts\activate
On Unix or MacOS:
source venv/bin/activate

Install the required packages:
pip install -r requirements.txt

Run migrations to set up the database schema:
python manage.py migrate

Start the Django development server:
python manage.py runserver

The backend server should now be running on http://localhost:8000/.

Setting up the Frontend (Angular)
Navigate to the Angular project directory:
cd path/to/RoadwayReportAngularClient

Install the required npm packages:
npm install

Start the Angular development server:
ng serve

The frontend application should now be accessible at http://localhost:4200/.

Usage
To use the application, open a web browser and navigate to http://localhost:4200/. From here, you can interact with the Roadway Report App interface.
