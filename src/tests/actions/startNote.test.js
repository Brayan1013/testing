import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startDeleting,
  startLoadingNotes,
  startNewNote,
  startSaveNote,
} from "../../actions/notes";
import { types } from "../../types/types";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Testing the action start note", () => {
  const initialState = {
    auth: { uid: "TESTING" },
  };

  let store = mockStore(initialState);

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("It should called addNote dispatch and setActive", async () => {
    await store.dispatch(startNewNote());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });
    await store.dispatch(startDeleting(actions[0].payload.id));
  });

  test("should dispatch the start loading", async () => {
    await store.dispatch(startLoadingNotes("TESTING"));
    const actions = store.getActions();
    expect(actions.length).toBe(1);
  });

  test("should start a new note", async () => {
    await store.dispatch(
      startSaveNote({
        id: "g67OTAh2dAYUydr51Va9",
        title: "lala",
        body: "lalala",
      })
    );
    const actions = store.getActions();
    const objectExpected = {
      id: "g67OTAh2dAYUydr51Va9",
      note: { id: "g67OTAh2dAYUydr51Va9", title: "lala", body: "lalala" },
    };
    expect(objectExpected).toEqual(actions[0].payload);
  });
});
