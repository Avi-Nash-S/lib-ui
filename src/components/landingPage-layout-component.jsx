import React from 'react';
import clsx from 'clsx';
import { fade, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { getBooks, setCurrentTab, filterBooks, resetBooksResults } from '../redux/books/books.action';
import { logout } from '../redux/user/user.action';
import { compose } from 'redux';
import HeaderComponent from './header-component';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuBookIcon from '@material-ui/icons/MenuBook';
const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
    height: 'auto',
    minHeight: '100vh',
    backgroundColor: '#efefef',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#23466c',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    border: 'none',
  },
  drawerPaper: {
    width: '20vw',
    border: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    backgroundColor: '#efefef',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginRight: '10%',
      width: 'auto',
    },
  },
  searchIcon: {
    color: '#041e42',
    borderRadius: '6px 0px 0px 6px',
    width: '16px',
    padding: '0px 14px',
    height: '100%',
    position: 'absolute',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    zIndex: 9,
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
});

class LandingPageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      searchQuery: '',
      filterQuery: null,
      searchIconDisplay: true,
      currentTab: 'All Books',
    };
  }
  handleDrawer = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };
  onSearch = () => {
    this.setState((prevState) => ({
      searchIconDisplay: !prevState.searchIconDisplay,
      filterQuery: null,
    }));
    this.state.searchQuery.length > 3 && this.props.filterBooks(this.state.searchQuery);
  };
  onSearchClear = () => {
    this.props.resetBooksResults();
    this.setState(
      {
        searchQuery: '',
      },
      () => this.onSearch()
    );
  };
  onSearchUpdate = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };
  onListItemSelect = (param) => {
    this.setState({
      currentTab: param,
    });
    this.props.setCurrentTab(param);
  };
  onLogOut = () => {
    this.props.logout();
    this.props.setCurrentTab('All Books');
    this.props.history.push('/login');
  };
  render() {
    const { open, searchIconDisplay, searchQuery, currentTab } = this.state;
    const { classes, getBooks } = this.props;
    return (
      <>
        <div className={classes.root}>
          <HeaderComponent
            searchIconDisplay={searchIconDisplay}
            userDetails={this.props.data.user ? this.props.data.user : null}
            searchQuery={searchQuery}
            getBooks={getBooks}
            open={open}
            classes={classes}
            onSearch={this.onSearch}
            onSearchClear={this.onSearchClear}
            handleDrawer={this.handleDrawer}
            onSearchUpdate={this.onSearchUpdate}
            onLogOut={this.onLogOut}
          />
          <Drawer
            className={classes.drawer}
            variant='persistent'
            anchor='left'
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader} />
            <Divider />
            <Typography
              style={{
                color: '#041e42',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '20px',
                width: '85%',
                height: '30px',
                fontWeight: 700,
                fontSize: '20px',
              }}
            >
              Select Option
            </Typography>

            <List>
              {['All Books', 'Your Books', 'Book Request', 'Loaned Books'].map((text, index) => (
                <ListItem button key={text} onClick={() => this.onListItemSelect(text)} selected={text === currentTab}>
                  <ListItemIcon>
                    <MenuBookIcon />
                    {/* {(text = 'All Books' && <LocalLibraryIcon />)}
                    {(text = 'Your Books' && <MenuBookIcon />)}
                    {(text = 'Book Request' && <LocalLibraryIcon />)} */}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            {this.props.children}
          </main>
        </div>
      </>
    );
  }
}

const mapStateToProps = (storeState) => ({
  data: storeState.user,
});

const mapDispatchToProps = (dispatch) => ({
  getBooks: (pageNo, pageSize, query) => dispatch(getBooks(pageNo, pageSize, query)),
  setCurrentTab: (currentTab) => dispatch(setCurrentTab(currentTab)),
  logout: () => dispatch(logout()),
  filterBooks: (searchQuery) => dispatch(filterBooks(searchQuery)),
  resetBooksResults: () => dispatch(resetBooksResults()),
});

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(LandingPageLayout);
