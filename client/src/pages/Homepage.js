import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Homepage = ({ flashcardSets }) => {
  const homepageStyle = {
    background: '#5da2d5',
    height: '90vh',
    margin: '0 10%',
  };
  const collectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    background: 'lightgrey',
    height: 'fit-content',
    width: '80%',
    margin: '5% 10%',
    padding: '2% 0',
    borderRadius: '8px',
  };
  const setStyle = {
    width: '80%',
    height: '15vh',
    background: 'white',
    margin: '5% 10%',
    padding: '2% 4%',
    borderRadius: '8px',
  };
  console.log(flashcardSets);

  const history = useHistory();

  return (
    <div style={homepageStyle}>
      <Link
        to="/flashcards"
        style={{ textDecoration: 'none', fontSize: '2vw' }}
      >
        All Flashcards
      </Link>
      <div style={collectionStyle}>
        {flashcardSets ? (
          flashcardSets.map((set) => (
            <li key={set.id}>
              <div
                style={setStyle}
                onClick={() => {
                  history.push(`/flashcards/${set.id}`);
                }}
              >
                <h2 style={{ marginBottom: '1vh' }}>{set.title}</h2>
                {set.flashcards.map((card, i) => {
                  if (!(i < 3)) return;
                  return (
                    <div key={card.id}>
                      <h5>{card.front}</h5>
                    </div>
                  );
                })}
              </div>
            </li>
          ))
        ) : (
          <div>{'Loading Flashcard Sets'}</div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
