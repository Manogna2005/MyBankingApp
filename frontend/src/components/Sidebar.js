import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 240, flexShrink: 0 }}>
      <Toolbar />
      <List>
        {["Dashboard", "Customers", "Accounts", "Transactions"].map((text) => (
          <ListItem button component={Link} to={text === "Dashboard" ? "/" : `/${text.toLowerCase()}`} key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
