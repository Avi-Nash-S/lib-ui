import React from 'react';
import { TitleContainer, DescriptionContainer } from './helper';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(() => ({
  root: {
    width: 300,
    margin: 10,
    height: 400,
  },
  media: {
    height: 160,
  },
  avatar: {
    backgroundColor: '#041e42',
  },
}));

const CardComponent = ({ book, isLoading, history }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          isLoading ? (
            <Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />
          ) : (
            <Tooltip title={book.title} style={{ display: 'flex', justifyContent: 'center' }}>
              <TitleContainer>{book.title}</TitleContainer>
            </Tooltip>
          )
        }
      />
      <CardActionArea
        component='span'
        className='card-container'
        key={book.id}
        // onClick={() => history.push(`/${book.id}`)}
      >
        {isLoading && book.bookImage !== undefined ? (
          <Skeleton animation='wave' variant='rect' height={160} className={classes.media} />
        ) : (
          <div
            key={book.id}
            style={{
              width: '100%',
              height: '160px',
              boxSizing: 'initial',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              style={{ height: '160px', width: '160px' }}
              src={`http://covers.openlibrary.org/b/isbn/${book.isbn || 9780385533225}-L.jpg`}
              alt=''
              onError={(e) => (e.target.src = `http://covers.openlibrary.org/b/isbn/9780385533225-L.jpg`)}
            />
          </div>
        )}
        <CardContent>
          {isLoading ? (
            <React.Fragment>
              <Skeleton animation='wave' height={10} width={240} style={{ marginBottom: 6 }} />
              <Skeleton animation='wave' height={10} width={210} />
            </React.Fragment>
          ) : (
            <Typography variant='body2' color='textSecondary'>
              <DescriptionContainer>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {/* <h3 style={{ margin: '0.3rem' }}>Subject</h3>&nbsp; {book.subject} */}
                  <b>Subject</b>&nbsp; {book.subject}
                </span>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {/* <h3 style={{ margin: '0.3rem' }}>Author</h3>&nbsp; {book.author} */}
                  <b>Author</b>&nbsp; {book.author}
                </span>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {/* <h3 style={{ margin: '0.3rem' }}>Published By</h3>&nbsp; {book.publisher} */}
                  <b>Published By</b>&nbsp; {book.publisher}
                </span>
              </DescriptionContainer>
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardComponent;
