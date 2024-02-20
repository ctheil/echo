# Project Echo
## A concept for OpenAI
[Figma Prototype](https://www.figma.com/file/ceMWXn2T42kmBC2QXPhJOV/Project-Echo?type=design&node-id=0%3A1&mode=design&t=UOPDtamZuPZ29s2N-1)

## Running the project in the browser: [Project Echo](https://echo.calebtheil.com)
The hosted project initially prompts the user for an OpenAI Api Key. This dialog is blocking and does not permit access to the tool without a key, as there is no key stored in the `.env` of the hosted project. 


> [!WARNING]
> **The OpenAI Api Key is stored in the browser's local storage.**
> 
> Users are encouraged to either (1) run this project in **incognito** or **private mode** *without browser plugins* where the local storage will be wiped when the window is closed, or (2) only run in a browser with trusted extensions installed.
> Extensions have access to local storage, so using a maliscious plugin could ptentially leak your OpenAI Api Key.

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
