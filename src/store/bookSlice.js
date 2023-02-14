import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBooks = createAsyncThunk('book/getBooks', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await fetch("http://localhost:3001/books");
    const data = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
})

export const addBooks = createAsyncThunk(
  'book/addBooks',
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      bookData.userName = getState().auth.user;
      const res = await fetch("http://localhost:3001/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        }
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
  }
})

export const deleteBooks = createAsyncThunk('book/deleteBooks', async (book, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    await fetch(`http://localhost:3001/books/${book?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      }
    });
    return book;
  } catch (error) {
    return rejectWithValue(error.message);
  }
})

export const readBook = createAsyncThunk('book/readBook', async (book, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await fetch(`http://localhost:3001/books/${book?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
})

const bookSlice = createSlice({
  name: "book",
  initialState: {books: [], isLoading: false, error: null, bookInfo: null},
  reducers:{
    clearBook: (state, _) => {
      state.bookInfo = null;
    }
  },
  extraReducers: (builder) => {
    //! getBooks
    builder.addCase(getBooks.pending, (state, _) => {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    })
    builder.addCase(getBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    //! addBooks
    builder.addCase(addBooks.pending, (state, _) => {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(addBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    })
    builder.addCase(addBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    //! deleteBooks
    builder.addCase(deleteBooks.pending, (state, _) => {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(deleteBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter(book => book.id !== action.payload.id);
    })
    builder.addCase(deleteBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    //! readBook
    builder.addCase(readBook.fulfilled, (state, action) => {
      state.bookInfo = action.payload;
    })
  }
})

export const { clearBook } = bookSlice.actions;

export default bookSlice.reducer;