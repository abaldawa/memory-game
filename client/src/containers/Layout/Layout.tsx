import classes from "./Layout.module.css";

const Layout: React.FC = (props) => {
  return <div className={classes.layout}>{props.children}</div>;
};

export default Layout;
