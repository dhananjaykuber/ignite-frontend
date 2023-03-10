import { configureStore } from '@reduxjs/toolkit';
import eventPopupReducer from '../redux/eventPopupSlice';
import treasurerReducer from '../redux/treasurerSlice';
import quizReducer from '../redux/quizSlice';
import toastReducer from '../redux/toastSlice';

export const store = configureStore({
  reducer: {
    eventPopup: eventPopupReducer,
    treasurer: treasurerReducer,
    quiz: quizReducer,
    toast: toastReducer,
  },
});
