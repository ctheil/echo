# Project Echo
### A concept for OpenAI
An idea for leveraging the OpenAI API to act as a prompt-engineer buffer between the LLM and the initial prompt. 
[Figma Prototype](https://www.figma.com/file/ceMWXn2T42kmBC2QXPhJOV/Project-Echo?type=design&node-id=0%3A1&mode=design&t=UOPDtamZuPZ29s2N-1)

## Running the project in the browser: [Project Echo](https://echo.calebtheil.com)
The hosted project initially prompts the user for an OpenAI API Key. This dialog is blocking and does not permit access to the tool without a key, as there is no key stored in the `.env` of the hosted project. 


> [!WARNING]
> **The OpenAI Api Key is stored in the browser's local storage.**
> 
> Users are encouraged to either (1) run this project in **incognito** or **private mode** *without browser plugins* where the local storage will be wiped when the window is closed, or (2) only run in a browser with trusted extensions installed.
> Extensions have access to local storage, so using a malicious plugin could potentially leak your OpenAI API Key.
