import React from 'react';
import PropTypes from 'prop-types';

import { MdAdd } from 'react-icons/md';
import history from '../../services/history';

import { Menu, TitleBar } from './styles';

export default function MenuBar(props) {
  const { route, title, id, withId, visible } = props;

  return (
    <Menu>
      <strong>{title}</strong>
      {visible ? (
        <TitleBar>
          {withId ? (
            <button
              type="button"
              onClick={() => history.push(`/${route}/new/${id}`)}
            >
              <MdAdd size={24} />
              CADASTRAR
            </button>
          ) : (
            <button type="button" onClick={() => history.push(`/${route}/new`)}>
              <MdAdd size={24} />
              CADASTRAR
            </button>
          )}
        </TitleBar>
      ) : null}
    </Menu>
  );
}

MenuBar.defaultProps = {
  route: null,
  id: null,
  withId: false,
  visible: true,
};

MenuBar.propTypes = {
  route: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  visible: PropTypes.bool,
  withId: PropTypes.bool,
};
