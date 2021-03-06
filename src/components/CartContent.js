import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { IconButton, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import allActions from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  emptyCartPopup: {
    width: "100%",
    height: 40,
  },
}));

export const CartContent = ({ handleClose }) => {
  const classes = useStyles();

  const [cartTotal, setCartTotal] = useState(0);
  const history = useHistory();

  const cart = useSelector(({ cart }) => cart);
  const dispatch = useDispatch();

  const emptyCart = cart.length === 0;

  useEffect(() => {
    const total = cart.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);
    setCartTotal(total);
  }, [cart]);

  const handleRemoveFromCart = (amiibo) => {
    dispatch(allActions.removeAmiiboFromCart(amiibo));
  };

  const goToCheckout = () => {
    handleClose(null);
    history.push("/checkout");
  };

  return (
    <List className={classes.root}>
      {emptyCart && (
        <ListItem alignItems="flex-start">
          <ListItemText
            className={classes.emptyCartPopup}
            primary={
              <Typography
                component="span"
                variant="h6"
                className={classes.inline}
                color="textPrimary">
                (Tu carro está vacío)
              </Typography>
            }
          />
        </ListItem>
      )}
      {!emptyCart &&
        cart.map((item) => {
          const { character, price, image, amiiboSeries } = item;
          return (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={character} src={image} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${character} - ${amiiboSeries}`}
                  secondary={
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}>
                        <IconButton onClick={() => handleRemoveFromCart(item)}>
                          <RemoveCircleOutlineIcon color="primary"></RemoveCircleOutlineIcon>
                        </IconButton>
                        <Typography
                          component="span"
                          variant="h6"
                          className={classes.inline}
                          color="textPrimary">
                          {`$${price}`}
                        </Typography>
                      </div>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
      {!emptyCart && (
        <ListItem alignItems="flex-end">
          <ListItemText
            secondary={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Typography
                  component="span"
                  variant="h6"
                  className={classes.inline}
                  color="textPrimary">
                  {`TOTAL: $${cartTotal}`}
                </Typography>

                <Button onClick={goToCheckout} color="secondary">
                  Checkout
                </Button>
              </div>
            }></ListItemText>
        </ListItem>
      )}
    </List>
  );
};
