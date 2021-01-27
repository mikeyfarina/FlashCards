import React from 'react';

const Homepage = ({ flashcardSets }) => {
  const homepageStyle = {
    background: '#5da2d5',
    height: '100%',
    margin: '0 10%',
  };
  const setDisplayStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    height: '80vh',
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
  return (
    <div style={homepageStyle}>
      Homepage
      <div style={setDisplayStyle}>
        {flashcardSets ? (
          flashcardSets.map((set, i) => {
            console.log(set, i);
            return (
              <div key={set.id} style={setStyle}>
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
            );
          })
        ) : (
          <div>{'Loading Flashcard Sets'}</div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
