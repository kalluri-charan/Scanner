import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    dialogTotal: {
        textAlign: `center`,
        minWidth: `650px`
    },
    checkOutSection: {
        flexDirection: `row-reverse`,
        display: `flex`,
        marginTop: `40px`,
    }
}));

export default function TotalDialog({totalProductsValue}) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className={classes.checkOutSection}>
                <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                    Check Out
                </Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={"lg"}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={classes.dialogTotal}>Your Total Cost</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={classes.dialogTotal}>
                        Total Cost is $ {totalProductsValue}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" autoFocus variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
