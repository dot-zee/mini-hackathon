# Example taken - A simple Counter App



### Step 1: Create the Slice (The Logic Hub)

A slice is where you define your data (state) and the rules to change it (reducers).

Imagine we are creating a file called `counterSlice.js`.

```javascript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  // 1. Name of the slice
  name: 'counter', 
  
  // 2. The initial state (starting data)
  initialState: {
    value: 0, 
  },
  
  // 3. Reducers (The actions we can take on this data)
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic safely!
      state.value += 1; 
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      // action.payload holds any extra data passed in (like typing a specific number)
      state.value += action.payload; 
    },
  },
});

// Export the actions so our components can use them
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export the reducer so the Store can use it
export default counterSlice.reducer;

```

---

### Step 2: Create the Store (The Central Vault)

Now that we have a slice, we need to register it in our global Store. This is usually in a file called `store.js`.

```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'; // Import the reducer we just exported

export const store = configureStore({
  reducer: {
    // We are telling the store: "Manage a piece of state called 'counter' using this reducer"
    counter: counterReducer, 
  },
});

```

---

### Step 3: Provide the Store to React

Before your components can use Redux, you have to wrap your entire app in a Redux `<Provider>`. This usually happens in your main entry file (like `main.jsx` or `index.js`).

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store'; // Import your store

ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the App with the Provider and pass the store as a prop
  <Provider store={store}>
    <App />
  </Provider>
);

```

---

### Step 4: Use it in a Component (Read & Write)

Now for the fun part. Let's create a `Counter.jsx` component. This is where we will use those two magical hooks: `useSelector` (to read) and `useDispatch` (to act).

```javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice';

function Counter() {
  // READ: Grab the current value from the store (state.counter.value)
  const count = useSelector((state) => state.counter.value);
  
  // TRIGGER: Get the dispatch function ready to send actions
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Current Count: {count}</h2>
      
      {/* WRITE: Dispatch actions when buttons are clicked */}
      <button onClick={() => dispatch(increment())}>
        Add 1
      </button>
      
      <button onClick={() => dispatch(decrement())}>
        Subtract 1
      </button>
      
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Add 5
      </button>
    </div>
  );
}

export default Counter;

```

### Summary of the Flow in Action

When you click the "Add 5" button:

1. `dispatch` sends the `incrementByAmount(5)` action.
2. The Action goes to the `counterSlice`.
3. The Reducer sees the action, grabs the payload (`5`), and updates `state.value`.
4. `useSelector` notices the Store has changed, grabs the new number, and instantly updates your screen.

How does seeing the actual code change your perspective on how Redux Toolkit operates, and would you like to walk through how to handle an array of data (like a Todo List) next, since that covers adding, updating, and deleting?