# VizWicket: Interactive IPL Data Visualization

## Introduction

Welcome to VizWicket, an intuitive web-based platform that brings the excitement and intricacies of the Indian Premier League (IPL) to your screen through advanced data visualization. VizWicket leverages the latest web technologies to transform IPL statistics into engaging visual stories, allowing users to delve into matches, player performance, and season trends with just a few clicks.

Built with ReactJS, VizWicket offers a responsive and user-friendly interface, while D3.js breathes life into the data with dynamic, interactive charts. The backend, powered by Python, ensures robust data handling and seamless integration. From Manhattan and Worm charts to Wicket Distribution and Boundary Scatter plots, VizWicket makes cricket analytics accessible and insightful for fans, analysts, and enthusiasts alike.

Dive into the data, uncover hidden narratives, and experience the IPL like never before with VizWicket.

## Technologies Used

- **Backend**: Django (Python 3.11), Poetry for dependency management
- **Frontend**: React, D3.js for data visualization
- **Deployment**: Render (Backend), Netlify (Frontend)

## Deployment

Live Website URL: [VizWicket](https://vizwicket.netlify.app/)

## Steps for Installation

### Backend Installation

#### Windows & macOS:

1. **Install Python 3.11**: Download from [python.org](https://python.org) and follow the installation instructions.
2. **Install Poetry**:
   - **Windows**: Run `pip install poetry` in Command Prompt.
   - **macOS**: Run `pip3 install poetry` in Terminal.
3. Navigate to the `backend/` directory.
4. Install dependencies: Run `poetry install --no-root`.
5. Start the server: Run `poetry run python manage.py runserver`.

### Frontend Installation

#### Node.js Setup:

- **Windows & macOS**: Download from [nodejs.org](https://nodejs.org) and follow the setup instructions.

#### Yarn Setup:
If you don't have Yarn installed, after installing Node.js, run `npm install --global yarn` to install Yarn globally on your system.

#### Project Setup:
1. Navigate to the `frontend/` directory in your terminal.
2. Install dependencies with Yarn: Run `yarn install`.
3. Start the development server: Run `yarn start`.

## Usage

After successful installation of both backend and frontend go to the following url http://localhost:3000
