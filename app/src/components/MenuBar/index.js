import React from 'react';
import PropTypes from 'prop-types';

import { MdAdd } from 'react-icons/md';
import history from '../../services/history';

import { Menu, TitleBar } from './styles';

export default function MenuBar(props) {
  const { route, title, id, withId } = props;

  return (
    <Menu>
      <strong>{title}</strong>
      <TitleBar>
        {withId ? (
          <button
            type="button"
            onClick={() => history.push(`/${route}/details/${id}`)}
          >
            <MdAdd size={24} />
            CADASTRAR
          </button>
        ) : (
          <button
            type="button"
            onClick={() => history.push(`/${route}/details`)}
          >
            <MdAdd size={24} />
            CADASTRAR
          </button>
        )}
      </TitleBar>
    </Menu>
  );
}

MenuBar.defaultProps = {
  route: null,
  id: null,
  withId: false,
};

MenuBar.propTypes = {
  route: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  withId: PropTypes.bool,
};
