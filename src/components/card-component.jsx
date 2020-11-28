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
import Button from '@material-ui/core/Button';

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

const CardComponent = ({ book, isLoading, history, currentTab, onBookImageClick }) => {
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
              onClick={() => onBookImageClick(book)}
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
            <div>
              <Typography variant='body2' color='textSecondary' align='center'>
                <DescriptionContainer>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'large',
                      fontWeight: '500',
                    }}
                  >
                    By&nbsp; {book.author}
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      lineHeight: '1.5em',
                      height: '3em',
                      overflow: 'hidden',
                    }}
                  >
                    {book.subject}
                  </span>

                  <span
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: ' 0.67' }}
                  >
                    {book.publisher}
                  </span>
                </DescriptionContainer>
              </Typography>
              {currentTab === 'All Books' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '15px',
                    lineHeight: ' 0.67',
                  }}
                >
                  {book.available ? (
                    <label style={{ color: 'green' }}>Available</label>
                  ) : (
                    <label style={{ color: 'red' }}>Unavailable</label>
                  )}
                  <Button color='primary' disabled={!book.available}>
                    Request
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardComponent;
