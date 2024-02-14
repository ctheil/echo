import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from "@mui/material";
import { Echo } from "./Echo";
import { AnalyzedPrompt } from "./AnalyzedPrompt";
import classes from "./Echo.module.css"
import { Suggestions } from "./Suggestions";

type Props = {
        open: boolean;
        handleClose: () => void
    }

    const exampleResponse =               [
                  {
          "chunk": "How does ChatGPT's Echo work?",
          "threshold": 0.9,
          "heading": "Do you have specific questions about how GPT's Echo works?",
          "suggestions": ["What is prompt engineering?", "How does the prompt analysis work?", "How does echo help me get better responses?", "I want an overview about how it works"],
          "adversity": {
            "threshold": 0.9,
            "reason": "This prompt could benefit from specifying questions."
          },
          "analyzed": {
            "weight": 0.9,
            "reason": "This concise prompt requests help based on a provided subject matter."
          }
        },
          ]

export const EchoTut = (props: Props) => {

    return <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="md"> 
        <DialogTitle>Echo Prompt Engineer and Analysis</DialogTitle>
        <DialogContent>
        <DialogContentText sx={{margin: "1rem 0"}}>
        Echo is a tool that improves your prompts by suggesting clarifications and identifying vague or contradictory parts, ensuring your queries to GPT are as clear as possible.
        </DialogContentText>

        <div className={classes["echo"]}>
        <AnalyzedPrompt response={exampleResponse} loading={false}/>
        <Divider sx={{borderColor: "#444654"}}/>
        <Suggestions onSubmit={() => {}} response={exampleResponse} loading={false}/>
        </div>
        </DialogContent>
        <DialogActions>
        <Button onClick={props.handleClose}>Close</Button>
        </DialogActions>

    </Dialog>
        
    }
// <Echo loading={false} response={exampleResponse}
// toggle={() => {}} enabled={true} started={true} refreshResponse={() => {}} sendPrompt={() => {}}/>
