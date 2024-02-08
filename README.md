# Project Echo
## A concept for OpenAI
[Figma Prototype](https://www.figma.com/file/ceMWXn2T42kmBC2QXPhJOV/Project-Echo?type=design&node-id=0%3A1&mode=design&t=UOPDtamZuPZ29s2N-1)

## Running the project locally
Currently, running the project locally requires you to manually add a `.env` file and add your OpenAI Api key into the file before running the project.

### Clone the repo onto your machine
```
git clone https://github.com/ctheil/echo.git
```
### cd into the folder
```
cd echo
```
### Create the .env file
```
touch .env
```
### Obtain an API key from [OpenAi](https://openai.com/blog/openai-api)
```
nano .env
```
### Enter the open api key
```
VITE_OPENAI_API_KEY = "<YOUR-API-KEY>"
```
### Save and exit the .env file, install the dependencies, and run the project
```
npm install
npm run dev
```
### Enter the project @ `localhost:5173`
