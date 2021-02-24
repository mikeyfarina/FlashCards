import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import ToggleContainer from './ToggleContainer';

describe('<ToggleContainer />', () => {
  let toggleComponent;

  beforeEach(() => {
    toggleComponent = render(
      <ToggleContainer buttonLabel="show..." ToggleContainer-test-element>
        <div className="testDiv" data-test-div />
      </ToggleContainer>
    );
  });

  test('vhildren are rendered', () => {
    expect(
      toggleComponent.container.querySelector('[data-test-div]')
    ).toBeDefined();
  });

  test('at start, the children are not displayed', () => {
    const div = toggleComponent.container.querySelector(
      '[data-toggle-content]'
    );
    console.log(prettyDOM(div));
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = toggleComponent.getByText('show...');
    fireEvent.click(button);

    const div = toggleComponent.container.querySelector('[data-test-div]');
    expect(div).not.toHaveStyle('display: none');
  });
  test('toggled content can be closed', () => {
    const button = toggleComponent.getByText('show...');
    fireEvent.click(button);

    const closeButton = toggleComponent.getByText('cancel');
    fireEvent.click(closeButton);

    const div = toggleComponent.container.querySelector(
      '[data-toggle-content]'
    );
    expect(div).toHaveStyle('display: none');
  });
});
