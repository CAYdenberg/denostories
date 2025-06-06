export default `
html:has(.ds-layout),
body:has(.ds-layout) {
  height: 100%;
}

/*
* Layout
*/

.ds-layout {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
}

.ds-layout__main {
  overflow-y: auto;
  flex-grow: 1;
}

.ds-layout__aside {
  min-width: calc(240px + 4em);
  background-color: #f4f4f4;
  font-size: 16px;
  padding: 3em 2em;
}

/**
** In-story messages
*/

.ds-message {
  color: red;
  margin: 1rem;
  border: 1px solid;
  border-radius: 5px;
  padding: 1rem;
  background-color: hsla(0, 100%, 50%, 0.1);
}

/**
** Search
*/

.ds-search {
  position: relative;
  margin-bottom: 2em;
}

.ds-search__icon {
  position: absolute;
  top: 0.2em;
  left: 0.3em;
}

.ds-search__input {
  padding: 0.2em 0.3em 0.2em 2em;
  outline-color: #276ef1;
}

/**
** GroupMenu
*/

.ds-groupmenu__title {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.ds-groupmenu__indicator {
  transition: ease-in-out 0.1s transform;
}

.ds-groupmenu__title[aria-pressed="true"] > .ds-groupmenu__indicator {
  transform: rotate(90deg);
}

.ds-groupmenu__label {
  padding: 0 0.25rem;
}

/**
** StoryMenu
*/

.ds-storymenu {
  margin-left: 1em;
  display: none;
}

.ds-storymenu[aria-expanded="true"] {
  display: block;
}

.ds-groupmenu__title[aria-pressed="true"] .ds-storymenu__a {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.25rem;
}

.ds-storymenu__a {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.ds-storymenu__title {
  padding: 0 0.25em;
}
`;
