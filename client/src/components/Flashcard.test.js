import '@testing-library/jest-dom/extend-expect';
import { prettyDOM } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Flashcard from './Flashcard';

describe('<Flashcard />', () => {
  let flashcard;
  let currentFlashcardIndex;
  beforeEach(() => {
    const flashcards = [
      {
        id: 'a',
        front: 'front for testing',
        back: 'back for testing',
      },
    ];

    currentFlashcardIndex = 0;

    const component = render(
      <Flashcard
        flashcards={flashcards}
        currentFlashcardIndex={currentFlashcardIndex}
      />
    );

    flashcard = component.container.querySelector('[data-flashcard-element]');
  });

  test('renders content', () => {
    console.log(prettyDOM(flashcard));
  });

  test('displays front of flashcard on render', () => {
    expect(flashcard).toHaveTextContent('front for testing');
  });

  test('displays opposite side of flashcard when clicked', () => {
    expect(flashcard).toHaveTextContent('front for testing');

    fireEvent.click(flashcard);
    expect(flashcard).toHaveTextContent('back for testing');

    fireEvent.click(flashcard);
    expect(flashcard).toHaveTextContent('front for testing');
  });
});
