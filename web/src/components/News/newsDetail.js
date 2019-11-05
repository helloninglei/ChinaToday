import React, { useCallback } from 'react'
import { useMappedState, useDispatch } from "redux-react-hook";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';


function NewsDetail() {
    const dispatch = useDispatch();
    const mapState = useCallback(state => ({
        selectedNews: state.data.get("selectedNews"),
        showNewsDetail: state.data.get("showNewsDetail")
    }));
    const { selectedNews ,showNewsDetail} = useMappedState(mapState);

    const handleClose = () => {
        dispatch({type:"DISPLAY_NEWS_DETAIL", payload:false})
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
    }, [showNewsDetail]);

    return (
        <div>
            <Dialog
                open={showNewsDetail}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{selectedNews.title}</DialogTitle>
                <DialogContent dividers="true">
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <div dangerouslySetInnerHTML={{__html: selectedNews.content}}></div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default NewsDetail;