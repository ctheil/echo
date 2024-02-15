import React, {  useState } from "react"
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, TextField, ThemeProvider } from "@mui/material"
import Storage from "../util/key";
import { theme } from "./muiPalette";
import { testKey } from "../util/openAi";

export const KeyInputDialog = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(!Storage.get("key"))
    
        return <ThemeProvider theme={theme}>
        <Dialog 
        open={ open } 
        onClose={()=> {return}}
        PaperProps={{
        component:"form",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            setLoading(true)
                event.preventDefault(); 
                const formData = new FormData(event.currentTarget); 
                const formJSON = Object.fromEntries((formData as FormData).entries());
                const key = formJSON.key as string;
                console.log(key)
                // NOTE: test key
                const goodKey = await testKey(key);
                setLoading(false)
                if (goodKey instanceof Error) {
                    return setError("Invalid api key")
                    }
                Storage.put("key", key)
                setOpen(false)
            }

            }}
        >
        
            <DialogTitle>OpenAI Api Key</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    In order to interact with this feature, you must first garner an <Link target="_blank" color="secondary" href="https://openai.com/blog/openai-api">api key from OpenAI</Link> to interact with the ChatGPT model. <Link target="_blank" color="secondary" href="https://help.openai.com/en/articles/4936850-where-do-i-find-my-api-key">Need help finding you key?</Link>
                    </DialogContentText>
                    <TextField 
                    autoFocus
                    required
                    margin="dense"
                    id="key"
                    name="key"
                    label="OpenAI Api Key"
                    type="password"
                    fullWidth
                    variant="standard"
                    error={!!error}
                    helperText={error && "Invalid api key"}
                    />
                </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="secondary" type="submit">Submit</Button>
                </DialogActions>
                {loading && 
                    <Box sx={{display: "flex", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.4)", justifyContent: "center", position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>
                    <CircularProgress  color="secondary"/>
                    </Box>
                }
            </Dialog>
        </ThemeProvider>
    }


